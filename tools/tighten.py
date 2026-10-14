import numpy as np,json,sys
from scipy.io import wavfile
S=sys.argv[1]
sr,x=wavfile.read(S+'/audio/vo_full.wav');x=x.astype(np.float32)/32768
SEG=[(0.14,1.27,"Ce que je vais vous montrer,"),(1.76,3.20,"ils ne veulent pas que vous le sachiez."),
(3.71,4.69,"Le 17 octobre,"),(4.95,7.08,"des Anglais sont invités à une fête de la musique"),(7.33,7.90,"partie 2."),
(8.29,8.96,"Officiellement,"),(9.19,9.97,"c'est une blague."),(10.35,11.30,"Officiellement."),
(11.76,11.96,"1."),(12.34,12.75,"7."),(13.10,13.65,"1 + 7,"),(14.14,14.50,"8."),
(14.87,15.47,"Eurostar,"),(15.82,16.33,"8 lettres."),(16.74,17.94,"Comme par hasard."),
(18.40,19.35,"Le tunnel sous la Manche,"),(19.50,20.45,"50 km."),(20.69,21.70,"5 + 0,"),(21.89,22.33,"5."),
(22.63,23.04,"Gilet,"),(23.27,23.88,"5 lettres."),(24.13,24.57,"Jaune,"),(24.69,25.33,"5 lettres."),(25.56,26.18,"Brave,"),(26.30,27.02,"5 lettres."),
(27.48,28.07,"Il savait."),(28.55,30.44,"Depuis 1994,"),(30.89,31.70,"l'Eurostar,"),(31.90,32.72,"pendant 13 ans,"),(32.96,34.42,"il arrivait où, à Londres ?"),(34.97,35.95,"À Waterloo."),
(36.28,37.13,"Waterloo,"),(37.47,39.47,"la dernière fois qu'on les a laissés gagner."),
(39.93,40.85,"Emmanuel Macron,"),(41.10,42.25,"né un 21,"),(42.54,44.01,"le jour de la fête de la musique."),
(44.37,46.12,"Sa date de naissance, additionnée :"),(46.46,46.76,"3."),(47.15,47.77,"3 lettres :"),
(48.07,48.42,"C,"),(48.67,48.98,"R,"),(49.21,49.61,"S."),
(49.95,50.49,"TikTok,"),(50.71,51.31,"London,"),(51.50,52.01,"Élysée,"),(52.24,53.26,"6 lettres chacun."),
(53.69,56.07,"Le triangle des Bermudes du 17 octobre."),(56.57,57.56,"Mais le vrai indice…"),(57.99,59.02,"il a 600 ans."),
(59.42,61.34,"Octobre 1415,"),(61.67,62.37,"à Azincourt,"),(62.74,64.39,"nos chevaliers s'enfoncent dans la boue,"),
(64.72,65.74,"les Anglais gagnent"),(66.01,66.90,"dans un bourbier."),(67.31,69.84,"De 1415 à 2026,"),(70.10,71.23,"611 ans."),
(71.55,72.02,"6"),(72.21,72.83,"+ 1"),(72.99,73.58,"+ 1,"),(73.86,74.55,"8."),(75.11,75.82,"Eurostar."),
(76.25,76.87,"Conclusion :"),(77.18,78.71,"la fête de la musique partie 2,"),(78.98,80.37,"c'est la revanche d'Azincourt."),
(80.72,81.96,"On les invite en octobre,"),(82.25,83.08,"et on les attend"),(83.27,84.23,"dans le bourbier."),
(84.67,85.39,"Réfléchissez."),(86.00,86.66,"Je dis ça,"),(87.11,87.95,"je dis rien.")]
PAD=0.06;out=[];t=0.25;segs=[];prev_end=None
out.append(np.zeros(int(0.25*sr),np.float32))
for i,(a,b,w) in enumerate(SEG):
    if prev_end is not None:
        gap=a-prev_end
        cap=0.42 if w in("c'est une blague.","Officiellement.","Comme par hasard.","À Waterloo.","Il savait.","il a 600 ans.","Conclusion :","Réfléchissez.","Je dis ça,","je dis rien.","Emmanuel Macron,","Mais le vrai indice…","De 1415 à 2026,","Eurostar.") else 0.24
        g=max(0.0,min(gap,cap)-2*PAD);out.append(np.zeros(int(g*sr),np.float32));t+=g
    a0,b0=a-PAD,b+PAD;seg=x[int(a0*sr):int(b0*sr)].copy()
    f=int(0.012*sr);seg[:f]*=np.linspace(0,1,f);seg[-f:]*=np.linspace(1,0,f)
    segs.append({"t0":round(t+PAD,3),"t1":round(t+(b0-a0)-PAD,3),"txt":w})
    out.append(seg);t+=b0-a0;prev_end=b
y=np.concatenate(out);wavfile.write(S+'/audio/vo_tight.wav',sr,(y*32767).astype(np.int16))
json.dump(segs,open(S+'/audio/segs.json','w'),ensure_ascii=False,indent=0)
print('dur',len(y)/sr)
