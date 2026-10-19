# Badir v5 : nouveau hook « la facture » (Liam) + l'ancienne bande à partir de « Kafr Kassem ».
import wave, numpy as np, json
SR=44100
def load(p):
    w=wave.open(p);return np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32)/32768
old=load('vo/old_vo.wav');hk=load('vo/hook.wav')
src=open('proj/segs.js').read().split('\n')
g=lambda k:json.loads([l for l in src if l.startswith('const '+k+'=')][0].split('=',1)[1].rstrip(';'))
SEGS0,MARK0,ID0=g('SEGS'),g('MARK'),g('ID')
LEAD=.1;CUT=SEGS0[ID0['n4']]['t0']-.06
s1=[LEAD+.07,LEAD+3.0];s2=[LEAD+3.31,LEAD+4.58]
FRZ=round(s2[1]+.12,2);TCOV=round(FRZ+1.6,2);START=TCOV+1.05;D=START-CUT
out=np.zeros(int(START*SR),np.float32);out[int(LEAD*SR):int(LEAD*SR)+len(hk)]+=hk
y=np.concatenate([out,old[int(CUT*SR):]])
SEGS=[dict(t0=s1[0],t1=s1[1],txt="Trois frères aveugles ont fait trembler l'armée israélienne…",id='k1'),dict(t0=s2[0],t1=s2[1],txt="avec un simple téléphone.",id='k2')]
for s in SEGS0[ID0['n4']:]:
    s=dict(s);s['t0']=round(s['t0']+D,2);s['t1']=round(s['t1']+D,2);SEGS.append(s)
MARK={k:[round(v[0]+D,2),round(v[1]+D,2)] for k,v in MARK0.items() if k.startswith('h')}
MARK.update(s1=s1,s2=s2,frz=FRZ,av=round(FRZ+.45,2),tcov=TCOV)
w=wave.open('proj/audio/vo.wav','wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(y,-1,1)*32767).astype(np.int16).tobytes());w.close()
ID={s['id']:i for i,s in enumerate(SEGS)}
open('proj/segs.js','w').write('const SEGS='+json.dumps(SEGS,ensure_ascii=False)+';\nconst MARK='+json.dumps(MARK)+';\nconst ID='+json.dumps(ID)+';\n')
print('total',round(len(y)/SR,2),MARK,SEGS[2])
