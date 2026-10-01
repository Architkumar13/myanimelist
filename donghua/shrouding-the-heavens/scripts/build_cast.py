"""data/characters/roster.json + picks.json + site/img/cast/ -> site/data/cast.js (window.CAST)."""
import json, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent

# The realm ladder the page draws, lowest first. Names follow the official subtitles.
LEVELS = ["Mortal", "Bitter Sea", "Life Spring", "Divine Bridge", "Other Shore", "Dao Palace", "Four Poles",
          "Dragon Transformation", "Immortal Platform", "Great Power", "King", "Saint", "Saint King", "Great Saint",
          "Quasi-Emperor", "Great Emperor"]

def level(realm, detail):
    r = realm.lower()
    if r in ("unknown", ""): return None
    if "2nd heaven" in r or "great power" in r: return LEVELS.index("Great Power")
    if "3rd heaven" in r or "king" == r or "dao severing" in r: return LEVELS.index("King")
    if "saint king" in r: return LEVELS.index("Saint King")
    if "great saint" in r: return LEVELS.index("Great Saint")
    if "supreme" in r or "quasi" in r: return LEVELS.index("Quasi-Emperor")
    for i, name in reversed(list(enumerate(LEVELS))):
        if name.lower() in r: return i
    raise SystemExit(f"unknown realm {realm!r}")

def source(p):
    k = p.get("kind")
    if k == "frames":
        ch = p.get("chosen")
        if not ch: return None
        return f"Official channel, EP{ch['ep']}" if ch["src"] == "vid" else f"Preview of EP{ch['ep']}"
    if k == "pool": return "Fan wiki"
    if k == "ak": return f"Full episode, EP{p['ep']}"
    if k == "keep": return "Official channel"
    return None


def main():
    roster = json.loads((ROOT / "data/characters/roster.json").read_text())
    picks = json.loads((ROOT / "data/characters/picks.json").read_text())
    out = []
    for c in roster:
        looks = []
        for li, l in enumerate(c["looks"]):
            img = ROOT / f"site/img/cast/{c['id']}-{li}.jpg"
            p = picks.get(c["id"], {}).get(str(li), {})
            looks.append({k: v for k, v in {"ep": l["ep"], "label": l["label"], "desc": l.get("desc"), "why": l.get("why"),
                          "img": f"img/cast/{c['id']}-{li}.jpg" if img.exists() and source(p) else None,
                          "src": source(p) if img.exists() else None}.items() if v})
        power = [{k: v for k, v in {"ep": p["ep"], "realm": p["realm"], "lvl": level(p["realm"], p.get("detail")),
                  "detail": p.get("detail"), "conf": p.get("conf")}.items() if v is not None} for p in c["power"]]
        out.append({k: v for k, v in {**{k: c.get(k) for k in ("id", "name", "zh", "aka", "wiki", "ep", "mentionEp", "group", "side", "intro")},
                    "power": power, "looks": looks, "arc": c.get("arc", [])}.items() if v not in (None, [], "")})

    js = "// Built by scripts/build_cast.py from data/characters/. Do not edit by hand.\n"
    js += "window.CAST_LEVELS = " + json.dumps(LEVELS) + ";\n"
    js += "window.CAST = " + json.dumps(out, ensure_ascii=False, separators=(",", ":")) + ";\n"
    (ROOT / "site/data/cast.js").write_text(js)
    n = sum(1 for c in out for l in c["looks"]); m = sum(1 for c in out for l in c["looks"] if "img" in l)
    print(len(out), "characters,", m, "/", n, "looks with pictures")


if __name__ == "__main__":
    main()
