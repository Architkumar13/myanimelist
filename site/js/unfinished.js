/* Unfinished business: sequels, prequels and side stories to things you liked that aren't on your list. */
const Unfinished = (() => {
  const { esc, num, title, poster, extTitle, extPoster, FORMATS, hidden, hideControls, bindHide } = Lib;
  const E = window.EXTRA;
  const onList = new Set(window.ANIME.items.map((a) => a.id));
  const REL = { SEQUEL: "Sequel", PREQUEL: "Prequel", SIDE_STORY: "Side story", SPIN_OFF: "Spin-off", ALTERNATIVE: "Alternative version", PARENT: "Main story", SUMMARY: "Recap" };
  const GROUPS = [
    { key: "next", title: "The next chapter", blurb: "Sequels to things you watched and liked.", test: (c) => c.rel === "SEQUEL" && c.m.st !== "NOT_YET_RELEASED" },
    { key: "soon", title: "Coming soon", blurb: "Announced but not out yet. Something to look forward to.", test: (c) => c.m.st === "NOT_YET_RELEASED" },
    { key: "before", title: "Where it started", blurb: "Prequels and main stories you skipped.", test: (c) => (c.rel === "PREQUEL" || c.rel === "PARENT") && c.m.st !== "NOT_YET_RELEASED" },
    { key: "side", title: "Side quests", blurb: "Side stories, spin-offs and alternate takes.", test: (c) => ["SIDE_STORY", "SPIN_OFF", "ALTERNATIVE"].includes(c.rel) && c.m.st !== "NOT_YET_RELEASED" },
  ];

  const candidates = (() => {
    const best = new Map();
    for (const a of window.ANIME.items) {
      if (!["Completed", "Watching", "On-Hold"].includes(a.st) || (a.s && a.s < 7)) continue;
      for (const [rel, mi] of E.rel[a.id] || []) {
        const m = E.media[mi];
        if (!REL[rel] || rel === "SUMMARY" || m.fmt === "MUSIC" || (m.mal && onList.has(m.mal))) continue;
        const prev = best.get(m.al);
        if (!prev || (a.s || 7.5) > (prev.from.s || 7.5)) best.set(m.al, { m, rel, from: a });
      }
    }
    return [...best.values()].sort((x, y) => (y.from.s || 7.5) - (x.from.s || 7.5) || y.m.pop - x.m.pop);
  })();

  const hanging = window.ANIME.items
    .filter((a) => a.st === "On-Hold" && a.eps > a.w)
    .sort((x, y) => y.w / y.eps - x.w / x.eps);

  const pair = (c) => `
    <li class="pair">
      <div class="pair-from">${poster(c.from, { size: "sm" })}</div>
      <div class="pair-arrow" aria-hidden="true"></div>
      <div class="pair-to">${extPoster(c.m)}</div>
      <div class="pair-text">
        <p class="pair-rel">${REL[c.rel]}</p>
        <h3>${esc(extTitle(c.m))}</h3>
        <p class="pair-meta">${[FORMATS[c.m.fmt], c.m.eps && `${c.m.eps} ep${c.m.eps > 1 ? "s" : ""}`, c.m.year, c.m.crowd && `crowd ${c.m.crowd}`].filter(Boolean).join(", ")}</p>
        <p class="pair-why">You ${c.from.s ? `gave ${esc(title(c.from))} a ${c.from.s}` : `watched ${esc(title(c.from))}`}.</p>
        ${hideControls(c.m.al)}
      </div>
    </li>`;

  let showHidden = false;

  function render(main) {
    const hiddenIds = hidden.all();
    const visible = candidates.filter((c) => showHidden || !(c.m.al in hiddenIds));
    const hiddenCount = candidates.filter((c) => c.m.al in hiddenIds).length;
    const groups = GROUPS.map((g) => ({ ...g, list: visible.filter(g.test) })).filter((g) => g.list.length);
    const nextCount = groups.find((g) => g.key === "next")?.list.length || 0;
    main.innerHTML = `
      <section class="unfin">
        <h1 class="page-title">Unfinished business</h1>
        <p class="lede">${nextCount ? `${nextCount} sequels` : "Sequels"} to shows you liked (rated 7 or more, or unrated) that aren't anywhere on your list, not even plan-to-watch.</p>
        <nav class="unfin-jump" aria-label="Sections">
          ${groups.map((g) => `<a href="#u-${g.key}">${esc(g.title)} <small>${g.list.length}</small></a>`).join("")}
          ${hanging.length ? `<a href="#u-hanging">Left hanging <small>${hanging.length}</small></a>` : ""}
        </nav>
        ${hiddenCount ? `<label class="check hidden-toggle"><input type="checkbox" data-show-hidden ${showHidden ? "checked" : ""}> Show ${hiddenCount} hidden</label>` : ""}
        ${groups.map((g) => `
          <section class="unfin-group" id="u-${g.key}">
            <h2>${esc(g.title)}</h2>
            <p class="panel-note">${esc(g.blurb)}</p>
            <ol class="pairs">${g.list.slice(0, g.key === "side" ? 24 : 60).map(pair).join("")}</ol>
          </section>`).join("")}
        ${hanging.length ? `
          <section class="unfin-group" id="u-hanging">
            <h2>Left hanging</h2>
            <p class="panel-note">On hold, with episodes still to go.</p>
            <ul class="hanging">${hanging.map((a) => `
              <li>
                ${poster(a, { size: "sm" })}
                <div>
                  <h3>${esc(title(a))}</h3>
                  <div class="progress" role="img" aria-label="${a.w} of ${a.eps} episodes"><span style="--p:${(a.w / a.eps) * 100}%"></span></div>
                  <p class="pair-meta">${a.w} of ${a.eps} episodes, ${num(a.eps - a.w)} to go</p>
                </div>
              </li>`).join("")}</ul>
          </section>` : ""}
      </section>`;
    bindHide(main.querySelector(".unfin"), () => render(main));
    main.querySelector("[data-show-hidden]")?.addEventListener("change", (e) => { showHidden = e.target.checked; render(main); });
    main.querySelectorAll(".unfin-jump a").forEach((a) => a.addEventListener("click", (e) => {
      e.preventDefault();
      main.querySelector(a.getAttribute("href"))?.scrollIntoView({ behavior: "smooth" });
    }));
  }

  return { render };
})();
