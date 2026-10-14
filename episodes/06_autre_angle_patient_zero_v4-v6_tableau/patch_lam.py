p='board.js';s=open(p).read()
def rep(a,b):
    global s
    assert a in s,a[:70];s=s.replace(a,b,1)
rep("g.fillStyle='#7d847c';","g.fillStyle='#3a3f3b';")
rep("ctx.fillStyle=`rgba(235,232,220,${s.a})`;","ctx.fillStyle=`rgba(200,205,195,${s.a*.5})`;")
rep("ctx.fillStyle='#3c403b';ctx.fillRect(0,0,W,H);","ctx.fillStyle='#262a27';ctx.fillRect(0,0,W,H);")
rep("""function framePaper(w,h,col=PAPER){ctx.shadowColor='rgba(0,0,0,.45)';ctx.shadowBlur=30;ctx.shadowOffsetY=16;ctx.fillStyle=col;ctx.fillRect(-w/2,-h/2,w,h);ctx.shadowColor='transparent';
  const g=ctx.createLinearGradient(-w/2,-h/2,w/2,h/2);g.addColorStop(0,'rgba(255,255,255,.08)');g.addColorStop(1,'rgba(0,0,0,.10)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,h);}""",
"""function framePaper(w,h,col){ctx.shadowColor='rgba(0,0,0,.55)';ctx.shadowBlur=34;ctx.shadowOffsetY=18;ctx.fillStyle=col||'rgba(58,64,60,.62)';ctx.fillRect(-w/2,-h/2,w,h);ctx.shadowColor='transparent';
  const g=ctx.createLinearGradient(-w/2,-h/2,w/2,h/2);g.addColorStop(0,'rgba(255,255,255,.10)');g.addColorStop(1,'rgba(0,0,0,.18)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,h);}
function laminate(w,h){
  ctx.save();ctx.beginPath();ctx.rect(-w/2,-h/2,w,h);ctx.clip();const g=ctx.createLinearGradient(-w/2,-h/2,w/2,h/2);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.38,'rgba(255,255,255,0)');g.addColorStop(.46,'rgba(255,255,255,.16)');g.addColorStop(.52,'rgba(255,255,255,.05)');g.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,h);ctx.restore();
  ctx.strokeStyle='rgba(255,255,255,.85)';ctx.lineWidth=3;ctx.strokeRect(-w/2,-h/2,w,h);ctx.strokeStyle='rgba(255,255,255,.18)';ctx.lineWidth=2;ctx.strokeRect(-w/2+10,-h/2+10,w-20,h-20);}""")
rep("const cCal=add({k:'paper',lines:[['OCTOBRE 2026','700 34px Mono','#555'],['SAMEDI 17','130px Anton',INKD],['1er jour des vacances','400 34px Mono','#333']],","const cCal=add({k:'paper',lines:[['OCTOBRE 2026','700 34px Mono','rgba(236,238,230,.7)'],['SAMEDI 17','130px Anton',INK],['1er jour des vacances','400 34px Mono','rgba(236,238,230,.75)']],")
rep("framePaper(w,h,'rgba(232,226,190,.94)');txt(c.text,0,-30,(c.text.length>20?'60px':'72px')+' Anton',INKD,","framePaper(w,h,'rgba(70,72,58,.6)');txt(c.text,0,-30,(c.text.length>20?'60px':'72px')+' Anton',INK,")
rep("framePaper(w,h,'#ddd8c6');txt('FICHIER DE POLICE',-w/2+40,-h/2+90,'76px Anton',INKD,","framePaper(w,h);txt('FICHIER DE POLICE',-w/2+40,-h/2+90,'76px Anton',INK,")
rep("ctx.fillStyle='rgba(0,0,0,.07)';ctx.fillRect(-w/2+30,y-55,w-60,76);txt(a,-w/2+50,y,'700 34px Mono','#555','left',3);txt(b,-w/2+260,y,'700 38px Mono',INKD,'left',1);","ctx.fillStyle='rgba(128,134,126,.28)';ctx.fillRect(-w/2+30,y-55,w-60,76);txt(a,-w/2+50,y,'700 34px Mono','rgba(236,238,230,.6)','left',3);txt(b,-w/2+260,y,'700 38px Mono',INK,'left',1);")
rep("ctx.strokeStyle=INKD;ctx.lineWidth=20;","ctx.strokeStyle=INK;ctx.lineWidth=20;")
rep("ctx.fillStyle=INKD;ctx.beginPath();ctx.arc(0,0,40,0,6.283);ctx.fill();ctx.restore();","ctx.fillStyle=INK;ctx.beginPath();ctx.arc(0,0,40,0,6.283);ctx.fill();ctx.restore();")
rep("ctx.fillStyle='rgba(232,226,190,.97)';ctx.fillRect(-90,-45,180,90);txt(s,0,22,'64px Anton',INKD,'center',2);","ctx.fillStyle='rgba(128,134,126,.4)';ctx.fillRect(-90,-45,180,90);ctx.strokeStyle='rgba(255,255,255,.6)';ctx.lineWidth=2;ctx.strokeRect(-90,-45,180,90);txt(s,0,22,'64px Anton',INK,'center',2,1,10);")
rep("person(x,y+60,.66,hot?PINK:'rgba(40,40,38,.35)')","person(x,y+60,.66,hot?PINK:'rgba(236,238,230,.3)')")
rep("framePaper(w,h,'#eeebe0');const fr=","framePaper(w,h,'rgba(230,232,224,.88)');const fr=")
rep("  // punaise + scotch\n","  laminate(w,h);\n  // punaise + scotch\n")
rep("if(c.k==='cover'){const im=IM.cover;framePaper(w+40,h+40,'#e9e6da');if(im)ctx.drawImage(im,-w/2,-h/2,w,h);}",
"""if(c.k==='cover'){const im=IM.cover;framePaper(w+40,h+40,'rgba(230,232,224,.9)');if(im)ctx.drawImage(im,-w/2,-h/2,w,h);
    const g=ctx.createLinearGradient(0,-h/2,0,h/2);g.addColorStop(0,'rgba(0,0,0,.55)');g.addColorStop(.42,'rgba(0,0,0,.05)');g.addColorStop(1,'rgba(0,0,0,.5)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,h);
    txt('L’AUTRE ANGLE',0,-h/2+420,'700 34px Mono',INK,'center',12);txt('SAMEDI 17.',0,-h/2+640,'186px Anton',INK,'center',4,1,30);}
  else if(c.k==='outro'){framePaper(w,h);txt('L’AUTRE',0,-180,'150px Anton',INK,'center',4,1,24);txt('ANGLE',0,10,'200px Anton',PINK,'center',4,1,24);txt('LA FERME',0,120,'700 34px Mono','rgba(236,238,230,.6)','center',12);
    txt('ABONNE-TOI',0,250,'70px Anton',INK,'center',4,1,16);}""")
