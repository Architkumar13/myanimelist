// Everything about Battle Through the Heavens that isn't data: page text, nav labels, the continent sketch and the
// Flames page. shows.js adds id, title, zh, palette and paths on top of this.
window.SHOW = {
  heroName: "Xiao Yan", heroId: "xiao-yan",
  searchHint: "Try “Yao Lao”, “Fallen Heart Flame” or “萧炎”",
  zhLevels: ["斗之气", "斗者", "斗师", "大斗师", "斗灵", "斗王", "斗皇", "斗宗", "斗尊", "半圣", "斗圣", "斗帝"],
  wiki: { url: "https://battle-through-the-heavens.fandom.com/wiki/", name: "Battle Through the Heavens fan wiki" },

  nav: [
    ["realms", "境界", "Realms"], ["world", "大陆", "World"], ["powers", "势力", "Powers"], ["journey", "萧炎", "Xiao Yan"],
    ["episodes", "分集", "Episodes"], ["people", "人物", "People"], ["emperors", "传说", "Legends"], ["zones", "险地", "Trials"],
    ["terms", "词汇", "Terms"], ["lore", "典籍", "Library"],
  ],

  home: {
    heroAlt: "Xiao Yan in front of a sky of flame",
    lede: "Realms, Heavenly Flames, alchemy, factions and all 281 episodes of the donghua, in one place.",
    steps: [
      ["#/journey", "A fallen genius and the soul in his ring", "Xiao Yan was the Xiao Clan's prodigy until his Dou Qi drained away for three years. The thief is Yao Lao, a great alchemist's soul in his mother's ring, and he becomes the teacher who gets him back up."],
      ["#/realms", "One ladder, nine stars a rank", "Dou Zhi Qi, Dou Zhe, Dou Shi, Da Dou Shi, Dou Ling, Dou Wang, Dou Huang, Dou Zong, Dou Zun, Dou Sheng, Dou Di. Each rank has nine stars, and every arc moves him up a rank or two."],
      ["#/w/Heavenly%20Flames", "The Heavenly Flames", "Twenty-three ranked flames born of the world itself. His technique, the Flame Mantra, grows by swallowing them, and every one he takes is an arc of its own."],
      ["#/realms", "Alchemy is the second career", "Pills buy allies, cure poisons and break through realms. An alchemist's tier, one to nine, matters as much as his rank, and Xiao Yan climbs both."],
      ["#/powers", "Each map makes the last look small", "A Dou Huang is one of the Jia Ma Empire's ten strongest. In the Central Plains a Dou Zong runs a city, and by the end the ancient clans count in Dou Sheng."],
    ],
  },

  realms: {
    novelWord: "the novel",
    beyondTitle: "Past Dou Sheng", beyondZh: "斗帝",
    beyondGist: "One rank is left above Dou Sheng, and nobody has reached it in ten thousand years.",
    ladders: [
      { title: "Alchemist tiers", note: "An alchemist's grade is the highest tier of pill they can refine. It runs beside the Dou Qi ladder, and the soul decides it.", list: "alchemistTiers", cards: true },
      { title: "Dou Skill and technique classes", note: "Every technique and Dou Skill is graded in four classes, each with low, medium and high rank.", list: "skillClasses", cards: true },
      { title: "Soul realms", note: "The soul has its own ladder. From the Pill Gathering on it matters as much as Dou Qi.", list: "soulRealms", cards: true },
      { title: "Magical Beast ranks", note: "Beasts have ranks, not stars, matched to the human ladder.", list: "beastRanks" },
    ],
  },

  // A rough sketch of the Dou Qi Continent: the empires of the north-west, the Central Plains, the beasts to the east.
  map: {
    label: "Sketch of the Dou Qi Continent", start: "jiama",
    caption: "A rough sketch for orientation, not an official map. The donghua gives few directions; this follows the ones it does.",
    offMap: "Spaces of their own",
    far: { title: "Tuo She Gu Di's ruin", text: "The eight pieces of the jade open the last Dou Di's ruin. Where it is, the donghua hasn't shown." },
    lands: [
      { id: "jiama", d: "M40 50 L230 40 L250 150 L200 210 L60 200 L30 120 Z", lx: 140, ly: 120 },
      { id: "tager", d: "M230 40 L330 50 L340 170 L250 150 Z", lx: 290, ly: 105, zh: "塔戈尔", name: "Tager Desert" },
      { id: "chuyun", d: "M60 200 L130 205 L120 290 L30 280 L30 210 Z", lx: 78, ly: 245, zh: "出云", name: "Chu Yun" },
      { id: "blackcorner", d: "M130 205 L200 210 L250 150 L340 170 L330 260 L150 290 L120 290 Z", lx: 235, ly: 225 },
      { id: "jianan", d: "M150 290 L330 260 L320 330 L170 345 Z", lx: 245, ly: 308, zh: "迦南", name: "Jia Nan Academy" },
      { id: "central", d: "M340 50 L560 40 L600 200 L560 380 L330 380 L320 330 L330 260 L340 170 Z", lx: 445, ly: 180 },
      { id: "pill", d: "M420 280 L540 270 L560 380 L430 380 Z", lx: 490, ly: 330 },
      { id: "wasteland", d: "M560 40 L670 60 L680 160 L600 200 Z", lx: 625, ly: 112, zh: "荒域", name: "Ancient Wasteland" },
      { id: "beast", d: "M600 200 L680 160 L690 400 L560 380 Z", lx: 630, ly: 290 },
      { id: "dragon", d: "M590 425 L690 415 L680 500 L585 492 Z", lx: 638, ly: 460, zh: "龙岛", name: "Dragon Islands" },
    ],
    extra: `
        <text x="190" y="470" text-anchor="middle" class="zh-lbl">斗气大陆</text>
        <text x="190" y="489" text-anchor="middle">the Dou Qi Continent</text>`,
  },

  arcs: [[1, 3, "Wu Tan City"], [4, 17, "Beast mountains to the desert"], [18, 20, "Song of Desert"], [21, 32, "The Green Lotus Core Flame"],
    [33, 56, "The capital and the Alchemist Conference"], [57, 69, "Three-Year Agreement"], [70, 91, "Black-Corner and Jia Nan"],
    [92, 119, "The Fallen Heart Flame"], [120, 131, "Home to Jia Ma"], [132, 157, "Dou Huang"], [158, 201, "The Central Plains"],
    [202, 239, "Dou Zun"], [240, 265, "Dou Sheng"], [266, 300, "The ancient clans"]],

  // One page for what only this donghua has (js/extras.js). Each section shows one world.js list.
  extraPages: [{
    route: "flames", zh: "异火", label: "Flames", title: "Heavenly Flames and alchemy",
    lede: "Twenty-three flames born of the world, the lotuses Xiao Yan makes by fusing them, and what the sky does when a pill forms.",
    sections: [
      { id: "ranking", zh: "异火榜", title: "The Heavenly Flame Ranking", layout: "ranking", data: "flames", fields: [["holder", "Held by"]],
        lede: "Heavenly Flames reign above all flames. The episodes name most of the ranking; the rest are still in the novel." },
      { id: "fusions", zh: "火莲", title: "What he makes from them", layout: "cards", data: "fusions",
        lede: "A body should hold one Heavenly Flame. The Flame Mantra lets Xiao Yan hold several and fuse them." },
      { id: "pills", zh: "丹雷", title: "What the sky does when a pill forms", layout: "table", data: "pillSigns", columns: [["name", "Pill"], ["text", "What appears"], ["ep", "First seen"]] },
    ],
  }],

  pages: {
    realms: { lede: "Dou Qi is gathered, condensed and climbed rank by rank, nine stars to a rank. Alchemy, techniques and the soul run on ladders of their own beside it." },
    world: { zh: "大陆", title: "The Dou Qi Continent", lede: "The story starts in one small city in the north-west and walks outward until the ancient clans' hidden realms. Pick a region." },
    powers: {
      lede: "A faction's weight is its strongest living fighter, and the higher you go the more of them are hidden behind it: a Dou Zun dean, a Ban Sheng ancestor, a Dou Sheng in a pill.",
      note: "Ranks in the north-west and in the Central Plains are different worlds. A Dou Huang rules the Jia Ma Empire's top ten; in the Central Plains the great powers keep Dou Zun and Dou Sheng in reserve.",
    },
    journey: {
      zh: "萧炎", title: "Xiao Yan, and what he picks up", lede: "Every advantage, in the order the donghua gives it to him. His realm and how hard he hits are rarely the same number: borrowed power, secret changes and fused flames fill the gap.",
      secrets: ["The Heavenly Flames he takes", "异火", "Each one is swallowed with the Flame Mantra, which grows a class each time. Ranks are on the Heavenly Flame Ranking."],
      methods: ["How the Flame Mantra grows", "His only technique, from the first episode on. It must reach Tian Class before it can make Yao Lao a body by itself."],
      kit: {
        tab: "What he carries", storyTab: "His advantages", title: "What Xiao Yan carries",
        at: "What he has at", companions: "At his side", goneWith: "No longer with him", goneHas: "No longer has",
        lede: "His flames and body, techniques, treasures and the people at his side, as they stand at the episode you pick.",
        note: "Each thing appears from the episode where he gets it on screen, and leaves the list when he loses it or it changes into something else.",
      },
    },
    episodes: {
      lede: (eps, max) => `All ${eps.length} episodes through EP ${max}, numbered straight through as the official English channel does (Season 5 EP n = EP 69 + n). Written from the official English subtitles; EP 268–275 from burned-in subtitles and a fan track.`,
      caveat: { medium: "Written from a rough or fan subtitle track; some names and details may be off." },
    },
    emperors: {
      tab: "Legends", zh: "传说", title: "Legends and the past",
      lede: "The Dou Di, the saints and the people of Yao Lao's past whose debts reach the present. Oldest first.",
      note: "The story's present has no living Dou Di. Everything at the top of the continent waits on Tuo She Gu Di's ruin.",
    },
    zones: {
      tab: "Trials", zh: "险地", title: "Trials and dangerous places",
      lede: "Every rank Xiao Yan climbs has a place that tests it: a shrine's flight-ban, a tower over a flame, a blood pool, a tomb of energy bodies.",
      prose: `
        <p>Most of them guard something: a Heavenly Flame, a breakthrough, a dead saint's inheritance. The danger is part of the price.</p>`,
      heading: "In the order he meets them", masterLabel: "Holds it: ",
      wiki: ["Heavenly Tomb", "The Heavenly Tomb on the wiki", "goes into its layers and who is buried there."],
    },
    terms: {
      lede: "The official English subtitles keep the pinyin for ranks and translate most other names. The middle column says what each thing is; the next gives the other names it goes by.",
      cols: ["What it is", "Also called"], empty: "—",
    },
  },
};
