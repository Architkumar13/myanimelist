/* Pick for me: spin a reel over the plan-to-watch list, weighted toward genres you rate well. */
const Pick = (() => {
  const { esc, title, poster, shuffle } = Lib;
  const S = Stats;
  const baseline = S.avgScore(S.seen);

  const LENGTHS = {
    any: { label: "Any length", test: () => true },
    short: { label: "Short, 13 eps or fewer", test: (a) => a.type !== "Movie" && a.eps > 0 && a.eps <= 13 },
    long: { label: "A long one, 24+ eps", test: (a) => a.eps >= 24 },
    movie: { label: "A movie tonight", test: (a) => a.type === "Movie" },
  };
  let length = "any";

  /* The last 10 spins, newest first, kept in this browser. */
  const HISTORY_KEY = "archit13-pick-history";
  const history = () => JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]").filter((h) => Lib.byId.has(h.id));
  const remember = (a) => localStorage.setItem(HISTORY_KEY, JSON.stringify([{ id: a.id, at: Date.now() }, ...history()].slice(0, 10)));
  const ago = (ms) => {
    const m = Math.round((Date.now() - ms) / 60000);
    if (m < 1) return "just now";
    if (m < 60) return `${m} min ago`;
    const h = Math.round(m / 60);
    if (h < 24) return `${h} hour${h > 1 ? "s" : ""} ago`;
    const d = Math.round(h / 24);
    return `${d} day${d > 1 ? "s" : ""} ago`;
  };

  /* How much you tend to like this title's genres, relative to your average. */
  const affinity = (a) => {
    const known = a.g.map((g) => S.genreAvg.get(g)).filter((g) => g && g.n >= 5);
    if (!known.length) return { lift: 0, best: null };
    const lift = known.reduce((s, g) => s + g.avg, 0) / known.length - baseline;
    const best = known.slice().sort((x, y) => y.avg - x.avg)[0];
    return { lift, best };
  };
  const weight = (a) => Math.exp(affinity(a).lift * 4) * (a.crowd ? a.crowd / 7 : 1);

  const weightedPick = (list) => {
    const total = list.reduce((s, a) => s + weight(a), 0);
    let r = Math.random() * total;
    for (const a of list) if ((r -= weight(a)) <= 0) return a;
    return list[list.length - 1];
  };

  const candidates = () => S.plan.filter((a) => a.img && LENGTHS[length].test(a));

  function render(main) {
    main.innerHTML = `
      <section class="pick">
        <h1 class="page-title">Pick for me</h1>
        <p class="pick-intro">Spin the reel over your ${S.plan.length} plan-to-watch titles. It leans toward genres you usually score highly.</p>
        <fieldset class="tabs pick-lengths">
          <legend class="sr-only">Length</legend>
          ${Object.entries(LENGTHS).map(([k, l]) => `
            <label><input type="radio" name="len" value="${k}" ${k === length ? "checked" : ""}>
            <span>${l.label} <small>${S.plan.filter((a) => a.img && l.test(a)).length}</small></span></label>`).join("")}
        </fieldset>
        <div class="reel" data-no-detail><div class="reel-strip"></div><div class="reel-marker" aria-hidden="true"></div></div>
        <p><button class="btn btn-spin">Spin</button></p>
        <div class="pick-result" aria-live="polite"></div>
        <section class="pick-history" aria-labelledby="ph-title"></section>
      </section>`;

    main.querySelector(".pick-lengths").addEventListener("change", (e) => {
      length = e.target.value;
      idle(main);
    });
    main.querySelector(".btn-spin").addEventListener("click", () => spin(main));
    idle(main);
    drawHistory(main);
  }

  function idle(main) {
    const list = shuffle(candidates()).slice(0, 12);
    const strip = main.querySelector(".reel-strip");
    strip.style.transition = "none";
    strip.style.transform = "translateX(0)";
    strip.innerHTML = list.map((a) => poster(a, { badge: false })).join("");
    main.querySelector(".btn-spin").disabled = !list.length;
    main.querySelector(".pick-result").innerHTML = list.length ? "" : `<p>No titles of that length on your list. Try another length.</p>`;
  }

  function spin(main) {
    const list = candidates();
    if (!list.length) return;
    const chosen = weightedPick(list);
    const LAND = 30;
    const reel = shuffle(list).slice(0, LAND + 10);
    while (reel.length < LAND + 10) reel.push(...shuffle(list));
    reel[LAND] = chosen;

    const strip = main.querySelector(".reel-strip");
    const btn = main.querySelector(".btn-spin");
    btn.disabled = true;
    main.querySelector(".pick-result").innerHTML = "";
    strip.style.transition = "none";
    strip.style.transform = "translateX(0)";
    strip.innerHTML = reel.slice(0, LAND + 10).map((a) => poster(a, { badge: false })).join("");

    const cell = strip.children[LAND];
    const offset = cell.offsetLeft + cell.offsetWidth / 2 - strip.parentElement.clientWidth / 2;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(() => {
      strip.style.transition = reduced ? "none" : "transform 3s cubic-bezier(.12,.8,.18,1)";
      strip.style.transform = `translateX(${-offset}px)`;
    });
    Lib.later(() => {
      cell.classList.add("is-chosen");
      btn.disabled = false;
      btn.textContent = "Spin again";
      showResult(main, chosen);
    }, reduced ? 0 : 3050);
  }

  function drawHistory(main) {
    const box = main.querySelector(".pick-history");
    const h = history();
    box.innerHTML = h.length ? `
      <h2 id="ph-title">Your last spins</h2>
      <ol class="ph-list">${h.map(({ id, at }) => {
        const a = Lib.byId.get(id);
        return `<li>${poster(a, { size: "sm", badge: false })}<p><b>${esc(title(a))}</b><br>${ago(at)}${a.st !== "Plan to Watch" ? `, now ${esc(Lib.statusLabel[a.st].toLowerCase())}` : ""}</p></li>`;
      }).join("")}</ol>
      <button class="btn-quiet" data-clear-history>Clear history</button>` : "";
    box.querySelector("[data-clear-history]")?.addEventListener("click", () => { localStorage.removeItem(HISTORY_KEY); drawHistory(main); });
  }

  function showResult(main, a) {
    remember(a);
    drawHistory(main);
    const { best } = affinity(a);
    const why = best
      ? `You've watched ${best.n} ${esc(best.name.toLowerCase())} titles and they average ${best.avg.toFixed(1)} from you.`
      : "A wildcard: nothing else on your list looks like it.";
    main.querySelector(".pick-result").innerHTML = `
      <div class="result">
        ${poster(a, { badge: false })}
        <div>
          <h2>${esc(title(a))}</h2>
          <p class="result-meta">${[a.type, a.eps && `${a.eps} ep${a.eps > 1 ? "s" : ""}`, a.year, a.crowd && `crowd ${a.crowd}`].filter(Boolean).join(", ")}</p>
          <p>${why}</p>
          ${a.syn ? `<p class="result-syn">${esc(a.syn)}</p>` : ""}
          <p><a href="${Lib.malUrl(a)}" target="_blank" rel="noopener">Open on MyAnimeList</a></p>
        </div>
      </div>`;
  }

  return { render };
})();
