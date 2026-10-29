# Coupe une vidéo « tableau » en deux parties, sans rien plaquer par-dessus : tout se passe dans le moteur.
#  - Partie 1 : la vidéo jusqu'à la phrase de coupe, puis la caméra vole vers une photo punaisée au mur
#    où « PARTIE 2 » s'écrit au feutre rouge, puis le générique.
#  - Partie 2 : s'ouvre sur cette même photo (couverture) avec la phrase d'accroche d'origine,
#    puis la caméra repart vers la suite. Les temps de la partie 2 sont ceux d'origine décalés.
# Usage (depuis la racine) : venv/bin/python tools/decoupe_parties.py episodes/<projet> '<config json>'
#   config : {"cut": index de la 1re phrase de la partie 2 dans SEGS, "hook": fin de l'accroche reprise (s),
#             "photo": "img:<clé>" ou "clip:<clé>:<image>", "credit": "...", "titre": "LE PLAN.",
#             "p1": "episodes/xx_p1", "p2": "episodes/xx_p2"}
# Ensuite : tools/build.sh <p1|p2> sortie.mp4 music/hitman.mp3 "$(cat <p>/sections.txt)"
import os, sys, json, re, subprocess
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
P = os.path.abspath(sys.argv[1]); CFG = json.loads(sys.argv[2])
TAIL = 2.6      # secondes de photo après la dernière phrase de la partie 1 (avant le générique)
GAP = 1.0       # vol de la caméra entre la photo et la suite, au début de la partie 2

src = open(f'{P}/segs.js').read()
def g(k):
    m = re.search(r'^const ' + k + r'=(.*?);\s*$', src, re.M)
    return json.loads(m.group(1)) if m else None
SEGS, MARK, ID = g('SEGS'), g('MARK') or {}, g('ID')
CUT = CFG['cut']; T1 = SEGS[CUT - 1]['t1']; T2 = SEGS[CUT]['t0']
P2S = round(CFG['hook'] + .3 + GAP, 2)        # la partie 2 reprend la narration ici
D = round(P2S - T2, 3)

def rep(s, a, b, regex=False):
    n = len(re.findall(a, s)) if regex else s.count(a)
    assert n == 1, (a[:90], n)
    return re.sub(a, lambda m: b, s) if regex else s.replace(a, b)

def write_segs(path, segs, mark):
    out = 'const SEGS=' + json.dumps(segs, ensure_ascii=False) + ';\nconst MARK=' + json.dumps(mark) + ';\n'
    if ID is not None: out += 'const ID=' + json.dumps(ID) + ';\n'
    open(path, 'w').write(out)

def project(dst, segs, mark, board, sections):
    os.makedirs(dst + '/audio', exist_ok=True)
    for f in os.listdir(P):
        if f in ('index.html', 'board.js', 'segs.js', 'audio', 'prev', 'events.json', 'node_modules') or f.endswith(('.py', '.txt', '.md')): continue
        if not os.path.lexists(f'{dst}/{f}'): os.symlink(os.path.relpath(f'{P}/{f}', dst), f'{dst}/{f}')
    if not os.path.lexists(f'{dst}/node_modules'): os.symlink(f'{R}/node_modules', f'{dst}/node_modules')
    html = rep(open(f'{P}/index.html').read(), 'VEND=SEGS[SEGS.length-1].t1+.35,', 'VEND=MARK.vend!==undefined?MARK.vend:SEGS[SEGS.length-1].t1+.35,')
    open(f'{dst}/index.html', 'w').write(html)
    write_segs(f'{dst}/segs.js', segs, mark); open(f'{dst}/board.js', 'w').write(board)
    open(f'{dst}/sections.txt', 'w').write(sections)

