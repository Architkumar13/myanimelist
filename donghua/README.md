# Donghua companions

One website for every donghua here, plus each show's notes and build scripts.

| Folder | Show |
|---|---|
| [shrouding-the-heavens/](shrouding-the-heavens/README.md) | *Shrouding the Heavens* (遮天) |
| [the-great-ruler/](the-great-ruler/README.md) | *The Great Ruler* (大主宰) |
| [martial-universe/](martial-universe/README.md) | *Martial Universe* (武动乾坤) |
| [renegade-immortal/](renegade-immortal/README.md) | *Renegade Immortal* (仙逆) |
| [battle-through-the-heavens/](battle-through-the-heavens/README.md) | *Battle Through the Heavens* (斗破苍穹) |

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
