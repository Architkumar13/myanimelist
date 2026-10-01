# Data guide: every file a show needs, key by key

The machine-checked version of this is the SCHEMA comment at the top of `tools/validate.mjs`. This guide explains what
each key is for, where its content comes from and how it should read. Examples come from Shrouding the Heavens (`sth`).

**Conventions used throughout:**
- `ep`: the first donghua episode where the thing is shown or reached, numbered continuously across seasons. It's
  displayed as a label, never used to hide anything.
- `NOVEL` (9999): not in the donghua yet. It's shown as "later".
- `zh`: 汉字. Leave it `""` if unknown; never guess.
- `subs`: the name the official English subtitles use, when it differs from the name you chose.
- `wiki`: an exact fan-wiki page title (see `data/wiki.js` `entries`). It links to the Library article. Titles that
  don't resolve render as plain text, and the validator warns.
- Text fields are plain English, one idea per sentence, with no HTML unless the field says HTML.

---

## `site/shows.js`: the registry entry

```js
{ id: "sth", dir: "shrouding-the-heavens",
  title: "Shrouding the Heavens", zh: "遮天", mark: "遮天", glyph: "遮",
  blurb: "One sentence hook.", hero: "img/hero/coffin.jpg",
  theme: { "--patina": …, "--patina-deep": …, "--patina-lift": …, "--verdigris": …, "--bone": …, "--bone-dim": …,
           "--bronze": …, "--bronze-bright": …, "--cinnabar": …, "--cinnabar-ink": …, "--star": … } }
```

**Palette** (all 11 are required, as hex):

| Variable | Role | Rule of thumb |
|---|---|---|
| `--patina` | Page background | Dark and desaturated, from the key visual's shadows |
| `--patina-deep` | Sunken panels, map sea | 5–8% darker than patina |
| `--patina-lift` | Raised cards, land | 5–8% lighter than patina |
| `--bone` | Body text | Warm off-white; contrast on patina ≥ 10:1 |
| `--bone-dim` | Secondary text | ≥ 5:1 on patina |
| `--bronze` | Links, accents, meters | The show's signature colour; ≥ 4.5:1 on patina |
| `--bronze-bright` | Hover, active, highlights | Lighter bronze |
| `--verdigris` | Secondary accent | A complementary tint |
| `--cinnabar` | Rare strong accent (Chinese headings, buttons) | Red family unless the show's identity says otherwise |
| `--cinnabar-ink` | Text on cinnabar | Near-white |
| `--star` | Map routes, star field | Pale cool tint |

Check contrast (e.g. with a quick script using the WCAG formula) before settling.

---

## `site/shows/<dir>/show.js`: page text, navigation, figures

