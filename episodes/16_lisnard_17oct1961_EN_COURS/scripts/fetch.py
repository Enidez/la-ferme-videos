# Télécharge une liste d'images Commons avec reprise sur 429 (attente croissante).
import urllib.request,time,sys,os
UA={'User-Agent':'LaFermeBot/1.0 (https://github.com/Enidez/la-ferme-videos)'}
L=[l.split(' ',1) for l in open(sys.argv[1]).read().split('\n') if l.strip()]
for name,url in L:
    if os.path.exists('img/'+name) and os.path.getsize('img/'+name)>20000:continue
    for k in range(12):
        try:
            d=urllib.request.urlopen(urllib.request.Request(url.strip(),headers=UA),timeout=60).read();open('img/'+name,'wb').write(d);print('OK',name,len(d),flush=True);break
        except urllib.error.HTTPError as e:
            print(name,e.code,flush=True);time.sleep(15*(k+1))
