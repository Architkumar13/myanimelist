"""Grab frames every 0.5s from an AnimeKhor episode window: window.py EP START END LABEL -> /tmp/stills/win/LABEL/*.png + contact sheet."""
import os, pathlib, subprocess, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from animekhor import fetch_range, frame_at
ep, a, b, label = int(sys.argv[1]), float(sys.argv[2]), float(sys.argv[3]), sys.argv[4]
d = pathlib.Path("/tmp/stills/win") / label; d.mkdir(parents=True, exist_ok=True)
clip = d / "clip.mp4"
if not clip.exists() or clip.stat().st_size < 10000:
    fetch_range(ep, a, b, clip)
# frames every 0.5s between a and b; names carry the real time in tenths of a second
for k in range(int((b - a) * 2) + 1):
    t = a + k / 2
    frame_at(clip, t, d / f"f{int(t * 10):06d}.png")
fs = sorted(d.glob("f*.png"))
subprocess.run(["/tmp/ytenv/bin/python", "/tmp/stills/sheet.py", str(d / "sheet.jpg"), "5", "300", *[f"{f.stem}={f}" for f in fs[:40]]])
print(len(fs), d / "sheet.jpg")
