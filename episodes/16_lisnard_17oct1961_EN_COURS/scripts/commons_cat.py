import json,sys,re,time,urllib.request,urllib.parse
UA={'User-Agent':'LaFermeBot/1.0 (https://github.com/Enidez/la-ferme-videos)'}
def get(params):
    u='https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode(params)
    for k in range(10):
        try:return json.load(urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=30))
        except urllib.error.HTTPError as e:
            if e.code!=429:raise
            time.sleep(15*(k+1))
for cat in sys.argv[1:]:
    d=get(dict(action='query',format='json',generator='categorymembers',gcmtitle='Category:'+cat,gcmtype='file',gcmlimit=50,prop='imageinfo',iiprop='size|url|extmetadata',iiurlwidth=1400,iiextmetadatafilter='LicenseShortName|Artist|DateTimeOriginal'))
    print('==',cat)
    for p in d.get('query',{}).get('pages',{}).values():
        ii=p['imageinfo'][0];m=ii.get('extmetadata',{})
        print(p['title'][5:],'|',f"{ii['width']}x{ii['height']}",'|',m.get('LicenseShortName',{}).get('value',''),'|',re.sub('<[^>]+>','',m.get('Artist',{}).get('value','')).strip()[:40],'|',re.sub('<[^>]+>','',m.get('DateTimeOriginal',{}).get('value',''))[:20],'|',ii.get('thumburl'))
    time.sleep(5)
