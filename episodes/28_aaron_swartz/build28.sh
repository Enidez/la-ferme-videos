#!/bin/bash
# Fabrique l'ép. 28 en 16:9 : rendu parallèle (NJ morceaux), effets, musique par chapitres, mix -14 LUFS.
# Usage : bash episodes/28_aaron_swartz/build28.sh sortie.mp4 [début fin]   (début/fin : aperçu d'un extrait seulement)
set -e
P="$(cd "$(dirname "$0")" && pwd)"; ROOT="$P/../.."; PY="$ROOT/venv/bin/python"; OUT="$(realpath -m "$1")"; W=$(mktemp -d)
DUR=$("$PY" - "$P" <<'EOF'
import sys,json,re;s=open(sys.argv[1]+'/segs.js').read();S=json.loads(re.search(r'const SEGS=(\[.*?\]);',s).group(1));print(round(S[-1]['t1']+.35+4.2,2))
EOF
)
A=${2:-0}; B=${3:-$DUR}; NJ=${NJ:-$(nproc)}
: > "$W/parts.txt"
for i in $(seq 0 $((NJ-1))); do
  a=$(echo "scale=3;$A+($B-$A)*$i/$NJ" | bc); b=$(echo "scale=3;$A+($B-$A)*($i+1)/$NJ" | bc)
  "$PY" "$P/render28.py" full "$W/part$i.mp4" "$a" "$b" > "$W/log$i.txt" 2>&1 &
  echo "file '$W/part$i.mp4'" >> "$W/parts.txt"
done
wait; grep -h "PAGE ERROR" "$W"/log*.txt || true
ffmpeg -v error -y -f concat -safe 0 -i "$W/parts.txt" -c copy "$W/video.mp4"
LEN=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$W/video.mp4")
"$PY" "$ROOT/tools/sfx.py" "$P/events.json" "$W/sfx_full.wav" "$DUR"
# musique par chapitres : piano (enfance), tension (combat → procès), sombre (la mort), piano (fin)
"$PY" - "$ROOT/music" "$W/music_full.wav" "$DUR" "$P/audio/timeline.json" <<'EOF'
import sys,json,subprocess,numpy as np
M,out,dur,tl=sys.argv[1],sys.argv[2],float(sys.argv[3]),json.load(open(sys.argv[4]));SR=48000
t=lambda lab:[e['t0'] for e in tl if e['id'].startswith(lab)][0]
def load(f):return np.frombuffer(subprocess.run(['ffmpeg','-v','error','-i',f,'-ac','2','-ar',str(SR),'-f','f32le','-'],capture_output=True).stdout,np.float32).reshape(-1,2)
TR={'hb':load(M+'/heartbreaking.mp3'),'hit':load(M+'/hitman.mp3'),'dark':load(M+'/darktimes.mp3')}
SEC=[(0,t('0a')-.3,None,0),(t('0a')-.3,t('3a'),'hb',.9),(t('3a'),t('6a'),'hit',.8),(t('6a'),t('V6'),'dark',.7),(t('V6'),t('7a'),'dark',.35),(t('7a'),dur,'hb',.9)]
y=np.zeros((int(dur*SR)+SR,2),np.float32);F=int(1.4*SR)
for a,b,k,g in SEC:
    if not k:continue
    src=TR[k];n=int((b-a)*SR)+F;seg=np.tile(src,(n//len(src)+1,1))[:n]*g
    ramp=np.ones(n,np.float32);ramp[:F]=np.sin(np.linspace(0,np.pi/2,F))**2;ramp[-F:]=np.cos(np.linspace(0,np.pi/2,F))**2
    i=int(a*SR);y[i:i+n]+=seg[:len(y)-i]*ramp[:len(y)-i,None]
subprocess.run(['ffmpeg','-v','error','-y','-f','f32le','-ar',str(SR),'-ac','2','-i','-',out],input=y.astype(np.float32).tobytes(),check=True)
EOF
ffmpeg -v error -y -ss $A -t $LEN -i "$P/audio/vo_complete.wav" -ss $A -t $LEN -i "$W/music_full.wav" -ss $A -t $LEN -i "$W/sfx_full.wav" -filter_complex "[0]aresample=48000,pan=stereo|c0=c0|c1=c0,acompressor=threshold=-20dB:ratio=3:attack=5:release=120:makeup=2dB,apad=whole_dur=${LEN}[v];[v]asplit=3[v1][v2][v3];[1]volume=0.32[m];[m][v2]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=400[md];[2]volume=0.55[s];[s][v3]sidechaincompress=threshold=0.05:ratio=3:attack=5:release=200[sd];[v1][md][sd]amix=inputs=3:normalize=0,alimiter=limit=0.85,loudnorm=I=-14:TP=-1.5:LRA=11,alimiter=limit=0.84:level=false" -ar 48000 "$W/mix.wav"
ffmpeg -v error -y -i "$W/video.mp4" -i "$W/mix.wav" -c:v libx264 -preset slow -crf 20 -maxrate 6000k -bufsize 9000k -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart "$OUT"
echo "OK : $OUT ($(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT") s)"
# générique « ferme-la » en 16:9 (GENERIQUE=0 pour s'en passer)
if [ "${GENERIQUE:-1}" = 1 ] && [ -z "$2" ]; then
  G="$ROOT/generique16/generique16.mp4"; mv "$OUT" "$W/sans_generique.mp4"
  ffmpeg -v error -y -i "$W/sans_generique.mp4" -i "$G" -filter_complex "[0:v]fps=30,setsar=1[v0];[1:v]fps=30,setsar=1[v1];[0:a]aresample=48000,afade=t=out:st=$(echo "$LEN-0.15"|bc):d=0.15[a0];[1:a]aresample=48000[a1];[v0][a0][v1][a1]concat=n=2:v=1:a=1[v][a]" -map "[v]" -map "[a]" -c:v libx264 -preset slow -crf 20 -maxrate 6000k -bufsize 9000k -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart "$OUT"
  echo "générique ajouté : $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT") s"
fi
