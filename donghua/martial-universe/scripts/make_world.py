"""Write site/data/world.js: the hand-curated lists below plus cache/only-here.json and cache/terms.json.

Usage: python3 scripts/make_world.py
Everything here is checked against data/episodes/review/ (EP = continuous episode number; NOVEL = 9999, not in the
donghua yet). Edit the lists here, not world.js. only-here.json (journey, inventory, Ancestral Symbols, bodies,
contests, Symbol arts and ranks) was researched from the reviews; terms.json is 02-terminology.md's table.
"""
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
NOVEL = 9999
OH = json.loads((ROOT / "cache" / "only-here.json").read_text())
TERMS = json.loads((ROOT / "cache" / "terms.json").read_text())

realms = [
    {"id": "tempered", "name": "Tempered Body", "subs": "Body Tempering", "zh": "淬体", "where": "Flesh, bones and marrow",
     "lifespan": "", "wiki": "Tempered Body", "heroEp": 1,
     "gist": "Nine layers of hammering the body until a Yuan Power seed forms in the marrow. Lin Dong starts at the 2nd layer.",
     "stages": [
         {"name": "1st-3rd layer", "zh": "一至三重", "ep": 1, "text": "Plain training of the flesh. Lin Dong is at the 2nd layer when the Stone Talisman finds him, and reaches the 4th the same night."},
         {"name": "4th-6th layer", "zh": "四至六重", "ep": 1, "text": "Skin and bone are tempered. The talisman's liquid takes him to the 6th layer for the clan competition (EP2)."},
         {"name": "7th-9th layer", "zh": "七至九重", "ep": 2, "text": "A Yuan Power seed forms and rises toward the dantian. He wins the clan competition at the 7th layer and reaches the 9th before the Hunting Battle (EP3)."},
     ]},
    {"id": "earthly", "name": "Earthly Yuan", "subs": "Earth Yuan Realm", "zh": "地元境", "where": "Yin Energy in the dantian",
     "lifespan": "", "wiki": "Earthly Yuan Stage", "heroEp": 4,
     "gist": "The body draws Yin Energy from heaven and earth and fuses it with its Yuan Power. Lin Langtian was here at ten.",
     "stages": [
         {"name": "Early", "zh": "初期", "ep": 4, "text": "Lin Dong breaks through after the Hunting Battle, helped by a Yin Pearl's energy."},
         {"name": "Middle", "zh": "中期", "ep": 4, "text": ""},
         {"name": "Late", "zh": "后期", "ep": 5, "text": "Where he stands when Wu Sha attacks on the road from Yan City (EP5)."},
     ]},
    {"id": "heavenly", "name": "Heavenly Yuan", "subs": "Tianyuan Realm", "zh": "天元境", "where": "Yang Energy in the dantian",
     "lifespan": "", "wiki": "Heavenly Yuan Stage", "heroEp": 5,
     "gist": "Yang Energy joins the Yin. A Fire Python Tiger counts as a Heavenly Yuan fighter (EP3).",
     "stages": [
         {"name": "Early", "zh": "初期", "ep": 5, "text": "He breaks through in the middle of the fight with Wu Sha."},
         {"name": "Late", "zh": "后期", "ep": 10, "text": "Reached in the Celestial Dan Pool."},
     ]},
    {"id": "yuandan", "name": "Yuan Dan", "subs": "Yuan Dan Realm", "zh": "元丹境", "where": "A Yuan Dan forms in the dantian",
     "lifespan": "", "wiki": "Yuan Dan Stage", "heroEp": 11,
     "gist": "Yin and Yang fuse into a Yuan Dan marked with one to nine stars. Its star count is the talent people judge you by.",
     "stages": [
         {"name": "Initial", "zh": "小元丹", "ep": 11, "text": "Lin Dong opens twenty-two meridians and forms an eight-star Yuan Dan with the Yin Yang Pearls. Lin Zhentian's has four stars (EP6)."},
         {"name": "Advanced", "zh": "小圆满", "ep": 17, "text": "The Blood Vermillion Devil Fruit takes him here before the ancient tomb."},
         {"name": "Perfect", "zh": "大圆满", "ep": 22, "text": "Reached with the Nirvana Heart's power in the tomb."},
     ]},
    {"id": "form", "name": "Form Creation", "subs": "", "zh": "造形境", "where": "Yuan Power takes shape",
     "lifespan": "", "wiki": "Form Creation Stage", "heroEp": 26,
     "gist": "First of the three Creation realms (造化三境): Yuan Power can be shaped into anything. Only Creation experts can break the ancient tomb's seal (EP18).",
     "stages": [
         {"name": "Initial", "zh": "初入", "ep": 26, "text": "He breaks through as the Thunder Source forges his Copper Thunder Body."},
         {"name": "Advanced", "zh": "小成", "ep": 25, "text": "Di Teng's realm (EP25)."},
         {"name": "Peak", "zh": "大成", "ep": 27, "text": "Luo Jiu's realm in Eagle City (EP27)."},
     ]},
    {"id": "qi", "name": "Qi Creation", "subs": "", "zh": "造气境", "where": "Shaped power becomes solid",
     "lifespan": "", "wiki": "Qi Creation Stage", "heroEp": 37,
     "gist": "What Yuan Power makes is as solid as the real thing. Lin Langtian is already here in EP18.",
     "stages": [
         {"name": "Initial", "zh": "初入", "ep": 33, "text": "Wang Yan, when Lin Dong beats him at the Ancient Tablet (EP33)."},
         {"name": "Advanced", "zh": "小成", "ep": 32, "text": "Hua Gu of the Yin Puppet Sect (EP32)."},
         {"name": "Lin Dong", "zh": "", "ep": 37, "text": "He breaks through inside the Manifestation Martial Tablet."},
     ]},
    {"id": "manifest", "name": "Manifestation", "subs": "Creation Realm", "zh": "造化境", "where": "Last of the three Creation realms",
     "lifespan": "", "wiki": "Manifestation Stage", "heroEp": 48,
     "gist": "The peak below Nirvana. The Yin Puppet Sect has three Manifestation experts (EP40); the Ancient Dragon Ape is one (EP29).",
     "stages": [
         {"name": "Half-step Manifestation", "zh": "半步造化", "ep": 36, "text": "Lin Langtian at the Martial Tablet (EP36). Lin Dong jumps here from Qi Creation in the Xuanyin Crack (EP44)."},
         {"name": "Initial", "zh": "初入", "ep": 48, "text": "After a month in the Lin Clan treasure vault."},
         {"name": "Peak", "zh": "大成", "ep": 39, "text": "Teng Sha (EP39). Lin Dong is here at Leiyan Valley (EP54)."},
         {"name": "Half-step Nirvana", "zh": "半步涅槃", "ep": 51, "text": "Jin Mu of the Holy Light Dynasty (EP51). Lin Dong is called this before his tribulation (EP60)."},
     ]},
    {"id": "nirvana", "name": "Nirvana", "subs": "Nirvana", "zh": "涅槃境", "where": "Through the Nirvana Tribulation",
     "lifespan": "", "wiki": "Nirvana Stage", "heroEp": 60,
     "gist": "Entered by surviving the Nirvana Tribulation (涅槃劫). Counted in Yuan, one to nine. Demon beasts that survive it can take human form (EP50). Only Nirvana fighters may compete for super-sect places (EP51).",
     "stages": [
         {"name": "One Yuan Nirvana", "zh": "一元涅槃", "ep": 49, "text": "Emperor Mo Jingtian (EP49). Lin Dong passes his tribulation in the Pill River (EP60)."},
         {"name": "Two Yuan Nirvana", "zh": "二元涅槃", "ep": 61, "text": "Shi Kun at its peak (EP61). Lin Dong, then Three Yuan, in the Green Dragon Hall (EP66)."},
         {"name": "Four Yuan Nirvana", "zh": "四元涅槃", "ep": 67, "text": "Feng Cang at its peak (EP67). Lin Dong breaks through mid-fight (EP69)."},
         {"name": "Five to Six Yuan", "zh": "五元 · 六元", "ep": 38, "text": "Tian Ze, guardian of the ancient sect, is at least Five Yuan (EP38); Qin Tian is Six Yuan (EP68)."},
         {"name": "Seven to Nine Yuan", "zh": "七元至九元", "ep": 52, "text": "The beast behind Yang City's tide is at least Nine Yuan (EP52); the revived Death Spirit General at least Seven (EP71)."},
     ]},
]

