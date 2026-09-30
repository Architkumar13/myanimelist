"""Contact sheet: sheet.py out.jpg cols size label1=path1 ..."""
import sys
from PIL import Image, ImageDraw, ImageFont
out, cols, size = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
items = [a.split("=", 1) for a in sys.argv[4:]]
rows = (len(items) + cols - 1) // cols
S = Image.new("RGB", (cols * size, rows * (size + 18)), "white")
d = ImageDraw.Draw(S)
try: font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 13)
except Exception: font = None
for i, (lab, p) in enumerate(items):
    try: im = Image.open(p).convert("RGB")
    except Exception: continue
    im.thumbnail((size, size))
    x, y = (i % cols) * size, (i // cols) * (size + 18)
    S.paste(im, (x + (size - im.width) // 2, y))
    d.text((x + 3, y + size + 2), lab[:28], fill="black", font=font)
S.save(out, quality=85)
