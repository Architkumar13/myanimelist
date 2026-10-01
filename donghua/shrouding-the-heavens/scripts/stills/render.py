"""Turn picks.json into 3:4 portraits in site/img/cast/. Run with donghua/.tools/venv/bin/python.

Pick kinds: "frames"/"vid"/"pv" come from the first pass (official channel EP1-50 and preview clips); their source
frames are kept in cache/stills/raw/, so they don't need the videos again. "ak" frames come from the full episodes
on AnimeKhor (donghua/tools/animekhor.py), "pool" from the fan wiki, "keep" leaves an existing portrait alone.
  render.py [CHAR_ID ...]
"""
import json, os, pathlib, subprocess, sys, urllib.parse, concurrent.futures as cf
import cv2, numpy as np, imageio_ffmpeg
HUB = pathlib.Path(__file__).resolve().parents[3]
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1])); sys.path.insert(0, str(HUB / "tools"))
from wikiapi import get
from common import MODELS, ENV, YTDLP, show
import animekhor

FF = imageio_ffmpeg.get_ffmpeg_exe()
PROJ = pathlib.Path(__file__).resolve().parents[2]
ROOT = PROJ / "cache" / "stills"     # face-match data and kept source frames from the first pass
OUT = PROJ / "site/img/cast"; OUT.mkdir(parents=True, exist_ok=True)
RAW = ROOT / "raw"; RAW.mkdir(exist_ok=True)
picks = json.loads((PROJ / "data/characters/picks.json").read_text())
eps = dict(l.split("\t") for l in (ROOT / "eps.tsv").read_text().split("\n") if l)
pool = {p["local"]: p for p in json.loads((PROJ / "cache/pool/index.json").read_text())}
env = ENV
_urls = {}

def stream(ep):
    if ep not in _urls:
        _urls[ep] = subprocess.run([YTDLP, "-g", "-f", "137", f"https://www.youtube.com/watch?v={eps[str(ep)]}"],
                                   capture_output=True, text=True, env=env).stdout.strip().split("\n")[-1]
    return _urls[ep]

E = None
def target(i):
    global E
    if E is None: E = np.load(ROOT / "all_emb.npy")
    return E[i]

def burst(src, ep, t):
    """Full-res frames every 0.25s from t-1.5 to t+1.5."""
    inp = stream(ep) if src == "vid" else str(ROOT / f"pv/ep{ep:03d}.mp4")
    d = RAW / f"{src}{ep:03d}_{t}"
    if not d.exists():
        d.mkdir()
        subprocess.run([FF, "-loglevel", "error", "-y", "-ss", str(max(0, t - 1.5)), "-i", inp, "-t", "3", "-vf", "fps=4", str(d / "%02d.png")])
    return [(max(0, t - 1.5) + (int(f.stem) - 1) * 0.25, f) for f in sorted(d.glob("*.png"))]

def choose(p):
    """Best face across candidate moments: similar to the matched face, big, sharp, lit, above the subtitles."""
    best = None
    rec = cv2.FaceRecognizerSF.create(str(MODELS / "sface.onnx"), "")
    for c in p["cands"][:5]:
        tv = target(c["i"]); tv = tv / np.linalg.norm(tv)
        for t, f in burst(c["src"], c["ep"], c["t"]):
            im = cv2.imread(str(f))
            if im is None: continue
            H, W = im.shape[:2]
            det = cv2.FaceDetectorYN.create(str(MODELS / "yunet.onnx"), "", (W, H), 0.7)
            _, faces = det.detect(im)
            if faces is None: continue
            for fc in faces:
                x, y, w, h = fc[:4]
                if h < H * 0.08: continue
                e = rec.feature(rec.alignCrop(im, fc))[0]; sim = float(e @ tv / np.linalg.norm(e))
                if sim < 0.4: continue
                reg = cv2.cvtColor(im[max(0, int(y)):int(y + h), max(0, int(x)):int(x + w)], cv2.COLOR_BGR2GRAY)
                if reg.size == 0: continue
                sharp = cv2.Laplacian(reg, cv2.CV_64F).var(); bright = reg.mean()
                q = sim * min(h / H, 0.35) ** 0.5 * min(sharp, 300) ** 0.35 * (1 if 60 < bright < 225 else 0.5) * (1 if y + h < H * 0.8 else 0.7) * float(fc[14])
                if not best or q > best[0]:
                    best = (q, {"src": c["src"], "ep": c["ep"], "t": round(t, 2)}, [float(v) for v in fc[:4]])
    return best

