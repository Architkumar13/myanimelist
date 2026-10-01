// Everything about Jade Dynasty that isn't data: page text, nav labels and the map of the Divine Land.
// shows.js adds id, title, zh, palette and paths on top of this.
window.SHOW = {
  heroName: "Zhang Xiaofan", heroId: "zhang-xiaofan",
  searchHint: "Try “Fire Stick”, “Bi Yao” or “青云门”",
  zhLevels: ["凡人", "玉清初", "玉清中", "玉清高", "上清", "太清", "超凡"],
  wiki: { url: "https://zhu-xian.fandom.com/wiki/", name: "Zhu Xian fan wiki" },

  nav: [
    ["realms", "境界", "Realms"], ["world", "神州", "World"], ["powers", "势力", "Powers"], ["journey", "张小凡", "Zhang Xiaofan"],
    ["episodes", "分集", "Episodes"], ["people", "人物", "People"], ["emperors", "传说", "Legends"], ["zones", "禁地", "Forbidden"],
    ["terms", "词汇", "Terms"], ["lore", "典籍", "Library"],
  ],

  home: {
    heroAlt: "Lu Xueqi in white and Gui Li in black, back to back between blue and crimson light",
    lede: "Methods, sects, the Divine Land, the cast and every episode of the donghua, in one place.",
    steps: [
      ["#/journey", "One night, one village, two survivors", "A wandering monk secretly teaches Zhang Xiaofan a Buddhist method and gives him a bead. By morning everyone in Grass Temple Village is dead, and he and Lin Jingyu are taken up to the Qingyun Sect."],
      ["#/realms", "Two methods that should never meet", "Qingyun teaches the Taoist Taiji Xuanqing Dao, level by level. The monk's Great Brahma Prajna is Tian Yin Temple's secret. Xiaofan carries both, and they fight inside him."],
      ["#/w/Sinister%20Bead", "A stick that drinks blood", "The bead is the Sinister Bead, a demon master's treasure. Joined to a black stick it becomes the Fire Stick, strong enough to scare his elders, and it slowly eats at his mind."],
      ["#/powers", "Righteous against demonic", "Qingyun, Tian Yin Temple and Fen Xiang Valley stand against the Ghost King Sect and the other demon sects. Lu Xueqi of Small Bamboo Peak and Bi Yao, the Ghost King's daughter, stand on either side of him."],
      ["#/episodes", "Ten years later, another name", "Season 1 ends with Bi Yao taking the Zhu Xian Sword's blow for him. Season 2 opens ten years on, with Xiaofan as Gui Li, vice master of the Ghost King Sect."],
    ],
  },

  realms: {
    novelWord: "no episode that says so; after Season 1 his road leaves Qingyun's ladder",
    beyondTitle: "Past the ladder", beyondZh: "超凡",
    beyondGist: "The strongest people on screen are measured by what they do, not by a stage name.",
    ladders: [{ title: "Every school's own road", note: "Qingyun's three stages are the only ladder the donghua spells out. The other schools go their own way, side by side with it.", list: "paths", cards: true }],
  },

  // Hand-drawn Divine Land: Qingyun and the Central Plains in the middle, the Southern Border along the bottom.
  map: {
    label: "Map of the Divine Land", start: "qingyun",
    caption: "A rough sketch for orientation, not an official map.",
    offMap: "Beyond the map",
    lands: [
      { id: "barbaric", d: "M30 40 L220 28 L236 150 L170 168 L36 172 Z", lx: 130, ly: 100 },
      { id: "kongsang", d: "M220 28 L370 34 L362 140 L300 162 L236 150 Z", lx: 298, ly: 95 },
      { id: "qingyun", d: "M370 34 L500 40 L492 150 L420 168 L362 140 Z", lx: 432, ly: 100 },
      { id: "tianyin", d: "M36 172 L170 168 L184 300 L120 330 L30 320 Z", lx: 105, ly: 248, name: "Mount Sumeru" },
      { id: "central", d: "M170 168 L236 150 L300 162 L362 140 L420 168 L492 150 L500 40 L620 60 L600 220 L560 320 L460 336 L330 340 L210 330 L184 300 Z", lx: 390, ly: 250 },
      { id: "eastsea", d: "M620 60 L690 70 L690 400 L600 380 L560 320 L600 220 Z", lx: 640, ly: 230, name: "East Sea" },
      { id: "deadswamp", d: "M30 320 L120 330 L184 300 L210 330 L200 400 L40 400 Z", lx: 118, ly: 365 },
      { id: "huqi", d: "M210 330 L330 340 L322 400 L200 400 Z", lx: 265, ly: 372 },
      { id: "fenxiang", d: "M330 340 L460 336 L470 400 L322 400 Z", lx: 396, ly: 372 },
      { id: "south", d: "M40 400 L200 400 L322 400 L470 400 L600 380 L620 480 L360 505 L60 480 Z", lx: 330, ly: 452 },
    ],
    extra: `
        <circle class="star" cx="664" cy="300" r="3"/>
        <text x="656" y="318" text-anchor="end" style="font-size:11px;fill:var(--star)">Liubo Mountain</text>`,
  },

  arcs: [[1, 9, "Grass Temple Village and the tournament"], [10, 17, "Kongsang Mountain and the foxes"], [18, 26, "The war on Qingyun"],
    [27, 36, "Gui Li and the Dead Swamp"], [37, 52, "Fen Xiang Valley and the south"], [53, 72, "The beast tide"],
    [73, 78, "Tian Yin Temple"], [79, 104, "The Beast Deity and the Four Spirits"]],

  // One page for what only this donghua has (js/extras.js). Each section shows one world.js list.
  extraPages: [{
    route: "unique", zh: "独有", label: "Only here", title: "Only in Jade Dynasty",
    lede: "What this story has that others don't: a forbidden book in five volumes, a hero carrying three teachings at once, the named treasures everyone fights over, and the Ghost King's hunt for four ancient beasts.",
    sections: [
      { id: "books", zh: "天书", title: "The Heavenly Book", layout: "ranking", data: "heavenlyBooks", fields: [["where", "Where it is"]],
        lede: "The Demon Sect's classic, and the common source of Buddhist and Taoist methods too. Five volumes, scattered." },
      { id: "paths", zh: "三教", title: "Three teachings, one body", layout: "cards", data: "threePaths", fields: [["from", "Learnt from"]],
        lede: "Buddhist, Taoist and demonic: Zhang Xiaofan is the only one on screen who carries all three, and for most of the story they fight each other." },
      { id: "treasures", zh: "法宝", title: "Magic treasures", layout: "cards", data: "treasures", fields: [["owner", "Held by"]],
        lede: "Weapons with names, histories and wills of their own." },
      { id: "spirits", zh: "四灵血阵", title: "The Four Spirits Blood Formation", layout: "timeline", data: "fourSpirits",
        lede: "The Ghost King's plan, episode by episode: four ancient beasts in the Fulong Cauldron, and a power no one has held before." },
    ],
  }],

  pages: {
    realms: { lede: "Qingyun counts strength in the stages of the Taiji Xuanqing Dao: Yuqing, Shangqing, Taiqing. The English subtitles use those names; Jade, Upper and Grand Purity are the translations." },
    world: { zh: "神州", title: "The Divine Land", lede: "The Central Plains in the middle, the righteous sects around them, the Demon Sect's lands at the edges, and the Southern Border's Hundred Thousand Mountains along the bottom. Pick a region." },
    powers: {
      lede: "The world splits into the righteous path and the Demon Sect. Inside each side, weight comes down to one master and one treasure.",
      note: "The line between the two sides is the question the whole story asks. Pu Zhi of Tian Yin Temple massacres a village; the Ghost King's daughter dies for a Qingyun disciple.",
    },
    journey: {
      zh: "张小凡", title: "Zhang Xiaofan, and what he picks up", lede: "Every advantage, in the order the donghua gives it to him. From EP27 he goes by Gui Li.",
      kit: {
        tab: "What he carries", storyTab: "His road", title: "What Zhang Xiaofan carries",
        at: "What he has at", companions: "At his side", goneWith: "No longer with him",
        lede: "His methods, treasures and the people at his side, as they stand at the episode you pick.",
        note: "Each thing appears from the episode where he gets it on screen, and leaves the list when he loses it or parts with it.",
      },
    },
    episodes: {
      lede: (eps, max) => `Every episode through EP${max}, ${eps.filter(e => !e.arc).length} of them summarised one by one. Season 1 is EP1–26, Season 2 EP27–52, Season 3 EP53–78, and the final season counts on from EP79. Summaries come from English subtitles (Season 1 and a few later episodes) and Indonesian fansubs (the rest).`,
      caveat: { medium: "Written from fan subtitles that rarely say who is speaking; a few details may be off." },
    },
    emperors: {
      tab: "Legends", zh: "传说", title: "Legends of old",
      lede: "The founders, masters and monsters the episodes keep coming back to, oldest first.",
      note: "Most of these people are long dead when the story starts. Their treasures, sects and grudges are not.",
    },
    zones: {
      tab: "Forbidden grounds", zh: "禁地", title: "Forbidden grounds",
      lede: "Caves, swamps and altars where the sects keep what they don't want found, in the order the story enters them.",
      prose: `
        <p>Almost every one hides a piece of the past: a dead master's corpse, a chained fox, a sealed beast, a page of the Heavenly Book. Most of the story's turns happen in one of them.</p>`,
      heading: "In the order the story enters them", masterLabel: "Held by: ",
      wiki: ["Locations", "Places on the wiki", "describes more of the Divine Land, including places the donghua hasn't shown."],
    },
    terms: {
      lede: "The middle column is what the English subtitle track says (Season 1 and a handful of later episodes). It reads names in pinyin more often than it translates them.",
      cols: ["English subtitles", "Also translated as"], empty: "not named in English",
    },
  },
};
