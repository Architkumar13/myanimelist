"""Serve the site on your machine, with a working Sync button.

Usage: python3 scripts/serve.py [--port 8000] [--no-open]
Opens http://localhost:8000. MyAnimeList won't answer requests made from a web page, so the Sync
button asks this server to run scripts/sync.py instead, then the page reloads with the new data.
"""
import argparse
import http.server
import json
import pathlib
import threading
import traceback
import webbrowser

import sync

SITE = pathlib.Path(__file__).resolve().parent.parent / "site"


class Job:
    """One sync at a time; the page polls /api/sync for its progress."""

    def __init__(self):
        self.lock = threading.Lock()
        self.state, self.log, self.result, self.error = "idle", [], None, None

    def start(self):
        with self.lock:
            if self.state == "running":
                return False
            self.state, self.log, self.result, self.error = "running", [], None, None
        threading.Thread(target=self.run, daemon=True).start()
        return True

    def run(self):
        try:
            self.result = sync.sync(log=self.log.append)
            self.state = "done"
        except sync.SyncError as e:
            self.error, self.state = str(e), "error"
        except Exception as e:  # noqa: BLE001 - report anything else to the page too
            traceback.print_exc()
            self.error, self.state = f"Sync failed: {e}", "error"

    def status(self):
        return {"state": self.state, "log": self.log[-8:], "result": self.result, "error": self.error}


job = Job()


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(SITE), **kwargs)

    def end_headers(self):
        # The data files change on every sync, so never let the browser reuse an old copy.
        if self.path.startswith(("/data/", "/api/")):
            self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def send_json(self, code, body):
        data = json.dumps(body, ensure_ascii=False).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        if self.path == "/api/sync":
            return self.send_json(200, job.status())
        super().do_GET()

    def do_POST(self):
        if self.path != "/api/sync":
            return self.send_json(404, {"error": "Not found"})
        # Only this site may start a sync, not some other page open in the browser.
        origin = self.headers.get("Origin", "")
        if origin and origin != f"http://{self.headers.get('Host')}":
            return self.send_json(403, {"error": "Sync can only be started from this site."})
        started = job.start()
        self.send_json(202 if started else 409, job.status())

    def log_message(self, fmt, *args):
        if "/api/" not in (args[0] if args else ""):
            super().log_message(fmt, *args)


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--port", type=int, default=8000)
    parser.add_argument("--no-open", action="store_true", help="don't open a browser tab")
    args = parser.parse_args()
    server = http.server.ThreadingHTTPServer(("127.0.0.1", args.port), Handler)
    url = f"http://localhost:{args.port}/"
    print(f"Serving the site at {url} (Ctrl+C to stop)")
    if not args.no_open:
        webbrowser.open(url)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")


if __name__ == "__main__":
    main()
