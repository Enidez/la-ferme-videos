# Rend avatar.html en PNG (1080x1080) : python rendu.py sortie.png
import sys,os,base64
from playwright.sync_api import sync_playwright
P=os.path.abspath(os.path.join(os.path.dirname(__file__),'avatar.html'))
with sync_playwright() as p:
    b=p.chromium.launch(args=['--allow-file-access-from-files']);pg=b.new_page(viewport={'width':1080,'height':1080})
    pg.goto('file://'+P);pg.evaluate('window.ready')
    d=pg.evaluate("document.getElementById('c').toDataURL('image/png')");open(sys.argv[1],'wb').write(base64.b64decode(d.split(',')[1]));b.close()
