"""Labo DA format long — 3 directions × 4 moments, rendus en images fixes 1920×1080.
Usage : venv/bin/python da_long/styleframes.py  →  da_long/frames/<dir>_<n>.jpg + da_long/planche_<dir>.jpg"""
import os, subprocess
from playwright.sync_api import sync_playwright
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..')); E = 'file://' + R + '/episodes/28_aaron_swartz'
F = 'file://' + R + '/node_modules/@fontsource'
FONTS = f"""@font-face{{font-family:Inter;font-weight:400;src:url({F}/inter/files/inter-latin-400-normal.woff2)}}
@font-face{{font-family:Inter;font-weight:500;src:url({F}/inter/files/inter-latin-500-normal.woff2)}}
@font-face{{font-family:Inter;font-weight:600;src:url({F}/inter/files/inter-latin-600-normal.woff2)}}
@font-face{{font-family:Inter;font-weight:700;src:url({F}/inter/files/inter-latin-700-normal.woff2)}}
@font-face{{font-family:Mono;font-weight:400;src:url({F}/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2)}}
@font-face{{font-family:Mono;font-weight:700;src:url({F}/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2)}}
@font-face{{font-family:Anton;src:url({F}/anton/files/anton-latin-400-normal.woff2)}}"""
BASE = """*{box-sizing:border-box}body{margin:0;width:1920px;height:1080px;overflow:hidden;position:relative;font-family:Inter}
.sub{position:absolute;left:0;right:0;bottom:52px;text-align:center;font:500 40px Inter;color:#fff;text-shadow:0 2px 10px #000,0 0 3px #000}
.sup{position:absolute;left:96px;bottom:200px;border-left:3px solid #fff;padding-left:22px;color:#fff;text-shadow:0 1px 8px #000}
.sup b{display:block;font:700 38px Inter}.sup span{font:400 25px Inter;opacity:.88}
.grain{position:absolute;inset:0;pointer-events:none;opacity:.10;background:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3'/></filter><rect width='300' height='300' filter='url(%23n)'/></svg>")}"""
A1 = E + '/frames/A1/0150.jpg'; V5 = E + '/frames/V5/0040.jpg'; ORT = E + '/frames/ORTIZ/0060.jpg'
IMG = lambda f: E + '/img/' + f
DOJ = ("<div style='font:600 22px Inter;letter-spacing:2px;color:#555'>UNITED STATES ATTORNEY’S OFFICE · DISTRICT OF MASSACHUSETTS</div>"
       "<div style='font:400 20px Inter;color:#777;margin:6px 0 26px'>FOR IMMEDIATE RELEASE · Tuesday, July 19, 2011</div>"
       "<div style='font:700 40px Inter;color:#111;line-height:1.2;margin-bottom:26px'>Alleged Hacker Charged with Stealing Over Four Million Documents from MIT Network</div>"
       "<div style='font:400 27px Inter;color:#333;line-height:1.55'>BOSTON — An Internet activist was indicted today for allegedly stealing more than four million documents… "
       "“<mark>Stealing is stealing whether you use a computer command or a crowbar, and whether you take documents, data or dollars.</mark>” said United States Attorney Carmen M. Ortiz…</div>")