beyond = [
    {"name": "Profound Life", "zh": "生玄境", "wiki": "Profound Life Stage", "text": "Seen once: Zheng Zhong of the Western Xuan Region at the Hundred Dynasties final (EP72). Grasping life, in the opening saying."},
    {"name": "Profound Death", "zh": "死玄境", "wiki": "Profound Death Stage", "text": "Grasping death. Not on screen yet."},
    {"name": "Reincarnation", "zh": "轮回境", "wiki": "Samsara Stage", "text": "Mastering the cycle of rebirth (the wiki also says Samsara). Not on screen yet."},
    {"name": "Ancestor", "zh": "祖境", "wiki": "Ancestor Stage", "text": "The top of the ladder in the novel. Not on screen yet."},
]

symbol_ladder = [{"name": r["name"], "zh": r["zh"], "eq": (f"Lin Dong: EP{r['ep']}" if r["ep"] < NOVEL else "not yet"), "text": r["text"]}
                 for r in OH["symbolRanks"]]

grades = [
    "Martial arts: 1st grade and up (一品…), then superior (上乘), Manifestation-grade (造化武学) and spiritual (灵武学)",
    "Soul Treasures: low, mid and high grade (低级 · 中级 · 高级灵宝)",
    "Earth-grade Soul Treasure (地阶): Heavy Prison Peak, EP48",
    "Heaven-grade Soul Treasure (天阶): the Black Dragon Sky-Roaring Seal, EP68",
    "Elixirs: graded by number (5th-grade Void Spirit Grass, EP8; 6th grade, EP17)",
    "Pills as currency: Yang Yuan Pills → Pure Yuan Pills → Nirvana Pills",
]

