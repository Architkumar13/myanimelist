#!/bin/sh
# Put back the big files this folder is shared without (see BIG-FILES.md).
#   ./restore-big-files.sh /path/to/anime-big-files   copy them back from the separate folder
#   ./restore-big-files.sh --download                 download the wiki pictures again and set up the tools
set -e
cd "$(dirname "$0")"

if [ "$1" = "--download" ]; then
  if [ "$(uname)" = "Darwin" ]; then donghua/tools/setup.sh; else echo "Skipping donghua/tools/setup.sh (macOS only)."; fi
  for f in donghua/*/scripts/fetch_wiki.py; do
    show=$(dirname "$(dirname "$f")")
    echo "== $show"
    python3 "$show/scripts/fetch_wiki.py"
    python3 "$show/scripts/build_wiki.py"
  done
  echo "Done. Library pictures are back."
elif [ -n "$1" ] && [ -d "$1/donghua" ]; then
  cp -R "$1/donghua/." donghua/
  echo "Copied everything from $1 back into place."
else
  echo "Usage: $0 /path/to/anime-big-files   or   $0 --download" >&2
  exit 1
fi