def source(p):
    """Full-resolution image for a pick, cached in RAW."""
    kept = None
    if p["kind"] == "frames" and "chosen" in p:
        ch = p["chosen"]; kept = RAW / f"{ch['src']}{ch['ep']:03d}_{ch['t']}.jpg"
    elif p["kind"] == "pool":
        kept = RAW / ("pool_" + pathlib.Path(p["local"]).stem + ".jpg")
    if kept and kept.exists():
        return cv2.imread(str(kept))
    if p["kind"] == "frames":
        ch = p["chosen"]
        f = RAW / f"{ch['src']}{ch['ep']:03d}_{ch['t']}.png"
        if not f.exists():
            inp = stream(ch["ep"]) if ch["src"] == "vid" else str(ROOT / f"pv/ep{ch['ep']:03d}.mp4")
            subprocess.run([FF, "-loglevel", "error", "-y", "-ss", str(ch["t"]), "-i", inp, "-frames:v", "1", "-update", "1", str(f)])
    elif p["kind"] == "vid":
        f = RAW / f"vid{p['ep']:02d}_{p['t']}.png"
        if not f.exists(): subprocess.run([FF, "-loglevel", "error", "-y", "-ss", str(p["t"]), "-i", stream(p["ep"]), "-frames:v", "1", "-update", "1", str(f)])
    elif p["kind"] == "pv":
        f = RAW / f"pv{p['ep']:03d}_{p['t']}.png"
        if not f.exists(): subprocess.run([FF, "-loglevel", "error", "-y", "-ss", str(p["t"]), "-i", str(ROOT / f"pv/ep{p['ep']:03d}.mp4"), "-frames:v", "1", "-update", "1", str(f)])
    elif p["kind"] == "pool":
        meta = pool[p["local"]]
        url = meta["url"].split("/revision/")[0] + "/revision/latest" if "/revision/" in meta["url"] else meta["url"]
        f = RAW / ("pool_" + p["local"])
        if not f.exists(): f.write_bytes(get(url))
    elif p["kind"] == "ak":
        cfg = show("sth")
        f = cfg["cache"] / f"ep{p['ep']}_{float(p['t'])}.png"
        if not f.exists(): animekhor.still(cfg, p["ep"], float(p["t"]))
    elif p["kind"] == "yt-thumb":
        f = RAW / f"thumb_{p['id']}.jpg"
        if not f.exists(): f.write_bytes(get(f"https://i.ytimg.com/vi/{p['id']}/maxresdefault.jpg"))
    else:
        return None
    im = cv2.imread(str(f))
    return im

