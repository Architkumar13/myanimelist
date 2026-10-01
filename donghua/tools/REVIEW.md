# Writing an episode review from subtitles

Used by the weekly update (`/new-episode`) and by any agent reviewing a batch of episodes. One review file per
episode: `<show>/data/episodes/review/ep{N}.json`.

## Inputs

- Subtitles: `<show>/cache/animekhor/ep{N}.<lang>.srt`.
  - Shrouding the Heavens: `id`, Indonesian fansubs.
  - The Great Ruler: `en`, English read off the frames by `animekhor.py ocr`.
  - Renegade Immortal: `id` (Indonesian, AnimeKhor) plus the official `en`/`zh` tracks from Tencent's YouTube
    uploads in `renegade-immortal/cache/youtube/`. Read both. From about EP104 the YouTube `zh` is a machine
    translation of the English, so don't take 汉字 from it. Realm slips: official English "Soul Transformation" and
    Indonesian "Transformasi Dewa" usually mean 化神 = Soul Formation; "Infant Transformation" / "Transformasi Jiwa"
    = 婴变 = Soul Transformation; "Yin Void" / "Yang Solid" = Illusory Yin / Corporeal Yang. Name slips: "Tiezhu" =
    Wang Lin; "Tian Ni Pearl" = Heaven Defying Bead; "Hengyue" = Heng Yue Sect; "Huan Mei" = Liu Mei in disguise
    (EP134). Name cards say whether a Wang Lin is his clone or avatar; keep that in the realm.
  - Martial Universe: `en` (the studio's official English, machine-quality) and `zh` (Chinese, the reliable one for
    names), both from YouTube; `python3 martial-universe/scripts/align_subs.py N` shows them side by side. EP43-48's
    `zh` file is a second English track, and EP66-72 have no Chinese, so take names from the roster there.
    Name slips: realm names come out as "Shade", "Shaper", "Atmospheric environment"; 祖符 as "Zufu" or "ancestral
    talisman"; 貂爷 is Little Mink; 魔岩 is "Demon Rock". The show has no on-screen name cards.
  - Battle Through the Heavens: the official `en` track from Yuewen Animation's YouTube uploads (cut per episode
    into `battle-through-the-heavens/cache/official/ep{N}.en.srt` for EP1–267), else AnimeKhor's `id` track. Read
    `battle-through-the-heavens/data/episodes/REVIEW-NOTES.md` first: numbering, spellings, realm forms. Name slips:
    "Soul Shrine" / "Soul Hall" / "Soul Palace" = Hall of Souls; "Tianfu Alliance" = Sky Mansion Alliance;
    "Martial Saint" / "Battle Saint" = Dou Sheng; "Yao Clan" = Medicine Clan; "Cai Lin" = Medusa; "Little Iwa" =
    Xiao Yi; "Central Continent" = Central Plains. Name cards are bracket lines (`[Xiao Yan, Dou Sheng]`).
  - Jade Dynasty: `id` (Indonesian, AnimeKhor) for seasons 2–4; `en` (the English track of Anime Box's YouTube
    uploads) for season 1 and EP29, 36, 55, 57, 61, 66, 67, 73–78. Realms are Yuqing / Shangqing / Taiqing (Jade /
    Upper / Grand Purity). The hero is "Zhang Xiaofan" through EP26 and "Gui Li" from EP27. Name slips: "Yuki", "Kier"
    = Lu Xueqi; "Baguio" = Bi Yao; "Tian not easy" = Tian Buyi; "Aoba" = Qingye; "Tuan Muda Darah" = Gui Li; "Lianxue
    Sect" = Blood-Refining Hall. Name cards are parenthesised captions; speakers are rarely named, so say who is
    inferred in `flags`. Full list: `jade-dynasty/02-terminology.md`.
- Canonical names: the show's `data/characters/roster.json` (name, aka, zh) and the `terms` in `site/data/world.js`.
  The official-subtitle names win.
- Neighbouring reviews (N-1, N+1), for continuity.

## Subtitles are inconsistent: think before you write

- **Names** come out several ways: transliterations, titles, translated nicknames, machine slips.
  - Shrouding the Heavens slips: "Kamu penggemar" = Ye Fan, "kamu Fei" = Tu Fei, "Raja Gagak Kecil" = Jin Chi,
    "Si Gendut" = Pang Bo, "Anjing Hitam" = Hei Huang.
  - OCR slips: "l" read for "I", "'" read as "f" or "i" ("canft", "doesnit").
  - Map everything to the roster's name. If unsure who it is, write "a Jiang elder" rather than guess.
- **Name cards** show as a bracketed line: `[Name, faction, realm]`. They are the strongest evidence for who someone
  is, when they first appear, and their realm.
- **Realms**: record one only when it is clearly stated for that person. If it would move them backwards or skip
  wildly, don't silently accept it. Flag it instead (it may be a disguise, suppression, or a translation slip).
- **Recaps and previews**: files usually open with a recap of the previous episode and may end with a
  preview. Neither counts as this episode's events.
- **Wrong or garbled lines**: prefer the reading that fits the scene. Note ambiguous lines in `flags`.
- **Right episode**: check it follows N-1 and leads into N+1. If it looks like the wrong episode, flag it and stop.

## Output

```json
{
  "ep": N,
  "title": "short English title",
  "summary": "4-7 concrete sentences: who does what, where, why; canonical names",
  "events": ["5-8 short events in order"],
  "introduced": ["named people, places, items, terms first on screen this episode"],
  "cultivation": "realm or breakthrough facts stated this episode, or null",
  "confidence": "high | medium",
  "cast": [{"id": "roster id or null", "name": "canonical name", "realm": "if stated this episode", "quote": "the words that state it",
            "look": "visible appearance change, if clear", "first": true, "card": 612.4}],
  "changes": ["what you corrected versus any older summary"],
  "flags": ["inconsistent or unclear subtitle lines, with timestamps"]
}
```

`card` is the subtitle time (seconds) of that person's name card, if they have one. The picture tools grab frames there.
Validate with `python3 -c "import json; json.load(open(...))"`.
