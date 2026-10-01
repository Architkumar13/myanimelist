// Everything about Martial Universe that isn't data: page text, nav labels, the map sketch and the "Only here" page.
// shows.js adds id, title, zh, palette and paths on top of this.
window.SHOW = {
  heroName: "Lin Dong", heroId: "lin-dong",
  searchHint: "Try “Little Mink”, “Stone Talisman” or “林琅天”",
  zhLevels: ["淬体", "地元", "天元", "元丹", "造形", "造气", "造化", "涅槃", "生玄", "死玄", "轮回", "祖境"],
  wiki: { url: "https://wu-dong-qian-kun.fandom.com/wiki/", name: "Wu Dong Qian Kun fan wiki" },

  nav: [
    ["realms", "境界", "Realms"], ["world", "大炎", "World"], ["powers", "势力", "Powers"], ["journey", "林动", "Lin Dong"],
    ["episodes", "分集", "Episodes"], ["people", "人物", "People"], ["emperors", "远古", "Ancients"], ["zones", "遗迹", "Ruins"],
    ["terms", "词汇", "Terms"], ["lore", "典籍", "Library"],
  ],

  home: {
    heroAlt: "Lin Dong, wrapped in blue lightning, forging his Copper Thunder Body",
    lede: "Realms, Symbol Masters, dynasties, the Ancestral Symbols and every episode of the donghua, in one place.",
    steps: [
      ["#/journey", "A crippled father and a stone in the mud", "Lin Dong's father was ruined by Lin Langtian, and their branch was thrown out of the Lin Clan. On the same night Little Mink hides the Ancestral Stone, Lin Dong finds the Stone Talisman."],
      ["#/realms", "Two ladders, climbed at once", "Yuan Power realms run from Tempered Body to Nirvana and beyond. Mental Strength is a separate ladder of Symbol Master seals. Lin Dong climbs both, and fights well above his label."],
      ["#/w/Ancestral%20Symbol", "Eight symbols made by heaven itself", "Ancestral Symbols form from the rules of heaven and earth. Lin Dong holds the Devouring one from EP43. The rest are still out there."],
      ["#/powers", "Every arc is a bigger room", "Town families, then city gangs, province sects, the Four Great Clans, the dynasties and finally the Super Sects. Each arc ends with the hero walking into the next one."],
      ["#/zones", "The real fights happen in ruins", "Tombs, towers, tablets and trove halls left by ancient sects. Each holds the treasure or the art that takes him to the next realm."],
    ],
  },

  realms: {
    novelWord: "the novel, past the aired episodes",
    beyondTitle: "Above Nirvana", beyondZh: "生死轮回",
    beyondGist: "“Grasp life and death, master the cycle.” The donghua has shown one Profound Life expert so far. The rest is still the novel's map.",
    ladders: [
      { title: "Symbol Master ranks", note: "The second ladder, of Mental Strength. A seal is a big step, and Lin Dong's ranks come from towers, trees and tribulations rather than time.", list: "symbolLadder", cards: true },
      { title: "Grades of arts and treasures", note: "How martial arts, Soul Treasures and pills are ranked on screen, lowest first.", list: "grades" },
    ],
  },

  // A rough sketch of the Great Yan Dynasty: the road runs from the south-east corner outward.
  map: {
    label: "Sketch of the Great Yan Dynasty", start: "qingyang", labelDy: [-6, 12],
    caption: "A rough sketch for orientation, not an official map. The order of the road comes from the episodes; distances don't.",
    offMap: "Beyond the Great Yan Dynasty",
    far: { title: "The Eastern Xuan Region", text: "The Hundred Dynasties Battle is fought in the Ancient Battlefield, a space of its own. Its winners go on to the Super Sects of the Eastern Xuan Region." },
    lands: [
      { id: "imperial", d: "M300 40 L470 30 L520 110 L430 160 L320 150 L280 95 Z", lx: 395, ly: 95, name: "Imperial City" },
      { id: "lincity", d: "M430 160 L520 110 L620 140 L630 230 L540 260 L460 235 Z", lx: 540, ly: 190, name: "Lin City" },
      { id: "greatdesolate", d: "M40 120 L280 95 L320 150 L360 300 L300 420 L120 460 L50 360 Z", lx: 190, ly: 280 },
      { id: "dayang", d: "M320 150 L430 160 L460 235 L470 330 L360 300 Z", lx: 400, ly: 245 },
      { id: "skyflame", d: "M470 330 L460 235 L540 260 L600 330 L560 400 L490 400 Z", lx: 530, ly: 335, name: "Sky Flame Mts" },
      { id: "yancity", d: "M360 300 L470 330 L490 400 L440 470 L330 470 L300 420 Z", lx: 400, ly: 395 },
      { id: "qingyang", d: "M490 400 L560 400 L640 420 L620 490 L520 500 L440 470 Z", lx: 545, ly: 455 },
    ],
    extra: `
        <path class="route" d="M545 455 Q470 430 400 395 Q400 320 400 250 Q300 260 190 280 Q360 220 540 190 Q470 130 395 95"/>`,
  },


  extraPages: [{
    route: "unique", zh: "独有", label: "Only here", title: "Only in Martial Universe",
    lede: "Four things this story keeps coming back to: the Ancestral Symbols, the bodies Lin Dong forges, the contests that mark each arc, and the Symbol Master's craft.",
    sections: [
      { id: "symbols", zh: "祖符", title: "The Ancestral Symbols", layout: "cards", data: "ancestralSymbols", fields: [["holder", "Held by"]],
        lede: "Not made by anyone: they form from the rules of heaven and earth. Little Mink has been looking for them far longer than Lin Dong has been alive." },
      { id: "bodies", zh: "体魄", title: "The bodies he forges", layout: "timeline", data: "bodies",
        lede: "Lin Dong's edge is a body that keeps getting rebuilt: thunder, ape blood, golden Nirvana flesh, and finally a dragon." },
      { id: "contests", zh: "比斗", title: "Contests and tournaments", layout: "timeline", data: "contests",
        lede: "Every arc ends in a formal contest, and every contest opens a door to a bigger one." },
      { id: "symbol-arts", zh: "符道", title: "Symbol arts and puppets", layout: "cards", data: "symbolArts",
        lede: "What a Symbol Master actually does with Mental Strength: symbols, formations, puppets and a mind that can fly." },
    ],
  }],

  pages: {
    realms: { lede: "“Steal Yin and Yang, seize Creation, turn Nirvana, grasp life and death.” Yuan Power realms are one ladder, Symbol Master seals another. Lin Dong climbs both." },
    world: { zh: "大炎", title: "The Great Yan Dynasty, and beyond", lede: "One small dynasty in the Eastern Xuan Region. The story walks from a town in its south-east corner to its capital, then out into the Ancient Battlefield. Pick a region." },
    powers: {
      lede: "A faction is as strong as its strongest fighter. A town family's head is a Heavenly Yuan; a dynasty's emperor is a Nirvana; the Super Sects stand over all of them.",
      note: "The Four Great Clans sit between the province sects and the dynasty. Lin Dong's branch was cast out of one of them.",
    },
    journey: {
      zh: "林动", title: "Lin Dong, and what he picks up", lede: "Every advantage, in the order the donghua hands it to him. Most of them come out of the Stone Talisman or a ruin.",
      secrets: ["His signature arts", "绝学", "The few arts he keeps reaching for when a fight is lost, in the order he gets them."],
      methods: ["What he cultivates with", "The method under each step of the ladder, and where it came from."],
      kit: {
        tab: "What he carries", storyTab: "His advantages", title: "What Lin Dong carries",
        at: "What he has at", companions: "At his side", goneWith: "No longer with him",
        lede: "His bodies, methods, arts, treasures and the people at his side, as they stand at the episode you pick.",
        note: "Each thing appears from the episode where he gets it on screen, and leaves the list when he uses it up or gives it away.",
      },
    },
    episodes: {
      lede: (eps, max) => `All ${eps.length} episodes, through episode ${max}. Six seasons of 12, numbered straight through. Every summary is written from the studio's own Chinese and English subtitles.`,
      caveat: { medium: "These episodes have no official subtitle track; written from fan subtitles, so a detail may be off." },
    },
    emperors: {
      tab: "Ancients", zh: "远古", title: "Who came before",
      lede: "No emperors' eras here. The past is a set of dead sects and old masters whose ruins, remnants and arts Lin Dong keeps inheriting.",
      note: "Most of what the novel says about the ancient war against the Yimo hasn't reached the screen yet.",
    },
    zones: {
      tab: "Ruins", zh: "遗迹", title: "Tombs, towers and ruins",
      lede: "The places where each arc's prize waits. Every one has a guardian, a test or a remnant will.",
      prose: `
        <p>Ruins open on a schedule or to a key, and everyone of the right realm crowds in at once. The fights inside decide who leaves with the inheritance.</p>`,
      heading: "In the order he enters them", masterLabel: "Guarded by: ",
    },
    terms: {
      lede: "The middle column is what the studio's official English subtitles most often say. That track is machine-quality, so the names this site uses follow the novel translation unless the subtitles are consistent.",
      cols: ["Official subs", "Also translated as"], empty: "not named consistently",
    },
  },
};
