// ================= LE DOSSIER #03 — « LE GEL » =================
const T=Object.fromEntries(SEGS.map((s,i)=>[i,s.t0]));
const TE=Object.fromEntries(SEGS.map((s,i)=>[i,s.t1]));
const ICE='#9fd8ff',ICE2='#d8f0ff',GREEN='#A9C79A';
const TGEL=T[21]; // « Ça s'appelle un gel » : à partir d'ici tout refroidit

// ---------- texture de givre (procédurale, calculée une fois)
const FROST=(()=>{const c=document.createElement('canvas');c.width=c.height=700;const g=c.getContext('2d');const r=rng(77);
  g.lineCap='round';
  function branch(x,y,a,len,w,depth){if(depth>5||len<4)return;const steps=Math.floor(len/6);g.lineWidth=w;g.beginPath();g.moveTo(x,y);
    for(let i=0;i<steps;i++){a+=(r()-.5)*.25;x+=Math.cos(a)*6;y+=Math.sin(a)*6;g.lineTo(x,y);
      if(r()<.12)branch(x,y,a+(r()<.5?1:-1)*(.6+r()*.5),len*.45,w*.7,depth+1);}
    g.stroke();}
  for(let k=0;k<70;k++){g.strokeStyle=`rgba(225,242,255,${.25+r()*.45})`;branch(r()*700,r()*700,r()*6.28,60+r()*160,1+r()*2.2,0);}
  for(let k=0;k<2500;k++){g.fillStyle=`rgba(230,245,255,${r()*.5})`;g.fillRect(r()*700,r()*700,1+r()*2,1+r()*2);}
  return c;})();
