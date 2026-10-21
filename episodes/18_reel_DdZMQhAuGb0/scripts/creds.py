# img/CREDITS.txt -> creds.js (crédit court affiché sur chaque carte photo)
import json
C={'hollande':'COP Paris · CC0','macron':'Commission européenne · CC BY 4.0'}
for l in open('img/CREDITS.txt'):
    p=[x.strip() for x in l.split('|')]
    if len(p)>=4:C[p[0].replace('.jpg','')]=(p[2].replace('Photo ','')[:40]+' · '+p[3]).strip(' ·')
C.setdefault('macron2017',C['macron'])
open('creds.js','w').write('window.CRED='+json.dumps(C,ensure_ascii=False)+';\n');print(C)
