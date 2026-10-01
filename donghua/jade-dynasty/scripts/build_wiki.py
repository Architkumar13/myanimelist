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

SKIP = {"Main Page", "Zhu Xian Wiki", "125.162.245.174", "Game", "Music", "Drama"}
SKIP_CATS = {"Songs", "Audios", "Audio Clips", "Videos", "Blog posts", "Help", "Templates", "Template documentation"}
LORE = {"Races", "Spiritual Beasts", "Heavenly Books", "Eight Fiends Formation", "Donghua", "Novel", "Manhua",
        "Movie", "Zhu Xian II (Novel)", "Savage Journey (Prequel Novel)", "Jade Dynasty The Movie: Ten Years on Different Paths"}
BODY_WORDS = ()
ITEM_WORDS = ("Sword", "Mirror", "Bead", "Cauldron", "Book", "Artifacts")
PLACE_TYPES = ("city", "location", "mountain", "cave", "town", "village", "valley", "region")
FACTION_TYPES = ("sect", "clan", "family", "temple", "guild", "organization", "school", "tribe")
PLACES = {"Locations", "Huanyue Cave", "Yu Du City"}

# Pictures that aren't from the donghua (the wiki mixes in the live-action drama), and better donghua stand-ins.
NOT_DONGHUA = {"Dramaxiaofan.jpg", "Xiaozhan.webp"}
PRIMARY = {"Zhang Xiaofan": "Zhang Xiaofan.jpg"}

# When the wiki has the same page under several names, keep the one people actually say.
PREFER = {"Zhang Xiaofan", "Beast Deity", "Fen Xiang Valley", "Zhou Yixian", "You Ji", "Qing Long", "Hei Mu",
          "Nian Lao Da", "Qi Xiaoxuan", "Zeng Shucang", "Master Puzhi", "Daoist Qingye", "Black-Hearted Old Man",
          "HeHuan Sect", "Tian Yin Temple", "Xiao Yicai"}


def infobox(wikitext):
    for _, _, name, body in find_templates(wikitext):
        low = name.lower().replace("_", " ")
        if low.startswith(("character", "infobox", "donghua infobox", "organization")):
            return low, template_params(body)
    return None, {}


def first_ep(value):
    """Donghua debut -> continuous episode number. This wiki already counts on across seasons:
    "Episode 53 <small>(Season 3 Episode 1)</small>". "Chapter 14" is the novel, not an episode."""
    if not value:
        return None
    m = re.match(r"\s*Ep(?:isode)?\.?\s*(\d+)", plain(value), re.I)
    return int(m.group(1)) if m else None


def first_chapter(value):
    m = re.search(r"Chapter\s*(\d+)", plain(value or ""), re.I)
    return int(m.group(1)) if m else None


def classify(title, cats, box_kind, box):
    if title.startswith("Episode "):
        return "episode"
    if "Characters" in cats or (box_kind or "").startswith("character"):
        return "character"
    if title in LORE:
        return "lore"
    if title in PLACES or "Location" in cats:
        return "place"
    if "Sect" in cats or box_kind == "organization":
        return "faction"
    if "Artifacts" in cats:
        return "item"
    if any(w in title for w in BODY_WORDS):
        return "lore"
    kind = plain(box.get("type", "")).lower()
    if any(w in kind for w in FACTION_TYPES):
        return "faction"
    if any(w in kind for w in PLACE_TYPES):
        return "place"
    if box_kind and "item" in box_kind or any(w in title for w in ITEM_WORDS):
        return "item"
    if any(w in title for w in ("Sect", "Temple", "Valley", "Guild", "Hall")):
        return "faction"
    return "lore"