| Key | What | Notes |
|---|---|---|
| `heroName`, `heroId` | The hero's display name and roster id | `heroId` must exist in `cast.js` |
| `searchHint` | Search box placeholder | Three real, recognisable names |
| `zhLevels` | 汉字 of each cast-ladder rung | Same length and order as `CAST_LEVELS` / `LEVELS` in `build_cast.py` |
| `wiki` | `{url: "https://…/wiki/", name: "… fan wiki"}` | Credit line on articles |
| `nav` | 10 × `[route, 汉字, label]` | Routes fixed (`realms, world, powers, journey, episodes, people, emperors, zones, terms, lore`); labels free. Journey's label is the hero's name. Omit a route only if its data doesn't exist. |
| `home.heroAlt` | Alt text for the hero picture | Describe the picture |
| `home.lede` | One line under the title | "Realms, regions, … in one place." |
| `home.steps` | 5 × `[href, title, text]` | The five things a newcomer must understand, in order; hrefs are in-site routes or `#/w/<Wiki Title>` |
| `realms.novelWord` | Word for novel-only | "the novel" |
| `realms.beyondTitle/beyondZh/beyondGist` | The section after the main realms (the peak ranks) | Uses `world.js` `beyond` |
| `realms.figure` | Optional inline SVG; parts with `data-realm="<realm id>"` light up | Omit for a plain list. If present, also `figureBeyond` (caption when everything lights). |
| `realms.ladders` | Extra ladders shown under Beyond: `{title, note?, list: "<world.js key>", cards?}` | sth: weapon grades; tgr: Spiritual Array ranks |
| `map.label` | The map's accessible name | "Map of Beidou" |
| `map.lands` | `{id, d, lx, ly, zh?, name?}` per region | `d`: an SVG path in the 700 × 520 box; `id` is a `world.js` region id; `lx, ly` place the label |
| `map.start` | Region selected first | A land id |
| `map.caption` | "A rough sketch for orientation, not an official map." | |
| `map.offMap` | Heading for regions without a shape | "Beyond Beidou" |
| `map.far` | Optional `{title, text}` card for the far future | |
| `map.extra` | Optional raw SVG drawn on top (routes, labels) | |
| `map.labelDy` | Optional `[zhDy, nameDy]` label offsets | |
| `arcs` | `[first, last, "Arc name"]` chips on Episodes | Contiguous, no overlaps; the last may run past the latest episode |
| `pages.realms.lede` | One-paragraph intro | |
| `pages.world` | `{zh, title, lede}` | |
| `pages.powers` | `{lede, note?}` | What decides a faction's weight in this world |
| `pages.journey` | `{zh, title, lede, secrets: [title, zh, text], methods: [title, text], kit?}` | `secrets` and `methods` introduce those optional sections |
| `pages.journey.kit` | `{tab, storyTab, title, lede, note, at, companions, goneWith, goneHas}` | Labels for "What he carries". Set the pronouns here. |
| `pages.episodes` | `{lede: (eps, max) => string, caveat?: {medium: "…"}}` | Say where summaries come from (official subs, fan subs, wiki log) |
| `pages.emperors` | `{tab, zh, title, lede, note?}` | Rename for the show: tgr is "Sovereigns" |
| `pages.zones` | `{tab, zh, title, lede, prose (HTML), heading, masterLabel?, wiki?: [title, label, text]}` | Dangerous places; tgr is "Trials" |
| `pages.terms` | `{lede, cols: [officialSubsHeading, otherNamesHeading], empty}` | `empty` is shown when the subs have no name |
| `extraPages` | The show's own pages, after the standard ten in the nav | See "extraPages" below |

### `extraPages`: the "Only here" page

```js
extraPages: [{
  route: "unique", zh: "独有", label: "Only here", title: "Only in Shrouding the Heavens", lede: "…",
  sections: [
    { id: "source", zh: "源术", title: "Source Arts", lede: "…", layout: "cards", data: "sourceBasics" },
    { id: "gambles", zh: "赌石", title: "Stone gambles", layout: "timeline", data: "sourceGambles" },
    { id: "grades", title: "Kinds of source", layout: "table", data: "sourceGrades",
      columns: [["name", "Kind"], ["text", "What it is"], ["ep", "First seen"]] },
    { id: "secrets", zh: "九秘", title: "The Nine Secrets", layout: "ranking", data: "secrets",
      fields: [["gloss", "Meaning"], ["effect", "What it does"]] },
  ],
}]
```
- `route`: lowercase, not a standard route. Links: `#/<route>`, and `#/<route>?s=<section id>` to jump to a section.
- `data` names a `world.js` list. Items use `name` (or `title`), `zh`, `ep`, `text`, `wiki` (gives a link and a
  picture), `img` (a picture path relative to the show folder), and `rank` (for ranking).
- In a table, the `name` column links to the wiki and the `ep` column links to the episode.
- Every item on these pages is searchable.
- A custom page is `{ route, zh, label, custom: true }` plus `site/shows/<dir>/pages.js` defining
  `window.SHOW_PAGES[route] = (query, param, HUB) => ({ title, html, mount? })`.

---

## `site/shows/<dir>/data/world.js`: hand-curated data

Wrap it in `(function () { const NOVEL = 9999; window.WORLD = { NOVEL, … }; })();` like sth. Optional top keys:
`maxEp` (the latest episode, if the episode list runs short) and `arcs` (the same as `show.js` arcs; use one or the
other).

