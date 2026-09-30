"""Download every image on the fan wiki as a 600px thumbnail into cache/pool/, with metadata.

The pool is what the character pages pick their per-look pictures from.
"""
import json
import pathlib
import re
import urllib.parse
from concurrent.futures import ThreadPoolExecutor

from wikiapi import api, get

ROOT = pathlib.Path(__file__).resolve().parent.parent
POOL = ROOT / "cache" / "pool"
WIDTH = 600


def all_images():
    out, cont = [], {}
    while True:
        r = api({"action": "query", "generator": "allimages", "gailimit": "50", "prop": "imageinfo",
                 "iiprop": "url|size|timestamp|comment", "iiurlwidth": str(WIDTH), **cont})
        for p in r.get("query", {}).get("pages", {}).values():
            ii = (p.get("imageinfo") or [{}])[0]
            out.append({"file": p["title"].split(":", 1)[1], "w": ii.get("width"), "h": ii.get("height"),
                        "time": ii.get("timestamp"), "comment": ii.get("comment", ""),
                        "url": ii.get("thumburl") or ii.get("url")})
        if "continue" not in r:
            return out
        cont = r["continue"]


def usage():
    """file name (spaces) -> pages whose wikitext references it."""
    used = {}
    for f in (ROOT / "cache" / "wiki").glob("*.json"):
        page = json.loads(f.read_text())
        text = page.get("wikitext", "")
        for m in re.finditer(r"([^\[\]|=\n{}]+?\.(?:png|jpe?g|webp|gif|PNG|JPG|JPEG))", text):
            name = m.group(1).split(":")[-1].strip().replace("_", " ")
            used.setdefault(name[0].upper() + name[1:], set()).add(page["title"])
    return used


def main():
    imgs = all_images()
    used = usage()
    def fetch(i):
        if not i["url"] or i["file"].lower().endswith((".mp4", ".svg", ".gif", ".ogg")):
            return None
        ext = ".png" if i["file"].lower().endswith(".png") else ".jpg"
        local = POOL / (re.sub(r"[^\w\-]+", "_", i["file"].rsplit(".", 1)[0])[:80] + ext)
        if not local.exists():
            try:
                local.write_bytes(get(i["url"]))
            except OSError as e:
                print("fail", i["file"], e)
                return None
        i["local"] = local.name
        i["pages"] = sorted(used.get(i["file"].replace("_", " "), []))
        return i
    with ThreadPoolExecutor(8) as ex:
        got = [x for x in ex.map(fetch, imgs) if x]
    (POOL / "index.json").write_text(json.dumps(got, ensure_ascii=False, indent=1))
    print(len(imgs), "listed,", len(got), "downloaded")


if __name__ == "__main__":
    main()