rep("const a=cl((t-c.t0+.35)/.35);if(a<=0)return;\n  const drop=(1-eo(a))*-60;","const a=1;const drop=0;")
rep("// ---------- trajectoire caméra","const cOutro=add({k:'outro',x:3950,y:6500,w:900,h:900,rot:-1.5,t0:VEND+.5});\n// ---------- trajectoire caméra")
rep("KEYS.push(WIDE(T[32],[...C.keys()].filter(i=>i!==cEnd)));","KEYS.push(WIDE(T[32],[...C.keys()].filter(i=>i!==cEnd&&i!==cOutro)));")
rep("  if(t<TCOV+.3){const a=1-lin(t,TCOV,TCOV+.3);","  if(false){const a=0;")
rep("  if(t>=VEND+.3){const a=lin(t,VEND+.3,VEND+.8);","  if(false){const a=0;")
rep("function satMini(","function outroCredits(t){const c=C[cOutro];ctx.save();ctx.translate(c.x,c.y+c.h/2+120);[['Sources : StreetPress · franceinfo · France 24 · ICI',0],['Extraits : @v2.95 · @17octobre2026 · @dhbai.r · @unmomentactu',46],['Musique : « Hitman », Kevin MacLeod · CC BY 4.0',92]].forEach(([s,y])=>txt(s,0,y,'400 26px Mono','rgba(236,238,230,.75)','center'));ctx.restore();}\nfunction satMini(")
rep("C.forEach(c=>drawCard(c,t));ctx.restore();","C.forEach(c=>drawCard(c,t));outroCredits(t);ctx.restore();")
rep("ctx.fillStyle='rgba(12,12,12,.78)';ctx.fillRect(-w/2-26,-74,w+52,96);ctx.fillStyle='#f4f1e6';ctx.fillText(c.txt,0,0);","ctx.fillStyle='rgba(90,96,90,.45)';ctx.fillRect(-w/2-26,-74,w+52,96);ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=2;ctx.strokeRect(-w/2-26,-74,w+52,96);ctx.shadowColor='rgba(255,255,255,.5)';ctx.shadowBlur=14;ctx.fillStyle='#f4f1e6';ctx.fillText(c.txt,0,0);")
rep("ctx.fillStyle='rgba(205,215,200,1)';","ctx.fillStyle='rgba(220,228,215,1)';")
# encre claire partout ailleurs
s=s.replace(",INKD,'center',2);",",INK,'center',2,1,14);").replace("c.red&&i==0?PINK:INKD","c.red&&i==0?PINK:INK")
s=s.replace("'#555','center'","'rgba(236,238,230,.7)','center'").replace("'#555','right'","'rgba(236,238,230,.7)','right'").replace("'#666','center'","'rgba(236,238,230,.6)','center'").replace("'#666','right'","'rgba(236,238,230,.6)','right'").replace("'#333','center'","'rgba(236,238,230,.75)','center'")
# polaroïd : légende foncée sur bord clair
s=s.replace("txt(c.handle,-w/2+30,h/2-85,'700 40px Mono',INKD,'left',1);txt(c.title||'TikTok',w/2-30,h/2-85,'700 30px Mono','rgba(236,238,230,.7)','right',2);","txt(c.handle,-w/2+30,h/2-85,'700 40px Mono','#1b1c1a','left',1);txt(c.title||'TikTok',w/2-30,h/2-85,'700 30px Mono','#444','right',2);")
open(p,'w').write(s);print('ok',s.count('INKD'))
