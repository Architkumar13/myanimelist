// Every donghua the hub knows about. Add a show: one entry here, plus site/shows/<dir>/ (show.js, data/, img/).
// `id` goes in the address (?show=id) and names the saved progress; `dir` is the folder under shows/.
window.SHOWS = [
  {
    id: "sth", dir: "shrouding-the-heavens",
    title: "Shrouding the Heavens", zh: "遮天", mark: "遮天", glyph: "遮",
    blurb: "Ye Fan and his classmates, carried from Mount Tai to Beidou by nine dragon corpses and a bronze coffin.",
    hero: "img/hero/coffin.jpg", defaultEp: 36,
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
    hero: "img/hero/poster.png", defaultEp: 1,
    theme: {
      "--patina": "#1c1814", "--patina-deep": "#110e0c", "--patina-lift": "#2c261c", "--verdigris": "#c6a15a",
      "--bone": "#f3ead7", "--bone-dim": "#b7aa90", "--bronze": "#e0b15a", "--bronze-bright": "#f0d090",
      "--cinnabar": "#a33b32", "--cinnabar-ink": "#f6efe2", "--star": "#e7d7a8",
    },
  },
];
