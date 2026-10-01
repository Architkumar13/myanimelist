# Martial Universe (武动乾坤 / *Wǔ Dòng Qián Kūn*): Reference Notes

Notes for the 3D donghua **Martial Universe**, published by Yuewen Animation (阅文动漫) on Tencent Video, adapted from
the novel by **Tian Can Tu Dou** (天蚕土豆, Heavenly Silkworm Potato). The same author wrote *Battle Through the
Heavens* and *The Great Ruler*; in *The Great Ruler*, Lin Dong is one of the legends who ascended from a lower plane.

A 2018 live-action drama shares the title (*Wu Dong Qian Kun*, with Yang Yang). These notes follow the donghua only.

## The website

The companion lives in the shared donghua site (`../site/`, see [../README.md](../README.md)): the realm ladder and
the Symbol Master ranks, the places Lin Dong actually stands in, his advantages in the order he gets them, an episode
guide through the latest aired episode, the cast, and the fan wiki.

**Open it:** double-click `../site/index.html` and pick Martial Universe, or run
`python3 -m http.server 8000 -d ../site` and open http://localhost:8000/?show=mu.

`site` here is a link to `../site/shows/martial-universe/`, so the scripts below write to `site/data/` and
`site/img/`. Page text, nav labels and the world sketch are in `site/show.js`.

**Rebuild the data:**

```bash
python3 scripts/fetch_wiki.py        # wiki pages into cache/wiki/ (skips the 1,300 "Novel Chapter N" pages)
python3 scripts/build_wiki.py        # -> site/data/wiki.js and site/img/wiki/
../.tools/venv/bin/python ../tools/apply_review.py mu --all   # data/episodes/review/ -> from-reviews.json + roster
python3 scripts/build_episodes.py    # data/episodes/*.json -> site/data/episodes.js
python3 scripts/build_cast.py        # data/characters/roster.json -> site/data/cast.js
```

Hand-curated realms, factions, places and terms live in `site/data/world.js`; the world-growth story is `site/atlas.js`.

## Where the data comes from

- **Subtitles:** the studio's own YouTube uploads (channel *Yuewen Animation*, playlist "《武动乾坤》Martial Universe"),
  which carry an official English track and a Chinese track for every episode. `data/episodes/youtube.json` maps
  each episode to its video; `tools/animekhor.py subs mu N` fetches both tracks into `cache/animekhor/`, and
  `scripts/align_subs.py` lines them up by time. The English track is machine-quality (realm names come out as
  "Shade" or "Atmospheric environment"), so the Chinese track decides who and what is meant.
- **Pictures:** stills come from the same official uploads (1080p, letterboxed). AnimeKhor's own copies are uneven:
  Season 1 embeds YouTube, Season 2 is one combined video on other hosts, Season 3 is on ok.ru only, and Seasons 4-6
  have Dailymotion copies with an Indonesian track (the fallback in `tools/shows.json`).
- **Episode summaries:** one review per episode in `data/episodes/review/`, written from both subtitle tracks
  (see `../tools/REVIEW.md`).
- **Wiki:** the [Wu Dong Qian Kun fan wiki](https://wu-dong-qian-kun.fandom.com/) (text CC BY-SA). It mostly follows
  the novel; its character pages have an "anime" debut field and some have a donghua column in their cultivation
  tables. Where the wiki and the episodes disagree, the episodes win.

## Names

The canonical English follows the official subtitles where they are consistent (Little Mink, Great Yan Dynasty,
Blood Wolf Gang, Stone Talisman), and the fan wiki (the Wuxiaworld novel translation) everywhere else (realm names,
Ancestral Symbol, Symbol Master). `02-terminology.md` lists both.

## Notes

| # | File | What's inside |
|---|---|---|
| 01 | [Power system](01-power-system.md) | Yuan Power realms, Symbol Master ranks, soul treasure and martial art grades |
| 02 | [Terminology](02-terminology.md) | What the official subtitles call things, versus the novel translation |
| 03 | [World and powers](03-world-and-powers.md) | Towns, cities, dynasties and the Eastern Xuan Region, and who outranks whom |
| 04 | [Lin Dong](04-lin-dong.md) | What he has, in the order the donghua gives it to him |

## Where the episodes are

Six seasons of 12 episodes, numbered straight through (Season 2 Episode 1 = EP13; Yuewen's own titles do the same,
e.g. "EP38 (S4 EP02)"):

| Season | Episodes | Aired | Arc |
|---|---|---|---|
| 1 | 1-12 | 27 Jan - 14 Apr 2019 | Qingyang Town and Yan City |
| 2 | 13-24 | 12 Jul - 27 Sep 2020 | Symbol Tower and the Lin Clan |
| 3 | 25-36 | 1 May - 17 Jul 2022 | The Ancient Tablet |
| 4 | 37-48 | from 25 Nov 2023 | Devouring Ancestral Symbol |
| 5 | 49-60 | from 1 Jan 2025 | The road to the Hundred Dynasties Battle |
| 6 | 61-72 | from 20 Nov 2025 | The Ancient Battlefield |

Air dates for Seasons 1-4 are from the fan wiki's episode list; Seasons 5-6 from AnimeKhor. A seventh season has
started in China (a Season 7 episode, numbered EP37 by one re-uploader, was online by 25 July 2026), but neither
AnimeKhor nor the official YouTube playlist has it as of 1 October 2026. The guide stops at **episode 72**.