### `realms` (required): the main ladder, lowest first
```js
{ id: "wheel", name: "Wheel Sea", subs: "Wheel-and-Sea Realm", zh: "轮海", where: "Below the navel, the Wheel of Life",
  lifespan: "~200 years", wiki: "Wheel and Sea Realm", heroEp: 11, gist: "…",
  stages: [{ name: "Sea of Bitterness", subs: "Bitter Sea", zh: "苦海", ep: 11, title?: "…", text: "…" }] }
```
- `id` is short and stable. `realms.figure` and `atlas` refer to it.
- `heroEp` is the first episode the hero is at this realm (`NOVEL` if not yet). Stage `ep` is the first time the
  stage is shown on screen, by anyone.
- `gist`: 1–2 sentences on what the realm *is*. Stage `text`: what changes at that stage.

### `beyond` (optional): the ranks after the main ladder
`{ name, zh, subs?, wiki?, text }`, shown as cards under the Realms page.

### Extra ladders (optional): any list named in `show.js` `realms.ladders`
An array of strings (sth `weaponGrades`), or card objects `{name, zh, eq?, text}` if the ladder has `cards: true`.

### `tiers` (optional): how strong each kind of faction is
`{ n, name, zh, top, examples: [names], ep }`, `n` = 1 (weakest) … 7 (top). `top` says who leads such a faction and
their realm. `examples` should be factions from `factions`.

### `regions` (required)
`{ id, name, zh, ep, blurb, wiki? }`. Ids are used by `map.lands`, `factions[].region` and atlas places. Include
off-map regions (other planets or planes). `ep` is the first episode the hero is **in** the region, not the first
time it's named.

### `factions` (required)
```js
{ name, subs?, zh, region, tier, ep, wiki?, top: "strongest people and realms", signature: "what they're known for",
  with: "their history with the hero, through the latest episode, with episode numbers in brackets" }
```
Names must be unique: `atlas.js` and `?f=<name>` links use them.

### `journey` (optional; baseline shows have it): the hero's advantages by stage
```js
{ stage: "Dao Palace", realm?: "palace", eps: [71, 107], items: [{ name, zh, ep, text, wiki? }] }
```
`eps` ranges are contiguous from 1 to the latest episode (the last may run past it). Items are what the hero gains:
body changes, methods, techniques, treasures, allies. Each gets a sentence on why it matters.

### `secrets` (optional): a named set of techniques the story hunts for (sth: the Nine Secrets)
`{ ch: "斗", name, gloss, effect, ep }`, where `ep` is when the hero gets it (`NOVEL` if not yet).

### `methods` (optional): the best cultivation method per realm
`{ realm: "Wheel Sea", method, zh, from: "whose legacy", ep }`.

### `eras` (optional; the "Emperors" page, renamable): legendary figures by era, oldest first
`{ name, zh, note, emperors: [{ name, zh, legacy, wiki?, ep }] }`. `ep` is when the figure is first named on screen.

### `zones` (optional; the "Forbidden" page, renamable): dangerous places
`{ name, subs?, zh, ep, master, masterEp?, text }`. `master` is who rules or haunts it. `masterEp` is when that's
shown.

### `inventory` (optional; baseline shows have it): what the hero holds, over time
```js
{ ep, kind: "physique|scripture|technique|treasure|companion", name, zh?, note, lostEp?, lostNote?, cast?: "<roster id>", wiki? }
```
It's shown from `ep` until `lostEp`. The same name again later means it came back. Companions link to their People
page via `cast` (or a name match). Keep episodes consistent with `journey`.

### `terms` (required)
`[term, zh, officialSubsName or "", "other translations", firstEp]`. The 5th item is optional but part of the
baseline: it adds the "First used" column and each episode's "New words".

---

## `site/shows/<dir>/atlas.js`: the world-growth story (optional; the baseline has it)

```js
window.ATLAS = {
  aspect: [4, 3], zh, title, lede,
  ladder: [16 English rung names],             // same length as zhLevels; ceiling.lvl indexes it
  bodies: [{ id, x, y, r, ep, name?, zh?, planet?: true, stage?: "<stage id that first shows it>" }],
  dipper?: [[x, y] …],                          // decorative star pattern (sth only)
  places: { id: { name, zh?, x, y, lod: 1|2|3, region, ep, anchor?: "end" } },
  stages: [{ id, eps: [a, b], zh, title, scale, gist, cam: [cx, cy, width],
             path: [place ids in visit order], factions: [[name, ep]], ceiling: { lvl|null, who, ep, note? },
             facts: [[text, ep]], events: [[ep, text]] }],
};
```
- World units: the main landmass is `show.js` `map.lands` (0–700 × 0–520). Other worlds sit far out (thousands of
  units away) so the zoom feels right.
