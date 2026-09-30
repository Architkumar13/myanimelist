// One function per page. Each returns { title, html, mount?(root) }.
(function () {
  const W = window.WORLD, S = window.STH, SH = window.SHOW, WIKI = window.WIKI || { entries: {}, alias: {} };
  const P = SH.pages;
  const { esc, epLabel, link, img, imgFor, resolve, NOVEL } = S;
  const EPISODES = () => (window.EPISODES || []).slice().sort((a, b) => a.ep - b.ep);
  const realmById = Object.fromEntries(W.realms.map(r => [r.id, r]));
  const regionById = Object.fromEntries(W.regions.map(r => [r.id, r]));

  const head = (zh, title, lede) => `<header class="page-head"><h1><span class="zh-title" lang="zh">${zh}</span>${title}</h1>${lede ? `<p>${lede}</p>` : ""}</header>`;
  const subs = s => s ? ` <span class="term-sub" title="Name in the English subtitles">subs: ${esc(s)}</span>` : "";

  // ---------------- Home ----------------
  function home() {
    const eps = EPISODES();
    const latest = eps.filter(e => !e.arc).pop() || eps[eps.length - 1];
    const H = SH.home;
    const html = `
      <section class="hero">
        <img class="hero-img" src="${esc(SH.base + SH.hero)}" alt="${esc(H.heroAlt)}" fetchpriority="high">
        <div class="hero-copy">
          <h1 class="hero-title" lang="zh">${SH.zh}</h1>
          <p class="hero-sub">${esc(SH.title)}, explained</p>
          <p>${H.lede}</p>
        </div>
      </section>

      <ol class="steps" aria-label="Understand the world in ${H.steps.length} steps">${H.steps.map(([to, title, text]) => `
        <li><div><h3><a href="${to}">${esc(title)}</a></h3>
          <p>${esc(text)}</p></div></li>`).join("")}
      </ol>

      <div class="now">
        <section>
          <h2>Latest episode</h2>
          ${latest ? `<p>${epLabel(latest.ep)} <b>${esc(latest.title)}</b></p><p>${esc(latest.summary)}</p><p><a href="#/episodes/${latest.ep}">Open the episode guide</a></p>` : `<p class="muted">No episodes in the guide yet.</p>`}
        </section>
        ${window.VIEWS.recapCard ? window.VIEWS.recapCard() : ""}
      </div>`;
    return { title: "Home", html };
  }

  // ---------------- Realms ----------------
  // A show either draws a figure (SH.realms.figure, an SVG whose [data-realm] parts light up as you scroll)
  // or gets a plain list of realms to jump between.
  function realms() {
    const C = SH.realms;
    const sections = W.realms.map((r, i) => `
      <section class="realm" id="realm-${r.id}" data-realm="${r.id}">
        <div class="realm-head"><span class="realm-no">${i + 1}</span><h2>${esc(r.name)}</h2><span class="realm-zh" lang="zh">${r.zh}</span></div>
        <div class="realm-meta"><span>Subs: <b>${esc(r.subs)}</b></span><span>Lives in: <b>${esc(r.where)}</b></span><span>Lifespan: <b>${esc(r.lifespan)}</b></span></div>
        <p class="realm-gist">${esc(r.gist)}</p>
        <ol class="stages">${r.stages.map(st => `
          <li><div class="st-name">${esc(st.name)} <span class="zh" lang="zh">${st.zh}</span>${st.subs && st.subs !== st.name ? `<small>subs: ${esc(st.subs)}</small>` : ""}</div>
            <p>${st.title ? `<span class="st-title">${esc(st.title)}</span>` : ""}${esc(st.text)}</p></li>`).join("")}
        </ol>
        <div class="yefan-at">${esc(SH.heroName)} reaches ${esc(r.name)} in ${r.yefan >= NOVEL ? C.novelWord : `episode ${r.yefan}`}.</div>
        ${r.wiki && resolve(r.wiki) ? `<p class="note">More detail: ${link(r.wiki, r.wiki + " on the wiki")}</p>` : ""}
      </section>`).join("");

    const ladder = l => {
      const items = W[l.list] || [];
      return `<h3>${esc(l.title)}</h3>${l.note ? `<p class="note">${esc(l.note)}</p>` : ""}` + (l.cards
        ? `<ul class="beyond">${items.map(p => `<li><h3>${esc(p.name)} <span class="zh" lang="zh">${p.zh}</span></h3><p>${p.eq ? `${esc(p.eq)}. ` : ""}${esc(p.text)}</p></li>`).join("")}</ul>`
        : `<ol class="grades">${items.map(g => `<li>${esc(g)}</li>`).join("")}</ol>`);
    };
    const side = C.figure
      ? `<figure class="body-fig">${C.figure}<figcaption class="body-caption" aria-live="polite"></figcaption></figure>`
      : `<nav aria-label="Realms"><ol class="realm-nav">${W.realms.map(r => `<li><button type="button" data-jump="${r.id}"><span class="zh" lang="zh">${r.zh}</span>${esc(r.name)}</button></li>`).join("")}<li><button type="button" data-jump="beyond"><span class="zh" lang="zh">${C.beyondZh}</span>${esc(C.beyondTitle)}</button></li></ol></nav>`;

    const html = `${head("境界", "Realms of cultivation", P.realms.lede)}
      <div class="realms">
        ${side}
        <div>
          ${sections}
          <section class="realm" id="realm-beyond" data-realm="beyond">
            <h2>${esc(C.beyondTitle)}</h2>
            <p class="realm-gist">${esc(C.beyondGist)}</p>
            <ul class="beyond">${W.beyond.map(b => `<li><h3>${esc(b.name)} <span class="zh" lang="zh">${b.zh}</span></h3><p>${esc(b.text)}</p></li>`).join("")}</ul>
            ${C.ladders.map(ladder).join("")}
          </section>
        </div>
      </div>`;

    return {
      title: "Realms", html,
      mount(root) {
        const first = W.realms[0]?.id;
        let setActive;
        const fig = root.querySelector(".body-fig");
        if (fig) {
          const cap = fig.querySelector(".body-caption");
          setActive = id => {
            fig.querySelectorAll("[data-realm]").forEach(el => el.dataset.active = String(el.dataset.realm === id));
            const ripples = fig.querySelector("[data-ripples]");
            if (ripples) ripples.dataset.active = String(id === ripples.dataset.ripples);
            const r = realmById[id];
            cap.innerHTML = r ? `<b>${esc(r.name)}</b> · ${esc(r.where)}` : esc(C.figureBeyond);
            if (id === "beyond") fig.querySelectorAll("[data-realm]").forEach(el => el.dataset.active = "true");
          };
          fig.addEventListener("click", e => {
            const z = e.target.closest("[data-realm]");
            if (z) root.querySelector(`#realm-${z.dataset.realm}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
          });
        } else {
          const buttons = [...root.querySelectorAll("[data-jump]")];
          setActive = id => buttons.forEach(b => b.dataset.active = String(b.dataset.jump === id));
          buttons.forEach(b => b.addEventListener("click", () => {
            root.querySelector(`#realm-${b.dataset.jump}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
          }));
        }
        setActive(first);
        const io = new IntersectionObserver(entries => {
          const vis = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
          if (vis) setActive(vis.target.dataset.realm);
        }, { rootMargin: "-35% 0px -55% 0px" });
        root.querySelectorAll("section.realm").forEach(s => io.observe(s));
        return () => io.disconnect();
      },
    };
  }

  // ---------------- World ----------------
  // SH.map.lands are hand-drawn shapes keyed by region id; regions without a shape are listed under the map.
  function world() {
    const factionsIn = id => W.factions.filter(f => f.region === id);
    const regionHtml = r => {
      const fs = factionsIn(r.id);
      return `<h2>${esc(r.name)} <span class="zh" lang="zh">${r.zh}</span></h2>
        <p>${epLabel(r.ep)}</p><p>${esc(r.blurb)}</p>
        ${fs.length ? `<h3>Powers here</h3><ul>${fs.map(f => `<li><a href="#/powers?f=${encodeURIComponent(f.name)}">${esc(f.name)}</a> <span class="muted">tier ${f.tier}</span></li>`).join("")}</ul>` : ""}
        ${r.wiki && resolve(r.wiki) ? `<p class="note">${link(r.wiki, "Read the wiki page")}</p>` : ""}`;
    };
    const M = SH.map, LANDS = M.lands, [dz, dn] = M.labelDy || [-6, 14];
    const svg = `
      <svg viewBox="0 0 700 520" role="group" aria-label="${esc(M.label)}. Choose a region.">
        <rect class="sea" x="0" y="0" width="700" height="520" rx="10"/>
        ${LANDS.map(l => {
          const r = regionById[l.id];
          return `<path class="land" tabindex="0" role="button" aria-label="${esc(r.name)}" data-region="${l.id}" d="${l.d}"/>
            <text class="zh-lbl" x="${l.lx}" y="${l.ly + dz}" text-anchor="middle">${l.zh ?? r.zh}</text>
            <text x="${l.lx}" y="${l.ly + dn}" text-anchor="middle">${esc(l.name ?? r.name)}</text>`;
        }).join("")}
        ${M.extra || ""}
      </svg>`;

    const html = `${head(P.world.zh, P.world.title, P.world.lede)}
      <div class="map-wrap">
        <figure class="map">${svg}<figcaption class="note">${esc(M.caption)}</figcaption></figure>
        <aside class="region-panel" aria-live="polite"></aside>
      </div>
      <h2>${esc(M.offMap)}</h2>
      <ul class="region-list">${W.regions.filter(r => !LANDS.some(l => l.id === r.id)).map(r => `<li><h3>${esc(r.name)} <span class="zh" lang="zh">${r.zh}</span></h3><p>${epLabel(r.ep)} ${esc(r.blurb)}</p></li>`).join("")}
        ${M.far ? `<li><h3>${esc(M.far.title)}</h3><p>${epLabel(NOVEL)} ${esc(M.far.text)}</p></li>` : ""}
      </ul>`;

    return {
      title: "World", html,
      mount(root) {
        const panel = root.querySelector(".region-panel");
        const show = id => {
          const r = regionById[id];
          root.querySelectorAll(".land").forEach(p => p.dataset.active = String(p.dataset.region === id));
          panel.innerHTML = regionHtml(r);
        };
        root.querySelectorAll(".land").forEach(p => {
          p.addEventListener("click", () => show(p.dataset.region));
          p.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(p.dataset.region); } });
        });
        show(M.start || LANDS[0].id);
      },
    };
  }

  // ---------------- Powers ----------------
  function powers(query) {
    const pick = query.get("f");
    const factionHtml = f => {
      const e = resolve(f.wiki), pic = e?.img;
      const region = regionById[f.region];
      return `<article class="faction" id="f-${esc(f.name.replace(/\W+/g, "-"))}">
        ${img(pic, f.name, "faction-img", f.zh[0])}
        <div>
          <h3>${e ? `<a href="${S.href(e.title)}">${esc(f.name)}</a>` : esc(f.name)} <span class="zh" lang="zh">${f.zh}</span></h3>
          <div class="muted">${epLabel(f.ep)} Tier ${f.tier} · ${esc(region?.name || "")}${subs(f.subs)}</div>
          <dl>
            <dt>Strongest</dt><dd>${esc(f.top)}</dd>
            <dt>Known for</dt><dd>${esc(f.signature)}</dd>
            <dt>With ${esc(SH.heroName)}</dt><dd>${esc(f.with || f.yefan || "")}</dd>
          </dl>
        </div></article>`;
    };
    const html = `${head("势力", "Who holds power", P.powers.lede)}
      <ol class="ladder" aria-label="Faction tiers, strongest first">${W.tiers.map(t => `
        <li style="--i:${t.n}"><span class="rung-n">${t.n}</span>
          <button type="button" data-tier="${t.n}" aria-pressed="false">
            <span class="rung-name">${esc(t.name)} <span class="zh" lang="zh">${t.zh}</span></span>
            <span class="rung-top">${esc(t.top)}</span>
          </button></li>`).join("")}
      </ol>
      ${P.powers.note ? `<p class="note">${esc(P.powers.note)}</p>` : ""}
      <h2 id="factions-h">Factions</h2>
      <div class="filters" role="group" aria-label="Filter by region">
        <button type="button" class="chip" data-region="" aria-pressed="true">Everywhere</button>
        ${W.regions.map(r => `<button type="button" class="chip" data-region="${r.id}" aria-pressed="false">${esc(r.name)}</button>`).join("")}
      </div>
      <div class="factions">${W.factions.map(f => `<div data-f-region="${f.region}" data-f-tier="${f.tier}">${factionHtml(f)}</div>`).join("")}</div>`;

    return {
      title: "Powers", html,
      mount(root) {
        let region = "", tier = "";
        const apply = () => {
          root.querySelectorAll("[data-f-region]").forEach(el => {
            el.hidden = (region && el.dataset.fRegion !== region) || (tier && el.dataset.fTier !== tier);
          });
          root.querySelectorAll(".chip[data-region]").forEach(c => c.setAttribute("aria-pressed", String(c.dataset.region === region)));
          root.querySelectorAll(".ladder button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.tier === tier)));
        };
        root.querySelectorAll(".chip[data-region]").forEach(c => c.addEventListener("click", () => { region = c.dataset.region; apply(); }));
        root.querySelectorAll(".ladder button").forEach(b => b.addEventListener("click", () => {
          tier = tier === b.dataset.tier ? "" : b.dataset.tier; apply();
          root.querySelector("#factions-h").scrollIntoView({ behavior: "smooth" });
        }));
        if (pick) root.querySelector(`#f-${CSS.escape(pick.replace(/\W+/g, "-"))}`)?.scrollIntoView({ block: "center" });
      },
    };
  }

  // ---------------- Journey ----------------
  function journey(query) {
    const J = P.journey;
    const V = window.VIEWS;
    if (query?.get("view") === "kit" && V.kit) return V.kit();
    const html = `${head(J.zh, J.title, J.lede)}
      ${V.journeySeg ? V.journeySeg("story") : ""}
      <div class="journey">${W.journey.map(st => `
        <section class="stage">
          <div class="stage-head"><h2>${esc(st.stage)}</h2><div class="eps">${st.eps[0] >= NOVEL ? "Novel" : `EP ${st.eps[0]}–${st.eps[1]}`}</div></div>
          <ol class="stage-items">${st.items.map(it => {
            const pic = it.wiki ? imgFor(it.wiki) : null;
            return `<li><div class="item">${img(pic, it.name, "item-img", it.zh[0])}<div>
              <h3>${it.wiki && resolve(it.wiki) ? link(it.wiki, it.name) : esc(it.name)} <span class="zh muted" lang="zh">${it.zh}</span></h3>
              <p>${epLabel(it.ep)} ${esc(it.text)}</p></div></div></li>`;
          }).join("")}</ol>
        </section>`).join("")}
      </div>
      <h2>${esc(J.secrets[0])} <span class="zh muted" lang="zh">${J.secrets[1]}</span></h2>
      <p class="prose">${esc(J.secrets[2])}</p>
      <ul class="secrets">${W.secrets.map(s => `<li><div class="secret"><div class="secret-ch" lang="zh">${s.ch}</div><h3>${esc(s.name)} · ${esc(s.gloss)}</h3><p>${esc(s.effect)}</p><p>${epLabel(s.ep)}</p></div></li>`).join("")}</ul>
      <h2>${esc(J.methods[0])}</h2>
      <p class="prose">${esc(J.methods[1])}</p>
      <div class="table-scroll"><table class="plain"><thead><tr><th>Realm</th><th>Method</th><th>From</th><th>When</th></tr></thead><tbody>
        ${W.methods.map(m => `<tr><td>${esc(m.realm)}</td><td>${esc(m.method)} <span class="zh muted" lang="zh">${m.zh}</span></td><td>${esc(m.from)}</td><td>${epLabel(m.ep)}</td></tr>`).join("")}
      </tbody></table></div>`;
    return { title: SH.heroName, html };
  }

  // ---------------- Episodes ----------------
  function episodes(query, param) {
    const eps = EPISODES();
    const V = window.VIEWS;
    const arcs = W.arcs || SH.arcs || [];
    const item = e => {
      const range = e.epEnd ? `${e.ep}–${e.epEnd}` : e.ep;
      const body = `<h3>${esc(e.title)}</h3>
        <p>${esc(e.summary)}</p>
        ${e.events?.length ? `<ul>${e.events.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
        ${e.cultivation ? `<p class="cult">${esc(e.cultivation)}</p>` : ""}
        ${V.epCast ? V.epCast(e) : ""}
        ${(rest => rest.length ? `<p class="intro"><b>First appearances:</b> ${rest.map(n => link(n)).join(", ")}</p>` : "")(V.epIntroRest ? V.epIntroRest(e) : e.introduced || [])}
        ${V.epWords ? V.epWords(e) : ""}
        ${e.confidence && e.confidence !== "high" ? `<p class="note">${esc((P.episodes.caveat || {})[e.confidence] || (e.confidence === "low" ? "Pieced together from the novel's chapter mapping; details may be off." : "From fan sources; some details may be off."))}</p>` : ""}`;
      return `<li class="episode" id="ep-${e.ep}">
        <div class="episode-no">${range}<small>${e.arc ? "episodes" : "episode"}</small></div>
        <div>${body}</div></li>`;
    };
    const html = `${head("分集", "Episode guide", P.episodes.lede(eps, S.MAX_EP))}
      <div class="ep-arcs" role="group" aria-label="Jump to an arc">${arcs.map(a => `<a class="chip" href="#/episodes/${a[0]}">${a[0]}–${a[1] > S.MAX_EP ? "" : a[1]} ${esc(a[2])}</a>`).join("")}</div>
      ${eps.length ? `<ol class="episodes">${eps.map(item).join("")}</ol>` : `<p class="muted">The episode guide hasn't been built yet.</p>`}`;
    return {
      title: "Episodes", html,
      mount(root) {
        if (!param) return;
        const el = [...root.querySelectorAll(".episode")].filter(x => +x.id.slice(3) <= +param).pop();
        el?.scrollIntoView({ block: "start" });
      },
    };
  }

  // ---------------- Wiki article ----------------
  const FACT_LABELS = { zh: "Chinese", pinyin: "Pinyin", species: "Species", gender: "Gender", type: "Type", status: "Status",
    realm: "Cultivation", physique: "Physique", bloodline: "Bloodline", affiliations: "Affiliations", titles: "Titles", aliases: "Also called",
    masters: "Masters", disciples: "Disciples", family: "Family", spouse: "Spouse", founder: "Founder", emperor: "Emperor", leader: "Leader",
    ancestors: "Ancestors", elders: "Elders", protector: "Protector", members: "Members", powers: "Powers", continent: "Continent",
    world: "World", region: "Region", city: "City", legacy: "Legacy", killedBy: "Killed by", occupation: "Occupation", allies: "Allies",
    enemies: "Enemies", effects: "Effects", source: "Source", personality: "Personality" };

  function factList(facts, keys) {
    return keys.filter(k => facts[k]).map(k => {
      const v = facts[k];
      return `<dt>${FACT_LABELS[k] || k}</dt><dd>${Array.isArray(v) ? (v.length > 1 ? `<ul>${v.map(x => `<li>${S.inline(x)}</li>`).join("")}</ul>` : S.inline(v[0])) : S.inline(v)}</dd>`;
    }).join("");
  }

  const castFor = t => (window.CAST || []).find(c => c.wiki === t);
  function article(title) {
    const e = resolve(title);
    if (!e) return { title: "Not found", html: `${head("无", "Page not found", `There's no page called “${esc(title)}” in the wiki data. Try the search.`)}` };
    const ep = S.entryEp(e);
    const f = e.facts || {};
    const facts = factList(f, Object.keys(FACT_LABELS));
    const tabs = [{ name: "Overview", blocks: e.blocks }, ...(e.tabs || [])];
    const kindWord = { character: "Character", faction: "Faction", place: "Place", item: "Item", lore: "Lore", episode: "Episode" }[e.kind];
    const body = `
      <div class="tabs" role="tablist">${tabs.map((t, i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-tab="${i}">${esc(t.name)}</button>`).join("")}</div>
      ${tabs.map((t, i) => `<div role="tabpanel" data-panel="${i}" ${i ? "hidden" : ""}>${S.blocks(t.blocks)}</div>`).join("")}
      ${e.gallery?.length ? `<h2>Pictures</h2><div class="gallery">${e.gallery.map(g => `<figure><img src="${esc(g.src)}" alt="${esc(g.cap || e.title)}" loading="lazy" data-zoom><figcaption>${esc(g.cap)}</figcaption></figure>`).join("")}</div>` : ""}
      <p class="note">From the <a href="${SH.wiki.url}${encodeURIComponent(e.title.replace(/ /g, "_"))}" rel="noopener" target="_blank">${esc(SH.wiki.name)}</a> (CC BY-SA). Fan-written and based on the novel, so some details differ from the donghua.</p>`;

    const inner = `
      <p class="crumb"><a href="#/lore">Library</a> / ${kindWord}</p>
      ${castFor(e.title) ? `<p class="article-alt">This is the fan-wiki article. <a href="#/c/${castFor(e.title).id}">${esc(e.title)} in the donghua</a> has their looks and realms episode by episode.</p>` : ""}
      ${head(f.zh ? esc(f.zh) : "", esc(e.title), `${kindWord}${ep != null && ep < NOVEL ? ` · first seen in EP ${ep}` : ""}`)}
      <div class="article">
        <div class="article-main">${body}</div>
        ${e.img || facts ? `<aside class="infobox">
          ${e.img ? `<img class="lead" src="${esc(e.img)}" alt="${esc(e.title)}" data-zoom>` : ""}
          ${facts ? `<dl>${facts}</dl>` : ""}
        </aside>` : ""}
      </div>`;

    return {
      title: e.title,
      html: inner,
      mount(root) {
        const main = root.querySelector(".article-main");
        const bindTabs = () => main.querySelectorAll('[role="tab"]').forEach(b => b.addEventListener("click", () => {
          main.querySelectorAll('[role="tab"]').forEach(x => x.setAttribute("aria-selected", String(x === b)));
          main.querySelectorAll("[data-panel]").forEach(p => p.hidden = p.dataset.panel !== b.dataset.tab);
        }));
        bindTabs();
      },
    };
  }

  // ---------------- Emperors ----------------
  function emperors() {
    const E = P.emperors;
    const html = `${head(E.zh, E.title, E.lede)}
      <ol class="eras">${W.eras.map(era => `
        <li class="era">
          <div class="era-name"><span class="zh" lang="zh">${era.zh}</span>${esc(era.name)}${era.title ? `<small>Emperors called ${esc(era.title)}</small>` : ""}</div>
          <div><p class="era-note">${esc(era.note)}</p>
            <ul class="emperors">${era.emperors.map(em => `<li><div class="emperor">${img(imgFor(em.wiki), em.name, "", em.zh[0])}<div><h3>${em.wiki && resolve(em.wiki) ? link(em.wiki, em.name) : esc(em.name)} <span class="zh muted" lang="zh">${em.zh}</span></h3><p>${esc(em.legacy)}</p></div></div></li>`).join("")}</ul>
          </div>
        </li>`).join("")}</ol>
      ${E.note ? `<p class="note">${esc(E.note)}</p>` : ""}`;
    return { title: E.tab, html };
  }

  // ---------------- Forbidden zones ----------------
  function zones() {
    const Z = P.zones;
    const html = `${head(Z.zh, Z.title, Z.lede)}
      <div class="prose">${Z.prose}</div>
      <h2>${esc(Z.heading)}</h2>
      <ul class="zones">${W.zones.map(z => `<li><div class="zone-card"><h3>${esc(z.name)}</h3><div class="zh" lang="zh">${z.zh}</div><p>${epLabel(z.ep)} ${esc(z.text)}${z.subs ? ` <span class="term-sub">subs: ${esc(z.subs)}</span>` : ""}</p>
        <div class="master">${Z.masterLabel || ""}${esc(z.master)}</div></div></li>`).join("")}</ul>
      ${Z.wiki && resolve(Z.wiki[0]) ? `<p class="note">${link(Z.wiki[0], Z.wiki[1])} ${esc(Z.wiki[2])}</p>` : ""}`;
    return { title: Z.tab, html };
  }

  // ---------------- Terms ----------------
  function terms(query) {
    const T = P.terms;
    // A 5th item on a term is the first episode that uses it; with those the table gains a "First used" column.
    const withEp = W.terms.some(t => t[4] != null);
    const pick = query?.get("t");
    const row = ([t, zh, sub, other, ep], i) => {
      const cells = [
        resolve(t) ? link(t) : esc(t),
        `<span class="zh" lang="zh">${zh}</span>`,
        sub ? `<b>${esc(sub)}</b>` : `<span class="muted">${esc(T.empty)}</span>`,
        `<span class="muted">${esc(other)}</span>`,
      ];
      const e = ep ?? NOVEL;
      return `<tr id="term-${i}" data-term="${esc(t)}">${cells.map(c => `<td>${c}</td>`).join("")}${withEp ? `<td>${e < NOVEL ? `<a class="ep-link" href="#/episodes/${e}">${epLabel(e)}</a>` : epLabel(e)}</td>` : ""}</tr>`;
    };
    const html = `${head("词汇", "Terms and their many names", T.lede)}
      <div class="people-tools"><input type="search" id="terms-q" placeholder="Filter terms" aria-label="Filter terms"></div>
      <div class="table-scroll"><table class="plain" id="terms"><thead><tr><th>Term</th><th>Chinese</th><th>${esc(T.cols[0])}</th><th>${esc(T.cols[1])}</th>${withEp ? "<th>First used</th>" : ""}</tr></thead><tbody>
        ${W.terms.map(row).join("")}
      </tbody></table></div>`;
    return {
      title: "Terms", html,
      mount(root) {
        if (pick) {
          const tr = [...root.querySelectorAll("#terms tbody tr")].find(x => x.dataset.term === pick);
          if (tr) { tr.classList.add("is-picked"); tr.scrollIntoView({ block: "center" }); }
        }
        const q = root.querySelector("#terms-q");
        q.addEventListener("input", () => {
          const s = q.value.toLowerCase();
          root.querySelectorAll("#terms tbody tr").forEach(tr => tr.hidden = s && !tr.textContent.toLowerCase().includes(s));
        });
      },
    };
  }

  // ---------------- Library ----------------
  function lore() {
    const groups = [["character", "Characters (fan wiki, novel-wide)"], ["lore", "Cultivation and lore"], ["faction", "Factions"], ["place", "Places"], ["item", "Treasures and scriptures"], ["episode", "Episode articles"]];
    const byKind = k => Object.values(WIKI.entries).filter(e => e.kind === k).sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true }));
    const html = `${head("典籍", "Library", "Every article from the fan wiki. For the donghua cast with pictures and timelines, see People.")}
      <div class="library">${groups.map(([k, name]) => `<section><h2>${name}</h2><ul>${byKind(k).map(e => `<li><a href="${S.href(e.title)}">${esc(e.title)}</a></li>`).join("")}</ul></section>`).join("")}</div>`;
    return { title: "Library", html };
  }

  window.VIEWS = { home, realms, world, powers, journey, episodes, article, emperors, zones, terms, lore };
})();
