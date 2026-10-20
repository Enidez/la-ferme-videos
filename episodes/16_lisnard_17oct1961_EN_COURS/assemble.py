# « IL N'ÉTAIT PAS NÉ. » : hook vraie voix Lisnard (Quotidien) + narration Paul French + 2 extraits de la version longue (LCI, @24hPujadas).
import wave,numpy as np,json,re
SR=44100
def load(p):
    w=wave.open(p);return np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32)/32768
NB='\u00a0'
L=load('vo/narr.wav');LS=[[float(a),float(b)] for a,b in re.findall(r'\(([\d.]+),([\d.]+),',open('vo/narr_tr.txt').read())]
TX=["Un candidat à la présidentielle.","Sur le massacre du 17 octobre 1961.","Lundi soir, sur LCI.","Une étudiante l'interroge sur ce massacre.","La séquence tourne partout.","Mais elle est coupée.",
"Voici trois choses qu'elle ne te montre pas.","Un. La suite.","-","-","-","-","La version longue ne l'arrange pas vraiment.","Deux. Ce qui s'est passé.","Le 5 octobre 1961,",
"le préfet de police Maurice Papon annonce un couvre-feu.","Pas pour tout le monde.","Pour les seuls « Français musulmans d'Algérie ».",
f"Le 17, entre 20{NB}000 et 30{NB}000 Algériens manifestent contre ce couvre-feu, à l'appel du FLN.",f"Plus de 11{NB}000 arrestations.","Des manifestants jetés dans la Seine.","Combien de morts ?",
"À l'époque, la préfecture en annonce deux.","Les historiens, eux,","parlent de plusieurs dizaines.","Peut-être plus de cent.","Trois. Ce que dit la République.","En 2012,",
"François Hollande reconnaît une « sanglante répression ».","En 2021,","Emmanuel Macron parle de crimes « inexcusables pour la République ».","Depuis lundi,","la gauche dénonce.",
"D'autres le soutiennent.","Lui n'a rien retiré.","Il n'était pas né.","Nous non plus.","C'est justement pour ça qu'on le raconte.","Pour toi, on doit encore en parler ?","Dis-le en commentaire.",
"Abonne-toi.","Ils parlent à ta place.","Nous,","on vérifie."]
assert len(TX)==len(LS),(len(TX),len(LS))
QUOTES={17,28,30}
Q=load('vo/q.wav');QH=load('vo/qh.wav');P1=load('vo/p1.wav');P2=load('vo/p2.wav')
def fade(x,n=300):
    x=x.copy();n=min(n,len(x)//2);r=np.linspace(0,1,n);x[:n]*=r;x[-n:]*=r[::-1];return x
rms=lambda x:np.sqrt(np.mean(x[np.abs(x)>.01]**2))
TOT=int(150*SR);buf=np.zeros(TOT,np.float32);SEGS=[]
def put(t,y,g=1.):
    i=int(t*SR);buf[i:i+len(y)]+=y*g
def narr(i0,i1,t):
    a=max(0,LS[i0][0]-.05);b=min(len(L)/SR,LS[i1][1]+.1)
    for k in range(i0,i1+1):
        d=dict(t0=round(t+LS[k][0]-a,2),t1=round(t+LS[k][1]-a,2),txt=TX[k],id='n%d'%k)
        if k in QUOTES:d['m']=1
        SEGS.append(d)
    put(t,fade(L[int(a*SR):int(b*SR)]));return t+b-a
G=lambda y:min(2.2,rms(L)/rms(y)*.95)
def clip(y,t,a,b,subs):
    s=fade(y[int(a*SR):int(b*SR)]);put(t,s,G(y))
    for (u0,u1,tx,i) in subs:SEGS.append(dict(t0=round(t+u0-a,2),t1=round(t+u1-a,2),txt=tx,id=i,m=1))
    return t+(b-a)
e=clip(QH,0,0,len(QH)/SR,[(4.05,5.45,"Non mais je m'en fous, madame…",'h')])   # question de l'étudiante -> « je m'en fous, madame »
FRZ=round(e,2)
e=narr(0,1,FRZ+.3)
TCOV=round(e+.3,2)
e=narr(2,3,TCOV+.4)
TQ=round(e+.25,2)
e=clip(Q,TQ,0,len(Q)/SR,[(0.7,2.0,"J'en ai rien à foutre.",'qb'),(3.2,4.25,"J'en ai rien à cirer !",'qc'),(4.35,5.35,"J'étais pas né.",'qd')])
e=narr(4,7,e+.3)
TP1=round(e+.2,2)
e=clip(P1,TP1,0,len(P1)/SR,[(0.15,1.9,"Non mais c'est très grave…",'p1a'),(2.0,4.0,"… mais c'est en 61, quoi.",'p1b')])
TP2=round(e+.2,2)
e=clip(P2,TP2,0,len(P2)/SR,[(0.1,2.3,"C'est pas mon problème aujourd'hui, madame.",'p2')])
e=narr(12,37,e+.35)
e=narr(38,43,e+.7)
y=np.clip(buf[:int((e+.2)*SR)],-1,1)
import os;os.makedirs('audio',exist_ok=True)
w=wave.open('audio/vo.wav','wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((y*32767).astype(np.int16).tobytes());w.close()
SEGS.sort(key=lambda s:s['t0'])
ID={s['id']:i for i,s in enumerate(SEGS)}
MARK=dict(frz=FRZ,tcov=TCOV,q=TQ,p1=TP1,p2=TP2)
open('segs.js','w').write('const SEGS='+json.dumps(SEGS,ensure_ascii=False)+';\nconst MARK='+json.dumps(MARK)+';\nconst ID='+json.dumps(ID)+';\n')
print('total',round(e,2),MARK)
