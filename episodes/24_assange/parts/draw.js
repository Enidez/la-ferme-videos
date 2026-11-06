// source qui tient toujours dans la carte (règle d'Enidez du 20/10)
function srcFit(s,w,h,dark){let sz=22;while(sz>14&&mw(s,'400 '+sz+'px Mono')>w-48)sz--;txt(s,w/2-24,h/2-18,'400 '+sz+'px Mono',dark?'rgba(27,28,26,.6)':'rgba(236,238,230,.62)','right');}
function VF(k,t,t0){const f=k&&window.CLIPS&&CLIPS[k];if(!f||!f.length)return null;return f[Math.min(f.length-1,Math.max(0,Math.floor((t-t0)*30)))];}
function fmtN(v){return Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g,' ');}
function rr(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
function shake(t,t0,dur,amp){if(t<t0||t>t0+dur)return;const k=1-(t-t0)/dur;ctx.translate(Math.sin(t*97)*amp*k,Math.cos(t*83)*amp*k);}
function slam(s,x,y,size,col,t,t0,ls=4,glow=22){if(t<t0)return;const q=eo(lin(t,t0,t0+.14));ctx.save();ctx.translate(x,y);shake(t,t0,.3,14);ctx.scale(1.7-.7*q,1.7-.7*q);txt(s,0,0,size+'px Anton',col,'center',ls,cl(q*1.5),glow);ctx.restore();}
function sanglante(w,h,t){const t0=N(12)+.95;if(t<t0)return;slam('SANGLANTE.',0,h/2-340,'150',RED,t,t0,6,30);const r=rng(5);ctx.save();ctx.fillStyle='rgba(180,20,18,.9)';for(let i=0;i<9;i++){const x=-300+r()*600,l=lin(t,t0+.15+r()*.3,t0+1.6+r())*(60+r()*140);ctx.fillRect(x,h/2-320,6+r()*6,l);ctx.beginPath();ctx.arc(x+5,h/2-320+l,7,0,6.283);ctx.fill();}ctx.restore();}
function ambDays(w,h,t){if(t<N(17))return;const v=Math.round(2487*eo(lin(t,N(17),N(17)+2.4)));ctx.save();ctx.fillStyle='rgba(10,10,10,.85)';ctx.fillRect(-380,-h/2+300,760,200);
  txt(fmtN(v),0,-h/2+430,'130px Anton',RED,'center',3,1,20);txt('JOURS SANS JAMAIS SORTIR',0,-h/2+485,'700 30px Mono',AMB,'center',3);ctx.restore();}
// ---------- couverture / accroche : son visage… puis le viseur
function drawHook24(w,h,t){
  const FRZ=MARK.frz,lock=t>=FRZ;const im=IM.assange;const Y=v=>-h/2+v;
  ctx.fillStyle='#050605';ctx.fillRect(-w/2,-h/2,w,h);
  if(im){const z=1.0+.01*t+(lock?.06*eo(lin(t,FRZ,FRZ+.5)):0);const s=Math.max(w/im.width,h/im.height)*z;ctx.save();ctx.beginPath();ctx.rect(-w/2,-h/2,w,h);ctx.clip();
    ctx.filter=lock?'grayscale(1) sepia(.6) hue-rotate(60deg) saturate(1.6) contrast(1.35) brightness(.55)':'grayscale(1) contrast(1.2) brightness(.8)';
    ctx.drawImage(im,-im.width*s*.42,-h/2-(im.height*s-h)*.15,im.width*s,im.height*s);ctx.restore();}
  {const g=ctx.createLinearGradient(0,Y(900),0,Y(1500));g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.94)');ctx.fillStyle=g;ctx.fillRect(-w/2,Y(900),w,1020);}
  {const g=ctx.createLinearGradient(0,-h/2,0,Y(420));g.addColorStop(0,'rgba(0,0,0,.85)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,420);}
  if(!lock){txt('HISTOIRE VRAIE · JULIAN ASSANGE',0,Y(290),'700 30px Mono','rgba(236,238,230,.85)','center',4);
    txt('COUPABLE',0,Y(1250),'200px Anton',INK,'center',6,1,24);txt('DE JOURNALISME.',0,Y(1395),'100px Anton',RED,'center',3,1,22);
    txt('Photo : Snapperjack · CC BY-SA 2.0',0,Y(1500),'400 18px Mono','rgba(236,238,230,.55)','center',1);}
  else{// le réticule se verrouille
    const p=eo(lin(t,FRZ,FRZ+.35)),cx=-60,cy=Y(560),R=260-120*p;ctx.save();ctx.strokeStyle=`rgba(255,58,46,${.9})`;ctx.lineWidth=5;ctx.shadowColor='rgba(255,40,30,.9)';ctx.shadowBlur=18;
    ctx.beginPath();ctx.arc(cx,cy,R,0,6.283);ctx.stroke();[[1,0],[-1,0],[0,1],[0,-1]].forEach(([a,b])=>{ctx.beginPath();ctx.moveTo(cx+a*(R-40),cy+b*(R-40));ctx.lineTo(cx+a*(R+70),cy+b*(R+70));ctx.stroke();});ctx.restore();
    txt('REC ● 12.07.2007 · BAGDAD',-w/2+60,Y(200),'700 30px Mono',RED,'left',3,Math.floor(t*4)%2?1:.4);
    slam('CE N’EST PAS',0,Y(1180),'130',INK,t,FRZ+.4,4);slam('CELUI QUI A TIRÉ.',0,Y(1340),'130',RED,t,FRZ+.9,4);}
}
// ---------- viseur (reconstitution, aucune personne réelle à l'image)
const VTER=[];{const r=rng(77);for(let i=0;i<60;i++)VTER.push({x:(r()-.5)*1600,y:(r()-.5)*1600,w:80+r()*260,h:60+r()*200,g:40+r()*60});}
function drawViseur(w,h,t,c){
  const SEQ=[['city',N(2)-.1],['group',N(3)-.1],['cam',N(4)-.1],['light',N(5)-.1],['fire',N(6)-.3],['van',N(7)-.1],['vanfire',N(7)+2.55]];
  let ck=SEQ[0][0],cs=SEQ[0][1];SEQ.forEach(([k,ts])=>{if(t>=ts){ck=k;cs=ts;}});const im=VF(ck,t,cs);
  ctx.fillStyle='#050605';ctx.fillRect(-w/2,-h/2,w,h);
  const PX=-w/2+16,PW=w-32,PH=Math.round(PW*344/360),PY=-h/2+120;
  ctx.save();ctx.beginPath();ctx.rect(PX,PY,PW,PH);ctx.clip();
  const firing=(ck==='fire'&&t<N(6)+1.6)||ck==='vanfire';if(firing)shake(t,cs,2.5,18);
  if(im){ctx.filter='contrast(1.25) brightness(1.02)';ctx.drawImage(im,141,0,360,344,PX-8,PY-6,PW+16,PH+12);ctx.filter='none';}
  if(firing&&Math.floor((t-cs)*14)%3==0){ctx.fillStyle='rgba(255,255,255,.22)';ctx.fillRect(PX,PY,PW,PH);}
  for(let y=PY;y<PY+PH;y+=5){ctx.fillStyle='rgba(0,0,0,.08)';ctx.fillRect(PX,y,PW,2);}
  // traduction de l'ordre radio
  if(ck==='light'){ctx.fillStyle='rgba(0,0,0,.72)';ctx.fillRect(PX,PY+40,PW,150);slam('« ALLUMEZ-LES TOUS. FEU ! »',0,PY+140,'50',AMB,t,N(5)+1.0,2,16);}
  // bilan par-dessus les vraies images
  if(t>=N(6)+.9&&ck==='fire'){const d=eo(lin(t,N(6)+.9,N(6)+1.4));ctx.fillStyle=`rgba(0,0,0,${.55*d})`;ctx.fillRect(PX,PY,PW,PH);
    const v=Math.round(11*eo(lin(t,N(6)+.9,N(6)+1.7)));slam(String(v),0,PY+300,'260',RED,t,N(6)+.9,2,28);txt('MORTS AU MOINS',0,PY+390,'64px Anton',INK,'center',4,lin(t,N(6)+1.1,N(6)+1.3));
    if(t>=N(6)+1.6)txt('DONT 2 JOURNALISTES DE REUTERS',0,PY+450,'700 30px Mono',AMB,'center',2,lin(t,N(6)+1.6,N(6)+1.8));}
  if(ck==='van'&&t<N(7)+2.55){ctx.fillStyle='rgba(0,0,0,.65)';ctx.fillRect(PX,PY+20,PW,90);txt('UNE CAMIONNETTE VIENT SECOURIR UN BLESSÉ',0,PY+78,'700 30px Mono',INK,'center',1);}
  if(t>=N(7)+3.8){ctx.fillStyle='rgba(0,0,0,.5)';ctx.fillRect(PX,PY,PW,PH);slam('À L’INTÉRIEUR :',0,PY+200,'70',INK,t,N(7)+3.4,3);slam('2 ENFANTS',0,PY+330,'140',RED,t,N(7)+3.8,3,26);}
  stampAt('ÉQUIPAGE BLANCHI',0,PY+PH-170,80,t,N(8)+1.1,-.07,VERT);stampAt('SECRET',0,PY+PH/2-60,130,t,N(9)+.6,.08);
  ctx.restore();
  ctx.strokeStyle='rgba(236,238,230,.6)';ctx.lineWidth=3;ctx.strokeRect(PX,PY,PW,PH);
  if(Math.floor(t*2)%2){ctx.fillStyle=RED;ctx.beginPath();ctx.arc(-w/2+40,-h/2+62,11,0,6.283);ctx.fill();}
  txt('12 JUILLET 2007 · BAGDAD',-w/2+62,-h/2+72,'700 30px Mono',INK,'left',3);
  ctx.fillStyle='rgba(201,48,44,.92)';ctx.fillRect(w/2-330,-h/2+38,310,46);txt('VRAIES IMAGES',w/2-175,-h/2+70,'700 28px Mono','#fff','center',3);
  srcFit('Images : caméra de l’hélicoptère Apache (armée américaine, domaine public) · publiées par WikiLeaks, 5/04/2010',w,h);
}
// ---------- la cellule de Belmarsh
function drawCellule(w,h,t,c){
  const T0=c.t0;ctx.fillStyle='#141614';ctx.fillRect(-w/2,-h/2,w,h);
  ctx.save();ctx.beginPath();ctx.rect(-w/2,-h/2,w,h);ctx.clip();
  // mur et lumière zénithale
  const g=ctx.createRadialGradient(0,-h/2+200,20,0,-h/2+200,700);g.addColorStop(0,'rgba(220,225,215,.25)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,h);
  txt('HM PRISON',0,-h/2+170,'700 36px Mono','rgba(236,238,230,.7)','center',10);slam('BELMARSH',0,-h/2+300,'150',INK,t,T0+.3,8);
  txt('HAUTE SÉCURITÉ · LONDRES',0,-h/2+360,'700 30px Mono',AMB,'center',5,lin(t,N(20)+1.6,N(20)+1.9));
  if(t>=N(21)){const q=lin(t,N(21)+1.9,N(21)+3.2);slam('18',-200,-h/2+560,'190',RED,t,N(21)+1.9,2);txt('CHEFS',-200,-h/2+620,'700 34px Mono',INK,'center',4,lin(t,N(21)+1.9,N(21)+2.1));
    if(t>=N(21)+3.4){const v=Math.round(175*eo(lin(t,N(21)+3.4,N(21)+4.6)));txt(String(v),170,-h/2+560,'190px Anton',RED,'center',2,1,26);txt('ANS DE PRISON',170,-h/2+620,'700 34px Mono',INK,'center',4);}}
  if(t>=N(22))band(-h/2+760,t,N(22),'1RE FOIS : LA LOI SUR L’ESPIONNAGE CONTRE UN ÉDITEUR',40,'rgba(201,48,44,.92)');
  // barreaux qui se referment
  const p=eback(lin(t,T0+.05,T0+.6));for(let i=0;i<9;i++){const x=-w/2+50+i*100;const yy=-h/2-h+(h)*p;ctx.fillStyle='#2a2d2a';ctx.fillRect(x,yy,26,h);const gb=ctx.createLinearGradient(x,0,x+26,0);gb.addColorStop(0,'rgba(255,255,255,.18)');gb.addColorStop(1,'rgba(0,0,0,.4)');ctx.fillStyle=gb;ctx.fillRect(x,yy,26,h);}
  ctx.fillStyle='#2a2d2a';ctx.fillRect(-w/2,-h/2+40,w,26);ctx.fillRect(-w/2,h/2-160,w,26);
  ctx.restore();srcFit('Sources : ministère américain de la Justice (2019) · CBS · Infosecurity',w,h);
}
function cardExtra(c,t,w,h){
  if(c.k==='viseur'){drawViseur(w,h,t,c);return 1;}
  if(c.k==='cellule'){drawCellule(w,h,t,c);return 1;}
  if(c.k==='doc'){framePaper(w,h,PAPERC);txt(c.hd,0,-h/2+95,'700 28px Mono','rgba(27,28,26,.7)','center',2);
    {let z=150;while(z>60&&mw(c.big,z+'px Anton',2)>w-80)z-=6;txt(c.big,0,-h/2+280,z+'px Anton',INKD,'center',2);}
    txt(c.l2,0,-h/2+370,'52px Anton',PINK,'center',2,lin(t,c.t0+.3,c.t0+.5));
    (c.rows||[]).forEach(([s,t0],i)=>{if(t<t0)return;const q=eo(lin(t,t0,t0+.25));const y=-h/2+480+i*100;ctx.save();ctx.globalAlpha*=q;let z=50;while(z>24&&mw(s,z+'px Anton',2)>w-120)z-=2;
      ctx.fillStyle='rgba(27,28,26,.9)';ctx.fillRect(-w/2+50,y-z,w-100,z*1.45);txt(s,0,y+z*.1,z+'px Anton',i?RED:INK,'center',2);ctx.restore();});
    if(c.stampOnu)stampAt('TORTURE PSYCHOLOGIQUE',0,h/2-170,72,t,c.stampOnu,-.07);
    if(c.stampLibre)stampAt('LIBRE',w/2-190,h/2-150,110,t,c.stampLibre,-.14,VERT);
    srcFit(c.src||'',w,h,1);return 1;}
  if(c.k==='manning'){const M=k=>SEGS[ID['m'+k]].t0;framePaper(w,h,'rgba(24,26,24,.97)');txt('D’OÙ VIENNENT LES SECRETS ?',0,-h/2+100,'60px Anton',INK,'center',2);
    if(t>=M(1)){stampAt('LA SOURCE',-w/2+190,-h/2+200,56,t,M(1),-.1);slam('CHELSEA MANNING',0,-h/2+300,'96',RED,t,M(1)+1.9,3,20);
      txt('22 ANS · ANALYSTE DU RENSEIGNEMENT · IRAK',0,-h/2+360,'700 28px Mono',AMB,'center',2,lin(t,M(1)+3.2,M(1)+3.5));}
    if(t>=M(2)){// le CD « Lady Gaga »
      const cx=-170,cy=-h/2+560,R=150,a=(t-M(2))*3;ctx.save();ctx.translate(cx,cy);ctx.rotate(a);const g=ctx.createConicGradient?ctx.createConicGradient(0,0,0):null;
      if(g){g.addColorStop(0,'#c9ccd2');g.addColorStop(.25,'#8fd3ff');g.addColorStop(.5,'#f2c4ff');g.addColorStop(.75,'#c9f2c4');g.addColorStop(1,'#c9ccd2');ctx.fillStyle=g;}else ctx.fillStyle='#c9ccd2';
      ctx.beginPath();ctx.arc(0,0,R,0,6.283);ctx.fill();ctx.fillStyle='#222';ctx.beginPath();ctx.arc(0,0,22,0,6.283);ctx.fill();ctx.restore();
      ctx.save();ctx.translate(cx,cy+R*.45);ctx.rotate(-.08);ctx.fillStyle='rgba(255,255,255,.92)';ctx.fillRect(-110,-26,220,46);txt('LADY GAGA',0,10,'40px Anton','#c2185b','center',3);ctx.restore();
      if(t>=M(2)+1.9)stampAt('SECRET DÉFENSE',cx,cy-20,46,t,M(2)+1.9,-.18);
      txt('UN CD',130,-h/2+500,'70px Anton',INK,'center',2);txt('« DE MUSIQUE »',130,-h/2+570,'54px Anton',AMB,'center',2,lin(t,M(2)+1.8,M(2)+2));}
    if(t>=M(3)){const p=eo(lin(t,M(3),M(3)+.6));ctx.save();ctx.strokeStyle=RED;ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(-w/2+120,h/2-190);ctx.lineTo(-w/2+120+(w-360)*p,h/2-190);ctx.stroke();ctx.restore();
      if(p>=1){ctx.fillStyle='rgba(201,48,44,.95)';ctx.fillRect(w/2-260,h/2-250,210,120);txt('WIKILEAKS',w/2-155,h/2-178,'44px Anton','#fff','center',2);}
      txt('DÉPÔT ANONYME ET CHIFFRÉ',0,h/2-80,'700 32px Mono',AMB,'center',3,lin(t,M(3)+1.8,M(3)+2.1));}
    srcFit('Sources : messages de C. Manning publiés par Wired (2010) · procès de Manning (2013)',w,h);return 1;}
  if(c.k==='vs14'){framePaper(w,h,'rgba(30,32,30,.95)');const X=[-w/4+10,w/4-10];ctx.fillStyle='rgba(236,238,230,.3)';ctx.fillRect(-2,-h/2+60,4,h-120);
    txt('POUR LES UNS',X[0],-h/2+150,'700 30px Mono','rgba(236,238,230,.7)','center',3);slam('JOURNALISTE',X[0],-h/2+300,'78',VERT,t,c.t0+.3,2);txt('DU SIÈCLE',X[0],-h/2+380,'56px Anton',VERT,'center',2,lin(t,c.t0+.5,c.t0+.7));
    if(t>=N(14)+2.4){txt('POUR WASHINGTON',X[1],-h/2+150,'700 30px Mono','rgba(236,238,230,.7)','center',3);slam('ENNEMI',X[1],-h/2+300,'90',RED,t,N(14)+3.4,2);slam('PUBLIC',X[1],-h/2+390,'70',RED,t,N(14)+3.6,2);}return 1;}
  if(c.k==='docs'){framePaper(w,h,'rgba(30,32,30,.95)');txt('WIKILEAKS · 2010',0,-h/2+100,'700 34px Mono',AMB,'center',6);txt('DOCUMENTS SECRETS PUBLIÉS',0,-h/2+180,'64px Anton',INK,'center',2);
    [['AFGHANISTAN',77000,N(13)+2.9],['IRAK',392000,N(13)+3.9],['DIPLOMATIE',251000,N(13)+4.6]].forEach(([s,v,t0],i)=>{if(t<t0)return;const y=-h/2+320+i*125;const q=eo(lin(t,t0,t0+.15));ctx.save();ctx.globalAlpha*=q;ctx.fillStyle='rgba(128,134,126,.25)';ctx.fillRect(-w/2+60,y-70,w-120,105);
      txt(s,-w/2+90,y+10,'56px Anton',INK,'left',3);txt('≈ '+fmtN(v*eo(lin(t,t0,t0+.8))),w/2-90,y+10,'64px Anton',RED,'right',2,1,12);ctx.restore();});
    if(false){const X=[-w/4+10,w/4-10];ctx.fillStyle='rgba(10,10,10,.9)';ctx.fillRect(-w/2+40,h/2-250,w-80,190);
      txt('POUR LES UNS',X[0],h/2-195,'700 26px Mono','rgba(236,238,230,.7)','center',3);txt('JOURNALISTE',X[0],h/2-130,'60px Anton',VERT,'center',2);txt('DU SIÈCLE',X[0],h/2-80,'44px Anton',VERT,'center',2);
      if(t>=N(14)+2.4){txt('POUR WASHINGTON',X[1],h/2-195,'700 26px Mono','rgba(236,238,230,.7)','center',3);slam('ENNEMI',X[1],h/2-130,'60',RED,t,N(14)+3.4,2);slam('PUBLIC',X[1],h/2-80,'44',RED,t,N(14)+3.6,2);}}
    srcFit('Sources : WikiLeaks · The Guardian · New York Times (2010)',w,h);return 1;}
  if(c.k==='arrest'){framePaper(w,h,'rgba(30,32,30,.95)');panel(IM.ambassade,-w/2+30,-h/2+30,w-60,420,.5,1,'grayscale(1) contrast(1.15) brightness(.7)');
    slam('11 AVRIL 2019',0,-h/2+250,'110',INK,t,c.t0+.2,3);stampAt('ASILE RETIRÉ',0,-h/2+380,80,t,N(19)+1.1,-.08);
    if(t>=N(19)+2.4){slam('SORTI DE FORCE',0,-h/2+580,'100',RED,t,N(19)+2.6,3);txt('PAR LA POLICE BRITANNIQUE',0,-h/2+650,'700 32px Mono',AMB,'center',3,lin(t,N(19)+2.8,N(19)+3));}
    srcFit('Photo : Tracey & Doug · CC BY-SA 2.0 · Source : AFP',w,h);return 1;}
  if(c.k==='jours'){framePaper(w,h,'rgba(24,26,24,.97)');txt('BELMARSH',0,-h/2+100,'700 34px Mono',AMB,'center',8);
    const v=Math.round(1901*eo(lin(t,c.t0+.1,c.t0+1.6)));txt(fmtN(v),0,-h/2+330,'230px Anton',INK,'center',3,1,24);txt('JOURS DE CELLULE',0,-h/2+410,'64px Anton',INK,'center',3);
    // traits de comptage gravés
    ctx.strokeStyle='rgba(236,238,230,.35)';ctx.lineWidth=4;const n=Math.floor(40*lin(t,c.t0,c.t0+1.6));for(let i=0;i<n;i++){const gx=-w/2+80+(i%20)*40,gy=-h/2+470+Math.floor(i/20)*70;if(i%5==4){ctx.beginPath();ctx.moveTo(gx-150,gy+40);ctx.lineTo(gx+10,gy+5);ctx.stroke();}else{ctx.beginPath();ctx.moveTo(gx,gy);ctx.lineTo(gx,gy+50);ctx.stroke();}}
    if(t>=N(24)+1.5)band(h/2-230,t,N(24)+1.5,'IL SE MARIE EN PRISON',56,DK,AMB);
    if(t>=N(24)+3)band(h/2-130,t,N(24)+3,'SES 2 FILS GRANDISSENT SANS LUI',52,'rgba(201,48,44,.92)');
    srcFit('Avril 2019 → juin 2024 · presse internationale',w,h);return 1;}
  if(c.k==='quote'){framePaper(w,h,'rgba(14,15,14,.98)');panel(IM.assange,-w/2,-h/2,w,h,.45,1.05,'grayscale(1) brightness(.35) contrast(1.2)');
    txt('APCE · STRASBOURG · 1ER OCTOBRE 2024',0,-h/2+110,'700 28px Mono',AMB,'center',3,lin(t,c.t0,c.t0+.3));
    if(t>=N(27)){const L=['« JE SUIS LIBRE','PARCE QUE J’AI','PLAIDÉ COUPABLE…'];L.forEach((s,i)=>{const t0=N(27)+i*.6;if(t>=t0)txt(s,0,-h/2+360+i*110,'96px Anton',INK,'center',3,lin(t,t0,t0+.15),12);});
      slam('DE JOURNALISME. »',0,-h/2+760,'110',RED,t,N(27)+2.35,3,28);}
    txt('— JULIAN ASSANGE',0,h/2-120,'700 34px Mono','rgba(236,238,230,.8)','center',4,lin(t,N(27)+2.8,N(27)+3.1));
    srcFit('Source : AFP · Al Jazeera (01/10/2024)',w,h);return 1;}
  if(c.k==='balance'){framePaper(w,h,'rgba(24,26,24,.97)');txt('DEUX POIDS,',0,-h/2+130,'100px Anton',INK,'center',3,lin(t,c.t0+.2,c.t0+.4),14);txt('DEUX MESURES.',0,-h/2+240,'100px Anton',RED,'center',3,lin(t,c.t0+.6,c.t0+.8),16);
    const row=(y,a,b,col,t0,big)=>{if(t<t0)return;const q=eo(lin(t,t0,t0+.15));ctx.save();ctx.globalAlpha*=q;ctx.fillStyle='rgba(128,134,126,.22)';ctx.fillRect(-w/2+50,y-80,w-100,130);
      txt(a,-w/2+80,y+5,'700 34px Mono',INK,'left',2);ctx.restore();slam(b,w/2-175,y+15,big||'58',col,t,t0+.35,2);};
    row(-h/2+420,'LA SOURCE · MANNING','7 ANS','#d98a00',N(29)+3.2);
    row(-h/2+580,'CEUX QUI ONT TIRÉ','BLANCHIS',VERT,N(30)+1.6);
    row(-h/2+740,'CEUX QUI ONT MONTRÉ','PRISON',RED,N(31)+1.3);
    srcFit('Sources : armée américaine (2007) · presse (Manning, 2010-2017)',w,h);return 1;}
  if(c.k==='toi'){framePaper(w,h,'rgba(24,26,24,.97)');
    const PW=360,PH=620,px=-PW/2,py=-h/2+90;rr(px-12,py-12,PW+24,PH+24,44);ctx.fillStyle='#111';ctx.fill();ctx.strokeStyle='rgba(236,238,230,.4)';ctx.lineWidth=3;ctx.stroke();
    ctx.save();rr(px,py,PW,PH,34);ctx.clip();panel(IM.balcon,px,py,PW,PH,.6,1.2,'grayscale(.6) brightness(.7)');ctx.restore();
    if(Math.floor(t*2)%2){ctx.fillStyle=RED;ctx.beginPath();ctx.arc(px+40,py+42,13,0,6.283);ctx.fill();}txt('REC',px+64,py+52,'700 28px Mono','#fff','left',2);
    [['TU FILMES.',N(32)+.9],['TU PARTAGES.',N(32)+1.8],['TU MONTRES.',N(32)+2.6]].forEach(([s,t0],i)=>{if(t>=t0)txt(s,0,-h/2+800+i*0,'0px Anton',INK);});
    const cur=t>=N(32)+2.6?'TU MONTRES CE QUE TU VOIS.':t>=N(32)+1.8?'TU PARTAGES.':t>=N(32)+.9?'TU FILMES.':'ET TOI ?';slam(cur,0,-h/2+820,'76',INK,t,t>=N(32)+2.6?N(32)+2.6:t>=N(32)+1.8?N(32)+1.8:t>=N(32)+.9?N(32)+.9:c.t0,3,14);
    if(t>=N(33)+2.1){ctx.fillStyle='rgba(201,48,44,.92)';ctx.fillRect(-w/2+50,h/2-140,w-100,100);txt('LUI L’A PAYÉ DE 14 ANS.',0,h/2-70,'64px Anton','#fff','center',3);}return 1;}
  if(c.k==='q'){framePaper(w,h,'rgba(40,43,40,.92)');txt('DIS-MOI EN COMMENTAIRE ↓',0,-h/2+110,'700 38px Mono',AMB,'center',3);
    slam('JOURNALISTE…',0,-h/2+340,'130',VERT,t,N(35),4,18);slam('OU ESPION ?',0,-h/2+530,'150',RED,t,N(36),4,24);return 1;}
  return 0;}
