"""Match episode faces to roster characters using wiki pool faces as references."""
import json, re, pathlib, collections
import numpy as np
ROOT = pathlib.Path("/tmp/stills")
PROJ = pathlib.Path(__file__).resolve().parents[2]
roster = json.loads((PROJ / "data/characters/roster.json").read_text())
ref = json.loads((ROOT / "ref.json").read_text()); R = np.load(ROOT / "ref.npy")
R = R / np.linalg.norm(R, axis=1, keepdims=True)

def key(s): return re.sub(r"[^a-z]", "", s.lower())
per_img = collections.Counter(m["local"] for m in ref)
refs = collections.defaultdict(list)
for i, m in enumerate(ref):
    fk = key(m["file"].rsplit(".", 1)[0])
    for c in roster:
        names = [c["name"]] + ([c["wiki"]] if c.get("wiki") else [])
        by_file = any(len(key(n)) > 4 and key(n) in fk for n in names)
        by_page = c.get("wiki") in m["pages"] and len(m["pages"]) <= 2 and per_img[m["local"]] == 1
        if by_file and per_img[m["local"]] == 1 or by_page:
            refs[c["id"]].append(i)
json.dump({k: [ref[i]["local"] for i in v] for k, v in refs.items()}, open(ROOT / "refs_by_char.json", "w"), indent=0)
print(len(refs), "characters have reference faces")

meta, E = [], []
for f in sorted((ROOT / "per").glob("*.json")):
    m = json.loads(f.read_text()); e = np.load(f.with_suffix(".npy"))
    if len(m): meta += m; E.append(e)
E = np.vstack(E); E = E / np.linalg.norm(E, axis=1, keepdims=True)
ids = list(refs)
best = np.full((len(E), len(ids)), -1.0)
for j, cid in enumerate(ids):
    best[:, j] = (E @ R[refs[cid]].T).max(axis=1)
for i, m in enumerate(meta):
    order = np.argsort(-best[i])
    m["who"] = ids[order[0]]; m["sim"] = float(best[i, order[0]]); m["margin"] = float(best[i, order[0]] - best[i, order[1]])
np.save(ROOT / "all_emb.npy", E)
json.dump(meta, open(ROOT / "labeled.json", "w"))
c = collections.Counter(m["who"] for m in meta if m["sim"] > 0.45 and m["margin"] > 0.05)
print(c.most_common(60))
