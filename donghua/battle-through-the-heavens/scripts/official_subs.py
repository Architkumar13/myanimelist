"""Official English subtitles for every episode, from the Yuewen Animation English YouTube channel.

AnimeKhor only carries a subtitle file for Season 5 from about EP160 (Indonesian); everything before that has burned-in
English only. The studio's own channel uploads every season with a real English track, mostly as compilations
("Full Version EP 70 - EP 82", "Season 3 Full Version"). Each episode inside a compilation opens with an
"[Episode N]" card in the subtitles, numbered continuously (S5 EP1 = EP70), which is the numbering the site uses.

  python3 official_subs.py list       refresh cache/youtube/channel.txt (the channel's uploads)
  python3 official_subs.py fetch      download the English track of every candidate upload -> cache/youtube/<id>.en.srt
  python3 official_subs.py split      cut them per episode -> cache/official/ep{N}.en.srt (+ sources.json)

Run with donghua/.tools/venv/bin/python (it needs yt-dlp). `split` prefers a single-episode upload, then the
compilation segment with the most lines. Fetch one video at a time: bursts of requests trip YouTube's bot check.

The newest uploads ("【4K】 EP 182") number Season 5 on its own and have no card, so SOURCES gives them S5 (69) + n.
"""
import json, pathlib, re, subprocess, sys, time

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parent
HUB = ROOT.parent
sys.path.insert(0, str(HUB / "tools"))
from common import YTDLP, YTDLP_OPTS, ENV  # noqa: E402

CHANNEL = "https://www.youtube.com/channel/UCoL2Zo2GEuMIsHVJyPwSyJg/videos"
YT = ROOT / "cache" / "youtube"
OUT = ROOT / "cache" / "official"
S5 = 69  # episodes before Season 5 (S1-S4 = EP1-56, Three-Year Agreement = EP57-69)

# (video id, what it covers, the episode it is) for single uploads; compilations have None and are cut at their
# "[Episode N]" cards. Later entries for the same episode are fallbacks (used only if nothing earlier has it).
SOURCES = [
    ("dpqsyufBpu4", "Full Version EP01-174 (its subtitles stop after EP55)", None),
    ("IBvcThadPDo", "Season 3 Full Version", None),
    ("NwJIaGMFVkQ", "Season 4 Full Version", None),
    ("pvleyZh7ND4", "Three-Year Agreement, EP57-69", None),
    ("bM3EjnvuYSM", "EP70-82", None), ("-KRe-oWSf0k", "EP83-95", None), ("3yvWAuVBX90", "EP96-108", None),
    ("vZnvDoHRpZ4", "EP109-121", None), ("xVXvhU32fBw", "Year Version II, EP122-174", None),
    ("iB8ZuHuAQXo", "Year Version III, EP175-226", None), ("zsVzXV8fcZg", "EP224-236 (fixed)", None),
    ("z1YMxV2XIIU", "EP237-241", None), ("hVaCqnGUxlA", "EP240-244", None), ("VsHvep9mwts", "EP243-246", None),
    ("F57YwuGxBdE", "EP247", 247), ("fzuCiW1nvS8", "S5 EP179", S5 + 179), ("IZz2gdc4PAM", "S5 EP180", S5 + 180),
    ("_PljFwTh0Ww", "S5 EP181", S5 + 181), ("ku2Gm_aiRNE", "S5 EP181 (pure enjoyment cut)", S5 + 181),
    ("KgP7NMBF4Js", "S5 EP187 (4K)", S5 + 187),
] + [(v, f"S5 EP{n} (4K)", S5 + n) for n, v in {
    182: "BxVxiTR8rXI", 183: "SRspmPXC_ck", 184: "XP50GORJFeQ", 185: "FxM6Qj73me4", 186: "ZvZJhri9r-o",
    187: "BKzrXmqdKXs", 188: "Ql0xrGFaTJg", 189: "0culLG7g_Oo", 190: "EF5CA0FaHJA", 191: "eqcZp-N-Ep4",
    192: "EBklgyDPaJ8", 193: "6u9oi1Ypdos", 194: "WUEERRACmzw", 195: "HNkTKbXlVWM", 196: "CbmZHzxpZFM",
    197: "aznhphwdYsY", 198: "Zyjjc8x3_5A", 199: "chHiboQCYRg", 200: "FNWO9uJiSNY", 201: "2XnPphI17o0",
    202: "DMSh9fMaWVo", 203: "7wNre1-UVcw", 204: "PitbUs-n_zE", 205: "7HOj9J1FzPk", 206: "tMDNlkv4RWo",
    207: "QpkC0mxW7VY", 208: "aZ5mYvgkJYU", 209: "nM_TU_02zKg", 210: "9ZEc3Nasopo", 211: "u7Vhgg0UE70",
    212: "COcDlza4lPQ"}.items()]
