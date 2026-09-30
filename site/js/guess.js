/* Guess the anime: a pixelated poster sharpens (or a redacted synopsis unfolds) until you name it. */
const Guess = (() => {
  const { esc, title, loadImage, seeded, shuffleWith } = Lib;
  const ROUNDS_FOR = { poster: 10, synopsis: 10, daily: 5 };
  const PIXELS = [7, 11, 18, 30, 56];      // blocks across, per clue level
  const BEST_KEY = "archit13-guess-best-";
  const E = window.EXTRA;

  const seen = Stats.seen.filter((a) => a.img);
  const synopsisPool = seen.filter((a) => a.syn.length > 160);
  let mode = "poster", round, score, level, answer, choices, done, rand = Math.random, pointsLog = [];
  const rounds = () => ROUNDS_FOR[mode];
  const isPoster = () => mode !== "synopsis";

  /* Daily challenge: seeded by today's local date, so the five puzzles hold all day. */
  const DAILY_KEY = "archit13-guess-daily";
  const dateKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const dailyLog = () => JSON.parse(localStorage.getItem(DAILY_KEY) || "{}");
  const dailyNumber = () => Math.floor((new Date(dateKey()) - new Date("2026-01-01")) / 86400000) + 1;
  const streak = () => {
    const log = dailyLog();
    const d = new Date();
    if (!(dateKey(d) in log)) d.setDate(d.getDate() - 1); // today not played yet: count up to yesterday
    let n = 0;
    while (dateKey(d) in log) { n += 1; d.setDate(d.getDate() - 1); }
    return n;
  };

  /* Hide the title and character names so the synopsis doesn't give itself away. */
  const STOP = new Set(["the", "and", "no", "wa", "ni", "wo", "to", "ga", "of", "season", "movie", "part", "final", "shin", "a"]);
  const redact = (a) => {
    const words = new Set();
    [a.t, a.en].join(" ").split(/[^\p{L}\p{N}]+/u).forEach((w) => w.length > 2 && !STOP.has(w.toLowerCase()) && words.add(w));
    (E?.cast[a.id] || []).forEach((c) => E.chars[c].n.split(/\s+/).forEach((w) => w.length > 2 && words.add(w)));
    let text = a.syn;
    [...words].sort((x, y) => y.length - x.length).forEach((w) => {
      text = text.replace(new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi"), "▇".repeat(Math.min(8, w.length)));
    });
    return text.match(/[^.!?]+[.!?]*\s*/g) || [text];
  };

  /* Decoys look like the answer (shared genres, similar era) but come from other franchises. */
  const pickChoices = (a) => {
    const key = (x) => title(x).split(/[:\s]/)[0].toLowerCase();
    const likeness = (x) => x.g.filter((g) => a.g.includes(g)).length * 2 - Math.abs((x.year || a.year) - a.year) / 4 + rand() * 2;
    const similar = shuffleWith(seen.filter((x) => x.id !== a.id && key(x) !== key(a))
      .map((x) => [x, likeness(x)]).sort((p, q) => q[1] - p[1]).slice(0, 12).map(([x]) => x), rand);
    const picked = [];
    for (const x of similar) if (picked.length < 3 && !picked.some((p) => key(p) === key(x))) picked.push(x);
    return shuffleWith([a, ...picked], rand);
  };

  const best = () => +localStorage.getItem(BEST_KEY + mode) || 0;

  function render(main) {
    main.innerHTML = `
      <section class="guess">
        <h1 class="page-title">Guess the anime</h1>
        <p class="lede">Every title comes from your own list. Every extra clue costs a point.</p>
        <fieldset class="tabs guess-modes"><legend class="sr-only">Mode</legend>
          <label><input type="radio" name="mode" value="poster" ${mode === "poster" ? "checked" : ""}><span>Pixelated poster</span></label>
          <label><input type="radio" name="mode" value="synopsis" ${mode === "synopsis" ? "checked" : ""}><span>Redacted synopsis</span></label>
          <label><input type="radio" name="mode" value="daily" ${mode === "daily" ? "checked" : ""}><span>Daily challenge <small>#${dailyNumber()}</small></span></label>
        </fieldset>
        <div class="guess-game"></div>
      </section>`;
    main.querySelector(".guess-modes").addEventListener("change", (e) => { mode = e.target.value; Lib.stopTimers(); start(main); });
    start(main);
  }

  function start(main) {
    round = 0; score = 0; pointsLog = [];
    if (mode === "daily" && dateKey() in dailyLog()) return finish(main, true);
    rand = mode === "daily" ? seeded(`archit13-${dateKey()}`) : Math.random;
    main._queue = shuffleWith(mode === "synopsis" ? synopsisPool : seen, rand).slice(0, rounds());
    next(main);
  }

  function next(main) {
    if (round >= rounds()) return finish(main);
    answer = main._queue[round];
    choices = pickChoices(answer);
    level = 0; done = false;
    const game = main.querySelector(".guess-game");
    game.innerHTML = `
      <p class="guess-status"><span>Round <b>${round + 1}</b>/${rounds()}</span><span>Score <b class="guess-score">${score}</b></span>${mode === "daily" ? `<span>Streak <b>${streak()}</b></span>` : `<span>Best <b>${best()}</b></span>`}</p>
      <div class="guess-stage">
        ${isPoster()
          ? `<div class="guess-canvas" style="--tint:${answer.col || "#999"}"><canvas width="300" height="450" aria-label="A pixelated poster"></canvas></div>`
          : `<blockquote class="guess-syn"></blockquote>`}
        <div class="guess-side">
          <p class="guess-worth">Worth <b>${PIXELS.length - level}</b> point${PIXELS.length - level > 1 ? "s" : ""}</p>
          <div class="guess-choices">${choices.map((c) => `<button class="choice" data-id="${c.id}">${esc(title(c))}</button>`).join("")}</div>
          <button class="btn-quiet" data-clue>Give me a clue (−1)</button>
          <p class="guess-feedback" aria-live="polite"></p>
        </div>
      </div>`;
    game.querySelector("[data-clue]").addEventListener("click", () => clue(main));
    game.querySelectorAll(".choice").forEach((b) => b.addEventListener("click", () => pick(main, +b.dataset.id)));
    main._sentences = isPoster() ? null : redact(answer);
    main._img = null;
    if (isPoster()) loadImage(answer.big || answer.img).then((img) => { main._img = img; draw(main); }).catch(() => {});
    draw(main);
  }

  function draw(main) {
    const game = main.querySelector(".guess-game");
    const last = level >= PIXELS.length - 1 || done;
    game.querySelector(".guess-worth b").textContent = PIXELS.length - level;
    game.querySelector("[data-clue]").hidden = last;
    if (!isPoster()) {
      const shown = done ? main._sentences.length : Math.min(main._sentences.length, level + 1);
      game.querySelector(".guess-syn").innerHTML = main._sentences.slice(0, shown).map(esc).join("") +
        (shown < main._sentences.length ? `<span class="more">…</span>` : "");
      return;
    }
    const img = main._img;
    const canvas = game.querySelector("canvas");
    if (!img || !canvas) return;
    const g = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const scale = Math.max(W / img.width, H / img.height);
    const sw = W / scale, sh = H / scale, sx = (img.width - sw) / 2, sy = (img.height - sh) / 2;
    if (done) { g.imageSmoothingEnabled = true; g.drawImage(img, sx, sy, sw, sh, 0, 0, W, H); return; }
    const bw = PIXELS[level], bh = Math.round(bw * 1.5);
    const tiny = Object.assign(document.createElement("canvas"), { width: bw, height: bh });
    tiny.getContext("2d").drawImage(img, sx, sy, sw, sh, 0, 0, bw, bh);
    g.imageSmoothingEnabled = false;
    g.drawImage(tiny, 0, 0, bw, bh, 0, 0, W, H);
  }

  function clue(main) {
    if (done || level >= PIXELS.length - 1) return;
    level += 1;
    draw(main);
  }

  function pick(main, id) {
    if (done) return;
    done = true;
    const right = id === answer.id;
    const points = right ? PIXELS.length - level : 0;
    score += points;
    pointsLog.push(points);
    const game = main.querySelector(".guess-game");
    game.querySelectorAll(".choice").forEach((b) => {
      b.disabled = true;
      if (+b.dataset.id === answer.id) b.classList.add("is-answer");
      else if (+b.dataset.id === id) b.classList.add("is-wrong");
    });
    game.querySelector(".guess-score").textContent = score;
    game.querySelector(".guess-feedback").innerHTML = `
      ${right ? `Yes! +${points}.` : `No, it's <b>${esc(title(answer))}</b>.`} You gave it ${answer.s || "no score"}.
      <br><button class="btn" data-next>${round + 1 >= rounds() ? "See my score" : "Next round"}</button>`;
    draw(main);
    const nextBtn = game.querySelector("[data-next]");
    nextBtn.addEventListener("click", () => { round += 1; next(main); });
    nextBtn.focus();
  }

  function finish(main, alreadyPlayed = false) {
    const max = rounds() * PIXELS.length;
    if (mode === "daily") return finishDaily(main, alreadyPlayed, max);
    const isBest = score > best();
    if (isBest) localStorage.setItem(BEST_KEY + mode, score);
    const verdict = score >= max * 0.8 ? "Walking MyAnimeList database." : score >= max * 0.55 ? "You know your list." :
      score >= max * 0.3 ? "Some of these blur together, huh." : "Did you watch these with your eyes closed?";
    main.querySelector(".guess-game").innerHTML = `
      <div class="guess-end">
        <p class="guess-final"><b>${score}</b><span>/ ${max}</span></p>
        <h2>${verdict}</h2>
        <p>${isBest ? "That's a new best." : `Your best in this mode is ${best()}.`}</p>
        <button class="btn" data-again>Play again</button>
      </div>`;
    main.querySelector("[data-again]").addEventListener("click", () => start(main));
  }

  /* One go per day. The result line uses squares so it can be pasted into a chat. */
  function finishDaily(main, alreadyPlayed, max) {
    const log = dailyLog();
    if (!alreadyPlayed) {
      log[dateKey()] = { score, points: pointsLog };
      localStorage.setItem(DAILY_KEY, JSON.stringify(log));
    }
    const today = log[dateKey()];
    const squares = today.points.map((p) => (p >= 4 ? "🟩" : p >= 2 ? "🟨" : p === 1 ? "🟧" : "⬛")).join("");
    const share = `archit13 weekly daily #${dailyNumber()}: ${today.score}/${max} ${squares}`;
    const game = main.querySelector(".guess-game");
    game.innerHTML = `
      <div class="guess-end">
        <p class="guess-final"><b>${today.score}</b><span>/ ${max}</span></p>
        <p class="daily-squares" aria-label="Points per round: ${today.points.join(", ")}">${squares}</p>
        <h2>${streak() > 1 ? `${streak()}-day streak.` : "Streak started."} Come back tomorrow.</h2>
        <p>Next daily in <b class="daily-count"></b>.</p>
        <p class="next-links">
          <button class="btn" data-copy>Copy my result</button>
          <button class="btn btn-alt" data-mode="poster">Play unlimited rounds</button>
        </p>
        <p class="copy-note" aria-live="polite"></p>
      </div>`;
    const tick = () => {
      const midnight = new Date(); midnight.setHours(24, 0, 0, 0);
      const s = Math.max(0, Math.floor((midnight - Date.now()) / 1000));
      const el = game.querySelector(".daily-count");
      if (el) el.textContent = `${Math.floor(s / 3600)}h ${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}m ${String(s % 60).padStart(2, "0")}s`;
    };
    tick();
    Lib.every(tick, 1000);
    game.querySelector("[data-copy]").addEventListener("click", () => {
      navigator.clipboard.writeText(share)
        .then(() => (game.querySelector(".copy-note").textContent = "Copied: " + share))
        .catch(() => (game.querySelector(".copy-note").textContent = share));
    });
    game.querySelector("[data-mode]").addEventListener("click", () => {
      mode = "poster";
      main.querySelector('.guess-modes input[value="poster"]').checked = true;
      Lib.stopTimers();
      start(main);
    });
  }

  return { render };
})();
