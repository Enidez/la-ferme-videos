# Badir v6 coupé en deux parties, dans le moteur du tableau (pas de bandeau plaqué après coup).
# Fin de la partie 1 et début de la partie 2 : une photo punaisée au mur, « PARTIE 2 » écrit dessus au marqueur.
# Usage (depuis la racine du dépôt) : venv/bin/python episodes/12b_freres_badir_v6/decoupe.py
#   -> episodes/12c_freres_badir_p1/ et episodes/12d_freres_badir_p2/, puis tools/build.sh sur chacun.
import os, json, subprocess, re
SRC = os.path.dirname(os.path.abspath(__file__)); EP = os.path.dirname(SRC)
src = open(f'{SRC}/segs.js').read().split('\n')
g = lambda k: json.loads([l for l in src if l.startswith('const ' + k + '=')][0].split('=', 1)[1].rstrip(';'))
SEGS, MARK, ID = g('SEGS'), g('MARK'), g('ID')
CUT = ID['n36']                      # partie 2 = à partir de « La radio de l'armée israélienne. »
TAIL1 = 2.6                          # la photo « PARTIE 2 » reste ~4 s à l'écran avant le générique
P2_HOOK_END = 4.95                   # partie 2 : on garde la phrase d'accroche (k1, k2)…
P2_START = 6.0                       # … puis la narration reprend à 6 s

def ffmpeg(*a): subprocess.run(['ffmpeg', '-v', 'error', '-y', *a], check=True)

def project(name, segs, mark, board):
    P = f'{EP}/{name}'; os.makedirs(P + '/audio', exist_ok=True)
    for d in ('img', 'clips', 'helpers.js'):
        if not os.path.lexists(f'{P}/{d}'): os.symlink(f'../12b_freres_badir_v6/{d}', f'{P}/{d}')
    html = open(f'{SRC}/index.html').read().replace('VEND=SEGS[SEGS.length-1].t1+.35,', 'VEND=SEGS[SEGS.length-1].t1+.35+(MARK.tail||0),')
    assert '(MARK.tail||0)' in html
    open(f'{P}/index.html', 'w').write(html)
    ids = {s['id']: i for i, s in enumerate(segs)}
    open(f'{P}/segs.js', 'w').write('const SEGS=' + json.dumps(segs, ensure_ascii=False) + ';\nconst MARK=' + json.dumps(mark) + ';\nconst ID=' + json.dumps(ids) + ';\n')
    open(f'{P}/board.js', 'w').write(board)
    return P

B = open(f'{SRC}/board.js').read()
def rep(s, a, b):
    assert a in s, a[:80]
    return s.replace(a, b)

# --- commun : les cartes dont la phrase n'est pas dans cette partie sont retirées du mur
B = rep(B, "const N=k=>SEGS[ID['n'+k]].t0, NE=k=>SEGS[ID['n'+k]].t1;",
        "const N=k=>ID['n'+k]===undefined?1e9:SEGS[ID['n'+k]].t0, NE=k=>ID['n'+k]===undefined?1e9:SEGS[ID['n'+k]].t1;")
B = rep(B, "const KEYS=[];C.forEach((c,i)=>{if(i===cCover)",
        "C.forEach(c=>{c.off=c.t0>1e8;});\nconst KEYS=[];C.forEach((c,i)=>{if(c.off)return;if(i===cCover&&c.k==='p2')KEYS.push({t:0,x:c.x,y:c.y+40,z:1,rot:-c.rot*Math.PI/180});else if(i===cCover)")
