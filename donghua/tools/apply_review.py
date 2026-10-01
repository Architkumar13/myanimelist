"""Second half of the weekly update: turn review files into site data for one show.

  apply_review.py SHOW 184 185     (or --all for every review file)

- Copies each review's title/summary/events/... into <show>/data/episodes/from-reviews.json. That file sorts after
  the older episode files, so it wins when both cover an episode.
- Adds realms stated on screen to <show>/data/characters/roster.json. Skips any that would move someone backwards
  (printed so you can check: often a disguise or suppression).
- Moves a first appearance earlier when a review marks someone "first" in an earlier episode.
- Lists people with a name card who aren't in the roster yet, as candidates to add (with the card time for a picture).
Then run the show's build_episodes.py and build_cast.py.
"""
import importlib.util, json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from common import show

KEEP = ("ep", "title", "summary", "events", "introduced", "cultivation", "confidence")


def level_fn(cfg):
    """The show's own realm ladder, from its scripts/build_cast.py (level or level_of)."""
    spec = importlib.util.spec_from_file_location("bc", cfg["root"] / "scripts" / "build_cast.py")
    sys.path.insert(0, str(cfg["root"] / "scripts"))
    mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    if hasattr(mod, "level"):
        def f(r):
            try: return mod.level(r, None)
            except SystemExit: return None
        return f
    return mod.level_of


def main():
    sid, *args = sys.argv[1:]
    cfg = show(sid)
    rdir = cfg["root"] / "data" / "episodes" / "review"
    files = sorted(rdir.glob("ep*.json"), key=lambda f: int(f.stem[2:])) if args == ["--all"] else [rdir / f"ep{int(a)}.json" for a in args]
    reviews = [json.loads(f.read_text()) for f in files]

    # episodes
    ef = cfg["root"] / "data" / "episodes" / "from-reviews.json"
    eps = {e["ep"]: e for e in (json.loads(ef.read_text()) if ef.exists() else [])}
    for r in reviews:
        eps[r["ep"]] = {k: r.get(k) for k in KEEP if r.get(k) not in (None, "", [])} | {"source": "AnimeKhor subtitles"}
    ef.write_text(json.dumps([eps[k] for k in sorted(eps)], ensure_ascii=False, indent=1))

    # roster
    rf = cfg["root"] / "data" / "characters" / "roster.json"
    if not rf.exists():
        print(f"{len(reviews)} episodes written; no roster for this show yet"); return
    roster = json.loads(rf.read_text()); R = {c["id"]: c for c in roster}
    level = level_fn(cfg)
    added, moved, skipped, new = 0, [], [], []
    for r in reviews:
        ep = r["ep"]
        for m in r.get("cast", []):
            cid = m.get("id")
            if cid not in R:
                if m.get("card") or m.get("first"): new.append((ep, m.get("name"), m.get("card"), m.get("realm")))
                continue
            c = R[cid]
            if m.get("first") and ep < c["ep"]:
                moved.append((cid, c["ep"], ep)); c["ep"] = ep
                if c["looks"] and c["looks"][0]["ep"] > ep: c["looks"][0]["ep"] = ep
                if c["power"] and c["power"][0]["ep"] > ep: c["power"][0]["ep"] = ep
            realm = m.get("realm")
            if not realm or "implied" in realm.lower(): continue
            new_l = level(realm)
            if new_l is None: continue
            known = [level(p["realm"]) for p in c["power"] if p["ep"] <= ep and p["realm"] != "Unknown"]
            known = [k for k in known if k is not None]
            if known and new_l < known[-1]:
                skipped.append((cid, ep, realm)); continue
            if any(p["ep"] == ep and p["realm"] == realm for p in c["power"]): continue
            c["power"] = [p for p in c["power"] if not (p["ep"] == ep and p.get("conf") != "high")]
            c["power"].append({"ep": ep, "realm": realm.replace("(", "").replace(")", ""), "detail": "stated on screen", "conf": "high"})
            c["power"].sort(key=lambda p: p["ep"]); added += 1
    roster.sort(key=lambda c: c["ep"])
    rf.write_text(json.dumps(roster, ensure_ascii=False, indent=2))
    print(f"{len(reviews)} episodes written; {added} realms added")
    for x in moved: print("first appearance moved:", *x)
    for x in skipped: print("skipped (would go backwards):", *x)
    for x in new: print("not in roster yet: EP%s %s card=%s realm=%s" % x)


if __name__ == "__main__":
    main()
