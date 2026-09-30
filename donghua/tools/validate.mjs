#!/usr/bin/env node
// Static checks for the donghua hub's show data.   node tools/validate.mjs [showId...]   (default: every show in site/shows.js)
//
// Each show's files are run in a node `vm` with a fake `window`, the same order boot.js loads them. Prints
// "ERROR|WARN <file> <path>: message" lines and one summary line per show; exits 1 if any show has errors.
//
// SCHEMA: the keys the engine (site/js/*.js) reads without a guard. Missing ones break a page, so they are errors.
// Keys marked ? are optional (guarded in the engine); they are type-checked only when present.
//   shows.js  SHOWS[]   id, dir, title, zh, mark, glyph, hero (file must exist), theme?
//   show.js   SHOW      heroName, heroId, nav[[route, zh, label]] (route must be in app.js ROUTES), wiki{url,name},
//                       home{heroAlt, lede, steps[[href, title, text]]},
//                       realms{novelWord, beyondTitle, beyondZh, beyondGist, ladders[{title, list, note?, cards?}], figure?, figureBeyond (if figure)},
//                       map{label, caption, offMap, lands[{id, d, lx, ly, zh?, name?}], start?, labelDy?, far?{title,text}, extra?},
//                       pages{realms{lede}, world{zh,title,lede}, powers{lede, note?},
//                             journey{zh, title, lede, secrets[title, zh, text], methods[title, text], kit?{tab?,storyTab?,title?,lede?,note?}},
//                             episodes{lede(fn), caveat?}, emperors{tab,zh,title,lede,note?},
//                             zones{tab,zh,title,lede,prose,heading,masterLabel?,wiki?[title,label,text]}, terms{lede, cols[2], empty}},
//                       zhLevels?, arcs?, searchHint?
//   data/world.js WORLD NOVEL, maxEp?, arcs?,
//                       realms[{id,name,zh,subs,where,lifespan,gist,heroEp,stages[{name,zh,text,ep?}],wiki?}]  (old name `yefan`: rename pending),
//                       beyond[{name,zh,text}], tiers[{n,name,zh,top,ep?}], regions[{id,name,zh,ep,blurb,wiki?}],
//                       factions[{name,zh,region,tier,ep,top,signature,with,wiki?}]  (old name `yefan`: rename pending),
//                       journey[{stage, eps[2], items[{name,zh,ep,text,wiki?}]}], secrets[{ch,name,gloss,effect,ep}],
//                       methods[{realm,method,zh,from,ep}], eras[{name,zh,note,emperors[{name,zh,legacy,ep?,wiki?}]}],
//                       zones[{name,zh,ep,text,master,masterEp?}], terms[[term, zh, subs, other, ep?]],
//                       inventory?[{ep, kind, name, zh?, note?, lostEp?, cast?, wiki?}]; `milestones` / `epOverride` are gone (warn).
//   data/episodes.js EPISODES[{ep, title, summary, epEnd?, arc?, events?, cultivation?, introduced?, confidence?}]
//   data/cast.js CAST[{id, name, ep, group, side, intro, looks[{ep,label,img?}] (non-empty), power[{ep,realm,lvl?}], zh?, aka?, wiki?,
//                       mentionEp?, arc?[{ep,text}]}], CAST_LEVELS[string]
//   data/wiki.js WIKI{entries{title: {title, kind, blocks?, facts?, img?, ep?}}, alias{alias: title}}
//   atlas.js  ATLAS?    zh, title, lede, ladder[], bodies[{id,x,y,r,ep?,stage?}], places{id: {name,x,y,lod,region,ep}},
//                       stages[{id, eps[2], zh, title, scale, gist, cam[3], path[], factions[[name,ep]], ceiling{lvl,who,ep}, facts[[text,ep]], events[[ep,text]]}]
import vm from "node:vm";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "site");
const BIG = 1024 * 1024;
const MAX_LIST = 12;

// ---------- loading ----------
function load(files) {
  const window = {};
  window.window = window;
  const ctx = vm.createContext({ window, console: { log() {}, warn() {}, error() {} } });
  const loaded = {};
  for (const [rel, abs] of files) {
    if (!fs.existsSync(abs)) { loaded[rel] = false; continue; }
    try { vm.runInContext(fs.readFileSync(abs, "utf8"), ctx, { filename: abs, timeout: 20000 }); loaded[rel] = true; }
    catch (e) { loaded[rel] = e; }
  }
  return { window, loaded };
}

