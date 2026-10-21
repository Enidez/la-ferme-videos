# Planche de candidates Openverse pour choisir à l'œil : candidats.py clé "requête" -> scratch/cand_<clé>.jpg + cand_<clé>.json
import json,urllib.request,urllib.parse,sys,os,subprocess,tempfile
UA={'User-Agent':'LaFermeBot/1.0 (https://github.com/Enidez/la-ferme-videos)'}
key,q,out=sys.argv[1],sys.argv[2],sys.argv[3]
d=json.load(urllib.request.urlopen(urllib.request.Request('https://api.openverse.org/v1/images/?'+urllib.parse.urlencode(dict(q=q,license='by,by-sa,cc0,pdm',page_size=12,mature='false')),headers=UA),timeout=60))
res=[r for r in d.get('results',[]) if r.get('provider')!='wikimedia'][:10];tmp=tempfile.mkdtemp();fs=[]
for i,r in enumerate(res):
    try:open(f'{tmp}/{i}.jpg','wb').write(urllib.request.urlopen(urllib.request.Request(f"https://api.openverse.org/v1/images/{r['id']}/thumb/",headers=UA),timeout=60).read());fs.append(f'{tmp}/{i}.jpg')
    except Exception as e:pass
json.dump(res,open(f'{out}/cand_{key}.json','w'))
args=[];flt=''
for j,f in enumerate(fs):args+=['-i',f];flt+=f"[{j}]scale=-1:220,drawtext=text='{j}':fontsize=40:fontcolor=yellow:x=10:y=10[v{j}];"
flt+=''.join(f'[v{j}]' for j in range(len(fs)))+f'hstack={len(fs)}'
subprocess.run(['ffmpeg','-v','error','-y',*args,'-filter_complex',flt,f'{out}/cand_{key}.jpg']);print(key,len(fs))