- `lod`:
  - 1: a spot inside a kingdom. Labelled only when zoomed in, or when it's in the current stage.
  - 2: a landmark. Labelled until the camera leaves the planet.
  - 3: a whole world. Always labelled.
- `cam` width: about 100–150 for one kingdom, 250–500 for a region, 700–1,000 for the continent, 4,000–7,000 for
  star fields.
- `facts` must be real numbers or statements from the episodes, such as distances, counts and durations, each with
  its episode.
- Stage boundaries come from where the hero *is*, not where places are *named*.

---

## `donghua/<dir>/data/characters/roster.json`: the cast (built into `cast.js`)

A list, ordered by first appearance:
```json
{ "id": "ye-fan", "name": "Ye Fan", "zh": "叶凡", "aka": ["Class Monitor Ye"], "wiki": "Ye Fan", "ep": 1, "mentionEp": null,
  "group": "Earth classmates", "side": "ally|rival|enemy|neutral|mentor", "intro": "1–2 sentences",
  "power": [{ "ep": 11, "realm": "Bitter Sea", "detail": "what happened", "conf": "high|medium|low" }],
  "looks": [{ "ep": 1, "label": "Class reunion", "desc": "what they look like", "why": "why the look changed" }],
  "arc": [{ "ep": 25, "text": "a story beat" }] }
```
- `id`: kebab-case, stable forever. Picture files are named `<id>-<look index>.jpg`.
- Never reorder `looks`: the index is the picture key. Append new looks at the end, in episode order.
- `power` never goes down unless the show says so. A backwards statement is usually suppression or a disguise;
  leave it out.
- `realm` text must map through `level_of()` in `build_cast.py` to a rung. Use `"Unknown"` for "stronger than X but
  not stated" (it's shown as "X or above").

## `donghua/<dir>/data/characters/picks.json`: portrait choices

`{ "<id>": { "<look index>": pick } }`, where `pick` is one of:
- `{"kind": "ak", "ep": 12, "t": 612.5, "focus": [cx, cy, faceHeight], "manual": true}`: a frame from AnimeKhor.
  `focus` comes from `bestface.py` (box centre and height).
- `{"kind": "file", "path": "site/img/wiki/x.jpg"}`: an existing image.
- `{"kind": "keep"}`: leave the current portrait alone.
- `{"kind": "none"}`: no picture; a placeholder is shown instead.

Render with `PY tools/portraits.py <id> [<char> …]` and look at every result.

## `donghua/<dir>/data/episodes/`: episode sources

- `review/ep{N}.json`: the subtitle-checked reviews (format in `tools/REVIEW.md`). `apply_review.py` turns these
  into `from-reviews.json`.
- `guide.json` (or any other `*.json`): a seed list `{ep, epEnd?, arc?, title, summary, events, introduced,
  cultivation, confidence}`.
- `build_episodes.py` merges them. Reviews win, and per-episode entries beat arc entries. The output is
  `site/shows/<dir>/data/episodes.js`.

## `tools/shows.json`: the tools' registry

```json
"sth": { "dir": "shrouding-the-heavens", "pattern": "https://animekhor.org/<slug>-episode-{n}-…/", "subs": "id" }
"tgr": { "dir": "the-great-ruler", "index": [{"url": "https://animekhor.org/anime/<s1>/", "offset": 0},
                                             {"url": "https://animekhor.org/anime/<s2>/", "offset": 52}], "subs": "ocr" }
```

Optional `"youtube": "data/episodes/youtube.json"` (a path inside the show folder to `{"<episode>": "<video id>"}`):
when the studio posts official uploads, `animekhor.py` takes subtitles (`en` plus `zh` where present) and stills from
them, and falls back to the AnimeKhor copy for episodes not listed. Martial Universe (`mu`) is the example.
