// Router, progress control, search and lightbox.
(function () {
  const S = window.STH, V = window.VIEWS, W = window.WORLD, SH = window.SHOW, WIKI = window.WIKI || { entries: {}, alias: {} };
  const main = document.getElementById("main");

  // ---------- Chrome for this show ----------
  const nav = SH.nav.map(([route, zh, label]) => `<li><a href="#/${route}" data-nav="${route}"><span class="rail-zh" aria-hidden="true">${zh}</span><span>${S.esc(label)}</span></a></li>`).join("");
  document.getElementById("rail-nav").innerHTML = nav;
  document.querySelector(".rail-mark").textContent = SH.mark;
  document.querySelector("#search-input").placeholder = SH.searchHint || "Search";
  document.getElementById("ep-input").max = S.MAX_EP;
  document.documentElement.style.setProperty("--ticks", (window.CAST_LEVELS || []).length || 16);
  document.querySelectorAll(".rail, .topbar").forEach(el => el.hidden = false);
  let cleanup = null;

  const ROUTES = { "": V.home, realms: V.realms, world: V.world, powers: V.powers, journey: V.journey, episodes: V.episodes,
    people: V.people, emperors: V.emperors, zones: V.zones, terms: V.terms, lore: V.lore };

  function render(keepScroll) {
    const raw = location.hash.replace(/^#\/?/, "");
    const [path, qs] = raw.split("?");
    const [section, ...rest] = path.split("/");
    const query = new URLSearchParams(qs || "");
    const y = window.scrollY;
    if (typeof cleanup === "function") cleanup();
    const view = section === "w" ? V.article(decodeURIComponent(rest.join("/")))
      : section === "c" ? V.character(query, decodeURIComponent(rest[0] || ""))
      : (ROUTES[section] || V.home)(query, rest[0]);
    main.innerHTML = view.html;
    document.title = (view.title && view.title !== "Home" ? `${view.title} · ` : "") + `${SH.zh} ${SH.title} companion`;
    document.querySelectorAll("[data-nav]").forEach(a => {
      if (a.dataset.nav === section || (section === "w" && a.dataset.nav === "lore") || (section === "c" && a.dataset.nav === "people")) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    cleanup = view.mount?.(main);
    if (keepScroll) window.scrollTo(0, y);
    else if (!(section === "episodes" || query.get("f"))) { window.scrollTo(0, 0); main.focus({ preventScroll: true }); }
  }
  window.addEventListener("hashchange", () => render(false));

  // ---------- Progress control ----------
  const input = document.getElementById("ep-input"), all = document.getElementById("ep-all");
  const sync = () => { input.value = S.state.ep; all.checked = S.state.all; };
  sync();
  input.addEventListener("change", () => S.setProgress(+input.value));
  all.addEventListener("change", () => S.setProgress(null, all.checked));
  document.querySelectorAll(".ep-step").forEach(b => b.addEventListener("click", () => S.setProgress(S.state.ep + +b.dataset.step)));
  S.onProgress(() => { sync(); render(true); });

  // ---------- Search ----------
  const dialog = document.querySelector("dialog.search"), q = document.getElementById("search-input"), list = document.getElementById("search-results");
  const kindWord = { character: "Person", faction: "Faction", place: "Place", item: "Treasure", lore: "Lore", episode: "Episode" };
  const index = [];
  const castWiki = new Set();
  for (const c of window.CAST || []) {
    const now = c.looks.filter(l => l.ep <= S.state.ep).pop() || c.looks[0];
    if (c.wiki) castWiki.add(c.wiki);
    index.push({ title: c.name, kind: "Person", href: `#/c/${c.id}`, img: now.img, zh: c.zh || "", sub: c.intro,
      hay: [c.name, c.zh, ...(c.aka || [])].join(" ").toLowerCase(), ep: c.ep, rank: -0.5 });
  }
  for (const e of Object.values(WIKI.entries)) {
    if (castWiki.has(e.title)) continue;
    const f = e.facts || {};
    index.push({ title: e.title, kind: kindWord[e.kind], href: S.href(e.title), img: e.img, zh: f.zh || "",
      hay: [e.title, f.zh, f.pinyin, ...(f.aliases || []).map(S.plain)].join(" ").toLowerCase(), ep: e.kind === "character" ? S.entryEp(e) : 0 });
  }
  for (const [t, zh, sub, other] of W.terms) index.push({ title: t, kind: "Term", href: "#/terms", zh, sub: sub ? `Subs: ${sub}` : other, hay: [t, zh, sub, other].join(" ").toLowerCase(), ep: 0 });
  for (const r of W.realms) index.push({ title: r.name, kind: "Realm", href: `#/realms`, zh: r.zh, sub: r.where, hay: [r.name, r.zh, r.subs].join(" ").toLowerCase(), ep: 0 });
  for (const f of W.factions) index.push({ title: f.name, kind: "Faction", href: `#/powers?f=${encodeURIComponent(f.name)}`, zh: f.zh, sub: f.top, hay: [f.name, f.zh, f.subs].filter(Boolean).join(" ").toLowerCase(), ep: f.ep });
  for (const e of window.EPISODES || []) index.push({ title: `EP ${e.ep}: ${e.title}`, kind: "Episode", href: `#/episodes/${e.ep}`, sub: e.summary, hay: `ep ${e.ep} ${e.title} ${(e.introduced || []).join(" ")}`.toLowerCase(), ep: e.ep });

  let sel = 0, hits = [];
  function search() {
    const s = q.value.trim().toLowerCase();
    if (!s) { list.innerHTML = `<li class="search-empty">Search characters, factions, realms, terms and episodes. Chinese works too.</li>`; hits = []; return; }
    const words = s.split(/\s+/);
    hits = index.filter(x => words.every(w => x.hay.includes(w)))
      .map(x => ({ x, score: (x.title.toLowerCase().startsWith(s) ? 0 : 1) + (S.sealed(x.ep) ? 2 : 0) + x.title.length / 200 + (x.rank || 0) }))
      .sort((a, b) => a.score - b.score).slice(0, 40).map(h => h.x);
    sel = 0;
    list.innerHTML = hits.length ? hits.map((h, i) => {
      const shut = S.sealed(h.ep);
      return `<li><a href="${h.href}" aria-selected="${i === 0}">${h.img && !shut ? `<img src="${S.esc(h.img)}" alt="">` : `<span class="blank" aria-hidden="true">${S.esc((h.zh || h.title)[0])}</span>`}
        <span><span class="t">${S.esc(h.title)}</span> ${h.zh ? `<span class="zh muted" lang="zh">${S.esc(h.zh)}</span>` : ""}${h.sub && !shut ? `<span class="s">${S.esc(S.plain(h.sub)).slice(0, 110)}</span>` : shut ? `<span class="s">Sealed until ${h.ep >= S.NOVEL || h.ep == null ? "later" : `EP ${h.ep}`}</span>` : ""}</span>
        <span class="kind">${h.kind}</span></a></li>`;
    }).join("") : `<li class="search-empty">Nothing called “${S.esc(q.value)}”. Try a shorter word or the Chinese name.</li>`;
  }
  const openSearch = () => { dialog.showModal(); q.select(); search(); };
  document.querySelector(".search-open").addEventListener("click", openSearch);
  q.addEventListener("input", search);
  q.addEventListener("keydown", e => {
    const links = list.querySelectorAll("a");
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      sel = Math.max(0, Math.min(links.length - 1, sel + (e.key === "ArrowDown" ? 1 : -1)));
      links.forEach((a, i) => a.setAttribute("aria-selected", String(i === sel)));
      links[sel]?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter" && links[sel]) {
      e.preventDefault(); location.hash = links[sel].getAttribute("href"); dialog.close();
    }
  });
  list.addEventListener("click", e => { if (e.target.closest("a")) dialog.close(); });
  dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });
  document.addEventListener("keydown", e => {
    if ((e.key === "/" || (e.key === "k" && (e.metaKey || e.ctrlKey))) && !e.target.closest("input, textarea")) { e.preventDefault(); openSearch(); }
  });

  // ---------- Lightbox for wiki pictures ----------
  const box = document.createElement("dialog");
  box.className = "lightbox";
  document.body.append(box);
  main.addEventListener("click", e => {
    const im = e.target.closest("img[data-zoom]");
    if (!im) return;
    box.innerHTML = `<img src="${im.src}" alt="${S.esc(im.alt)}"><p>${S.esc(im.alt)} · click anywhere to close</p>`;
    box.showModal();
  });
  box.addEventListener("click", () => box.close());

  render(false);
})();
