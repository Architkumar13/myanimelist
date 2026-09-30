/* Higher or lower, two ways: your score vs your score, or your score vs the crowd's. */
const Game = (() => {
  const { esc, title } = Lib;
  const pool = window.ANIME.items.filter((a) => a.s > 0 && a.img);
  const crowdPool = pool.filter((a) => a.crowd && a.s !== a.crowd);
  const MODES = {
    self: { label: "You vs you", best: "archit13-hol-best", rules: "Here's one you scored. Did you rate the next one higher or lower? Ties never come up." },
    crowd: { label: "You vs the crowd", best: "archit13-hol-crowd-best", rules: "Here's the AniList crowd's score. Did you rate it higher or lower than they did?" },
  };

  let mode = "self", left, right, streak, locked;
  const best = () => +localStorage.getItem(MODES[mode].best) || 0;
  const any = (list) => list[Math.floor(Math.random() * list.length)];
  const pickOther = (a) => {
    let b;
    do b = any(pool);
    while (b.s === a.s || b.id === a.id);
    return b;
  };

  const card = (a, revealed, side, crowd = false) => `
    <figure class="hol-card ${side}" style="--tint:${a.col || "#999"}">
      <img src="${esc(a.big || a.img)}" alt="">
      ${crowd ? `<p class="hol-crowd"><small>Crowd</small>${a.crowd}</p>` : ""}
      <figcaption>
        <span class="hol-title">${esc(title(a))}</span>
        <span class="hol-score ${revealed ? "" : "is-hidden"}" aria-live="polite">${revealed ? a.s : "?"}</span>
      </figcaption>
    </figure>`;

  function render(main) {
    main.innerHTML = `
      <section class="hol hol-mode-${mode}">
        <h1 class="page-title">Higher or lower</h1>
        <fieldset class="tabs hol-modes"><legend class="sr-only">Mode</legend>
          ${Object.entries(MODES).map(([k, m]) => `<label><input type="radio" name="mode" value="${k}" ${k === mode ? "checked" : ""}><span>${m.label}</span></label>`).join("")}
        </fieldset>
        <p class="hol-rules">${MODES[mode].rules}</p>
        <p class="hol-status"><span>Streak <b class="hol-streak">0</b></span><span>Best <b class="hol-best">${best()}</b></span></p>
        <div class="hol-stage"></div>
        <div class="hol-controls"></div>
      </section>`;
    main.querySelector(".hol-modes").addEventListener("change", (e) => { mode = e.target.value; Lib.stopTimers(); render(main); });
    start(main);
  }

  function start(main) {
    streak = 0;
    if (mode === "crowd") right = any(crowdPool);
    else { left = any(pool); right = pickOther(left); }
    draw(main);
  }

  function draw(main, reveal = false) {
    main.querySelector(".hol-streak").textContent = streak;
    main.querySelector(".hol-best").textContent = best();
    main.querySelector(".hol-stage").innerHTML = mode === "crowd"
      ? card(right, reveal, "is-right", true)
      : `${card(left, true, "is-left")}<p class="hol-vs" aria-hidden="true">vs</p>${card(right, reveal, "is-right")}`;
    if (reveal) return;
    locked = false;
    main.querySelector(".hol-controls").innerHTML = `
      <p class="hol-question">${mode === "crowd"
        ? `The crowd gave <b>${esc(title(right))}</b> a ${right.crowd}. You gave it…`
        : `You gave <b>${esc(title(left))}</b> a ${left.s}. <b>${esc(title(right))}</b> got…`}</p>
      <button class="btn" data-guess="higher">Higher</button>
      <button class="btn btn-alt" data-guess="lower">Lower</button>`;
    main.querySelectorAll("[data-guess]").forEach((b) => b.addEventListener("click", () => guess(main, b.dataset.guess)));
    if (streak > 0) main.querySelector("[data-guess]").focus({ preventScroll: true });
  }

  function guess(main, dir) {
    if (locked) return;
    locked = true;
    const against = mode === "crowd" ? right.crowd : left.s;
    const correct = dir === (right.s > against ? "higher" : "lower");
    draw(main, true);
    main.querySelector(".is-right").classList.add(correct ? "is-right-answer" : "is-wrong-answer");
    const controls = main.querySelector(".hol-controls");
    const gap = mode === "crowd" ? ` That's ${Math.abs(right.s - right.crowd).toFixed(1)} ${right.s > right.crowd ? "above" : "below"} the crowd.` : "";
    if (correct) {
      streak += 1;
      if (streak > best()) localStorage.setItem(MODES[mode].best, streak);
      main.querySelector(".hol-streak").textContent = streak;
      main.querySelector(".hol-best").textContent = best();
      controls.innerHTML = `<p class="hol-question">Correct, you gave it a ${right.s}.${gap}</p>`;
      Lib.later(() => {
        if (mode === "crowd") right = any(crowdPool);
        else { left = right; right = pickOther(left); }
        draw(main);
      }, 1300);
    } else {
      controls.innerHTML = `
        <p class="hol-question">You gave it a ${right.s}.${gap} Streak over at ${streak}.</p>
        <button class="btn" data-again>Play again</button>`;
      controls.querySelector("[data-again]").addEventListener("click", () => start(main));
      controls.querySelector("[data-again]").focus();
    }
  }

  return { render };
})();
