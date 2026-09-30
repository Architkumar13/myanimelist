// Shared state and helpers: progress (spoiler) state, wiki lookups, block rendering.
(function () {
  const W = window.WORLD, SH = window.SHOW, WIKI = window.WIKI || { entries: {}, alias: {} };
  const NOVEL = W.NOVEL;
  const KEY = `${SH.id}-progress`;
  // The furthest episode you can set: the show's own maxEp, else the last episode in the guide.
  const MAX_EP = W.maxEp || Math.max(0, ...(window.EPISODES || []).map(e => e.epEnd || e.ep)) || 200;

  const saved = JSON.parse(localStorage.getItem(KEY) || "null") || { ep: SH.defaultEp ?? 1, all: false };
  const state = { ep: saved.ep, all: saved.all, opened: new Set() };
  const listeners = [];

  function save() { localStorage.setItem(KEY, JSON.stringify({ ep: state.ep, all: state.all })); }
  function setProgress(ep, all) {
    if (ep != null) state.ep = Math.max(0, Math.min(MAX_EP, Math.round(ep) || 0));
    if (all != null) state.all = all;
    save();
    listeners.forEach(fn => fn());
  }
  function onProgress(fn) { listeners.push(fn); }

  // Unknown episodes count as spoilers: we'd rather hide a harmless page than reveal a twist.
  function sealed(ep, id) {
    if (state.all) return false;
    if (id && state.opened.has(id)) return false;
    if (ep == null) return true;
    return ep > state.ep;
  }

  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  function epLabel(ep) {
    if (ep == null) return `<span class="ep-tag novel" title="Not matched to an episode">unmapped</span>`;
    if (ep >= NOVEL) return `<span class="ep-tag novel" title="Not matched to a donghua episode; comes later in the story">later</span>`;
    return `<span class="ep-tag" title="Donghua episode">EP ${ep}</span>`;
  }

  function sealWord(ep) {
    if (ep == null) return "Episode unknown";
    if (ep >= NOVEL) return "Later in the story";
    return `Shown in EP ${ep}`;
  }

  // Wrap html in a seal. id makes a broken seal stay broken for this visit.
  let sealCount = 0;
  function seal(html, ep, opts = {}) {
    const id = opts.id || `s${++sealCount}`;
    const shut = sealed(ep, id);
    const tag = opts.tag || "div";
    return `<${tag} class="seal ${opts.inline ? "seal-inline" : ""} ${shut ? "is-sealed" : ""} ${opts.cls || ""}" data-seal="${esc(id)}" data-ep="${ep ?? ""}">` +
      `<button type="button" class="seal-stamp" aria-label="${esc(sealWord(ep))}. Reveal this spoiler">` +
      `<span><b aria-hidden="true">封</b>${esc(sealWord(ep))} · reveal</span></button>` +
      `<div class="seal-body" ${shut ? 'aria-hidden="true" inert' : ""}>${html}</div></${tag}>`;
  }

  document.addEventListener("click", e => {
    const stamp = e.target.closest(".seal-stamp");
    if (!stamp) return;
    const box = stamp.parentElement;
    state.opened.add(box.dataset.seal);
    box.classList.remove("is-sealed");
    const body = box.querySelector(":scope > .seal-body");
    body.removeAttribute("aria-hidden");
    body.removeAttribute("inert");
    body.querySelector("a, button, [tabindex]")?.focus({ preventScroll: true });
  });

  // ---------- Wiki ----------
  function resolve(title) {
    if (!title) return null;
    const t = title.replace(/_/g, " ").trim();
    const hit = WIKI.entries[t] || WIKI.entries[WIKI.alias[t]];
    if (hit) return hit;
    const lower = t.toLowerCase();
    for (const k in WIKI.entries) if (k.toLowerCase() === lower) return WIKI.entries[k];
    for (const k in WIKI.alias) if (k.toLowerCase() === lower) return WIKI.entries[WIKI.alias[k]];
    return null;
  }

  function entryEp(e) {
    if (!e) return null;
    if (e.title in W.epOverride) return W.epOverride[e.title];
    return e.ep ?? null;
  }

  const href = title => "#/w/" + encodeURIComponent(title);

  function link(title, label) {
    const e = resolve(title);
    return e ? `<a href="${href(e.title)}">${esc(label || title)}</a>` : esc(label || title);
  }

  // ⟦Target|label⟧ tokens from the build step become in-app links.
  function inline(text) {
    return esc(text).replace(/⟦([^|⟧]*)\|([^⟧]*)⟧/g, (_, t, l) => {
      const e = resolve(t);
      return e ? `<a href="${href(e.title)}">${l}</a>` : l;
    });
  }
  const plain = text => String(text || "").replace(/⟦([^|⟧]*)\|([^⟧]*)⟧/g, "$2");

  function img(src, alt, cls = "", fallback = SH.glyph) {
    return src
      ? `<img class="${cls}" src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async">`
      : `<span class="${cls} blank" aria-hidden="true">${esc(fallback)}</span>`;
  }
  const imgFor = (title) => resolve(title)?.img || null;

  function blocks(list) {
    let out = "";
    for (const b of list || []) {
      if (b.t === "h") {
        const lvl = Math.min(4, Math.max(2, b.l));
        out += `<h${lvl}>${inline(b.x)}</h${lvl}>`;
      } else if (b.t === "p") {
        out += `<p>${inline(b.x)}</p>`;
      } else if (b.t === "quote") {
        out += `<blockquote><p>${esc(b.x)}</p>${b.by ? `<footer>${esc(b.by)}</footer>` : ""}</blockquote>`;
      } else if (b.t === "ul") {
        out += nestList(b.items);
      } else if (b.t === "table") {
        const rows = b.rows.filter(r => r.some(c => c));
        if (rows.length === 1 && rows[0].length === 1) { out += `<p>${inline(rows[0][0])}</p>`; continue; }
        const wide = Math.max(...rows.map(r => r.length));
        out += `<div class="table-scroll"><table class="plain"><tbody>` + rows.map((r, i) =>
          `<tr>${r.map(c => (i === 0 && wide > 1 ? `<th>${inline(c)}</th>` : `<td>${inline(c)}</td>`)).join("")}</tr>`).join("") +
          `</tbody></table></div>`;
      }
    }
    return out;
  }

  function nestList(items) {
    let html = "", depth = 0;
    for (const [d, text] of items) {
      while (depth < d) { html += "<ul>"; depth++; }
      while (depth > d) { html += "</ul>"; depth--; }
      html += `<li>${inline(text)}</li>`;
    }
    while (depth > 0) { html += "</ul>"; depth--; }
    return html;
  }

  window.STH = { state, setProgress, onProgress, sealed, seal, epLabel, esc, resolve, entryEp, href, link, inline, plain, img, imgFor, blocks, NOVEL, MAX_EP };
})();