B = rep(B, "const ORD=[...C.keys()].filter(i=>C[i].k!=='outro')", "const ORD=[...C.keys()].filter(i=>C[i].k!=='outro'&&!C[i].off)")
B = rep(B, "C.forEach(c=>drawCard(c,t));", "C.forEach(c=>{if(!c.off)drawCard(c,t);});")
B = rep(B, "KEYS.forEach(k=>{if(k.t>TCOV+.1)ev(k.t-.5,'whoosh');});", "KEYS.forEach(k=>{if(k.t>TCOV+.1&&k.t<1e8)ev(k.t-.5,'whoosh');});")
B = rep(B, "C.forEach((c,i)=>{if(i>0)ev(c.t0-.05,'click');});", "C.forEach((c,i)=>{if(i>0&&!c.off)ev(c.t0-.05,'click');});")
B = rep(B, "// ---------- post (gris-vert)", "EV.splice(0,EV.length,...EV.filter(e=>e[0]<DUR));\n// ---------- post (gris-vert)")
# la photo « PARTIE 2 » : polaroïd punaisé, photo des trois frères (Channel 10) en noir et blanc, inscription au marqueur
B = rep(B, "  else if(c.k==='call'){drawCall(c,w,h,t);}", r"""  else if(c.k==='p2'){drawP2(c,w,h,t);}
  else if(c.k==='call'){drawCall(c,w,h,t);}""")
B = rep(B, "function drawCard(c,t){", r"""function drawP2(c,w,h,t){
  ctx.shadowColor='rgba(0,0,0,.6)';ctx.shadowBlur=38;ctx.shadowOffsetY=20;ctx.fillStyle='#e9e7de';ctx.fillRect(-w/2,-h/2,w,h);ctx.shadowColor='transparent';
  const g=ctx.createLinearGradient(-w/2,-h/2,w/2,h/2);g.addColorStop(0,'rgba(255,255,255,.12)');g.addColorStop(1,'rgba(60,55,40,.16)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,h);
  const im=IM.trio,pw=w-70,ph=Math.round(pw*532/960),py=-h/2+45;
  ctx.fillStyle='#111';ctx.fillRect(-pw/2,py,pw,ph);
  if(im){ctx.save();ctx.beginPath();ctx.rect(-pw/2,py,pw,ph);ctx.clip();const s=pw/im.width*(1.03+Math.max(0,t-c.t0)*.008);ctx.filter='grayscale(1) contrast(1.18) brightness(.92)';
    ctx.drawImage(im,-im.width*s/2,py+ph/2-im.height*s/2,im.width*s,im.height*s);ctx.filter='none';ctx.restore();}
  txt('IMAGE : CHANNEL 10 (ISRAËL)',pw/2-14,py+ph-16,'700 20px Mono','rgba(236,238,230,.75)','right',1);
  const y0=py+ph;
  txt('LES FRÈRES BADIR',0,y0+92,'700 40px Mono',INKD,'center',8);
  // « PARTIE 2 » écrit au feutre rouge : le trait avance de gauche à droite
  const p=c.wt===undefined?1:eo(lin(t,c.wt,c.wt+.55));
  if(p>0){ctx.save();ctx.translate(0,y0+318);ctx.rotate(-.045);ctx.font='230px Anton';ctx.letterSpacing='6px';const tw=ctx.measureText('PARTIE 2').width;
    ctx.beginPath();ctx.rect(-tw/2-20,-240,(tw+40)*p,300);ctx.clip();
    ctx.globalAlpha=.94;txt('PARTIE 2',0,0,'230px Anton',PINK,'center',6);
    ctx.fillStyle=PINK;ctx.globalAlpha=.85;ctx.beginPath();ctx.moveTo(-tw/2,34);ctx.quadraticCurveTo(0,52,tw/2+10,28);ctx.lineTo(tw/2+10,40);ctx.quadraticCurveTo(0,64,-tw/2,46);ctx.fill();ctx.restore();}
  if(c.note&&t>=c.wt+.7)txt(c.note,0,y0+410,'700 34px Mono',INKD,'center',4,lin(t,c.wt+.7,c.wt+1));
  tape(w/2-60,-h/2+12,170,.7);  // 2e bande adhésive (la 1re et la punaise sont posées pour toutes les cartes)
}
function drawCard(c,t){""")
B = rep(B, "  laminate(w,h);\n  if(c.k!=='matrix')", "  if(c.k!=='p2')laminate(w,h);\n  if(c.k!=='matrix')")

# ---------------- PARTIE 1 : du début à « le coup le plus fou », puis la photo « PARTIE 2 » et le générique
s1 = SEGS[:CUT]
m1 = dict(MARK, tail=TAIL1)
b1 = B
b1 = rep(b1, "const cOutro=add({k:'outro',full:1,w:900,h:900,rot:-1.5,t0:VEND+.5});",
         "const cOutro=add({k:'p2',w:900,h:1060,rot:-2,t0:NE(35)+.3,wt:NE(35)+.95,note:'LA SUITE →'});")
