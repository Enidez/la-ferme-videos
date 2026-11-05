// source qui tient toujours dans la carte (règle d'Enidez du 20/10)
function srcFit(s,w,h,dark){let sz=22;while(sz>14&&mw(s,'400 '+sz+'px Mono')>w-48)sz--;txt(s,w/2-24,h/2-18,'400 '+sz+'px Mono',dark?'rgba(27,28,26,.6)':'rgba(236,238,230,.62)','right');}
function VF(k,t,t0){const f=k&&window.CLIPS&&CLIPS[k];if(!f||!f.length)return null;return f[Math.min(f.length-1,Math.max(0,Math.floor((t-t0)*30)))];}
function photo(im,x,y,pw,ph,gray,fx=.5){ctx.fillStyle='#000';ctx.fillRect(x-pw/2,y-ph/2,pw,ph);if(!im)return;ctx.save();ctx.beginPath();ctx.rect(x-pw/2,y-ph/2,pw,ph);ctx.clip();const s=Math.max(pw/im.width,ph/im.height);
  ctx.filter=gray?'grayscale(1) contrast(1.1)':'saturate(.85) contrast(1.06)';ctx.drawImage(im,x-pw/2-(im.width*s-pw)*fx,y-ph/2-(im.height*s-ph)*.25,im.width*s,im.height*s);ctx.restore();}
