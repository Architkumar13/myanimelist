"""First half of the weekly update: find new episodes, fetch their subtitles, list their name cards.

  new_episode.py SHOW            every episode AnimeKhor has that the site doesn't
  new_episode.py SHOW 184 185    just these

For each episode it writes <show>/cache/animekhor/ep{N}.cards.json: every bracketed name card with its time, matched
to roster ids where the name is known. Then a review gets written (see REVIEW.md) and apply_review.py takes it from there.
"""
import json, pathlib, re, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import animekhor
from common import show


def site_last(cfg):
    last = 0
    for f in (cfg["root"] / "data" / "episodes").glob("*.json"):
        for e in json.loads(f.read_text()):
            last = max(last, e.get("epEnd", e["ep"]))
    for f in (cfg["root"] / "data" / "episodes" / "review").glob("ep*.json"):
        last = max(last, json.loads(f.read_text())["ep"])
    return last


def cues(srt):
    out = []
    for block in srt.read_text(encoding="utf-8", errors="ignore").split("\n\n"):
        m = re.search(r"(\d\d):(\d\d):(\d\d)[,.](\d+) -->", block)
        if m:
            t = int(m[1]) * 3600 + int(m[2]) * 60 + int(m[3]) + int(m[4]) / 1000
            text = " ".join(l for l in block.splitlines()[2:] if l.strip())
            out.append((t, text))
    return out


def cards(cfg, n, srt):
    roster_f = cfg["root"] / "data" / "characters" / "roster.json"
    roster = json.loads(roster_f.read_text()) if roster_f.exists() else []
    names = sorted(((a.lower(), c["id"]) for c in roster for a in [c["name"], *c.get("aka", [])] if a and len(a) > 2), key=lambda x: -len(x[0]))
    found = []
    for t, text in cues(srt):
        for card in re.findall(r"\[([^\]]{3,160})\]", text):
            low = card.lower()
            if "pratinjau" in low or "animekhor" in low or "situs web" in low: continue
            hit = next((cid for nm, cid in names if nm in low), None)
            found.append({"t": round(t, 2), "card": card, "id": hit})
    (cfg["cache"] / f"ep{n}.cards.json").write_text(json.dumps(found, ensure_ascii=False, indent=1))
    return found


def main():
    sid, *eps = sys.argv[1:]
    cfg = show(sid)
    if eps:
        todo = [int(e) for e in eps]
    else:
        have, newest = site_last(cfg), animekhor.latest(cfg)
        todo = list(range(have + 1, newest + 1))
        print(f"site has up to EP{have}; AnimeKhor has EP{newest}")
    for n in todo:
        srt = animekhor.subs(cfg, n)
        found = cards(cfg, n, srt)
        known = sorted({c["id"] for c in found if c["id"]})
        unknown = [c["card"] for c in found if not c["id"]]
        print(f"EP{n}: {srt.name}; {len(found)} name cards; known: {', '.join(known) or '-'}")
        for u in unknown: print(f"    new or unmatched: [{u}]")
    if not todo: print("Nothing new.")


if __name__ == "__main__":
    main()