FIELDS = {
    "character": [("Chinese", "zh"), ("Pinyin", "pinyin"), ("Species", "species"), ("Race", "species"),
                  ("Gender", "gender"), ("Vital_Status", "status"), ("Cultivation_Realm", "realm"),
                  ("martial_artist_level", "realm"),
                  ("Affiliations", "affiliations"), ("Affiliation", "affiliations"), ("Titles", "titles"),
                  ("Aliases", "aliases"), ("Body", "physique"), ("Physique", "physique"), ("Bloodline(s)", "bloodline"),
                  ("Master(s)", "masters"), ("Disciple(s)", "disciples"), ("Family", "family"),
                  ("Relative(s)", "family"), ("Spouse(s)", "spouse"), ("Continent", "continent"),
                  ("World", "world"), ("Region", "region"), ("Legacy", "legacy"), ("Killed_By", "killedBy"),
                  ("Occupations", "occupation"), ("Occupation", "occupation"), ("Personality", "personality")],
    "other": [("chinese", "zh"), ("pinyin", "pinyin"), ("type", "type"), ("also_known_as", "aliases"),
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


def download(url):
    name = local_name(url)
    dest = IMG / name
    if not dest.exists():
        try:
            dest.write_bytes(get(url))
        except OSError as e:
            # Fandom's resizer 503s on animated GIFs. The original file usually still exists.
            original = re.sub(r"/scale-to-width-down/\d+", "", url)
            if original != url:
                try:
                    dest.write_bytes(get(original))
                    return url, f"img/wiki/{name}"
                except OSError as e2:
                    e = e2
            print("  image failed:", url, e)
            return url, None
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
    for title, d in sorted(pages.items(), key=lambda kv: (kv[0] not in PREFER, not kv[1].get("categories"), len(kv[0]))):
        # Only real duplicates count; tiny "under construction" stubs are all identical to each other.
        # Redirects were fetched as copies of their target, with no categories of their own.
        if "/" in title:
            continue
        h = hashlib.md5(d["wikitext"].strip().encode()).hexdigest()
        if h in by_hash:
            if len(d["wikitext"].strip()) >= 400 or not d.get("categories"):
                alias[title] = by_hash[h]
        else:
            by_hash[h] = title

    raw_uses = {}
    for d in pages.values():
        if d.get("image"):
            raw_uses[d["image"]] = raw_uses.get(d["image"], 0) + 1

    entries, wanted_files = {}, {}
    for title, d in pages.items():
        if "/" in title or title in SKIP or title in alias or len(d["wikitext"].strip()) < 30:
            continue
        cats = d.get("categories", [])
        if any(c in SKIP_CATS for c in cats):
            continue
        box_kind, box = infobox(d["wikitext"])
        kind = classify(title, cats, box_kind, box)
        entry = {"title": title, "kind": kind, "facts": facts(kind, box), "blocks": blocks(d["wikitext"])}
        if kind == "character":
            entry["ep"] = first_ep(box.get("Donghua") or box.get("donghua_debut") or box.get("donghua"))
            entry["ch"] = first_chapter(box.get("Novel") or box.get("light_novel_debut") or box.get("novel"))
            entry["tags"] = [c for c in cats if c in ("Allies", "Enemies", "Antagonists", "Main Characters",
                                                       "Human", "Male Characters", "Female Characters", "Alive", "Deceased")]
        elif box.get("donghua") or box.get("donghua_debut"):
            entry["ep"] = first_ep(box.get("donghua") or box.get("donghua_debut"))
        if kind == "episode":
            m = re.search(r"(\d+)", title)
            entry["ep"] = int(m.group(1))

        image = d.get("image")
        if image and urllib.parse.unquote(image).split("/revision")[0].rsplit("/", 1)[-1] in NOT_DONGHUA:
            image = None
        if title in PRIMARY:
            image = None
            wanted_files.setdefault(PRIMARY[title], []).append((title, "image"))
        elif image and raw_uses[image] >= 3:
            image = None  # a generic avatar or logo, not a picture of this page
        if not image and title not in PRIMARY:
            fname = primary_image_file(kind, box, d["wikitext"])
            if fname:
                wanted_files.setdefault(fname, []).append((title, "image"))
        elif image:
            entry["_image_url"] = thumb_url(image)

        # Gallery pictures, from the page itself and its /Gallery subpage.
        gal = gallery_files(d["wikitext"])
        sub = pages.get(title + "/Gallery")
        if sub:
            gal += gallery_files(sub["wikitext"])
        seen, g = set(), []
        for name, cap in gal:
            if name.replace("_", " ") in NOT_DONGHUA or name in NOT_DONGHUA:
                continue
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

    alias = {a: t for a, t in alias.items() if t in entries}  # aliases of skipped pages go too
    out = {"entries": entries, "alias": alias}
    js = "// Built by scripts/build_wiki.py from the Jade Dynasty (Zhu Xian) fan wiki. Do not edit by hand.\n"
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
