/* Time machine: the whole list as a bookshelf, one shelf per year it aired.
   Spine height = your score, thickness = episode count, colour = the cover's. */
const TimeMachine = (() => {
  const { esc, num, title, hsl } = Lib;
  const SEASONS = { Winter: 0, Spring: 1, Summer: 2, Fall: 3, "": 4 };
  let showPlan = true;

  const spine = (a) => {
    const count = a.eps || a.w; // ongoing shows can have episodes watched and no total yet
    const thick = Math.round(Math.min(44, 12 + Math.log2(Math.max(1, count)) * 4.5));
    const tall = a.s ? 46 + a.s * 5.4 : 42;
    const light = hsl(a.col).l > 0.6;
    const cls = [a.st === "Dropped" && "is-dropped", a.st === "Plan to Watch" && "is-plan", a.st === "Watching" && "is-watching"].filter(Boolean).join(" ");
    const tip = `<b>${esc(title(a))}</b><br>${esc([a.season, a.year].filter(Boolean).join(" "))}${a.s ? `, you gave it ${a.s}` : ""}<br>${esc(Lib.statusLabel[a.st])}`;
    return `<button class="spine ${cls} ${light ? "is-light" : ""}" data-detail="${a.id}" data-tip="${tip}"
      style="--tint:${a.col || "#8a918c"};--w:${thick}px;--h:${tall}%" aria-label="${esc(title(a))}, ${a.year}${a.s ? `, rated ${a.s}` : ""}">
      <span>${esc(title(a))}</span></button>`;
  };

  /* Spines grouped by season, with a small divider label wherever the season changes. */
  const withSeasons = (xs) => {
    if (new Set(xs.map((a) => a.season)).size < 2) return xs.map(spine).join("");
    let last = null;
    return xs.map((a) => {
      const tag = a.season !== last ? `<span class="season-tag" aria-hidden="true"><span>${esc(a.season || "Other")}</span></span>` : "";
      last = a.season;
      return tag + spine(a);
    }).join("");
  };

  function render(main) {
    const list = window.ANIME.items.filter((a) => a.year && (showPlan || a.st !== "Plan to Watch"));
    const byYear = new Map();
    for (const a of list) (byYear.get(a.year) || byYear.set(a.year, []).get(a.year)).push(a);
    const years = [...byYear.keys()].sort((x, y) => x - y);
    const first = years[0], last = years[years.length - 1];
    const max = Math.max(...[...byYear.values()].map((xs) => xs.length));
    const oldest = list.slice().sort((x, y) => x.year - y.year)[0];
    const peak = years.reduce((b, y) => (byYear.get(y).length > byYear.get(b).length ? y : b), first);

    const seismo = [];
    for (let y = first; y <= last; y++) {
      const n = byYear.get(y)?.length || 0;
      seismo.push(`<a class="seismo-bar ${y === peak ? "is-hot" : ""}" href="#y${y}" data-tip="<b>${y}</b><br>${n} title${n === 1 ? "" : "s"}"
        style="--h:${(n / max) * 100}%" aria-label="${y}, ${n} titles" ${n ? "" : 'tabindex="-1"'}></a>`);
    }

    main.innerHTML = `
      <section class="timem">
        <h1 class="page-title">Time machine</h1>
        <p class="lede">${num(list.length)} titles shelved by the year they first aired, from ${first} to ${last}. Taller spines got higher scores, thicker ones have more episodes. Your oldest is ${esc(title(oldest))} from ${oldest.year}.</p>
        <div class="timem-controls">
          <label class="check"><input type="checkbox" ${showPlan ? "checked" : ""} data-plan> Include plan-to-watch</label>
          <p class="timem-legend">
            <span class="leg leg-solid"></span>Watched
            <span class="leg leg-plan"></span>Plan to watch
            <span class="leg leg-drop"></span>Dropped
          </p>
        </div>
        <nav class="seismo" aria-label="Jump to a year">
          <div class="seismo-plot">${seismo.join("")}</div>
          <p class="seismo-axis"><span>${first}</span><span>${peak} was your peak year: ${byYear.get(peak).length} titles</span><span>${last}</span></p>
        </nav>
        <div class="shelves">
          ${years.slice().reverse().map((y) => {
            const xs = byYear.get(y).sort((a, b) => SEASONS[a.season] - SEASONS[b.season] || b.s - a.s);
            const scored = xs.filter((a) => a.s);
            const avg = scored.length ? (scored.reduce((s, a) => s + a.s, 0) / scored.length).toFixed(1) : "–";
            return `<section class="shelf-row" id="y${y}" aria-label="${y}">
              <header><h2>${y}</h2><p>${xs.length} title${xs.length === 1 ? "" : "s"}<br>avg ${avg}</p></header>
              <div class="spines">${withSeasons(xs)}</div>
            </section>`;
          }).join("")}
        </div>
      </section>`;

    main.querySelector("[data-plan]").addEventListener("change", (e) => { showPlan = e.target.checked; render(main); });
    main.querySelectorAll(".seismo-bar").forEach((a) => a.addEventListener("click", (e) => {
      e.preventDefault();
      main.querySelector(a.getAttribute("href"))?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }));
  }

  return { render };
})();
