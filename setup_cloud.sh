#!/bin/bash
# Installation sur une machine Linux (session Claude Code dans le cloud).
# Lancée AUTOMATIQUEMENT au démarrage de chaque session cloud (hook .claude/settings.json).
# Idempotente et rapide : ne refait que ce qui manque. À la main : bash setup_cloud.sh
set -e
cd "$(dirname "$0")"
SUDO=$(command -v sudo || true)
command -v ffmpeg >/dev/null && command -v bc >/dev/null && command -v npm >/dev/null \
  || { $SUDO apt-get update -qq && $SUDO apt-get install -y -qq ffmpeg bc curl bzip2 python3-venv nodejs npm >/dev/null; }
[ -x venv/bin/python ] || python3 -m venv venv
venv/bin/python -c "import playwright,numpy,scipy,cv2,soundfile,sherpa_onnx,yt_dlp" 2>/dev/null \
  || venv/bin/pip install -q -r requirements.txt yt-dlp
# Chromium : déjà installé dans /opt/pw-browsers sur le cloud, tools/render.py le trouve tout seul.
[ -d /opt/pw-browsers ] || venv/bin/playwright install --with-deps chromium
[ -d node_modules/@fontsource/anton ] || npm install --silent --no-audit --no-fund
for d in episodes/*/; do ln -sfn "$(pwd)/node_modules" "$d/node_modules"; done
ls jplus1/assets/models/*.js >/dev/null 2>&1 || python3 jplus1/scripts/gltf2js.py >/dev/null || true
# modèle de transcription (≈ 350 Mo) : téléchargé en arrière-plan pour ne pas bloquer le démarrage
if [ ! -f models/sherpa-onnx-whisper-small/small-encoder.int8.onnx ]; then
  mkdir -p models
  nohup sh -c 'curl -sL https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-whisper-small.tar.bz2 | tar xj -C models' >/dev/null 2>&1 &
fi
# dépôt public qui sert d'hébergeur pour Metricool (cloné s'il est attaché à la session)
[ -d ../la-ferme-publication/.git ] || git clone -q --depth 1 https://github.com/Enidez/la-ferme-publication ../la-ferme-publication 2>/dev/null || true
echo "Installation cloud terminée."
