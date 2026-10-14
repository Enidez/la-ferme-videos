import numpy as np,json,sys
from scipy.io import wavfile
S=sys.argv[1]+'/ep2'
sr,x=wavfile.read(S+'/vo_full.wav');x=x.astype(np.float32)/32768
SEG=[(0.09,2.42,"Samedi, toute la France part en vacances."),(2.82,5.48,"Et les pilotes avaient décidé… de rester au sol."),
(5.95,7.21,"Cinq jours de grève."),(7.54,9.25,"Du 17 au 21 octobre."),(9.85,11.78,"Air France, Transavia, Corsair."),(12.18,13.56,"Le premier jour de la Toussaint."),
(13.93,15.21,"Des millions de familles."),(15.56,16.53,"Des valises déjà faites."),(17.05,18.58,"Et puis, le 9 octobre…"),(18.95,21.05,"tout s'arrête. Grève suspendue."),
(21.45,23.50,"Officiellement, c'est une bonne nouvelle."),(24.18,24.82,"Officiellement."),
(25.35,27.57,"Moi, je me suis posé une seule question."),(27.96,30.86,"Pendant trois semaines, quand vous avez eu peur de ne pas décoller…"),(31.37,32.04,"vous avez regardé quoi ?"),
(32.84,33.33,"Le train."),(33.78,36.39,"Et le train fait la guerre à l'avion depuis longtemps."),(36.78,42.17,"En 2023, l'État interdit des vols en France, dès qu'un train fait le trajet en moins de 2 h 30."),
(42.68,44.79,"Le décret est signé par une Première ministre…"),(45.12,46.91,"ancienne de la SNCF."),(47.43,49.33,"Et ancienne patronne de la RATP."),
(50.04,50.71,"Coïncidence ?"),(51.13,52.14,"Alors suivez les hommes."),(52.49,53.23,"Louis Gallois."),(53.59,55.67,"Président de la SNCF pendant dix ans."),(56.00,58.66,"Puis, un 9 octobre, patron d'Airbus."),(59.07,60.62,"Le rail est déjà dans le cockpit."),
(61.17,62.13,"Mais le plus étrange…"),(62.49,65.78,"Pour suspendre la grève, les syndicats ont négocié avec qui ?"),(66.14,67.45,"Le ministère des Transports."),(67.83,69.13,"Celui qui gère les avions…"),(69.51,70.06,"et les trains."),(70.47,71.86,"Il jouait des deux côtés."),
(72.25,75.54,"Et la date, le 9 octobre, n'a pas été choisie au hasard."),(75.92,79.48,"Un 9 octobre, Clément Ader fait décoller le premier « avion »."),(79.88,82.14,"Avant ça… il travaillait aux chemins de fer."),
(82.54,84.31,"L'avion est né d'un cheminot."),(84.71,86.71,"Et c'est le train qui décide quand il vole."),
(87.11,88.52,"Vous croyez que la grève a échoué ?"),(88.86,90.34,"Une grève, ça coûte cher."),(90.74,92.70,"Une menace de grève… c'est gratuit."),
(93.06,95.48,"Le train n'avait pas besoin que les avions restent au sol."),(95.88,97.57,"Il avait besoin que vous ayez peur."),
(98.17,99.22,"Et regardez bien le mot :"),(99.59,100.43,"suspendue."),(100.83,101.61,"Pas annulée."),(101.99,103.21,"La menace est toujours là."),(103.53,105.20,"Juste au-dessus de vos vacances."),
(105.54,108.32,"Alors, vous avez regardé un billet de train, au cas où ?"),(108.65,109.07,"Avouez."),(109.44,110.21,"Réfléchissez."),(110.58,111.21,"Je dis ça,"),(111.49,112.15,"je dis rien.")]
DRAMA={"Officiellement.","Le train.","Mais le plus étrange…","et les trains.","Avouez.","Réfléchissez.","je dis rien.","Pas annulée.","Coïncidence ?"}
PAD=0.06;out=[np.zeros(int(.12*sr),np.float32)];t=.12;segs=[];prev=None
for a,b,w in SEG:
    if prev is not None:
        cap=.40 if w in DRAMA else .22
        g=max(0.0,min(a-prev,cap)-2*PAD);out.append(np.zeros(int(g*sr),np.float32));t+=g
    a0,b0=max(0,a-PAD),b+PAD;seg=x[int(a0*sr):int(b0*sr)].copy();f=int(.01*sr);seg[:f]*=np.linspace(0,1,f);seg[-f:]*=np.linspace(1,0,f)
    segs.append({"t0":t+(a-a0),"t1":t+(b-a0),"txt":w});out.append(seg);t+=b0-a0;prev=b
y=np.concatenate(out);wavfile.write(S+'/vo_tight.wav',sr,(y*32767).astype(np.int16))
TEMPO=1.07
for d in segs:d['t0']=round(d['t0']/TEMPO,3);d['t1']=round(d['t1']/TEMPO,3)
json.dump(segs,open(S+'/segs.json','w'),ensure_ascii=False)
print('tight',len(y)/sr,'final',len(y)/sr/TEMPO)
for i,d in enumerate(segs):print(i,d['t0'],d['txt'])
