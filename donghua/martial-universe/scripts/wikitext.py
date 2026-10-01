"""Just enough of a wikitext parser to turn fan-wiki pages into readable blocks.

Links survive as ⟦Target|label⟧ tokens so the site can turn them into in-app links.
"""
import html
import re

LINK_OPEN, LINK_CLOSE = "⟦", "⟧"


def split_top(text, sep="|"):
    """Split on sep only where we're not inside {{ }} or [[ ]]."""
    parts, depth, buf, i = [], 0, [], 0
    while i < len(text):
        two = text[i:i + 2]
        if two in ("{{", "[["):
            depth += 1; buf.append(two); i += 2; continue
        if two in ("}}", "]]"):
            depth = max(0, depth - 1); buf.append(two); i += 2; continue
        if text[i] == sep and depth == 0:
            parts.append("".join(buf)); buf = []; i += 1; continue
        buf.append(text[i]); i += 1
    parts.append("".join(buf))
    return parts


def find_templates(text):
    """Yield (start, end, name, body) for every top-level {{template}}."""
    i, n = 0, len(text)
    while i < n:
        start = text.find("{{", i)
        if start < 0:
            return
        depth, j = 0, start
        while j < n:
            if text.startswith("{{", j):
                depth += 1; j += 2
            elif text.startswith("}}", j):
                depth -= 1; j += 2
                if depth == 0:
                    break
            else:
                j += 1
        body = text[start + 2:j - 2]
        name = split_top(body)[0].strip()
        yield start, j, name, body
        i = j


def template_params(body):
    params = {}
    for part in split_top(body)[1:]:
        if "=" in part:
            k, v = part.split("=", 1)
            params[k.strip()] = v.strip()
    return params


def _strip_templates(text):
    """Replace inline templates: sidenotes become (notes), everything else goes."""
    out, last = [], 0
    for start, end, name, body in find_templates(text):
        out.append(text[last:start])
        low = name.lower().replace("_", " ")
        args = split_top(body)[1:]
        if low in ("sidenote", "sidenite") and args:
            out.append(f" ({_strip_templates(args[0]).strip()})")
        elif low in ("color", "colour") and len(args) > 1:
            out.append(_strip_templates(args[-1]))
        elif low in ("underline", "nowrap", "small") and args:
            out.append(_strip_templates(args[0]))
        last = end
    out.append(text[last:])
    return "".join(out)


def inline(text):
    """Clean one line of wikitext into plain text with ⟦link⟧ tokens."""
    text = re.sub(r"<ref[^>]*?/>|<ref[^>]*>.*?</ref>", "", text, flags=re.S | re.I)
    text = re.sub(r"<!--.*?-->", "", text, flags=re.S)
    text = _strip_templates(text)
    text = re.sub(r"\[\[(?:File|Image|Category|Media):[^\[\]]*(?:\[\[[^\]]*\]\][^\[\]]*)*\]\]", "", text, flags=re.I)

    def link(m):
        target, _, label = m.group(1).partition("|")
        target = target.split("#")[0].strip()
        label = (label or m.group(1).split("#")[0]).strip()
        if not target or ":" in target:
            return label
        return f"{LINK_OPEN}{target}|{label}{LINK_CLOSE}"

    text = re.sub(r"\[\[([^\[\]]+)\]\]", link, text)
    text = re.sub(r"\[https?://\S+\s+([^\]]+)\]", r"\1", text)
    text = re.sub(r"\[https?://\S+\]", "", text)
    text = re.sub(r"<br\s*/?>", " ", text, flags=re.I)
    text = re.sub(r"<[^>]+>", "", text)
    text = text.replace("'''", "").replace("''", "")
    text = html.unescape(text)
    text = re.sub(r"\s+", " ", text).strip()
    text = re.sub(r"\(\s*\)", "", text)
    return text.strip(" |")


def plain(text):
    return re.sub(r"⟦([^|⟧]*)\|([^⟧]*)⟧", r"\2", inline(text))


def list_items(value):
    """Infobox values are often bullet lists; return clean items."""
    value = re.sub(r"</?div[^>]*>", "\n", value)
    raw = re.split(r"\n\s*[*#]+|^\s*[*#]+|<br\s*/?>", value, flags=re.M | re.I)
    items = [inline(x) for x in raw]
    return [x for x in items if x and x not in ("-", "?", "??")]


