import numpy as np,json,sys
from scipy.io import wavfile
S=sys.argv[1]+'/ep4'
sr,x=wavfile.read(S+'/vo_full.wav');x=x.astype(np.float32)/32768
SEG=[(0.16,1.02,"Il avait 15 ans."),(1.52,3.53,"Il était dans ce lycée depuis quelques semaines."),(4.07,5.66,"Lundi 5 octobre…"),(6.19,7.27,"il a perdu une main."),
(7.91,8.38,"Lens."),(8.86,10.98,"Lycée professionnel Auguste-Béhal."),(11.40,15.10,"Ce matin-là, 200 à 250 lycéens sont rassemblés."),(15.56,19.44,"Selon le préfet : des pierres, des feux d'artifice, des mortiers."),(19.88,21.77,"Une compagnie de CRS est déployée."),
(22.24,24.01,"Les sommations restent sans effet."),(24.40,25.91,"Deux grenades lacrymogènes."),(26.27,27.39,"Puis une troisième."),(27.72,29.41,"Une grenade assourdissante."),(29.93,30.70,"Elle explose."),
(31.19,33.90,"Et un adolescent de 15 ans se retrouve à l'hôpital."),(34.48,35.11,"Sans sa main."),
(35.70,37.40,"Depuis, il y a deux versions."),(37.82,39.68,"La première, c'est celle du parquet."),(40.14,41.63,"La grenade a été tirée de loin."),(41.94,42.94,"Elle est tombée au sol."),(43.29,44.65,"Le lycéen l'aurait ramassée."),(45.07,46.39,"Elle a explosé dans sa main."),(46.82,49.34,"Et il n'existe aucune vidéo de l'explosion."),
(49.85,52.07,"La deuxième, c'est celle de sa famille."),(52.48,53.74,"Son avocate l'affirme :"),(54.09,56.26,"il n'a jamais ramassé cette grenade."),(56.66,58.94,"Plusieurs témoins racontent qu'elle est tombée sur lui."),(59.33,60.64,"Sa mère a porté plainte."),
(61.25,62.38,"Une enquête est ouverte."),(63.00,65.58,"Pour violences ayant entraîné une mutilation."),
(66.09,67.20,"Mais regardez bien les dates."),(67.82,71.45,"Le 7 octobre, le ministre de l'Intérieur suspend cette grenade."),(71.85,72.40,"Pas partout."),(72.81,74.18,"Seulement pour les lycéens."),
(74.63,77.90,"Le 9 octobre, le procureur rend ses premières conclusions."),(78.26,80.15,"Le tir était… « conforme »."),(80.68,81.40,"Conforme."),(81.85,83.31,"Conforme à la formation."),(83.62,84.82,"Conforme aux ordres."),(85.18,86.84,"Une chaîne d'instructions strictes."),(87.38,88.70,"Personne n'a désobéi."),
(89.29,90.98,"Alors posez-vous la vraie question."),(91.36,93.11,"Si tout a été fait dans les règles…"),(93.48,95.10,"c'est que les règles permettent ça."),(95.52,98.86,"Une arme qu'on a le droit d'utiliser… devant un lycée…"),(99.20,100.80,"où il y a des enfants de 15 ans."),
(101.23,106.07,"Plus de 100 000 personnes ont signé une pétition pour interdire ces armes face aux lycéens."),(106.49,110.65,"18 enquêtes ont été ouvertes par l'IGPN depuis le début du mouvement."),
(111.12,112.56,"La grenade est suspendue."),(112.99,113.70,"Pas interdite."),(114.31,114.85,"Suspendue."),
(115.50,118.52,"On ne sait pas encore exactement ce qui s'est passé ce matin-là."),(118.95,120.10,"L'enquête le dira."),
(120.47,121.93,"Mais une chose est déjà sûre."),(122.37,124.06,"Un adolescent a perdu sa main…"),(124.46,127.40,"et, pour l'instant, personne n'a fait d'erreur."),
(127.75,129.58,"Conforme… et suspendue."),(130.03,131.84,"Les deux sont vrais en même temps."),(132.29,134.70,"Et c'est peut-être ça… le plus inquiétant.")]
DRAMA={"il a perdu une main.","Elle explose.","Sans sa main.","Et il n'existe aucune vidéo de l'explosion.","Mais regardez bien les dates.","Le tir était… « conforme ».","Conforme.","Personne n'a désobéi.","c'est que les règles permettent ça.","Suspendue.","Mais une chose est déjà sûre.","Conforme… et suspendue.","Et c'est peut-être ça… le plus inquiétant.","et, pour l'instant, personne n'a fait d'erreur."}
PAD=0.06;out=[np.zeros(int(.12*sr),np.float32)];t=.12;segs=[];prev=None
for a,b,w in SEG:
    if prev is not None:
        cap=.45 if w in DRAMA else .2
        g=max(0.0,min(a-prev,cap)-2*PAD)
        if w.startswith('Et un adolescent'):g=1.6
        out.append(np.zeros(int(g*sr),np.float32));t+=g
    a0,b0=max(0,a-PAD),b+PAD;seg=x[int(a0*sr):int(b0*sr)].copy();f=int(.01*sr);seg[:f]*=np.linspace(0,1,f);seg[-f:]*=np.linspace(1,0,f)
    segs.append({"t0":round(t+(a-a0),3),"t1":round(t+(b-a0),3),"txt":w});out.append(seg);t+=b0-a0;prev=b
y=np.concatenate(out);wavfile.write(S+'/vo_tight.wav',sr,(y*32767).astype(np.int16))
TEMPO=1.08
for d in segs:d['t0']=round(d['t0']/TEMPO,3);d['t1']=round(d['t1']/TEMPO,3)
json.dump(segs,open(S+'/segs.json','w'),ensure_ascii=False)
open(S+'/proj/segs.js','w').write('const SEGS='+json.dumps(segs,ensure_ascii=False)+';')
print('dur',len(y)/sr)
for i,d in enumerate(segs):print(i,d['t0'],d['txt'])
