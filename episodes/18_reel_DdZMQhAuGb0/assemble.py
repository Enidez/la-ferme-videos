# « D'OÙ IL VIENT. » : narration Paul French, sources d'origine uniquement (Le Monde, Insee, agences de notation…).
import wave,numpy as np,json,re,os
SR=44100
def load(p):
    w=wave.open(p);return np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32)/32768
NB=' '
L=load('vo/narr.wav');LS=[[float(a),float(b)] for a,b in re.findall(r'\(([\d.]+),([\d.]+),',open('vo/narr_tr.txt').read())]
TX=["On te l'a vendu comme le banquier qui allait redresser la France. Regarde d'où il vient.","Six dossiers.","Tout est sourcé.","Dossier 1.","L'école des élites.","2004 :","il sort de l'ENA.",
"Il entre à l'Inspection générale des finances, le corps le plus prestigieux de l'État.","Son protecteur :","Jean-Pierre Jouyet.","Dossier 2.","Le premier Attali.","2007 : sous Nicolas Sarkozy,",
"il devient rapporteur adjoint de la commission Attali.","Dossier 3.","La banque.","2008 :","il entre chez Rothschild.","Deux ans plus tard, il est associé-gérant.","2012 :",
"il pilote le rachat du lait infantile de Pfizer par Nestlé.","Près de 9 milliards d'euros.","Selon la presse, ce contrat fait de lui un millionnaire.","Dossier 4.","Le dîner.","Ce dîner,",
"tu l'as peut-être vu passer.","Janvier 2012.","Chez Bernard Attali,","le frère de Jacques.","Des patrons de Suez,","de Sanofi,","de Rhodia.",
"Leur message pour François Hollande, s'il est élu :","« On n'a qu'une demande à formuler. »","Emmanuel Macron.","Le 15 mai 2012, il entre à l'Élysée.","Dossier 5.","L'avertissement.",
"2014 :","le banquier devient ministre de l'Économie.","Deux mois plus tard, sur France 2, Jean-Luc Mélenchon prévient :","sa politique mènera au « désastre ».","2016 :","il lance En Marche.","2017 :",
"président de la République.","Dossier 6.","Le bilan.","Fin 2017 :",f"la dette de la France, 2{NB}258 milliards d'euros.",f"Mi-2026 : 3{NB}596 milliards.",f"119{NB}% de la richesse du pays.",
"Il y a eu le Covid.","La crise de l'énergie.","Mais en 2025,","deux agences de notation dégradent la France.","Le banquier devait redresser le pays.","Et s'il l'avait dirigé…","comme une banque ?",
"Ils misent sur l'oubli.","Nous,","on garde les preuves.","Pour toi :","il a redressé la France…","ou il l'a plombée ?","Dis-le en commentaire.","Abonne-toi.","Ils parlent à ta place.","Nous,","on vérifie."]
assert len(TX)==len(LS),(len(TX),len(LS))
QUOTES={34,42}
def fade(x,n=300):
    x=x.copy();n=min(n,len(x)//2);r=np.linspace(0,1,n);x[:n]*=r;x[-n:]*=r[::-1];return x
rms=lambda x:np.sqrt(np.mean(x[np.abs(x)>.01]**2))
buf=np.zeros(int(170*SR),np.float32);SEGS=[]
def put(t,y,g=1.):
    i=int(t*SR);buf[i:i+len(y)]+=y*g
def narr(i0,i1,t):
    a=max(0,LS[i0][0]-.05);b=min(len(L)/SR,LS[i1][1]+.1)
    for k in range(i0,i1+1):
        d=dict(t0=round(t+LS[k][0]-a,2),t1=round(t+LS[k][1]-a,2),txt=TX[k],id='n%d'%k)
        if k in QUOTES:d['m']=1
        SEGS.append(d)
    put(t,fade(L[int(a*SR):int(b*SR)]));return t+b-a
# pas d'extrait du Reel (décision d'Enidez) : on retire aussi « Ce dîner, tu l'as peut-être vu passer. » (phrases 25-26)
# intro « pompier pyromane » (prise unique hook2) ; la transcription auto se trompe, texte réel ci-dessous
H=load('vo/hook2.wav');HS=[[0.00,2.01],[2.43,4.31],[4.75,5.57]]
HT=["Le banquier qui devait sauver la France…","Et si c'était lui, le pyromane ?","Regarde d'où il vient."]
for k,(a,b) in enumerate(HS):SEGS.append(dict(t0=round(.15+a,2),t1=round(.15+b,2),txt=HT[k],id='h%d'%k))
put(.15,fade(H));e=.15+HS[-1][1]
e=narr(1,18,e+.45)
# vraie voix d'Emmanuel Macron (TF1, 20 mars 2017)
V=load('vo/closer.wav');VS=[[.25,1.56,"« Je suis devenu fonctionnaire. »"],[2.58,3.07,"« Banquier. »"],[4.36,6.3,"« Certains ou certaines me l'ont parfois reproché. »"]]
t=e+.35;MV=t
for k,(a,b,x) in enumerate(VS):SEGS.append(dict(t0=round(t+a,2),t1=round(t+b,2),txt=x,id='v%d'%k,m=1))
put(t,fade(V,800)*(rms(L)/rms(V))*.95);e=t+len(V)/SR
e=narr(19,24,e+.25)
e=narr(27,41,e+.35)
# vraie voix de Jean-Luc Mélenchon (On n'est pas couché, France 2, 18/10/2014) à la place de la phrase 42
MEL=[]
for k,f,ws in [(0,'vo/mel1.wav',[[.25,4.75,"« Je suis dérangé qu'il applique une logique de banquier à la tête de l'État. »"]]),(1,'vo/mel2.wav',[[.3,3.25,"« La politique que va appliquer M. Macron va conduire à un désastre. »"]])]:
    V=load(f);t=e+(.3 if k==0 else .15);MEL.append(round(t,2))
    for a,b,x in ws:SEGS.append(dict(t0=round(t+a,2),t1=round(t+b,2),txt=x,id='m%d'%k,m=1))
    put(t,fade(V,800)*(rms(L)/rms(V))*.95);e=t+len(V)/SR
e=narr(43,59,e+.35)
e=narr(60,70,e+.75)
y=np.clip(buf[:int((e+.2)*SR)],-1,1);os.makedirs('audio',exist_ok=True)
w=wave.open('audio/vo.wav','wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((y*32767).astype(np.int16).tobytes());w.close()
SEGS.sort(key=lambda s:s['t0']);ID={s['id']:i for i,s in enumerate(SEGS)}
FRZ=round(SEGS[ID['h2']]['t0']-.05,2)
MARK=dict(frz=FRZ,tcov=round(SEGS[ID['h2']]['t1']+.25,2),mv=round(MV,2),mel1=MEL[0],mel2=MEL[1])
open('segs.js','w').write('const SEGS='+json.dumps(SEGS,ensure_ascii=False)+';\nconst MARK='+json.dumps(MARK)+';\nconst ID='+json.dumps(ID)+';\n')
print('total',round(e,2),MARK)
