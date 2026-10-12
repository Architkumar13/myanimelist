"""Your list, read from whichever is newer: a MAL export file or the last sync (cache/mal_list.json).

Every other script asks this module for the list, so a sync and a fresh export both just work.
"""
import gzip
import json
import pathlib
import xml.etree.ElementTree as ET
from datetime import datetime, timezone

ROOT = pathlib.Path(__file__).resolve().parent.parent
SYNCED = ROOT / "cache" / "mal_list.json"


def _export():
    return max(ROOT.glob("animelist_*.xml.gz"), key=lambda p: p.stat().st_mtime, default=None)


def _from_export(path):
    root = ET.fromstring(gzip.open(path).read())
    entries = []
    for a in root.findall("anime"):
        g = lambda k: a.findtext(k) or ""
        fin = g("my_finish_date")
        entries.append({
            "id": int(g("series_animedb_id")),
            "title": g("series_title"),
            "type": g("series_type"),
            "eps": int(g("series_episodes") or 0),
            "watched": int(g("my_watched_episodes") or 0),
            "score": int(g("my_score") or 0),
            "status": g("my_status"),
            "finish": "" if fin.startswith("0000") else fin,
        })
    return root.find("myinfo").findtext("user_name"), entries


def load():
    """Return {user, entries, source, updated}: the newer of the synced list and the export."""
    export, synced = _export(), SYNCED if SYNCED.exists() else None
    if synced and (not export or synced.stat().st_mtime >= export.stat().st_mtime):
        data = json.loads(synced.read_text(encoding="utf-8"))
        return {**data, "source": "sync"}
    if not export:
        raise SystemExit("No list found. Put a MAL export (animelist_*.xml.gz) in the project folder, or run scripts/sync.py.")
    user, entries = _from_export(export)
    updated = datetime.fromtimestamp(export.stat().st_mtime, timezone.utc).isoformat(timespec="seconds")
    return {"user": user, "entries": entries, "source": "export", "updated": updated}


def ids():
    return [e["id"] for e in load()["entries"]]
