"""Échantillon n°2 (après les retours d'Enidez) : enquête (ambiances sombres), archives (Chopin en mineur), deuil (Chopin lent),
conclusion (orchestral pulsé façon « Jumper »). 18 s par morceau, volumes égalisés."""
import json,subprocess,numpy as np
SR=48000;P=json.load(open('profils.json'))
SEL=[('A. Enquête / ouverture — ambiance sombre','Scott_Buckley_-_Sleep','Sleep — Scott Buckley'),('A. Enquête / ouverture — ambiance sombre','Dark_Fog','Dark Fog — K. MacLeod'),
 ('A. Enquête / ouverture — ambiance sombre','Ossuary_5_-_Rest','Ossuary 5 « Rest » — K. MacLeod'),('A. Enquête / ouverture — ambiance sombre','Night_Cave','Night Cave — K. MacLeod'),
 ('B. Archives / flashback — Chopin en mineur','Chopin_Nocturne_do_diese_mineur_posthume','Nocturne en do dièse mineur (posthume)'),('B. Archives / flashback — Chopin en mineur','Chopin_Nocturne_op9_n1_si_bemol_mineur','Nocturne op. 9 n°1, si bémol mineur'),
 ('B. Archives / flashback — Chopin en mineur','Chopin_Nocturne_op72_n1_mi_mineur','Nocturne op. 72 n°1, mi mineur'),('B. Archives / flashback — Chopin en mineur','Chopin_Valse_op69_n2_si_mineur','Valse op. 69 n°2, si mineur'),
 ('B. Archives / flashback — Chopin en mineur','Chopin_Valse_op64_n2_do_diese_mineur','Valse op. 64 n°2, do dièse mineur'),
 ('C. Drame / deuil — Chopin lent et grave','Chopin_Prelude_op28_n6_si_mineur','Prélude op. 28 n°6, si mineur'),('C. Drame / deuil — Chopin lent et grave','Chopin_Sonate_violoncelle_op65_Largo','Sonate pour violoncelle et piano, Largo'),
 ('C. Drame / deuil — Chopin lent et grave','Chopin_Nocturne_op27_n1_do_diese_mineur','Nocturne op. 27 n°1, do dièse mineur'),('C. Drame / deuil — Chopin lent et grave','Chopin_Nocturne_op48_n1_do_mineur','Nocturne op. 48 n°1, do mineur'),
 ('D. Conclusion — orchestral pulsé qui monte','Scott_Buckley_-_Titan','Titan — Scott Buckley'),('D. Conclusion — orchestral pulsé qui monte','Constancy_Part_Three','Constancy Part Three — K. MacLeod'),
 ('D. Conclusion — orchestral pulsé qui monte','Undaunted','Undaunted — K. MacLeod'),('D. Conclusion — orchestral pulsé qui monte','Ascending_the_Vale','Ascending the Vale — K. MacLeod')]
def dur(f):return float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f],capture_output=True,text=True).stdout)
def start(k,cat):
    f='src/'+k+'.mp3';d=dur(f);x=np.frombuffer(subprocess.run(['ffmpeg','-v','error','-i',f,'-ac','1','-ar','8000','-f','f32le','-'],capture_output=True).stdout,np.float32)
    s=x[:len(x)//8000*8000].reshape(-1,8000);db=20*np.log10(np.sqrt((s**2).mean(1))+1e-6);first=int(np.argmax(db>db.max()-30))
    if cat.startswith('D'):W=18;sc=[db[i:i+W].mean() for i in range(len(db)-W)];return int(np.argmax(sc[:int(len(sc)*.85)]))   # le moment le plus porté
    return min(first+4,int(d*.3))   # piano et ambiances : le thème, juste après le début
def cut(f,st,dur_,extra=''):
    p=subprocess.run(['ffmpeg','-v','error','-ss',str(st),'-t',str(dur_),'-i',f,'-af',f"loudnorm=I=-18:TP=-2,afade=t=in:d=1.0,afade=t=out:st={dur_-1.5}:d=1.5"+extra,'-ac','2','-ar',str(SR),'-f','f32le','-'],capture_output=True)
    assert p.stdout,p.stderr.decode()[:300];return np.frombuffer(p.stdout,np.float32).reshape(-1,2)
sil=lambda s:np.zeros((int(s*SR),2),np.float32);parts=[];idx=[];t=0.;prev=None
for cat,k,lab in SEL:
    if cat!=prev:parts.append(sil(1.5));t+=1.5;prev=cat
    x=cut('src/'+k+'.mp3',start(k,cat),18);idx.append((t,cat,lab));parts.append(x);t+=len(x)/SR;parts.append(sil(1.2));t+=1.2
# démo : Nocturne en do dièse mineur avec le traitement « vieux disque »
k='Chopin_Nocturne_do_diese_mineur_posthume';parts.append(sil(1.5));t+=1.5
y=cut('src/'+k+'.mp3',start(k,'B'),18,',highpass=f=200,lowpass=f=3400,vibrato=f=0.55:d=0.004,pan=stereo|c0=0.5*c0+0.5*c1|c1=0.5*c0+0.5*c1,volume=0.9')
r=np.random.default_rng(5);n=len(y);cr=np.zeros(n,np.float32)
for p_ in r.integers(0,n,int(n/SR*16)):L=min(60,n-p_);cr[p_:p_+L]+=(r.random()*.22+.05)*np.exp(-np.arange(L)/8)*np.sign(r.standard_normal())
y=y+(cr+r.standard_normal(n).astype(np.float32)*.004)[:,None];idx.append((t,'DÉMO archives','Nocturne en do dièse mineur — traitement « vieux disque »'));parts.append(y);t+=n/SR
z=np.concatenate(parts);z=z/max(1,np.abs(z).max()/.9)
subprocess.run(['ffmpeg','-v','error','-y','-f','f32le','-ar',str(SR),'-ac','2','-i','-','-c:a','libmp3lame','-q:a','3','echantillon_musiques_2.mp3'],input=z.astype(np.float32).tobytes(),check=True)
print('crête',round(float(np.abs(z).max()),3))
for tt,c,l in idx:print(f"{int(tt//60)}:{int(tt%60):02d}  {c} — {l}")
json.dump(idx,open('echantillon_index_2.json','w'),ensure_ascii=False)