function frostOver(w,h,a){if(a<=0)return;ctx.save();ctx.globalAlpha*=cl(a);
  ctx.fillStyle='rgba(170,215,245,.32)';ctx.fillRect(-w/2,-h/2,w,h);
  ctx.globalCompositeOperation='lighter';ctx.drawImage(FROST,-w/2,-h/2,w,h);ctx.globalCompositeOperation='source-over';
  const g=ctx.createRadialGradient(0,0,Math.min(w,h)*.2,0,0,Math.max(w,h)*.7);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(1,'rgba(220,240,255,.55)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,h);ctx.restore();}
// givre qui envahit les bords de l'écran
function frostEdges(a){if(a<=0)return;ctx.save();ctx.globalAlpha=cl(a)*.9;ctx.globalCompositeOperation='lighter';
  const m=ctx.createRadialGradient(540,900,300+(1-a)*500,540,960,1150);
  const tmp=frostEdges.c||(frostEdges.c=(()=>{const c=document.createElement('canvas');c.width=1080;c.height=1920;return c;})());const g=tmp.getContext('2d');
  g.clearRect(0,0,1080,1920);g.drawImage(FROST,0,0,1080,1100);g.drawImage(FROST,0,820,1080,1100);
  g.globalCompositeOperation='destination-in';const mg=g.createRadialGradient(540,900,260+(1-cl(a))*600,540,960,1100);mg.addColorStop(0,'rgba(0,0,0,0)');mg.addColorStop(1,'rgba(0,0,0,1)');g.fillStyle=mg;g.fillRect(0,0,1080,1920);g.globalCompositeOperation='source-over';
  ctx.drawImage(tmp,0,0);ctx.restore();}
const SNOW=[];{const r=rng(5);for(let i=0;i<220;i++)SNOW.push({x:r()*W,y:r()*H,s:1+r()*3.5,v:40+r()*90,ph:r()*6.28,z:r()});}
function snow(t,a){if(a<=0)return;ctx.save();SNOW.forEach((p,i)=>{if(i/SNOW.length>a)return;const y=(p.y+p.v*t)%H,x=(p.x+Math.sin(t*.8+p.ph)*30+W)%W;ctx.fillStyle=`rgba(235,245,255,${.35+.4*p.z})`;ctx.beginPath();ctx.arc(x,y,p.s,0,6.283);ctx.fill();});ctx.restore();}

// ---------- fond froid
function background(t,fa=.12){
  ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle=BG;ctx.fillRect(0,0,W,H);
  const cold=lin(t,T[16],TGEL+2);
  // dégradé de fond sur un calque lointain (bouge avec la caméra)
  ctx.save();layer(700);const g=ctx.createRadialGradient(540,800,50,540,960,1500);
  g.addColorStop(0,`rgba(${40-20*cold},${42+10*cold},${44+40*cold},1)`);g.addColorStop(1,'rgba(6,8,7,1)');ctx.fillStyle=g;ctx.fillRect(-1200,-1500,3480,4920);
  // grille de rangées lointaines (profondeur)
  ctx.strokeStyle=`rgba(${160+60*cold},${200+40*cold},255,.06)`;ctx.lineWidth=2;for(let y=-1500;y<3400;y+=120){ctx.beginPath();ctx.moveTo(-1200,y);ctx.lineTo(2280,y);ctx.stroke();}
  ctx.restore();
  ctx.save();ctx.globalCompositeOperation='lighter';const lx=W*(.2+.6*(.5+.5*Math.sin(t*.19))),ly=H*(.3+.25*Math.sin(t*.11+1));
  const g2=ctx.createRadialGradient(lx,ly,0,lx,ly,700);g2.addColorStop(0,cold>.3?`rgba(120,180,255,${.06+.04*Math.sin(t*1.1)})`:`rgba(255,170,90,${.06+.03*Math.sin(t*1.3)})`);g2.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g2;ctx.fillRect(0,0,W,H);ctx.restore();
}

// ---------- petits dessins
function person(x,y,s,col,kind){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle=col;
  ctx.beginPath();ctx.arc(0,-120,34,0,6.283);ctx.fill();
  ctx.beginPath();ctx.moveTo(-48,-70);ctx.quadraticCurveTo(0,-90,48,-70);ctx.lineTo(56,40);ctx.lineTo(-56,40);ctx.closePath();ctx.fill();
  if(kind=='old'){ctx.strokeStyle=col;ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(64,-10);ctx.lineTo(70,60);ctx.stroke();}
  ctx.restore();}
function tag(x,y,w,h,label,t,t0,t1,o={}){const a=vis(t,t0,t1,.15,.25);if(a<=0)return;const p=eo(lin(t,t0,t0+.35));
  ctx.save();ctx.globalAlpha*=a;ctx.translate(x+(1-p)*(o.from||0),y);ctx.rotate((o.rot||0)*Math.PI/180);
  ctx.fillStyle=o.bg||'rgba(128,134,126,.30)';ctx.fillRect(-w/2,-h/2,w,h);ctx.strokeStyle=o.stroke||'rgba(236,238,230,.55)';ctx.lineWidth=2;ctx.strokeRect(-w/2,-h/2,w,h);
  txt(label,0,h*.17,`700 ${o.size||36}px Mono`,o.col||INK,'center',3,1,8);
  if(o.frost)frostOver(w,h,o.frost);
  if(o.stamp&&o.stamp[1]<=t){const sp=lin(t,o.stamp[1],o.stamp[1]+.15);ctx.save();ctx.globalAlpha*=sp;ctx.translate(w/2-120,0);ctx.rotate(-.12);ctx.scale(1.5-.5*sp,1.5-.5*sp);
    ctx.strokeStyle=ICE;ctx.lineWidth=5;ctx.shadowColor='rgba(150,210,255,.9)';ctx.shadowBlur=14;ctx.strokeRect(-100,-30,200,56);txt(o.stamp[0],0,12,'700 32px Mono',ICE2,'center',4);ctx.restore();}
  ctx.restore();}
function stampIce(t,t0,t1,s,x,y,size=90,rot=-.1){const a=vis(t,t0,t1,.02,.25);if(a<=0)return;const p=lin(t,t0,t0+.16);const sc=1.6-.6*eo(p);
  ctx.save();ctx.globalAlpha*=a*cl(p*3);ctx.translate(x,y);ctx.rotate(rot);ctx.scale(sc,sc);const f=size+'px Anton';const sw=mw(s,f,4)+60;
  ctx.strokeStyle=ICE;ctx.lineWidth=9;ctx.shadowColor='rgba(150,210,255,.8)';ctx.shadowBlur=22;ctx.strokeRect(-sw/2,-size*.78,sw,size*1.15);txt(s,0,size*.18,f,ICE2,'center',4,1,20);ctx.restore();}
function icyText(s,x,y,size,t,t0,t1,fr=0){const a=vis(t,t0,t1,.2,.25);if(a<=0)return;const p=eo(lin(t,t0,t0+.4));
  ctx.save();ctx.translate(x,y);const sc=1.1-.1*p+.012*Math.max(0,t-t0);ctx.scale(sc,sc);ctx.globalAlpha*=a;
  ctx.font=size+'px Anton';ctx.textAlign='center';ctx.letterSpacing=size*.02+'px';ctx.shadowColor='rgba(150,210,255,.85)';ctx.shadowBlur=30;ctx.fillStyle=ICE2;ctx.fillText(s,0,0);
  if(fr>0){ctx.shadowBlur=0;ctx.globalCompositeOperation='source-atop';}ctx.restore();}
function paper(w,h,lines,stamp){ctx.fillStyle='#d9d6cc';ctx.fillRect(-w/2,-h/2,w,h);
  lines.forEach(([s,y,font,col,al])=>txt(s,al=='left'?-w/2+40:0,-h/2+y,font,col||'#1a1a1a',al||'center'));}
function typed(t,t0,t1,s,x,y,font,col='rgba(236,238,230,.85)',dur=.6,ls=4){const n=Math.floor(s.length*lin(t,t0,t0+dur));txt(s.slice(0,n),x,y,font,col,'center',ls,vis(t,t0,t1));}
function stampRed(t,t0,t1,s,x,y,size=96,rot=-.12){const a=vis(t,t0,t1,.02,.25);if(a<=0)return;const p=lin(t,t0,t0+.16);const sc=1.6-.6*eo(p);
  ctx.save();ctx.globalAlpha*=a*cl(p*3);ctx.translate(x,y);ctx.rotate(rot);ctx.scale(sc,sc);const f=size+'px Anton';const sw=mw(s,f,4)+60;ctx.strokeStyle=RED;ctx.lineWidth=10;ctx.shadowColor='rgba(255,40,30,.6)';ctx.shadowBlur=18;
  ctx.strokeRect(-sw/2,-size*.78,sw,size*1.15);txt(s,0,size*.18,f,RED,'center',4);ctx.restore();}
// hémicycle
const SEATS=[];{for(let r=0;r<9;r++){const R=200+r*30;const n=Math.round(Math.PI*R/30);for(let i=0;i<=n;i++){const a=Math.PI-(i/n)*Math.PI;SEATS.push({x:Math.cos(a)*R,y:-Math.sin(a)*R,k:(i/n+r*.13)%1});}}}

// ---------- coupes / plans
CUTS=[0,T[2]-.1,T[6]-.1,T[13]-.1,T[17]-.1,T[21]-.1,T[26]-.1,T[30]-.1,T[34]-.1,T[38]-.1,T[41]-.1,T[43]-.1,VEND+.3,DUR+1];

// ---------- sons
ev(.02,'boom');reveal(T[1]+.9,1.1);
ev(T[2]-.1,'whoosh');ev(T[2],'click');tileSounds('54',T[3],.1);ev(T[3]+.4,'tick');ev(T[4],'type');reveal(T[5],1);
ev(T[6]-.1,'whoosh');[7,8,9,10,11,12].forEach(i=>ev(T[i],'click'));
ev(T[13],'hit');ev(T[14],'tick');ev(T[15],'tick');ev(T[16]+.6,'thud');
[17,18,19,20].forEach(i=>{ev(T[i]+.7,'crack');});
reveal(T[21],1.3);ev(T[21]+.05,'freeze');ev(T[23],'riser');ev(T[25]+.5,'thud');
for(let i=0;i<12;i++)ev(T[26]+i*.05,'type');tileSounds('+2,1 %',T[27]+1.2,.06);reveal(T[29]+.1,1.2);ev(T[29]+.15,'crack');
ev(T[30]-.1,'whoosh');ev(T[30],'click');[0,1,2].forEach(i=>ev(T[31]+i*.85,'thud'));ev(T[32]-.1,'whoosh');ev(T[32],'click');
ev(T[34],'hit');ev(T[35]+.3,'tick');ev(T[35]+.9,'tick');ev(T[37],'crack');ev(T[37]+.05,'freeze');
ev(T[38],'hit');ev(T[39],'hit');ev(T[40]-.1,'whoosh');ev(T[40],'click');ev(T[41],'freeze');reveal(T[42],1.2);
ev(T[43]-.1,'whoosh');reveal(T[44]+1.1,1.1);ev(T[45],'thud');ev(VEND+.35,'boom');

function scene(t){
  // 0. COUVERTURE / ACCROCHE
  if(t<T[2]){const E=T[2]-.1;
    label(t,-1,E,'LE DOSSIER  ·  #03  ·  BUDGET 2027',300);
    txt('PAS DE HAUSSE',540,520,'150px Anton',INK,'center',4,vis(t,-1,E),26);txt('D’IMPÔTS.',540,680,'150px Anton',INK,'center',4,vis(t,-1,E),26);
    txt('ET POURTANT,',540,820,'700 50px Mono',ICE,'center',10,vis(t,-1,E));
    const hot=t>=T[1]+.9;txt('VOUS ALLEZ PERDRE',540,960,'104px Anton',RED,'center',3,vis(t,-1,E),hot?30:18);txt('DE L’ARGENT.',540,1080,'104px Anton',RED,'center',3,vis(t,-1,E),hot?30:18);
    if(hot)underline(t,T[1]+.95,230,850,1110,E);
  }
  // 1. le budget déposé, 54 milliards, « officiellement »
  if(t>=T[2]-.15&&t<T[6]){const E=T[6]-.05;const up=eo(lin(t,T[4]-.1,T[4]+.4));
    card(t,T[2]-.1,E,{x:540,y:640-up*90,w:820,h:440,rot:-1.6,op:1,from:'right',exit:'left',z:200,drift:.5,draw:(w,h)=>paper(w,h,[
      ['RÉPUBLIQUE FRANÇAISE',70,'700 30px Mono','#333'],['PROJET DE LOI',150,'64px Anton','#111'],['DE FINANCES POUR 2027',215,'64px Anton','#111'],['n° 3210 · déposé le 1er octobre 2026',290,'400 30px Mono','#333']])});
    if(t>=T[3]){tiles(t,'54',300,930,{t0:T[3],h:150,t1:E});txt('MILLIARDS',620,905,'72px Anton',INK,'center',2,vis(t,T[3]+.2,E),12);txt('D’ÉCONOMIES',620,970,'700 34px Mono',INK,'center',4,vis(t,T[3]+.3,E));}
    if(t>=T[4]){txt('LE MESSAGE DU GOUVERNEMENT :',540,1085,'700 30px Mono','rgba(236,238,230,.7)','center',4,vis(t,T[4],E));txt('« PAS DE HAUSSE GÉNÉRALISÉE »',540,1150,'700 40px Mono',AMB,'center',2,vis(t,T[4]+.3,E));}
    if(t>=T[5]){handCircle(t,T[5],540,1135,420,60,9,E);}
  }
  // 2. la famille Martin (exemple fictif)
  if(t>=T[6]-.15&&t<T[13]){const E=T[13]-.05;
    label(t,T[6],E,'EXEMPLE FICTIF',300);
    if(t>=T[7]){glowText('LA FAMILLE MARTIN',540,420,84,t,T[7],E);}
    const fa=vis(t,T[6]+.2,E,.4,.25);ctx.save();ctx.globalAlpha*=fa;
    person(330,700,1.25,'rgba(236,238,230,.85)');
    if(t>=T[9]){ctx.save();ctx.globalAlpha*=lin(t,T[9],T[9]+.3);person(470,735,.8,'rgba(236,238,230,.75)');person(560,745,.7,'rgba(236,238,230,.7)');ctx.restore();}
    if(t>=T[11]){ctx.save();ctx.globalAlpha*=lin(t,T[11],T[11]+.3);person(760,705,1.15,'rgba(236,238,230,.6)','old');ctx.restore();}
    ctx.restore();
    tag(540,900,700,78,'PRIME D’ACTIVITÉ',t,T[8]+.9,E,{from:-200,rot:-1});
    tag(540,995,700,78,'ALLOCATIONS FAMILIALES',t,T[9]+.9,E,{from:200,rot:1});
    tag(540,1090,700,78,'APL',t,T[10]+1,E,{from:-200,rot:-1});
    tag(540,1185,700,78,'PENSION : 1 400 € / MOIS',t,T[12],E,{from:200,rot:1,col:AMB});
  }
  // 3. personne ne retire rien
  if(t>=T[13]-.1&&t<T[17]){const E=T[17]-.05;
    glowText('PERSONNE NE LEUR',540,520,92,t,T[13],E);glowText('RETIRE RIEN.',540,630,92,t,T[13]+.2,E);
    if(t>=T[14])typed(t,T[14],E,'RIEN N’EST SUPPRIMÉ.',540,790,'700 46px Mono',INK,.5);
    if(t>=T[15])typed(t,T[15],E,'RIEN N’EST VOTÉ CONTRE EUX.',540,870,'700 46px Mono',INK,.6);
    if(t>=T[16])glowText('ON FAIT JUSTE… AUTRE CHOSE.',540,1080,70,t,T[16]+.4,E,ICE);
    // thermomètre qui descend
    const th=vis(t,T[13]+.3,E);if(th>0){ctx.save();ctx.globalAlpha*=th;ctx.translate(900,860);ctx.strokeStyle='rgba(236,238,230,.6)';ctx.lineWidth=4;ctx.strokeRect(-16,-200,32,300);
      ctx.beginPath();ctx.arc(0,130,34,0,6.283);ctx.stroke();const lv=1-.75*eo(lin(t,T[16],T[16]+1.6));ctx.fillStyle=lv>.5?RED:ICE;ctx.fillRect(-9,100-290*lv,18,290*lv);ctx.beginPath();ctx.arc(0,130,26,0,6.283);ctx.fill();ctx.restore();}
  }
  // 4. LE GEL : chaque aide se fige
  if(t>=T[17]-.15&&t<T[21]){const E=T[21]+.1;
    const rows=[['PRIME D’ACTIVITÉ',17,'GELÉE'],['ALLOCATIONS FAMILIALES',18,'GELÉES'],['APL',19,'GELÉES'],['PENSION DE SA MÈRE',20,'≠ PRIX']];
    rows.forEach(([n,i,st],k)=>{const y=520+k*190;const fr=eo(lin(t,T[i]+.6,T[i]+1.3));
      card(t,T[i]-.15,E,{x:540,y,w:820,h:150,rot:k%2?1.2:-1.2,op:1,from:k%2?'right':'left',z:60-k*10,drift:.3,seed:k+3,draw:(w,h,tt)=>{
        ctx.fillStyle='rgba(30,34,32,.95)';ctx.fillRect(-w/2,-h/2,w,h);txt(n,-w/2+40,14,'700 44px Mono',INK,'left',3);frostOver(w,h,fr);},
        after:(w,h,tt)=>{if(tt>=T[i]+.7){const sp=lin(tt,T[i]+.7,T[i]+.85);ctx.save();ctx.globalAlpha*=sp;ctx.translate(w/2-150,0);ctx.rotate(-.12);ctx.scale(1.5-.5*sp,1.5-.5*sp);
          ctx.strokeStyle=ICE;ctx.lineWidth=6;ctx.shadowColor='rgba(150,210,255,.9)';ctx.shadowBlur=16;ctx.strokeRect(-115,-36,230,66);txt(st,0,14,'700 38px Mono',ICE2,'center',4);ctx.restore();}}});});
  }
  // 5. « Ça s'appelle un gel » + courbe des prix contre aide à plat
  if(t>=T[21]-.15&&t<T[26]){const E=T[26]-.05;
    if(t<T[22]+.3){icyText('LE GEL.',540,860,300,t,T[21],T[22]+.3);}
    else{
      card(t,T[22]+.2,E,{x:540,y:780,w:900,h:620,rot:-1,op:1,from:'bottom',z:120,drift:.4,draw:(w,h,tt)=>{
        ctx.fillStyle='rgba(14,18,20,.95)';ctx.fillRect(-w/2,-h/2,w,h);
        const x0=-w/2+70,x1=w/2-60,y0=h/2-80,y1=-h/2+80;ctx.strokeStyle='rgba(236,238,230,.35)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x0,y1);ctx.lineTo(x0,y0);ctx.lineTo(x1,y0);ctx.stroke();
        txt('2026',x0,y0+44,'700 26px Mono','rgba(236,238,230,.6)','center');txt('2027',x1,y0+44,'700 26px Mono','rgba(236,238,230,.6)','center');
        const p=eo(lin(tt,T[23],T[23]+2.6));const yb=y0-170;
        ctx.save();ctx.strokeStyle=RED;ctx.lineWidth=7;ctx.shadowColor='rgba(255,40,30,.7)';ctx.shadowBlur=12;ctx.beginPath();
        for(let i=0;i<=60*p;i++){const u=i/60;const x=x0+(x1-x0)*u,y=yb-u*240-Math.sin(u*18)*8*u;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();ctx.restore();
        if(p>.05)txt('LES PRIX',x0+(x1-x0)*p-10,yb-p*240-28,'700 30px Mono',RED,'right',3);
        const q=eo(lin(tt,T[25],T[25]+1.4));ctx.save();ctx.strokeStyle=ICE;ctx.lineWidth=7;ctx.shadowColor='rgba(150,210,255,.8)';ctx.shadowBlur=12;ctx.beginPath();ctx.moveTo(x0,yb);ctx.lineTo(x0+(x1-x0)*q,yb);ctx.stroke();ctx.restore();
        if(q>.1)txt('VOTRE AIDE',x0+(x1-x0)*q-10,yb+46,'700 30px Mono',ICE,'right',3);
        txt('ILLUSTRATION',w/2-30,-h/2+40,'400 22px Mono','rgba(236,238,230,.45)','right',3);}});
      if(t>=T[24]){tag(330,1180,300,70,'LOYER ↑',t,T[24],E,{col:RED,size:32});tag(750,1180,330,70,'COURSES ↑',t,T[24]+.6,E,{col:RED,size:32});}
    }
  }
  // 6. le plus troublant : 2,1 % contre 0 %
  if(t>=T[26]-.1&&t<T[30]){const E=T[30]-.05;
    typed(t,T[26],E,'LE PLUS TROUBLANT ?',540,470,'700 50px Mono',INK,.6);
    if(t>=T[27]){txt('VOTRE IMPÔT',300,660,'700 40px Mono',INK,'center',4,vis(t,T[27]+.2,E));tiles(t,'2,1%',300,820,{t0:T[27]+1.2,step:.06,h:120,gap:6,t1:E});
      txt('d’inflation comptée',300,940,'400 28px Mono','rgba(236,238,230,.7)','center',0,vis(t,T[27]+1.6,E));}
    if(t>=T[28]){txt('VOS AIDES',780,660,'700 40px Mono',ICE,'center',4,vis(t,T[28],E));}
    if(t>=T[29]){ctx.save();const fr=lin(t,T[29]+.1,T[29]+.6);tiles(t,'0%',780,820,{t0:T[29]+.1,step:.06,h:150,gap:6,color:ICE2,t1:E});ctx.restore();
      handCircle(t,T[29]+.4,780,820,150,110,61,E);}
    if(t>=T[28])line2v(t,T[28],540,620,540,980,E);
  }
  // 7. pas de ligne en moins, pas de coupable, le frigo
  if(t>=T[30]-.1&&t<T[34]){const E=T[34]-.05;
    if(t<T[32]){
      card(t,T[30]-.1,T[32],{x:540,y:640,w:820,h:430,rot:1.4,op:1,from:'right',exit:'left',z:160,drift:.4,draw:(w,h)=>{
        ctx.fillStyle='#e8e4d8';ctx.fillRect(-w/2,-h/2,w,h);txt('RELEVÉ DE COMPTE',-w/2+36,-h/2+60,'700 34px Mono','#111','left',4);
        [['CAF · PRESTATIONS','= même montant'],['CAF · APL','= même montant'],['CAISSE DE RETRAITE','= même montant']].forEach(([a,b],i)=>{const y=-h/2+150+i*80;
          ctx.fillStyle='rgba(0,0,0,.06)';ctx.fillRect(-w/2+24,y-44,w-48,64);txt(a,-w/2+40,y,'700 30px Mono','#222','left',2);txt(b,w/2-40,y,'400 30px Mono','#444','right');});
        txt('AUCUNE LIGNE EN MOINS',0,h/2-30,'700 30px Mono',RED,'center',4);}});
      ['PAS DE LETTRE.','PAS D’ANNONCE.','PAS DE COUPABLE.'].forEach((s,i)=>{const t0=T[31]+i*.85;if(t>=t0)txt(s,540,980+i*80,'700 50px Mono',i==2?RED:INK,'center',4,vis(t,t0,T[32]),i==2?14:0);});
    }else{
      card(t,T[32]-.1,E,{x:540,y:700,w:520,h:760,rot:-1.2,op:1,from:'bottom',z:100,drift:.35,draw:(w,h,tt)=>{
        ctx.fillStyle='#cfd6da';ctx.fillRect(-w/2,-h/2,w,h);ctx.fillStyle='#e9eef0';ctx.fillRect(-w/2+24,-h/2+24,w-48,h-48);
        const items=18;const gone=Math.floor(items*eo(lin(tt,T[32]+.6,TE[33]+.3)));const r=rng(3);
        for(let i=0;i<items;i++){const sh=Math.floor(i/6),col=i%6;const x=-w/2+70+col*72,y=-h/2+150+sh*230;const show=i>=gone;
          if(!show)continue;ctx.fillStyle=['#8a8f8c','#6f7471','#a2a7a3'][i%3];const hh=60+r()*70;ctx.fillRect(x-24,y+90-hh,48,hh);}
        ctx.strokeStyle='#9aa3a8';ctx.lineWidth=4;for(let k=1;k<3;k++){ctx.beginPath();ctx.moveTo(-w/2+24,-h/2+24+k*250);ctx.lineTo(w/2-24,-h/2+24+k*250);ctx.stroke();}
        const mi=Math.min(11,Math.floor(12*lin(tt,T[32]+.6,TE[33]+.3)));const M=['JANV.','FÉVR.','MARS','AVRIL','MAI','JUIN','JUIL.','AOÛT','SEPT.','OCT.','NOV.','DÉC.'];
        ctx.fillStyle='rgba(6,8,7,.85)';ctx.fillRect(-120,h/2-90,240,56);txt(M[mi]+' 2027',0,h/2-50,'700 30px Mono',INK,'center',3);}});
      txt('UN PEU MOINS PLEIN.',540,1185,'700 46px Mono',ICE,'center',4,vis(t,T[32]+.3,E),10);
    }
  }
  // 8. protégés / laissés au froid
  if(t>=T[34]-.1&&t<T[38]){const E=T[38]-.05;
    if(t<T[36]){glowText('LES PLUS PAUVRES',540,520,90,t,T[34],T[36]);glowText('SONT PROTÉGÉS',540,630,90,t,T[34]+.2,T[36]);
      tag(360,840,320,90,'RSA  ✓',t,T[35]+.3,T[36],{col:GREEN,stroke:GREEN,size:44});tag(720,840,320,90,'AAH  ✓',t,T[35]+.9,T[36],{col:GREEN,stroke:GREEN,size:44});
      txt('ILS SUIVENT L’INFLATION',540,990,'700 38px Mono',GREEN,'center',4,vis(t,T[35]+1.2,T[36]));}
    else{const fr=eo(lin(t,T[37],T[37]+1));
      ['CEUX QUI TRAVAILLENT','QUI ÉLÈVENT DES ENFANTS','QUI ONT COTISÉ TOUTE LEUR VIE'].forEach((s,i)=>{const t0=T[36]+i*1.2;
        card(t,t0,E,{x:540,y:560+i*170,w:860,h:130,rot:i%2?1:-1,op:1,from:i%2?'right':'left',z:50,drift:.3,seed:i+11,draw:(w,h)=>{ctx.fillStyle='rgba(30,34,32,.95)';ctx.fillRect(-w/2,-h/2,w,h);txt(s,0,14,'700 38px Mono',INK,'center',3);frostOver(w,h,fr);}});});
      if(t>=T[37])icyText('ON LES LAISSE REFROIDIR.',540,1150,76,t,T[37]+.2,E);
    }
  }
  // 9. un impôt se voit / un gel ne fait pas de bruit
  if(t>=T[38]-.1&&t<T[43]){const E=T[43]-.05;
    if(t<T[41]){
      glowText('UN IMPÔT,',540,460,96,t,T[38],T[41]);
      typed(t,T[38]+.5,T[41],'ÇA SE VOIT.',540,580,'700 46px Mono',INK,.4);
      if(t>=T[39])typed(t,T[39],T[41],'ÇA SE CONTESTE.',540,660,'700 46px Mono',INK,.4);
      if(t>=T[40])card(t,T[40]-.1,T[41],{img:IM.foule,x:540,y:1010,w:740,h:400,rot:-1.5,from:'bottom',credit:'Cagibi54 · CC0',z:120,seed:12});
    }else{
      const q=lin(t,T[41],T[41]+.6);
      if(t<T[42]){icyText('UN GEL…',540,780,170,t,T[41]+.1,T[42]);typed(t,T[41]+.7,T[42],'ÇA NE FAIT PAS DE BRUIT.',540,940,'700 48px Mono',ICE,.9,3);}
      if(t>=T[42])icyText('ÇA FAIT JUSTE',540,780,110,t,T[42],E),icyText('FROID.',540,1020,250,t,T[42]+.15,E);
    }
  }
  // 10. l'Assemblée, maintenant
  if(t>=T[43]-.1&&t<VEND+.35){const E=VEND+.35;
    const a=vis(t,T[43],E,.5,.25);ctx.save();ctx.globalAlpha*=a;ctx.translate(540,900);
    SEATS.forEach(p=>{const on=t>=T[44]+1.1&&p.k<.5;ctx.fillStyle=on?'rgba(232,35,31,.85)':'rgba(236,238,230,.5)';ctx.beginPath();ctx.arc(p.x,p.y,8,0,6.283);ctx.fill();});ctx.restore();
    txt('PROJET DE LOI DE FINANCES 2027',540,980,'700 34px Mono',INK,'center',4,vis(t,T[43]+.3,E));
    txt('EN DÉBAT À L’ASSEMBLÉE',540,1040,'700 34px Mono','rgba(236,238,230,.7)','center',4,vis(t,T[43]+.6,E));
    if(t>=T[44]+1.1)stampRed(t,T[44]+1.1,E,'MAINTENANT.',540,470,96,-.08);
    if(t>=T[45])glowText('VOUS PERDEZ COMBIEN ?',540,1200,74,t,T[45]+.4,E,ICE);
  }
  // 11. carton de fin
  if(t>=VEND+.3){
    glowText('LE',540,640,120,t,VEND+.35,1e9);glowText('DOSSIER',540,840,200,t,VEND+.4,1e9);
    txt('LA FERME',540,980,'700 34px Mono',DIM,'center',12,lin(t,VEND+.7,VEND+1));
    txt('ABONNE-TOI',540,1120,'64px Anton',RED,'center',4,lin(t,VEND+1.1,VEND+1.4),16);
    txt('Projet de loi : les mesures peuvent encore changer.',540,1300,'400 26px Mono','rgba(236,238,230,.7)','center',0,lin(t,VEND+1.5,VEND+1.9));
    txt('Musique : « Heartbreaking », « Dark Times »',540,1400,'400 22px Mono','rgba(236,238,230,.55)','center',0,lin(t,VEND+1.5,VEND+1.9));txt('Kevin MacLeod (incompetech.com) · CC BY 4.0',540,1436,'400 22px Mono','rgba(236,238,230,.55)','center',0,lin(t,VEND+1.5,VEND+1.9));
  }
}
function line2v(t,t0,x1,y1,x2,y2,t1){const a=vis(t,t0,t1,.02,.25);if(a<=0)return;const p=eo(lin(t,t0,t0+.4));ctx.save();ctx.globalAlpha*=a;ctx.strokeStyle='rgba(236,238,230,.3)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x1+(x2-x1)*p,y1+(y2-y1)*p);ctx.stroke();ctx.restore();}

window.renderFrame=f=>{
  const t=f/FPS;
  CAM=camAt(t,f);
  background(t);
  ctx.save();layer(0);scene(t);ctx.restore();ctx.setTransform(1,0,0,1,0,0);
  const cold=lin(t,TGEL,TGEL+1.5)*(t<VEND+.3?1:.6);
  snow(t,cold*(t>=T[41]?1:.55));
  frostEdges(cold*(.45+.35*lin(t,T[41],T[42]+.8)));
  if(cold>0){ctx.save();ctx.globalCompositeOperation='soft-light';ctx.fillStyle=`rgba(90,150,220,${.35*cold})`;ctx.fillRect(0,0,W,H);ctx.restore();}
  if(t<VEND)subs(t);
  postfx(t);flash(t);
};
