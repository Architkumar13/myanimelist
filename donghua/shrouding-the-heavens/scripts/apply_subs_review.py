"""Apply what the EP51-183 subtitle review found (data/episodes/review/) to the character roster.

Run once after a review pass: python3 scripts/apply_subs_review.py
- Fixes first appearances the subtitles contradict.
- Adds realms that on-screen name cards state, unless they'd move someone backwards (those are printed instead).
- Rebuilds Ye Fan's realm timeline after EP50 from the subtitles.
"""
import glob
import json
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from build_cast import level  # noqa: E402

ROOT = pathlib.Path(__file__).resolve().parent.parent
RF = ROOT / "data/characters/roster.json"
roster = json.loads(RF.read_text())
R = {c["id"]: c for c in roster}

# id: (new first episode, mentioned-from episode or None)
FIRST = {
    "ji-hong": (53, None), "jiang-taixu": (70, 68), "wei-wei": (8, 7), "feng-fenghuang": (117, 111),
    "crow-daoist": (139, None), "yin-tiande": (162, 159), "zi-tianfeng": (167, None), "barbarian-king": (175, None),
    "thousand-armed-divine-demon": (161, 160), "lu-ya": (163, None),
}
for cid, (ep, mention) in FIRST.items():
    c = R[cid]
    old = c["ep"]
    c["ep"] = ep
    if mention: c["mentionEp"] = mention
    else: c.pop("mentionEp", None)
    # the first look and first realm entry move with the first appearance
    if c["looks"][0]["ep"] in (old, ep) or c["looks"][0]["ep"] < ep: c["looks"][0]["ep"] = ep
    if c["power"][0]["ep"] in (old,) or c["power"][0]["ep"] < ep: c["power"][0]["ep"] = ep
R["qi-lin"]["mentionEp"] = 146
R["qi-huoshui"]["aka"] = sorted(set(R["qi-huoshui"].get("aka", []) + ["Qi Qi", "Qi Xiaoniu"]))
R["elder-ji"]["aka"] = [a for a in R["elder-ji"].get("aka", []) if a.replace(" ", "").lower() != "jiyunfeng"]

jt = R["jiang-taixu"]
jt["looks"][0].update(label="Sealed Divine King", desc="Withered and sealed beneath Purple Mountain; captioned 'Jiang Taixu, God King'.")
jt["power"][0].update(realm="Unknown", detail="sealed under Purple Mountain; his name card calls him a God King", conf="high")
jt["arc"].insert(0, {"ep": 71, "text": "Teaches Ye Fan the Dou Secret from inside his seal under Purple Mountain."})

yf = R["ye-fan"]
for a in yf["arc"]:
    if a["ep"] == 123: a["text"] = "Exposes Hua Yunfei as the Ruthless Emperor's successor with the Myriad Changes Holy Technique."
    if a["ep"] == 158: a["ep"] = 157
S = "stated on screen"
yf["power"] = [p for p in yf["power"] if p["ep"] <= 50] + [
    {"ep": 52, "realm": "Divine Bridge", "detail": "his real realm is revealed at Taixuan", "conf": "high"},
    {"ep": 61, "realm": "Divine Bridge", "detail": "peak Divine Bridge", "conf": "high"},
    {"ep": 63, "realm": "Other Shore", "detail": "crosses to the Other Shore while re-forging his cauldron in the Fire Domain", "conf": "high"},
    {"ep": 74, "realm": "Dao Palace", "detail": "Wheel Sea perfected; enters the Dao Palace realm", "conf": "high"},
    {"ep": 83, "realm": "Dao Palace", "detail": "level 2, after grasping the Xihuang Scripture's Dao Palace volume", "conf": "high"},
    {"ep": 94, "realm": "Dao Palace", "detail": "level 3", "conf": "high"},
    {"ep": 101, "realm": "Dao Palace", "detail": "level 4 (Spleen)", "conf": "high"},
    {"ep": 106, "realm": "Dao Palace", "detail": "level 5: all five palaces", "conf": "high"},
    {"ep": 112, "realm": "Four Poles", "detail": "survives the Sacred Body's Four Poles tribulation", "conf": "high"},
    {"ep": 116, "realm": "Four Poles", "detail": "a Great Dao wound: half a year to live", "conf": "high"},
    {"ep": 120, "realm": "Four Poles", "detail": "level 2, Dao wounds healed", "conf": "high"},
    {"ep": 132, "realm": "Four Poles", "detail": "level 3, after mastering the Xing Secret", "conf": "high"},
    {"ep": 138, "realm": "Four Poles", "detail": "Great Perfection", "conf": "high"},
    {"ep": 143, "realm": "Dragon Transformation", "detail": "takes over Yan Yunluan's tribulation to break through", "conf": "high"},
    {"ep": 145, "realm": "Dragon Transformation", "detail": "2nd, then 3rd level", "conf": "high"},
    {"ep": 148, "realm": "Dragon Transformation", "detail": "4th level", "conf": "high"},
    {"ep": 151, "realm": "Dragon Transformation", "detail": "8th level, after a half-year skip", "conf": "high"},
    {"ep": 156, "realm": "Immortal Platform 1st Heaven", "detail": "a self-made tribulation burns out the Yin-Yang curse", "conf": "high"},
    {"ep": 159, "realm": "Immortal Platform 2nd Heaven", "detail": "Great Power, before a seven-year skip", "conf": "high"},
]

# Realms from on-screen name cards, per the review files.
added, skipped = 0, []
for f in sorted(glob.glob(str(ROOT / "data/episodes/review/ep*.json"))):
    rv = json.loads(open(f).read())
    for m in rv.get("cast", []):
        cid, realm = m.get("id"), m.get("realm")
        if cid not in R or not realm or cid == "ye-fan" or "implied" in realm.lower():
            continue
        c, ep = R[cid], rv["ep"]
        try:
            new = level(realm, None)
        except SystemExit:
            skipped.append((cid, ep, realm, "unrecognised")); continue
        if new is None: continue
        known = [level(p["realm"], None) for p in c["power"] if p["ep"] <= ep and p["realm"] != "Unknown"]
        known = [k for k in known if k is not None]
        cur = known[-1] if known else None
        if cur is not None and new < cur:
            skipped.append((cid, ep, realm, f"below current {cur}")); continue
        if cur == new and any(p["ep"] <= ep and p.get("conf") == "high" for p in c["power"]):
            continue
        if ep < c["ep"]:
            skipped.append((cid, ep, realm, "before first appearance")); continue
        # drop weaker guesses about the same moment
        c["power"] = [p for p in c["power"] if not (p["ep"] == ep and p.get("conf") != "high")]
        c["power"].append({"ep": ep, "realm": realm.replace("(", "").replace(")", ""), "detail": S, "conf": "high"})
        c["power"].sort(key=lambda p: p["ep"])
        added += 1

roster.sort(key=lambda c: c["ep"])
RF.write_text(json.dumps(roster, ensure_ascii=False, indent=2))
print(f"{added} realm entries added")
for s in skipped: print("skipped", *s)