# Single uploads in the continuous numbering, EP170-247: cleaner cuts than the compilations, so preferred.
SOURCES += [(v, f"EP{n}", int(n)) for n, v in {
    170: "88m-lrANAz0", 171: "4iq1iedSmdI", 172: "vFu3JcozKuc", 173: "0FD1dTgEu2k", 174: "Riz1C4IHoUU",
    175: "qLrqEa0UVXs", 176: "zz3OPVkZ-sM", 177: "N3qtr7o8Y8I", 178: "nrXv8vs_dGg", 179: "MxMzHmchsUw",
    180: "spKtQi34o7Q", 181: "JNed8lzYrIA", 182: "39WwfHEVVOE", 183: "b736k4j9Umk", 184: "of2gil2JGh4",
    185: "KEeRP9BbfNk", 186: "TqZtbiTZJO0", 187: "IkPp5Tb9jO0", 188: "J7izNUo5agQ", 189: "MEz_gkJNKH8",
    190: "oBtTKYRj7RE", 191: "385WijAHG40", 192: "6uGCyCV6nuc", 193: "5vjlZ6d1iIo", 194: "4zYMXzTH-oo",
    195: "dLoWid5f0_I", 196: "eGnq296yRhc", 197: "uAXbDcUkNwA", 198: "Jc6180U9SX8", 199: "hAengiTnB-c",
    200: "K93655g8Q2s", 201: "AwGXCcezUIU", 202: "Xp_d-Q-kxdk", 203: "ZfQNVO8x1RE", 204: "kKpJA-LlOLM",
    205: "imHe8KdASCY", 206: "YYrp6Adkvok", 207: "yBxrvisArmI", 208: "pVdRPVFQPRk", 209: "pkKoQ7JMaOM",
    210: "7dUNW7kld5E", 211: "_GQJW0QQnYs", 212: "xRnPMdoWym8", 213: "A_IErzBm5ZM", 214: "m4WLFh68nPU",
    215: "T4zjw0iOrpM", 216: "xdbpxLpGHVk", 217: "I6BVWJcAObc", 218: "paKVuwRy-Xw", 219: "zqo_K8RFIWg",
    220: "HDblEiBqHLQ", 221: "8gVS0Is454g", 222: "qbny8l00uEo", 223: "evEeXmRJGCc", 224: "rvoAOkCQkiI",
    225: "-WHMwb2MtFk", 226: "9636LLrQbmE", 227: "m5IvRB0-Oh0", 228: "2kPvvOplHs8", 229: "7q3KNm_zZKc",
    230: "VFqbmAMZoGI", 231: "6OnjS4BIuQU", 232: "vDcTwe68fV8", 233: "jsvBd-vRzz4", 234: "syCj-Ct7SzM",
    235: "acKJBjFG5lg", 236: "3KS_IC30xSI", 237: "lqfshlWu6HA", 238: "xAnCcOieS_Q", 239: "vPfA_vnkCv4",
    240: "o81F6FHRhKo", 241: "MvsFUOJkAhA", 242: "A6zmahyu9KA", 243: "xobn3AtMiqE", 244: "Gh-G4WBSXxE",
    245: "u7Hhmj5scIg", 246: "e_FDwbQ8Vx4", 247: "F57YwuGxBdE",}.items()]
