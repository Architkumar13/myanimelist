/* Now airing: a TV-guide week of upcoming episodes for shows on your list, loaded live from AniList. */
const Airing = (() => {
  const { esc, title, poster, every } = Lib;
  const E = window.EXTRA;
  const DAY = 86400;

  // Shows worth tracking: airing or announced, and not dropped.
  const tracked = window.ANIME.items.filter((a) => {
    const air = E.air[a.id];
    return air && ["RELEASING", "NOT_YET_RELEASED"].includes(air[1]) && a.st !== "Dropped";
  });

  /* Fallback when offline: roll the saved next-episode time forward week by week. */
  const cachedSchedule = () => {
    const now = Date.now() / 1000;
    return new Map(tracked.map((a) => {
      const [al, status, at, ep] = E.air[a.id];
      const eps = [];
      if (at) {
        let t = at, e = ep;
        if (status === "RELEASING") while (t < now) { t += 7 * DAY; e += 1; }
        for (let i = 0; i < 3; i++) eps.push({ airingAt: t + i * 7 * DAY, episode: e + i });
      }
      return [a.id, { status, episodes: a.eps, next: eps }];
    }));
  };

  async function liveSchedule() {
    const ids = tracked.map((a) => E.air[a.id][0]);
    const query = `query ($ids: [Int]) { Page(perPage: 50) { media(id_in: $ids) {
      id status episodes airingSchedule(notYetAired: true, perPage: 3) { nodes { airingAt episode } } } } }`;
    const res = await fetch("https://graphql.anilist.co", {
      method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ query, variables: { ids } }),
    });
    if (!res.ok) throw new Error(`AniList returned ${res.status}`);
    const media = (await res.json()).data.Page.media;
    const byAl = new Map(media.map((m) => [m.id, m]));
    return new Map(tracked.map((a) => {
      const m = byAl.get(E.air[a.id][0]);
      return [a.id, m ? { status: m.status, episodes: m.episodes || a.eps, next: m.airingSchedule.nodes } : cachedSchedule().get(a.id)];
    }));
  }

  const countdown = (secs) => {
    if (secs <= 0) return "Airing now";
    const d = Math.floor(secs / DAY), h = Math.floor((secs % DAY) / 3600), m = Math.floor((secs % 3600) / 60), s = Math.floor(secs % 60);
    return d ? `${d}d ${h}h ${m}m` : `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };
  const timeFmt = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" });
  const dayFmt = new Intl.DateTimeFormat(undefined, { weekday: "long" });
  const dateFmt = new Intl.DateTimeFormat(undefined, { day: "numeric", month: "short" });

  /* An .ics file for calendar apps. With a known episode count, a show becomes one weekly repeating
     event for its remaining episodes; otherwise each known upcoming episode is its own event. */
  const icsTime = (secs) => new Date(secs * 1000).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const icsText = (t) => t.replace(/[\\,;]/g, (c) => "\\" + c).replace(/\n/g, "\\n");
  function calendar(shows, schedule) {
    const now = icsTime(Date.now() / 1000);
    const events = [];
    for (const a of shows) {
      const sc = schedule.get(a.id);
      const next = (sc?.next || []).filter((n) => n.airingAt > Date.now() / 1000);
      if (!next.length) continue;
      const mins = a.dur || 24;
      const base = (n, extra = []) => [
        "BEGIN:VEVENT", `UID:${E.air[a.id][0]}-${n.episode}@archit13-weekly`, `DTSTAMP:${now}`,
        `DTSTART:${icsTime(n.airingAt)}`, `DTEND:${icsTime(n.airingAt + mins * 60)}`, ...extra,
        `URL:https://anilist.co/anime/${E.air[a.id][0]}`, "END:VEVENT"];
      const total = sc.episodes;
      if (total && total >= next[0].episode) {
        events.push(...base(next[0], [
          `SUMMARY:${icsText(title(a))} (new episode)`,
          `DESCRIPTION:${icsText(`Episodes ${next[0].episode} to ${total}, weekly.`)}`,
          `RRULE:FREQ=WEEKLY;COUNT=${total - next[0].episode + 1}`]));
      } else {
        next.forEach((n) => events.push(...base(n, [`SUMMARY:${icsText(`${title(a)} episode ${n.episode}`)}`])));
      }
    }
    const body = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//archit13 weekly//Now airing//EN", "CALSCALE:GREGORIAN", ...events, "END:VCALENDAR"].join("\r\n");
    return { count: events.filter((l) => l === "BEGIN:VEVENT").length, href: "data:text/calendar;charset=utf-8," + encodeURIComponent(body) };
  }

  function render(main) {
    main.innerHTML = `
      <section class="airing">
        <h1 class="page-title">Now airing</h1>
        <p class="lede air-source">Loading this week's schedule from AniList…</p>
        <div class="air-body"></div>
      </section>`;
    liveSchedule()
      .then((s) => draw(main, s, "Live from AniList, in your local time."))
      .catch(() => draw(main, cachedSchedule(), "Couldn't reach AniList, so these times are estimated from the last data refresh."));
  }

  function draw(main, schedule, source) {
    if (!main.querySelector(".airing")) return; // navigated away while loading
    const now = Date.now() / 1000;
    const slots = [];
    for (const a of tracked) for (const n of schedule.get(a.id)?.next || []) slots.push({ a, ...n });
    slots.sort((x, y) => x.airingAt - y.airingAt);

    const today = new Date(); today.setHours(0, 0, 0, 0);
    const days = Array.from({ length: 7 }, (_, i) => {
      const start = today.getTime() / 1000 + i * DAY;
      return { start, label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : dayFmt.format(new Date(start * 1000)), date: dateFmt.format(new Date(start * 1000)),
        slots: slots.filter((s) => s.airingAt >= start && s.airingAt < start + DAY) };
    });
    const weekEnd = days[6].start + DAY;
    // Slots are in air-time order, so the first one past this week is the soonest.
    const later = [];
    const seenLater = new Set();
    for (const s of slots) {
      if (s.airingAt < weekEnd || seenLater.has(s.a.id)) continue;
      seenLater.add(s.a.id);
      later.push(s);
    }
    const nextUp = slots.find((s) => s.a.st === "Watching" && s.airingAt > now) || slots.find((s) => s.airingAt > now);

    const behind = window.ANIME.items.filter((a) => a.st === "Watching").map((a) => {
      const sc = schedule.get(a.id);
      const aired = sc?.next?.length ? sc.next[0].episode - 1 : a.eps || a.w;
      return { a, aired, gap: aired - a.w };
    }).filter((x) => x.gap > 0).sort((x, y) => y.gap - x.gap);

    main.querySelector(".air-source").innerHTML = `${tracked.length} shows on your list are airing or announced. ${esc(source)}
      <button class="btn btn-alt air-ics" data-ics-all>Add all to my calendar</button>`;
    main.querySelector(".air-body").innerHTML = `
      ${nextUp ? `
      <article class="next-up">
        <div class="next-cover">${poster(nextUp.a, { badge: false })}</div>
        <div>
          <p class="next-label">Next up</p>
          <h2>${esc(title(nextUp.a))}</h2>
          <p class="pair-meta">Episode ${nextUp.episode}, ${dayFmt.format(new Date(nextUp.airingAt * 1000))} at ${timeFmt.format(new Date(nextUp.airingAt * 1000))}</p>
          <p class="big-count" data-at="${nextUp.airingAt}">${countdown(nextUp.airingAt - now)}</p>
          <p><button class="btn" data-ics-one>Add ${esc(title(nextUp.a))} to my calendar</button></p>
        </div>
      </article>` : `<p>Nothing on your list is airing right now. Check back next season.</p>`}

      <div class="guide" role="list">
        ${days.map((d) => `
          <section class="guide-day" role="listitem" aria-label="${esc(d.label)}">
            <h2>${esc(d.label)}<small>${esc(d.date)}</small></h2>
            ${d.slots.length ? d.slots.map((s) => `
              <button class="slot ${s.a.st === "Watching" ? "is-watching" : ""}" data-detail="${s.a.id}">
                <span class="slot-time">${timeFmt.format(new Date(s.airingAt * 1000))}</span>
                <img src="${esc(s.a.img)}" alt="" loading="lazy">
                <span class="slot-title">${esc(title(s.a))}</span>
                <span class="slot-ep">Ep ${s.episode} <em data-at="${s.airingAt}">${countdown(s.airingAt - now)}</em></span>
              </button>`).join("") : `<p class="guide-empty">Nothing airing</p>`}
          </section>`).join("")}
      </div>

      <div class="air-lower">
        ${behind.length ? `<section>
          <h2>You're behind on</h2>
          <ul class="hanging">${behind.map(({ a, aired, gap }) => `
            <li>${poster(a, { size: "sm" })}
              <div><h3>${esc(title(a))}</h3>
                <div class="progress" role="img" aria-label="${a.w} of ${aired} aired episodes watched"><span style="--p:${(a.w / aired) * 100}%"></span></div>
                <p class="pair-meta">${gap} episode${gap > 1 ? "s" : ""} to catch up (${a.w} of ${aired} aired)</p></div>
            </li>`).join("")}</ul>
        </section>` : ""}
        ${later.length ? `<section>
          <h2>Further out</h2>
          <ul class="later">${later.map((s) => `
            <li><b>${dateFmt.format(new Date(s.airingAt * 1000))}</b> ${esc(title(s.a))}, ep ${s.episode}${s.episode === 1 ? " (premiere)" : ""}</li>`).join("")}</ul>
        </section>` : ""}
      </div>`;

    const save = (shows, name) => {
      const cal = calendar(shows, schedule);
      if (cal.count) Lib.download(`${name}.ics`, cal.href);
    };
    main.querySelector("[data-ics-all]").addEventListener("click", () => save(tracked, "anime-airing"));
    main.querySelector("[data-ics-one]")?.addEventListener("click", () => save([nextUp.a], title(nextUp.a).replace(/[^\w]+/g, "-").toLowerCase()));

    every(() => {
      const t = Date.now() / 1000;
      main.querySelectorAll("[data-at]").forEach((el) => (el.textContent = countdown(+el.dataset.at - t)));
    }, 1000);
  }

  return { render };
})();
