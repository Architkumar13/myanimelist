"""Pick the clearest face near a moment, skipping faces that match cast members we know it isn't.

  bestface.py SHOW CHAR_ID EP T [--not ID,ID]   -> prints the best time in T-3..T+7 (subtitle clock)
Used for new characters, whose name card says when they're on screen but who have no portrait to match yet.
"""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import cv2, numpy as np
cv2.setLogLevel(0) if hasattr(cv2, "setLogLevel") else None
import animekhor, common

def best(cfg, cid, ep, t, avoid=()):
    animekhor.window(cfg, ep, t - 3, t + 7, cid)
    rec = cv2.FaceRecognizerSF.create(str(common.MODELS / "sface.onnx"), "")
    R = [animekhor.references(cfg, a) for a in avoid]
    R = np.vstack([r for r in R if len(r)]) if any(len(r) for r in R) else None
    top = None
    for f in sorted((cfg["cache"] / "win" / cid).glob("t*.png")):
        im = cv2.imread(str(f)); H, W = im.shape[:2]
        det = cv2.FaceDetectorYN.create(str(common.MODELS / "yunet.onnx"), "", (W, H), 0.75)
        _, faces = det.detect(im)
        for fc in faces if faces is not None else []:
            if R is not None:
                e = rec.feature(rec.alignCrop(im, fc))[0]; e /= np.linalg.norm(e)
                if float((R @ e).max()) > 0.65: continue
            reg = cv2.cvtColor(im[max(0, int(fc[1])):int(fc[1] + fc[3]), max(0, int(fc[0])):int(fc[0] + fc[2])], cv2.COLOR_BGR2GRAY)
            if not reg.size: continue
            q = fc[3] / H * min(cv2.Laplacian(reg, cv2.CV_64F).var(), 300) ** .4 * fc[14]
            if not top or q > top[0]:
                top = (q, float(f.stem[1:]), [float(v) / s for v, s in zip(fc[:4], (W, H, W, H))])
    return top

if __name__ == "__main__":
    sid, cid, ep, t = sys.argv[1], sys.argv[2], int(sys.argv[3]), float(sys.argv[4])
    avoid = sys.argv[sys.argv.index("--not") + 1].split(",") if "--not" in sys.argv else []
    r = best(common.show(sid), cid, ep, t, avoid)
    print(cid, r and r[1], r and [round(v, 3) for v in r[2]])
