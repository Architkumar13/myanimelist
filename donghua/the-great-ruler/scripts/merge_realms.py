"""Rebuild every character's realm-by-episode timeline in data/characters/roster.json.

Sources, strongest first:
  1. subtitles: realm statements in data/episodes/review/ep*.json (cast[].realm), read off the episodes themselves
  2. fan wiki: data/characters/wiki-realms.json (the donghua column of the wiki's cultivation tables)
Rules:
  - A later entry never shows a lower realm than an earlier one. Backwards statements are dropped and printed
    (usually suppression, disguise or an OCR slip).
  - Where both sources speak about the same episode, the subtitles win.
  - Characters listed in data/characters/growth.json under "fixed" (elders, teachers, beasts: people whose realm doesn't
    change in the show) show their first known realm from their first appearance, marked "stated in EP N".
    Everyone else, and anyone still growing, only shows a realm from the episode it's stated.
  - data/characters/realm-overrides.json adds hand-checked entries (e.g. "she was already at X when she arrived").
  - Episodes in between carry the last known realm forward (the site does that when it reads the timeline).

  python3 scripts/merge_realms.py
"""
import json, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))
from build_cast import level_of

PHASES = ["initial", "middle", "late", "peak"]


STAGES = [("half-step sovereign", 7), ("half step sovereign", 7), ("great ruler", 12), ("ruler", 11), ("heavenly sovereign", 10), ("earth sovereign", 9),
          ("disaster", 7), ("sovereign", 8), ("heavenly completion", 6), ("heavenly transformation", 5), ("heavenly fusion", 4),
          ("spiritual rotation", 2), ("spiritual ring", 2), ("spiritual wheel", 2), ("spiritual movement", 1),
          ("divine soul", 3), ("spirit", 3), ("sensing", 0)]


def rank(realm):
    """Sortable (stage, phase) so phases inside one stage compare too."""
    low0 = re.sub(r"\(.*?\)", "", realm.lower())
    lv = next((i for name, i in STAGES if name in low0), None)
    if lv is None: lv = level_of(realm)
    if lv is None: return None
    low = re.sub(r"\(.*?\)", "", realm.lower())
    ph = next((i for i, p in reversed(list(enumerate(PHASES))) if p in low), -1)  # "Peak of Late Phase" is peak
    g = re.search(r"(\d)(?:st|nd|rd|th)?\s*grade|grade\s*(\d)", low)  # Sovereign grades
    sub = int(g.group(1) or g.group(2)) if g else 0
    if lv == 7:  # the three disasters come in order: body, energy, spirit
        sub = 3 if "half-step" in low else 2 if "spirit disaster" in low else 1 if "spiritual energy" in low else 0 if "human body" in low else 0
    return (lv, sub, ph)


def main():
    rf = ROOT / "data/characters/roster.json"
    roster = json.loads(rf.read_text())
    wiki = json.loads((ROOT / "data/characters/wiki-realms.json").read_text())
    gf = ROOT / "data/characters/growth.json"
    fixed = set(json.loads(gf.read_text()).get("fixed", [])) if gf.exists() else set()
    of = ROOT / "data/characters/realm-overrides.json"   # hand-checked facts, e.g. a realm stated in retrospect
    overrides = json.loads(of.read_text()) if of.exists() else {}

    subs = {}
    for f in sorted((ROOT / "data/episodes/review").glob("ep*.json"), key=lambda f: int(f.stem[2:])):
        r = json.loads(f.read_text())
        for m in r.get("cast", []):
            if m.get("id") and m.get("realm") and "implied" not in m["realm"].lower():
                realm, aside = m["realm"].strip(), re.findall(r"\(([^)]*)\)", m["realm"])
                realm = re.sub(r"\s*\([^)]*\)", "", realm).strip()
                realm = re.sub(r"(?i)^(just below|almost( at)?|nearly|quasi[- ]?)\s*sovereign.*$", "Half-step Sovereign", realm)
                subs.setdefault(m["id"], []).append({"ep": r["ep"], "realm": realm, "detail": "; ".join(aside) or "stated on screen",
                                                     "quote": m.get("quote"), "conf": "high"})

    dropped = []
    for c in roster:
        pts = [dict(p, src="subs") for p in subs.get(c["id"], [])]
        sub_eps = {p["ep"] for p in pts}
        for w in wiki.get(c.get("wiki") or c["name"], []):
            if w["ep"] not in sub_eps:
                pts.append({"ep": w["ep"], "realm": w["realm"], "detail": "fan wiki's donghua column", "conf": "medium", "src": "wiki"})
        for o in overrides.get(c["id"], []):
            pts.append({**o, "src": "override", "conf": o.get("conf", "high")})
        pts = [p for p in pts if rank(p["realm"])]
        pts.sort(key=lambda p: (p["ep"], {"override": 0, "subs": 1, "wiki": 2}[p["src"]]))
        timeline, best = [], None
        for p in pts:
            r = rank(p["realm"])
            if best:
                # same stage said again without the phase/grade we already know: nothing new
                vague = r[0] == best[0] and r <= best and ((r[2] == -1 and best[2] != -1) or (r[1] == 0 and best[1] > 0))
                if vague or r == best: continue
                if r < best and p["src"] in ("subs", "override") and any(t["src"] == "wiki" and rank(t["realm"]) > r for t in timeline):
                    # the episode itself contradicts an earlier wiki claim: drop the wiki claim, not the episode
                    for t in [t for t in timeline if t["src"] == "wiki" and rank(t["realm"]) > r]:
                        dropped.append((c["id"], t["ep"], t["realm"], "wiki, contradicted by EP%s" % p["ep"]))
                    timeline = [t for t in timeline if not (t["src"] == "wiki" and rank(t["realm"]) > r)]
                    best = max((rank(t["realm"]) for t in timeline), default=None)
                    if best and r <= best: continue
                elif r < best:
                    dropped.append((c["id"], p["ep"], p["realm"], p["src"])); continue
            if timeline and timeline[-1]["ep"] == p["ep"]:
                timeline[-1] = p if r > rank(timeline[-1]["realm"]) else timeline[-1]
            else:
                timeline.append(p)
            best = r if not best else max(best, r)
        first = c["ep"]
        if timeline and timeline[0]["ep"] > first:
            if c["id"] in fixed:  # their realm doesn't change, so show it from the start
                t0 = timeline[0]
                timeline[0] = {"ep": first, "realm": t0["realm"], "detail": f"stated in EP{t0['ep']}", "conf": "medium"}
            else:
                timeline.insert(0, {"ep": first, "realm": "Unknown"})
        c["power"] = [{k: v for k, v in p.items() if k in ("ep", "realm", "detail", "conf", "quote") and v} for p in timeline] \
            or [{"ep": first, "realm": "Unknown"}]
    rf.write_text(json.dumps(roster, ensure_ascii=False, indent=2))
    known = sum(1 for c in roster if any(p["realm"] != "Unknown" for p in c["power"]))
    print(f"{known}/{len(roster)} characters have a realm")
    for d in dropped: print("dropped (would go backwards):", *d)


if __name__ == "__main__":
    main()
