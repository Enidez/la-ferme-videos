// ================= L'AUTRE ANGLE #01 — « PATIENT ZÉRO » =================
const T=Object.fromEntries(SEGS.map((s,i)=>[i,s.t0]));
const TE=Object.fromEntries(SEGS.map((s,i)=>[i,s.t1]));
const ICE='#9fd8ff',ICE2='#d8f0ff',GREEN='#A9C79A';
const TCOV=3.0; // fin de la fenêtre de couverture (image fixe)

// caméra figée pendant la couverture
const _camAt=camAt;camAt=(t,f)=>t<TCOV?{x:0,y:0,z:0,roll:0,shx:0,shy:0,ox:0,oy:0}:_camAt(t,f);

// ---------- fond
const BLURC={};
function blurOf(k){if(BLURC[k])return BLURC[k];const im=IM[k];if(!im)return null;const c=document.createElement('canvas');c.width=540;c.height=960;const g=c.getContext('2d');
  const s=Math.max(540/im.width,960/im.height);g.filter='blur(8px) grayscale(1)';g.drawImage(im,270-im.width*s/2,480-im.height*s/2,im.width*s,im.height*s);return BLURC[k]=c;}
const BGK=[[0,'cover'],[T[3]-.1,null],[T[11]-.1,'pancarte'],[T[16]-.1,null],[T[22]-.1,'lacrymo'],[T[27]-.1,null],[T[32]-.1,'foule']];
function background(t){
  ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle=BG;ctx.fillRect(0,0,W,H);
  ctx.save();layer(700);const g=ctx.createRadialGradient(540,800,50,540,960,1500);g.addColorStop(0,'rgba(36,38,37,1)');g.addColorStop(1,'rgba(6,8,7,1)');ctx.fillStyle=g;ctx.fillRect(-1200,-1500,3480,4920);
  ctx.strokeStyle='rgba(236,238,230,.045)';ctx.lineWidth=2;for(let x=-1200;x<2400;x+=120){ctx.beginPath();ctx.moveTo(x,-1500);ctx.lineTo(x,3400);ctx.stroke();}ctx.restore();
  let i=0;while(i<BGK.length-1&&t>=BGK[i+1][0])i++;
  const draw=(k,a)=>{if(!k)return;const c=blurOf(k);if(!c||a<=0)return;ctx.save();ctx.globalAlpha=a;layer(700);ctx.translate(540,960);ctx.scale(2.6,2.6);ctx.drawImage(c,-540,-960,1080,1920);ctx.restore();};
  const x=lin(t,BGK[i][0],BGK[i][0]+.6);if(i>0&&x<1)draw(BGK[i-1][1],.2*(1-x));draw(BGK[i][1],.2*(i>0?x:1));
  ctx.save();ctx.globalCompositeOperation='lighter';const lx=W*(.2+.6*(.5+.5*Math.sin(t*.17))),ly=H*(.3+.25*Math.sin(t*.12+1));
  const g2=ctx.createRadialGradient(lx,ly,0,lx,ly,700);g2.addColorStop(0,`rgba(255,160,110,${.05+.02*Math.sin(t*1.2)})`);g2.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g2;ctx.fillRect(0,0,W,H);ctx.restore();
}
function clipCard(t,t0,t1,key,o){const fr=(window.CLIPS&&CLIPS[key])||[];if(!fr.length)return;
  const n=fr.length;const i=Math.min(n-1,Math.max(0,Math.floor((t-t0+(o.offset||0))*30)));const im=fr[i];
  card(t,t0,t1,Object.assign({op:1,rot:o.rot??-1.5,from:o.from||'right',z:o.z??80,drift:.3,draw:(w,h)=>{
    ctx.fillStyle='#000';ctx.fillRect(-w/2,-h/2,w,h);if(im){const s=Math.max(w/im.width,h/im.height);ctx.drawImage(im,-im.width*s/2,-im.height*s/2,im.width*s,im.height*s);}
    const g=ctx.createLinearGradient(0,-h/2,0,-h/2+120);g.addColorStop(0,'rgba(0,0,0,.6)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,120);
    ctx.font='700 26px Mono';const lw=ctx.measureText(o.handle).width+36;ctx.fillStyle='rgba(6,8,7,.85)';ctx.fillRect(-w/2+18,-h/2+18,lw,44);txt(o.handle,-w/2+36,-h/2+49,'700 26px Mono',INK,'left',1);
    txt('TikTok',w/2-24,-h/2+49,'700 24px Mono','rgba(236,238,230,.7)','right',2);
    if(o.badge){ctx.font='700 26px Mono';const bw=ctx.measureText(o.badge).width+36;ctx.fillStyle=o.badgeCol||RED;ctx.fillRect(-bw/2,h/2-70,bw,46);txt(o.badge,0,h/2-37,'700 26px Mono','#fff','center',2);}
  }},o));}
function slab(w,h,col='rgba(24,27,26,.96)'){ctx.fillStyle=col;ctx.fillRect(-w/2,-h/2,w,h);}
function node(x,y,w,h,label,t,t0,t1,o={}){const a=vis(t,t0,t1,.15,.25);if(a<=0)return;const p=eback(lin(t,t0,t0+.4));
  ctx.save();ctx.globalAlpha*=a;ctx.translate(x,y);ctx.scale(.6+.4*p,.6+.4*p);ctx.fillStyle='rgba(24,27,26,.95)';ctx.fillRect(-w/2,-h/2,w,h);ctx.strokeStyle='rgba(236,238,230,.55)';ctx.lineWidth=2;ctx.strokeRect(-w/2,-h/2,w,h);
  txt(label,0,12,`700 ${o.size||32}px Mono`,INK,'center',2);
  if(o.stamp&&t>=o.stampT){const sp=lin(t,o.stampT,o.stampT+.15);ctx.save();ctx.globalAlpha*=sp;ctx.translate(0,h/2+18);ctx.rotate(-.06);ctx.scale(1.5-.5*sp,1.5-.5*sp);const f='700 26px Mono';const sw=mw(o.stamp,f,3)+28;
    ctx.fillStyle='rgba(6,8,7,.85)';ctx.fillRect(-sw/2,-22,sw,40);ctx.strokeStyle=RED;ctx.lineWidth=4;ctx.strokeRect(-sw/2,-22,sw,40);txt(o.stamp,0,8,f,RED,'center',3);ctx.restore();}
  ctx.restore();}
function link(t,t0,x1,y1,x2,y2,t1,col='rgba(236,238,230,.45)'){const a=vis(t,t0,t1,.02,.25);if(a<=0)return;const p=eo(lin(t,t0,t0+.35));ctx.save();ctx.globalAlpha*=a;ctx.strokeStyle=col;ctx.lineWidth=4;ctx.setLineDash([12,8]);ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x1+(x2-x1)*p,y1+(y2-y1)*p);ctx.stroke();ctx.restore();}
function phone(w,h,t){ // téléphone reconstitué, visage et pseudo floutés
  ctx.fillStyle='#0c0d0d';ctx.fillRect(-w/2,-h/2,w,h);ctx.strokeStyle='rgba(236,238,230,.5)';ctx.lineWidth=6;ctx.strokeRect(-w/2+6,-h/2+6,w-12,h-12);
  const g=ctx.createLinearGradient(0,-h/2,0,h/2);g.addColorStop(0,'#2a2c2b');g.addColorStop(1,'#141615');ctx.fillStyle=g;ctx.fillRect(-w/2+18,-h/2+18,w-36,h-36);
  // silhouette floutée
  ctx.save();ctx.filter='blur(14px)';ctx.fillStyle='#6f736f';ctx.beginPath();ctx.arc(0,-60,90,0,6.283);ctx.fill();ctx.fillRect(-150,40,300,260);ctx.restore();
  txt('RECONSTITUTION',0,-h/2+60,'700 22px Mono','rgba(236,238,230,.55)','center',4);
  ctx.save();ctx.filter='blur(6px)';ctx.fillStyle='#9a9e99';ctx.fillRect(-w/2+40,h/2-190,200,30);ctx.restore();
  txt('chaud ou pas chaud',-w/2+40,h/2-120,'700 30px Osw',INK,'left',1);
  txt('♥  2,9 M      ↗  48 K',-w/2+40,h/2-70,'400 24px Mono','rgba(236,238,230,.7)','left',1);
}
function wheel(x,y,r,rot){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.strokeStyle=INK;ctx.lineWidth=18;ctx.beginPath();ctx.arc(0,0,r,0,6.283);ctx.stroke();
  ctx.lineWidth=14;for(const a of[Math.PI/2,Math.PI*7/6,-Math.PI/6]){ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);ctx.stroke();}
  ctx.fillStyle=INK;ctx.beginPath();ctx.arc(0,0,r*.22,0,6.283);ctx.fill();ctx.restore();}
