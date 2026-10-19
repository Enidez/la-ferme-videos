# MATCH MAINTENU v2 : hook miroir 2018/2026 + 3 preuves, débit resserré (pauses minimales) puis tempo global.
import wave,numpy as np,json,re,subprocess
SR=44100
def load(p):
    w=wave.open(p);return np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32)/32768
NB=' '
L=load('vo/narr.wav');LS=json.load(open('vo/narr_segs.json'))
H=load('vo/hk.wav');HS=[[float(a),float(b)] for a,b in re.findall(r'\(([\d.]+),([\d.]+),',open('vo/hk_tr.txt').read())]
exec(open('assemble.py').read().split('assert len(TX)')[0].split("LS = json.load(open('vo/narr_segs.json'))")[1].split('QUOTES')[0]) if False else None
TX=json.load(open('tx.json'))
HT=["2018.","PSG –","Montpellier…","reporté.","À cause des manifs.","Ce soir ?","Les manifs…","interdites.","Mais le match…","maintenu.","Trois preuves.","Regarde bien.","Preuve n° 1.","Preuve n° 2.","Preuve n° 3."]
QUOTES={10,19,24}
def fade(x,n=200):
    x=x.copy();n=min(n,len(x)//2);r=np.linspace(0,1,n);x[:n]*=r;x[-n:]*=r[::-1];return x
out=[np.zeros(int(.08*SR),np.float32)];t=.08;SEGS=[]
def gap(d):
    global t;out.append(np.zeros(int(d*SR),np.float32));t+=d
def piece(src,S,i,txt,id,m=0,g=.13):
    global t
    a=max(0,S[i][0]-.04);b=min(len(src)/SR,S[i][1]+.07)
    d=dict(t0=round(t+S[i][0]-a,3),t1=round(t+S[i][1]-a,3),txt=txt,id=id)
    if m:d['m']=1
    SEGS.append(d);out.append(fade(src[int(a*SR):int(b*SR)]));t+=b-a;gap(g)
def hk(i,g=.12):piece(H,HS,i,HT[i],'k%d'%i,g=g)
def nr(i,g=.13):piece(L,LS,i,TX[i],'n%d'%i,m=i in QUOTES,g=g)
for i in range(10):hk(i,[.1,.06,.08,.18,.25,.08,.06,.25,.08,.5][i])
MARK={'frz':None}
hk(10,.05);hk(11,.2)
hk(12,.15);[nr(i) for i in (18,19,20)];gap(.1)
hk(13,.15);[nr(i) for i in (21,22,23,24)];gap(.1)
hk(14,.15);[nr(i) for i in (9,10)];gap(.15);[nr(i) for i in (15,16,17)];gap(.15)
[nr(i) for i in (36,37,38,39)];gap(.2)
[nr(i,.1) for i in (45,46,47,48)];gap(.2);nr(49);nr(50,.4);[nr(i) for i in (51,52,53)]
y=np.clip(np.concatenate(out),-1,1)
TEMPO=float(open('tempo.txt').read()) if __import__('os').path.exists('tempo.txt') else 1.06
wave_tmp='vo_raw.wav';w=wave.open(wave_tmp,'wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((y*32767).astype(np.int16).tobytes());w.close()
subprocess.run(['ffmpeg','-v','error','-y','-i',wave_tmp,'-af',f'atempo={TEMPO}','-ar','44100','proj/audio/vo.wav'],check=True)
for s in SEGS:s['t0']=round(s['t0']/TEMPO,2);s['t1']=round(s['t1']/TEMPO,2)
ID={s['id']:i for i,s in enumerate(SEGS)}
K=lambda k:SEGS[ID[k]]
MARK={'frz':K('k9')['t0'],'tcov':round(K('k9')['t1']+.45,2)}
open('proj/segs.js','w').write('const SEGS='+json.dumps(SEGS,ensure_ascii=False)+';\nconst MARK='+json.dumps(MARK)+';\nconst ID='+json.dumps(ID)+';\n')
print('total',round(t/TEMPO,2),MARK);[print(s['id'],s['t0'],s['txt']) for s in SEGS[:16]]
