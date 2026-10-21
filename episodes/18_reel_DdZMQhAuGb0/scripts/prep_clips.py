# Extraits d'archives (Dailymotion, sources d'origine : RTL/BFMTV, France 3, euronews, Le Point, i24news, TF1, Le Monde) -> images 30 i/s.
# Sources : yt-dlp https://www.dailymotion.com/video/<id> -o source/dm/dm_<id>.mp4 (non versionnées, comme clips/)
# Émissions et images officielles : aucun flou. crop = cadrage portrait sur la personne (source 512x288).
import os,subprocess,shutil,sys
E=os.path.join(os.path.dirname(__file__),'..');D=os.path.join(E,'source/dm')
J={ # nom: (fichier, début, fin, crop)
 'hook':('dm_x5lc5te.mp4',229,237,None),       # Louvre, 7 mai 2017
 'sarko':('dm_x46ojd.mp4',4.6,10.6,'320:204:0:0'),       # Élysée, 23 janv. 2008 : remise du rapport Attali
 'attali':('dm_x46ojd.mp4',11.8,19.4,'320:204:0:0'),
 'closer':('dm_x5ff3ax.mp4',2.2,8.9,None),     # TF1, 20 mars 2017 : « … banquier. Certains ou certaines me l'ont parfois reproché. »
 'nestle':('dm_xqbb46.mp4',0,11.9,None),       # euronews, avril 2012
 'ely':('dm_xqng6u.mp4',44.4,50.3,None),       # Le Point, 6 mai 2012 (l'Élysée)
 'pass':('dm_x24nvgs.mp4',20,31,'300:288:0:0'),# RTL/BFMTV, passation à Bercy, 27 août 2014
 'amiens':('dm_x42dl68.mp4',155.6,160.5,'300:250:212:0'), # i24news, Amiens, 6 avril 2016 (lancement d'En Marche)
 'mel0':('dm_x2883mo.mp4',2628.6,2632.4,None),      # plateau d'ONPC (plan large)
 'mel1':('dm_x2883mo.mp4',2621.2,2626.1,'256:288:256:0'), # On n'est pas couché, France 2, 18/10/2014 (écran partagé : Mélenchon à droite)
 'mel2':('dm_x2883mo.mp4',2657.2,2660.8,'256:288:256:0'),
 'louvre':('dm_x5lc5te.mp4',439,445,None),
}
for k in (sys.argv[1:] or J):
    f,a,b,cr=J[k];out=os.path.join(E,'clips',k);shutil.rmtree(out,ignore_errors=True);os.makedirs(out)
    vf=(f'crop={cr},' if cr else '')+'scale=-2:720:flags=lanczos,fps=30,unsharp=5:5:0.6'
    subprocess.run(['ffmpeg','-v','error','-ss',str(a),'-to',str(b),'-i',os.path.join(D,f),'-vf',vf,'-q:v','3',out+'/%04d.jpg'],check=True)
    print(k,len(os.listdir(out)))
# liste des extraits dans index.html
import re,json
L=[[k,len(os.listdir(os.path.join(E,'clips',k)))] for k in sorted(os.listdir(os.path.join(E,'clips')))]
p=os.path.join(E,'index.html');s=open(p).read();s=re.sub(r'for\(const \[k,n\] of \[.*?\]\)\{','for(const [k,n] of '+json.dumps(L).replace('"',"'").replace(' ','')+'){',s,count=1);open(p,'w').write(s)
# vraie voix de Macron (TF1, 20/03/2017) pour assemble.py
subprocess.run(['ffmpeg','-v','error','-y','-ss','2.2','-to','8.9','-i',os.path.join(D,'dm_x5ff3ax.mp4'),'-vn','-ac','1','-ar','44100','-af','highpass=f=80,loudnorm=I=-16:TP=-2',os.path.join(E,'vo/closer.wav')],check=True)
# vraie voix de Mélenchon (ONPC, 18/10/2014)
for k,a,b in [('mel1',2621.2,2626.1),('mel2',2657.2,2660.8)]:
    subprocess.run(['ffmpeg','-v','error','-y','-ss',str(a),'-to',str(b),'-i',os.path.join(D,'dm_x2883mo.mp4'),'-vn','-ac','1','-ar','44100','-af','highpass=f=80,loudnorm=I=-16:TP=-2',os.path.join(E,'vo',k+'.wav')],check=True)