tiers = [
    {"n": 7, "name": "Super Sects", "zh": "超级宗派", "top": "Profound Life and above (Zheng Zhong, EP72). They pick the best of the Hundred Dynasties Battle.", "examples": ["Dao Sect", "Yuan Gate", "Nine Heavens Taiqing Palace"], "ep": 18},
    {"n": 6, "name": "Super dynasties", "zh": "超级王朝", "top": "Many Nirvana experts; their young fighters reach Four to Six Yuan Nirvana", "examples": ["Demon Rock Dynasty", "Fengyun Dynasty"], "ep": 54},
    {"n": 5, "name": "Dynasties", "zh": "王朝", "top": "An emperor at Nirvana (Mo Jingtian, One Yuan, EP49)", "examples": ["Great Yan Dynasty", "Holy Light Dynasty", "Xuanbing Dynasty"], "ep": 16},
    {"n": 4, "name": "The Four Great Clans", "zh": "四大宗族", "top": "A Nirvana patriarch (Lin Fan, EP48); young geniuses at Qi Creation to Manifestation", "examples": ["Lin Clan", "Wang Clan", "Qin Clan", "Huangpu Clan"], "ep": 17},
    {"n": 3, "name": "Province sects", "zh": "大荒郡三大宗派", "top": "Several Manifestation elders (the Yin Puppet Sect has three, EP40)", "examples": ["Yin Puppet Sect", "Great Demon Sect", "Martial Alliance"], "ep": 30},
    {"n": 2, "name": "City powers", "zh": "城中势力", "top": "A leader at Yuan Dan perfect, sometimes a Symbol Master", "examples": ["Thousand Gold Association", "Blood Wolf Gang", "Symbol Master Guild", "Eagle Martial Dojo"], "ep": 5},
    {"n": 1, "name": "Town families", "zh": "家族", "top": "A head at Heavenly Yuan or the first steps of Yuan Dan", "examples": ["Lin Family", "Lei Family", "Xie Family"], "ep": 1},
]

regions = [
    {"id": "qingyang", "name": "Qingyang Town", "zh": "青阳镇", "ep": 1, "wiki": "Qingyang Town",
     "blurb": "Where it starts. The Lin, Lei and Xie families share the town; the Lin family here is a side branch of the Lin Clan. Ironwood Manor and its Yang Yuan Stone vein lie nearby."},
    {"id": "yancity", "name": "Yan City", "zh": "炎城", "ep": 5, "wiki": "Yan City",
     "blurb": "The nearest city, with three great powers, an arena and a Symbol Master Guild. The Lin family moves here after EP12; the Celestial Dan Pool is in the mountains to the east."},
    {"id": "skyflame", "name": "Sky Flame Mountain Range", "zh": "天炎山脉", "ep": 18, "wiki": "Sky Flame Mountain",
     "blurb": "Mountains outside Yan City holding a Nirvana expert's ancient tomb, where the Four Great Clans and the Nine Heavens Taiqing Palace gather (EP18)."},
    {"id": "dayang", "name": "Dayang Province", "zh": "大阳郡", "ep": 25,
     "blurb": "Forests on the road to Great Desolate Province, home of the Di Family and the Thunder Source Crystal Beast."},
    {"id": "greatdesolate", "name": "Great Desolate Province", "zh": "大荒郡", "ep": 26, "wiki": "Great Desolate Province",
     "blurb": "A hard province of desert and wasteland where the fittest survive: Eagle City, the Ancient Wasteland, Great Puppet City, the Yin Puppet Sect's seat, and the Great Desolate Ancient Tablet in the middle of the desert."},
    {"id": "lincity", "name": "Lin City", "zh": "林城", "ep": 46, "wiki": "Lin City",
     "blurb": "Seat of the Lin Clan, one of the Four Great Clans, under patriarch Lin Fan. Lin Dong wins the Lin Clan Gathering here (EP47-48)."},
    {"id": "imperial", "name": "Imperial City", "zh": "皇城", "ep": 49, "wiki": "Imperial City",
     "blurb": "Capital of the Great Yan Dynasty. The Battle of Seeds picks five fighters for the Hundred Dynasties Battle (EP49); the Sacred Spirit Pool lies under it."},
    {"id": "battlefield", "name": "Ancient Battlefield", "zh": "远古战场", "ep": 51, "wiki": "Ancient Battlefield",
     "blurb": "A space left from ancient wars, full of ruins and inheritances, used by the Super Sects for the Hundred Dynasties Battle. Yang City, Leiyan Valley, the Demon Forest, the Ancient Treasure Trove, Wanxiang City and Baichao Mountain are all inside."},
    {"id": "eastxuan", "name": "Eastern Xuan Region", "zh": "东玄域", "ep": 72, "wiki": "East Xuan Continent",
     "blurb": "The wider world of a hundred dynasties and the Super Sects. The Great Yan Dynasty is one small dynasty in it. Lin Dong leaves for the Dao Sect at the end of EP72."},
    {"id": "westxuan", "name": "Western Xuan Region", "zh": "西玄域", "ep": NOVEL,
     "blurb": "The rival region. Its agents spy on the Ancient Battlefield (EP54), and Zheng Zhong tries to drag the whole battlefield there (EP71)."},
]

