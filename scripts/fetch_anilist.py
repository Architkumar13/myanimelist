"""Enrich your list with metadata from AniList (looked up by MAL id, cached).

Usage: python3 scripts/fetch_anilist.py
Writes one JSON file per anime into cache/anilist/<mal_id>.json.
Uses curl rather than urllib so the macOS keychain's TLS roots are trusted.
"""
import json
import pathlib
import subprocess
import time

import mal_list

ROOT = pathlib.Path(__file__).resolve().parent.parent
CACHE = ROOT / "cache" / "anilist"
CACHE.mkdir(parents=True, exist_ok=True)

BATCH = 50
DELAY = 2.5  # AniList allows ~30-90 req/min.
QUERY = """
query ($ids: [Int]) {
  Page(perPage: 50) {
    media(idMal_in: $ids, type: ANIME) {
      idMal
      title { english romaji }
      coverImage { large extraLarge color }
      bannerImage
      genres
      tags { name rank isMediaSpoiler }
      studios(isMain: true) { nodes { name } }
      seasonYear season
      startDate { year }
      averageScore popularity duration source format episodes
      description(asHtml: false)
    }
  }
}
"""


def fetch(ids):
    payload = json.dumps({"query": QUERY, "variables": {"ids": ids}})
    for attempt in range(5):
        r = subprocess.run(
            ["curl", "-s", "-m", "30", "-w", "\n%{http_code}",
             "-H", "Content-Type: application/json", "-H", "Accept: application/json",
             "-d", payload, "https://graphql.anilist.co"],
            capture_output=True, text=True,
        )
        body, _, code = r.stdout.rpartition("\n")
        if code == "200":
            return json.loads(body)["data"]["Page"]["media"]
        print(f"  AniList HTTP {code}, retrying", flush=True)
        time.sleep(60 if code == "429" else 5 * (attempt + 1))
    raise RuntimeError(f"giving up on batch starting {ids[0]}")


def main(refresh=(), log=print):
    """Fetch titles missing from the cache, plus any in `refresh` (shows still airing change)."""
    ids = mal_list.ids()
    refresh = set(refresh)
    todo = [i for i in ids if i in refresh or not (CACHE / f"{i}.json").exists()]
    log(f"{len(ids)} titles, {len(todo)} to fetch")
    for start in range(0, len(todo), BATCH):
        chunk = todo[start:start + BATCH]
        media = fetch(chunk)
        found = {m["idMal"]: m for m in media}
        for mal_id in chunk:
            # Write a null marker for titles AniList doesn't know so reruns skip them.
            (CACHE / f"{mal_id}.json").write_text(json.dumps(found.get(mal_id)), encoding="utf-8")
        log(f"{start + len(chunk)}/{len(todo)} ({len(found)}/{len(chunk)} matched)")
        time.sleep(DELAY)
    log("done")


if __name__ == "__main__":
    main()