function satMap(w,h,t,t0){ // vue aérienne schématique, zone floutée
  ctx.fillStyle='#2b2e2c';ctx.fillRect(-w/2,-h/2,w,h);const r=rng(4);
  ctx.save();ctx.beginPath();ctx.rect(-w/2,-h/2,w,h);ctx.clip();
  for(let i=0;i<70;i++){ctx.fillStyle=`rgba(${120+r()*60},${125+r()*55},${118+r()*50},.55)`;ctx.fillRect(-w/2+r()*w,-h/2+r()*h,30+r()*90,30+r()*70);}
  ctx.strokeStyle='rgba(20,22,21,.9)';ctx.lineWidth=14;[[-w/2,-60,w/2,-20],[-w/2,120,w/2,160],[-90,-h/2,-60,h/2],[160,-h/2,190,h/2]].forEach(([a,b,c,d])=>{ctx.beginPath();ctx.moveTo(a,b);ctx.lineTo(c,d);ctx.stroke();});
  const px=lin(t,t0+.2,t0+.8);const bw=220,bh=170,bx=-20,by=10;const cell=Math.round(26-14*(1-px));
  for(let yy=0;yy<bh;yy+=cell)for(let xx=0;xx<bw;xx+=cell){const v=100+((xx*7+yy*13)%40);ctx.fillStyle=`rgb(${v},${v+3},${v})`;ctx.fillRect(bx-bw/2+xx,by-bh/2+yy,cell,cell);}
  ctx.restore();txt('55, RUE DU FAUBOURG-SAINT-HONORÉ',-w/2+24,h/2-24,'400 22px Mono','rgba(236,238,230,.75)','left',2);
}