# ---------- la photo « PARTIE 2 » (commune aux deux parties)
kind, *ph = CFG['photo'].split(':')
PHOTO = f"IM['{ph[0]}']" if kind == 'img' else f"((window.CLIPS&&CLIPS['{ph[0]}'])||[])[{int(ph[1])}]"
DRAW_P2 = r"""function drawP2(c,w,h,t){
  ctx.shadowColor='rgba(0,0,0,.6)';ctx.shadowBlur=38;ctx.shadowOffsetY=20;ctx.fillStyle='#e9e7de';ctx.fillRect(-w/2,-h/2,w,h);ctx.shadowColor='transparent';
  const g=ctx.createLinearGradient(-w/2,-h/2,w/2,h/2);g.addColorStop(0,'rgba(255,255,255,.12)');g.addColorStop(1,'rgba(60,55,40,.16)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,h);
  const im=PHOTO_IM,pw=w-70,ph=Math.round(pw*.56),py=-h/2+45;
  ctx.fillStyle='#111';ctx.fillRect(-pw/2,py,pw,ph);
  if(im){ctx.save();ctx.beginPath();ctx.rect(-pw/2,py,pw,ph);ctx.clip();const s=Math.max(pw/im.width,ph/im.height)*(1.03+Math.max(0,t-c.t0)*.008);ctx.filter='grayscale(1) contrast(1.18) brightness(.92)';
    ctx.drawImage(im,-im.width*s/2,py+ph/2-im.height*s/2,im.width*s,im.height*s);ctx.filter='none';ctx.restore();}
  txt(PHOTO_CREDIT,pw/2-14,py+ph-16,'700 20px Mono','rgba(236,238,230,.8)','right',1);
  const y0=py+ph;
  txt(PHOTO_TITRE,0,y0+92,'700 40px Mono','#1b1c1a','center',8);
  const p=c.wt===undefined?1:eo(lin(t,c.wt,c.wt+.55));
  if(p>0){ctx.save();ctx.translate(0,y0+318);ctx.rotate(-.045);ctx.font='230px Anton';ctx.letterSpacing='6px';const tw=ctx.measureText('PARTIE 2').width;
    ctx.beginPath();ctx.rect(-tw/2-20,-240,(tw+40)*p,300);ctx.clip();
    ctx.globalAlpha=.94;txt('PARTIE 2',0,0,'230px Anton','#c9302c','center',6);
    ctx.fillStyle='#c9302c';ctx.globalAlpha=.85;ctx.beginPath();ctx.moveTo(-tw/2,34);ctx.quadraticCurveTo(0,52,tw/2+10,28);ctx.lineTo(tw/2+10,40);ctx.quadraticCurveTo(0,64,-tw/2,46);ctx.fill();ctx.restore();}
  if(c.note&&t>=c.wt+.7)txt(c.note,0,y0+410,'700 34px Mono','#1b1c1a','center',4,lin(t,c.wt+.7,c.wt+1));
  tape(w/2-60,-h/2+12,170,.7);
}
""".replace('PHOTO_IM', PHOTO).replace('PHOTO_CREDIT', json.dumps(CFG['credit'], ensure_ascii=False)).replace('PHOTO_TITRE', json.dumps(CFG['titre'], ensure_ascii=False))

B0 = open(f'{P}/board.js').read()
def common(B):
    B = rep(B, 'function drawCard(c,t){', DRAW_P2 + 'function drawCard(c,t){')
    B = re.sub(r"\n  if\(c\.k==='(cover|hook)'\)", lambda m: "\n  if(c.k==='p2'){drawP2(c,w,h,t);}\n  else if(c.k==='" + m.group(1) + "')", B, count=1)
    assert "drawP2(c,w,h,t);}" in B
    B = rep(B, '  laminate(w,h);\n', "  if(c.k!=='p2')laminate(w,h);\n")
    B = rep(B, 'C.forEach(c=>drawCard(c,t));', 'C.forEach(c=>{if(!c.off)drawCard(c,t);});')
    B = rep(B, ".filter(i=>C[i].k!=='outro')", ".filter(i=>C[i].k!=='outro'&&!C[i].off)")
    B = rep(B, "C.forEach((c,i)=>{if(i>0)ev(c.t0-.05,'click');});", "C.forEach((c,i)=>{if(i>0&&!c.off)ev(c.t0-.05,'click');});")
    B = rep(B, '\nconst KEYS=[];C.forEach((c,i)=>{', '\nconst KEYS=[];C.forEach((c,i)=>{if(c.off)return;')
    return B

# ---------- PARTIE 1
B = common(B0)
VEND1 = round(T1 + .35 + TAIL, 2)
B = rep(B, '\n// placement en serpentin', f"\nconst cP2=add({{k:'p2',w:900,h:1060,rot:-2,t0:{T1+.3:.2f},wt:{T1+.95:.2f},note:'LA SUITE →'}});\nC.forEach(c=>{{c.off=c.k!=='p2'&&c.t0>={T2-.05:.2f};}});\n// placement en serpentin")
# la photo prend la place de la première carte de la partie 2 (absente du mur dans la partie 1)
B = rep(B, '\nfunction fitZoom(', "\n{const nx=C.findIndex(c=>c.off&&c.k!=='outro');const q=nx>=0?C[nx]:C[cP2-1];C[cP2].x=q.x;C[cP2].y=q.y;}\nfunction fitZoom(")
B = rep(B, '\nKEYS.sort((a,b)=>a.t-b.t);', f"\nKEYS.splice(0,KEYS.length,...KEYS.filter(k=>k.t<={T1+.31:.2f}));\nKEYS.sort((a,b)=>a.t-b.t);")
B = rep(B, 'function outroCredits(t){', 'function outroCredits(t){return;')
B = rep(B, '\n// ---------- post', f"\nEV.splice(0,EV.length,...EV.filter(e=>e[0]<{T1+.25:.2f}));REV.splice(0,REV.length,...REV.filter(e=>e[0]<{T1+.25:.2f}));\nev(C[cP2].t0-.5,'whoosh');ev(C[cP2].wt,'thud');ev(C[cP2].wt+.5,'type');ev(VEND+.35,'boom');\n// ---------- post")
m1 = dict(MARK, vend=VEND1)
project(os.path.join(R, CFG['p1']), SEGS, m1, B, f'0:{VEND1:.2f}:0')

