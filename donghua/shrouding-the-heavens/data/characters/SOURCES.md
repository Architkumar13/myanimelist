# Sources for roster.json

`roster.json` holds 107 characters, ordered by the episode they first appear on screen, using the donghua's continuous EP1–183 numbering. The yearly seasons map onto that numbering as follows:

| Season | Chinese title | Episodes |
|---|---|---|
| Season 1 | 年番1 | EP1–53 |
| Season 2 | 年番2 | EP54–106 |
| Season 3 | 年番3 | EP107–156 |
| Season 4 | 年番4 | EP157– |

The movie 背棺战王腾 ("Fighting Wang Teng with the Coffin") sits between EP156 and EP157.

## Project material
- `data/episodes/01-25-official-subs.json`, `26-50-official-subs.json`: the main source for EP1–50 (intros, realms, arcs).
- `data/episodes/51-183-fan-sources.json`: the source for EP51–183. Its own confidence values carry over into the entries.
- `cache/wiki/*.json`: fan-wiki infoboxes, used for the `Donghua=` first-appearance notes and realm annotations. `Ye_Fan_Cultivation.json` gives the episode for each of Ye Fan's realms and his biological ages. The wiki is based on the novel; any realm taken only from it is marked `conf: "low"` with "(novel)" or "wiki".
- `site/data/world.js`: canonical realm and faction names.

