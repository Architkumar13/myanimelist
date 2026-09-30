// The World page as a story: a pinned map whose camera pulls back stage by stage as the story's world grows.
// Only runs when the show ships an atlas.js (window.ATLAS); otherwise the World page is left exactly as it was.
// The old clickable region map stays underneath the story as "Every region at a glance".
(function () {
  const A = window.ATLAS, V = window.VIEWS;
  if (!A || !V) return;
  const S = window.HUB, SH = window.SHOW;
  const { esc, epLabel, NOVEL } = S;
  const base = V.world;
  const [AW, AH] = A.aspect || [4, 3];
  const LANDS = SH.map?.lands || [];
  const [dz, dn] = SH.map?.labelDy || [-6, 14];
  const factionNames = new Set((window.WORLD.factions || []).map(f => f.name));

  // The stage where each place is first visited; that stage's card lists it as new.
  const firstStage = {};
  A.stages.forEach((st, i) => st.path.forEach(id => { if (!(id in firstStage)) firstStage[id] = i; }));

  // A world is drawn once the story has reached it.
  const bodyAt = (b, i) => !b.stage || A.stages.findIndex(s => s.id === b.stage) <= i;
  // Place labels: small spots only when close in (or when they belong to the stage on screen), landmarks until the
  // camera leaves the planet, whole worlds always.
  const lodShows = (lod, w, here) => lod >= 3 || (lod === 2 ? w <= 2500 : w <= 300 || (here && w <= 1200));

  const epLink = ep => ep < NOVEL ? `<a class="ep-link" href="#/episodes/${ep}">${epLabel(ep)}</a>` : epLabel(ep);

  function card(st, i, prevMax) {
    const fresh = [...new Set(st.path)].filter(id => firstStage[id] === i);
    const c = st.ceiling;
    const lvl = c.lvl;
    const ticks = A.ladder.map((_, k) => `<span class="${lvl != null && k <= lvl ? "on" : ""} ${k === prevMax && (lvl == null || prevMax > lvl) ? "was" : ""}"></span>`).join("");
    const meter = `
      <div class="wx-meter" aria-label="Strongest power seen in this stage">
        <div class="wx-ticks" style="--rungs:${A.ladder.length}" aria-hidden="true">${ticks}</div>
        <p><b>${lvl == null ? "?" : esc(A.ladder[lvl])}</b>${lvl != null && SH.zhLevels?.[lvl] ? ` <span class="zh" lang="zh">${SH.zhLevels[lvl]}</span>` : ""} · ${esc(c.who)} ${epLink(c.ep)}${c.note ? `<span class="note">${esc(c.note)}</span>` : ""}</p>
      </div>`;
    const inner = `
      <div class="wx-head"><span class="wx-no">${i + 1}</span><h2>${esc(st.title)}</h2><span class="wx-zh" lang="zh">${st.zh}</span></div>
      <p class="wx-meta"><span>EP ${st.eps[0]}–${st.eps[1]}</span><span>${esc(st.scale)}</span></p>
      <p class="wx-gist">${esc(st.gist)}</p>
      <h3>Strongest power seen</h3>${meter}
      ${fresh.length ? `<h3>New on the map</h3><ul class="wx-places">${fresh.map(id => {
        const p = A.places[id];
        return `<li data-place="${id}">${esc(p.name)}${p.zh ? ` <span class="zh" lang="zh">${p.zh}</span>` : ""} ${epLink(p.ep)}</li>`;
      }).join("")}</ul>` : ""}
      ${st.factions.length ? `<h3>Powers met</h3><ul class="wx-chips">${st.factions.map(([name, ep]) => `<li>${factionNames.has(name) ? `<a href="#/powers?f=${encodeURIComponent(name)}">${esc(name)}</a>` : esc(name)}</li>`).join("")}</ul>` : ""}
      ${st.facts.length ? `<h3>How big</h3><ul class="wx-facts">${st.facts.map(([text, ep], k) => `<li>${esc(text)} ${epLink(ep)}</li>`).join("")}</ul>` : ""}
      <h3>What happens</h3><ol class="wx-events">${st.events.map(([ep, text]) => `<li>${epLink(ep)} ${esc(text)}</li>`).join("")}</ol>`;
    return `<section class="wx-stage" id="wx-${st.id}" data-i="${i}">${inner}</section>`;
  }

  function svg() {
    const far = 20000;
    const dipper = A.dipper || [];
    return `
      <svg class="wx-svg" role="img" aria-label="Map of ${esc(SH.heroName)}'s world" preserveAspectRatio="xMidYMid slice">
        <rect class="wx-space" x="${-far}" y="${-far}" width="${2 * far}" height="${2 * far}"/>
        ${dipper.length ? `<g class="wx-dipper"><polyline points="${[...dipper.slice(0, 4), dipper[0]].map(p => p.join(",")).join(" ")}"/>
          <polyline points="${[dipper[0], ...dipper.slice(4)].map(p => p.join(",")).join(" ")}"/>
          ${dipper.map(([x, y]) => `<g class="wx-pin" data-x="${x}" data-y="${y}"><circle r="3"/></g>`).join("")}</g>` : ""}
        ${A.bodies.map(b => `<circle class="wx-body ${b.planet ? "planet" : ""}" data-body="${b.id}" cx="${b.x}" cy="${b.y}" r="${b.r}"/>`).join("")}
        ${LANDS.map(l => `<path class="wx-land" data-region="${l.id}" d="${l.d}"/>`).join("")}
        <g class="wx-trails">${A.stages.map((_, i) => `<path class="wx-trail" data-i="${i}"/>`).join("")}</g>
        ${LANDS.map(l => {
          const r = window.WORLD.regions.find(x => x.id === l.id);
          return `<g class="wx-pin wx-land-lbl" data-region="${l.id}" data-x="${l.lx}" data-y="${l.ly}">
            <text class="zh-lbl" y="${dz}" text-anchor="middle">${l.zh ?? r?.zh ?? ""}</text><text y="${dn}" text-anchor="middle">${esc(l.name ?? r?.name ?? "")}</text></g>`;
        }).join("")}
        ${A.bodies.filter(b => b.name).map(b => `<g class="wx-pin wx-body-lbl" data-body="${b.id}" data-x="${b.x}" data-y="${b.y + b.r}">
          <text class="zh-lbl" y="22" text-anchor="middle">${b.zh}</text><text y="40" text-anchor="middle">${esc(b.name)}</text></g>`).join("")}
        ${Object.entries(A.places).map(([id, p]) => `<g class="wx-pin wx-place" data-place="${id}" data-x="${p.x}" data-y="${p.y}">
          <circle class="wx-ring" r="9"/><circle r="3.5"/><text x="${p.anchor === "end" ? -8 : 8}" y="4" text-anchor="${p.anchor || "start"}">${esc(p.name)}</text></g>`).join("")}
      </svg>`;
  }

  V.world = function (query) {
    const old = base(query);
    const prevMax = [];
    A.stages.reduce((m, st, i) => { prevMax[i] = m; return Math.max(m, st.ceiling.lvl ?? -1); }, -1);
    const html = `
      <header class="page-head"><h1><span class="zh-title" lang="zh">${A.zh}</span>${esc(A.title)}</h1><p>${esc(A.lede)}</p></header>
      <div class="wx">
        <figure class="wx-map">${svg()}<figcaption class="wx-cap" aria-live="polite"></figcaption></figure>
        <div class="wx-stages">${A.stages.map((st, i) => card(st, i, prevMax[i])).join("")}</div>
      </div>
      <h2 class="wx-after">Every region at a glance</h2>
      ${old.html.replace(/^\s*<header class="page-head">[\s\S]*?<\/header>/, "")}`;

    return {
      title: old.title, html,
      mount(root) {
        const undoOld = old.mount?.(root);
        const fig = root.querySelector(".wx-map"), el = fig.querySelector("svg"), cap = fig.querySelector(".wx-cap");
        const pins = [...el.querySelectorAll(".wx-pin")];
        const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
        let cam = null, raf = 0, active = -1;

        // One frame: move the camera, then counter-scale every pin so dots and labels keep their screen size.
        const draw = () => {
          const [cx, cy, w] = cam, h = w * AH / AW;
          el.setAttribute("viewBox", `${cx - w / 2} ${cy - h / 2} ${w} ${h}`);
          const k = w / Math.max(1, el.clientWidth);
          for (const p of pins) p.setAttribute("transform", `translate(${p.dataset.x} ${p.dataset.y}) scale(${k})`);
        };
        // Zooms keep one point fixed on screen (the centre moves in step with the width), so a ×50 zoom never loses the
        // subject; near-equal widths just pan with easing.
        const fly = to => {
          cancelAnimationFrame(raf);
          if (!cam || reduce) { cam = to.slice(); draw(); return; }
          const from = cam.slice(), t0 = performance.now(), D = 1100;
          const lw0 = Math.log(from[2]), lw1 = Math.log(to[2]), zoom = Math.abs(lw1 - lw0) > 0.3;
          const tick = now => {
            const t = Math.min(1, (now - t0) / D), e = t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            const w = Math.exp(lw0 + (lw1 - lw0) * e);
            const s = zoom ? (w - from[2]) / (to[2] - from[2]) : e;
            cam = [from[0] + (to[0] - from[0]) * s, from[1] + (to[1] - from[1]) * s, w];
            draw();
            if (t < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        };

        const pt = id => { const p = A.places[id]; return `${p.x},${p.y}`; };
        // Everything that depends on which stage is showing.
        const apply = i => {
          const st = A.stages[i], w = st.cam[2];
          el.dataset.far = String(w > 2000);
          const here = new Set(st.path);
          const reached = new Set(), lit = new Set();
          A.stages.slice(0, i + 1).forEach(s => s.path.forEach(id => { reached.add(id); lit.add(A.places[id].region); }));
          el.querySelectorAll(".wx-place").forEach(g => {
            const id = g.dataset.place, p = A.places[id];
            g.dataset.show = String(reached.has(id) && lodShows(p.lod, w, here.has(id)));
            g.dataset.here = String(here.has(id) && reached.has(id));
            // Once the camera is out past a region, earlier places keep their dot but drop their label.
            g.dataset.label = String(here.has(id) || w <= 500 || p.lod >= 3);
            g.dataset.fresh = String(firstStage[id] === i && reached.has(id));
          });
          el.querySelectorAll(".wx-land").forEach(g => g.dataset.lit = String(lit.has(g.dataset.region)));
          el.querySelectorAll(".wx-land-lbl").forEach(g => g.dataset.show = String(lit.has(g.dataset.region) && w >= 380 && w <= 2500));
          el.querySelectorAll("[data-body]").forEach(g => g.dataset.show = String(bodyAt(A.bodies.find(b => b.id === g.dataset.body), i)));
          let last = null;
          el.querySelectorAll(".wx-trail").forEach(t => {
            const j = +t.dataset.i, s = A.stages[j];
            const ids = j <= i ? s.path : [];
            const pts = (last ? [last] : []).concat(ids);
            if (ids.length) last = ids[ids.length - 1];
            t.setAttribute("d", pts.length > 1 ? "M" + pts.map(pt).join(" L") : "");
            t.dataset.state = j === i ? "now" : "past";
          });
          root.querySelectorAll(".wx-stage").forEach(s => s.dataset.active = String(+s.dataset.i === i));
          cap.innerHTML = `<b>${i + 1} · ${esc(st.title)}</b> · EP ${st.eps[0]}–${st.eps[1]}`;
          el.setAttribute("aria-label", `Map of ${SH.heroName}'s world at stage ${i + 1}: ${st.title}`);
        };

        const show = i => {
          if (i === active) return;
          active = i;
          apply(i);
          fly(A.stages[i].cam);
        };

        const io = new IntersectionObserver(entries => {
          const vis = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
          if (vis) show(+vis.target.dataset.i);
        }, { rootMargin: "-40% 0px -50% 0px" });
        root.querySelectorAll(".wx-stage").forEach(s => io.observe(s));
        const onResize = () => cam && draw();
        addEventListener("resize", onResize);
        show(0);

        return () => {
          io.disconnect(); cancelAnimationFrame(raf);
          removeEventListener("resize", onResize);
          if (typeof undoOld === "function") undoOld();
        };
      },
    };
  };
})();
