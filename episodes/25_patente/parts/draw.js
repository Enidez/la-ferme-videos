// source qui tient toujours dans la carte (règle d'Enidez du 20/10)
function srcFit(s,w,h,dark){let sz=22;while(sz>14&&mw(s,'400 '+sz+'px Mono')>w-48)sz--;txt(s,w/2-24,h/2-18,'400 '+sz+'px Mono',dark?'rgba(27,28,26,.6)':'rgba(236,238,230,.62)','right');}
function VF(k,t,t0){const f=k&&window.CLIPS&&CLIPS[k];if(!f||!f.length)return null;return f[Math.min(f.length-1,Math.max(0,Math.floor((t-t0)*30)))];}
function fmtN(v){return Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g,' ');}
function rr(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
function shake(t,t0,dur,amp){if(t<t0||t>t0+dur)return;const k=1-(t-t0)/dur;ctx.translate(Math.sin(t*97)*amp*k,Math.cos(t*83)*amp*k);}
function slam(s,x,y,size,col,t,t0,ls=4,glow=22){if(t<t0)return;const q=eo(lin(t,t0,t0+.14));ctx.save();ctx.translate(x,y);shake(t,t0,.3,14);ctx.scale(1.7-.7*q,1.7-.7*q);let sz=+size;while(sz>30&&mw(s,sz+'px Anton',ls)>840)sz-=4;txt(s,0,0,sz+'px Anton',col,'center',ls,cl(q*1.5),glow);ctx.restore();}
function inter(w,h,t){if(t<N(8)+1.4)return;const v=Math.round(2400*eo(lin(t,N(8)+1.4,N(8)+3)));ctx.save();ctx.fillStyle='rgba(10,10,10,.85)';ctx.fillRect(-380,h/2-430,760,200);
  txt('≈ '+fmtN(v),0,h/2-300,'120px Anton',RED,'center',3,1,20);txt('PERSONNES INTERPELLÉES',0,h/2-250,'700 30px Mono',AMB,'center',3);ctx.restore();}
// ---------- couverture : son visage, net, et la question
function drawHook25(w,h,t){
  const Y=v=>-h/2+v,im=IM.philippe,PT=N(1)+1.8;
  ctx.fillStyle='#050605';ctx.fillRect(-w/2,-h/2,w,h);
  if(im){const z=1.0+.008*t;const s=Math.max(w/im.width,h/im.height)*z;ctx.save();ctx.beginPath();ctx.rect(-w/2,-h/2,w,h);ctx.clip();
    ctx.filter=t<N(1)?'saturate(.55) contrast(1.12) brightness(.95)':'grayscale(1) contrast(1.2) brightness(.75)';
    ctx.drawImage(im,-im.width*s*.5,-h/2-(im.height*s-h)*.1,im.width*s,im.height*s);ctx.restore();}
  {const g=ctx.createLinearGradient(0,Y(1050),0,Y(1560));g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.92)');ctx.fillStyle=g;ctx.fillRect(-w/2,Y(1050),w,870);}
  {const g=ctx.createLinearGradient(0,-h/2,0,Y(380));g.addColorStop(0,'rgba(0,0,0,.8)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,380);}
  if(t<N(1)){txt('LE RÉCIT VS LE RÉEL',0,Y(250),'700 30px Mono','rgba(236,238,230,.9)','center',6);
    ctx.fillStyle='rgba(201,48,44,.95)';ctx.fillRect(-w/2+70,Y(1010),w-140,64);txt('ÉDOUARD PHILIPPE, SUR LES PILLEURS DU 17 OCTOBRE :',0,Y(1053),'700 28px Mono','#fff','center',1);
    txt('« JEUNES ISSUS DE',0,Y(1190),'118px Anton',INK,'center',3,1,22);txt('L’IMMIGRATION »',0,Y(1320),'130px Anton',INK,'center',3,1,22);
    txt('VRAI OU FAUX ?',0,Y(1460),'120px Anton',RED,'center',5,1,26);
    txt('Photo : Jacques Paquier · CC BY 2.0',0,Y(1520),'400 18px Mono','rgba(236,238,230,.6)','center',1);}
  else{// la citation, puis le mot entouré, puis la définition
    ctx.fillStyle='rgba(8,9,8,.82)';ctx.fillRect(-w/2+60,Y(980),w-120,330);
    txt('« UNE SURREPRÉSENTATION', 0,Y(1070),'66px Anton',INK,'center',2,lin(t,N(1),N(1)+.2));
    txt('DE JEUNES ISSUS DE L’IMMIGRATION', 0,Y(1140),'56px Anton',INK,'center',2,lin(t,N(1)+.3,N(1)+.5));
    slam('« PATENTE. »',0,Y(1270),'130',RED,t,PT,6,26);
    if(t>=PT+.2)handCircle(t,PT+.2,0,Y(1225),300,95,3);
    txt('— ÉDOUARD PHILIPPE · LE POINT · 27/10/2026',0,Y(1350),'700 26px Mono',AMB,'center',2,lin(t,PT+.4,PT+.6));
    if(t>=N(2)){const q=eo(lin(t,N(2)+1.1,N(2)+1.4));ctx.save();ctx.globalAlpha*=q;ctx.fillStyle='rgba(232,229,218,.96)';ctx.fillRect(-w/2+90,Y(420),w-180,330);
      txt('patente',-w/2+130,Y(510),'italic 700 64px Osw',INKD,'left',1);txt('adj.',-w/2+420,Y(510),'italic 400 34px Mono','rgba(27,28,26,.6)','left');
      txt('1. Évidente.',-w/2+130,Y(600),'54px Anton',INKD,'left',2,lin(t,N(2)+2.1,N(2)+2.3));txt('2. Indiscutable.',-w/2+130,Y(690),'54px Anton',PINK,'left',2,lin(t,N(2)+3.1,N(2)+3.3));ctx.restore();}}
}
function verdictStamp(c,w,h,t){if(c.verdict){const[s,t0,col]=c.verdict;stampAt(s,w/2-230,h/2-150,96,t,t0,-.14,col);}}
function cardExtra(c,t,w,h){
  if(c.k==='doc'){framePaper(w,h,PAPERC);txt(c.hd,0,-h/2+95,'700 26px Mono','rgba(27,28,26,.7)','center',2);
    {let z=130;while(z>50&&mw(c.big,z+'px Anton',2)>w-80)z-=4;txt(c.big,0,-h/2+260,z+'px Anton',INKD,'center',2);}
    txt(c.l2,0,-h/2+350,'48px Anton',PINK,'center',2,lin(t,c.t0+.3,c.t0+.5));
    (c.rows||[]).forEach(([s,t0],i)=>{if(t<t0)return;const q=eo(lin(t,t0,t0+.25));const y=-h/2+470+i*100;ctx.save();ctx.globalAlpha*=q;let z=50;while(z>24&&mw(s,z+'px Anton',2)>w-120)z-=2;
      ctx.fillStyle='rgba(27,28,26,.9)';ctx.fillRect(-w/2+50,y-z,w-100,z*1.45);txt(s,0,y+z*.1,z+'px Anton',i?RED:INK,'center',2);ctx.restore();});
    srcFit(c.src||'',w,h,1);verdictStamp(c,w,h,t);return 1;}
  if(c.k==='verif'){framePaper(w,h,'rgba(30,32,30,.95)');txt('ALORS',0,-h/2+150,'700 40px Mono',AMB,'center',10);slam('ON A CHERCHÉ',0,-h/2+310,'120',INK,t,N(6)+1.6,3);slam('LES CHIFFRES.',0,-h/2+450,'120',RED,t,N(6)+2.2,3);
    txt('CE QU’IL N’A PAS FAIT.',0,h/2-90,'700 34px Mono','rgba(236,238,230,.7)','center',4,lin(t,c.t0+.6,c.t0+.9));return 1;}
  if(c.k==='profil'){framePaper(w,h,'rgba(24,26,24,.97)');txt('LES INTERPELLÉS DU 17 OCTOBRE',0,-h/2+100,'56px Anton',INK,'center',2);
    const row=(y,a,b,col,t0)=>{if(t<t0)return;const q=eo(lin(t,t0,t0+.2));ctx.save();ctx.globalAlpha*=q;ctx.fillStyle='rgba(128,134,126,.22)';ctx.fillRect(-w/2+50,y-70,w-100,110);txt(a,-w/2+80,y+5,'700 30px Mono','rgba(236,238,230,.8)','left',2);ctx.restore();slam(b,w/2-230,y+12,'64',col,t,t0+.2,2);};
    row(-h/2+240,'MAJEURS','9 SUR 10',INK,N(9)+2.1);row(-h/2+380,'HOMMES','18-30 ANS',INK,N(9)+4.2);
    if(t>=N(10)){txt('DANS LES TRIBUNAUX : PROFILS VARIÉS',0,-h/2+510,'700 28px Mono',AMB,'center',2);[['ÉTUDIANTS',N(10)+1.1],['INTÉRIMAIRES',N(10)+2.1],['MANIFESTANTS',N(10)+3.1]].forEach(([s,t0],i)=>{if(t<t0)return;const x=(i-1)*290;ctx.save();ctx.globalAlpha*=eo(lin(t,t0,t0+.15));ctx.fillStyle='rgba(128,134,126,.28)';ctx.fillRect(x-135,-h/2+545,270,80);txt(s,x,-h/2+600,'40px Anton',INK,'center',2);ctx.restore();});}
    row(-h/2+760,'ORIGINES','?',RED,N(11)+.6);stampAt('AUCUN CHIFFRE',60,-h/2+770,70,t,N(11)+1.6,-.08);
    srcFit('Sources : ministère de l’Intérieur (via Europe 1) · France 2 / franceinfo (comparutions immédiates)',w,h);return 1;}
  if(c.k==='impression'){framePaper(w,h,'rgba(24,26,24,.97)');txt('SA SOURCE : « LES IMAGES »',0,-h/2+95,'56px Anton',INK,'center',2);
    const PW=380,PH=560,px=-PW/2,py=-h/2+140;rr(px-12,py-12,PW+24,PH+24,44);ctx.fillStyle='#111';ctx.fill();ctx.strokeStyle='rgba(236,238,230,.4)';ctx.lineWidth=3;ctx.stroke();
    ctx.save();rr(px,py,PW,PH,34);ctx.clip();panel(IM.pillage,px,py,PW,PH,.45,1.15,'contrast(1.1)');ctx.restore();txt('VU SUR LES RÉSEAUX',0,py+PH-30,'700 26px Mono','#fff','center',2);
    if(t>=N(19)){txt('UNE IMPRESSION',-180,-h/2+800,'52px Anton',INK,'center',2,lin(t,N(19),N(19)+.2));txt('→',20,-h/2+800,'60px Anton',RED,'center');slam('UNE ÉVIDENCE',220,-h/2+800,'52',RED,t,N(19)+1.2,2);}
    stampAt('OPINION',0,h/2-120,110,t,N(20)+1.1,-.08,ORANGE);srcFit('Source : TF1, 20 h, 1/11/2026',w,h);return 1;}
  if(c.k==='trappes'){framePaper(w,h,'rgba(24,26,24,.97)');slam('MAIS LE PLUS GRAVE…',0,-h/2+120,'70',INK,t,c.t0,2);
    // calendrier qui recule
    const d=t<N(22)?27:Math.max(23,27-Math.floor((t-N(22))*5));ctx.fillStyle='rgba(232,229,218,.96)';ctx.fillRect(-170,-h/2+190,340,340);ctx.fillStyle=PINK;ctx.fillRect(-170,-h/2+190,340,80);
    txt('OCTOBRE',0,-h/2+250,'44px Anton','#fff','center',4);txt(String(d),0,-h/2+470,'190px Anton',INKD,'center',2);
    if(t>=N(22))txt('C’EST LA DATE.',0,-h/2+600,'64px Anton',AMB,'center',3,lin(t,N(22),N(22)+.2));
    if(t>=N(23)+3){slam('TRAPPES',0,-h/2+720,'110',RED,t,N(23)+3.2,4);}
    if(t>=N(24))txt('1 MORT · 5 BLESSÉS',0,-h/2+820,'64px Anton',INK,'center',3,lin(t,N(24),N(24)+.2));
    txt('4 JOURS AVANT « PATENTE »',0,h/2-60,'700 30px Mono',AMB,'center',3,lin(t,N(23)+1.5,N(23)+1.8));return 1;}
  if(c.k==='frise'){framePaper(w,h,'rgba(24,26,24,.97)');const X0=-w/2+120,X1=w/2-120,Y=-h/2+330;
    ctx.strokeStyle='rgba(236,238,230,.5)';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(X0,Y);ctx.lineTo(X0+(X1-X0)*eo(lin(t,c.t0,c.t0+1.2)),Y);ctx.stroke();
    [[X0,'23 OCT.','TRAPPES',RED,c.t0],[X1,'27 OCT.','« PATENTE »',INK,c.t0+1.2]].forEach(([x,a,b,col,t0])=>{if(t<t0)return;ctx.fillStyle=col;ctx.beginPath();ctx.arc(x,Y,18,0,6.283);ctx.fill();txt(a,x,Y-50,'700 32px Mono',AMB,'center',2);txt(b,x,Y+90,'60px Anton',col,'center',2);});
    if(t>=c.t0+1.3)txt('4 JOURS',0,Y-20,'80px Anton',RED,'center',3,lin(t,c.t0+1.3,c.t0+1.5),16);
    if(t>=N(28)+2.4){ctx.fillStyle='rgba(10,10,10,.85)';ctx.fillRect(-w/2+50,-h/2+500,w-100,140);txt('UN CANDIDAT DÉSIGNE',0,-h/2+560,'50px Anton',INK,'center',2);txt('« LES JEUNES ISSUS DE L’IMMIGRATION »',0,-h/2+620,'40px Anton',AMB,'center',2);}
    stampAt('SANS UN SEUL CHIFFRE',0,h/2-130,74,t,N(29),-.06);return 1;}
  if(c.k==='q'){framePaper(w,h,'rgba(40,43,40,.92)');txt('QUAND ON VEUT DIRIGER UN PAYS…',0,-h/2+120,'56px Anton',INK,'center',2,lin(t,N(32),N(32)+.2));
    slam('DES CHIFFRES…',0,-h/2+330,'130',VERT,t,N(32)+1.3,4,18);slam('OU DES IMPRESSIONS ?',0,-h/2+520,'110',RED,t,N(33),3,24);txt('DIS-LE EN COMMENTAIRE ↓',0,h/2-80,'700 40px Mono',AMB,'center',3,lin(t,N(34),N(34)+.3));return 1;}
  return 0;}