factions = [
    {"name": "Lin Family", "zh": "林家", "region": "qingyang", "tier": 1, "ep": 1, "wiki": "Lin Family",
     "top": "Lin Zhentian (Yuan Dan initial, EP6); Lin Xiao (Heavenly Yuan again, EP6)",
     "signature": "A branch of the Lin Clan, thrown out after Lin Xiao lost to Lin Langtian",
     "with": "His family. He wins its competition (EP2), takes Ironwood Manor for it (EP4), moves it to Yan City (EP12) and returns it to the Lin Clan by winning the Gathering (EP48)."},
    {"name": "Lei Family", "zh": "雷家", "region": "qingyang", "tier": 1, "ep": 2, "wiki": "Lei Family",
     "top": "Lei Bao (Yuan Dan initial, EP6)", "signature": "The Lin family's rivals in Qingyang Town",
     "with": "Fights the Lin family over Ironwood Manor and loses at the banquet (EP6); it collapses after (EP7)."},
    {"name": "Xie Family", "zh": "谢家", "region": "qingyang", "tier": 1, "ep": 3, "wiki": "Xie Family",
     "top": "Xie Qian", "signature": "The third Qingyang family", "with": "Sides with the Lei family and falls with it (EP6-7)."},
    {"name": "Black Dragon Stockade", "zh": "黑龙寨", "region": "qingyang", "tier": 2, "ep": 5, "wiki": "Black Dragon Stockade",
     "top": "Wu Sha (Heavenly Yuan)", "signature": "Bandits", "with": "Attacks the Lin home and Ironwood Manor; Lin Dong beats Wu Sha on the road (EP5)."},
    {"name": "Blood Cloth Sect", "zh": "血衣门", "region": "yancity", "tier": 2, "ep": 6, "wiki": "Blood Cloth Sect",
     "top": "Wei Tong (Yuan Dan advanced, EP7); vice-master Gu Ying (2nd Seal Symbol Master)",
     "signature": "A Yan City sect that backs the Lei family",
     "with": "Lin Dong kills Gu Ying (EP6) and then Wei Tong in a fight to the death at the Yan City arena (EP12)."},
    {"name": "Thousand Gold Association", "subs": "Wanjin Chamber of Commerce", "zh": "万金商会", "region": "yancity", "tier": 2, "ep": 7, "wiki": "Thousand Gold Association",
     "top": "Xia Wanjin (Yuan Dan perfect, EP9)", "signature": "Auctions, trade and the Celestial Dan Pool",
     "with": "Lin Dong wins the Celestial Dan Pool for it (EP9) and becomes its honorary elder (EP10). Xuan Su helps him all through Yan City."},
    {"name": "Blood Wolf Gang", "zh": "血狼帮", "region": "yancity", "tier": 2, "ep": 8, "wiki": "Blood Wolf Gang",
     "top": "Yue Shan (Yuan Dan perfect, EP9)", "signature": "One of Yan City's three powers",
     "with": "Loses the Celestial Dan Pool to him (EP9); its Symbol Master takes Qing Tan hostage during the Wei Tong duel (EP11)."},
    {"name": "Symbol Master Guild", "zh": "符师会", "region": "yancity", "tier": 2, "ep": 13, "wiki": "Symbol Master Guild",
     "top": "Master Yan (4th Seal Symbol Master)", "signature": "Keeps the Symbol Master Tower",
     "with": "He wins the Tower Battle for it against Sky Fire City (EP13-15)."},
    {"name": "Ghost Blade Sect", "zh": "鬼刀门", "region": "yancity", "tier": 2, "ep": 16, "wiki": "Ghost Blade Sect",
     "top": "Gui Yan (Yuan Dan advanced, called Yan City's strongest)", "signature": "Yan City strongmen",
     "with": "Gui Yan tries to take the Yang Yuan Stone vein and is killed by Lin Dong (EP16)."},
    {"name": "Blade Slaughter Gang", "zh": "刀屠帮", "region": "skyflame", "tier": 2, "ep": 18, "wiki": "Blade Slaughter Gang",
     "top": "Song Dao (Yuan Dan perfect)", "signature": "Raiders of the tomb road", "with": "Song Dao raids the Lin Clan camp and loses to Lin Dong (EP18)."},
    {"name": "Di Family", "zh": "狄家", "region": "dayang", "tier": 2, "ep": 25, "wiki": "Di Family",
     "top": "Di Teng (Form Creation advanced)", "signature": "Dayang Province's local power",
     "with": "Lin Dong takes the Thunder Source from under Di Teng's nose (EP25), then 100,000 Pure Yuan Pills from him (EP26)."},
    {"name": "Eagle Martial Dojo", "zh": "鹰之武馆", "region": "greatdesolate", "tier": 2, "ep": 27, "wiki": "Eagle Martial Dojo",
     "top": "Jiang Lei (Form Creation advanced)", "signature": "Eagle City's dojo",
     "with": "He fights for it as a new disciple and kills Luo Jiu (EP28); Mu Qianqian looks after it later (EP44)."},
    {"name": "Bloody Vulture Dojo", "zh": "血鹫武馆", "region": "greatdesolate", "tier": 2, "ep": 27, "wiki": "Bloody Vulture Dojo",
     "top": "Luo Jiu (Form Creation peak)", "signature": "The Demon Ape Transformation", "with": "Driven out of Eagle City after Luo Jiu's death (EP28)."},
    {"name": "Ancient Sword Sect", "zh": "古剑门", "region": "greatdesolate", "tier": 2, "ep": 28, "wiki": "Ancient Sword Sect",
     "top": "Gu Yan (Qi Creation)", "signature": "Sword formations",
     "with": "Gu Yan takes a branded Myriad Beast Fruit from him (EP29) and later catches Little Flame in the Ancient Tablet (EP34)."},
    {"name": "Yin Puppet Sect", "zh": "阴傀宗", "region": "greatdesolate", "tier": 3, "ep": 30, "wiki": "Ghastly Puppet Cult",
     "top": "Teng Sha (Manifestation peak); three Manifestation experts in all (EP40)", "signature": "Puppets and Yin Sha arts; first of the province's sects",
     "with": "Hunts him after he kills Hua Zong (EP31-32). He takes the Devouring Ancestral Symbol from its Xuanyin Crack, and the sect falls (EP42-44)."},
    {"name": "Great Demon Sect", "zh": "大魔门", "region": "greatdesolate", "tier": 3, "ep": 30, "wiki": "Great Devil Sect",
     "top": "Mu Lei", "signature": "Mu Qianqian's charm arts",
     "with": "Mu Qianqian shelters him (EP32); Mu Lei rewards him after the Yin Puppet Sect falls (EP44)."},
    {"name": "Martial Alliance", "zh": "武盟", "region": "greatdesolate", "tier": 3, "ep": 30, "wiki": "Martial Alliance",
     "top": "Wu Zong", "signature": "Runs Great Puppet City's auction", "with": "Sells him the Magic Scales Gold Heart (EP30); joins the attack on Yin Puppet City (EP41)."},
    {"name": "Lin Clan", "zh": "林氏宗族", "region": "lincity", "tier": 4, "ep": 1, "wiki": "Lin Clan",
     "top": "Patriarch Lin Fan (Nirvana, EP48); Lin Langtian (Manifestation, EP48)",
     "signature": "One of the Four Great Clans",
     "with": "Threw out his father's branch. He wins the Lin Clan Gathering, beats Lin Langtian and brings the branch back (EP47-48); Lin Fan sends him to the Battle of Seeds."},
    {"name": "Wang Clan", "zh": "王氏宗族", "region": "greatdesolate", "tier": 4, "ep": 18, "wiki": "Wang Clan",
     "top": "Wang Tong (Qi Creation advanced); Wang Zhong (Manifestation peak, EP49)", "signature": "The Subduing Golden Platform Magic Palm",
     "with": "Wang Yan accuses him in the tomb (EP22) and loses to him (EP23, EP33); Wang Zhong threatens him at the Battle of Seeds (EP49)."},
    {"name": "Qin Clan", "zh": "秦氏宗族", "region": "greatdesolate", "tier": 4, "ep": 18, "wiki": "Qin Clan",
     "top": "Qin Shi (Form Creation, EP18)", "signature": "One of the Four Great Clans", "with": "Present at the tomb (EP18) and the Ancient Tablet (EP33)."},
    {"name": "Huangpu Clan", "subs": "Huangfu", "zh": "皇甫宗族", "region": "greatdesolate", "tier": 4, "ep": 18, "wiki": "Huangpu Clan",
     "top": "Huangpu Jing; Huangpu Ying (EP49)", "signature": "Allied with the Nine Heavens Taiqing Palace", "with": "Ling Qingzhu comes to the tomb on its behalf (EP18)."},
    {"name": "Great Yan Dynasty", "zh": "大炎王朝", "region": "imperial", "tier": 5, "ep": 16, "wiki": "Great Yan Empire",
     "top": "Emperor Mo Jingtian (One Yuan Nirvana, EP49)", "signature": "Five places in the Hundred Dynasties Battle",
     "with": "He wins a place at the Battle of Seeds (EP49) and fights the Ancient Battlefield beside Prince Mo Ling."},
    {"name": "Holy Light Dynasty", "zh": "圣光王朝", "region": "battlefield", "tier": 5, "ep": 51, "wiki": "Saint Light Empire",
     "top": "Jin Mu (Half-step Nirvana)", "signature": "Holds Yang City and taxes it in Nirvana Pills",
     "with": "He beats Jin Mu with five fingers of the Great Desolate Heaven-Imprisoning Finger (EP53)."},
    {"name": "Xuanbing Dynasty", "zh": "玄冰王朝", "region": "battlefield", "tier": 5, "ep": 54, "wiki": "Millennium Ice Empire",
     "top": "Hua Yun (Nirvana)", "signature": "Ice arts", "with": "He plays it against the Demon Rock Dynasty over the Ancient Secret Key (EP55)."},
    {"name": "Sky Eagle Dynasty", "zh": "天鹰王朝", "region": "battlefield", "tier": 5, "ep": 60,
     "top": "Wang Lie (One Yuan Nirvana)", "signature": "Bounty hunters", "with": "Comes for the bounty on him and is robbed and shut out (EP60)."},
    {"name": "Youquan Dynasty", "zh": "幽泉王朝", "region": "battlefield", "tier": 5, "ep": 60,
     "top": "You Qing; Mu Sha (Heaven Symbol Master)", "signature": "Holds one of the Ancient Secret Keys", "with": "Mu Sha offers a partnership and is refused (EP62)."},
    {"name": "Primordial Dynasty", "subs": "Honghuang", "zh": "洪荒王朝", "region": "battlefield", "tier": 5, "ep": 61,
     "top": "Hong Lie", "signature": "Holds one of the Ancient Secret Keys", "with": "Allies against him in the Ancient Treasure Trove (EP61-65)."},
    {"name": "Heavenly Demon Dynasty", "zh": "天魔王朝", "region": "battlefield", "tier": 5, "ep": 69, "wiki": "Sky Devil Empire",
     "top": "The Three Song Devils (Five Yuan Nirvana)", "signature": "The Song brothers", "with": "He saves Mo Ling from its disciples and beats the Song brothers (EP69-70)."},
    {"name": "Demon Rock Dynasty", "subs": "Demon Rock Dynasty", "zh": "魔岩王朝", "region": "battlefield", "tier": 6, "ep": 54, "wiki": "Devil Cliff Empire",
     "top": "Shi Kun (peak Two Yuan Nirvana); Shi Xuan, Chen Mu, Li Pan (Nirvana)", "signature": "A super dynasty with a city in the Ancient Battlefield",
     "with": "Fights him for the Heavenly Symbol Spirit Tree and the key (EP54-56), captures Mo Ling (EP56), posts a million-pill bounty (EP61). He kills Shi Xuan (EP59) and Shi Kun (EP65)."},
    {"name": "Fengyun Dynasty", "zh": "风云王朝", "region": "battlefield", "tier": 6, "ep": 67, "wiki": "Wind Cloud Empire",
     "top": "Feng Cang (peak Four Yuan Nirvana)", "signature": "Lords it over the lower dynasties",
     "with": "Hunts Su Rou's inheritance (EP67); Lin Dong kills Feng Cang and takes the Black Dragon Sky-Roaring Seal (EP68)."},
    {"name": "Nine Heavens Taiqing Palace", "zh": "九天太清宫", "region": "eastxuan", "tier": 7, "ep": 18, "wiki": "Nine Heavens Supreme Purity Palace",
     "top": "Shen Qing; Old Ma Yi (Nirvana)", "signature": "Ling Qingzhu's sect",
     "with": "Ling Qingzhu shares the Nirvana Heart with him (EP21). Old Ma Yi chases him for the Ancestral Symbol (EP46). Ling Qingzhu drives Zheng Zhong off (EP72)."},
    {"name": "Yuan Gate", "zh": "元门", "region": "eastxuan", "tier": 7, "ep": 68, "wiki": "Yuan Gate",
     "top": "Liu Tong", "signature": "Every past champion joined it", "with": "Wants him as champion; he turns it down (EP72). Lin Langtian's patron spirit points this way."},
    {"name": "Dao Sect", "zh": "道宗", "region": "eastxuan", "tier": 7, "ep": 66, "wiki": "Dao Sect",
     "top": "Wu Dao", "signature": "A Super Sect of the Eastern Xuan Region",
     "with": "Wu Dao sends him to Wanxiang City (EP66) and invites him (EP70). Lin Dong joins as Hundred Dynasties champion (EP72)."},
]

