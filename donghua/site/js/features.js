// Catch-up features that sit across the other pages:
//  - recap: "Previously on…", a recap of any stretch of episodes (#/recap?from=A&to=B)
//  - epCast / epWords: who's in an episode and which terms it introduces (used by the episode guide)
//  - kit: what the hero is carrying at episode N (#/journey?view=kit), when world.js has `inventory`
// Everything degrades to nothing when a show lacks the data.
(function () {
  const S = window.HUB, V = window.VIEWS, W = window.WORLD, SH = window.SHOW;
  const CAST = window.CAST || [], LEVELS = window.CAST_LEVELS || [];
  const { esc, epLabel, NOVEL } = S;
  const K = V.castKit;
  const EPISODES = (window.EPISODES || []).slice().sort((a, b) => a.ep - b.ep);
  const epEnd = e => e.epEnd || e.ep;
  const LATEST = S.MAX_EP;
  const head = (zh, title, lede) => `<header class="page-head"><h1><span class="zh-title" lang="zh">${zh}</span>${title}</h1>${lede ? `<p>${lede}</p>` : ""}</header>`;
  const hero = CAST.find(c => c.id === SH.heroId);

  // ---------- Names → cast ----------
  const norm = s => String(s || "").toLowerCase().replace(/\s*\(.*?\)\s*/g, " ").replace(/[’']/g, "'").trim();
  const byName = new Map();
  for (const c of CAST) for (const n of [c.name, ...(c.aka || [])]) {
    const k = norm(n);
    if (k.length >= 3 && !byName.has(k)) byName.set(k, c);
  }
  const castNamed = n => byName.get(norm(n)) || null;
  // Mentions in running text: proper names only, so case-sensitive, and on word boundaries.
  const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const mentionRe = new Map(CAST.map(c => {
    const names = [c.name, ...(c.aka || [])].filter(n => n && n.length >= 4 && /^[A-Z]/.test(n));
    return [c.id, names.length ? new RegExp(`(^|[^\\w])(${names.map(reEsc).join("|")})(?![\\w])`) : null];
  }));
  const epText = e => [e.title, e.summary, ...(e.events || []), e.cultivation || ""].join(" \n ");

  function personChip(c, at, opts = {}) {
    const look = K.lookAt(c, at);
    const p = K.powerAt(c, at), lvl = K.knownLevel(c, at);
    const title = `${c.name}: ${K.realmText(p, lvl)}${opts.debut ? `. First on screen in EP ${c.ep}` : ""}`;
    return `<li><a class="chip-person ${c.id === SH.heroId ? "is-hero" : ""} ${opts.debut ? "is-debut" : ""}" href="#/c/${esc(c.id)}" title="${esc(title)}">
      ${look?.img ? `<img src="${esc(look.img)}" alt="" loading="lazy" decoding="async">` : `<span class="blank" aria-hidden="true" lang="zh">${esc((c.zh || c.name)[0])}</span>`}<span>${esc(c.name)}</span>${opts.debut ? `<b class="debut-dot" title="First appearance">初<span class="sr"> first appearance</span></b>` : ""}${opts.realm ? `<small>${esc(K.realmText(p, lvl))}</small>` : ""}</a></li>`;
  }

  // ---------- Who's in this episode ----------
  // Debuts (cast whose first episode falls here) first, then anyone the episode lists under `introduced`.
  function epCastList(e) {
    const a = e.ep, b = epEnd(e);
    const out = new Map();
    for (const c of CAST) if (c.ep >= a && c.ep <= b) out.set(c.id, { c, debut: true });
    for (const n of e.introduced || []) {
      const c = castNamed(n);
      if (c && !out.has(c.id)) out.set(c.id, { c, debut: c.ep >= a && c.ep <= b });
    }
    return [...out.values()];
  }
  function epCast(e) {
    const list = epCastList(e);
    if (!list.length) return "";
    const at = epEnd(e);
    return `<div class="ep-cast"><span class="ep-cast-h">On screen</span><ul class="rung-people">${list.map(x => personChip(x.c, Math.max(at, x.c.ep), { debut: x.debut })).join("")}</ul></div>`;
  }
  // The `introduced` names that aren't cast members (places, things, techniques).
  const epIntroRest = e => (e.introduced || []).filter(n => !castNamed(n));

  // ---------- Terms by first episode ----------
  // world.js terms are [term, zh, subs, other, ep?]; the optional 5th item is the first episode that uses the term.
  const TERMS = (W.terms || []).map(([term, zh, subs, other, ep]) => ({ term, zh, subs, other, ep }));
  const hasTermEps = TERMS.some(t => t.ep != null);
  const termHref = t => `#/terms?t=${encodeURIComponent(t.term)}`;
  function epWords(e) {
    if (!hasTermEps) return "";
    const a = e.ep, b = epEnd(e);
    const ts = TERMS.filter(t => t.ep != null && t.ep >= a && t.ep <= b && t.ep < NOVEL);
    if (!ts.length) return "";
    return `<p class="ep-words"><span class="ep-cast-h">New words</span>${ts.map(t =>
      `<a href="${termHref(t)}">${esc(t.term)}</a>${t.subs && t.subs.toLowerCase() !== t.term.toLowerCase() ? ` <span class="term-sub" title="Name in the English subtitles">subs: ${esc(t.subs)}</span>` : ""}`).join('<span class="sep" aria-hidden="true">/</span>')}</p>`;
  }

  // ---------------- Previously on… ----------------
  function recap(query) {
    const eps = EPISODES;
    if (!eps.length) {
      return { title: "Previously on", html: `${head("前情", "Previously on…", "The episode guide for this show hasn't been built yet, so there's nothing to recap.")}` };
    }
    const first = eps[0].ep;
    let now = query.has("to") ? Math.round(+query.get("to")) : LATEST;
    if (!Number.isFinite(now)) now = LATEST;
    now = Math.max(first, Math.min(LATEST, now));
    const defFrom = Math.max(first - 1, now - 4);
    let from = query.has("from") ? Math.round(+query.get("from")) : defFrom;
    if (!Number.isFinite(from)) from = defFrom;
    from = Math.max(0, Math.min(now - 1, from));
    const lo = from + 1;

    // Episodes in the stretch.
    const stretch = eps.filter(e => epEnd(e) >= lo && e.ep <= now);
    const epHtml = e => {
      const evs = (e.events || []).slice(0, 4);
      const more = (e.events || []).length - evs.length;
      const body = `<h3><a href="#/episodes/${e.ep}">${esc(e.title)}</a></h3>
        ${evs.length ? `<ul>${evs.map(x => `<li>${esc(x)}</li>`).join("")}</ul>${more > 0 ? `<p class="note">${more} more in the <a href="#/episodes/${e.ep}">episode guide</a>.</p>` : ""}` : `<p>${esc(e.summary)}</p>`}
        ${e.cultivation ? `<p class="cult">${esc(e.cultivation)}</p>` : ""}`;
      const range = e.epEnd ? `${e.ep}–${e.epEnd}` : e.ep;
      return `<li class="recap-ep"><span class="recap-no">${range}</span><div>${body}</div></li>`;
    };

    // People: debuts in the stretch, plus anyone the stretch names. Only people already on screen by `now`.
    const people = new Map();
    const inRange = ep => ep >= lo && ep <= now;
    for (const c of CAST) if (inRange(c.ep)) people.set(c.id, { c, debut: true });
    for (const e of stretch) {
      if (epEnd(e) > now) continue;
      for (const n of e.introduced || []) { const c = castNamed(n); if (c && c.ep <= now && !people.has(c.id)) people.set(c.id, { c, debut: inRange(c.ep) }); }
      const text = epText(e);
      for (const c of CAST) {
        if (people.has(c.id) || c.ep > now) continue;
        const re = mentionRe.get(c.id);
        if (re && re.test(text)) people.set(c.id, { c, debut: false });
      }
    }
    const plist = [...people.values()].sort((a, b) => (b.c.id === SH.heroId) - (a.c.id === SH.heroId) || b.debut - a.debut || a.c.ep - b.c.ep);

    // Realm changes: power entries inside the stretch whose level differs from what came before.
    const changes = [];
    for (const c of CAST) {
      if (c.ep > now) continue;
      let prev = null;
      (c.power || []).forEach(p => {
        if (p.lvl == null || p.realm === "Unknown") return;
        if (inRange(p.ep) && (prev == null || p.lvl !== prev.lvl || p.realm !== prev.realm)) changes.push({ c, from: prev, to: p });
        if (p.ep <= now) prev = p;
      });
    }
    changes.sort((a, b) => (b.c.id === SH.heroId) - (a.c.id === SH.heroId) || a.to.ep - b.to.ep);

    const heroNow = hero && hero.ep <= now ? (() => {
      const look = K.lookAt(hero, now), p = K.powerAt(hero, now), lvl = K.knownLevel(hero, now);
      const before = K.knownLevel(hero, from), pb = K.powerAt(hero, from);
      const moved = lvl != null && before != null && lvl !== before;
      return `<div class="recap-hero">
        <a class="recap-hero-img" href="#/c/${esc(hero.id)}">${K.portrait(look, hero)}</a>
        <div><p class="recap-hero-name">${esc(hero.name)} at EP ${now}</p>
          <p class="recap-hero-realm">${K.meter(lvl)} <b>${esc(K.realmText(p, lvl))}</b></p>
          <p class="muted">${moved ? `Up from ${esc(K.realmText(pb, before))} at EP ${from}.` : lvl != null ? `Same realm as at EP ${from}.` : ""}${p?.detail ? ` ${esc(p.detail[0].toUpperCase() + p.detail.slice(1))}.` : ""}</p></div>
      </div>`;
    })() : "";

    const pct = n => (100 * Math.max(0, n - 1) / Math.max(1, S.MAX_EP - 1)).toFixed(2);
    const html = `${head("前情", "Previously on…",
      `${lo === now ? `Everything in episode ${now}` : `Everything from episode ${lo} to episode ${now}`}.`)}
      <form class="recap-form" id="recap-form">
        <label for="recap-from">Last episode I clearly remember</label>
        <input type="range" id="recap-from-r" min="${Math.max(0, first - 1)}" max="${now - 1}" value="${from}" aria-label="Last episode I clearly remember (slider)">
        <span class="recap-num"><span aria-hidden="true">EP</span><input type="number" id="recap-from" min="${Math.max(0, first - 1)}" max="${now - 1}" value="${from}"></span>
        <label for="recap-to">up to</label>
        <span class="recap-num"><span aria-hidden="true">EP</span><input type="number" id="recap-to" min="${first}" max="${LATEST}" value="${now}"></span>
        <div class="stretch" style="--a:${pct(lo)}%;--b:${pct(now)}%" aria-hidden="true"><span class="stretch-in"></span></div>
        <small>Recapping ${now - from} episode${now - from === 1 ? "" : "s"} of ${LATEST}.</small>
      </form>
      <div class="recap">
        <section class="recap-story" aria-labelledby="rc-story">
          <h2 id="rc-story">What happened</h2>
          ${stretch.length ? `<ol class="recap-eps">${stretch.map(epHtml).join("")}</ol>` : `<p class="muted">The guide has no episodes in this stretch.</p>`}
        </section>
        <aside class="recap-side">
          ${heroNow}
          ${changes.length ? `<section aria-labelledby="rc-realms"><h2 id="rc-realms">Realm changes</h2>
            <ol class="recap-realms">${changes.map(x => `<li>
              <a class="chip-person ${x.c.id === SH.heroId ? "is-hero" : ""}" href="#/c/${esc(x.c.id)}">${(im => im ? `<img src="${esc(im)}" alt="" loading="lazy">` : `<span class="blank" aria-hidden="true" lang="zh">${esc((x.c.zh || x.c.name)[0])}</span>`)(K.lookAt(x.c, now)?.img)}<span>${esc(x.c.name)}</span></a>
              <span class="rr-step"><span class="tl-ep">EP ${x.to.ep}</span> ${x.from ? `<span class="muted">${esc(x.from.realm)}</span> <span aria-label="to">›</span> ` : `<span class="muted">first shown at</span> `}<b>${esc(x.to.realm)}</b></span>
              ${x.to.detail ? `<span class="rr-detail">${esc(x.to.detail)}</span>` : ""}</li>`).join("")}</ol></section>`
            : CAST.some(c => (c.power || []).length) ? `<p class="note">Nobody's realm changes on screen in this stretch.</p>` : ""}
          ${plist.length ? `<section aria-labelledby="rc-people"><h2 id="rc-people">Faces to remember</h2>
            <p class="note">As they look at EP ${now}. <b class="debut-dot" aria-hidden="true">初</b> marks someone new in this stretch.</p>
            <ul class="rung-people recap-people">${plist.map(x => personChip(x.c, now, { debut: x.debut, realm: true })).join("")}</ul></section>` : ""}
        </aside>
      </div>`;

    return {
      title: "Previously on", html,
      mount(root) {
        const r = root.querySelector("#recap-from-r"), n = root.querySelector("#recap-from"), t = root.querySelector("#recap-to");
        const go = v => {
          const to = Math.max(+t.min, Math.min(+t.max, Math.round(+t.value) || LATEST));
          const x = Math.max(+n.min, Math.min(to - 1, Math.round(+v) || 0));
          location.hash = `#/recap?from=${x}&to=${to}`;
        };
        r.addEventListener("input", () => { n.value = r.value; });
        r.addEventListener("change", () => go(r.value));
        n.addEventListener("change", () => go(n.value));
        t.addEventListener("change", () => go(n.value));
        root.querySelector("#recap-form").addEventListener("submit", e => { e.preventDefault(); go(n.value); });
      },
    };
  }

  // Home-page teaser: a one-line form that opens the recap.
  function recapCard() {
    const now = LATEST;
    if (!EPISODES.length || now < 2) return "";
    const def = Math.max(EPISODES[0].ep - 1, now - 4);
    return `<section class="back">
      <h2>Back after a break?</h2>
      <form class="back-form" action="#/recap" data-recap>
        <label for="back-from">Last episode I clearly remember</label>
        <span class="recap-num"><span aria-hidden="true">EP</span><input type="number" id="back-from" min="0" max="${now - 1}" value="${def}"></span>
        <button type="submit" class="btn quiet">Catch me up to the latest, EP ${now}</button>
      </form>
      <p class="note">A short recap: what happened, whose realm changed, and the faces you'll need.</p>
    </section>`;
  }
  document.addEventListener("submit", e => {
    const f = e.target.closest("form[data-recap]");
    if (!f) return;
    e.preventDefault();
    location.hash = `#/recap?from=${Math.max(0, Math.round(+f.querySelector("input").value) || 0)}`;
  });

  // ---------------- What the hero carries at EP N ----------------
  const KINDS = [
    ["physique", "体", "Body and blood"],
    ["scripture", "经", "Scriptures"],
    ["technique", "术", "Secret arts"],
    ["treasure", "宝", "Weapons and treasures"],
    ["companion", "伴", "Companions"],
  ];
  const INV = (W.inventory || []).slice().sort((a, b) => a.ep - b.ep);
  // Wording is neutral unless the show's pages.journey.kit says otherwise (at, companions, goneWith, goneHas).
  const KT = SH.pages?.journey?.kit || {};
  const hasKit = INV.length > 0;

  function kitHtml(at) {
    // A thing is still held during the episode it's lost; after that it moves to "no longer".
    // Something lost and later regained (a new entry with the same name) only shows once, as held.
    const held = INV.filter(x => x.ep <= at && !(x.lostEp && x.lostEp < at));
    const heldNames = new Set(held.map(x => x.name));
    const gone = [...new Map(INV.filter(x => x.ep <= at && x.lostEp && x.lostEp < at && !heldNames.has(x.name))
      .map(x => [x.name, x])).values()];
    if (!held.length && !gone.length) return `<p class="muted">Nothing yet. Slide further along.</p>`;
    return KINDS.map(([kind, zh, label]) => {
      const h = held.filter(x => x.kind === kind), g = gone.filter(x => x.kind === kind);
      if (!h.length && !g.length) return "";
      return `<section class="kit-kind kit-${kind}">
        <div class="kit-mark"><span class="kit-zh" lang="zh" aria-hidden="true">${zh}</span><h2>${esc(kind === "companion" ? KT.companions || label : label)}</h2><span class="kit-count">${h.length ? `${h.length} now` : "none now"}</span></div>
        <div>
          ${h.length ? `<ul class="kit-items">${h.map(x => kitItem(x, at)).join("")}</ul>` : ""}
          ${g.length ? `<p class="kit-gone"><span>${esc(kind === "companion" ? KT.goneWith || `No longer with ${SH.heroName}` : KT.goneHas || "No longer has")}:</span> ${g.map(x => `<span class="kit-gone-item"><s>${esc(x.name)}</s> <span class="muted">EP ${x.lostEp}${x.lostNote ? `, ${esc(x.lostNote)}` : ""}</span></span>`).join("; ")}</p>` : ""}
        </div></section>`;
    }).join("");
  }
  function kitItem(x, at) {
    const c = x.kind === "companion" ? (x.cast ? CAST.find(k => k.id === x.cast) : castNamed(x.name)) : null;
    const pic = c ? K.lookAt(c, at)?.img : x.wiki ? S.imgFor(x.wiki) : null;
    const nameHtml = c && c.ep <= at ? `<a href="#/c/${esc(c.id)}">${esc(x.name)}</a>` : x.wiki && S.resolve(x.wiki) ? S.link(x.wiki, x.name) : esc(x.name);
    return `<li class="kit-item ${x.ep === at ? "is-new" : ""} ${x.lostEp === at ? "is-losing" : ""}">
      ${pic ? `<img class="kit-img" src="${esc(pic)}" alt="" loading="lazy">` : `<span class="kit-img blank" aria-hidden="true" lang="zh">${esc(x.zh ? x.zh[0] : (KINDS.find(k => k[0] === x.kind) || [, "宝"])[1])}</span>`}
      <div><h3>${nameHtml}${x.zh ? ` <span class="zh muted" lang="zh">${esc(x.zh)}</span>` : ""}</h3>
        <p><span class="kit-since">${x.ep === at ? "New this episode" : `Since EP ${x.ep}`}</span> ${esc(x.note || "")}</p>
        ${x.lostEp === at ? `<p class="kit-losing">Gone by the end of this episode${x.lostNote ? `: ${esc(x.lostNote)}` : ""}.</p>` : ""}</div></li>`;
  }

  function kit() {
    const J = SH.pages?.journey || {};
    const T = J.kit || {};
    const max = LATEST;
    const min = INV.length ? INV[0].ep : 1;
    const marks = [...new Set(INV.map(x => x.ep))];
    const html = `${head(J.zh || SH.zh, esc(T.title || `What ${SH.heroName} carries`), esc(T.lede || `Pick an episode to see ${SH.heroName}'s body, scriptures, secret arts, treasures and companions as they were then.`))}
      ${journeySeg("kit")}
      <div class="board kit">
        <div class="board-scrub">
          <label for="kit-ep">${esc(T.at || "Held at")}</label>
          <input type="range" id="kit-ep" min="${Math.min(min, max)}" max="${max}" value="${max}" list="kit-marks" aria-describedby="kit-note">
          <datalist id="kit-marks">${marks.map(m => `<option value="${m}"></option>`).join("")}</datalist>
          <output id="kit-out" for="kit-ep">EP ${max}</output>
          <small id="kit-note">Drag to watch the list grow.</small>
        </div>
        <div id="kit-list" aria-live="polite"></div>
      </div>
      ${T.note ? `<p class="note">${esc(T.note)}</p>` : ""}`;
    return {
      title: T.tab || `What ${SH.heroName} carries`, html,
      mount(root) {
        const r = root.querySelector("#kit-ep"), o = root.querySelector("#kit-out"), list = root.querySelector("#kit-list");
        const draw = () => { list.innerHTML = kitHtml(+r.value); o.textContent = `EP ${r.value}`; };
        draw();
        r.addEventListener("input", draw);
      },
    };
  }
  // The two views of the journey page. Shows without an inventory get no switch.
  function journeySeg(cur) {
    if (!hasKit) return "";
    const T = SH.pages?.journey?.kit || {};
    return `<nav class="seg journey-seg" aria-label="How to show ${esc(SH.heroName)}">
      <a href="#/journey" ${cur === "story" ? 'aria-current="page"' : ""}>${esc(T.storyTab || "Advantages")}</a>
      <a href="#/journey?view=kit" ${cur === "kit" ? 'aria-current="page"' : ""}>${esc(T.tab || `What ${SH.heroName} carries`)}</a></nav>`;
  }

  V.recap = recap;
  V.recapCard = recapCard;
  V.epCast = epCast;
  V.epIntroRest = epIntroRest;
  V.epWords = epWords;
  V.kit = hasKit ? kit : null;
  V.journeySeg = journeySeg;
})();
