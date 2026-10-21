# Cherche une photo libre par nom sur Openverse (Flickr CC), télécharge la plus grande adaptée, ajoute le crédit à img/CREDITS.txt
import json,urllib.request,urllib.parse,os,sys,time
UA={'User-Agent':'LaFermeBot/1.0 (https://github.com/Enidez/la-ferme-videos)'}
def get(u,binary=False):
    for k in range(5):
        try:
            r=urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=60).read();return r if binary else json.loads(r)
        except urllib.error.HTTPError as e:
            if e.code not in (429,503):raise
            time.sleep(8*(k+1))
    raise RuntimeError('trop de requêtes')
LIC={'by':'CC BY','by-sa':'CC BY-SA','cc0':'CC0','pdm':'Domaine public'}
Q=[(a.split('=')[0],a.split('=')[1]) for a in sys.argv[1:]]
for name,q in Q:
    if os.path.exists(f'img/{name}.jpg') and os.path.getsize(f'img/{name}.jpg')>10000:continue
    d=get('https://api.openverse.org/v1/images/?'+urllib.parse.urlencode(dict(q=q,license='by,by-sa,cc0,pdm',page_size=20,mature='false')))
    res=[r for r in d.get('results',[]) if r.get('provider')!='wikimedia' and (r.get('width') or 0)>=600 and (r.get('filetype') or 'jpg') in ('jpg','jpeg',None)]
    res.sort(key=lambda r:-(r.get('width') or 0)*(r.get('height') or 0))
    ok=False
    for r in res[:6]:
        try:
            try:data=get(r['url'],True)
            except Exception as e:
                print('  direct refusé',urllib.parse.urlparse(r['url']).netloc,flush=True);data=get(f"https://api.openverse.org/v1/images/{r['id']}/thumb/?full_size=true&compressed=false",True)
            if len(data)<20000:continue
            open(f'img/{name}.jpg','wb').write(data)
            cred=f"{(r.get('creator') or '?')[:40]} · {LIC.get(r['license'],r['license'])} · {r.get('provider')}"
            open('img/CREDITS.txt','a').write(f"{name}.jpg | {r.get('title','')[:60]} | {(r.get('creator') or '?')[:40]} | {LIC.get(r['license'],r['license'])} ({r.get('provider')}) | {r.get('foreign_landing_url')}\n")
            print('OK',name,'|',r.get('title','')[:50],'|',cred,'|',r.get('width'),'x',r.get('height'),flush=True);ok=True;break
        except Exception as e:print('  échec',name,e,flush=True)
    if not ok:print('RIEN',name,len(res),'résultats',flush=True)
