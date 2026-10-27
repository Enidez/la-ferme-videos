#!/bin/bash
# Télécharge une vidéo YouTube depuis le cloud (cookies d'Enidez, jamais versionnés).
# Usage : tools/yt.sh URL sortie.mp4   — cookies attendus dans /root/.secrets/yt_cookies.txt
cd "$(dirname "$0")/.."
SSL_CERT_FILE=/root/.ccr/ca-bundle.crt venv/bin/yt-dlp --cookies /root/.secrets/yt_cookies.txt --js-runtimes deno:venv/bin/deno \
  -q -f "b[height<=1080]/bv*[height<=1080]+ba" --merge-output-format mp4 -o "$2" "$1"
