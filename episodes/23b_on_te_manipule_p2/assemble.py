# « ON TE MANIPULE ? » partie 2 : narration Liam (prise B1, resserrée) découpée en phrases.
import wave,numpy as np,json,re
SR=44100
def load(p):
    w=wave.open(p);return np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32)/32768
L=load('audio/narr.wav')
seg=lambda f,o:[(float(a)+o,float(b)+o) for a,b in re.findall(r'\(([\d.]+),([\d.]+),',open(f).read())]
LS=seg('audio/h1.tr',0)[3:-1]+seg('audio/h2.tr',60)
TX=["Depuis le 17 octobre…","on te manipule ?","Partie deux.","Il reste quatre techniques.","Et la dernière est la plus dangereuse.",
"La peur.","L'ennemi.","Diviser.","Le choc.","Tu en étais à combien ?","Reprends ton compte.",
"Cinq.","Saturer.","Harvard a épluché les mails de la propagande chinoise :","448 millions de faux messages par an.","Pas pour débattre.","Pour noyer.",
"Chez nous, en 10 jours :","une fausse image à 6 millions de vues,","de faux « policiers pilleurs »,","un innocent présenté comme le tireur de Trappes.",
"Des faux de tous les côtés.","Et toi,","tu tries le vrai du faux…","au lieu de parler de ton salaire.",
"Six.","Les mots.","Orwell :","le langage politique sert à rendre « le mensonge crédible et le meurtre respectable ».",
"Ce mois-ci :","« Séditieux ».","« Tournant ».","« Invasion ».","Le mot arrive avant les faits.","Et il les range déjà dans une case.",
"Sept.","Le consentement.","Edward Bernays, le neveu de Freud, l'inventeur des relations publiques,","parle d'« un gouvernement invisible, qui est le vrai pouvoir ».",
"Pas besoin de matraque si on obtient ton accord.","Le gouvernement ouvre ses stocks de gazole.",
"Baisse attendue à la pompe le 1er novembre.","La grève :","le 5.","Aucune source ne dit que c'est calculé.","Le calendrier, lui,","est public.",
"Huit.","Le doute.","Mémo d'un fabricant de cigarettes, 1969 :","« Le doute est notre produit. »","Pas besoin de prouver que la cigarette est saine.",
"Il suffit que tu ne saches plus quoi croire.","Ce mois-ci, l'Élysée accuse l'étranger de manipulation.","D'autres accusent l'Élysée.","Résultat :",
"plus personne ne croit rien.","Et un peuple qui ne croit plus rien…","ne bouge plus.",
"Soyons clairs :","on ne dit pas que quelqu'un coche cette liste.","Aucune preuve.","Une vraie crise crée aussi, toute seule, de la peur et des rumeurs.",
"Mais la boîte à outils existe.","Et tous les pouvoirs s'en servent.","Même Paris :","en 2020, Facebook a supprimé de faux comptes liés à l'armée française.",
"Alors…","tu en as compté combien ?","Années 50.","Le psychologue Solomon Asch montre des lignes à des étudiants.",
"Tous les autres sont des complices et donnent la mauvaise réponse.","Un tiers du temps, le cobaye suit le groupe.",
"Mais il suffit d'une seule personne qui dit la vérité…","pour que presque tout le monde ose la dire aussi.","Cette personne,","c'est toi.",
"Abonne-toi.","Ils parlent…","Nous","on vérifie."]
assert len(TX)==len(LS),(len(TX),len(LS))
QUOTES={28,38,50}
def fade(x,n=200):
    x=x.copy();n=min(n,len(x)//2);r=np.linspace(0,1,n);x[:n]*=r;x[-n:]*=r[::-1];return x
buf=np.zeros(int(200*SR),np.float32);SEGS=[]
def put(t,y):i=int(t*SR);buf[i:i+len(y)]+=y
def narr(i0,i1,t,a=None):
    a=max(0,LS[i0][0]-.05) if a is None else a;b=min(len(L)/SR,LS[i1][1]+.1)
    for k in range(i0,i1+1):
        d=dict(t0=round(t+LS[k][0]-a,2),t1=round(t+LS[k][1]-a,2),txt=TX[k],id='n%d'%k)
        if k in QUOTES:d['m']=1
        SEGS.append(d)
    put(t,fade(L[int(a*SR):int(b*SR)]));return t+b-a
e=narr(1,1,0.12)                 # hook : « on te manipule ? » dès 0:00, sur un visage
FRZ=SEGS[0]['t0']
TT=round(e+.3,2);e=narr(2,len(TX)-1,TT)   # temps mort : arrêt sur image + titre
y=np.clip(buf[:int((e+.2)*SR)],-1,1)
w=wave.open('audio/vo.wav','wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((y*32767).astype(np.int16).tobytes());w.close()
ID={s['id']:i for i,s in enumerate(SEGS)}
MARK=dict(frz=FRZ,tt=TT,tcov=round(SEGS[ID['n4']]['t1']+.15,2))
open('segs.js','w').write('const SEGS='+json.dumps(SEGS,ensure_ascii=False)+';\nconst MARK='+json.dumps(MARK)+';\nconst ID='+json.dumps(ID)+';\n')
print('total',round(e,2),MARK,len(SEGS))
