#!/bin/bash
# Installation complète sur un nouveau Mac (à lancer une fois depuis le dossier du dépôt).
set -e
cd "$(dirname "$0")"
command -v brew >/dev/null || { echo "Installe d'abord Homebrew : https://brew.sh"; exit 1; }
brew list ffmpeg >/dev/null 2>&1 || brew install ffmpeg
command -v node >/dev/null || brew install node
python3 -m venv venv
venv/bin/pip install -q -r requirements.txt
venv/bin/playwright install chromium
npm install --silent
# modèle de transcription (≈ 350 Mo, une seule fois)
if [ ! -f models/sherpa-onnx-whisper-small/small-encoder.int8.onnx ]; then
  mkdir -p models && cd models
  curl -L -o w.tar.bz2 https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-whisper-small.tar.bz2
  tar xjf w.tar.bz2 && rm w.tar.bz2 && cd ..
fi
# chaque épisode pointe vers les polices installées
for d in episodes/*/; do ln -sfn "$(pwd)/node_modules" "$d/node_modules"; done
echo "Installation terminée."
