/* Tier list: drag (or tap) posters into S–F rows. Starts from your scores; saved per pool. */
const Tiers = (() => {
  const { esc, title, loadImage } = Lib;
  const TIERS = [
    { key: "S", col: "#e4007f", ink: "#fff" }, { key: "A", col: "#ff7a1a", ink: "#000" },
    { key: "B", col: "#ffe100", ink: "#000" }, { key: "C", col: "#35c46a", ink: "#000" },
    { key: "D", col: "#00a0e9", ink: "#000" }, { key: "F", col: "#8a8f89", ink: "#000" },
  ];
  const fromScore = (s) => (s === 10 ? "S" : s === 9 ? "A" : s === 8 ? "B" : s === 7 ? "C" : s >= 5 ? "D" : s ? "F" : "tray");
  const seen = Stats.seen.filter((a) => a.img);
  const topBy = (list, n = 30) => list.slice().sort((x, y) => y.s - x.s || y.crowd - x.crowd).slice(0, n);

  /* Pools worth ranking: things you'd actually argue about. */
  const POOLS = (() => {
    const pools = [{ id: "tens", label: `Your perfect 10s`, items: Stats.tens.filter((a) => a.img) }];
    Stats.franchises.filter((f) => f.items.filter((a) => a.img).length >= 5).slice(0, 8)
      .forEach((f) => pools.push({ id: `fr-${f.name}`, label: `Every ${f.label} entry`, items: f.items.filter((a) => a.img) }));
    Stats.finishYears.filter((y) => y.n >= 10).slice().reverse()
      .forEach((y) => pools.push({ id: `yr-${y.name}`, label: `Finished in ${y.name}`, items: y.items.filter((a) => a.img) }));
    pools.push({ id: "movies", label: "Top 30 movies", items: topBy(seen.filter((a) => a.type === "Movie")) });
    Stats.genres.slice(0, 8).forEach((g) => pools.push({ id: `g-${g.name}`, label: `Top 30 ${g.name.toLowerCase()}`, items: topBy(g.items.filter((a) => a.img)) }));
    return pools;
  })();

  // Open on the first pool with a spread of scores, so the board starts filled in.
  let poolId = (POOLS.find((p) => new Set(p.items.map((a) => a.s)).size > 2) || POOLS[0]).id, placement = {}, selected = null;
  const storeKey = () => `archit13-tiers-${poolId}`;
  const pool = () => POOLS.find((p) => p.id === poolId);

  function initialPlacement() {
    const saved = JSON.parse(localStorage.getItem(storeKey()) || "null");
    if (saved) return saved;
    const items = pool().items;
    const uniform = new Set(items.map((a) => a.s)).size === 1; // all 10s? then it's a tie-breaker
    return Object.fromEntries(items.map((a) => [a.id, uniform ? "tray" : fromScore(a.s)]));
  }

  function render(main) {
    placement = initialPlacement();
    selected = null;
    const p = pool();
    main.innerHTML = `
      <section class="tiers">
        <h1 class="page-title">Tier list</h1>
        <p class="lede">Drag posters between rows, or tap one and then tap a row. It starts from your scores${new Set(p.items.map((a) => a.s)).size === 1 ? ", but these are all tied, so they start in the tray. Break the tie." : "."} Changes save in this browser.</p>
        <div class="tier-controls">
          <label class="field"><span>What to rank</span>
            <select data-pool>${POOLS.map((x) => `<option value="${esc(x.id)}" ${x.id === poolId ? "selected" : ""}>${esc(x.label)} (${x.items.length})</option>`).join("")}</select>
          </label>
          <button class="btn btn-alt" data-reset>Reset to my scores</button>
          <button class="btn" data-export>Save as image</button>
        </div>
        <p class="tier-hint" aria-live="polite"></p>
        <div class="tier-board" data-no-detail>
          ${TIERS.map((t) => `
            <div class="tier-row" data-tier="${t.key}">
              <button class="tier-label" style="--c:${t.col};--ink:${t.ink}" data-drop="${t.key}" aria-label="Move selected poster to tier ${t.key}">${t.key}</button>
              <div class="tier-items" data-drop="${t.key}"></div>
            </div>`).join("")}
        </div>
        <h2 class="tray-title">Unranked</h2>
        <div class="tier-items tray" data-drop="tray" data-no-detail></div>
      </section>`;

    fill(main);
    main.querySelector("[data-pool]").addEventListener("change", (e) => { poolId = e.target.value; render(main); });
    main.querySelector("[data-reset]").addEventListener("click", () => { localStorage.removeItem(storeKey()); render(main); });
    main.querySelector("[data-export]").addEventListener("click", (e) => exportImage(e.currentTarget));

    // Listen on the page's own section (replaced on every render) rather than the shared <main>,
    // so re-rendering doesn't stack duplicate listeners.
    const page = main.querySelector(".tiers");

    // Tap / keyboard: select a poster, then choose a destination.
    page.addEventListener("click", (e) => {
      const card = e.target.closest(".tier-card");
      const drop = e.target.closest("[data-drop]");
      if (card) {
        selected = selected === +card.dataset.id ? null : +card.dataset.id;
        main.querySelectorAll(".tier-card").forEach((c) => c.classList.toggle("is-selected", +c.dataset.id === selected));
        hint(main);
        return;
      }
      if (drop && selected) move(main, selected, drop.dataset.drop);
    });

    // Mouse drag and drop.
    page.addEventListener("dragstart", (e) => {
      const card = e.target.closest(".tier-card");
      if (!card) return;
      e.dataTransfer.setData("text/plain", card.dataset.id);
      e.dataTransfer.effectAllowed = "move";
      card.classList.add("is-dragging");
    });
    page.addEventListener("dragend", (e) => e.target.closest?.(".tier-card")?.classList.remove("is-dragging"));
    page.addEventListener("dragover", (e) => {
      const drop = e.target.closest("[data-drop]");
      if (!drop) return;
      e.preventDefault();
      main.querySelectorAll(".is-over").forEach((d) => d !== drop && d.classList.remove("is-over"));
      drop.classList.add("is-over");
    });
    page.addEventListener("drop", (e) => {
      const drop = e.target.closest("[data-drop]");
      if (!drop) return;
      e.preventDefault();
      move(main, +e.dataTransfer.getData("text/plain"), drop.dataset.drop);
    });
  }

  const card = (a) => `
    <button class="tier-card" draggable="true" data-id="${a.id}" style="--tint:${a.col || "#999"}"
      data-tip="<b>${esc(title(a))}</b><br>You gave it ${a.s || "no score"}" aria-label="${esc(title(a))}">
      <img src="${esc(a.img)}" alt="" draggable="false" loading="lazy">
    </button>`;

  function fill(main) {
    const items = pool().items;
    main.querySelectorAll(".tier-items").forEach((zone) => {
      const key = zone.dataset.drop;
      const inZone = items.filter((a) => (placement[a.id] || "tray") === key);
      zone.innerHTML = inZone.map(card).join("") || (key === "tray" ? `<p class="tray-empty">Everything's ranked.</p>` : "");
    });
    hint(main);
  }

  function move(main, id, key) {
    placement[id] = key;
    localStorage.setItem(storeKey(), JSON.stringify(placement));
    selected = null;
    main.querySelectorAll(".is-over").forEach((d) => d.classList.remove("is-over"));
    fill(main);
  }

  function hint(main) {
    const a = selected && Lib.byId.get(selected);
    main.querySelector(".tier-hint").textContent = a ? `${title(a)} selected. Choose a row letter or the unranked tray.` : "";
  }

  /* Draw the board onto a canvas and download it. */
  async function exportImage(btn) {
    btn.disabled = true;
    btn.textContent = "Drawing…";
    const items = pool().items;
    const W = 1200, LABEL = 110, CW = 76, CH = 114, GAP = 8, PAD = 24;
    const perRow = Math.floor((W - LABEL - PAD * 2) / (CW + GAP));
    const rows = TIERS.map((t) => ({ ...t, items: items.filter((a) => placement[a.id] === t.key) }));
    const heights = rows.map((r) => Math.max(1, Math.ceil(r.items.length / perRow)) * (CH + GAP) + GAP);
    const H = 110 + heights.reduce((s, h) => s + h, 0) + 50;
    const c = Object.assign(document.createElement("canvas"), { width: W, height: H });
    const g = c.getContext("2d");
    await document.fonts.ready;
    g.fillStyle = "#e9ece4"; g.fillRect(0, 0, W, H);
    g.fillStyle = "#000"; g.font = "44px 'Dela Gothic One'"; g.fillText(pool().label, PAD, 70);
    g.font = "700 18px 'Zen Kaku Gothic New'"; g.fillText(`${window.ANIME.user}'s tier list`, PAD, 98);
    const imgs = await Promise.all(items.map((a) => loadImage(a.img).catch(() => null)));
    const imgOf = new Map(items.map((a, i) => [a.id, imgs[i]]));
    let y = 115;
    rows.forEach((r, i) => {
      g.fillStyle = "#000"; g.fillRect(PAD, y, W - PAD * 2, heights[i]);
      g.fillStyle = r.col; g.fillRect(PAD + 3, y + 3, LABEL - 6, heights[i] - 6);
      g.fillStyle = "#fbfcf8"; g.fillRect(PAD + LABEL, y + 3, W - PAD * 2 - LABEL - 3, heights[i] - 6);
      g.fillStyle = r.ink; g.font = "56px 'Dela Gothic One'"; g.textAlign = "center";
      g.fillText(r.key, PAD + LABEL / 2, y + heights[i] / 2 + 20); g.textAlign = "left";
      r.items.forEach((a, j) => {
        const x = PAD + LABEL + GAP + (j % perRow) * (CW + GAP);
        const yy = y + GAP + Math.floor(j / perRow) * (CH + GAP);
        const img = imgOf.get(a.id);
        g.fillStyle = a.col || "#999"; g.fillRect(x, yy, CW, CH);
        if (img) {
          const scale = Math.max(CW / img.width, CH / img.height);
          const sw = CW / scale, sh = CH / scale;
          g.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, x, yy, CW, CH);
        }
      });
      y += heights[i];
    });
    g.fillStyle = "#4d524c"; g.font = "500 15px 'Zen Kaku Gothic New'";
    g.fillText("Made on archit13 weekly", PAD, H - 18);
    const link = Object.assign(document.createElement("a"), { download: `tier-list-${poolId}.png`, href: c.toDataURL("image/png") });
    link.click();
    btn.disabled = false;
    btn.textContent = "Save as image";
  }

  return { render };
})();