# ---------- PARTIE 2 : tous les temps d'origine décalés de D ; la photo remplace la couverture
def shift(v):
    if isinstance(v, (int, float)): return round(v + D, 3)
    if isinstance(v, list): return [shift(x) for x in v]
    return v
s2 = [dict(s, t0=round(s['t0'] + D, 3), t1=round(s['t1'] + D, 3)) for s in SEGS]
m2 = {k: shift(v) for k, v in MARK.items()}; m2['tcov'] = round(P2S - GAP, 2); m2['p2s'] = P2S
B = common(B0)
B = rep(B, r"const cCover=add\(\{k:'(cover|hook)',[^\n]*?\}\);", "const cCover=add({k:'p2',w:900,h:1060,rot:-2,t0:0});", regex=True)
B = rep(B, r"\nconst TCOV=[^;\n]+;", "\nconst TCOV=MARK.tcov;", regex=True)
# la carte encore à l'écran au moment de la coupe reste sur le mur (ses dernières lignes sont dans la partie 2)
B = rep(B, '\n// placement en serpentin', "\nC.forEach((c,i)=>{c.off=i!==cCover&&c.k!=='outro'&&c.t0<TCOV;});{let a=-1;C.forEach((c,i)=>{if(c.off&&(a<0||c.t0>C[a].t0))a=i;});if(a>=0&&!C.some(c=>Math.abs(c.t0-MARK.p2s)<.4))C[a].off=false;}\n// placement en serpentin")
# la photo prend la place de la dernière carte de la partie 1 (absente du mur dans la partie 2)
B = rep(B, '\nfunction fitZoom(', "\n{let pv=-1;C.forEach((c,i)=>{if(c.off)pv=i;});if(pv>=0){C[cCover].x=C[pv].x;C[cCover].y=C[pv].y;}}\nfunction fitZoom(")
B = rep(B, 'if(i===cCover)KEYS.push({', 'if(i===cCover)KEYS.push({t:0,x:c.x,y:c.y+40,z:1,rot:-c.rot*Math.PI/180});else if(0)KEYS.push({')
B = rep(B, '\nKEYS.sort((a,b)=>a.t-b.t);', "\nKEYS.forEach((k,j)=>{if(j>0&&k.t<TCOV)k.t=MARK.p2s-.05;});\nKEYS.sort((a,b)=>a.t-b.t);")
B = rep(B, '\n// ---------- post', "\nEV.splice(0,EV.length,...EV.filter(e=>e[0]>=TCOV-.2));REV.splice(0,REV.length,...REV.filter(e=>e[0]>=TCOV-.2));\nev(.05,'thud');ev(TCOV-.1,'whoosh');CHUNKS.splice(0,CHUNKS.length,...CHUNKS.filter(c=>c.t>=MARK.p2s-.15));\n// ---------- post")
VEND2 = round(SEGS[-1]['t1'] + D + .35, 2)
project(os.path.join(R, CFG['p2']), s2, m2, B, f'0:{VEND2:.2f}:0')

# ---------- voix
V = f'{P}/audio/vo.wav' if os.path.exists(f'{P}/audio/vo.wav') else f'{P}/audio/vo.m4a'
ff = lambda *a: subprocess.run(['ffmpeg', '-v', 'error', '-y', *a], check=True)
ff('-i', V, '-t', f'{T1+.35:.3f}', '-af', f'afade=t=out:st={T1+.2:.3f}:d=0.15', '-ar', '44100', '-ac', '1', os.path.join(R, CFG['p1'], 'audio/vo.wav'))
lead = T2 - .3; H = CFG['hook']
ff('-i', V, '-filter_complex',
   f"[0]asplit[a][b];[a]atrim=0:{H:.3f},afade=t=out:st={H-.12:.3f}:d=0.12,apad=whole_dur={lead+D:.3f}[h];"
   f"[b]atrim={lead:.3f},asetpts=PTS-STARTPTS[r];[h][r]concat=n=2:v=0:a=1", '-ar', '44100', '-ac', '1', os.path.join(R, CFG['p2'], 'audio/vo.wav'))
print(f"partie 1 : coupe après « {SEGS[CUT-1]['txt']} » ({T1:.2f} s), fin {VEND1} s")
print(f"partie 2 : reprend « {SEGS[CUT]['txt']} » à {P2S} s, fin de voix {VEND2} s")
