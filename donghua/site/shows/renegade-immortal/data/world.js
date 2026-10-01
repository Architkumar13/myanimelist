// Hand-curated guide data, assembled from the research notes (../../../renegade-immortal/*.md) and the episode reviews.
// `ep` = the donghua episode where a thing is first shown or reached; NOVEL means not in the donghua yet.
(function () {
const NOVEL = 9999;

window.WORLD = Object.assign({ NOVEL }, {
 "maxEp": 160,
 "realms": [
  {
   "id": "qi",
   "name": "Qi Condensation",
   "zh": "凝气",
   "where": "The body gathers spiritual energy",
   "lifespan": "—",
   "wiki": "Qi Condensation",
   "heroEp": 2,
   "gist": "The first realm of the First Step. Fifteen numbered levels of drawing spiritual energy into the body. Situ Nan names all seven First Step realms in EP2.",
   "stages": [
    {
     "name": "Levels 1–9",
     "zh": "一至九层",
     "ep": 2,
     "text": "Wang Lin reaches level 1 in the bead's dream space (EP2), where time runs ten times faster."
    },
    {
     "name": "Levels 10–14",
     "zh": "十至十四层",
     "ep": 3,
     "text": "He jumps to level 14 in EP3 and hides it; the outer sect thinks he is level 3."
    },
    {
     "name": "Level 15, great perfection",
     "zh": "大圆满",
     "ep": 5,
     "text": "Qi Condensation complete (EP5). Bai Zhan is the same."
    }
   ],
   "subs": "Qi Condensation"
  },
  {
   "id": "foundation",
   "name": "Foundation Establishment",
   "subs": "Foundation",
   "zh": "筑基",
   "where": "Energy laid down as a foundation",
   "lifespan": "—",
   "heroEp": 10,
   "gist": "The energy is set into a foundation, and its quality caps everything after. A foundation can even be seized from someone else (EP7).",
   "stages": [
    {
     "name": "Early",
     "zh": "初期",
     "ep": 6,
     "text": "Teng Li is late Foundation Establishment in EP6. Wang Lin breaks through in EP10 with an Extreme Realm (极境) foundation: the strongest at its level, but a dead end for his own body."
    },
    {
     "name": "Mid",
     "zh": "中期",
     "ep": 14,
     "text": "Wang Lin reaches mid stage in EP14."
    },
    {
     "name": "Late and False Core",
     "zh": "后期 · 假丹",
     "ep": 18,
     "text": "A False Core sits just below Core Formation. Wang Lin gets there in EP18 by absorbing part of a seized golden core."
    }
   ]
  },
  {
   "id": "core",
   "name": "Core Formation",
   "subs": "Core Formation, Jie Dan",
   "zh": "结丹",
   "where": "A golden core in the dantian",
   "lifespan": "—",
   "wiki": "Core Formation",
   "heroEp": 21,
   "gist": "Energy condensed into a golden core. Cores can be taken from the dead and used as fuel.",
   "stages": [
    {
     "name": "Early",
     "zh": "初期",
     "ep": 18,
     "text": "Li Muwan's attackers are already here in EP18. Wang Lin forms his core in EP21."
    },
    {
     "name": "Late",
     "zh": "后期",
     "ep": 37,
     "text": "Wang Lin is late Core Formation in EP37."
    },
    {
     "name": "Great perfection",
     "zh": "大圆满",
     "ep": 38,
     "text": "EP38. His own body stops here: the Extreme Realm won't let it form a Nascent Soul."
    }
   ]
  },
  {
   "id": "nascent",
   "name": "Nascent Soul",
   "subs": "Nascent Soul, Yuanying",
   "zh": "元婴",
   "where": "A small soul body that can leave the flesh",
   "lifespan": "—",
   "wiki": "Nascent Soul",
   "heroEp": 44,
   "gist": "The core breaks into a Nascent Soul, which can flee when the body dies. In Zhao, a level 3 country, this is the top: its ancestors are Nascent Souls.",
   "stages": [
    {
     "name": "Early",
     "zh": "初期",
     "ep": 4,
     "text": "Pu Nanzi is the first Nascent Soul on screen (EP4). Wang Lin gets his in EP44 through a clone, after his own failed."
    },
    {
     "name": "Mid",
     "zh": "中期",
     "ep": 53,
     "text": "Wang Lin, EP53."
    },
    {
     "name": "Late and peak",
     "zh": "后期",
     "ep": 44,
     "text": "The Cloud Sky Sect's ancestors are at the peak of late Nascent Soul (EP44). Wang Lin is late in EP57."
    }
   ]
  },
  {
   "id": "soulform",
   "name": "Soul Formation",
   "subs": "Soul Transformation, Deity Transformation",
   "zh": "化神",
   "where": "A domain of one's own",
   "lifespan": "—",
   "wiki": "Soul Formation",
   "heroEp": 62,
   "gist": "The cultivator grows an Intent Realm, a domain that presses down everyone weaker inside it (EP55). From here on, insight counts as much as the realm label.",
   "stages": [
    {
     "name": "Early",
     "zh": "初期",
     "ep": 25,
     "text": "Duanmu Ji is the first Soul Formation cultivator Wang Lin faces (EP25). Wang Lin reaches it in EP62, the episode he comes home to Zhao."
    },
    {
     "name": "Mid",
     "zh": "中期",
     "ep": 79,
     "text": "Wang Lin, EP79."
    },
    {
     "name": "Late",
     "zh": "后期",
     "ep": 88,
     "text": "Wang Lin, EP88: late in spiritual power, mid in insight."
    }
   ]
  },
  {
   "id": "soultrans",
   "name": "Soul Transformation",
   "subs": "Infant Transformation",
   "zh": "婴变",
   "where": "The Nascent Soul changes again",
   "lifespan": "—",
   "wiki": "Soul Transformation",
   "heroEp": 95,
   "gist": "The Nascent Soul and body are remade toward celestial energy. On Planet Suzaku only the strongest old monsters are here.",
   "stages": [
    {
     "name": "Early",
     "zh": "初期",
     "ep": 53,
     "text": "Na Duo is the first on screen (EP53). Wang Lin reaches it in EP95."
    },
    {
     "name": "Mid",
     "zh": "中期",
     "ep": 103,
     "text": "Wang Lin, EP103."
    },
    {
     "name": "Great perfection",
     "zh": "大圆满",
     "ep": 115,
     "text": "Wang Lin, EP115, and at the peak in EP119."
    }
   ]
  },
  {
   "id": "ascendant",
   "name": "Ascendant",
   "zh": "问鼎",
   "where": "The top of the First Step",
   "lifespan": "—",
   "wiki": "Ascendant",
   "heroEp": 121,
   "gist": "The summit of the First Step. An Ascendant can face whole sects alone; the next realms are where the Dao itself starts.",
   "stages": [
    {
     "name": "Early",
     "zh": "初期",
     "ep": 70,
     "text": "Zhou Yi is the first Ascendant on screen (EP70). Wang Lin reaches it in EP121 by reverse cultivation."
    },
    {
     "name": "Mid",
     "zh": "中期",
     "ep": 142,
     "text": "Wang Lin, EP142."
    },
    {
     "name": "Late",
     "zh": "后期",
     "ep": 143,
     "text": "Wang Lin, EP143."
    },
    {
     "name": "Great perfection",
     "zh": "大圆满",
     "ep": 147,
     "text": "Wang Lin, EP147. Li Yuan has been stuck here for years (EP152)."
    }
   ],
   "subs": "Ascendant"
  },
  {
   "id": "yinyang",
   "name": "Illusory Yin and Corporeal Yang",
   "subs": "Yin Void and Yang Solid",
   "zh": "阴虚 · 阳实",
   "where": "The bridge out of the First Step",
   "lifespan": "—",
   "wiki": "Corporeal Yang",
   "heroEp": 152,
   "gist": "Two realms that lead from the First Step to the Second, named together in EP103. Wang Lin skips Illusory Yin on screen: the breakthrough to Corporeal Yang happens in a one-year gap before EP152.",
   "stages": [
    {
     "name": "Illusory Yin",
     "subs": "Yin Void",
     "zh": "阴虚",
     "ep": 118,
     "text": "Gu Yunchi is the first on screen (EP118). Yan Chou, Tang Yanyun and Tang Ping are here in EP152."
    },
    {
     "name": "Corporeal Yang",
     "subs": "Yang Solid",
     "zh": "阳实",
     "ep": 146,
     "text": "Shengong Hu has fallen from it (EP146). Wang Lin, EP152."
    }
   ]
  }
 ],
 "beyond": [
  {
   "name": "Nirvana Scryer",
   "zh": "窥涅",
   "subs": "Insight Nirvana",
   "wiki": "Nirvana Scryer",
   "text": "The first of the three Nirvana stages that end the Second Step. Chi Lie of the Heavenly Fate Sect is here (EP105); Huan Wuqing fell from it."
  },
  {
   "name": "Nirvana Cleanser",
   "zh": "净涅",
   "subs": "Purification Nirvana",
   "wiki": "Nirvana Cleanser",
   "text": "Ling Tianhou (late) and the Blood Ancestor. One sword qi of a Nirvana Cleanser can save a life, and Wang Lin spends several."
  },
  {
   "name": "Nirvana Shatterer",
   "zh": "碎涅",
   "subs": "Shattered Nirvana",
   "wiki": "Nirvana Shatterer",
   "text": "The top of the Second Step: Yan Leizi, the Celestial Cloud couple Wang Wei and Hu Juan, Qing Shui before his rebirth."
  },
  {
   "name": "Nirvana Void",
   "zh": "空涅",
   "wiki": "Nirvana Void",
   "text": "The first stage of the Third Step, where a cultivator holds a Dao of his own. Bai Fan, Immortal Emperor of the Thunder Celestial Realm, was early Nirvana Void (EP154). All-Seer has failed to reach the Third Step for thirty thousand years (EP107)."
  },
  {
   "name": "Spirit Void, Arcane Void, Void Tribulant",
   "zh": "空灵 · 空玄 · 空劫",
   "wiki": "Void Tribulant",
   "text": "The rest of the Third Step in the novel. Not in the donghua yet."
  },
  {
   "name": "Heaven Trampling",
   "zh": "踏天",
   "wiki": "Heaven Trampling",
   "text": "The Fourth Step, the novel's last. Not in the donghua yet."
  },
  {
   "name": "Celestial ranks",
   "zh": "仙 · 仙王 · 仙尊 · 仙帝",
   "wiki": "Celestial Emperor",
   "text": "The old Celestial Realms ranked Immortal, Immortal King and Immortal Lord, each in numbered grades, under an Immortal Emperor (EP157). Gu Ziyuan and Xiaoyao Zi were Immortal Kings; Qing Shui an Immortal Lord; Qin Lin and Bai Fan Immortal Emperors."
  }
 ],
 "godStars": [
  "Two stars: Wang Lin's original body after the Extreme Realm breaks (EP62)",
  "Three stars: his original body by EP88",
  "Eight stars: Tu Si, whose body is the Land of the Ancient God (EP32)",
  "Nine stars: the top of the scale; a sword in EP102 carries nine-star blood"
 ],
 "tiers": [
  {
   "n": 7,
   "name": "Ancients and Celestials",
   "zh": "古族 · 仙界",
   "top": "Ancient Gods counted by stars (Tu Si, eight stars); Celestial Emperors at the Third Step (Bai Fan, early Nirvana Void)",
   "examples": [
    "Ancient Gods",
    "Ancient Demons",
    "Celestials"
   ],
   "ep": 26
  },
  {
   "n": 6,
   "name": "Star-system overlords",
   "zh": "",
   "top": "Envoys at Illusory Yin to Corporeal Yang; masters at the Nirvana stages and above",
   "examples": [
    "Cultivation Alliance",
    "Thunder Celestial Temple"
   ],
   "ep": 9
  },
  {
   "n": 5,
   "name": "Second Step sects and old clans",
   "zh": "",
   "top": "Illusory Yin to Nirvana: All-Seer, Ling Tianhou (late Nirvana Cleanser), the Blood Ancestor (Nirvana Cleanser), Huan Wuqing",
   "examples": [
    "Heavenly Fate Sect",
    "Da Lou Sword Sect",
    "Yao Family",
    "Huan Clan",
    "Sky Demon Country",
    "Tang Family"
   ],
   "ep": 71
  },
  {
   "n": 4,
   "name": "Level 6 country: owner of a planet",
   "zh": "六级修真国",
   "top": "Ascendant: Zhu Quezi at Ascendant great perfection, early Ascendant sect masters, Forsaken Immortal ancestors of nine to eleven leaves",
   "examples": [
    "Suzaku Country",
    "Immortal's Path Sect",
    "Forsaken Immortal Clan",
    "Sun Family"
   ],
   "ep": 59
  },
  {
   "n": 3,
   "name": "Level 5 countries",
   "zh": "五级修真国",
   "top": "Soul Transformation: Dun Tian (peak), the Giant Demon ancestor, Li Yuanfeng, Sun Tai",
   "examples": [
    "Soul Refining Sect",
    "Giant Demon Clan",
    "Corpse Yin Sect",
    "Snow Region"
   ],
   "ep": 64
  },
  {
   "n": 2,
   "name": "Level 4 countries",
   "zh": "四级修真国",
   "top": "Soul Formation: late Soul Formation masters like Zhou Yun; Hongdie at Soul Formation great perfection",
   "examples": [
    "Four Faction Alliance",
    "Bai Yun Sect"
   ],
   "ep": 53
  },
  {
   "n": 1,
   "name": "Level 1–3 countries",
   "zh": "三级修真国",
   "top": "Nascent Soul at the top: Pu Nanzi, Teng Huayuan (late Nascent Soul great perfection), Cloud Sky's five ancestors",
   "examples": [
    "Heng Yue Sect",
    "Xuan Dao Sect",
    "Teng Clan",
    "War Shrine Sect",
    "Luohe Sect",
    "Fighting Evil Sect",
    "Cloud Sky Sect",
    "Soul Refining Tribe"
   ],
   "ep": 1
  }
 ],
 "regions": [
  {
   "id": "zhao",
   "name": "Country of Zhao",
   "subs": "Zhao country, Zhao Kingdom",
   "zh": "赵国",
   "ep": 1,
   "wiki": "Country of Zhao",
   "blurb": "Wang Lin's home. A level 3 cultivation country where Nascent Soul is the top: Heng Yue Sect, Xuan Dao Sect, the Teng clan, the Corpse Yin Sect. He comes back for revenge after 400 years (EP46–52) and again as its Ancestor (EP93)."
  },
  {
   "id": "huo-fen",
   "name": "Huo Fen",
   "subs": "Fire Country, Burning Kingdom",
   "zh": "火焚国",
   "ep": 14,
   "wiki": "Hou Fen",
   "blurb": "A volcanic level 3 country with four great sects. He lives there as Ma Liang. When the bead eats the fire beast king (EP16), the beasts overrun it and the sects flee into Xuan Wu (EP17)."
  },
  {
   "id": "chu",
   "name": "Country of Chu",
   "subs": "Chu, Chu Kingdom",
   "zh": "楚国",
   "ep": 39,
   "wiki": "Chu Country",
   "blurb": "A level 3 country, vassal of the Giant Demon Clan. His clone joins the Cloud Sky Sect here and finds Li Muwan (EP39–44). Later his real body sleeps here, and Zhou Ru grows up here."
  },
  {
   "id": "four-faction-alliance",
   "name": "Four Faction Alliance",
   "subs": "Four Sects Alliance",
   "zh": "四派联盟",
   "ep": 53,
   "blurb": "A level 4 country of four sects. Wang Lin lives over thirty years as a mortal woodcarver in the capital of Nan (EP53–58). The Snow Region conquers it in EP60."
  },
  {
   "id": "snow-domain",
   "name": "Snow Region",
   "subs": "Snow Domain, Snow Land",
   "zh": "雪域",
   "ep": 89,
   "wiki": "Xue Yue",
   "blurb": "An ice country in the far north. It takes the Four Faction Alliance's land to become level 5 (EP60), where he rules a city as Sun Shuoyi (EP61). Its sect master Li Yuanfeng traps him in the far north (EP82–83). In EP89 he storms the Snow God Temple and knocks the country down to level 3."
  },
  {
   "id": "suzaku-continent",
   "name": "Suzaku Plain",
   "subs": "Vermilion Plain",
   "zh": "",
   "ep": 81,
   "wiki": "Suzaku Continent",
   "blurb": "The planet's largest landmass. Suzaku Country, the only level 6 country, sits in the middle; Pilu, home of the Soul Refining Sect, is on its edge (EP83–96)."
  },
  {
   "id": "sea-of-devils",
   "name": "Sea of Devils",
   "subs": "Demon Cultivation Sea, Sea of Demons",
   "zh": "修魔海",
   "ep": 18,
   "wiki": "Sea of Devils",
   "blurb": "A cold sea of fog, thousands of times the size of Hou Fen, with 998 cities of demonic cultivators. He forms his core here (EP21), leads the Fighting Evil Sect (EP24), and enters the Land of the Ancient God through its Chaotic Broken Stars (EP26)."
  },
  {
   "id": "fog-land",
   "name": "Fog land of Western Allheaven",
   "subs": "",
   "zh": "",
   "ep": 159,
   "blurb": "A land sealed in living fog inside the belly of a giant beast. The Chosen Immortal Clan lives in Reed Marsh and guards the Xuanyin Tripod (EP159–160)."
  },
  {
   "id": "planet-tian-yun",
   "name": "Planet Tian Yun",
   "subs": "Tianyun Star",
   "zh": "天运星",
   "ep": 104,
   "wiki": "Tian Yun",
   "blurb": "A planet ten times the size of Suzaku, home of All-Seer's Heavenly Fate Sect (EP104–108). Its East Sea holds the gate to the Demon Spirit Land. He also works on Earthstar for the sect (EP108–109)."
  },
  {
   "id": "planet-ran-yun",
   "name": "Planet Ran Yun",
   "subs": "Ran Cloud Star",
   "zh": "冉云星",
   "ep": 133,
   "wiki": "Planet Ran Yun",
   "blurb": "A small planet of Allheaven's Northern Domain under Planet Thousand Illusion, ruled by the Ran, Sun and Zhao clans. He raises Wang Ping here (EP139–142)."
  },
  {
   "id": "demon-spirit-land",
   "name": "Demon Spirit Land",
   "subs": "Land of Demonic Spirits, Realm of Demonic Spirits",
   "zh": "妖灵之地",
   "ep": 110,
   "wiki": "Demon Spirit Land",
   "blurb": "Qin Lin's old abode off Tian Yun's East Sea, now nine demon countries around Ancient Demon fragments. Only Ascendant and below may enter. He builds a tribe, wins a demon army and reaches Ascendant here (EP110–132)."
  },
  {
   "id": "rain-celestial-realm",
   "name": "Rain Celestial Realm",
   "subs": "Rain Immortal Realm, fairyland",
   "zh": "雨之仙界",
   "ep": 64,
   "wiki": "Rain Celestial Realm",
   "blurb": "Floating ruins of an immortal realm smashed by one giant palm, reached with a Rain Cauldron. He hunts immortal energy and wins two Rain Celestial Swords (EP64–72)."
  },
  {
   "id": "thunder-celestial-realm",
   "name": "Thunder Celestial Realm",
   "subs": "Thunder Immortal Realm",
   "zh": "雷之仙界",
   "ep": 148,
   "wiki": "Celestial Realm Thunder",
   "blurb": "The broken immortal realm above Allheaven, entered with a Thunder Cauldron, Ascendant and below only. Bai Fan once ruled it. He reaches Corporeal Yang and takes the Collection Pavilion here before Yan Leizi refines the whole realm into a treasure (EP148–158)."
  },
  {
   "id": "alliance-star-system",
   "name": "Alliance Star System",
   "subs": "Alliance Star Domain",
   "zh": "联盟星域",
   "ep": 1,
   "wiki": "Alliance Star System",
   "blurb": "The star system the Cultivation Alliance rules: Planet Suzaku, Planet Tian Yun, the Trading Planet in the Kunxu region. The Rain Celestial Realm once sat above it."
  },
  {
   "id": "allheaven-star-system",
   "name": "Allheaven Star System",
   "subs": "Cosmic Star Domain, Luotian",
   "zh": "罗天星域",
   "ep": 133,
   "wiki": "Allheaven Star System",
   "blurb": "The star system under the Thunder Celestial Realm, ruled by clans and the Thunder Celestial Temple. Four domains: he starts in the north (EP133), heals in the poor Southern Domain (EP145–147), lands in the west (EP159)."
  }
 ],
 "factions": [
  {
   "name": "Heng Yue Sect",
   "subs": "Hengyue Sect",
   "zh": "恒岳派",
   "region": "zhao",
   "tier": 1,
   "ep": 1,
   "wiki": "Heng Yue Sect",
   "top": "Sect master Huang Long; its Nascent Soul ancestors die on the foreign battlefield (EP4)",
   "signature": "A ladder trial for mortal children; grey-robed registered disciples who carry water",
   "with": "Fails him at the spiritual root test but lets him climb the ladder (EP1). Registered disciple (EP2), inner disciple after he beats Zhou Peng (EP4). Loses Heng Yue Peak to the Xuan Dao Sect the same day (EP4). He kneels at its ruins 400 years later (EP46)."
  },
  {
   "name": "Xuan Dao Sect",
   "subs": "Xuan Daozong",
   "zh": "玄道宗",
   "region": "zhao",
   "tier": 1,
   "ep": 3,
   "wiki": "Xuan Dao Sect",
   "top": "Pu Nanzi (Nascent Soul), called the strongest master in Zhao",
   "signature": "The Thousand-legged Centipede, whose venom clears his poison",
   "with": "Its centipede's venom lifts him from level 1 to level 14 Qi Condensation (EP3). Takes Heng Yue Peak (EP4). Pu Nanzi spares Wang Zhuo and Wang Hao (EP10), shields Teng Huayuan, then burns his lifespan against Lin Yi for Zhao's mortals (EP52)."
  },
  {
   "name": "Teng Clan",
   "subs": "Teng family",
   "zh": "藤家",
   "region": "zhao",
   "tier": 1,
   "ep": 5,
   "wiki": "Teng Clan",
   "top": "Teng Huayuan (late Nascent Soul great perfection); nine core members at Nascent Soul",
   "signature": "Nine spiritual veins under Zhao, fed with mortals' stolen spiritual roots; the Reversal Formation",
   "with": "He kills the heir Teng Li (EP7). Teng Huayuan massacres the Wang clan and seals his parents' souls in a Soul Flag (EP10), then destroys his body (EP11). After 400 years he kills the nine core members and Teng Huayuan and ends the clan (EP47–52)."
  },
  {
   "name": "Corpse Yin Sect",
   "subs": "Shiyin Sect",
   "zh": "尸阴宗",
   "region": "zhao",
   "tier": 3,
   "ep": 5,
   "wiki": "Corpse Yin Sect(Country of Zhao)",
   "top": "Ancestors Ye Zizai and Wu Yu (Nascent Soul); Great Elder Sun Tai (mid Soul Transformation)",
   "signature": "Corpse puppets that grow with their masters; trade in bodies",
   "with": "Wu Yu's message makes him a second-generation disciple (EP9). Eight of its Nascent Souls come for 'Ma Liang' (EP26). Sun Tai becomes his slave (EP70), seals him in Pilu (EP83), and later lives out his life beside him on Planet Ran Yun (EP133–139). Lei Ji and Mei Ji lie sealed under its Zhao seat (EP97–98)."
  },
  {
   "name": "Cultivation Alliance",
   "zh": "修真联盟",
   "region": "alliance-star-system",
   "tier": 6,
   "ep": 9,
   "wiki": "Cultivation Alliance",
   "top": "Envoys like Mo Zhi and Sun Zhongan; Master Zhong Xuan at its head (named EP148)",
   "signature": "Ranks cultivation countries; gives a planet and its Cultivation Planet Crystal to each level 6 country; an old bounty on the bead",
   "with": "Its envoy runs the foreign battlefield draw in Zhao (EP9). Mo Zhi shows him an Intent Realm (EP62) and, as envoy, seals Tuo Sen and lets him pass the Suzaku title on (EP102–103). Its old bounty on a bead is why Situ Nan was hunted (EP109)."
  },
  {
   "name": "War Shrine Sect",
   "subs": "War God Temple, Temple of War",
   "zh": "战神殿",
   "region": "huo-fen",
   "tier": 1,
   "ep": 12,
   "wiki": "War Shrine Sect",
   "top": "Feng Luan (Nascent Soul)",
   "signature": "The Divine Path Art, which makes a clone that cultivates beside the body",
   "with": "He lives as its disciple Ma Liang (EP12–25). Feng Luan knows who he is and still takes him in (EP16). He sees the Divine Path Art (EP25–26), the clone method he uses from EP39."
  },
  {
   "name": "Luohe Sect",
   "subs": "Luohe Sect, Luo He Sect",
   "zh": "",
   "region": "huo-fen",
   "tier": 1,
   "ep": 3,
   "wiki": "Lou He Sect",
   "top": "Nascent Soul ancestors",
   "signature": "Alchemy; the Tianli Pill",
   "with": "Li Muwan's sect. Her brother Li Qiqing burns out his consciousness holding back the fire beasts (EP17). He takes her half-made Tianli Pill when he saves her (EP18)."
  },
  {
   "name": "Fighting Evil Sect",
   "subs": "Douxie Sect",
   "zh": "斗邪派",
   "region": "sea-of-devils",
   "tier": 1,
   "ep": 19,
   "wiki": "Fighting Evil Sect",
   "top": "Jie Donglai (late Core Formation); Great Elder Qian Kun",
   "signature": "The Dragon Fighting Formation, powered by 13,562 disciples",
   "with": "He kills its men over Li Muwan (EP19). Qian Kun opens the Hundred-Day Kill Order on him (EP22). He kills Jie Donglai and becomes its leader (EP24). He brings Li Muwan back to their old cave there (EP74)."
  },
  {
   "name": "Cloud Sky Sect",
   "subs": "Yuntian Sect",
   "zh": "云天宗",
   "region": "chu",
   "tier": 1,
   "ep": 39,
   "wiki": "Cloud Sky Sect",
   "top": "Five founding ancestors at late Nascent Soul (Chen Bailiang, Yun Tianzi)",
   "signature": "Pills; the Seven Heaven-Seizing Furnaces; the Cloud Sky Great Formation",
   "with": "His clone joins it and finds Li Muwan as Elder Li (EP39–40). He kills Sun Zhenwei, breaks its ancestors and leaves Li Muwan in charge (EP44). He saves it from Zhan Bai (EP73–74). It remembers him as a legend (EP124)."
  },
  {
   "name": "Four Faction Alliance",
   "subs": "Four Sects Alliance",
   "zh": "四派联盟",
   "region": "four-faction-alliance",
   "tier": 2,
   "ep": 53,
   "top": "Nine late Soul Formation masters, among them Zhou Yun and Wu Huichu",
   "signature": "The Nine Sons Killing Formation and the Country-Protecting Sky Dragon",
   "with": "Baiyun, Shuimo, Qingmu Cliff and Heihun guard the capital of Nan, where he lives as a woodcarver (EP53–58). He breaks the Heihun elders' sword formation (EP58). The Snow Region destroys it (EP60)."
  },
  {
   "name": "Bai Yun Sect",
   "subs": "Baiyun Sect, White Cloud Sect",
   "zh": "",
   "region": "four-faction-alliance",
   "tier": 2,
   "ep": 54,
   "wiki": "Bai Yun Sect",
   "top": "Soul Formation elders Wen Baoxin, Shi Qi, Qing Song; over 30 Nascent Souls",
   "signature": "Three elders with three Intent Realms: detachment, sloth, age",
   "with": "The old man smashes its formation so he can feel its elders' Intent Realms (EP55–56). Elder Zhou Wutai befriends him and hands him the Rain Cauldron (EP57–60)."
  },
  {
   "name": "Snow Region",
   "subs": "Snow Domain, Snow Land",
   "zh": "雪域",
   "region": "snow-domain",
   "tier": 3,
   "ep": 58,
   "wiki": "Xue Yue",
   "top": "Hongdie (Soul Formation great perfection); sect master Li Yuanfeng (early Soul Transformation); 36 Soul Formation cultivators",
   "signature": "Snowfall attacks, ice statues, the Ice and Snow Formation, the Emotionless Intent",
   "with": "Conquers the Four Factions (EP60); he rules its 72nd city as Sun Shuoyi (EP61). Hongdie is his rival from the Rain Celestial Realm to her death (EP65–100). Li Yuanfeng traps him (EP82–83); he kills Li Yuanfeng and seals the country to level 3 (EP89)."
  },
  {
   "name": "Suzaku Country",
   "subs": "Vermilion Bird Country, Suzaku Kingdom",
   "zh": "朱雀国",
   "region": "suzaku-continent",
   "tier": 4,
   "ep": 59,
   "top": "Zhu Quezi, the 14th Suzaku (Ascendant great perfection); his disciples Qian Feng and Liu Mei (mid Soul Transformation)",
   "signature": "The Suzaku title, the Cultivation Planet Crystal, the Suzaku Mystic Formation; talented cultivators kept as furnaces",
   "with": "Its guardian Ou Zhi ends the Four Faction war (EP60). After the duel with Hongdie, Zhu Quezi picks Wang Lin as Liu Mei's future furnace (EP81–82). Zhu Quezi crushes the Soul Refining Sect (EP95). He kills Qian Feng and passes the title to Zhou Wutai, the 15th Suzaku (EP102–103)."
  },
  {
   "name": "Immortal's Path Sect",
   "zh": "",
   "region": "suzaku-continent",
   "tier": 4,
   "ep": 81,
   "wiki": "Immortal’s Path Sect",
   "top": "Sect master Li Yunlong (early Ascendant)",
   "signature": "One of the three great sects of Suzaku Country",
   "with": "Bai Xue shows him the plain (EP81). Zhu Quezi enters him into the sect after the duel (EP82)."
  },
  {
   "name": "Giant Demon Clan",
   "subs": "Giant Tribe",
   "zh": "巨魔族",
   "region": "chu",
   "tier": 3,
   "ep": 64,
   "wiki": "Giant Demon",
   "top": "Its ancestor (early Soul Transformation); Grand Elder Tian Mu; young leader Chi Hu",
   "signature": "Innate teleportation, the Star Compass, the Tongtian Great Formation, the Demon Child",
   "with": "Chi Hu becomes his friend and gives him the Star Compass (EP67–71). The ancestor takes Xu Liguo (EP83–85). He breaks the Tongtian formation, kills the ancestor and bans the clan from Nascent Soul without his leave (EP90)."
  },
  {
   "name": "Soul Refining Sect",
   "subs": "Lianhun Sect",
   "zh": "炼魂宗",
   "region": "suzaku-continent",
   "tier": 3,
   "ep": 84,
   "wiki": "Soul Refining Sect",
   "top": "Ancestor Dun Tian (peak Soul Transformation, near mid Ascendant with his flag); nine Soul Formation elders",
   "signature": "Soul flags graded by souls, up to the Billion Soul Flag",
   "with": "Joins as the outer disciple Qing Mu (EP85), wins the contest (EP86), takes a Hundred Thousand Soul Flag (EP87). Dun Tian makes him core disciple (EP88), then heir (EP94), and guards his Soul Transformation (EP95)."
  },
  {
   "name": "Forsaken Immortal Clan",
   "subs": "savages",
   "zh": "仙遗族",
   "region": "chu",
   "tier": 4,
   "ep": 77,
   "wiki": "Forsaken Immortal Clan",
   "top": "Ancestor Xu (eleven, later twelve leaves); Yun Quezi, the Second Ancestor (ten leaves); Mei Ji (nine leaves)",
   "signature": "Rune magic ranked by leaves; rune puppets; Reincarnation Trees",
   "with": "He takes a Reincarnation Fruit from its land (EP77–80) and escapes Mu Ye's rune seed (EP79). It breaks its seal and wars on Suzaku Country (EP93–103). He saves Zhao from its shamans (EP93). Mo Zhi gives it a third of the planet (EP103)."
  },
  {
   "name": "Heavenly Fate Sect",
   "subs": "Tianyun Sect, Destiny Sect",
   "zh": "天运宗",
   "region": "planet-tian-yun",
   "tier": 5,
   "ep": 104,
   "wiki": "Heavenly Fate Sect",
   "top": "All-Seer, Tian Yunzi; his junior Chi Lie (Nirvana Scryer); Chen Tao (mid Ascendant)",
   "signature": "Seven branches and the Seven Heavenly Fated Disciples; 3,600 forbidden arts; a mark on its disciples' foreheads",
   "with": "Takes him into the Purple Branch (EP104). He kills Zhou Wan (EP106), loses the title to Chen Tao (EP107), climbs 27 steps and gets the Celestial Slaughter Art (EP108). He learns All-Seer devoured Sun Yun and tears out his own mark (EP131); All-Seer hunts him (EP132)."
  },
  {
   "name": "Da Lou Sword Sect",
   "subs": "Daluo Sword Sect",
   "zh": "大罗剑宗",
   "region": "planet-tian-yun",
   "tier": 5,
   "ep": 64,
   "wiki": "Da Lou Sword Sect",
   "top": "Ling Tianhou, the Sword Saint (late Nirvana Cleanser); Tan Lang guards its disciples",
   "signature": "Twelve Sword Disciples with zodiac swords and their master's sword qi; maps of 37 Rain Realm fragments",
   "with": "He seals Hong Wen and takes its teleport slip (EP64). Ling Tianhou shatters Zhou Yi's sword soul (EP109). He takes Wei Yang's sword qi (EP118), breaks the seal on Zhou Yi (EP128–129), and makes the Seven-Star Sword Formation from its zodiac swords (EP130–131)."
  },
  {
   "name": "Soul Refining Tribe",
   "zh": "炼魂部落",
   "region": "demon-spirit-land",
   "tier": 1,
   "ep": 110,
   "wiki": "Soul Refining Tribe",
   "top": "Chief Ouyang Hua; Shi San; Hu Pao (who betrays him)",
   "signature": "Mortals making Soul Flags from hide and wood",
   "with": "He builds it from a hidden valley of mortals and names it after Dun Tian's sect (EP110–112). Hu Pao turns on him (EP123). He moves it to the border (EP125) and leaves it to Shi San (EP132)."
  },
  {
   "name": "Sky Demon Country",
   "zh": "",
   "region": "demon-spirit-land",
   "tier": 5,
   "ep": 112,
   "wiki": "Sky Demon Country",
   "top": "The Ancient Demon Bei Lou; Demon Emperor Gu Yunchi (Illusory Yin); the Heaven Commander-in-Chief (peak Ascendant)",
   "signature": "Demon armies ranked by armour of demon power; the Demon General Tournament and the Demonic Battle Drum",
   "with": "Mo Lihai makes him a Commander (EP112); he takes the Black Armor Army (EP113). The drum and tournament bring his Ascendant tribulation (EP119–121). Bei Lou names him Heavenly Demon Envoy (EP124). He leads its war on Fire Demon Country (EP126–127)."
  },
  {
   "name": "Yao Family",
   "zh": "姚家",
   "region": "allheaven-star-system",
   "tier": 5,
   "ep": 109,
   "wiki": "Yao Family",
   "top": "The Blood Ancestor (Nirvana Cleanser); a Corporeal Yang guardian of the Collection Pavilion",
   "signature": "Immortal blood; the Blood Soul Pill",
   "with": "The Blood Ancestor's daughter Yao Xixue tries to cheat him and is imprisoned (EP114–124). The Blood Ancestor hunts him in the Thunder Celestial Realm; he takes half the blood body (EP152). He kills Yao Luo (EP152). The Blood Ancestor's soul ends up in Yan Leizi's treasure (EP157)."
  },
  {
   "name": "Sun Family",
   "subs": "Sun Clan",
   "zh": "孙家",
   "region": "planet-ran-yun",
   "tier": 4,
   "ep": 133,
   "wiki": "Sun Family",
   "top": "Sun Xi (early Ascendant); First Elder Sun Qiming (peak Soul Transformation)",
   "signature": "Baohe Hall, the trading house of Ran Yun City",
   "with": "Sun Ning ambushes him and the elders pay 200,000 immortal jade (EP133–134), then seventy percent of their jade (EP135). Sun Qiming keeps the clan away from the Wang Residence (EP140)."
  },
  {
   "name": "Huan Clan",
   "zh": "幻家",
   "region": "allheaven-star-system",
   "tier": 5,
   "ep": 134,
   "top": "Ancestor Huan Wuqing (Corporeal Yang, fallen from Nirvana Scryer); clan head Huan Fengshen",
   "signature": "Kills everyone tied to a member's death; the Blood Reforging Art; descended from Thunder Realm immortals",
   "with": "Liu Mei hunts him as Huan Mei (EP134–137). He breaks the clan's formation; Huan Wuqing devours Liu Mei and dies (EP138). As a temple envoy he takes its Ascension Fruits (EP143)."
  },
  {
   "name": "Thunder Celestial Temple",
   "subs": "Lightning Immortal Temple",
   "zh": "雷仙殿",
   "region": "allheaven-star-system",
   "tier": 6,
   "ep": 131,
   "wiki": "Thunder Celestial Temple",
   "top": "Ranked envoys at Illusory Yin to Corporeal Yang: Lei Daozi, Shengong Hu, Zhan Konglie, Liao Qian",
   "signature": "Holds the Thunder Origin Art; controls entry to the Thunder Celestial Realm with Thunder Cauldrons",
   "with": "People take him for its envoy (EP133). He forges Lei Daozi into an Immortal Guard and keeps his token (EP143). Shengong Hu serves him (EP146). He beats Liao Qian and the envoys to get the survivors out (EP158)."
  },
  {
   "name": "Tang Family",
   "subs": "Tang clan",
   "zh": "唐家",
   "region": "allheaven-star-system",
   "tier": 5,
   "ep": 148,
   "wiki": "Tang Family",
   "top": "Tang Yanfeng (Corporeal Yang); Tang Yanyun and Tang Ping (Illusory Yin)",
   "signature": "Called the strongest family of the Southern Domain",
   "with": "Tang Yanfeng mocks Shengong Hu at the gate (EP148). He kills a Tang cultivator at the immortal market (EP152), and the family decides not to touch 'Xu Mu' (EP153)."
  },
  {
   "name": "Li Family",
   "subs": "Li Clan",
   "zh": "破灭星李家",
   "region": "allheaven-star-system",
   "tier": 5,
   "ep": 149,
   "wiki": "Li Family",
   "top": "Li Yuan (Ascendant great perfection), one of three left",
   "signature": "Restrictions: the Eighteen Plum Restriction, the Annihilation Restriction; cursed by an immortal's slave mark",
   "with": "Li Yuan uses him, then gives him the first thirteen plum restrictions (EP149–150). He frees the family from the mark (EP151). Li Yuan fights beside him to the end of the realm (EP152–158)."
  },
  {
   "name": "Chosen Immortal Clan",
   "zh": "",
   "region": "fog-land",
   "tier": 5,
   "ep": 159,
   "wiki": "Chosen Immortal Clan",
   "top": "Altar guardian Ta Shan (Corporeal Yang); clan head Zu Zhang",
   "signature": "Guards the Xuanyin Tripod for Xiaoyao Zi, for thirty thousand years; its own tongue",
   "with": "Takes him for Xiaoyao Zi's messenger because of the Wither Dao Pair (EP159). Ta Shan begs him to lead the clan out (EP160)."
  },
  {
   "name": "Ancient Gods",
   "zh": "古神",
   "region": "sea-of-devils",
   "tier": 7,
   "ep": 26,
   "wiki": "Ancient God",
   "top": "Tu Si (eight stars); Tuo Sen, the evil thought split from him",
   "signature": "Bodies bigger than planets, ranked by stars; consciousness that only sleeps; memory inheritances",
   "with": "Tu Si names him the fourth Enlightened One (EP32) and leaves him the memory inheritance and a reshaped body (EP34–36). Tuo Sen hunts him and sits under Planet Suzaku (EP101–102)."
  },
  {
   "name": "Ancient Demons",
   "zh": "古妖",
   "region": "demon-spirit-land",
   "tier": 7,
   "ep": 121,
   "wiki": "Ancient Demon",
   "top": "Bei Lou of Sky Demon Country; the Fire Demon",
   "signature": "Split into fragments that sit under the demon countries",
   "with": "Bei Lou saves him from Heaven's Wrath (EP121), helps seal the Scattered Devil in him (EP124), devours the Fire Demon with his help and opens the Ancient Demon inheritance (EP127)."
  },
  {
   "name": "Celestials",
   "subs": "immortals",
   "zh": "仙",
   "region": "thunder-celestial-realm",
   "tier": 7,
   "ep": 64,
   "wiki": "Celestial",
   "top": "Celestial Emperors Qin Lin and Bai Fan (early Nirvana Void); Immortal Kings Xiaoyao Zi and Gu Ziyuan; Immortal Lord Qing Shui (peak Nirvana Shatterer)",
   "signature": "The four Celestial Realms; immortal arts, immortal jade, immortal guards",
   "with": "Their ruins feed him immortal energy (EP64–72). Qin Lin's palace gives him immortal wine (EP114). Bai Fan's painting gives him Call Wind (EP154). Qing Shui calls him an indirect disciple of Bai Fan (EP157)."
  }
 ],
 "journey": [
  {
   "stage": "Mortal and Qi Condensation",
   "realm": "qi",
   "eps": [
    1,
    6
   ],
   "items": [
    {
     "name": "Heaven Defying Bead",
     "zh": "天逆珠",
     "ep": 1,
     "text": "Picks him. Its space runs time ten times faster, its water heals, and it grows as it eats the five elements.",
     "wiki": "Heaven Defying Bead"
    },
    {
     "name": "Situ Nan",
     "zh": "司徒南",
     "ep": 2,
     "text": "A thousand-year-old soul in the bead, once the strongest man of the planet. Teacher, bodyguard, and the reason every big power wants the bead.",
     "wiki": "Situ Nan"
    },
    {
     "name": "Centipede venom",
     "zh": "",
     "ep": 3,
     "text": "Fighting poison with poison: the Xuan Dao centipede's venom burns out Sun Dazhu's poison and takes him from level 1 to level 14 Qi Condensation."
    },
    {
     "name": "Core Treasure and little flying sword",
     "zh": "丹宝",
     "ep": 5,
     "text": "One Core Formation strike in a jade talisman kills Bai Zhan; Bai Zhan's sword, bound by Blood Refining, becomes his first weapon."
    }
   ]
  },
  {
   "stage": "Foundation Establishment",
   "realm": "foundation",
   "eps": [
    7,
    17
   ],
   "items": [
    {
     "name": "Seize Foundation art",
     "zh": "夺基大法",
     "ep": 7,
     "text": "Takes Teng Li's foundation and puts him in Foundation Establishment.",
     "wiki": "Stealing Foundation"
    },
    {
     "name": "Underworld Ascension Method",
     "zh": "黄泉升窍诀",
     "ep": 7,
     "text": "A nine-level yin method that forms three cold cores. Its ice flame stays with him for centuries.",
     "wiki": "Underworld Ascension Method"
    },
    {
     "name": "Extreme Realm",
     "zh": "极境",
     "ep": 10,
     "text": "Born from his grief: strongest at his level, but capped at Nascent Soul. Shaping his whole path until he cuts it out (EP62).",
     "wiki": "Ji Realm"
    },
    {
     "name": "Extreme consciousness",
     "zh": "",
     "ep": 13,
     "text": "Three hundred years as a Soul Swallower and the boundary law temper his mind into a thread that kills equals easily."
    },
    {
     "name": "Ma Liang's body",
     "zh": "",
     "ep": 12,
     "text": "A dead War Shrine disciple's body in exchange for avenging him. His cover for the next 24 episodes."
    },
    {
     "name": "Xu Liguo",
     "zh": "许立国",
     "ep": 14,
     "text": "A Nascent Soul's soul trained into his devil. Scout, soul-eater, later a sword spirit, always complaining.",
     "wiki": "Xu Liguo"
    }
   ]
  },
  {
   "stage": "Core Formation",
   "realm": "core",
   "eps": [
    18,
    38
   ],
   "items": [
    {
     "name": "False Core from a stolen golden core",
     "zh": "假丹",
     "ep": 18,
     "text": "Absorbing a tenth of a dead man's core lifts him to the edge of Core Formation."
    },
    {
     "name": "Death spell",
     "zh": "死咒术",
     "ep": 19,
     "text": "An ancient demonic technique of yin, death and killing energy: kills with a look and a word.",
     "wiki": "Death spell"
    },
    {
     "name": "Li Muwan",
     "zh": "李慕婉",
     "ep": 18,
     "text": "An alchemist he saves and keeps as a pill refiner. Her pills and the Dragon Fighting Formation jade slip carry him through the Sea of Devils.",
     "wiki": "Li Muwan"
    },
    {
     "name": "Leader of the Fighting Evil Sect",
     "zh": "斗邪派",
     "ep": 24,
     "text": "Thirteen thousand demonic cultivators and a safe base in the Sea of Devils.",
     "wiki": "Fighting Evil Sect"
    },
    {
     "name": "Restriction breaking with divine sense",
     "zh": "",
     "ep": 31,
     "text": "Seven years on the Forbidden Mountain: he learns to break restrictions with divine sense, then breaks all of them."
    },
    {
     "name": "Tu Si's gifts",
     "zh": "",
     "ep": 32,
     "text": "The title of fourth Enlightened One, a jade slip on restriction flags and Mojian Stone.",
     "wiki": "Tu Si"
    },
    {
     "name": "Ancient God memory inheritance",
     "zh": "",
     "ep": 36,
     "text": "Part of Tu Si's memory and one body reshaping. Spirit Snatch, Ancient God restrictions, knowledge of beasts and treasures for the rest of the show.",
     "wiki": "Ancient God Tactic"
    },
    {
     "name": "Restriction flag",
     "zh": "禁幡",
     "ep": 38,
     "text": "Refining it calls a Heavenly Tribulation he can aim at enemies. His trump card for 900 years.",
     "wiki": "Restrictions"
    }
   ]
  },
  {
   "stage": "Nascent Soul",
   "realm": "nascent",
   "eps": [
    39,
    61
   ],
   "items": [
    {
     "name": "Clone",
     "zh": "分身",
     "ep": 39,
     "text": "The Divine Path Art lets a clone cultivate past the Extreme Realm's cap. From here his realm is the clone's.",
     "wiki": "Divine Path"
    },
    {
     "name": "Nascent Soul through the Cloud Sky furnaces",
     "zh": "",
     "ep": 44,
     "text": "A rank 7 Green Cloud Pill and the Seven Heaven-Seizing Furnaces give the clone its Nascent Soul."
    },
    {
     "name": "Mosquito Beast",
     "zh": "",
     "ep": 45,
     "text": "A coral-born beast he subdues crossing the sea. It grows into his most loyal pet.",
     "wiki": "Mosquito Beast"
    },
    {
     "name": "Revenge on the Teng clan",
     "zh": "",
     "ep": 52,
     "text": "Not a power-up but a turning point: with his parents avenged he keeps cultivating for its own sake."
    },
    {
     "name": "Thirty years as a mortal",
     "zh": "",
     "ep": 53,
     "text": "Woodcarving in Nan, his killing energy condenses into pearls and he learns to see an Intent Realm."
    },
    {
     "name": "Rain Cauldron",
     "zh": "雨鼎",
     "ep": 60,
     "text": "Zhou Wutai's gift: the key into the Rain Celestial Realm."
    }
   ]
  },
  {
   "stage": "Soul Formation: the Rain Celestial Realm and Wan'er",
   "realm": "soulform",
   "eps": [
    62,
    80
   ],
   "items": [
    {
     "name": "Life and Death Intent Realm",
     "zh": "生死意境",
     "ep": 62,
     "text": "Rain born in the sky and dying on the earth. His own domain, far stronger than a copied one.",
     "wiki": "Life and Death Domain"
    },
    {
     "name": "Two-Star Ancient God",
     "zh": "",
     "ep": 62,
     "text": "His original body sheds the Extreme Realm and sinks into the planet's core to grow as an Ancient God."
    },
    {
     "name": "Thunder Toad",
     "zh": "雷蛙",
     "ep": 63,
     "text": "A top-grade spirit beast taken with the Hunyuan Beast Control Ring; strong enough to beat Soul Formation cultivators.",
     "wiki": "Thunder Toad"
    },
    {
     "name": "God Slaying War Chariot",
     "zh": "射神车",
     "ep": 67,
     "text": "Tian Bao's chariot of beast souls. Each seal he opens lets him fight a realm higher.",
     "wiki": "God Slaying War Chariot"
    },
    {
     "name": "Zhou Yi's gifts",
     "zh": "",
     "ep": 70,
     "text": "An Ascendant domain in a pagoda, an Ascendant Crystal, and Sun Tai as a slave."
    },
    {
     "name": "Star Compass",
     "zh": "",
     "ep": 71,
     "text": "Chi Hu's teleporting treasure, repaired by Wang Lin and given in friendship.",
     "wiki": "Star Compass"
    },
    {
     "name": "Two Rain Celestial Swords",
     "zh": "",
     "ep": 72,
     "text": "Immortal swords; Xu Liguo becomes the spirit of one (EP77)."
    },
    {
     "name": "True Ancient God",
     "zh": "",
     "ep": 80,
     "text": "A Reincarnation Fruit completes Body Cleansing for his real body.",
     "wiki": "Ancient God"
    }
   ]
  },
  {
   "stage": "Soul Formation: Suzaku Country and the Soul Refining Sect",
   "realm": "soulform",
   "eps": [
    81,
    94
   ],
   "items": [
    {
     "name": "Victory over Hongdie",
     "zh": "",
     "ep": 82,
     "text": "Breaking her Emotionless Intent wins him Suzaku Country's notice, and its danger."
    },
    {
     "name": "Soul flags and the Soul Refining arts",
     "zh": "魂幡",
     "ep": 87,
     "text": "Soul Vortex, Condensation, Blood Sacrifice; a Hundred Thousand Soul Flag with a Qilin as its main soul.",
     "wiki": "Soul Flag"
    },
    {
     "name": "Dun Tian's patronage",
     "zh": "",
     "ep": 88,
     "text": "Restored divine sense, late Soul Formation, the Soul Sealing Technique and a sub-flag of the Billion Soul Flag."
    },
    {
     "name": "Three-Star Ancient God",
     "zh": "",
     "ep": 88,
     "text": "His real body grows a third star; with the clone merged his Intent reaches Soul Transformation level (EP89)."
    },
    {
     "name": "Life and Death Intent at great perfection",
     "zh": "",
     "ep": 92,
     "text": "Losing Wan'er a second time completes it."
    }
   ]
  },
  {
   "stage": "Soul Transformation: the Suzaku Tomb",
   "realm": "soultrans",
   "eps": [
    95,
    103
   ],
   "items": [
    {
     "name": "Soul Transformation",
     "zh": "婴变",
     "ep": 95,
     "text": "Cut mortal roots, reforge an immortal body, crystallise the origin soul, under Dun Tian's guard.",
     "wiki": "Soul Transformation"
    },
    {
     "name": "Billion Soul Flag",
     "zh": "十亿尊魂幡",
     "ep": 96,
     "text": "The Soul Refining Sect's supreme flag, with its ancestors' souls, left to him by Dun Tian.",
     "wiki": "Billion Soul Flag"
    },
    {
     "name": "Kunji Whip",
     "zh": "昆极鞭",
     "ep": 100,
     "text": "Hongdie's last gift, with Qian Feng's Intent.",
     "wiki": "Karma Whip"
    },
    {
     "name": "Life souls won back",
     "zh": "",
     "ep": 103,
     "text": "His own and Wan'er's, from the Cultivation Planet Crystal. Waking Wan'er becomes his reason to leave the planet."
    },
    {
     "name": "Three killing fingers",
     "zh": "灭世指 · 化魔指 · 黄泉指",
     "ep": 103,
     "text": "Situ Nan's Annihilation, Demon Transformation and Yellow Springs Fingers."
    }
   ]
  },
  {
   "stage": "Soul Transformation: Tian Yun and the Demon Spirit Land",
   "realm": "soultrans",
   "eps": [
    104,
    120
   ],
   "items": [
    {
     "name": "Purple Branch of the Heavenly Fate Sect",
     "zh": "天运宗",
     "ep": 104,
     "text": "All-Seer's disciple: sect jade, forbidden arts, and a mark on his forehead.",
     "wiki": "Heavenly Fate Sect"
    },
    {
     "name": "Nine Revolution Immortal Refining Law",
     "zh": "",
     "ep": 106,
     "text": "Turns immortal energy golden; resists All-Seer's Immortal Summoning Art.",
     "wiki": "Nine Cycle Celestial Refining Tactic"
    },
    {
     "name": "Celestial Slaughter Art",
     "zh": "杀戮仙诀",
     "ep": 108,
     "text": "An imitation immortal art from All-Seer's second soul. Its Life Mark guards him; deduced to the end it would kill him (EP127).",
     "wiki": "Celestial Slaughter Art"
    },
    {
     "name": "Soul Refining Tribe",
     "zh": "炼魂部落",
     "ep": 111,
     "text": "Mortals he turns into soul-flag makers; a base in the Demon Spirit Land.",
     "wiki": "Soul Refining Tribe"
    },
    {
     "name": "Qin Lin's Immortal Palace and immortal wine",
     "zh": "",
     "ep": 114,
     "text": "Master of the fourth abode. One drop of wine lifts him to Soul Transformation great perfection (EP115).",
     "wiki": "Qin Lin"
    },
    {
     "name": "Killing intent from the Slaughter Blood Pool",
     "zh": "",
     "ep": 117,
     "text": "3,792 strands of killing intent and the Life Seal."
    }
   ]
  },
  {
   "stage": "Ascendant: the Demon Spirit Land",
   "realm": "ascendant",
   "eps": [
    121,
    132
   ],
   "items": [
    {
     "name": "Ascendant by reverse cultivation",
     "zh": "问鼎",
     "ep": 121,
     "text": "He refuses to cut his feelings and defies the Heavenly Dao; Bei Lou saves him from Heaven's Wrath.",
     "wiki": "Ascendant"
    },
    {
     "name": "Yellow Springs Dao",
     "zh": "黄泉",
     "ep": 122,
     "text": "His Dao takes form as a river of life and death, his first step toward the Second Step."
    },
    {
     "name": "Scattered Devil sealed in his soul",
     "zh": "散魔",
     "ep": 124,
     "text": "A devil he can call out like a second soul.",
     "wiki": "Scattered Devil"
    },
    {
     "name": "Celestial Brush, Immortal-Binding Net, Immobilization Technique",
     "zh": "点仙笔",
     "ep": 126,
     "text": "Qin Lin's treasures and a real low-grade immortal art that freezes a foe for a few breaths.",
     "wiki": "Celestial Brush"
    },
    {
     "name": "Ancient Demon inheritance",
     "zh": "",
     "ep": 127,
     "text": "Lets him deduce one art to completion, and shows him All-Seer's trap."
    },
    {
     "name": "Lightning soul and Immortal Guard",
     "zh": "仙卫",
     "ep": 131,
     "text": "Devouring part of the Ancient Thunder Dragon turns his soul to lightning; Du Jian becomes his Illusory Yin guard."
    },
    {
     "name": "Net-Severing Sword Art and Netherworld Force",
     "zh": "",
     "ep": 132,
     "text": "A sword that cuts the net of rules, and a third form of his Dao intent."
    }
   ]
  },
  {
   "stage": "Ascendant: Allheaven",
   "realm": "ascendant",
   "eps": [
    133,
    151
   ],
   "items": [
    {
     "name": "Sun Tai's savings and notes",
     "zh": "",
     "ep": 135,
     "text": "Over 50,000 immortal jade and his alchemy notes fund the next breakthrough."
    },
    {
     "name": "Wang Ping",
     "zh": "王平",
     "ep": 138,
     "text": "A son made from his own blood soul and Liu Mei's hatred. Seventy mortal years with him clear his Dao heart.",
     "wiki": "Wang Ping"
    },
    {
     "name": "Thunder Origin Art and a temple token",
     "zh": "雷元术",
     "ep": 143,
     "text": "From Lei Daozi: lightning into origin power, and a disguise as a Thunder Celestial envoy.",
     "wiki": "Thunder Origin Spell"
    },
    {
     "name": "Heaven Defying Bead complete",
     "zh": "",
     "ep": 145,
     "text": "The Moonwatcher bone gives it metal; a gate opens to the Heaven Defying space.",
     "wiki": "Heaven Defying Bead"
    },
    {
     "name": "Lightning body",
     "zh": "",
     "ep": 145,
     "text": "Sixty years forging a new body for his avatar out of Heavenly Lightning."
    },
    {
     "name": "Karma Whip",
     "zh": "因果昆极鞭",
     "ep": 147,
     "text": "His domain moves from life and death toward karma.",
     "wiki": "Karma Whip"
    },
    {
     "name": "Third Eye divine art",
     "zh": "三目神通",
     "ep": 148,
     "text": "Traded from Zhang Zhen; it saves him from the severed arm (EP155)."
    },
    {
     "name": "Eighteen Plum Restriction",
     "zh": "梅花十八禁",
     "ep": 150,
     "text": "The first thirteen, from Li Yuan.",
     "wiki": "18 Plum Restriction"
    }
   ]
  },
  {
   "stage": "Corporeal Yang: the Thunder Celestial Realm",
   "realm": "yinyang",
   "eps": [
    152,
    160
   ],
   "items": [
    {
     "name": "Corporeal Yang",
     "zh": "阳实",
     "ep": 152,
     "text": "Reached in a year of being hunted by the Blood Ancestor.",
     "wiki": "Corporeal Yang"
    },
    {
     "name": "Wither Dao Pair",
     "zh": "",
     "ep": 152,
     "text": "A true immortal treasure once Xiaoyao Zi's.",
     "wiki": "Wither Dao Pair"
    },
    {
     "name": "Earthfold Step",
     "zh": "",
     "ep": 152,
     "text": "Shrinks distance to a step; at its height he merges with heaven and earth (EP155)."
    },
    {
     "name": "Ji Realm force kept in him",
     "zh": "极境",
     "ep": 153,
     "text": "Part of Qing Shui's crimson force, sealed inside him; a presence uses it through his body (EP156).",
     "wiki": "Ji Realm"
    },
    {
     "name": "Call Wind and the Collection Pavilion",
     "zh": "",
     "ep": 154,
     "text": "One of Bai Fan's six great arts, and the whole vault of immortal arts."
    },
    {
     "name": "Heaven Seal and the third War Chariot",
     "zh": "",
     "ep": 160,
     "text": "A seal art of his own, and a new chariot whose soul beast is a single butterfly.",
     "wiki": "God Slaying War Chariot"
    }
   ]
  }
 ],
 "inventory": [
  {
   "ep": 1,
   "kind": "treasure",
   "name": "Heaven Defying Bead",
   "zh": "天逆珠",
   "note": "Pulls him into its dream space, where time runs ten times faster. Water done (EP2), fire (EP16), earth (EP60), wood (EP88), metal (EP145).",
   "wiki": "Heaven Defying Bead"
  },
  {
   "ep": 2,
   "kind": "companion",
   "name": "Situ Nan",
   "zh": "司徒南",
   "note": "The soul in the bead and his teacher. Asleep for long stretches (EP8–80).",
   "lostEp": 103,
   "lostNote": "they part at the Trading Planet; Situ Nan leaves for Planet Feng Luan",
   "cast": "situ-nan",
   "wiki": "Situ Nan"
  },
  {
   "ep": 2,
   "kind": "technique",
   "name": "Gravity Technique",
   "note": "His first spell, from Situ Nan."
  },
  {
   "ep": 5,
   "kind": "treasure",
   "name": "Little flying sword",
   "note": "Bai Zhan's sword, bound by Blood Refining; upgraded with a grade nine weapon core (EP20)."
  },
  {
   "ep": 7,
   "kind": "technique",
   "name": "Seize Foundation art",
   "zh": "夺基大法",
   "note": "Takes another's foundation and life; used on Teng Li.",
   "wiki": "Stealing Foundation"
  },
  {
   "ep": 7,
   "kind": "scripture",
   "name": "Underworld Ascension Method",
   "zh": "黄泉升窍诀",
   "note": "Nine levels of yin cultivation and three cold cores; its ice flame drives off Liao Fan (EP80).",
   "wiki": "Underworld Ascension Method"
  },
  {
   "ep": 8,
   "kind": "treasure",
   "name": "Illusion bead",
   "note": "Makes real-looking illusions; fakes a Nascent Soul aura (EP11)."
  },
  {
   "ep": 10,
   "kind": "physique",
   "name": "Extreme Realm",
   "zh": "极境",
   "note": "Strongest at his level, capped at Nascent Soul.",
   "lostEp": 62,
   "lostNote": "refined out of his original body into a treasure",
   "wiki": "Ji Realm"
  },
  {
   "ep": 12,
   "kind": "physique",
   "name": "Ma Liang's body",
   "note": "A dead War Shrine disciple's body, after his own is destroyed (EP11).",
   "lostEp": 36,
   "lostNote": "back in his own body, rebuilt by the Ancient God's power"
  },
  {
   "ep": 13,
   "kind": "physique",
   "name": "Extreme consciousness",
   "note": "Tempered by the boundary law of the foreign battlefield."
  },
  {
   "ep": 14,
   "kind": "companion",
   "name": "Xu Liguo",
   "zh": "许立国",
   "note": "A former Nascent Soul cultivator's soul, made his devil.",
   "lostEp": 83,
   "lostNote": "taken with his flying sword by the Giant Demon ancestor",
   "cast": "xu-liguo",
   "wiki": "Xu Liguo"
  },
  {
   "ep": 16,
   "kind": "technique",
   "name": "Earth Escape Technique",
   "note": "A pseudo version from Sun Youcai; it gets him across borders.",
   "wiki": "Earth Escape Technique"
  },
  {
   "ep": 18,
   "kind": "companion",
   "name": "Li Muwan",
   "zh": "李慕婉",
   "note": "Saved from the Dual Cultivation Sect; refines his pills in the Sea of Devils.",
   "lostEp": 24,
   "lostNote": "he escorts her to the edge of the sea after four years",
   "cast": "li-muwan",
   "wiki": "Li Muwan"
  },
  {
   "ep": 19,
   "kind": "technique",
   "name": "Death spell",
   "zh": "死咒术",
   "note": "Yin, death and killing energy fused; kills with a look and a word.",
   "wiki": "Death spell"
  },
  {
   "ep": 24,
   "kind": "scripture",
   "name": "Dragon Fighting Formation jade slip",
   "note": "Li Muwan's parting gift; it saves him at the last crack into the Ancient God (EP27)."
  },
  {
   "ep": 30,
   "kind": "treasure",
   "name": "Poison King Cauldron",
   "note": "Hunchback Meng's life-bound cauldron; its green mist wipes out divine sense."
  },
  {
   "ep": 35,
   "kind": "technique",
   "name": "Spirit Snatch",
   "note": "The first layer of the Ancient God art: takes any spiritual energy as his own.",
   "wiki": "Ancient God Tactic"
  },
  {
   "ep": 36,
   "kind": "physique",
   "name": "Ancient God body, one reshaping",
   "note": "His own body, rebuilt once by Tu Si's power.",
   "lostEp": 62,
   "lostNote": "grows into a Two-Star Ancient God",
   "wiki": "Ancient God"
  },
  {
   "ep": 36,
   "kind": "scripture",
   "name": "Tu Si's memory inheritance",
   "note": "Part of an eight-star Ancient God's memory: arts, restrictions, beasts, treasures.",
   "wiki": "Tu Si"
  },
  {
   "ep": 38,
   "kind": "treasure",
   "name": "Restriction flag",
   "zh": "禁幡",
   "note": "Refined from Mojian Stone; its refining calls a Heavenly Tribulation.",
   "lostEp": 144,
   "lostNote": "sacrificed to slow the Moonwatcher",
   "wiki": "Restrictions"
  },
  {
   "ep": 39,
   "kind": "physique",
   "name": "Clone",
   "zh": "分身",
   "note": "Made with the Divine Path Art to get past the Extreme Realm's cap; his realm from here on.",
   "lostEp": 144,
   "lostNote": "its body is abandoned fleeing the Moonwatcher; the soul escapes",
   "wiki": "Divine Path"
  },
  {
   "ep": 40,
   "kind": "companion",
   "name": "Li Muwan",
   "zh": "李慕婉",
   "note": "Found again as Elder Li of the Cloud Sky Sect.",
   "lostEp": 44,
   "lostNote": "stays to run the Cloud Sky Sect for him",
   "cast": "li-muwan",
   "wiki": "Li Muwan"
  },
  {
   "ep": 45,
   "kind": "companion",
   "name": "Mosquito Beast",
   "note": "Subdued while crossing the Sea of Devils.",
   "cast": "mosquito-beast",
   "wiki": "Mosquito Beast"
  },
  {
   "ep": 54,
   "kind": "treasure",
   "name": "Killing-energy pearls",
   "note": "Four hundred years of killing energy in four pearls; one wakes him from Shi Qi's Intent (EP56)."
  },
  {
   "ep": 55,
   "kind": "treasure",
   "name": "Liming Straw Hat",
   "note": "Lent by the old man; hides his face from anyone less than two levels above him. Lent again in EP101."
  },
  {
   "ep": 60,
   "kind": "treasure",
   "name": "Rain Cauldron",
   "zh": "雨鼎",
   "note": "Zhou Wutai's gift; opens the way into the Rain Celestial Realm."
  },
  {
   "ep": 62,
   "kind": "technique",
   "name": "Life and Death Intent Realm",
   "zh": "生死意境",
   "note": "His own domain: rain born in the sky, dying on the earth.",
   "wiki": "Life and Death Domain"
  },
  {
   "ep": 62,
   "kind": "physique",
   "name": "Two-Star Ancient God",
   "note": "His original body, sunk into the planet's core.",
   "lostEp": 80,
   "lostNote": "Body Cleansing makes it a true Ancient God",
   "wiki": "Ancient God"
  },
  {
   "ep": 62,
   "kind": "treasure",
   "name": "Three sword sheaths",
   "note": "Recovered and refined with his primordial soul; one holds sealed killing intent (EP45)."
  },
  {
   "ep": 63,
   "kind": "companion",
   "name": "Thunder Toad",
   "zh": "雷蛙",
   "note": "A top-grade spirit beast taken with the Hunyuan Beast Control Ring.",
   "cast": "thunder-toad",
   "wiki": "Thunder Toad"
  },
  {
   "ep": 63,
   "kind": "treasure",
   "name": "Hunyuan Beast Control Ring",
   "note": "Subdues beasts, at a steady cost in spiritual power."
  },
  {
   "ep": 64,
   "kind": "treasure",
   "name": "Red Gold Bell",
   "note": "An ancient bell that slowly refines Hong Wen's soul."
  },
  {
   "ep": 66,
   "kind": "technique",
   "name": "Mixun Search Technique",
   "note": "The Da Lou way of dodging space cracks."
  },
  {
   "ep": 67,
   "kind": "treasure",
   "name": "God Slaying War Chariot",
   "zh": "射神车",
   "note": "Tian Bao's chariot of beast souls; he tames its smallest soul first.",
   "wiki": "God Slaying War Chariot"
  },
  {
   "ep": 70,
   "kind": "treasure",
   "name": "Zhou Yi's pagoda",
   "note": "Holds Zhou Yi's Ascendant domain; keeps death energy out of Wan'er (EP74)."
  },
  {
   "ep": 70,
   "kind": "treasure",
   "name": "Ascendant Crystal",
   "note": "Zhou Yi's crystallised insight; it guides his Ascendant breakthrough (EP121)."
  },
  {
   "ep": 70,
   "kind": "companion",
   "name": "Sun Tai",
   "note": "Zhou Yi's gift: a slave for a thousand years.",
   "lostEp": 72,
   "lostNote": "trades the rest for a thousand years of freedom",
   "cast": "sun-tai",
   "wiki": "Sun Tai"
  },
  {
   "ep": 71,
   "kind": "treasure",
   "name": "Star Compass",
   "note": "Chi Hu's teleporting compass, repaired by Wang Lin.",
   "wiki": "Star Compass"
  },
  {
   "ep": 72,
   "kind": "treasure",
   "name": "Two Rain Celestial Swords",
   "note": "Immortal swords from the Rain Celestial Realm; Xu Liguo becomes one's spirit (EP77)."
  },
  {
   "ep": 73,
   "kind": "companion",
   "name": "Li Muwan",
   "zh": "李慕婉",
   "note": "He returns to her; her lifespan is almost gone.",
   "lostEp": 76,
   "lostNote": "her body dies under Heaven's Law; her Nascent Soul survives",
   "cast": "li-muwan",
   "wiki": "Li Muwan"
  },
  {
   "ep": 77,
   "kind": "companion",
   "name": "Zhou Ru",
   "zh": "周茹",
   "note": "A newborn girl holding Wan'er's Nascent Soul; he raises her from EP80.",
   "lostEp": 92,
   "lostNote": "sent back to Chu with her memories of him erased",
   "cast": "zhou-ru",
   "wiki": "Zhou Ru"
  },
  {
   "ep": 80,
   "kind": "physique",
   "name": "True Ancient God",
   "note": "Body Cleansing with a Reincarnation Fruit.",
   "lostEp": 88,
   "lostNote": "grows a third star",
   "wiki": "Ancient God"
  },
  {
   "ep": 87,
   "kind": "treasure",
   "name": "Hundred Thousand Soul Flag",
   "zh": "魂幡",
   "note": "Won in the Soul Refining Sect, with a Qilin remnant soul as its main soul.",
   "wiki": "Soul Flag"
  },
  {
   "ep": 87,
   "kind": "technique",
   "name": "Soul Refining arts",
   "note": "Condensation, Soul Vortex, Blood Sacrifice; the Soul Sealing Technique from Dun Tian (EP88)."
  },
  {
   "ep": 88,
   "kind": "physique",
   "name": "Three-Star Ancient God",
   "note": "His real body; fused with the clone it pushes his Intent to Soul Transformation level (EP89).",
   "wiki": "Ancient God"
  },
  {
   "ep": 90,
   "kind": "companion",
   "name": "Xu Liguo",
   "zh": "许立国",
   "note": "The sword spirit turns on the Giant Demon ancestor and comes back.",
   "cast": "xu-liguo",
   "wiki": "Xu Liguo"
  },
  {
   "ep": 96,
   "kind": "treasure",
   "name": "Billion Soul Flag",
   "zh": "十亿尊魂幡",
   "note": "Dun Tian's flag of the sect's ancestors, left to him when Dun Tian joins it.",
   "wiki": "Billion Soul Flag"
  },
  {
   "ep": 97,
   "kind": "companion",
   "name": "Cao Yidou",
   "zh": "曹一斗",
   "note": "A Tian Yun primordial soul serving him for a hundred years as a guide.",
   "cast": "cao-yidou",
   "wiki": "Cao yidou"
  },
  {
   "ep": 98,
   "kind": "treasure",
   "name": "Star Symbol Illustration",
   "note": "A beast-totem scroll with sealed Forsaken Immortal ancestors; a Xiang family woman is sealed in it too (EP132)."
  },
  {
   "ep": 100,
   "kind": "treasure",
   "name": "Kunji Whip",
   "zh": "昆极鞭",
   "note": "Hongdie's last gift.",
   "lostEp": 147,
   "lostNote": "his domain is merged into it as the Karma Whip"
  },
  {
   "ep": 103,
   "kind": "treasure",
   "name": "Li Muwan's life soul",
   "note": "Won back from the Cultivation Planet Crystal with his own."
  },
  {
   "ep": 103,
   "kind": "technique",
   "name": "Three killing fingers",
   "zh": "灭世指 · 化魔指 · 黄泉指",
   "note": "Annihilation, Demon Transformation and Yellow Springs Fingers, from Situ Nan."
  },
  {
   "ep": 106,
   "kind": "technique",
   "name": "Nine Revolution Immortal Refining Law",
   "note": "Golden immortal energy, from Zhao Xinmeng with the Great Teleportation art.",
   "wiki": "Nine Cycle Celestial Refining Tactic"
  },
  {
   "ep": 108,
   "kind": "technique",
   "name": "Celestial Slaughter Art",
   "zh": "杀戮仙诀",
   "note": "From All-Seer's grey-robed second soul; makes the Life Mark.",
   "wiki": "Celestial Slaughter Art"
  },
  {
   "ep": 108,
   "kind": "treasure",
   "name": "Purple ring",
   "note": "All-Seer's ring: blocks two late Ascendant attacks, loses one per broken rule."
  },
  {
   "ep": 112,
   "kind": "companion",
   "name": "Shi San",
   "note": "His first follower in the Demon Spirit Land.",
   "lostEp": 132,
   "lostNote": "left to lead the Soul Refining Tribe",
   "cast": "shi-san",
   "wiki": "Shi San"
  },
  {
   "ep": 112,
   "kind": "companion",
   "name": "Hu Pao",
   "note": "A gifted boy he takes as personal disciple.",
   "lostEp": 115,
   "lostNote": "leaves the camp; turns up serving the Scattered Devil",
   "cast": "hu-pao",
   "wiki": "Hu Pao"
  },
  {
   "ep": 114,
   "kind": "treasure",
   "name": "Qin Lin's Immortal Palace",
   "note": "The fourth illusory abode, with its token and ten drops of immortal wine.",
   "wiki": "Qin Lin"
  },
  {
   "ep": 115,
   "kind": "treasure",
   "name": "Blood Soul Pills",
   "note": "From Yao Xixue's bags; one rebuilds his clone after it blows itself up (EP124).",
   "wiki": "Blood Soul Pill"
  },
  {
   "ep": 118,
   "kind": "treasure",
   "name": "Ling Tianhou's sword qi",
   "note": "Taken from Wei Yang; a Nirvana Cleanser's strike he saves for emergencies."
  },
  {
   "ep": 124,
   "kind": "companion",
   "name": "Scattered Devil",
   "zh": "散魔",
   "note": "Sealed in his divine soul with Bei Lou's help; he calls it out at Planet Thousand Illusion (EP138).",
   "cast": "scattered-devil",
   "wiki": "Scattered Devil"
  },
  {
   "ep": 126,
   "kind": "treasure",
   "name": "Celestial Brush",
   "zh": "点仙笔",
   "note": "Qin Lin's brush with 12 Primordial Runes.",
   "wiki": "Celestial Brush"
  },
  {
   "ep": 126,
   "kind": "treasure",
   "name": "Immortal-Binding Net",
   "note": "An Immortal Realm net, taken from Huang Yu."
  },
  {
   "ep": 126,
   "kind": "technique",
   "name": "Immobilization Technique",
   "note": "A low-grade immortal art that freezes a foe for a few breaths."
  },
  {
   "ep": 129,
   "kind": "treasure",
   "name": "Zhou Yi's immortal sword",
   "note": "A sword that answers only to him."
  },
  {
   "ep": 130,
   "kind": "treasure",
   "name": "Tidal Token",
   "note": "Key to Qin Lin's hidden cave, taken from under Tan Lang's nose."
  },
  {
   "ep": 131,
   "kind": "technique",
   "name": "Net-Severing Sword Art",
   "note": "A sword that cuts the net of rules binding all life."
  },
  {
   "ep": 131,
   "kind": "physique",
   "name": "Lightning soul",
   "note": "From devouring a fifth of the Ancient Thunder Dragon."
  },
  {
   "ep": 131,
   "kind": "treasure",
   "name": "Seven-Star Sword Formation",
   "note": "Seven of the Da Lou zodiac swords.",
   "lostEp": 144,
   "lostNote": "sacrificed against the Moonwatcher"
  },
  {
   "ep": 131,
   "kind": "companion",
   "name": "Du Jian",
   "note": "Forged into an Immortal Guard for a thousand years.",
   "cast": "du-jian"
  },
  {
   "ep": 133,
   "kind": "companion",
   "name": "Sun Tai",
   "note": "Found again on Planet Ran Yun, old and weak.",
   "lostEp": 139,
   "lostNote": "dies at peace in Moonfall Village",
   "cast": "sun-tai",
   "wiki": "Sun Tai"
  },
  {
   "ep": 138,
   "kind": "companion",
   "name": "Wang Ping",
   "zh": "王平",
   "note": "Li'er, renamed his son and raised as a mortal.",
   "lostEp": 142,
   "lostNote": "fades away; Qing Yi dies with him",
   "cast": "wang-ping",
   "wiki": "Wang Ping"
  },
  {
   "ep": 143,
   "kind": "companion",
   "name": "Second Immortal Guard",
   "note": "Lei Daozi's Illusory Yin body, forged to peak silver tier."
  },
  {
   "ep": 143,
   "kind": "technique",
   "name": "Thunder Origin Art",
   "zh": "雷元术",
   "note": "Turns lightning into origin power.",
   "wiki": "Thunder Origin Spell"
  },
  {
   "ep": 143,
   "kind": "treasure",
   "name": "Thunder Celestial Temple token",
   "note": "Lets him pass as an envoy."
  },
  {
   "ep": 144,
   "kind": "treasure",
   "name": "Moonwatcher bone",
   "zh": "望月之骨",
   "note": "Half of the Golden Flame vein bone.",
   "lostEp": 145,
   "lostNote": "absorbed by the Heaven Defying Bead"
  },
  {
   "ep": 145,
   "kind": "physique",
   "name": "Lightning body",
   "note": "A new body for his avatar, forged over sixty years."
  },
  {
   "ep": 145,
   "kind": "treasure",
   "name": "Immortal Emperor Crown",
   "zh": "仙帝冠",
   "note": "Tan Lang's crown with five Five Element pearls."
  },
  {
   "ep": 145,
   "kind": "treasure",
   "name": "Mountain and River Map copy",
   "zh": "山河图",
   "note": "A defensive folding screen, from Tan Lang's treasures."
  },
  {
   "ep": 146,
   "kind": "companion",
   "name": "Shengong Hu",
   "note": "A Thunder Celestial envoy who gives him his Dao soul and serves him.",
   "cast": "shengong-hu",
   "wiki": "Shengong Hu"
  },
  {
   "ep": 147,
   "kind": "treasure",
   "name": "Karma Whip",
   "zh": "因果昆极鞭",
   "note": "The Kunji Whip carrying his domain of karma.",
   "wiki": "Karma Whip"
  },
  {
   "ep": 148,
   "kind": "technique",
   "name": "Third Eye divine art",
   "zh": "三目神通",
   "note": "The Zhang family's art, with a hint of Third Step power."
  },
  {
   "ep": 148,
   "kind": "treasure",
   "name": "Thunder Cauldron",
   "zh": "雷鼎",
   "note": "His pass into the Thunder Celestial Realm."
  },
  {
   "ep": 149,
   "kind": "companion",
   "name": "Li Yuan",
   "note": "Last heir of the Li family; a restriction master.",
   "cast": "li-yuan",
   "wiki": "Li Yuan"
  },
  {
   "ep": 150,
   "kind": "technique",
   "name": "Eighteen Plum Restriction",
   "zh": "梅花十八禁",
   "note": "The first thirteen seals, from Li Yuan.",
   "wiki": "18 Plum Restriction"
  },
  {
   "ep": 151,
   "kind": "treasure",
   "name": "Ancient God Hide Armor",
   "note": "Armor from an Ancient God's hide; bound to his soul (EP160)."
  },
  {
   "ep": 152,
   "kind": "treasure",
   "name": "Wither Dao Pair",
   "note": "A damaged true immortal treasure.",
   "wiki": "Wither Dao Pair"
  },
  {
   "ep": 152,
   "kind": "treasure",
   "name": "Thunder Celestial Realm fragment seal",
   "note": "A fragment refined into a seal; his boat through the void cracks (EP158)."
  },
  {
   "ep": 152,
   "kind": "treasure",
   "name": "Restriction Breaking Mirror",
   "note": "Li Yuan's ancient mirror."
  },
  {
   "ep": 152,
   "kind": "treasure",
   "name": "Blood Ancestor's blood body (half)",
   "note": "A treasure from half the Blood Ancestor's blood body.",
   "lostEp": 156,
   "lostNote": "blown up against Qing Shui"
  },
  {
   "ep": 152,
   "kind": "technique",
   "name": "Earthfold Step",
   "note": "Shrinks distance to a step."
  },
  {
   "ep": 154,
   "kind": "technique",
   "name": "Call Wind",
   "note": "Bai Fan's first immortal art."
  },
  {
   "ep": 154,
   "kind": "treasure",
   "name": "Collection Pavilion",
   "note": "The whole nine-level pavilion of immortal arts."
  },
  {
   "ep": 160,
   "kind": "technique",
   "name": "Heaven Seal",
   "note": "Built from a captured sealing rune."
  },
  {
   "ep": 160,
   "kind": "treasure",
   "name": "Third God Slaying War Chariot",
   "zh": "射神车",
   "note": "Bound to his life; its soul beast is a butterfly.",
   "wiki": "God Slaying War Chariot"
  }
 ],
 "eras": [
  {
   "name": "The Ancient Clan",
   "zh": "古族",
   "note": "Born with the Heavenly Dao, it split into the Ancient Gods, Ancient Devils and Ancient Demons (EP121). Their power is counted in stars.",
   "emperors": [
    {
     "name": "Tu Si",
     "zh": "涂司",
     "legacy": "Eight-star Ancient God. His body is the Land of the Ancient God; his memory inheritance and body reshaping go to Wang Lin.",
     "wiki": "Tu Si",
     "ep": 32
    },
    {
     "name": "Tuo Sen",
     "zh": "托森",
     "legacy": "Tu Si's evil thought, ruler of the Blood Sea. Later lies shattered under Planet Suzaku and drives the Forsaken Immortal war.",
     "wiki": "Tuo Sen",
     "ep": 33
    },
    {
     "name": "Bei Lou",
     "zh": "贝罗",
     "legacy": "Ancient Demon of Sky Demon Country. Saves Wang Lin at his Ascendant tribulation; devours the Fire Demon.",
     "wiki": "Bei Lou",
     "ep": 121
    },
    {
     "name": "Fire Demon",
     "zh": "",
     "legacy": "The Ancient Demon fragment under Fire Demon Country, unmoved for millions of years.",
     "ep": 127
    },
    {
     "name": "Scattered Devil",
     "zh": "散魔",
     "legacy": "One of nine Scattered Devils serving another Ancient. Ends up sealed in Wang Lin's soul.",
     "wiki": "Scattered Devil",
     "ep": 116
    },
    {
     "name": "Eight-star Ancient God of the murals",
     "zh": "",
     "legacy": "Fought the immortals of the Thunder Celestial Realm, painted in an ancient residence (EP151).",
     "wiki": "Eight Star",
     "ep": 151
    }
   ]
  },
  {
   "name": "The Celestial Realms",
   "zh": "仙界",
   "note": "One great immortal realm, later four: Wind, Rain, Thunder, Lightning. A giant palm smashed it (EP64); its last Emperor went mad watching something in the sky (EP151).",
   "emperors": [
    {
     "name": "Qin Lin",
     "zh": "青霖",
     "legacy": "Celestial Emperor, strongest of the Celestial Realm. The Demon Spirit Land was his abode; his daughter Qing Shuang ruled the Rain Celestial Realm.",
     "wiki": "Qin Lin",
     "ep": 114
    },
    {
     "name": "Qing Shuang",
     "zh": "青霜",
     "legacy": "Immortal Lord of the Rain Celestial Realm. Zhou Yi loved her corpse as Ting'er.",
     "wiki": "Ting'er",
     "ep": 69
    },
    {
     "name": "Bai Fan",
     "zh": "白凡",
     "legacy": "Immortal Emperor of the Thunder Celestial Realm, early Nirvana Void. Creator of six great arts, the first of them Call Wind.",
     "wiki": "Bai Fan",
     "ep": 154
    },
    {
     "name": "Xiaoyao Zi",
     "zh": "逍遥子",
     "legacy": "Ninth Grade Immortal King. Owner of the Wither Dao Pair; set the Chosen Immortal Clan to guard the Xuanyin Tripod.",
     "wiki": "Celestial King Carefree",
     "ep": 154
    },
    {
     "name": "Gu Ziyuan",
     "zh": "",
     "legacy": "Immortal King and general of the Thunder Celestial Realm; his sword became a mountain.",
     "wiki": "Gu Ziyuan",
     "ep": 150
    },
    {
     "name": "Qing Shui",
     "zh": "清水",
     "legacy": "Crown Prince of Qing Shui Country, Bai Fan's disciple, Immortal Lord. Cut himself apart and slept through the fall; wakes in EP155.",
     "wiki": "Qing Shui",
     "ep": 154
    },
    {
     "name": "Ancient Celestial Emperor",
     "zh": "",
     "legacy": "The Seven-Colored Celestial Sovereign of the novel, behind the Heaven Defying Bead.",
     "wiki": "Ancient Celestial Emperor",
     "ep": NOVEL
    }
   ]
  },
  {
   "name": "The Suzaku line",
   "zh": "朱雀",
   "note": "The holders of the Suzaku title who rule Planet Suzaku for the Cultivation Alliance.",
   "emperors": [
    {
     "name": "Ye Wuyou",
     "zh": "叶无忧",
     "legacy": "First Suzaku. Sealed the Forsaken Immortal Clan with nine Ascendants; his image offers Wang Lin the title (EP102).",
     "wiki": "Ye Wuyou",
     "ep": 96
    },
    {
     "name": "Situ Nan",
     "zh": "司徒南",
     "legacy": "Second Suzaku, the strongest man of his age. Killed over the Heaven Defying Bead; lives on in it.",
     "wiki": "Situ Nan",
     "ep": 1
    },
    {
     "name": "Qian Pinghai",
     "zh": "",
     "legacy": "Master of Zhu Quezi and Yun Quezi; his body was sold to the Corpse Yin Sect.",
     "wiki": "Qian Pinghai",
     "ep": 98
    },
    {
     "name": "Zhu Quezi",
     "zh": "朱雀子",
     "legacy": "Fourteenth Suzaku, Ascendant great perfection; uses cultivators as furnaces.",
     "wiki": "Zhu Quezi",
     "ep": 81
    },
    {
     "name": "Zhou Wutai",
     "zh": "",
     "legacy": "Fifteenth Suzaku, by Wang Lin's hand (EP103).",
     "wiki": "Zhou Wutai",
     "ep": 56
    }
   ]
  },
  {
   "name": "Masters of the Second Step",
   "zh": "",
   "note": "The old powers around Planet Tian Yun and Allheaven, between Ascendant and the Third Step.",
   "emperors": [
    {
     "name": "All-Seer",
     "zh": "天运子",
     "legacy": "Master of the Heavenly Fate Sect, 10,000 years old; devours his own disciples through a mark (EP131).",
     "wiki": "All-Seer",
     "ep": 57
    },
    {
     "name": "Ling Tianhou",
     "zh": "",
     "legacy": "Sword Saint of the Da Lou Sword Sect, late Nirvana Cleanser.",
     "wiki": "Ling Tianhou",
     "ep": 71
    },
    {
     "name": "Blood Ancestor",
     "zh": "血祖",
     "legacy": "Nirvana Cleanser, father of Yao Xixue. Hunts Wang Lin in the Thunder Celestial Realm.",
     "wiki": "Blood Ancestor",
     "ep": 109
    },
    {
     "name": "Tan Lang",
     "zh": "",
     "legacy": "Fallen from Illusory Yin; helped kill Situ Nan, then chased Wang Lin into Allheaven.",
     "wiki": "Tan Lang",
     "ep": 109
    },
    {
     "name": "Yan Leizi",
     "zh": "",
     "legacy": "Nirvana Shatterer who planned for tens of thousands of years to refine the Thunder Celestial Realm into a treasure.",
     "wiki": "Yan Lei Zi",
     "ep": 148
    }
   ]
  }
 ],
 "zones": [
  {
   "name": "Foreign battlefield",
   "subs": "extraterritorial battlefield, Outer Region Battlefield",
   "zh": "域外战场",
   "ep": 9,
   "master": "Soul Swallowers, and a black-silk boundary law that kills wandering spirits",
   "masterEp": 12,
   "text": "A rift space between life and death, opened from Zhao every five hundred years. Three hundred years inside are three years outside. He drifts there as a Soul Swallower (EP12–13) and comes out with Extreme consciousness."
  },
  {
   "name": "Sea of Devils",
   "subs": "Demon Cultivation Sea",
   "zh": "修魔海",
   "ep": 18,
   "master": "Demonic cultivators and the lords of its ten great cities, like Duanmu Ji",
   "masterEp": 25,
   "text": "Fog instead of water, 998 cities, few spirit veins and murder as daily life. Criminals of higher countries flee here. Wang Lin forms his core here and runs one of its sects."
  },
  {
   "name": "Land of the Ancient God",
   "zh": "古神之地",
   "ep": 26,
   "master": "Tuo Sen, the evil thought of Tu Si",
   "masterEp": 33,
   "text": "The body of an Ancient God hidden in the Chaotic Broken Stars, with three trials: the hurricanes, the Forbidden Mountain, the Dead Space. Whoever dies inside becomes Tuo Sen's puppet in the Blood Sea. The memory inheritance waits in the Dead Sea."
  },
  {
   "name": "Rain Celestial Realm",
   "subs": "Rain Immortal Realm",
   "zh": "雨之仙界",
   "ep": 58,
   "master": "The void beast Xu, and immortal-beast food swarming the ruins",
   "masterEp": 65,
   "text": "Shards of a realm crushed by one palm. Space cracks, overlapping fragments, almost no immortal energy left. The Da Lou Sword Sect has milked one store for 3,000 years."
  },
  {
   "name": "Land of the Forsaken Immortals",
   "zh": "",
   "ep": 77,
   "master": "Forsaken Immortal shamans, up to Mu Ye at seven leaves",
   "masterEp": 79,
   "text": "Levels under Planet Suzaku where the planet's first people survived. Rune seeds turn intruders into puppets. The Reincarnation Tree on the third level bears fruit only when lives are spent."
  },
  {
   "name": "Suzaku Tomb",
   "subs": "Vermilion Bird Tomb",
   "zh": "朱雀墓",
   "ep": 98,
   "master": "Zhu Quezi, holding the Cultivation Planet Heart; under the planet, Tuo Sen",
   "masterEp": 101,
   "text": "A world inside the Cultivation Planet Crystal, opened as a game: everyone below Ascendant goes in to win back their life soul before the Heart is destroyed. Each grain of its scorched land is a soul fragment."
  },
  {
   "name": "Demon Spirit Land",
   "subs": "Land of Demonic Spirits",
   "zh": "妖灵之地",
   "ep": 106,
   "master": "Nine fragments of the Ancient Demons, each under a demon country",
   "masterEp": 121,
   "text": "Qin Lin's old abode. Its gate opens from Tian Yun's East Sea. Nobody above Ascendant may enter. Immortal energy is thin; the land runs on demon power and spirit crystals, and its spirits hunt on the Night of the Haunting."
  },
  {
   "name": "Tidal Abyss",
   "zh": "",
   "ep": 109,
   "master": "Ling Tianhou's seal; Tan Lang and his Ancient Thunder Dragon",
   "masterEp": 128,
   "text": "A canyon that collapses every 5,000 years and swallows treasures and beasts. Its violet fog eats consciousness. Zhou Yi's sword spirit is sealed at the bottom, and the Tidal Token hides there."
  },
  {
   "name": "Planet Yun Xia",
   "zh": "云霞星",
   "ep": 135,
   "master": "A sleeping Moonwatcher",
   "masterEp": 136,
   "text": "A dead planet that is really a Moonwatcher, a parasite of the Ancient Gods. Its bones are the Golden Flame vein. Its words shatter the sky; it stops only at the edge of the Southern Domain (EP144)."
  },
  {
   "name": "Thunder Celestial Realm",
   "subs": "Thunder Immortal Realm",
   "zh": "雷之仙界",
   "ep": 132,
   "master": "Thunder Celestial Temple envoys, Yan Leizi, and the sealed Immortal Lord Qing Shui",
   "masterEp": 155,
   "text": "Ascendant and below only, and no power above early Nirvana Scryer works inside. Immortal corpses, origin energy, living traps. In EP157 it is refined into a treasure and falls apart."
  },
  {
   "name": "Fog land of Western Allheaven",
   "zh": "",
   "ep": 159,
   "master": "The Xuanyin Tripod and its fog beasts",
   "masterEp": 160,
   "text": "Living fog inside a giant beast that is itself a restriction formation. The fog beasts copy the arts of whoever fights them. The clan that guards the tripod is guarding its own killer."
  }
 ],
 "terms": [
  [
   "Qi Condensation",
   "凝气",
   "",
   "Qi Refining",
   2
  ],
  [
   "Foundation Establishment",
   "筑基",
   "foundation building",
   "Foundation Building",
   2
  ],
  [
   "Core Formation",
   "结丹",
   "golden core formation",
   "Golden Core, Dan Formation",
   2
  ],
  [
   "Nascent Soul",
   "元婴",
   "",
   "Primordial Infant",
   2
  ],
  [
   "Soul Formation",
   "化神",
   "deity transformation",
   "Deity Transformation, Spirit Transformation",
   2
  ],
  [
   "Soul Transformation",
   "婴变",
   "infant transformation",
   "Infant Transformation",
   2
  ],
  [
   "Ascendant",
   "问鼎",
   "Wending",
   "Wen Ding",
   2
  ],
  [
   "Illusory Yin",
   "阴虚",
   "Yin Void, Yin Deficiency",
   "Yin Emptiness",
   103
  ],
  [
   "Corporeal Yang",
   "阳实",
   "Yang Solidity, Yang reality",
   "Yang Solid",
   103
  ],
  [
   "Nirvana Scryer",
   "窥涅",
   "Insight Nirvana, Nirvana Glimpse",
   "Nirvana Peeker",
   103
  ],
  [
   "Nirvana Cleanser",
   "净涅",
   "Purification Nirvana",
   "Nirvana Purifier",
   71
  ],
  [
   "Nirvana Shatterer",
   "碎涅",
   "Shattered Nirvana",
   "Nirvana Breaker",
   103
  ],
  [
   "Nirvana Void",
   "空涅",
   "",
   "Spatial Nirvana",
   154
  ],
  [
   "Heaven Trampling",
   "踏天",
   "",
   "",
   NOVEL
  ],
  [
   "False Core",
   "假丹",
   "false elixir",
   "Fake Core",
   18
  ],
  [
   "False Nascent Soul",
   "假婴",
   "",
   "Phantom Infant",
   23
  ],
  [
   "Great perfection",
   "大圆满",
   "",
   "Great Circle, peak",
   5
  ],
  [
   "Three steps of cultivation",
   "",
   "",
   "First Step, Second Step, Third Step",
   106
  ],
  [
   "Spiritual root",
   "灵根",
   "",
   "Spirit root",
   1
  ],
  [
   "Divine sense",
   "神识",
   "divine consciousness",
   "Spiritual sense",
   4
  ],
  [
   "Primordial soul",
   "元神",
   "primordial spirit",
   "Origin Soul",
   37
  ],
  [
   "Soul blood",
   "",
   "",
   "Soul essence blood",
   5
  ],
  [
   "Life soul",
   "",
   "Life Soul",
   "",
   96
  ],
  [
   "Dao heart",
   "道心",
   "Taoist heart",
   "",
   65
  ],
  [
   "Intent Realm",
   "意境",
   "artistic conception, domain",
   "Domain, Intent Domain",
   53
  ],
  [
   "Extreme Realm",
   "极境",
   "extreme state, extreme realm",
   "Ji Realm, Extreme Point",
   10
  ],
  [
   "Heavenly Tribulation",
   "天劫",
   "",
   "Heaven's Trial",
   38
  ],
  [
   "Heavenly Dao",
   "天道",
   "way of heaven",
   "Heaven's Law, Heavenly Will",
   76
  ],
  [
   "Heaven's Wrath",
   "",
   "Heavenly Punishment",
   "Second punishment",
   121
  ],
  [
   "Reverse cultivation",
   "逆修",
   "",
   "Cultivating against heaven",
   119
  ],
  [
   "Karma",
   "因果",
   "cause and effect",
   "",
   135
  ],
  [
   "Immortal energy",
   "仙气",
   "fairy energy",
   "Celestial energy",
   58
  ],
  [
   "Golden immortal energy",
   "",
   "Golden Immortal power",
   "",
   106
  ],
  [
   "Immortal jade",
   "仙玉",
   "fairy jade",
   "Celestial jade, immortal stone",
   66
  ],
  [
   "Spirit stone",
   "灵石",
   "",
   "",
   15
  ],
  [
   "Origin power",
   "元力",
   "",
   "Primordial power",
   142
  ],
  [
   "Primordial Qi",
   "",
   "",
   "",
   121
  ],
  [
   "Ascendant Crystal",
   "",
   "Crystal of Aspiration",
   "",
   70
  ],
  [
   "Ancient God",
   "古神",
   "ancient god",
   "",
   26
  ],
  [
   "Ancient God stars",
   "",
   "star ancient god",
   "",
   32
  ],
  [
   "Body reshaping",
   "",
   "",
   "Reconfiguration",
   36
  ],
  [
   "Body Cleansing",
   "",
   "",
   "",
   77
  ],
  [
   "Ancient Demon",
   "古妖",
   "",
   "",
   121
  ],
  [
   "Ancient Devil",
   "古魔",
   "",
   "",
   121
  ],
  [
   "Gu clan",
   "",
   "Ancient Clan",
   "",
   121
  ],
  [
   "Soul Devourer",
   "",
   "soul eater, soul swallower",
   "Soul Swallower",
   12
  ],
  [
   "Devil (soul servant)",
   "魔头",
   "devil",
   "Demon head",
   14
  ],
  [
   "Corpse puppet",
   "尸傀",
   "",
   "Corpse king",
   5
  ],
  [
   "Restriction",
   "禁制",
   "prohibition, ban",
   "",
   30
  ],
  [
   "Restriction flag",
   "禁幡",
   "forbidden flag, forbidden banner",
   "Seal Flag",
   32
  ],
  [
   "Void level",
   "",
   "",
   "Abstract grade",
   150
  ],
  [
   "Soul Flag",
   "魂幡",
   "",
   "Soul Banner",
   10
  ],
  [
   "Clone",
   "分身",
   "clone, avatar",
   "Avatar",
   26
  ],
  [
   "Core Treasure",
   "丹宝",
   "Danbao",
   "",
   5
  ],
  [
   "Life-bound treasure",
   "",
   "life-bound",
   "Natal treasure",
   29
  ],
  [
   "Immortal Guard",
   "仙卫",
   "",
   "Celestial Guard",
   125
  ],
  [
   "Cultivation country",
   "修真国",
   "",
   "",
   9
  ],
  [
   "Cultivation furnace",
   "炉鼎",
   "",
   "Cauldron",
   21
  ],
  [
   "Cultivation Planet Crystal",
   "修星之晶",
   "Cultivation Star Crystal",
   "Star Cultivation Crystal",
   53
  ],
  [
   "Leaf ranks",
   "",
   "Three Leaf Savage",
   "",
   77
  ],
  [
   "Demon power armour",
   "甲",
   "",
   "Armor",
   111
  ],
  [
   "Enlightened One",
   "",
   "Great Enlightened One",
   "",
   32
  ],
  [
   "Immortal",
   "仙",
   "fairy, immortal",
   "Celestial",
   58
  ],
  [
   "Immortal art",
   "仙术",
   "",
   "Celestial spell",
   105
  ],
  [
   "Celestial Realm",
   "仙界",
   "Immortal Realm, fairyland",
   "",
   58
  ],
  [
   "Four Celestial Realms",
   "",
   "",
   "Wind, Rain, Thunder, Lightning",
   58
  ],
  [
   "Immortal Emperor",
   "仙帝",
   "",
   "Celestial Emperor",
   126
  ],
  [
   "Immortal King",
   "仙王",
   "",
   "Celestial King",
   64
  ],
  [
   "Immortal Lord",
   "仙尊",
   "",
   "Celestial Lord",
   126
  ],
  [
   "Star system",
   "星域",
   "Star Domain",
   "Star region",
   103
  ],
  [
   "Allheaven Stone",
   "",
   "Cosmic Stone",
   "",
   132
  ],
  [
   "Moonwatcher",
   "望月",
   "",
   "Moongazer",
   136
  ],
  [
   "Heaven Defying Bead",
   "天逆珠",
   "Tian Ni Pearl",
   "Secret Heavenly Pearl, Fatebreaker Pearl",
   1
  ],
  [
   "God Slaying War Chariot",
   "射神车",
   "God Shooting Chariot",
   "",
   67
  ],
  [
   "Primordial Mystic Spirit",
   "太古玄灵",
   "",
   "",
   110
  ],
  [
   "Night of the Haunting",
   "",
   "",
   "",
   110
  ],
  [
   "Seven Heavenly Fated Disciples",
   "",
   "Seven Sons of Heavenly Fortune",
   "Seven Destiny Sons",
   104
  ],
  [
   "Commander-in-Chief",
   "帅",
   "Marshal",
   "",
   116
  ],
  [
   "Yellow Springs",
   "黄泉",
   "",
   "Netherworld, Underworld",
   80
  ],
  [
   "Teleportation array",
   "传送阵",
   "",
   "Teleportation formation",
   15
  ],
  [
   "Spirit vein",
   "灵脉",
   "spiritual vein",
   "",
   17
  ]
 ],
 "secrets": [],
 "methods": [],
 "beadBasics": [
  {
   "name": "Heaven Defying Bead",
   "zh": "天逆珠",
   "ep": 1,
   "wiki": "Heaven Defying Bead",
   "text": "One of the three great treasures of the Cangwu Dao Realm. It chose Wang Lin, a boy whose spiritual roots failed the test, and gives him spirit water, a place to train and a place to hide. In EP96 he says it has merged with his consciousness and cannot be taken out."
  },
  {
   "name": "Heaven Defying space",
   "zh": "天逆空间",
   "ep": 2,
   "text": "The space inside the bead, where Wang Lin first meets Situ Nan in a dream. Until EP60 one hour outside was ten hours inside. A stay is limited: when its light is used up he must wait three days outside before going back in."
  },
  {
   "name": "The five elements",
   "zh": "五行",
   "ep": 2,
   "text": "The bead grows by taking in the five elements: water from dew (EP2), fire from the fire beast king (EP16), earth from Hongdie's earth spirit (EP60), wood from a curse rune and a wood spirit (EP79, EP88), and metal from a Moongazer bone (EP145). Only when all five are complete can it take Wang Lin as its master."
  },
  {
   "name": "Hunted for it",
   "zh": "",
   "ep": 52,
   "text": "Whoever holds the bead is hunted. Lin Yi offers to spare Wang Lin in exchange for it (EP52), the Giant Demon ancestor wants his body so he can trade the bead to the Cultivation Alliance (EP83), and the Alliance once surrounded Situ Nan, the second Suzaku, over its bounty (EP109)."
  }
 ],
 "beadPowers": [
  {
   "ep": 1,
   "title": "Situ Nan's treasure",
   "wiki": "Situ Nan",
   "text": "Long ago Situ Nan, the strongest man of the Vermilion Bird country, claims the bead. Experts from outside the realm gang up on him for it, and as his body is destroyed he vows to return when the destined one appears."
  },
  {
   "ep": 2,
   "title": "The dream space and Situ Nan",
   "wiki": "Heaven Defying Bead",
   "text": "When Wang Lin throws himself off a cliff, the bead pulls him into its dream space. Situ Nan's soul has been trapped there for 1,000 years; he tries to take Wang Lin's body and cannot."
  },
  {
   "ep": 2,
   "title": "Spirit water and dew",
   "text": "Water soaked in the bead heals Wang Lin. Dew, the essence of water, upgrades the bead's water attribute, and the clouds on the bead grow brighter."
  },
  {
   "ep": 2,
   "title": "Ten hours inside, one hour outside",
   "text": "Situ Nan explains that time in the bead's space runs ten times faster than outside, so Wang Lin can practise far longer than his days allow. He reaches level 1 Qi Condensation this way."
  },
  {
   "ep": 8,
   "title": "Situ Nan sleeps",
   "text": "Situ Nan has spent too much of his Nascent Soul essence teleporting Wang Lin away from Teng Li, and falls into a deep sleep inside the bead."
  },
  {
   "ep": 11,
   "title": "A last thread of consciousness",
   "text": "As Wang Lin's body is destroyed by the souls in the Soul Flag, Situ Nan wakes and uses the last of his soul power to send Wang Lin's last thread of consciousness into the foreign battlefield, then sleeps again."
  },
  {
   "ep": 14,
   "title": "It follows his soul",
   "text": "In Ma Liang's body, Wang Lin's Extreme consciousness wakes the bead and his little sword in his sea of consciousness. The bead came with his soul, not with his old body."
  },
  {
   "ep": 16,
   "title": "Fire: the fire beast king",
   "text": "In a volcano the bead reacts to a fireball, the weakened fire beast king (EP15), and swallows it in one breath. Fire is now complete beside water; wood is at half, and metal and earth are still missing."
  },
  {
   "ep": 25,
   "title": "A hiding place with a limit",
   "text": "Wang Lin hides inside the bead from Duanmu Ji's divine-sense lock over Xuan Wu. Situ Nan warns that once the space's light is used up and it turns black, he must stay out for three days before he can come back in. After three years Duanmu Ji catches him."
  },
  {
   "ep": 60,
   "title": "Earth: Hongdie's earth spirit",
   "text": "Wang Lin goes after the wounded earth spirit of Hongdie's Five Spirits Body (EP59), and the bead absorbs it, which keeps him alive when the Four Faction Alliance falls. Five years later the earth attribute is complete."
  },
  {
   "ep": 60,
   "title": "The time difference ends",
   "text": "With earth complete and Life and Death grasped, the bead's time reversal ends: time inside now runs the same as outside. Wang Lin senses a power in it he has not found yet, which he expects to show only when all five elements are complete and the bead truly takes him as master."
  },
  {
   "ep": 79,
   "title": "Wood: a curse rune",
   "text": "The seven-leaf curse master Mu Ye plants a rune seed in Wang Lin's forehead to turn him into a rune puppet. Because the rune is wood, the bead can absorb it, and it takes in the rune's wood essence and frees him."
  },
  {
   "ep": 80,
   "title": "Situ Nan wakes",
   "text": "Situ Nan wakes and drives off Liao Fan of the Snow Region with the cold fire of the Underworld Ascension Method."
  },
  {
   "ep": 88,
   "title": "Only metal left",
   "text": "Once the wood spirit Wang Lin has taken in is absorbed, the bead lacks only metal to be complete."
  },
  {
   "ep": 96,
   "title": "Situ Nan leaves the bead",
   "wiki": "Situ Nan",
   "text": "Situ Nan drives off Zhu Quezi through Wang Lin, then seizes the Demon Child body of a young Forsaken Immortal pursuer. Wang Lin tells him the bead has merged with his consciousness and he does not know how to take it out, and Situ Nan lets him keep it."
  },
  {
   "ep": 102,
   "title": "Hiding from Tuo Sen",
   "wiki": "Tuo Sen",
   "text": "Cornered by Tuo Sen's avatar, Wang Lin blows up the souls in his Soul Flag and hides in the Heaven Defying space until a Cultivation Alliance envoy seals Tuo Sen."
  },
  {
   "ep": 132,
   "title": "Where the bead came from",
   "text": "The woman sealed in Wang Lin's scroll says the bead first appeared in the Allheaven Star System, where every top cultivator sensed the aura of the ancient Immortal Domain, before it turned up in the Rain Celestial Realm. She claims her family, the Xiang family of Planet Dong Lin, can revive the remnant soul inside it."
  },
  {
   "ep": 135,
   "title": "Metal: the Golden Flame vein",
   "text": "Loot from the Huan clan tells of an intact Golden Flame vein on Planet Yun Xia, the metal the bead still needs. In EP136 Wang Lin finds the whole planet is a sleeping Moongazer whose skeleton is that vein, so digging would wake it."
  },
  {
   "ep": 144,
   "title": "The Moongazer bone",
   "wiki": "Moongazer Serpent",
   "text": "Wang Lin numbs the Moongazer with Celestial Ascension Fruits and tears out one of its bones with Netherworld Force. The beast wakes, and he escapes only by abandoning his body and fleeing as a soul."
  },
  {
   "ep": 145,
   "title": "Complete, and a gate",
   "wiki": "Heaven Defying Bead",
   "text": "The bead slowly absorbs the Moongazer bone, and three months later all five elements are complete. When Wang Lin claims it as master, a huge gate and a sky-piercing arm appear; he refuses to kneel, but the arm's Law power forces him back."
  },
  {
   "ep": 145,
   "title": "Through the gate",
   "text": "Wang Lin refines origin power in the Southern Domain's Thunder Pool and uses it to call the gate back. Inside the Heaven Defying space he sees an old figure teaching the Dao, and grasps that at the end of seeking the Dao one finds oneself."
  }
 ],
 "restrictions": [
  {
   "ep": 30,
   "title": "What a restriction is",
   "zh": "禁制",
   "wiki": "Restrictions",
   "text": "Before the Forbidden Mountain, a flashback shows the disciple Yi'er being taught that restrictions are a flexible kind of formation, broken either by force or by study."
  },
  {
   "ep": 31,
   "title": "Breaking restrictions with divine sense",
   "zh": "",
   "text": "On the Forbidden Mountain Wang Lin follows the Six Desire Devil Lord, a restriction master of a thousand years, and tests each restriction on Xu Liguo, since breaking them by force would kill a Core Formation cultivator. After seven years he finds the formation eyes are made of divine sense and learns to break restrictions with divine sense instead of spirit energy."
  },
  {
   "ep": 32,
   "title": "The fourth Enlightened One",
   "zh": "",
   "wiki": "Enlightened Ones",
   "text": "Wang Lin sets chains of restrictions so that Duanmu Ji blames the Six Desire Devil Lord, then sets off the mountain's final restriction on both. Alone, he spends three years breaking every restriction on the mountain, and the Ancient God Tu Si names him the fourth Enlightened One and gives him a jade slip on making restriction flags and a piece of Mojian Stone."
  },
  {
   "ep": 36,
   "title": "Ancient God restrictions on borrowed treasures",
   "zh": "",
   "text": "Wang Lin had secretly placed Ancient God restrictions on the life-bound treasures the eleven prisoners gave him as a guarantee. When they turn on him, their treasures will not answer them."
  },
  {
   "ep": 37,
   "title": "A restriction on Mo Yun",
   "zh": "",
   "text": "He places an ancient restriction on Mo Yun of the Qihuang Sect that flares every three days. In EP38 Qiu Siping recognises it and uses it to lure out the man who set it."
  },
  {
   "ep": 38,
   "title": "The first restriction flag",
   "zh": "禁幡",
   "text": "Wang Lin opens a restricted ancient cave whose formation is held up by a giant python's own spirit power. Refining his first restriction flag then calls down a Heavenly Tribulation that nearly shatters his golden core."
  },
  {
   "ep": 42,
   "title": "The flag in the Scripture Pavilion",
   "zh": "",
   "text": "He takes the furnace talisman from the top floor of the Cloud Sky Sect's Scripture Pavilion with his restriction flag, holding off the guardian elder Lu Fei."
  },
  {
   "ep": 44,
   "title": "Breaking the Cloud Sky Great Formation",
   "zh": "",
   "text": "Trapped by the Cloud Sky Sect's founding ancestors in their Great Formation, Wang Lin breaks it with an Ancient God restriction and the ancestors fall."
  },
  {
   "ep": 48,
   "title": "The Ten Thousand Swords restriction",
   "zh": "",
   "text": "He breaks Wufeng Valley's Five Sword Light Formation with his Ten Thousand Swords restriction."
  },
  {
   "ep": 50,
   "title": "Freezing the Black Mire",
   "zh": "",
   "text": "Teng Yi survives the Black Dragon and Ten Thousand Swords restrictions and keeps reforming from the swamp of stolen spiritual roots. Wang Lin freezes the whole mire with the Nether Sealing Demon restriction he had laid in advance."
  },
  {
   "ep": 60,
   "title": "A tribulation through the flag",
   "zh": "",
   "text": "Chased by the Snow Region elder Lian Ning, Wang Lin kills him with a heavenly tribulation called through his restriction flag, and turns down Ou Zhi's request to call another."
  },
  {
   "ep": 63,
   "title": "Refining the flag inside Tuo Sen",
   "zh": "",
   "wiki": "Land of the Ancient God",
   "text": "To refine the flag again without a tribulation, he does it inside Tuo Sen's body in the Land of the Ancient God, betting heaven cannot reach there. The bet pays off, and the flag ends one step short of medium success."
  },
  {
   "ep": 76,
   "title": "Restrictions against Heaven's Law",
   "zh": "",
   "text": "Wang Lin spends three years laying restrictions in the valley where Li Muwan will form her Nascent Soul, to face the tribulation Heaven's Law will send."
  },
  {
   "ep": 86,
   "title": "The Ancient Soul Restriction",
   "zh": "上古魂禁",
   "wiki": "Ancient Soul Restriction",
   "text": "In the Soul Refining Sect's main spirit vein he breaks into an Ancient Soul Restriction, which uses souls as the restriction and is many times stronger than an ordinary one. Inside it he learns the Soul Refining Peak's three soul arts: Condensation, Soul Vortex and Blood Sacrifice (EP87)."
  },
  {
   "ep": 105,
   "title": "Eighteen restrictions for a sword",
   "zh": "",
   "text": "The Seventh Elder Master senses Zhou Yi's sword aura on Wang Lin's flying sword and trades him for it a jade slip of eighteen restrictions that make any flying sword several times stronger."
  },
  {
   "ep": 114,
   "title": "The Eighteen Plum Blossom Restriction",
   "zh": "梅花十八禁",
   "wiki": "18 Plum Restriction",
   "text": "Celestial Emperor Qin Lin's jade palace in the Demon Spirit Land is held shut by the Eighteen Plum Blossom Restriction. Inside, Wang Lin finds a jar holding ten drops of immortal wine."
  },
  {
   "ep": 115,
   "title": "A trap on the Blood Ancestor's array",
   "zh": "",
   "text": "Before leaving the immortal palace, he sets restrictions on the Blood Ancestor's new teleport array."
  },
  {
   "ep": 133,
   "title": "Forged treasures",
   "zh": "",
   "text": "On Planet Ran Yun Wang Lin hides his face with a restriction and carves imitation ancient restrictions into fake pseudo-immortal treasures, which only someone far better at restrictions could see through. Sun Tai, now a shop manager, recognises the work at once."
  },
  {
   "ep": 144,
   "title": "Losing the Restriction Flag",
   "zh": "禁幡",
   "text": "To slow the waking Moongazer, Wang Lin sacrifices the Restriction Flag that has followed him for over 900 years, along with the Seven-Star Sword Formation."
  },
  {
   "ep": 149,
   "title": "The Annihilation Restriction",
   "zh": "破灭禁",
   "wiki": "Annihilation Restriction",
   "text": "In the Thunder Celestial Realm Wang Lin sees that an immortal trap is the Eighteen Plum Restriction and that Li Yuan built it. The graveyard's sword mountain is made of the Annihilation Restriction, and Li Yuan has been carving the Heart Illusion Restriction (幻心禁) into Ge Hong's mind so that she will trust him."
  },
  {
   "ep": 150,
   "title": "The Void level and the Four Great Restrictions",
   "zh": "虚境",
   "text": "Li Yuan gives Wang Lin the first thirteen restrictions of the Eighteen Plum Restriction. He explains that above the four known ranks of restrictions lies a fifth level, the Void level, divided into four great ancient restrictions, of which the Annihilation Restriction is one; whoever grasps them can make any restriction answer their will."
  },
  {
   "ep": 152,
   "title": "Eight linked seals and a mirror",
   "zh": "",
   "wiki": "Wither Dao Pair",
   "text": "Wang Lin breaks eight linked seals hidden between immortal swords and a beast bone to claim the Wither Dao Pair. Li Yuan gives him an ancient Restriction Breaking Mirror for breaking restrictions quickly."
  },
  {
   "ep": 153,
   "title": "Into the Collection Pavilion",
   "zh": "",
   "text": "At the centre of the Thunder Celestial Realm, Li Yuan finds the hidden restriction of the Collection Pavilion and uses his Heart Restriction to send Wang Lin inside."
  },
  {
   "ep": 158,
   "title": "Reviving a dead formation",
   "zh": "",
   "text": "With the Thunder Celestial Temple's teleportation formation wrecked, Li Yuan uses his family's restriction art, which can revive dead formations, to power it once and get the survivors out."
  },
  {
   "ep": 160,
   "title": "A beast that is a restriction",
   "zh": "",
   "text": "Wang Lin works out that the Chosen Immortal Clan live inside the belly of a giant beast that is itself a great restriction formation, with the fog as its source and the formation's eye where the fog comes out."
  }
 ],
 "domains": [
  {
   "name": "Life and Death",
   "zh": "生死意境",
   "ep": 62,
   "wiki": "Life and Death Domain",
   "text": "After thirty years as a mortal Wang Lin grasps that death is himself and life is also himself (EP58). Sheltering from rain in a temple, he finds his Intent Realm: rain is born in the sky and dies on the earth, and the fall between is a life. It reaches a second level as the Celestial dies (EP72), Soul Transformation level once he adds Ancient God power (EP89), great perfection when he loses Wan'er again (EP92), and Ascendant great perfection by EP142.",
   "holders": "Wang Lin. Liu Mei tries to devour it in EP99."
  },
  {
   "name": "Slaughter",
   "zh": "杀戮",
   "ep": 108,
   "wiki": "Celestial Slaughter Art",
   "text": "The grey-robed man in All-Seer's Seven-Coloured Space gives Wang Lin the Celestial Slaughter Art (杀戮仙诀), which turns killing intent into a defensive Life Mark. In the Slaughter Blood Pool he sees that slaughter is really a cycle of life and death and refines 3,792 strands of killing intent (EP117). The Ancient Demon inheritance shows him the finished art would turn him into a strand of slaughter aura (EP127), and he wipes out over a million strands in EP131.",
   "holders": "Wang Lin; the grey-robed man, All-Seer's second divine soul. Zhang Zhen gets a flawed copy (EP148)."
  },
  {
   "name": "Defying heaven (reverse cultivation)",
   "zh": "",
   "ep": 119,
   "text": "At the Demon General Tournament Wang Lin decides every step he has taken since Qi Condensation came from defiance, and that cultivating against heaven is his road to Ascendant. At the Demonic Battle Drum he refuses to cut his emotional ties, and survives the tribulation that follows by turning his immortal power into demonic energy (EP120-121).",
   "holders": "Wang Lin."
  },
  {
   "name": "Yellow Springs",
   "zh": "黄泉",
   "ep": 122,
   "text": "His first Dao intent, which takes form as a river of the Yellow Springs while he is maddened at Tianyi City; he declares he will cultivate only his own Dao. By EP132 it has two forms, the Dao of the Netherworld and the Soul of the Springs. On Qing Ling Star he feeds it the resentment of dying mortals until it gains the shadow of a spring soul (EP147).",
   "holders": "Wang Lin."
  },
  {
   "name": "Netherworld Force",
   "zh": "",
   "ep": 132,
   "text": "Held for eleven years by the pull of the Tidal Abyss, Wang Lin stops resisting and turns that force into his own, the third form of his Dao intent, and it frees him. He later uses it to tear a bone out of the Moongazer (EP144).",
   "holders": "Wang Lin."
  },
  {
   "name": "Karma",
   "zh": "因果",
   "ep": 135,
   "wiki": "Karma Whip",
   "text": "Settling his debts on Planet Ran Yun, Wang Lin comes to understand karma as the step after life and death. On Qing Ling Star he merges his domain into the Karma Whip (因果昆极鞭), shifting it from life and death toward karma, and tests it on Xu Liguo until he begs (EP147).",
   "holders": "Wang Lin."
  },
  {
   "name": "Thunder",
   "zh": "",
   "ep": 146,
   "text": "In the Southern Domain's Thunder Pool Wang Lin can walk only ten steps until he stops forcing it and merges his Dao with the thunder, walking on lightning. His soul had already turned to lightning after he devoured part of the Ancient Thunder Dragon (EP131).",
   "holders": "Wang Lin; Shengong Hu, once Wang Lin points out that his Dao heart is not one with thunder (EP146)."
  }
 ],
 "otherDomains": [
  {
   "name": "Detachment",
   "zh": "",
   "ep": 56,
   "text": "Cuts off joy, anger, love and hatred. The old man pins Wang Lin in place so he can feel it as the Baiyun elders attack.",
   "holders": "Wen Baoxin of the Baiyun Sect"
  },
  {
   "name": "Drowsiness",
   "zh": "",
   "ep": 56,
   "text": "A lazy, drowsy realm that almost traps Wang Lin until his killing-energy pearl wakes him.",
   "holders": "Shi Qi of the Baiyun Sect"
  },
  {
   "name": "Age",
   "zh": "",
   "ep": 56,
   "text": "Drains spiritual power and ages the body. Wang Lin later carves it in wood, and Zhou Wutai admires the carving but will not take it (EP58).",
   "holders": "Qing Song of the Baiyun Sect"
  },
  {
   "name": "Love, then grief",
   "zh": "",
   "ep": 57,
   "text": "Zhou Wutai raises his disciple Yi Fu with love, meaning to kill him and reach Soul Formation through the grief. Wang Lin sees it and warns that Yi Fu will die within a hundred years.",
   "holders": "Zhou Wutai"
  },
  {
   "name": "Forgetting",
   "zh": "",
   "ep": 62,
   "text": "Mo Zhi shows it by watching the life in the falling rain, and tells Wang Lin that copying another's Intent Realm gives a far weaker Soul Formation than finding one's own.",
   "holders": "Mo Zhi"
  },
  {
   "name": "Emotionless",
   "zh": "绝情意境",
   "ep": 65,
   "wiki": "Hongdie",
   "text": "It numbs feelings and memories under Hongdie's Sword of Wisdom. In their duel she uses it to show Wang Lin his loved ones dying (EP81), and his Life and Death intent breaks it (EP82).",
   "holders": "Hongdie"
  },
  {
   "name": "Obsession",
   "zh": "",
   "ep": 69,
   "text": "Channelled through Chi Hu's axe, it destroys one of Sun Tai's souls. Zhou Yi later learns the Celestial corpse he carried had forced the obsession on him (EP70).",
   "holders": "Zhou Yi"
  },
  {
   "name": "Zhou Yi's Ascendant domain",
   "zh": "",
   "ep": 70,
   "wiki": "Zhou Yi",
   "text": "Zhou Yi reaches Ascendant as he dies and leaves the domain to Wang Lin inside a pagoda. Wang Lin sets the pagoda down to hold back the death energy in Li Muwan's body (EP74).",
   "holders": "Zhou Yi; his pagoda, given to Wang Lin"
  },
  {
   "name": "Devotion",
   "zh": "",
   "ep": 72,
   "text": "A domain of filial devotion. Wang Lin kills its holder in a battle of domains.",
   "holders": "Lu Tianrui"
  },
  {
   "name": "Tea",
   "zh": "茶之意境",
   "ep": 83,
   "wiki": "Li Yuanfeng",
   "text": "Its 'tea scar', locked in by Sun Tai's seal, drains Wang Lin to level 3 Qi Condensation. When they fight again in EP89, Wang Lin learns from it and pours Ancient God power into his own Intent.",
   "holders": "Li Yuanfeng of the Snow Domain"
  },
  {
   "name": "Thunder Intent Realm",
   "zh": "",
   "ep": 83,
   "wiki": "Sun Tai",
   "text": "Built from a century of meditation on the Sky Thunder Star.",
   "holders": "Sun Tai of the Corpse Yin Sect"
  },
  {
   "name": "Stopping",
   "zh": "停止意境",
   "ep": 95,
   "text": "A gift from the Cultivation Alliance that stops time for a moment. Zhu Quezi spends nine-tenths of his remaining lifespan on it to beat the Billion Soul Flag's Fourth Main Soul.",
   "holders": "Zhu Quezi"
  },
  {
   "name": "Thousand Illusions Emotionless Dao",
   "zh": "千幻无情道",
   "ep": 99,
   "text": "Liu Mei lives out feelings through illusion avatars and then cuts them off. She tries to devour Wang Lin's Dao of life and death as her last illusion, but he has hidden Mei Ji's curse of desire in it, and her Dao becomes the Thousand Illusions Dao of desire (千幻情欲道).",
   "holders": "Liu Mei"
  },
  {
   "name": "Demon Shadow Dao",
   "zh": "",
   "ep": 107,
   "text": "Copies an opponent's art. Zhao Xinmeng copies Wang Lin's Demon Transformation Finger as a Purple Demon Hand, hoping to take its demon energy, and concedes.",
   "holders": "Zhao Xinmeng"
  },
  {
   "name": "Ten Collapse Fist Conception",
   "zh": "",
   "ep": 112,
   "text": "Built on a thousand years of belief in victory: eight collapses make a commander, all ten a marshal. Wang Lin drives him back at the seventh.",
   "holders": "Demon General Mo Lihai"
  },
  {
   "name": "Archdemon Myriad Illusions Dao",
   "zh": "万幻天魔道",
   "ep": 136,
   "text": "When Huan Wuqing gives up a realm of his own cultivation to reforge her blood, Liu Mei's domain becomes the Huan clan's long-lost Archdemon Myriad Illusions Dao. Its illusions make enemies kill each other and try to light Wang Lin's Soul Fire; the lightning in his soul breaks it.",
   "holders": "Liu Mei (as Huan Mei)"
  },
  {
   "name": "Myriad Illusions Formless Dao",
   "zh": "万幻无相道",
   "ep": 136,
   "text": "The Huan ancestor's own domain, the weaker of the two Dao an ancient immortal left the Huan clan. In EP138 he devours Liu Mei for the stronger one and turns into a demon.",
   "holders": "Huan Wuqing"
  },
  {
   "name": "Demon lotus",
   "zh": "",
   "ep": 149,
   "text": "Shown as a demon lotus when Xu Fenghan starts losing a fight over origin energy. Wang Lin answers with his Yellow Springs and the Karma Whip, and Xu Liguo finishes him.",
   "holders": "Xu Fenghan of the Xu family"
  },
  {
   "name": "Restriction domain",
   "zh": "",
   "ep": 150,
   "text": "The sword spirit hiding in Li Yuan's blood fights Wang Lin with the Eighteen Plum Restriction inside its own restriction domain, where its phantoms keep reforming, until Li Yuan fights back from inside and the restriction wavers.",
   "holders": "Feijing, the soul of Gu Ziyuan's sword (named in EP151)"
  }
 ],
 "companions": [
  {
   "name": "Xu Liguo",
   "zh": "许立国",
   "ep": 14,
   "cast": "xu-liguo",
   "wiki": "Xu Liguo",
   "text": "Wang Lin's first devil and his longest companion: a scout, a soul-swallower and later a boastful sword spirit. He tests restrictions for Wang Lin on the Forbidden Mountain, and more than once tries to break free.",
   "from": "A Tiangang Sect cultivator, once at Nascent Soul, met at the Burning Gold Mountains. Wang Lin erases his consciousness and trains his soul into a devil servant.",
   "became": "Forms a core of his own from swallowed souls (EP24); bound into a Rain Celestial Sword as its spirit (EP77); taken by the Giant Demon ancestor (EP83-85) until he turns on him and returns (EP90); tames a curved blade (EP100-103); Zhou Yi plants ancient sword intent and a loyalty seal in him (EP129)."
  },
  {
   "name": "Hurricane demon",
   "zh": "",
   "ep": 28,
   "text": "His second devil, made because the little wind beasts' souls merge well. It can draw a whole hurricane after it.",
   "from": "The souls of countless small wind beasts that Xu Liguo swallowed in the Land of the Ancient God and spat back out.",
   "became": "Kills a hurricane beast at the False Nascent Soul level (EP29) and leads beasts of its own (EP30)."
  },
  {
   "name": "Big Ape",
   "zh": "",
   "ep": 41,
   "text": "His third devil.",
   "from": "The dying soul of Cheng Xian's spirit ape, whose core Cheng Ling had ripped out (EP40).",
   "became": "Wang Lin tests the Mosquito Beast on it before subduing the beast (EP45)."
  },
  {
   "name": "Xiao Ling",
   "zh": "",
   "ep": 73,
   "cast": "xiao-ling",
   "text": "A refined demon Wang Lin left behind to guard Li Muwan, shown in her memory.",
   "from": "Refined by Wang Lin and left with Li Muwan when he left the Cloud Sky Sect.",
   "became": "Her guard at the Cloud Sky Sect."
  },
  {
   "name": "Mosquito Beast",
   "zh": "蚊兽",
   "ep": 45,
   "cast": "mosquito-beast",
   "wiki": "Mosquito Beast",
   "text": "A small, fast beast that Wang Lin keeps fed on whatever he kills.",
   "from": "A coral-born mosquito beast met while crossing the Sea of Devils, subdued with illusions.",
   "became": "Feeds on the immortal-beast food of the Rain Celestial Realm (EP65), helps cow the Fire Cloud Fortress bandits (EP84), eats demons and the Da Luo Sword Sect's metal jade (EP108-109), and stands guard at the Xuanyin Tripod (EP160)."
  },
  {
   "name": "Thunder Toad",
   "zh": "雷蛙",
   "ep": 63,
   "cast": "thunder-toad",
   "wiki": "Thunder Toad",
   "text": "A top-grade spirit beast at peak mid Soul Formation. The ring that holds it keeps drawing on Wang Lin's spiritual power.",
   "from": "Found fighting a wild beast and subdued with the Hunyuan Beast Control Ring.",
   "became": "Outmatches Hong Wen (EP64) and fights the immortal-beast food (EP66); left with Tie Yan to guard Zhou Ru (EP80); on guard again at the Xuanyin Tripod (EP160)."
  },
  {
   "name": "Silver Horn Thunder Beast",
   "zh": "银角雷兽",
   "ep": 67,
   "cast": "thunder-celestial-beast",
   "wiki": "Thunder Celestial Beast",
   "text": "The beast of the God Slaying War Chariot. Its lightning makes people take Wang Lin for a Thunder Celestial Temple envoy.",
   "from": "The smallest beast soul of the God Slaying War Chariot, tamed in the Celestial Tian Bao's hidden chamber on Tiger Mountain.",
   "became": "Charges slowly at first (EP79); helps subdue the Qilin soul (EP87); Wang Lin opens a seal on it (EP107), a second (EP125) and a third (EP142); it terrifies Qian Kuizi (EP137) and Lei Daozi's young lightning beast (EP142)."
  },
  {
   "name": "Qilin remnant soul",
   "zh": "麒麟残魂",
   "ep": 87,
   "text": "Weaker than Ling Tianhou's living Scarlet Qilin, but strong enough to lead a flag of a hundred thousand souls.",
   "from": "A Qilin remnant soul deep in the Soul Refining Sect's spirit vein, subdued with the God Slaying War Chariot.",
   "became": "Main soul of his Hundred Thousand Soul Flag; eats Huang Yu's immortal-beast feed (EP126)."
  },
  {
   "name": "Soul flags",
   "zh": "魂幡",
   "ep": 86,
   "wiki": "Soul Flag",
   "text": "The Soul Refining Sect ranks its flags by how many souls they hold, each led by a main soul. Wang Lin climbs from a Hundred Soul Flag to a Hundred Thousand Soul Flag in a few months.",
   "from": "A Hundred Soul Flag taken by force (EP86), a Thousand Soul Flag (千魂幡) won from core disciple Guo Dongjian, and a Hundred Thousand Soul Flag (十万魂幡) of his own (EP87).",
   "became": "He later teaches the soul-flag method to the mortals of the Demon Spirit Land, who become the Soul Refining Tribe (EP110-111)."
  },
  {
   "name": "Billion Soul Flag",
   "zh": "十亿尊魂幡",
   "ep": 88,
   "wiki": "Billion Soul Flag",
   "text": "The Soul Refining Sect's supreme flag, which even Ascendant cultivators fear. Its main souls are the sect's ancestors, who wiped their own minds to become them.",
   "from": "Ancestor Dun Tian, who drives Liu Mei out with it (EP88) and raises it to mid Ascendant strength against a nine-leaf shaman (EP94).",
   "became": "Wang Lin inherits it when Dun Tian joins it (EP96); he blows up its souls against Tuo Sen and it is badly damaged (EP102); he restores it with souls through the Soul Refining Tribe (EP111) and takes back its Three Golden Souls from Liu Mei (EP137)."
  },
  {
   "name": "Billion Soul Flag sub-flag",
   "zh": "分幡",
   "ep": 89,
   "text": "Not the main flag, but it holds twelve purple-gold souls and a third of the main flag's power.",
   "from": "Sent to Wang Lin by Dun Tian through his messenger Ouyang Tian.",
   "became": "Unleashed against the Giant Demon Clan ancestor, whom Wang Lin kills (EP90)."
  },
  {
   "name": "The Fourth Main Soul",
   "zh": "第四魂",
   "ep": 95,
   "text": "The strongest soul in the Billion Soul Flag, able to threaten late Ascendant cultivators.",
   "from": "The Soul Refining Sect's last Ascendant ancestor, who fell beside the second Suzaku (EP94).",
   "became": "Dun Tian gives his whole lifespan to wake it against Zhu Quezi (EP95); Situ Nan lends it to Zhu Quezi for three years to fight the Forsaken Immortal Clan (EP96)."
  },
  {
   "name": "Scattered Devil",
   "zh": "散魔",
   "ep": 116,
   "cast": "scattered-devil",
   "wiki": "Scattered Devil",
   "text": "A devil far above Ascendant that fed on every new Ascendant in the Demon Spirit Land, and one of nine Scattered Devils serving another Ancient (EP124).",
   "from": "It hunts Wang Lin after his clone reaches Ascendant (EP122). He lures it into his own divine soul with Xu Liguo and his soul flag, and the Ancient Demon Bei Lou helps seal it there (EP124).",
   "became": "Kept sealed to devour later as a second soul; called out against Huan Wuqing on a promise of freedom, it rips out Planet Thousand Illusion's star soul and devours him (EP138)."
  },
  {
   "name": "Ancient Thunder Dragon",
   "zh": "",
   "ep": 130,
   "text": "A dragon born from lightning itself.",
   "from": "Tan Lang's second soul; when Wang Lin breaks its controlling mark it turns out to be free.",
   "became": "Wang Lin devours it with Soul-Devour; after a year he has absorbed a fifth of it and his soul has turned to lightning (EP131). It swallows immortal thunder with him when the Thunder Celestial Realm opens (EP148)."
  },
  {
   "name": "Du Jian, Immortal Guard",
   "zh": "杜建",
   "ep": 131,
   "cast": "du-jian",
   "wiki": "Du Jian",
   "text": "Wang Lin's first Immortal Guard (仙卫), a cultivator forged into an obedient puppet.",
   "from": "A Tianyun Sect disciple trapped with Wang Lin at the bottom of the Tidal Abyss, who trades All-Seer's secret for his life and agrees to serve for a thousand years.",
   "became": "Forged into an Immortal Guard with Illusory Yin strength (EP131); fights Liu Mei (EP137) and guards Wang Ping (EP142)."
  },
  {
   "name": "The second Immortal Guard",
   "zh": "第二仙卫",
   "ep": 143,
   "cast": "lei-daozi",
   "wiki": "Lei Daozi",
   "text": "A peak silver-tier Immortal Guard that cannot use divine arts, because the soul was destroyed in the forging.",
   "from": "The Illusory Yin body of Thunder Celestial Temple envoy Lei Daozi, whose soul Wang Lin draws out.",
   "became": "Thrown with Ling Tianhou's sword qi against the Moongazer's finger (EP144)."
  },
  {
   "name": "Wang Ping (Li'er)",
   "zh": "",
   "ep": 137,
   "cast": "wang-ping",
   "text": "Wang Lin's son, raised in the mortal world. His flesh is gone, and his soul is held together by Nirvana sword qi.",
   "from": "Li'er, a creature Liu Mei refined for a hundred years with hatred from a fragment of Wang Lin's blood soul.",
   "became": "Renamed Wang Ping and raised as Wang Lin's son in Moonfall Village (EP138-139); founds the Tianxing Empire, then fades away at peace (EP141-142)."
  },
  {
   "name": "Third God Slaying War Chariot",
   "zh": "",
   "ep": 160,
   "wiki": "God Slaying War Chariot",
   "text": "A new war chariot made to face any immortal behind the Xuanyin Tripod.",
   "from": "Refined by Wang Lin beside the Xuanyin Tripod, binding its beast to his life over seven trials.",
   "became": "Its soul beast turns out to be a single butterfly."
  }
 ]
});
})();
