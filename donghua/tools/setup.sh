#!/bin/sh
# One-time setup for the donghua tools: a Python environment, certificates and face models in donghua/.tools/.
set -e
cd "$(dirname "$0")/.."
mkdir -p .tools/models
# Trust the macOS keychain too (corporate TLS proxies), plus the public roots.
security find-certificate -a -p /Library/Keychains/System.keychain /System/Library/Keychains/SystemRootCertificates.keychain > .tools/cacert.pem
export SSL_CERT_FILE="$PWD/.tools/cacert.pem"
[ -x .tools/venv/bin/python ] || python3 -m venv .tools/venv
.tools/venv/bin/pip install -q -U "yt-dlp[default,curl-cffi]" opencv-python-headless imageio-ffmpeg pillow numpy pyobjc-framework-Vision certifi
# add the public roots too (some video hosts chain to CAs the keychain lacks)
cat "$(.tools/venv/bin/python -c 'import certifi; print(certifi.where())')" >> .tools/cacert.pem
Z=https://github.com/opencv/opencv_zoo/raw/main/models
[ -s .tools/models/yunet.onnx ] || curl -sL -o .tools/models/yunet.onnx $Z/face_detection_yunet/face_detection_yunet_2023mar.onnx
[ -s .tools/models/sface.onnx ] || curl -sL -o .tools/models/sface.onnx $Z/face_recognition_sface/face_recognition_sface_2021dec.onnx
echo "Ready: run tools with .tools/venv/bin/python tools/<script>.py"
