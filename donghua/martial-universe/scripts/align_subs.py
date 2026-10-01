"""Pair the official Chinese and English subtitle lines by time, to see what the English track calls a Chinese name.

  python3 scripts/align_subs.py 7                 every line of EP7: time, 汉字, English
  python3 scripts/align_subs.py --find 祖符 1-24   each line containing 祖符 in EP1-24, with its English
  python3 scripts/align_subs.py --count 1-72 祖符 貂 符师   what English words sit next to each term, most common first

Reads cache/animekhor/ep{N}.zh.srt and ep{N}.en.srt (fetched by `tools/animekhor.py subs mu N`).
"""
import collections, pathlib, re, sys

CACHE = pathlib.Path(__file__).resolve().parent.parent / "cache" / "animekhor"


def cues(path):
    out = []
    if not path.exists():
        return out
    for block in path.read_text(encoding="utf-8", errors="ignore").split("\n\n"):
        lines = block.strip().splitlines()
        tl = next((i for i, l in enumerate(lines) if "-->" in l), None)
        if tl is None:
            continue
        a, b = [sum(float(x) * m for x, m in zip(re.split(r"[:,.]", t.strip())[:3], (3600, 60, 1))) +
                int(re.split(r"[:,.]", t.strip())[3]) / 1000 for t in lines[tl].split("-->")]
        out.append((a, b, " ".join(lines[tl + 1:]).strip()))
    return out


def pairs(n):
    zh, en = cues(CACHE / f"ep{n}.zh.srt"), cues(CACHE / f"ep{n}.en.srt")
    for a, b, z in zh:
        over = [e for ea, eb, e in en if ea < b and eb > a]
        yield a, z, " / ".join(over)


def eps(spec):
    a, _, b = spec.partition("-")
    return range(int(a), int(b or a) + 1)


if __name__ == "__main__":
    args = sys.argv[1:]
    if not args:
        raise SystemExit(__doc__)
    if args[0] == "--find":
        term, spec = args[1], args[2]
        for n in eps(spec):
            for t, z, e in pairs(n):
                if term in z:
                    print(f"EP{n} {t:7.1f}  {z}  |  {e}")
    elif args[0] == "--count":
        spec, terms = args[1], args[2:]
        for term in terms:
            c = collections.Counter()
            for n in eps(spec):
                for _, z, e in pairs(n):
                    if term in z:
                        c[e.lower()] += 1
            print(f"== {term}: {sum(c.values())} lines")
            for e, k in c.most_common(8):
                print(f"   {k:3d}  {e}")
    else:
        for t, z, e in pairs(int(args[0])):
            print(f"{t:7.1f}  {z}  |  {e}")
