"""Pick a picture for every look in data/characters/roster.json.

Keeps any pick marked "manual" in data/characters/picks.json and fills the rest from
face matches in episode frames / preview clips (labeled.json), falling back to wiki pictures.
"""
import json, pathlib
ROOT = pathlib.Path("/tmp/stills")
PROJ = pathlib.Path(__file__).resolve().parents[2]
roster = json.loads((PROJ / "data/characters/roster.json").read_text())
lab = json.loads((ROOT / "labeled.json").read_text())
for i, m in enumerate(lab): m["i"] = i
refs = json.loads((ROOT / "refs_by_char.json").read_text())
pf = PROJ / "data/characters/picks.json"
picks = json.loads(pf.read_text()) if pf.exists() else {}

def score(m):
    return m["sim"] * min(m["h"], 170) * min(m["sharp"], 400) ** .5 * (1.15 if m.get("src") == "vid" else 1)

for c in roster:
    mine = picks.setdefault(c["id"], {})
    used = set()
    for li, l in enumerate(c["looks"]):
        k = str(li)
        if mine.get(k, {}).get("manual"): continue
        end = c["looks"][li + 1]["ep"] if li + 1 < len(c["looks"]) else 999
        fs = [m for m in lab if m["who"] == c["id"] and l["ep"] <= m["ep"] < end and m["sim"] > 0.45 and m["margin"] > 0.04]
        if fs:
            fs.sort(key=score, reverse=True)
            top, seen = [], set()
            for m in fs:  # distinct moments
                if (m["ep"], m["t"] // 6) in seen: continue
                seen.add((m["ep"], m["t"] // 6)); top.append(m)
                if len(top) == 5: break
            mine[k] = {"kind": "frames", "cands": [{"src": m.get("src", "vid"), "ep": m["ep"], "t": m["t"], "i": m["i"]} for m in top]}
            continue
        pool = [f for f in refs.get(c["id"], []) if f not in used]
        if pool:
            used.add(pool[0]); mine[k] = {"kind": "pool", "local": pool[0], "auto": True}
        else:
            mine[k] = {"kind": "none"}
pf.write_text(json.dumps(picks, ensure_ascii=False, indent=1))
kinds = [p["kind"] for v in picks.values() for p in v.values()]
print({k: kinds.count(k) for k in set(kinds)})
