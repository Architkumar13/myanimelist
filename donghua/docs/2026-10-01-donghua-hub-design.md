# Donghua hub: one site for every donghua companion

Approved in chat on 2026-10-01.

## Goal

`shrouding-the-heavens/` and `the-great-ruler/` each had their own copy of the same spoiler-aware companion site.
Put both under `donghua/`, serve them from one website, and make adding a third show a data job, not a code fork.

## Layout

```
donghua/
  README.md                  how the hub works, how to add a show
  site/                      the one website
    index.html               shell: library page when there is no ?show=, the companion when there is
    shows.js                 registry (id, folder, titles, palette, default episode)
    css/style.css            shared styles; each show's palette arrives as CSS variables
    js/boot.js               reads ?show=, applies the theme, loads that show's files in order
    js/lib.js views.js people.js app.js   the engine, no show names in it
    shows/<folder>/show.js   everything that is text or shape for one show
    shows/<folder>/data/     world.js, episodes.js, cast.js, wiki.js (built by that show's scripts)
    shows/<folder>/img/      hero, wiki, cast pictures
  <folder>/                  notes, data/, scripts/, cache/ for each show (moved as-is)
```

## Decisions

- **URL:** `index.html?show=sth#/realms`. The query string picks the show, the hash stays the in-show route, so
  every existing `#/...` link keeps working and switching shows is a normal page load. Works from `file://`.
- **Loading:** `boot.js` injects the show's scripts one after another (no `fetch`, so double-clicking still works).
  Only the chosen show's 2–3 MB wiki file is loaded.
- **Per-show config (`show.js`):** page headings and ledes, nav labels, hero, home steps, realm figure (SVG body
  diagram or a plain realm list), map shapes, the name of the hero character, Chinese realm labels, wiki URL,
  search placeholder. Engine views read these instead of hard-coded strings.
- **Asset paths:** data files hold site-relative paths (`shows/<folder>/img/...`). Build scripts write them that way.
- **Progress:** one localStorage key per show (`sth-progress`, `tgr-progress`, unchanged), so nothing resets.
- **Styles:** the Shrouding stylesheet is the base (it has the newer People styles), plus the Great Ruler realm list.
  Palette variables come from `shows.js`. The realm meter's tick count follows the show's ladder length.
- **Python:** each show keeps its own scripts. Only their output paths change. Merging the near-identical scripts is
  left for later: the stills pipeline is actively used and differs per show.

## Adding a show

1. `donghua/<folder>/` with notes, `data/`, `scripts/`.
2. `donghua/site/shows/<folder>/show.js` (copy one and edit), plus `data/` and `img/`.
3. One entry in `donghua/site/shows.js`.

## Verification

Open every route of both shows in a headless browser, check for console errors, and check that images load.
