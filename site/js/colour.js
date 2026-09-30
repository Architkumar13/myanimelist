/* Colour wall: every cover arranged by its dominant colour, plus "what colour is your taste". */
const ColourWall = (() => {
  const { esc, title, hsl } = Lib;
  const items = window.ANIME.items.filter((a) => a.col);
  items.forEach((a) => (a.hsl = hsl(a.col)));

  const STATUS_ORDER = { Completed: 0, Watching: 1, "On-Hold": 2, Dropped: 3, "Plan to Watch": 4 };
  // Greys go last, sorted light to dark; colours by hue starting at red (shifted so pinks sit with reds).
  const hueKey = (a) => (a.hsl.s < 0.18 ? 1000 + (1 - a.hsl.l) * 100 : ((a.hsl.h + 20) % 360) + a.hsl.l * 0.9);
  const SORTS = {
    colour: { label: "Colour", fn: (a, b) => hueKey(a) - hueKey(b) },
    score: { label: "Your score", fn: (a, b) => b.s - a.s || hueKey(a) - hueKey(b) },
    year: { label: "Year aired", fn: (a, b) => (a.year || 9999) - (b.year || 9999) || hueKey(a) - hueKey(b) },
    status: { label: "Status", fn: (a, b) => STATUS_ORDER[a.st] - STATUS_ORDER[b.st] || hueKey(a) - hueKey(b) },
  };
  let sort = "colour", mode = "covers";

  /* Twelve named hue bins (30° each, red centred on 0°); greys are their own bin. */
  const BINS = ["red", "orange", "yellow", "lime", "green", "teal", "cyan", "blue", "indigo", "violet", "magenta", "pink", "grey"];
  const binOf = (a) => (a.hsl.s < 0.18 ? 12 : Math.floor(((a.hsl.h + 15) % 360) / 30));
  const histogram = (list) => {
    const h = new Array(13).fill(0);
    list.forEach((a) => (h[binOf(a)] += 1));
    return h.map((n) => n / (list.length || 1));
  };
  /* A representative colour for a bin: the median-lightness cover in it. */
  const binColour = (list, bin) => {
    const xs = list.filter((a) => binOf(a) === bin).sort((x, y) => x.hsl.l - y.hsl.l);
    return xs[Math.floor(xs.length / 2)]?.col || "#999";
  };

  function render(main) {
    // Each genre's colour is the hue it over-indexes on most compared with your whole list.
    const base = histogram(items);
    const genres = Stats.genres.slice(0, 12).map((g) => {
      const xs = g.items.filter((a) => a.hsl);
      const h = histogram(xs);
      // Pure over-representation, ignoring hues under 6% of the genre so a few covers can't win it.
      const bin = h.map((v, i) => (i === 12 || v < 0.06 ? 0 : v / (base[i] || 1))).reduce((b, v, i, arr) => (v > arr[b] ? i : b), 0);
      return { name: g.name, bin: BINS[bin], lift: h[bin] / base[bin], col: binColour(xs, bin) };
    });
    const palette = base.map((share, i) => ({ share, name: BINS[i], col: binColour(items, i) }))
      .filter((b) => b.share > 0.02).sort((x, y) => y.share - x.share);
    const top = palette[0];
    main.innerHTML = `
      <section class="colour">
        <h1 class="page-title">Colour wall</h1>
        <div class="taste">
          <div class="taste-swatch" role="img" aria-label="Your cover palette">
            ${palette.map((b) => `<span style="--c:${b.col};--s:${b.share}" data-tip="<b>${b.name}</b><br>${Math.round(b.share * 100)}% of covers"></span>`).join("")}
          </div>
          <div>
            <h2>Your list is ${Math.round(top.share * 100)}% ${top.name}.</h2>
            <p class="lede">The palette of ${items.length} covers, grouped by hue. Each genre leans towards its own colour:</p>
            <ul class="genre-swatches">${genres.map((g) => `<li><button type="button" style="--c:${g.col}" aria-pressed="false" data-genre="${esc(g.name)}"
              data-tip="<b>${esc(g.name)}</b> leans ${g.bin}<br>${g.lift.toFixed(1)}× more ${g.bin} than your list overall<br>Click to find them on the wall"><span></span>${esc(g.name)} <small>${g.bin}</small></button></li>`).join("")}</ul>
          </div>
        </div>
        <div class="wall-controls">
          <fieldset class="tabs"><legend>Arrange by</legend>
            ${Object.entries(SORTS).map(([k, s]) => `<label><input type="radio" name="sort" value="${k}" ${k === sort ? "checked" : ""}><span>${s.label}</span></label>`).join("")}
          </fieldset>
          <fieldset class="tabs"><legend>Show</legend>
            <label><input type="radio" name="mode" value="covers" ${mode === "covers" ? "checked" : ""}><span>Covers</span></label>
            <label><input type="radio" name="mode" value="swatches" ${mode === "swatches" ? "checked" : ""}><span>Pure colour</span></label>
          </fieldset>
        </div>
        <div class="wall is-${mode}"></div>
      </section>`;

    const wall = main.querySelector(".wall");
    wall.innerHTML = items.map((a) => `
      <button class="tile" data-detail="${a.id}" style="--tint:${a.col}" data-tip="<b>${esc(title(a))}</b><br>${a.col}${a.s ? `, you gave it ${a.s}` : ""}" aria-label="${esc(title(a))}">
        ${a.img ? `<img src="${esc(a.img)}" alt="" loading="lazy" decoding="async">` : ""}
      </button>`).join("");
    const tiles = new Map([...wall.children].map((el) => [+el.dataset.detail, el]));
    arrange(wall, tiles, false);

    // Clicking a genre swatch lights up that genre's covers and dims the rest.
    let highlight = null;
    main.querySelector(".genre-swatches").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-genre]");
      if (!btn) return;
      highlight = highlight === btn.dataset.genre ? null : btn.dataset.genre;
      main.querySelectorAll("[data-genre]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.genre === highlight)));
      wall.classList.toggle("is-filtering", !!highlight);
      for (const [id, el] of tiles) el.classList.toggle("is-match", !!highlight && Lib.byId.get(id).g.includes(highlight));
    });

    main.querySelector(".wall-controls").addEventListener("change", (e) => {
      if (e.target.name === "sort") { sort = e.target.value; arrange(wall, tiles, true); }
      if (e.target.name === "mode") {
        mode = e.target.value;
        wall.classList.remove("is-covers", "is-swatches");
        wall.classList.add(`is-${mode}`);
      }
    });
  }

  /* Reorder with a FLIP animation so each cover visibly travels to its new place. */
  function arrange(wall, tiles, animate) {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const before = animate && !reduced ? new Map([...tiles].map(([id, el]) => [id, el.getBoundingClientRect()])) : null;
    const order = items.slice().sort(SORTS[sort].fn);
    wall.append(...order.map((a) => tiles.get(a.id)));
    if (!before) return;
    const viewH = window.innerHeight;
    for (const [id, el] of tiles) {
      const a = before.get(id), b = el.getBoundingClientRect();
      if (a.bottom < -200 && b.bottom < -200) continue;
      if (a.top > viewH + 200 && b.top > viewH + 200) continue;
      const dx = a.left - b.left, dy = a.top - b.top;
      if (dx || dy) el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }],
        { duration: 700 + Math.random() * 300, easing: "cubic-bezier(.2,.8,.2,1)" });
    }
  }

  return { render };
})();
