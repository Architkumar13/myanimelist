# archit13 weekly

A static site built from a MyAnimeList export.

- **Wrapped** and **Shelf**
- **Explore:** Time machine (bookshelf timeline), Colour wall, Year by year
- **Discover:** Unfinished business (missing sequels), For you (recommendations), Now airing (live TV guide), Next season (upcoming shows ranked for you, with a shortlist), Pick for me
- **Play:** Higher or lower (you vs you, or you vs the crowd), Guess the anime (including a daily challenge), Tier list

Also: quick search (⌘K or `/`), a night edition, filters saved in the address bar, a detail view with the whole
franchise and your rank, "Save my Wrapped" as an image, and calendar export for airing shows. Try typing "dattebayo".

## Running it

```bash
python3 scripts/serve.py
```

This opens the site at http://localhost:8000 with the **Sync** button working: it pulls your current list from
MyAnimeList, looks up anything new on AniList, and reloads the page with a summary of what changed. Your MAL list
must be public. (MAL doesn't let web pages read lists directly, which is why a small local server does it.)

You can also open `site/index.html` directly. Everything works except Sync, which then explains how to start the server.

## Refreshing the data

**Easiest:** press Sync, or run `python3 scripts/sync.py [username]` from the terminal. Both save the list to
`cache/mal_list.json`, fetch AniList data for new titles and for shows still airing, and rebuild `site/data/`.

**From an export file instead:**

1. Export a new list from MyAnimeList and drop the `animelist_*.xml.gz` in this folder. The scripts use whichever is newer, the export or the last sync.
2. `python3 scripts/fetch_anilist.py` fetches covers, genres and crowd scores (cached in `cache/anilist/`; delete that folder to refetch everything).
3. `python3 scripts/fetch_anilist_extra.py` fetches relations, character names, recommendations and airing info (cached in `cache/anilist_extra/`).
4. `python3 scripts/build_data.py` writes `site/data/anime.js` and `site/data/extra.js`.

Now airing and Next season load live from AniList in the browser. Now airing falls back to the cached data offline; Next season keeps the last copy of each season it loaded.
