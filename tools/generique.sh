#!/bin/bash
# Colle le générique de fin LA FERME (réplique de film + logo qui claque) à la fin d'une vidéo.
# Usage : tools/generique.sh entree.mp4 sortie.mp4
# Le générique est fabriqué une seule fois dans generique/generique.mp4 (supprimer ce fichier pour le refaire).
set -e
cd "$(dirname "$0")/.."; ROOT=$(pwd); IN="$1"; OUT="$2"; PY="$ROOT/venv/bin/python"; G=generique
if [ ! -e "$G/generique.mp4" ]; then
  ln -sfn "$ROOT/node_modules" "$G/node_modules"; W=$(mktemp -d)
  "$PY" tools/render.py "$G" full "$W/v.mp4"
  DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$W/v.mp4")
  "$PY" tools/sfx.py "$G/events.json" "$W/sfx.wav" $DUR
  ffmpeg -v error -y -i "$G/replique.m4a" -i "$W/sfx.wav" -filter_complex "[0]atrim=0:2.6,asetpts=PTS-STARTPTS,aresample=48000,afade=t=out:st=2.2:d=0.4,loudnorm=I=-15:TP=-2,apad=whole_dur=$DUR[r];[1]aresample=48000,volume=0.45[s];[r][s]amix=inputs=2:normalize=0,alimiter=limit=0.85" -ac 2 -ar 48000 "$W/a.wav"
  ffmpeg -v error -y -i "$W/v.mp4" -i "$W/a.wav" -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -r 30 -c:a aac -b:a 160k -ar 48000 -ac 2 -shortest "$G/generique.mp4"
fi
BR=$(ffprobe -v error -select_streams v:0 -show_entries stream=bit_rate -of default=nw=1:nk=1 "$IN" | head -1 | tr -dc 0-9); BR=${BR:-1800000}
ffmpeg -v error -y -i "$IN" -i "$G/generique.mp4" -filter_complex "[0:v]fps=30,setsar=1[v0];[1:v]fps=30,setsar=1[v1];[0:a]aresample=48000[a0];[1:a]aresample=48000[a1];[v0][a0][v1][a1]concat=n=2:v=1:a=1[v][a]" -map "[v]" -map "[a]" -c:v libx264 -preset slow -b:v $BR -maxrate $((BR*14/10)) -bufsize $((BR*2)) -pix_fmt yuv420p -c:a aac -b:a 160k -movflags +faststart "$OUT"
echo "OK : $OUT"
