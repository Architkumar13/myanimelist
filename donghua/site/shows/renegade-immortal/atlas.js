// The World page's "world keeps growing" story: ten stages, the places Wang Lin reaches in each, and where they sit.
// Stages follow where Wang Lin physically is in each episode (from all 160 reviews). World units: Planet Suzaku's
// landmass uses show.js map.lands (0–700 × 0–520); other worlds sit far out. lod: 1 spot, 2 landmark, 3 whole world.
// cam = [centre x, centre y, width]. ceiling.lvl indexes `ladder` (and SHOW.zhLevels).
(function () {
window.ATLAS = {
 "aspect": [
  4,
  3
 ],
 "zh": "修真界",
 "title": "The world keeps growing",
 "lede": "Wang Lin's world starts as one small country on one planet and ends up two star systems wide. Scroll, and the map pulls back each time the story does.",
 "ladder": [
  "Mortal",
  "Qi Condensation",
  "Foundation Establishment",
  "Core Formation",
  "Nascent Soul",
  "Soul Formation",
  "Soul Transformation",
  "Ascendant",
  "Illusory Yin",
  "Corporeal Yang",
  "Nirvana Scryer",
  "Nirvana Cleanser",
  "Nirvana Shatterer",
  "Nirvana Void",
  "Spirit Void",
  "Arcane Void",
  "Void Tribulant",
  "Heaven Trampling"
 ],
 "bodies": [
  {
   "id": "planet-suzaku",
   "x": 345,
   "y": 260,
   "r": 440,
   "ep": 1,
   "name": "Planet Suzaku",
   "zh": "朱雀星",
   "planet": true
  },
  {
   "id": "rain-celestial-realm",
   "x": 1300,
   "y": -900,
   "r": 260,
   "ep": 64,
   "name": "Rain Celestial Realm",
   "zh": "雨之仙界"
  },
  {
   "id": "planet-yue",
   "x": -1400,
   "y": -500,
   "r": 110,
   "ep": 91,
   "name": "Planet Yue",
   "zh": "月星"
  },
  {
   "id": "trading-planet",
   "x": 3400,
   "y": -1700,
   "r": 120,
   "ep": 103,
   "name": "Trading Planet",
   "zh": "贸易星"
  },
  {
   "id": "planet-tian-yun",
   "x": 4600,
   "y": -2100,
   "r": 600,
   "ep": 104,
   "name": "Planet Tian Yun",
   "zh": "天运星"
  },
  {
   "id": "earthstar",
   "x": 5450,
   "y": -1500,
   "r": 150,
   "ep": 108,
   "name": "Earthstar",
   "zh": "地星"
  },
  {
   "id": "demon-spirit-land",
   "x": 5650,
   "y": -2950,
   "r": 520,
   "ep": 110,
   "name": "Demon Spirit Land",
   "zh": "妖灵之地"
  },
  {
   "id": "planet-ran-yun",
   "x": 9800,
   "y": -6300,
   "r": 120,
   "ep": 133,
   "name": "Planet Ran Yun",
   "zh": "冉云星"
  },
  {
   "id": "planet-yun-xia",
   "x": 10700,
   "y": -6200,
   "r": 160,
   "ep": 136,
   "name": "Planet Yun Xia (the Moonwatcher)",
   "zh": "云霞星",
   "stage": "allheaven"
  },
  {
   "id": "planet-thousand-illusion",
   "x": 10350,
   "y": -6750,
   "r": 200,
   "ep": 137,
   "name": "Planet Thousand Illusion",
   "zh": "千幻星"
  },
  {
   "id": "lightning-planet",
   "x": 10600,
   "y": -2788,
   "r": 140,
   "ep": 145,
   "name": "Hidden lightning planet",
   "zh": "",
   "stage": "allheaven"
  },
  {
   "id": "planet-qing-ling",
   "x": 10900,
   "y": -2500,
   "r": 110,
   "ep": 147,
   "name": "Planet Qing Ling",
   "zh": "青灵星"
  },
  {
   "id": "thunder-celestial-realm",
   "x": 10500,
   "y": -4500,
   "r": 800,
   "ep": 148,
   "name": "Thunder Celestial Realm",
   "zh": "雷之仙界"
  },
  {
   "id": "fog-land",
   "x": 8300,
   "y": -4588,
   "r": 140,
   "ep": 159,
   "name": "Fog land in the belly of a giant beast",
   "zh": ""
  }
 ],
 "places": {
  "planet-suzaku": {
   "name": "Planet Suzaku",
   "zh": "朱雀星",
   "x": 345,
   "y": 260,
   "lod": 3,
   "region": "zhao",
   "ep": 1
  },
  "zhao": {
   "name": "Country of Zhao",
   "zh": "赵国",
   "x": 380,
   "y": 275,
   "lod": 2,
   "region": "zhao",
   "ep": 1
  },
  "wang-village": {
   "name": "Wang family village (and his parents' grave)",
   "x": 352,
   "y": 262,
   "lod": 1,
   "region": "zhao",
   "ep": 1
  },
  "heng-yue": {
   "name": "Heng Yue Sect, Heng Yue Peak",
   "zh": "恒岳派",
   "x": 366,
   "y": 248,
   "lod": 1,
   "region": "zhao",
   "ep": 1
  },
  "tianshui-road": {
   "name": "Caravan road to Tianshui City",
   "zh": "天水城",
   "x": 392,
   "y": 236,
   "lod": 1,
   "region": "zhao",
   "ep": 5
  },
  "teng-city": {
   "name": "Teng Family City",
   "zh": "藤家城",
   "x": 402,
   "y": 256,
   "lod": 1,
   "region": "zhao",
   "ep": 6
  },
  "mysterious-forest": {
   "name": "Mysterious Forest",
   "x": 404,
   "y": 300,
   "lod": 1,
   "region": "zhao",
   "ep": 7
  },
  "yin-ruins": {
   "name": "Ruins of the dead (extreme-yin land)",
   "x": 330,
   "y": 284,
   "lod": 1,
   "region": "zhao",
   "ep": 8
  },
  "corpse-yin-sect": {
   "name": "Corpse Yin Sect",
   "zh": "尸阴宗",
   "x": 343,
   "y": 293,
   "lod": 1,
   "region": "zhao",
   "ep": 9
  },
  "cassia-valley": {
   "name": "Cassia Valley",
   "x": 426,
   "y": 280,
   "lod": 1,
   "region": "zhao",
   "ep": 11
  },
  "zhao-capital": {
   "name": "Zhao capital and the Wang residence",
   "x": 378,
   "y": 272,
   "lod": 1,
   "region": "zhao",
   "ep": 46
  },
  "tian-dao-sect": {
   "name": "Tian Dao Sect",
   "zh": "天道宗",
   "x": 388,
   "y": 283,
   "lod": 1,
   "region": "zhao",
   "ep": 47
  },
  "wufeng-valley": {
   "name": "Wufeng Valley",
   "zh": "无锋谷",
   "x": 362,
   "y": 302,
   "lod": 1,
   "region": "zhao",
   "ep": 48
  },
  "tianyin-city": {
   "name": "Tianyin City",
   "x": 416,
   "y": 268,
   "lod": 1,
   "region": "zhao",
   "ep": 49
  },
  "black-mire": {
   "name": "Black Mire",
   "x": 338,
   "y": 306,
   "lod": 1,
   "region": "zhao",
   "ep": 50
  },
  "foreign-battlefield": {
   "name": "Foreign battlefield (Outer Region Battlefield)",
   "zh": "域外战场",
   "x": 245,
   "y": 255,
   "lod": 2,
   "region": "zhao",
   "ep": 12
  },
  "wuwen": {
   "name": "Wuwen",
   "x": 275,
   "y": 290,
   "lod": 2,
   "region": "zhao",
   "ep": 63
  },
  "huo-fen": {
   "name": "Huo Fen, the Fire Country",
   "zh": "火焚国",
   "x": 335,
   "y": 490,
   "lod": 2,
   "region": "huo-fen",
   "ep": 14
  },
  "war-shrine-sect": {
   "name": "War Shrine Sect",
   "x": 330,
   "y": 494,
   "lod": 1,
   "region": "huo-fen",
   "ep": 16
  },
  "burning-gold-mountains": {
   "name": "Burning Gold Mountains",
   "x": 300,
   "y": 505,
   "lod": 1,
   "region": "huo-fen",
   "ep": 14
  },
  "fire-beast-volcano": {
   "name": "Fire-beast volcano lair",
   "x": 358,
   "y": 507,
   "lod": 1,
   "region": "huo-fen",
   "ep": 15
  },
  "xuan-wu": {
   "name": "Xuan Wu Country",
   "zh": "玄武国",
   "x": 520,
   "y": 470,
   "lod": 2,
   "region": "huo-fen",
   "ep": 17
  },
  "xuanwu-front": {
   "name": "Xuan Wu battlefield, Huo Chu Alliance front",
   "x": 468,
   "y": 482,
   "lod": 1,
   "region": "huo-fen",
   "ep": 17
  },
  "war-god-temple": {
   "name": "War God Temple, Huo Chu Alliance",
   "x": 540,
   "y": 468,
   "lod": 1,
   "region": "huo-fen",
   "ep": 25
  },
  "sea-of-devils": {
   "name": "Sea of Devils",
   "zh": "修魔海",
   "x": 395,
   "y": 385,
   "lod": 2,
   "region": "sea-of-devils",
   "ep": 19
  },
  "devil-sea-cave": {
   "name": "His cave in the Sea of Devils",
   "x": 452,
   "y": 440,
   "lod": 1,
   "region": "sea-of-devils",
   "ep": 19
  },
  "corpse-valley": {
   "name": "Valley of Corpses",
   "x": 472,
   "y": 420,
   "lod": 1,
   "region": "sea-of-devils",
   "ep": 19
  },
  "nan-dou-city": {
   "name": "Nan Dou City",
   "x": 440,
   "y": 456,
   "lod": 1,
   "region": "sea-of-devils",
   "ep": 20
  },
  "fighting-evil-sect": {
   "name": "Fighting Evil Sect",
   "zh": "斗邪派",
   "x": 500,
   "y": 432,
   "lod": 1,
   "region": "sea-of-devils",
   "ep": 22
  },
  "broken-stars": {
   "name": "Chaotic Broken Stars",
   "zh": "碎星乱",
   "x": 390,
   "y": 405,
   "lod": 2,
   "region": "sea-of-devils",
   "ep": 26
  },
  "ancient-god-land": {
   "name": "Land of the Ancient God",
   "zh": "古神之地",
   "x": 398,
   "y": 345,
   "lod": 2,
   "region": "sea-of-devils",
   "ep": 27
  },
  "first-trial": {
   "name": "First trial (hurricane region)",
   "x": 352,
   "y": 322,
   "lod": 1,
   "region": "sea-of-devils",
   "ep": 27
  },
  "bridge-of-no-return": {
   "name": "Bridge of No Return",
   "x": 446,
   "y": 322,
   "lod": 1,
   "region": "sea-of-devils",
   "ep": 30
  },
  "forbidden-mountain": {
   "name": "Forbidden Mountain (second trial)",
   "x": 462,
   "y": 352,
   "lod": 1,
   "region": "sea-of-devils",
   "ep": 31
  },
  "dead-space": {
   "name": "Dead Space (third trial)",
   "x": 440,
   "y": 382,
   "lod": 1,
   "region": "sea-of-devils",
   "ep": 33
  },
  "dead-sea": {
   "name": "Blood Sea and Dead Sea",
   "x": 360,
   "y": 382,
   "lod": 1,
   "region": "sea-of-devils",
   "ep": 34
  },
  "qilin-city": {
   "name": "Qilin City",
   "x": 318,
   "y": 346,
   "lod": 1,
   "region": "sea-of-devils",
   "ep": 37
  },
  "qilin-cave": {
   "name": "Ancient cave near Qilin City",
   "x": 300,
   "y": 372,
   "lod": 1,
   "region": "sea-of-devils",
   "ep": 38
  },
  "lianmo-city": {
   "name": "Lianmo City",
   "x": 392,
   "y": 322,
   "lod": 1,
   "region": "sea-of-devils",
   "ep": 45
  },
  "weapon-pavilion": {
   "name": "Weapon Refining Pavilion",
   "x": 300,
   "y": 396,
   "lod": 1,
   "region": "sea-of-devils",
   "ep": 75
  },
  "chu": {
   "name": "Country of Chu",
   "zh": "楚国",
   "x": 195,
   "y": 425,
   "lod": 2,
   "region": "chu",
   "ep": 39
  },
  "cloud-sky-sect": {
   "name": "Cloud Sky Sect",
   "zh": "云天宗",
   "x": 200,
   "y": 410,
   "lod": 1,
   "region": "chu",
   "ep": 39
  },
  "chu-valley": {
   "name": "Cold valley on the Chu border",
   "x": 242,
   "y": 440,
   "lod": 1,
   "region": "chu",
   "ep": 74
  },
  "xinghua-village": {
   "name": "Xinghua (Apricot) Village",
   "zh": "杏花村",
   "x": 176,
   "y": 396,
   "lod": 1,
   "region": "chu",
   "ep": 77
  },
  "forsaken-land": {
   "name": "Land of the Forsaken Immortals",
   "x": 235,
   "y": 355,
   "lod": 2,
   "region": "chu",
   "ep": 77
  },
  "giant-demon-clan": {
   "name": "Giant Demon Clan",
   "zh": "巨魔族",
   "x": 110,
   "y": 470,
   "lod": 2,
   "region": "chu",
   "ep": 90
  },
  "four-faction-alliance": {
   "name": "Four Faction Alliance (later the New Snow Region)",
   "x": 605,
   "y": 320,
   "lod": 2,
   "region": "four-faction-alliance",
   "ep": 53
  },
  "nan-capital": {
   "name": "Old street in the capital of Nan",
   "x": 592,
   "y": 330,
   "lod": 1,
   "region": "four-faction-alliance",
   "ep": 53
  },
  "baiyun-sect": {
   "name": "Baiyun Sect",
   "x": 648,
   "y": 300,
   "lod": 1,
   "region": "four-faction-alliance",
   "ep": 56
  },
  "alliance-battlefield": {
   "name": "Four Faction Alliance battlefield",
   "x": 612,
   "y": 352,
   "lod": 1,
   "region": "four-faction-alliance",
   "ep": 59
  },
  "snow-city-72": {
   "name": "72nd city of the New Snow Region",
   "x": 622,
   "y": 318,
   "lod": 1,
   "region": "four-faction-alliance",
   "ep": 61
  },
  "snow-domain": {
   "name": "Snow Domain (Snow Region)",
   "zh": "雪域",
   "x": 640,
   "y": 225,
   "lod": 2,
   "region": "snow-domain",
   "ep": 89
  },
  "snow-god-temple": {
   "name": "Snow God Temple",
   "x": 646,
   "y": 214,
   "lod": 1,
   "region": "snow-domain",
   "ep": 89
  },
  "suzaku-continent": {
   "name": "Suzaku Plain (Suzaku Continent)",
   "x": 380,
   "y": 130,
   "lod": 2,
   "region": "suzaku-continent",
   "ep": 81
  },
  "suzaku-country": {
   "name": "Suzaku Country",
   "zh": "朱雀国",
   "x": 390,
   "y": 135,
   "lod": 2,
   "region": "suzaku-continent",
   "ep": 81
  },
  "barren-mountain": {
   "name": "Barren Mountain arena, Suzaku Plain",
   "x": 396,
   "y": 128,
   "lod": 1,
   "region": "suzaku-continent",
   "ep": 81
  },
  "far-north-trap": {
   "name": "Li Yuanfeng's sealing formation, far north",
   "x": 395,
   "y": 48,
   "lod": 1,
   "region": "suzaku-continent",
   "ep": 83
  },
  "pilu": {
   "name": "Pilu Country",
   "x": 185,
   "y": 150,
   "lod": 2,
   "region": "suzaku-continent",
   "ep": 84
  },
  "fire-cloud-fortress": {
   "name": "Fire Cloud Fortress",
   "x": 228,
   "y": 166,
   "lod": 1,
   "region": "suzaku-continent",
   "ep": 84
  },
  "soul-refining-sect": {
   "name": "Soul Refining Sect",
   "zh": "炼魂宗",
   "x": 188,
   "y": 140,
   "lod": 1,
   "region": "suzaku-continent",
   "ep": 85
  },
  "north-extreme-fire": {
   "name": "Little Northern Extreme Fire region",
   "zh": "小北炎极之地",
   "x": 330,
   "y": 40,
   "lod": 1,
   "region": "suzaku-continent",
   "ep": 96
  },
  "suzaku-tomb": {
   "name": "Suzaku Tomb, outer tomb",
   "zh": "朱雀墓",
   "x": 440,
   "y": 170,
   "lod": 2,
   "region": "suzaku-continent",
   "ep": 99
  },
  "golden-soul-valley": {
   "name": "Golden Soul Valley",
   "x": 434,
   "y": 176,
   "lod": 1,
   "region": "suzaku-continent",
   "ep": 100
  },
  "spirit-mountain": {
   "name": "Spirit Mountain, Ye Wuyou's tomb",
   "zh": "灵山",
   "x": 446,
   "y": 164,
   "lod": 1,
   "region": "suzaku-continent",
   "ep": 101
  },
  "planet-yue": {
   "name": "Planet Yue",
   "zh": "月星",
   "x": -1400,
   "y": -500,
   "lod": 3,
   "region": "alliance-star-system",
   "ep": 91
  },
  "yue-stone-house": {
   "name": "Stone house in the wastes",
   "x": -1400,
   "y": -560,
   "lod": 1,
   "region": "alliance-star-system",
   "ep": 91
  },
  "rain-celestial-realm": {
   "name": "Rain Celestial Realm",
   "zh": "雨之仙界",
   "x": 1300,
   "y": -900,
   "lod": 3,
   "region": "rain-celestial-realm",
   "ep": 64
  },
  "rain-palace": {
   "name": "Rain Immortal King's palace ruins",
   "x": 1300,
   "y": -1043,
   "lod": 1,
   "region": "rain-celestial-realm",
   "ep": 64
  },
  "beast-palace": {
   "name": "Immortal Beast Palace, third fragment",
   "x": 1443,
   "y": -900,
   "lod": 1,
   "region": "rain-celestial-realm",
   "ep": 65
  },
  "tiger-mountain": {
   "name": "Tiger Mountain fragment",
   "x": 1300,
   "y": -757,
   "lod": 1,
   "region": "rain-celestial-realm",
   "ep": 67
  },
  "overlapping-fragment": {
   "name": "Overlapping fragment (via the Cold Stream)",
   "x": 1157,
   "y": -900,
   "lod": 1,
   "region": "rain-celestial-realm",
   "ep": 68
  },
  "trading-planet": {
   "name": "Trading Planet",
   "zh": "贸易星",
   "x": 3400,
   "y": -1700,
   "lod": 3,
   "region": "alliance-star-system",
   "ep": 103
  },
  "mingmei-city": {
   "name": "Mingmei City",
   "zh": "明美城",
   "x": 3400,
   "y": -1766,
   "lod": 1,
   "region": "alliance-star-system",
   "ep": 103
  },
  "planet-tian-yun": {
   "name": "Planet Tian Yun",
   "zh": "天运星",
   "x": 4600,
   "y": -2100,
   "lod": 3,
   "region": "planet-tian-yun",
   "ep": 104
  },
  "heavenly-fate-sect": {
   "name": "Heavenly Fate Sect, Purple Branch",
   "zh": "天运宗",
   "x": 4600,
   "y": -2430,
   "lod": 1,
   "region": "planet-tian-yun",
   "ep": 104
  },
  "stone-forest": {
   "name": "Stone Forest",
   "zh": "石林",
   "x": 4886,
   "y": -1935,
   "lod": 1,
   "region": "planet-tian-yun",
   "ep": 105
  },
  "black-white-peaks": {
   "name": "Three Black and White Peaks",
   "x": 4314,
   "y": -1935,
   "lod": 1,
   "region": "planet-tian-yun",
   "ep": 107
  },
  "east-sea-gate": {
   "name": "Demon Spirit Gate, East Sea",
   "x": 5050,
   "y": -2500,
   "lod": 2,
   "region": "planet-tian-yun",
   "ep": 109
  },
  "earthstar": {
   "name": "Earthstar",
   "zh": "地星",
   "x": 5450,
   "y": -1500,
   "lod": 3,
   "region": "alliance-star-system",
   "ep": 108
  },
  "northern-demon-earth": {
   "name": "Northern Demon Earth region (Lingyue)",
   "x": 5450,
   "y": -1582,
   "lod": 2,
   "region": "alliance-star-system",
   "ep": 108
  },
  "demon-spirit-land": {
   "name": "Demon Spirit Land",
   "zh": "妖灵之地",
   "x": 5650,
   "y": -2950,
   "lod": 3,
   "region": "demon-spirit-land",
   "ep": 110
  },
  "sky-demon-country": {
   "name": "Sky Demon Country",
   "x": 5650,
   "y": -2950,
   "lod": 2,
   "region": "demon-spirit-land",
   "ep": 110
  },
  "soul-refining-tribe": {
   "name": "Soul Refining Tribe's valley",
   "zh": "炼魂部落",
   "x": 5650,
   "y": -3093,
   "lod": 1,
   "region": "demon-spirit-land",
   "ep": 110
  },
  "ancient-demon-city": {
   "name": "Ancient Demon City",
   "zh": "古妖城",
   "x": 5774,
   "y": -3022,
   "lod": 1,
   "region": "demon-spirit-land",
   "ep": 112
  },
  "qin-lin-palace": {
   "name": "Qin Lin's Immortal Palace, Gu Mountain",
   "x": 5774,
   "y": -2878,
   "lod": 1,
   "region": "demon-spirit-land",
   "ep": 114
  },
  "sky-demon-city": {
   "name": "Sky Demon City",
   "x": 5650,
   "y": -2807,
   "lod": 1,
   "region": "demon-spirit-land",
   "ep": 116
  },
  "hong-prison": {
   "name": "Hong Prison, Slaughter Blood Pool",
   "x": 5650,
   "y": -2895,
   "lod": 1,
   "region": "demon-spirit-land",
   "ep": 117
  },
  "demon-tower": {
   "name": "Demon Tower, Ancient Battlefield",
   "x": 5526,
   "y": -2878,
   "lod": 1,
   "region": "demon-spirit-land",
   "ep": 123
  },
  "dragon-pool": {
   "name": "Dragon Pool",
   "x": 5526,
   "y": -3022,
   "lod": 1,
   "region": "demon-spirit-land",
   "ep": 124
  },
  "alliance-camp": {
   "name": "Cultivation Alliance stronghold (Huang Yu)",
   "x": 5820,
   "y": -3240,
   "lod": 1,
   "region": "demon-spirit-land",
   "ep": 126
  },
  "fire-demon-country": {
   "name": "Fire Demon Country",
   "x": 5960,
   "y": -2760,
   "lod": 2,
   "region": "demon-spirit-land",
   "ep": 122
  },
  "tianyi-city": {
   "name": "Tianyi City",
   "x": 5960,
   "y": -2842,
   "lod": 1,
   "region": "demon-spirit-land",
   "ep": 122
  },
  "songtao-front": {
   "name": "Songtao City front",
   "x": 6031,
   "y": -2719,
   "lod": 1,
   "region": "demon-spirit-land",
   "ep": 125
  },
  "fire-demon-city": {
   "name": "Fire Demon City and Tower",
   "x": 5889,
   "y": -2719,
   "lod": 1,
   "region": "demon-spirit-land",
   "ep": 127
  },
  "water-demon-country": {
   "name": "Water Demon Country",
   "x": 5380,
   "y": -3220,
   "lod": 2,
   "region": "demon-spirit-land",
   "ep": 128
  },
  "tidal-abyss": {
   "name": "Tidal Abyss",
   "x": 5380,
   "y": -3302,
   "lod": 2,
   "region": "demon-spirit-land",
   "ep": 128
  },
  "allheaven-north": {
   "name": "Northern Domain of Allheaven",
   "x": 10200,
   "y": -6500,
   "lod": 3,
   "region": "allheaven-star-system",
   "ep": 133
  },
  "planet-ran-yun": {
   "name": "Planet Ran Yun",
   "zh": "冉云星",
   "x": 9800,
   "y": -6300,
   "lod": 3,
   "region": "planet-ran-yun",
   "ep": 133
  },
  "ran-yun-city": {
   "name": "Ran Yun City",
   "zh": "冉运城",
   "x": 9800,
   "y": -6366,
   "lod": 1,
   "region": "planet-ran-yun",
   "ep": 133
  },
  "ran-yun-wastes": {
   "name": "Wastes and ice plains of Planet Ran Yun",
   "x": 9866,
   "y": -6300,
   "lod": 1,
   "region": "planet-ran-yun",
   "ep": 135
  },
  "moonfall-village": {
   "name": "Moonfall Village",
   "zh": "落月村",
   "x": 9800,
   "y": -6234,
   "lod": 1,
   "region": "planet-ran-yun",
   "ep": 139
  },
  "qishui-city": {
   "name": "Qishui City, the Wang Residence",
   "zh": "祁水城",
   "x": 9734,
   "y": -6300,
   "lod": 1,
   "region": "planet-ran-yun",
   "ep": 140
  },
  "planet-thousand-illusion": {
   "name": "Planet Thousand Illusion",
   "zh": "千幻星",
   "x": 10350,
   "y": -6750,
   "lod": 3,
   "region": "allheaven-star-system",
   "ep": 137
  },
  "huan-residence": {
   "name": "Huan clan ancestral residence",
   "x": 10350,
   "y": -6860,
   "lod": 1,
   "region": "allheaven-star-system",
   "ep": 138
  },
  "planet-yun-xia": {
   "name": "Planet Yun Xia (the Moonwatcher)",
   "zh": "云霞星",
   "x": 10700,
   "y": -6200,
   "lod": 3,
   "region": "allheaven-star-system",
   "ep": 136
  },
  "allheaven-south": {
   "name": "Southern Domain of Allheaven",
   "zh": "罗天南域",
   "x": 10600,
   "y": -2700,
   "lod": 3,
   "region": "allheaven-star-system",
   "ep": 145
  },
  "lightning-planet": {
   "name": "Hidden lightning planet",
   "x": 10600,
   "y": -2788,
   "lod": 3,
   "region": "allheaven-star-system",
   "ep": 145
  },
  "thunder-pool": {
   "name": "Thunder Pool",
   "zh": "雷池",
   "x": 10450,
   "y": -2650,
   "lod": 2,
   "region": "allheaven-star-system",
   "ep": 145
  },
  "planet-qing-ling": {
   "name": "Planet Qing Ling",
   "zh": "青灵星",
   "x": 10900,
   "y": -2500,
   "lod": 3,
   "region": "allheaven-star-system",
   "ep": 147
  },
  "hengyun-peak": {
   "name": "Hengyun Peak",
   "zh": "横云峰",
   "x": 10900,
   "y": -2560,
   "lod": 1,
   "region": "allheaven-star-system",
   "ep": 147
  },
  "planet-sheng-tan": {
   "name": "Planet Sheng Tan",
   "zh": "圣坛星",
   "x": 11250,
   "y": -2900,
   "lod": 3,
   "region": "allheaven-star-system",
   "ep": 147
  },
  "thunder-celestial-realm": {
   "name": "Thunder Celestial Realm",
   "zh": "雷之仙界",
   "x": 10500,
   "y": -4500,
   "lod": 3,
   "region": "thunder-celestial-realm",
   "ep": 148
  },
  "fragment-continent": {
   "name": "Fragment Continent",
   "zh": "碎片大陆",
   "x": 10500,
   "y": -4940,
   "lod": 2,
   "region": "thunder-celestial-realm",
   "ep": 148
  },
  "immortal-graveyard": {
   "name": "Graveyard of immortals (sword mountain)",
   "zh": "仙人埋骨之地",
   "x": 10811,
   "y": -4811,
   "lod": 1,
   "region": "thunder-celestial-realm",
   "ep": 149
  },
  "relics-valley": {
   "name": "Valley of the Immortal Relics",
   "x": 10940,
   "y": -4500,
   "lod": 1,
   "region": "thunder-celestial-realm",
   "ep": 151
  },
  "immortal-market": {
   "name": "Immortal market ruins",
   "x": 10811,
   "y": -4189,
   "lod": 1,
   "region": "thunder-celestial-realm",
   "ep": 152
  },
  "collection-pavilion": {
   "name": "Collection Pavilion, centre of the realm",
   "x": 10500,
   "y": -4060,
   "lod": 1,
   "region": "thunder-celestial-realm",
   "ep": 153
  },
  "immortal-gate": {
   "name": "Fragment by the western Immortal Gate",
   "x": 10189,
   "y": -4189,
   "lod": 1,
   "region": "thunder-celestial-realm",
   "ep": 155
  },
  "ascension-altar": {
   "name": "Immortal Ascension Altar",
   "x": 10060,
   "y": -4500,
   "lod": 1,
   "region": "thunder-celestial-realm",
   "ep": 156
  },
  "temple-array": {
   "name": "Thunder Celestial Temple teleportation fragment",
   "x": 10189,
   "y": -4811,
   "lod": 1,
   "region": "thunder-celestial-realm",
   "ep": 158
  },
  "allheaven-west": {
   "name": "Western Allheaven",
   "x": 8300,
   "y": -4500,
   "lod": 3,
   "region": "allheaven-star-system",
   "ep": 159
  },
  "fog-land": {
   "name": "Fog land in the belly of a giant beast",
   "x": 8300,
   "y": -4588,
   "lod": 2,
   "region": "fog-land",
   "ep": 159
  },
  "reed-marsh": {
   "name": "Reed Marsh, Chosen Immortal Clan",
   "x": 8300,
   "y": -4676,
   "lod": 1,
   "region": "fog-land",
   "ep": 159
  },
  "xuanyin-tripod": {
   "name": "Xuanyin Tripod",
   "x": 8300,
   "y": -4500,
   "lod": 1,
   "region": "fog-land",
   "ep": 160
  }
 },
 "stages": [
  {
   "id": "zhao",
   "eps": [
    1,
    11
   ],
   "zh": "赵国",
   "title": "A poor boy's country",
   "scale": "one level-3 cultivation country",
   "gist": "Wang Lin's world is the Country of Zhao: his village, the Heng Yue Sect, the Teng family's city and the yin wastes. Nascent Soul ancestors are the top of the sky.",
   "cam": [
    380,
    275,
    130
   ],
   "path": [
    "wang-village",
    "heng-yue",
    "tianshui-road",
    "teng-city",
    "mysterious-forest",
    "yin-ruins",
    "corpse-yin-sect",
    "wang-village",
    "cassia-valley"
   ],
   "factions": [
    [
     "Heng Yue Sect",
     1
    ],
    [
     "Xuan Dao Sect",
     2
    ],
    [
     "Teng Clan",
     5
    ],
    [
     "Corpse Yin Sect",
     9
    ],
    [
     "Cultivation Alliance",
     9
    ]
   ],
   "ceiling": {
    "lvl": 6,
    "who": "a visitor at the Cultivation Alliance gathering of Zhao's Nascent Soul masters",
    "ep": 9,
    "note": "Felt only as pressure. The fighters on screen top out at Nascent Soul (Teng Huayuan, Pu Nanzi)."
   },
   "facts": [
    [
     "The Mysterious Forest lies five hundred miles south of Teng Family City.",
     6
    ],
    [
     "A passage to the foreign battlefield opens every five hundred years; Zhao gets three sect places, fought for with seven tokens in Cassia Valley.",
     9
    ]
   ],
   "events": [
    [
     1,
     "Fails the spiritual root test and climbs the ladder anyway"
    ],
    [
     4,
     "Heng Yue Peak falls to the Xuan Dao Sect"
    ],
    [
     10,
     "Teng Huayuan massacres the Wang clan"
    ],
    [
     11,
     "His body is destroyed; Situ Nan sends his consciousness into the foreign battlefield"
    ]
   ]
  },
  {
   "id": "devils",
   "eps": [
    12,
    38
   ],
   "zh": "修魔海",
   "title": "Out of Zhao: the Fire Country and the Sea of Devils",
   "scale": "three countries and a sea of 998 cities",
   "gist": "Thrown out of Zhao through the foreign battlefield, Wang Lin lives as Ma Liang in Huo Fen, fights through Xuan Wu, and escapes into the Sea of Devils. Inside its Chaotic Broken Stars lies the body of an Ancient God.",
   "cam": [
    390,
    390,
    440
   ],
   "path": [
    "foreign-battlefield",
    "war-shrine-sect",
    "burning-gold-mountains",
    "fire-beast-volcano",
    "xuanwu-front",
    "devil-sea-cave",
    "corpse-valley",
    "nan-dou-city",
    "fighting-evil-sect",
    "war-god-temple",
    "broken-stars",
    "first-trial",
    "bridge-of-no-return",
    "forbidden-mountain",
    "dead-space",
    "dead-sea",
    "qilin-city",
    "qilin-cave"
   ],
   "factions": [
    [
     "War Shrine Sect",
     12
    ],
    [
     "Luohe Sect",
     15
    ],
    [
     "Fighting Evil Sect",
     19
    ]
   ],
   "ceiling": {
    "lvl": null,
    "who": "Tuo Sen, the evil thought split from the eight-star Ancient God Tu Si",
    "ep": 35,
    "note": "Measured cultivators top out at Soul Formation great perfection (Hunchback Meng and the Hurricane Beast King, EP29). Tu Si appears only as a remnant (EP32)."
   },
   "facts": [
    [
     "300 years in the dead space are three years outside.",
     12
    ],
    [
     "Nan Dou City is one of the Sea of Devils' 998 cities.",
     20
    ],
    [
     "A single hair passage of the Ancient God could dwarf a planet; a few hundred feet of its void take fifteen days to cross.",
     27
    ],
    [
     "He comes out of the Land of the Ancient God after 200 years.",
     37
    ]
   ],
   "events": [
    [
     12,
     "Takes Ma Liang's body"
    ],
    [
     18,
     "Crosses into the Sea of Devils"
    ],
    [
     21,
     "Forms his core"
    ],
    [
     36,
     "Seizes Tu Si's memory inheritance"
    ]
   ]
  },
  {
   "id": "return",
   "eps": [
    39,
    52
   ],
   "zh": "楚国",
   "title": "Home the long way: Chu, then revenge in Zhao",
   "scale": "the level-3 countries around the Sea of Devils",
   "gist": "His clone joins the Cloud Sky Sect in the Country of Chu, finds Li Muwan and forms a Nascent Soul. Then he crosses the Sea of Devils by an old teleportation map and returns to Zhao after 400 years to tear down the Teng family.",
   "cam": [
    310,
    350,
    420
   ],
   "path": [
    "cloud-sky-sect",
    "lianmo-city",
    "heng-yue",
    "zhao-capital",
    "tian-dao-sect",
    "wufeng-valley",
    "tianyin-city",
    "black-mire",
    "teng-city",
    "wang-village"
   ],
   "factions": [
    [
     "Cloud Sky Sect",
     39
    ],
    [
     "Teng Clan",
     47
    ]
   ],
   "ceiling": {
    "lvl": 5,
    "who": "Lin Yi, envoy of the Tongtian Tower",
    "ep": 52,
    "note": "First shown in EP48. Teng Huayuan and Teng Yi are late Nascent Soul great perfection (EP48, EP50)."
   },
   "facts": [
    [
     "Chu is a rank-3 cultivation country; the Cloud Sky Sect tests new disciples once every thirty years.",
     39
    ],
    [
     "Wang Lin returns to Zhao after 400 years.",
     46
    ],
    [
     "Nine spiritual veins under Zhao feed the nine Nascent Soul core members of the Teng family.",
     47
    ],
    [
     "One Soul Formation cultivator born in Zhao would lift it from level 3 to level 4.",
     52
    ]
   ],
   "events": [
    [
     40,
     "Finds Li Muwan in the South Garden"
    ],
    [
     44,
     "Reaches Nascent Soul and breaks the Cloud Sky ancestors"
    ],
    [
     51,
     "Teng City falls"
    ],
    [
     52,
     "Declares his revenge complete at his parents' grave"
    ]
   ]
  },
  {
   "id": "nan",
   "eps": [
    53,
    63
   ],
   "zh": "南国",
   "title": "Higher countries: a mortal life in Nan",
   "scale": "level-4 countries a hundred thousand miles across",
   "gist": "Chased out of Zhao by a visitor from another planet, Wang Lin spends thirty years as a woodcarver in Nan's capital. He watches the Snow Region freeze the Four Faction Alliance and finds his Life and Death intent.",
   "cam": [
    470,
    300,
    560
   ],
   "path": [
    "nan-capital",
    "baiyun-sect",
    "nan-capital",
    "alliance-battlefield",
    "snow-city-72",
    "wang-village",
    "ancient-god-land",
    "wuwen",
    "foreign-battlefield"
   ],
   "factions": [
    [
     "Four Faction Alliance",
     53
    ],
    [
     "Bai Yun Sect",
     53
    ],
    [
     "Snow Region",
     58
    ],
    [
     "Suzaku Country",
     59
    ]
   ],
   "ceiling": {
    "lvl": 6,
    "who": "Ou Zhi, guardian of the Vermilion Bird Country",
    "ep": 60,
    "note": "Na Duo of Planet Five Elements is also early Soul Transformation (EP53). The nameless old man is 'beyond Soul Formation' and never measured."
   },
   "facts": [
    [
     "Na Duo comes from Planet Five Elements, the first other planet named.",
     53
    ],
    [
     "The old man teleports Wang Lin a hundred thousand miles to the Baiyun Sect.",
     55
    ],
    [
     "The Snow Region, a level-4 country in the far north, brings 36 Soul Formation cultivators.",
     59
    ],
    [
     "Wuwen is a level-3 country with a passage to the Outer Region Battlefield.",
     63
    ]
   ],
   "events": [
    [
     53,
     "Na Duo crushes his Nascent Soul; his mortal life begins"
    ],
    [
     58,
     "Grasps that death and life are both himself"
    ],
    [
     60,
     "The Four Faction Alliance falls"
    ],
    [
     62,
     "Reaches Soul Formation in Zhao; his original body sinks into the planet's core"
    ]
   ]
  },
  {
   "id": "rain",
   "eps": [
    64,
    72
   ],
   "zh": "雨之仙界",
   "title": "A shattered immortal realm",
   "scale": "floating fragments of an immortal realm beyond the planet",
   "gist": "The Rain Cauldron carries Wang Lin off Planet Suzaku for the first time, into the floating ruins of the Rain Celestial Realm. Powers from other planets come for its swords.",
   "cam": [
    700,
    -300,
    2600
   ],
   "path": [
    "rain-palace",
    "beast-palace",
    "tiger-mountain",
    "overlapping-fragment"
   ],
   "factions": [
    [
     "Da Lou Sword Sect",
     64
    ],
    [
     "Giant Demon Clan",
     64
    ],
    [
     "Corpse Yin Sect",
     64
    ]
   ],
   "ceiling": {
    "lvl": 11,
    "who": "Ling Tianhou, Sword Saint of the Da Lou Sword Sect",
    "ep": 71,
    "note": "Tian Mozi of Planet Tianmo is mid Nirvana Cleanser; the awakened Celestial breaks Ling Tianhou's swords with one finger. Zhou Yi reaches Ascendant as he dies (EP70)."
   },
   "facts": [
    [
     "The Da Lou Sword Sect's route reaches 37 fragments; it has drawn immortal energy for 3,000 years.",
     64
    ],
    [
     "A vision shows a giant palm smashing the whole Immortal Realm in one blow.",
     64
    ],
    [
     "The overlapping fragment is six stacked layers; a fight between two Soul Transformation experts would collapse them all.",
     69
    ]
   ],
   "events": [
    [
     64,
     "Enters through the Rain Cauldron"
    ],
    [
     67,
     "Tames the God Slaying War Chariot's beast soul"
    ],
    [
     70,
     "Zhou Yi reaches Ascendant and names himself the sword spirit"
    ],
    [
     72,
     "Returns to Planet Suzaku with two Rain Celestial Swords"
    ]
   ]
  },
  {
   "id": "suzaku",
   "eps": [
    73,
    102
   ],
   "zh": "朱雀星",
   "title": "The whole of Planet Suzaku",
   "scale": "a planet, its rank-6 country and its continents",
   "gist": "Back home, Wang Lin crosses the whole planet: the Suzaku Plain where the only rank-6 country rules, Pilu's Soul Refining Sect, the Snow Domain, the Forsaken Immortals underground, and the Suzaku Tomb holding every life soul on the planet.",
   "cam": [
    360,
    260,
    1000
   ],
   "path": [
    "cloud-sky-sect",
    "chu-valley",
    "weapon-pavilion",
    "xinghua-village",
    "forsaken-land",
    "chu-valley",
    "barren-mountain",
    "far-north-trap",
    "fire-cloud-fortress",
    "soul-refining-sect",
    "snow-god-temple",
    "giant-demon-clan",
    "yue-stone-house",
    "zhao-capital",
    "soul-refining-sect",
    "north-extreme-fire",
    "corpse-yin-sect",
    "suzaku-tomb",
    "golden-soul-valley",
    "spirit-mountain"
   ],
   "factions": [
    [
     "Forsaken Immortal Clan",
     77
    ],
    [
     "Suzaku Country",
     81
    ],
    [
     "Immortal's Path Sect",
     81
    ],
    [
     "Snow Region",
     82
    ],
    [
     "Giant Demon Clan",
     83
    ],
    [
     "Soul Refining Sect",
     84
    ]
   ],
   "ceiling": {
    "lvl": null,
    "who": "Tuo Sen, descending in his monkey avatar",
    "ep": 102,
    "note": "The strongest cultivators measured are Zhu Quezi, Ascendant great perfection and the only one on the planet (EP81), and Ancestor Xu, raised to twelve leaves (EP101). Mo Zhi, a Cultivation Alliance envoy, seals Tuo Sen."
   },
   "facts": [
    [
     "The Suzaku Plain holds four cultivation countries; Suzaku Country is the only rank 6.",
     81
    ],
    [
     "The Forsaken Immortal Clan say the Cultivation Alliance gave their planet to Suzaku Country, and the war killed ninety percent of them.",
     78
    ],
    [
     "Suzaku Country has crushed every level-5 country that came close to level 6.",
     88
    ],
    [
     "Wang Lin seals the Snow Domain down from level 5 to level 3.",
     89
    ]
   ],
   "events": [
    [
     76,
     "Fights Heaven's Law for Li Muwan's Nascent Soul"
    ],
    [
     82,
     "Beats Hongdie at Barren Mountain"
    ],
    [
     95,
     "Reaches Soul Transformation"
    ],
    [
     102,
     "Wins back the life souls in the Suzaku Tomb"
    ]
   ]
  },
  {
   "id": "kunxu",
   "eps": [
    103,
    109
   ],
   "zh": "天运星",
   "title": "Out to the stars: Kunxu",
   "scale": "the planets of the Kunxu star region",
   "gist": "Past the Astral Wind, Wang Lin reaches a trading planet, then Planet Tian Yun, ten times the size of Suzaku. The All-Seer's Heavenly Fate Sect takes him in and sends him to Earthstar.",
   "cam": [
    2700,
    -1400,
    7000
   ],
   "path": [
    "mingmei-city",
    "heavenly-fate-sect",
    "stone-forest",
    "black-white-peaks",
    "northern-demon-earth",
    "east-sea-gate"
   ],
   "factions": [
    [
     "Cultivation Alliance",
     103
    ],
    [
     "Heavenly Fate Sect",
     104
    ],
    [
     "Da Lou Sword Sect",
     106
    ]
   ],
   "ceiling": {
    "lvl": null,
    "who": "All-Seer (Tian Yunzi)",
    "ep": 107,
    "note": "He has tried for 30,000 years to reach the third step (EP107). Ling Tianhou (late Nirvana Cleanser) bursts in at EP106; Chi Lie is Nirvana Scryer (EP105)."
   },
   "facts": [
    [
     "After Ascendant come Illusory Yin, Corporeal Yang, Nirvana Scryer, Nirvana Cleanser and Nirvana Shatterer.",
     103
    ],
    [
     "Planet Tian Yun is ten times the size of Planet Suzaku.",
     94
    ],
    [
     "Lingyue on Earthstar is a level-5 country.",
     108
    ],
    [
     "The tide into the Demon Spirit Land comes every five thousand years, and no one above Ascendant may enter.",
     109
    ]
   ],
   "events": [
    [
     103,
     "Passes the Suzaku title to Zhou Wutai and leaves the planet"
    ],
    [
     104,
     "Enters the Heavenly Fate Sect's Purple Branch"
    ],
    [
     108,
     "Becomes the All-Seer's seventh disciple"
    ],
    [
     109,
     "The Demon Spirit Gate opens"
    ]
   ]
  },
  {
   "id": "demon",
   "eps": [
    110,
    132
   ],
   "zh": "妖灵之地",
   "title": "The Demon Spirit Land",
   "scale": "a hidden world of nine demon countries",
   "gist": "Behind the East Sea gate lies an immortal's abode turned into nine demon countries. Wang Lin builds a tribe, commands a demon army, reaches Ascendant and pulls Zhou Yi's sword spirit out of the Tidal Abyss.",
   "cam": [
    5300,
    -2600,
    2200
   ],
   "path": [
    "soul-refining-tribe",
    "ancient-demon-city",
    "qin-lin-palace",
    "ancient-demon-city",
    "sky-demon-city",
    "hong-prison",
    "qin-lin-palace",
    "tianyi-city",
    "demon-tower",
    "dragon-pool",
    "songtao-front",
    "alliance-camp",
    "fire-demon-city",
    "tidal-abyss",
    "sky-demon-city"
   ],
   "factions": [
    [
     "Soul Refining Tribe",
     110
    ],
    [
     "Sky Demon Country",
     116
    ],
    [
     "Cultivation Alliance",
     125
    ]
   ],
   "ceiling": {
    "lvl": 7,
    "who": "the Scattered Devil in its flesh body, then the Ancient Demon Bei Lou",
    "ep": 123,
    "note": "Measured: the Heaven Commander-in-Chief at peak Ascendant (EP120), the Blood Ancestor at Nirvana Cleanser (EP121), Ling Tianhou's sealing sense at least late Nirvana Cleanser (EP128)."
   },
   "facts": [
    [
     "The land has nine regions, each under a demon emperor sealing a Primordial Mystic Spirit.",
     110
    ],
    [
     "Three armours of demon power match Foundation Establishment; thirty thousand match Soul Transformation.",
     112
    ],
    [
     "Sky Demon Country holds a Demon General Tournament every 300 years.",
     116
    ],
    [
     "The Demon Spirit Land is Qin Lin's abode: four illusory abodes and one real one.",
     125
    ]
   ],
   "events": [
    [
     112,
     "Made a Commander of ten thousand demon soldiers"
    ],
    [
     121,
     "His clone reaches Ascendant"
    ],
    [
     123,
     "Destroys the Demon Tower"
    ],
    [
     129,
     "Frees Zhou Yi's sword spirit"
    ]
   ]
  },
  {
   "id": "allheaven",
   "eps": [
    133,
    147
   ],
   "zh": "罗天星域",
   "title": "A second star system: Allheaven",
   "scale": "a star system of four domains",
   "gist": "Across the star boundary, Allheaven is run by clans, not sects. Wang Lin climbs through the Northern Domain as 'Xu Mu', raises a son as a mortal, flees a planet-sized beast and rebuilds himself in the poor Southern Domain.",
   "cam": [
    10400,
    -4600,
    6500
   ],
   "path": [
    "ran-yun-city",
    "ran-yun-wastes",
    "planet-yun-xia",
    "huan-residence",
    "moonfall-village",
    "qishui-city",
    "ran-yun-wastes",
    "allheaven-north",
    "planet-yun-xia",
    "lightning-planet",
    "thunder-pool",
    "hengyun-peak",
    "planet-sheng-tan"
   ],
   "factions": [
    [
     "Thunder Celestial Temple",
     133
    ],
    [
     "Sun Family",
     133
    ],
    [
     "Huan Clan",
     134
    ]
   ],
   "ceiling": {
    "lvl": null,
    "who": "the Moonwatcher, a beast the size of a planet",
    "ep": 144,
    "note": "Measured: Huan Wuqing, Corporeal Yang fallen from Nirvana Scryer (EP136), and Zhan Konglie, Corporeal Yang (EP146)."
   },
   "facts": [
    [
     "Allheaven has four domains; Planet Dong Lin is the 'killing star' of the East.",
     133
    ],
    [
     "The Northern Domain has seventeen clans with Celestial Ascension Fruit.",
     139
    ],
    [
     "The Moonwatcher chases him for a month and stops at the edge of the Southern Domain.",
     144
    ],
    [
     "On Qing Ling, a mortal planet of the poor Southern Domain, the strongest are Nascent Soul.",
     147
    ]
   ],
   "events": [
    [
     133,
     "Arrives and takes the name Xu Mu"
    ],
    [
     138,
     "The Huan clan falls; Li'er becomes his son Wang Ping"
    ],
    [
     142,
     "Wang Ping fades"
    ],
    [
     144,
     "Flees the Moonwatcher in soul form"
    ]
   ]
  },
  {
   "id": "thunder",
   "eps": [
    148,
    160
   ],
   "zh": "雷之仙界",
   "title": "The Thunder Celestial Realm, then the fog of the west",
   "scale": "a fallen immortal realm above Allheaven",
   "gist": "Through a closed gate Wang Lin enters the ruins where the Immortal Emperor Bai Fan once ruled. He wakes Qing Shui, sees the realm refined into a treasure and lands in a fog-sealed corner of Western Allheaven.",
   "cam": [
    9900,
    -4300,
    5200
   ],
   "path": [
    "fragment-continent",
    "immortal-graveyard",
    "relics-valley",
    "immortal-market",
    "collection-pavilion",
    "immortal-gate",
    "ascension-altar",
    "temple-array",
    "reed-marsh",
    "xuanyin-tripod"
   ],
   "factions": [
    [
     "Thunder Celestial Temple",
     148
    ],
    [
     "Tang Family",
     148
    ],
    [
     "Yao Family",
     152
    ],
    [
     "Chosen Immortal Clan",
     159
    ]
   ],
   "ceiling": {
    "lvl": 12,
    "who": "Qing Shui, disciple of Immortal Emperor Bai Fan",
    "ep": 156,
    "note": "Carded in EP154. Yan Leizi is Nirvana Shatterer (EP148). Bai Fan, early Nirvana Void, appears only inside a painting (EP154)."
   },
   "facts": [
    [
     "Only cultivators at Ascendant and below may enter; divine powers above early Nirvana Scryer are banned inside.",
     146
    ],
    [
     "The Li family has lived under an immortal's slave mark for 30,000 years.",
     150
    ],
    [
     "The Collection Pavilion has nine levels; a Corporeal Yang is expected to reach the fourth.",
     154
    ],
    [
     "The Chosen Immortal Clan has guarded the Xuanyin Tripod for 30,000 years, inside the belly of a giant beast.",
     160
    ]
   ],
   "events": [
    [
     148,
     "Forces his way through the closed gate"
    ],
    [
     154,
     "Takes Call Wind and the whole Collection Pavilion"
    ],
    [
     156,
     "Qing Shui wakes; Yan Leizi refines the realm into a treasure"
    ],
    [
     158,
     "Ferries the survivors out as the realm breaks apart"
    ]
   ]
  }
 ]
};
})();
