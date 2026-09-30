"""Detect faces in every wiki pool image; save embeddings with the file + pages it belongs to."""
import json, pathlib
import numpy as np, cv2
POOL = pathlib.Path(__file__).resolve().parents[2] / "cache/pool"
ROOT = pathlib.Path("/tmp/stills")
det = cv2.FaceDetectorYN.create(str(ROOT / "models/yunet.onnx"), "", (320, 320), 0.7)
rec = cv2.FaceRecognizerSF.create(str(ROOT / "models/sface.onnx"), "")
idx = json.loads((POOL / "index.json").read_text())
meta, embs = [], []
for i in idx:
    im = cv2.imread(str(POOL / i["local"]))
    if im is None: continue
    h, w = im.shape[:2]
    det.setInputSize((w, h))
    _, faces = det.detect(im)
    if faces is None: continue
    for f in faces:
        if f[3] < 30: continue
        embs.append(rec.feature(rec.alignCrop(im, f))[0])
        meta.append({"local": i["local"], "file": i["file"], "pages": i["pages"], "box": [float(v) for v in f[:4]], "W": w, "H": h, "score": float(f[14])})
np.save(ROOT / "ref.npy", np.array(embs)); (ROOT / "ref.json").write_text(json.dumps(meta))
print(len(meta), "faces in", len({m['local'] for m in meta}), "images")
