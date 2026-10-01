# Big files: what's not in this folder, and how to get it back

This folder is shared without about 2 GB of large, rebuildable files so it stays small (about 0.6 GB,
most of it git history). The donghua site works fully without them: every portrait, poster, card picture and
article picture is included. What's missing is the extra **gallery** pictures at the bottom of Library articles,
and the animation in a few dozen animated pictures (they're shown as stills).

## What's missing

| Path (inside this folder) | Size | What it is | How to get it back |
|---|---|---|---|
| `donghua/site/shows/<show>/img/wiki/` (part) | ~330 MB | Fan-wiki pictures: the article galleries, and the animated versions of 63 GIFs kept here as stills. Each article's main picture is kept. | Download again from the fan wiki, or copy from `anime-big-files` |
| `donghua/<show>/cache/` | ~1.3 GB | Scratch: downloaded wiki pages, subtitle files, video stills. Only the build scripts read it. | Recreated on demand by the scripts; or copy from `anime-big-files` |
| `donghua/.tools/` | ~350 MB | The Python environment and face models for the episode tools | `donghua/tools/setup.sh` (macOS); or copy from `anime-big-files` |

`<show>` is one of `shrouding-the-heavens`, `the-great-ruler`, `martial-universe`, `renegade-immortal`,
`battle-through-the-heavens`, `jade-dynasty`.

## Option 1: you were also given the `anime-big-files` folder

It has the same layout as this folder. Put it anywhere, then from this folder run:

```bash
./restore-big-files.sh /path/to/anime-big-files
```

That copies everything back into place. You can also drag its `donghua/` folder onto this one and merge.

## Option 2: download the pictures again

Each show's pictures come from its fan wiki:

| Show | Fan wiki |
|---|---|
| Shrouding the Heavens | https://shrouding-the-heavens.fandom.com/ |
| The Great Ruler | https://thegreatruler.fandom.com/ |
| Martial Universe | https://wu-dong-qian-kun.fandom.com/ |
| Renegade Immortal | https://xian-ni.fandom.com/ |
| Battle Through the Heavens | https://battle-through-the-heavens.fandom.com/ |
| Jade Dynasty | https://zhu-xian.fandom.com/ |

From this folder run:

```bash
./restore-big-files.sh --download
```

It runs, for every show, `scripts/fetch_wiki.py` (downloads the wiki pages into `cache/wiki/`) and then
`scripts/build_wiki.py` (downloads the pictures into `site/img/wiki/`). Only plain `python3` is needed. Expect
anything from a few minutes to an hour per show; both scripts resume if interrupted. To do one show only:

```bash
python3 donghua/jade-dynasty/scripts/fetch_wiki.py
python3 donghua/jade-dynasty/scripts/build_wiki.py
```

`build_wiki.py` also rewrites the show's `site/data/wiki.js` from the wiki as it is today. If you'd rather keep
the text exactly as shared, undo that afterwards with `git checkout -- 'donghua/site/shows/*/data/wiki.js'`.

The episode tools (`.tools/`, only needed to add new episodes) are set up with `donghua/tools/setup.sh`. It
uses macOS-only parts (keychain certificates, Vision text recognition), and `--download` runs it too.

## Opening the site

Nothing above is needed just to read the site: double-click `donghua/site/index.html`, or run
`python3 -m http.server 8000 -d donghua/site` and open http://localhost:8000.
