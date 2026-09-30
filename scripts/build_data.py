"""Merge your list with cached AniList metadata into site/data/anime.js and extra.js.

Usage: python3 scripts/build_data.py
(run fetch_anilist.py first, and fetch_anilist_extra.py for extra.js)
"""
import html
import json
import pathlib
import re

import mal_list

ROOT = pathlib.Path(__file__).resolve().parent.parent
CACHE = ROOT / "cache" / "anilist"
EXTRA_CACHE = ROOT / "cache" / "anilist_extra"
OUT = ROOT / "site" / "data" / "anime.js"
EXTRA_OUT = ROOT / "site" / "data" / "extra.js"

SOURCES = {
    "MANGA": "Manga", "LIGHT_NOVEL": "Light novel", "ORIGINAL": "Original",
    "WEB_NOVEL": "Web novel", "NOVEL": "Novel", "VISUAL_NOVEL": "Visual novel",
    "VIDEO_GAME": "Video game", "GAME": "Game",
}


def short(text, limit=420):
    if not text:
        return ""
    text = html.unescape(re.sub(r"<[^>]+>", "", text))
    text = re.sub(r"\(Source:[^)]*\)|\[Written by MAL Rewrite\]|Note:.*$", "", text, flags=re.S)
    text = re.sub(r"\s+", " ", text).strip()
    if len(text) <= limit:
        return text
    return text[:limit].rsplit(" ", 1)[0] + "…"


def main(log=print):
    mal = mal_list.load()
    items, missing = [], 0
    for e in mal["entries"]:
        mal_id = e["id"]
        cached = CACHE / f"{mal_id}.json"
        m = (json.loads(cached.read_text()) if cached.exists() else None) or {}
        missing += not m
        cover = m.get("coverImage") or {}
        items.append({
            "id": mal_id,
            "t": e["title"],
            "en": (m.get("title") or {}).get("english") or "",
            "type": e["type"],
            "eps": e["eps"] or m.get("episodes") or 0,
            "w": e["watched"],
            "s": e["score"],
            "st": e["status"],
            "fin": e["finish"],
            "img": cover.get("large") or "",
            "big": cover.get("extraLarge") or "",
            "col": cover.get("color") or "",
            "g": m.get("genres") or [],
            "tags": [t["name"] for t in (m.get("tags") or [])
                     if t["rank"] >= 60 and not t["isMediaSpoiler"]][:6],
            "studio": [s["name"] for s in ((m.get("studios") or {}).get("nodes") or [])],
            "year": m.get("seasonYear") or (m.get("startDate") or {}).get("year") or 0,
            "season": (m.get("season") or "").title(),
            "crowd": round((m.get("averageScore") or 0) / 10, 1),
            "pop": m.get("popularity") or 0,
            "dur": m.get("duration") or 0,
            "src": SOURCES.get(m.get("source") or "", (m.get("source") or "").title()),
            "syn": short(m.get("description")),
        })

    # "updated" is when the list itself was last read from MAL (sync time, or the export file's date).
    payload = {"user": mal["user"], "source": mal["source"], "updated": mal["updated"], "items": items}
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("window.ANIME = " + json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + ";\n")
    log(f"wrote {len(items)} titles to {OUT.relative_to(ROOT)} ({missing} without AniList data)")
    if EXTRA_CACHE.exists():
        build_extra([i["id"] for i in items], log)


class Table:
    """Dedupe repeated records (characters, linked titles) into one list of rows."""

    def __init__(self, row):
        self.row, self.index, self.rows = row, {}, []

    def add(self, key, obj):
        if key not in self.index:
            self.index[key] = len(self.rows)
            self.rows.append(self.row(obj))
        return self.index[key]


def media_row(n):
    return {
        "al": n["id"], "mal": n.get("idMal") or 0,
        "t": (n.get("title") or {}).get("romaji") or "",
        "en": (n.get("title") or {}).get("english") or "",
        "fmt": n.get("format") or "", "st": n.get("status") or "",
        "img": (n.get("coverImage") or {}).get("large") or "",
        "col": (n.get("coverImage") or {}).get("color") or "",
        "crowd": round((n.get("averageScore") or 0) / 10, 1),
        "pop": n.get("popularity") or 0, "eps": n.get("episodes") or 0,
        "year": n.get("seasonYear") or 0, "g": n.get("genres") or [],
    }


def build_extra(mal_ids, log=print):
    # Character names are only used to redact synopses in Guess the anime.
    chars = Table(lambda c: {"n": c["name"]["full"]})
    media = Table(media_row)
    out = {"air": {}, "rel": {}, "cast": {}, "recs": {}}
    for mal_id in mal_ids:
        f = EXTRA_CACHE / f"{mal_id}.json"
        m = json.loads(f.read_text()) if f.exists() else None
        if not m:
            continue
        k = str(mal_id)
        nxt = m.get("nextAiringEpisode")
        out["air"][k] = [m["id"], m.get("status") or "", nxt["airingAt"] if nxt else 0, nxt["episode"] if nxt else 0]
        out["rel"][k] = [
            [e["relationType"], media.add(e["node"]["id"], e["node"])]
            for e in m["relations"]["edges"] if e["node"]["type"] == "ANIME"
        ]
        out["cast"][k] = [chars.add(e["node"]["id"], e["node"]) for e in m["characters"]["edges"]]
        out["recs"][k] = [
            [media.add(n["mediaRecommendation"]["id"], n["mediaRecommendation"]), n["rating"]]
            for n in m["recommendations"]["nodes"]
            if n.get("mediaRecommendation") and n["rating"] > 0
        ]
    out.update(chars=chars.rows, media=media.rows)
    EXTRA_OUT.write_text("window.EXTRA = " + json.dumps(out, ensure_ascii=False, separators=(",", ":")) + ";\n")
    log(f"wrote {EXTRA_OUT.relative_to(ROOT)}: {len(chars.rows)} characters, {len(media.rows)} linked titles")


if __name__ == "__main__":
    main()