b1 = rep(b1, "KEYS.push(WIDE(N(70)-.05,", "if(0)KEYS.push(WIDE(N(70)-.05,")
# la photo est punaisée à la place qu'occupera la carte de la radio (première carte de la partie 2)
b1 = rep(b1, "  c.x=cc*DX+(r()-.5)*220;c.y=row*DY+(r()-.5)*220;c.rot*=1.9;});}",
         "  c.x=cc*DX+(r()-.5)*220;c.y=row*DY+(r()-.5)*220;c.rot*=1.9;});C[cOutro].x=C[cRadio].x;C[cOutro].y=C[cRadio].y;}")
b1 = rep(b1, "function outroCredits(t){", "function outroCredits(t){return;")
b1 = rep(b1, "ev(VEND+.35,'boom');", "ev(C[cOutro].wt,'thud');ev(C[cOutro].wt+.5,'type');ev(VEND+.35,'boom');")
P1 = project('12c_freres_badir_p1', s1, m1, b1)

# ---------------- PARTIE 2 : la photo « PARTIE 2 » en couverture (phrase d'accroche), puis la suite
D = round(P2_START - SEGS[CUT]['t0'], 3)
s2 = SEGS[:2] + [dict(s, t0=round(s['t0'] + D, 2), t1=round(s['t1'] + D, 2)) for s in SEGS[CUT:]]
m2 = {k: [round(v[0] + D, 2), round(v[1] + D, 2)] for k, v in MARK.items() if k in ('h1', 'h2', 'h3', 'h4', 'h5')}
m2.update(s1=MARK['s1'], s2=MARK['s2'], frz=1e9, av=1e9, tcov=round(P2_START - .9, 2))
b2 = B
b2 = rep(b2, "const cCover=add({k:'hook',w:1080,h:1920,rot:0,t0:0});", "const cCover=add({k:'p2',w:900,h:1060,rot:-2,t0:0});")
# la photo prend la place de la carte « 1998 » (absente de la partie 2), juste avant la radio
b2 = rep(b2, "C.forEach((c,i)=>{if(i===0){c.x=-1300;c.y=0;return;}", "C.forEach((c,i)=>{if(i===0)return;")
b2 = rep(b2, "  c.x=cc*DX+(r()-.5)*220;c.y=row*DY+(r()-.5)*220;c.rot*=1.9;});}",
         "  c.x=cc*DX+(r()-.5)*220;c.y=row*DY+(r()-.5)*220;c.rot*=1.9;});C[cCover].x=C[c1998].x;C[cCover].y=C[c1998].y;}")
b2 = rep(b2, "ev(.05,'thud');ev(HC1-.15,'whoosh');ev(HC1+.1,'thud');ev(HC2-.15,'whoosh');reveal(MARK.frz,1.1);ev(MARK.frz+.22,'thud');reveal(MARK.av,1.3);ev(TCOV-.1,'whoosh');",
         "ev(.05,'thud');ev(TCOV-.1,'whoosh');")
P2 = project('12d_freres_badir_p2', s2, m2, b2)

# --- voix
V = f'{SRC}/audio/vo.m4a'; S = P2_START - SEGS[CUT]['t0']
ffmpeg('-i', V, '-t', str(SEGS[CUT - 1]['t1'] + .35), '-ar', '44100', '-ac', '1', f'{P1}/audio/vo.wav')
lead = SEGS[CUT]['t0'] - .3
ffmpeg('-i', V, '-filter_complex',
       f"[0]asplit[a][b];[a]atrim=0:{P2_HOOK_END},afade=t=out:st={P2_HOOK_END-.15:.2f}:d=0.15,apad=whole_dur={lead+D:.3f}[h];"
       f"[b]atrim={lead:.3f},asetpts=PTS-STARTPTS[r];[h][r]concat=n=2:v=0:a=1", '-ar', '44100', '-ac', '1', f'{P2}/audio/vo.wav')
print('partie 1 :', round(SEGS[CUT - 1]['t1'], 2), 's de voix ; partie 2 : décalage', D, '; radio à', s2[2]['t0'])
