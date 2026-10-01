// Hand-curated guide data for Martial Universe. Written by scripts/make_world.py: edit that, not this file.
// `ep` = the donghua episode where a thing is first shown or reached; NOVEL = not in the donghua yet.
(function () {
const NOVEL = 9999;

window.WORLD = {
  NOVEL,
  maxEp: 72,
  arcs: [
 [
  1,
  12,
  "Qingyang Town and Yan City"
 ],
 [
  13,
  24,
  "The Symbol Tower and the ancient tomb"
 ],
 [
  25,
  36,
  "Great Desolate Province"
 ],
 [
  37,
  48,
  "The Devouring Ancestral Symbol"
 ],
 [
  49,
  60,
  "The Ancient Battlefield"
 ],
 [
  61,
  72,
  "The Hundred Dynasties Battle"
 ]
],
  realms: [
 {
  "id": "tempered",
  "name": "Tempered Body",
  "subs": "Body Tempering",
  "zh": "淬体",
  "where": "Flesh, bones and marrow",
  "lifespan": "",
  "wiki": "Tempered Body",
  "heroEp": 1,
  "gist": "Nine layers of hammering the body until a Yuan Power seed forms in the marrow. Lin Dong starts at the 2nd layer.",
  "stages": [
   {
    "name": "1st-3rd layer",
    "zh": "一至三重",
    "ep": 1,
    "text": "Plain training of the flesh. Lin Dong is at the 2nd layer when the Stone Talisman finds him, and reaches the 4th the same night."
   },
   {
    "name": "4th-6th layer",
    "zh": "四至六重",
    "ep": 1,
    "text": "Skin and bone are tempered. The talisman's liquid takes him to the 6th layer for the clan competition (EP2)."
   },
   {
    "name": "7th-9th layer",
    "zh": "七至九重",
    "ep": 2,
    "text": "A Yuan Power seed forms and rises toward the dantian. He wins the clan competition at the 7th layer and reaches the 9th before the Hunting Battle (EP3)."
   }
  ]
 },
 {
  "id": "earthly",
  "name": "Earthly Yuan",
  "subs": "Earth Yuan Realm",
  "zh": "地元境",
  "where": "Yin Energy in the dantian",
  "lifespan": "",
  "wiki": "Earthly Yuan Stage",
  "heroEp": 4,
  "gist": "The body draws Yin Energy from heaven and earth and fuses it with its Yuan Power. Lin Langtian was here at ten.",
  "stages": [
   {
    "name": "Early",
    "zh": "初期",
    "ep": 4,
    "text": "Lin Dong breaks through after the Hunting Battle, helped by a Yin Pearl's energy."
   },
   {
    "name": "Middle",
    "zh": "中期",
    "ep": 4,
    "text": ""
   },
   {
    "name": "Late",
    "zh": "后期",
    "ep": 5,
    "text": "Where he stands when Wu Sha attacks on the road from Yan City (EP5)."
   }
  ]
 },
 {
  "id": "heavenly",
  "name": "Heavenly Yuan",
  "subs": "Tianyuan Realm",
  "zh": "天元境",
  "where": "Yang Energy in the dantian",
  "lifespan": "",
  "wiki": "Heavenly Yuan Stage",
  "heroEp": 5,
  "gist": "Yang Energy joins the Yin. A Fire Python Tiger counts as a Heavenly Yuan fighter (EP3).",
  "stages": [
   {
    "name": "Early",
    "zh": "初期",
    "ep": 5,
    "text": "He breaks through in the middle of the fight with Wu Sha."
   },
   {
    "name": "Late",
    "zh": "后期",
    "ep": 10,
    "text": "Reached in the Celestial Dan Pool."
   }
  ]
 },
 {
  "id": "yuandan",
  "name": "Yuan Dan",
  "subs": "Yuan Dan Realm",
  "zh": "元丹境",
  "where": "A Yuan Dan forms in the dantian",
  "lifespan": "",
  "wiki": "Yuan Dan Stage",
  "heroEp": 11,
  "gist": "Yin and Yang fuse into a Yuan Dan marked with one to nine stars. Its star count is the talent people judge you by.",
  "stages": [
   {
    "name": "Initial",
    "zh": "小元丹",
    "ep": 11,
    "text": "Lin Dong opens twenty-two meridians and forms an eight-star Yuan Dan with the Yin Yang Pearls. Lin Zhentian's has four stars (EP6)."
   },
   {
    "name": "Advanced",
    "zh": "小圆满",
    "ep": 17,
    "text": "The Blood Vermillion Devil Fruit takes him here before the ancient tomb."
   },
   {
    "name": "Perfect",
    "zh": "大圆满",
    "ep": 22,
    "text": "Reached with the Nirvana Heart's power in the tomb."
   }
  ]
 },
 {
  "id": "form",
  "name": "Form Creation",
  "subs": "",
  "zh": "造形境",
  "where": "Yuan Power takes shape",
  "lifespan": "",
  "wiki": "Form Creation Stage",
  "heroEp": 26,
  "gist": "First of the three Creation realms (造化三境): Yuan Power can be shaped into anything. Only Creation experts can break the ancient tomb's seal (EP18).",
  "stages": [
   {
    "name": "Initial",
    "zh": "初入",
    "ep": 26,
    "text": "He breaks through as the Thunder Source forges his Copper Thunder Body."
   },
   {
    "name": "Advanced",
    "zh": "小成",
    "ep": 25,
    "text": "Di Teng's realm (EP25)."
   },
   {
    "name": "Peak",
    "zh": "大成",
    "ep": 27,
    "text": "Luo Jiu's realm in Eagle City (EP27)."
   }
  ]
 },
 {
  "id": "qi",
  "name": "Qi Creation",
  "subs": "",
  "zh": "造气境",
  "where": "Shaped power becomes solid",
  "lifespan": "",
  "wiki": "Qi Creation Stage",
  "heroEp": 37,
  "gist": "What Yuan Power makes is as solid as the real thing. Lin Langtian is already here in EP18.",
  "stages": [
   {
    "name": "Initial",
    "zh": "初入",
    "ep": 33,
    "text": "Wang Yan, when Lin Dong beats him at the Ancient Tablet (EP33)."
   },
   {
    "name": "Advanced",
    "zh": "小成",
    "ep": 32,
    "text": "Hua Gu of the Yin Puppet Sect (EP32)."
   },
   {
    "name": "Lin Dong",
    "zh": "",
    "ep": 37,
    "text": "He breaks through inside the Manifestation Martial Tablet."
   }
  ]
 },
 {
  "id": "manifest",
  "name": "Manifestation",
  "subs": "Creation Realm",
  "zh": "造化境",
  "where": "Last of the three Creation realms",
  "lifespan": "",
  "wiki": "Manifestation Stage",
  "heroEp": 48,
  "gist": "The peak below Nirvana. The Yin Puppet Sect has three Manifestation experts (EP40); the Ancient Dragon Ape is one (EP29).",
  "stages": [
   {
    "name": "Half-step Manifestation",
    "zh": "半步造化",
    "ep": 36,
    "text": "Lin Langtian at the Martial Tablet (EP36). Lin Dong jumps here from Qi Creation in the Xuanyin Crack (EP44)."
   },
   {
    "name": "Initial",
    "zh": "初入",
    "ep": 48,
    "text": "After a month in the Lin Clan treasure vault."
   },
   {
    "name": "Peak",
    "zh": "大成",
    "ep": 39,
    "text": "Teng Sha (EP39). Lin Dong is here at Leiyan Valley (EP54)."
   },
   {
    "name": "Half-step Nirvana",
    "zh": "半步涅槃",
    "ep": 51,
    "text": "Jin Mu of the Holy Light Dynasty (EP51). Lin Dong is called this before his tribulation (EP60)."
   }
  ]
 },
 {
  "id": "nirvana",
  "name": "Nirvana",
  "subs": "Nirvana",
  "zh": "涅槃境",
  "where": "Through the Nirvana Tribulation",
  "lifespan": "",
  "wiki": "Nirvana Stage",
  "heroEp": 60,
  "gist": "Entered by surviving the Nirvana Tribulation (涅槃劫). Counted in Yuan, one to nine. Demon beasts that survive it can take human form (EP50). Only Nirvana fighters may compete for super-sect places (EP51).",
  "stages": [
   {
    "name": "One Yuan Nirvana",
    "zh": "一元涅槃",
    "ep": 49,
    "text": "Emperor Mo Jingtian (EP49). Lin Dong passes his tribulation in the Pill River (EP60)."
   },
   {
    "name": "Two Yuan Nirvana",
    "zh": "二元涅槃",
    "ep": 61,
    "text": "Shi Kun at its peak (EP61). Lin Dong, then Three Yuan, in the Green Dragon Hall (EP66)."
   },
   {
    "name": "Four Yuan Nirvana",
    "zh": "四元涅槃",
    "ep": 67,
    "text": "Feng Cang at its peak (EP67). Lin Dong breaks through mid-fight (EP69)."
   },
   {
    "name": "Five to Six Yuan",
    "zh": "五元 · 六元",
    "ep": 38,
    "text": "Tian Ze, guardian of the ancient sect, is at least Five Yuan (EP38); Qin Tian is Six Yuan (EP68)."
   },
   {
    "name": "Seven to Nine Yuan",
    "zh": "七元至九元",
    "ep": 52,
    "text": "The beast behind Yang City's tide is at least Nine Yuan (EP52); the revived Death Spirit General at least Seven (EP71)."
   }
  ]
 }
],
  beyond: [
 {
  "name": "Profound Life",
  "zh": "生玄境",
  "wiki": "Profound Life Stage",
  "text": "Seen once: Zheng Zhong of the Western Xuan Region at the Hundred Dynasties final (EP72). Grasping life, in the opening saying."
 },
 {
  "name": "Profound Death",
  "zh": "死玄境",
  "wiki": "Profound Death Stage",
  "text": "Grasping death. Not on screen yet."
 },
 {
  "name": "Reincarnation",
  "zh": "轮回境",
  "wiki": "Samsara Stage",
  "text": "Mastering the cycle of rebirth (the wiki also says Samsara). Not on screen yet."
 },
 {
  "name": "Ancestor",
  "zh": "祖境",
  "wiki": "Ancestor Stage",
  "text": "The top of the ladder in the novel. Not on screen yet."
 }
],
  symbolLadder: [
 {
  "name": "1st Seal Symbol Master",
  "zh": "一印符师",
  "eq": "Lin Dong: EP6",
  "text": "Lin Dong condenses his first Destiny Symbol with the Divine Movement Chapter (EP6)."
 },
 {
  "name": "2nd Seal Symbol Master",
  "zh": "二印符师",
  "eq": "Lin Dong: EP11",
  "text": "He reaches it five days before the Wei Tong duel, with Mental Strength said to match a 3rd Seal (EP11)."
 },
 {
  "name": "3rd Seal Symbol Master",
  "zh": "三印符师",
  "eq": "Lin Dong: EP16",
  "text": "He fails at it more than once (EP13) and breaks through after 24 days on the Symbol Master Tower's eighth floor (EP16)."
 },
 {
  "name": "4th Seal Symbol Master",
  "zh": "四印符师",
  "eq": "Lin Dong: EP26",
  "text": "Master Yan's rank in Yan City (EP8). Di Teng and Liu Kui find Lin Dong is one when he uses the Huasheng Symbol Formation on them (EP26)."
 },
 {
  "name": "5th Seal Symbol Master",
  "zh": "五印符师",
  "eq": "not yet",
  "text": "Master Yan calls even the 5th Seal only a beginning (EP12). Lin Dong's step through it is never shown."
 },
 {
  "name": "Spirit Symbol Master",
  "zh": "灵符师",
  "eq": "Lin Dong: EP43",
  "text": "The rank after the 5th Seal, where the Destiny Symbol gains a spirit of its own (EP12). Lin Dong comes out of the Devouring Ancestral Symbol with Mental Strength of at least an advanced Spirit Symbol Master (EP43)."
 },
 {
  "name": "1st Seal Heaven Symbol Master",
  "zh": "天符师",
  "eq": "Lin Dong: EP56",
  "text": "Lin Dong becomes a Heaven Symbol Master by refining the Heavenly Symbol Spirit Tree (EP56)."
 },
 {
  "name": "2nd Seal Heaven Symbol Master",
  "zh": "二印天符师",
  "eq": "Lin Dong: EP72",
  "text": "The first of three wind and thunder tribulations on Baichao Mountain (EP72)."
 },
 {
  "name": "3rd Seal Heaven Symbol Master",
  "zh": "三印天符师",
  "eq": "Lin Dong: EP72",
  "text": "The second tribulation, passed in the same fight (EP72)."
 },
 {
  "name": "4th Seal Heaven Symbol Master",
  "zh": "四印天符师",
  "eq": "Lin Dong: EP72",
  "text": "The third tribulation. Lin Dong ends EP72 at this rank."
 }
],
  grades: [
 "Martial arts: 1st grade and up (一品…), then superior (上乘), Manifestation-grade (造化武学) and spiritual (灵武学)",
 "Soul Treasures: low, mid and high grade (低级 · 中级 · 高级灵宝)",
 "Earth-grade Soul Treasure (地阶): Heavy Prison Peak, EP48",
 "Heaven-grade Soul Treasure (天阶): the Black Dragon Sky-Roaring Seal, EP68",
 "Elixirs: graded by number (5th-grade Void Spirit Grass, EP8; 6th grade, EP17)",
 "Pills as currency: Yang Yuan Pills → Pure Yuan Pills → Nirvana Pills"
],
  tiers: [
 {
  "n": 7,
  "name": "Super Sects",
  "zh": "超级宗派",
  "top": "Profound Life and above (Zheng Zhong, EP72). They pick the best of the Hundred Dynasties Battle.",
  "examples": [
   "Dao Sect",
   "Yuan Gate",
   "Nine Heavens Taiqing Palace"
  ],
  "ep": 18
 },
 {
  "n": 6,
  "name": "Super dynasties",
  "zh": "超级王朝",
  "top": "Many Nirvana experts; their young fighters reach Four to Six Yuan Nirvana",
  "examples": [
   "Demon Rock Dynasty",
   "Fengyun Dynasty"
  ],
  "ep": 54
 },
 {
  "n": 5,
  "name": "Dynasties",
  "zh": "王朝",
  "top": "An emperor at Nirvana (Mo Jingtian, One Yuan, EP49)",
  "examples": [
   "Great Yan Dynasty",
   "Holy Light Dynasty",
   "Xuanbing Dynasty"
  ],
  "ep": 16
 },
 {
  "n": 4,
  "name": "The Four Great Clans",
  "zh": "四大宗族",
  "top": "A Nirvana patriarch (Lin Fan, EP48); young geniuses at Qi Creation to Manifestation",
  "examples": [
   "Lin Clan",
   "Wang Clan",
   "Qin Clan",
   "Huangpu Clan"
  ],
  "ep": 17
 },
 {
  "n": 3,
  "name": "Province sects",
  "zh": "大荒郡三大宗派",
  "top": "Several Manifestation elders (the Yin Puppet Sect has three, EP40)",
  "examples": [
   "Yin Puppet Sect",
   "Great Demon Sect",
   "Martial Alliance"
  ],
  "ep": 30
 },
 {
  "n": 2,
  "name": "City powers",
  "zh": "城中势力",
  "top": "A leader at Yuan Dan perfect, sometimes a Symbol Master",
  "examples": [
   "Thousand Gold Association",
   "Blood Wolf Gang",
   "Symbol Master Guild",
   "Eagle Martial Dojo"
  ],
  "ep": 5
 },
 {
  "n": 1,
  "name": "Town families",
  "zh": "家族",
  "top": "A head at Heavenly Yuan or the first steps of Yuan Dan",
  "examples": [
   "Lin Family",
   "Lei Family",
   "Xie Family"
  ],
  "ep": 1
 }
],
  regions: [
 {
  "id": "qingyang",
  "name": "Qingyang Town",
  "zh": "青阳镇",
  "ep": 1,
  "wiki": "Qingyang Town",
  "blurb": "Where it starts. The Lin, Lei and Xie families share the town; the Lin family here is a side branch of the Lin Clan. Ironwood Manor and its Yang Yuan Stone vein lie nearby."
 },
 {
  "id": "yancity",
  "name": "Yan City",
  "zh": "炎城",
  "ep": 5,
  "wiki": "Yan City",
  "blurb": "The nearest city, with three great powers, an arena and a Symbol Master Guild. The Lin family moves here after EP12; the Celestial Dan Pool is in the mountains to the east."
 },
 {
  "id": "skyflame",
  "name": "Sky Flame Mountain Range",
  "zh": "天炎山脉",
  "ep": 18,
  "wiki": "Sky Flame Mountain",
  "blurb": "Mountains outside Yan City holding a Nirvana expert's ancient tomb, where the Four Great Clans and the Nine Heavens Taiqing Palace gather (EP18)."
 },
 {
  "id": "dayang",
  "name": "Dayang Province",
  "zh": "大阳郡",
  "ep": 25,
  "blurb": "Forests on the road to Great Desolate Province, home of the Di Family and the Thunder Source Crystal Beast."
 },
 {
  "id": "greatdesolate",
  "name": "Great Desolate Province",
  "zh": "大荒郡",
  "ep": 26,
  "wiki": "Great Desolate Province",
  "blurb": "A hard province of desert and wasteland where the fittest survive: Eagle City, the Ancient Wasteland, Great Puppet City, the Yin Puppet Sect's seat, and the Great Desolate Ancient Tablet in the middle of the desert."
 },
 {
  "id": "lincity",
  "name": "Lin City",
  "zh": "林城",
  "ep": 46,
  "wiki": "Lin City",
  "blurb": "Seat of the Lin Clan, one of the Four Great Clans, under patriarch Lin Fan. Lin Dong wins the Lin Clan Gathering here (EP47-48)."
 },
 {
  "id": "imperial",
  "name": "Imperial City",
  "zh": "皇城",
  "ep": 49,
  "wiki": "Imperial City",
  "blurb": "Capital of the Great Yan Dynasty. The Battle of Seeds picks five fighters for the Hundred Dynasties Battle (EP49); the Sacred Spirit Pool lies under it."
 },
 {
  "id": "battlefield",
  "name": "Ancient Battlefield",
  "zh": "远古战场",
  "ep": 51,
  "wiki": "Ancient Battlefield",
  "blurb": "A space left from ancient wars, full of ruins and inheritances, used by the Super Sects for the Hundred Dynasties Battle. Yang City, Leiyan Valley, the Demon Forest, the Ancient Treasure Trove, Wanxiang City and Baichao Mountain are all inside."
 },
 {
  "id": "eastxuan",
  "name": "Eastern Xuan Region",
  "zh": "东玄域",
  "ep": 72,
  "wiki": "East Xuan Continent",
  "blurb": "The wider world of a hundred dynasties and the Super Sects. The Great Yan Dynasty is one small dynasty in it. Lin Dong leaves for the Dao Sect at the end of EP72."
 },
 {
  "id": "westxuan",
  "name": "Western Xuan Region",
  "zh": "西玄域",
  "ep": 9999,
  "blurb": "The rival region. Its agents spy on the Ancient Battlefield (EP54), and Zheng Zhong tries to drag the whole battlefield there (EP71)."
 }
],
  factions: [
 {
  "name": "Lin Family",
  "zh": "林家",
  "region": "qingyang",
  "tier": 1,
  "ep": 1,
  "wiki": "Lin Family",
  "top": "Lin Zhentian (Yuan Dan initial, EP6); Lin Xiao (Heavenly Yuan again, EP6)",
  "signature": "A branch of the Lin Clan, thrown out after Lin Xiao lost to Lin Langtian",
  "with": "His family. He wins its competition (EP2), takes Ironwood Manor for it (EP4), moves it to Yan City (EP12) and returns it to the Lin Clan by winning the Gathering (EP48)."
 },
 {
  "name": "Lei Family",
  "zh": "雷家",
  "region": "qingyang",
  "tier": 1,
  "ep": 2,
  "wiki": "Lei Family",
  "top": "Lei Bao (Yuan Dan initial, EP6)",
  "signature": "The Lin family's rivals in Qingyang Town",
  "with": "Fights the Lin family over Ironwood Manor and loses at the banquet (EP6); it collapses after (EP7)."
 },
 {
  "name": "Xie Family",
  "zh": "谢家",
  "region": "qingyang",
  "tier": 1,
  "ep": 3,
  "wiki": "Xie Family",
  "top": "Xie Qian",
  "signature": "The third Qingyang family",
  "with": "Sides with the Lei family and falls with it (EP6-7)."
 },
 {
  "name": "Black Dragon Stockade",
  "zh": "黑龙寨",
  "region": "qingyang",
  "tier": 2,
  "ep": 5,
  "wiki": "Black Dragon Stockade",
  "top": "Wu Sha (Heavenly Yuan)",
  "signature": "Bandits",
  "with": "Attacks the Lin home and Ironwood Manor; Lin Dong beats Wu Sha on the road (EP5)."
 },
 {
  "name": "Blood Cloth Sect",
  "zh": "血衣门",
  "region": "yancity",
  "tier": 2,
  "ep": 6,
  "wiki": "Blood Cloth Sect",
  "top": "Wei Tong (Yuan Dan advanced, EP7); vice-master Gu Ying (2nd Seal Symbol Master)",
  "signature": "A Yan City sect that backs the Lei family",
  "with": "Lin Dong kills Gu Ying (EP6) and then Wei Tong in a fight to the death at the Yan City arena (EP12)."
 },
 {
  "name": "Thousand Gold Association",
  "subs": "Wanjin Chamber of Commerce",
  "zh": "万金商会",
  "region": "yancity",
  "tier": 2,
  "ep": 7,
  "wiki": "Thousand Gold Association",
  "top": "Xia Wanjin (Yuan Dan perfect, EP9)",
  "signature": "Auctions, trade and the Celestial Dan Pool",
  "with": "Lin Dong wins the Celestial Dan Pool for it (EP9) and becomes its honorary elder (EP10). Xuan Su helps him all through Yan City."
 },
 {
  "name": "Blood Wolf Gang",
  "zh": "血狼帮",
  "region": "yancity",
  "tier": 2,
  "ep": 8,
  "wiki": "Blood Wolf Gang",
  "top": "Yue Shan (Yuan Dan perfect, EP9)",
  "signature": "One of Yan City's three powers",
  "with": "Loses the Celestial Dan Pool to him (EP9); its Symbol Master takes Qing Tan hostage during the Wei Tong duel (EP11)."
 },
 {
  "name": "Symbol Master Guild",
  "zh": "符师会",
  "region": "yancity",
  "tier": 2,
  "ep": 13,
  "wiki": "Symbol Master Guild",
  "top": "Master Yan (4th Seal Symbol Master)",
  "signature": "Keeps the Symbol Master Tower",
  "with": "He wins the Tower Battle for it against Sky Fire City (EP13-15)."
 },
 {
  "name": "Ghost Blade Sect",
  "zh": "鬼刀门",
  "region": "yancity",
  "tier": 2,
  "ep": 16,
  "wiki": "Ghost Blade Sect",
  "top": "Gui Yan (Yuan Dan advanced, called Yan City's strongest)",
  "signature": "Yan City strongmen",
  "with": "Gui Yan tries to take the Yang Yuan Stone vein and is killed by Lin Dong (EP16)."
 },
 {
  "name": "Blade Slaughter Gang",
  "zh": "刀屠帮",
  "region": "skyflame",
  "tier": 2,
  "ep": 18,
  "wiki": "Blade Slaughter Gang",
  "top": "Song Dao (Yuan Dan perfect)",
  "signature": "Raiders of the tomb road",
  "with": "Song Dao raids the Lin Clan camp and loses to Lin Dong (EP18)."
 },
 {
  "name": "Di Family",
  "zh": "狄家",
  "region": "dayang",
  "tier": 2,
  "ep": 25,
  "wiki": "Di Family",
  "top": "Di Teng (Form Creation advanced)",
  "signature": "Dayang Province's local power",
  "with": "Lin Dong takes the Thunder Source from under Di Teng's nose (EP25), then 100,000 Pure Yuan Pills from him (EP26)."
 },
 {
  "name": "Eagle Martial Dojo",
  "zh": "鹰之武馆",
  "region": "greatdesolate",
  "tier": 2,
  "ep": 27,
  "wiki": "Eagle Martial Dojo",
  "top": "Jiang Lei (Form Creation advanced)",
  "signature": "Eagle City's dojo",
  "with": "He fights for it as a new disciple and kills Luo Jiu (EP28); Mu Qianqian looks after it later (EP44)."
 },
 {
  "name": "Bloody Vulture Dojo",
  "zh": "血鹫武馆",
  "region": "greatdesolate",
  "tier": 2,
  "ep": 27,
  "wiki": "Bloody Vulture Dojo",
  "top": "Luo Jiu (Form Creation peak)",
  "signature": "The Demon Ape Transformation",
  "with": "Driven out of Eagle City after Luo Jiu's death (EP28)."
 },
 {
  "name": "Ancient Sword Sect",
  "zh": "古剑门",
  "region": "greatdesolate",
  "tier": 2,
  "ep": 28,
  "wiki": "Ancient Sword Sect",
  "top": "Gu Yan (Qi Creation)",
  "signature": "Sword formations",
  "with": "Gu Yan takes a branded Myriad Beast Fruit from him (EP29) and later catches Little Flame in the Ancient Tablet (EP34)."
 },
 {
  "name": "Yin Puppet Sect",
  "zh": "阴傀宗",
  "region": "greatdesolate",
  "tier": 3,
  "ep": 30,
  "wiki": "Ghastly Puppet Cult",
  "top": "Teng Sha (Manifestation peak); three Manifestation experts in all (EP40)",
  "signature": "Puppets and Yin Sha arts; first of the province's sects",
  "with": "Hunts him after he kills Hua Zong (EP31-32). He takes the Devouring Ancestral Symbol from its Xuanyin Crack, and the sect falls (EP42-44)."
 },
 {
  "name": "Great Demon Sect",
  "zh": "大魔门",
  "region": "greatdesolate",
  "tier": 3,
  "ep": 30,
  "wiki": "Great Devil Sect",
  "top": "Mu Lei",
  "signature": "Mu Qianqian's charm arts",
  "with": "Mu Qianqian shelters him (EP32); Mu Lei rewards him after the Yin Puppet Sect falls (EP44)."
 },
 {
  "name": "Martial Alliance",
  "zh": "武盟",
  "region": "greatdesolate",
  "tier": 3,
  "ep": 30,
  "wiki": "Martial Alliance",
  "top": "Wu Zong",
  "signature": "Runs Great Puppet City's auction",
  "with": "Sells him the Magic Scales Gold Heart (EP30); joins the attack on Yin Puppet City (EP41)."
 },
 {
  "name": "Lin Clan",
  "zh": "林氏宗族",
  "region": "lincity",
  "tier": 4,
  "ep": 1,
  "wiki": "Lin Clan",
  "top": "Patriarch Lin Fan (Nirvana, EP48); Lin Langtian (Manifestation, EP48)",
  "signature": "One of the Four Great Clans",
  "with": "Threw out his father's branch. He wins the Lin Clan Gathering, beats Lin Langtian and brings the branch back (EP47-48); Lin Fan sends him to the Battle of Seeds."
 },
 {
  "name": "Wang Clan",
  "zh": "王氏宗族",
  "region": "greatdesolate",
  "tier": 4,
  "ep": 18,
  "wiki": "Wang Clan",
  "top": "Wang Tong (Qi Creation advanced); Wang Zhong (Manifestation peak, EP49)",
  "signature": "The Subduing Golden Platform Magic Palm",
  "with": "Wang Yan accuses him in the tomb (EP22) and loses to him (EP23, EP33); Wang Zhong threatens him at the Battle of Seeds (EP49)."
 },
 {
  "name": "Qin Clan",
  "zh": "秦氏宗族",
  "region": "greatdesolate",
  "tier": 4,
  "ep": 18,
  "wiki": "Qin Clan",
  "top": "Qin Shi (Form Creation, EP18)",
  "signature": "One of the Four Great Clans",
  "with": "Present at the tomb (EP18) and the Ancient Tablet (EP33)."
 },
 {
  "name": "Huangpu Clan",
  "subs": "Huangfu",
  "zh": "皇甫宗族",
  "region": "greatdesolate",
  "tier": 4,
  "ep": 18,
  "wiki": "Huangpu Clan",
  "top": "Huangpu Jing; Huangpu Ying (EP49)",
  "signature": "Allied with the Nine Heavens Taiqing Palace",
  "with": "Ling Qingzhu comes to the tomb on its behalf (EP18)."
 },
 {
  "name": "Great Yan Dynasty",
  "zh": "大炎王朝",
  "region": "imperial",
  "tier": 5,
  "ep": 16,
  "wiki": "Great Yan Empire",
  "top": "Emperor Mo Jingtian (One Yuan Nirvana, EP49)",
  "signature": "Five places in the Hundred Dynasties Battle",
  "with": "He wins a place at the Battle of Seeds (EP49) and fights the Ancient Battlefield beside Prince Mo Ling."
 },
 {
  "name": "Holy Light Dynasty",
  "zh": "圣光王朝",
  "region": "battlefield",
  "tier": 5,
  "ep": 51,
  "wiki": "Saint Light Empire",
  "top": "Jin Mu (Half-step Nirvana)",
  "signature": "Holds Yang City and taxes it in Nirvana Pills",
  "with": "He beats Jin Mu with five fingers of the Great Desolate Heaven-Imprisoning Finger (EP53)."
 },
 {
  "name": "Xuanbing Dynasty",
  "zh": "玄冰王朝",
  "region": "battlefield",
  "tier": 5,
  "ep": 54,
  "wiki": "Millennium Ice Empire",
  "top": "Hua Yun (Nirvana)",
  "signature": "Ice arts",
  "with": "He plays it against the Demon Rock Dynasty over the Ancient Secret Key (EP55)."
 },
 {
  "name": "Sky Eagle Dynasty",
  "zh": "天鹰王朝",
  "region": "battlefield",
  "tier": 5,
  "ep": 60,
  "top": "Wang Lie (One Yuan Nirvana)",
  "signature": "Bounty hunters",
  "with": "Comes for the bounty on him and is robbed and shut out (EP60)."
 },
 {
  "name": "Youquan Dynasty",
  "zh": "幽泉王朝",
  "region": "battlefield",
  "tier": 5,
  "ep": 60,
  "top": "You Qing; Mu Sha (Heaven Symbol Master)",
  "signature": "Holds one of the Ancient Secret Keys",
  "with": "Mu Sha offers a partnership and is refused (EP62)."
 },
 {
  "name": "Primordial Dynasty",
  "subs": "Honghuang",
  "zh": "洪荒王朝",
  "region": "battlefield",
  "tier": 5,
  "ep": 61,
  "top": "Hong Lie",
  "signature": "Holds one of the Ancient Secret Keys",
  "with": "Allies against him in the Ancient Treasure Trove (EP61-65)."
 },
 {
  "name": "Heavenly Demon Dynasty",
  "zh": "天魔王朝",
  "region": "battlefield",
  "tier": 5,
  "ep": 69,
  "wiki": "Sky Devil Empire",
  "top": "The Three Song Devils (Five Yuan Nirvana)",
  "signature": "The Song brothers",
  "with": "He saves Mo Ling from its disciples and beats the Song brothers (EP69-70)."
 },
 {
  "name": "Demon Rock Dynasty",
  "subs": "Demon Rock Dynasty",
  "zh": "魔岩王朝",
  "region": "battlefield",
  "tier": 6,
  "ep": 54,
  "wiki": "Devil Cliff Empire",
  "top": "Shi Kun (peak Two Yuan Nirvana); Shi Xuan, Chen Mu, Li Pan (Nirvana)",
  "signature": "A super dynasty with a city in the Ancient Battlefield",
  "with": "Fights him for the Heavenly Symbol Spirit Tree and the key (EP54-56), captures Mo Ling (EP56), posts a million-pill bounty (EP61). He kills Shi Xuan (EP59) and Shi Kun (EP65)."
 },
 {
  "name": "Fengyun Dynasty",
  "zh": "风云王朝",
  "region": "battlefield",
  "tier": 6,
  "ep": 67,
  "wiki": "Wind Cloud Empire",
  "top": "Feng Cang (peak Four Yuan Nirvana)",
  "signature": "Lords it over the lower dynasties",
  "with": "Hunts Su Rou's inheritance (EP67); Lin Dong kills Feng Cang and takes the Black Dragon Sky-Roaring Seal (EP68)."
 },
 {
  "name": "Nine Heavens Taiqing Palace",
  "zh": "九天太清宫",
  "region": "eastxuan",
  "tier": 7,
  "ep": 18,
  "wiki": "Nine Heavens Supreme Purity Palace",
  "top": "Shen Qing; Old Ma Yi (Nirvana)",
  "signature": "Ling Qingzhu's sect",
  "with": "Ling Qingzhu shares the Nirvana Heart with him (EP21). Old Ma Yi chases him for the Ancestral Symbol (EP46). Ling Qingzhu drives Zheng Zhong off (EP72)."
 },
 {
  "name": "Yuan Gate",
  "zh": "元门",
  "region": "eastxuan",
  "tier": 7,
  "ep": 68,
  "wiki": "Yuan Gate",
  "top": "Liu Tong",
  "signature": "Every past champion joined it",
  "with": "Wants him as champion; he turns it down (EP72). Lin Langtian's patron spirit points this way."
 },
 {
  "name": "Dao Sect",
  "zh": "道宗",
  "region": "eastxuan",
  "tier": 7,
  "ep": 66,
  "wiki": "Dao Sect",
  "top": "Wu Dao",
  "signature": "A Super Sect of the Eastern Xuan Region",
  "with": "Wu Dao sends him to Wanxiang City (EP66) and invites him (EP70). Lin Dong joins as Hundred Dynasties champion (EP72)."
 }
],
  journey: [
 {
  "stage": "Qingyang Town",
  "realm": "tempered",
  "eps": [
   1,
   3
  ],
  "items": [
   {
    "name": "Stone Talisman",
    "zh": "石符",
    "ep": 1,
    "text": "It heals him and teaches him in its dream space, which is how a beaten 'son of trash' starts to climb.",
    "wiki": "Stone_Talisman"
   },
   {
    "name": "Tong Bei Fist, ten rings",
    "zh": "通背拳",
    "ep": 1,
    "text": "Copying the shadow's ten-ring fist lifts him two layers in one night.",
    "wiki": "Penetrating_Fist"
   },
   {
    "name": "Eight Desolation Palm",
    "zh": "八荒掌",
    "ep": 2,
    "text": "His father's 2nd-grade palm, which he soon uses better than the family expected.",
    "wiki": "Eight_Desolations_Palm"
   },
   {
    "name": "Yin Pearl",
    "zh": "阴珠",
    "ep": 3,
    "text": "Its Yin Sha energy is what lets him reach Earthly Yuan in the duel with Lei Li.",
    "wiki": "Yin_Pearl"
   },
   {
    "name": "Little Flame",
    "zh": "小炎",
    "ep": 3,
    "text": "The sickly Fire Python Tiger cub he picks in the Hunting Battle grows into his fighting partner.",
    "wiki": "Little_Flame"
   }
  ]
 },
 {
  "stage": "Ironwood Manor and Yan City",
  "realm": "heavenly",
  "eps": [
   4,
   10
  ],
  "items": [
   {
    "name": "Qimen Seal",
    "zh": "奇门印",
    "ep": 4,
    "text": "A 3rd-grade fragment that beats Lei Li's Rushing Thunder Light and stays his main defence for many episodes.",
    "wiki": "Wonder_Gate_Seal"
   },
   {
    "name": "Yang Yuan Stone vein",
    "zh": "阳元石",
    "ep": 4,
    "text": "The vein under Ironwood Manor pays for everything that follows, refined into Yang Yuan Pills by the talisman.",
    "wiki": "Yang_Yuan_Stone"
   },
   {
    "name": "Qiankun Bag",
    "zh": "乾坤袋",
    "ep": 5,
    "text": "Bought for nine Yang Yuan Pills; from now on he carries his pills and loot with him.",
    "wiki": "Qian_Kun_Bag"
   },
   {
    "name": "Divine Movement Chapter",
    "zh": "神动篇",
    "ep": 5,
    "text": "Master Yan's book opens the Symbol Master path.",
    "wiki": "Spiritual_Movement_Chapter"
   },
   {
    "name": "Yuan-Shattering Shuttle",
    "zh": "碎元梭",
    "ep": 5,
    "text": "Taken from Wu Sha; once he is a Symbol Master he flies it with his mind.",
    "wiki": "Shattering_Yuan_Shrapnel"
   },
   {
    "name": "Destiny Symbol, 1st Seal",
    "zh": "本命符印",
    "ep": 6,
    "text": "Makes him a Symbol Master, a second ladder of strength beside his realm.",
    "wiki": "Destiny_Symbol"
   },
   {
    "name": "Ancient Swirl Symbol",
    "zh": "古旋符印",
    "ep": 6,
    "text": "A rare Destiny Spirit Symbol that absorbs other mental power.",
    "wiki": "Ancient_Swirl_Symbol"
   },
   {
    "name": "Materialized Spirit Needle",
    "zh": "化神针",
    "ep": 6,
    "text": "Gu Ying's mental needle, later the trick that frees Qing Tan.",
    "wiki": "Materialized_Spirit_Needle"
   },
   {
    "name": "Little Mink",
    "zh": "貂爷",
    "ep": 8,
    "text": "The Celestial Demon Marten in the talisman becomes his teacher and guide.",
    "wiki": "Celestial_Demon_Marten"
   },
   {
    "name": "Mental Grindstone and Spiral Wave",
    "zh": "精神磨盘 / 尖螺波",
    "ep": 9,
    "text": "Little Mink's training and attack win him the Celestial Dan Pool contest.",
    "wiki": "Mind_Millstone"
   },
   {
    "name": "Qi-Transforming Spirit Vortex",
    "zh": "化气精旋",
    "ep": 10,
    "text": "Lets him absorb the pool far faster than the Qingyuan Art and restores the Stone Talisman.",
    "wiki": "Qi_Gathering_Mental_Vortex"
   },
   {
    "name": "Yin Yang Pearls and the Three Yang Art",
    "zh": "阴阳珠 / 三阳决",
    "ep": 10,
    "text": "The materials for his Yuan Dan before the Wei Tong duel.",
    "wiki": "Yin_Yang_Pearl"
   }
  ]
 },
 {
  "stage": "Yan City, the tower and the ancient tomb",
  "realm": "yuandan",
  "eps": [
   11,
   24
  ],
  "items": [
   {
    "name": "Eight-star Yuan Dan",
    "zh": "八星元丹",
    "ep": 11,
    "text": "Twice his grandfather's four stars, a foundation stronger than most of his rivals'.",
    "wiki": "Nine_Stars_of_Yuan_Dan"
   },
   {
    "name": "Mysterious Ice Swords and Lihuo Sword",
    "zh": "冰玄剑 / 离火剑",
    "ep": 13,
    "text": "Weapons won from Cao Zhu and Liu Long that he steers with his mind.",
    "wiki": "Mysterious_Ice_Swords"
   },
   {
    "name": "Huasheng Symbol Formation",
    "zh": "化生符阵",
    "ep": 15,
    "text": "A Qi-grade Secret Spirit Skill from the tower's eighth floor; its Huasheng Light kills Gui Yan.",
    "wiki": "Manifestation_Symbol_Array"
   },
   {
    "name": "Map of two Ancestral Symbols",
    "zh": "祖符",
    "ep": 16,
    "text": "Sets his long-term goal beyond the Lin Clan Gathering.",
    "wiki": "Ancestral_Symbol"
   },
   {
    "name": "Blood Vermillion Devil Fruit",
    "zh": "妖血朱果",
    "ep": 17,
    "text": "Xuan Su's gift for the 3rd Seal; it takes him to Yuan Dan advanced.",
    "wiki": "Blood_Vermillion_Devil_Fruit"
   },
   {
    "name": "Ancient Heavenly Scales Halberd",
    "zh": "天鳞古戟",
    "ep": 19,
    "text": "An unfinished Soul Treasure bound with his blood; it becomes his main weapon.",
    "wiki": "Ancient_Heavenly_Scales_Halberd"
   },
   {
    "name": "23,000 Pure Yuan Pills",
    "zh": "纯元丹",
    "ep": 19,
    "text": "The tomb's hoard fuels his Symbol Puppets and the talisman.",
    "wiki": "Pure_Yuan_Pill"
   },
   {
    "name": "Mid-grade Symbol Puppet",
    "zh": "中等符傀",
    "ep": 20,
    "text": "A Form Creation-level strike he can call on, at 2,000 pills a blow.",
    "wiki": "Symbol_Puppet"
   },
   {
    "name": "Extreme Yin Dragon Saliva",
    "zh": "极煞阴龙涎",
    "ep": 20,
    "text": "The very Yin treasure that lets Qing Tan form her Yin Dan.",
    "wiki": "Extreme_Yin_Dragon_Saliva"
   },
   {
    "name": "Nirvana Heart's power",
    "zh": "涅槃心",
    "ep": 21,
    "text": "Shared with Ling Qingzhu; he wakes at Yuan Dan perfect.",
    "wiki": "Nirvana_Heart"
   },
   {
    "name": "Heavenly Scales Halberd Art",
    "zh": "天鳞戟法",
    "ep": 21,
    "text": "The tomb master's halberd technique, first used against Wang Yan.",
    "wiki": "Ancient_Heavenly_Scales_Halberd"
   }
  ]
 },
 {
  "stage": "Great Desolate Province and the Ancient Tablet",
  "realm": "form",
  "eps": [
   25,
   36
  ],
  "items": [
   {
    "name": "Copper Thunder Body",
    "zh": "铜雷体",
    "ep": 26,
    "text": "The first layer of the Great Sun Thunder Body, formed with the stolen Thunder Source.",
    "wiki": "Great_Sun_Thunder_Body"
   },
   {
    "name": "200,000 Pure Yuan Pills",
    "zh": "纯元丹",
    "ep": 26,
    "text": "Paid by Di Teng and Liu Kui to end the fight, enough to run his puppets for a long time.",
    "wiki": "Pure_Yuan_Pill"
   },
   {
    "name": "Subduing Golden Platform Magic Palm",
    "zh": "金台镇魔掌",
    "ep": 27,
    "text": "A Wang Clan art he uses better than Wang Yan himself.",
    "wiki": "Subduing_Golden_Platform_Magic_Palm"
   },
   {
    "name": "Demon Ape Transformation",
    "zh": "魔猿变",
    "ep": 30,
    "text": "Made far stronger by Ancient Dragon Ape blood, and it stacks with the Thunder Body.",
    "wiki": "Devil_Ape_Transformation"
   },
   {
    "name": "High-grade halberd",
    "zh": "天鳞古戟",
    "ep": 30,
    "text": "Grand Master Cheng refines the halberd into a high-grade Soul Treasure.",
    "wiki": "Ancient_Heavenly_Scales_Halberd"
   },
   {
    "name": "Prayer mat and Yuan Essence Power",
    "zh": "神秘蒲团 / 元精之力",
    "ep": 31,
    "text": "Fuses Yuan Power and Mental Strength into one force that breaks armour.",
    "wiki": "Spirit_Accumulation_Praying_Mat"
   },
   {
    "name": "Myriad Beast Fruit",
    "zh": "万兽果",
    "ep": 32,
    "text": "Refined to push his cultivation and Thunder Body further.",
    "wiki": "Thousand_Beast_Fruit"
   },
   {
    "name": "Jade Thunder Body",
    "zh": "玉雷体",
    "ep": 34,
    "text": "The Yin Wind Formation forges the second layer.",
    "wiki": "Great_Sun_Thunder_Body"
   },
   {
    "name": "Nirvana Pill",
    "zh": "涅槃丹",
    "ep": 34,
    "text": "A dead disciple's gift, meant for when he nears Nirvana.",
    "wiki": "Nirvana_Pill"
   },
   {
    "name": "High-grade Symbol Puppet",
    "zh": "高等符傀",
    "ep": 35,
    "text": "Taken from Elder Cao; strong enough to break a sect formation.",
    "wiki": "Symbol_Puppet"
   },
   {
    "name": "The previous master's approval",
    "zh": "吞噬祖符",
    "ep": 35,
    "text": "The Black-Eyed Elder gives him the means to break the Ancestral Symbol's seal.",
    "wiki": "Black_Eyed_Elder"
   }
  ]
 },
 {
  "stage": "The Devouring Ancestral Symbol",
  "realm": "qi",
  "eps": [
   37,
   43
  ],
  "items": [
   {
    "name": "Great Desolate Heaven-Imprisoning Finger",
    "zh": "大荒囚天指",
    "ep": 37,
    "text": "The ancient sect's Manifestation martial art, his strongest attack through EP72.",
    "wiki": "Great_Desolate_Imprisoning_Heavenly_Finger"
   },
   {
    "name": "Lin Langtian's bag of Nirvana Pills",
    "zh": "乾坤袋",
    "ep": 38,
    "text": "Lands in his hands when Lin Langtian leaves him to die.",
    "wiki": "Nirvana_Pill"
   },
   {
    "name": "Mental Energy Fire",
    "zh": "精神之火",
    "ep": 39,
    "text": "Turns the fight with the Half-step Manifestation Cao Zhen.",
    "wiki": "Mental_Energy_Fire"
   },
   {
    "name": "Purple Shadow Nine Breaks",
    "zh": "紫影九破",
    "ep": 40,
    "text": "A 9th-grade art taken from Teng Lei.",
    "wiki": "Nine_Destruction_Purple_Shadow"
   },
   {
    "name": "Devouring Ancestral Symbol",
    "zh": "吞噬祖符",
    "ep": 43,
    "text": "He becomes its heir; the Power of Devouring absorbs energy and attacks and makes them his.",
    "wiki": "Devouring_Ancestral_Symbol"
   }
  ]
 },
 {
  "stage": "The Yin Puppet Sect and the Lin Clan Gathering",
  "realm": "manifest",
  "eps": [
   44,
   48
  ],
  "items": [
   {
    "name": "Half-step Manifestation",
    "zh": "半步造化",
    "ep": 44,
    "text": "The Devouring Ancestral Symbol turns the Xuanyin Crack's cold into Yuan Power.",
    "wiki": "Half-Step_Manifestation_Stage"
   },
   {
    "name": "Great Desolate Sea-Splitting Seal",
    "zh": "大荒分海印",
    "ep": 44,
    "text": "Another Great Desolate technique, used on Teng Sha and later Lin Langtian.",
    "wiki": "Great_Desolate_Ocean_Splitting_Seal"
   },
   {
    "name": "Blood Spirit Puppet",
    "zh": "血灵傀",
    "ep": 45,
    "text": "A Nirvana-level puppet kept under contract in the Stone Talisman.",
    "wiki": "Symbol_Puppet"
   },
   {
    "name": "Great Sun Thunder Body perfected",
    "zh": "大日雷体大成",
    "ep": 46,
    "text": "His body is ready to face Lin Langtian.",
    "wiki": "Great_Sun_Thunder_Body"
   },
   {
    "name": "Heavy Prison Peak",
    "zh": "重狱峰",
    "ep": 48,
    "text": "An Earth-grade Soul Treasure from the Lin Clan vault, bound with blood and the talisman.",
    "wiki": "Heavy_Prison_Peak"
   },
   {
    "name": "Lin Clan championship",
    "zh": "林氏族比",
    "ep": 48,
    "text": "Brings the Yan City branch back into the clan and wins him a Battle of Seeds place.",
    "wiki": "Lin_Clan_Gathering"
   }
  ]
 },
 {
  "stage": "The Imperial City and the Ancient Battlefield",
  "realm": "manifest",
  "eps": [
   49,
   59
  ],
  "items": [
   {
    "name": "Hundred Dynasties Battle place",
    "zh": "百朝大战",
    "ep": 49,
    "text": "One of the Great Yan Dynasty's five places.",
    "wiki": "Battle_of_Seeds"
   },
   {
    "name": "Heavenly Crocodile Bone Spear",
    "zh": "骨枪",
    "ep": 50,
    "text": "The Ancient Heavenly Crocodile's Soul Treasure; the emperor lets him keep it.",
    "wiki": "Heavenly_Crocodile_Bone_Spear"
   },
   {
    "name": "Five fingers",
    "zh": "大荒囚天指",
    "ep": 53,
    "text": "The Great Desolate Heaven-Imprisoning Finger's fifth finger breaks the Holy Light Formation.",
    "wiki": "Great_Desolate_Imprisoning_Heavenly_Finger"
   },
   {
    "name": "Saint Elephant Sky Crumbling Tackle",
    "zh": "圣象崩天撞",
    "ep": 53,
    "text": "Learned from Jin Mu's own attack.",
    "wiki": "Saint_Elephant_Sky_Crumbling_Tackle"
   },
   {
    "name": "Nirvana Golden Body",
    "zh": "涅槃金身",
    "ep": 53,
    "text": "A Manifestation-grade body, forged with ten thousand Nirvana Pills.",
    "wiki": "Lesser_Nirvana_Golden_Body"
   },
   {
    "name": "Ancient Secret Key",
    "zh": "远古秘钥",
    "ep": 56,
    "text": "One of the four keys to the Ancient Treasure Trove; it also teleports him to safety.",
    "wiki": "Mysterious_Ancient_Key"
   },
   {
    "name": "Heaven Symbol Master",
    "zh": "天符师",
    "ep": 56,
    "text": "The Heavenly Symbol Spirit Tree lifts him to the next Symbol Master ladder.",
    "wiki": "Heaven_Symbol_Master"
   },
   {
    "name": "Wind Thunder Seal",
    "zh": "风雷印",
    "ep": 57,
    "text": "Beats Chen Mu at the prisoner exchange."
   },
   {
    "name": "Devouring Thunder Palm",
    "zh": "吞噬雷掌",
    "ep": 58,
    "text": "His own art, joining Mental Strength and the Power of Devouring."
   },
   {
    "name": "Lin Yan",
    "zh": "林炎",
    "ep": 59,
    "text": "Little Flame passes the Nirvana Tribulation, takes human form and becomes his sworn brother.",
    "wiki": "Lin_Yan"
   }
  ]
 },
 {
  "stage": "Nirvana and the Hundred Dynasties Battle",
  "realm": "nirvana",
  "eps": [
   60,
   72
  ],
  "items": [
   {
    "name": "One Yuan Nirvana",
    "zh": "一元涅槃",
    "ep": 60,
    "text": "Passed in the Pill River, which also meets the battle's rule that only Nirvana fighters go on.",
    "wiki": "One_Yuan_Nirvana_Stage"
   },
   {
    "name": "Life and Death Reincarnation Pill",
    "zh": "生死转轮丹",
    "ep": 62,
    "text": "The pill Little Mink needs to rebuild his body.",
    "wiki": "Samsara_Pill"
   },
   {
    "name": "Great Desolate Heaven-Imprisoning Hand",
    "zh": "大荒囚天手",
    "ep": 65,
    "text": "A spiritual martial art from the Eight Extremes trial; it kills Shi Kun.",
    "wiki": "Great_Desolate_Imprisoning_Heavenly_Finger"
   },
   {
    "name": "Green Heaven Materialized Dragon Skill",
    "zh": "化龙决",
    "ep": 66,
    "text": "Qing Zhi's gift: dragon scale shield, Immovable Bell and dragon form.",
    "wiki": "Green_Heaven_Materialized_Dragon_Skill"
   },
   {
    "name": "Three Yuan Nirvana",
    "zh": "三元涅槃",
    "ep": 66,
    "text": "Three months in the Green Dragon Hall's pill store.",
    "wiki": "Three_Yuan_Nirvana_Stage"
   },
   {
    "name": "Black Dragon Sky-Roaring Seal",
    "zh": "黑龙啸天印",
    "ep": 68,
    "text": "A Heaven-grade Soul Treasure taken from Feng Cang.",
    "wiki": "Black_Dragon_Sky_Roaring_Seal"
   },
   {
    "name": "Four Yuan Nirvana",
    "zh": "四元涅槃",
    "ep": 69,
    "text": "Reached mid-fight against Song Zhen.",
    "wiki": "Four_Yuan_Nirvana_Stage"
   },
   {
    "name": "4th Seal Heaven Symbol Master",
    "zh": "四印天符师",
    "ep": 72,
    "text": "Three tribulations in one fight on Baichao Mountain.",
    "wiki": "4th_Seal_Heaven_Symbol_Master"
   },
   {
    "name": "Champion and a place in the Dao Sect",
    "zh": "道宗",
    "ep": 72,
    "text": "The end of the Hundred Dynasties Battle and the start of his super sect path.",
    "wiki": "Dao_Sect"
   }
  ]
 }
],
  secrets: [
 {
  "ch": "指",
  "name": "Great Desolate Heaven-Imprisoning Finger",
  "gloss": "Manifestation-grade",
  "ep": 37,
  "effect": "The ancient sect's art from the Martial Tablet. At first it paralyses him (EP38); four fingers beat Jin Mu, five break the Holy Light Formation (EP53)."
 },
 {
  "ch": "印",
  "name": "Great Desolate Sea-Splitting Seal",
  "gloss": "seal art",
  "ep": 44,
  "effect": "First used against Teng Sha at Yin Puppet City."
 },
 {
  "ch": "手",
  "name": "Great Desolate Heaven-Imprisoning Hand",
  "gloss": "spiritual martial art",
  "ep": 65,
  "effect": "Won in the Eight Extremes trial; it kills Shi Kun, a peak Two Yuan Nirvana."
 },
 {
  "ch": "噬",
  "name": "Power of Devouring",
  "gloss": "Ancestral Symbol",
  "ep": 43,
  "effect": "Takes in energy and attacks and turns them into his own strength. Joined with Mental Strength it becomes the Devouring Thunder Palm (EP58)."
 },
 {
  "ch": "龙",
  "name": "Green Heaven Materialized Dragon Skill",
  "gloss": "inheritance",
  "ep": 66,
  "effect": "Qing Zhi's gift: a scale shield, a bell and, in EP71, a dragon form."
 }
],
  methods: [
 {
  "realm": "Tempered Body",
  "method": "Stone Talisman liquid and Tong Bei Fist",
  "zh": "石符 · 通背拳",
  "from": "The Stone Talisman",
  "ep": 1
 },
 {
  "realm": "Earthly / Heavenly Yuan",
  "method": "Qingyuan Art",
  "zh": "青元功",
  "from": "Lin Zhentian (the Lin family's method)",
  "ep": 10
 },
 {
  "realm": "Yuan Dan",
  "method": "Qi-Transforming Spirit Vortex",
  "zh": "化气精旋",
  "from": "Little Mink",
  "ep": 10
 },
 {
  "realm": "Yuan Dan",
  "method": "Three Yang Art",
  "zh": "三阳决",
  "from": "Xuan Su",
  "ep": 10
 },
 {
  "realm": "Form Creation and up",
  "method": "Great Sun Thunder Body",
  "zh": "大日雷体",
  "from": "Little Mink, with the Thunder Source",
  "ep": 25
 },
 {
  "realm": "Qi Creation and up",
  "method": "Power of Devouring",
  "zh": "吞噬之力",
  "from": "The Devouring Ancestral Symbol",
  "ep": 43
 },
 {
  "realm": "Manifestation to Nirvana",
  "method": "Lesser Nirvana Golden Body",
  "zh": "小涅槃金身",
  "from": "Little Mink",
  "ep": 53
 }
],
  eras: [
 {
  "name": "The Ancestral Symbols",
  "zh": "祖符",
  "note": "Eight symbols born from the rules of heaven and earth (EP16). Whoever holds one is among the strongest in the world.",
  "emperors": [
   {
    "name": "The holder of all eight",
    "zh": "",
    "ep": 23,
    "legacy": "A Celestial Demon Marten record tells of one supreme expert who held all eight, stopped a great catastrophe and vanished with them (EP23)."
   },
   {
    "name": "The Black-Eyed Elder",
    "zh": "黑瞳老人",
    "ep": 35,
    "wiki": "Black Eyed Elder",
    "legacy": "The previous master of the Devouring Ancestral Symbol, waiting inside the Great Desolate Ancient Tablet. He names Lin Dong his heir (EP35-36)."
   }
  ]
 },
 {
  "name": "The ancient sects",
  "zh": "远古宗派",
  "note": "Sects that fought the same monsters long ago and left their ruins, trials and arts behind.",
  "emperors": [
   {
    "name": "Master of the Tomb",
    "zh": "墓府之主",
    "ep": 19,
    "legacy": "A Nirvana expert whose tomb in the Sky Flame Mountains holds the Nirvana Heart. His remnant teaches Lin Dong the halberd art (EP21)."
   },
   {
    "name": "Tian Ze",
    "zh": "天泽",
    "ep": 38,
    "legacy": "Guardian of the sect inside the Great Desolate Ancient Tablet, at least Five Yuan Nirvana. He accepts Lin Dong as its heir (EP38)."
   },
   {
    "name": "The Eight Extremes Sect",
    "zh": "八极宗",
    "ep": 63,
    "legacy": "Its stone statues show Lin Dong its last battle. Its trial gives him the Great Desolate Heaven-Imprisoning Hand (EP63-65)."
   },
   {
    "name": "Qing Zhi, the Green Dragon King",
    "zh": "青雉",
    "ep": 66,
    "wiki": "Green Dragon Hall",
    "legacy": "His remnant shadow tests Lin Dong in the Green Dragon Hall and gives him the Green Heaven Materialized Dragon Skill (EP66)."
   },
   {
    "name": "The Ancient Heavenly Crocodile",
    "zh": "远古天鳄",
    "ep": 50,
    "legacy": "A beast beyond Nirvana whose remains lie under the Sacred Spirit Pool. Its essence blood starts Little Flame's evolution (EP50)."
   }
  ]
 },
 {
  "name": "Above the dynasties",
  "zh": "超级宗派",
  "note": "The people the Hundred Dynasties Battle is fought to impress.",
  "emperors": [
   {
    "name": "Wu Dao",
    "zh": "悟道",
    "ep": 66,
    "legacy": "A Dao Sect elder. He sends Lin Dong to Wanxiang City (EP66) and brings him into the Dao Sect (EP72)."
   },
   {
    "name": "Liu Tong",
    "zh": "",
    "ep": 68,
    "legacy": "A Yuan Gate elder who runs the Nirvana Ranking battle (EP70)."
   },
   {
    "name": "Zheng Zhong",
    "zh": "郑钟",
    "ep": 71,
    "legacy": "A Profound Life expert of the Western Xuan Region who tries to move the whole Ancient Battlefield west (EP71-72)."
   }
  ]
 }
],
  zones: [
 {
  "name": "Celestial Dan Pool",
  "zh": "丹仙池",
  "ep": 9,
  "wiki": "Celestial Dan Pool",
  "master": "Demonic Jade Water Python",
  "masterEp": 10,
  "text": "A pool of Yin and Yang energy in the mountains east of Yan City, won in a contest. Yin Yang Pearls lie in a cave at the bottom (EP10)."
 },
 {
  "name": "Symbol Master Tower",
  "zh": "符师塔",
  "ep": 12,
  "wiki": "Symbol Master Tower",
  "master": "A hidden space with an Ancestral Symbol rubbing",
  "masterEp": 16,
  "text": "Each floor tests Mental Strength. Even 3rd Seal Symbol Masters rarely reach the eighth (EP15); a hidden space above it holds the map of two Ancestral Symbols (EP16)."
 },
 {
  "name": "The Nirvana expert's ancient tomb",
  "zh": "古墓府",
  "ep": 18,
  "master": "Master of the Tomb",
  "masterEp": 21,
  "text": "In the Sky Flame Mountain Range. Only Creation-realm experts can break its seal. Mazes, an icy lake, a sea of fire and Symbol Puppets guard the Nirvana Heart (EP19-22)."
 },
 {
  "name": "Great Desolate Ancient Tablet",
  "zh": "大荒古碑",
  "ep": 27,
  "master": "Tian Ze and the Black-Eyed Elder",
  "masterEp": 35,
  "text": "An ancient sect's ruins in the desert by Eagle City, whose seal weakens every three years. Inside: quicksand, the Yin Wind Formation, the Manifestation Martial Tablet and an underground palace (EP34-38)."
 },
 {
  "name": "Xuanyin Crack",
  "zh": "玄阴涧",
  "ep": 42,
  "master": "The Devouring Ancestral Symbol",
  "masterEp": 43,
  "text": "Behind Yin Puppet City. The Yin Puppet Sect held the Devouring Ancestral Symbol here; Lin Dong is tested and accepted in its depths (EP42-44)."
 },
 {
  "name": "Sacred Spirit Pool",
  "zh": "圣灵潭",
  "ep": 50,
  "wiki": "Sacred Spirit Pool",
  "master": "Remains of the Ancient Heavenly Crocodile",
  "masterEp": 50,
  "text": "Under the Imperial City. The prize for the Battle of Seeds' winners; at the bottom lie a divine beast's bones and its Soul Treasure."
 },
 {
  "name": "Leiyan Valley treasure",
  "zh": "雷岩谷",
  "ep": 54,
  "master": "Stone puppets",
  "masterEp": 55,
  "text": "In the Ancient Battlefield. Holds the Heavenly Symbol Spirit Tree and one of the Ancient Secret Keys (EP54-56)."
 },
 {
  "name": "Ancient Treasure Trove",
  "zh": "远古秘藏",
  "ep": 61,
  "wiki": "Ancient Treasure Trove",
  "master": "The Eight Extremes Sect's remnant will; Qing Zhi",
  "masterEp": 64,
  "text": "Opened by four Ancient Secret Keys. A pill chamber, Tiangang Alliance ruins, the Eight Extremes Sect and the Four Sect Halls with the Green Dragon Hall (EP61-66)."
 },
 {
  "name": "Baichao Mountain",
  "zh": "百朝山",
  "ep": 70,
  "wiki": "Hundred Empire Mountain",
  "master": "Zheng Zhong's Heaven-Sealing Formation",
  "masterEp": 71,
  "text": "The summit where the Nirvana Ranking battle decides the Hundred Dynasties champion, and where the Western Xuan Region springs its plot (EP70-72)."
 }
],
  inventory: [
 {
  "ep": 1,
  "kind": "companion",
  "name": "Qing Tan",
  "zh": "青檀",
  "note": "His adopted sister. The Stone Talisman draws out her cold poison (EP2), and the Extreme Yin Dragon Saliva cures it (EP24). He leaves her with the family in Yan City when he sets out (EP24). She reaches Qi Creation on her own (EP45) and wins her match at the Lin Clan Gathering (EP47).",
  "cast": "qing-tan",
  "wiki": "Qing_Tan"
 },
 {
  "ep": 1,
  "kind": "treasure",
  "name": "Stone Talisman",
  "zh": "石符",
  "note": "Heals him, teaches him and refines pills and treasures. Its power fails and is restored in the Celestial Dan Pool (EP7, EP10). It shields him in the Xuanyin Crack (EP43) and holds the Blood Spirit Puppet (EP45).",
  "wiki": "Stone_Talisman"
 },
 {
  "ep": 1,
  "kind": "technique",
  "name": "Tong Bei Fist",
  "zh": "通背拳",
  "note": "Ten rings, copied from the shadow in the talisman's dream space.",
  "wiki": "Penetrating_Fist"
 },
 {
  "ep": 2,
  "kind": "technique",
  "name": "Eight Desolation Palm",
  "zh": "八荒掌",
  "note": "A 2nd-grade palm taught by Lin Xiao.",
  "wiki": "Eight_Desolations_Palm"
 },
 {
  "ep": 3,
  "kind": "treasure",
  "name": "Yin Pearl",
  "zh": "阴珠",
  "note": "A pearl of Yin Sha energy. He gives one to Qing Tan as a necklace (EP3), and its energy lifts him to Earthly Yuan (EP4).",
  "wiki": "Yin_Pearl"
 },
 {
  "ep": 3,
  "kind": "companion",
  "name": "Little Flame",
  "zh": "小炎",
  "note": "The sickly Fire Python Tiger cub from the Hunting Battle. It evolves on the Thunder Source Crystal Beast's essence (EP26), takes in Ancient Heavenly Crocodile blood (EP50) and becomes Lin Yan, a sworn brother in human form (EP59).",
  "cast": "little-flame",
  "wiki": "Little_Flame"
 },
 {
  "ep": 4,
  "kind": "technique",
  "name": "Qimen Seal",
  "zh": "奇门印",
  "note": "A 3rd-grade fragment; he reaches its third layer against Wu Sha (EP5) and its fourth against Wei Tong (EP12).",
  "wiki": "Wonder_Gate_Seal"
 },
 {
  "ep": 4,
  "kind": "treasure",
  "name": "Yang Yuan Stone vein and Yang Yuan Pills",
  "zh": "阳元石 / 阳元丹",
  "note": "The vein under Ironwood Manor; he refines the stone into pills with the talisman. Gui Yan forces Lin Zhentian to hand the vein over before Lin Dong kills him (EP16).",
  "wiki": "Yang_Yuan_Stone"
 },
 {
  "ep": 5,
  "kind": "treasure",
  "name": "Qiankun Bag",
  "zh": "乾坤袋",
  "note": "Bought for nine Yang Yuan Pills at the Mysterious Objects Tower.",
  "wiki": "Qian_Kun_Bag"
 },
 {
  "ep": 5,
  "kind": "treasure",
  "name": "Ancient divine wood fragment",
  "zh": "上古神木的碎片",
  "note": "Bought from under Zi Yue's nose at the Mysterious Objects Tower.",
  "lostEp": 6,
  "lostNote": "Gu Ying's needle breaks its barrier, and it teaches him the Ancient Swirl Symbol.",
  "wiki": "Qian Kun Wood"
 },
 {
  "ep": 5,
  "kind": "scripture",
  "name": "Divine Movement Chapter",
  "zh": "神动篇",
  "note": "Master Yan's book on Mental Strength.",
  "wiki": "Spiritual_Movement_Chapter"
 },
 {
  "ep": 5,
  "kind": "treasure",
  "name": "Yuan-Shattering Shuttle",
  "zh": "碎元梭",
  "note": "Taken from Wu Sha; steered by mind from EP6.",
  "wiki": "Shattering_Yuan_Shrapnel"
 },
 {
  "ep": 6,
  "kind": "technique",
  "name": "Ancient Swirl Symbol",
  "zh": "古旋符印",
  "note": "His Destiny Spirit Symbol, with a power of absorption.",
  "wiki": "Ancient_Swirl_Symbol"
 },
 {
  "ep": 6,
  "kind": "technique",
  "name": "Materialized Spirit Needle",
  "zh": "化神针",
  "note": "Learned from Gu Ying.",
  "wiki": "Materialized_Spirit_Needle"
 },
 {
  "ep": 8,
  "kind": "treasure",
  "name": "Void Spirit Grass",
  "zh": "虚灵草",
  "note": "A 5th-grade elixir bought for six hundred Yang Yuan Pills; Xia Wanjin sends more (EP12).",
  "wiki": "Void_Spirit_Grass"
 },
 {
  "ep": 8,
  "kind": "companion",
  "name": "Little Mink",
  "zh": "貂爷",
  "note": "A Celestial Demon Marten living in the Stone Talisman as a demon spirit. It rebuilds a body in human form and is called Lin Diao (EP66).",
  "cast": "little-mink",
  "wiki": "Celestial_Demon_Marten"
 },
 {
  "ep": 9,
  "kind": "technique",
  "name": "Spiral Wave",
  "zh": "尖螺波",
  "note": "An elite-grade mental secret art from Little Mink.",
  "wiki": "Piercing_Helicity"
 },
 {
  "ep": 10,
  "kind": "scripture",
  "name": "Qingyuan Art",
  "zh": "青元功",
  "note": "Lin Zhentian's cultivation method; too slow for the Celestial Dan Pool.",
  "wiki": "QingYuan_Art"
 },
 {
  "ep": 10,
  "kind": "scripture",
  "name": "Qi-Transforming Spirit Vortex",
  "zh": "化气精旋",
  "note": "Little Mink's absorption method.",
  "wiki": "Qi_Gathering_Mental_Vortex"
 },
 {
  "ep": 10,
  "kind": "scripture",
  "name": "Three Yang Art",
  "zh": "三阳决",
  "note": "Xuan Su's gift; it opens meridians.",
  "wiki": "Tri_Sun_Art"
 },
 {
  "ep": 10,
  "kind": "treasure",
  "name": "Yin Yang Pearls",
  "zh": "阴阳珠",
  "note": "Found under the Celestial Dan Pool.",
  "lostEp": 11,
  "lostNote": "Absorbed to form his eight-star Yuan Dan.",
  "wiki": "Yin Yang Pearl"
 },
 {
  "ep": 11,
  "kind": "physique",
  "name": "Eight-star Yuan Dan",
  "zh": "八星元丹",
  "note": "Formed with the Yin Yang Pearls after opening twenty-two meridians.",
  "wiki": "Nine_Stars_of_Yuan_Dan"
 },
 {
  "ep": 11,
  "kind": "technique",
  "name": "Pure Yuan Finger",
  "zh": "纯元指",
  "note": "Shown first when he tests his father.",
  "wiki": "Pure_Yuan_Finger"
 },
 {
  "ep": 13,
  "kind": "treasure",
  "name": "Mysterious Ice Swords",
  "zh": "冰玄剑",
  "note": "Three swords won from Cao Zhu.",
  "wiki": "Mysterious_Ice_Swords"
 },
 {
  "ep": 14,
  "kind": "treasure",
  "name": "Lihuo Sword",
  "zh": "离火剑",
  "note": "Taken from Liu Long in the Symbol Master Tower."
 },
 {
  "ep": 15,
  "kind": "technique",
  "name": "Huasheng Symbol Formation",
  "zh": "化生符阵",
  "note": "A Qi-grade Secret Spirit Skill; Huasheng Light (EP16) and Myriad Transformation Flame (EP18).",
  "wiki": "Manifestation_Symbol_Array"
 },
 {
  "ep": 16,
  "kind": "treasure",
  "name": "Ancestral Symbol locations",
  "zh": "祖符",
  "note": "A map of two Ancestral Symbol sites held in his Destiny Symbol.",
  "wiki": "Ancestral_Symbol"
 },
 {
  "ep": 17,
  "kind": "treasure",
  "name": "Blood Vermillion Devil Fruit",
  "zh": "妖血朱果",
  "note": "A 6th-grade elixir from Xuan Su.",
  "lostEp": 17,
  "lostNote": "Eaten; he reaches Yuan Dan advanced.",
  "wiki": "Blood Vermillion Devil Fruit"
 },
 {
  "ep": 19,
  "kind": "treasure",
  "name": "Pure Yuan Pills",
  "zh": "纯元丹",
  "note": "23,000 from the tomb, plus 20,000 from Di Teng (EP25) and 200,000 from Di Teng and Liu Kui (EP26). They are spent on puppet strikes, auctions and Little Mink's formations.",
  "lostEp": 43,
  "lostNote": "Little Mink spends 200,000 on a healing formation in the Xuanyin Crack, after the high-grade puppet burned most of the rest (EP35).",
  "wiki": "Pure Yuan Pill"
 },
 {
  "ep": 19,
  "kind": "treasure",
  "name": "Ancient Heavenly Scales Halberd",
  "zh": "天鳞古戟",
  "note": "Bound with blood essence in the tomb; refined into a high-grade Soul Treasure (EP30).",
  "wiki": "Ancient_Heavenly_Scales_Halberd"
 },
 {
  "ep": 20,
  "kind": "treasure",
  "name": "Mid-grade Symbol Puppet",
  "zh": "中等符傀",
  "note": "Bound in the tomb; 2,000 Pure Yuan Pills a strike.",
  "wiki": "Symbol_Puppet"
 },
 {
  "ep": 20,
  "kind": "treasure",
  "name": "Extreme Yin Dragon Saliva",
  "zh": "极煞阴龙涎",
  "note": "Taken from the tomb's icy lake for Qing Tan.",
  "lostEp": 24,
  "lostNote": "Used to help Qing Tan form her Yin Dan.",
  "wiki": "Extreme Yin Dragon Saliva"
 },
 {
  "ep": 21,
  "kind": "technique",
  "name": "Heavenly Scales Halberd Art",
  "zh": "天鳞戟法",
  "note": "Taught by the tomb master; Fish Scale, Python Scale, Flood Dragon and Heavenly Dragon Halberd.",
  "wiki": "Ancient_Heavenly_Scales_Halberd"
 },
 {
  "ep": 23,
  "kind": "treasure",
  "name": "Wang Yan's high-grade Qiankun Bag",
  "zh": "高级乾坤袋",
  "note": "Taken after he pins Wang Yan."
 },
 {
  "ep": 25,
  "kind": "treasure",
  "name": "Green Yuan Spear",
  "zh": "青元枪",
  "note": "Taken from Di Yun.",
  "lostEp": 25,
  "lostNote": "Sold back to Di Teng for 20,000 Pure Yuan Pills.",
  "wiki": "Green Yuan Spear"
 },
 {
  "ep": 25,
  "kind": "treasure",
  "name": "Thunder Source",
  "zh": "雷源",
  "note": "Snatched from the Thunder Source Crystal Beast under Di Teng's nose.",
  "lostEp": 26,
  "lostNote": "Refined into the Copper Thunder Body."
 },
 {
  "ep": 25,
  "kind": "physique",
  "name": "Great Sun Thunder Body",
  "zh": "大日雷体",
  "note": "Copper Thunder Body (EP26), Jade Thunder Body (EP34), perfected (EP46).",
  "wiki": "Great_Sun_Thunder_Body"
 },
 {
  "ep": 27,
  "kind": "technique",
  "name": "Subduing Golden Platform Magic Palm",
  "zh": "金台镇魔掌",
  "note": "A Wang Clan art; first used against the Mist Forest beasts.",
  "wiki": "Subduing_Golden_Platform_Magic_Palm"
 },
 {
  "ep": 28,
  "kind": "scripture",
  "name": "Demon Ape Transformation bone slip",
  "zh": "骨片",
  "note": "Found among Luo Jiu's things.",
  "lostEp": 30,
  "lostNote": "Mastered with Ancient Dragon Ape blood.",
  "wiki": "Devil Ape Transformation"
 },
 {
  "ep": 29,
  "kind": "treasure",
  "name": "Myriad Beast Fruit",
  "zh": "万兽果",
  "note": "Two taken from the Ancient Dragon Ape's lair; one goes to Gu Yan still carrying the ape's brand.",
  "lostEp": 32,
  "lostNote": "Refined to raise his cultivation.",
  "wiki": "Thousand Beast Fruit"
 },
 {
  "ep": 29,
  "kind": "treasure",
  "name": "Ancient Dragon Ape blood essence",
  "zh": "龙猿精血",
  "note": "Drawn while Little Mink hypnotises the ape.",
  "lostEp": 30,
  "lostNote": "Refined into the Demon Ape Transformation."
 },
 {
  "ep": 30,
  "kind": "physique",
  "name": "Demon Ape Transformation",
  "zh": "魔猿变",
  "note": "Mastered with Ancient Dragon Ape blood; it can be combined with the Thunder Body.",
  "wiki": "Devil_Ape_Transformation"
 },
 {
  "ep": 30,
  "kind": "treasure",
  "name": "Magic Scales Gold Heart",
  "zh": "魔鳞金心",
  "note": "Bought at the Martial Alliance auction for 20,000.",
  "wiki": "Magic_Scales_Gold_Heart"
 },
 {
  "ep": 30,
  "kind": "treasure",
  "name": "Mysterious prayer mat",
  "zh": "神秘蒲团",
  "note": "Bought for 100,000 Pure Yuan Pills; it gives him Yuan Essence Power (EP31).",
  "wiki": "Spirit_Accumulation_Praying_Mat"
 },
 {
  "ep": 31,
  "kind": "physique",
  "name": "Yuan Essence Power",
  "zh": "元精之力",
  "note": "Yuan Power and Mental Strength fused by the prayer mat.",
  "wiki": "Yuan_Essence_Energy"
 },
 {
  "ep": 34,
  "kind": "treasure",
  "name": "Nirvana Pill",
  "zh": "涅槃丹",
  "note": "Left by a dead ancient disciple in the tablet.",
  "wiki": "Nirvana_Pill"
 },
 {
  "ep": 35,
  "kind": "treasure",
  "name": "High-grade Symbol Puppet",
  "zh": "高等符傀",
  "note": "Taken from Elder Cao; burns Pure Yuan Pills fast.",
  "wiki": "Symbol_Puppet"
 },
 {
  "ep": 37,
  "kind": "technique",
  "name": "Great Desolate Heaven-Imprisoning Finger",
  "zh": "大荒囚天指",
  "note": "The ancient sect's Manifestation martial art. At first it paralyses him (EP38); he uses four fingers (EP49), then five (EP53).",
  "wiki": "Great_Desolate_Imprisoning_Heavenly_Finger"
 },
 {
  "ep": 38,
  "kind": "treasure",
  "name": "Lin Langtian's Qiankun Bag of Nirvana Pills",
  "zh": "乾坤袋",
  "note": "Lands with Lin Dong at the tablet's collapsing exit.",
  "wiki": "Nirvana_Pill"
 },
 {
  "ep": 39,
  "kind": "technique",
  "name": "Mental Energy Fire",
  "zh": "精神之火",
  "note": "Formed after the Ancient Tablet.",
  "wiki": "Mental_Energy_Fire"
 },
 {
  "ep": 40,
  "kind": "technique",
  "name": "Purple Shadow Nine Breaks",
  "zh": "紫影九破",
  "note": "A 9th-grade art taken from Teng Lei.",
  "wiki": "Nine_Destruction_Purple_Shadow"
 },
 {
  "ep": 42,
  "kind": "treasure",
  "name": "Devouring Ancestral Symbol",
  "zh": "吞噬祖符",
  "note": "Seized from the Yin Puppet Sect; refined and accepted as its heir (EP43).",
  "wiki": "Devouring_Ancestral_Symbol"
 },
 {
  "ep": 44,
  "kind": "technique",
  "name": "Great Desolate Sea-Splitting Seal",
  "zh": "大荒分海印",
  "note": "First used against Teng Sha.",
  "wiki": "Great_Desolate_Ocean_Splitting_Seal"
 },
 {
  "ep": 45,
  "kind": "companion",
  "name": "Blood Spirit Puppet",
  "zh": "血灵傀",
  "note": "A Nirvana-level spirit puppet sealed in the Stone Talisman under contract.",
  "cast": "blood-spirit-puppet"
 },
 {
  "ep": 46,
  "kind": "scripture",
  "name": "Taiqing Heaven-Roaming Step (incomplete)",
  "note": "Given by Old Ma Yi in exchange for an Ancestral Symbol rubbing; the manual is incomplete."
 },
 {
  "ep": 46,
  "kind": "treasure",
  "name": "Ancestral Symbol rubbing",
  "zh": "拓印",
  "note": "Handed to Old Ma Yi in place of the real Devouring Ancestral Symbol.",
  "lostEp": 46,
  "lostNote": "Given to Old Ma Yi."
 },
 {
  "ep": 48,
  "kind": "treasure",
  "name": "Heavy Prison Peak",
  "zh": "重狱峰",
  "note": "An Earth-grade Soul Treasure bound in the Lin Clan treasure vault.",
  "wiki": "Heavy_Prison_Peak"
 },
 {
  "ep": 50,
  "kind": "treasure",
  "name": "Heavenly Crocodile Bone Spear",
  "zh": "骨枪",
  "note": "The Ancient Heavenly Crocodile's Soul Treasure from under the Sacred Spirit Pool.",
  "wiki": "Heavenly_Crocodile_Bone_Spear"
 },
 {
  "ep": 53,
  "kind": "technique",
  "name": "Saint Elephant Sky Crumbling Tackle",
  "zh": "圣象崩天撞",
  "note": "Learned by practising Jin Mu's move.",
  "wiki": "Saint_Elephant_Sky_Crumbling_Tackle"
 },
 {
  "ep": 53,
  "kind": "scripture",
  "name": "Lesser Nirvana Golden Body",
  "zh": "小涅槃金身",
  "note": "A Manifestation-grade body art from Little Mink.",
  "wiki": "Lesser_Nirvana_Golden_Body"
 },
 {
  "ep": 53,
  "kind": "physique",
  "name": "Nirvana Golden Body",
  "zh": "涅槃金身",
  "note": "Forged with about ten thousand Nirvana Pills.",
  "wiki": "Lesser_Nirvana_Golden_Body"
 },
 {
  "ep": 54,
  "kind": "companion",
  "name": "Mo Ling",
  "zh": "莫凌",
  "note": "The third prince of the Great Yan Dynasty (EP49). He travels with Lin Dong to Leiyan Valley (EP54) and is freed from the Demon Rock Dynasty (EP57).",
  "lostEp": 60,
  "lostNote": "Parts ways so he will not slow the group down.",
  "cast": "mo-ling",
  "wiki": "Mo_Ling"
 },
 {
  "ep": 55,
  "kind": "treasure",
  "name": "Heavenly Symbol Spirit Tree",
  "zh": "天符灵树",
  "note": "Taken from Li Pan in Leiyan Valley.",
  "lostEp": 56,
  "lostNote": "Refined; he becomes a Heaven Symbol Master.",
  "wiki": "Heavenly Symbol Spirit Tree"
 },
 {
  "ep": 56,
  "kind": "treasure",
  "name": "Ancient Secret Key",
  "zh": "远古秘钥",
  "note": "Taken from a statue in Leiyan Valley. He takes a second key from Shi Kun (EP65).",
  "wiki": "Mysterious_Ancient_Key"
 },
 {
  "ep": 57,
  "kind": "technique",
  "name": "Wind Thunder Seal",
  "zh": "风雷印",
  "note": "First used against Chen Mu."
 },
 {
  "ep": 58,
  "kind": "technique",
  "name": "Devouring Thunder Palm",
  "zh": "吞噬雷掌",
  "note": "Mental Strength joined with the Power of Devouring."
 },
 {
  "ep": 62,
  "kind": "treasure",
  "name": "Life and Death Reincarnation Pill",
  "zh": "生死转轮丹",
  "note": "Taken from the pill furnace for Little Mink's body.",
  "wiki": "Samsara_Pill"
 },
 {
  "ep": 64,
  "kind": "treasure",
  "name": "Demon Dragon Hound's remnant soul",
  "zh": "妖魂",
  "note": "Kept by Little Mink after taming the Primordial Demon Dragon Hound.",
  "lostEp": 66,
  "lostNote": "Used to summon the Ancient Heavenly Crocodile's true soul against Hong Lie and You Qing."
 },
 {
  "ep": 65,
  "kind": "technique",
  "name": "Great Desolate Heaven-Imprisoning Hand",
  "zh": "大荒囚天手",
  "note": "A spiritual martial art from the Eight Extremes trial."
 },
 {
  "ep": 66,
  "kind": "technique",
  "name": "Green Heaven Materialized Dragon Skill",
  "zh": "化龙决",
  "note": "Qing Zhi's gift: Green Dragon Scale Shield, Green Dragon Immovable Bell and dragon form (EP71).",
  "wiki": "Green_Heaven_Materialized_Dragon_Skill"
 },
 {
  "ep": 68,
  "kind": "treasure",
  "name": "Black Dragon Sky-Roaring Seal",
  "zh": "黑龙啸天印",
  "note": "A Heaven-grade Soul Treasure taken from Feng Cang.",
  "wiki": "Black_Dragon_Sky_Roaring_Seal"
 },
 {
  "ep": 68,
  "kind": "companion",
  "name": "Su Rou",
  "note": "A Daqing Dynasty fighter carrying a sealed inheritance; she joins his group after he saves her twice.",
  "cast": "su-rou",
  "wiki": "Su_Rou"
 }
],
  terms: [
 [
  "Yuan Power",
  "元力",
  "Yuanli",
  "Origin Energy (novel)",
  2
 ],
 [
  "Mental Strength",
  "精神力",
  "mental strength",
  "Mental Energy, spiritual power",
  5
 ],
 [
  "Tempered Body",
  "淬体",
  "Body Tempering",
  "Body Quenching",
  1
 ],
 [
  "Earthly Yuan",
  "地元境",
  "Earth Yuan Realm",
  "Diyuan",
  1
 ],
 [
  "Heavenly Yuan",
  "天元境",
  "Tianyuan Realm",
  "",
  1
 ],
 [
  "Yuan Dan",
  "元丹境",
  "Yuan Dan Realm",
  "Yuan Core",
  1
 ],
 [
  "Form Creation",
  "造形境",
  "",
  "Shaping Realm, Form Creation Stage",
  18
 ],
 [
  "Qi Creation",
  "造气境",
  "",
  "Qi-making Realm",
  18
 ],
 [
  "Manifestation",
  "造化境",
  "Creation Realm",
  "Creation Stage, realm of good fortune",
  17
 ],
 [
  "the three Creation realms",
  "造化三境",
  "three realms of good fortune",
  "",
  6
 ],
 [
  "Nirvana",
  "涅槃境",
  "Nirvana",
  "",
  12
 ],
 [
  "Nirvana Tribulation",
  "涅槃劫",
  "Nirvana tribulation",
  "",
  50
 ],
 [
  "Yin Energy",
  "阴气",
  "yin energy",
  "",
  2
 ],
 [
  "Yuan Dan stars",
  "四星元丹",
  "Four Star Yuan Dan",
  "a Yuan Dan's one to nine star patterns",
  6
 ],
 [
  "Symbol Master",
  "符师",
  "Talisman Master",
  "Seal Master, rune master",
  5
 ],
 [
  "Spirit Symbol Master",
  "灵符师",
  "talisman master",
  "Soul Symbol Master (novel)",
  12
 ],
 [
  "Heaven Symbol Master",
  "天符师",
  "Tianfu Master, Sky Talisman Master",
  "",
  54
 ],
 [
  "Destiny Symbol",
  "本命符印",
  "natal seal",
  "",
  6
 ],
 [
  "Symbol Puppet",
  "符傀",
  "rune puppet",
  "",
  20
 ],
 [
  "Symbol Master Guild",
  "符师会",
  "Talisman Society",
  "",
  13
 ],
 [
  "Symbol Master Tower",
  "符师塔",
  "Rune Tower",
  "",
  12
 ],
 [
  "Stone Talisman",
  "石符",
  "stone talisman",
  "stone rune",
  1
 ],
 [
  "Ancestral Stone",
  "祖石",
  "Zushi",
  "",
  1
 ],
 [
  "Ancestral Symbol",
  "祖符",
  "ancestral talisman",
  "Zufu, ancestral charm",
  16
 ],
 [
  "Devouring Ancestral Symbol",
  "吞噬祖符",
  "Devour Ancestral Talisman",
  "",
  35
 ],
 [
  "Soul Treasure",
  "灵宝",
  "Lingbao",
  "Spirit Treasure",
  18
 ],
 [
  "martial art",
  "武学",
  "martial arts",
  "",
  2
 ],
 [
  "Manifestation martial art",
  "造化武学",
  "Good Fortune Martial Arts",
  "",
  36
 ],
 [
  "demon beast",
  "妖兽",
  "monster",
  "Demonic Beast (wiki)",
  3
 ],
 [
  "demon spirit",
  "妖灵",
  "demon spirit",
  "",
  4
 ],
 [
  "blood essence",
  "精血",
  "essence blood",
  "",
  19
 ],
 [
  "Qiankun Bag",
  "乾坤袋",
  "universe bag",
  "Cosmos Bag",
  5
 ],
 [
  "Yang Yuan Stone",
  "阳元石",
  "Yangyuan stone",
  "",
  4
 ],
 [
  "Pure Yuan Pill",
  "纯元丹",
  "pure yuan pills",
  "",
  19
 ],
 [
  "Nirvana Pill",
  "涅槃丹",
  "Nirvana pill",
  "",
  34
 ],
 [
  "Little Mink",
  "貂爷",
  "Mink, Mr. Mink",
  "Celestial Demon Marten, Lin Diao",
  1
 ],
 [
  "Celestial Demon Marten",
  "天妖貂",
  "demon mink",
  "Heavenly Demon Marten",
  8
 ],
 [
  "Great Sun Thunder Body",
  "大日雷体",
  "Great Sun Thunder Body",
  "solar thunder body",
  25
 ],
 [
  "Demon Ape Transformation",
  "魔猿变",
  "magic ape transformation",
  "",
  28
 ],
 [
  "Nirvana Golden Body",
  "涅槃金身",
  "",
  "",
  53
 ],
 [
  "Yuan Essence Power",
  "元精之力",
  "power of essence",
  "",
  31
 ],
 [
  "Lin Clan",
  "林氏宗族",
  "Lin clan",
  "inner clan (内族)",
  1
 ],
 [
  "Lin Clan Gathering",
  "宗族族会",
  "Lin clan competition",
  "",
  16
 ],
 [
  "clan competition",
  "族比",
  "clan comparison",
  "",
  1
 ],
 [
  "Hunting Battle",
  "狩猎战",
  "hunting battles",
  "",
  2
 ],
 [
  "Tower Battle",
  "塔斗",
  "tower fight",
  "",
  13
 ],
 [
  "Great Yan Dynasty",
  "大炎王朝",
  "Great Yan Dynasty",
  "Great Yan Empire",
  16
 ],
 [
  "Great Desolate Province",
  "大荒郡",
  "Dahuang County",
  "Great Wilderness Province",
  24
 ],
 [
  "Hundred Dynasties Battle",
  "百朝之战",
  "Battle of Hundred Dynasties",
  "Hundred Empire War",
  24
 ],
 [
  "Ancient Battlefield",
  "远古战场",
  "",
  "",
  44
 ],
 [
  "Battle of Seeds",
  "种子选拔赛",
  "seed selection competition",
  "Battle of Seeds (wiki)",
  49
 ],
 [
  "Nirvana Seal",
  "涅槃印",
  "Nirvana Seal",
  "",
  67
 ],
 [
  "Eastern Xuan Region",
  "东玄域",
  "Dongxuan domain",
  "East Xuan Continent",
  1
 ],
 [
  "Super Sect",
  "超级宗派",
  "super sects",
  "",
  51
 ],
 [
  "Yimo",
  "异魔",
  "Otherworldly",
  "Otherworld Demons",
  63
 ]
],
  ancestralSymbols: [
 {
  "name": "Ancestral Stone",
  "zh": "祖石",
  "ep": 1,
  "holder": "Lin Dong",
  "wiki": "Ancestral_Stone",
  "text": "EP1 opens with a wounded Little Mink refusing to hand over the Ancestral Stone and hiding it for its next heir. Lin Dong wakes the same night with the Stone Talisman in his hand, and Little Mink turns out to live inside it (EP8). The show never says in so many words that the Stone Talisman is the Ancestral Stone, but the Little Mink scenes tie the two together."
 },
 {
  "name": "The eight Ancestral Symbols",
  "zh": "祖符",
  "ep": 16,
  "holder": "Scattered; only one is held by Lin Dong",
  "wiki": "Ancestral_Symbol",
  "text": "Little Mink explains that Ancestral Symbols are not made by anyone. They form from the rules of heaven and earth, there are eight of them, and whoever holds one becomes the strongest in the world (EP16). A record of the Celestial Demon Marten clan tells of one supreme expert who held all eight, stopped a great catastrophe, then vanished with them (EP23)."
 },
 {
  "name": "Devouring Ancestral Symbol",
  "zh": "吞噬祖符",
  "ep": 34,
  "holder": "Lin Dong",
  "wiki": "Devouring_Ancestral_Symbol",
  "text": "Lin Dong first sees it as a black rune in a dead disciple's memories (EP34). He meets its previous master, the Black-Eyed Elder, inside the Great Desolate Ancient Tablet (EP35), seizes it from the Yin Puppet Sect (EP42) and is accepted as its heir in the Xuanyin Crack (EP43). Its Power of Devouring absorbs energy and attacks and turns them into his own strength, from the crack's cold (EP44) to Song Zhen's Taotie (EP70) and the tribulation lightning (EP72)."
 },
 {
  "name": "Fire Ancestral Symbol",
  "zh": "火焰祖符",
  "ep": 43,
  "holder": "Unknown",
  "wiki": "Blazing_Ancestral_Symbol",
  "text": "It is only named so far. Little Mink says he once saw a great master try to refine it, and the Heavenly Fire burned him to ashes (EP43). He tells the story to warn Lin Dong that an Ancestral Symbol must accept its holder."
 },
 {
  "name": "The second symbol on the map",
  "zh": "祖符",
  "ep": 16,
  "holder": "Unknown",
  "wiki": "Ancestral_Symbol",
  "text": "An Ancestral Symbol rubbing in the Symbol Master Tower's hidden space puts a map of the Great Yan Dynasty into Lin Dong's Destiny Symbol. The map marks where two Ancestral Symbols lie (EP16). By EP72 he holds one of them, the Devouring Ancestral Symbol, and the second has not been named or found."
 }
],
  bodies: [
 {
  "ep": 11,
  "title": "Twenty-two meridians and an eight-star Yuan Dan",
  "zh": "八星元丹",
  "text": "With the Three Yang Art and the Stone Talisman, Lin Dong opens twenty-two meridians. The Yin Yang Pearls then give him an eight-star Yuan Dan, twice his grandfather's four stars (EP11)."
 },
 {
  "ep": 25,
  "title": "Great Sun Thunder Body",
  "zh": "大日雷体",
  "wiki": "Great_Sun_Thunder_Body",
  "text": "On the road to Great Desolate Province he trains the body art by calling lightning down on a snowy peak. One meridian is still closed, so he cannot yet form its first layer (EP25)."
 },
 {
  "ep": 26,
  "title": "Copper Thunder Body",
  "zh": "铜雷体",
  "wiki": "Great_Sun_Thunder_Body",
  "text": "The first layer of the Great Sun Thunder Body. He forms it by refining the Thunder Source he stole from under Di Teng, and breaks through to Form Creation at the same time (EP26)."
 },
 {
  "ep": 30,
  "title": "Demon Ape Transformation",
  "zh": "魔猿变",
  "wiki": "Devil_Ape_Transformation",
  "text": "He finds the art on a bone slip among Luo Jiu's things (EP28) and draws blood essence from the Manifestation-level Ancient Dragon Ape (EP29). Refining that blood gives him a far stronger transformation than Luo Jiu's, and he can combine it with the Copper Thunder Body (EP30)."
 },
 {
  "ep": 34,
  "title": "Jade Thunder Body",
  "zh": "玉雷体",
  "wiki": "Great_Sun_Thunder_Body",
  "text": "The winds of a Yin Wind Formation inside the Great Desolate Ancient Tablet nearly tear him apart and push the Copper Thunder Body up to the Jade Thunder Body (EP34)."
 },
 {
  "ep": 46,
  "title": "Great Sun Thunder Body perfected",
  "zh": "大日雷体大成",
  "wiki": "Great_Sun_Thunder_Body",
  "text": "After two months of training on the way to Lin City he perfects the Great Sun Thunder Body (EP46). He uses it against Lin Langtian (EP48) and to hold down the Eight Extremes master's palm force (EP64)."
 },
 {
  "ep": 53,
  "title": "Nirvana Golden Body",
  "zh": "涅槃金身",
  "wiki": "Lesser_Nirvana_Golden_Body",
  "text": "Little Mink teaches him the Lesser Nirvana Golden Body, a Manifestation-grade body art, and burns about ten thousand Nirvana Pills to forge it (EP53). He uses it to push past Hua Yun's men (EP54) and to escape Li Pan (EP55)."
 },
 {
  "ep": 71,
  "title": "Green Dragon form",
  "zh": "化龙决",
  "wiki": "Green_Heaven_Materialized_Dragon_Skill",
  "text": "Qing Zhi gives him the Green Heaven Materialized Dragon Skill in the Green Dragon Hall (EP66). Against Lin Langtian he uses the force of his own Green Dragon Immovable Bell to call the Green Dragon's spirit and take dragon form (EP71)."
 }
],
  contests: [
 {
  "ep": 2,
  "title": "Lin family competition",
  "zh": "族比",
  "text": "Lin Hong boasts he will win and claim Qing Tan. He beats her and is about to be named winner when Lin Dong arrives late and beats him at Tempered Body 7th layer. The win makes Lin Dong the family's pick for the Hunting Battle (EP2)."
 },
 {
  "ep": 3,
  "title": "Hunting Battle",
  "zh": "狩猎战",
  "text": "The Lin family against the allied Lei and Xie families: each side must bring back a Fire Python Tiger scale. Lin Dong comes out with a tiger cub, and Lei Bao stakes Ironwood Manor on a duel for the cubs (EP3). Lin Dong reaches Earthly Yuan, beats Lei Li with the Qimen Seal and wins the manor (EP4)."
 },
 {
  "ep": 9,
  "title": "Celestial Dan Pool contest",
  "zh": "丹仙池",
  "text": "Lin Dong fights for the Thousand Gold Association against the Blood Wolf Gang. The prize is the pool, and his own price is a soak in it. He wins the deciding round against Jiang Li with the Spiral Wave (EP9) and reaches Heavenly Yuan late in the pool (EP10)."
 },
 {
  "ep": 11,
  "title": "Fight to the death with Wei Tong",
  "zh": "生死斗",
  "text": "Lin Dong offers the Blood Cloth Sect a wager instead of a war on his family, set for two months later at the Yan City arena (EP7). The Blood Wolf Gang takes Qing Tan hostage mid-fight (EP11). Lin Dong frees her, breaks Wei Tong with the fourth layer of the Qimen Seal and kills him (EP12)."
 },
 {
  "ep": 13,
  "title": "Symbol Master Tower Battle",
  "zh": "塔斗",
  "text": "Yan City's Symbol Master Guild has lost the tower contest to Sky Fire City twice in a row. Master Yan enters Lin Dong, who first beats Cao Zhu at the guild (EP13). He then beats Liu Long and Cao Zhu inside the tower (EP14). He passes Zhou Tong to become the first in many years to reach the eighth floor, and Yan City wins (EP15)."
 },
 {
  "ep": 28,
  "title": "Fight to the death in Eagle City",
  "zh": "生死斗",
  "text": "Luo Jiu of the Bloody Vulture Dojo challenges Jiang Lei of the Eagle Martial Dojo (EP27). Lin Dong fights in Jiang Lei's place as a new disciple and beats the Form Creation peak Luo Jiu. Luo Jiu gives up, and the Bloody Vulture Dojo is driven out of Eagle City (EP28)."
 },
 {
  "ep": 36,
  "title": "Seats at the Manifestation Martial Tablet",
  "zh": "席位",
  "text": "Ten seats decide who may enter the tablet's store of martial arts. Lin Dong takes one and beats Wang Tong when he attacks him for it (EP36). Inside, he wins a Manifestation martial art and breaks through to Qi Creation (EP37)."
 },
 {
  "ep": 47,
  "title": "Lin Clan Gathering",
  "zh": "林氏族比",
  "text": "This is the goal Lin Dong set himself two years earlier: beat Lin Langtian and bring the Yan City branch back into the clan. The draw is rigged against the branch, and Lin Dong beats the twins Lin Qing and Lin Mu with one move (EP47). His fight with Lin Langtian is stopped by patriarch Lin Fan, who names Lin Dong champion and takes the branch back (EP48)."
 },
 {
  "ep": 49,
  "title": "Battle of Seeds",
  "zh": "种子选拔赛",
  "text": "The Great Yan Dynasty's selection for the Hundred Dynasties Battle, with five places. Lin Dong beats Huangpu Ying and then Wang Zhong, the Wang Clan's genius, with four fingers of the Great Desolate Heaven-Imprisoning Finger. He takes a place with Mo Ling, Lin Langtian, Du Yun and Man Shan (EP49)."
 },
 {
  "ep": 51,
  "title": "Hundred Dynasties Battle: the Ancient Battlefield",
  "zh": "百朝大战",
  "text": "Contestants must survive a year in the Ancient Battlefield, and only those who reach Nirvana may go on to compete for places in the super sects (EP51). Lin Dong reaches One Yuan Nirvana in the Pill River (EP60). After the Green Dragon Hall he is sent on to Wanxiang City (EP66)."
 },
 {
  "ep": 67,
  "title": "Hundred Dynasties Battle: Nirvana Seals",
  "zh": "涅槃印",
  "text": "The Nirvana Monument hands out Heaven, Earth and Human tier Nirvana Seals, and Lin Dong starts second in the Earth tier. The top 24 after three days climb Baichao Mountain (EP67). He kills Feng Cang and rises to the Heaven tier (EP68). With the Song brothers' seals he finishes eighth (EP70)."
 },
 {
  "ep": 70,
  "title": "Nirvana Ranking battle on Baichao Mountain",
  "zh": "涅槃金榜",
  "text": "Any means are allowed, and the top three may choose their super sect. Lin Dong draws Lin Langtian in the first round (EP70) and overwhelms him in dragon form (EP71). After the Western Xuan Region's plot is broken, the super sects name Lin Dong champion, and he chooses the Dao Sect over the Yuan Gate (EP72)."
 }
],
  symbolArts: [
 {
  "name": "Divine Movement Chapter",
  "zh": "神动篇",
  "ep": 5,
  "wiki": "Spiritual_Movement_Chapter",
  "text": "The book Master Yan gives Lin Dong when he offers to teach him (EP5). With it Lin Dong condenses his first Destiny Symbol (EP6)."
 },
 {
  "name": "Destiny Symbol",
  "zh": "本命符印",
  "ep": 6,
  "wiki": "Destiny_Symbol",
  "text": "A Symbol Master condenses it from Mental Strength, and it is the basis of every seal rank. Lin Dong's first makes him a 1st Seal Symbol Master and lets him steer the Yuan-Shattering Shuttle with his mind (EP6). It later swallows Cao Zhu's mental attacks (EP13) and the tower's lightning snakes (EP15)."
 },
 {
  "name": "Ancient Swirl Symbol",
  "zh": "古旋符印",
  "ep": 6,
  "wiki": "Ancient_Swirl_Symbol",
  "text": "Lin Dong learns it from the ancient divine wood after Gu Ying's needle breaks its barrier, and it absorbs Gu Ying's Destiny Symbol (EP6). Master Yan explains that there are three kinds of Destiny Symbol. This one is a rare Destiny Spirit Symbol with a power of absorption (EP8)."
 },
 {
  "name": "Materialized Spirit Needle",
  "zh": "化神针",
  "ep": 6,
  "wiki": "Materialized_Spirit_Needle",
  "text": "Gu Ying's mental needle, which Lin Dong picks up from fighting him (EP6). He hides one inside a Spiral Wave to break the arena's mental barrier and kill Qing Tan's captor (EP12)."
 },
 {
  "name": "Flying with Mental Strength",
  "zh": "御空而行",
  "ep": 7,
  "text": "Lin Dong rises out of reach of the Blood Cloth Sect's archers with Mental Strength and threatens to vanish and train in secret (EP7). Wei Tong's side later puts up a mental barrier over the arena to stop him flying away (EP11)."
 },
 {
  "name": "Mental Grindstone",
  "zh": "精神磨盘",
  "ep": 9,
  "wiki": "Mind_Millstone",
  "text": "Little Mink's training place inside the Stone Talisman. It crushes Mental Strength and rebuilds it stronger, and Lin Dong lasts ten turns on his first try (EP9)."
 },
 {
  "name": "Spiral Wave",
  "zh": "尖螺波",
  "ep": 9,
  "wiki": "Piercing_Helicity",
  "text": "An elite-grade mental secret art Little Mink teaches him. It wins him the Celestial Dan Pool contest against Jiang Li (EP9) and carries the hidden needle in the Wei Tong duel (EP12)."
 },
 {
  "name": "Mind-steered weapons",
  "zh": "碎元梭 / 冰玄剑",
  "ep": 6,
  "text": "As a Symbol Master Lin Dong flies weapons with his mind: first the Yuan-Shattering Shuttle (EP6), then Cao Zhu's three Mysterious Ice Swords (EP13). In the tower he steers all four at once against Liu Long and Cao Zhu (EP14)."
 },
 {
  "name": "Symbol Master Tower",
  "zh": "符师塔",
  "ep": 14,
  "wiki": "Symbol_Master_Tower",
  "text": "A tower whose pressure stops weak entrants and whose floors strengthen the Mental Strength of those who climb (EP14). Lin Dong reaches its eighth floor and its hidden space, which no one had entered in a hundred years (EP15-16)."
 },
 {
  "name": "Spirit Merge",
  "zh": "合神",
  "ep": 14,
  "text": "Liu Long and Cao Zhu merge their spirits to attack Lin Dong together on the tower's fifth floor. His Destiny Symbol drinks the mental power off their swords, and he wins (EP14)."
 },
 {
  "name": "Mental Arrows and the Ten Thousand Arrows Formation",
  "zh": "精神箭 / 万箭阵",
  "ep": 15,
  "text": "Mental attacks traded between Lin Dong and Zhou Tong in their race for the tower's eighth floor (EP15)."
 },
 {
  "name": "Huasheng Symbol Formation",
  "zh": "化生符阵",
  "ep": 15,
  "wiki": "Manifestation_Symbol_Array",
  "text": "A Qi-grade Secret Spirit Skill Lin Dong finds on the tower's eighth floor. He is too weak to use it at first (EP15). It names three moves: Huasheng Light, Huasheng Blue Wave and Myriad Transformation Flame."
 },
 {
  "name": "Huasheng Light",
  "zh": "化生光",
  "ep": 16,
  "wiki": "Manifestation_Symbol_Array",
  "text": "The first move of the Huasheng Symbol Formation. Lin Dong tests it after reaching the 3rd Seal and kills Gui Yan with it the same day (EP16)."
 },
 {
  "name": "Myriad Transformation Flame",
  "zh": "万化炎",
  "ep": 18,
  "wiki": "Manifestation_Symbol_Array",
  "text": "A fire move of the Huasheng Symbol Formation. Lin Dong uses it on Song Dao (EP18), the tomb's Symbol Puppet and fire dragons (EP20), and to burn away Qing Tan's Fiend Devil Qi (EP24)."
 },
 {
  "name": "Ancestral Symbol rubbing",
  "zh": "拓印",
  "ep": 16,
  "wiki": "Ancestral_Symbol",
  "text": "A rubbing of an Ancestral Symbol in the tower's hidden space. It puts a map with two Ancestral Symbol locations into Lin Dong's Destiny Symbol (EP16). He later hands a rubbing to Old Ma Yi in place of the real Symbol (EP46)."
 },
 {
  "name": "Low-grade Symbol Puppet",
  "zh": "下等符傀",
  "ep": 20,
  "wiki": "Symbol_Puppet",
  "text": "Puppets driven by a symbol formation on their bodies; even a low-grade one can easily kill a Yuan Dan perfect fighter. In the ancient tomb Lin Dong destroys one by striking that formation (EP20)."
 },
 {
  "name": "Mid-grade Symbol Puppet",
  "zh": "中等符傀",
  "ep": 20,
  "wiki": "Symbol_Puppet",
  "text": "Rivals the three Creation realms, but each strike costs 2,000 Pure Yuan Pills. Lin Dong binds an intact one in the tomb (EP20) and uses it on Wang Yan (EP23)."
 },
 {
  "name": "High-grade Symbol Puppet",
  "zh": "高等符傀",
  "ep": 35,
  "wiki": "Symbol_Puppet",
  "text": "Lin Dong takes one from Elder Cao inside the Great Desolate Ancient Tablet. He drives off Teng Lei's Yin Puppet Formation with it, though it burns through his Pure Yuan Pills (EP35). Teng Sha brings out two of his own (EP41)."
 },
 {
  "name": "Spiritual imprint",
  "zh": "精神烙印",
  "ep": 35,
  "text": "The mental brand that binds a Symbol Puppet to its master. Elder Cao is laying his on the high-grade Symbol Puppet when Lin Dong forces him to give it up (EP35)."
 },
 {
  "name": "Yuan Essence Power",
  "zh": "元精之力",
  "ep": 31,
  "wiki": "Yuan_Essence_Energy",
  "text": "The prayer mat's formation fuses Yuan Power and Mental Strength, poured in together in balance, into one force (EP31). It breaks Hua Zong's Mysterious Earth Armor at once (EP31). Lin Dong still uses it against Shi Kun (EP61)."
 },
 {
  "name": "Essence-Eroding Bone Seal",
  "zh": "蚀精骨印",
  "ep": 31,
  "text": "Hua Zong, a Spirit Symbol Master, tries to drain Lin Dong's Mental Strength with it. It backfires and kills him (EP31). Lin Dong absorbs the gloomy Mental Strength left in him (EP32)."
 },
 {
  "name": "Mental Energy Fire",
  "zh": "精神之火",
  "ep": 39,
  "wiki": "Mental_Energy_Fire",
  "text": "Grand Master Cheng uses it to refine the Ancient Heavenly Scales Halberd (EP30). Lin Dong forms his own (EP39) and uses it to turn the fight with Cao Zhen (EP40)."
 },
 {
  "name": "Blood Spirit Puppet",
  "zh": "血灵傀",
  "ep": 45,
  "text": "A spirit puppet as strong as a Nirvana expert and hungry for blood, sealed deep in Yin Puppet Mountain. Lin Dong seals it in the Stone Talisman under contract (EP45). It runs wild on the Ancient Battlefield's evil qi, and he has to recall it (EP52)."
 },
 {
  "name": "Heavenly Symbol Spirit Tree",
  "zh": "天符灵树",
  "ep": 54,
  "wiki": "Heavenly_Symbol_Spirit_Tree",
  "text": "A tree in Leiyan Valley that can lift an advanced Spirit Symbol Master to Heaven Symbol Master (EP54). Lin Dong takes it from under Li Pan (EP55). He refines it while Little Mink destroys an old remnant soul trying to seize his body (EP56)."
 },
 {
  "name": "Stone puppets",
  "zh": "石傀",
  "ep": 55,
  "text": "The statues of the Leiyan Valley hall wake as stone puppets of at least Nirvana level. Little Mink smells the real Ancient Secret Key inside one of them (EP55)."
 },
 {
  "name": "Mental barrier",
  "zh": "精神壁垒",
  "ep": 57,
  "text": "A barrier only a Heaven Symbol Master can make. Lin Dong traps Li Pan's group behind one and trades them for Mo Ling (EP57)."
 },
 {
  "name": "Devouring Thunder Palm",
  "zh": "吞噬雷掌",
  "ep": 58,
  "text": "Lin Dong creates it on Little Mink's advice by joining Mental Strength with the Power of Devouring, while fighting the Mighty Earthsplitting Tiger (EP58). He escapes the pill furnace with it (EP62)."
 },
 {
  "name": "Spirit Driving Art",
  "zh": "驱灵术",
  "ep": 63,
  "text": "Mu Sha, a Heaven Symbol Master of the Youquan Dynasty, uses it to drive the Eight Extremes Sect's statues and the Primordial Demon Dragon Hound (EP63). The hound's soul resists, and he dies after burning out his Mental Strength (EP64)."
 },
 {
  "name": "Heaven Symbol tribulation",
  "zh": "风雷劫",
  "ep": 72,
  "text": "On Baichao Mountain Lin Dong passes three wind and thunder tribulations in a row, rising from 1st Seal to 4th Seal Heaven Symbol Master. He takes in their lightning with the Devouring Ancestral Symbol and the Stone Talisman and turns it on the Heaven-Sealing Formation Diagram's core (EP72)."
 }
]
};
})();
