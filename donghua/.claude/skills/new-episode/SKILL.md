---
name: new-episode
description: Add newly aired donghua episodes to the companion site (Shrouding the Heavens, The Great Ruler, Martial Universe, Renegade Immortal, Battle Through the Heavens, Jade Dynasty) - fetch AnimeKhor subtitles, write a subtitle-checked summary, update realms and the cast, grab pictures for new characters, rebuild and test. Use when the user says a new episode is out, asks to update the site, or on the weekly Tuesday update.
---

# Add new episodes to the donghua site

Everything runs from `donghua/` with `.tools/venv/bin/python` (call it `PY`). If `.tools/` is missing, run `tools/setup.sh` first.
Shows: `sth` = shrouding-the-heavens, `tgr` = the-great-ruler, `mu` = martial-universe, `ri` = renegade-immortal, `btth` = battle-through-the-heavens, `jd` = jade-dynasty (ids and folders are in `tools/shows.json`).

## 1. Find and fetch

```bash
PY tools/new_episode.py sth        # or tgr; add episode numbers to force specific ones
```

This prints what's new, downloads each episode's subtitles into `<show>/cache/animekhor/`, and lists the name cards,
matched to roster ids where known. For `tgr` the subtitles are read off the frames (a few minutes per episode). For `mu`, add the new episode's
official YouTube video id to `martial-universe/data/episodes/youtube.json` first (Yuewen Animation's playlist; check
the title's episode number, some are mislabelled); it then fetches the official English and Chinese tracks. Season 7
was airing in China but not on AnimeKhor or YouTube as of 1 October 2026. For `ri`, AnimeKhor has an Indonesian
track; also fetch the official English and Chinese from Tencent's YouTube upload (add the video id to
`renegade-immortal/cache/youtube/videos.json`, then `SSL_CERT_FILE=.tools/cacert.pem .tools/venv/bin/yt-dlp
--compat-options no-certifi --skip-download --write-subs --sub-langs en,zh,zh-Hans --sub-format vtt
-o "renegade-immortal/cache/youtube/ep<N>.%(ext)s" -- <video id>`). The newest one or two episodes are members-only
there for a while; use the Indonesian track until they open. For `ri`, run `apply_review.py ri <N>` for the new
episodes only, never `--all`: the roster's realm lines were cleaned by hand and `--all` adds the noisy ones back.
For `btth`, the site counts straight through: AnimeKhor's Season 5 EP n is site EP 69 + n. Yuewen Animation English
uploads each new episode as "【4K】Battle Through the Heavens EP n" (Season 5 numbering). If that upload has an
English track (`yt-dlp --list-subs`), add `"<69+n>": "<video id>"` to `battle-through-the-heavens/data/episodes/youtube.json`
and `new_episode.py` fetches it; if not (the newest ones often have the English burned in), leave it out and the
AnimeKhor Indonesian track is used. As with `ri`, run `apply_review.py btth <N>` for the new episodes only, never
`--all`. `battle-through-the-heavens/data/episodes/REVIEW-NOTES.md` has the show's name spellings.
For `jd`, the final season is AnimeKhor's fourth season page (offset 78: AnimeKhor's Final Season EP n is site EP
78 + n) and has an Indonesian track, so `new_episode.py jd` works as usual. If its Dailymotion copy is gone, the
YouTube channel *Anime Box* uploads each episode with an English track ("Jade Dynasty … EP n [MULTI SUB]"); fetch it
with `yt-dlp --skip-download --write-subs --sub-langs en` into `jade-dynasty/cache/animekhor/ep<N>.en.srt`. Name
spellings and slips are in `jade-dynasty/02-terminology.md`. Run `apply_review.py jd <N>` for the new episodes only,
never `--all` (the roster's realm lines were cleaned by hand).
"Nothing new." means stop here and tell the user.

## 2. Write the review

For each new episode, read the subtitles in full, plus the previous episode's review for continuity. Then write
`<show>/data/episodes/review/ep{N}.json` exactly as `tools/REVIEW.md` says.

Take REVIEW.md's warnings seriously: the subtitles are fan- or machine-made. Map names to the roster, ignore
recaps and previews, trust name cards over dialogue, and put doubts in `flags` instead of guessing.

## 3. Apply it

```bash
PY tools/apply_review.py sth 184 185
python3 <show>/scripts/build_episodes.py
```

Read the output:
- **"skipped (would go backwards)"**: check the subtitles. It's usually suppression or a disguise, so leave it
  skipped unless the scene says otherwise.
- **"first appearance moved"**: sanity-check it against the review.
- **"not in roster yet"**: add the ones who matter to `<show>/data/characters/roster.json`. Match the existing entries'
  shape (id, name, zh, aka, wiki, ep, group, side, intro, power, looks, arc) and reuse existing groups. The intro
  must only say what's known at that episode. Don't reorder existing entries' `looks`: pictures are keyed by look index.
- **Visible change of look** (new outfit, transformation, time skip): append a look `{ep, label, desc, why}` to that
  character.

## 4. Pictures

For each new character or look, pick a frame and add it to `<show>/data/characters/picks.json` under `id -> look index`:

- **Has a name card:** `PY tools/bestface.py sth <id> <ep> <card time> --not ye-fan` finds the clearest face near the
  card, skipping the protagonist. It prints a time and a face box. Use
  `{"kind": "ak", "ep": N, "t": T, "focus": [box_x + box_w/2, box_y + box_h/2, box_h], "manual": true}`.
- **Existing character, new look:** `PY tools/animekhor.py pick sth <id> <ep> <from> <to>` matches against their
  current portraits.
- **When unsure:** `PY tools/animekhor.py window sth <ep> <from> <to> <label>` makes a contact sheet. Look at it before
  deciding.

Render and review. Always look at the result. Wrong-person frames are common because donghua faces look alike.
- Shrouding the Heavens: `PY shrouding-the-heavens/scripts/stills/render.py <ids>`
- The Great Ruler: `PY tools/portraits.py tgr <ids>`
- Renegade Immortal: `PY tools/portraits.py ri <ids>` (name-card times are on AnimeKhor's clock)
- Battle Through the Heavens: `PY tools/portraits.py btth <ids>` (frames from the official YouTube upload when
  `youtube.json` lists the episode, else AnimeKhor)
- Jade Dynasty: `PY tools/portraits.py jd <ids>` (AnimeKhor frames for the final season)
- Martial Universe: `PY tools/portraits.py mu <ids>` (frames come from the official YouTube uploads, letterboxed;
  Seasons 4-6 have Chinese subtitles burned in at the bottom)
- Contact sheet of the results: `python3 shrouding-the-heavens/scripts/stills/review.py <ids>`

If a frame shows someone else, or no clear face, try another moment. If nothing works, set `{"kind": "none"}`
rather than a wrong face. Then:

```bash
python3 <show>/scripts/build_cast.py
```

## 5. Check and report

Serve with `python3 -m http.server 8000 -d site` and load `index.html?show=<id>` for the episode guide, the new
episode, `#/people` and the new characters' `#/c/<id>` pages. Check for JS errors (playwright-core is at
`/tmp/shot2` if still there; otherwise take a quick headless Chrome screenshot).

Tell the user:
- which episodes were added;
- the gist of each, spoiler-free beyond that episode;
- new characters and realm changes;
- anything flagged as doubtful.

Don't run git: the user commits.
