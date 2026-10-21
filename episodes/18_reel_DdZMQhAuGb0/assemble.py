# « D'OÙ IL VIENT. » : narration Paul French + extrait du Reel @maxbellona (dîner de janvier 2012, droit de citation).
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
B=load('vo/bel.wav')
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
e=narr(0,26,0.15)
TB=round(e+.25,2)
put(TB,fade(B),min(2.2,rms(L)/rms(B)*.95))
SEGS.append(dict(t0=round(TB+.05,2),t1=round(TB+5.5,2),txt="Si Emmanuel Macron est entré en politique, c'est en partie grâce à un dîner secret organisé par de puissants hommes d'affaires.",id='bel',m=1))
e=narr(27,59,TB+len(B)/SR+.3)
e=narr(60,70,e+.75)
y=np.clip(buf[:int((e+.2)*SR)],-1,1);os.makedirs('audio',exist_ok=True)
w=wave.open('audio/vo.wav','wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((y*32767).astype(np.int16).tobytes());w.close()
SEGS.sort(key=lambda s:s['t0']);ID={s['id']:i for i,s in enumerate(SEGS)}
FRZ=round(SEGS[0]['t1']-1.15,2)
MARK=dict(frz=FRZ,tcov=round(SEGS[ID['n0']]['t1']+.25,2),bel=TB)
open('segs.js','w').write('const SEGS='+json.dumps(SEGS,ensure_ascii=False)+';\nconst MARK='+json.dumps(MARK)+';\nconst ID='+json.dumps(ID)+';\n')
print('total',round(e,2),MARK)
