# Infos + téléchargement Commons (avec reprise sur 429). Usage : commons.py info "File:A|File:B"  /  commons.py search "texte"
import json,sys,re,time,urllib.request,urllib.parse
UA={'User-Agent':'LaFermeBot/1.0 (https://github.com/Enidez/la-ferme-videos)'}
def get(params):
    u='https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode(params)
    for k in range(6):
        try:return json.load(urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=30))
        except urllib.error.HTTPError as e:
            if e.code!=429:raise
            time.sleep(10*(k+1))
    raise SystemExit('429 persistant')
base=dict(action='query',format='json',prop='imageinfo',iiprop='size|url|extmetadata',iiurlwidth=1400,iiextmetadatafilter='LicenseShortName|Artist')
if sys.argv[1]=='info':d=get(dict(base,titles=sys.argv[2]))
else:d=get(dict(base,generator='search',gsrnamespace=6,gsrlimit=6,gsrsearch=sys.argv[2]))
for p in d.get('query',{}).get('pages',{}).values():
    if 'imageinfo' not in p:print('MANQUE',p['title']);continue
    ii=p['imageinfo'][0];m=ii.get('extmetadata',{})
    print(p['title'],'|',f"{ii['width']}x{ii['height']}",'|',m.get('LicenseShortName',{}).get('value',''),'|',re.sub('<[^>]+>','',m.get('Artist',{}).get('value','')).strip()[:50],'|',ii.get('thumburl'))
