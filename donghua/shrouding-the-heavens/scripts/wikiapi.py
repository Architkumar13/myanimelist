"""Small helpers for talking to the fan wiki's MediaWiki API."""
import json
import re
import ssl
import subprocess
import urllib.parse
import urllib.request

API = "https://shrouding-the-heavens.fandom.com/api.php"
UA = {"User-Agent": "Mozilla/5.0 (personal fan notes; one-off fetch)"}


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


def get(url, retries=3):
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), context=CTX, timeout=30) as r:
                return r.read()
        except OSError:
            if attempt == retries - 1:
                raise


def api(params):
    params = {**params, "format": "json", "formatversion": "2" if params.get("action") == "parse" else "1"}
    return json.loads(get(API + "?" + urllib.parse.urlencode(params)))


def safe_name(title):
    return re.sub(r"[^\w\-]+", "_", title).strip("_")
