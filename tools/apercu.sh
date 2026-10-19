#!/bin/bash
# Aperçu d'un EXTRAIT seulement (pour valider une modification avant le rendu complet, règle d'Enidez).
# Usage : tools/apercu.sh <projet> sortie.mp4 debut_s fin_s [musique.mp3] ["sections"]
set -e
cd "$(dirname "$0")/.."; ROOT=$(pwd); P="$1"; OUT="$2"; T0="$3"; T1="$4"; MUS="${5:-music/hitman.mp3}"; SEC="${6:-0:END:0}"
PY=$ROOT/venv/bin/python; W=$(mktemp -d)
[ -e "$P/audio/vo.wav" ] && VO="$P/audio/vo.wav" || VO="$P/audio/vo.mp3"
ln -sfn "$ROOT/node_modules" "$P/node_modules"
"$PY" tools/render.py "$P" full "$W/video.mp4" "$T0" "$T1"
FULL=$(echo "$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$VO") + 4" | bc)
"$PY" tools/sfx.py "$P/events.json" "$W/sfx.wav" "$FULL"
"$PY" tools/music_arrange.py "$MUS" "$P/segs.js" "$FULL" "$W/music.wav" "$SEC"
D=$(echo "$T1 - $T0" | bc)
ffmpeg -v error -y -i "$VO" -i "$W/music.wav" -i "$W/sfx.wav" -filter_complex "[0]aresample=48000,pan=stereo|c0=c0|c1=c0,acompressor=threshold=-20dB:ratio=3:attack=5:release=120:makeup=2dB,apad=whole_dur=${FULL}[v];[v]asplit=3[v1][v2][v3];[1]volume=0.5[m];[m][v2]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=350[md];[2]volume=0.7[s];[s][v3]sidechaincompress=threshold=0.05:ratio=3:attack=5:release=200[sd];[v1][md][sd]amix=inputs=3:normalize=0,atrim=${T0}:${T1},asetpts=PTS-STARTPTS,alimiter=limit=0.85,loudnorm=I=-14:TP=-1.5" -ar 48000 "$W/mix.wav"
ffmpeg -v error -y -i "$W/video.mp4" -i "$W/mix.wav" -c:v libx264 -preset fast -b:v 3000k -maxrate 4000k -bufsize 6000k -pix_fmt yuv420p -c:a aac -b:a 160k -shortest -movflags +faststart "$OUT"
echo "APERÇU OK : $OUT ($T0 → $T1 s)"
