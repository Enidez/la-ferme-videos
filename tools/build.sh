#!/bin/bash
# Fabrique une vidéo complète à partir d'un projet (style tableau).
# Usage : tools/build.sh episodes/<projet> sortie.mp4 [musique.mp3] ["sections"]
#  - le projet doit contenir index.html, board.js, segs.js, img/, clips/ et audio/vo.wav (ou audio/vo.mp3)
#  - sans sections : musique en continu. Exemple de sections : "0:T23:50,T23:T25:30,T25:END:104"
set -e
cd "$(dirname "$0")/.."; ROOT=$(pwd); P="$1"; OUT="$2"; MUS="${3:-music/hitman.mp3}"; SEC="${4:-0:END:0}"
PY=$ROOT/venv/bin/python; W=$(mktemp -d)
[ -e "$P/audio/vo.wav" ] && VO="$P/audio/vo.wav" || VO="$P/audio/vo.mp3"
ln -sfn "$ROOT/node_modules" "$P/node_modules"
$PY tools/render.py "$P" full "$W/video.mp4"
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$W/video.mp4")
$PY tools/sfx.py "$P/events.json" "$W/sfx.wav" $DUR
$PY tools/music_arrange.py "$MUS" "$P/segs.js" $DUR "$W/music.wav" "$SEC"
ffmpeg -v error -y -i "$VO" -i "$W/music.wav" -i "$W/sfx.wav" -filter_complex "[0]aresample=48000,pan=stereo|c0=c0|c1=c0,acompressor=threshold=-20dB:ratio=3:attack=5:release=120:makeup=2dB,apad=whole_dur=${DUR}[v];[v]asplit=3[v1][v2][v3];[1]volume=0.5[m];[m][v2]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=350[md];[2]volume=0.7[s];[s][v3]sidechaincompress=threshold=0.05:ratio=3:attack=5:release=200[sd];[v1][md][sd]amix=inputs=3:normalize=0,alimiter=limit=0.85,loudnorm=I=-14:TP=-1.5:LRA=11" -ar 48000 "$W/mix.wav"
ffmpeg -v error -y -i "$W/video.mp4" -i "$W/mix.wav" -c:v libx264 -preset slow -b:v 1900k -maxrate 2600k -bufsize 4500k -pix_fmt yuv420p -c:a aac -b:a 160k -shortest -movflags +faststart "$OUT"
ffmpeg -v error -y -ss 2 -i "$OUT" -frames:v 1 -q:v 2 "${OUT%.mp4}_couverture.jpg"
echo "OK : $OUT (+ couverture)"
