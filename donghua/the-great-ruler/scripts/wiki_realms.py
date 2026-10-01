"""Realm-by-episode from the fan wiki's <Name>_Cultivation pages (the donghua column of the Spiritual Energy table).

Each table row is one phase: Tier | Novel chapter | Manhua | Donghua episode | ... The donghua cell reads
"S1 EP13", "S2 EP5" or "EP70"; season 2 is numbered straight on from 52 episodes of season 1. Rows with no
donghua episode are novel-only and are left out, so nothing from later in the story leaks into early episodes.

  python3 scripts/wiki_realms.py            -> data/characters/wiki-realms.json {page title: [{ep, realm}]}
"""
import json, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
S1 = 52


def donghua_ep(cell):
    cell = re.sub(r"\[https?://\S+\s+([^\]]*)\]", r"\1", cell)
    m = re.search(r"\(EP\s*(\d+)\)", cell) or re.search(r"(?<![\w])EP\s*(\d+)(?!\s*\))", cell)
    s = re.search(r"S(?:eason)?\s*(\d)\s*(?:EP|Episode)\s*(\d+)", cell, re.I)
    if re.search(r"\(EP\s*\d+\)", cell): return int(re.search(r"\(EP\s*(\d+)\)", cell).group(1))
    if s: return int(s.group(2)) + (S1 if s.group(1) == "2" else 0)
    return int(m.group(1)) if m else None


def parse(wikitext):
    text = wikitext.split("Spiritual Energy Cultivation", 1)[-1] if "Spiritual Energy Cultivation" in wikitext else wikitext
    text = re.split(r"\n==[^=]", text, maxsplit=1)[0]  # this section only
    stage, out = None, []
    for row in text.split("\n|-"):
        lines = [l for l in row.strip().splitlines() if l.strip()]
        if not lines: continue
        head = " ".join(l for l in lines if l.lstrip().startswith("!"))
        m = re.search(r"\[\[([^|\]]*?Stage)[^\]]*\]\]", head) or re.search(r"'''\d*\.?\s*([A-Z][\w\s-]*Stage)'''", head)
        if m and "colspan" in head:
            stage = re.sub(r"\s*Stage$", "", m.group(1).strip()); continue
        if not stage: continue
        cells = [re.sub(r'^\|\s*(rowspan="\d+"\s*\|)?', "", l.strip()) for l in lines if l.strip().startswith("|")]
        if len(cells) < 3: continue
        tier = re.sub(r"<[^>]+>|'''|\[\[|\]\]", "", cells[0]).strip()
        # the donghua cell is the first one after the novel/manhua cells that names an episode
        ep = next((donghua_ep(c) for c in cells[1:5] if re.search(r"EP\s*\d+|Episode\s*\d+", c, re.I)), None)
        if not ep or ep > 200: continue
        phase = tier if re.search(r"initial|early|middle|late|peak|quasi|half|complet|perfect", tier, re.I) else ""
        out.append({"ep": ep, "realm": stage + (f", {phase}" if phase else "")})
    out.sort(key=lambda p: p["ep"])
    return out


def main():
    res = {}
    for f in sorted((ROOT / "cache" / "wiki").glob("*_Cultivation.json")):
        page = json.loads(f.read_text())
        rows = parse(page.get("wikitext", ""))
        if rows: res[page["title"].rsplit("/", 1)[0].replace(" Cultivation", "")] = rows
    (ROOT / "data" / "characters" / "wiki-realms.json").write_text(json.dumps(res, ensure_ascii=False, indent=1))
    print(len(res), "characters with donghua realms")


if __name__ == "__main__":
    main()
