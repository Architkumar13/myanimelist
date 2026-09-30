#!/usr/bin/env python3
"""Browser smoke test for the donghua hub.   python3 tools/smoke.py [showId...]   (default: every show in site/shows.js)

Serves site/ on a free local port and drives headless Chromium (Python Playwright). Per show it visits every SHOW.nav
route plus #/, #/journey?view=kit, #/people?view=power, #/recap, three character pages (#/c/<id>) and three wiki
articles (#/w/<title>), picked from the page's own window.CAST / window.WIKI. On each page it fails on:
  - console errors and uncaught page errors (404s for optional show files and ERR_CONNECTION_RESET are ignored),
  - broken pictures (an image request that 4xx/5xxs, or a loaded <img> with naturalWidth 0),
  - an empty page (<main> text shorter than 80 characters),
  - leftovers of the removed spoiler system: .seal, .seal-stamp, .ep-control, .gate.
Then a 390px-wide phone pass of #/ and #/terms fails on horizontal overflow (scrollWidth > innerWidth).
Requests to other hosts (web fonts) are answered empty so the run is offline and fast. One line per check; exit 1 on failures.
"""
import functools
import http.server
import json
import pathlib
import re
import sys
import threading
import time
import urllib.parse

from playwright.sync_api import sync_playwright, TimeoutError as PWTimeout

SITE = pathlib.Path(__file__).resolve().parent.parent / "site"
OPTIONAL = ("atlas.js", "pages.js", "cast.js", "wiki.js", "episodes.js")
FORBIDDEN = ".seal, .seal-stamp, .ep-control, .gate"
MIN_TEXT = 80
PHONE = 390
IMG_EXT = re.compile(r"\.(jpe?g|png|gif|webp|avif|svg)$", re.I)


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def serve():
    handler = functools.partial(Quiet, directory=str(SITE))
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv, f"http://127.0.0.1:{srv.server_address[1]}"


class Probe:
    """Collects console errors, page errors and failed image requests for one page, between resets."""

    def __init__(self, page, origin):
        self.origin, self.issues = origin, []
        page.on("console", self.on_console)
        page.on("pageerror", lambda e: self.issues.append(f"pageerror: {e}"))
        page.on("response", self.on_response)
        page.on("requestfailed", self.on_failed)

    def reset(self):
        self.issues = []

    @staticmethod
    def optional(url):
        return urllib.parse.urlparse(url or "").path.endswith(OPTIONAL)

    def on_console(self, msg):
        if msg.type != "error":
            return
        text, url = msg.text, (msg.location or {}).get("url", "")
        if "ERR_CONNECTION_RESET" in text:
            return
        if "404" in text and self.optional(url):
            return
        if "Failed to load resource" in text and not url.startswith(self.origin):
            return
        if "Failed to load resource" in text and IMG_EXT.search(urllib.parse.urlparse(url).path):
            return  # already reported as a broken image by on_response
        self.issues.append(f"console: {text[:200]}" + (f" ({url.replace(self.origin, '')})" if url else ""))

    def on_response(self, r):
        if r.status >= 400 and r.request.resource_type == "image":
            self.issues.append(f"broken image {r.status}: {r.url.replace(self.origin, '')}")

    def on_failed(self, req):
        err = req.failure or ""
        if req.resource_type == "image" and "ERR_CONNECTION_RESET" not in err and "ERR_ABORTED" not in err:
            self.issues.append(f"image request failed ({err}): {req.url.replace(self.origin, '')}")


def settle(page, ms=1200):
    try:
        page.wait_for_load_state("networkidle", timeout=ms)
    except PWTimeout:
        pass


PAGE_STATE = """() => {
  const main = document.querySelector('main');
  const imgs = [...document.images].filter(i => i.getAttribute('src') && i.complete && i.naturalWidth === 0).map(i => i.getAttribute('src'));
  const bad = [...document.querySelectorAll(%s)].map(e => e.tagName.toLowerCase() + '.' + [...e.classList].join('.'));
  return { text: (main?.innerText || '').trim().length, imgs, bad, title: document.title };
}""" % json.dumps(FORBIDDEN)

OVERFLOW = """(phone) => {
  // On a mobile viewport Chromium zooms out to fit overflowing content, which inflates innerWidth; use the device width.
  const W = Math.min(innerWidth, phone), sw = document.documentElement.scrollWidth;
  let worst = null;
  if (sw > W) for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.right > W + 1 && (!worst || r.right > worst.r)) worst = { r: Math.round(r.right), el: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).join('.') : '') };
  }
  return { W, sw, worst };
}"""


def boot(page, base, sid, probe):
    probe.reset()
    page.goto(f"{base}/?show={urllib.parse.quote(sid)}#/", wait_until="load")
    try:
        page.wait_for_function("() => window.VIEWS && document.querySelector('main')?.children.length > 0", timeout=15000)
    except PWTimeout:
        return False
    settle(page)
    return True


