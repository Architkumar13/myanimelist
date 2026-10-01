// Every donghua the hub knows about. Add a show: one entry here, plus site/shows/<dir>/ (show.js, data/, img/).
// `id` goes in the address (?show=id) and names the saved progress; `dir` is the folder under shows/.
window.SHOWS = [
  {
    id: "sth", dir: "shrouding-the-heavens",
    title: "Shrouding the Heavens", zh: "遮天", mark: "遮天", glyph: "遮",
    blurb: "Ye Fan and his classmates, carried from Mount Tai to Beidou by nine dragon corpses and a bronze coffin.",
    hero: "img/hero/coffin.jpg",
    theme: {
      "--patina": "#1f3a36", "--patina-deep": "#16302c", "--patina-lift": "#28483f", "--verdigris": "#5f9c88",
      "--bone": "#e4dfcb", "--bone-dim": "#b3b39f", "--bronze": "#c39a58", "--bronze-bright": "#e2bd7c",
      "--cinnabar": "#b5412d", "--cinnabar-ink": "#f3ead6", "--star": "#a9c7cf",
    },
  },
  {
    id: "tgr", dir: "the-great-ruler",
    title: "The Great Ruler", zh: "大主宰", mark: "主宰", glyph: "主",
    blurb: "Mu Chen, a sealed spiritual pulse, and the bird bound inside him, on the way up from the Northern Spiritual Realm.",
    hero: "img/hero/poster.png",
    theme: {
      "--patina": "#1c1814", "--patina-deep": "#110e0c", "--patina-lift": "#2c261c", "--verdigris": "#c6a15a",
      "--bone": "#f3ead7", "--bone-dim": "#b7aa90", "--bronze": "#e0b15a", "--bronze-bright": "#f0d090",
      "--cinnabar": "#a33b32", "--cinnabar-ink": "#f6efe2", "--star": "#e7d7a8",
    },
  },
  {
    id: "ri", dir: "renegade-immortal",
    title: "Renegade Immortal", zh: "仙逆", mark: "仙逆", glyph: "逆",
    blurb: "Wang Lin, a village boy with poor talent, a strange bead in his pocket, and a path to immortality that goes against heaven.",
    hero: "img/hero/wang-lin.jpg",
    theme: {
      "--patina": "#1d1a2b", "--patina-deep": "#15131f", "--patina-lift": "#28243a", "--verdigris": "#7da3d4",
      "--bone": "#ece7f2", "--bone-dim": "#b1aac2", "--bronze": "#e39457", "--bronze-bright": "#f5bb86",
      "--cinnabar": "#b3313f", "--cinnabar-ink": "#f8eef0", "--star": "#b9cdf0",
    },
  },
  {
    id: "btth", dir: "battle-through-the-heavens",
    title: "Battle Through the Heavens", zh: "斗破苍穹", mark: "斗破", glyph: "斗",
    blurb: "Xiao Yan, a fallen genius of Wu Tan City, the old soul hiding in his mother's ring, and a hunt for the Heavenly Flames.",
    hero: "img/hero/xiao-yan.jpg",
    theme: {
      "--patina": "#1b1210", "--patina-deep": "#120c0a", "--patina-lift": "#291c18", "--verdigris": "#6fc2a0",
      "--bone": "#f5ebdf", "--bone-dim": "#c2afa0", "--bronze": "#f0773c", "--bronze-bright": "#ffa872",
      "--cinnabar": "#a82a22", "--cinnabar-ink": "#fbefe6", "--star": "#cfe3dc",
    },
  },
  {
    id: "mu", dir: "martial-universe",
    title: "Martial Universe", zh: "武动乾坤", mark: "武动", glyph: "武",
    blurb: "Lin Dong, a crippled father's son from a cast-out branch, a stone talisman from the mud, and the mink who lives inside it.",
    hero: "img/hero/thunder-body.jpg",
    theme: {
      "--patina": "#141c2b", "--patina-deep": "#0e1420", "--patina-lift": "#1d2840", "--verdigris": "#5aa6cf",
      "--bone": "#eae6da", "--bone-dim": "#adb3c2", "--bronze": "#d8ad5a", "--bronze-bright": "#f0cf8a",
      "--cinnabar": "#b33a34", "--cinnabar-ink": "#f6efe2", "--star": "#a8cdec",
    },
  },
  {
    id: "jd", dir: "jade-dynasty",
    title: "Jade Dynasty", zh: "诛仙", mark: "诛仙", glyph: "诛",
    blurb: "Zhang Xiaofan, the last boy of a murdered village, a slow learner on Great Bamboo Peak, and a cursed stick that drinks blood.",
    hero: "img/hero/xueqi-and-gui-li.jpg",
    theme: {
      "--patina": "#171b26", "--patina-deep": "#10131b", "--patina-lift": "#222838", "--verdigris": "#86aede",
      "--bone": "#ede7dc", "--bone-dim": "#b0b2bc", "--bronze": "#7fc6b5", "--bronze-bright": "#b4e4d7",
      "--cinnabar": "#ad2e38", "--cinnabar-ink": "#f7ede6", "--star": "#cad8ef",
    },
  },
];