# The newest S5 uploads often have the English burned in, with no track; their "Official edition" copies are fallbacks.
SOURCES += [(v, f"S5 EP{n} (official edition)", S5 + int(n)) for n, v in {
    184: "mKpDU_b1FD0", 185: "bpp5sprWo7c", 186: "b5wJXIJdMgA", 187: "qNdn5tptJ68", 188: "UkgXaoRNhGw",
    189: "6ZSNvB6JHlI", 190: "2gistl0dYqs", 191: "G9VnBcd8NL8", 192: "etNfMemukP0", 193: "b31BQr6Q3Jc",
    194: "HrirUM-q5Zk", 195: "lPv-9TITfr4", 196: "EJ6-yNq6FBU", 197: "ZmCyoIZkJfI", 198: "1_tk3bt_kNk",
    199: "fo7WN71BJJY", 200: "a3Xb5rOe7lc", 201: "Ty29wlp_cug", 202: "ZK34UIqXSbg", 203: "DUBPaQkpT_s",
    204: "eo5KCzlvEuY", 205: "mUmQrTuilUo", 206: "rJKEgTrvDyQ", 207: "QX2Xl5aBXzE", 208: "Wad6iXyYpkA",
    209: "LaQCDfdNqH4", 210: "mHasR93fHAg", 211: "2btqBSmPFW8", 212: "vZ4OsdjAsMM",}.items()]

# Shorter compilations of the same episodes, for when the long one's track has a hole (EP76 there is 4 minutes).
SOURCES += [("fN9D3Z8NNKY", "EP70-73 one-hour", None), ("YNVzXQBpiHw", "EP74-77 one-hour", None),
            ("X8omOzsXVqk", "EP78-81 one-hour", None), ("V-r3Lz_LN1M", "EP82-85 one-hour", None),
            ("OR216eIdApA", "EP86-89 one-hour", None)]

# Cards that are wrong in a compilation, and episode starts with no card: {video: [(cue time in s, episode)]}.
# EP01-174: EP6 has no card (it starts with the Magical Beast Mountain narration at 101 min); the cards
# reading "Episode 8" (121 min) and "Episode 6" (142 min) are really EP7 and EP8, by runtime and order.
CARD_FIX = {"dpqsyufBpu4": [(6066, 6), (7260, 7), (8529, 8)]}

CARD = re.compile(r"^\[Episode (\d+)\]")


# the embedded player's client isn't bot-checked after a burst of requests the way the default one is
YT_OPTS = ["--extractor-args", "youtube:player_client=web_embedded,default"]


def ytdlp(*args):
    return subprocess.run([YTDLP, *YTDLP_OPTS, *args], capture_output=True, text=True, env=ENV)


def uploads():
    rows = []
    for line in (YT / "channel.txt").read_text().splitlines():
        vid, dur, title = line.split("|", 2)
        if re.search(r"battle through the heavens|btth", title, re.I):
            rows.append((vid, float(dur) if dur != "NA" else 0, title))
    return rows


def cmd_list():
    YT.mkdir(parents=True, exist_ok=True)
    r = ytdlp("--flat-playlist", "--print", "%(id)s|%(duration)s|%(title)s", CHANNEL)
    (YT / "channel.txt").write_text(r.stdout)
    print(len(r.stdout.splitlines()), "uploads")


def fetch_one(vid):
    f = YT / f"{vid}.en.srt"
    if f.exists():
        return "cached"
    r = ytdlp(*YT_OPTS, "-q", "--no-warnings", "--skip-download", "--write-subs", "--sub-langs", "en", "--sub-format", "srt",
              "-o", str(YT / vid), f"https://www.youtube.com/watch?v={vid}")
    return "ok" if f.exists() else (r.stderr.strip().splitlines() or ["no English track"])[-1][:120]