# ---------- direction A : « le bureau d'enquête » (écran, fenêtres, recherches)
A_CSS = """body{background:#0d0f11}.desk{position:absolute;inset:0;background:radial-gradient(1200px 700px at 60% 40%,#1a1e22,#0b0c0e);}
.desk:before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:48px 48px}
.win{position:absolute;background:#16191c;border:1px solid rgba(255,255,255,.12);border-radius:12px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.6)}
.bar{height:44px;background:#202428;display:flex;align-items:center;padding:0 16px;gap:8px;font:500 18px Mono;color:#9aa3ab}
.bar i{width:12px;height:12px;border-radius:50%;background:#3a3f44;display:inline-block}.bar span{margin-left:14px}
.hl{position:absolute;border:3px solid #ff4a3d;border-radius:6px;box-shadow:0 0 0 9999px rgba(0,0,0,.35)}
.path{position:absolute;left:60px;top:40px;font:400 20px Mono;color:#6f7a83}
mark{background:#ffe14a;color:#111;padding:0 4px}.tag{display:inline-block;font:600 16px Mono;color:#ff4a3d;border:1px solid #ff4a3d;border-radius:4px;padding:2px 8px;letter-spacing:2px}"""
A = [
 f"""<div class=desk></div><div class=path>~/enquetes/aaron-swartz/</div>
 <div class=win style='left:760px;top:150px;width:1060px;height:640px'><div class=bar><i></i><i></i><i></i><span>freedom_to_connect_2012.mp4 — archive</span></div><img src='{A1}' style='width:100%;height:596px;object-fit:cover;filter:grayscale(.2)'></div>
 <div style='position:absolute;left:100px;top:330px;color:#eef0f2'><div class=tag>DOSSIER #01</div><div style='font:700 104px Inter;letter-spacing:-2px;line-height:1;margin-top:26px'>Pire qu’un<br>complot.</div>
 <div style='font:400 30px Inter;color:#9aa3ab;margin-top:28px'>L’affaire Aaron Swartz, 2011 – 2013</div></div><div class=grain></div>""",
 f"""<div class=desk></div><div class=path>~/enquetes/aaron-swartz/temoins/</div>
 <div class=win style='left:150px;top:110px;width:1180px;height:700px'><div class=bar><i></i><i></i><i></i><span>tv5monde_64min_2019 — Flore Vasseur</span></div><img src='{V5}' style='width:100%;height:656px;object-fit:cover;object-position:78% 50%'></div>
 <div class=win style='left:1380px;top:160px;width:420px;height:360px;padding:0'><div class=bar><span>fiche_temoin.txt</span></div><div style='padding:24px;font:400 22px Mono;color:#c8ced3;line-height:1.7'>NOM : Flore Vasseur<br>RÔLE : écrivaine<br>ENQUÊTE : 4 ans<br>LIVRE : « Ce qu’il reste<br>de nos rêves » (2019)<br><span style='color:#ff4a3d'>A RENCONTRÉ SES PROCHES</span></div></div>
 <div class=sup><b>Flore Vasseur</b><span>Écrivaine, autrice de « Ce qu’il reste de nos rêves »</span></div>
 <div class=sub>J’étais complètement persuadée qu’on l’avait poussé au suicide.</div><div class=grain></div>""",
 f"""<div class=desk></div><div class=path>~/enquetes/aaron-swartz/documents/</div>
 <div class=win style='left:240px;top:90px;width:1180px;height:820px;background:#f3f1ec'><div class=bar><i></i><i></i><i></i><span>communique_DOJ_19-07-2011.pdf</span></div><div style='padding:50px 64px'>{DOJ}</div></div>
 <div class=win style='left:1340px;top:560px;width:470px;height:300px'><img src='{IMG("Carmen_M._Ortiz.jpg")}' style='width:100%;height:100%;object-fit:cover;object-position:50% 20%;filter:grayscale(1)'></div>
 <div class=sub>« Voler, c’est voler. Qu’on utilise une commande informatique ou un pied-de-biche. »</div><div class=grain></div>""",
 f"""<div class=desk></div><div class=path>~/enquetes/aaron-swartz/recherches/</div>
 <div class=win style='left:180px;top:90px;width:1000px;height:820px'><div class=bar><i></i><i></i><i></i><span>archives — recherche</span></div>
 <div style='margin:30px;background:#0f1214;border:1px solid #2c3136;border-radius:10px;padding:18px 24px;font:500 28px Mono;color:#eef0f2'>aaron swartz MIT JSTOR 2011<span style='color:#ff4a3d'>▍</span></div>
 <div style='padding:0 30px;font:400 22px Inter;color:#9aa3ab;line-height:1.5'>
 <div style='margin:18px 0'><div style='color:#7fb2ff;font:600 26px Inter'>Alleged Hacker Charged with Stealing Over Four Million Documents</div>justice.gov · 19 juillet 2011</div>
 <div style='margin:18px 0;background:rgba(255,74,61,.12);border-left:3px solid #ff4a3d;padding:8px 14px'><div style='color:#fff;font:600 26px Inter'>Swartz lawyer: Feds insisted on prison time</div>AP · 16 janvier 2013</div>
 <div style='margin:18px 0'><div style='color:#7fb2ff;font:600 26px Inter'>FBI investigated coder for liberating court records</div>Wired · octobre 2009</div>
 <div style='margin:18px 0'><div style='color:#7fb2ff;font:600 26px Inter'>MIT report: “neutral” in Swartz case</div>The Tech · juillet 2013</div></div></div>
 <div class=win style='left:1230px;top:150px;width:560px;height:360px'><img src='{IMG("Aaron_Swartz_profile.jpg")}' style='width:100%;height:100%;object-fit:cover;filter:grayscale(1)'></div>
 <div class=win style='left:1290px;top:560px;width:500px;height:330px'><img src='{IMG("MIT_Main_Group_aerial.JPG")}' style='width:100%;height:100%;object-fit:cover;filter:grayscale(.6)'></div>
 <div class=hl style='left:1260px;top:600px;width:200px;height:160px'></div>
 <div class=sub>Le six janvier deux mille onze, il est arrêté.</div><div class=grain></div>""",
]
# ---------- direction B : « la salle d'archives » (papier, dossiers, crayon rouge)
B_CSS = """body{background:#1a1612}.bg{position:absolute;inset:0;background:radial-gradient(900px 600px at 55% 45%,#3a3128,#14110e 75%)}
.paper{position:absolute;background:#e9e2d0;box-shadow:0 25px 60px rgba(0,0,0,.6);color:#2a2620}
.typed{font:400 26px Mono;color:#2a2620;letter-spacing:1px}.red{color:#b3261e}
.folder{position:absolute;background:#c9a96e;border-radius:6px 6px 4px 4px;box-shadow:0 25px 60px rgba(0,0,0,.6)}
.clip{position:absolute;width:40px;height:90px;border:6px solid #9a9a96;border-radius:20px}"""
B = [
 f"""<div class=bg></div><div class=folder style='left:260px;top:140px;width:1400px;height:820px;transform:rotate(-1.2deg)'>
 <div style='position:absolute;left:60px;top:50px' class=typed>DOSSIER N° 11-CR-10260 · ÉTATS-UNIS c. SWARTZ</div>
 <div class=paper style='left:70px;top:130px;width:620px;height:600px;transform:rotate(2deg);padding:14px'><img src='{A1}' style='width:100%;height:100%;object-fit:cover;filter:grayscale(1) sepia(.25) contrast(1.15)'></div><div class=clip style='left:340px;top:100px'></div>
 <div style='position:absolute;left:760px;top:220px;font:400 92px Anton;color:#2a2620;line-height:1.02'>PIRE<br>QU’UN<br><span class=red>COMPLOT.</span></div>
 <div style='position:absolute;left:770px;top:640px;border:5px solid #b3261e;color:#b3261e;font:700 40px Mono;padding:6px 18px;transform:rotate(-6deg);letter-spacing:4px'>CLASSÉ 2013</div></div><div class=grain></div>""",
 f"""<div class=bg></div><div style='position:absolute;left:200px;top:110px;width:1280px;height:760px;background:#000;padding:40px 70px;box-shadow:0 25px 60px #000'>
 <div style='position:absolute;left:18px;top:0;bottom:0;width:30px;background:repeating-linear-gradient(#000 0 30px,#cfc6b0 30px 54px)'></div><div style='position:absolute;right:18px;top:0;bottom:0;width:30px;background:repeating-linear-gradient(#000 0 30px,#cfc6b0 30px 54px)'></div>
 <img src='{V5}' style='width:100%;height:100%;object-fit:cover;object-position:78% 50%;filter:sepia(.35) contrast(1.1)'></div>
 <div class=paper style='left:1380px;top:520px;width:420px;height:300px;transform:rotate(3deg);padding:28px'><div class=typed style='font-size:22px;line-height:1.6'>TÉMOIN N° 1<br>Flore VASSEUR<br>écrivaine<br><span class=red>4 ans d’enquête</span></div></div>
 <div class=sup><b>Flore Vasseur</b><span>Écrivaine, autrice de « Ce qu’il reste de nos rêves »</span></div>
 <div class=sub>J’étais complètement persuadée qu’on l’avait poussé au suicide.</div><div class=grain></div>""",
 f"""<div class=bg></div><div class=paper style='left:300px;top:70px;width:1150px;height:900px;transform:rotate(1deg);padding:60px 70px'>{DOJ.replace('<mark>',"<span style='border-bottom:5px solid #b3261e'>").replace('</mark>','</span>')}
 <div style='position:absolute;right:60px;bottom:60px;border:5px solid #b3261e;color:#b3261e;font:700 34px Mono;padding:6px 16px;transform:rotate(-5deg)'>PIÈCE N° 7</div></div>
 <div class=paper style='left:1430px;top:520px;width:380px;height:440px;transform:rotate(-4deg);padding:16px'><img src='{IMG("Carmen_M._Ortiz.jpg")}' style='width:100%;height:100%;object-fit:cover;object-position:50% 20%;filter:grayscale(1) sepia(.2)'></div>
 <div class=sub>« Voler, c’est voler. Qu’on utilise une commande informatique ou un pied-de-biche. »</div><div class=grain></div>""",
 f"""<div class=bg></div>""" + ''.join(f"<div class=paper style='left:{170+i*400}px;top:{230+(i%2)*60}px;width:360px;height:520px;transform:rotate({[-3,2,-1,3][i]}deg);padding:22px'><img src='{IMG(im)}' style='width:100%;height:300px;object-fit:cover;filter:grayscale(1) sepia(.2)'><div class=typed style='font-size:22px;margin-top:20px;line-height:1.5'>{t}</div></div>"
   for i, (im, t) in enumerate([('Aaron_Swartz_and_Lawrence_Lessig.jpg', '2001<br>RSS · Creative Commons'), ('Aaron_Swartz_profile.jpg', '2008<br>PACER · <span class=red>FBI</span>'), ('MIT_Main_Group_aerial.JPG', '06/01/2011<br><span class=red>ARRESTATION</span>'), ('Aaron_Swartz_at_Boston_Wikipedia_Meetup_2009-08-18.jpg', '11/01/2013<br>26 ans')])) +
 """<div style='position:absolute;left:150px;right:150px;top:840px;height:4px;background:#b3261e'></div><div class=sub>Le six janvier deux mille onze, il est arrêté.</div><div class=grain></div>""",
]
# ---------- direction C : « plein cadre sobre » (archives plein écran, typo minimale, intertitres)
C_CSS = """body{background:#000}.full{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.vig{position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(0,0,0,0) 50%,rgba(0,0,0,.7))}"""
C = [
 f"""<img class=full src='{A1}' style='filter:grayscale(1) contrast(1.15) brightness(.55)'><div class=vig></div>
 <div style='position:absolute;left:0;right:0;top:400px;text-align:center;color:#fff'><div style='font:500 26px Inter;letter-spacing:10px;opacity:.8'>LE PRIX À PAYER · 01</div>
 <div style='font:700 120px Inter;letter-spacing:-3px;margin-top:20px'>Pire qu’un complot</div><div style='width:120px;height:3px;background:#e8231f;margin:30px auto 0'></div></div>
 <div style='position:absolute;right:50px;top:40px;font:400 19px Inter;color:rgba(255,255,255,.7)'>Archive · 21 mai 2012 · domaine public</div><div class=grain></div>""",
 f"""<img class=full src='{V5}' style='object-position:78% 50%;filter:contrast(1.05) saturate(.85)'><div class=vig></div>
 <div class=sup><b>Flore Vasseur</b><span>Écrivaine, autrice de « Ce qu’il reste de nos rêves »</span></div>
 <div class=sub>J’étais complètement persuadée qu’on l’avait poussé au suicide.</div><div class=grain></div>""",
 f"""<div style='position:absolute;inset:0;background:#e9e7e1'></div><div style='position:absolute;left:260px;top:120px;width:1400px;transform:scale(1.04);transform-origin:50% 40%;padding:40px'>{DOJ.replace('<mark>',"<span style='background:#e8231f;color:#fff;padding:0 6px'>").replace('</mark>','</span>')}</div>
 <div class=vig style='background:radial-gradient(ellipse at center,rgba(0,0,0,0) 55%,rgba(0,0,0,.35))'></div>
 <div class=sub>« Voler, c’est voler. Qu’on utilise une commande informatique ou un pied-de-biche. »</div><div class=grain></div>""",
 f"""<div style='position:absolute;inset:0;background:#000'></div><div style='position:absolute;left:0;right:0;top:420px;text-align:center;color:#fff'>
 <div style='font:500 28px Inter;letter-spacing:12px;color:#e8231f'>CHAPITRE 4</div><div style='font:700 110px Inter;letter-spacing:-2px;margin-top:18px'>Le placard</div>
 <div style='font:400 30px Inter;opacity:.7;margin-top:24px'>MIT, Cambridge · janvier 2011</div></div><div class=grain></div>""",
]
DIRS = {'A_bureau': (A_CSS, A), 'B_archives': (B_CSS, B), 'C_plein_cadre': (C_CSS, C)}
OUT = os.path.join(os.path.dirname(__file__), 'frames'); os.makedirs(OUT, exist_ok=True)
with sync_playwright() as pw:
    b = pw.chromium.launch(executable_path='/opt/pw-browsers/chromium', args=['--allow-file-access-from-files', '--no-sandbox'])
    pg = b.new_page(viewport={'width': 1920, 'height': 1080})
    for d, (css, frames) in DIRS.items():
        for i, body in enumerate(frames, 1):
            hp=os.path.join(OUT,'_tmp.html');open(hp,'w').write(f"<html><head><meta charset=utf-8><style>{FONTS}{BASE}{css}</style></head><body>{body}</body></html>")
            pg.goto('file://'+hp);pg.wait_for_load_state('networkidle');pg.evaluate('document.fonts.ready');pg.wait_for_timeout(500)
            pg.screenshot(path=f'{OUT}/{d}_{i}.jpg', type='jpeg', quality=88)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'{OUT}/{d}_%d.jpg', '-vf', 'scale=960:-2,tile=2x2:padding=12:color=white', '-frames:v', '1', os.path.join(os.path.dirname(__file__), f'planche_{d}.jpg')], check=True)
    b.close()
print('ok')
