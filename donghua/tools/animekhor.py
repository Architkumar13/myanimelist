"""Subtitles and stills for any show from AnimeKhor, the site the episodes are watched on.

Each episode page embeds a Dailymotion copy (English subtitles burned in). Some shows also carry a separate
subtitle track (Shrouding the Heavens: Indonesian); for the rest, `ocr` reads the burned-in English off the frames.
A show whose shows.json entry has `youtube` (a file of {"episode": video id}) takes subtitles (official English and
Chinese) and stills from those official YouTube uploads instead, falling back to AnimeKhor for episodes not listed.
Run with donghua/.tools/venv/bin/python (see setup.sh). SHOW is an id from shows.json (sth, tgr, mu).

  animekhor.py latest SHOW                  newest episode AnimeKhor has
  animekhor.py subs SHOW 150 151            -> <show>/cache/animekhor/ep150.<lang>.srt
  animekhor.py ocr SHOW 60                  -> <show>/cache/animekhor/ep60.en.srt (read off the frames)
  animekhor.py still SHOW 150 612.5         -> <show>/cache/animekhor/ep150_612.5.png (1080p)
  animekhor.py window SHOW 150 600 610 LBL  frames every 0.5s + contact sheet in <show>/cache/animekhor/win/LBL/
  animekhor.py pick SHOW CHAR_ID 150 600 700  best face match for a cast member, using their current portraits

Times are on the subtitle clock (the playlist's), which can drift from the timestamps inside the video.
"""
import base64, json, pathlib, re, subprocess, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from common import show, ENV, YTDLP as _YTDLP, YTDLP_OPTS, MODELS, ffmpeg
YTDLP = _YTDLP

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"


def http(url):
    return subprocess.run(["curl", "-sL", "-m", "40", "-A", UA, url], capture_output=True, text=True).stdout


# ---------- episode pages and videos ----------
def pages(cfg, refresh=False):
    """{episode number: page url}. Pattern shows build urls; index shows scrape the show's AnimeKhor pages."""
    f = cfg["cache"] / "pages.json"
    if f.exists() and not refresh:
        return {int(k): v for k, v in json.loads(f.read_text()).items()}
    out = {}
    for part in cfg.get("index", []):
        html = http(part["url"])
        for url, n in re.findall(r'href="(https://animekhor\.org/[^"]*?episode-(\d+)[^"]*)"', html):
            out[int(n) + part["offset"]] = url
    f.write_text(json.dumps(out, indent=0))
    return out


def page_url(cfg, n):
    if "pattern" in cfg:
        return cfg["pattern"].format(n=n)
    p = pages(cfg)
    if n not in p:
        p = pages(cfg, refresh=True)
    if n not in p:
        raise SystemExit(f"EP{n}: not on AnimeKhor yet")
    return p[n]


def video_id(cfg, n):
    cache = cfg["cache"] / f"ep{n}.dm"
    if cache.exists():
        return cache.read_text().strip()
    html = http(page_url(cfg, n))
    embeds = [html] + [base64.b64decode(v).decode("utf-8", "ignore") for v in re.findall(r'option value="([A-Za-z0-9+/=]{20,})"', html)]
    for h in embeds:
        m = re.search(r"dailymotion\.com/player/[^\"]*video=([A-Za-z0-9]+)", h) or re.search(r"dailymotion\.com/embed/video/([A-Za-z0-9]+)", h)
        if m:
            cache.write_text(m.group(1))
            return m.group(1)
    raise SystemExit(f"EP{n}: no Dailymotion copy on {page_url(cfg, n)}")


def mirrors(cfg, n):
    """Every other host the episode page embeds (ok.ru, Rumble...), for when the Dailymotion copy is gone."""
    html = http(page_url(cfg, n))
    embeds = [html] + [base64.b64decode(v).decode("utf-8", "ignore") for v in re.findall(r'option value="([A-Za-z0-9+/=]{20,})"', html)]
    out = []
    for h in embeds:
        for u in re.findall(r'src="((?:https?:)?//(?:ok\.ru/videoembed|rumble\.com/embed)/[^"]+)"', h, re.I):
            out.append(("https:" + u) if u.startswith("//") else u)
    return list(dict.fromkeys(out))


