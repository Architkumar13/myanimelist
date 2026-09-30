/* The Wrapped page: the whole list told as one manga page of panels. */
const Wrapped = (() => {
  const { esc, num, title, poster } = Lib;
  const S = Stats;

  /* Horizontal bars, one series. rows: {label, value, tip} */
  const bars = (rows, { unit = "" } = {}) => {
    const max = Math.max(...rows.map((r) => r.value));
    return `<ul class="bars">${rows.map((r) => `
      <li tabindex="0" data-tip="${esc(r.tip)}">
        <span class="bars-label">${esc(r.label)}</span>
        <span class="bars-track"><span class="bars-fill" style="--w:${(r.value / max) * 100}%"></span></span>
        <span class="bars-value">${num(r.value)}${unit}</span>
      </li>`).join("")}</ul>`;
  };

  /* Vertical columns, one series. */
  const columns = (rows, caption) => {
    const max = Math.max(...rows.map((r) => r.value));
    return `<figure class="cols" style="--count:${rows.length}">
      <div class="cols-plot">${rows.map((r) => `
        <div class="cols-col ${r.hot ? "is-hot" : ""}" tabindex="0" data-tip="${esc(r.tip)}">
          <span class="cols-value">${r.value ? num(r.value) : ""}</span>
          <span class="cols-bar" style="--h:${(r.value / max) * 100}%"></span>
          <span class="cols-label">${esc(r.label)}</span>
        </div>`).join("")}</div>
      <figcaption>${caption}</figcaption>
    </figure>`;
  };

  /* You-vs-crowd dot plot on a shared 1–10 scale. */
  const gapPlot = (rows) => `
    <div class="gap">
      <p class="gap-legend"><span class="key-you"></span>You <span class="key-crowd"></span>AniList crowd</p>
      <ul>${rows.map(({ a }) => {
        const lo = Math.min(a.s, a.crowd), hi = Math.max(a.s, a.crowd);
        return `<li tabindex="0" data-tip="<b>${esc(title(a))}</b><br>You ${a.s}, crowd ${a.crowd}">
          <span class="gap-title">${esc(title(a))}</span>
          <span class="gap-track">
            <span class="gap-span" style="--l:${(lo - 1) / 9 * 100}%;--r:${(hi - 1) / 9 * 100}%"></span>
            <span class="gap-dot crowd" style="--x:${(a.crowd - 1) / 9 * 100}%"></span>
            <span class="gap-dot you" style="--x:${(a.s - 1) / 9 * 100}%"></span>
          </span>
        </li>`;
      }).join("")}</ul>
      <p class="gap-axis"><span>1</span><span>5</span><span>10</span></p>
    </div>`;

  const balloon = (text, cls = "") => `<p class="balloon ${cls}">${text}</p>`;
  const chapter = (n, cls, heading, body) => `
    <section class="panel ${cls}" aria-labelledby="ch-${n}">
      <p class="panel-no">Ch. ${n}</p>
      <h2 id="ch-${n}">${heading}</h2>
      ${body}
    </section>`;

  function render(main) {
    const days = S.days;
    const heroCovers = S.tens.filter((a) => a.big || a.img).slice(-9).reverse();
    const [you, ...rest] = S.archetypes;
    const topGenre = S.genres[0];
    const [tenKey, tenList] = S.tenFranchises[0];
    const tenLabel = tenList.map((a) => a.en).find(Boolean)?.split(":")[0] || tenKey;
    const loyal = S.franchises[0];
    const studioRows = S.studios.slice(0, 6);
    const hotDrop = S.dropRates[0];
    const recent = S.finishes.slice(0, 6);
    const thisYear = S.finishYears[S.finishYears.length - 1];
    const gem = S.gem;
    const onePanel = loyal.items.length === 1;

    main.innerHTML = `
    <article class="wrapped">
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-burst">
          <div class="speedlines" aria-hidden="true"></div>
          <p class="hero-kicker">${esc(S.user)}, you have spent</p>
          <h1 id="hero-title"><span class="hero-num" data-count="${days.toFixed(0)}">${days.toFixed(0)}</span> <span class="hero-unit">days</span></h1>
          <p class="hero-sub">watching anime. That's ${num(S.episodes)} episodes across ${num(S.all.length)} titles, or about ${(days / 365).toFixed(2).replace(/0$/, "")} years without sleep.</p>
          <p class="hero-save"><button class="btn" data-save-card>Save my Wrapped</button></p>
        </div>
        <div class="hero-strip" aria-hidden="true" data-no-detail>
          ${heroCovers.map((a) => `<div class="hero-cell" style="--tint:${a.col || "#999"}"><img src="${esc(a.big || a.img)}" alt=""></div>`).join("")}
        </div>
      </section>

      <div class="page">
        ${chapter(1, "p-type", `You are ${esc(you.name.toLowerCase())}`, `
          ${balloon(esc(you.blurb), "big")}
          <p class="panel-note">${num(you.n)} of the ${num(S.seen.length)} titles you've watched fit this. You also have a streak of:</p>
          ${bars(rest.slice(0, 4).map((t) => ({ label: t.name.replace(/^The /, ""), value: t.n, tip: `<b>${esc(t.name)}</b><br>${t.n} titles, you average ${(S.avgScore(S.seen) + t.lift).toFixed(1)}` })))}
        `)}

        ${chapter(2, "p-genres", `${esc(topGenre.name)} is home. ${esc(S.favGenre.name)} gets your best scores.`, `
          ${bars(S.genres.slice(0, 10).map((g) => ({ label: g.name, value: g.n, tip: `<b>${esc(g.name)}</b><br>${g.n} titles watched<br>Your average: ${g.avg.toFixed(2)}` })))}
          <p class="panel-note">Titles watched per genre. A title can count in several genres. Your ${esc(S.favGenre.name.toLowerCase())} picks average ${S.favGenre.avg.toFixed(2)}, the highest of any genre you've watched 15 or more of.</p>
        `)}

        ${chapter(3, "p-tens", `${S.tens.length} perfect scores`, `
          ${balloon(`${esc(tenLabel)} takes ${tenList.length} of them. No notes.`)}
          <div class="tens">${S.tens.map((a) => poster(a, { badge: false })).join("")}</div>
        `)}

        ${chapter(4, "p-takes", "Your hottest takes", `
          <div class="takes">
            <div>
              <h3>You loved them. The crowd didn't.</h3>
              ${gapPlot(S.loved)}
            </div>
            <div>
              <h3>The crowd liked them. You didn't.</h3>
              ${gapPlot(S.hated)}
            </div>
          </div>
          <p class="panel-note">Across everything you've scored, you rate ${Math.abs(S.kinder).toFixed(1)} points ${S.kinder >= 0 ? "kinder" : "harsher"} than AniList's average.</p>
        `)}

        ${chapter(5, "p-long", "The long haul", `
          ${balloon(`${num(loyal.eps)} episodes of ${esc(loyal.label)}${onePanel ? "" : ` across ${loyal.items.length} entries`}. That's ${(loyal.mins / 1440).toFixed(0)} days of your life, and you'd do it again.`)}
          ${bars(S.franchises.slice(0, 7).map((f) => ({ label: f.label, value: f.eps, tip: `<b>${esc(f.label)}</b><br>${num(f.eps)} episodes, ${f.items.length} entr${f.items.length > 1 ? "ies" : "y"}` })), { unit: " eps" })}
          <p class="panel-note">Longest series you've finished: ${esc(title(S.longest))}, ${num(S.longest.w)} episodes.</p>
        `)}

        ${chapter(6, "p-studios", "The studios on speed dial", `
          <ol class="studios">${studioRows.map((s) => `
            <li>
              <p><b>${esc(s.name)}</b> ${s.n} titles, average ${s.avg.toFixed(1)}</p>
              <div class="studio-strip">${s.items.slice().sort((x, y) => y.s - x.s).slice(0, 4).map((a) => poster(a, { size: "sm" })).join("")}</div>
            </li>`).join("")}</ol>
        `)}

        ${chapter(7, "p-eras", `A ${S.topDecade.name}s kid`, columns(
          S.decades.map((d) => ({ label: `${String(d.name).slice(2)}s`, value: d.n, hot: d === S.topDecade, tip: `<b>${d.name}s</b><br>${d.n} completed<br>Your average: ${d.avg.toFixed(2)}` })),
          "Completed titles by the decade they first aired.",
        ))}

        ${chapter(8, "p-scores", `${S.modeScore.score} is your default`, `
          ${columns(S.scoreDist.map((d) => ({ label: d.score, value: d.n, hot: d.score === S.modeScore.score, tip: `<b>Rated ${d.score}</b><br>${d.n} titles` })), `How you've scored ${num(S.scored.length)} titles.`)}
          ${balloon(`${S.scoreDist[0].n} titles got a 1. We don't talk about those.`, "small")}
        `)}

        ${chapter(9, "p-drops", `${S.dropped.length} titles dropped`, `
          <p class="panel-note">${esc(hotDrop.name)} is the genre you give up on most: ${(hotDrop.rate * 100).toFixed(0)}% of the ${hotDrop.n} you started never got finished.</p>
          <div class="drops">${S.dropped.filter((a) => a.img).slice(0, 8).map((a) => poster(a, { size: "sm", badge: false })).join("")}</div>
        `)}

        ${gem ? chapter(10, "p-gem", "Hidden gem", `
          <div class="gem">
            ${poster(gem)}
            <div>
              <h3>${esc(title(gem))}</h3>
              <p>Only ${num(gem.pop)} people have this on their AniList. You gave it a ${gem.s}.</p>
            </div>
          </div>
        `) : ""}

        ${chapter(11, "p-recent", `${thisYear.n} finished in ${thisYear.name} so far`, `
          ${columns(S.finishYears.map((y) => ({ label: `'${y.name.slice(2)}`, value: y.n, hot: y === thisYear, tip: `<b>${y.name}</b><br>${y.n} finished` })), "Titles finished per year, where you logged a finish date.")}
          <div class="recent">${recent.map((a) => poster(a, { size: "sm" })).join("")}</div>
        `)}

        ${chapter(12, "p-next", "To be continued", `
          ${balloon(`${S.plan.length} titles on your plan-to-watch list and ${S.watching.length} in progress.`, "big")}
          <p class="next-links">
            <a class="btn" href="#/unfinished">See my unfinished business</a>
            <a class="btn btn-alt" href="#/foryou">What should I watch?</a>
            <a class="btn btn-alt" href="#/guess">Test my memory</a>
            <button class="btn btn-alt" data-save-card>Save my Wrapped</button>
          </p>
        `)}
      </div>
    </article>`;

    countUp(main.querySelector(".hero-num"));
    main.querySelectorAll("[data-save-card]").forEach((b) => b.addEventListener("click", () => saveCard(b)));
  }

  /* A 1080×1350 summary card, drawn in the day palette whichever edition is showing. */
  async function saveCard(btn) {
    const label = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Drawing…";
    const W = 1080, H = 1350, P = 64;
    const c = Object.assign(document.createElement("canvas"), { width: W, height: H });
    const g = c.getContext("2d");
    await document.fonts.ready;
    const covers = S.tens.filter((a) => a.img).slice(-6).reverse();
    const imgs = await Promise.all(covers.map((a) => Lib.loadImage(a.big || a.img).catch(() => null)));
    const DISPLAY = "'Dela Gothic One'", BODY = "'Zen Kaku Gothic New'";
    const box = (x, y, w, h, fill = "#fbfcf8") => { g.fillStyle = "#000"; g.fillRect(x, y, w, h); g.fillStyle = fill; g.fillRect(x + 4, y + 4, w - 8, h - 8); };

    g.fillStyle = "#e9ece4"; g.fillRect(0, 0, W, H);
    // masthead
    g.fillStyle = "#000"; g.font = `58px ${DISPLAY}`; g.fillText(S.user, P, 110);
    const nameW = g.measureText(S.user).width;
    g.save(); g.translate(P + nameW + 18, 92); g.rotate(-0.07);
    g.fillStyle = "#e4007f"; g.fillRect(0, -30, 128, 42);
    g.fillStyle = "#fff"; g.font = `700 26px ${BODY}`; g.fillText("weekly", 16, 0); g.restore();
    g.fillRect(P, 140, W - P * 2, 5);

    // the big number, with misregistered plates
    box(P, 180, W - P * 2, 380);
    g.save(); g.beginPath(); g.rect(P + 4, 184, W - P * 2 - 8, 372); g.clip();
    g.translate(W / 2, 370); g.strokeStyle = "rgba(0,0,0,.55)"; g.lineWidth = 3;
    for (let i = 0; i < 72; i++) { g.rotate(Math.PI / 36); g.beginPath(); g.moveTo(230, 0); g.lineTo(900, 0); g.stroke(); }
    g.restore();
    // small text sits on paper patches so the speed lines don't run through it
    const patch = (text, x, y, size) => { g.fillStyle = "#fbfcf8"; g.fillRect(x - 10, y - size, g.measureText(text).width + 20, size * 1.45); g.fillStyle = "#000"; g.fillText(text, x, y); };
    g.font = `700 32px ${BODY}`; patch(`${S.user}, you have spent`, P + 40, 250, 32);
    const big = String(Math.round(S.days));
    g.font = `230px ${DISPLAY}`;
    [["#00a0e9", -8, -6], ["#e4007f", 12, 9], ["#000", 0, 0]].forEach(([col, dx, dy]) => { g.fillStyle = col; g.fillText(big, P + 34 + dx, 470 + dy); });
    const bigW = g.measureText(big).width;
    g.font = `80px ${DISPLAY}`; g.fillStyle = "#e4007f"; g.fillText("days", P + 60 + bigW + 5, 470 + 4); g.fillStyle = "#000"; g.fillText("days", P + 60 + bigW, 470);
    g.font = `500 30px ${BODY}`; patch(`watching anime. ${num(S.episodes)} episodes, ${num(S.all.length)} titles.`, P + 40, 525, 30);

    // three facts
    const facts = [["You are", S.archetypes[0].name.replace(/^The /, "the ")], ["Home genre", S.genres[0].name], ["Studio on speed dial", S.studios[0].name]];
    const fw = (W - P * 2 - 32) / 3;
    facts.forEach(([k, v], i) => {
      const x = P + i * (fw + 16);
      box(x, 590, fw, 170, i === 0 ? "#ffe100" : "#fbfcf8");
      g.fillStyle = "#000"; g.font = `700 24px ${BODY}`; g.fillText(k, x + 24, 636);
      g.font = `34px ${DISPLAY}`;
      wrap(g, v, x + 24, 686, fw - 48, 40, 2);
    });

    // perfect scores
    g.fillStyle = "#000"; g.font = `40px ${DISPLAY}`; g.fillText(`${S.tens.length} perfect scores`, P, 830);
    const cw = (W - P * 2 - 5 * 14) / 6, ch = cw * 1.5;
    covers.forEach((a, i) => {
      const x = P + i * (cw + 14), y = 855;
      box(x, y, cw, ch, a.col || "#999");
      const img = imgs[i];
      if (img) {
        const sc = Math.max((cw - 8) / img.width, (ch - 8) / img.height);
        const sw = (cw - 8) / sc, sh = (ch - 8) / sc;
        g.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, x + 4, y + 4, cw - 8, ch - 8);
      }
    });

    // hottest take
    const take = S.loved[0].a;
    box(P, 1130, W - P * 2, 120);
    g.fillStyle = "#000"; g.font = `700 24px ${BODY}`; g.fillText("Hottest take", P + 28, 1172);
    g.font = `32px ${DISPLAY}`; wrap(g, `${title(take)}: you ${take.s}, crowd ${take.crowd}`, P + 28, 1218, W - P * 2 - 56, 36, 1);
    g.fillStyle = "#4d524c"; g.font = `500 22px ${BODY}`; g.fillText("Made with archit13 weekly, from a MyAnimeList export", P, H - 50);

    Lib.download(`${S.user}-wrapped.png`, c.toDataURL("image/png"));
    btn.disabled = false;
    btn.textContent = label;
  }

  /* Fill text over up to `lines` lines, ending with an ellipsis if it doesn't fit. */
  function wrap(g, text, x, y, maxW, lh, lines) {
    const words = text.split(" ");
    let line = "", n = 0;
    for (let i = 0; i < words.length; i++) {
      const test = line ? `${line} ${words[i]}` : words[i];
      if (g.measureText(test).width > maxW && line) {
        if (n === lines - 1) { while (g.measureText(line + "…").width > maxW) line = line.slice(0, -1); g.fillText(line + "…", x, y + n * lh); return; }
        g.fillText(line, x, y + n * lh); n += 1; line = words[i];
      } else line = test;
    }
    g.fillText(line, x, y + n * lh);
  }

  /* The page's one orchestrated moment: the day count ticks up. */
  function countUp(el) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = +el.dataset.count;
    const start = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - start) / 1400);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  return { render };
})();
