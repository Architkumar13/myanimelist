# The world expands: a scroll-driven World page for Shrouding the Heavens

Agreed in chat on 2026-10-01 (scroll zoom-out, one world with one camera, cards with places, factions, power ceiling,
scale facts and key events). The user asked to carry on to the end without stopping at each review.

> **Later change (2026-10-01):** the spoiler system (seals, the "watched up to" episode, saved progress) was removed from the whole site at the user's request. Everything is shown at its latest state; episode numbers remain only as labels. Parts of this doc that describe seals no longer apply.

## Goal

In *Shrouding the Heavens* the world keeps growing: a mortal kingdom, then a region, then a continent-sized planet,
then the star field. The World page should show that growth as a picture, stage by stage, with enough detail on each
stage to be useful, and without spoiling anything past the watched episode.

## What you see

A scroll story like the Realms page. A map stays pinned on the left and nine stage cards scroll on the right. When a
card reaches the middle of the screen, the map's camera glides to that stage: it pans and zooms out, the stage's new
places pulse in, and Ye Fan's trail grows. Below the story, the old clickable region map stays as "Every region at a
glance", so nothing the page did before is lost.

| # | Eps | Stage | Camera |
|---|---|---|---|
| 1 | 1–4 | Earth, then a coffin across space | Star field: Earth, Mars, the route to Beidou |
| 2 | 5–35 | A mortal kingdom | Tight on Yan, in the Eastern Wasteland's south |
| 3 | 36–64 | The Southern Region | The whole south of the Eastern Wasteland |
| 4 | 65–102 | Carried north | South and north together |
| 5 | 103–125 | The Eastern Wasteland joins up | The whole Eastern Wasteland |
| 6 | 126–140 | The Central Region and the Forbidden Zones | The Eastern Wasteland, now with its centre |
| 7 | 141–157 | Zhongzhou, heart of the continent | Most of Beidou |
| 8 | 158–170 | The star field | Beidou and Ziwei |
| 9 | 171–183 | The whole of Beidou | The planet, with the Southern Ridge and Northern Plains |

Stage boundaries come from a read of all 183 episode summaries for where Ye Fan physically is, not from where places
are first named.

**Each card has:**
- its number, episode range, Chinese title and scale label
- a one-line gist
- new places, each with the episode it first appears in
- the factions met, as chips linking to `#/powers?f=`
- a power-ceiling meter
- one or two scale facts
- two or three key events, each linking to `#/episodes/N`

**The meter** uses the show's 16-step ladder (`SH.zhLevels`, Mortal to Great Emperor):
- A bar marks this stage's strongest being on screen.
- A ghost tick marks the highest reached in any earlier stage.
- Stage 1's value is unknown, so it shows "?" with no bar.

## Spoilers

- A stage whose first episode is after the watched episode renders as a sealed card, the same `seal()` used elsewhere.
- The camera never moves to a sealed stage: it holds on the last open one. The map literally ends where you've watched.
- Inside an open stage, each place, faction chip, fact and event carries its own episode and is sealed on its own.
  The map only draws places and trail points that are not sealed.
- Opening a stage's seal opens that stage on the map too. The check runs every time a stage becomes active.
- "Show everything" opens all of it, as it does elsewhere.

## Map rules

- **One SVG** in world units. The Beidou continent keeps the existing hand-drawn land shapes (0–700 × 0–520) inside a
  planet disc.
- **Space bodies:** Earth, Mars and Ziwei sit far out in the same coordinates, and Big Dipper stars sit around Beidou.
- **Camera:** each stage has `[cx, cy, width]`. Height follows the SVG's fixed aspect ratio (4:3).
- **Animation:** the camera animates `viewBox` with requestAnimationFrame. The centre moves linearly and the width moves
  in log space, so a ×50 zoom feels even. It takes 1.1 s, or jumps at once under `prefers-reduced-motion`.
- **Screen size:** text size, point radius and stroke width stay constant on screen. The SVG gets `--k`, world units per
  screen pixel, and CSS multiplies by it. Strokes use `vector-effect: non-scaling-stroke`.
- **Level of detail:**
  - Each place has `lod` 1 (a spot in a kingdom), 2 (a region-level place) or 3 (a planet).
  - A place is drawn only if the active camera's width is under that level's limit (400, 2,000, or always).
  - This is switched when the stage changes, with a CSS fade.
- **Lands:**
  - A region's land is lit once a reached, open stage contains a place in it.
  - Until then it shows as a faint fog outline with no label.
- **Trail:**
  - One dashed segment per stage, through that stage's visited places in order, starting from the previous stage's last
    point.
  - Segments of earlier stages are dim. The active segment is bright.

## Data shape and files

To stay clear of a second session working in the same tree, everything new goes in new files. Shared files get
one-line hooks only.

| File | What |
|---|---|
| `site/shows/shrouding-the-heavens/atlas.js` (new) | `window.ATLAS`: `ladder` (English names for the 16 levels), `bodies`, `places`, `stages`, `aspect`. Both story data and drawing coordinates, because they only make sense together. |
| `site/js/atlas.js` (new) | Engine. If `window.ATLAS` exists it wraps `VIEWS.world`: story first, then the old map (its page head stripped) below. Without `ATLAS` the World page is exactly as before, so *The Great Ruler* is unchanged. |
| `site/css/atlas.css` (new) | Styles for the story and the map, using the palette variables only. |
| `site/index.html` | One `<link>` to `css/atlas.css`. |
| `site/js/boot.js` | Adds optional `base + "atlas.js"` after `cast.js` and required `js/atlas.js` before `app.js`. The `i === 1` / `i === 5` checks still land on the same files. |
| `site/shows/shrouding-the-heavens/data/world.js` | Corrected region episodes from the research: `north` 70→65, `central` 90→127, `zhongzhou` 140→141, `ridge` 141→171, `plains` NOVEL→174. |

**Places:**

```js
places: { lingxu: { name, zh, x, y, lod, region, ep } }
```

**Stages:**

```js
stages: [{
  id, eps: [a, b], title, zh, scale, gist, cam: [cx, cy, w],
  path: [placeId...],                 // visit order; also this stage's "new places"
  factions: [[name, ep]],
  ceiling: { lvl, who, ep, note },
  facts: [[text, ep]],
  events: [[ep, text]],
}]
```

## Testing

There is no test harness in this repo; the site is checked in a browser. Checks:
1. `node --check` on every new or changed JS file.
2. A headless-browser pass (Playwright if available, else Chrome `--headless --screenshot`) of
   `index.html?show=sth#/world` at EP 36, EP 183 and "Show everything":
   - no console errors
   - camera and lit places match the stage
   - sealed stages are sealed
3. The same page for `?show=tgr`, which should be unchanged.
4. Narrow viewport: the map pins to the top and the cards scroll under it.

## Build order

1. `atlas.js` data for Shrouding the Heavens (bodies, places, 9 stages).
2. `js/atlas.js` engine: render, camera, level of detail, trail, meter, seals, IntersectionObserver.
3. `css/atlas.css`.
4. Hooks in `index.html` and `boot.js`, and the region-episode fixes in `world.js`.
5. Verify as above. Commit only this work's files; the other session's edits stay unstaged.

## Out of scope

Episode stills on cards, a map for *The Great Ruler*, and novel-only regions beyond the sealed "Beyond Beidou" list.
