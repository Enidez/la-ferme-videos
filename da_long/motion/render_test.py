"""Rend un test de mouvement du labo DA (page HTML avec renderFrame) + son du projecteur synthétisé.
Usage : venv/bin/python da_long/motion/render_test.py burn_test  → da_long/motion/burn_test.mp4"""
import os, sys, base64, subprocess, numpy as np
from playwright.sync_api import sync_playwright
P = os.path.dirname(os.path.abspath(__file__)); name = sys.argv[1]; SR = 48000
with sync_playwright() as pw:
    b = pw.chromium.launch(executable_path='/opt/pw-browsers/chromium', args=['--allow-file-access-from-files', '--no-sandbox'])
    pg = b.new_page(viewport={'width': 1920, 'height': 1080}); pg.goto('file://' + os.path.join(P, name + '.html')); pg.evaluate('window.ready')
    dur = pg.evaluate('window.DURATION'); ev = pg.evaluate('window.EVENTS')
    ff = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'image2pipe', '-framerate', '30', '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', f'{P}/_v.mp4'], stdin=subprocess.PIPE)
    for f in range(round(dur * 30)):
        d = pg.evaluate("f=>{window.renderFrame(f);return document.getElementById('c').toDataURL('image/jpeg',.9)}", f); ff.stdin.write(base64.b64decode(d.split(',')[1]))
    ff.stdin.close(); ff.wait(); b.close()
# son : ronronnement continu très bas + cliquetis du projecteur (24 coups/s) et souffle pendant les transitions
n = int(dur * SR); t = np.arange(n) / SR; r = np.random.default_rng(1)
y = 0.012 * np.sin(2 * np.pi * 50 * t) * (1 + .3 * np.sin(2 * np.pi * .3 * t)) + 0.004 * r.standard_normal(n)
for t0, k in ev:
    a, L = int(max(0, t0) * SR), int(1.3 * SR); env = np.sin(np.linspace(0, np.pi, L)) ** 1.5
    clicks = np.zeros(L)
    for c in np.arange(0, 1.3, 1 / 24): i = int(c * SR); clicks[i:i + 300] += np.exp(-np.arange(min(300, L - i)) / 40) * (r.random() * .5 + .5)
    seg = (clicks * .35 + r.standard_normal(L) * .05) * env; y[a:a + L] += seg[:max(0, min(L, n - a))]
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-', f'{P}/_a.wav'], input=(y * .9).astype(np.float32).tobytes(), check=True)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'{P}/_v.mp4', '-i', f'{P}/_a.wav', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k', '-shortest', f'{P}/{name}.mp4'], check=True)
os.remove(f'{P}/_v.mp4'); os.remove(f'{P}/_a.wav'); print('ok', name)
