# Battle Through the Heavens (斗破苍穹 / *Dòu Pò Cāngqióng*): Reference Notes

Notes for the 3D donghua **Battle Through the Heavens**, made for Tencent Video (Season 1 by Shanghai Foch Film,
everything since the 2017 specials by Motion Magic, 幻维数码) and adapted
from the novel by **Tian Can Tu Dou** (天蚕土豆, Heavenly Silkworm Potato). It is the first of his three linked novels:
*Battle Through the Heavens* → *Martial Universe* → *The Great Ruler*, where Xiao Yan turns up much later as one of the
strongest people above the lower planes.

## The website

The companion lives in the shared donghua site (`../site/`, see [../README.md](../README.md)): realms, the Heavenly
Flames and alchemy, the regions Xiao Yan passes through, the factions by tier, his journey and what he carries, an
episode guide for all 281 episodes, the cast with realm timelines, legendary figures, trials and dangerous places,
terms, and the fan wiki's articles.

**Open it:** double-click `../site/index.html` and pick Battle Through the Heavens, or run
`python3 -m http.server 8000 -d ../site` and open http://localhost:8000/?show=btth.

`site` here is a link to `../site/shows/battle-through-the-heavens/`, so the scripts below write to `site/data/` and
`site/img/`. Page text, nav labels and the map are in `site/show.js`; the world-growth story is `site/atlas.js`.

**Rebuild the data:**

```bash
../.tools/venv/bin/python scripts/official_subs.py fetch   # official English tracks from YouTube -> cache/youtube/
../.tools/venv/bin/python scripts/official_subs.py split   # one file per episode -> cache/official/ep{N}.en.srt
python3 scripts/fetch_wiki.py          # every wiki page into cache/wiki/
python3 scripts/build_wiki.py          # -> site/data/wiki.js and site/img/wiki/ (animated GIFs become stills)
../.tools/venv/bin/python ../tools/apply_review.py btth --all   # reviews -> data/episodes/from-reviews.json, roster realms
python3 scripts/build_episodes.py      # data/episodes/*.json -> site/data/episodes.js
python3 scripts/roster_from_reviews.py --write   # new people from the reviews into data/characters/roster.json
python3 scripts/build_cast.py          # roster.json -> site/data/cast.js
```

Hand-curated realms, factions, flames, trials and terms live in `site/data/world.js`.

## Where the episodes are, and how they're numbered

The site numbers episodes the way the official **Yuewen Animation English** YouTube channel does, straight through.
The user watches on AnimeKhor, which splits them into seasons:

| Site EP | Release | Years | AnimeKhor |
|---|---|---|---|
| 1–20 | Seasons 1–2 and the specials, re-cut into 20 episodes by the official release. EP18–20 are the *Song of Desert* special (Hai Bodong and Medusa's past). | 2017–2019 | Season 1 (12), Season 1 Specials (2), Season 2 (12): numbered differently |
| 21–32 | Season 3 | 2019 | one page, a YouTube compilation |
| 33–56 | Season 4 | 2021 | one page, a YouTube compilation |
| 57–69 | *Three-Year Agreement* (三年之约) | 2021 | Three-Year Agreement EP *n* = 56 + *n* |
| 70– | Season 5, the weekly "Year Version" (年番), from 31 July 2022 | 2022– | Season 5 EP *n* = 69 + *n* |

The guide runs to **EP281** (Season 5 EP212), the last episode aired before 1 October 2026. *The Origin* (缘起, a
2022 three-part remake of the opening) is not counted.

## Where the data comes from

- **Episode summaries:** every episode was reviewed from its subtitles, one reviewer per batch of 11–17 episodes
  (`data/episodes/review/ep{N}.json`; rules in `data/episodes/REVIEW-NOTES.md` and `../tools/REVIEW.md`).
  - EP1–267 and EP276–281: the **official English** track from the Yuewen Animation English channel. Most seasons are
    uploaded only as compilations ("EP70–EP82 Full Version"); `scripts/official_subs.py` cuts them at the
    `[Episode N]` card that opens each episode. `cache/official/sources.json` records which upload each came from.
  - EP268–273: the newest uploads have the English burned into the picture, so it was read off the frames (OCR).
  - EP274–275: AnimeKhor's Indonesian fan track.
  - Some Season 5 tracks (about EP248–255, 262, 266, 277–278) read like machine translation; those reviews are marked
    medium confidence.
- **Names** follow the official subtitles (Xun Er, Yao Lao, Nalan Yanran, Misty Cloud Sect, Jia Nan Academy, Hall of
  Souls, Dou Huang…), with other translations given as "also called".
- **Fan wiki:** [battle-through-the-heavens.fandom.com](https://battle-through-the-heavens.fandom.com/) (text CC BY-SA).
  It follows the novel, so it is used for 汉字, background and Library articles, never for episode numbers. Its
  "Donghua debut" fields count per season; `scripts/build_wiki.py` converts Season 3–5 and the Three-Year Agreement to
  the continuous numbers and leaves Seasons 1–2 blank, because the official release re-cut them.
- **Pictures:** wiki pictures (stills and art from the donghua), and cast portraits from the official uploads.
  Fine for personal use.

## Notes

| # | File | What's inside |
|---|---|---|
| 01 | [Power system](01-power-system.md) | The Dou Qi ladder and its stars, Xiao Yan's realm by episode, technique classes, alchemist tiers, Magical Beast ranks, soul realms, the Heavenly Flame Ranking |
| 02 | [Terminology](02-terminology.md) | What the official subtitles call things, with 汉字, other translations and first episode |
| 03 | [World and powers](03-world-and-powers.md) | Geography from Wu Tan City outward, factions by tier, legendary figures, trials and dangerous places |
| 04 | [Xiao Yan](04-xiao-yan.md) | What he has, in the order the donghua gives it to him, and his journey stage by stage |

## Quick orientation

- **Xiao Yan** of the Xiao Clan in **Wu Tan City** was a prodigy until his Dou Qi drained away for three years. The
  thief is **Yao Lao**, a great alchemist's soul living in his mother's black ring. Yao Lao becomes his teacher.
- **Nalan Yanran** of the **Misty Cloud Sect** breaks off their engagement. He answers with the **Three-Year
  Agreement**: a duel at her sect, three years later.
- His way up is the **Flame Mantra**, a technique that grows by swallowing **Heavenly Flames**, the 23 ranked
  flames of the world. Each one is a trial to take, and each makes him a better alchemist and fighter.
