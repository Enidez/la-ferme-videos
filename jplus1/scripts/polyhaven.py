# Télécharge des objets / HDRI / textures Poly Haven (CC0) en 1K dans assets/. Usage : polyhaven.py models id1 id2 … | hdris id… | textures id…
import json,urllib.request,os,sys,time
UA={'User-Agent':'LaFermeBot/1.0 (https://github.com/Enidez/la-ferme-videos)'}
def get(u,b=False):
    for k in range(5):
        try:r=urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=120).read();return r if b else json.loads(r)
        except Exception as e:print('  reprise',u[-60:],e,flush=True);time.sleep(5*(k+1))
    raise SystemExit('échec '+u)
kind,ids=sys.argv[1],sys.argv[2:]
for i in ids:
    f=get(f'https://api.polyhaven.com/files/{i}')
    if kind=='models':
        g=f['gltf']['1k']['gltf'];d=f'assets/models/{i}';os.makedirs(d,exist_ok=True)
        open(f"{d}/{os.path.basename(g['url'])}",'wb').write(get(g['url'],True))
        for p,v in g.get('include',{}).items():
            os.makedirs(os.path.dirname(f'{d}/{p}') or d,exist_ok=True);open(f'{d}/{p}','wb').write(get(v['url'],True))
    elif kind=='hdris':
        u=f['hdri']['1k']['hdr']['url'];open(f'assets/hdri/{i}_1k.hdr','wb').write(get(u,True))
    else:
        d=f'assets/textures/{i}';os.makedirs(d,exist_ok=True)
        for m in ('Diffuse','nor_gl','Rough','AO','arm'):
            if m in f and '1k' in f[m]:
                v=f[m]['1k'].get('jpg') or f[m]['1k'].get('png');open(f"{d}/{os.path.basename(v['url'])}",'wb').write(get(v['url'],True))
    print('OK',kind,i,flush=True)
