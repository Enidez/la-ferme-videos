#!/bin/bash
# Installation sur une machine Linux (session Claude Code dans le cloud). Lancer une fois : bash setup_cloud.sh
set -e
cd "$(dirname "$0")"
SUDO=$(command -v sudo || true)
$SUDO apt-get update -qq && $SUDO apt-get install -y -qq ffmpeg bc curl bzip2 python3-venv nodejs npm >/dev/null
python3 -m venv venv
venv/bin/pip install -q -r requirements.txt
venv/bin/playwright install --with-deps chromium
npm install --silent
if [ ! -f models/sherpa-onnx-whisper-small/small-encoder.int8.onnx ]; then
  mkdir -p models && cd models
  curl -L -o w.tar.bz2 https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-whisper-small.tar.bz2
  tar xjf w.tar.bz2 && rm w.tar.bz2 && cd ..
fi
for d in episodes/*/; do ln -sfn "$(pwd)/node_modules" "$d/node_modules"; done
echo "Installation cloud terminée."