def download_low(cfg, n, out):
    """Whole episode at low resolution from any host that works (Dailymotion first)."""
    try:
        fetch_range(cfg, n, 0, 99999, out, fmt="hls-380")
        return out
    except (subprocess.CalledProcessError, SystemExit):
        pass
    for url in mirrors(cfg, n):
        r = subprocess.run([YTDLP, *YTDLP_OPTS, "-q", "--no-warnings", "-f", "best[height<=480]/worst", "--ffmpeg-location", ffmpeg(), "-o", str(out), url],
                           env=ENV, capture_output=True, text=True)
        if pathlib.Path(out).exists() and pathlib.Path(out).stat().st_size > 100000:
            pathlib.Path(out).with_suffix(".start").write_text("0.0")
            return out
    raise SystemExit(f"EP{n}: no host would give up the video")


def dm(cfg, n):
    return f"https://www.dailymotion.com/video/{video_id(cfg, n)}"


def latest(cfg):
    if "index" in cfg:
        return max(pages(cfg, refresh=True))
    n = max(int(re.search(r"ep(\d+)", f.name).group(1)) for f in cfg["cache"].glob("ep*.dm")) if list(cfg["cache"].glob("ep*.dm")) else 1
    while True:
        html = http(cfg["pattern"].format(n=n + 1))
        if "dailymotion" not in html:
            return n
        n += 1


def youtube(cfg, n):
    """The official YouTube upload of episode n, if shows.json names a `youtube` list ({"n": video id}) for the show."""
    f = cfg["root"] / cfg["youtube"] if "youtube" in cfg else None
    vid = json.loads(f.read_text()).get(str(n)) if f and f.exists() else None
    return f"https://www.youtube.com/watch?v={vid}" if vid else None


# the embedded player's client isn't bot-checked after a burst of requests the way the default one is
YT_OPTS = ["--extractor-args", "youtube:player_client=web_embedded,default"]


# ---------- video ranges ----------
def fetch_range(cfg, n, a, b, out, fmt="hls-1080"):
    """Just the HLS segments covering seconds a..b. Dailymotion throttles non-browser clients, so use curl_cffi."""
    if yt := youtube(cfg, n):
        # the official upload: its subtitles share the video's clock, so the clip simply starts at a
        h = 360 if fmt == "hls-380" else 1080
        cut = [] if b >= 99999 else ["--download-sections", f"*{a}-{b}", "--force-keyframes-at-cuts"]
        pathlib.Path(out).unlink(missing_ok=True)
        subprocess.run([YTDLP, *YTDLP_OPTS, *YT_OPTS, "-q", "--no-warnings", "-f", f"bv*[vcodec^=avc1][height<={h}]/bv*[height<={h}]/best",
                        *cut, "--ffmpeg-location", ffmpeg(), "-o", str(out), yt], env=ENV, check=True)
        pathlib.Path(out).with_suffix(".start").write_text(str(0.0 if not cut else float(a)))
        return out
    from curl_cffi import requests
    url = subprocess.run([YTDLP, *YTDLP_OPTS, "-g", "-f", f"{fmt}/{fmt}-0/bv*[vcodec^=avc1][height<=1080]/best", dm(cfg, n)],
                         capture_output=True, text=True, env=ENV, check=True).stdout.strip().split("\n")[-1]
    get = lambda u: requests.get(u, impersonate="chrome", verify=ENV["SSL_CERT_FILE"], timeout=90)
    base = url.rsplit("/", 1)[0] + "/"
    lines = get(url).text.splitlines()
    init = next((l.split('"')[1] for l in lines if l.startswith("#EXT-X-MAP")), None)  # fMP4 has an init segment, TS doesn't
    t, parts, first = 0.0, [], None
    for i, l in enumerate(lines):
        if l.startswith("#EXTINF"):
            d = float(l.split(":")[1].rstrip(","))
            if t + d >= a and t <= b:
                parts.append(lines[i + 1])
                if first is None: first = t
            t += d
    from concurrent.futures import ThreadPoolExecutor
    with ThreadPoolExecutor(8) as ex:
        chunks = list(ex.map(lambda p: get(base + p).content, parts))
    data = (get(base + init).content if init else b"") + b"".join(chunks)
    pathlib.Path(out).write_bytes(data)
    pathlib.Path(out).with_suffix(".start").write_text(str(first or 0.0))
    return out


def frame_at(clip, t, png, scale=None):
    """Frame at playlist time t (the subtitle clock)."""
    offset = t - float(pathlib.Path(clip).with_suffix(".start").read_text())
    vf = ["-vf", f"scale={scale}"] if scale else []
    # seek after -i: input seeking misses frames in MPEG-TS segments whose clock doesn't start at zero
    subprocess.run([ffmpeg(), "-loglevel", "error", "-y", "-i", str(clip), "-ss", f"{max(0, offset):.3f}", "-frames:v", "1", *vf,
                    "-update", "1", str(png)], check=True)


