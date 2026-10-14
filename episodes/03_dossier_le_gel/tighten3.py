import numpy as np,json,sys
from scipy.io import wavfile
S=sys.argv[1]+'/ep3'
sr,x=wavfile.read(S+'/vo_full.wav');x=x.astype(np.float32)/32768
SEG=[(0.09,3.25,"En 2027, personne ne va augmenter vos impôts."),(3.77,6.49,"Et pourtant… vous allez perdre de l'argent."),
(7.04,9.23,"Le budget a été déposé le 1er octobre."),(9.52,11.56,"54 milliards d'économies."),(11.90,15.49,"Et le gouvernement le répète : pas de hausse généralisée d'impôts."),(16.00,16.86,"Officiellement."),
(17.46,18.71,"Alors prenons une famille."),(19.08,21.14,"Appelons-la… la famille Martin."),(21.59,24.08,"Elle travaille. Elle touche la prime d'activité."),(24.38,26.73,"Deux enfants. Les allocations familiales."),
(27.03,29.27,"Un petit appartement. Les APL."),(29.65,31.04,"Et sa mère, à la retraite."),(31.50,33.14,"1 400 euros par mois."),
(33.64,36.31,"Dans ce budget, personne ne leur retire rien."),(36.60,37.63,"Rien n'est supprimé."),(37.87,39.29,"Rien n'est voté contre eux."),(39.71,41.79,"On fait juste… autre chose."),
(42.32,44.13,"La prime d'activité : gelée."),(44.48,46.46,"Les allocations familiales : gelées."),(46.79,48.22,"Les APL : gelées."),(48.56,51.14,"La pension de sa mère : elle ne suivra pas les prix."),
(51.62,52.69,"Ça s'appelle un gel."),(53.27,54.61,"Un gel, c'est simple."),(54.95,56.92,"Les prix, eux, continuent de monter."),(57.26,59.33,"Le loyer monte. Les courses montent."),(59.67,61.23,"Et l'aide… ne bouge plus."),
(61.68,62.40,"Le plus troublant ?"),(62.76,66.98,"Pour calculer votre impôt, l'État compte 2,1 % d'inflation."),(67.30,68.01,"Pour vos aides…"),(68.38,69.60,"il compte zéro."),
(70.03,72.45,"Personne ne verra une ligne en moins sur son compte."),(72.78,75.40,"Pas de lettre. Pas d'annonce. Pas de coupable."),(75.82,77.88,"Juste un frigo un peu moins plein."),(78.24,79.91,"Chaque mois. Un peu plus."),
(80.39,81.88,"Les plus pauvres sont protégés :"),(82.24,85.71,"le RSA et l'AAH, eux, suivent l'inflation."),(86.01,90.05,"Mais ceux qui travaillent, qui élèvent des enfants, qui ont cotisé toute leur vie…"),(90.45,92.22,"eux, on les laisse refroidir."),
(92.78,94.29,"Un impôt, ça se voit."),(94.61,95.44,"Ça se conteste."),(95.79,97.16,"Ça fait descendre dans la rue."),(97.58,99.50,"Un gel… ça ne fait pas de bruit."),(99.88,100.98,"Ça fait juste froid."),
(101.40,103.13,"Ce budget n'est encore qu'un projet."),(103.43,105.45,"Il se joue à l'Assemblée. Maintenant."),(105.87,108.30,"Alors… vous, vous perdez combien ?")]
DRAMA={"Officiellement.","On fait juste… autre chose.","Ça s'appelle un gel.","il compte zéro.","Chaque mois. Un peu plus.","eux, on les laisse refroidir.","Ça fait juste froid.","Alors… vous, vous perdez combien ?","Juste un frigo un peu moins plein.","Ce budget n'est encore qu'un projet."}
PAD=0.06;out=[np.zeros(int(.12*sr),np.float32)];t=.12;segs=[];prev=None
for a,b,w in SEG:
    if prev is not None:
        cap=.6 if w in DRAMA else .3
        g=max(0.0,min(a-prev,cap)-2*PAD);out.append(np.zeros(int(g*sr),np.float32));t+=g
    a0,b0=max(0,a-PAD),b+PAD;seg=x[int(a0*sr):int(b0*sr)].copy();f=int(.01*sr);seg[:f]*=np.linspace(0,1,f);seg[-f:]*=np.linspace(1,0,f)
    segs.append({"t0":round(t+(a-a0),3),"t1":round(t+(b-a0),3),"txt":w});out.append(seg);t+=b0-a0;prev=b
y=np.concatenate(out);wavfile.write(S+'/vo.wav',sr,(y*32767).astype(np.int16))
json.dump(segs,open(S+'/segs.json','w'),ensure_ascii=False)
open(S+'/proj/segs.js','w').write('const SEGS='+json.dumps(segs,ensure_ascii=False)+';')
print('dur',len(y)/sr)
for i,d in enumerate(segs):print(i,d['t0'],d['txt'])
