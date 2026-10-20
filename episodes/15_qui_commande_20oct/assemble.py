# « QUI COMMANDE ? » : hook Reims (arrêt sur image, vrai cri du député) + narration Paul French.
import wave,numpy as np,json,re,subprocess
SR=44100
def load(p):
    w=wave.open(p);return np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32)/32768
NB=' '
L=load('vo/narr.wav');LS=[[float(a),float(b)] for a,b in re.findall(r'\(([\d.]+),([\d.]+),',open('vo/narr_tr.txt').read())]
TX=["Alors…","policier,","ou casseur ?","Policier.","Dix jours.","Quatre dossiers.","Tout est vérifié.","Dossier 1.","L'homme masqué.","Reims, 2 octobre.","La préfecture le confirme :",
"c'est un policier de la BAC, en civil.","Il lance une grenade.","Pas de brassard. Pas de numéro d'identification.","Un professeur de droit est clair :","dès qu'il fait du maintien de l'ordre,",
"il doit être identifiable.","Le procureur, lui, assure qu'il répondait à des émeutiers qui lançaient pierres et mortiers.","Et que tout est légal.","Une provocation ?","Aucune preuve.",
"Mais sans brassard…","comment faire la différence ?","Un homme qui agit comme un policier…","sans qu'on sache qui il est.","Ça rappelle étrangement une autre histoire.",
"1er mai 2018. Un homme casqué comme un policier frappe deux manifestants.","Ce n'était pas un policier.","C'était l'adjoint du chef de cabinet du président de la République.","Alexandre Benalla.",
"Condamné.","Définitivement.","Dossier 2.","Les ordres.","7 octobre : après des lycéens blessés, le ministre suspend les grenades assourdissantes.","14 octobre :",
"un syndicat de policiers porte plainte…","contre l'État.","Pour des consignes floues et contradictoires.","16 octobre :","le ministre reconnaît que des consignes ont été passées de ne pas utiliser certaines armes.",
"Et il ordonne l'inverse :","toutes les armes doivent pouvoir servir.","En 9 jours…","deux ordres opposés.","Dossier 3.","Le 17 octobre.","À Strasbourg, un homme est gravement blessé à l'œil par un tir de LBD.",
"Ailleurs,","une main arrachée par une grenade.",f"Et côté forces de l'ordre : près de 1{NB}000 policiers et gendarmes blessés.","Le ministre parle lui-même de « perte de contrôle ».",
"Et les policiers « pilleurs » de Lacoste, à Limoges ?","3 millions de vues.","Le parquet dément.","Dossier 4. Les deux vitesses.",f"Pour les casseurs : 2{NB}500 gardes à vue.","Des audiences triplées.",
"Les premières condamnations en 48 heures.","Pour les policiers mis en cause ?","5 enquêtes de l'IGPN, rien que pour le mouvement lycéen à Paris.","Pendant les Gilets jaunes :","406 dossiers.","4 condamnations.",
"Des grenades suspendues.","Puis toutes les armes.","Des policiers qui portent plainte contre l'État.","Des blessés des deux côtés.","La vraie question,","ce n'est pas qui casse.","C'est :","qui commande ?",
"Dimanche soir,","le président promettait :","« toute la transparence sera faite ».","On va vérifier.","Pour toi,","c'est qui le responsable ?","Dis-le en commentaire.","Abonne-toi.","Ils parlent à ta place. Nous,","on vérifie."]
assert len(TX)==len(LS),(len(TX),len(LS))
QUOTES={51,74}
amb=load('vo/amb.wav');shout=load('vo/shout.wav')
def fade(x,n=200):
    x=x.copy();n=min(n,len(x)//2);r=np.linspace(0,1,n);x[:n]*=r;x[-n:]*=r[::-1];return x
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
rms=lambda x:np.sqrt(np.mean(x[np.abs(x)>.01]**2))
put(0,fade(amb[:int(.6*SR)])*.6)
e=narr(0,2,.62)
RES=round(e+.15,2);sh=fade(shout[int(.1*SR):int(2.35*SR)]);put(RES,sh*min(1.6,rms(L)/rms(sh)*.9))
POL=round(RES+2.3,2);e=narr(3,3,POL)
TT=round(e+.3,2);e=narr(4,6,TT)
TCOV=round(e+.35,2);e=narr(7,81,TCOV+.5)
y=np.clip(buf[:int((e+.2)*SR)],-1,1)
w=wave.open('proj/audio/vo.wav','wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((y*32767).astype(np.int16).tobytes());w.close()
SEGS[ID:=0] if False else None
ID={s['id']:i for i,s in enumerate(SEGS)}
MARK=dict(frz=.57,res=RES,shout=[RES,round(RES+len(sh)/SR,2)],pol=POL,tt=TT,tcov=TCOV)
open('proj/segs.js','w').write('const SEGS='+json.dumps(SEGS,ensure_ascii=False)+';\nconst MARK='+json.dumps(MARK)+';\nconst ID='+json.dumps(ID)+';\n')
print('total',round(e,2),MARK)
