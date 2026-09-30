/* Year by year: a small Wrapped for each year you logged finish dates, laid out as a calendar. */
const YearByYear = (() => {
  const { esc, num, title, poster } = Lib;
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const epMinutes = (a) => a.dur || (a.type === "Movie" ? 90 : 24);

  function render(main, param) {
    const years = Stats.finishYears.map((y) => y.name);
    const year = years.includes(param) ? param : years[years.length - 1];
    const list = Stats.finishes.filter((a) => a.fin.startsWith(year));
    const prev = Stats.finishes.filter((a) => a.fin.startsWith(String(+year - 1)));
    const scored = list.filter((a) => a.s);
    const avg = scored.length ? scored.reduce((s, a) => s + a.s, 0) / scored.length : 0;
    const eps = list.reduce((s, a) => s + a.w, 0);
    const hours = list.reduce((s, a) => s + a.w * epMinutes(a), 0) / 60;
    const byMonth = MONTHS.map((_, i) => list.filter((a) => +a.fin.slice(5, 7) === i + 1).sort((x, y) => x.fin.localeCompare(y.fin)));
    const busiest = byMonth.reduce((b, xs, i) => (xs.length > byMonth[b].length ? i : b), 0);
    const best = scored.slice().sort((x, y) => y.s - x.s || y.crowd - x.crowd).slice(0, 3);
    const genreCount = new Map();
    list.forEach((a) => a.g.forEach((g) => genreCount.set(g, (genreCount.get(g) || 0) + 1)));
    const topGenres = [...genreCount].sort((x, y) => y[1] - x[1]).slice(0, 5);
    const diff = list.length - prev.length;
    const isCurrent = year === String(new Date().getFullYear());

    main.innerHTML = `
      <section class="yearp">
        <nav class="tabs year-tabs" aria-label="Choose a year">
          ${years.map((y) => `<a href="#/year/${y}" ${y === year ? 'aria-current="page"' : ""}><span>${y}</span></a>`).join("")}
        </nav>
        <header class="year-head">
          <h1 class="year-num" aria-label="${year}">${year}</h1>
          <dl class="year-stats">
            <div><dt>Finished</dt><dd>${list.length}</dd></div>
            <div><dt>Episodes</dt><dd>${num(eps)}</dd></div>
            <div><dt>Hours</dt><dd>${num(hours)}</dd></div>
            <div><dt>Average score</dt><dd>${avg ? avg.toFixed(1) : "–"}</dd></div>
          </dl>
          <p class="year-verdict">${prev.length
            ? `${diff >= 0 ? `${diff} more` : `${-diff} fewer`} than ${+year - 1}${isCurrent ? ", and the year isn't over" : ""}.`
            : `Your first year of logged finish dates.`}
            ${byMonth[busiest].length ? `${MONTHS[busiest]} was the big month with ${byMonth[busiest].length}.` : ""}</p>
        </header>

        <div class="year-body">
          <ol class="calendar">
            ${byMonth.map((xs, i) => `
              <li class="${i === busiest && xs.length ? "is-busiest" : ""} ${xs.length ? "" : "is-empty"}">
                <h2>${MONTHS[i]} <small>${xs.length || ""}</small></h2>
                ${xs.length ? `<div class="cal-posters">${xs.map((a) => poster(a, { size: "sm" })).join("")}</div>` : `<p>Nothing finished</p>`}
              </li>`).join("")}
          </ol>
          <aside class="year-side">
            ${best.length ? `<h2>Best of ${year}</h2>
            <ol class="podium">${best.map((a, i) => `
              <li>${poster(a, { size: "sm" })}<p><b>${esc(title(a))}</b><br>you gave it ${a.s}</p></li>`).join("")}</ol>` : ""}
            ${topGenres.length ? `<h2>The year in genres</h2>
            <ul class="bars">${topGenres.map(([g, n]) => `
              <li tabindex="0" data-tip="<b>${esc(g)}</b><br>${n} of ${list.length} finished">
                <span class="bars-label">${esc(g)}</span>
                <span class="bars-track"><span class="bars-fill" style="--w:${(n / topGenres[0][1]) * 100}%"></span></span>
                <span class="bars-value">${n}</span>
              </li>`).join("")}</ul>` : ""}
            <p class="panel-note">Only titles with a logged finish date count here: ${Stats.finishes.length} of your ${Stats.completed.length} completed titles.</p>
          </aside>
        </div>
      </section>`;
  }

  return { render };
})();
