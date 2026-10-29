#!/bin/bash
# Comme build.sh, mais le rendu des images tourne en parallèle sur tous les cœurs (NJ=nombre de morceaux).
# Usage : tools/build_rapide.sh episodes/<projet> sortie.mp4 [musique.mp3] ["sections"]
#  - le projet doit contenir index.html, board.js, segs.js, img/, clips/ et audio/vo.wav (ou audio/vo.mp3)
#  - sans sections : musique en continu. Exemple de sections : "0:T23:50,T23:T25:30,T25:END:104"
set -e
cd "$(dirname "$0")/.."; ROOT=$(pwd); P="$1"; OUT="$2"; MUS="${3:-music/hitman.mp3}"; SEC="${4:-0:END:0}"
PY=$ROOT/venv/bin/python; W=$(mktemp -d)
[ -e "$P/audio/vo.wav" ] && VO="$P/audio/vo.wav" || VO="$P/audio/vo.mp3"
ln -sfn "$ROOT/node_modules" "$P/node_modules"
# rendu découpé en NJ morceaux rendus en parallèle (un navigateur par cœur), puis recollés
NJ=${NJ:-$(nproc)}
DURV=$("$PY" -c "import json,sys;s=[l for l in open(sys.argv[1]).read().split(chr(10)) if l.startswith('const SEGS=')][0];print(json.loads(s[s.index('['):s.rindex(']')+1])[-1]['t1']+.35+3.8)" "$P/segs.js")
: > "$W/parts.txt"
for i in $(seq 0 $((NJ-1))); do
  A=$(echo "scale=4;$DURV*$i/$NJ" | bc); B=$(echo "scale=4;$DURV*($i+1)/$NJ" | bc); [ $i = $((NJ-1)) ] && B=$(echo "$DURV+1" | bc)
  "$PY" tools/render.py "$P" full "$W/part$i.mp4" "$A" "$B" > "$W/log$i.txt" 2>&1 &
  echo "file '$W/part$i.mp4'" >> "$W/parts.txt"
done
wait
ffmpeg -v error -y -f concat -safe 0 -i "$W/parts.txt" -c copy "$W/video.mp4"
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$W/video.mp4")
"$PY" tools/sfx.py "$P/events.json" "$W/sfx.wav" $DUR
"$PY" tools/music_arrange.py "$MUS" "$P/segs.js" $DUR "$W/music.wav" "$SEC"
ffmpeg -v error -y -i "$VO" -i "$W/music.wav" -i "$W/sfx.wav" -filter_complex "[0]aresample=48000,pan=stereo|c0=c0|c1=c0,acompressor=threshold=-20dB:ratio=3:attack=5:release=120:makeup=2dB,apad=whole_dur=${DUR}[v];[v]asplit=3[v1][v2][v3];[1]volume=0.5[m];[m][v2]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=350[md];[2]volume=0.7[s];[s][v3]sidechaincompress=threshold=0.05:ratio=3:attack=5:release=200[sd];[v1][md][sd]amix=inputs=3:normalize=0,alimiter=limit=0.85,loudnorm=I=-14:TP=-1.5:LRA=11" -ar 48000 "$W/mix.wav"
ffmpeg -v error -y -i "$W/video.mp4" -i "$W/mix.wav" -c:v libx264 -preset slow -b:v 1900k -maxrate 2600k -bufsize 4500k -pix_fmt yuv420p -c:a aac -b:a 160k -shortest -movflags +faststart "$OUT"
ffmpeg -v error -y -ss 2 -i "$OUT" -frames:v 1 -q:v 2 "${OUT%.mp4}_couverture.jpg"
# générique de fin « ferme-la » enchaîné juste après la dernière phrase (GENERIQUE=0 pour s'en passer)
if [ "${GENERIQUE:-1}" = 1 ]; then
  VEND=$("$PY" -c "import json,sys;s=[l for l in open(sys.argv[1]).read().split(chr(10)) if l.startswith('const SEGS=')][0];m=[l for l in open(sys.argv[1]).read().split(chr(10)) if l.startswith('const MARK=')];print(json.loads(s[s.index('['):s.rindex(']')+1])[-1]['t1']+.35+(json.loads(m[0][11:].rstrip(';')).get('tail',0) if m else 0))" "$P/segs.js")
  CUT=$(echo "$VEND + 1.4" | bc); mv "$OUT" "$W/sans_generique.mp4"; bash tools/generique.sh "$W/sans_generique.mp4" "$OUT" "$CUT"
fi
echo "OK : $OUT (+ couverture)"
