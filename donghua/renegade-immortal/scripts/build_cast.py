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

LEVELS = ["Mortal", "Qi Condensation", "Foundation Establishment", "Core Formation", "Nascent Soul",
          "Soul Formation", "Soul Transformation", "Ascendant", "Illusory Yin", "Corporeal Yang",
          "Nirvana Scryer", "Nirvana Cleanser", "Nirvana Shatterer", "Nirvana Void", "Spirit Void", "Arcane Void",
          "Void Tribulant", "Heaven Trampling"]
NOVEL = 9999


LADDER_NAMES = (
    (("heaven trampling", "踏天"), 17), (("void tribulant", "arcane tribulant", "空劫"), 16),
    (("arcane void", "空玄"), 15), (("spirit void", "空灵"), 14), (("nirvana void", "空涅"), 13),
    (("nirvana shatterer", "碎涅"), 12), (("nirvana cleanser", "净涅"), 11), (("nirvana scryer", "窥涅"), 10),
    (("corporeal yang", "materialize yang", "yang solid", "阳实"), 9), (("illusory yin", "yin void", "阴虚"), 8),
    (("ascendant", "ascendent", "问鼎"), 7),
    (("soul transformation", "infant transformation", "nascent transformation", "婴变"), 6),
    (("soul formation", "deity transformation", "spirit transformation", "化神"), 5),
    (("nascent soul", "元婴"), 4), (("core formation", "golden core", "结丹"), 3),
    (("foundation establishment", "foundation building", "筑基"), 2),
    (("qi condensation", "condensing qi", "凝气"), 1), (("mortal", "凡人"), 0),
)


def level_of(realm):
    """Realm text (English as the reviews write it, or 汉字) -> index into LEVELS, or None.
    When the text names several realms ("Illusory Yin, fallen from Corporeal Yang"), the first one named wins."""
    r = (realm or "").lower()
    best = None
    for names, i in LADDER_NAMES:
        for n in names:
            m = re.search(r"(?<![a-z])" + re.escape(n) + r"(?![a-z])", r)
            if m and (best is None or m.start() < best[0]):
                best = (m.start(), i)
    return best[1] if best else None


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
