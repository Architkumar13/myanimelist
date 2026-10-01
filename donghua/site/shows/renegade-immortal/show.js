// Everything about Renegade Immortal that isn't data: page text, nav labels and the world sketch.
// shows.js adds id, title, zh, palette and paths on top of this.
window.SHOW = {
  heroName: "Wang Lin", heroId: "wang-lin",
  searchHint: "Try “Situ Nan”, “Heaven Defying Bead” or “恒岳派”",
  zhLevels: ["凡人", "凝气", "筑基", "结丹", "元婴", "化神", "婴变", "问鼎", "阴虚", "阳实", "窥涅", "净涅", "碎涅", "空涅", "空灵", "空玄", "空劫", "踏天"],
  wiki: { url: "https://xian-ni.fandom.com/wiki/", name: "Renegade Immortal fan wiki" },

  nav: [
    ["realms", "境界", "Realms"], ["world", "修真界", "World"], ["powers", "势力", "Powers"], ["journey", "王林", "Wang Lin"],
    ["episodes", "分集", "Episodes"], ["people", "人物", "People"], ["emperors", "上古", "Ancients"], ["zones", "绝地", "Death Lands"],
    ["terms", "词汇", "Terms"], ["lore", "典籍", "Library"],
  ],

  home: {
    heroAlt: "Wang Lin with long white hair, in black and red robes, one arm raised against a shattered red sky",
    lede: "Realms, countries, sects, the hero's treasures and every episode of the donghua, in one place.",
    steps: [
      ["#/journey", "A carpenter's son with poor roots", "Wang Lin fails the Heng Yue Sect's root test and gets in as a registered disciple who carries water. When he throws himself off a cliff, a stone bead pulls him into its dream space, and that is what lets him cultivate at all."],
      ["#/journey", "The bead is the real cheat", "The Heaven Defying Bead turns dew into spirit water, slows time inside a dream space, and holds Situ Nan, an old master who has lost his body."],
      ["#/realms", "Seven realms, then the bridge out", "Qi Condensation to Ascendant is the First Step. Illusory Yin and Corporeal Yang lead out of it. Every realm above that is a stranger walking into the room."],
      ["#/powers", "A country has a rank", "Zhao is a rank-three cultivation country on Planet Suzaku. Each rank up is a bigger country, then a planet, then a star system with its own rulers."],
      ["#/episodes", "Revenge, then the long road", "The Teng family kills his clan in EP10. Wang Lin spends the next forty episodes getting strong enough to bury every Teng in Zhao, and the story only grows from there."],
    ],
  },

  realms: {
    novelWord: "the novel, past the aired episodes",
    beyondTitle: "The Second Step and above", beyondZh: "第二步",
    beyondGist: "Wang Lin reaches Corporeal Yang in EP152. Everything below is seen in other people: Nirvana cultivators, celestials and the old powers of the Thunder Celestial Realm.",
    ladders: [{ title: "Ancient God stars", note: "His original body's ladder, separate from the realms. Stars are counted from one to nine, and the novel goes further.", list: "godStars" }],
  },

  // Planet Suzaku, sketched. The Sea of Devils sits in the middle of the southern half, with Zhao on its north shore.
  map: {
    label: "Sketch of Planet Suzaku", start: "zhao", labelDy: [-6, 12],
    caption: "A rough sketch for orientation, not an official map. Only a few borders are fixed on screen.",
    offMap: "Beyond Planet Suzaku",
    far: { title: "Star systems and broken immortal realms", text: "Past EP103 the story leaves the planet: Planet Tian Yun, the hidden Demon Spirit Land, the Allheaven Star System and the ruins of the Thunder Celestial Realm." },
    lands: [
      { id: "suzaku-continent", d: "M120 40 L640 30 L660 175 L540 212 L330 220 L130 190 Z", lx: 390, ly: 115, name: "Suzaku Plain" },
      { id: "snow-domain", d: "M540 212 L660 175 L688 250 L600 270 L556 248 Z", lx: 612, ly: 232, name: "Snow Region" },
      { id: "four-faction-alliance", d: "M556 248 L600 270 L688 250 L692 410 L568 420 L548 330 Z", lx: 622, ly: 340, name: "Four Faction Alliance" },
      { id: "zhao", d: "M330 220 L540 212 L556 248 L548 330 L470 300 L340 300 L310 262 Z", lx: 430, ly: 258 },
      { id: "sea-of-devils", d: "M340 300 L470 300 L548 330 L568 420 L520 470 L380 478 L262 452 L240 380 L272 322 Z", lx: 330, ly: 432 },
      { id: "chu", d: "M110 300 L272 322 L240 380 L262 452 L170 472 L88 420 L96 340 Z", lx: 172, ly: 392 },
      { id: "huo-fen", d: "M262 452 L380 478 L520 470 L510 512 L272 512 Z", lx: 392, ly: 497 },
    ],
  },

  arcs: [[1, 11, "Zhao"], [12, 38, "Huo Fen and the Sea of Devils"], [39, 52, "Revenge in Zhao"], [53, 63, "A mortal life"], [64, 72, "Rain Celestial Realm"],
    [73, 102, "Planet Suzaku"], [103, 109, "Tian Yun"], [110, 132, "Demon Spirit Land"], [133, 147, "Allheaven"], [148, 180, "Thunder Celestial Realm"]],

  extraPages: [{
    route: "unique", zh: "独有", label: "Only here", title: "Only in Renegade Immortal",
    lede: "Four things carry Wang Lin's story that other shows don't have: a bead that bends time and feeds on the five elements, restrictions he learns to read, break and build, Intent Realms grown out of his own life, and the devils, beasts and soul flags that follow him.",
    sections: [
      {"id": "bead", "zh": "天逆珠", "title": "The Heaven Defying Bead", "layout": "cards", "data": "beadBasics", "lede": "The treasure that chose a boy with poor spiritual roots. It holds a space to train in, a hiding place and, for a long time, Situ Nan."},
      {"id": "bead-powers", "zh": "天逆", "title": "What the bead does, in order", "layout": "timeline", "data": "beadPowers", "lede": "The bead grows as it takes in each of the five elements, and what it can do changes with it."},
      {"id": "restrictions", "zh": "禁制", "title": "Restrictions", "layout": "timeline", "data": "restrictions", "lede": "Restrictions are formations that follow their maker's thought. Wang Lin learns them on the Forbidden Mountain and keeps using them, from the restriction flag that calls down tribulations to the Void level of the Four Great Restrictions."},
      {"id": "domains", "zh": "意境", "title": "Wang Lin's Intent Realms and Dao", "layout": "cards", "data": "domains", "fields": [["holders", "Who has it"]], "lede": "To reach Soul Formation a cultivator needs an Intent Realm of their own; copied ones are far weaker. Wang Lin's begins with life and death and keeps growing."},
      {"id": "other-domains", "zh": "他人意境", "title": "Other Intent Realms on screen", "layout": "cards", "data": "otherDomains", "fields": [["holders", "Who has it"]], "lede": "The domains Wang Lin meets, studies or breaks."},
      {"id": "companions", "zh": "身边", "title": "Devils, beasts and soul flags", "layout": "cards", "data": "companions", "fields": [["from", "Where it came from"], ["became", "What it became"]], "lede": "What Wang Lin keeps at his side: refined souls, tamed beasts, flags of souls and forged guards."},
    ],
  }],

  pages: {
    realms: { lede: "Seven realms make up the First Step. Wang Lin climbs all of them on screen, mostly while hiding how far he has got." },
    world: { zh: "修真界", title: "The world of cultivation", lede: "Wang Lin starts in one small country on one planet. Countries have ranks, planets belong to star systems, and the story keeps moving one level up. Pick a region." },
    powers: {
      lede: "A sect is only as strong as its strongest old monster. A country's rank decides how strong those monsters are allowed to get.",
      note: "Most fights are settled by who has an ancestor at a higher realm, or a treasure that ignores realms.",
    },
    journey: {
      zh: "王林", title: "Wang Lin and what he picks up", lede: "Every advantage, in the order the donghua hands it to him. He loses almost as much as he gains.",
      kit: {
        tab: "What he carries", storyTab: "His advantages", title: "What Wang Lin carries",
        at: "What he has at", companions: "At his side", goneWith: "No longer with him",
        lede: "His bodies, methods, techniques, treasures and companions, as they stand at the episode you pick.",
        note: "Each thing appears from the episode where he actually gets it on screen, and leaves the list when he loses it or gives it up.",
      },
    },
    episodes: {
      lede: (eps, max) => `Every episode through EP${max}, one by one. Each summary was checked against the official English subtitles and AnimeKhor's Indonesian track.`,
      caveat: { medium: "Written from one subtitle track, or from rough machine subtitles; small details may be off." },
    },
    emperors: {
      tab: "Ancients", zh: "上古", title: "Ancients and Celestials",
      lede: "The old powers behind the story: the Ancient Clan and its three branches, the immortals of the shattered Celestial Realms, the Suzaku line that rules Wang Lin's planet, and the Second Step masters who hunt him. Episode numbers are when each is first named on screen.",
    },
    zones: {
      tab: "Death Lands", zh: "绝地", title: "Places that kill cultivators",
      lede: "Places that swallow cultivators: rifts, the body of a god, the ruins of immortal realms, a planet that is really a beast.",
      prose: "<p>Most of Wang Lin's gains come out of places like these. Each one has a rule that kills: a realm cap at the gate, time that runs differently, fog that eats the mind, a master who turns the dead into puppets.</p><p>He goes in weaker than nearly everyone else, and comes out with what they were all looking for.</p>",
      heading: "In the order he meets them", masterLabel: "Who rules it: ",
    },
    terms: {
      lede: "The middle column is what the official English subtitles say, from Tencent's own uploads. They're literal and not always consistent.",
      cols: ["Official subs", "Also translated as"], empty: "same name",
    },
  },
};
