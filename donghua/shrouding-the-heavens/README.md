# Shrouding the Heavens (遮天 / *Zhe Tian*): Reference Notes

Notes for watching the donghua on the **Shrouding the Heavens Animation Official** YouTube channel (English subs), with background from the original novel by **Chen Dong** (辰东). It's the second book of his shared universe: *Perfect World* → *Shrouding the Heavens* → *Sacred Ruins*.

## The website

The companion lives in the shared donghua site (`../site/`, see [../README.md](../README.md)). It is a spoiler-aware companion website built from these notes plus the whole fan wiki: realms (with a body diagram), a map of Beidou, the faction tier ladder, Ye Fan's journey, an episode guide, the donghua cast (their looks and realms episode by episode, plus a who's-strongest ladder), 337 wiki characters, emperors by era, the Forbidden Zones, a terms table and a library of every wiki article. Set the episode you've watched up to in the top bar; anything later stays under a cinnabar seal until you choose to reveal it.

**Open it:** double-click `../site/index.html` and pick Shrouding the Heavens, or serve it with `python3 -m http.server 8000 -d ../site` and go to http://localhost:8000/?show=sth. Fonts load from Google Fonts; everything else is local.

`site` here is a link to `../site/shows/shrouding-the-heavens/`, so the scripts below (and `scripts/stills/`) still write to `site/data/` and `site/img/`. Page text, nav labels, the body diagram and the Beidou map are in `site/show.js`.

**Rebuild the data:**

```bash
python3 scripts/fetch_wiki.py        # download every wiki page into cache/wiki/ (add --refresh to refetch)
python3 scripts/build_wiki.py        # -> site/data/wiki.js and site/img/wiki/ (pictures)
python3 scripts/build_episodes.py    # data/episodes/*.json -> site/data/episodes.js
python3 scripts/build_cast.py        # data/characters/ -> site/data/cast.js (the People pages)
```

**People pages.** `data/characters/roster.json` is the donghua cast (107 people, in order of first on-screen appearance) with a realm timeline and every look change, each tagged with its episode. Sources and doubts are in `data/characters/SOURCES.md`. `data/characters/picks.json` records which still is used for each look: a frame from the official channel (EP1–50, re-grabbed at 1080p), a frame from a fan re-upload of an episode's preview clip, or a fan-wiki picture. Picks marked `"manual"` were chosen by hand. The portraits in `site/img/cast/` come from the face-matching scripts in `scripts/stills/`. Those need yt-dlp, OpenCV and ffmpeg in `/tmp/ytenv` and working files in `/tmp/stills`, so treat them as a record of how the pictures were made rather than a one-command rebuild. 5 looks still have no clear still (the Crocodile Ancestor, Zhang Ziling, Lingxu's master, the Sun Holy Emperor and the Thousand-Armed Divine Demon) and show a placeholder. Picks of kind `ak` are frames from the full episodes on AnimeKhor.

Hand-curated content (realms, tiers, factions, eras, journey, terms, milestones) lives in `site/data/world.js`; each item carries the episode it first appears in, which is what the seals use.

Episode summaries for EP1–50 were written from the official English subtitles. EP51–183 were rewritten from the Indonesian fan subtitles on AnimeKhor (the site the episodes are watched on), one reviewer per batch of about 20 episodes. Each file was checked to really be episode N, recaps and previews were ignored, and names were mapped to one spelling. The per-episode review notes, with corrections and doubtful lines, are in `data/episodes/review/`. EP80, 100, 166 and 176 had no subtitles and keep their older fan-sourced summaries. The old fan-sourced file is kept in `data/episodes/archive/`.

`scripts/apply_subs_review.py` applied the review to the cast: first appearances, realms from on-screen name cards, and Ye Fan's realm timeline after EP50.

`scripts/stills/animekhor.py` fetches an episode's subtitles (`subs N`) or a 1080p frame (`still N T`). Times follow the subtitle clock. It needs `pip install "yt-dlp[default,curl-cffi]"` in `/tmp/ytenv`, because Dailymotion throttles clients that don't look like a browser.

Wiki text and pictures come from the [fan wiki](https://shrouding-the-heavens.fandom.com/) (text CC BY-SA; the pictures are stills and art from the donghua, whose rights belong to their owners). Fine for personal use; think twice before publishing the site publicly with them.

## Notes

| # | File | What's inside | Spoiler level |
|---|---|---|---|
| 01 | [Power System](01-power-system.md) | All cultivation realms and sub-stages, Immortal Platform titles (Great Power → Great Saint), lifespans, weapon grades | Low → high as you scroll |
| 02 | [Terminology](02-terminology.md) | Official YouTube subs vs fansubs vs novel names for every key term | Low |
| 03 | [Regions & Sects](03-regions-and-sects.md) | The Beidou map, **faction tier list** (which level their strongest people are at), and every sect / holy land / clan in the order Ye Fan meets them | Grows by section |
| 04 | [Dynasties, Clans & Emperors](04-dynasties-clans-and-emperors.md) | Emperor clans and their imperial weapons, the Immortal Dynasties, assassin dynasties, eras and their Great Emperors | Medium → high |
| 05 | [Forbidden Zones](05-forbidden-zones.md) | The seven Life Forbidden Zones, Supremes, the Dark Turmoil | High |
| 06 | [Ye Fan's Cheats](06-ye-fan-cheats.md) | His physique, scriptures, the Nine Secrets, artifacts, source arts and cheat-level allies, stage by stage | Tagged per item |

## Spoiler key used in these notes

- 📺 already shown by **EP50** (the last free episode on the official channel at the time of writing)
- 🎬 appears in a later donghua episode
- 📖 novel-only / far future
- ⚠ sources disagree or it isn't verified
- Endgame material is hidden inside collapsible **"Click to reveal"** blocks.

## Quick orientation (no spoilers past the early episodes)

- **Ye Fan** and his classmates are carried from **Mount Tai** by **nine dragon corpses pulling a bronze coffin**, stopping at **Mars** and landing in the **Eastern Wasteland** of the **Beidou** (Big Dipper) star field.
- The first sect they meet is **Lingxu Cave Heaven** (a small "Paradise" where the master is only at Dao Palace). In this world, **Holy Lands** sit far above paradises, and **Emperor Clans** such as the **Ji** and **Jiang** families, which own a Great Emperor's weapon, sit above them.
- Ye Fan's **Ancient Desolate Sacred Body** looks useless at first (his Bitter Sea won't open) but is actually one of the strongest physiques there is. It just needs absurd resources, and heaven hates it.

## Sources

- Official English subtitles from the [Shrouding the Heavens Animation Official](https://www.youtube.com/@ShroudingTheHeavens) channel, EP01–50 (downloaded and searched for every term)
- [Shrouding the Heavens fan wiki](https://shrouding-the-heavens.fandom.com/) (novel-based, uneven quality, partly machine-translated; treat chapter and episode numbers as approximate)
- [Baidu Baike (English)](https://baike.baidu.com/en/item/Shrouding%20the%20Heavens/987261)