eras = [
    {"name": "The Ancestral Symbols", "zh": "祖符", "note": "Eight symbols born from the rules of heaven and earth (EP16). Whoever holds one is among the strongest in the world.",
     "emperors": [
         {"name": "The holder of all eight", "zh": "", "ep": 23, "legacy": "A Celestial Demon Marten record tells of one supreme expert who held all eight, stopped a great catastrophe and vanished with them (EP23)."},
         {"name": "The Black-Eyed Elder", "zh": "黑瞳老人", "ep": 35, "wiki": "Black Eyed Elder", "legacy": "The previous master of the Devouring Ancestral Symbol, waiting inside the Great Desolate Ancient Tablet. He names Lin Dong his heir (EP35-36)."},
     ]},
    {"name": "The ancient sects", "zh": "远古宗派", "note": "Sects that fought the same monsters long ago and left their ruins, trials and arts behind.",
     "emperors": [
         {"name": "Master of the Tomb", "zh": "墓府之主", "ep": 19, "legacy": "A Nirvana expert whose tomb in the Sky Flame Mountains holds the Nirvana Heart. His remnant teaches Lin Dong the halberd art (EP21)."},
         {"name": "Tian Ze", "zh": "天泽", "ep": 38, "legacy": "Guardian of the sect inside the Great Desolate Ancient Tablet, at least Five Yuan Nirvana. He accepts Lin Dong as its heir (EP38)."},
         {"name": "The Eight Extremes Sect", "zh": "八极宗", "ep": 63, "legacy": "Its stone statues show Lin Dong its last battle. Its trial gives him the Great Desolate Heaven-Imprisoning Hand (EP63-65)."},
         {"name": "Qing Zhi, the Green Dragon King", "zh": "青雉", "ep": 66, "wiki": "Green Dragon Hall", "legacy": "His remnant shadow tests Lin Dong in the Green Dragon Hall and gives him the Green Heaven Materialized Dragon Skill (EP66)."},
         {"name": "The Ancient Heavenly Crocodile", "zh": "远古天鳄", "ep": 50, "legacy": "A beast beyond Nirvana whose remains lie under the Sacred Spirit Pool. Its essence blood starts Little Flame's evolution (EP50)."},
     ]},
    {"name": "Above the dynasties", "zh": "超级宗派", "note": "The people the Hundred Dynasties Battle is fought to impress.",
     "emperors": [
         {"name": "Wu Dao", "zh": "悟道", "ep": 66, "legacy": "A Dao Sect elder. He sends Lin Dong to Wanxiang City (EP66) and brings him into the Dao Sect (EP72)."},
         {"name": "Liu Tong", "zh": "", "ep": 68, "legacy": "A Yuan Gate elder who runs the Nirvana Ranking battle (EP70)."},
         {"name": "Zheng Zhong", "zh": "郑钟", "ep": 71, "legacy": "A Profound Life expert of the Western Xuan Region who tries to move the whole Ancient Battlefield west (EP71-72)."},
     ]},
]

