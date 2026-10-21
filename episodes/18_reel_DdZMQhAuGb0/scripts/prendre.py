# prendre.py clé index : télécharge en grand la candidate choisie (cand_<clé>.json) et ajoute le crédit
import json,urllib.request,sys
UA={'User-Agent':'LaFermeBot/1.0 (https://github.com/Enidez/la-ferme-videos)'}
LIC={'by':'CC BY','by-sa':'CC BY-SA','cc0':'CC0','pdm':'Domaine public'}
key,i,S=sys.argv[1],int(sys.argv[2]),sys.argv[3];r=json.load(open(f'{S}/cand_{key}.json'))[i]
d=urllib.request.urlopen(urllib.request.Request(f"https://api.openverse.org/v1/images/{r['id']}/thumb/?full_size=true&compressed=false",headers=UA),timeout=90).read()
open(f'img/{key}.jpg','wb').write(d)
open('img/CREDITS.txt','a').write(f"{key}.jpg | {r.get('title','')[:60]} | {(r.get('creator') or '?')[:40]} | {LIC.get(r['license'],r['license'])} ({r.get('provider')}) | {r.get('foreign_landing_url')}\n")
print(key,len(d),r.get('title'),r.get('creator'),r['license'])
