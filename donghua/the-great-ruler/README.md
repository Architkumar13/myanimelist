# The Great Ruler (大主宰 / *Dà Zhǔ Zǎi*): Reference Notes

Notes for the 2023 donghua **The Great Ruler**, produced by Motion Magic for iQIYI, adapted from the novel by **Tian Can Tu Dou** (天蚕土豆, Heavenly Silkworm Potato). It shares a universe with *Battle Through the Heavens* and *Martial Universe*: those two stories happen in lower planes, and this one is set in the Great Thousand World above them.

A shorter 2019 series, **The Grand Lord** (12 episodes), adapts only the opening arc with a different studio. These notes follow the 2023 series.

## The website

The companion lives in the shared donghua site (`../site/`, see [../README.md](../README.md)). It is a spoiler-aware companion: the realm ladder, the three cultivation paths, the places Mu Chen actually stands in, his advantages in the order he gets them, an episode guide through the latest aired episode, and (once the download finishes) the fan wiki.

Set the episode you have watched in the top bar. Anything later stays under a cinnabar seal until you open it.

**Open it:** double-click `../site/index.html` and pick The Great Ruler, or run `python3 -m http.server 8000 -d ../site` and open http://localhost:8000/?show=tgr.

`site` here is a link to `../site/shows/the-great-ruler/`, so the scripts below still write to `site/data/` and `site/img/`. Page text, nav labels and the world sketch are in `site/show.js`.

**Rebuild the data:**

```bash
python3 scripts/fetch_wiki.py        # every wiki page into cache/wiki/
python3 scripts/build_wiki.py        # -> site/data/wiki.js and site/img/wiki/
python3 scripts/build_episodes.py    # data/episodes/*.json -> site/data/episodes.js
python3 scripts/build_cast.py        # donghua characters -> site/data/cast.js
```

Hand-curated realms, factions, trials and terms live in `site/data/world.js`.

Episode ranges for season 1 come from the fan wiki's quest pages. Episodes 53–92 (season 2) are that wiki's own episode log, cleaned up. They are not a transcript of the official subtitles.

Wiki text and pictures come from the [fan wiki](https://thegreatruler.fandom.com/) (text CC BY-SA). The pictures are stills and posters from the donghua. Fine for personal use.

## Notes

| # | File | What's inside |
|---|---|---|
| 01 | [Power system](01-power-system.md) | Spiritual Energy realms, Spiritual Array ranks, Battle Formation ranks |
| 02 | [Terminology](02-terminology.md) | What this donghua calls things, versus the novel and the 2019 series |
| 03 | [World and powers](03-world-and-powers.md) | Planes, continents, and who actually outranks whom |
| 04 | [Mu Chen](04-mu-chen.md) | What he has, in the order the donghua gives it to him |

## Where the episodes are

Season 1 is 52 episodes (30 June 2023 – 7 June 2024), novel chapters 1–264. Season 2 started 9 January 2026, weekly, and is partway through a planned 52. iQIYI numbers straight through, so season 2 episode 1 is episode 53. The guide stops at **episode 92**, the last one aired before 1 October 2026.

## Quick orientation

- **Mu Chen** is the young lord of **Mu Territory** in the **Northern Spiritual Realm**. His spiritual pulse was sealed, so he spent years looking like he could not cultivate.
- The **Spiritual Road** (the donghua says **Spiritual Land**) is a trial with every kind of energy turned off. He was thrown out of it and came home anyway.
- The only way up from a place this small is a seat at one of the **Five Great Academies**. **Northern Heavens Spiritual Academy** is the one he reaches.