def portrait(im, p):
    H, W = im.shape[:2]
    det = cv2.FaceDetectorYN.create(str(MODELS / "yunet.onnx"), "", (W, H), 0.6)
    _, faces = det.detect(im)
    face = None
    if "focus" in p:  # manual focus point (fractions) and face height fraction
        fx, fy, fh = p["focus"]; face = (fx * W - fh * H * .4, fy * H - fh * H / 2, fh * H * .8, fh * H)
    elif faces is not None and len(faces):
        if p["kind"] == "frames" and p.get("face"):
            bx, by, bw, bh = p["face"]; cx, cy = bx + bw / 2, by + bh / 2
            face = min(faces, key=lambda f: (f[0] + f[2] / 2 - cx) ** 2 + (f[1] + f[3] / 2 - cy) ** 2)[:4]
        elif "box" in p and p["kind"] in ("vid", "pv"):
            # scan coordinates are in a 640x360 letterboxed frame
            s = min(640 / W, 360 / H); ox, oy = (640 - W * s) / 2, (360 - H * s) / 2
            bx, by, bw, bh = p["box"]; cx, cy = (bx + bw / 2 - ox) / s, (by + bh / 2 - oy) / s
            face = min(faces, key=lambda f: (f[0] + f[2] / 2 - cx) ** 2 + (f[1] + f[3] / 2 - cy) ** 2)[:4]
        else:
            face = max(faces, key=lambda f: f[2] * f[3])[:4]
    if face is None:
        # no face: centred top crop
        cw = min(W, H * 3 / 4); x0 = (W - cw) / 2; crop = im[0:int(cw * 4 / 3), int(x0):int(x0 + cw)]
        return cv2.resize(crop, (540, 720), interpolation=cv2.INTER_AREA), None
    x, y, w, h = [float(v) for v in face]
    zoom = p.get("zoom", 1.0)
    ch = min(H, h * 4.2 * zoom); cw = ch * 3 / 4
    if cw > W: cw = W; ch = cw * 4 / 3
    cx = x + w / 2; top = y - h * 1.0 * zoom
    if p["kind"] in ("frames", "vid", "pv", "ak"):
        floor = H * (0.76 if p["kind"] == "ak" else 0.86)  # hard subtitles live below this line
        if max(0, top) + ch > floor and y + h * 1.6 < floor:
            ch = min(ch, floor - max(0, top)); cw = ch * 3 / 4
    x0 = min(max(0, cx - cw / 2), W - cw); y0 = min(max(0, top), H - ch)
    crop = im[int(y0):int(y0 + ch), int(x0):int(x0 + cw)]
    return cv2.resize(crop, (540, 720), interpolation=cv2.INTER_AREA if cw > 540 else cv2.INTER_CUBIC), (h / H)

def job(args):
    cid, li, p = args
    if p["kind"] == "frames" and "chosen" not in p:
        b = choose(p)
        if not b: return cid, li, "no usable frame"
        p["chosen"], p["face"] = b[1], b[2]
    out = OUT / f"{cid}-{li}.jpg"
    key = json.dumps(p, sort_keys=True)
    stamp = out.with_suffix(".key")
    if out.exists() and stamp.exists() and stamp.read_text() == key: return cid, li, "cached"
    try:
        im = source(p)
    except Exception as e:
        return cid, li, f"fail {e}"
    if im is None: return cid, li, "none"
    img, fh = portrait(im, p)
    cv2.imwrite(str(out), img, [cv2.IMWRITE_JPEG_QUALITY, 84])
    stamp.write_text(key)
    return cid, li, "ok"

jobs = [(cid, li, p) for cid, v in picks.items() for li, p in v.items() if p["kind"] not in ("none", "keep")]
if len(sys.argv) > 1: jobs = [j for j in jobs if j[0] in sys.argv[1:]]
for cid in {j[0] for j in jobs if j[2]["kind"] == "vid"}: pass
with cf.ThreadPoolExecutor(3) as ex:
    for r in ex.map(job, jobs):
        if r[2] not in ("ok", "cached"): print(*r)
(PROJ / "data/characters/picks.json").write_text(json.dumps(picks, ensure_ascii=False, indent=1))
# drop portraits of looks that no longer have a pick
keep = {f"{cid}-{li}.jpg" for cid, v in picks.items() for li, p in v.items() if p["kind"] != "none"}
for f in OUT.glob("*.jpg"):
    if f.name not in keep: f.unlink(); f.with_suffix(".key").unlink(missing_ok=True)
print(len(list(OUT.glob("*.jpg"))), "portraits")
