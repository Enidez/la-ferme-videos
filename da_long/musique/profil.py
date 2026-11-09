"""Mesure chaque morceau (niveau, dynamique, brillance, attaques par seconde, montée d'énergie) et classe les candidats
selon leur proximité avec les morceaux aimés d'Enidez (et leur éloignement de ceux qu'il n'aime pas)."""
import numpy as np,subprocess,glob,json,os
SR=22050
def feats(f):
    x=np.frombuffer(subprocess.run(['ffmpeg','-v','error','-i',f,'-ac','1','-ar',str(SR),'-f','f32le','-'],capture_output=True).stdout,np.float32)
    s=x[:len(x)//SR*SR].reshape(-1,SR);db=20*np.log10(np.sqrt((s**2).mean(1))+1e-6)
    H=512;fr=x[:len(x)//H*H].reshape(-1,H);sp=np.abs(np.fft.rfft(fr*np.hanning(H),axis=1))
    flux=np.maximum(0,np.diff(sp,axis=0)).sum(1);flux=(flux-flux.mean())/(flux.std()+1e-9)
    pk=((flux[1:-1]>flux[:-2])&(flux[1:-1]>flux[2:])&(flux[1:-1]>1.0)).sum()/(len(x)/SR)
    cen=np.median((sp*np.fft.rfftfreq(H,1/SR)).sum(1)/(sp.sum(1)+1e-9))
    n=len(db);slope=db[2*n//3:].mean()-db[:n//3].mean()
    return dict(niveau=float(np.median(db)),dyn=float(np.percentile(db,95)-np.percentile(db,10)),brill=float(cen),attaques=float(pk),montee=float(slope))
F={os.path.basename(f)[:-4]:feats(f) for f in sorted(glob.glob('src/*.mp3'))}
json.dump(F,open('profils.json','w'),indent=1)
K=['niveau','dyn','brill','attaques','montee'];M=np.array([[F[k][q] for q in K] for k in F]);mu,sd=M.mean(0),M.std(0)+1e-9
z=lambda k:(np.array([F[k][q] for q in K])-mu)/sd
def rank(cands,likes,dislikes=()):
    L=np.mean([z(k) for k in likes],0);D=np.mean([z(k) for k in dislikes],0) if dislikes else None
    sc={c:-np.linalg.norm(z(c)-L)+(0.5*np.linalg.norm(z(c)-D) if D is not None else 0) for c in cands};return sorted(sc,key=sc.get,reverse=True)
amb=['Ossuary_1_-_A_Beginning','Ossuary_2_-_Turn','Ossuary_5_-_Rest','Dark_Fog','Cryptic_Sorrow','Apprehension','Long_Note_One','Long_Note_Three','Dark_Walk','Night_Cave','Night_Vigil','Scott_Buckley_-_Sleep','Kai_Engel_-_Maree']
epic=['Heroic_Age','Hero_Theme','Exhilarate','Rising_Game','Undaunted','Constancy_Part_One','Constancy_Part_Three','Crossing_the_Chasm','Stay_the_Course','Inspired','Ascending_the_Vale','Scott_Buckley_-_Titan']
print('ENQUÊTE (proches de Unanswered Questions + Lightless Dawn, loin de Investigations/Comfortable Mystery/Spy Glass) :')
for c in rank(amb,['Unanswered_Questions','Lightless_Dawn'],['Investigations','Comfortable_Mystery','Spy_Glass'])[:6]:print('  ',c,{q:round(F[c][q],1) for q in K})
print('CONCLUSION (pulsé, lumineux, qui monte — Dreams Become Real + profil « Jumper ») :')
sc={c:F[c]['attaques']*.6+F[c]['montee']*.25+F[c]['niveau']*.05 for c in epic}
for c in sorted(sc,key=sc.get,reverse=True)[:6]:print('  ',c,{q:round(F[c][q],1) for q in K})
print('CHOPIN (archives = plus d\'attaques ; deuil = plus lent) :')
for c in sorted([k for k in F if k.startswith('Chopin')],key=lambda c:F[c]['attaques']):print('  ',c,{q:round(F[c][q],1) for q in K})