function fmtN(v){return Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g,' ');}
// ---------- accroche : un téléphone, une vidéo de manif à 800 millions de vues… puis plus rien
function rr(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
function eye(x,y,s,col){ctx.save();ctx.translate(x,y);ctx.strokeStyle=col;ctx.lineWidth=s*.14;ctx.beginPath();ctx.moveTo(-s,0);ctx.quadraticCurveTo(0,-s*.95,s,0);ctx.quadraticCurveTo(0,s*.95,-s,0);ctx.stroke();ctx.fillStyle=col;ctx.beginPath();ctx.arc(0,0,s*.36,0,6.283);ctx.fill();ctx.restore();}
function drawHook23(w,h,t){
  const FALL=N(2),FRZ=MARK.frz,dead=t>=FRZ,fall=t>=FALL&&!dead;const im=IM.foule;const Y=v=>-h/2+v;
  ctx.fillStyle='#050605';ctx.fillRect(-w/2,-h/2,w,h);
  // fond : la même manif, très floue et sombre
  if(im&&!dead){const s=Math.max(w/im.width,h/im.height)*1.1;ctx.save();ctx.filter='blur(18px) grayscale(1) brightness(.35)';ctx.drawImage(im,-im.width*s/2,-h/2-(im.height*s-h)*.7,im.width*s,im.height*s);ctx.restore();}
  if(!dead)txt('LE RÉCIT VS LE RÉEL · #17OCTOBRE',0,Y(225),'700 30px Mono','rgba(236,238,230,.85)','center',4);
  // le téléphone
  const PW=480,PH=830,px=-PW/2,py=Y(285),z=1+.01*t;ctx.save();ctx.translate(0,py+PH/2);ctx.scale(z,z);ctx.translate(0,-(py+PH/2));
  ctx.shadowColor='rgba(0,0,0,.8)';ctx.shadowBlur=60;ctx.shadowOffsetY=24;rr(px-16,py-16,PW+32,PH+32,64);ctx.fillStyle='#151716';ctx.fill();ctx.shadowColor='transparent';
  ctx.strokeStyle='rgba(236,238,230,.35)';ctx.lineWidth=3;rr(px-16,py-16,PW+32,PH+32,64);ctx.stroke();
  ctx.save();rr(px,py,PW,PH,48);ctx.clip();ctx.fillStyle='#000';ctx.fillRect(px,py,PW,PH);
  if(!dead&&im){const s=Math.max(PW/im.width,PH/im.height)*1.45;ctx.filter=fall?`saturate(.6) contrast(1.25) brightness(${.85-.45*lin(t,FALL,FRZ)})`:'saturate(.75) contrast(1.15) brightness(.85)';
    ctx.drawImage(im,px+PW/2-im.width*s*.5,py+PH-im.height*s*.97,im.width*s,im.height*s);ctx.filter='none';
    {const g=ctx.createLinearGradient(0,py+PH*.6,0,py+PH);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.85)');ctx.fillStyle=g;ctx.fillRect(px,py,PW,PH);}
    // interface générique d'appli vidéo (pas de logo)
    txt('#17octobre',px+30,py+PH-150,'700 34px Mono','#fff','left',1);txt('Paris · manif · ce soir',px+30,py+PH-105,'400 26px Mono','rgba(255,255,255,.8)','left');
    [0,1,2].forEach(i=>{ctx.fillStyle='rgba(255,255,255,.85)';ctx.beginPath();ctx.arc(px+PW-50,py+PH-430+i*95,22,0,6.283);ctx.fill();});
    const v=t<FALL?800000000:800000000*Math.pow(1-lin(t,FALL,FRZ-.15),2.2);const col=t>=FALL&&v<1e8?RED:'#fff';
    ctx.fillStyle='rgba(0,0,0,.55)';rr(px+24,py+24,250,62,31);ctx.fill();eye(px+64,py+55,20,col);txt((v>=1e6?Math.round(v/1e6)+' M':fmtN(v)),px+100,py+68,'700 34px Mono',col,'left',1);
    if(fall){const r=rng(Math.floor(t*30));const k=lin(t,FALL+.3,FRZ);for(let i=0;i<Math.floor(2+k*12);i++){const y=py+r()*PH,hh=6+r()*50;ctx.fillStyle=`rgba(${r()<.5?255:0},${r()<.5?60:255},${r()<.5?50:255},${.12+k*.25})`;ctx.fillRect(px+(r()-.5)*60,y,PW,hh);}}}
  if(dead){const d=t-FRZ,r=rng(Math.floor(t*30)+7);ctx.globalAlpha=.25*Math.max(.3,1-d*.6);for(let i=0;i<260;i++){ctx.fillStyle=r()<.5?'#fff':'#666';ctx.fillRect(px+r()*PW,py+r()*PH,2+r()*4,2);}ctx.globalAlpha=1;
    if(d>.5||Math.floor(d*16)%2){txt('⚠',0,py+PH/2-40,'90px Mono','rgba(236,238,230,.7)','center');txt('Contenu',0,py+PH/2+50,'700 40px Mono','rgba(236,238,230,.8)','center');txt('indisponible',0,py+PH/2+100,'700 40px Mono','rgba(236,238,230,.8)','center');}}
  ctx.restore();ctx.restore();
  // le titre (couverture) puis le compteur qui s'effondre
  if(!dead){const sh=fall?lin(t,FALL,FRZ)*10:0;ctx.save();ctx.translate(Math.sin(t*93)*sh,Math.cos(t*71)*sh);
    if(t<FALL){txt('800 MILLIONS',0,Y(1300),'150px Anton',INK,'center',3,1,22);txt('DE VUES.',0,Y(1440),'120px Anton',AMB,'center',4,1,18);}
    else{const v=800000000*Math.pow(1-lin(t,FALL,FRZ-.15),2.2);txt(fmtN(v),0,Y(1300),'130px Anton',v<1e8?RED:INK,'center',2,1,22);txt('VUES',0,Y(1440),'100px Anton',AMB,'center',6,1,16);}
    ctx.restore();txt('Photo : manifestation du 31 oct. 2026, Paris · FreCha · CC BY-SA 4.0',0,Y(1520),'400 18px Mono','rgba(236,238,230,.55)','center',1);}
  else{const q=eo(lin(t,FRZ+.15,FRZ+.32));if(t>=FRZ+.15){ctx.save();ctx.translate(0,Y(1370));ctx.scale(1.6-.6*q,1.6-.6*q);txt('PLUS RIEN.',0,0,'200px Anton',RED,'center',6,cl(q*1.4),26);ctx.restore();}}
}
function verdictStamp(c,w,h,t){if(c.verdict){const[s,t0,col]=c.verdict;stampAt(s,w/2-200,h/2-150,110,t,t0,-.14,col);}}
function cardExtra(c,t,w,h){
  if(c.k==='doc'){framePaper(w,h,PAPERC);txt(c.hd,0,-h/2+95,'700 30px Mono','rgba(27,28,26,.7)','center',3);
    {let z=150;while(z>60&&mw(c.big,z+'px Anton',2)>w-80)z-=6;txt(c.big,0,-h/2+280,z+'px Anton',INKD,'center',2);}
    txt(c.l2,0,-h/2+370,'60px Anton',PINK,'center',2,lin(t,c.t0+.3,c.t0+.5));
    (c.rows||[]).forEach(([s,t0],i)=>{if(t<t0)return;const q=eo(lin(t,t0,t0+.25));const y=-h/2+480+i*100;ctx.save();ctx.globalAlpha*=q;let z=46;while(z>24&&mw(s,z+'px Anton',2)>w-120)z-=2;
      ctx.fillStyle='rgba(27,28,26,.88)';ctx.fillRect(-w/2+50,y-z,w-100,z*1.45);txt(s,0,y+z*.1,z+'px Anton',i?AMB:INK,'center',2);ctx.restore();});
    srcFit(c.src||'',w,h,1);verdictStamp(c,w,h,t);return 1;}
  if(c.k==='verif'){framePaper(w,h,'rgba(30,32,30,.95)');txt('ALORS',0,-h/2+150,'700 40px Mono',AMB,'center',10);
    const q=eo(lin(t,c.t0,c.t0+.2));ctx.save();ctx.translate(0,-h/2+330);ctx.scale(1.5-.5*q,1.5-.5*q);txt('ON A VÉRIFIÉ.',0,0,'140px Anton',INK,'center',3,q,20);ctx.restore();
    ['RÉCIT 1','RÉCIT 2','RÉCIT 3'].forEach((s,i)=>{const t0=c.t0+.5+i*.2;if(t<t0)return;const x=(i-1)*270;ctx.save();ctx.globalAlpha*=eo(lin(t,t0,t0+.15));ctx.fillStyle='rgba(128,134,126,.28)';ctx.fillRect(x-120,-h/2+480,240,110);ctx.strokeStyle='rgba(236,238,230,.4)';ctx.lineWidth=2;ctx.strokeRect(x-120,-h/2+480,240,110);txt(s,x,-h/2+552,'52px Anton',INK,'center',2);ctx.restore();});
    txt('VRAI · FAUX · NON PROUVÉ',0,h/2-80,'700 30px Mono','rgba(236,238,230,.6)','center',4,lin(t,c.t0+1.2,c.t0+1.4));return 1;}
  if(c.k==='courbe'){framePaper(w,h,'rgba(30,32,30,.95)');txt('VIDÉOS DE MANIF PUBLIÉES',0,-h/2+100,'64px Anton',INK,'center',2);txt('TIKTOK · INSTAGRAM',0,-h/2+150,'700 28px Mono',AMB,'center',5);
    const x0=-w/2+90,x1=w/2-70,y0=-h/2+210,y1=h/2-250;ctx.strokeStyle='rgba(236,238,230,.4)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x0,y1);ctx.lineTo(x1,y1);ctx.stroke();
    txt('17 OCT.',x0+40,y1+46,'700 26px Mono','rgba(236,238,230,.7)','left',2);txt('24 OCT. →',x1,y1+46,'700 26px Mono','rgba(236,238,230,.7)','right',2);
    const p=eo(lin(t,c.t0+.2,c.t0+2.2));const F=u=>y0+40+(y1-y0-60)*(u<.35?.05+.05*Math.sin(u*20):.1+.8*Math.min(1,(u-.35)/.3))+(u>.35?Math.sin(u*40)*6:0);
    ctx.save();ctx.strokeStyle=PINK;ctx.lineWidth=9;ctx.shadowColor='rgba(255,40,30,.7)';ctx.shadowBlur=14;ctx.beginPath();for(let i=0;i<=80*p;i++){const u=i/80;const x=x0+(x1-x0)*u,y=F(u);i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();ctx.restore();
    if(p>.6)band(y1-140,t,c.t0+1.5,'NETTE BAISSE DES PUBLICATIONS',52,DK,AMB);
    txt('courbe illustrative · pas de chiffres publiés',0,h/2-150,'400 24px Mono','rgba(236,238,230,.55)','center');
    srcFit('Source : Visibrain, cité par le Canard enchaîné et 20 Minutes (05/11/2026)',w,h);
    stampAt('VRAI',w/2-200,h/2-150,110,t,N(12),-.14,VERT);return 1;}
  if(c.k==='nop'){framePaper(w,h,PAPERC);txt('L’ÉTAT A ORDONNÉ LA CENSURE ?',0,-h/2+100,'60px Anton',INKD,'center',2);
    stampAt('AUCUNE PREUVE',0,-h/2+260,96,t,c.t0+.15,-.05,INKD);
    if(t>=N(15)){const q=eo(lin(t,N(15),N(15)+.25));ctx.save();ctx.globalAlpha*=q;ctx.fillStyle='rgba(27,28,26,.88)';ctx.fillRect(-w/2+50,-h/2+380,w-100,230);
      txt('24 OCT. : MOINS DE VIOLENCES',0,-h/2+460,'54px Anton',INK,'center',2);txt('= MOINS DE VIDÉOS CHOCS',0,-h/2+560,'54px Anton',AMB,'center',2);ctx.restore();}
    darkTxt('Source : franceinfo · 20 Minutes',0,w,h);stampAt('NON PROUVÉ',w/2-260,h/2-140,100,t,N(16),-.12,'#d98a00');return 1;}
  if(c.k==='lettre'){framePaper(w,h,'rgba(232,229,218,.97)');
    txt('RÉPUBLIQUE FRANÇAISE',-w/2+60,-h/2+90,'700 26px Mono','rgba(27,28,26,.75)','left',3);txt('LE PREMIER MINISTRE',-w/2+60,-h/2+130,'700 26px Mono','rgba(27,28,26,.75)','left',3);txt('Paris, le 22 octobre 2026',w/2-60,-h/2+130,'400 26px Mono','rgba(27,28,26,.75)','right');
    txt('À : ORANGE · SFR · BOUYGUES · FREE',0,-h/2+230,'54px Anton',INKD,'center',2,lin(t,c.t0+.3,c.t0+.6));
    if(t>=N(20)){txt('« SE TENIR PRÊTS À SUSPENDRE »',0,-h/2+340,'58px Anton',PINK,'center',2,lin(t,N(20),N(20)+.2));
      ['TIKTOK','INSTAGRAM','SNAPCHAT'].forEach((s,i)=>{const t0=N(20)+1.6+i*.45;if(t<t0)return;const y=-h/2+450+i*105;const q=eo(lin(t,t0,t0+.15));ctx.save();ctx.globalAlpha*=q;ctx.fillStyle='rgba(27,28,26,.9)';ctx.fillRect(-260,y-55,520,90);txt(s,0,y+12,'64px Anton',INK,'center',6);ctx.restore();
        bigX(t,t0+.25,0,y-10,52);});}
    if(t>=N(21)){band(h/2-170,t,N(21),'QUELQUES HEURES · LE WEEK-END DE LA MANIF',44,'rgba(201,48,44,.92)');}
    for(let i=0;i<3;i++)inkLines(-w/2+60,h/2-110+i*0,w-120,1,0,i+3);
    darkTxt('Lettre révélée par Blast (24/10/2026) · Matignon n’a pas commenté',0,w,h);return 1;}
  if(c.k==='ops'){framePaper(w,h,'rgba(30,32,30,.95)');txt('LA RÉPONSE DES OPÉRATEURS',0,-h/2+100,'60px Anton',INK,'center',2);
    ['ORANGE','SFR','BOUYGUES','FREE'].forEach((s,i)=>{const x=(i%2?1:-1)*200,y=-h/2+230+Math.floor(i/2)*130;const t0=c.t0+.15+i*.12;if(t<t0)return;ctx.save();ctx.globalAlpha*=eo(lin(t,t0,t0+.15));ctx.fillStyle='rgba(128,134,126,.28)';ctx.fillRect(x-180,y-55,360,100);txt(s,x,y+18,'60px Anton',INK,'center',3);ctx.restore();});
    stampAt('« IMPOSSIBLE, SI VITE »',0,-h/2+520,80,t,c.t0+1.3,-.06);
    if(t>=N(22)+2.2)txt('LA COUPURE N’A PAS LIEU.',0,h/2-90,'60px Anton',AMB,'center',2,lin(t,N(22)+2.2,N(22)+2.4));
    srcFit('Source : Blast, repris par la presse',w,h);return 1;}
  if(c.k==='methode'){framePaper(w,h,'rgba(30,32,30,.95)');txt('ALORS LA MÉTHODE CHANGE',0,-h/2+100,'60px Anton',INK,'center',2);
    txt('COUPER',0,-h/2+260,'150px Anton','rgba(236,238,230,.55)','center',6);bigX(t,c.t0+.5,0,-h/2+210,150);
    if(t>=N(24)){const q=eo(lin(t,N(24),N(24)+.25));ctx.save();ctx.globalAlpha*=q;txt('RESTREINDRE',0,-h/2+470,'130px Anton',PINK,'center',5,1,18);
      ['« CERTAINES PLATEFORMES ONT RESTREINT','DES CONTENUS LIÉS AUX MANIFS… APRÈS QUE','LE GOUVERNEMENT LES Y A ENCOURAGÉES. »'].forEach((s,i)=>txt(s,0,-h/2+570+i*48,'700 30px Mono',AMB,'center',1,lin(t,N(24)+.6+i*.5,N(24)+.9+i*.5)));ctx.restore();}
    srcFit('Source : franceinfo, 05/11/2026',w,h);return 1;}
  if(c.k==='senat2'){framePaper(w,h,PAPERC);txt('SÉNAT · 27 OCTOBRE 2026',0,-h/2+90,'700 30px Mono','rgba(27,28,26,.7)','center',4);
    txt('AMENDEMENT DU GOUVERNEMENT',0,-h/2+165,'56px Anton',INKD,'center',2);txt('LOI « CASSEURS-PAYEURS »',0,-h/2+225,'700 30px Mono',PINK,'center',3);
    const cx=0,cy=-h/2+520,p=lin(t,c.t0+.4,c.t0+2);const ns=SEATS.length;ctx.save();ctx.translate(cx,cy);ctx.scale(.95,.95);
    SEATS.forEach((s,i)=>{if(i/ns>p)return;const yes=s.k<219/334;ctx.fillStyle=yes?PINK:'rgba(27,28,26,.35)';ctx.beginPath();ctx.arc(s.x,s.y,9,0,6.283);ctx.fill();});ctx.restore();
    if(p>=1){txt('219',-220,cy+70,'110px Anton',PINK,'center',2);txt('POUR',-220,cy+115,'700 28px Mono',INKD,'center',4);txt('115',220,cy+70,'110px Anton','rgba(27,28,26,.6)','center',2);txt('CONTRE',220,cy+115,'700 28px Mono',INKD,'center',4);}
    [['RETRAIT EN 24 H',N(26)+.3],['SANS JUGE',N(26)+2.6],['SINON : BLOCAGE',N(26)+3.6]].forEach(([s,t0],i)=>{if(t<t0)return;const q=eo(lin(t,t0,t0+.2));const y=-h/2+720+i*72;ctx.save();ctx.globalAlpha*=q;ctx.fillStyle=i==1?'rgba(201,48,44,.92)':'rgba(27,28,26,.9)';ctx.fillRect(-300,y-52,600,66);txt(s,0,y,'50px Anton','#fff','center',3);ctx.restore();});
    if(t>=N(27))stampAt('PROCHAINE ÉTAPE : L’ASSEMBLÉE',0,h/2-70,48,t,N(27),-.04,INKD);
    darkTxt('',0,w,h);return 1;}
  if(c.k==='volume'){framePaper(w,h,'rgba(24,26,24,.97)');
    // interrupteur : COUPER
    const sx=-w/4+10,sy=-h/2+330;ctx.fillStyle='rgba(236,238,230,.12)';ctx.fillRect(sx-90,sy-150,180,300);ctx.strokeStyle='rgba(236,238,230,.5)';ctx.lineWidth=3;ctx.strokeRect(sx-90,sy-150,180,300);
    const off=t>=c.t0+.4;ctx.fillStyle=off?PINK:'rgba(236,238,230,.7)';ctx.fillRect(sx-50,off?sy:sy-110,100,110);txt(off?'OFF':'ON',sx,off?sy+70:sy-40,'50px Anton','#fff','center',2);
    txt('COUPER',sx,sy+220,'72px Anton',INK,'center',3);txt('ÇA SE VOIT.',sx,sy+290,'56px Anton',PINK,'center',2,lin(t,c.t0+.6,c.t0+.8));
    // le volume qu'on baisse
    const vx=w/4-10,vy=sy;const T2=N(29);const lvl=t<T2?1:1-.85*eo(lin(t,T2,T2+2.2));
    for(let i=0;i<10;i++){const on=i/10<lvl;const bh=40+i*22;ctx.fillStyle=on?(i>6?AMB:INK):'rgba(236,238,230,.12)';ctx.fillRect(vx-150+i*30,vy+130-bh,22,bh);}
    if(t>=T2){txt('BAISSER LE SON',vx,sy+220,'64px Anton',INK,'center',3,lin(t,T2,T2+.2));txt('BEAUCOUP MOINS.',vx,sy+290,'52px Anton',AMB,'center',2,lin(t,T2+1.2,T2+1.4));}
    ctx.fillStyle='rgba(236,238,230,.25)';ctx.fillRect(-2,-h/2+150,4,h-300);
    if(t>=T2+1.5){const q=eo(lin(t,T2+1.5,T2+1.8));txt('LE SON DE QUI ?',0,h/2-90,'86px Anton',PINK,'center',3,q,18);}return 1;}
  if(c.k==='q'){framePaper(w,h,'rgba(40,43,40,.92)');txt('TES VIDÉOS DE MANIF,',0,-h/2+160,'84px Anton',INK,'center',2);txt('ELLES ONT FAIT',0,-h/2+280,'84px Anton',INK,'center',2,lin(t,N(31),N(31)+.2));
    txt('COMBIEN DE VUES ?',0,-h/2+420,'110px Anton',PINK,'center',2,lin(t,N(31)+.8,N(31)+1),16);txt('DIS-LE EN COMMENTAIRE ↓',0,h/2-80,'700 40px Mono',AMB,'center',3,lin(t,N(32),N(32)+.3));return 1;}
  return 0;}
