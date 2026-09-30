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
    "Main Page", "Policies and Guidelines", "Editing and Commenting Guidelines", "Cast", "Staff", "Quotes",
    "Enemies", "Locations", "Characters", "Light Novel", "Kaisar kejam", "Shrouding the Heavens Wiki", "Sects",
    "Unfettered Sect", "Southern Mountains", "Other", "Ancient Desolation Noble Families", "Donghua/Cast",
    "Donghua/Staff", "Donghua Season 1",
}
LORE = {
    "Cultivation", "Wheel and Sea Realm", "Wheel And Sea Realm", "Sea of Bitterness", "Spring of Life",
    "Divine Bridge", "Paramita", "Wheel Of Life", "Dao Palace Realm", "Heart's Divine Depository",
    "Lung's Divine Depository", "Liver's Divine Depository", "Spleen's Divine Depository",
    "Kidney's Divine Depository", "Four Pole Realm", "Dragon Transformation Realm", "Immortal Platform Realm",
    "Immortal Platform Realm First Heaven", "Half-Step Supreme Being", "Supreme Being", "Supreme King", "Saint",
    "Saint King", "Great Saint", "Quasi-Emperor", "Great Emperor", "Red Dust Immortal", "Immortal of the Mortal World",
    "Immortal King", "Quasi-Immortal Emperor", "Transcendence", "Five Secret Realms", "Physiques",
    "Great Dao Wounds", "Great Eras", "Chaos Ancient Era", "Chaotic Ancient Era", "Mythological Era",
    "Supreme Ancient Era", "Post-Barren Ancient Era", "Forbidden Zones", "Dark Supreme Beings", "Darkness Chaos",
    "Nine Heavenly Venerables", "Great Emperor Scriptures", "Dao Scriptures", "Divine Medicine", "Heaven",
    "Immortal Domain", "Stone Gambling", "Divine Source", "Nine Secret Technique", "Tyrant Blood of the Firmament",
    "Investiture of the Gods", "Donghua Vs Novel", "Donghua/Donghua Vs Novel", "Donghua", "Shrouding the Heavens (Donghua)",
    "Donghua/Donghua Seasons", "Donghua/Episodes", "Donghua/Movie", "Shrouding the Heavens Movie:Battle Against Wang Teng",
}
BODY_WORDS = ("Body", "Physique", "Dao Fetus")
ITEM_WORDS = ("Scripture", "Bell", "Mirror", "Sword", "Painting", "Copper", "Mother Qi", "Stone", "Book",
              "Coffin", "Art", "Volume")
PLACE_TYPES = ("continent", "region", "planet", "star", "world", "city", "location", "temple", "mine", "area", "land")
FACTION_TYPES = ("sect", "clan", "family", "dynasty", "holy land", "paradise", "race", "organization", "court",
                 "tribe", "academy", "manor", "palace", "dao", "school", "country", "kingdom")
PLACES = {"Beidou", "Northern Big Dipper", "Eastern Wastelands", "The Central Region of the Eastern Barren",
          "Northern Plains", "Western Deserts", "Central States", "Ziwei Ancient Star", "Da Lei Yin Temple",
          "Primordial Ancient Mine", "Ancient Desolation Forbidden Lands", "The Divine City", "The Rising Sun City",
          "Fairy Feather Star", "Eternal Lord Star", "Heavenly Soldier Ancient Planet", "Ancient Star Field Yuhua",
          "Alkaid", "Humble Peak", "Yao Guang palace", "Jade Lake"}


# When the wiki has the same page under several names, keep the one people actually say.
PREFER = {"Black Emperor", "Azure Emperor", "Yaochi Holy Land", "Yaoguang Holy Land", "Wind Clan", "Demon Race",
          "Undying Heavenly Emperor", "Heavenly Emperor Huang", "Great Emperor Wu Shi", "Heng Yu",
          "Ancient Desolation Sacred Body", "Qishi Manor", "Qingxia Sect", "Sacred Prince", "Red Dust Immortal",
          "Cultivation", "Beidou", "Duan De", "Yao Guang", "Ji Chengdao"}


def infobox(wikitext):
    for _, _, name, body in find_templates(wikitext):
        low = name.lower().replace("_", " ")
        if low.startswith(("character", "infobox", "donghua infobox")):
            return low, template_params(body)
    return None, {}


def first_ep(value):
    """'S1, Ep81 {{Sidenote|1st Appearance}}' -> 81. Season 2+ numbering is ambiguous, so skip it."""
    if not value:
        return None
    text = plain(value)
    m = re.search(r"(?:S(\d+)\W*)?Ep(?:isode)?\.?\s*(\d+)", text, re.I)
    if not m:
        return None
    if m.group(1) and m.group(1) != "1":
        return None
    return int(m.group(2))


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
    if title in PLACES:
        return "place"
    if any(w in title for w in BODY_WORDS):
        return "lore"
    kind = plain(box.get("type", "")).lower()
    if any(w in kind for w in FACTION_TYPES):
        return "faction"
    if any(w in kind for w in PLACE_TYPES):
        return "place"
    if box_kind and "item" in box_kind or any(w in title for w in ITEM_WORDS):
        return "item"
    if any(w in title for w in ("Sect", "Clan", "Family", "Dynasty", "Holy Land", "Paradise", "Race", "Court",
                                "Tribe", "Academy", "Manor", "Dao", "Temple", "Sacred Lands", "Heavenly Paradises",
                                "Imperial Clans", "Kishi", "Qishi", "Land of Tranquility")):
        return "faction"
    return "lore"


FIELDS = {
    "character": [("Chinese", "zh"), ("Pinyin", "pinyin"), ("Species", "species"), ("Race", "species"),
                  ("Gender", "gender"), ("Vital_Status", "status"), ("Cultivation_Realm", "realm"),
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
        if "/" in title or title in SKIP or title in alias or len(d["wikitext"].strip()) < 30:
            continue
        cats = d.get("categories", [])
        box_kind, box = infobox(d["wikitext"])
        kind = classify(title, cats, box_kind, box)
        entry = {"title": title, "kind": kind, "facts": facts(kind, box), "blocks": blocks(d["wikitext"])}
        if kind == "character":
            entry["ep"] = first_ep(box.get("Donghua"))
            entry["ch"] = first_chapter(box.get("Novel"))
            entry["tags"] = [c for c in cats if c in ("Allies", "Enemies", "Human", "Demon", "Male", "Female",
                                                       "Alive", "Deceased")]
        elif box.get("donghua"):
            entry["ep"] = first_ep(box["donghua"])
        if kind == "episode":
            m = re.search(r"(\d+)", title)
            entry["ep"] = int(m.group(1))

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

    out = {"entries": entries, "alias": alias}
    js = "// Built by scripts/build_wiki.py from the Shrouding the Heavens fan wiki. Do not edit by hand.\n"
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
