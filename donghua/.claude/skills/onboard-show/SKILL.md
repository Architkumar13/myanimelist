---
name: onboard-show
description: Add a new donghua to the companion site (a new show next to Shrouding the Heavens and The Great Ruler): research notes, folders and registries, fan-wiki import, episode summaries from subtitles, show.js page text and map, world.js data, cast with portraits, optional world-growth story, then validate, smoke-test and report. Use when the user asks to add, onboard or start a companion for a new donghua or anime series.
---

# Onboard a new donghua

This skill takes a show from nothing to a finished companion that matches **Shrouding the Heavens** (`sth`), the
reference show. Every folder, file shape and page that `sth` has, the new show should have too, unless it doesn't
fit the story (step 0 says how to decide).

Work from `donghua/`. `PY` means `.tools/venv/bin/python`. If `.tools/` is missing, run `tools/setup.sh` once first.
Plain `python3` is fine for the build scripts that only read and write JSON.

Read these before starting. They are short, and they are the house rules:
- `README.md`: layout of the hub.
- `site/shows/shrouding-the-heavens/show.js` and `site/shows/shrouding-the-heavens/data/world.js`: the reference
  shapes. Copy their style, not their content.
- `tools/REVIEW.md`: how to turn subtitles into an episode review.
- `.claude/skills/new-episode/SKILL.md`: the weekly routine the new show joins at the end.
- [reference/data-guide.md](reference/data-guide.md): every key of `show.js`, `world.js`, `atlas.js`, the roster and
  `picks.json`, with what goes in it and where to get it.

## Ground rules (the user's standing preferences)

1. **Nothing is hidden.** The site has no spoiler system: no seals, no "watched up to", no reveal buttons, no
   "stays hidden until" wording. Episode numbers are labels ("first seen in EP 12"). Don't add hiding of any kind.
2. **No "watch" links.** The user watches on animekhor.org, but the site never links to video.
3. **Accuracy beats coverage.** Everything about the donghua must match what's on screen. The fan wiki usually
   follows the novel, and the novel differs from the adaptation. Where they disagree, the episode wins. If you can't
   check something, leave it out or mark it `NOVEL`, rather than guess.
4. **Plain, concrete English**, like the existing pages: short sentences, names and episode numbers, and no hype.
   Use the official subtitles' names where they exist and give other translations as "also called".
5. **Folders:** each show folder has one `site` symlink pointing to `../site/shows/<dir>`. That link is part of the
   design. Never leave other compatibility symlinks behind when moving things.
6. **Git:** in this repo Claude may commit, but stage only the files you created or changed for this show. Other
   sessions often have uncommitted work in the same tree, so check `git status` and never use `git add -A`. Never
   push unless asked.
7. **Other sessions:** run `ListAgents` first. If another session is working in `site/js` or `site/css`, message it
   before editing shared engine files. Onboarding should need **no engine edits**. If it seems to, stop and read
   "When the engine seems to need a change" at the end.

## Step 0: intake (ask the user only what you can't find)

Find these yourself first. Ask the user, in one message, only for what's still unknown:

| Fact | Where to look | Why it matters |
|---|---|---|
| English title, Chinese title (汉字), pinyin | Fan wiki, AnimeKhor page, Baidu/Bilibili | `shows.js`, headings |
| Which adaptation: studio, year, season structure | Fan wiki "Donghua" page, iQIYI/Tencent/Bilibili listing | Remakes exist (The Great Ruler has 2019 and 2023). Pick the one the user watches. |
| Episode numbering: continuous, or per season? | AnimeKhor episode list vs the wiki's episode pages | The site numbers episodes continuously (S2E1 = last S1 episode + 1). Record the season offsets. |
| AnimeKhor URLs | animekhor.org search | Needed for subtitles and stills (`tools/shows.json`). |
| Subtitle track: separate `.srt` (which language) or only burned-in English? | Run `PY tools/animekhor.py subs <id> 1` after step 2. If there's no track, OCR is used. | Decides `"subs": "<lang>"` or `"ocr"`. |
| Fan wiki URL (Fandom MediaWiki) | Search "<title> wiki fandom" | The wiki import (step 3). Without a wiki, skip step 3; the Library page is then empty. |
| Hero | Obvious from the story | `heroName`, `heroId`, the Journey page, the kit |
| Latest aired episode | AnimeKhor, `animekhor.py latest <id>` | How far summaries go (`maxEp`) |
| Official English subtitles (YouTube channel?) | Search the studio's channel | Where names come from (house rule 4) |

