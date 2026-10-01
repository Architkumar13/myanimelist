# Jade Dynasty (诛仙 / *Zhū Xiān*): Reference Notes

Notes for the 3D donghua **Jade Dynasty**, made by Cloud Art (云图动漫) for Tencent Video, adapted from the 2003 novel
*Zhu Xian* by **Xiao Ding** (萧鼎). Not to be confused with the live-action films and drama, or the *Jade Dynasty* MMO.

## The website

The companion lives in the shared donghua site (`../site/`, see [../README.md](../README.md)): the cultivation
methods of the righteous and demonic paths, the sects and where they sit, Zhang Xiaofan's advantages in the order he
gets them, an episode guide through the latest aired episode, the cast with portraits, and the fan wiki.

**Open it:** double-click `../site/index.html` and pick Jade Dynasty, or run `python3 -m http.server 8000 -d ../site`
and open http://localhost:8000/?show=jd.

`site` here is a link to `../site/shows/jade-dynasty/`, so the scripts below write to `site/data/` and `site/img/`.
Page text, nav labels and the map are in `site/show.js`; hand-curated data is in `site/data/world.js`.

**Rebuild the data:**

```bash
python3 scripts/fetch_wiki.py        # every wiki page into cache/wiki/
python3 scripts/build_wiki.py        # -> site/data/wiki.js and site/img/wiki/
../.tools/venv/bin/python ../tools/apply_review.py jd <N>     # new reviews -> from-reviews.json + roster (never --all:
                                     # the roster's realm lines were cleaned by hand)
python3 scripts/build_episodes.py    # data/episodes/*.json -> site/data/episodes.js
python3 scripts/build_cast.py        # data/characters/roster.json -> site/data/cast.js
```

## Notes

| # | File | What's inside |
|---|---|---|
| 01 | [Power system](01-power-system.md) | Taiji Xuanqing Dao and the other sects' methods, how strength is shown on screen |
| 02 | [Terminology](02-terminology.md) | Names and terms, with 汉字 and other translations |
| 03 | [World and powers](03-world-and-powers.md) | The Divine Land, the righteous and demonic sects, the Southern Border |
| 04 | [Zhang Xiaofan](04-zhang-xiaofan.md) | What he has, in the order the donghua gives it to him |

## Seasons and numbering

| Season | Aired | Episodes here | AnimeKhor page |
|---|---|---|---|
| 1 | 2 Aug 2022 – 17 Jan 2023 | 1–26 | `jade-dynasty-zhu-xian` |
| 2 | from 30 Mar 2024 | 27–52 | `jade-dynasty-season-2` |
| 3 | from 12 Jun 2025 | 53–78 | `jade-dynasty-season-3` |
| Final | from 21 Aug 2026, weekly, 26 planned | 79– | `jade-dynasty-final-season` |

AnimeKhor numbers each season from 1; the site and the fan wiki count straight through (S3E1 = EP53).
`tools/shows.json` holds the four season pages with offsets 0, 26, 52 and 78. The guide runs to **episode 86**, the
latest aired on 1 October 2026.

## Where the data comes from

- **Subtitles:** Seasons 2–4 have an Indonesian fansub track on AnimeKhor's Dailymotion copies (`"subs": "id"`).
  AnimeKhor's Season 1 is only on ok.ru, and episodes 29, 36, 55, 57, 61, 66, 67 and 73–78 have lost their Dailymotion
  copies (their ok.ru and Rumble mirrors are blocked or deleted). Those 39 episodes use the English subtitle track of
  the multi-language uploads on the YouTube channel *Anime Box* instead: one video per episode for seasons 2–3, and
  five compilations for season 1, split at their `=Episode N=` markers (EP19/20 had no marker and were split at the
  credits gap). That English track is clean and probably the official translation, so its names win (Yuqing,
  Shangqing, Taiqing for the realms). The fetch was a one-off (`yt-dlp --write-subs --sub-langs en`); the files live
  in `cache/` and aren't committed.
- **Weekly updates** only touch the final season, which has the Indonesian track, so `/new-episode` works as usual.
- **Fan wiki:** [zhu-xian.fandom.com](https://zhu-xian.fandom.com/) (about 90 articles, text CC BY-SA). It mixes
  the novel, the drama and the donghua; its "Donghua" infobox field already counts episodes continuously. Its picture
  for Zhang Xiaofan is from the live-action drama, so cast portraits come from the episodes. Its "Cultivation" tab
  (Mortal, Earthly, Heavenly…) isn't from the story and is ignored.
- **Names:** the YouTube English track where it has a name, otherwise the wiki's pinyin, with the English meaning
  given as "also called".

## Quick orientation

- **Zhang Xiaofan** and **Lin Jingyu** are the only survivors of the massacre of **Grass Temple Village** at the foot
  of Qingyun Mountain. Both are taken into the **Qingyun Sect**. Xiaofan lands on **Great Bamboo Peak** under Tian
  Buyi, as its slowest disciple.
- Before the massacre, the monk **Pu Zhi** secretly teaches him the Buddhist **Great Brahma Prajna**. In Qingyun he
  learns the Taoist **Taiji Xuanqing Dao**. Later he picks up the demonic arts of the **Heavenly Book**.
- His weapon is the **Fire Stick**: a cursed **Sinister Bead** fused with a stick that drinks his blood.
- The righteous path (Qingyun, Tian Yin Temple, Fen Xiang Valley) and the Demon Sect (Ghost King Sect, He Huan Sect,
  Ten Thousand Poisons, Longevity Hall) fight for the whole story. **Lu Xueqi** of Small Bamboo Peak and **Bi Yao**,
  the Ghost King's daughter, stand on either side of him.
