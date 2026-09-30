// Everything about Shrouding the Heavens that isn't data: page text, nav labels, the body figure and the map.
// shows.js adds id, title, zh, palette and paths on top of this.
window.SHOW = {
  heroName: "Ye Fan", heroId: "ye-fan",
  searchHint: "Try “Bitter Sea”, “Duan De” or “Ji family”",
  zhLevels: ["凡人", "苦海", "命泉", "神桥", "彼岸", "道宫", "四极", "化龙", "仙台", "大能", "斩道", "圣人", "圣人王", "大圣", "准帝", "大帝"],
  wiki: { url: "https://shrouding-the-heavens.fandom.com/wiki/", name: "Shrouding the Heavens fan wiki" },

  nav: [
    ["realms", "境界", "Realms"], ["world", "北斗", "World"], ["powers", "势力", "Powers"], ["journey", "叶凡", "Ye Fan"],
    ["episodes", "分集", "Episodes"], ["people", "人物", "People"], ["emperors", "大帝", "Emperors"], ["zones", "禁区", "Forbidden"],
    ["terms", "词汇", "Terms"], ["lore", "典籍", "Library"],
  ],

  home: {
    heroAlt: "Nine dragon corpses pulling a bronze coffin through the stars",
    lede: "Realms, regions, sects, emperors and all the episodes of the donghua, in one place.",
    steps: [
      ["#/journey", "Thirty classmates, one bronze coffin", "Nine dragon corpses drag a coffin from Mount Tai to Mars and then to Beidou, a cultivation world in the Big Dipper star field. Ye Fan and Pang Bo land as de-aged kids with no talent anyone can see."],
      ["#/realms", "Power lives inside the body", "Cultivation opens five secret realms in turn: below the navel, the five organs, the four limbs, the spine, and finally the head. Every realm is a ladder of its own."],
      ["#/powers", "Whoever owns an emperor's weapon rules", "Small sects answer to paradises, paradises to holy lands, and holy lands tread carefully around the clans descended from Great Emperors."],
      ["#/w/Ancient%20Desolation%20Sacred%20Body", "Ye Fan's body is both a gift and a curse", "The Ancient Desolate Sacred Body is monstrously strong, eats absurd resources, and has never once produced an emperor."],
      ["#/zones", "Even emperors die", "The road to immortality is broken. Dying emperors hide in the Forbidden Zones and wait, and that shapes everything else."],
    ],
  },

  realms: {
    novelWord: "the novel",
    beyondTitle: "Beyond the five realms", beyondZh: "超脱",
    beyondGist: "Once the five secret realms are complete, there's a short and brutal road left. Most cultivators never see any of it.",
    figureBeyond: "All five realms fused: beyond mortal limits",
    ladders: [{ title: "Weapon grades", note: "Weapons are graded by whoever forged or empowered them, lowest to highest.", list: "weaponGrades" }],
    figure: `
    <svg viewBox="0 0 200 420" role="img" aria-labelledby="body-t">
      <title id="body-t">Where each cultivation realm lives in the body</title>
      <path class="outline" d="M92 72 L92 84 Q66 86 60 100 L64 180 Q66 230 76 250 L124 250 Q134 230 136 180 L140 100 Q134 86 108 84 L108 72"/>
      <g data-zone="limbs">
        <path class="zone-line" data-realm="poles" d="M62 102 Q46 150 38 214"/>
        <path class="zone-line" data-realm="poles" d="M138 102 Q154 150 162 214"/>
        <path class="zone-line" data-realm="poles" d="M86 252 Q82 322 78 402"/>
        <path class="zone-line" data-realm="poles" d="M114 252 Q118 322 122 402"/>
      </g>
      <path class="zone-line" data-realm="dragon" d="M100 80 L100 244" stroke-dasharray="2 7"/>
      <g>
        <circle class="zone" data-realm="palace" cx="106" cy="120" r="7"><title>Heart</title></circle>
        <circle class="zone" data-realm="palace" cx="85" cy="112" r="7"><title>Lungs</title></circle>
        <circle class="zone" data-realm="palace" cx="86" cy="150" r="7"><title>Liver</title></circle>
        <circle class="zone" data-realm="palace" cx="115" cy="150" r="7"><title>Spleen</title></circle>
        <circle class="zone" data-realm="palace" cx="100" cy="180" r="7"><title>Kidneys</title></circle>
      </g>
      <g class="ripples" data-ripples="wheel">
        <circle class="ripple" cx="100" cy="214" r="8"/><circle class="ripple" cx="100" cy="214" r="8"/><circle class="ripple" cx="100" cy="214" r="8"/>
      </g>
      <circle class="zone" data-realm="wheel" cx="100" cy="214" r="10"><title>Wheel of Life, below the navel</title></circle>
      <circle class="zone" data-realm="platform" cx="100" cy="48" r="24"><title>The head: Immortal Platform</title></circle>
    </svg>`,
  },

  // Hand-drawn Beidou: five regions around the Eastern Wasteland, plus the star route.
  map: {
    label: "Map of Beidou", start: "south",
    caption: "A rough sketch for orientation, not an official map.",
    offMap: "Beyond Beidou",
    far: { title: "Earth, the Eternal Kingdom and the Immortal Domain", text: "Ye Fan's road later leads home to Earth, out across other star fields, and finally toward the Immortal Domain." },
    lands: [
      { id: "plains", d: "M150 40 L420 30 L470 90 L400 130 L240 140 L150 110 Z", lx: 300, ly: 85 },
      { id: "north", d: "M400 130 L470 90 L600 110 L620 190 L520 215 L430 200 Z", lx: 520, ly: 160, zh: "北域", name: "E. Wasteland north" },
      { id: "central", d: "M430 200 L520 215 L620 190 L640 280 L540 300 L440 280 Z", lx: 540, ly: 250, zh: "中域", name: "E. Wasteland centre" },
      { id: "south", d: "M440 280 L540 300 L640 280 L650 380 L560 420 L450 390 Z", lx: 545, ly: 350, zh: "南域", name: "E. Wasteland south" },
      { id: "desert", d: "M40 150 L150 110 L240 140 L250 260 L180 330 L60 300 Z", lx: 150, ly: 225 },
      { id: "zhongzhou", d: "M240 140 L400 130 L430 200 L440 280 L450 390 L330 410 L250 260 Z", lx: 345, ly: 270 },
      { id: "ridge", d: "M180 330 L250 260 L330 410 L300 470 L170 460 L130 390 Z", lx: 230, ly: 400 },
    ],
    extra: `
        <text x="545" y="455" text-anchor="middle" class="zh-lbl">东荒</text>
        <text x="545" y="474" text-anchor="middle">the Eastern Wasteland</text>
        <path class="route" d="M680 500 Q690 440 660 420"/>
        <circle class="star" cx="682" cy="505" r="3"/>
        <text x="600" y="508" text-anchor="end" style="font-size:11px;fill:var(--star)">from Earth and Mars</text>`,
  },

  arcs: [[1, 6, "Earth to Beidou"], [7, 50, "Lingxu and the Wheel Sea"], [51, 70, "Taixuan and beyond"], [71, 106, "Dao Palace"], [107, 138, "Four Poles"], [139, 155, "Dragon Transformation"], [156, 200, "Immortal Platform"]],

  // One page for what only this donghua has (js/extras.js). Each section shows one world.js list.
  extraPages: [{
    route: "unique", zh: "独有", label: "Only here", title: "Only in Shrouding the Heavens",
    lede: "Three things this story has that others don't: Ye Fan's stone-gambling trade, the Nine Secrets, and the special bodies that decide who can become an emperor.",
    sections: [
      { id: "source", zh: "源术", title: "Source Arts", layout: "cards", data: "sourceBasics",
        lede: "Source is the currency and the fuel of Beidou, hidden inside stone. Reading it is a trade of its own, and Ye Fan becomes its best." },
      { id: "gambles", zh: "赌石", title: "Stone gambles and source feats", layout: "timeline", data: "sourceGambles" },
      { id: "grades", title: "Kinds of source", layout: "table", data: "sourceGrades", columns: [["name", "Kind"], ["text", "What it is"], ["ep", "First seen"]] },
      { id: "secrets", zh: "九秘", title: "The Nine Secrets", layout: "ranking", data: "secrets",
        lede: "Nine arts created by the Nine Heavenly Venerables of the Mythological era. Ye Fan spends the whole story hunting them down.", fields: [["gloss", "Meaning"], ["effect", "What it does"]] },
      { id: "physiques", zh: "体质", title: "Special physiques", layout: "cards", data: "physiques", fields: [["holders", "Who has it"]],
        lede: "A few rare bodies decide who can go furthest. Each comes with its own gift and its own curse." },
    ],
  }],

  pages: {
    realms: { lede: "“Take the body as the seed.” Each realm wakes up a different part of the body. Scroll, and the figure lights up where you are." },
    world: { zh: "北斗", title: "The world of Beidou", lede: "Ye Fan's new home is one enormous planet in the Big Dipper star field. The story walks outward from its south-east corner. Pick a region." },
    powers: {
      lede: "Every faction's weight comes down to one question: how strong is its strongest living person, and does it own a Great Emperor's weapon?",
      note: "In the story's present no Great Emperor is alive. Great Saints are the strongest beings walking around openly, and a revived imperial weapon outclasses any of them.",
    },
    journey: {
      zh: "叶凡", title: "Ye Fan's journey and his cheats", lede: "Every advantage he picks up, in the order he picks it up.",
      methods: ["The best method for every realm", "His quiet long-term cheat: he ends up with the strongest known method for each realm, pieced together from different emperors' legacies."],
      // The "what he carries at EP N" view; only shown because world.js has an `inventory` list.
      kit: {
        tab: "What he carries", storyTab: "His advantages", title: "What Ye Fan carries",
        at: "What he has at", companions: "At his side", goneWith: "No longer with him",
        lede: "His body, scriptures, secret arts, treasures and the people at his side, as they stand at the episode you pick.",
        note: "Each thing appears from the episode where he actually gets it on screen, and leaves the list when he loses it or gives it up.",
      },
    },
    episodes: {
      lede: eps => `Every episode so far, ${eps.length ? `${eps.filter(e => !e.arc).length} of them summarised one by one` : "summarised"}. Episodes 1–50 come straight from the official English subtitles; later ones from fan sources.`,
      caveat: { medium: "Written from fan subtitles with some gaps; a few details may be off." },
    },
    emperors: {
      tab: "Emperors", zh: "大帝", title: "Eras and their emperors",
      lede: "One Great Emperor per era, each leaving a weapon and a scripture to the clan that comes after. Oldest first.",
      note: "Several of Earth's legends turn out to be the bodies of Beidou's emperors (Laozi, the Yellow Emperor, Chiyou), which is why Ye Fan keeps finding clues about Beidou back home.",
    },
    zones: {
      tab: "Forbidden Zones", zh: "禁区", title: "The Forbidden Zones",
      lede: "Dying emperors cut away part of their own power to slow death, seal themselves in divine source, and wait for the road to immortality to open.",
      prose: `
        <p>After cutting themselves down they sit around the peak of the Quasi-Emperor realm. They can still flare back to full Emperor power for a short while, at the cost of whatever life they have left. These beings are called <b>Supremes</b> (至尊).</p>
        <p>When their life runs dry, several wake together and drink the life of whole star fields, then go back to sleep. These are the <b>Dark Turmoils</b>, and every era's emperor has had to hold them back.</p>`,
      heading: "The seven zones", masterLabel: "Master: ",
      wiki: ["Forbidden Zones", "The full wiki article", "goes into every Supreme by name."],
    },
    terms: {
      lede: "The same word gets translated three different ways. The middle column is what the official YouTube subtitles say (checked against episodes 1–50).",
      cols: ["Official subs", "Also translated as"], empty: "not used yet",
    },
  },
};
