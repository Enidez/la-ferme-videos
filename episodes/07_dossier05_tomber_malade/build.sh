S=/private/tmp/claude-502/-Users-enidez-Downloads-La-ferme/48ecaf76-2d0e-499e-a5e9-ba22f92a6914/scratchpad; cd $S/ep7
$S/venv/bin/python $S/tools/render.py $S/ep7/proj full $S/ep7/video_noaudio.mp4 > render.log 2>&1; echo "render $?"
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 video_noaudio.mp4); echo DUR $DUR
node -e "const s=require('fs').readFileSync('proj/segs.js','utf8');require('fs').writeFileSync('segs.json',s.slice(11,-1))"
$S/venv/bin/python sfx7.py $S $DUR >/dev/null && $S/venv/bin/python - "$S" "$DUR" <<'PY'
import numpy as np,librosa,json,sys
from scipy.io import wavfile
S,DUR=sys.argv[1],float(sys.argv[2]);sr=48000
y,_=librosa.load(S+'/dl_music/hitman.mp3',sr=sr,mono=False)
segs=json.load(open(S+'/ep7/segs.json'));T=[d['t0'] for d in segs];VEND=segs[-1]['t1']+.35
L=len(y[0])/sr
P=[(0.0,T[23],50.0),(T[23],T[25],30.0),(T[25],VEND+.3,104.0),(VEND+.3,DUR,L-(DUR-(VEND+.3)))]
out=np.zeros((2,int(DUR*sr)+sr));F=.6
for i,(a,b,src) in enumerate(P):
    a2=a-(F if i>0 else 0);b2=b+(F if i<len(P)-1 else 0);s0=src-(a-a2);n=int((b2-a2)*sr);seg=y[:,int(s0*sr):int(s0*sr)+n]
    if seg.shape[1]<n:seg=np.pad(seg,((0,0),(0,n-seg.shape[1])))
    env=np.ones(n);k=int(2*F*sr)
    if i>0:env[:k]=np.sin(np.linspace(0,np.pi/2,k))
    if i<len(P)-1:env[-k:]=np.cos(np.linspace(0,np.pi/2,k))
    out[:,int(a2*sr):int(a2*sr)+n]+=seg*env
out=out[:,:int(DUR*sr)];out/=max(1,np.abs(out).max()/.95)
wavfile.write(S+'/ep7/music.wav',sr,(out.T*32767).astype(np.int16));print('music ok')
PY
ffmpeg -v error -y -i vo.wav -i music.wav -i sfx.wav -filter_complex "[0]aresample=48000,pan=stereo|c0=c0|c1=c0,acompressor=threshold=-20dB:ratio=3:attack=5:release=120:makeup=2dB,apad=whole_dur=${DUR}[v];[v]asplit=3[v1][v2][v3];[1]volume=0.5[m];[m][v2]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=350[md];[2]volume=0.7[s];[s][v3]sidechaincompress=threshold=0.05:ratio=3:attack=5:release=200[sd];[v1][md][sd]amix=inputs=3:normalize=0,alimiter=limit=0.85,loudnorm=I=-14:TP=-1.5:LRA=11" -ar 48000 mix.wav
OUT="/Users/enidez/Downloads/La ferme/DOSSIER05_tomber_malade.mp4"
ffmpeg -v error -y -i video_noaudio.mp4 -i mix.wav -c:v libx264 -preset slow -b:v 1900k -maxrate 2600k -bufsize 4500k -pix_fmt yuv420p -c:a aac -b:a 160k -shortest -movflags +faststart "$OUT" && ls -la "$OUT" && cp "$OUT" ~/Movies/Dossier01_rushes/
ffmpeg -v error -y -ss 2 -i "$OUT" -frames:v 1 -q:v 2 "/Users/enidez/Downloads/La ferme/DOSSIER05_tomber_malade_couverture.jpg"
