"""Échantillon d'écoute de la palette musicale (15 s par morceau, volumes égalisés) + démo du traitement « vieux disque » pour les archives.
Usage : venv/bin/python -I da_long/musique/construire_echantillon.py (depuis da_long/musique, après analyse.json)"""
import json,subprocess,numpy as np
SR=48000;A=json.load(open('analyse.json'));parts=[];idx=[];t=0.0
def cut(f,st,dur,extra=''):
    af=f"loudnorm=I=-18:TP=-2,afade=t=in:d=0.8,afade=t=out:st={dur-1}:d=1"+extra
    p=subprocess.run(['ffmpeg','-v','error','-ss',str(st),'-t',str(dur),'-i','src/'+f,'-af',af,'-ac','2','-ar',str(SR),'-f','f32le','-'],capture_output=True)
    assert p.stdout,p.stderr.decode()[:300]
    return np.frombuffer(p.stdout,np.float32).reshape(-1,2)
sil=lambda s:np.zeros((int(s*SR),2),np.float32)
prev=None
for a in A:
    if a['cat']!=prev:parts.append(sil(1.0));t+=1.0;prev=a['cat']
    x=cut(a['f'],a['start'],15);idx.append((t,a['cat'],a['n']));parts.append(x);t+=len(x)/SR;parts.append(sil(1.2));t+=1.2
g=[a for a in A if a['n']=='Gymnopedie No 1'][0];parts.append(sil(2));t+=2
x=cut(g['f'],g['start'],12);idx.append((t,'DÉMO archives','Gymnopédie n°1 — propre'));parts.append(x);t+=len(x)/SR;parts.append(sil(0.8));t+=0.8
y=cut(g['f'],g['start'],12,',highpass=f=220,lowpass=f=3200,vibrato=f=0.6:d=0.004,pan=stereo|c0=0.5*c0+0.5*c1|c1=0.5*c0+0.5*c1,volume=0.9')
r=np.random.default_rng(3);n=len(y);cr=np.zeros(n,np.float32)
for p in r.integers(0,n,int(n/SR*18)):L=min(60,n-p);cr[p:p+L]+=(r.random()*.25+.05)*np.exp(-np.arange(L)/8)*np.sign(r.standard_normal())
y=y+(cr+r.standard_normal(n).astype(np.float32)*.004)[:,None];idx.append((t,'DÉMO archives','Gymnopédie n°1 — traitement « vieux disque »'));parts.append(y);t+=n/SR
z=np.concatenate(parts);z=z/max(1,np.abs(z).max()/.9)
subprocess.run(['ffmpeg','-v','error','-y','-f','f32le','-ar',str(SR),'-ac','2','-i','-','-c:a','libmp3lame','-q:a','3','echantillon_musiques.mp3'],input=z.astype(np.float32).tobytes(),check=True)
for tt,c,n in idx:print(f"{int(tt//60)}:{int(tt%60):02d}  {c} — {n}")
json.dump(idx,open('echantillon_index.json','w'),ensure_ascii=False)