zones = [
    {"name": "Celestial Dan Pool", "zh": "丹仙池", "ep": 9, "wiki": "Celestial Dan Pool", "master": "Demonic Jade Water Python", "masterEp": 10,
     "text": "A pool of Yin and Yang energy in the mountains east of Yan City, won in a contest. Yin Yang Pearls lie in a cave at the bottom (EP10)."},
    {"name": "Symbol Master Tower", "zh": "符师塔", "ep": 12, "wiki": "Symbol Master Tower", "master": "A hidden space with an Ancestral Symbol rubbing", "masterEp": 16,
     "text": "Each floor tests Mental Strength. Even 3rd Seal Symbol Masters rarely reach the eighth (EP15); a hidden space above it holds the map of two Ancestral Symbols (EP16)."},
    {"name": "The Nirvana expert's ancient tomb", "zh": "古墓府", "ep": 18, "master": "Master of the Tomb", "masterEp": 21,
     "text": "In the Sky Flame Mountain Range. Only Creation-realm experts can break its seal. Mazes, an icy lake, a sea of fire and Symbol Puppets guard the Nirvana Heart (EP19-22)."},
    {"name": "Great Desolate Ancient Tablet", "zh": "大荒古碑", "ep": 27, "master": "Tian Ze and the Black-Eyed Elder", "masterEp": 35,
     "text": "An ancient sect's ruins in the desert by Eagle City, whose seal weakens every three years. Inside: quicksand, the Yin Wind Formation, the Manifestation Martial Tablet and an underground palace (EP34-38)."},
    {"name": "Xuanyin Crack", "zh": "玄阴涧", "ep": 42, "master": "The Devouring Ancestral Symbol", "masterEp": 43,
     "text": "Behind Yin Puppet City. The Yin Puppet Sect held the Devouring Ancestral Symbol here; Lin Dong is tested and accepted in its depths (EP42-44)."},
    {"name": "Sacred Spirit Pool", "zh": "圣灵潭", "ep": 50, "wiki": "Sacred Spirit Pool", "master": "Remains of the Ancient Heavenly Crocodile", "masterEp": 50,
     "text": "Under the Imperial City. The prize for the Battle of Seeds' winners; at the bottom lie a divine beast's bones and its Soul Treasure."},
    {"name": "Leiyan Valley treasure", "zh": "雷岩谷", "ep": 54, "master": "Stone puppets", "masterEp": 55,
     "text": "In the Ancient Battlefield. Holds the Heavenly Symbol Spirit Tree and one of the Ancient Secret Keys (EP54-56)."},
    {"name": "Ancient Treasure Trove", "zh": "远古秘藏", "ep": 61, "wiki": "Ancient Treasure Trove", "master": "The Eight Extremes Sect's remnant will; Qing Zhi", "masterEp": 64,
     "text": "Opened by four Ancient Secret Keys. A pill chamber, Tiangang Alliance ruins, the Eight Extremes Sect and the Four Sect Halls with the Green Dragon Hall (EP61-66)."},
    {"name": "Baichao Mountain", "zh": "百朝山", "ep": 70, "wiki": "Hundred Empire Mountain", "master": "Zheng Zhong's Heaven-Sealing Formation", "masterEp": 71,
     "text": "The summit where the Nirvana Ranking battle decides the Hundred Dynasties champion, and where the Western Xuan Region springs its plot (EP70-72)."},
]

