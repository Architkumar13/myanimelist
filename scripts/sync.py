"""Pull your current list straight from MyAnimeList and rebuild the site's data.

Usage: python3 scripts/sync.py [username]
Reads the public list at myanimelist.net/animelist/<user>/load.json (no API key; the list must be public),
saves it to cache/mal_list.json, fetches AniList data for new titles and for shows still airing,
then runs build_data. The site's Sync button (scripts/serve.py) calls sync() directly.
"""
import json
import subprocess
import sys
import time
from datetime import datetime, timezone

import build_data
import fetch_anilist
import fetch_anilist_extra
import mal_list

PAGE = 300  # load.json returns at most 300 entries per request.
STATUSES = {1: "Watching", 2: "Completed", 3: "On-Hold", 4: "Dropped", 6: "Plan to Watch"}
AIRING = {"RELEASING", "NOT_YET_RELEASED", "HIATUS"}


class SyncError(Exception):
    pass


def get_page(user, offset):
    url = f"https://myanimelist.net/animelist/{user}/load.json?offset={offset}&status=7"
    r = subprocess.run(["curl", "-s", "-m", "30", "-w", "\n%{http_code}", "-A", "archit13-weekly/1.0", url],
                       capture_output=True, text=True)
    body, _, code = r.stdout.rpartition("\n")
    if code == "200":
        return json.loads(body)
    if code in ("400", "404"):
        raise SyncError(f"MyAnimeList has no public list for “{user}”. Check the username, and that the list isn't private.")
    raise SyncError(f"MyAnimeList didn't respond (HTTP {code or 'timeout'}). Try again in a minute.")


def finish_date(s):
    """load.json dates follow the account's date setting; this list uses mm-dd-yy."""
    if not s:
        return ""
    a, b, y = (int(x) for x in s.split("-"))
    month, day = (b, a) if a > 12 else (a, b)
    return f"{2000 + y if y < 70 else 1900 + y}-{month:02d}-{day:02d}"


def fetch_list(user, log):
    raw, offset = [], 0
    while True:
        page = get_page(user, offset)
        raw += page
        log(f"Read {len(raw)} titles from MyAnimeList")
        if len(page) < PAGE:
            break
        offset += PAGE
        time.sleep(1)
    return [{
        "id": x["anime_id"],
        "title": str(x["anime_title"]),
        "type": x["anime_media_type_string"] or "Unknown",
        "eps": x["anime_num_episodes"] or 0,
        "watched": x["num_watched_episodes"] or 0,
        "score": x["score"] or 0,
        "status": STATUSES.get(x["status"], "Plan to Watch"),
        "finish": finish_date(x.get("finish_date_string")),
    } for x in raw]


def still_airing():
    """Shows whose cached AniList data was airing or announced: their episodes and dates move."""
    out = []
    for f in fetch_anilist_extra.CACHE.glob("*.json"):
        m = json.loads(f.read_text(encoding="utf-8"))
        if m and m.get("status") in AIRING:
            out.append(int(f.stem))
    return out


def diff(old, new):
    before = {e["id"]: e for e in old}
    after = {e["id"]: e for e in new}
    item = lambda e: {"id": e["id"], "title": e["title"]}
    changes = {
        "added": [item(e) for e in new if e["id"] not in before],
        "removed": [item(e) for e in old if e["id"] not in after],
        "finished": [], "rescored": [], "progress": [],
    }
    for e in new:
        b = before.get(e["id"])
        if not b:
            continue
        if e["status"] == "Completed" and b["status"] != "Completed":
            changes["finished"].append(item(e))
        if e["score"] != b["score"]:
            changes["rescored"].append({**item(e), "from": b["score"], "to": e["score"]})
        elif e["watched"] > b["watched"] and e["status"] != "Completed":
            changes["progress"].append({**item(e), "from": b["watched"], "to": e["watched"]})
    return changes


def sync(user=None, log=print):
    current = mal_list.load()
    user = user or current["user"]
    entries = fetch_list(user, log)
    if not entries:
        raise SyncError(f"“{user}”'s list came back empty, so nothing was changed.")
    changes = diff(current["entries"] if current["user"] == user else [], entries)

    mal_list.SYNCED.parent.mkdir(parents=True, exist_ok=True)
    updated = datetime.now(timezone.utc).isoformat(timespec="seconds")
    mal_list.SYNCED.write_text(json.dumps({"user": user, "updated": updated, "entries": entries}, ensure_ascii=False), encoding="utf-8")

    airing = still_airing()
    log(f"Fetching covers and details for new titles, and refreshing {len(airing)} airing shows")
    fetch_anilist.main(refresh=airing, log=log)
    log("Fetching sequels, recommendations and airing times")
    fetch_anilist_extra.main(refresh=airing, log=log)
    build_data.main(log=log)
    changes["user"], changes["updated"], changes["total"] = user, updated, len(entries)
    return changes


def main():
    try:
        c = sync(sys.argv[1] if len(sys.argv) > 1 else None)
    except SyncError as e:
        sys.exit(str(e))
    parts = [f"{len(c[k])} {label}" for k, label in
             [("added", "added"), ("removed", "removed"), ("finished", "finished"), ("rescored", "rescored")] if c[k]]
    print(f"Synced {c['total']} titles for {c['user']}: " + (", ".join(parts) if parts else "no changes to your list") + ".")


if __name__ == "__main__":
    main()
