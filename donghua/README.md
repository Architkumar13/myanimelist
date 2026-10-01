# Donghua companions

One website for every donghua here, plus each show's notes and build scripts.

| Folder | Show |
|---|---|
| [shrouding-the-heavens/](shrouding-the-heavens/README.md) | *Shrouding the Heavens* (遮天) |
| [the-great-ruler/](the-great-ruler/README.md) | *The Great Ruler* (大主宰) |
| [martial-universe/](martial-universe/README.md) | *Martial Universe* (武动乾坤) |
| [renegade-immortal/](renegade-immortal/README.md) | *Renegade Immortal* (仙逆) |
| [battle-through-the-heavens/](battle-through-the-heavens/README.md) | *Battle Through the Heavens* (斗破苍穹) |
| [jade-dynasty/](jade-dynasty/README.md) | *Jade Dynasty* (诛仙) |

## The website

**Open it:** double-click `site/index.html`, or run `python3 -m http.server 8000 -d site` and go to
http://localhost:8000. The first page lists every show. Picking one opens its companion at `index.html?show=<id>`.

The "All shows" link at the bottom of the side rail goes back to the list.

```
site/
  index.html, css/, js/        the engine, shared by every show
  shows.js                     the list of shows: id, folder, titles, palette, default episode
  shows/<folder>/show.js       that show's page text, nav labels, realm figure and map
  shows/<folder>/atlas.js      optional: the World page's "world keeps growing" stages and their map points
  shows/<folder>/pages.js      optional: hand-built extra pages (most shows only need show.js `extraPages`)
  shows/<folder>/data/         world.js (hand-written), episodes.js, cast.js, wiki.js (built)
  shows/<folder>/img/          hero, wiki and cast pictures
```

Each show folder has a `site` link pointing at `site/shows/<folder>/`, so its scripts still write to
`<folder>/site/data/` and `<folder>/site/img/` as they always did.

## Adding a show

1. Make `donghua/<folder>/` for the notes, `data/` and `scripts/`. Copying the scripts from *The Great Ruler* is
   the quickest start. Change the wiki address in `scripts/wikiapi.py`.
2. Make `site/shows/<folder>/` and link it: `ln -s ../site/shows/<folder> <folder>/site`.
3. Copy a `show.js` from another show and rewrite it. Leave `realms.figure` out to get a plain realm list instead of a
   drawing. `map.lands` holds one SVG shape per region id in `world.js`.
4. Write `data/world.js` by hand, following the same shape as the other shows. Run the show's scripts for the rest.
   Only `show.js` and `world.js` are required; the site copes with no episodes, cast or wiki yet.
5. Add one entry to `site/shows.js`: a short `id` for the address, the `dir`, titles, a hero picture and a palette.
6. Check it: `node tools/validate.mjs <id>` (data shape, episode numbers, cross-links, missing pictures) and
   `python3 tools/smoke.py <id>` (loads every page in a headless browser). Both exit non-zero on a problem.

## Design notes

`docs/2026-10-01-donghua-hub-design.md` explains the layout and why it is built this way.

## Tools (`tools/`)

Shared by every show. Run them with `.tools/venv/bin/python` after a one-time `tools/setup.sh`. Setup creates
`.tools/` with a Python environment (yt-dlp with browser impersonation, OpenCV, ffmpeg, macOS text recognition),
the keychain certificates and two face models. Nothing depends on `/tmp` any more.

| Script | What it does |
|---|---|
| `animekhor.py` | Episode pages on AnimeKhor (where the episodes are watched): `latest`, `subs`, `ocr`, `still`, `window`, `pick` |
| `new_episode.py` | Weekly update, part 1: finds new episodes, fetches their subtitles and lists their name cards |
| `REVIEW.md` | How to write a subtitle-checked episode review (for people and agents) |
| `apply_review.py` | Weekly update, part 2: reviews -> episode data, realms and first appearances in the roster, new-character candidates |
| `bestface.py` | Finds the clearest face near a name card, skipping people it can't be (for new characters) |
| `portraits.py` | Renders `picks.json` into 3:4 portraits (Shrouding the Heavens' first-pass pictures use its own `scripts/stills/render.py`) |
| `shows.json` | Per show: folder, how its AnimeKhor pages are found, which subtitles it has (`id` track, or `ocr`), and optionally `youtube`: a file mapping episodes to the studio's official YouTube uploads, used first for subtitles and stills |

The whole weekly routine is the `new-episode` skill in `.claude/skills/`: ask Claude Code to "add the new episode" or
run `/new-episode`.

Subtitle notes:
- Shrouding the Heavens has an Indonesian subtitle file for every episode from EP51.
- The Great Ruler has none, so its burned-in English subtitles are read off the frames. Season 1's Dailymotion
  copies are gone, so those come from the ok.ru mirror.
- Martial Universe takes official English and Chinese subtitles from Yuewen Animation's YouTube uploads
  (`martial-universe/data/episodes/youtube.json`); EP66-67 have no track there, so they use AnimeKhor's Indonesian one.
- Battle Through the Heavens takes the official English track from Yuewen Animation's YouTube uploads, most of them
  season compilations cut per episode by `battle-through-the-heavens/scripts/official_subs.py`. The newest uploads
  have the English burned in, so those episodes use AnimeKhor's Indonesian track or OCR.
- Name cards (`[Name, faction, realm]`) are the most reliable evidence for who someone is and how strong they are.
