import wave,numpy as np,json
def load(p):
    w=wave.open(p);assert w.getframerate()==44100 and w.getnchannels()==1;return np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32)/32768
SR=44100;L=load('vo_liam.wav');F=load('fix.wav');SO=load('soir.wav');SS=[(0.05,2.96,"Ce soir, avant vingt heures, on t'avait donné 4 options."),(3.52,4.14,"Et ce soir :")];M=load('yt/a44.wav')
LS=[(0.04,2.55,"Hier soir, à vingt heures, on t'avait donné 4 options."),(2.85,3.46,"C'était la une."),(3.73,4.45,"La fermeté."),(5.07,6.56,"Mais si tu regardes bien ce qu'il a dit…"),(7.02,8.90,"il y a un plan. En 4 étapes."),(9.57,10.07,"Étape 1."),(10.35,11.33,"Désigner un ennemi."),(11.97,13.90,""),(14.22,14.82,""),(15.54,16.32,"Le coupable est nommé."),(16.64,17.98,"Avant même la fin des enquêtes."),(18.72,19.22,"Étape 2."),(19.57,20.96,"Donner le pouvoir d'interdire."),(21.51,23.17,"Les préfets, en lien avec les maires,"),(23.53,25.18,"pourront interdire des manifestations."),(25.60,25.95,"Ses mots :"),(26.43,26.97,""),(27.32,28.32,""),(29.26,29.85,"Étape 3."),(30.20,31.05,"Punir vite."),(31.41,31.90,"Et fort."),(32.70,34.21,""),(34.54,35.45,""),(35.72,36.58,""),(37.18,37.86,"Une justice"),(38.07,38.72,"« exemplaire »."),(39.14,40.35,""),(41.02,41.68,"Étape 4."),(42.03,42.86,"La plus discrète."),(43.41,45.02,""),(45.62,46.12,"Samedi,"),(46.38,49.22,"550 000 personnes manifestaient contre la vie chère."),(49.82,50.43,"Hier soir :"),(50.81,52.05,""),(52.44,53.98,"Zéro annonce sur le budget."),(54.38,54.76,""),(55.83,56.75,"Ennemi désigné."),(57.02,58.00,"Manifs interdites."),(58.34,58.84,"Sanctions."),(59.31,60.47,"Et le sujet de départ…"),(60.83,61.39,""),(62.08,62.57,"Honnêtement ?"),(62.80,64.04,"Il a aussi dit autre chose."),(64.47,66.22,"Qu'il ne fallait pas confondre les casseurs"),(66.58,69.20,"avec ceux qui ont des « revendications légitimes »."),(69.84,71.70,"Il a promis « toute la transparence »"),(71.98,72.99,"sur le maintien de l'ordre."),(73.29,74.06,"Et un dialogue"),(74.35,75.79,"avec les lycéens et les étudiants."),(76.56,77.45,"Alors on va vérifier."),(77.72,78.41,"Sur pièces."),(79.13,79.89,"Si dans un mois,"),(80.12,81.54,"il y a plus d'interdictions"),(81.80,83.07,"que de mesures sur les prix…"),(83.68,85.19,"tu sauras quel était le vrai plan."),(86.25,87.19,"Et la prochaine manif,"),(87.60,88.91,"ce sera peut-être la tienne…"),(89.29,90.41,"qui sera interdite."),(91.10,91.72,"Abonne-toi."),(92.05,92.87,"On fera le compte."),(93.38,93.94,"Ensemble.")]
FS=[(0.06,1.52,"Ne rien lâcher sur le fond."),(2.12,2.94,"Sur les prix ?"),(3.40,4.51,"Il accuse la guerre dans le Golfe."),(4.73,5.93,"Il part là-bas, dès demain."),(6.28,7.52,"Mais pour ton porte-monnaie…"),(8.03,8.55,"rien de neuf."),(9.00,9.85,"passe au second plan."),(10.39,11.25,"Et il est allé plus loin."),(11.39,11.80,"Écoute."),(12.41,13.05,"Manifester."),(13.71,15.05,"Dans la même phrase que le désordre.")]
HOOK=(352.3,355.8)
plan=[('M',352.3,355.75,[(352.3,355.7,'')],'hook'),('G',.35),
 ('S',0,0),('G',.3),('L',1,6),('G',.35),('M',27.5,32.35,[(27.55,32.3,"« Des factieux issus de groupuscules d'ultra-gauche, rejoints par de nombreux délinquants »")],'q1'),('G',.4),
 ('L',9,14),('G',.4),('L',15,15),('G',.25),('M',352.3,355.75,[(352.3,355.7,"« Jusqu'à interdire, quand il le faut, certains rassemblements »")],'q2'),('G',.45),
 ('L',18,20),('G',.35),('M',187.95,191.75,[(188.0,189.1,"« Ceux qui ont détruit doivent payer,"),(189.98,191.7,"ceux qui ont pillé doivent rembourser »")],'q3'),('G',.35),
 ('L',24,25),('G',.3),('M',425.55,426.95,[(425.6,426.9,"« Nous serons intraitables »")],'q4'),('G',.55),
 ('L',27,28),('G',.3),('F',0,0),('G',.45),('L',30,31),('G',.4),('S',1,1),('G',.3),('F',1,5),('G',.35),('L',34,34),('G',.6),('L',36,39),('G',.3),('F',6,6),('G',.55),('F',7,8),('G',.35),
 ('M',440.95,449.1,[(441.0,444.5,"« Tous ceux qui vous expliquent que l'urgence est d'aller dans la rue,"),(445.0,446.5,"de manifester, de créer le désordre,"),(446.9,449.05,"[…] un but : abîmer la République »")],'q5'),('G',.55),
 ('F',9,10),('G',.6),('L',41,60)]
out=[];t=0;SEGS=[];MARK={}
def fade(x,n=220):
    x=x.copy();n=min(n,len(x)//2);r=np.linspace(0,1,n);x[:n]*=r;x[-n:]*=r[::-1];return x
for p in plan:
    if p[0]=='G': out.append(np.zeros(int(p[1]*SR)));t+=p[1];continue
    if p[0]=='M':
        _,a,b,subs,name=p;x=M[int(a*SR):int(b*SR)]*2.2;MARK[name]=(round(t,2),round(t+b-a,2))
        for s0,s1,tx in subs:
            if tx:SEGS.append(dict(t0=round(t+s0-a,2),t1=round(t+s1-a,2),txt=tx,m=1))
        out.append(fade(x));t+=b-a;continue
    src,segs={'L':(L,LS),'F':(F,FS),'S':(SO,SS)}[p[0]]
    i0,i1=p[1],p[2];a=max(0,segs[i0][0]-.06);b=min(len(src)/SR,segs[i1][1]+.12)
    for k in range(i0,i1+1):
        s0,s1,tx=segs[k]
        if tx:SEGS.append(dict(t0=round(t+s0-a,2),t1=round(t+s1-a,2),txt=tx,src=p[0]+str(k)))
    out.append(fade(src[int(a*SR):int(b*SR)]));t+=b-a
y=np.concatenate(out);y=np.clip(y,-1,1)
w=wave.open('proj/audio/vo.wav','wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((y*32767).astype(np.int16).tobytes());w.close()
open('proj/segs.js','w').write('const SEGS='+json.dumps(SEGS,ensure_ascii=False)+';\nconst MARK='+json.dumps(MARK)+';\n')
print('total',round(t,2));print(MARK)
for i,s in enumerate(SEGS):print(i,s['t0'],s['t1'],s.get('src','M'),s['txt'])
