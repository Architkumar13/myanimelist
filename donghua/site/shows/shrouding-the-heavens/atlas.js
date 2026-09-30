// The World page's "world expands" story: nine stages, the places Ye Fan reaches in each, and where they sit on one map.
// Stages follow where Ye Fan physically is in each episode (read from all 183 summaries), not where a place is first named.
// Coordinates are world units. Beidou's continent uses show.js map.lands (0–700 × 0–520) inside a planet disc; Earth, Mars
// and Ziwei sit far out in the same space. lod: 1 = a spot inside a kingdom, 2 = a landmark, 3 = a whole world.
// cam = [centre x, centre y, width]; the map keeps a 4:3 frame. ceiling.lvl indexes `ladder` (and SH.zhLevels).
(function () {
window.ATLAS = {
  aspect: [4, 3],
  zh: "北斗", title: "The world keeps growing",
  lede: "Ye Fan's world starts as one mortal kingdom and ends up spanning star fields. Scroll, and the map pulls back each time the story does.",
  ladder: ["Mortal", "Bitter Sea", "Life Spring", "Divine Bridge", "Other Shore", "Dao Palace", "Four Poles", "Dragon Transformation",
    "Immortal Platform", "Great Power", "King", "Saint", "Saint King", "Great Saint", "Quasi-Emperor", "Great Emperor"],

  bodies: [
    { id: "earth", x: -5200, y: 2600, r: 140, ep: 1 },
    { id: "mars", x: -3600, y: 1700, r: 90, ep: 2 },
    { id: "beidou", x: 345, y: 250, r: 440, ep: 4, name: "Beidou", zh: "北斗", planet: true },
    { id: "ziwei", x: 2600, y: -1300, r: 300, ep: 159, stage: "stars", name: "Ziwei Star", zh: "紫微古星" },
  ],
  // The seven stars of the Big Dipper, drawn faintly around Beidou once the camera is far enough out: four for the
  // bowl, then the handle from the first.
  dipper: [[-900, -900], [-560, -1010], [-430, -1380], [-820, -1470], [-1180, -760], [-1500, -640], [-1860, -700]],

  places: {
    taishan: { name: "Mount Tai, Earth", zh: "泰山", x: -5200, y: 2600, lod: 3, region: "earth", ep: 1 },
    mars: { name: "Mars: Great Thunderclap Temple", zh: "荧惑", x: -3600, y: 1700, lod: 3, region: "mars", ep: 2 },

    forbidden: { name: "Ancient Desolate Forbidden Land", zh: "荒古禁地", x: 582, y: 382, lod: 2, region: "south", ep: 4 },
    lingxu: { name: "Lingxu", zh: "灵墟洞天", x: 520, y: 338, lod: 2, region: "south", ep: 7 },
    tombs: { name: "Demon Emperor's tombs", zh: "妖帝坟", x: 503, y: 368, lod: 1, region: "south", ep: 14 },
    qingfeng: { name: "Qingfeng Town", x: 552, y: 326, lod: 1, region: "south", ep: 20 },

    xuanyuan: { name: "Xuanyuan Valley", zh: "轩辕谷", x: 482, y: 398, lod: 1, region: "south", ep: 36 },
    bronze: { name: "Bronze Immortal Palace", zh: "青铜仙殿", x: 462, y: 368, lod: 1, region: "south", ep: 42 },
    taixuan: { name: "Taixuan Sect", zh: "太玄门", x: 618, y: 318, lod: 2, region: "south", ep: 47 },
    domaingate: { name: "Domain Gate", zh: "域门", x: 625, y: 352, lod: 1, region: "south", ep: 54 },
    firedomain: { name: "Fire Domain", zh: "火域", x: 462, y: 314, lod: 2, region: "south", ep: 62 },

    mine: { name: "Yaoguang source mine", x: 468, y: 196, lod: 1, region: "north", ep: 65 },
    purple: { name: "Purple Mountain", zh: "紫山", x: 522, y: 162, lod: 2, region: "north", ep: 68 },
    sourcecity: { name: "Source City", zh: "源城", x: 566, y: 134, lod: 1, region: "north", ep: 77 },
    taichu: { name: "Taichu Ancient Mine", zh: "太初古矿", x: 596, y: 110, lod: 2, region: "north", ep: 78 },
    yaochi: { name: "Ancient Yaochi", zh: "瑶池", x: 448, y: 150, lod: 2, region: "north", ep: 82 },
    demoncity: { name: "Demon City", x: 604, y: 186, lod: 1, region: "north", ep: 84 },

    holycity: { name: "Holy City", zh: "圣城", x: 500, y: 118, lod: 2, region: "north", ep: 103 },
    dragonnest: { name: "Ten Thousand Dragon Nest", zh: "万龙巢", x: 560, y: 200, lod: 1, region: "north", ep: 107 },
    yandu: { name: "Yan Capital", zh: "燕都", x: 555, y: 360, lod: 1, region: "south", ep: 119 },

    undying: { name: "Undying Mountain", zh: "不死山", x: 452, y: 246, lod: 2, region: "central", ep: 126 },
    fengisland: { name: "Feng clan islands", zh: "风族", x: 608, y: 228, lod: 1, region: "central", ep: 127 },
    tianxuan: { name: "Tianxuan ruins", zh: "天璇", x: 505, y: 236, lod: 1, region: "central", ep: 129 },
    holycliff: { name: "Ziwei Sect, Holy Cliff", zh: "紫微", x: 566, y: 272, lod: 1, region: "central", ep: 130 },

    chunqiu: { name: "Chunqiu City, Anping", zh: "安平", x: 392, y: 212, lod: 1, region: "zhongzhou", ep: 141 },
    burial: { name: "Immortal Burial Ground", zh: "葬仙地", x: 305, y: 292, lod: 1, region: "zhongzhou", ep: 144 },
    qishi: { name: "Qishi Academy", zh: "奇士府", x: 340, y: 190, lod: 2, region: "zhongzhou", ep: 146 },
    qinling: { name: "Qinling", zh: "秦岭", x: 335, y: 362, lod: 2, region: "zhongzhou", ep: 149 },
    yinyang: { name: "Yin-Yang Divine City", zh: "阴阳神城", x: 410, y: 318, lod: 2, region: "zhongzhou", ep: 156 },

    deadplanet: { name: "A toxic dead planet", x: 1500, y: -560, lod: 3, region: "space", ep: 158 },
    tianyuan: { name: "Tianyuan City", x: 2540, y: -1330, lod: 2, region: "ziwei", ep: 160 },
    northsea: { name: "North Sea Eye", zh: "北海眼", x: 2660, y: -1440, lod: 2, region: "ziwei", ep: 165 },
    ascension: { name: "Ascension Immortal Cliff", x: 2700, y: -1240, lod: 2, region: "ziwei", ep: 170 },

    nanling: { name: "Nanling City", zh: "南岭", x: 225, y: 392, lod: 2, region: "ridge", ep: 171 },
    demonpalace: { name: "Demon Emperor Palace", x: 186, y: 428, lod: 1, region: "ridge", ep: 172 },
    wangclan: { name: "Wang clan holy land", zh: "王家", x: 268, y: 82, lod: 2, region: "plains", ep: 174 },
    northpole: { name: "The North Pole", zh: "北极", x: 340, y: 48, lod: 2, region: "plains", ep: 177 },
  },

  stages: [
    {
      id: "earth", eps: [1, 4], zh: "天外", title: "Earth, then a coffin across space", scale: "Two planets and the void between",
      gist: "Nine dragon corpses drag a bronze coffin off Mount Tai, stop at Mars, and carry the survivors to a star field nobody on Earth has heard of.",
      cam: [-2300, 1400, 6600],
      path: ["taishan", "mars", "forbidden"],
      factions: [],
      ceiling: { lvl: null, who: "Nine dragon corpses and the coffin", ep: 1, note: "Nothing anyone can measure yet." },
      facts: [["A star map inside the coffin points to the Big Dipper.", 4]],
      events: [[1, "Nine dragon corpses and a bronze coffin come down on Mount Tai"], [2, "The classmates' blood opens the Five-Colored Altar on Mars"], [4, "The coffin crash-lands in Beidou"]],
    },
    {
      id: "yan", eps: [5, 35], zh: "燕国", title: "A mortal kingdom", scale: "One kingdom, Yan, in a corner of the Eastern Wasteland",
      gist: "The whole world is Lingxu, the towns around it and the Forbidden Land on the horizon. A thousand li already feels like the edge of the map.",
      cam: [540, 356, 130],
      path: ["lingxu", "tombs", "qingfeng", "forbidden", "lingxu"],
      factions: [["Lingxu Cave Heaven", 7], ["Violet Sun Paradise", 7], ["Jade Cauldron Paradise", 7], ["Demon race", 16], ["Ji family", 16]],
      ceiling: { lvl: 4, who: "Elder Han, said to be at Other Shore", ep: 11, note: "The Old Madman already walks past in EP28, but nobody knows what he is yet." },
      facts: [["A market town more than a thousand li from Lingxu is already far from home.", 23], ["Yaochi is “countless mountains and rivers” away from Yan.", 34]],
      events: [[10, "Ye Fan's golden Bitter Sea finally opens"], [25, "He kills Elder Han, who wanted to refine him into medicine"], [32, "Climbing the Forbidden Land, he reaches Divine Bridge"]],
    },
    {
      id: "south", eps: [36, 64], zh: "东荒南域", title: "The Southern Region", scale: "A region of the Eastern Wasteland, holding many kingdoms",
      gist: "Yan turns out to be one small kingdom. Above it sit great sects, a holy land and an emperor clan, and they all want his body.",
      cam: [548, 352, 250],
      path: ["xuanyuan", "bronze", "taixuan", "domaingate", "xuanyuan", "firedomain"],
      factions: [["Taixuan Sect", 47], ["Yaoguang Holy Land", 48], ["Ji family", 39]],
      ceiling: { lvl: 8, who: "The Yaoguang Holy Lord, Immortal Platform", ep: 62, note: "The Peacock King's duel with Nangong Zheng tears up the land in EP59." },
      facts: [["Taixuan Sect spreads over 108 main peaks.", 47], ["A chase runs across a thousand li and through ten formations.", 61], ["The Fire Domain goes down at least seven layers.", 62]],
      events: [[40, "Emperor weapons clash over the demon race"], [51, "He learns the Jie secret, one of the Nine Secrets"], [63, "He reaches Other Shore in the Fire Domain"]],
    },
    {
      id: "north", eps: [65, 102], zh: "东荒北域", title: "Carried north", scale: "A second region, as big as the first",
      gist: "Slavers drag him across a broken Domain Gate into the Northern Region: source mines, stone gambling, and an emperor clan's ancestor buried alive.",
      cam: [528, 256, 420],
      path: ["mine", "purple", "sourcecity", "taichu", "purple", "yaochi", "demoncity", "purple"],
      factions: [["Jiang family", 70], ["Yaochi Holy Land", 81], ["Yaoguang Holy Land", 65]],
      ceiling: { lvl: 12, who: "Jiang Taixu, sealed under Purple Mountain", ep: 70, note: "The episode doesn't name his realm; the novel makes him a Saint King." },
      facts: [["Source City is 30,000 miles from the Taichu Ancient Mine.", 77], ["Jiang Taixu has been fighting under Purple Mountain for 4,000 years.", 71]],
      events: [[72, "He finds the Heavenly Book of Source in Wu Shi's dojo"], [74, "He opens his first Dao Palace treasury"], [90, "Pang Bo is freed"]],
    },
    {
      id: "wasteland", eps: [103, 125], zh: "东荒", title: "The Eastern Wasteland joins up", scale: "Every holy land in one place; teleports cross whole regions",
      gist: "The Holy City pulls every power of the Eastern Wasteland together, and long-range teleport formations make the distances between regions something you jump.",
      cam: [535, 258, 460],
      path: ["holycity", "dragonnest", "holycity", "yandu", "forbidden", "taixuan"],
      factions: [["Jiang family", 108], ["Yin-Yang Sect", 119]],
      ceiling: { lvl: 12, who: "Jiang Taixu again, now free", ep: 110, note: "He kills the Dark Night King, a King at Immortal Platform 3rd Heaven." },
      facts: [["A teleport throws him 1.5 million li off course, then it's 15 days by boat back to the Southern Region.", 118]],
      events: [[110, "A revived Jiang Taixu kills the Dark Night King"], [112, "He survives the Four Poles tribulation with Jiang Taixu's blood"], [120, "The Forbidden Land heals his Dao wounds"]],
    },
    {
      id: "central", eps: [126, 140], zh: "东荒中域", title: "The Central Region and the Forbidden Zones", scale: "The last of the Eastern Wasteland, and the Life Forbidden Zones",
      gist: "A bad teleport drops him by the Undying Mountain. The Central Region's floating islands and ruined holy lands fill in the map, and the Forbidden Zones start moving.",
      cam: [522, 252, 480],
      path: ["undying", "fengisland", "tianxuan", "holycliff", "holycity", "yaochi"],
      factions: [["Wind clan", 127], ["Tianxuan Holy Land", 129], ["Zi Wei Sect", 130]],
      ceiling: { lvl: 13, who: "The Old Madman, Great Saint", ep: 130, note: "He crushes three half-step Supremes." },
      facts: [["Another teleport lands him 6 million li off course.", 126], ["Shen Feng Island is 800 li away.", 128], ["An ancient clan claims 100,000 li around its sleeping grounds.", 140]],
      events: [[130, "The Old Madman crushes three half-step Supremes"], [132, "He learns the Xing secret"], [138, "He turns his own tribulation on the Holy Body Killing Alliance"]],
    },
    {
      id: "zhongzhou", eps: [141, 157], zh: "中州", title: "Zhongzhou, heart of the continent", scale: "The centre of Beidou: four dynasties, nine ancient countries",
      gist: "The Eastern Wasteland was one edge of the continent. Zhongzhou is its heart: immortal dynasties with emperor weapons, ancient countries, and the Qishi Academy.",
      cam: [410, 262, 700],
      path: ["chunqiu", "burial", "qishi", "qinling", "qishi", "yinyang", "forbidden"],
      factions: [["Qishi Manor", 146], ["Great Xia Dynasty", 145], ["Jiuli Divine Dynasty", 145], ["Yin-Yang Sect", 155]],
      ceiling: { lvl: 15, who: "The Azure Emperor's remnant will", ep: 153, note: "A long-dead Great Emperor still able to crush the living. Several emperor weapons face off in EP154." },
      facts: [["Four immortal dynasties and nine ancient countries share the Central States.", 141], ["The Qishi Academy opens once every 10,000 years.", 141]],
      events: [[143, "Dragon Transformation"], [151, "He masters the Weapon secret in Qinling"], [156, "Immortal Platform, and the Yin-Yang Sect falls"]],
    },
    {
      id: "stars", eps: [158, 170], zh: "星空", title: "The star field", scale: "Beidou is one planet among many",
      gist: "He leaves through the altar, drifts through the void for seven years and lands on Ziwei, where the emperor weapons all vanished and ancient clans once fed on humans.",
      cam: [1450, -520, 4400],
      path: ["deadplanet", "tianyuan", "northsea", "ascension"],
      factions: [["Golden Crow race", 161], ["Human Desire Dao", 164]],
      ceiling: { lvl: 13, who: "The Thousand-Armed Divine Demon, Great Saint", ep: 161, note: "The phantom of Dongfang Taiyi appears in EP162." },
      facts: [["Seven years drifting through the void before Ziwei.", 159], ["A coffin drains life across hundreds of thousands of li.", 161]],
      events: [[159, "He comprehends the Taiyin True Scripture in the frozen void"], [169, "He kills Lu Ya"], [170, "A black-hole passage throws him back to Beidou"]],
    },
    {
      id: "beidou", eps: [171, 183], zh: "北斗", title: "The whole of Beidou", scale: "The planet, edge to edge",
      gist: "Back home, he goes where he never went before: the Southern Ridge's barbarians, the Wang clan's Northern Plains, and the North Pole's immortal light.",
      cam: [345, 250, 1000],
      path: ["nanling", "demonpalace", "wangclan", "northpole", "nanling", "purple"],
      factions: [["Barbarian clan", 173], ["Wang family", 174]],
      ceiling: { lvl: 15, who: "The Wushi Bell, a peak emperor weapon", ep: 183, note: "The strongest living foe is the Divine Spirit Valley's Ancestral King, a Saint (EP182)." },
      facts: [["Ye Fan and Ji Ziyue meet again after twelve years.", 182]],
      events: [[176, "The Wang clan falls"], [179, "He parts from An Miaoyi"], [183, "He rings the Wushi Bell"]],
    },
  ],
};
})();
