/* The Shelf: every title as a poster (or a compact table), with filters kept in the address bar. */
const Shelf = (() => {
  const { esc, num, title, poster, statusLabel, setQuery, openDetail } = Lib;
  const items = window.ANIME.items;

  const STATUSES = ["All", "Completed", "Watching", "On-Hold", "Dropped", "Plan to Watch"];
  const SORTS = {
    score: { label: "Your score", fn: (a, b) => b.s - a.s || b.crowd - a.crowd },
    crowd: { label: "Crowd score", fn: (a, b) => b.crowd - a.crowd },
    gap: { label: "You vs crowd", fn: (a, b) => (b.s ? b.s - b.crowd : -99) - (a.s ? a.s - a.crowd : -99) },
    newest: { label: "Newest first", fn: (a, b) => b.year - a.year },
    oldest: { label: "Oldest first", fn: (a, b) => (a.year || 9999) - (b.year || 9999) },
    title: { label: "Title", fn: (a, b) => title(a).localeCompare(title(b)) },
  };
  const genres = [...new Set(items.flatMap((a) => a.g))].sort();
  // Formats ordered by how many titles you have of each, so TV and Movie come first.
  const formats = Object.entries(items.reduce((m, a) => ((m[a.type] = (m[a.type] || 0) + 1), m), {}))
    .filter(([t]) => t && t !== "Unknown")
    .sort((x, y) => y[1] - x[1]);
  const DEFAULTS = { q: "", status: "All", genre: "", format: "", sort: "score", view: "grid" };
  let state = { ...DEFAULTS }, current = [];

  /* Read filters from the address bar, ignoring anything that isn't a known value. */
  function fromQuery(query) {
    const pick = (k, ok) => (query.has(k) && ok(query.get(k)) ? query.get(k) : DEFAULTS[k]);
    return {
      q: query.get("q") || "",
      status: pick("status", (v) => STATUSES.includes(v)),
      genre: pick("genre", (v) => genres.includes(v)),
      format: pick("format", (v) => formats.some(([t]) => t === v)),
      sort: pick("sort", (v) => v in SORTS),
      view: pick("view", (v) => v === "grid" || v === "list"),
    };
  }

  function render(main, _param, query = new URLSearchParams()) {
    state = fromQuery(query);
    const count = (s) => (s === "All" ? items.length : items.filter((a) => a.st === s).length);
    main.innerHTML = `
      <section class="shelf">
        <h1 class="page-title">The shelf</h1>
        <form class="filters" role="search" onsubmit="return false">
          <label class="field field-search">
            <span>Search</span>
            <input type="search" name="q" placeholder="Title, English or Japanese" value="${esc(state.q)}">
          </label>
          <label class="field">
            <span>Genre</span>
            <select name="genre">
              <option value="">Any genre</option>
              ${genres.map((g) => `<option ${g === state.genre ? "selected" : ""}>${esc(g)}</option>`).join("")}
            </select>
          </label>
          <label class="field">
            <span>Format</span>
            <select name="format">
              <option value="">Any format</option>
              ${formats.map(([t, n]) => `<option value="${esc(t)}" ${t === state.format ? "selected" : ""}>${esc(t === "Movie" ? "Movies" : t)} (${n})</option>`).join("")}
            </select>
          </label>
          <label class="field">
            <span>Sort by</span>
            <select name="sort">
              ${Object.entries(SORTS).map(([k, s]) => `<option value="${k}" ${k === state.sort ? "selected" : ""}>${s.label}</option>`).join("")}
            </select>
          </label>
          <fieldset class="tabs">
            <legend class="sr-only">Status</legend>
            ${STATUSES.map((s) => `
              <label><input type="radio" name="status" value="${esc(s)}" ${s === state.status ? "checked" : ""}>
              <span>${esc(s === "All" ? "All" : statusLabel[s])} <small>${count(s)}</small></span></label>`).join("")}
          </fieldset>
          <div class="shelf-bar">
            <p class="shelf-count" aria-live="polite"></p>
            <fieldset class="tabs view-toggle">
              <legend class="sr-only">View</legend>
              <label><input type="radio" name="view" value="grid" ${state.view === "grid" ? "checked" : ""}><span>Posters</span></label>
              <label><input type="radio" name="view" value="list" ${state.view === "list" ? "checked" : ""}><span>List</span></label>
            </fieldset>
            <button type="button" class="btn btn-alt" data-surprise>Surprise me</button>
          </div>
        </form>
        <div class="shelf-results"></div>
      </section>`;

    const form = main.querySelector(".filters");
    form.addEventListener("input", () => {
      const f = new FormData(form);
      state = { q: f.get("q").trim(), genre: f.get("genre"), format: f.get("format"), sort: f.get("sort"), status: f.get("status"), view: f.get("view") };
      setQuery(Object.fromEntries(Object.entries(state).filter(([k, v]) => v !== DEFAULTS[k])));
      update(main);
    });
    main.querySelector("[data-surprise]").addEventListener("click", () => {
      if (current.length) openDetail(current[Math.floor(Math.random() * current.length)]);
    });
    update(main);
  }

  function update(main) {
    const q = state.q.toLowerCase();
    current = items
      .filter((a) => state.status === "All" || a.st === state.status)
      .filter((a) => !state.genre || a.g.includes(state.genre))
      .filter((a) => !state.format || a.type === state.format)
      .filter((a) => !q || a.t.toLowerCase().includes(q) || a.en.toLowerCase().includes(q))
      .sort(SORTS[state.sort].fn);
    main.querySelector(".shelf-count").textContent =
      current.length ? `${num(current.length)} title${current.length > 1 ? "s" : ""}` : "Nothing matches. Clear the search or loosen the filters.";
    main.querySelector("[data-surprise]").disabled = !current.length;
    main.querySelector(".shelf-results").innerHTML = state.view === "list" ? table(current) : `
      <div class="grid">${current.map((a) => `
        <div class="card ${a.st === "Dropped" ? "is-dropped" : ""}">
          ${poster(a)}
          <p class="card-title">${esc(title(a))}</p>
          <p class="card-meta">${[a.year, a.type].filter(Boolean).join(", ")}</p>
        </div>`).join("")}</div>`;
  }

  const table = (list) => list.length ? `
    <div class="table-wrap">
      <table class="list-table">
        <thead><tr><th scope="col">Title</th><th scope="col">Year</th><th scope="col">Format</th><th scope="col">Episodes</th>
          <th scope="col" class="num">You</th><th scope="col" class="num">Crowd</th><th scope="col">Status</th></tr></thead>
        <tbody>${list.map((a) => `
          <tr class="${a.st === "Dropped" ? "is-dropped" : ""}">
            <th scope="row"><button class="row-link" data-detail="${a.id}">
              ${a.img ? `<img src="${esc(a.img)}" alt="" loading="lazy">` : "<span></span>"}${esc(title(a))}</button></th>
            <td>${a.year || "–"}</td>
            <td>${esc(a.type)}</td>
            <td>${a.eps ? (a.w === a.eps ? a.eps : `${a.w} / ${a.eps}`) : a.w || "–"}</td>
            <td class="num"><b>${a.s || "–"}</b></td>
            <td class="num">${a.crowd || "–"}</td>
            <td>${esc(statusLabel[a.st])}</td>
          </tr>`).join("")}</tbody>
      </table>
    </div>` : "";

  return { render };
})();