// ---------- coupes
CUTS=[0,TCOV,T[2]-.05,T[3]-.1,T[6]-.05,T[8]-.05,T[11]-.1,T[16]-.1,T[17]+.05,T[19]-.1,T[22]-.1,T[25]-.1,T[27]-.1,T[30]-.1,T[32]-.1,T[34]-.1,VEND+.3,DUR+1];

// ---------- sons
ev(.02,'boom');ev(TCOV-.05,'whoosh');ev(T[2]-.3,'whoosh');ev(T[17]-.25,'whoosh');ev(T[13]-.1,'click');reveal(TCOV,.9);
for(let i=0;i<20;i++)ev(T[2]+.3+i*.05,'type');tileSounds('PATIENT ZÉRO',T[2]+1.4,.06);
ev(T[3]-.1,'whoosh');ev(T[3],'click');ev(T[4],'thud');ev(T[5],'tick');tileSounds('CHAUD OU PAS CHAUD ?',T[7]-.2,.035);reveal(T[7],1.1);
ev(T[8],'click');ev(T[9],'riser');ev(T[10]+.9,'thud');
ev(T[11],'hit');[12,13,14,15].forEach((i,k)=>{ev(T[i],'click');ev(T[i]+.9,'tick');});
ev(T[16]-.1,'whoosh');ev(T[16],'click');reveal(T[17]+.6,1.1);ev(T[18],'tick');
ev(T[19]-.1,'whoosh');[0,1,2].forEach(k=>ev(T[19]+.4+k*.4,'click'));ev(T[20],'thud');reveal(T[21],1);
for(let i=0;i<16;i++)ev(T[22]+i*.05,'type');tileSounds('SANS ORGANISATEUR',T[23],.03);tileSounds('SANS RESPONSABLE',T[23]+2.2,.03);reveal(T[24]+1.9,1.4);
ev(T[25],'riser');reveal(T[26]+1.6,1.1);
ev(T[27]-.1,'whoosh');ev(T[27],'click');ev(T[28],'thud');ev(T[29],'whoosh');ev(T[29]+2,'tick');ev(T[29]+2.8,'tick');
ev(T[30],'hit');ev(T[31],'hit');
ev(T[32],'thud');ev(T[32]+1.4,'thud');reveal(T[33],1.3);
tileSounds('CHAUD OU PAS CHAUD ?',T[34]+.2,.035);ev(T[35],'click');ev(VEND+.35,'boom');

