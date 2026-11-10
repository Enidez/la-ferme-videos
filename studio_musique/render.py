"""Rend une visualisation du studio musique (page avec renderFrame) et y colle le son.
Usage : venv/bin/python studio_musique/render.py studio_musique/bloom viz.html bloom.wav sortie.mp4"""
import os, sys, base64, subprocess
from playwright.sync_api import sync_playwright
P, page, wav, out = os.path.abspath(sys.argv[1]), sys.argv[2], sys.argv[3], sys.argv[4]
with sync_playwright() as pw:
    b = pw.chromium.launch(executable_path='/opt/pw-browsers/chromium', args=['--allow-file-access-from-files', '--no-sandbox'])
    pg = b.new_page(viewport={'width': 1920, 'height': 1080}); pg.goto('file://' + os.path.join(P, page)); pg.evaluate('window.ready')
    dur = pg.evaluate('window.DURATION'); tmp = os.path.join(P, '_v.mp4')
    ff = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'image2pipe', '-framerate', '30', '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '19', tmp], stdin=subprocess.PIPE)
    for f in range(round(dur * 30)):
        d = pg.evaluate("f=>{window.renderFrame(f);return document.getElementById('c').toDataURL('image/jpeg',.92)}", f); ff.stdin.write(base64.b64decode(d.split(',')[1]))
    ff.stdin.close(); ff.wait(); b.close()
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', tmp, '-i', os.path.join(P, wav), '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', os.path.join(P, out)], check=True)
os.remove(tmp); print('ok', out)
