#!/bin/bash
# Installation sur une machine Linux (session Claude Code dans le cloud). Lancer une fois : bash setup_cloud.sh
set -e
cd "$(dirname "$0")"
SUDO=$(command -v sudo || true)
$SUDO apt-get update -qq && $SUDO apt-get install -y -qq ffmpeg bc curl bzip2 python3-venv nodejs npm >/dev/null
python3 -m venv venv
venv/bin/pip install -q -r requirements.txt
# Chromium : sur le cloud il est déjà dans /opt/pw-browsers, mais pas au numéro attendu par ce Playwright -> dossier .pw/ de liens
if [ -d /opt/pw-browsers ]; then
  REV=$(venv/bin/python -c "import json,playwright,os;d=json.load(open(os.path.join(os.path.dirname(playwright.__file__),'driver/package/browsers.json')));print([b['revision'] for b in d['browsers'] if b['name']=='chromium-headless-shell'][0])")
  SRC=$(ls -d /opt/pw-browsers/chromium_headless_shell-*/chrome-linux | head -1)
  D=.pw/chromium_headless_shell-$REV/chrome-headless-shell-linux64; mkdir -p "$D"
  for f in "$SRC"/*; do ln -sfn "$f" "$D/"; done; ln -sfn "$SRC/headless_shell" "$D/chrome-headless-shell"
  touch .pw/chromium_headless_shell-$REV/INSTALLATION_COMPLETE .pw/chromium_headless_shell-$REV/DEPENDENCIES_VALIDATED
else
  venv/bin/playwright install --with-deps chromium
fi
venv/bin/pip install -q yt-dlp
npm install --silent
if [ ! -f models/sherpa-onnx-whisper-small/small-encoder.int8.onnx ]; then
  mkdir -p models && cd models
  curl -L -o w.tar.bz2 https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-whisper-small.tar.bz2
  tar xjf w.tar.bz2 && rm w.tar.bz2 && cd ..
fi
for d in episodes/*/; do ln -sfn "$(pwd)/node_modules" "$d/node_modules"; done
echo "Installation cloud terminée."
