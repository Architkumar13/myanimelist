/* Next season: the upcoming season's shows from AniList, ranked by how well they fit your scores,
   with a shortlist you can keep and send to your calendar. */
const Season = (() => {
  const { esc, title, poster, extTitle, extPoster, byId, FORMATS, setQuery, download } = Lib;
  const E = window.EXTRA;
  const NAMES = ["WINTER", "SPRING", "SUMMER", "FALL"];
  const LIST_KEY = "archit13-shortlist";
  const CACHE_HOURS = 6;

  /* ---------- Seasons: this one, the next, and the one after ---------- */
  const seasonAt = (offset) => {
    const now = new Date();
    const i = Math.floor(now.getMonth() / 3) + offset;
    return { season: NAMES[((i % 4) + 4) % 4], year: now.getFullYear() + Math.floor(i / 4) };
  };
  const keyOf = (s) => `${s.season.toLowerCase()}-${s.year}`;
  const labelOf = (s) => `${s.season === "FALL" ? "Fall" : s.season[0] + s.season.slice(1).toLowerCase()} ${s.year}`;
  const SEASONS = [
    { ...seasonAt(1), tab: "Next season" },
    { ...seasonAt(2), tab: "The one after" },
    { ...seasonAt(0), tab: "This season" },
  ];

  /* ---------- Your taste: how far above your average you score each genre, tag and studio ---------- */
  const scored = window.ANIME.items.filter((a) => a.s);
  const mean = scored.reduce((s, a) => s + a.s, 0) / scored.length;
  const affinity = (keys) => {
    const m = new Map();
    for (const a of scored) for (const k of keys(a)) {
      const r = m.get(k) || { sum: 0, n: 0 };
      r.sum += a.s - mean; r.n += 1;
      m.set(k, r);
    }
    // Shrink towards zero so one lucky title doesn't make a genre a favourite.
    return (k) => { const r = m.get(k); return r ? { lift: r.sum / (r.n + 4), n: r.n, avg: mean + r.sum / r.n } : { lift: 0, n: 0 }; };
  };
  const genreAff = affinity((a) => a.g);
  const tagAff = affinity((a) => a.tags);
  const studioAff = affinity((a) => a.studio);

  // Off-list AniList titles that directly follow something on your list (you saw season 1, not season 2).
  const followsListed = new Map();
  for (const a of window.ANIME.items) {
    for (const [rel, mi] of E.rel[a.id] || []) if (rel === "SEQUEL") followsListed.set(E.media[mi].al, a);
  }

  const seen = (a) => a && a.st !== "Plan to Watch";
  function judge(m) {
    const avg = (xs) => (xs.length ? xs.reduce((s, x) => s + x, 0) / xs.length : 0);
    const g = avg(m.g.map((x) => genreAff(x).lift));
    const t = avg(m.tags.map((x) => tagAff(x).lift));
    const studio = m.studio ? studioAff(m.studio) : { lift: 0, n: 0 };
    let seq = 0, why = [];

    const before = m.prequels.map((p) => ({ p, a: p.mal && byId.get(p.mal) }));
    const direct = before.find((x) => seen(x.a));
    const gap = !direct && before.map((x) => followsListed.get(x.p.al)).find(seen);
    if (direct) {
      const a = direct.a;
      const verb = direct.p.rel === "PARENT" ? "A spin-off of" : "Follows";
      if (a.st === "Dropped") { seq = -2; why.push(`You dropped <b>${esc(title(a))}</b>, which comes before it.`); }
      else if (a.s) { seq = 1.5 + (a.s - mean) * 1.2; why.push(`${verb} <b>${esc(title(a))}</b>, which you gave ${a.s}.`); }
      else { seq = 1; why.push(`${verb} <b>${esc(title(a))}</b> (${Lib.statusLabel[a.st].toLowerCase()} on your list).`); }
    } else if (gap) {
      seq = gap.s ? 0.4 + (gap.s - mean) * 0.4 : 0.3;
      why.push(`Part of the <b>${esc(title(gap))}</b> story${gap.s ? ` (you gave it ${gap.s})` : ""}, but you haven't seen the entry before this one.`);
    }

    const liked = m.g.map((x) => [x, genreAff(x)]).filter(([, r]) => r.lift > 0.12 && r.n >= 5).sort((x, y) => y[1].lift - x[1].lift).slice(0, 2);
    if (liked.length) why.push(`${liked.map(([x]) => esc(x)).join(" and ")}${liked.length > 1 ? " are genres" : " is a genre"} you score above your average.`);
    if (studio.n >= 3 && studio.avg >= mean + 0.3) why.push(`From ${esc(m.studio)}: you average ${studio.avg.toFixed(1)} across their ${studio.n} shows.`);
    if (!why.length && g < -0.08) why.push("Outside the genres you usually rate highly.");

    return { raw: g + 0.8 * t + 0.5 * studio.lift + seq, why: why.slice(0, 2) };
  }

  /* ---------- AniList, cached per season so revisits are instant and work offline ---------- */
  const QUERY = `query ($season: MediaSeason, $year: Int, $page: Int) {
    Page(page: $page, perPage: 50) { media(season: $season, seasonYear: $year, type: ANIME, isAdult: false, sort: POPULARITY_DESC) {
      id idMal title { romaji english } coverImage { large color } format episodes status description(asHtml: false)
      startDate { year month day } nextAiringEpisode { airingAt episode } genres
      tags { name rank isMediaSpoiler } studios(isMain: true) { nodes { name } } averageScore popularity
      relations { edges { relationType node { id idMal type } } } } } }`;

  const slim = (m) => ({
    al: m.id, mal: m.idMal || 0, t: m.title.romaji || "", en: m.title.english || "",
    img: m.coverImage.large || "", col: m.coverImage.color || "", fmt: m.format || "", eps: m.episodes || 0,
    g: m.genres || [], tags: (m.tags || []).filter((t) => t.rank >= 60 && !t.isMediaSpoiler).slice(0, 6).map((t) => t.name),
    studio: m.studios.nodes[0]?.name || "", crowd: m.averageScore ? m.averageScore / 10 : 0, pop: m.popularity || 0,
    start: m.startDate, at: m.nextAiringEpisode?.episode === 1 ? m.nextAiringEpisode.airingAt : 0,
    syn: (m.description || "").replace(/<[^>]+>/g, "").replace(/\(Source:[^)]*\)|\[Written by MAL Rewrite\]|Note:.*$/gs, "").replace(/\s+/g, " ").trim().slice(0, 320),
    prequels: m.relations.edges.filter((e) => e.node.type === "ANIME" && ["PREQUEL", "PARENT"].includes(e.relationType))
      .map((e) => ({ al: e.node.id, mal: e.node.idMal || 0, rel: e.relationType })),
  });

  async function fetchSeason(s) {
    const media = [];
    for (const page of [1, 2]) {
      const res = await fetch("https://graphql.anilist.co", {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ query: QUERY, variables: { season: s.season, year: s.year, page } }),
      });
      if (!res.ok) throw new Error(`AniList returned ${res.status}`);
      media.push(...(await res.json()).data.Page.media);
    }
    return media.filter((m) => m.format !== "MUSIC").map(slim);
  }

  async function load(s) {
    const key = `archit13-season-${keyOf(s)}`;
    const cached = JSON.parse(localStorage.getItem(key) || "null");
    if (cached && Date.now() - cached.at < CACHE_HOURS * 3600e3) return { media: cached.media, note: "" };
    try {
      const media = await fetchSeason(s);
      try { localStorage.setItem(key, JSON.stringify({ at: Date.now(), media })); } catch { /* storage full: skip the cache */ }
      return { media, note: "" };
    } catch (err) {
      if (cached) return { media: cached.media, note: `Couldn't reach AniList, so this is the list from ${new Date(cached.at).toLocaleDateString()}.` };
      throw err;
    }
  }

  /* ---------- Shortlist ---------- */
  const shortlist = {
    all: () => JSON.parse(localStorage.getItem(LIST_KEY) || "{}"),
    has: (al) => al in shortlist.all(),
    toggle(m, s) {
      const list = shortlist.all();
      if (list[m.al]) delete list[m.al];
      else list[m.al] = { al: m.al, mal: m.mal, t: m.t, en: m.en, img: m.img, col: m.col, start: m.start, at: m.at, season: keyOf(s) };
      localStorage.setItem(LIST_KEY, JSON.stringify(list));
    },
    of: (s) => Object.values(shortlist.all()).filter((m) => m.season === keyOf(s)),
  };

  const dateFmt = new Intl.DateTimeFormat(undefined, { weekday: "short", day: "numeric", month: "short" });
  const premiere = (m) => {
    if (m.at) return dateFmt.format(new Date(m.at * 1000));
    if (m.start?.month && m.start?.day) return dateFmt.format(new Date(m.start.year, m.start.month - 1, m.start.day));
    if (m.start?.month) return new Intl.DateTimeFormat(undefined, { month: "long" }).format(new Date(m.start.year, m.start.month - 1, 1));
    return "Date not announced";
  };
  const startsAt = (m) => m.at * 1000 || (m.start?.month ? new Date(m.start.year, m.start.month - 1, m.start.day || 28).getTime() : Infinity);

  function calendar(list) {
    const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const text = (t) => t.replace(/[\\,;]/g, (c) => "\\" + c);
    const events = list.flatMap((m) => {
      const name = `SUMMARY:${text(extTitle(m))} premieres`;
      const base = ["BEGIN:VEVENT", `UID:premiere-${m.al}@archit13-weekly`, `DTSTAMP:${stamp}`, name, `URL:https://anilist.co/anime/${m.al}`];
      if (m.at) {
        const t = (secs) => new Date(secs * 1000).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
        return [...base, `DTSTART:${t(m.at)}`, `DTEND:${t(m.at + 1800)}`, "END:VEVENT"];
      }
      if (m.start?.day) {
        const d = `${m.start.year}${String(m.start.month).padStart(2, "0")}${String(m.start.day).padStart(2, "0")}`;
        return [...base, `DTSTART;VALUE=DATE:${d}`, "END:VEVENT"];
      }
      return [];
    });
    const body = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//archit13 weekly//Next season//EN", ...events, "END:VCALENDAR"].join("\r\n");
    return { count: events.filter((l) => l === "BEGIN:VEVENT").length, href: "data:text/calendar;charset=utf-8," + encodeURIComponent(body) };
  }

  /* ---------- Page ---------- */
  const SORTS = { match: "Best match", pop: "Most popular", date: "Premiere date" };
  const FORMAT_GROUPS = { "": "Everything", tv: "TV", movie: "Movies", other: "ONA, OVA and specials" };
  const inGroup = (m, f) => !f || (f === "tv" ? ["TV", "TV_SHORT"].includes(m.fmt) : f === "movie" ? m.fmt === "MOVIE" : !["TV", "TV_SHORT", "MOVIE"].includes(m.fmt));
  let current = SEASONS[0], sort = "match", format = "", shows = [], note = "";

  function render(main, param, query) {
    current = SEASONS.find((s) => keyOf(s) === param) || SEASONS[0];
    sort = query?.get("sort") in SORTS ? query.get("sort") : "match";
    format = query?.get("format") in FORMAT_GROUPS ? query.get("format") : "";
    main.innerHTML = `
      <section class="season">
        <h1 class="page-title">Next season</h1>
        <p class="lede">What's coming up, ranked by how well it fits the way you score: sequels to shows you rated highly first,
          then the genres, themes and studios you rate above your average of ${mean.toFixed(1)}.</p>
        <nav class="year-tabs season-tabs" aria-label="Season">
          ${SEASONS.map((s) => `<a href="#/season/${keyOf(s)}" ${s === current ? 'aria-current="page"' : ""}><span>${s.tab}<small>${labelOf(s)}</small></span></a>`).join("")}
        </nav>
        <div class="season-body"><p class="lede">Loading ${labelOf(current)} from AniList…</p></div>
      </section>`;
    const want = current;
    load(want)
      .then((r) => {
        if (current !== want || !main.querySelector(".season")) return; // switched season while loading
        note = r.note;
        shows = r.media.map((m) => ({ m, ...judge(m) }));
        const raws = shows.map((x) => x.raw);
        const lo = Math.min(...raws), hi = Math.max(...raws);
        shows.forEach((x) => (x.match = Math.round(35 + 64 * Math.pow((x.raw - lo) / (hi - lo || 1), 0.8))));
        draw(main);
      })
      .catch(() => {
        if (current !== want) return;
        main.querySelector(".season-body").innerHTML = `
          <p>Couldn't reach AniList to load ${labelOf(want)}. This page needs an internet connection the first time you open each season.</p>
          <button class="btn" data-retry>Try again</button>`;
        main.querySelector("[data-retry]").addEventListener("click", () => render(main, keyOf(want), query));
      });
  }

  function draw(main) {
    const body = main.querySelector(".season-body");
    const order = { match: (x, y) => y.match - x.match || y.m.pop - x.m.pop, pop: (x, y) => y.m.pop - x.m.pop, date: (x, y) => startsAt(x.m) - startsAt(y.m) };
    const list = shows.filter((x) => inGroup(x.m, format)).sort(order[sort]);
    const picks = shortlist.of(current).sort((x, y) => startsAt(x) - startsAt(y));
    const [first, ...rest] = sort === "match" ? list : [null, ...list];

    body.innerHTML = `
      ${note ? `<p class="pair-meta">${esc(note)}</p>` : ""}
      <section class="shortlist" aria-labelledby="shortlist-title">
        <h2 id="shortlist-title">Your shortlist for ${labelOf(current)} <small>${picks.length}</small></h2>
        ${picks.length ? `
          <ul class="shortlist-items">${picks.map((m) => `
            <li>${onList(m) ? poster(onList(m), { size: "sm", badge: false }) : extPoster(m, { size: "sm" })}
              <div><b>${esc(extTitle(m))}</b><span class="pair-meta">${premiere(m)}</span>
                <button type="button" class="btn-quiet" data-toggle="${m.al}">Remove</button></div>
            </li>`).join("")}</ul>
          <p class="shortlist-actions">
            <button type="button" class="btn" data-ics>Add premieres to my calendar</button>
            <button type="button" class="btn btn-alt" data-copy>Copy the list</button>
            <span class="pair-meta" data-copied aria-live="polite"></span>
          </p>` : `<p class="pair-meta">Nothing yet. Add shows with the Shortlist buttons below and they collect here.</p>`}
      </section>

      <div class="season-controls">
        <fieldset class="tabs" data-control="format"><legend class="sr-only">Format</legend>
          ${Object.entries(FORMAT_GROUPS).map(([k, l]) => `<label><input type="radio" name="format" value="${k}" ${k === format ? "checked" : ""}><span>${l} <small>${shows.filter((x) => inGroup(x.m, k)).length}</small></span></label>`).join("")}
        </fieldset>
        <label class="field">
          <span>Sort by</span>
          <select data-control="sort">${Object.entries(SORTS).map(([k, l]) => `<option value="${k}" ${k === sort ? "selected" : ""}>${l}</option>`).join("")}</select>
        </label>
      </div>

      ${first ? `
      <article class="match-hero">
        <div class="match-cover">${cover(first.m)}</div>
        <div>
          <p class="next-label">Your best bet for ${labelOf(current)}</p>
          <p class="match-pct"><b>${first.match}%</b> match</p>
          <h2>${esc(extTitle(first.m))}</h2>
          <p class="pair-meta">${meta(first.m)}</p>
          ${first.why.map((w) => `<p class="rec-why">${w}</p>`).join("")}
          ${toggleBtn(first.m)}
        </div>
      </article>` : ""}
      ${rest.length ? `<ol class="recs season-list">${rest.map((x) => `
        <li class="rec ${shortlist.has(x.m.al) ? "is-picked" : ""}">
          ${cover(x.m)}
          <div class="rec-body">
            <h3>${esc(extTitle(x.m))}</h3>
            <p class="pair-meta">${x.match}% match, ${meta(x.m)}</p>
            ${x.why.map((w) => `<p class="rec-why">${w}</p>`).join("")}
            ${x.m.syn ? `<p class="season-syn">${esc(x.m.syn)}</p>` : ""}
            ${toggleBtn(x.m)}
          </div>
        </li>`).join("")}</ol>` : !first ? `<p>Nothing in this format for ${labelOf(current)}. Pick another.</p>` : ""}`;

    body.querySelector(".season-controls").addEventListener("change", (e) => {
      if (e.target.name === "format") format = e.target.value;
      if (e.target.dataset.control === "sort") sort = e.target.value;
      setQuery({ sort: sort === "match" ? "" : sort, format });
      draw(main);
    });
    body.querySelector("[data-ics]")?.addEventListener("click", () => {
      const cal = calendar(picks);
      if (cal.count) download(`premieres-${keyOf(current)}.ics`, cal.href);
    });
    body.querySelector("[data-copy]")?.addEventListener("click", async () => {
      const text = `My ${labelOf(current)} shortlist\n` + picks.map((m) => `- ${extTitle(m)} (${premiere(m)})`).join("\n");
      try { await navigator.clipboard.writeText(text); body.querySelector("[data-copied]").textContent = "Copied."; }
      catch { body.querySelector("[data-copied]").textContent = "Couldn't copy here. Try again from localhost or a browser tab."; }
    });
  }

  const onList = (m) => m.mal && byId.get(m.mal);
  const cover = (m) => (onList(m) ? poster(onList(m), { badge: false }) : extPoster(m));
  const meta = (m) => [
    FORMATS[m.fmt], m.eps && `${m.eps} ep${m.eps > 1 ? "s" : ""}`, m.studio, `starts ${premiere(m)}`,
    onList(m) && `already on your list as ${Lib.statusLabel[onList(m).st].toLowerCase()}`,
  ].filter(Boolean).map(esc).join(", ");
  const toggleBtn = (m) => {
    const on = shortlist.has(m.al);
    return `<button type="button" class="chip-btn season-toggle" data-toggle="${m.al}" aria-pressed="${on}">${on ? "On your shortlist" : "Shortlist"}</button>`;
  };

  // Registered once for the whole site: shortlist toggles on the cards and in the shortlist itself.
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".season [data-toggle]");
    if (!b) return;
    const al = +b.dataset.toggle;
    const m = shows.find((x) => x.m.al === al)?.m || shortlist.all()[al];
    if (!m) return;
    shortlist.toggle(m, current);
    const main = b.closest("main");
    const y = window.scrollY;
    draw(main);
    window.scrollTo(0, y);
    main.querySelector(`.season [data-toggle="${al}"].season-toggle`)?.focus({ preventScroll: true });
  });

  return { render };
})();
