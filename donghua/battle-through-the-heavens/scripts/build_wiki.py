"""Turn cache/wiki/*.json into site/data/wiki.js and download the pictures into site/img/wiki/.

Usage: python3 scripts/build_wiki.py [--no-images]
Run scripts/fetch_wiki.py first. Images already downloaded are kept.
"""
import argparse
import hashlib
import json
import pathlib
import re
import urllib.parse
from concurrent.futures import ThreadPoolExecutor

from wikiapi import api, get, safe_name
from wikitext import blocks, find_templates, gallery_files, inline, list_items, plain, template_params

ROOT = pathlib.Path(__file__).resolve().parent.parent
CACHE = ROOT / "cache" / "wiki"
SITE = ROOT / "site"
IMG = SITE / "img" / "wiki"
THUMB = 420
GALLERY_MAX = 10

SKIP = {
    "Main Page", "Battle Through the Heavens Wiki", "Policies and Guidelines", "Cast", "Staff", "Voice Actors",
}
# Novel volumes, manhua chapters and episode-log pages are summaries of other media, not articles about the world.
SKIP_CATS = {"Songs", "Songs (Audio)", "Songs (Lyric)", "Songs (Page)", "Songs (Video)", "Audios", "Audio Clips",
             "Videos", "Blog posts", "Help", "Template documentation", "Volumes", "Manhua",
             "Donghua Season 5 Episodes", "Voice Actors", "Staff"}
SKIP_PREFIX = ("Donghua Season", "Donghua Special", "Volume ", "Chapter ", "End Credits", "Manhua")
LORE = {
    "Cultivation", "Dou Qi", "Dou Zhi Qi", "Dou Zhe", "Dou Shi", "Da Dou Shi", "Dou Ling", "Dou Wang", "Dou Huang",
    "Dou Zong", "Dou Zun", "Half Dou Sheng", "Dou Sheng", "Dou Di", "Heavenly Flames", "Alchemist", "Alchemists",
    "Receptarier", "Dou Techniques", "Qi Method", "Spiritual Strength", "Dou Di Bloodline", "Magical Beasts",
    "Terminology", "Donghua", "Donghua Movie",
}
BODY_WORDS = ("Body", "Physique", "Bloodline")
ITEM_WORDS = ("Flame", "Fire", "Pill", "Ruler", "Scroll", "Map", "Ring", "Sword", "Seal", "Cauldron", "Lotus",
              "Fruit", "Grass", "Crystal", "Stone", "Book")
PLACE_TYPES = ("continent", "region", "plane", "empire", "kingdom", "city", "town", "location", "mountain", "desert",
               "forest", "valley", "cave", "area", "land", "territory", "island", "sea")
FACTION_TYPES = ("sect", "clan", "family", "tribe", "race", "organization", "organisation", "academy", "pavilion",
                 "hall", "tower", "alliance", "union", "guild", "mansion", "palace", "group", "association", "school")
PLACES = {"Dou Qi Continent", "Jia Ma Empire", "Wu Tan City", "Wutan City", "Magical Beast Mountain Range",
          "Tager Desert", "Black-Corner Region", "Black Corner Region", "Central Plains", "North-Western Region",
          "Beast Region", "Imperial Capital", "Canaan City", "Holy Pill City", "Great Thousand World",
          "Ancient Emperor's Cave Abode"}

# When the wiki has the same page under several names, keep the one people actually say.
PREFER = {"Xiao Yan", "Yao Lao", "Xun Er", "Gu Xun Er", "Medusa", "Cai Lin", "Misty Cloud Sect", "Jia Nan Academy",
          "Hall of Souls", "Pill Tower", "Heavenly Flames", "Tager Desert", "Nalan Yanran"}


def infobox(wikitext):
    for _, _, name, body in find_templates(wikitext):
        low = name.lower().replace("_", " ")
        if low.startswith(("character", "infobox", "donghua infobox")):
            return low, template_params(body)
    return None, {}


