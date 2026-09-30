// Pages a show adds on top of the standard ten: the things only that donghua has.
//
// show.js `extraPages` lists them: { route, zh, label, title, lede?, sections: [...] }, or { route, zh, label, custom: true }.
// A section renders one world.js list with one of the shared layouts:
//   { id, title, zh?, lede?, layout: "cards" | "ranking" | "timeline" | "table", data: "<world.js key>",
//     fields?: [[key, label]] (extra lines on cards and ranking), columns?: [[key, label]] (table) }
// Items use the site's usual fields: name (or title), zh, ep, text, wiki, img, rank, plus whatever `fields`/`columns` name.
// A custom page comes from the show's optional pages.js: window.SHOW_PAGES[route] = (query, param, HUB) => ({ title, html, mount? }).
// Extra routes can never replace a standard page.
(function () {
  const S = window.HUB, V = window.VIEWS, W = window.WORLD, SH = window.SHOW;
  const { esc, epLabel, link, img, imgFor, resolve, NOVEL } = S;
  const PAGES = SH.extraPages || [];
  const CUSTOM = window.SHOW_PAGES || {};
  const LAYOUTS = ["cards", "ranking", "timeline", "table"];

  const head = (zh, title, lede) => `<header class="page-head"><h1><span class="zh-title" lang="zh">${zh}</span>${esc(title)}</h1>${lede ? `<p>${esc(lede)}</p>` : ""}</header>`;
  const epLink = ep => ep != null && ep < NOVEL ? `<a class="ep-link" href="#/episodes/${ep}">${epLabel(ep)}</a>` : epLabel(ep);
  const nameOf = it => it.name || it.title || "";
  const named = it => it.wiki && resolve(it.wiki) ? link(it.wiki, nameOf(it)) : esc(nameOf(it));
  const zhOf = it => it.zh ? ` <span class="zh muted" lang="zh">${esc(it.zh)}</span>` : "";
  const value = v => Array.isArray(v) ? v.map(esc).join(", ") : esc(v);
  const fieldList = (it, fields = []) => {
    const rows = fields.filter(([k]) => it[k] != null && it[k] !== "").map(([k, label]) => `<dt>${esc(label)}</dt><dd>${value(it[k])}</dd>`).join("");
    return rows ? `<dl class="x-fields">${rows}</dl>` : "";
  };
  const picture = it => { const src = it.img || (it.wiki ? imgFor(it.wiki) : null); return src ? img(src, nameOf(it), "x-img") : ""; };

  const RENDER = {
    cards: (items, sec) => `<ul class="x-cards">${items.map(it => `<li class="x-card">${picture(it)}<div>
      <h3>${named(it)}${zhOf(it)}</h3>${it.ep != null ? `<p class="x-ep">${epLink(it.ep)}</p>` : ""}
      ${it.text ? `<p>${esc(it.text)}</p>` : ""}${fieldList(it, sec.fields)}</div></li>`).join("")}</ul>`,
    ranking: (items, sec) => `<ol class="x-ranking">${items.map((it, i) => `<li><span class="x-rank" aria-hidden="true">${esc(it.rank ?? i + 1)}</span><div>
      <h3>${named(it)}${zhOf(it)} ${it.ep != null ? epLink(it.ep) : ""}</h3>
      ${it.text ? `<p>${esc(it.text)}</p>` : ""}${fieldList(it, sec.fields)}</div></li>`).join("")}</ol>`,
    timeline: items => `<ol class="x-timeline">${items.slice().sort((a, b) => (a.ep ?? NOVEL) - (b.ep ?? NOVEL)).map(it => `<li>
      <span class="x-when">${epLink(it.ep)}</span><div><h3>${named(it)}${zhOf(it)}</h3>${it.text ? `<p>${esc(it.text)}</p>` : ""}</div></li>`).join("")}</ol>`,
    table: (items, sec) => {
      const cols = sec.columns || [["name", "Name"], ["text", ""]];
      const cell = (it, k) => k === "name" || k === "title" ? `${named(it)}${zhOf(it)}` : k === "ep" ? epLink(it.ep) : value(it[k] ?? "");
      return `<div class="table-scroll"><table class="plain x-table"><thead><tr>${cols.map(([, l]) => `<th>${esc(l)}</th>`).join("")}</tr></thead>
        <tbody>${items.map(it => `<tr>${cols.map(([k, l]) => `<td data-label="${esc(l)}">${cell(it, k)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
    },
  };

  function page(P) {
    return query => {
      const secs = (P.sections || []).filter(s => LAYOUTS.includes(s.layout) && Array.isArray(W[s.data]) && W[s.data].length);
      const html = `${head(P.zh, P.title || P.label, P.lede)}
        ${secs.length > 1 ? `<nav class="x-jump" aria-label="Sections">${secs.map(s => `<a class="chip" href="#/${P.route}?s=${encodeURIComponent(s.id)}">${esc(s.title)}</a>`).join("")}</nav>` : ""}
        ${secs.map(s => `<section class="x-sec" id="x-${esc(s.id)}">
          <h2>${s.zh ? `<span class="zh" lang="zh">${esc(s.zh)}</span> ` : ""}${esc(s.title)}</h2>${s.lede ? `<p class="prose">${esc(s.lede)}</p>` : ""}
          ${RENDER[s.layout](W[s.data], s)}</section>`).join("")}`;
      return {
        title: P.label, html,
        mount(root) {
          const want = query?.get("s");
          if (want) root.querySelector(`#x-${CSS.escape(want)}`)?.scrollIntoView({ block: "start" });
        },
      };
    };
  }

  // route -> view, for app.js. Custom pages need their pages.js function; layout pages need sections.
  const routes = {};
  for (const P of PAGES) {
    if (!P.route) continue;
    if (P.custom) { if (typeof CUSTOM[P.route] === "function") routes[P.route] = (q, param) => CUSTOM[P.route](q, param, S); }
    else routes[P.route] = page(P);
  }
  V.extraRoutes = routes;
  V.extraNav = PAGES.filter(P => routes[P.route]).map(P => [P.route, P.zh, P.label]);
  // Search entries for every item on a layout page.
  V.extraIndex = PAGES.flatMap(P => (P.sections || []).filter(s => Array.isArray(W[s.data])).flatMap(s => W[s.data].map(it => ({
    title: nameOf(it), zh: it.zh || "", kind: P.label, sub: it.text || "", href: `#/${P.route}?s=${encodeURIComponent(s.id)}`,
  })))).filter(x => x.title);
})();
