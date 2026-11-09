"""Labo DA format long — direction C développée : plein cadre sobre + serif « keynote » + polaroids et photomaton annotés à la main.
Usage : venv/bin/python da_long/styleframes_C2.py → da_long/frames/C2_<n>.jpg + da_long/planche_C2.jpg"""
import os, subprocess
from playwright.sync_api import sync_playwright
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..')); E = 'file://' + R + '/episodes/28_aaron_swartz'; F = 'file://' + R + '/node_modules/@fontsource'
FONTS = ''.join(f"@font-face{{font-family:{n};font-weight:{w};font-style:{s};src:url({F}/{p}/files/{p}-latin-{w}-{s}.woff2)}}" for n, p, w, s in [
 ('Inter', 'inter', 400, 'normal'), ('Inter', 'inter', 500, 'normal'), ('Inter', 'inter', 600, 'normal'), ('Inter', 'inter', 700, 'normal'),
 ('Serif', 'instrument-serif', 400, 'normal'), ('Serif', 'instrument-serif', 400, 'italic'), ('Hand', 'caveat', 500, 'normal'), ('Hand', 'caveat', 700, 'normal')])
BASE = """*{box-sizing:border-box}body{margin:0;width:1920px;height:1080px;overflow:hidden;position:relative;background:#000;font-family:Inter}
.full{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.vig{position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(0,0,0,0) 45%,rgba(0,0,0,.75))}
.sub{position:absolute;left:0;right:0;bottom:52px;text-align:center;font:500 40px Inter;color:#fff;text-shadow:0 2px 10px #000,0 0 3px #000}
.sup{position:absolute;left:96px;bottom:190px;color:#fff;text-shadow:0 1px 10px #000}.sup b{display:block;font:400 54px Serif;line-height:1}.sup span{display:block;margin-top:8px;font:400 25px Inter;opacity:.88}
.over{font:500 24px Inter;letter-spacing:10px;text-transform:uppercase}
.pola{position:absolute;background:#f4f1ea;padding:26px 26px 0;box-shadow:0 30px 70px rgba(0,0,0,.7),0 2px 4px rgba(0,0,0,.4)}
.pola img{display:block;object-fit:cover;filter:saturate(.75) contrast(1.05) sepia(.12)}
.pola .hand{font:500 46px Hand;color:#1f2a44;line-height:1.05;padding:18px 6px 30px}.pola .hand small{display:block;font-size:34px;color:#4a556e}
.grain{position:absolute;inset:0;pointer-events:none;opacity:.10;background:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3'/></filter><rect width='300' height='300' filter='url(%23n)'/></svg>")}"""
A1 = E + '/frames/A1/0150.jpg'; V5 = E + '/frames/V5/0040.jpg'; FAM = E + '/frames/FAM/0330.jpg'; TEEN = E + '/frames/TEEN/0200.jpg'; IMG = lambda f: E + '/img/' + f
DOJ = ("<div style='font:600 22px Inter;letter-spacing:2px;color:#555'>UNITED STATES ATTORNEY’S OFFICE · DISTRICT OF MASSACHUSETTS</div>"
       "<div style='font:400 20px Inter;color:#777;margin:6px 0 26px'>FOR IMMEDIATE RELEASE · Tuesday, July 19, 2011</div>"
       "<div style='font:700 40px Inter;color:#111;line-height:1.2;margin-bottom:26px'>Alleged Hacker Charged with Stealing Over Four Million Documents from MIT Network</div>"
       "<div style='font:400 27px Inter;color:#333;line-height:1.55'>BOSTON — … “<span style='background:#e8231f;color:#fff;padding:0 6px'>Stealing is stealing whether you use a computer command or a crowbar, and whether you take documents, data or dollars.</span>” said United States Attorney Carmen M. Ortiz…</div>")
