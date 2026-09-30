// Everything about The Great Ruler that isn't data: page text, nav labels and the world sketch.
// shows.js adds id, title, zh, palette and paths on top of this.
window.SHOW = {
  heroName: "Mu Chen", heroId: "mu-chen",
  searchHint: "Try “Jiu You”, “Spiritual Road” or “洛璃”",
  zhLevels: ["感应", "灵动", "灵轮", "神魄", "融天", "化天", "通天", "三难", "至尊", "地至尊", "天至尊", "主宰", "大主宰"],
  wiki: { url: "https://thegreatruler.fandom.com/wiki/", name: "Great Ruler fan wiki" },

  nav: [
    ["realms", "境界", "Realms"], ["world", "大千", "World"], ["powers", "势力", "Powers"], ["journey", "牧尘", "Mu Chen"],
    ["episodes", "分集", "Episodes"], ["people", "人物", "People"], ["emperors", "至尊", "Sovereigns"], ["zones", "试炼", "Trials"],
    ["terms", "词汇", "Terms"], ["lore", "典籍", "Library"],
  ],

  home: {
    heroAlt: "Poster for The Great Ruler donghua",
    lede: "Realms, the three paths, the academies, and the episodes of the donghua, in one place.",
    steps: [
      ["#/journey", "A sealed pulse, and a trial with no energy", "Mu Chen comes home from the Spiritual Road already infamous. The pulse that should have let him cultivate was sealed. The art his mother left him is the thing that starts working."],
      ["#/realms", "Three paths, one ladder everyone shares", "Spiritual Energy is the realm ladder. Spiritual Arrays shape the energy already in the world. Battle Formations come much later and need an army."],
      ["#/powers", "A territory is not a continent", "The Nine Territories look like the whole world until a seat at the Five Great Academies opens. Their deans are Sovereigns."],
      ["#/journey", "The bird is not a pet", "Jiu You is bound into his body. She wants the body. He spends her strength. That gap is why he keeps beating people a stage above him."],
      ["#/zones", "The way out is an exam", "The Spiritual Road, the academy quotas, then Northern Heavens. Everything after episode 25 happens on a bigger map."],
    ],
  },

  realms: {
    novelWord: "the novel, past the aired episodes",
    beyondTitle: "Sovereign and above", beyondZh: "至尊",
    beyondGist: "The aired episodes stop at the first of the three disasters. Everything below is still the map of the novel.",
    ladders: [
      { title: "Spiritual Array ranks", note: "A second ladder. Your rank is how many Spiritual Seals you can hold, and it tracks the energy realms beside it.", list: "weaponGrades" },
      { title: "Battle Formation ranks", note: "Needs a troop. He does not start until Sovereign.", list: "paths", cards: true },
    ],
  },

  // Schematic of the Great Thousand World: lower planes beside the upper plane, and the two continents the donghua actually visits.
  map: {
    label: "Where the story sits", start: "nsr", labelDy: [-8, 12],
    caption: "A sketch of the stack, not a map. Northern Spiritual Realm sits inside the Hundred Spirit Continent.",
    offMap: "Still off this sketch",
    lands: [
      { id: "lower", d: "M36 36 H250 V150 H36 Z", lx: 143, ly: 96, name: "Lower Planes" },
      { id: "gtw", d: "M280 28 H664 V492 H280 Z", lx: 472, ly: 64, name: "Great Thousand World" },
      { id: "northheavens", d: "M310 100 H634 V230 H310 Z", lx: 472, ly: 168, name: "Northern Heavens" },
      { id: "hundred", d: "M310 260 H634 V460 H310 Z", lx: 472, ly: 300, name: "Hundred Spirit" },
      { id: "nsr", d: "M340 330 H604 V430 H340 Z", lx: 472, ly: 384, name: "Northern Spiritual" },
    ],
  },

  pages: {
    realms: { lede: "Spiritual Energy is the ladder everyone climbs. Arrays and battle formations are second and third paths, ranked alongside it rather than instead of it." },
    world: { zh: "大千", title: "The Great Thousand World", lede: "A lower plane is a whole story for someone else. This one is upstairs. The opening never leaves one small realm of one ordinary continent. Pick a region." },
    powers: { lede: "A territory lord is a giant until a Sovereign walks in. The five academies are where Sovereigns teach. The clans above them do not need a school." },
    journey: {
      zh: "牧尘", title: "Mu Chen, and what he picks up", lede: "Every advantage, in the order the donghua hands it to him. His realm label and the realm he can fight are not the same number.",
      secrets: ["Spiritual Array ranks", "灵阵", "The second path. A rank is just a count of Spiritual Seals. His mother is an Ancestor. He is still climbing the student ranks."],
      methods: ["What he stacks on the ladder", "The quiet part of the cheat: the best method he can get his hands on, for whichever realm he is in."],
    },
    episodes: {
      lede: (eps, max) => `Season 1 is episodes 1–52. Season 2 continues the numbering, and the log currently runs to episode ${max}. Season 1 is grouped by quest. Season 2 is one entry per episode, from the fan wiki's log.`,
    },
    emperors: {
      tab: "Sovereigns", zh: "至尊", title: "Who stands above a territory",
      lede: "Not emperors. Sovereigns teach at the five academies. Heavenly Sovereigns rule the clans those students come from. The board above even them is still in the novel.",
      note: "Xiao Yan and Lin Dong are the strongest people from two other novels. They ascended. You do not need their stories to follow this one, and the donghua treats them as names with weight.",
    },
    zones: {
      tab: "Trials", zh: "试炼", title: "Trials and grounds",
      lede: "The dangerous places are exams, swamps and ruins, not a ring of dying emperors. Each one is where the story actually changes size.",
      prose: `
        <p>Early on, the threat is other students and spiritual beasts. Later, a Sovereign can walk into the same scene.</p>`,
      heading: "In the order he meets them", masterLabel: "",
      wiki: ["Spiritual Road", "The Spiritual Road on the wiki", "goes further, including who won. Heavier than the opening flashback."],
    },
    terms: {
      lede: "This column is the 2023 donghua's English, taken from the fan wiki's adaptation notes. It is not a line-by-line check of the subtitle file.",
      cols: ["This donghua", "Novel and other versions"], empty: "same name",
    },
  },
};
