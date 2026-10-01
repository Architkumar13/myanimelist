"""Download every article from the Jade Dynasty (Zhu Xian) fan wiki into cache/wiki/.

Usage: python3 scripts/fetch_wiki.py [--refresh]
Saves one JSON per page (wikitext, categories, page image). Pages already cached are skipped
unless --refresh is given. Then run scripts/build_wiki.py to turn the cache into site data.
"""
import argparse
import json
import pathlib
import time

from wikiapi import api, safe_name

ROOT = pathlib.Path(__file__).resolve().parent.parent
CACHE = ROOT / "cache" / "wiki"


def all_titles():
    titles, params = [], {"action": "query", "list": "allpages", "aplimit": "500", "apnamespace": "0"}
    while True:
        data = api(params)
        titles += [p["title"] for p in data["query"]["allpages"]]
        if "continue" not in data:
            return titles
        params.update(data["continue"])


def fetch_batch(titles):
    """Categories and page images for up to 50 titles at once."""
    data = api({
        "action": "query", "titles": "|".join(titles), "prop": "pageimages|categories",
        "piprop": "original", "cllimit": "500", "redirects": "1",
    })
    out = {}
    for page in data["query"]["pages"].values():
        out[page["title"]] = {
            "categories": [c["title"].removeprefix("Category:") for c in page.get("categories", [])],
            "image": (page.get("original") or {}).get("source"),
        }
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--refresh", action="store_true")
    args = ap.parse_args()
    CACHE.mkdir(parents=True, exist_ok=True)

    titles = all_titles()
    todo = [t for t in titles if args.refresh or not (CACHE / f"{safe_name(t)}.json").exists()]
    print(f"{len(titles)} pages on the wiki, {len(todo)} to fetch")

    for i in range(0, len(todo), 50):
        batch = todo[i:i + 50]
        meta = fetch_batch(batch)
        for title in batch:
            parsed = api({"action": "parse", "page": title, "prop": "wikitext", "redirects": "1"})
            if "parse" not in parsed:
                continue
            record = {"title": title, "wikitext": parsed["parse"]["wikitext"], **meta.get(title, {})}
            (CACHE / f"{safe_name(title)}.json").write_text(json.dumps(record, ensure_ascii=False))
            time.sleep(0.05)
        print(f"  {min(i + 50, len(todo))}/{len(todo)}")


if __name__ == "__main__":
    main()
