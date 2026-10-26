# « ON TE MANIPULE ? » partie 1 : narration Liam (prise P1, resserrée) découpée en phrases.
import wave,numpy as np,json,re
SR=44100
def load(p):
    w=wave.open(p);return np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32)/32768
L=load('audio/narr.wav')
seg=lambda f,o:[(float(a)+o,float(b)+o) for a,b in re.findall(r'\(([\d.]+),([\d.]+),',open(f).read())]
LS=seg('audio/h1.tr',0)[:-1]+seg('audio/h2.tr',60)
TX=["Depuis le 17 octobre…","on te manipule ?","Voici les huit techniques pour tenir un peuple.","Compte combien tu en as vues ce mois-ci.",
"Elles sont écrites noir sur blanc,","par ceux qui les ont utilisées…","ou étudiées.","Et la huitième est la plus dangereuse.",
"Un.","La peur.","Prison de Nuremberg, 1946.","Un psychologue dit à Göring, le numéro deux nazi,","que le peuple ne veut pas la guerre.","Réponse :",
"« C'est facile.","Il suffit de leur dire qu'ils sont attaqués.","Ça marche dans tous les pays. »","Octobre :","couvre-feux dans cinq grandes villes.",
"70 000 policiers.","Des blindés.","Les violences étaient réelles.","Mais quand tu as peur,","tu ne demandes plus « pourquoi ».","Tu demandes","« protégez-moi ».",
"Deux. L'ennemi.","Le grand théoricien américain de la propagande l'écrit en 1927 :","il ne doit y avoir « aucun doute sur qui le public doit haïr ».",
"Le 22 octobre,","le Président accuse « l'ultragauche ».","Aucune preuve publique.","Trump, lui,","accuse « les migrants ».","Même outil,","autre cible.",
"Et pendant qu'on parle de l'ennemi…","on ne parle plus du prix de ton plein.","Trois.","Diviser.","1971 :",
"des documents volés révèlent que le FBI infiltre ses propres citoyens depuis 15 ans.","Consigne écrite :","« perturber,","discréditer,","neutraliser ».",
"Méthode :","monter les groupes les uns contre les autres.","Chez nous, le 17,","on manifeste contre la vie chère.","Le 23, à Trappes, un homme tire sur des passants.",
"Il aurait voulu « venger les commerçants ».","La colère contre les prix…","devient une guerre entre voisins.","Quatre. Le choc.","Milton Friedman, prix Nobel d'économie :",
"en crise,","« l'impossible devient inévitable ».","En pleine crise,","le budget de la Sécu repart au Sénat dans sa version la plus dure :","gel partiel des pensions,",
"plus de CSG sur tes arrêts maladie.","Hasard du calendrier ?","Peut-être.","Mais ta retraite se joue le 9 novembre.","Pendant que tout le monde regarde la rue.",
"Quatre sur huit.","On ne dit pas que c'est voulu :","aucune preuve.","Mais l'outil existe,","et il est écrit.","Il en reste quatre.","Et la huitième…","est la plus dangereuse.",
"Partie deux,","sur le compte.","Abonne-toi pour ne pas la rater.","Ils parlent…","Nous on vérifie."]
assert len(TX)==len(LS),(len(TX),len(LS))
QUOTES={14,15,16,28,57}
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
amb=load('audio/amb.wav');put(0,fade(amb[:int((LS[1][1]-LS[0][0]+.5)*SR)])*.5)
e=narr(0,1,0.15)                 # « Depuis le 17 octobre… on te manipule ? » (souffle supprimé)
FRZ=SEGS[1]['t0']
TT=round(e+.3,2);e=narr(2,len(TX)-1,TT)   # temps mort : arrêt sur image + titre
y=np.clip(buf[:int((e+.2)*SR)],-1,1)
w=wave.open('audio/vo.wav','wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((y*32767).astype(np.int16).tobytes());w.close()
ID={s['id']:i for i,s in enumerate(SEGS)}
MARK=dict(frz=FRZ,tt=TT,tcov=round(SEGS[ID['n3']]['t1']+.15,2))
open('segs.js','w').write('const SEGS='+json.dumps(SEGS,ensure_ascii=False)+';\nconst MARK='+json.dumps(MARK)+';\nconst ID='+json.dumps(ID)+';\n')
print('total',round(e,2),MARK,len(SEGS))