**Pick the ids:**
- `id`: 2–4 lowercase letters from the English title's initials, e.g. `sth`, `tgr`, `btth`. It's used in URLs
  (`?show=id`), `tools/shows.json` and command lines.
- `dir`: the kebab-case English title, e.g. `battle-through-the-heavens`.

**Decide which reference pages fit.** `sth` has Realms, World, Powers, Journey (hero), Episodes, People, Emperors,
Forbidden (zones), Terms, Library. The Great Ruler kept all ten but renamed two to fit its story: Emperors became
"Sovereigns" and Forbidden became "Trials". Do the same: keep every page, and rename or reframe the ones that don't
match the story. If a page truly has nothing (no eras, no dangerous places), leave its list out of `world.js` and
its entry out of `nav`. The engine then shows "doesn't have this page yet" for that route.

Write the intake answers into `<dir>/README.md` as you go (step 1). That's the record for later sessions.

## Step 1: research notes (the source of truth for everything hand-written)

Create `donghua/<dir>/` with the notes, in the same shape as the other two shows:

| File | Contents |
|---|---|
| `README.md` | What the show is (studio, year, source novel and author, seasons and numbering, where it's watched), how to open and rebuild the site part, and where the data comes from. Copy the structure of `the-great-ruler/README.md`. |
| `01-power-system.md` | The cultivation ladder: every major realm and its stages, what each means in the body or world, lifespans and titles. The official-subtitle names, other translations, 汉字. Plus the episode where the hero reaches each realm on screen. |
| `02-terminology.md` | The term table: term, 汉字, what the official subtitles say, other translations, first episode used. This becomes `world.js` `terms`. |
| `03-world-and-powers.md` (sth splits this into 03 regions/sects, 04 clans/emperors, 05 zones) | Geography from small to large, factions by tier with their strongest people, eras and legendary figures, dangerous places. |
| `04-<hero>.md` (sth: `06-ye-fan-cheats.md`) | The hero's advantages in the order gained: body, methods, techniques, treasures, companions, with episodes. |

How to research:
- The fan wiki first (after step 3 you'll have it locally in `<dir>/cache/wiki/`; `grep` it). Then the episode
  reviews (step 4) to check what's actually on screen and when.
- **Episode numbers only come from the donghua**: episode summaries, subtitle name cards, the wiki's "Donghua debut"
  fields. A novel chapter number is not an episode. Anything not yet adapted gets `NOVEL` (9999), shown as "later".
- Mark contradictions with ⚠ in the notes and resolve them from the episodes.
- Don't paste wiki text. Rewrite it short. Wiki text is CC BY-SA and is only shown, credited, on Library pages.

## Step 2: folders, registries, symlink

```bash
D=<dir>; ID=<id>
mkdir -p $D/data/episodes/review $D/data/characters $D/scripts $D/cache
mkdir -p site/shows/$D/data site/shows/$D/img/hero site/shows/$D/img/wiki site/shows/$D/img/cast
ln -s ../site/shows/$D $D/site          # relative link; the build scripts write through <dir>/site/...
```

1. **`site/shows.js`**: add an entry (copy the `tgr` one):
   - `id`, `dir`, `title`, `zh` (full Chinese title).
   - `mark`: two characters for the side rail. `glyph`: one character for the favicon.
   - `blurb`: one sentence, the hook.
   - `hero`: `img/hero/<file>`, a wide key visual about 1600px across. The official poster or a strong still works;
     save it under `site/shows/<dir>/img/hero/`.
   - `theme`: the 11 palette variables. See "Palette" in the data guide. Pick colours from the key visual and keep
     the contrast of the existing themes.
2. **`tools/shows.json`**: add `"<id>": {"dir": "<dir>", ...}` with:
   - either `"pattern"` (an AnimeKhor episode URL with `{n}`; use it when every episode URL follows one pattern), or
     `"index"`: a list of `{url, offset}` show pages to scrape, one per season, where `offset` is the number of
     episodes before that season.
   - `"subs"`: the subtitle language code (e.g. `"id"`), or `"ocr"` if there's only burned-in English.
   - Check it with `PY tools/animekhor.py latest <id>`. It should print the newest episode.
3. **`.gitignore`** already ignores `donghua/*/cache/`. Nothing to add.

## Step 3: fan-wiki import (Library pages, pictures, first-appearance data)

Copy the wiki scripts from The Great Ruler. They are the newer, more general version:

```bash
cp the-great-ruler/scripts/{wikiapi.py,wikitext.py,fetch_wiki.py,build_wiki.py,build_episodes.py,build_cast.py} $D/scripts/
```

Then adapt them. Read each file's docstring first.
- **`wikiapi.py`**: set `API = "https://<wiki>.fandom.com/api.php"`.
- **`fetch_wiki.py`**: fix the docstring's show name. Run `python3 $D/scripts/fetch_wiki.py`. It caches every
  article as JSON under `$D/cache/wiki/`. Expect minutes to an hour for a big wiki; it resumes if interrupted.
- **`build_wiki.py`**:
  - `SKIP` and `SKIP_CATS`: wiki housekeeping pages and categories to drop (Main Page, policies, songs, staff,
    cast/voice actors, merchandise). List the titles and categories in the cache and decide.
  - **`first_ep()`** (most important): it turns a page's "Donghua debut" infobox field into a continuous episode
    number. Look at 20 real values (`grep -h -o '|donghua[^|]*' $D/cache/wiki/*.json | sort | uniq -c | sort -rn | head -40`),
    then rewrite the regexes for this wiki's formats and season offsets. Test it on those values. A wrong
    `first_ep` puts wrong "first seen" labels on hundreds of pages.
  - The kind classifier (character, faction, place, item, lore): check it against the wiki's categories.
  - Run `python3 $D/scripts/build_wiki.py`. It writes `site/shows/<dir>/data/wiki.js` and pictures into `img/wiki/`,
    resized to 420px (`THUMB`). Keep GIFs out, or convert them to stills, if they're large: The Great Ruler's
    committed wiki images are 235 MB mostly because of GIFs.
- **Check:** `node tools/validate.mjs <id>` reports how many `world.js` wiki titles don't resolve, and missing
  pictures. Also spot-check 5 characters' `ep` in `wiki.js` against the episodes.

No wiki? Skip this step. `wiki.js` is optional: Library and articles will be empty and `wiki` links render as plain
text.

## Step 4: episode summaries

Episodes are the backbone: every other `ep` is checked against them. There are two sources, and the best is both.

**A. Subtitle-checked reviews (always do this for the latest episodes, ideally for all of them):**

```bash
PY tools/new_episode.py <id> 1 2 3 ...   # fetch subtitles + list name cards (OCR shows take minutes per episode)
```

For each episode, write `$D/data/episodes/review/ep{N}.json` exactly as `tools/REVIEW.md` says: summary, events,
introduced, cultivation, cast with name cards. Then:

```bash
PY tools/apply_review.py <id> 1 2 3 ...  # reviews -> data/episodes/from-reviews.json (+ roster realms/first appearances)
```

- Batch work: 180 episodes is too many for one context. Give sub-agents 10–20 episodes each, with REVIEW.md, the
  roster and the previous batch's last review for continuity. Then review their output: names consistent, no recap
  or preview content counted as this episode's events, no research notes in viewer text.
- `apply_review.py <id> --all` processes every review file. It loads the show's `scripts/build_cast.py` for the
  realm ladder, so copy that file first (step 3). With no roster yet it writes the episodes and skips the cast part
  ("no roster for this show yet"). Run it again after step 7 to add the realms and first appearances.

**B. Fan-wiki episode log (a quick seed when there are many episodes):** if the wiki has an episode list, turn it
into `$D/data/episodes/guide.json`: a list of `{ep, [epEnd, arc], title, summary, events, introduced, cultivation,
confidence: "medium"}`. The Great Ruler's `guide.json` is the example. Rewrite each summary in house style; don't copy.
- `arc: true` with `epEnd` makes one entry cover a range (for long quests when per-episode detail isn't available).
  Reviews replace arc entries later. Don't leave both covering the same episode: the validator flags overlaps.

Build: `python3 $D/scripts/build_episodes.py`. It writes `site/shows/<dir>/data/episodes.js`. Subtitle reviews
(`from-reviews.json`) win over the seed.

**Summary rules:**
- 4–7 concrete sentences, 200+ characters, the show's own names.
- **Viewer text only.** No "subs say", "the wiki cites", "unconfirmed", "implies", quoted subtitle lines in another
  language, or captions noted as evidence. Those go in the review's `flags`/`changes`, which are never displayed. The
  validator warns about note-like wording.

## Step 5: `site/shows/<dir>/show.js` (page text, navigation, realm figure, map)

Copy `site/shows/the-great-ruler/show.js` (the simpler one) and rewrite every string. Key by key guidance is in the
data guide ("show.js"). The parts that need real work:
- **`nav`**: ten `[route, 汉字 label, English label]` entries in the reference order. The route ids are fixed by the
  engine (`realms, world, powers, journey, episodes, people, emperors, zones, terms, lore`), but the labels are yours
  (e.g. `["emperors", "至尊", "Sovereigns"]`). Every route must exist in `site/js/app.js` `ROUTES`; the validator
  checks.
- **`home.steps`**: five "understand the world in five steps" cards. Each is `[link, title, 2–3 sentences]` linking
  into the site (`#/realms`, `#/w/<Wiki Title>`, …). Order them as a newcomer should learn them.
- **`realms.figure`** (optional): an inline SVG where elements with `data-realm="<realm id>"` light up as you scroll
  the Realms page. sth draws a body, with realms living in body parts. If the ladder isn't spatial, leave `figure` out
  to get a plain realm list (The Great Ruler does this).
- **`map`**: a hand-drawn SVG sketch in a 700 × 520 viewBox:
  - `lands`: one closed path per region, keyed by a `world.js` region id, with a label point `lx, ly` and optional
    `zh`/`name` overrides.
  - Regions without a shape go in the "off the map" list under it (`offMap` heading, optional `far`).
  - `start`: the region selected first.
  - `caption` says it's a sketch. Draw it from the notes' geography: rough and proportionate, neighbours touching.
- **`pages`**: ledes for every page. `episodes.lede` is a function `(eps, max) => string`.
- **`zhLevels`**: the 汉字 of each ladder rung, the same length as the cast ladder (`CAST_LEVELS`, step 7).
- **`arcs`**: `[firstEp, lastEp, "Arc name"]` chips on the Episodes page. Contiguous, no overlaps.
- **Pronouns and wording:** set `pages.journey.kit` labels to match the hero (`at`, `companions`, `goneWith`, `tab`,
  `storyTab`, `title`). The engine's defaults are neutral.

## Step 6: `site/shows/<dir>/data/world.js` (hand-curated data)

Start from the reference file's structure (sth's `world.js`) and fill each list from the notes. Full field guide:
data guide, "world.js". Rules:
- Every entry that happens on screen gets `ep` (first episode shown). `NOVEL` means not adapted yet.
- **Realms**: every major realm with `stages`, `where` (sth: body part; others: what it means), `lifespan` if known,
  `gist`, and `heroEp` (first episode the hero is at it; `NOVEL` if not yet).
- **Regions and factions**: factions point at a region id. `tier` follows the `tiers` ladder (1 small sect … 7 the
  top of the world). Each faction has `top` (its strongest people and their realms), `signature`, and `with` (its
  relationship with the hero, through the latest episode).
- **Journey**: stages whose `eps` ranges are contiguous from 1 to the latest episode, one per realm or arc, each with
  the items the hero gains. **Inventory** (optional but part of the baseline): what the hero holds from `ep` to
  `lostEp`. It drives "What he carries". Keep journey and inventory episodes consistent.
- **Terms**: `[term, 汉字, official-subs name or "", other names, first ep]`. The 5th item turns on the "First used"
  column and the "New words" line on each episode.
- Keep text current to the latest episode. When a new arc airs, entries like "the Wang family" need their `with`
  text updated. The new-episode routine does this later.

## Step 7: cast (People pages, portraits, realm timelines)

1. **Ladder:** in `$D/scripts/build_cast.py`, set `LEVELS` (English rung names, lowest first) and `level_of()` (realm
   text → rung index). The ladder must match `show.js` `zhLevels` in length and order. Test `level_of` on every
   distinct realm string in the reviews and wiki.
2. **Seed the roster:** `python3 $D/scripts/build_cast.py --seed` writes `$D/data/characters/roster.json` from the
   wiki's donghua characters.
3. **Correct the roster by hand against the episodes:**
   - `ep`: first on-screen appearance, from name cards or reviews. Add `mentionEp` if they're named earlier.
   - `group`: reuse a small set, e.g. family, sect, the hero's side. `side`: ally, rival, enemy, neutral or mentor.
   - `intro`: 1–2 sentences about who they are.
   - `power`: `{ep, realm, detail?, conf}` per stated realm, never going backwards unless the show says so.
   - `looks`: one `{ep, label, desc, why}` per visible redesign.
   - `arc`: optional `{ep, text}` story beats.
   - Order entries by first appearance. See the data guide, "roster.json".
   - If the wiki has per-character cultivation tables with a donghua column, copy The Great Ruler's
     `wiki_realms.py` and `merge_realms.py` to merge them with subtitle statements (the subtitles win).
4. **Portraits:** one per look, in `$D/data/characters/picks.json` (`id` → look index → pick).
   - Name card: `PY tools/bestface.py <id> <char> <ep> <card time> --not <hero id>`, then use the `ak` pick it prints.
   - Existing face: `PY tools/animekhor.py pick <id> <char> <ep> <from> <to>`.
   - Unsure: `PY tools/animekhor.py window <id> <ep> <from> <to> <label>`, then look at the contact sheet.
   - Render: `PY tools/portraits.py <id> [<char> ...]`, which writes `site/shows/<dir>/img/cast/<char>-<look>.jpg`.
   - **Look at every portrait.** Donghua faces look alike and the protagonist is in most frames. A wrong face is
     worse than none: use `{"kind": "none"}` when nothing is clear. A wiki picture is an acceptable fallback:
     `{"kind": "file", "path": "site/img/wiki/<file>"}`.
5. **Build:** `python3 $D/scripts/build_cast.py`, which writes `site/shows/<dir>/data/cast.js` with `CAST` and
   `CAST_LEVELS`. `heroId` in `show.js` must be a roster id.

## Step 8: the world-growth story (`site/shows/<dir>/atlas.js`, part of the baseline)

The World page becomes a scroll story when a show has `atlas.js`: a pinned map pulls back stage by stage as the
story's world grows, e.g. village → region → continent → planet → star field. Read
`site/shows/shrouding-the-heavens/atlas.js` and its design doc `docs/2026-10-01-expanding-world-design.md`.

1. Work out where the hero physically is in every episode, from the summaries. Delegate this: one agent reads all of
   them and returns an `ep → place` table plus proposed stages.
2. **Stages** (usually 6–10): a new stage starts when the world's scale jumps. Each has `eps`, `title`, `zh`, `scale`,
   `gist`, `cam` [centre x, centre y, width], `path` (the places visited, in order), `factions` (names that exist in
   `world.js`, with episodes), `ceiling` (strongest being seen: `lvl` on `ladder`, `who`, `ep`, `note`), `facts` (real
   scale facts from the episodes, like distances and counts), and `events`.
3. **Geometry:** reuse `show.js` `map.lands` as the main landmass (0–700 × 0–520). Place `places` inside it in world
   units, and far-off worlds as `bodies` outside. `lod`: 1 for a spot, 2 for a landmark, 3 for a whole world.
4. Check it in a browser at every stage, desktop and phone: labels shouldn't collide, the camera should frame the
   stage, and the trail should read.

If the story never leaves one place, skip `atlas.js`: the World page falls back to the clickable region map.

## Step 9: verify (all must pass before you report)

```bash
node tools/validate.mjs <id>       # 0 errors. Read every warning; fix or explain each.
python3 tools/smoke.py <id>        # 0 failures: every page loads, no errors, no broken images, no phone overflow
```

Then look at it yourself. Serve with `python3 -m http.server 8000 -d site`, open `?show=<id>`, and screenshot
(Playwright is installed) at 1400×900 and 390×844:
- Home, Realms (scroll: the figure or list follows), World (every atlas stage), Powers (the region filter works),
  Journey and its kit, Episodes (first, middle, latest), People (both views), 3 character pages (hero, a mentor, a
  villain), Emperors/Zones (or their renamed versions), Terms, Library, 3 articles.
- Read the text as a viewer: names consistent everywhere, episode numbers matching the episode guide, no research
  notes, no "hidden until" wording, and nothing about a later episode stated as happening earlier.
- Compare side by side with the same pages of `sth`. If sth has something the new show lacks, add it or note why.

## Step 10: report and commit

- **Report to the user:**
  - what exists: pages, counts of episodes, characters, wiki pages and terms
  - what's weaker than `sth` and why, e.g. "no subtitle track, so summaries 1–40 come from the wiki log"
  - doubtful items (from review `flags`)
  - the validator warnings you left
- **Commit** only this show's files, listed by path:
  - `donghua/<dir>/` (not `cache/`)
  - `donghua/site/shows/<dir>/`
  - your hunks of `site/shows.js`, `tools/shows.json` and `README.md` (add the show to the table)
  - Keep other sessions' changes out: stage exactly your hunks.
- **Weekly updates:** add the show to `.claude/skills/new-episode/SKILL.md`'s show list, and to `tools/REVIEW.md`'s
  subtitle notes (its name slips, its subtitle source).

## When the engine seems to need a change

Onboarding is data work. If a show truly needs something the engine can't express (a new page type, a different
ladder shape):
1. Check the data guide: many things are already optional or configurable (figure, kit labels, optional lists,
   renamed pages).
2. If not, make the change **general**: driven by a new optional key in `show.js`/`world.js` that other shows can
   leave out, never by the show's name or id. Update the schema comment at the top of `tools/validate.mjs`, the data
   guide, and both existing shows if they're affected.
3. Run the validator and smoke test for **every** show, not just the new one.

## Pitfalls seen before

- **Season numbering:** wiki fields like "S2 EP5" must become continuous numbers. The Great Ruler: S2 = 52 + n.
- **Remakes:** a wiki may mix two adaptations' debut episodes in one field. Parse the line for the right one
  (see The Great Ruler's `first_ep`).
- **Subtitle quirks:** the clock can drift from the video's own timestamps (picture tools use the subtitle clock),
  and machine-translated names come out several ways (map them to the roster). OCR reads "l" as "I" and apostrophes
  as letters.
- **Dailymotion throttling:** the tools use browser impersonation. Don't replace them with plain `yt-dlp` calls.
- **Research notes leaking into summaries**, wrong-face portraits, and journey or inventory dates disagreeing: the
  three most common quality problems in the existing shows.
- **Arc entries overlapping per-episode reviews** after a later review pass: remove or split the arc entry.
