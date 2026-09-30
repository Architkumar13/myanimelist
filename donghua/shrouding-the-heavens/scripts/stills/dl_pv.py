import json, subprocess, os, concurrent.futures as cf, pathlib
env = {**os.environ, "SSL_CERT_FILE": "/tmp/ytenv/cacert.pem"}
res = json.load(open("/tmp/stills/pv.json"))
def get(item):
    n, cands = item
    out = pathlib.Path(f"/tmp/stills/pv/ep{int(n):03d}.mp4")
    if out.exists(): return n, "have"
    for c in cands[:3]:
        r = subprocess.run(["/tmp/ytenv/bin/yt-dlp", "-q", "--no-warnings", "-f", "bv*[height<=720][ext=mp4]/bv*[height<=720]", "-o", str(out), f"https://www.youtube.com/watch?v={c['id']}"], env=env, capture_output=True, text=True)
        if out.exists(): return n, c["id"]
    return n, "fail"
with cf.ThreadPoolExecutor(6) as ex:
    got = dict(ex.map(get, [(k, v) for k, v in res.items() if v]))
json.dump(got, open("/tmp/stills/pv_got.json", "w"))
print(sum(1 for v in got.values() if v != "fail"), "downloaded")