FR = [
 # 1. titre en serif
 f"""<img class=full src='{A1}' style='filter:grayscale(1) contrast(1.15) brightness(.5)'><div class=vig></div>
 <div style='position:absolute;left:0;right:0;top:360px;text-align:center;color:#fff'><div class=over style='opacity:.8'>Le prix à payer · 01</div>
 <div style='font:400 168px Serif;letter-spacing:-2px;margin-top:10px;line-height:1'>Pire qu’un <i>complot.</i></div><div style='font:400 30px Inter;opacity:.7;margin-top:30px'>L’affaire Aaron Swartz · 2011 – 2013</div></div>
 <div style='position:absolute;right:50px;top:40px;font:400 19px Inter;color:rgba(255,255,255,.7)'>Archive · 21 mai 2012 · domaine public</div><div class=grain></div>""",
 # 2. polaroids annotés à la main
 f"""<img class=full src='{FAM}' style='filter:blur(18px) brightness(.35) saturate(.6);transform:scale(1.1)'>
 <div class=pola style='left:1030px;top:170px;transform:rotate(5deg)'><img src='{TEEN}' style='width:520px;height:440px'><div class=hand>en conférence<small>vers 2001</small></div></div>
 <div class=pola style='left:400px;top:110px;transform:rotate(-4deg)'><img src='{IMG("Lawrence_Lessig_and_Aaron_Swartz.jpg")}' style='width:600px;height:520px;object-position:50% 30%'><div class=hand>Aaron, 14 ans — avec Larry Lessig<small>Creative Commons · 2001</small></div></div>
 <div class=sub>À quinze ans, un professeur de droit de Harvard lui confie le code de Creative Commons.</div><div class=grain></div>""",
 # 3. photomaton
 f"""<div style='position:absolute;inset:0;background:radial-gradient(900px 700px at 40% 50%,#2a2622,#0b0a09)'></div>
 <div style='position:absolute;left:300px;top:40px;width:330px;background:#f4f1ea;padding:20px 20px 10px;transform:rotate(-3deg);box-shadow:0 30px 70px rgba(0,0,0,.7)'>
 {''.join(f"<img src='{s}' style='display:block;width:290px;height:225px;object-fit:cover;object-position:{p};margin-bottom:10px;filter:grayscale(1) contrast(1.15)'>" for s, p in [(FAM, '50% 50%'), (IMG('Lawrence_Lessig_and_Aaron_Swartz.jpg'), '30% 25%'), (IMG('Aaron_Swartz_profile.jpg'), '50% 30%'), (IMG('Aaron_Swartz_at_Boston_Wikipedia_Meetup_2009-08-18.jpg'), '45% 25%')])}</div>
 <div style='position:absolute;left:720px;top:150px;font:500 58px Hand;color:#e9e3d6;line-height:2.55;transform:rotate(-2deg)'>Highland Park, enfant<br>2001 — 14 ans, déjà avec les adultes<br>2008 — le manifeste, le FBI<br>2009 — <span style='color:#ff6b5e'>il lui reste trois ans et demi</span></div>
 <div class=sub>Aaron Swartz, 1986 – 2013.</div><div class=grain></div>""",
 # 4. témoin, synthé en serif
 f"""<img class=full src='{V5}' style='object-position:78% 50%;filter:contrast(1.05) saturate(.85)'><div class=vig></div>
 <div class=sup><b>Flore Vasseur</b><span>Écrivaine, autrice de « Ce qu’il reste de nos rêves »</span></div>
 <div class=sub>J’étais complètement persuadée qu’on l’avait poussé au suicide.</div><div class=grain></div>""",
 # 5. document + note manuscrite en marge
 f"""<div style='position:absolute;inset:0;background:#e9e7e1'></div><div style='position:absolute;left:200px;top:150px;width:1220px;padding:40px'>{DOJ}</div>
 <div style='position:absolute;left:1450px;top:330px;font:700 54px Hand;color:#c4261d;transform:rotate(-6deg);line-height:1.1'>« Voler,<br>c’est voler. »<div style='font:500 36px Hand;margin-top:14px'>— la procureure,<br>19 juillet 2011</div></div>
 <svg style='position:absolute;left:1240px;top:420px' width='220' height='120'><path d='M210 20 C150 40 120 80 30 95' stroke='#c4261d' stroke-width='5' fill='none' stroke-linecap='round'/><path d='M30 95 l22 -18 M30 95 l26 6' stroke='#c4261d' stroke-width='5' fill='none' stroke-linecap='round'/></svg>
 <div class=vig style='background:radial-gradient(ellipse at center,rgba(0,0,0,0) 55%,rgba(0,0,0,.35))'></div>
 <div class=sub>La procureure fédérale publie un communiqué.</div><div class=grain></div>""",
 # 6. chiffre-clé en serif
 f"""<div style='position:absolute;inset:0;background:#050505'></div>
 <div style='position:absolute;left:220px;top:250px;color:#fff'><div style='font:400 300px Serif;line-height:.9'>35 <i>ans</i></div><div style='font:400 34px Inter;opacity:.8;margin-top:26px'>de prison encourus par Aaron Swartz</div></div>
 <div style='position:absolute;left:1180px;top:330px;color:#fff;opacity:.55'><div style='font:400 170px Serif;line-height:.9'>30 <i>mois</i></div><div style='font:400 28px Inter;margin-top:22px;line-height:1.4'>le seul grand banquier de Wall Street<br>en prison après la crise de 2008</div></div>
 <div style='position:absolute;left:1120px;top:300px;width:1px;height:420px;background:rgba(255,255,255,.25)'></div>
 <div style='position:absolute;right:60px;bottom:150px;font:400 19px Inter;color:rgba(255,255,255,.5)'>Sources : acte d’accusation (2012) · ProPublica (2014)</div><div class=grain></div>""",
 # 7. intertitre de chapitre en serif
 f"""<div style='position:absolute;inset:0;background:#000'></div><div style='position:absolute;left:0;right:0;top:400px;text-align:center;color:#fff'>
 <div class=over style='color:#e8231f'>Chapitre 4</div><div style='font:400 180px Serif;letter-spacing:-2px;line-height:1;margin-top:14px'>Le <i>placard</i></div>
 <div style='font:400 30px Inter;opacity:.7;margin-top:30px'>MIT, Cambridge · janvier 2011</div></div><div class=grain></div>""",
]
OUT = os.path.join(os.path.dirname(__file__), 'frames'); os.makedirs(OUT, exist_ok=True)
with sync_playwright() as pw:
    b = pw.chromium.launch(executable_path='/opt/pw-browsers/chromium', args=['--allow-file-access-from-files', '--no-sandbox'])
    pg = b.new_page(viewport={'width': 1920, 'height': 1080})
    for i, body in enumerate(FR, 1):
        hp = os.path.join(OUT, '_tmp.html'); open(hp, 'w').write(f"<html><head><meta charset=utf-8><style>{FONTS}{BASE}</style></head><body>{body}</body></html>")
        pg.goto('file://' + hp); pg.wait_for_load_state('networkidle'); pg.evaluate('document.fonts.ready'); pg.wait_for_timeout(500)
        pg.screenshot(path=f'{OUT}/C2_{i}.jpg', type='jpeg', quality=88)
    os.remove(hp); b.close()
D = os.path.dirname(__file__)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'{OUT}/C2_%d.jpg', '-i', f'{OUT}/C_plein_cadre_1.jpg', '-filter_complex',
                '[0]scale=960:-2,tile=2x4:padding=12:color=white:nb_frames=7[a];[a]null', '-frames:v', '1', os.path.join(D, 'planche_C2.jpg')], check=True)
print('ok')
