// People: the donghua cast in order of appearance, a "who's strongest at EP N" ladder, and one page per character.
(function () {
  const S = window.STH, V = window.VIEWS, CAST = window.CAST || [], LEVELS = window.CAST_LEVELS || [];
  const { esc, NOVEL } = S;
  const byId = Object.fromEntries(CAST.map(c => [c.id, c]));
  const EPS = Object.fromEntries((window.EPISODES || []).map(e => [e.ep, e]));
  const SH = window.SHOW, MAX_EP = S.MAX_EP, ZH_LEVELS = SH.zhLevels || [];

  const head = (zh, title, lede) => `<header class="page-head"><h1><span class="zh-title" lang="zh">${zh}</span>${title}</h1>${lede ? `<p>${lede}</p>` : ""}</header>`;

  // A character as they stand at episode `at`.
  function lookAt(c, at) {
    let pick = null;
    c.looks.forEach((l, i) => { if (l.ep <= at) pick = { ...l, i }; });
    return pick || { ...c.looks[0], i: 0 };
  }
  function powerAt(c, at) {
    let pick = null;
    c.power.forEach((p, i) => { if (p.ep <= at) pick = { ...p, i }; });
    return pick;
  }
  // Latest known realm, skipping "Unknown" entries if an earlier one was stated.
  function knownLevel(c, at) {
    let lvl = null;
    c.power.forEach(p => { if (p.ep <= at && p.lvl != null) lvl = p.lvl; });
    return lvl;
  }

  function portrait(look, c, cls = "") {
    return look?.img
      ? `<img class="${cls}" src="${esc(look.img)}" alt="${esc(c.name)}${look.label ? `: ${esc(look.label)}` : ""}" loading="lazy" decoding="async">`
      : `<span class="${cls} blank" role="img" aria-label="No still of ${esc(c.name)} yet"><span lang="zh">${esc((c.zh || c.name)[0])}</span><small>No clear still yet</small></span>`;
  }

  function meter(lvl) {
    if (lvl == null) return `<span class="meter unknown" aria-hidden="true"></span>`;
    return `<span class="meter" style="--n:${lvl + 1}" aria-hidden="true"></span>`;
  }
  function realmText(p, lvl) {
    if (!p) return "Realm not shown";
    if (p.realm === "Unknown") return lvl != null ? `${LEVELS[lvl]} or above` : "Realm not shown";
    return p.realm;
  }

  // ---------------- The page ----------------
  function people(query) {
    const view = query.get("view") === "power" ? "power" : "roll";
    const groups = [...new Set(CAST.map(c => c.group))];
    const html = `${head("人物", "People", `All ${CAST.length} characters the donghua has introduced, in the order they first appear on screen. Pictures and realms show them as they are in the latest episode.`)}
      <div class="people-bar">
        <nav class="seg" aria-label="How to show people">
          <a href="#/people" ${view === "roll" ? 'aria-current="page"' : ""}>Order of appearance</a>
          <a href="#/people?view=power" ${view === "power" ? 'aria-current="page"' : ""}>Who's strongest</a>
        </nav>
        ${view === "roll" ? `
        <input type="search" id="cast-q" placeholder="Find by name, Chinese or alias" aria-label="Find a character">
        <label class="select"><span>Group</span><select id="cast-group"><option value="">Everyone</option>${groups.map(g => `<option>${esc(g)}</option>`).join("")}</select></label>` : ""}
      </div>
      ${view === "roll" ? roll() : ladder()}`;
    return { title: "People", html, mount: view === "roll" ? mountRoll : mountLadder };
  }

  function card(c, at) {
    const look = lookAt(c, at), p = powerAt(c, at), lvl = knownLevel(c, at);
    const nLooks = c.looks.filter(l => l.ep <= at).length;
    const hay = [c.name, c.zh, ...(c.aka || [])].join(" ").toLowerCase();
    return `<li class="card side-${c.side}" data-hay="${esc(hay)}" data-group="${esc(c.group)}">
      <a href="#/c/${c.id}">
        <span class="card-img">${portrait(look, c)}${nLooks > 1 ? `<span class="card-looks" title="Their look changes ${nLooks - 1} time${nLooks > 2 ? "s" : ""} by EP ${at}">${nLooks} looks</span>` : ""}</span>
        <span class="card-name">${esc(c.name)}</span>
        ${c.zh ? `<span class="card-zh" lang="zh">${esc(c.zh)}</span>` : ""}
        <span class="card-realm">${meter(lvl)}<span>${esc(realmText(p, lvl))}</span></span>
        <span class="card-group">${esc(c.group)}</span>
      </a></li>`;
  }

  function roll() {
    const eps = [...new Set(CAST.map(c => c.ep))].sort((a, b) => a - b);
    const block = ep => {
      const cs = CAST.filter(c => c.ep === ep);
      const t = EPS[ep]?.title;
      return `<section class="debut" data-ep="${ep}"><div class="debut-mark"><a class="debut-ep" href="#/episodes/${ep}">EP ${ep}</a>${t ? `<span class="debut-title">${esc(t)}</span>` : ""}</div>
        <ol class="cast">${cs.map(c => card(c, MAX_EP)).join("")}</ol></section>`;
    };
    return `<div class="roll">
      ${eps.map(block).join("")}
      <p class="note" id="cast-empty" hidden>Nobody matches. Try another name, or pick “Everyone”.</p>
    </div>
    <p class="note">Characters and timelines are collected from the episodes and fan sources. Realms marked “or above” are the last level the show stated. Looking for someone from the novel? The <a href="#/lore">Library</a> has every fan-wiki character.</p>`;
  }

  function mountRoll(root) {
    const q = root.querySelector("#cast-q"), g = root.querySelector("#cast-group");
    const apply = () => {
      const s = q.value.trim().toLowerCase(), grp = g.value;
      root.querySelectorAll(".card").forEach(li => {
        li.hidden = !((!s || li.dataset.hay.includes(s)) && (!grp || li.dataset.group === grp));
      });
      root.querySelectorAll(".debut").forEach(sec => { sec.hidden = !sec.querySelector(".card:not([hidden])"); });
      root.querySelector("#cast-empty").hidden = !!root.querySelector(".card:not([hidden])");
    };
    q.addEventListener("input", apply); g.addEventListener("change", apply);
  }

  // ---------------- Who's strongest at EP N ----------------
  function ladder() {
    const max = MAX_EP;
    return `<div class="board">
      <div class="board-scrub">
        <label for="board-ep">Show everyone as they are at</label>
        <input type="range" id="board-ep" min="1" max="${max}" value="${max}" aria-describedby="board-note">
        <output id="board-out" for="board-ep">EP ${max}</output>
        <small id="board-note">Drag to watch the ranking change.</small>
      </div>
      <ol class="rungs" id="rungs" aria-live="polite"></ol>
    </div>
    <p class="note">Each person sits at the last realm the donghua (or, where marked, a fan source) gave them by that episode. Hidden masters often sit higher than shown.</p>`;
  }

  function rungsHtml(at) {
    const rows = new Map();
    for (const c of CAST) {
      if (c.ep > at) continue;
      const lvl = knownLevel(c, at);
      const k = lvl == null ? -1 : lvl;
      if (!rows.has(k)) rows.set(k, []);
      rows.get(k).push(c);
    }
    const keys = [...rows.keys()].filter(k => k >= 0).sort((a, b) => b - a);
    if (!keys.length) return `<li class="rung-empty">Nobody has a known realm yet.</li>`;
    const top = keys[0], lo = keys[keys.length - 1];
    let out = "";
    for (let k = top; k >= lo; k--) {
      const cs = rows.get(k) || [];
      out += `<li class="rung ${cs.length ? "" : "is-empty"}" style="--n:${k + 1}">
        <div class="rung-label"><span class="rung-zh" lang="zh">${ZH_LEVELS[k]}</span><span>${esc(LEVELS[k])}</span></div>
        <ul class="rung-people">${cs.map(c => chip(c, at)).join("")}</ul></li>`;
    }
    const unk = rows.get(-1) || [];
    if (unk.length) out += `<li class="rung unknown"><div class="rung-label"><span class="rung-zh" lang="zh">未知</span><span>Not shown yet</span></div>
      <ul class="rung-people">${unk.map(c => chip(c, at)).join("")}</ul></li>`;
    return out;
  }
  function chip(c, at) {
    const look = lookAt(c, at);
    return `<li style="view-transition-name:c-${c.id}"><a class="chip-person ${c.id === SH.heroId ? "is-hero" : ""}" href="#/c/${c.id}" title="${esc(realmText(powerAt(c, at), knownLevel(c, at)))}">
      ${look.img ? `<img src="${esc(look.img)}" alt="" loading="lazy">` : `<span class="blank" aria-hidden="true" lang="zh">${esc((c.zh || c.name)[0])}</span>`}<span>${esc(c.name)}</span></a></li>`;
  }

  function mountLadder(root) {
    const r = root.querySelector("#board-ep"), o = root.querySelector("#board-out"), list = root.querySelector("#rungs");
    const draw = () => { list.innerHTML = rungsHtml(+r.value); o.textContent = `EP ${r.value}`; };
    draw();
    const motion = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    r.addEventListener("input", () => (motion && document.startViewTransition ? document.startViewTransition(draw) : draw()));
  }

  // ---------------- One character ----------------
  function character(_q, id) {
    const c = byId[id];
    if (!c) return { title: "Not found", html: head("无", "Nobody by that name", `There's no one called “${esc(id)}” in the cast list. <a href="#/people">Back to People</a>.`) };
    const at = MAX_EP;
    const look = lookAt(c, at), p = powerAt(c, at), lvl = knownLevel(c, at);
    const wiki = c.wiki && S.resolve(c.wiki);
    const sideWord = { ally: "an ally", rival: "a rival", enemy: "an enemy", neutral: "neither friend nor foe", mentor: "a mentor" }[c.side] || c.side;
    const same = CAST.filter(x => x.ep === c.ep && x.id !== c.id);

    const looks = c.looks.map((l, i) => {
      const cur = i === look.i;
      const fig = `<figure class="look ${cur ? "is-now" : ""}">
        ${l.img ? `<img src="${esc(l.img)}" alt="${esc(c.name)}: ${esc(l.label)}" loading="lazy" data-zoom>` : portrait(l, c)}
        <figcaption><span class="look-ep">${l.ep >= NOVEL ? "Later" : `From EP ${l.ep}`}${cur ? "<b>Latest</b>" : ""}</span>
          <span class="look-label">${esc(l.label)}</span>
          ${l.desc ? `<span class="look-desc">${esc(l.desc)}</span>` : ""}
          ${l.why ? `<span class="look-why">Why: ${esc(l.why)}</span>` : ""}
          ${l.src ? `<span class="look-src">${esc(l.src)}</span>` : ""}</figcaption></figure>`;
      return `<li>${fig}</li>`;
    }).join("");

    const timeline = c.power.map(pw => `<li><div class="tl-row"><span class="tl-ep">EP ${pw.ep}</span>
        <span class="tl-realm">${meter(pw.lvl)}<b>${esc(pw.realm === "Unknown" ? "Not stated" : pw.realm)}</b></span>
        ${pw.detail ? `<span class="tl-detail">${esc(pw.detail)}</span>` : ""}
        ${pw.conf && pw.conf !== "high" ? `<span class="tl-conf" title="How sure the sources are">${pw.conf === "low" ? "uncertain" : "fairly sure"}</span>` : ""}</div></li>`).join("");

    const arc = (c.arc || []).map(a => `<li><div class="arc-row"><span class="tl-ep">EP ${a.ep}</span> ${esc(a.text)}</div></li>`).join("");

    const inner = `
      <p class="crumb"><a href="#/people">People</a> / ${esc(c.group)}</p>
      <article class="char">
        <div class="char-hero">
          <div class="char-portrait">${look.img ? `<img src="${esc(look.img)}" alt="${esc(c.name)}: ${esc(look.label)}" data-zoom>` : portrait(look, c)}</div>
          <div class="char-info">
            ${c.zh ? `<p class="char-zh" lang="zh">${esc(c.zh)}</p>` : ""}
            <h1>${esc(c.name)}</h1>
            ${c.aka?.length ? `<p class="char-aka">Also called ${c.aka.map(esc).join(", ")}</p>` : ""}
            <p class="char-intro">${esc(c.intro)}</p>
            <dl class="char-facts">
              <dt>First on screen</dt><dd><a href="#/episodes/${c.ep}">Episode ${c.ep}</a>${EPS[c.ep] ? `, ${esc(EPS[c.ep].title)}` : ""}${c.mentionEp ? ` <span class="muted">(mentioned from EP ${c.mentionEp})</span>` : ""}</dd>
              <dt>Group</dt><dd>${esc(c.group)}</dd>
              <dt>First shown as</dt><dd>${esc(sideWord)}</dd>
              <dt>Latest realm</dt><dd class="char-now">${meter(lvl)} <b>${esc(realmText(p, lvl))}</b>${p?.detail ? `<small>${esc(p.detail)}</small>` : ""}</dd>
            </dl>
            ${wiki ? `<p class="note"><a href="${S.href(wiki.title)}">Full fan-wiki article</a> (covers the whole novel).</p>` : ""}
          </div>
        </div>

        <section class="char-sec">
          <h2>How ${esc(c.name)} looks over time</h2>
          ${c.looks.length > 1 ? `<p class="note">The model changes ${c.looks.length - 1} time${c.looks.length > 2 ? "s" : ""} across the donghua.</p>` : ""}
          <ol class="looks">${looks}</ol>
        </section>

        <section class="char-sec">
          <h2>Power over time</h2>
          <figure class="pchart" id="pchart"></figure>
          <ol class="timeline" id="timeline">${timeline}</ol>
        </section>

        ${arc ? `<section class="char-sec"><h2>Their story</h2><ol class="timeline arc">${arc}</ol></section>` : ""}

        ${same.length ? `<section class="char-sec"><h2>Also first seen in EP ${c.ep}</h2><ul class="rung-people">${same.map(x => chip(x, at)).join("")}</ul></section>` : ""}
      </article>`;

    return {
      title: c.name,
      html: inner,
      mount(root) {
        const strip = root.querySelector(".looks"), now = strip?.querySelector(".look.is-now")?.closest("li");
        if (now && now.offsetLeft > strip.clientWidth - now.clientWidth) strip.scrollLeft = now.offsetLeft - strip.offsetLeft - 16;
        const fig = root.querySelector("#pchart");
        fig.innerHTML = chartSvg(c);
      },
    };
  }

  // Step chart of realm level against episode.
  function chartSvg(c) {
    const W = 720, H = 260, L = 118, R = 16, T = 14, B = 34;
    const pts = c.power.map((p, i) => ({ ...p, i })).filter(p => p.lvl != null);
    if (!pts.length) return `<p class="note">The show hasn't said what realm ${esc(c.name)} is at.</p>`;
    const lvls = pts.map(p => p.lvl);
    const lo = Math.max(0, Math.min(...lvls) - 1), hi = Math.min(LEVELS.length - 1, Math.max(...lvls) + 1);
    const x = ep => L + (W - L - R) * (ep - 1) / (MAX_EP - 1);
    const y = l => T + (H - T - B) * (hi - l) / Math.max(1, hi - lo);
    let d = "";
    pts.forEach((p, k) => {
      d += k ? ` H${x(p.ep).toFixed(1)} V${y(p.lvl).toFixed(1)}` : `M${x(p.ep).toFixed(1)} ${y(p.lvl).toFixed(1)}`;
    });
    const grid = [];
    for (let l = lo; l <= hi; l++) grid.push(`<line x1="${L}" x2="${W - R}" y1="${y(l)}" y2="${y(l)}" class="g"/><text x="${L - 8}" y="${y(l) + 4}" class="yl">${esc(LEVELS[l])}</text>`);
    const ticks = [...[1, 25, 50, 75, 100, 125, 150].filter(e => e < MAX_EP - 10), MAX_EP].map(e => `<text x="${x(e)}" y="${H - 12}" class="xl">${e === 1 ? "EP 1" : e}</text>`).join("");
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="pc-t"><title id="pc-t">${esc(c.name)}'s realm by episode: ${pts.map(p => `EP ${p.ep} ${LEVELS[p.lvl]}`).join(", ")}</title>
      ${grid.join("")}${ticks}
      <path d="${d} H${x(MAX_EP).toFixed(1)}" class="line"/>
      ${pts.map(p => `<circle cx="${x(p.ep)}" cy="${y(p.lvl)}" r="4.5" class="dot"><title>EP ${p.ep}: ${esc(p.realm)}</title></circle>`).join("")}
    </svg>`;
  }

  V.people = people;
  V.character = character;
  V.castById = byId;
  // Shared with features.js (recap, episode chips, inventory).
  V.castKit = { lookAt, powerAt, knownLevel, realmText, meter, portrait };
})();
