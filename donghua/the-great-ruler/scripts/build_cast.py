"""Characters who appear in the donghua -> site/data/cast.js.

Reads site/data/wiki.js (run build_wiki.py first) and cache/wiki/*Cultivation.json
for realm-by-episode rows. Final novel realms are not copied onto episode 1.
"""
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
from wikiapi import safe_name

LEVELS = ["Sensing", "Spiritual Movement", "Spiritual Rotation", "Spirit", "Heavenly Fusion",
          "Heavenly Transformation", "Heavenly Completion", "Three Disasters", "Sovereign",
          "Earth Sovereign", "Heavenly Sovereign", "Ruler", "Great Ruler"]
NOVEL = 9999


def level_of(realm):
    r = (realm or "").lower()
    for name, i in (
        ("great ruler", 12), ("ruler", 11), ("heavenly sovereign", 10), ("earth sovereign", 9),
        ("human body", 7), ("spiritual energy disaster", 7), ("spirit disaster", 7), ("three sovereign", 7),
        ("heavenly completion", 6), ("heavenly transformation", 5), ("heavenly fusion", 4),
        ("spirit stage", 3), ("divine soul", 3), ("spiritual rotation", 2), ("spiritual wheel", 2),
        ("spiritual movement", 1), ("sensing", 0), ("sovereign", 8),
    ):
        if name in r:
            return i
    return None


def slug(name):
    s = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    return s or "character"


def first_ep_line(line):
    m = re.search(r"iQIYI:\s*EP\s*(\d+)|\(EP\s*(\d+)\)", line, re.I)
    if m:
        return int(m.group(1) or m.group(2))
    m = re.search(r"(?:Season|S)\s*2\W*(?:Episode|EP)\.?\s*(\d+)", line, re.I)
    if m:
        return 52 + int(m.group(1))
    m = re.search(r"(?:Season|S)\s*1\W*(?:Episode|EP)\.?\s*(\d+)", line, re.I)
    if m:
        return int(m.group(1))
    m = re.search(r"\bEP\s*(\d+)\b", line, re.I)
    return int(m.group(1)) if m else None


def timeline(wikitext):
    stage, points = None, []
    for line in wikitext.splitlines():
        if "colspan" in line.lower() or line.strip().startswith("!"):
            m = re.search(r"\[\[([^|\]]+?)(?:\|[^\]]+)?\]\]", line)
            if m and "Stage" in m.group(1):
                stage = re.sub(r"\s*Stage$", "", m.group(1))
        if not stage or "iq.com" in line or "http" in line:
            continue
        ep = first_ep_line(line)
        if ep and ep <= 120:
            phase = ""
            pm = re.search(r"(Initial|Middle|Late|Quasi)[^|\n]*", line)
            if pm:
                phase = pm.group(0).strip()
            label = f"{stage}" + (f", {phase}" if phase and phase.lower() not in stage.lower() else "")
            points.append((ep, label))
    # first time each (ep, label) pair, in order
    seen, out = set(), []
    for ep, label in points:
        if (ep, label) in seen:
            continue
        seen.add((ep, label))
        out.append({"ep": ep, "realm": label, "lvl": level_of(label), "conf": "high"})
    return out


def main():
    raw = (ROOT / "site/data/wiki.js").read_text().split("window.WIKI = ", 1)[1].rstrip()
    if raw.endswith(";"):
        raw = raw[:-1]
    wiki = json.loads(raw)
    cache = ROOT / "cache/wiki"
    cast = []
    used = set()
    for title, e in wiki["entries"].items():
        if e.get("kind") != "character":
            continue
        ep = e.get("ep")
        if not isinstance(ep, int) or ep >= NOVEL or ep > 120:
            continue
        facts = e.get("facts") or {}
        sid = slug(title)
        n = 2
        while sid in used:
            sid = f"{slug(title)}-{n}"
            n += 1
        used.add(sid)
        tags = e.get("tags") or []
        if "Antagonists" in tags or "Enemies" in tags:
            side = "enemy"
        elif "Main Characters" in tags:
            side = "ally"
        else:
            side = "neutral"
        group = "Donghua"
        aff = facts.get("affiliations") or []
        if aff:
            group = re.sub(r"\s+", " ", aff[0])[:48]
        cult = cache / f"{safe_name(title)}_Cultivation.json"
        power = timeline(json.loads(cult.read_text())["wikitext"]) if cult.exists() else []
        if not power:
            power = [{"ep": ep, "realm": "Unknown"}]
        blurb = ""
        for b in e.get("blocks") or []:
            if b.get("t") == "p" and b.get("x"):
                blurb = re.sub(r"⟦([^|⟧]*)\|([^⟧]*)⟧", r"\2", b["x"])
                blurb = re.sub(r"\s+", " ", blurb)[:220]
                break
        look = {"ep": ep, "label": "As introduced"}
        if e.get("img"):
            look["img"] = e["img"]
            look["src"] = "Fan wiki"
        cast.append({
            "id": sid, "name": title, "zh": facts.get("zh") or "", "aka": (facts.get("aliases") or [])[:6],
            "wiki": title, "ep": ep, "group": group, "side": side,
            "intro": blurb, "power": power, "looks": [look],
        })
    cast.sort(key=lambda c: (c["ep"], c["name"]))
    js = "// Built by scripts/build_cast.py from the fan wiki. Do not edit by hand.\n"
    js += "window.CAST_LEVELS = " + json.dumps(LEVELS) + ";\n"
    js += "window.CAST = " + json.dumps(cast, ensure_ascii=False, separators=(",", ":")) + ";\n"
    (ROOT / "site/data/cast.js").write_text(js)
    print(len(cast), "donghua characters")


if __name__ == "__main__":
    main()
