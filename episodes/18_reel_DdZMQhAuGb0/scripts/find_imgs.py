# Cherche sur Commons une photo par nom (avec reprise sur 429) et télécharge la première adaptée ; écrit img/CREDITS.txt
import json,re,time,urllib.request,urllib.parse,os,sys
UA={'User-Agent':'LaFermeBot/1.0 (https://github.com/Enidez/la-ferme-videos)'}
def get(u,binary=False):
    for k in range(14):
        try:
            r=urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=60).read();return r if binary else json.loads(r)
        except urllib.error.HTTPError as e:
            if e.code!=429:raise
            time.sleep(12*(k+1))
    raise SystemExit('429')
Q=[('macron2015','Emmanuel Macron par Claude Truong-Ngoc avril 2015'),('jouyet','Jean-Pierre Jouyet'),('jattali','Jacques Attali'),('battali','Bernard Attali'),
   ('rebsamen','François Rebsamen'),('melenchon','Jean-Luc Mélenchon 2014'),('sarkozy','Nicolas Sarkozy 2007 portrait'),('ena','École nationale d\'administration Strasbourg'),
   ('rothschild','Rothschild & Co Paris rue de Messine'),('elysee','Palais de l\'Élysée cour'),('macron2017','Emmanuel Macron Louvre 7 mai 2017'),('bercy','Ministère de l\'Économie Bercy Paris')]
cred=open('img/CREDITS.txt','a')
for name,q in Q:
    if os.path.exists(f'img/{name}.jpg') and os.path.getsize(f'img/{name}.jpg')>10000:continue
    d=get('https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode(dict(action='query',format='json',generator='search',gsrnamespace=6,gsrlimit=6,gsrsearch=q,prop='imageinfo',iiprop='size|url|extmetadata|mime',iiurlwidth=1400,iiextmetadatafilter='LicenseShortName|Artist')))
    pages=sorted(d.get('query',{}).get('pages',{}).values(),key=lambda p:p.get('index',99))
    for p in pages:
        ii=p['imageinfo'][0];m=ii.get('extmetadata',{});lic=m.get('LicenseShortName',{}).get('value','')
        if ii.get('mime')!='image/jpeg' or ii['width']<500 or not re.search(r'CC|Public|domain|Licence Ouverte',lic,re.I):continue
        u=ii.get('thumburl') or ii['url'];u=u.replace('thumb.wikimedia.org','upload.wikimedia.org')
        data=get(u,True);open(f'img/{name}.jpg','wb').write(data)   # écrit seulement après un téléchargement réussi
        a=re.sub('<[^>]+>','',m.get('Artist',{}).get('value','')).strip()[:60]
        cred.write(f"{name}.jpg | {p['title'][5:]} | {a} | {lic}\n");cred.flush();print('OK',name,p['title'][5:],lic,a,flush=True);break
    else:print('RIEN',name,flush=True)
    time.sleep(4)
