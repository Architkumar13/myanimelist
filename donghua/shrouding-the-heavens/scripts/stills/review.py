"""Contact sheets of rendered portraits, labelled id:look@ep, for eyeballing (writes cache/stills/review_N.jpg)."""
import json, pathlib, sys
from PIL import Image, ImageDraw, ImageFont
PROJ = pathlib.Path(__file__).resolve().parents[2]
roster = json.loads((PROJ / "data/characters/roster.json").read_text())
only = set(sys.argv[1:])
items = []
for c in roster:
    if only and c["id"] not in only: continue
    for li, l in enumerate(c["looks"]):
        f = PROJ / f"site/img/cast/{c['id']}-{li}.jpg"
        items.append((f"{c['id'][:14]}:{li}@{l['ep']}", f if f.exists() else None))
font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 12)
per, cols, w, h = 40, 10, 130, 173
for n in range(0, len(items), per):
    chunk = items[n:n + per]
    S = Image.new("RGB", (cols * w, ((len(chunk) + cols - 1) // cols) * (h + 16)), "white"); d = ImageDraw.Draw(S)
    for i, (lab, f) in enumerate(chunk):
        x, y = (i % cols) * w, (i // cols) * (h + 16)
        if f: S.paste(Image.open(f).resize((w - 4, h)), (x + 2, y))
        else: d.rectangle([x + 2, y, x + w - 2, y + h], fill="#ccc")
        d.text((x + 3, y + h + 1), lab, fill="black", font=font)
    S.save(PROJ / f"cache/stills/review_{n // per}.jpg", quality=85)
print((len(items) + per - 1) // per, "sheets")