def cmd_fetch():
    for vid, what, _ in SOURCES:
        res = fetch_one(vid)
        print(f"{vid}  {what}: {res}", flush=True)
        if res != "cached":
            time.sleep(8)


def cues(path):
    out = []
    for block in re.split(r"\n\s*\n", path.read_text(errors="ignore")):
        m = re.search(r"(\d+):(\d+):(\d+)[,.](\d+) --> (\d+):(\d+):(\d+)[,.](\d+)", block)
        if not m:
            continue
        g = list(map(int, m.groups()))
        s = g[0] * 3600 + g[1] * 60 + g[2] + g[3] / 1000
        e = g[4] * 3600 + g[5] * 60 + g[6] + g[7] / 1000
        text = "\n".join(l.strip() for l in block.split("\n")[2:] if l.strip())
        if text:
            out.append([s, e, text])
    return sorted(out)


def segments(vid, cs):
    cards = {i: int(CARD.match(c[2]).group(1)) for i, c in enumerate(cs) if CARD.match(c[2])}
    for t, n in CARD_FIX.get(vid, []):
        i = min(range(len(cs)), key=lambda j: abs(cs[j][0] - t))  # the cue nearest that time
        cards = {k: v for k, v in cards.items() if abs(cs[k][0] - t) > 30}
        cards[i] = n
    cards = sorted(cards.items())
    # Each episode starts at its card. The lines before a card are the end of the previous episode (its last scene
    # and ending song); the narrated recap right after the card summarises them. Only the first episode in a file
    # keeps what comes before its card.
    segs = [[n, 0 if k == 0 else i] for k, (i, n) in enumerate(cards)]
    for k in range(len(segs)):
        segs[k].append(segs[k + 1][1] if k + 1 < len(segs) else len(cs))
    return [(n, a, b) for n, a, b in segs if b > a]


def fmt(t):
    h, r = divmod(max(t, 0), 3600)
    m, s = divmod(r, 60)
    return f"{int(h):02d}:{int(m):02d}:{int(s):02d},{int(round((s % 1) * 1000)) % 1000:03d}"


def cmd_split():
    OUT.mkdir(parents=True, exist_ok=True)
    titles = {r[0]: r[2] for r in uploads()}
    best = {}
    for vid, what, ep in SOURCES:
        f = YT / f"{vid}.en.srt"
        if not f.exists():
            continue
        cs = cues(f)
        segs = [(ep, 0, len(cs))] if ep else segments(vid, cs)
        single = ep is not None
        for n, a, b in segs:
            score = (single, b - a)
            if n not in best or (not best[n][0][0] and score > best[n][0]):
                best[n] = (score, vid, cs[a:b])
    sources = {}
    for n, (score, vid, part) in sorted(best.items()):
        # a single upload keeps the video's own clock (stills are taken from it); a compilation segment restarts at 0,
        # and `offset` in sources.json maps it back
        t0 = 0.0 if score[0] else part[0][0]
        body = "\n".join(f"{i}\n{fmt(s - t0)} --> {fmt(e - t0)}\n{txt}\n" for i, (s, e, txt) in enumerate(part, 1))
        (OUT / f"ep{n}.en.srt").write_text(body)
        sources[n] = {"video": vid, "title": titles.get(vid, ""), "offset": round(t0, 2), "lines": len(part),
                      "single": score[0]}
    (OUT / "sources.json").write_text(json.dumps(sources, indent=1, ensure_ascii=False))
    have = sorted(sources)
    missing = [n for n in range(1, max(have) + 1) if n not in sources]
    print(f"{len(have)} episodes, EP{have[0]}-{have[-1]}; missing: {missing}")
    thin = [n for n in have if sources[n]["lines"] < 120]
    print("thin (<120 lines):", thin)


if __name__ == "__main__":
    {"list": cmd_list, "fetch": cmd_fetch, "split": cmd_split}[sys.argv[1]]()