def visit(page, route, probe):
    probe.reset()
    page.evaluate("h => { location.hash = h; }", route)
    page.wait_for_timeout(60)
    settle(page)
    st = page.evaluate(PAGE_STATE)
    issues = list(probe.issues)
    issues += [f"broken image (naturalWidth 0): {s}" for s in st["imgs"]]
    if st["text"] < MIN_TEXT:
        issues.append(f"empty page: main text is {st['text']} chars")
    if st["bad"]:
        issues.append(f"removed elements present: {', '.join(sorted(set(st['bad'])))}")
    return list(dict.fromkeys(issues))


def main():
    want = sys.argv[1:]
    srv, base = serve()
    failures = 0

    def report(ok, sid, what, issues=()):
        nonlocal failures
        if not ok:
            failures += 1
        head = f"{'PASS' if ok else 'FAIL'} {sid:<4} {what}"
        print(head if ok else head + "\n       " + "\n       ".join(i[:300] for i in issues[:8]) + (f"\n       … +{len(issues) - 8} more" if len(issues) > 8 else ""), flush=True)

    with sync_playwright() as pw:
        browser = pw.chromium.launch()

        def context(**kw):
            ctx = browser.new_context(**kw)
            # Other hosts (Google Fonts) get an empty answer: offline, fast, and no noise.
            ctx.route(lambda u: not u.startswith(base), lambda r: r.fulfill(status=200, body=""))
            return ctx

        ctx = context(viewport={"width": 1280, "height": 900})
        page = ctx.new_page()
        probe = Probe(page, base)
        page.goto(base + "/", wait_until="load")
        settle(page)
        shows = page.evaluate("() => (window.SHOWS || []).map(s => s.id)")
        st = page.evaluate(PAGE_STATE)
        hub_issues = list(probe.issues) + [f"broken image: {s}" for s in st["imgs"]]
        report(not hub_issues and bool(shows), "hub", "./ (all shows)", hub_issues or (["window.SHOWS is empty"] if not shows else []))
        unknown = [s for s in want if s not in shows]
        if unknown:
            print(f"FAIL unknown show id(s): {', '.join(unknown)} (have {', '.join(shows)})")
            sys.exit(1)
        page.close()

        for sid in [s for s in shows if not want or s in want]:
            t0 = time.time()
            page = ctx.new_page()
            probe = Probe(page, base)
            if not boot(page, base, sid, probe):
                report(False, sid, "boot", probe.issues or ["the app never rendered into <main>"])
                page.close()
                continue
            report(not probe.issues, sid, "boot (load every show file)", probe.issues)
            info = page.evaluate("""() => {
              const cast = window.CAST || [], hero = window.SHOW.heroId;
              const ids = [...new Set([hero, cast[0]?.id, cast[Math.floor(cast.length / 2)]?.id, cast[cast.length - 1]?.id].filter(id => id && cast.some(c => c.id === id)))].slice(0, 3);
              const entries = Object.values((window.WIKI || {}).entries || {});
              const pick = [];
              for (const k of ['character', 'place', 'faction', 'item', 'lore']) { const e = entries.find(x => x.kind === k && !pick.includes(x.title)); if (e && pick.length < 3) pick.push(e.title); }
              for (const e of entries) if (pick.length < 3 && !pick.includes(e.title)) pick.push(e.title);
              return { nav: (window.SHOW.nav || []).map(n => n[0]), cast: ids, wiki: pick };
            }""")
            routes = ["#/"] + [f"#/{r}" for r in info["nav"]] + ["#/journey?view=kit", "#/people?view=power", "#/recap"]
            routes += [f"#/c/{urllib.parse.quote(c)}" for c in info["cast"]]
            routes += [f"#/w/{urllib.parse.quote(t)}" for t in info["wiki"]]
            if len(info["cast"]) < 3:
                report(False, sid, "character pages", [f"only {len(info['cast'])} cast member(s) to visit"])
            if len(info["wiki"]) < 3:
                report(False, sid, "wiki articles", [f"only {len(info['wiki'])} wiki article(s) to visit"])
            for r in dict.fromkeys(routes):
                issues = visit(page, r, probe)
                report(not issues, sid, r, issues)
            page.close()

            phone = context(viewport={"width": PHONE, "height": 844}, is_mobile=True, has_touch=True, device_scale_factor=2)
            pp = phone.new_page()
            pprobe = Probe(pp, base)
            if boot(pp, base, sid, pprobe):
                for r in ("#/", "#/terms"):
                    pprobe.reset()
                    pp.evaluate("h => { location.hash = h; }", r)
                    pp.wait_for_timeout(60)
                    settle(pp, 800)
                    o = pp.evaluate(OVERFLOW, PHONE)
                    ok = o["sw"] <= o["W"]
                    report(ok, sid, f"phone 390px {r} overflow", [] if ok else [f"scrollWidth {o['sw']} > width {o['W']}" + (f"; widest: {o['worst']['el']} reaches {o['worst']['r']}px" if o["worst"] else "")])
            else:
                report(False, sid, "phone 390px boot", pprobe.issues or ["the app never rendered"])
            phone.close()
            print(f"     {sid}: done in {time.time() - t0:.1f}s", flush=True)

        browser.close()
    srv.shutdown()
    print(f"\n{failures} failure{'s' if failures != 1 else ''}")
    sys.exit(1 if failures else 0)


if __name__ == "__main__":
    main()
