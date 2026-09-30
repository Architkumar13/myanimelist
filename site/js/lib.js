/* Shared helpers: escaping, formatting, posters, the detail dialog and tooltips. */
const Lib = (() => {
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const num = (n) => Math.round(n).toLocaleString("en-US");

  const title = (a) => a.en || a.t;
  const altTitle = (a) => (a.en && a.en !== a.t ? a.t : "");

  const malUrl = (a) => `https://myanimelist.net/anime/${a.id}`;

  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  /* A poster button: coloured placeholder until the lazy image lands. */
  const poster = (a, { size = "", badge = true } = {}) => `
    <button class="poster ${size}" data-id="${a.id}" style="--tint:${a.col || "#9aa3a0"}"
      aria-label="${esc(title(a))}${a.s ? `, you rated ${a.s}` : ""}">
      ${a.img ? `<img src="${esc(a.img)}" alt="" loading="lazy" decoding="async">` : `<span class="poster-fallback">${esc(title(a))}</span>`}
      ${badge && a.s ? `<span class="poster-score" aria-hidden="true">${a.s}</span>` : ""}
    </button>`;

  const byId = new Map(window.ANIME.items.map((a) => [a.id, a]));

  const statusLabel = {
    Completed: "Completed", Watching: "Watching", "On-Hold": "On hold",
    Dropped: "Dropped", "Plan to Watch": "Plan to watch",
  };

  /* Posters for titles that aren't on the list (linked titles, recommendations): link out. */
  const extTitle = (m) => m.en || m.t;
  const extUrl = (m) => (m.mal ? `https://myanimelist.net/anime/${m.mal}` : `https://anilist.co/anime/${m.al}`);
  const extPoster = (m, { size = "" } = {}) => `
    <a class="poster ${size}" href="${extUrl(m)}" target="_blank" rel="noopener" style="--tint:${m.col || "#9aa3a0"}"
      aria-label="${esc(extTitle(m))} (opens MyAnimeList)">
      ${m.img ? `<img src="${esc(m.img)}" alt="" loading="lazy" decoding="async">` : `<span class="poster-fallback">${esc(extTitle(m))}</span>`}
    </a>`;
  /* Detail dialog, opened from any poster anywhere on the site. */
  const dialog = document.getElementById("detail");
  const MAIN_LINE = new Set(["SEQUEL", "PREQUEL", "PARENT", "SIDE_STORY"]);

  /* List titles that share a main-line link to the same off-list entry. AniList often
     connects season 3 to season 5 only through season 4, so a missing middle entry has
     to be crossed or the rest of the franchise never appears. */
  let viaMedia;
  function listTitlesVia(mi) {
    const E = window.EXTRA;
    if (!viaMedia) {
      viaMedia = new Map();
      for (const item of window.ANIME.items) {
        for (const [rel, idx] of E.rel[item.id] || []) {
          if (!MAIN_LINE.has(rel)) continue;
          const linked = E.media[idx];
          if (!linked || linked.fmt === "MUSIC") continue;
          const bucket = viaMedia.get(idx);
          if (bucket) bucket.push(item);
          else viaMedia.set(idx, [item]);
        }
      }
    }
    return viaMedia.get(mi) || [];
  }

  /* Walk sequel/prequel links outward from a title. Titles on your list keep the walk going;
     ones that aren't become the outlined gaps, including a gap in the middle of the chain. */
  function franchise(a) {
    const E = window.EXTRA;
    if (!E) return [];
    const nodes = [{ list: a, year: a.year }], seenMal = new Set([a.id]), seenAl = new Set(), queue = [a];
    const addList = (item, year) => {
      if (seenMal.has(item.id) || nodes.length >= 24) return;
      seenMal.add(item.id);
      nodes.push({ list: item, year: item.year || year });
      queue.push(item);
    };
    while (queue.length && nodes.length < 24) {
      const x = queue.shift();
      for (const [rel, mi] of E.rel[x.id] || []) {
        if (nodes.length >= 24) break;
        const m = E.media[mi];
        if (!m || !MAIN_LINE.has(rel) || m.fmt === "MUSIC") continue;
        const onList = m.mal && byId.get(m.mal);
        if (onList) addList(onList, m.year);
        else if (!seenAl.has(m.al)) {
          seenAl.add(m.al);
          nodes.push({ ext: m, year: m.year });
          for (const other of listTitlesVia(mi)) addList(other, m.year);
        }
      }
    }
    return nodes.sort((x, y) => (x.year || 9999) - (y.year || 9999));
  }

  let rankedCache;
  const rankOf = (a) => {
    rankedCache ||= window.ANIME.items.filter((x) => x.s).sort((x, y) => y.s - x.s || y.crowd - x.crowd);
    return { rank: rankedCache.indexOf(a) + 1, of: rankedCache.length };
  };

  /* Plan-to-watch titles that look like this one: AniList recommendations first, then shared genres. */
  function alsoOnPlan(a) {
    const E = window.EXTRA;
    const plan = window.ANIME.items.filter((x) => x.st === "Plan to Watch" && x.id !== a.id);
    const planIds = new Set(plan.map((x) => x.id));
    const fromRecs = (E?.recs[a.id] || []).map(([mi]) => E.media[mi].mal).filter((m) => planIds.has(m)).map((m) => byId.get(m));
    const byGenre = plan
      .map((x) => [x, x.g.filter((g) => a.g.includes(g)).length])
      .filter(([, n]) => n >= 2).sort((p, q) => q[1] - p[1] || q[0].crowd - p[0].crowd).map(([x]) => x);
    return [...new Set([...fromRecs, ...byGenre])].slice(0, 4);
  }

  function openDetail(a) {
    const facts = [
      a.type && `${a.type}${a.eps ? `, ${a.eps} ep${a.eps > 1 ? "s" : ""}` : ""}`,
      a.year && `${a.season ? a.season + " " : ""}${a.year}`,
      a.studio.length && a.studio.join(", "),
      a.src && `From ${a.src.toLowerCase()}`,
    ].filter(Boolean);
    const chain = franchise(a);
    const { rank, of } = rankOf(a);
    const similar = alsoOnPlan(a);
    dialog.innerHTML = `
      <div class="detail-inner" style="--tint:${a.col || "#9aa3a0"}">
        <div class="detail-cover">${a.big || a.img ? `<img src="${esc(a.big || a.img)}" alt="">` : ""}</div>
        <div class="detail-body">
          <h2 id="detail-title" tabindex="-1">${esc(title(a))}</h2>
          ${altTitle(a) ? `<p class="detail-alt">${esc(altTitle(a))}</p>` : ""}
          <dl class="detail-scores">
            <div><dt>You</dt><dd>${a.s || "–"}</dd></div>
            <div><dt>Crowd</dt><dd>${a.crowd || "–"}</dd></div>
            ${a.s ? `<div data-tip="Ranked by your score, ties broken by crowd score" tabindex="0"><dt>Your rank</dt><dd>#${rank}<small> of ${of}</small></dd></div>` : ""}
            <div><dt>Status</dt><dd class="detail-status">${esc(statusLabel[a.st] || a.st)}</dd></div>
          </dl>
          ${a.st !== "Completed" && a.eps > 1 && a.w ? `<div class="progress" role="img" aria-label="${a.w} of ${a.eps} episodes"><span style="--p:${(a.w / a.eps) * 100}%"></span></div><p class="pair-meta">${a.w} of ${a.eps} episodes watched</p>` : ""}
          <p class="detail-facts">${facts.map(esc).join("<br>")}</p>
          ${a.g.length ? `<p class="chips">${a.g.map((g) => `<span>${esc(g)}</span>`).join("")}</p>` : ""}
          ${a.syn ? `<p class="detail-syn">${esc(a.syn)}</p>` : ""}
          ${chain.length > 1 ? `
            <section class="detail-section">
              <h3>The whole franchise <small>${chain.filter((n) => n.list && n.list.st !== "Plan to Watch").length} of ${chain.length} watched</small></h3>
              <ol class="chain">${chain.map((n) => n.list
                ? `<li class="${n.list === a ? "is-current" : ""} ${n.list.st === "Plan to Watch" ? "is-plan" : ""}" data-tip="<b>${esc(title(n.list))}</b><br>${n.year || ""} ${esc(statusLabel[n.list.st])}${n.list.s ? `, you gave it ${n.list.s}` : ""}">${poster(n.list, { size: "sm" })}</li>`
                : `<li class="is-missing" data-tip="<b>${esc(extTitle(n.ext))}</b><br>${n.ext.year || ""} Not on your list">${extPoster(n.ext, { size: "sm" })}</li>`).join("")}</ol>
            </section>` : ""}
          ${similar.length ? `
            <section class="detail-section">
              <h3>Liked this? These are already on your plan-to-watch list</h3>
              <ol class="chain">${similar.map((x) => `<li data-tip="<b>${esc(title(x))}</b><br>${x.year || ""}${x.crowd ? `, crowd ${x.crowd}` : ""}">${poster(x, { size: "sm", badge: false })}</li>`).join("")}</ol>
            </section>` : ""}
          <p class="detail-actions">
            <a href="${malUrl(a)}" target="_blank" rel="noopener">Open on MyAnimeList</a>
            <button type="button" class="btn-quiet" data-close>Close</button>
          </p>
        </div>
      </div>`;
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    dialog.querySelector("#detail-title").focus(); // start at the title, not the first interactive stat
  }
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog || e.target.closest("[data-close]")) dialog.close();
  });
  document.addEventListener("click", (e) => {
    const p = e.target.closest(".poster[data-id], [data-detail]");
    if (p && !p.closest("[data-no-detail]")) openDetail(byId.get(+(p.dataset.detail || p.dataset.id)));
  });

  /* Tooltips for chart marks: any element with data-tip. */
  const tip = document.getElementById("tip");
  const showTip = (target, x, y) => {
    tip.innerHTML = target.dataset.tip;
    tip.hidden = false;
    const r = tip.getBoundingClientRect();
    tip.style.left = Math.min(window.innerWidth - r.width - 8, Math.max(8, x - r.width / 2)) + "px";
    tip.style.top = Math.max(8, y - r.height - 14) + "px";
  };
  document.addEventListener("pointermove", (e) => {
    const t = e.target.closest("[data-tip]");
    if (t) showTip(t, e.clientX, e.clientY);
    else tip.hidden = true;
  });
  document.addEventListener("focusin", (e) => {
    const t = e.target.closest("[data-tip]");
    if (!t) return;
    const r = t.getBoundingClientRect();
    showTip(t, r.left + r.width / 2, r.top);
  });
  document.addEventListener("focusout", () => (tip.hidden = true));

  const FORMATS = { TV: "TV", TV_SHORT: "TV short", MOVIE: "Movie", SPECIAL: "Special", OVA: "OVA", ONA: "ONA", MUSIC: "Music" };

  /* Intervals and timeouts that belong to the current page; the router clears them on navigation. */
  let timers = [];
  const every = (fn, ms) => timers.push(setInterval(fn, ms));
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));
  const stopTimers = () => { timers.forEach((t) => (clearInterval(t), clearTimeout(t))); timers = []; };

  /* Images drawn to a canvas need CORS; AniList's CDN allows it. The extra query string gives
     canvas loads their own cache entry, since a copy cached by a plain <img> lacks the CORS header. */
  const loadImage = (src) => new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src + (src.includes("?") ? "&" : "?") + "canvas";
  });

  const hsl = (hex) => {
    if (!/^#[0-9a-f]{6}$/i.test(hex || "")) return { h: 0, s: 0, l: 0.6 };
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
    const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, d = max - min;
    if (!d) return { h: 0, s: 0, l };
    const s = d / (1 - Math.abs(2 * l - 1));
    const h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return { h: (h * 60 + 360) % 360, s, l };
  };

  /* Keep a page's filters in the address bar (without re-rendering) so links reopen the same view. */
  const setQuery = (params) => {
    const path = location.hash.split("?")[0] || "#/";
    const qs = new URLSearchParams(Object.entries(params).filter(([, v]) => v !== "" && v != null)).toString();
    history.replaceState(null, "", path + (qs ? "?" + qs : ""));
  };

  /* "Not interested" / "Already seen" choices for titles off your list, keyed by AniList id. */
  const HIDDEN_KEY = "archit13-hidden";
  const hidden = {
    all: () => JSON.parse(localStorage.getItem(HIDDEN_KEY) || "{}"),
    has: (al) => al in hidden.all(),
    set(al, reason) {
      const h = hidden.all();
      reason ? (h[al] = reason) : delete h[al];
      localStorage.setItem(HIDDEN_KEY, JSON.stringify(h));
    },
  };

  /* Buttons for hiding an off-list title, or restoring it when hidden titles are being shown. */
  const hideControls = (al) => {
    const reason = hidden.all()[al];
    return reason
      ? `<p class="hide-controls"><span class="hidden-note">${reason === "seen" ? "Marked as seen" : "Not interested"}</span>
         <button type="button" class="btn-quiet" data-unhide="${al}">Undo</button></p>`
      : `<p class="hide-controls">
         <button type="button" class="chip-btn" data-hide="${al}" data-reason="no">Not interested</button>
         <button type="button" class="chip-btn" data-hide="${al}" data-reason="seen">Already seen</button></p>`;
  };
  /* Wire hide/unhide clicks inside `root`, then call `rerender`. */
  const bindHide = (root, rerender) => root.addEventListener("click", (e) => {
    const h = e.target.closest("[data-hide]"), u = e.target.closest("[data-unhide]");
    if (h) { hidden.set(h.dataset.hide, h.dataset.reason); rerender(); }
    if (u) { hidden.set(u.dataset.unhide, null); rerender(); }
  });

  /* Deterministic randomness (mulberry32), e.g. so the daily challenge is the same all day. */
  const seeded = (seedText) => {
    let a = [...seedText].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 2654435761), 1779033703) >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };
  const shuffleWith = (arr, rand) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const download = (filename, href) => Object.assign(document.createElement("a"), { download: filename, href }).click();

  return {
    esc, num, title, altTitle, malUrl, shuffle, poster, byId, openDetail, statusLabel,
    extTitle, extUrl, extPoster, FORMATS, every, later, stopTimers, loadImage, hsl,
    setQuery, hidden, hideControls, bindHide, seeded, shuffleWith, download,
  };
})();