def _table(lines):
    rows, row = [], []
    for line in lines[1:]:
        s = line.strip()
        if s.startswith("|}"):
            break
        if s.startswith("|-") or s.startswith("|+"):
            if row:
                rows.append(row)
            row = []
            continue
        if s.startswith(("|", "!")):
            for cell in re.split(r"\|\||!!", s[1:]):
                parts = split_top(cell)
                cell = parts[-1] if len(parts) > 1 and "=" in parts[0] else cell
                row.append(inline(cell))
        elif row:
            row[-1] = (row[-1] + " " + inline(s)).strip()
    if row:
        rows.append(row)
    rows = [r for r in rows if any(c for c in r)]
    return rows


def blocks(text):
    """Turn a page body into [{t:'h'|'p'|'ul'|'table'|'quote', ...}]."""
    # Pull quotes out first; drop every other top-level template (infoboxes, tabs, navboxes).
    out_text, last, quotes = [], 0, []
    for start, end, name, body in find_templates(text):
        out_text.append(text[last:start])
        low = name.lower().replace("_", " ")
        if low.startswith("quote"):
            p = template_params(body)
            q = p.get("quote") or (split_top(body)[1] if len(split_top(body)) > 1 else "")
            by = p.get("speaker") or p.get("title") or ""
            if q:
                out_text.append(f"\n@@QUOTE {len(quotes)}\n")
                quotes.append({"t": "quote", "x": plain(q), "by": plain(by)})
        elif low in ("sidenote", "color", "underline"):
            out_text.append(text[start:end])
        last = end
    out_text.append(text[last:])
    text = "".join(out_text)
    text = re.sub(r"<gallery.*?</gallery>", "", text, flags=re.S | re.I)
    text = re.sub(r"<ref[^>]*>.*?</ref>", "", text, flags=re.S | re.I)
    text = re.sub(r"</?(div|span|center|small|big)[^>]*>", "\n", text, flags=re.I)

    out, lines, i = [], text.split("\n"), 0
    para = []

    def flush():
        if para:
            p = inline(" ".join(para))
            if len(p) > 1:
                out.append({"t": "p", "x": p})
            para.clear()

    while i < len(lines):
        line = lines[i]
        s = line.strip()
        if s.startswith("@@QUOTE"):
            flush(); out.append(quotes[int(s.split()[1])])
        elif s.startswith("{|"):
            flush()
            j = i
            while j < len(lines) and not lines[j].strip().startswith("|}"):
                j += 1
            rows = _table(lines[i:j + 1])
            if rows:
                out.append({"t": "table", "rows": rows})
            i = j
        elif re.match(r"^=+[^=].*=+$", s):
            flush()
            level = len(s) - len(s.lstrip("="))
            h = plain(s.strip("= "))
            if h:
                out.append({"t": "h", "x": h, "l": level})
        elif s.startswith(("*", "#")):
            flush()
            items = []
            while i < len(lines) and lines[i].strip().startswith(("*", "#")):
                raw = lines[i].strip()
                depth = len(raw) - len(raw.lstrip("*#"))
                item = inline(raw.lstrip("*#:; "))
                if item:
                    items.append([depth, item])
                i += 1
            if items:
                out.append({"t": "ul", "items": items})
            continue
        elif not s or s.startswith(("__", "[[Category", "{{", "}}")):
            flush()
        else:
            para.append(s.lstrip(":;"))
        i += 1
    flush()

    # Headings that were buried inside tables or divs come through as paragraphs.
    for b in out:
        m = re.match(r"^(=+)\s*(.+?)\s*=+$", b.get("x", "")) if b["t"] == "p" else None
        if m:
            b.clear(); b.update({"t": "h", "x": m.group(2), "l": len(m.group(1))})

    # Drop headings with nothing under them.
    cleaned = []
    for b in out:
        if b["t"] == "h" and cleaned and cleaned[-1]["t"] == "h" and cleaned[-1]["l"] >= b["l"]:
            cleaned.pop()
        cleaned.append(b)
    while cleaned and cleaned[-1]["t"] == "h":
        cleaned.pop()
    return cleaned


def gallery_files(text):
    files = []
    for g in re.findall(r"<gallery[^>]*>(.*?)</gallery>", text, flags=re.S | re.I):
        for line in g.split("\n"):
            name, _, cap = line.strip().partition("|")
            name = re.sub(r"^(File|Image):", "", name.strip(), flags=re.I)
            if re.search(r"\.(png|jpe?g|gif|webp)$", name, re.I):
                files.append((name, plain(cap)))
    for m in re.finditer(r"\[\[(?:File|Image):([^|\]]+)(?:\|([^\]]*))?\]\]", text, re.I):
        name = m.group(1).strip()
        if re.search(r"\.(png|jpe?g|gif|webp)$", name, re.I):
            files.append((name, ""))
    return files
