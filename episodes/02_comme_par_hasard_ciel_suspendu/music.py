import numpy as np,librosa,sys,json
from scipy.io import wavfile
S=sys.argv[1];DUR=float(sys.argv[2]);sr=48000
y,_=librosa.load(S+'/dl_music/hitman.mp3',sr=sr,mono=False)
segs=json.load(open(S+'/ep2/segs.json'));T=[d['t0'] for d in segs];VEND=segs[-1]['t1']+.35
L=len(y[0])/sr
P=[(0.0,T[27],50.0),(T[27],T[33],30.0),(T[33],VEND+.3,104.0),(VEND+.3,DUR,L-(DUR-(VEND+.3)))]
out=np.zeros((2,int(DUR*sr)+sr));F=.6
for i,(a,b,src) in enumerate(P):
    a2=a-(F if i>0 else 0);b2=b+(F if i<len(P)-1 else 0)
    s0=src-(a-a2);n=int((b2-a2)*sr);seg=y[:,int(s0*sr):int(s0*sr)+n]
    if seg.shape[1]<n:seg=np.pad(seg,((0,0),(0,n-seg.shape[1])))
    env=np.ones(n);k=int(2*F*sr)
    if i>0:env[:k]=np.sin(np.linspace(0,np.pi/2,k))
    if i<len(P)-1:env[-k:]=np.cos(np.linspace(0,np.pi/2,k))
    out[:,int(a2*sr):int(a2*sr)+n]+=seg*env
out=out[:,:int(DUR*sr)];out/=max(1,np.abs(out).max()/0.95)
wavfile.write(S+'/ep2/music.wav',sr,(out.T*32767).astype(np.int16));print('music ok',P)
