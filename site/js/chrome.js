/* Site-wide extras: quick search, night edition, sync with MAL, and one easter egg. */
(() => {
  const { esc, num, title, byId, openDetail } = Lib;
  const items = window.ANIME.items;

  /* ---------- Quick search (⌘K / Ctrl+K, or "/") ---------- */
  const box = document.getElementById("search");
  const input = box.querySelector("input");
  const results = box.querySelector("ul");
  let active = 0, matches = [];

  // Match every word anywhere in either title; titles that start with the query rank first.
  const find = (q) => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return items.filter((a) => a.s === 10).slice(0, 8);
    return items
      .map((a) => {
        const hay = `${a.t} ${a.en}`.toLowerCase();
        if (!words.every((w) => hay.includes(w))) return null;
        const starts = a.t.toLowerCase().startsWith(words[0]) || a.en.toLowerCase().startsWith(words[0]);
        return [a, (starts ? 100 : 0) + a.s + a.crowd / 10];
      })
      .filter(Boolean).sort((x, y) => y[1] - x[1]).slice(0, 10).map(([a]) => a);
  };

  const draw = () => {
    results.innerHTML = matches.length
      ? matches.map((a, i) => `
        <li role="option" id="sr-${a.id}" data-id="${a.id}" aria-selected="${i === active}">
          ${a.img ? `<img src="${esc(a.img)}" alt="">` : "<span></span>"}
          <span class="sr-title">${esc(title(a))}${Lib.altTitle(a) ? `<small>${esc(Lib.altTitle(a))}</small>` : ""}</span>
          <span class="sr-meta">${[a.year, a.type].filter(Boolean).join(", ")}${a.s ? ` <b>${a.s}</b>` : ""}</span>
        </li>`).join("")
      : `<li class="sr-empty">No title matches “${esc(input.value)}”.</li>`;
    input.setAttribute("aria-activedescendant", matches[active] ? `sr-${matches[active].id}` : "");
    results.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  };
  const openSearch = () => {
    if (box.open) return;
    input.value = "";
    matches = find(""); active = 0; draw();
    box.showModal();
    input.focus();
  };
  const choose = (a) => { if (!a) return; box.close(); openDetail(a); };

  input.addEventListener("input", () => { matches = find(input.value); active = 0; draw(); });
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); active = Math.min(matches.length - 1, active + 1); draw(); }
    if (e.key === "ArrowUp") { e.preventDefault(); active = Math.max(0, active - 1); draw(); }
    if (e.key === "Enter") { e.preventDefault(); choose(matches[active]); }
  });
  results.addEventListener("click", (e) => choose(byId.get(+e.target.closest("[data-id]")?.dataset.id)));
  box.addEventListener("click", (e) => { if (e.target === box) box.close(); });
  document.querySelector("[data-search]").addEventListener("click", openSearch);
  document.querySelector("[data-search] kbd").textContent = /Mac|iPhone|iPad/.test(navigator.platform) ? "⌘K" : "Ctrl K";

  const typing = (el) => el.closest("input, textarea, select, [contenteditable]");
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openSearch(); }
    else if (e.key === "/" && !typing(e.target) && !document.querySelector("dialog[open]")) { e.preventDefault(); openSearch(); }
  });

  /* ---------- Night edition ---------- */
  const root = document.documentElement;
  const toggle = document.querySelector("[data-theme-toggle]");
  const syncToggle = () => {
    const night = root.dataset.theme === "night";
    toggle.textContent = night ? "Day edition" : "Night edition";
    toggle.setAttribute("aria-pressed", String(night));
  };
  toggle.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "night" ? "day" : "night";
    localStorage.setItem("archit13-theme", root.dataset.theme);
    syncToggle();
  });
  syncToggle();

  /* ---------- Sync with MyAnimeList ----------
     MAL won't answer a web page, so the button asks scripts/serve.py to run the sync, polls its
     progress, then reloads. The result survives the reload in sessionStorage. */
  const syncBox = document.getElementById("sync");
  const syncBtn = document.querySelector("[data-sync]");
  const RESULT_KEY = "archit13-sync-result";
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
  const ago = (iso) => {
    const secs = (Date.parse(iso) - Date.now()) / 1000;
    for (const [unit, size] of [["year", 31536000], ["month", 2592000], ["day", 86400], ["hour", 3600], ["minute", 60]]) {
      if (Math.abs(secs) >= size) return rtf.format(Math.round(secs / size), unit);
    }
    return "just now";
  };
  const updated = window.ANIME.updated
    ? `Your list was last read from MyAnimeList ${ago(window.ANIME.updated)}${window.ANIME.source === "export" ? " (from an export file)" : ""}.`
    : "";
  if (updated) {
    syncBtn.dataset.tip = updated;
    document.querySelector(".list-updated").textContent = updated;
  }

  const showSync = (heading, body, actions = "") => {
    syncBox.innerHTML = `
      <h2 id="sync-title" tabindex="-1">${heading}</h2>
      <div class="sync-body">${body}</div>
      <div class="sync-actions">${actions}<button type="button" class="btn btn-alt" data-sync-close>Close</button></div>`;
    if (!syncBox.open) syncBox.showModal();
    syncBox.querySelector("#sync-title").focus();
  };
  syncBox.addEventListener("click", (e) => {
    if (e.target === syncBox || e.target.closest("[data-sync-close]")) syncBox.close();
    else if (e.target.closest("[data-sync-again]")) startSync();
    else if (e.target.closest("[data-id]")) syncBox.close(); // a poster opens the detail view instead
  });

  const noServer = () => showSync("Sync needs the local server", `
    <p>MyAnimeList doesn't let web pages read your list, so a small program on your computer fetches it instead.
      Close this tab, then in the project folder run:</p>
    <pre><code>python3 scripts/serve.py</code></pre>
    <p>That opens the site at <b>localhost:8000</b>, where Sync works. Your list needs to be public on MyAnimeList.</p>
    ${updated ? `<p class="pair-meta">${esc(updated)}</p>` : ""}`);

  let polling;
  async function startSync() {
    if (location.protocol === "file:") return noServer();
    let res;
    try { res = await fetch("api/sync", { method: "POST" }); } catch { return noServer(); }
    if (res.status !== 202 && res.status !== 409) return noServer(); // a plain file server, not serve.py
    showProgress(await res.json());
    clearInterval(polling);
    polling = setInterval(async () => {
      try { showProgress(await (await fetch("api/sync")).json()); }
      catch { clearInterval(polling); showSync("Sync didn't finish", "<p>Lost touch with the local server. Check that scripts/serve.py is still running.</p>"); }
    }, 700);
  }

  function showProgress(s) {
    if (s.state === "done") {
      clearInterval(polling);
      sessionStorage.setItem(RESULT_KEY, JSON.stringify(s.result));
      location.reload();
    } else if (s.state === "error") {
      clearInterval(polling);
      showSync("Sync didn't finish", `<p>${esc(s.error)}</p><p class="pair-meta">Nothing on the site was changed.</p>`,
        `<button type="button" class="btn" data-sync-again>Try again</button>`);
    } else if (!syncBox.querySelector(".sync-log")) {
      showSync("Syncing with MyAnimeList", `<p>Reading your list and looking up anything new. The page reloads when it's done.</p>
        <ol class="sync-log" aria-live="polite"></ol>`);
    }
    const log = syncBox.querySelector(".sync-log");
    if (log) log.innerHTML = (s.log.length ? s.log : ["Starting…"]).map((l) => `<li>${esc(l)}</li>`).join("");
  }

  /* After the reload: what changed since the last sync. */
  function showResult(r) {
    const posters = (list) => `<div class="sync-posters">${list.map((x) => byId.get(x.id)).filter(Boolean)
      .map((a) => `<span data-tip="${esc(title(a))}">${Lib.poster(a, { size: "sm" })}</span>`).join("")}</div>`;
    const names = (list, fn = (x) => esc(byId.get(x.id) ? title(byId.get(x.id)) : x.title)) =>
      `<ul class="sync-list">${list.slice(0, 12).map((x) => `<li>${fn(x)}</li>`).join("")}${list.length > 12 ? `<li>and ${list.length - 12} more</li>` : ""}</ul>`;
    const sections = [
      r.added.length && `<h3>Added <small>${r.added.length}</small></h3>${posters(r.added.slice(0, 16))}`,
      r.finished.length && `<h3>Finished <small>${r.finished.length}</small></h3>${posters(r.finished.slice(0, 16))}`,
      r.rescored.length && `<h3>Rescored <small>${r.rescored.length}</small></h3>${names(r.rescored, (x) => `${esc(title(byId.get(x.id) || { t: x.title }))}: ${x.from || "unscored"} to <b>${x.to || "unscored"}</b>`)}`,
      r.progress.length && `<h3>Watched more of <small>${r.progress.length}</small></h3>${names(r.progress, (x) => `${esc(title(byId.get(x.id) || { t: x.title }))}: episode ${x.from} to <b>${x.to}</b>`)}`,
      r.removed.length && `<h3>Removed <small>${r.removed.length}</small></h3>${names(r.removed)}`,
    ].filter(Boolean);
    showSync(sections.length ? "Synced. Here's what changed" : "Synced. Nothing new",
      `<p>${num(r.total)} titles read from ${esc(r.user)}'s MyAnimeList. ${sections.length ? "" : "Your list matches what the site already had, and airing shows have fresh dates."}</p>
       ${sections.join("")}`);
  }

  syncBtn.addEventListener("click", startSync);
  const pending = sessionStorage.getItem(RESULT_KEY);
  if (pending) {
    sessionStorage.removeItem(RESULT_KEY);
    try { showResult(JSON.parse(pending)); } catch { /* an unreadable result is not worth an error */ }
  }

  /* ---------- Easter egg: type "dattebayo" anywhere ---------- */
  const SECRET = "dattebayo";
  let typed = "";
  document.addEventListener("keydown", (e) => {
    if (typing(e.target) || e.key.length !== 1) return;
    typed = (typed + e.key.toLowerCase()).slice(-SECRET.length);
    if (typed !== SECRET) return;
    typed = "";
    const burst = document.createElement("div");
    burst.className = "egg";
    burst.setAttribute("role", "status");
    burst.innerHTML = `<div class="speedlines" aria-hidden="true"></div><p>Dattebayo!</p>`;
    document.body.append(burst);
    setTimeout(() => burst.remove(), 1800);
  });
})();