function scene(t){
  // 0. COUVERTURE (0–3 s) : photo plein écran, titre simple
  if(t<TCOV+.45){
    const fly=lin(t,TCOV,TCOV+.45);
    ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1-fly;
    const im=IM.cover;if(im){const s=1+.012*t+fly*.6;ctx.translate(540,960);ctx.scale(s,s);ctx.drawImage(im,-540,-960,1080,1920);ctx.setTransform(1,0,0,1,0,0);}
    const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'rgba(0,0,0,.55)');g.addColorStop(.42,'rgba(0,0,0,.05)');g.addColorStop(.75,'rgba(0,0,0,.25)');g.addColorStop(1,'rgba(0,0,0,.8)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    txt('L’AUTRE ANGLE',540,420,'700 34px Mono',INK,'center',12);
    txt('SAMEDI 17.',540,640,'186px Anton',INK,'center',4,1,30);
    txt('Chabe01 · CC BY-SA 4.0',60,1450,'400 20px Mono','rgba(236,238,230,.6)','left');
    ctx.restore();
  }
  // 1. qui les a appelés ? → patient zéro
  if(t>=TCOV&&t<T[3]){const E=T[3]-.05;
    if(t<T[2]){clipCard(t,TCOV+.1,T[2]-.05,'genz',{x:540,y:800,w:440,h:782,handle:'@17octobre2026',z:80});
      glowText('QUI LES A APPELÉS ?',540,330,78,t,TCOV+.4,T[2]-.05,INK);}
    if(t>=T[2]){typed(t,T[2]+.3,E,'ON A REMONTÉ LE FIL…',540,980,'700 46px Mono',INK,.9);tiles(t,'PATIENT ZÉRO',540,1130,{t0:T[2]+1.4,step:.06,h:96,gap:6,t1:E});}
  }
  // 2. le patient zéro
  if(t>=T[3]-.15&&t<T[6]){const E=T[6]-.05;
    clipCard(t,T[3]-.1,E,'v2',{x:540,y:780,w:440,h:782,handle:'@v2.95',z:120,rot:-1.6,badge:'VISAGE FLOUTÉ PAR LA FERME',badgeCol:'rgba(6,8,7,.85)'});
    tag(540,320,420,76,'7 SEPT. 2026',t,T[3],T[5],{size:40,col:AMB,stroke:AMB});
    if(t>=T[4])stampRed(t,T[4]+.3,E,'COMPTE INCONNU',540,620,64,-.08);
    if(t>=T[5])tag(540,320,640,76,'UN JEUNE · PLUTÔT BRANCHÉ FOOT',t,T[5],E,{size:32});
  }
  // 3. « chaud ou pas chaud ? » + samedi de vacances + vues + il n'organise rien
  if(t>=T[6]-.1&&t<T[11]){const E=T[11]-.05;
    if(t<T[8]){typed(t,T[6]-.05,T[8],'UNE SEULE QUESTION :',540,560,'700 46px Mono',INK,.7);
      tiles(t,'CHAUD OU',540,760,{t0:T[7]-.2,step:.035,h:110,gap:8,t1:T[8]});tiles(t,'PAS CHAUD ?',540,920,{t0:T[7]+.1,step:.035,h:100,gap:6,t1:T[8],hot:[10],hotT:T[7]+.5});}
    else{
      card(t,T[8]-.05,E,{x:540,y:620,w:760,h:380,rot:1.4,op:1,from:'left',exit:'left',z:140,drift:.4,draw:(w,h)=>{paper(w,h,[['OCTOBRE 2026',70,'700 30px Mono','#555'],['SAMEDI 17',180,'110px Anton','#111'],['1er jour des vacances de la Toussaint',270,'400 30px Mono','#333']]);}});
      if(t>=T[9]){const v=Math.round(2000000*eo(lin(t,T[9]+.2,T[9]+1.8)));txt(v.toLocaleString('fr-FR')+'+',540,980,'120px Anton',INK,'center',2,vis(t,T[9],E),16);txt('VUES',540,1050,'700 36px Mono','rgba(236,238,230,.75)','center',8,vis(t,T[9]+.3,E));}
      if(t>=T[10]+.9)stampRed(t,T[10]+.9,E,'ORGANISATEUR : AUCUN',540,1190,60,-.06);
    }
  }
  // 4. qui a pris le volant ? arbre de propagation
  if(t>=T[11]-.15&&t<T[16]){const E=T[16]-.05;
    glowText('QUI A PRIS LE VOLANT ?',540,340,74,t,T[11],E,INK);
    node(540,500,360,90,'LA VIDÉO',t,T[11]+.3,E,{size:36});
    const N=[[290,760,'COMPTES « OFFICIELS »',12,'AUTOPROCLAMÉS'],[790,760,'AFFICHES',13,'GÉNÉRÉES PAR IA'],[290,1040,'CARTES DES RASSEMBLEMENTS',14,'AUCUNE SOURCE'],[790,1040,'VOIX DE JOURNALISTES',15,'IMITÉES']];
    N.forEach(([x,y,l,i,s])=>{link(t,T[i]-.1,540,545,x,y-45,E);node(x,y,460,96,l,t,T[i],E,{size:l.length>20?24:30,stamp:s,stampT:T[i]+.9});});
    if(t>=T[13]-.1&&t<T[14])clipCard(t,T[13]-.1,T[14],'ia',{x:540,y:800,w:440,h:782,handle:'@dhbai.r',z:-60,rot:2,from:'bottom',badge:'GÉNÉRÉ PAR IA'});
  }
  // 5. l'Élysée flouté
  if(t>=T[16]-.15&&t<T[19]){const E=T[19]-.05;
    if(t<T[17]+.1)clipCard(t,T[16]-.1,T[17]+.05,'elysee',{x:540,y:800,w:440,h:782,handle:'@unmomentactu',z:80,badge:'LA RUMEUR',badgeCol:AMB});
    if(t>=T[17])card(t,T[17]+.05,E,{x:540,y:700,w:820,h:620,rot:-1.2,op:1,from:'right',z:140,drift:.4,draw:(w,h,tt)=>satMap(w,h,tt,T[17])});
    tag(540,330,800,80,'« L’ÉLYSÉE FLOUTÉ POUR SAMEDI »',t,T[16]+.3,E,{size:34,col:AMB,stroke:AMB});
    if(t>=T[17]+.6){stampRed(t,T[17]+.6,E,'DÉJÀ FLOUTÉ EN 2021',540,1100,72,-.06);txt('preuve : publication datée du 4 août 2021',540,1200,'400 26px Mono','rgba(236,238,230,.7)','center',0,vis(t,T[17]+1,E));}
    if(t>=T[18])txt('RIEN À VOIR AVEC TOI.',540,1265,'700 40px Mono',INK,'center',4,vis(t,T[18],E));
  }
  // 6. les partis prennent le volant
  if(t>=T[19]-.15&&t<T[22]){const E=T[22]-.05;
    const a=vis(t,T[19],E);ctx.save();ctx.globalAlpha*=a;wheel(540,760,190,Math.sin(t*2)*.25);ctx.restore();
    [['LFI',240,520],['PS',840,520],['PCF',540,1060]].forEach(([s,x,y],k)=>{const t0=T[19]+.4+k*.4;tag(x,y,200,80,s,t,t0,E,{size:40});link(t,t0,x,y+(y>760?-40:40),540+(x-540)*.35,760+(y-760)*.35,E,RED);});
    txt('PRÊTS À SOUTENIR LE MOUVEMENT',540,330,'700 34px Mono','rgba(236,238,230,.8)','center',4,vis(t,T[19]+1.6,T[20]));
    if(t>=T[20])glowText('TOUT LE MONDE VEUT CONDUIRE…',540,330,62,t,T[20],E);
    if(t>=T[21])glowText('SAUF CELUI QUI L’A LANCÉE.',540,1220,66,t,T[21],E,RED);
  }
  // 7. sans organisateur = sans responsable → c'est toi
  if(t>=T[22]-.15&&t<T[25]){const E=T[25]-.05;
    if(t<T[23])typed(t,T[22],T[23],'MAIS LE PLUS IMPORTANT N’EST PAS LÀ.',540,880,'700 40px Mono',INK,.9,2);
    else if(t<T[24]+1.8){tiles(t,'SANS ORGANISATEUR',540,620,{t0:T[23],step:.03,h:62,gap:4,t1:T[24]+1.8});txt('=',540,820,'110px Anton',RED,'center',0,vis(t,T[23]+2,T[24]+1.8),20);tiles(t,'SANS RESPONSABLE',540,1000,{t0:T[23]+2.2,step:.03,h:62,gap:4,t1:T[24]+1.8});}
    else{glowText('C’EST TOI',540,780,190,t,T[24]+1.9,E,RED);glowText('QU’ON INTERPELLE.',540,930,100,t,T[24]+2.05,E);}
  }
  // 8. gardes à vue, mineurs
  if(t>=T[25]-.15&&t<T[27]){const E=T[27]-.05;
    const v=Math.round(6877*eo(lin(t,T[25]+.3,T[25]+2)));txt(v.toLocaleString('fr-FR'),540,560,'200px Anton',INK,'center',2,vis(t,T[25],E),20);
    txt('GARDES À VUE DEPUIS LE DÉBUT DU MOUVEMENT',540,650,'700 30px Mono','rgba(236,238,230,.8)','center',3,vis(t,T[25]+.4,E));
    if(t>=T[26]){for(let k=0;k<10;k++){const x=540+(k%5-2)*150,y=k<5?860:1070;const hot=k<9&&t>=T[26]+.3+k*.12;ctx.save();ctx.globalAlpha*=vis(t,T[26]+k*.05,E);person(x,y+60,.7,hot?RED:'rgba(236,238,230,.45)');ctx.restore();}
      if(t>=T[26]+1.6)glowText('86 % DE MINEURS',540,1250,72,t,T[26]+1.6,E,RED);}
    source(t,T[25]+.6,E,'Source : ICI, au 8 octobre 2026',1400);
  }
  // 9. le fichier de police
  if(t>=T[27]-.15&&t<T[30]){const E=T[30]-.05;
    card(t,T[27]-.1,E,{x:540,y:600,w:820,h:520,rot:1.2,op:1,from:'right',exit:'left',z:140,drift:.4,draw:(w,h,tt)=>{
      ctx.fillStyle='#d9d6cc';ctx.fillRect(-w/2,-h/2,w,h);txt('FICHIER DE POLICE',-w/2+36,-h/2+70,'60px Anton','#111','left',2);txt('traitement d’antécédents judiciaires',-w/2+36,-h/2+115,'400 26px Mono','#444','left');
      [['NOM','████████'],['MOTIF','manifestation'],['SUITE','classement sans suite']].forEach(([a,b],i)=>{const t0=T[27]+.8+i*.6;if(tt<t0)return;const y=-h/2+200+i*85;ctx.save();ctx.globalAlpha*=lin(tt,t0,t0+.2);
        ctx.fillStyle='rgba(0,0,0,.06)';ctx.fillRect(-w/2+24,y-50,w-48,70);txt(a,-w/2+40,y,'700 30px Mono','#555','left',3);txt(b,-w/2+260,y,'700 32px Mono','#111','left',1);ctx.restore();});}});
    if(t>=T[28])stampRed(t,T[28],E,'PAS D’EFFACEMENT AUTOMATIQUE',540,940,50,-.05);
    if(t>=T[29]){txt('2026',260,1090,'80px Anton',INK,'center',2,vis(t,T[29],E));link(t,T[29]+.2,340,1065,720,1065,E,RED);txt('2032',820,1090,'80px Anton',RED,'center',2,vis(t,T[29]+.6,E),16);
      tag(380,1170,280,62,'CONCOURS',t,T[29]+2,E,{size:30});tag(700,1170,280,62,'MÉTIER',t,T[29]+2.8,E,{size:30});}
  }
  // 10. pas une raison de rester chez toi
  if(t>=T[30]-.15&&t<T[32]){const E=T[32]-.05;
    glowText('CE N’EST PAS UNE RAISON',540,640,80,t,T[30],E);glowText('POUR RESTER CHEZ TOI.',540,740,80,t,T[30]+.2,E);
    if(t>=T[31]){glowText('C’EST UNE RAISON POUR SAVOIR',540,950,62,t,T[31],E,AMB);glowText('OÙ TU METS LES PIEDS.',540,1040,62,t,T[31]+.2,E,AMB);}
  }
  // 11. pas de chef — juste toi
  if(t>=T[32]-.15&&t<T[34]){const E=T[34]-.05;
    if(t<T[33]){typed(t,T[32]+.2,T[33],'SAMEDI.',540,700,'700 56px Mono',INK,.3,6);typed(t,T[32]+.9,T[33],'PAS DE CHEF.',540,800,'700 56px Mono',INK,.4,6);typed(t,T[32]+1.8,T[33],'PAS D’ORGANISATEUR.',540,900,'700 56px Mono',INK,.6,4);}
    else glowText('JUSTE TOI.',540,900,220,t,T[33],E,INK);
  }
  // 12. chaud ou pas chaud ?
  if(t>=T[34]-.1&&t<VEND+.35){const E=VEND+.35;
    tiles(t,'CHAUD OU',540,640,{t0:T[34]+.2,step:.035,h:110,gap:8,t1:E});tiles(t,'PAS CHAUD ?',540,800,{t0:T[34]+.5,step:.035,h:100,gap:6,t1:E,hot:[10],hotT:T[34]+.9});
    if(t>=T[35]){txt('DIS-LE EN COMMENTAIRE ↓',540,1030,'700 44px Mono',AMB,'center',4,vis(t,T[35],E),10);txt('ET ENVOIE ÇA À CELUI QUI Y VA',540,1110,'700 36px Mono',INK,'center',3,vis(t,T[35]+1.2,E));}
  }
  // 13. carton de fin
  if(t>=VEND+.3){
    glowText('L’AUTRE',540,640,150,t,VEND+.35,1e9);glowText('ANGLE',540,820,200,t,VEND+.4,1e9,RED);
    txt('LA FERME',540,960,'700 34px Mono',DIM,'center',12,lin(t,VEND+.7,VEND+1));
    txt('ABONNE-TOI',540,1100,'64px Anton',INK,'center',4,lin(t,VEND+1.1,VEND+1.4),16);
    txt('Sources : StreetPress · franceinfo · France 24 · ICI',540,1300,'400 24px Mono','rgba(236,238,230,.7)','center',0,lin(t,VEND+1.5,VEND+1.9));
    txt('Musique : « Hitman », Kevin MacLeod (incompetech.com) · CC BY 4.0',540,1400,'400 20px Mono','rgba(236,238,230,.55)','center',0,lin(t,VEND+1.5,VEND+1.9));
  }
}

const MB=document.createElement('canvas');MB.width=W;MB.height=H;
window.renderFrame=f=>{
  const t=f/FPS;
  CAM=camAt(t,f);
  background(t);
  ctx.save();layer(0);scene(t);ctx.restore();ctx.setTransform(1,0,0,1,0,0);
  const pv=camAt(Math.max(0,t-1/FPS),f-1);const v=CAM.x-pv.x;if(Math.abs(v)>20){MB.getContext('2d').clearRect(0,0,W,H);MB.getContext('2d').drawImage(cv,0,0);ctx.save();ctx.globalAlpha=.32;ctx.drawImage(MB,-v*.45,0);ctx.drawImage(MB,-v*.22,0);ctx.restore();}
  if(t>=TCOV&&t<VEND)subs(t);
  postfx(t);flash(t);
};
