"""Start (or refresh) data/characters/roster.json from the subtitle reviews in data/episodes/review/.

  python3 scripts/roster_from_reviews.py            print who is in the reviews (episodes seen, first EP, realms)
  python3 scripts/roster_from_reviews.py --write    add people seen in >= MIN_EPS episodes to roster.json

What it takes from the reviews: first on-screen episode (earliest `cast` entry), every stated realm with its episode
and quote, and the name-card time of the first appearance (kept as `card` for the picture tools). From the fan wiki
(site/data/wiki.js) it takes the Chinese name, the wiki title and the picture, when the name matches.
Entries already in roster.json that have an intro were finished by hand and are left alone; it only adds new people
(seen in >= MIN_EPS episodes). For realms in new episodes use tools/apply_review.py. ALIASES merges ids that different reviewers spelled differently.
"""
import json, pathlib, re, sys
from collections import defaultdict

ROOT = pathlib.Path(__file__).resolve().parent.parent
REVIEWS = ROOT / "data" / "episodes" / "review"
ROSTER = ROOT / "data" / "characters" / "roster.json"
MIN_EPS = 3

# id spelled by some reviewer -> the id to keep
ALIASES = {
    "chief-mo": "mo-tian-xing",
    "gu-xun-er": "xun-er", "xuner": "xun-er", "xun-er-gu": "xun-er",
    "yao-chen": "yao-lao", "mr-yao": "yao-lao",
    "yun-zhi": "yun-yun", "queen-medusa": "medusa", "cai-lin": "medusa",
    "ye-xin-lan": "xin-lan",
    "feng-xian": "feng-zun-zhe", "tian-huo-zun-zhe": "yao-tian-huo",
    "little-yi": "xiao-yi", "hun-tian-di": "hun-tiandi",
    "mr-ling": "ling-ying", "tengshan": "mite-er-tengshan", "uncle-xuan": "xuan-kong-zi",
    "head-of-the-nalan-clan": "nalan-jie",  # Xun Er's guard: "Mr. Ling" from EP70, Ling Ying when first met in EP60
}
# The same id meaning different people in different episodes: (id, first EP, last EP) -> id to keep
BY_EP = {("elder-feng", 169, 9999): "feng-zun-zhe", ("elder-lei", 169, 9999): "lei-zun-zhe",
         ("huang-tian", 0, 199): "huang-tian-ground-spirit-gate"}
# Not people (flames have their own page) or two people under one id: never added to the roster
SKIP = {"three-thousand-burning-flame", "purifying-demonic-lotus-flame", "void-devouring-flame", "fallen-heart-flame",
        "elders-shitou-and-xiongtou"}


def canon(cid, ep=0):
    cid = (cid or "").strip().lower()
    for (old, lo, hi), new in BY_EP.items():
        if cid == old and lo <= ep <= hi:
            return new
    return ALIASES.get(cid, cid)


def wiki_index():
    f = ROOT / "site" / "data" / "wiki.js"
    if not f.exists():
        return {}
    raw = f.read_text().split("window.WIKI = ", 1)[1].rstrip().rstrip(";")
    w = json.loads(raw)
    out = {}
    for title, e in w["entries"].items():
        if e.get("kind") == "character":
            out[title.lower()] = e
    for a, t in w["alias"].items():
        if t.lower() in out:
            out.setdefault(a.lower(), out[t.lower()])
    return out


def gather():
    people = defaultdict(lambda: {"names": defaultdict(int), "eps": set(), "power": [], "card": None, "first": None})
    for f in sorted(REVIEWS.glob("ep*.json"), key=lambda f: int(f.stem[2:])):
        r = json.loads(f.read_text())
        n = r["ep"]
        for c in r.get("cast", []):
            cid = canon(c.get("id") or re.sub(r"[^a-z0-9]+", "-", c.get("name", "").lower()).strip("-"), n)
            if not cid or cid in SKIP:
                continue
            p = people[cid]
            p["names"][c.get("name", cid)] += 1
            p["eps"].add(n)
            if p["first"] is None or n < p["first"]:
                p["first"] = n
                p["card"] = c.get("card")
            if c.get("realm"):
                p["power"].append({"ep": n, "realm": c["realm"], "quote": c.get("quote", "")})
    return people


def main():
    people = gather()
    wiki = wiki_index()
    rows = sorted(people.items(), key=lambda kv: (kv[1]["first"], kv[0]))
    if "--write" not in sys.argv:
        for cid, p in rows:
            name = max(p["names"], key=p["names"].get)
            realms = "; ".join(f"EP{x['ep']} {x['realm']}" for x in p["power"])
            print(f"{len(p['eps']):3d} eps  EP{p['first']:<4} {cid:32s} {name:28s} {realms[:90]}")
        return
    roster = json.loads(ROSTER.read_text()) if ROSTER.exists() else []
    have = {c["id"]: c for c in roster}
    for cid, p in rows:
        if len(p["eps"]) < MIN_EPS and cid not in have:
            continue
        name = max(p["names"], key=p["names"].get)
        w = wiki.get(name.lower()) or {}
        c = have.get(cid)
        if not c:
            c = {"id": cid, "name": name, "zh": (w.get("facts") or {}).get("zh", ""), "aka": [], "wiki": w.get("title"),
                 "ep": p["first"], "mentionEp": None, "group": "", "side": "neutral", "intro": "", "power": [],
                 "looks": [{"ep": p["first"], "label": "First seen", "desc": "", "why": ""}]}
            if w.get("img"):
                c["looks"][0]["img"] = w["img"]
            roster.append(c)
            have[cid] = c
        if cid in have and c.get("intro"):
            continue  # written by hand: its ep, card and power rows were checked against the episodes
        c["ep"] = min(c.get("ep") or p["first"], p["first"])
        if p["card"] is not None:
            c["card"] = p["card"]
        for x in p["power"]:
            c["power"].append({"ep": x["ep"], "realm": x["realm"], "detail": x["quote"][:160], "conf": "high"})
        c["power"].sort(key=lambda x: x["ep"])
    roster.sort(key=lambda c: (c["ep"], c["id"]))
    ROSTER.parent.mkdir(parents=True, exist_ok=True)
    ROSTER.write_text(json.dumps(roster, ensure_ascii=False, indent=2))
    print(len(roster), "people in", ROSTER)


if __name__ == "__main__":
    main()
