"""Get subtitles and stills for any episode from AnimeKhor (the site the episodes are watched on).

Each episode page embeds a Dailymotion copy with burned-in English subtitles and a separate
Indonesian .srt track. Needs yt-dlp with curl_cffi (pip install "yt-dlp[default,curl-cffi]") in /tmp/ytenv.

  /tmp/ytenv/bin/python scripts/stills/animekhor.py subs 150 151      # -> cache/animekhor/ep150.id.srt ...
  /tmp/ytenv/bin/python scripts/stills/animekhor.py still 150 612.5   # -> cache/animekhor/ep150_612.5.png (1080p)
"""
import os, pathlib, re, subprocess, sys, urllib.request
import imageio_ffmpeg

PROJ = pathlib.Path(__file__).resolve().parents[2]
OUT = PROJ / "cache" / "animekhor"
PAGE = "https://animekhor.org/shrouding-the-heavens-episode-{n}-subtitles-english-indonesian/"
YTDLP = "/tmp/ytenv/bin/yt-dlp"
FF = imageio_ffmpeg.get_ffmpeg_exe()
ENV = {**os.environ, "SSL_CERT_FILE": "/tmp/ytenv/cacert.pem"}


def video_id(n):
    OUT.mkdir(parents=True, exist_ok=True)
    cache = OUT / f"ep{n}.dm"
    if cache.exists():
        return cache.read_text().strip()
    req = urllib.request.Request(PAGE.format(n=n), headers={"User-Agent": "Mozilla/5.0 Chrome/124"})
    html = subprocess.run(["curl", "-sL", "-m", "30", "-A", req.headers["User-agent"], req.full_url], capture_output=True, text=True).stdout
    m = re.search(r"dailymotion\.com/player/[^\"]*video=([A-Za-z0-9]+)", html) or re.search(r"dailymotion\.com/embed/video/([A-Za-z0-9]+)", html)
    if not m:
        raise SystemExit(f"EP{n}: no Dailymotion video on {req.full_url}")
    cache.write_text(m.group(1))
    return m.group(1)


def fetch_range(n, a, b, out, fmt="hls-1080"):
    """Download just the HLS segments covering seconds a..b (Dailymotion throttles non-browser clients, so use curl_cffi)."""
    from curl_cffi import requests
    url = subprocess.run([YTDLP, "-g", "-f", f"{fmt}/{fmt}-0/bv*[vcodec^=avc1][height<=1080]/best", f"https://www.dailymotion.com/video/{video_id(n)}"],
                         capture_output=True, text=True, env=ENV, check=True).stdout.strip().split("\n")[-1]
    get = lambda u: requests.get(u, impersonate="chrome", verify=ENV["SSL_CERT_FILE"], timeout=60)
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
    data = (get(base + init).content if init else b"") + b"".join(get(base + p).content for p in parts)
    pathlib.Path(out).write_bytes(data)
    # Subtitle times follow the playlist clock, which can drift from the timestamps inside the video.
    pathlib.Path(out).with_suffix(".start").write_text(str(first or 0.0))
    return out


def clip_start(clip):
    """First timestamp in a fetched fragment (segments keep their place in the episode)."""
    info = subprocess.run([FF, "-i", str(clip)], capture_output=True, text=True).stderr
    return float(re.search(r"start: ([\d.]+)", info).group(1))


def frame_at(clip, t, png):
    """Frame at playlist time t (the same clock as the subtitles)."""
    side = pathlib.Path(clip).with_suffix(".start")
    offset = t - float(side.read_text()) if side.exists() else t - clip_start(clip)
    subprocess.run([FF, "-loglevel", "error", "-y", "-ss", f"{max(0, offset):.3f}", "-i", str(clip),
                    "-frames:v", "1", "-update", "1", str(png)], check=True)


def subs(n):
    url = f"https://www.dailymotion.com/video/{video_id(n)}"
    subprocess.run([YTDLP, "-q", "--no-warnings", "--skip-download", "--write-subs", "--sub-langs", "id",
                    "-o", str(OUT / f"ep{n}"), url], env=ENV, check=True)
    print(OUT / f"ep{n}.id.srt")


def still(n, t):
    clip = OUT / f"ep{n}_{t}.mp4"
    fetch_range(n, t, t + 1, clip)
    png = OUT / f"ep{n}_{t}.png"
    frame_at(clip, t, png)
    clip.unlink()
    print(png)


if __name__ == "__main__":
    cmd, *args = sys.argv[1:]
    if cmd == "subs":
        for a in args: subs(int(a))
    elif cmd == "still":
        still(int(args[0]), float(args[1]))
    else:
        raise SystemExit(__doc__)
