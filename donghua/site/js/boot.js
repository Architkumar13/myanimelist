// Picks the show from ?show=, applies its palette and loads its files in order. With no show, draws the hub.
// Scripts are injected rather than fetched so the site still works from file://.
(function () {
  const SHOWS = window.SHOWS || [];
  const id = new URLSearchParams(location.search).get("show");
  const meta = SHOWS.find(s => s.id === id);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  // The site used to save a "watched up to" episode per show; that feature is gone, so drop the old keys.
  SHOWS.forEach(s => localStorage.removeItem(`${s.id}-progress`));
  const themeStyle = s => Object.entries(s.theme || {}).map(([k, v]) => `${k}:${v}`).join(";");

  function favicon(glyph, bg, ink) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='6' fill='${bg}'/><text x='32' y='46' font-family='serif' font-size='40' text-anchor='middle' fill='${ink}'>${glyph}</text></svg>`;
    document.querySelector('link[rel="icon"]').href = "data:image/svg+xml," + encodeURIComponent(svg);
  }

  function hub() {
    document.body.classList.add("is-hub");
    const main = document.getElementById("main");
    main.innerHTML = `
      <header class="hub-head">
        <h1><span class="zh-title" lang="zh">动画</span>Donghua companions</h1>
        <p>One companion per show: realms, places, powers, people and every episode.</p>
      </header>
      <ul class="hub-shows">${SHOWS.map(s => {
        return `<li style="${themeStyle(s)}"><a href="?show=${encodeURIComponent(s.id)}">
          <img src="shows/${esc(s.dir)}/${esc(s.hero)}" alt="" loading="lazy">
          <div class="hub-copy">
            <span class="hub-zh" lang="zh">${esc(s.zh)}</span>
            <h2>${esc(s.title)}</h2>
            <p>${esc(s.blurb)}</p>
          </div></a></li>`;
      }).join("")}</ul>
      <p class="note hub-note">To add a show, see <code>donghua/README.md</code>.</p>`;
  }

  if (!meta) { hub(); return; }

  const base = `shows/${meta.dir}/`;
  const root = document.documentElement;
  root.dataset.show = meta.id;
  for (const [k, v] of Object.entries(meta.theme || {})) root.style.setProperty(k, v);
  document.querySelector('meta[name="theme-color"]').content = meta.theme?.["--patina"] || "#1a1a17";
  favicon(meta.glyph, meta.theme?.["--cinnabar"] || "#b5412d", meta.theme?.["--cinnabar-ink"] || "#f3ead6");
  document.title = `${meta.zh} · ${meta.title} companion`;

  // Required files stop the boot if missing; the rest are optional (a new show may not have a cast yet).
  const files = [
    [base + "show.js", true], [base + "data/world.js", true],
    [base + "data/wiki.js"], [base + "data/episodes.js"], [base + "data/cast.js"], [base + "atlas.js"], [base + "pages.js"],
    ["js/lib.js", true], ["js/views.js", true], ["js/people.js", true], ["js/features.js", true], ["js/atlas.js", true], ["js/extras.js", true], ["js/app.js", true],
  ];
  // Build scripts write picture paths relative to the show's own folder ("img/wiki/x.png"); the page lives two levels up.
  const rebase = o => {
    if (Array.isArray(o)) o.forEach(rebase);
    else if (o && typeof o === "object") for (const k in o) {
      const v = o[k];
      if ((k === "img" || k === "src") && typeof v === "string" && v.startsWith("img/")) o[k] = base + v;
      else if (v && typeof v === "object") rebase(v);
    }
  };
  const load = i => {
    if (i === 1) window.SHOW = Object.assign(window.SHOW || {}, meta, { base });
    if (i === 5) { rebase(window.WIKI?.entries); rebase(window.CAST); }
    if (i >= files.length) return;
    const [src, required] = files[i];
    const el = document.createElement("script");
    el.src = src;
    el.onload = () => load(i + 1);
    el.onerror = () => {
      if (!required) return load(i + 1);
      document.getElementById("main").innerHTML = `<header class="page-head"><h1>Couldn't load ${esc(meta.title)}</h1><p>Missing <code>${esc(src)}</code>. <a href="./">Back to all shows</a>.</p></header>`;
    };
    document.body.append(el);
  };
  load(0);
})();
