# Renegade Immortal (仙逆 / *Xiān Nì*): Reference Notes

Notes for the donghua **Renegade Immortal**, made by Build Dream Animation (铸梦动画) with Tencent Penguin Pictures for
Tencent Video, adapted from the novel by **Er Gen** (耳根, 2009–2012, 2,088 chapters). The hero is **Wang Lin**
(王林), a carpenter's son from a village in the Country of Zhao with poor spiritual roots and one strange bead.

The 2025 film *Renegade Immortal: Battle of Gods* (神临之战) is a separate release and is not numbered with the episodes.
These notes cover the series only.

## The website

The companion lives in the shared donghua site (`../site/`, see [../README.md](../README.md)): the realm ladder, the
places Wang Lin actually stands in, his advantages in the order he gets them, an episode guide through the latest
aired episode, the cast, and the fan wiki.

**Open it:** double-click `../site/index.html` and pick Renegade Immortal, or run
`python3 -m http.server 8000 -d ../site` and open http://localhost:8000/?show=ri.

`site` here is a link to `../site/shows/renegade-immortal/`, so the scripts below write to `site/data/` and
`site/img/`. Page text, nav labels and the world sketch are in `site/show.js`.

**Rebuild the data:**

```bash
python3 scripts/fetch_wiki.py        # every wiki page into cache/wiki/
python3 scripts/build_wiki.py        # -> site/data/wiki.js and site/img/wiki/
python3 scripts/build_episodes.py    # data/episodes/*.json -> site/data/episodes.js
python3 scripts/build_cast.py        # data/characters/roster.json -> site/data/cast.js
```

After `build_wiki.py`, flatten animated GIFs to one still frame. A few are 3–8 MB each, and the build keeps files
it has already downloaded:

```bash
../.tools/venv/bin/python -c "from PIL import Image; import glob, os
for f in glob.glob('site/img/wiki/*.gif'):
    if os.path.getsize(f) > 300000:
        im = Image.open(f); im.seek(0); fr = im.convert('RGB'); fr.thumbnail((420, 420)); fr.convert('P', palette=Image.ADAPTIVE).save(f)"
```

Hand-curated realms, factions, places and terms live in `site/data/world.js`. It was first assembled from the
onboarding drafts (`cache/assemble_world.py` and `cache/*-draft.json`, local only); edit `world.js` directly
from now on. `atlas.js` was built the same way from `cache/atlas-research.json`.

## Where the episodes are

- Tencent numbers the episodes straight through, and so do the wiki, AnimeKhor and this site. Episodes 1–3 aired
  together on 25 September 2023, then one a week.
  - Season 1: EP1–24 (2023).
  - Yearly series 1 (年番1): EP25–76, from 26 February 2024.
  - Yearly series 2: EP77–128, from 24 February 2025.
  - Yearly series 3: EP129–180, from 23 February 2026, weekly. **EP160** is the last one aired before 1 October 2026.
- **AnimeKhor** (`tools/shows.json` id `ri`) lists EP4–160 on its show page. EP1–3 are one combined page
  (`renegade-immortal-episodes-1-to-3-english-subtitles`), which the index scraper doesn't match. It was added to
  `cache/animekhor/pages.json` by hand as EP1.
- **Subtitles:**
  - AnimeKhor's Dailymotion copies carry an Indonesian track (`id`) for most episodes. EP1–9 have only burned-in
    English, read with `animekhor.py ocr`. The Dailymotion copies of EP12, 13, 49, 92, 102, 103, 110, 143, 147 and
    148 are gone.
  - **Official English and Chinese subtitles** are on Tencent's YouTube channels ("Tencent Video-ANIMATION" and
    "Tencent Video"), one upload per episode. `cache/youtube/videos.json` maps episode → video id, and the `en`/`zh`
    tracks are in `cache/youtube/ep{N}.{en,zh}.vtt`. These are the best source: the official names, plus the 汉字.
    YouTube throttles after a few dozen requests. Wait and retry; never use browser cookies.
- **Fan wiki:** https://xian-ni.fandom.com/ (about 2,250 articles). It mostly follows the novel. Its `donghua=` infobox
  fields give the debut episode in continuous numbering ("Episode 133", "EP 59", a bare "128").

## Names

The official English subtitles are literal and not always consistent (the bead is "Tian Ni Pearl" and "Secret
Heavenly Pearl"; the Heng Yue Sect is "Hengyue Sect"; Wang Lin's childhood name is "Tiezhu"). The site uses the
names fans know from the novel translation and the wiki (Heaven Defying Bead, Heng Yue Sect, Country of Zhao). The
official-subtitle name goes in `subs` where it differs.

## Notes

| # | File | What's inside |
|---|---|---|
| 01 | [Power system](01-power-system.md) | The steps and realms, from Qi Condensation up, and when Wang Lin reaches each |
| 02 | [Terminology](02-terminology.md) | What the official subtitles call things, versus the novel translation |
| 03 | [World and powers](03-world-and-powers.md) | Countries, planets and star systems; sects and clans by tier |
| 04 | [Wang Lin](04-wang-lin.md) | What he has, in the order the donghua gives it to him |
