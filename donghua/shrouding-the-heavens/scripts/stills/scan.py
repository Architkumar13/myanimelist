"""Sample frames every 3s from each 360p episode, detect faces, embed with SFace.

Writes faces.npz (embeddings) + faces.json (ep, t, box, score, size, sharpness) and face crops.
"""
import json, subprocess, sys, pathlib
import numpy as np, cv2, imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()
ROOT = pathlib.Path("/tmp/stills")
det = cv2.FaceDetectorYN.create(str(ROOT / "models/yunet.onnx"), "", (640, 360), 0.75)
rec = cv2.FaceRecognizerSF.create(str(ROOT / "models/sface.onnx"), "")
import os
STEP = float(os.environ.get("STEP", "3"))
SRC = os.environ.get("SRC", "vid")
PFX = "pv" if SRC == "pv" else ""

def frames(path):
    p = subprocess.Popen([FF, "-loglevel", "error", "-i", str(path), "-vf", f"fps=1/{STEP},scale=640:360:force_original_aspect_ratio=decrease,pad=640:360:(ow-iw)/2:(oh-ih)/2",
                          "-f", "rawvideo", "-pix_fmt", "bgr24", "-"], stdout=subprocess.PIPE)
    n = 0
    while True:
        buf = p.stdout.read(640 * 360 * 3)
        if len(buf) < 640 * 360 * 3: break
        yield round(n * STEP, 2), np.frombuffer(buf, np.uint8).reshape(360, 640, 3)
        n += 1

def main():
    (ROOT / "crops").mkdir(exist_ok=True)
    (ROOT / "per").mkdir(exist_ok=True)
    for vid in sorted((ROOT / SRC).glob("ep*.mp4")):
        ep = int(vid.stem[2:])
        if (ROOT / "per" / f"{PFX}{ep:02d}.json").exists(): continue
        meta, embs = [], []
        c = 0
        for t, im in frames(vid):
            _, faces = det.detect(im)
            if faces is None: continue
            for f in faces:
                x, y, w, h = f[:4]
                if h < 45 or f[14] < 0.8: continue
                al = rec.alignCrop(im, f)
                e = rec.feature(al)[0]
                crop = im[max(0, int(y - h * .4)):int(y + h * 1.3), max(0, int(x - w * .4)):int(x + w * 1.4)]
                sharp = cv2.Laplacian(cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY), cv2.CV_64F).var() if crop.size else 0
                name = f"{PFX}e{ep:02d}_{t:07.1f}_{int(x)}.jpg"
                cv2.imwrite(str(ROOT / "crops" / name), crop)
                meta.append({"src": SRC, "ep": ep, "t": t, "box": [float(v) for v in f[:4]], "score": float(f[14]), "h": float(h), "sharp": float(sharp), "crop": name})
                embs.append(e); c += 1
        np.save(ROOT / "per" / f"{PFX}{ep:02d}.npy", np.array(embs))
        (ROOT / "per" / f"{PFX}{ep:02d}.json").write_text(json.dumps(meta))
        print(ep, c, flush=True)

main()