methods = [
    {"realm": "Tempered Body", "method": "Stone Talisman liquid and Tong Bei Fist", "zh": "石符 · 通背拳", "from": "The Stone Talisman", "ep": 1},
    {"realm": "Earthly / Heavenly Yuan", "method": "Qingyuan Art", "zh": "青元功", "from": "Lin Zhentian (the Lin family's method)", "ep": 10},
    {"realm": "Yuan Dan", "method": "Qi-Transforming Spirit Vortex", "zh": "化气精旋", "from": "Little Mink", "ep": 10},
    {"realm": "Yuan Dan", "method": "Three Yang Art", "zh": "三阳决", "from": "Xuan Su", "ep": 10},
    {"realm": "Form Creation and up", "method": "Great Sun Thunder Body", "zh": "大日雷体", "from": "Little Mink, with the Thunder Source", "ep": 25},
    {"realm": "Qi Creation and up", "method": "Power of Devouring", "zh": "吞噬之力", "from": "The Devouring Ancestral Symbol", "ep": 43},
    {"realm": "Manifestation to Nirvana", "method": "Lesser Nirvana Golden Body", "zh": "小涅槃金身", "from": "Little Mink", "ep": 53},
]

# His signature arts, shown on the Lin Dong page (pages.journey.secrets)
secrets = [
    {"ch": "指", "name": "Great Desolate Heaven-Imprisoning Finger", "gloss": "Manifestation-grade", "ep": 37,
     "effect": "The ancient sect's art from the Martial Tablet. At first it paralyses him (EP38); four fingers beat Jin Mu, five break the Holy Light Formation (EP53)."},
    {"ch": "印", "name": "Great Desolate Sea-Splitting Seal", "gloss": "seal art", "ep": 44, "effect": "First used against Teng Sha at Yin Puppet City."},
    {"ch": "手", "name": "Great Desolate Heaven-Imprisoning Hand", "gloss": "spiritual martial art", "ep": 65, "effect": "Won in the Eight Extremes trial; it kills Shi Kun, a peak Two Yuan Nirvana."},
    {"ch": "噬", "name": "Power of Devouring", "gloss": "Ancestral Symbol", "ep": 43, "effect": "Takes in energy and attacks and turns them into his own strength. Joined with Mental Strength it becomes the Devouring Thunder Palm (EP58)."},
    {"ch": "龙", "name": "Green Heaven Materialized Dragon Skill", "gloss": "inheritance", "ep": 66, "effect": "Qing Zhi's gift: a scale shield, a bell and, in EP71, a dragon form."},
]

