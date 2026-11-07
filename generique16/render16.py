"""Rendu 16:9 de l'ép. 28 (1920×1080, 30 i/s). renderFrame est asynchrone (extraits chargés à la demande).
Usage : render28.py preview t1 t2 …   |   render28.py full sortie.mp4 [début fin]"""
import sys,os,base64,subprocess,json
from playwright.sync_api import sync_playwright
P=os.path.dirname(os.path.abspath(__file__));mode=sys.argv[1]
with sync_playwright() as pw:
    b=pw.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files','--no-sandbox'])
    pg=b.new_page(viewport={'width':1920,'height':1080})
    pg.on('pageerror',lambda e:print('PAGE ERROR',e,flush=True))
    pg.goto('file://'+os.path.join(P,'index.html'));pg.evaluate('window.ready')
    dur=pg.evaluate('window.DURATION');json.dump(pg.evaluate('window.EVENTS'),open(os.path.join(P,'events.json'),'w'))
    js="async f=>{await window.renderFrame(f);return document.getElementById('c').toDataURL('image/jpeg',%s)}"
    if mode=='preview':
        os.makedirs(P+'/prev',exist_ok=True)
        for t in map(float,sys.argv[2:]):
            d=pg.evaluate(js%'0.82',round(t*30));open(f'{P}/prev/p_{t:06.2f}.jpg','wb').write(base64.b64decode(d.split(',')[1]))
    else:
        out=sys.argv[2];N=round(dur*30);F0=0
        if len(sys.argv)>4:F0=round(float(sys.argv[3])*30);N=min(N,round(float(sys.argv[4])*30))
        ff=subprocess.Popen(['ffmpeg','-v','error','-y','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-pix_fmt','yuv420p','-crf','18','-preset','medium',out],stdin=subprocess.PIPE)
        for f in range(F0,N):
            d=pg.evaluate(js%'0.92',f);ff.stdin.write(base64.b64decode(d.split(',')[1]))
            if f%300==0:print('frame',f,'/',N,flush=True)
        ff.stdin.close();ff.wait()
    b.close()
