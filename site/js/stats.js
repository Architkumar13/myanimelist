/* Everything the Wrapped page says about the list, derived once from window.ANIME. */
const Stats = (() => {
  const all = window.ANIME.items;
  const seen = all.filter((a) => a.st !== "Plan to Watch" && a.w > 0);
  const completed = all.filter((a) => a.st === "Completed");
  const scored = all.filter((a) => a.s > 0);

  const avg = (xs) => (xs.length ? xs.reduce((s, x) => s + x, 0) / xs.length : 0);
  const avgScore = (list) => avg(list.filter((a) => a.s).map((a) => a.s));

  // AniList lacks a runtime for a few titles; assume a typical length by format.
  const epMinutes = (a) => a.dur || (a.type === "Movie" ? 90 : a.type === "Music" ? 4 : 24);
  const minutes = seen.reduce((s, a) => s + a.w * epMinutes(a), 0);
  const episodes = all.reduce((s, a) => s + a.w, 0);

  const groupBy = (list, keysOf) => {
    const m = new Map();
    for (const a of list) for (const k of keysOf(a)) (m.get(k) || m.set(k, []).get(k)).push(a);
    return m;
  };
  const ranked = (m, min = 1) =>
    [...m.entries()]
      .filter(([, xs]) => xs.length >= min)
      .map(([name, xs]) => ({ name, items: xs, n: xs.length, avg: avgScore(xs) }))
      .sort((x, y) => y.n - x.n);

  const genres = ranked(groupBy(seen, (a) => a.g));
  const favGenre = genres.filter((g) => g.n >= 15).sort((x, y) => y.avg - x.avg)[0];
  const studios = ranked(groupBy(seen, (a) => a.studio));

  // "Shingeki no Kyojin Season 3 Part 2" and "…: The Final Season" share a franchise key.
  const franchiseKey = (t) =>
    t.split(":")[0]
      .replace(/\s+(Part|Season|Movie|Movies|OVA|Specials?|\d+(st|nd|rd|th) Season|Final Season)\b.*$/i, "")
      .replace(/\s+(\d+|II|III|IV)$/, "")
      .trim();
  const franchises = [...groupBy(seen, (a) => [franchiseKey(a.t)]).entries()]
    .map(([name, xs]) => ({
      name, items: xs, eps: xs.reduce((s, a) => s + a.w, 0), mins: xs.reduce((s, a) => s + a.w * epMinutes(a), 0),
      label: xs.map((a) => a.en).find((t) => t)?.split(":")[0] || name,
    }))
    .sort((x, y) => y.eps - x.eps);

  const tens = scored.filter((a) => a.s === 10).sort((x, y) => x.year - y.year);
  const tenFranchises = [...groupBy(tens, (a) => [franchiseKey(a.t)]).entries()].sort((x, y) => y[1].length - x[1].length);

  const withCrowd = scored.filter((a) => a.crowd);
  const byGap = withCrowd.map((a) => ({ a, gap: a.s - a.crowd })).sort((x, y) => y.gap - x.gap);
  const loved = byGap.slice(0, 5);
  const hated = byGap.slice(-5).reverse();
  const kinder = avg(withCrowd.map((a) => a.s)) - avg(withCrowd.map((a) => a.crowd));

  const isSequel = (a) => franchiseKey(a.t) !== a.t;
  const gem = scored.filter((a) => a.s >= 9 && a.pop && !isSequel(a)).sort((x, y) => x.pop - y.pop)[0];
  const longest = completed.slice().sort((x, y) => y.w - x.w)[0];

  const decades = ranked(groupBy(completed.filter((a) => a.year), (a) => [Math.floor(a.year / 10) * 10]))
    .sort((x, y) => x.name - y.name);
  const topDecade = decades.slice().sort((x, y) => y.n - x.n)[0];

  const scoreDist = Array.from({ length: 10 }, (_, i) => ({ score: i + 1, n: scored.filter((a) => a.s === i + 1).length }));
  const modeScore = scoreDist.slice().sort((x, y) => y.n - x.n)[0];

  const dropped = all.filter((a) => a.st === "Dropped");
  const dropRates = ranked(groupBy(all.filter((a) => a.st === "Dropped" || a.st === "Completed"), (a) => a.g), 25)
    .map((g) => ({ ...g, rate: g.items.filter((a) => a.st === "Dropped").length / g.n }))
    .sort((x, y) => y.rate - x.rate);

  const finishes = all.filter((a) => a.fin).sort((x, y) => y.fin.localeCompare(x.fin));
  const finishYears = ranked(groupBy(finishes, (a) => [a.fin.slice(0, 4)])).sort((x, y) => x.name.localeCompare(y.name));

  const has = (a, ...names) => names.some((n) => a.g.includes(n) || a.tags.includes(n));
  const ARCHETYPES = [
    { name: "The shounen loyalist", blurb: "Training arcs, power-ups, a rival who becomes a friend. You never skip the fights.", test: (a) => has(a, "Action") && has(a, "Shounen", "Super Power", "Martial Arts") },
    { name: "The hopeless romantic", blurb: "Will they, won't they? You stay for the confession scene, every single time.", test: (a) => has(a, "Romance") },
    { name: "The emotional damage collector", blurb: "You pick the shows that hurt, and then you give them a 9.", test: (a) => has(a, "Drama") && has(a, "Tragedy", "Coming of Age", "Death", "Suicide") },
    { name: "The mecha pilot", blurb: "Giant robots, cockpit close-ups, and a war nobody wanted.", test: (a) => has(a, "Mecha") },
    { name: "The isekai tourist", blurb: "Hit by a truck, reborn overpowered. You've booked this trip many times.", test: (a) => has(a, "Isekai") },
    { name: "The mind-game addict", blurb: "Plans within plans. You watch for the moment the twist lands.", test: (a) => has(a, "Psychological", "Thriller", "Mystery") },
    { name: "The comedy gremlin", blurb: "If it doesn't make you laugh by episode two, it's out.", test: (a) => has(a, "Comedy") && !has(a, "Drama") },
    { name: "The slice-of-life sipper", blurb: "Tea, club rooms, nothing much happening, and that's the point.", test: (a) => has(a, "Slice of Life") },
  ];
  const baseline = avgScore(seen);
  const archetypes = ARCHETYPES.map((t) => {
    const xs = seen.filter(t.test);
    const share = xs.length / seen.length;
    const lift = avgScore(xs) - baseline;
    return { ...t, n: xs.length, share, lift, value: share * (1 + lift) };
  }).sort((x, y) => y.value - x.value);

  const plan = all.filter((a) => a.st === "Plan to Watch");
  const watching = all.filter((a) => a.st === "Watching");

  return {
    user: window.ANIME.user, all, seen, completed, scored, dropped, plan, watching,
    minutes, days: minutes / 1440, episodes, genres, favGenre, studios, franchises,
    tens, tenFranchises, loved, hated, kinder, gem, longest, decades, topDecade,
    scoreDist, modeScore, dropRates, finishes, finishYears, archetypes, avgScore,
    genreAvg: new Map(genres.map((g) => [g.name, g])),
  };
})();
