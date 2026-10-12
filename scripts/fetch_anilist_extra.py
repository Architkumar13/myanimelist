"""Fetch relations, character names, recommendations and airing info from AniList (cached).

Usage: python3 scripts/fetch_anilist_extra.py
Writes one JSON file per anime into cache/anilist_extra/<mal_id>.json.
Split from fetch_anilist.py because these nested lists force smaller batches.
"""
import json
import pathlib
import subprocess
import time

import mal_list

ROOT = pathlib.Path(__file__).resolve().parent.parent
CACHE = ROOT / "cache" / "anilist_extra"
CACHE.mkdir(parents=True, exist_ok=True)

BATCH = 25
DELAY = 2.5
NODE = "id idMal type format status title { english romaji } coverImage { large color } averageScore popularity episodes seasonYear"
QUERY = f"""
query ($ids: [Int]) {{
  Page(perPage: {BATCH}) {{
    media(idMal_in: $ids, type: ANIME) {{
      idMal id status
      nextAiringEpisode {{ airingAt episode }}
      relations {{ edges {{ relationType node {{ {NODE} }} }} }}
      characters(sort: [ROLE, RELEVANCE], perPage: 10) {{ edges {{ node {{ id name {{ full }} }} }} }}
      recommendations(sort: RATING_DESC, perPage: 8) {{
        nodes {{ rating mediaRecommendation {{ {NODE} genres }} }}
      }}
    }}
  }}
}}
"""


def fetch(ids):
    payload = json.dumps({"query": QUERY, "variables": {"ids": ids}})
    for attempt in range(5):
        r = subprocess.run(
            ["curl", "-s", "-m", "60", "-w", "\n%{http_code}",
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
        found = {m["idMal"]: m for m in fetch(chunk)}
        for mal_id in chunk:
            (CACHE / f"{mal_id}.json").write_text(json.dumps(found.get(mal_id)), encoding="utf-8")
        log(f"{start + len(chunk)}/{len(todo)}")
        time.sleep(DELAY)
    log("done")


if __name__ == "__main__":
    main()