def first_ep(value):
    """Donghua debut -> the official continuous episode number (Yuewen's YouTube numbering, which the site uses).

    The wiki counts per season. S3 = EP21-32, S4 = EP33-56, the Three-Year Agreement special = EP57-69 and S5 = 69 + n.
    The official release re-cuts seasons 1-2 and their specials into EP1-20, so "Season 1 Episode 5" has no exact
    continuous number: those stay None rather than guessed (the subtitle reviews set first appearances instead).
    """
    if not value:
        return None
    text = plain(value)
    # "Season 1 Remake Episode 1 or Season 1 Episode 1": the first clause decides
    m = re.search(r"(?:Three|3)\s*Years?\s*Agreement\W*(?:Episode|EP)\.?\s*(\d+)", text, re.I)
    if m:
        return 56 + int(m.group(1))
    m = re.search(r"Season\s*(\d)(\s*(?:Special|Remake)[^,]*?)?\W*(?:Episode|EP)\.?\s*(\d+)", text, re.I)
    if not m:
        m2 = re.search(r"Season[_ ](\d)/Episode[_ ](\d+)", value)
        if not m2:
            return None
        season, special, n = int(m2.group(1)), None, int(m2.group(2))
    else:
        season, special, n = int(m.group(1)), m.group(2), int(m.group(3))
    if special:
        return None
    return {3: 20, 4: 32, 5: 69}.get(season, None) and {3: 20, 4: 32, 5: 69}[season] + n


def first_chapter(value):
    m = re.search(r"Chapter\s*(\d+)", plain(value or ""), re.I)
    return int(m.group(1)) if m else None


def classify(title, cats, box_kind, box):
    box_kind = box_kind or ""
    if "Characters" in cats or "character" in box_kind or "magicalbeast" in box_kind.replace(" ", ""):
        return "character"
    if title in LORE or "cultivation" in box_kind:
        return "lore"
    if title in PLACES or "location" in box_kind or "Locations" in cats:
        return "place"
    if "organization" in box_kind or any(c in cats for c in ("Organisations", "Sects", "Clans")):
        return "faction"
    if "heavenly flame" in box_kind or any(c in cats for c in ("Items", "Treasures", "Medicinal Pills", "Heavenly Flames",
                                                               "Flames", "Medicinal Ingredients", "Plant")):
        return "item"
    if any(w in title for w in BODY_WORDS):
        return "lore"
    kind = plain(box.get("type", "")).lower()
    if any(w in kind for w in FACTION_TYPES):
        return "faction"
    if any(w in kind for w in PLACE_TYPES):
        return "place"
    if any(w in title for w in ("Sect", "Clan", "Family", "Tribe", "Academy", "Pavilion", "Hall of", "Tower",
                                "Alliance", "Union", "Guild", "Valley", "Mansion", "Palace", "Race")):
        return "faction"
    if any(w in title for w in ITEM_WORDS):
        return "item"
    return "lore"