function routeKeys() {
  const src = fs.readFileSync(path.join(ROOT, "js/app.js"), "utf8");
  const m = src.match(/const\s+ROUTES\s*=\s*\{([\s\S]*?)\};/);
  if (!m) return null;
  return new Set([...m[1].matchAll(/(?:"([^"]*)"|'([^']*)'|([A-Za-z_$][\w$]*))\s*:/g)].map(x => x[1] ?? x[2] ?? x[3]));
}

const ranges = nums => {
  const s = [...new Set(nums)].sort((a, b) => a - b), out = [];
  for (let i = 0; i < s.length; i++) {
    let j = i;
    while (j + 1 < s.length && s[j + 1] === s[j] + 1) j++;
    out.push(j > i ? `${s[i]}-${s[j]}` : `${s[i]}`);
    i = j;
  }
  return out.join(",");
};
const some = (list, n = MAX_LIST) => list.slice(0, n).join("; ") + (list.length > n ? `; … +${list.length - n} more` : "");

// ---------- one show ----------
function validateShow(meta, ROUTES) {
  const errs = [], warns = [];
  const E = (file, p, msg) => errs.push(`ERROR ${file} ${p}: ${msg}`);
  const Wn = (file, p, msg) => warns.push(`WARN  ${file} ${p}: ${msg}`);
  const dir = path.join(ROOT, "shows", meta.dir || "");

  // shows.js entry
  for (const k of ["id", "dir", "title", "zh", "mark", "glyph", "hero"]) if (typeof meta[k] !== "string" || !meta[k]) E("shows.js", `SHOWS[${meta.id}].${k}`, "missing or not a string");
  if (!fs.existsSync(dir)) { E("shows.js", `SHOWS[${meta.id}].dir`, `folder shows/${meta.dir} not found`); return { errs, warns }; }
  if (meta.hero && !fs.existsSync(path.join(dir, meta.hero))) E("shows.js", `SHOWS[${meta.id}].hero`, `file ${meta.hero} not found`);

  const FILES = ["show.js", "data/world.js", "data/wiki.js", "data/episodes.js", "data/cast.js", "atlas.js"];
  const REQUIRED = new Set(["show.js", "data/world.js"]);
  const { window: w, loaded } = load(FILES.map(f => [f, path.join(dir, f)]));
  for (const f of FILES) {
    if (loaded[f] === false) (REQUIRED.has(f) ? E : Wn)(f, "", REQUIRED.has(f) ? "file missing (boot stops)" : "optional file missing");
    else if (loaded[f] !== true) E(f, "", `throws when loaded: ${loaded[f].message}`);
  }
  const SH = w.SHOW, W = w.WORLD;
  if (!SH || typeof SH !== "object") { E("show.js", "SHOW", "window.SHOW not set"); return { errs, warns }; }
  if (!W || typeof W !== "object") { E("data/world.js", "WORLD", "window.WORLD not set"); return { errs, warns }; }
  const EPISODES = Array.isArray(w.EPISODES) ? w.EPISODES : [];
  const CAST = Array.isArray(w.CAST) ? w.CAST : [];
  const LEVELS = Array.isArray(w.CAST_LEVELS) ? w.CAST_LEVELS : [];
  const WIKI = w.WIKI || { entries: {}, alias: {} };
  const A = w.ATLAS;
  if (loaded["data/episodes.js"] === true && !Array.isArray(w.EPISODES)) E("data/episodes.js", "EPISODES", "not an array");
  if (loaded["data/cast.js"] === true) {
    if (!Array.isArray(w.CAST)) E("data/cast.js", "CAST", "not an array");
    if (!Array.isArray(w.CAST_LEVELS)) E("data/cast.js", "CAST_LEVELS", "not an array");
  }
  if (loaded["data/wiki.js"] === true && (typeof WIKI.entries !== "object" || typeof WIKI.alias !== "object")) E("data/wiki.js", "WIKI", "needs {entries, alias}");

  // ---------- generic shape checker ----------
  // spec: "s" string, "n" number, "a" array, "o" object, "f" function, "x" anything; trailing "?" = optional.
  // A nested object spec checks an object; [spec] checks every element of an array.
  const typeOk = (t, v) => t === "x" || (t === "s" ? typeof v === "string" : t === "n" ? typeof v === "number" : t === "a" ? Array.isArray(v)
    : t === "o" ? v && typeof v === "object" && !Array.isArray(v) : t === "f" ? typeof v === "function" : true);
  function check(file, p, v, spec) {
    if (Array.isArray(spec)) {
      if (!Array.isArray(v)) return E(file, p, "expected an array");
      v.forEach((x, i) => check(file, `${p}[${i}]`, x, spec[0]));
      return;
    }
    if (typeof spec === "object") {
      if (!v || typeof v !== "object") return E(file, p, "expected an object");
      for (const [k0, s] of Object.entries(spec)) {
        const opt = k0.endsWith("?"), k = opt ? k0.slice(0, -1) : k0;
        if (v[k] === undefined || v[k] === null) { if (!opt) E(file, `${p}.${k}`, "required key missing"); continue; }
        check(file, `${p}.${k}`, v[k], s);
      }
      return;
    }
    const t = spec.replace("?", "");
    if (!typeOk(t, v)) E(file, p, `expected ${{ s: "string", n: "number", a: "array", o: "object", f: "function" }[t]}, got ${Array.isArray(v) ? "array" : typeof v}`);
  }

  check("show.js", "SHOW", SH, {
    heroName: "s", heroId: "s", nav: "a", wiki: { url: "s", name: "s" },
    home: { heroAlt: "s", lede: "s", steps: "a" },
    realms: { novelWord: "s", beyondTitle: "s", beyondZh: "s", beyondGist: "s", ladders: [{ title: "s", list: "s", "note?": "s" }], "figure?": "s" },
    map: { label: "s", caption: "s", offMap: "s", lands: [{ id: "s", d: "s", lx: "n", ly: "n", "zh?": "s", "name?": "s" }], "start?": "s", "far?": { title: "s", text: "s" } },
    pages: {
      realms: { lede: "s" }, world: { zh: "s", title: "s", lede: "s" }, powers: { lede: "s", "note?": "s" },
      journey: { zh: "s", title: "s", lede: "s", secrets: "a", methods: "a", "kit?": { "tab?": "s", "storyTab?": "s", "title?": "s", "lede?": "s", "note?": "s" } },
      episodes: { lede: "f" }, emperors: { tab: "s", zh: "s", title: "s", lede: "s" },
      zones: { tab: "s", zh: "s", title: "s", lede: "s", prose: "s", heading: "s", "masterLabel?": "s", "wiki?": "a" },
      terms: { lede: "s", cols: "a", empty: "s" },
    },
    "zhLevels?": "a", "arcs?": "a",
  });
  if (SH.realms?.figure && typeof SH.realms.figureBeyond !== "string") E("show.js", "SHOW.realms.figureBeyond", "required when realms.figure is set");
  if (SH.pages?.journey?.secrets && SH.pages.journey.secrets.length < 3) E("show.js", "SHOW.pages.journey.secrets", "needs [title, zh, text]");
  if (SH.pages?.journey?.methods && SH.pages.journey.methods.length < 2) E("show.js", "SHOW.pages.journey.methods", "needs [title, text]");
  if (SH.pages?.terms?.cols && SH.pages.terms.cols.length < 2) E("show.js", "SHOW.pages.terms.cols", "needs 2 column labels");
  (SH.nav || []).forEach((n, i) => {
    if (!Array.isArray(n) || n.length < 3) return E("show.js", `SHOW.nav[${i}]`, "expected [route, zh, label]");
    if (ROUTES && !ROUTES.has(n[0])) E("show.js", `SHOW.nav[${i}]`, `route "${n[0]}" is not in app.js ROUTES`);
  });

  const heroEpKey = (o, file, p) => {
    if (o.heroEp === undefined && o.yefan !== undefined) { Wn(file, p, "uses old key `yefan`, should be `heroEp` (rename pending)"); return o.yefan; }
    if (o.heroEp === undefined) E(file, `${p}.heroEp`, "required key missing");
    return o.heroEp;
  };
  check("data/world.js", "WORLD", W, {
    NOVEL: "n", "maxEp?": "n", "arcs?": "a",
    realms: [{ id: "s", name: "s", zh: "s", subs: "s", where: "s", lifespan: "s", gist: "s", stages: [{ name: "s", zh: "s", text: "s" }] }],
    beyond: [{ name: "s", zh: "s", text: "s" }],
    tiers: [{ n: "n", name: "s", zh: "s", top: "s" }],
    regions: [{ id: "s", name: "s", zh: "s", ep: "n", blurb: "s" }],
    factions: [{ name: "s", zh: "s", region: "s", tier: "n", ep: "n", top: "s", signature: "s" }],
    journey: [{ stage: "s", eps: "a", items: [{ name: "s", zh: "s", ep: "n", text: "s" }] }],
    secrets: [{ ch: "s", name: "s", gloss: "s", effect: "s", ep: "n" }],
    methods: [{ realm: "s", method: "s", zh: "s", from: "s", ep: "n" }],
    eras: [{ name: "s", zh: "s", note: "s", emperors: [{ name: "s", zh: "s", legacy: "s" }] }],
    zones: [{ name: "s", zh: "s", ep: "n", text: "s", master: "s" }],
    terms: [["x"]],
    "inventory?": [{ ep: "n", kind: "s", name: "s" }],
  });
  (W.realms || []).forEach((r, i) => heroEpKey(r, "data/world.js", `WORLD.realms[${i}]`));
  (W.factions || []).forEach((f, i) => {
    if (f.with === undefined && f.yefan !== undefined) Wn("data/world.js", `WORLD.factions[${i}]`, "uses old key `yefan`, should be `with` (rename pending)");
    else if (f.with === undefined) E("data/world.js", `WORLD.factions[${i}].with`, "required key missing");
  });
  for (const k of ["milestones", "epOverride"]) if (W[k] !== undefined) Wn("data/world.js", `WORLD.${k}`, "removed from the schema; drop it (rename pending?)");
  (W.terms || []).forEach((t, i) => { if (!Array.isArray(t) || t.length < 4) E("data/world.js", `WORLD.terms[${i}]`, "expected [term, zh, subs, other, ep?]"); });
  for (const l of SH.realms?.ladders || []) if (l.list && !Array.isArray(W[l.list])) Wn("data/world.js", `WORLD.${l.list}`, "named by SHOW.realms.ladders but missing; ladder renders empty");

  check("data/episodes.js", "EPISODES", EPISODES, [{ ep: "n", title: "s", summary: "s", "epEnd?": "n", "events?": "a", "cultivation?": "s", "introduced?": "a" }]);
  check("data/cast.js", "CAST", CAST, [{ id: "s", name: "s", ep: "n", group: "s", side: "s", intro: "s", looks: [{ ep: "n", label: "s", "img?": "s" }], power: [{ ep: "n", realm: "s" }], "aka?": "a", "arc?": [{ ep: "n", text: "s" }] }]);
  CAST.forEach((c, i) => { if (Array.isArray(c.looks) && !c.looks.length) E("data/cast.js", `CAST[${i}:${c.id}].looks`, "empty; the engine reads looks[0]"); });
  for (const [k, e] of Object.entries(WIKI.entries || {})) if (!e || e.title !== k || typeof e.kind !== "string") { E("data/wiki.js", `WIKI.entries["${k}"]`, "needs title (== key) and kind"); break; }
  for (const [a, t] of Object.entries(WIKI.alias || {})) if (!WIKI.entries?.[t]) Wn("data/wiki.js", `WIKI.alias["${a}"]`, `points at missing entry "${t}"`);

  if (A) check("atlas.js", "ATLAS", A, {
    zh: "s", title: "s", lede: "s", ladder: "a", "aspect?": "a",
    bodies: [{ id: "s", x: "n", y: "n", r: "n" }], places: "o",
    stages: [{ id: "s", eps: "a", zh: "s", title: "s", scale: "s", gist: "s", cam: "a", path: "a", factions: "a", ceiling: { who: "s", ep: "n" }, facts: "a", events: "a" }],
  });

  // ---------- episodes ----------
  const NOVEL = W.NOVEL;
  const maxEp = W.maxEp || Math.max(0, ...EPISODES.map(e => e.epEnd || e.ep)) || 200;
  const seen = new Map();
  let prev = -Infinity, unsorted = [];
  EPISODES.forEach((e, i) => {
    if (seen.has(e.ep)) E("data/episodes.js", `EPISODES[${i}]`, `duplicate ep ${e.ep} (also at [${seen.get(e.ep)}])`);
    seen.set(e.ep, i);
    if (e.ep < prev) unsorted.push(e.ep);
    prev = e.ep;
    if (!Number.isInteger(e.ep) || e.ep < 0) E("data/episodes.js", `EPISODES[${i}].ep`, `${JSON.stringify(e.ep)} is not a non-negative integer`);
    if (e.epEnd != null && !Number.isInteger(e.epEnd)) E("data/episodes.js", `EPISODES[${i}].epEnd`, `${JSON.stringify(e.epEnd)} is not an integer`);
    if (e.epEnd != null && !(e.epEnd >= e.ep)) E("data/episodes.js", `EPISODES[${i}]`, `epEnd ${e.epEnd} < ep ${e.ep}`);
  });
  if (unsorted.length) E("data/episodes.js", "EPISODES", `not sorted by ep (out of order: ${some(unsorted.map(String))})`);
  const spans = EPISODES.map(e => [e.ep, e.epEnd || e.ep]).sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < spans.length; i++) if (spans[i][0] <= spans[i - 1][1] && spans[i][0] !== spans[i - 1][0]) E("data/episodes.js", "EPISODES", `episode ${spans[i][0]} overlaps ${spans[i - 1][0]}–${spans[i - 1][1]}`);
  if (W.maxEp && EPISODES.length && Math.max(...EPISODES.map(e => e.epEnd || e.ep)) > W.maxEp) Wn("data/world.js", "WORLD.maxEp", `${W.maxEp} is below the last episode in the guide`);
  for (const [src, arcs] of [["data/world.js WORLD.arcs", W.arcs], ["show.js SHOW.arcs", SH.arcs]]) {
    if (!Array.isArray(arcs)) continue;
    const [file, p] = src.split(" ");
    arcs.forEach((a, i) => {
      if (!Array.isArray(a) || typeof a[0] !== "number" || typeof a[1] !== "number" || a[1] < a[0]) return E(file, `${p}[${i}]`, "expected [from, to, label] with to >= from");
      if (i && a[0] <= arcs[i - 1][1]) E(file, `${p}[${i}]`, `arc ${a[0]}–${a[1]} overlaps ${arcs[i - 1][0]}–${arcs[i - 1][1]}`);
    });
  }
  if (W.arcs && SH.arcs) Wn("show.js", "SHOW.arcs", "ignored because WORLD.arcs is set");

  // Viewer prose, not research notes.
  const longSum = [], notes = new Map();
  const NOTE_RE = [
    [/\bsub(s|titles?|bed)\b/i, "subs/subtitles"], [/\bwiki (cites|says|lists|notes)\b/i, "wiki cites"], [/\bunconfirmed\b/i, "unconfirmed"],
    [/\bimplies\b/i, "implies"], [/\binfo ?card\b/i, "info card"], [/\b(TODO|FIXME|TBD)\b/, "TODO"], [/\?\?/, "??"],
  ];
  const quotedForeign = s => [...s.matchAll(/["“'‘]([^"”'’]{1,60})["”'’]/g)].some(m => /[㐀-鿿Ā-ɏǍ-ǜ]/.test(m[1])) || /[㐀-鿿]/.test(s);
  for (const e of EPISODES) {
    if (!e.arc && (typeof e.summary !== "string" || e.summary.length < 200)) longSum.push(e.ep);
    const fields = [["summary", e.summary], ["cultivation", e.cultivation], ...(e.events || []).map((x, k) => [`events[${k}]`, x])];
    for (const [, text] of fields) {
      if (typeof text !== "string") continue;
      for (const [re, label] of NOTE_RE) if (re.test(text)) { if (!notes.has(label)) notes.set(label, []); notes.get(label).push(e.ep); }
      if (quotedForeign(text)) { if (!notes.has("non-English text")) notes.set("non-English text", []); notes.get("non-English text").push(e.ep); }
    }
  }
  if (longSum.length) Wn("data/episodes.js", "EPISODES[].summary", `${longSum.length} summaries are under 200 chars (thin): EP ${ranges(longSum)}`);
  for (const [label, eps] of notes) Wn("data/episodes.js", "EPISODES[] summary/cultivation/events", `reads like research notes ("${label}"): EP ${ranges(eps)}`);

  // ---------- ep-like fields ----------
  const badEps = new Map();
  const ep = (file, p, v, { optional = false, nullable = false } = {}) => {
    if (v === undefined) { if (!optional) E(file, p, "episode missing"); return; }
    if (v === null) { if (!nullable) Wn(file, p, "episode is null (renders as “unmapped”)"); return; }
    if (Number.isInteger(v) && ((v >= 0 && v <= maxEp) || v === NOVEL)) return;
    const key = `${file} ${p.replace(/\[\d+(:[^\]]*)?\]/g, "[]")}`;
    if (!badEps.has(key)) badEps.set(key, []);
    badEps.get(key).push(`${p}=${JSON.stringify(v)}`);
  };
  const WF = "data/world.js";
  (W.realms || []).forEach((r, i) => {
    ep(WF, `WORLD.realms[${i}].heroEp`, r.heroEp ?? r.yefan, { optional: true });
    (r.stages || []).forEach((s, k) => ep(WF, `WORLD.realms[${i}].stages[${k}].ep`, s.ep, { optional: true }));
  });
  (W.tiers || []).forEach((t, i) => ep(WF, `WORLD.tiers[${i}].ep`, t.ep, { optional: true }));
  (W.factions || []).forEach((f, i) => ep(WF, `WORLD.factions[${i}].ep`, f.ep, { optional: true }));
  (W.regions || []).forEach((r, i) => ep(WF, `WORLD.regions[${i}].ep`, r.ep, { optional: true }));
  (W.journey || []).forEach((st, i) => {
    if (!Array.isArray(st.eps) || st.eps.length !== 2) E(WF, `WORLD.journey[${i}].eps`, "expected [from, to]");
    else { st.eps.forEach((v, k) => ep(WF, `WORLD.journey[${i}].eps[${k}]`, v)); if (st.eps[1] < st.eps[0]) E(WF, `WORLD.journey[${i}].eps`, "to < from"); }
    (st.items || []).forEach((it, k) => ep(WF, `WORLD.journey[${i}].items[${k}].ep`, it.ep, { optional: true }));
  });
  for (const k of ["secrets", "methods", "zones"]) (W[k] || []).forEach((x, i) => { ep(WF, `WORLD.${k}[${i}].ep`, x.ep, { optional: true }); if (k === "zones") ep(WF, `WORLD.zones[${i}].masterEp`, x.masterEp, { optional: true }); });
  (W.eras || []).forEach((era, i) => (era.emperors || []).forEach((em, k) => ep(WF, `WORLD.eras[${i}].emperors[${k}].ep`, em.ep, { optional: true })));
  (W.terms || []).forEach((t, i) => Array.isArray(t) && ep(WF, `WORLD.terms[${i}][4]`, t[4], { optional: true, nullable: true }));
  const KINDS = new Set(["physique", "scripture", "technique", "treasure", "companion"]);
  const castIds = new Map();
  CAST.forEach((c, i) => { if (castIds.has(c.id)) E("data/cast.js", `CAST[${i}]`, `duplicate id "${c.id}" (also at [${castIds.get(c.id)}])`); else castIds.set(c.id, i); });
  (W.inventory || []).forEach((x, i) => {
    const p = `WORLD.inventory[${i}:${x.name}]`;
    ep(WF, `${p}.ep`, x.ep);
    ep(WF, `${p}.lostEp`, x.lostEp, { optional: true, nullable: true });
    if (x.lostEp != null && x.lostEp < x.ep) E(WF, p, `lostEp ${x.lostEp} < ep ${x.ep}`);
    if (!KINDS.has(x.kind)) E(WF, `${p}.kind`, `"${x.kind}" is not one of ${[...KINDS].join("/")}; the kit never shows it`);
    if (x.cast && !castIds.has(x.cast)) E(WF, `${p}.cast`, `no cast member "${x.cast}"`);
  });

  // ---------- cast ----------
  const CF = "data/cast.js";
  const missingImg = [], bigImg = [];
  CAST.forEach((c, i) => {
    const p = `CAST[${i}:${c.id}]`;
    ep(CF, `${p}.ep`, c.ep);
    ep(CF, `${p}.mentionEp`, c.mentionEp, { optional: true, nullable: true });
    const looks = c.looks || [], power = c.power || [];
    looks.forEach((l, k) => {
      ep(CF, `${p}.looks[${k}].ep`, l.ep);
      if (k && l.ep < looks[k - 1].ep) E(CF, `${p}.looks[${k}]`, `not sorted by ep (${looks[k - 1].ep} then ${l.ep})`);
      if (l.img) {
        const f = path.join(dir, l.img);
        if (!fs.existsSync(f)) missingImg.push(`${c.id}: ${l.img}`);
        else if (fs.statSync(f).size > BIG) bigImg.push(`${l.img} (${(fs.statSync(f).size / BIG).toFixed(1)} MB)`);
      }
    });
    power.forEach((pw, k) => {
      ep(CF, `${p}.power[${k}].ep`, pw.ep);
      if (k && pw.ep < power[k - 1].ep) E(CF, `${p}.power[${k}]`, `not sorted by ep (${power[k - 1].ep} then ${pw.ep})`);
      if (pw.lvl != null && !(Number.isInteger(pw.lvl) && pw.lvl >= 0 && pw.lvl < LEVELS.length)) E(CF, `${p}.power[${k}].lvl`, `${pw.lvl} is outside CAST_LEVELS (0..${LEVELS.length - 1})`);
    });
    (c.arc || []).forEach((a, k) => ep(CF, `${p}.arc[${k}].ep`, a.ep));
  });
  if (missingImg.length) E(CF, "CAST[].looks[].img", `${missingImg.length} image file(s) missing: ${some(missingImg)}`);
  if (bigImg.length) Wn(CF, "CAST[].looks[].img", `${bigImg.length} image(s) over 1 MB: ${some(bigImg)}`);
  if (SH.heroId && CAST.length && !castIds.has(SH.heroId)) E("show.js", "SHOW.heroId", `"${SH.heroId}" is not in CAST`);

  // ---------- cross-refs ----------
  const regionIds = new Set((W.regions || []).map(r => r.id));
  const landIds = new Set((SH.map?.lands || []).map(l => l.id));
  (W.factions || []).forEach((f, i) => { if (!regionIds.has(f.region)) E(WF, `WORLD.factions[${i}:${f.name}].region`, `"${f.region}" is not a region id`); });
  (SH.map?.lands || []).forEach((l, i) => { if (!regionIds.has(l.id)) E("show.js", `SHOW.map.lands[${i}].id`, `"${l.id}" is not a region id in WORLD.regions`); });
  if (SH.map?.start && !landIds.has(SH.map.start)) E("show.js", "SHOW.map.start", `"${SH.map.start}" is not a map land`);
  const realmIds = new Set((W.realms || []).map(r => r.id));
  if (SH.realms?.figure) for (const [, id] of SH.realms.figure.matchAll(/data-(?:realm|ripples)="([^"]+)"/g)) if (!realmIds.has(id) && id !== "beyond") Wn("show.js", "SHOW.realms.figure", `data-realm "${id}" is not a realm id`);
  (SH.home?.steps || []).forEach(([href], i) => {
    const m = /^#\/([^/?]*)(?:\/(.*))?/.exec(href || "");
    if (!m) return Wn("show.js", `SHOW.home.steps[${i}]`, `link "${href}" is not an in-app route`);
    if (m[1] === "w") { if (!resolve(decodeURIComponent(m[2] || ""))) Wn("show.js", `SHOW.home.steps[${i}]`, `wiki link "${href}" does not resolve`); }
    else if (m[1] === "c") { if (!castIds.has(decodeURIComponent(m[2] || ""))) E("show.js", `SHOW.home.steps[${i}]`, `no cast member for "${href}"`); }
    else if (ROUTES && !ROUTES.has(m[1])) E("show.js", `SHOW.home.steps[${i}]`, `route "${m[1]}" is not in app.js ROUTES`);
  });

  if (A) {
    const AF = "atlas.js";
    const places = A.places || {};
    const bodyIds = new Set((A.bodies || []).map(b => b.id));
    const stageIds = new Set((A.stages || []).map(s => s.id));
    const okRegion = new Set([...regionIds, ...landIds, ...bodyIds, "earth", "space", "mars", "ziwei"]);
    const facNames = new Set((W.factions || []).map(f => f.name));
    (A.bodies || []).forEach((b, i) => { ep(AF, `ATLAS.bodies[${i}].ep`, b.ep, { optional: true }); if (b.stage && !stageIds.has(b.stage)) E(AF, `ATLAS.bodies[${i}].stage`, `"${b.stage}" is not a stage id`); });
    for (const [id, p] of Object.entries(places)) {
      check(AF, `ATLAS.places.${id}`, p, { name: "s", x: "n", y: "n", lod: "n", region: "s" });
      ep(AF, `ATLAS.places.${id}.ep`, p.ep);
      if (p.region && !okRegion.has(p.region)) E(AF, `ATLAS.places.${id}.region`, `"${p.region}" is not a land/region/body id`);
    }
    const unknownFac = [];
    (A.stages || []).forEach((st, i) => {
      const p = `ATLAS.stages[${i}:${st.id}]`;
      if (Array.isArray(st.eps)) { st.eps.forEach((v, k) => ep(AF, `${p}.eps[${k}]`, v)); if (st.eps[1] < st.eps[0]) E(AF, `${p}.eps`, "to < from"); }
      if (!Array.isArray(st.cam) || st.cam.length !== 3) E(AF, `${p}.cam`, "expected [x, y, width]");
      (st.path || []).forEach((id, k) => { if (!places[id]) E(AF, `${p}.path[${k}]`, `"${id}" is not in ATLAS.places`); });
      if (st.ceiling) {
        ep(AF, `${p}.ceiling.ep`, st.ceiling.ep);
        const l = st.ceiling.lvl;
        if (l != null && !(Number.isInteger(l) && l >= 0 && l < (A.ladder || []).length)) E(AF, `${p}.ceiling.lvl`, `${l} is outside ATLAS.ladder (0..${(A.ladder || []).length - 1})`);
      }
      (st.factions || []).forEach(([name, fe], k) => { ep(AF, `${p}.factions[${k}]`, fe); if (!facNames.has(name)) unknownFac.push(`${st.id}: ${name}`); });
      (st.facts || []).forEach(([, fe], k) => ep(AF, `${p}.facts[${k}]`, fe));
      (st.events || []).forEach(([ee], k) => ep(AF, `${p}.events[${k}]`, ee));
      if (i && Array.isArray(st.eps) && Array.isArray(A.stages[i - 1].eps) && st.eps[0] <= A.stages[i - 1].eps[1] && st.eps[0] < NOVEL) Wn(AF, `${p}.eps`, `starts at ${st.eps[0]}, before the previous stage ends (${A.stages[i - 1].eps[1]})`);
    });
    if (unknownFac.length) Wn(AF, "ATLAS.stages[].factions", `${unknownFac.length} name(s) not in WORLD.factions (shown unlinked): ${some(unknownFac)}`);
  }

  // Level ladders should line up.
  const lens = [["CAST_LEVELS", LEVELS.length, loaded["data/cast.js"] === true], ["SHOW.zhLevels", SH.zhLevels?.length, !!SH.zhLevels], ["ATLAS.ladder", A?.ladder?.length, !!A]].filter(x => x[2]);
  if (new Set(lens.map(x => x[1])).size > 1) Wn("show.js", "levels", `ladder lengths differ: ${lens.map(x => `${x[0]}=${x[1]}`).join(", ")}`);
  if (A?.ladder && LEVELS.length === A.ladder.length) A.ladder.forEach((n, i) => { if (n !== LEVELS[i]) Wn("atlas.js", `ATLAS.ladder[${i}]`, `"${n}" differs from CAST_LEVELS[${i}] "${LEVELS[i]}"`); });

  // Wiki titles.
  function resolve(title) {
    if (!title) return null;
    const t = String(title).replace(/_/g, " ").trim();
    const hit = WIKI.entries?.[t] || WIKI.entries?.[WIKI.alias?.[t]];
    if (hit) return hit;
    const lower = t.toLowerCase();
    for (const k in WIKI.entries || {}) if (k.toLowerCase() === lower) return WIKI.entries[k];
    for (const k in WIKI.alias || {}) if (k.toLowerCase() === lower) return WIKI.entries[WIKI.alias[k]];
    return null;
  }
  const wikiRefs = [];
  const addRef = (file, p, t) => { if (t) wikiRefs.push([file, p, t]); };
  for (const k of ["realms", "beyond", "regions", "factions", "zones", "inventory"]) (W[k] || []).forEach((x, i) => addRef(WF, `WORLD.${k}[${i}]`, x.wiki));
  (W.journey || []).forEach((st, i) => (st.items || []).forEach((it, k) => addRef(WF, `WORLD.journey[${i}].items[${k}]`, it.wiki)));
  (W.eras || []).forEach((era, i) => (era.emperors || []).forEach((em, k) => addRef(WF, `WORLD.eras[${i}].emperors[${k}]`, em.wiki)));
  CAST.forEach((c, i) => addRef(CF, `CAST[${i}:${c.id}]`, c.wiki));
  if (Array.isArray(SH.pages?.zones?.wiki)) addRef("show.js", "SHOW.pages.zones.wiki", SH.pages.zones.wiki[0]);
  if (loaded["data/wiki.js"] === true) {
    const miss = wikiRefs.filter(([, , t]) => !resolve(t));
    const byFile = {};
    for (const [file, , t] of miss) (byFile[file] ||= []).push(t);
    for (const [file, ts] of Object.entries(byFile)) Wn(file, "wiki", `${ts.length} of ${wikiRefs.filter(r => r[0] === file).length} wiki titles don't resolve (rendered as plain text): ${some([...new Set(ts)], 8)}`);
    // Wiki pictures on disk (build step writes paths relative to the show folder).
    const missPic = [];
    for (const e of Object.values(WIKI.entries || {})) for (const src of [e.img, ...(e.gallery || []).map(g => g.src)]) if (typeof src === "string" && src.startsWith("img/") && !fs.existsSync(path.join(dir, src))) missPic.push(src);
    if (missPic.length) Wn("data/wiki.js", "WIKI.entries[].img/gallery", `${missPic.length} picture file(s) missing: ${some(missPic, 6)}`);
  }

  for (const [key, list] of badEps) E(key.split(" ")[0], key.split(" ").slice(1).join(" "), `${list.length} episode value(s) not an integer in 0..${maxEp} or NOVEL (${NOVEL}): ${some(list, 8)}`);
  return { errs, warns };
}

// ---------- main ----------
const { window: hubWin, loaded: hubLoaded } = load([["shows.js", path.join(ROOT, "shows.js")]]);
if (hubLoaded["shows.js"] !== true || !Array.isArray(hubWin.SHOWS)) { console.log("ERROR shows.js SHOWS: cannot load window.SHOWS"); process.exit(1); }
const SHOWS = hubWin.SHOWS;
const ids = SHOWS.map(s => s.id);
if (new Set(ids).size !== ids.length) console.log("ERROR shows.js SHOWS: duplicate show ids");
const want = process.argv.slice(2);
for (const id of want) if (!ids.includes(id)) { console.log(`ERROR shows.js SHOWS: no show "${id}" (have ${ids.join(", ")})`); process.exit(1); }
const ROUTES = routeKeys();
if (!ROUTES) console.log("WARN  js/app.js ROUTES: could not parse the route table; nav routes not checked");

let failed = false;
const summary = [];
for (const meta of SHOWS.filter(s => !want.length || want.includes(s.id))) {
  console.log(`\n== ${meta.id} (${meta.dir})`);
  const { errs, warns } = validateShow(meta, ROUTES);
  for (const l of errs) console.log(l);
  for (const l of warns) console.log(l);
  summary.push(`${meta.id}: ${errs.length} error${errs.length === 1 ? "" : "s"}, ${warns.length} warning${warns.length === 1 ? "" : "s"}`);
  if (errs.length) failed = true;
}
console.log("\n" + summary.join("\n"));
process.exit(failed ? 1 : 0);