## Web sources: looks and model changes
- Bilibili, "遮天动画27套造型" (the 27 official Ye Fan outfits, no episode numbers): https://www.bilibili.com/opus/985943385294503956
- EP106 Ye Fan new model (purple-and-white robe, used for Four Poles): https://news.qq.com/rain/a/20250423A06LLC00
- Season 3's four Ye Fan outfits: https://news.qq.com/rain/a/20250503A03UYV00 and https://news.qq.com/rain/a/20250409A0A99L00
- New models for Ye Fan, Ji Ziyue and An Miaoyi, shown at the 2024 Tencent animation festival: https://news.qq.com/rain/a/20240814A01HXQ00
- Gu Feng disguise (EP77): https://news.qq.com/rain/a/20240926A06QZD00, https://c.m.163.com/news/a/JSQD5T3105359PNN.html, https://www.163.com/dy/article/JRHK1G7F0515A2UF.html
- EP119 (Ji Ziyue redesign, Nannan's new clothes, aged Zhang Wenchang, Wang Chongxiao disguise): https://c.m.163.com/news/a/K560E6TV05359PNN.html and https://c.m.163.com/news/a/K4J73QEM055686CE.html
- Ji Ziyue's original "village girl" model and her redesign: https://m.sohu.com/a/878470384_122177866
- Ji Ziyue's EP57 face polish: https://news.qq.com/rain/a/20240515A00GWY00
- EP6 de-aging (only Ye Fan and Pang Bo got younger; the rest aged): https://news.sina.cn/sx/2023-05-22/detail-imyuriai3230421.d.html
- Li Xiaoman aged at EP6, then restored at EP23: https://news.qq.com/rain/a/20230920A06DUE00
- Li Xiaoman's season-4 costume: https://www.sina.cn/news/detail/5294156838601666.html
- Pang Bo's demon form: https://c.m.163.com/news/a/I8STL7CD0535TZOM.html and https://m.163.com/dy/article/IB5VONEB05561956.html
- Pang Bo EP38: https://yule.360.com/detail/3486587
- Pang Bo EP76: https://m.sohu.com/a/811592733_504412
- Pang Bo EP89–91 and Qin Yao's farewell: https://news.qq.com/rain/a/20250110A038WT00
- Pang Bo's new EP106 model: https://m.163.com/dy/article/JTGGU6030537HSMD.html
- Wei Wei's EP101 model: https://news.qq.com/rain/a/20250319A0664400 and https://www.sohu.com/a/874270567_122134628
- Old Madman's EP129 model: https://m.sohu.com/a/940513385_122508274/
- Old Madman's Immortal Platform caption: https://view.inews.qq.com/a/20231018A05UAG00
- Jiang Taixu revived with a new model (EP110): https://news.qq.com/rain/a/20250521A092QZ00 and https://news.qq.com/rain/a/20250403A07V3300
- Hei Huang: https://news.qq.com/rain/a/20240828A02FXL00 (EP72 shadow), https://news.qq.com/rain/a/20241015A04MD100 and https://news.qq.com/rain/a/20241022A09NU700 (EP81)
- An Miaoyi EP103: https://news.qq.com/rain/a/20250327A084KM00
- Li Heishui EP103: https://news.qq.com/rain/a/20250327A083TM00
- An Miaoyi as a nun (EP177): https://www.bilibili.com/video/BV1dzui69Eoo/
- Yao Xi and the Yaochi Holy Maiden: https://c.m.163.com/news/a/J18IVD000537HSMD.html, https://news.qq.com/rain/a/20240512A07RTA00, https://c.m.163.com/news/a/JD18KLK3055686CE.html, https://news.qq.com/rain/a/20240710A01TA800
- Duan De's clone and the lightning (EP99–101): https://m.sohu.com/a/863778454_122066679/
- Jiang Tingting in the Holy City (EP108): https://news.qq.com/rain/a/20250501A04S4O00
- Tu Fei and Peacock King concept art: https://zhuanlan.zhihu.com/p/695243877
- Ye Fan's EP171 "War King" set: https://yule.360.com/detail/5123549 (search snippet only)
- Ye Fan's EP183 holy shell: https://www.sohu.com/a/1076574411_504412 and https://m.sohu.com/a/1079759542_122066679
- Ye Zhetian remodel (EP141): https://zhuanlan.zhihu.com/p/1986962031060984915 (search snippet only)
- Other sources:
  - Jin Chi: https://news.qq.com/rain/a/20241120A03B1500 and https://news.qq.com/rain/a/20241114A04M9H00
  - Hua Yunfei at Dragon Transformation: https://www.163.com/dy/article/K7EMTG9705359PNN.html
  - EP146: https://c.m.163.com/news/a/KKFLNO4B0515G0A7.html
  - EP58: https://m.163.com/dy/article/J2QMVC0D05357XDF.html
  - Yi Qingwu (EP164): https://m.sohu.com/a/1021748286_504412/
  - EP174: https://sina.cn/news/detail/5328259392472841.html

Blocked or unusable:
- Baidu Baike showed a security check, even with a Baiduspider user agent.
- Zhihu wouldn't load from scripts.
- v.qq.com builds its episode list with JavaScript.
- zh.moegirl has no page for the donghua.

Because of these, official Tencent episode titles weren't collected.

## Notable uncertainties
- **No season-1 → season-2 redesign.** Nothing changes at EP53/54. The real model upgrades are:
  - EP57: Ji Ziyue's face is polished.
  - EP106: new models for Ye Fan and Pang Bo.
  - EP110: Jiang Taixu is revived with a new model.
  - EP119: Ji Ziyue is redesigned.
  - EP129: new model for the Old Madman.
  - EP141: Ye Fan is remodelled as "Ye Zhetian".
  - EP156, EP157 and EP171: new Ye Fan outfits.
- **Ye Fan stays teen-looking.** No source says he visibly grows back to adult looks after the EP6 de-aging. The wiki's biological ages (12 → 16 at EP106 → 21 at EP156 → ~29 at EP159) suggest gradual growth.
- **Unplaced Ye Fan outfits.** Several season-3 promo outfits couldn't be tied to an episode, so they aren't in the roster:
  - black-gold dragon-pattern robe
  - blue-and-white martial outfit
  - "exotic" look with face paint
  - indestructible golden-body form
- **Guessed episodes for Ye Fan's looks (conf low):**
  - EP54: Northern leather outfit with bamboo hat.
  - EP96: "Daoist Zhengde".
  - EP159: time-skip look.
- **Classmates regaining youth.** Only Li Xiaoman (EP23) and Zhang Wenchang (EP26) are confirmed. For Lin Jia, Liu Yiyi, Wang Ziwen and Zhou Yi the "young again" entries are inferred (conf low).
- **First appearances.**
  - The classmates count from EP1 because they're on screen at the reunion, even though most are only named in EP2–6.
  - Qin Yao is listed at EP14, per the wiki. The official subtitles first name her in EP17.
  - Ji Haoyue is listed at EP40; the wiki says EP39 (probably a glimpse).
  - Hei Huang is listed at EP81; an unrevealed black shadow may appear around EP72.
  - Wei Wei is mentioned from EP7 but, according to fan articles, first really appears in EP101.
- **Duplicate-looking wiki pages.**
  - "Liu Wanshan" and "Lui Wanshan" are the same person; they're merged, with the wiki link pointing to "Liu Wanshan".
  - "Ji Yun Feng" (the Ji elder at the tomb, EP16) and "Ji Yunfeng" (a Dao Palace Ji member, EP83) look like two different characters. Only the EP16 elder is included, as "Elder Ji".
  - The same goes for the "Zhang Wu Ye" and "Zhang Yuye" pages (the entry links to "Zhang Wu Ye") and for Hei Huang's three pages ("Hei Huang" is used).
- **Chinese names.**
  - Where the wiki's Chinese was clearly wrong (e.g. 邻家 for Lin Jia, 吉好月 for Ji Haoyue), the novel spelling is used.
  - `zh` is null where it couldn't be confirmed: Cheng Mang, Wang Yan, Yuehong, Liu Wanshan, Li Yun, Chen Feng, Old Jiang.
  - Some zh are unverified guesses: 姬慧 vs 姬辉 for Ji Hui; 雨蝶 vs 玉蝶 for Yu Die; 夏一鸣, 殷天治/殷天德, 燕一夕, 齐麟, 王成坤, 紫天峰.
- **Realms.**
  - The show states realms reliably only in the Wheel-Sea arcs and a few later lines, e.g.:
    - Qin Yao at Dao Palace (EP37).
    - Yan Ruyu at Four Poles (EP38).
    - Ji Xia at Other Shore (EP46).
    - The Old Madman's "Immortal Platform" caption.
  - Most other realms come from the wiki or the novel and are marked low.
  - Ye Fan's Immortal Platform steps depend on the movie. Sohu claims he reaches "Dao Severing" in EP166, but the wiki keeps him at 2nd Heaven through EP170, so the roster keeps 2nd Heaven.
- **Spoiler-sensitive omissions.**
  - The prologue sister (EP1) is left out as a separate entry. Nannan's EP125 arc note ("Ruthless Emperor's Dao fruit") is episode-gated.
  - Wang Chongxiao (EP118) is treated as Ye Fan's disguise, not a separate character.


## Subtitle review (EP51–183)

The Indonesian AnimeKhor subtitles were read for every episode except EP80, 100, 166 and 176. On-screen name cards, which the subtitles translate as `[Name, faction, realm]`, were treated as the strongest evidence for first appearances and realms. What changed in the roster:

- First appearances: Ji Hong EP53, Jiang Taixu EP70, Wei Wei EP8, Feng Fenghuang EP117, Crow Daoist EP139, Yin Tiande EP162, Zi Tianfeng EP167, Barbarian King EP175, Thousand-Armed Divine Demon EP161, Lu Ya EP163 (as a clone).
- 56 realm entries added from name cards. Name cards that would move someone backwards were skipped, e.g. Jin Chi holding himself down to Dao Palace in EP86.
- Ye Fan: after EP50 his timeline now follows the subtitles. The Dao Palace organ names and source amounts were dropped because the show never states them, and his 2nd Heaven is EP159, not EP167.
- Known gaps: about 40 named people who appear on screen aren't in the roster yet (e.g. Wang Chongxiao, the Old Golden-Winged Peng King, the Dark Night King, the Queen Mother of the West, the Blind Old Man of Heaven, Star Peak's Chen Feng). They're listed in the review files' `cast` entries.
- Recurring machine-translation slips in these subtitles: "Kamu penggemar" is Ye Fan, "kamu Fei" is Tu Fei, and "Raja Gagak Kecil" is Jin Chi.

## Added October 2026

50 characters were added from the subtitle review's name cards (`added-2026-10.json` lists each one with its card time), bringing the roster to 157. Their pictures are frames from the full episodes on AnimeKhor, taken at the name card. Each was checked against the whole cast by face similarity, so a frame showing Ye Fan or a neighbour is rejected. Chen Feng (Star Peak) and Lao Dawei have no clear on-screen frame and show a placeholder.
