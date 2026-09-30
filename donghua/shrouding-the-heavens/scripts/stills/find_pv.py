import subprocess, re, json, os, concurrent.futures as cf
env = {**os.environ, "SSL_CERT_FILE": "/tmp/ytenv/cacert.pem"}
def search(n):
    out = []
    for q in (f"Shrouding the Heavens Episode {n} Preview", f"遮天 {n}集 预告"):
        r = subprocess.run(["/tmp/ytenv/bin/yt-dlp", "--flat-playlist", "--print", "%(id)s\t%(duration)s\t%(channel)s\t%(title)s", f"ytsearch8:{q}"],
                           capture_output=True, text=True, env=env).stdout
        for line in r.splitlines():
            p = line.split("\t")
            if len(p) < 4: continue
            try: d = float(p[1])
            except ValueError: continue
            t = p[3]
            nums = [int(x) for x in re.findall(r"(?<!\d)(\d{2,3})(?!\d)", t)]
            if d <= 180 and n in nums and re.search(r"preview|pv|预告|trailer", t, re.I) and not re.search(r"explain|讲解|解说", t, re.I):
                out.append({"id": p[0], "dur": d, "ch": p[2], "title": t})
    seen, res = set(), []
    for o in out:
        if o["id"] not in seen: seen.add(o["id"]); res.append(o)
    return n, res
with cf.ThreadPoolExecutor(6) as ex:
    res = dict(ex.map(search, range(51, 184)))
json.dump(res, open("/tmp/stills/pv.json", "w"), ensure_ascii=False, indent=1)
print(sum(1 for v in res.values() if v), "episodes with a preview")
