#!/bin/bash
# Refait la vidéo d'un épisode déjà produit avec son mix audio d'origine (audio/mix.m4a).
# Usage : tools/rebuild.sh episodes/<projet> sortie.mp4
set -e
cd "$(dirname "$0")/.."; ROOT=$(pwd); P="$1"; OUT="$2"; W=$(mktemp -d)
ln -sfn "$ROOT/node_modules" "$P/node_modules"
venv/bin/python tools/render.py "$P" full "$W/video.mp4"
ffmpeg -v error -y -i "$W/video.mp4" -i "$P/audio/mix.m4a" -c:v libx264 -preset slow -b:v 1900k -maxrate 2600k -bufsize 4500k -pix_fmt yuv420p -c:a copy -shortest -movflags +faststart "$OUT"
echo "OK : $OUT"