FIELDS = {
    "character": [("Chinese", "zh"), ("Pinyin", "pinyin"), ("species", "species"), ("gender", "gender"),
                  ("Status", "status"), ("Dou Ranks", "realm"), ("affiliation", "affiliations"),
                  ("Also known as", "aliases"), ("Also Known as", "aliases"), ("physique", "physique"),
                  ("master", "masters"), ("disciple", "disciples"), ("spouse", "spouse"), ("Killed By", "killedBy"),
                  ("occupation", "occupation"), ("continent", "continent"), ("region", "region"), ("city", "city"),
                  ("allies", "allies"), ("enemies", "enemies"),
                  ("Species", "species"), ("Race", "species"),
                  ("Gender", "gender"), ("Vital_Status", "status"), ("Cultivation_Realm", "realm"),
                  ("martial_artist_level", "realm"),
                  ("Affiliations", "affiliations"), ("Affiliation", "affiliations"), ("Titles", "titles"),
                  ("Aliases", "aliases"), ("Body", "physique"), ("Physique", "physique"), ("Bloodline(s)", "bloodline"),
                  ("Master(s)", "masters"), ("Disciple(s)", "disciples"), ("Family", "family"),
                  ("Relative(s)", "family"), ("Spouse(s)", "spouse"), ("Continent", "continent"),
                  ("World", "world"), ("Region", "region"), ("Legacy", "legacy"), ("Killed_By", "killedBy"),
                  ("Occupations", "occupation"), ("Occupation", "occupation"), ("Personality", "personality")],
    "other": [("chinese", "zh"), ("Chinese", "zh"), ("pinyin", "pinyin"), ("Pinyin", "pinyin"), ("type", "type"),
              ("aka", "aliases"), ("head", "leader"), ("owner(s)", "powers"), ("also_known_as", "aliases"),
              ("aliases", "aliases"), ("status", "status"), ("founder", "founder"), ("emperor", "emperor"),
              ("sect_leader", "leader"), ("clan_lord", "leader"), ("king", "leader"), ("ancestor(s)", "ancestors"),
              ("elder(s)", "elders"), ("protector", "protector"), ("members", "members"), ("power(s)", "powers"),
              ("continent", "continent"), ("world", "world"), ("region", "region"), ("city", "city"),
              ("allies", "allies"), ("enemies", "enemies"), ("effects", "effects"), ("source", "source")],
}
SINGLE = {"zh", "pinyin", "gender", "status", "type"}


def facts(kind, box):
    out = {}
    for key, name in FIELDS["character" if kind == "character" else "other"]:
        if key not in box or name in out:
            continue
        items = list_items(box[key])
        if not items:
            continue
        out[name] = plain(items[0]) if name in SINGLE else items[:14]
    return out


def primary_image_file(kind, box, wikitext):
    for key in ("Image", "image"):
        v = box.get(key, "")
        m = re.search(r"([^\[\]|=\n]+\.(?:png|jpe?g|gif|webp))", v, re.I)
        if m:
            return re.sub(r"^(File|Image):", "", m.group(1).strip(), flags=re.I)
    for key in ("Donghua_Gallery", "Art_Gallery", "Novel_Gallery", "Manhua_Gallery"):
        files = gallery_files(box.get(key, "")) or [
            (m, "") for m in re.findall(r"([^\s|=][^|=\n]*\.(?:png|jpe?g|gif|webp))", box.get(key, ""), re.I)]
        if files:
            return files[0][0]
    files = gallery_files(wikitext)
    return files[0][0] if files else None


def resolve_files(names):
    """File names -> scaled thumbnail URLs, 50 at a time."""
    urls, names = {}, sorted(set(names))
    for i in range(0, len(names), 50):
        batch = names[i:i + 50]
        data = api({"action": "query", "titles": "|".join("File:" + n for n in batch), "prop": "imageinfo",
                    "iiprop": "url", "iiurlwidth": str(THUMB)})
        norm = {x["to"]: x["from"] for x in data["query"].get("normalized", [])}
        for page in data["query"]["pages"].values():
            info = (page.get("imageinfo") or [{}])[0]
            url = info.get("thumburl") or info.get("url")
            if url:
                original = norm.get(page["title"], page["title"]).removeprefix("File:")
                urls[original] = url
                urls[page["title"].removeprefix("File:")] = url
    return urls


def thumb_url(original_url):
    if "/revision/latest" in original_url and "scale-to-width" not in original_url:
        return original_url.replace("/revision/latest", f"/revision/latest/scale-to-width-down/{THUMB}")
    return original_url


def local_name(url):
    path = urllib.parse.urlparse(url).path
    m = re.search(r"/images/\w/\w\w/([^/]+)", path)
    base = urllib.parse.unquote(m.group(1) if m else path.rsplit("/", 1)[-1])
    stem, _, ext = base.rpartition(".")
    ext = ext.lower() if ext.lower() in ("png", "jpg", "jpeg", "gif", "webp") else "jpg"
    return f"{safe_name(stem)[:60]}-{hashlib.md5(url.encode()).hexdigest()[:6]}.{ext}"


MAX_ORIGINAL = 1_500_000