journey = OH["journey"]
inventory = OH["inventory"]
arcs = [[1, 12, "Qingyang Town and Yan City"], [13, 24, "The Symbol Tower and the ancient tomb"],
        [25, 36, "Great Desolate Province"], [37, 48, "The Devouring Ancestral Symbol"],
        [49, 60, "The Ancient Battlefield"], [61, 72, "The Hundred Dynasties Battle"]]

WORLD = {
    "maxEp": 72, "arcs": arcs, "realms": realms, "beyond": beyond, "symbolLadder": symbol_ladder, "grades": grades,
    "tiers": tiers, "regions": regions, "factions": factions, "journey": journey, "secrets": secrets, "methods": methods, "eras": eras,
    "zones": zones, "inventory": inventory, "terms": TERMS,
    "ancestralSymbols": OH["ancestralSymbols"], "bodies": OH["bodies"], "contests": OH["contests"], "symbolArts": OH["symbolArts"],
}


def main():
    body = ",\n".join(f"  {k}: {json.dumps(v, ensure_ascii=False, indent=1)}" for k, v in WORLD.items())
    js = ("// Hand-curated guide data for Martial Universe. Written by scripts/make_world.py: edit that, not this file.\n"
          "// `ep` = the donghua episode where a thing is first shown or reached; NOVEL = not in the donghua yet.\n"
          "(function () {\nconst NOVEL = 9999;\n\nwindow.WORLD = {\n  NOVEL,\n" + body + "\n};\n})();\n")
    (ROOT / "site" / "data" / "world.js").write_text(js)
    print({k: len(v) for k, v in WORLD.items() if isinstance(v, list)})


if __name__ == "__main__":
    main()
