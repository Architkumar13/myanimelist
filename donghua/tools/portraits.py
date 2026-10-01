"""Render a show's cast portraits from <show>/data/characters/picks.json into <show>/site/img/cast/{id}-{look}.jpg.

  portraits.py SHOW [CHAR_ID ...]

Pick kinds:
  ak     a frame from the full episode on AnimeKhor: {"kind": "ak", "ep": N, "t": seconds, "focus"?: [cx, cy, face_h]}
  file   an image already on disk, relative to the show folder: {"kind": "file", "path": "site/img/wiki/x.jpg"}
  keep   leave the existing portrait alone
  none   no picture (the site shows a placeholder)
Shrouding the Heavens' first-pass kinds (frames/vid/pv/pool) are handled by its own scripts/stills/render.py.
"""
import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import cv2
import animekhor
from common import show, MODELS


def portrait(im, p):
    """3:4 head-and-shoulders crop around the chosen (or biggest) face, kept above burned-in subtitles."""
    H, W = im.shape[:2]
    face = None
    if "focus" in p:  # manual: face centre and face height, as fractions of the frame
        fx, fy, fh = p["focus"]; face = (fx * W - fh * H * .4, fy * H - fh * H / 2, fh * H * .8, fh * H)
    else:
        det = cv2.FaceDetectorYN.create(str(MODELS / "yunet.onnx"), "", (W, H), 0.6)
        _, faces = det.detect(im)
        if faces is not None and len(faces): face = max(faces, key=lambda f: f[2] * f[3])[:4]
    if face is None:
        cw = min(W, H * 3 / 4); x0 = (W - cw) / 2
        return cv2.resize(im[0:int(cw * 4 / 3), int(x0):int(x0 + cw)], (540, 720), interpolation=cv2.INTER_AREA)
    x, y, w, h = [float(v) for v in face]
    zoom = p.get("zoom", 1.0)
    ch = min(H, h * 4.2 * zoom); cw = ch * 3 / 4
    if cw > W: cw = W; ch = cw * 4 / 3
    cx, top = x + w / 2, y - h * zoom
    if p.get("kind") == "ak":
        floor = H * 0.76  # AnimeKhor's burned-in subtitles sit below this line
        if max(0, top) + ch > floor and y + h * 1.6 < floor:
            ch = min(ch, floor - max(0, top)); cw = ch * 3 / 4
    x0 = min(max(0, cx - cw / 2), W - cw); y0 = min(max(0, top), H - ch)
    crop = im[int(y0):int(y0 + ch), int(x0):int(x0 + cw)]
    return cv2.resize(crop, (540, 720), interpolation=cv2.INTER_AREA if cw > 540 else cv2.INTER_CUBIC)


def main():
    sid, *only = sys.argv[1:]
    cfg = show(sid)
    out = cfg["root"] / "site" / "img" / "cast"; out.mkdir(parents=True, exist_ok=True)
    picks = json.loads((cfg["root"] / "data" / "characters" / "picks.json").read_text())
    done = 0
    for cid, looks in picks.items():
        if only and cid not in only: continue
        for li, p in looks.items():
            dst, stamp = out / f"{cid}-{li}.jpg", out / f"{cid}-{li}.key"
            key = json.dumps(p, sort_keys=True)
            if p["kind"] in ("keep", "none") or (dst.exists() and stamp.exists() and stamp.read_text() == key): continue
            if p["kind"] == "ak":
                src = cfg["cache"] / f"ep{p['ep']}_{float(p['t'])}.png"
                if not src.exists(): animekhor.still(cfg, p["ep"], float(p["t"]))
            elif p["kind"] == "file":
                src = cfg["root"] / p["path"]
            else:
                continue
            im = cv2.imread(str(src))
            if im is None: print("unreadable", cid, li, src); continue
            cv2.imwrite(str(dst), portrait(im, p), [cv2.IMWRITE_JPEG_QUALITY, 84]); stamp.write_text(key); done += 1
    for f in out.glob("*.jpg"):  # drop portraits whose pick went away
        cid, li = f.stem.rsplit("-", 1)
        if picks.get(cid, {}).get(li, {}).get("kind") in (None, "none"): f.unlink(); f.with_suffix(".key").unlink(missing_ok=True)
    print(done, "rendered")


if __name__ == "__main__":
    main()
