# 01: Power system

Cultivation in Renegade Immortal is a climb in **Steps** (步). The donghua's first 160 episodes live almost entirely in
the **First Step** and the bridge out of it. Everything above is still mostly names: strong people who walk into a
scene and are much stronger.

Names: the canonical name used on the site, then what the official English subtitles say when it differs, then 汉字.
`EP` = first episode the realm is shown on screen (by anyone). **Wang Lin** = first episode he is at it.

## Two bodies

From EP62 Wang Lin cultivates on two tracks, and the subtitles track them separately:
- **His cultivation** (the body the reviews call his clone or avatar): grown from a Nascent Soul he condensed in EP44,
  after his own failed. This is the realm ladder below.
- **His original body**: stuck at late Core Formation by the Extreme Realm foundation (EP10), it turns into an
  **Ancient God** (古神) body with the legacy of Tu Si (EP62: Two-Star; EP76: One-Star body merged with the clone;
  EP88: Three-Star). Ancient God stars are a separate ladder and don't map onto the realms.

⚠ The episodes sometimes show him lower than his real realm: sealed (EP82–86), disguised (EP133 as late Core
Formation), or hiding his strength. Those don't count as going backwards.

## The First Step (修仙第一步)

| # | Realm | Official subs | 汉字 | Stages | EP | Wang Lin |
|---|---|---|---|---|---|---|
| 1 | **Qi Condensation** | Qi Condensation | 凝气 | levels 1–15, then great perfection | 2 | EP2 (level 1), EP3 (level 14), EP5 (complete) |
| 2 | **Foundation Establishment** | Foundation | 筑基 | early, mid, late; "False Core" just before Core Formation | 6 | EP10 (an "Extreme Realm" foundation), mid EP14, False Core EP18 |
| 3 | **Core Formation** | Core Formation, Jie Dan | 结丹 | early, mid, late, great perfection | 18 (others) | EP21; late EP37; great perfection EP38 |
| 4 | **Nascent Soul** | Nascent Soul, Yuanying | 元婴 | early, mid, late, peak | 4 (Pu Nanzi) | EP44; mid EP53; late EP57 |
| 5 | **Soul Formation** | Soul Transformation (!), Deity Transformation | 化神 | early, mid, late, great perfection | 25 (Duanmu Ji) | EP62; mid EP79; late EP88 |
| 6 | **Soul Transformation** | Infant Transformation | 婴变 | early, mid, late, great perfection | 53 (Na Duo) | EP95; mid EP103; great perfection EP115 |
| 7 | **Ascendant** | Ascendant | 问鼎 | early, mid, late, great perfection | 70 (Zhou Yi) | EP121; mid EP142; late EP143; great perfection EP147 |

⚠ The official English uses "Soul Transformation" for 化神 in several episodes (EP69, EP108). The site follows the
novel translation: 化神 = Soul Formation, 婴变 = Soul Transformation. The Indonesian fansubs say "Transformasi Dewa"
for 化神 and "Transformasi Jiwa" for 婴变.

What each realm means, as the donghua shows it:
- **Qi Condensation**: sensing and gathering spiritual energy. Fifteen levels. Situ Nan names the seven First Step
  realms in EP2.
- **Foundation Establishment**: the energy is laid down as a foundation. Its quality caps everything after.
  Wang Lin's Extreme Realm foundation (EP10) makes him the strongest at his level, but blocks his own body from
  going past Core Formation.
- **Core Formation**: energy condensed into a golden core. A seized core can be absorbed (EP18).
- **Nascent Soul**: the core breaks into a small soul body that can leave the flesh and survive its death.
- **Soul Formation**: the cultivator comprehends a **domain** (意境, also "Intent Realm"), which crushes lower
  cultivators under its owner (EP55). From here, comprehension matters as much as the realm label.
- **Soul Transformation**: the Nascent Soul and body change again, toward celestial energy.
- **Ascendant**: the top of the First Step. Lifespans run to thousands of years.

## The bridge: Illusory Yin and Corporeal Yang

| Realm | Official subs | 汉字 | EP | Wang Lin |
|---|---|---|---|---|
| **Illusory Yin** | Yin Void | 阴虚 | 118 (Gu Yunchi) | not shown |
| **Corporeal Yang** | Yang Solid | 阳实 | 146 (Shengong Hu, fallen from it) | EP152 (the breakthrough happens off screen during a one-year gap) |

Named together in EP103 as what comes after Ascendant. Crossing them is how one leaves the First Step.

## The Second Step and beyond (seen, not climbed)

| Realm | 汉字 | First on screen |
|---|---|---|
| Nirvana Scryer | 窥涅 | EP105 (Chi Lie) |
| Nirvana Cleanser | 净涅 | EP71 (Tian Mozi, Ling Tianhou) |
| Nirvana Shatterer | 碎涅 | EP129 (Wang Wei) |
| Nirvana Void | 空涅 | EP154 (Bai Fan) |
| Spirit Void, Arcane Void, Void Tribulant | 空灵, 空玄, 空劫 | NOVEL |
| Heaven Trampling | 踏天 | NOVEL (the fourth step) |

- **Celestial ranks** are a separate ladder of the Celestial Realm's beings: Celestial guards up to Celestial
  Kings and the Immortal Emperor (EP154: Celestial King Carefree, a "Ninth Grade Immortal King"; Bai Fan).
- Ancient God, Ancient Devil and Ancient Demon bodies are counted in **stars** (one to nine, and more in the novel).

## Ladder used for the cast (build_cast.py `LEVELS`)

Mortal → Qi Condensation → Foundation Establishment → Core Formation → Nascent Soul → Soul Formation → Soul
Transformation → Ascendant → Illusory Yin → Corporeal Yang → Nirvana Scryer → Nirvana Cleanser → Nirvana Shatterer →
Nirvana Void → Spirit Void → Arcane Void → Void Tribulant → Heaven Trampling (18 rungs).

`zhLevels`: 凡人 凝气 筑基 结丹 元婴 化神 婴变 问鼎 阴虚 阳实 窥涅 净涅 碎涅 空涅 空灵 空玄 空劫 踏天.