# ---------- commands ----------
def subs(cfg, n):
    lang = cfg.get("subs", "id")
    if yt := youtube(cfg, n):
        # official English, plus the Chinese track for exact names (epN.zh.srt, when the upload has one)
        subprocess.run([YTDLP, *YTDLP_OPTS, *YT_OPTS, "-q", "--no-warnings", "--skip-download", "--write-subs", "--sub-langs", "en,zh",
                        "--sub-format", "srt/best", "--convert-subs", "srt", "--ffmpeg-location", ffmpeg(),
                        "-o", str(cfg["cache"] / f"ep{n}"), yt], env=ENV, check=True)
        return cfg["cache"] / f"ep{n}.en.srt"
    if lang == "ocr":
        return ocr(cfg, n)
    subprocess.run([YTDLP, *YTDLP_OPTS, "-q", "--no-warnings", "--skip-download", "--write-subs", "--sub-langs", lang,
                    "-o", str(cfg["cache"] / f"ep{n}"), dm(cfg, n)], env=ENV, check=True)
    return cfg["cache"] / f"ep{n}.{lang}.srt"


def ocr(cfg, n, step=0.5, fmt="hls-380"):
    """Read the burned-in English subtitles off the frames with macOS Vision -> epN.en.srt."""
    import Quartz, Vision
    from Foundation import NSURL
    out = cfg["cache"] / f"ep{n}.en.srt"
    clip = cfg["cache"] / f"ep{n}_ocr.mp4"
    if not clip.exists() or clip.stat().st_size < 100000:
        download_low(cfg, n, clip)
    tmp = cfg["cache"] / f"ocr{n}"; tmp.mkdir(exist_ok=True)
    start = float(clip.with_suffix(".start").read_text())
    # one frame per step, bottom 35% only, where the subtitles are
    subprocess.run([ffmpeg(), "-loglevel", "error", "-y", "-i", str(clip), "-vf", f"fps={1 / step},crop=iw:ih*0.35:0:ih*0.65",
                    str(tmp / "%05d.png")], check=True)

    def read(png):
        src = Quartz.CGImageSourceCreateWithURL(NSURL.fileURLWithPath_(str(png)), None)
        img = Quartz.CGImageSourceCreateImageAtIndex(src, 0, None)
        req = Vision.VNRecognizeTextRequest.alloc().init()
        req.setRecognitionLevel_(0); req.setRecognitionLanguages_(["en-US"]); req.setUsesLanguageCorrection_(True)
        Vision.VNImageRequestHandler.alloc().initWithCGImage_options_(img, None).performRequests_error_([req], None)
        lines = []
        for r in req.results() or []:
            c = r.topCandidates_(1)[0]
            s = str(c.string()).strip()
            box = r.boundingBox()
            # subtitles are centred, mostly Latin, and not tiny watermarks
            if c.confidence() < 0.4 or re.search(r"[㐀-鿿]", s) or len(s) < 2 or "animekhor" in s.lower(): continue
            if abs(box.origin.x + box.size.width / 2 - 0.5) > 0.2: continue
            lines.append((1 - box.origin.y, s))
        return " ".join(s for _, s in sorted(lines))

    cues, prev, since = [], None, 0.0
    frames = sorted(tmp.glob("*.png"))
    for i, f in enumerate(frames):
        t = start + i * step
        txt = read(f)
        norm = re.sub(r"\W+", "", txt.lower())
        if norm != (re.sub(r"\W+", "", prev.lower()) if prev else None):
            if prev: cues.append((since, t, prev))
            prev, since = (txt or None), t
    if prev: cues.append((since, start + len(frames) * step, prev))
    ts = lambda x: f"{int(x // 3600):02d}:{int(x % 3600 // 60):02d}:{int(x % 60):02d},{int(x % 1 * 1000):03d}"
    out.write_text("\n".join(f"{k + 1}\n{ts(a)} --> {ts(b)}\n{s}\n" for k, (a, b, s) in enumerate(cues)))
    for f in frames: f.unlink()
    tmp.rmdir()
    clip.unlink(); clip.with_suffix(".start").unlink()
    return out


def still(cfg, n, t):
    clip = cfg["cache"] / f"ep{n}_{t}.mp4"
    fetch_range(cfg, n, t, t + 1, clip)
    png = cfg["cache"] / f"ep{n}_{t}.png"
    frame_at(clip, t, png)
    clip.unlink(); clip.with_suffix(".start").unlink()
    return png