def is_image(data):
    return data[:3] == b"\xff\xd8\xff" or data[:8] == b"\x89PNG\r\n\x1a\n" or data[:4] == b"GIF8" or (
        data[:4] == b"RIFF" and data[8:12] == b"WEBP")


def still(dest):
    """Animated GIFs and WebPs become their first frame (same name): the clips are 1-10 MB each and only a picture is shown."""
    try:
        from PIL import Image
    except ImportError:
        return
    with Image.open(dest) as im:
        if not getattr(im, "is_animated", False):
            return
        im.seek(0)
        frame = im.convert("RGB")
    frame.thumbnail((THUMB, THUMB * 3))
    frame.save(dest, format="GIF" if dest.suffix.lower() == ".gif" else "WEBP")


def download(url):
    name = local_name(url)
    dest = IMG / name
    if not dest.exists():
        try:
            data = get(url)
        except OSError as e:
            # Fandom's resizer 503s on animated GIFs and videos. Take the original only if it's a small picture:
            # this wiki files clips of techniques as "... Video.jpg", which are really MP4s of 5-10 MB.
            original = re.sub(r"/scale-to-width-down/\d+", "", url)
            data = None
            if original != url:
                try:
                    data = get(original)
                except OSError as e2:
                    e = e2
            if not data or not is_image(data) or len(data) > MAX_ORIGINAL:
                print("  image skipped:", url, e if not data else f"{len(data) // 1000} kB, not a small picture")
                return url, None
        if not is_image(data):
            print("  image skipped (not a picture):", url)
            return url, None
        dest.write_bytes(data)
        still(dest)
    return url, f"img/wiki/{name}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--no-images", action="store_true")
    args = ap.parse_args()
    IMG.mkdir(parents=True, exist_ok=True)

    pages = {}
    for f in sorted(CACHE.glob("*.json")):
        d = json.loads(f.read_text())
        pages[d["title"]] = d

    # Identical pages (the wiki has copy-pasted duplicates) collapse into one, the rest become aliases.
    by_hash, alias = {}, {}
    for title, d in sorted(pages.items(), key=lambda kv: (kv[0] not in PREFER, len(kv[0]))):
        # Only real duplicates count; tiny "under construction" stubs are all identical to each other.
        if "/" in title or len(d["wikitext"].strip()) < 400:
            continue
        h = hashlib.md5(d["wikitext"].strip().encode()).hexdigest()
        if h in by_hash:
            alias[title] = by_hash[h]
        else:
            by_hash[h] = title

    raw_uses = {}
    for d in pages.values():
        if d.get("image"):
            raw_uses[d["image"]] = raw_uses.get(d["image"], 0) + 1

    entries, wanted_files = {}, {}
    for title, d in pages.items():
        if "/" in title or title in SKIP or title.startswith(SKIP_PREFIX) or title in alias or len(d["wikitext"].strip()) < 30:
            continue
        cats = d.get("categories", [])
        if any(c in SKIP_CATS for c in cats):
            continue
        box_kind, box = infobox(d["wikitext"])
        kind = classify(title, cats, box_kind, box)
        entry = {"title": title, "kind": kind, "facts": facts(kind, box), "blocks": blocks(d["wikitext"])}
        if kind == "character":
            entry["ep"] = first_ep(box.get("anime") or box.get("Donghua") or box.get("donghua"))
            entry["ch"] = first_chapter(box.get("light novel") or box.get("light_novel") or box.get("Novel"))
            entry["tags"] = [c for c in cats if c in ("Allies", "Enemies", "Antagonists", "Main Characters",
                                                       "Human", "Male Characters", "Female Characters", "Alive", "Deceased")]
        elif box.get("anime") or box.get("donghua"):
            entry["ep"] = first_ep(box.get("anime") or box.get("donghua"))

        image = d.get("image")
        if image and raw_uses[image] >= 3:
            image = None  # a generic avatar or logo, not a picture of this page
        if not image:
            fname = primary_image_file(kind, box, d["wikitext"])
            if fname:
                wanted_files.setdefault(fname, []).append((title, "image"))
        else:
            entry["_image_url"] = thumb_url(image)

        # Gallery pictures, from the page itself and its /Gallery subpage.
        gal = gallery_files(d["wikitext"])
        sub = pages.get(title + "/Gallery")
        if sub:
            gal += gallery_files(sub["wikitext"])
        seen, g = set(), []
        for name, cap in gal:
            if name.lower() not in seen:
                seen.add(name.lower()); g.append((name, cap))
        entry["_gallery"] = g[:GALLERY_MAX]
        for name, _ in entry["_gallery"]:
            wanted_files.setdefault(name, [])

        # Sub-pages like "Ye Fan/Cultivation" become extra tabs on the parent page.
        tabs = []
        for sub_title, sd in sorted(pages.items()):
            if sub_title.startswith(title + "/") and not sub_title.endswith("/Gallery"):
                b = blocks(sd["wikitext"])
                if b:
                    tabs.append({"name": sub_title.split("/", 1)[1], "blocks": b})
        if tabs:
            entry["tabs"] = tabs
        entries[title] = entry

    print(f"{len(entries)} entries; resolving {len(wanted_files)} image files")
    file_urls = resolve_files(list(wanted_files))
    for fname, owners in wanted_files.items():
        for title, _ in owners:
            if fname in file_urls or fname.replace("_", " ") in file_urls:
                entries[title]["_image_url"] = file_urls.get(fname) or file_urls.get(fname.replace("_", " "))

    urls = set()
    for e in entries.values():
        if e.get("_image_url"):
            urls.add(e["_image_url"])
        for name, _ in e["_gallery"]:
            u = file_urls.get(name) or file_urls.get(name.replace("_", " "))
            if u:
                urls.add(u)
    local = {}
    if not args.no_images:
        print(f"downloading {len(urls)} images")
        with ThreadPoolExecutor(8) as pool:
            local = dict(pool.map(download, sorted(urls)))

    for e in entries.values():
        url = e.pop("_image_url", None)
        if url and local.get(url):
            e["img"] = local[url]
        gallery = []
        for name, cap in e.pop("_gallery"):
            u = file_urls.get(name) or file_urls.get(name.replace("_", " "))
            if u and local.get(u) and local[u] != e.get("img"):
                gallery.append({"src": local[u], "cap": cap})
        if gallery:
            e["gallery"] = gallery

    # The wiki reuses a few generic banners as stand-ins; a picture on 3+ pages says nothing about any of them.
    uses = {}
    for e in entries.values():
        if e.get("img"):
            uses[e["img"]] = uses.get(e["img"], 0) + 1
    for e in entries.values():
        if uses.get(e.get("img"), 0) >= 3:
            del e["img"]

    if not args.no_images:
        used = {pathlib.Path(e["img"]).name for e in entries.values() if e.get("img")}
        used |= {pathlib.Path(g["src"]).name for e in entries.values() for g in e.get("gallery", [])}
        stale = [f for f in IMG.iterdir() if f.name not in used]
        for f in stale:
            f.unlink()
        if stale:
            print(f"removed {len(stale)} unused images")

    alias = {a: t for a, t in alias.items() if t in entries}  # skipped pages take their aliases with them
    out = {"entries": entries, "alias": alias}
    js = "// Built by scripts/build_wiki.py from the Battle Through the Heavens fan wiki. Do not edit by hand.\n"
    js += "window.WIKI = " + json.dumps(out, ensure_ascii=False, separators=(",", ":")) + ";\n"
    (SITE / "data").mkdir(parents=True, exist_ok=True)
    (SITE / "data" / "wiki.js").write_text(js)
    kinds = {}
    for e in entries.values():
        kinds[e["kind"]] = kinds.get(e["kind"], 0) + 1
    print("kinds:", kinds, "| with image:", sum(1 for e in entries.values() if e.get("img")),
          "| size:", round(len(js) / 1e6, 2), "MB")


if __name__ == "__main__":
    main()
