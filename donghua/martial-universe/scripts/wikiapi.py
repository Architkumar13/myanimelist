"""Small helpers for talking to the fan wiki's MediaWiki API."""
import json
import threading
import time
import re
import ssl
import subprocess
import urllib.error
import urllib.parse
import urllib.request

API = "https://wu-dong-qian-kun.fandom.com/api.php"
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"}


def _ssl_context():
    """Trust the macOS system keychain too, so corporate TLS proxies work."""
    ctx = ssl.create_default_context()
    # Python 3.13's strict mode rejects some corporate proxy CAs; keep normal verification.
    ctx.verify_flags &= ~getattr(ssl, "VERIFY_X509_STRICT", 0)
    try:
        pem = subprocess.run(
            ["security", "find-certificate", "-a", "-p",
             "/Library/Keychains/System.keychain",
             "/System/Library/Keychains/SystemRootCertificates.keychain"],
            capture_output=True, text=True, check=True).stdout
        ctx.load_verify_locations(cadata=pem)
    except (OSError, subprocess.CalledProcessError, ssl.SSLError):
        pass
    return ctx


CTX = _ssl_context()


_RATE_LOCK = threading.Lock()
_NEXT_OK = 0.0


def get(url, retries=10):
    """Fetch bytes. Space requests out, and back off when the wiki says to slow down."""
    global _NEXT_OK
    for attempt in range(retries):
        with _RATE_LOCK:
            delay = _NEXT_OK - time.time()
            if delay > 0:
                time.sleep(delay)
            _NEXT_OK = time.time() + 0.75
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), context=CTX, timeout=60) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            if e.code not in (429, 500, 502, 503, 504) or attempt == retries - 1:
                raise
            try:
                retry_after = int(e.headers.get("Retry-After") or 0)
            except (TypeError, ValueError):
                retry_after = 0
            pause = max(retry_after, min(180, 20 * (attempt + 1)))
            with _RATE_LOCK:
                _NEXT_OK = max(_NEXT_OK, time.time() + pause)
            time.sleep(pause)
        except OSError:
            if attempt == retries - 1:
                raise
            time.sleep(min(60, 5 * (attempt + 1)))


def api(params):
    params = {**params, "format": "json", "formatversion": "2" if params.get("action") == "parse" else "1"}
    return json.loads(get(API + "?" + urllib.parse.urlencode(params)))


def safe_name(title):
    return re.sub(r"[^\w\-]+", "_", title).strip("_")