def window(cfg, n, a, b, label):
    from PIL import Image, ImageDraw
    d = cfg["cache"] / "win" / label; d.mkdir(parents=True, exist_ok=True)
    clip = d / "clip.mp4"
    if not clip.exists() or clip.stat().st_size < 10000:
        fetch_range(cfg, n, a, b, clip)
    fs = []
    for k in range(int((b - a) * 2) + 1):
        t = a + k / 2
        f = d / f"t{t:07.1f}.png"
        frame_at(clip, t, f)
        fs.append(f)
    cols, w = 5, 300
    thumbs = [Image.open(f).convert("RGB") for f in fs if f.exists()]
    h = int(w * thumbs[0].height / thumbs[0].width) if thumbs else 170
    sheet = Image.new("RGB", (cols * w, ((len(thumbs) + cols - 1) // cols) * (h + 16)), "white")
    draw = ImageDraw.Draw(sheet)
    for i, (f, im) in enumerate(zip(fs, thumbs)):
        x, y = (i % cols) * w, (i // cols) * (h + 16)
        sheet.paste(im.resize((w, h)), (x, y)); draw.text((x + 3, y + h + 2), f.stem[1:] + "s", fill="black")
    sheet.save(d / "sheet.jpg", quality=85)
    return d / "sheet.jpg"


def references(cfg, cid):
    """Face embeddings from a cast member's current portraits."""
    import cv2, numpy as np
    det = cv2.FaceDetectorYN.create(str(MODELS / "yunet.onnx"), "", (540, 720), 0.6)
    rec = cv2.FaceRecognizerSF.create(str(MODELS / "sface.onnx"), "")
    out = []
    for f in sorted((cfg["root"] / "site" / "img" / "cast").glob(f"{cid}-*.jpg")):
        im = cv2.imread(str(f)); det.setInputSize((im.shape[1], im.shape[0]))
        _, faces = det.detect(im)
        if faces is not None:
            fc = max(faces, key=lambda x: x[2] * x[3])
            e = rec.feature(rec.alignCrop(im, fc))[0]; out.append(e / np.linalg.norm(e))
    return np.array(out)


def pick(cfg, cid, n, a, b):
    """Scan seconds a..b once per second; print the best matches for a cast member."""
    import cv2, numpy as np
    R = references(cfg, cid)
    if not len(R): raise SystemExit(f"{cid}: no portrait with a face to match against")
    d = cfg["cache"] / "pick" / f"{cid}_{n}_{int(a)}"; d.mkdir(parents=True, exist_ok=True)
    clip = d / "clip.mp4"
    if not clip.exists(): fetch_range(cfg, n, a, b, clip)
    rec = cv2.FaceRecognizerSF.create(str(MODELS / "sface.onnx"), "")
    best, t = [], a
    while t <= b:
        f = d / f"{t:07.1f}.png"
        if not f.exists(): frame_at(clip, t, f)
        im = cv2.imread(str(f))
        if im is not None:
            H, W = im.shape[:2]
            det = cv2.FaceDetectorYN.create(str(MODELS / "yunet.onnx"), "", (W, H), 0.7)
            _, faces = det.detect(im)
            for fc in faces if faces is not None else []:
                if fc[3] < H * 0.08: continue
                e = rec.feature(rec.alignCrop(im, fc))[0]; e /= np.linalg.norm(e)
                sim = float((R @ e).max())
                reg = cv2.cvtColor(im[max(0, int(fc[1])):int(fc[1] + fc[3]), max(0, int(fc[0])):int(fc[0] + fc[2])], cv2.COLOR_BGR2GRAY)
                sharp = cv2.Laplacian(reg, cv2.CV_64F).var() if reg.size else 0
                best.append((sim * min(fc[3] / H, .35) ** .5 * min(sharp, 300) ** .3, sim, round(t, 1), str(f)))
        t += 1.0
    best.sort(reverse=True)
    return best[:5]


if __name__ == "__main__":
    if len(sys.argv) < 3: raise SystemExit(__doc__)
    cmd, sid, *args = sys.argv[1:]
    cfg = show(sid)
    if cmd == "latest": print(latest(cfg))
    elif cmd == "subs":
        for a in args: print(subs(cfg, int(a)))
    elif cmd == "ocr":
        for a in args: print(ocr(cfg, int(a)))
    elif cmd == "still": print(still(cfg, int(args[0]), float(args[1])))
    elif cmd == "window": print(window(cfg, int(args[0]), float(args[1]), float(args[2]), args[3]))
    elif cmd == "pick":
        for q, sim, t, f in pick(cfg, args[0], int(args[1]), float(args[2]), float(args[3])): print(f"t={t} sim={sim:.2f} q={q:.2f} {f}")
    else: raise SystemExit(__doc__)
