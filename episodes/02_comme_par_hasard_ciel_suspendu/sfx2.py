import numpy as np,json,sys
from scipy.io import wavfile
from scipy.signal import butter,sosfilt
S=sys.argv[1];sr=48000;dur=float(sys.argv[2]);N=int(dur*sr)
r=np.random.default_rng(3)
def env(n,a,d):t=np.arange(n)/sr;return np.minimum(1,t/max(a,1e-4))*np.exp(-t/d)
def bp(x,lo,hi):return sosfilt(butter(2,[lo,hi],'band',fs=sr,output='sos'),x)
def lp(x,f):return sosfilt(butter(2,f,'low',fs=sr,output='sos'),x)
def hp(x,f):return sosfilt(butter(2,f,'high',fs=sr,output='sos'),x)
def click():n=int(.09*sr);x=bp(r.standard_normal(n),1500,6000)*env(n,.0005,.006);x[int(.035*sr):]+=bp(r.standard_normal(n-int(.035*sr)),800,4000)*env(n-int(.035*sr),.0005,.01)*.7;return x*.8
def typ():n=int(.07*sr);x=bp(r.standard_normal(n),900,5000)*env(n,.0003,.008);t=np.arange(n)/sr;x+=np.sin(2*np.pi*180*t)*env(n,.0005,.012)*.5;return x*.7
def whoosh():n=int(.6*sr);t=np.arange(n)/sr;e=np.sin(np.pi*t/.6)**2;x=r.standard_normal(n);return lp(hp(x,300),2500)*e*.45
def thud():n=int(.5*sr);t=np.arange(n)/sr;return np.sin(2*np.pi*(55+40*np.exp(-t*20))*t)*env(n,.002,.12)*.9
def hit():n=int(.8*sr);t=np.arange(n)/sr;return (np.sin(2*np.pi*(60+80*np.exp(-t*25))*t)*env(n,.001,.2)+lp(r.standard_normal(n),3000)*env(n,.001,.05)*.4)*.8
def tick():n=int(.12*sr);t=np.arange(n)/sr;return np.sin(2*np.pi*2200*t)*env(n,.0005,.02)*.35
def zap():
    n=int(.7*sr);t=np.arange(n)/sr;x=hp(r.standard_normal(n),1200)*env(n,.0005,.12)
    cr=(r.random(n)<.004).astype(float);cr=np.convolve(cr,np.hanning(60),'same');x=x*.5+hp(cr*r.standard_normal(n),2000)*1.5*np.exp(-t/.3)
    return x*.55+hit()[:n]*.5
def boom():n=int(2.5*sr);t=np.arange(n)/sr;return np.sin(2*np.pi*(38+50*np.exp(-t*8))*t)*env(n,.002,.8)+lp(r.standard_normal(n),800)*env(n,.002,.3)*.6
def riser():n=int(1.2*sr);t=np.arange(n)/sr;x=bp(r.standard_normal(n),500,5000)*(t/1.2)**2*.4;return x+np.sin(2*np.pi*(200+600*(t/1.2)**2)*t)*(t/1.2)**2*.15
G={'click':click,'type':typ,'whoosh':whoosh,'thud':thud,'hit':hit,'tick':tick,'zap':zap,'boom':boom,'riser':riser}
GAIN={'click':.8,'type':.55,'whoosh':.6,'thud':.8,'hit':.8,'tick':.6,'zap':.9,'boom':1.1,'riser':.7}
out=np.zeros((N+3*sr,2))
for t,k in json.load(open(S+'/ep2/proj/events.json')):
    x=G[k]()*GAIN[k]*.7;i=int(t*sr);pan=r.uniform(-.25,.25) if k in('type','click','tick') else 0
    out[i:i+len(x),0]+=x*(1-pan);out[i:i+len(x),1]+=x*(1+pan)
out=out[:N];out/=max(1,np.abs(out).max()/0.9)
wavfile.write(S+'/ep2/sfx.wav',sr,(out*32767).astype(np.int16));print('sfx ok')
