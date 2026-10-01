"""Paths and helpers shared by the donghua tools. Everything persistent lives in donghua/.tools/ (see setup.sh)."""
import json, os, pathlib

HUB = pathlib.Path(__file__).resolve().parent.parent          # donghua/
TOOLS = HUB / ".tools"
PY = TOOLS / "venv" / "bin" / "python"
YTDLP = str(TOOLS / "venv" / "bin" / "yt-dlp")
# yt-dlp prefers its bundled certifi roots; the office proxy (Zscaler) is only trusted via the keychain bundle
YTDLP_OPTS = ["--compat-options", "no-certifi"]
MODELS = TOOLS / "models"
CACERT = str(TOOLS / "cacert.pem")
ENV = {**os.environ, "SSL_CERT_FILE": CACERT}
SHOWS = json.loads((pathlib.Path(__file__).parent / "shows.json").read_text())


def show(sid):
    """Config for a show id (sth, tgr) plus its folders."""
    cfg = dict(SHOWS[sid])
    cfg["root"] = HUB / cfg["dir"]
    cfg["cache"] = cfg["root"] / "cache" / "animekhor"
    cfg["cache"].mkdir(parents=True, exist_ok=True)
    return cfg


def ffmpeg():
    import imageio_ffmpeg
    return imageio_ffmpeg.get_ffmpeg_exe()
