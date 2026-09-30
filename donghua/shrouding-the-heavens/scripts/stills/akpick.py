"""Find the clearest frame of a character in an AnimeKhor episode window by face matching.

  /tmp/ytenv/bin/python scripts/stills/akpick.py CHAR_ID EP START END [LOOK_INDEX]
Reference faces are that character's already-matched faces (labeled.json) — optionally only those used for one look.
Prints the best time; add it to picks.json as {"kind": "ak", "ep": EP, "t": T, "manual": true}.
"""
import json, pathlib, sys
import cv2, numpy as np
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from animekhor import fetch_range, frame_at
ROOT = pathlib.Path("/tmp/stills")
cid, ep, a, b = sys.argv[1], int(sys.argv[2]), float(sys.argv[3]), float(sys.argv[4])
lab = json.loads((ROOT / "labeled.json").read_text()); E = np.load(ROOT / "all_emb.npy")
idx = [i for i, m in enumerate(lab) if m["who"] == cid and m["sim"] > 0.5 and m["margin"] > 0.05]
if len(sys.argv) > 5:
    picks = json.loads((pathlib.Path(__file__).resolve().parents[2] / "data/characters/picks.json").read_text())
    p = picks[cid][sys.argv[5]]
    idx = [c["i"] for c in p.get("cands", [])] or idx
R = E[idx]; R = R / np.linalg.norm(R, axis=1, keepdims=True)
d = ROOT / "ak" / f"{cid}_{ep}_{int(a)}"; d.mkdir(parents=True, exist_ok=True)
clip = d / "clip.mp4"
if not clip.exists(): fetch_range(ep, a, b, clip)
det = None; rec = cv2.FaceRecognizerSF.create(str(ROOT / "models/sface.onnx"), "")
best = []
t = a
while t <= b:
    f = d / f"{int(t * 10):06d}.png"
    if not f.exists(): frame_at(clip, t, f)
    im = cv2.imread(str(f))
    if im is not None:
        H, W = im.shape[:2]
        det = cv2.FaceDetectorYN.create(str(ROOT / "models/yunet.onnx"), "", (W, H), 0.7)
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
for q, sim, tt, f in best[:5]: print(f"t={tt} sim={sim:.2f} q={q:.2f} {f}")
