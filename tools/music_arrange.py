"""Monte la musique par sections calées sur la voix.
Usage : python tools/music_arrange.py music/hitman.mp3 <projet>/segs.js <durée_s> music.wav "0:T23:50,T23:T25:30,T25:END:104"
Chaque section = début:fin:offset_dans_le_morceau (s). Tn = début de la phrase n, END = fin de voix + 0,3 s.
La dernière section (jusqu'à la fin de la vidéo) prend automatiquement la vraie fin du morceau."""
import numpy as np,librosa,json,sys
from scipy.io import wavfile
src,segp,DUR,out,spec=sys.argv[1],sys.argv[2],float(sys.argv[3]),sys.argv[4],sys.argv[5];sr=48000
s=[l for l in open(segp).read().split('\n') if l.startswith('const SEGS=')][0];segs=json.loads(s[s.index('['):s.rindex(']')+1]);T=[d['t0'] for d in segs];VEND=segs[-1]['t1']+.35
y,_=librosa.load(src,sr=sr,mono=False);L=len(y[0])/sr
def v(x):return VEND+.3 if x=='END' else (T[int(x[1:])] if x.startswith('T') else float(x))
P=[(v(a),v(b),float(c)) for a,b,c in (p.split(':') for p in spec.split(','))]
P.append((P[-1][1],DUR,L-(DUR-P[-1][1])))
o=np.zeros((2,int(DUR*sr)+sr));F=.6
for i,(a,b,s0) in enumerate(P):
    a2=a-(F if i>0 else 0);b2=b+(F if i<len(P)-1 else 0);st=s0-(a-a2);n=int((b2-a2)*sr);seg=y[:,max(0,int(st*sr)):max(0,int(st*sr))+n]
    if seg.shape[1]<n:seg=np.pad(seg,((0,0),(0,n-seg.shape[1])))
    env=np.ones(n);k=int(2*F*sr)
    if i>0:env[:k]=np.sin(np.linspace(0,np.pi/2,k))
    if i<len(P)-1:env[-k:]=np.cos(np.linspace(0,np.pi/2,k))
    o[:,int(a2*sr):int(a2*sr)+n]+=seg*env
o=o[:,:int(DUR*sr)];o/=max(1,np.abs(o).max()/.95);wavfile.write(out,sr,(o.T*32767).astype(np.int16));print('musique ok',out)
