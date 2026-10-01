"""Merge the episode summaries in data/episodes/*.json into site/data/episodes.js.

Usage: python3 scripts/build_episodes.py
Each JSON file is a list of {ep, [epEnd, arc], title, summary, events, introduced, cultivation, [confidence, source]}.
When two files cover the same episode, the one that isn't an arc entry wins.
"""
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "data" / "episodes"
OUT = ROOT / "site" / "data" / "episodes.js"
KEEP = ("ep", "epEnd", "arc", "title", "summary", "events", "introduced", "cultivation", "confidence")


def main():
    merged = {}
    # subtitle-checked reviews (from-reviews.json) always win over the older fan-wiki log
    for f in sorted(SRC.glob("*.json"), key=lambda f: (f.name == "from-reviews.json", f.name)):
        data = json.loads(f.read_text())
        if not isinstance(data, list):
            continue  # e.g. youtube.json, the episode -> video map
        for e in data:
            e = {k: e[k] for k in KEEP if e.get(k) not in (None, "", [], False)}
            key = e["ep"]
            if key in merged and not merged[key].get("arc") and e.get("arc"):
                continue
            merged[key] = e
    # A grouped entry (ep..epEnd) only keeps the episodes that have no single-episode entry of their own,
    # split into runs, so the guide never lists the same episode twice.
    singles = {k for k, e in merged.items() if not e.get("epEnd")}
    for k in [k for k, e in merged.items() if e.get("epEnd")]:
        e = merged.pop(k)
        run = []
        for n in range(e["ep"], e["epEnd"] + 2):
            if n <= e["epEnd"] and n not in singles:
                run.append(n); continue
            if run:
                part = dict(e, ep=run[0])
                if len(run) > 1: part["epEnd"] = run[-1]
                else: part.pop("epEnd", None)
                merged.setdefault(run[0], part)
            run = []
    episodes = [merged[k] for k in sorted(merged)]
    OUT.write_text("// Built by scripts/build_episodes.py from data/episodes/*.json.\nwindow.EPISODES = "
                   + json.dumps(episodes, ensure_ascii=False, separators=(",", ":")) + ";\n")
    single = sum(1 for e in episodes if not e.get("arc"))
    print(f"{len(episodes)} entries ({single} single episodes), last EP {episodes[-1].get('epEnd', episodes[-1]['ep'])}")


if __name__ == "__main__":
    main()
