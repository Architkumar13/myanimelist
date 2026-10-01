"""Characters who appear in the donghua -> site/data/cast.js.

With data/characters/roster.json present (the subtitle-checked cast), builds from that: realms by episode,
looks, and portraits from site/img/cast/{id}-{look}.jpg when they exist (tools/portraits.py), else the wiki picture.
Without it, falls back to the fan wiki: site/data/wiki.js plus cache/wiki/*Cultivation.json for realm-by-episode rows.

  build_cast.py          build site/data/cast.js
  build_cast.py --seed   write data/characters/roster.json from the wiki, as a starting point to correct
"""
import sys
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
from wikiapi import safe_name

LEVELS = ["Tempered Body", "Earthly Yuan", "Heavenly Yuan", "Yuan Dan", "Form Creation", "Qi Creation",
          "Manifestation", "Nirvana", "Profound Life", "Profound Death", "Reincarnation", "Ancestor"]
NOVEL = 9999


def level_of(realm):
    """Realm text -> rung of LEVELS. "Half-step X" counts as the rung below X."""
    r = (realm or "").lower().replace("-", " ")
    half = "half step" in r or "halfway" in r or "quasi" in r
    for name, i in (
        ("ancestor", 11), ("reincarnation", 10), ("samsara", 10), ("profound death", 9), ("profound life", 8),
        ("nirvana", 7), ("manifestation", 6), ("creation and transformation", 6), ("qi creation", 5),
        ("form creation", 4), ("yuan dan", 3), ("heavenly yuan", 2), ("earthly yuan", 1), ("tempered body", 0),
        ("body tempering", 0),
    ):
        if name in r:
            return max(i - 1, 0) if half else i
    return None


def season_ep(season, n):
    """Seasons are 12 episodes each and the site numbers straight through: S2 EP5 = EP17."""
    return (int(season) - 1) * 12 + int(n)


def slug(name):
    s = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    return s or "character"


def first_ep_line(line):
    m = re.search(r"\(EP\s*(\d+)\)", line, re.I)
    if m:
        return int(m.group(1))
    m = re.search(r"\b(?:Season|S)\s*(\d)\W*(?:Episode|EP)\.?\s*(\d+)", line, re.I)
    if m:
        return season_ep(m.group(1), m.group(2))
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


def from_wiki():
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
    return cast


def from_roster(roster):
    cast = []
    for c in roster:
        looks = []
        for li, l in enumerate(c["looks"]):
            look = {k: v for k, v in l.items() if k in ("ep", "label", "desc", "why")}
            if (ROOT / f"site/img/cast/{c['id']}-{li}.jpg").exists():
                look.update(img=f"img/cast/{c['id']}-{li}.jpg", src=l.get("src", "Full episode"))
            elif l.get("img"):
                look.update(img=l["img"], src="Fan wiki")
            looks.append(look)
        power = [{k: v for k, v in {**p, "lvl": level_of(p["realm"])}.items() if v is not None} for p in c["power"]]
        cast.append({**{k: c[k] for k in c if k not in ("looks", "power", "card", "cardType")}, "power": power, "looks": looks})
    return cast


def main():
    rf = ROOT / "data/characters/roster.json"
    if "--seed" in sys.argv:
        seed = [{**c, "power": [{k: v for k, v in p.items() if k != "lvl"} for p in c["power"]]} for c in from_wiki()]
        rf.parent.mkdir(parents=True, exist_ok=True)
        rf.write_text(json.dumps(seed, ensure_ascii=False, indent=2))
        print(len(seed), "characters seeded into", rf)
        return
    cast = from_roster(json.loads(rf.read_text())) if rf.exists() else from_wiki()
    js = "// Built by scripts/build_cast.py. Do not edit by hand.\n"
    js += "window.CAST_LEVELS = " + json.dumps(LEVELS) + ";\n"
    js += "window.CAST = " + json.dumps(cast, ensure_ascii=False, separators=(",", ":")) + ";\n"
    (ROOT / "site/data/cast.js").write_text(js)
    print(len(cast), "donghua characters")


if __name__ == "__main__":
    main()
