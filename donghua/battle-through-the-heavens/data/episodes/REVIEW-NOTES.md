# Battle Through the Heavens: notes for episode reviewers

Read `../../../tools/REVIEW.md` first. This file adds what is specific to this show.

## Numbering

The site numbers episodes the way the official Yuewen Animation English channel does, straight through:

| Site EP | What it is | AnimeKhor page |
|---|---|---|
| 1–20 | Seasons 1–2 and their specials, re-cut by the official release (18–20 are the *Song of Desert* special, Hai Bodong and Medusa's past; its scenes run out of order) | S1, S1 Specials, S2 (numbered differently) |
| 21–32 | Season 3 | one compilation page |
| 33–56 | Season 4 | one compilation page |
| 57–69 | *Three-Year Agreement* | Three-Year Agreement EP n = 56 + n |
| 70– | Season 5 (the "Year Version") | S5 EP n = 69 + n |

## Subtitles

- `cache/official/ep{N}.en.srt`: the official English track, cut from the channel's uploads by
  `scripts/official_subs.py` (`cache/official/sources.json` says which upload each came from). Episodes inside a
  compilation open with an `[Episode N]` card, and the file starts at that card: the lines before a card are the
  end of the previous episode, so they are in the previous file. The narration right after the card is a recap of
  the previous episode, not new events.
- Lines in round brackets `(…)` are inner thoughts or narration. Bracketed `[Name]` lines with nothing else are
  speaker or name captions. Name cards look like `[Name, title or faction, realm]` or a bracket line with a realm.
- Song lyrics (opening and ending) appear as subtitle lines too. Ignore them.
- Where there is no official track, `cache/animekhor/ep{N}.id.srt` is the Indonesian fan track from AnimeKhor.
- Recaps of the previous episode (often in the first minute of Season 5 episodes) and previews of the next one don't
  count as this episode's events.

## Names: use these spellings (the official subtitles' most common form)

| Use | Also seen |
|---|---|
| Xiao Yan | Yan Er (by family), Yan Xiao (his alias in the capital), Yao Yan (to Yun Yun) |
| Yao Lao | Yao Chen (his real name), Mr. Yao, Teacher |
| Xun Er | Xun'er, Gu Xun Er |
| Nalan Yanran | |
| Yun Yun | Yun Zhi (the name she uses when she travels with Xiao Yan; he goes by Yao Yan) |
| Medusa | Queen Medusa; Cai Lin (her name later) |
| Zi Yan | |
| Seven-Colored Heaven Swallowing Python | id `heaven-swallowing-python` (Medusa's other self) |
| Little Fairy Doctor | |
| Xiao Zhan, Xiao Ding, Xiao Li | Xiao Yan's father and brothers |
| Hai Bodong | |
| Misty Cloud Sect | Yun Lan Sect (fan name) |
| Jia Ma Empire, Wu Tan City | |
| Jia Nan Academy | Jianan Academy |
| Tager Desert | |
| Black-Corner Region | |
| Central Plains | Zhongzhou |
| Hall of Souls | Soul Hall |
| Hun Clan | Soul Clan |
| Gu Clan, Pill Tower, Wind Lightning Pavilion, Burning Flame Valley | |
| Heavenly Flame | the 23 ranked flames |
| Flame Mantra | Fen Jue |

For anyone else: use the spelling the subtitle file uses most, in Title Case pinyin with spaces between syllables of a
given name only where the subtitles put them. The roster id is the kebab-case of the name (`xiao-yan`, `yao-lao`,
`xun-er`). If you're not sure two names are the same person, keep them apart and say so in `flags`.

## Realms

The official subtitles keep the pinyin ranks: Dou Zhi Qi (stages 1–9 of Dou Qi), Dou Zhe, Dou Shi, Da Dou Shi,
Dou Ling, Dou Wang, Dou Huang, Dou Zong, Dou Zun, Half-Saint, Dou Sheng, Dou Di. Each rank has stars (1–9): write
"3-star Dou Huang". Alchemists have grades: "tier-6 alchemist" (also "rank 6", "6th grade").
