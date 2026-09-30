/* For you: AniList community recommendations pooled across everything you rated 8+. */
const ForYou = (() => {
  const { esc, title, extTitle, extPoster, poster, FORMATS, hidden, hideControls, bindHide, setQuery } = Lib;
  const E = window.EXTRA;
  const onList = new Set(window.ANIME.items.map((a) => a.id));

  const ranked = (() => {
    const agg = new Map();
    for (const a of window.ANIME.items) {
      if (a.s < 8) continue;
      const love = a.s - 7; // 8 → 1, 9 → 2, 10 → 3
      for (const [mi, rating] of E.recs[a.id] || []) {
        const m = E.media[mi];
        if ((m.mal && onList.has(m.mal)) || m.st === "NOT_YET_RELEASED" || m.fmt === "MUSIC") continue;
        const r = agg.get(m.al) || { m, score: 0, from: [] };
        r.score += love * Math.log2(1 + rating);
        r.from.push(a);
        agg.set(m.al, r);
      }
    }
    const list = [...agg.values()].sort((x, y) => y.score - x.score);
    const top = list[0]?.score || 1;
    list.forEach((r) => {
      r.match = Math.round(55 + 44 * Math.sqrt(r.score / top));
      r.from.sort((x, y) => y.s - x.s);
    });
    return list.slice(0, 120);
  })();

  let genre = "", showHidden = false;
  const genres = [...new Set(ranked.flatMap((r) => r.m.g))]
    .map((g) => [g, ranked.filter((r) => r.m.g.includes(g)).length]).sort((x, y) => y[1] - x[1]).slice(0, 12);

  const because = (from) => {
    const names = from.slice(0, 2).map((a) => `<b>${esc(title(a))}</b>`);
    const more = from.length - names.length;
    return `Because you loved ${names.join(" and ")}${more > 0 ? ` and ${more} more` : ""}.`;
  };

  function render(main, _param, query) {
    if (query) genre = genres.some(([g]) => g === query.get("genre")) ? query.get("genre") : "";
    const hiddenIds = hidden.all();
    const hiddenCount = ranked.filter((r) => r.m.al in hiddenIds).length;
    const list = ranked.filter((r) => (!genre || r.m.g.includes(genre)) && (showHidden || !(r.m.al in hiddenIds)));
    const [first, ...rest] = list;
    main.innerHTML = `
      <section class="foryou">
        <h1 class="page-title">For you</h1>
        <p class="lede">What the AniList community recommends for the shows you rated 8 or more, pooled together. The more of your favourites point at something, and the more you loved them, the higher it ranks. Nothing here is on your list yet.</p>
        <fieldset class="tabs"><legend class="sr-only">Genre</legend>
          <label><input type="radio" name="g" value="" ${!genre ? "checked" : ""}><span>Everything</span></label>
          ${genres.map(([g, n]) => `<label><input type="radio" name="g" value="${esc(g)}" ${g === genre ? "checked" : ""}><span>${esc(g)} <small>${n}</small></span></label>`).join("")}
        </fieldset>
        ${hiddenCount ? `<label class="check hidden-toggle"><input type="checkbox" data-show-hidden ${showHidden ? "checked" : ""}> Show ${hiddenCount} hidden</label>` : ""}
        ${first ? `
        <article class="match-hero">
          <div class="match-cover">${extPoster(first.m)}</div>
          <div>
            <p class="match-pct"><b>${first.match}%</b> match</p>
            <h2>${esc(extTitle(first.m))}</h2>
            <p class="pair-meta">${meta(first.m)}</p>
            <p>${because(first.from)}</p>
            <div class="match-from">${first.from.slice(0, 8).map((a) => poster(a, { size: "sm" })).join("")}</div>
            ${hideControls(first.m.al)}
          </div>
        </article>
        <ol class="recs">${rest.slice(0, 47).map((r, i) => `
          <li class="rec">
            ${extPoster(r.m)}
            <p class="rec-rank">${i + 2}</p>
            <div class="rec-body">
              <h3>${esc(extTitle(r.m))}</h3>
              <p class="pair-meta">${r.match}% match, ${meta(r.m)}</p>
              <p class="rec-why">${because(r.from)}</p>
              ${hideControls(r.m.al)}
            </div>
          </li>`).join("")}</ol>` : `<p>No recommendations in this genre. Pick another.</p>`}
      </section>`;
    main.querySelector(".tabs").addEventListener("change", (e) => { genre = e.target.value; setQuery({ genre }); render(main); });
    main.querySelector("[data-show-hidden]")?.addEventListener("change", (e) => { showHidden = e.target.checked; render(main); });
    bindHide(main.querySelector(".foryou"), () => render(main));
  }

  const meta = (m) => [FORMATS[m.fmt], m.eps && `${m.eps} ep${m.eps > 1 ? "s" : ""}`, m.year, m.crowd && `crowd ${m.crowd}`].filter(Boolean).join(", ");

  return { render };
})();
