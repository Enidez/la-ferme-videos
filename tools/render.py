import sys,os,base64,subprocess,json
from playwright.sync_api import sync_playwright
P=os.path.abspath(sys.argv[1]);mode=sys.argv[2]
with sync_playwright() as pw:
    b=pw.chromium.launch(args=['--allow-file-access-from-files'])
    pg=b.new_page(viewport={'width':1080,'height':1920})
    pg.on('pageerror',lambda e:print('PAGE ERROR',e))
    pg.goto('file://'+os.path.join(P,'index.html'));pg.evaluate('window.ready')
    dur=pg.evaluate('window.DURATION');json.dump(pg.evaluate('window.EVENTS'),open(os.path.join(P,'events.json'),'w'))
    js="f=>{window.renderFrame(f);return document.getElementById('c').toDataURL('image/jpeg',%s)}"
    if mode=='preview':
        os.makedirs(P+'/prev',exist_ok=True)
        for t in map(float,sys.argv[3:]):
            d=pg.evaluate(js%'0.85',round(t*30));open(f'{P}/prev/p_{t:06.2f}.jpg','wb').write(base64.b64decode(d.split(',')[1]))
    else:
        N=round(dur*30);out=sys.argv[3];F0=0
        if len(sys.argv)>5:F0=round(float(sys.argv[4])*30);N=min(N,round(float(sys.argv[5])*30))  # extrait seulement (aperçu)
        ff=subprocess.Popen(['ffmpeg','-v','error','-y','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-pix_fmt','yuv420p','-crf','17','-preset','medium',out],stdin=subprocess.PIPE)
        for f in range(F0,N):
            d=pg.evaluate(js%'0.93',f);ff.stdin.write(base64.b64decode(d.split(',')[1]))
            if f%300==0:print('frame',f,'/',N,flush=True)
        ff.stdin.close();ff.wait()
    b.close()
