/* Hash router: #/<page>[/<param>][?filters], e.g. #/year/2023 or #/shelf?genre=Comedy. */
(() => {
  const routes = {
    "": Wrapped, shelf: Shelf, play: Game, pick: Pick,
    time: TimeMachine, colour: ColourWall, year: YearByYear,
    unfinished: Unfinished, foryou: ForYou, airing: Airing, season: Season,
    guess: Guess, tiers: Tiers,
  };
  const main = document.getElementById("main");
  const menus = [...document.querySelectorAll(".masthead details")];
  document.querySelector(".logo-name").textContent = window.ANIME.user;

  // Only one menu open at a time; close on outside click or Escape.
  menus.forEach((d) => d.addEventListener("toggle", () => d.open && menus.forEach((o) => o !== d && (o.open = false))));
  document.addEventListener("click", (e) => { if (!e.target.closest(".masthead details")) menus.forEach((d) => (d.open = false)); });
  document.addEventListener("keydown", (e) => {
    const open = menus.find((d) => d.open);
    if (e.key === "Escape" && open) { open.open = false; open.querySelector("summary").focus(); }
  });

  // The skip link focuses #main. That hash is not a page, so keep the current route.
  document.querySelector(".skip").addEventListener("click", (e) => {
    e.preventDefault();
    main.focus({ preventScroll: true });
  });

  function go() {
    if (location.hash === "#main") history.replaceState(null, "", "#/");
    const [path, qs = ""] = location.hash.replace(/^#\/?/, "").split("?");
    const [key = "", param] = path.split("/");
    const page = routes[key] || Wrapped;
    document.body.dataset.page = key || "wrapped";
    menus.forEach((d) => (d.open = false));
    document.querySelectorAll(".masthead nav a").forEach((a) => {
      const active = a.getAttribute("href") === `#/${key}`;
      active ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current");
    });
    menus.forEach((d) => d.classList.toggle("has-current", !!d.querySelector("[aria-current]")));
    Lib.stopTimers();
    page.render(main, param && decodeURIComponent(param), new URLSearchParams(qs));
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", () => {
    go();
    main.focus({ preventScroll: true });
  });
  go();
})();
