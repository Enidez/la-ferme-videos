// ================= ÉPISODE 2 — « Le ciel suspendu » =================
const T=Object.fromEntries(SEGS.map((s,i)=>[i,s.t0]));
const TE=Object.fromEntries(SEGS.map((s,i)=>[i,s.t1]));

// fond : photo floue N&B qui change selon l'acte (calque lointain)
const BGK=[[0,'af'],[T[15]-.1,'tgv'],[T[28]-.1,'roquelaure'],[T[33]-.1,'ader3'],[T[38]-.1,'af'],[T[48]-.1,'tgv']];
const BLUR={};
function blurOf(k){if(BLUR[k])return BLUR[k];const im=IM[k];if(!im)return null;const c=document.createElement('canvas');c.width=540;c.height=960;const g=c.getContext('2d');
  const s=Math.max(540/im.width,960/im.height);g.filter='blur(7px) grayscale(1) contrast(1.1)';g.drawImage(im,270-im.width*s/2,480-im.height*s/2,im.width*s,im.height*s);return BLUR[k]=c;}
function background(t,fa=.2){
  ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle=BG;ctx.fillRect(0,0,W,H);
  let i=0;while(i<BGK.length-1&&t>=BGK[i+1][0])i++;
  const draw=(k,a)=>{const c=blurOf(k);if(!c||a<=0)return;ctx.save();ctx.globalAlpha=a;layer(700);ctx.translate(540,960);ctx.scale(2.3,2.3);ctx.drawImage(c,-540,-960,1080,1920);ctx.restore();};
  const x=lin(t,BGK[i][0],BGK[i][0]+.6);
  if(i>0&&x<1)draw(BGK[i-1][1],fa*(1-x));
  draw(BGK[i][1],fa*(i>0?x:1));
  ctx.save();ctx.globalCompositeOperation='lighter';
  const lx=W*(.15+.7*(.5+.5*Math.sin(t*.21))),ly=H*(.25+.3*Math.sin(t*.13+1));
  const g=ctx.createRadialGradient(lx,ly,0,lx,ly,700);g.addColorStop(0,`rgba(255,170,90,${.07+.04*Math.sin(t*1.3)})`);g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.restore();
}

// ---------- éléments dessinés
const FLAP='ABCDEFGHIJKLMNOPQRSTUVWXYZÀÉ0123456789';
function flapText(s,t,t0,seed){ // texte à palettes : brassage puis valeur finale
  if(t>=t0+.28)return s;const r=rng(seed+Math.floor(t*30));return [...s].map(c=>c==' '?' ':FLAP[Math.floor(r()*FLAP.length)]).join('');
}
const ROWS=[['07:15','NICE'],['07:40','MARSEILLE'],['08:05','TOULOUSE'],['08:30','AJACCIO'],['09:10','BIARRITZ'],['09:45','POINTE-À-PITRE']];
function board(w,h,t,stat){
  ctx.fillStyle='#0b0d0c';ctx.fillRect(-w/2,-h/2,w,h);
  txt('DÉPARTS',-w/2+34,-h/2+64,'700 40px Mono',AMB,'left',8);
  txt('SAMEDI 17 OCT.',w/2-34,-h/2+64,'700 28px Mono','rgba(236,238,230,.6)','right',3);
  const rh=(h-110)/ROWS.length;
  ROWS.forEach(([hh,dest],i)=>{const y=-h/2+100+i*rh;
    ctx.fillStyle=i%2?'rgba(255,255,255,.03)':'rgba(255,255,255,.06)';ctx.fillRect(-w/2+16,y,w-32,rh-8);
    const [s,col,t0]=stat(i);
    txt(hh,-w/2+34,y+rh*.62,'700 34px Mono','rgba(236,238,230,.85)','left',2);
    txt(dest,-w/2+170,y+rh*.62,'700 34px Mono',INK,'left',2);
    txt(flapText(s,t,t0,i*17),w/2-34,y+rh*.62,'700 34px Mono',col,'right',3,1,col==RED?10:0);});
}
function paper(w,h,lines,stamp){
  ctx.fillStyle='#d9d6cc';ctx.fillRect(-w/2,-h/2,w,h);
  lines.forEach(([s,y,font,col,al])=>txt(s,al=='left'?-w/2+40:0,-h/2+y,font,col||'#1a1a1a',al||'center'));
  if(stamp){ctx.save();ctx.translate(stamp[1],stamp[2]);ctx.rotate(-.14);ctx.strokeStyle=RED;ctx.lineWidth=5;const sw=mw(stamp[0],'700 32px Mono',4)+40;ctx.strokeRect(-sw/2,-34,sw,62);txt(stamp[0],0,12,'700 32px Mono',RED,'center',4);ctx.restore();}
}
function stampBig(t,t0,t1,s,x,y,size=96,rot=-.12){
  const a=vis(t,t0,t1,.02,.25);if(a<=0)return;const p=lin(t,t0,t0+.16);const sc=1.6-.6*eo(p);
  ctx.save();ctx.globalAlpha*=a*cl(p*3);ctx.translate(x,y);ctx.rotate(rot);ctx.scale(sc,sc);
  const f=size+'px Anton';const sw=mw(s,f,4)+60;ctx.strokeStyle=RED;ctx.lineWidth=10;ctx.shadowColor='rgba(255,40,30,.6)';ctx.shadowBlur=18;
  ctx.strokeRect(-sw/2,-size*.78,sw,size*1.15);txt(s,0,size*.18,f,RED,'center',4);ctx.restore();
}
function planeIcon(x,y,s,col){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle=col;ctx.beginPath();
  ctx.moveTo(-60,4);ctx.lineTo(50,-4);ctx.quadraticCurveTo(66,0,50,4);ctx.lineTo(-60,10);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(-5,0);ctx.lineTo(-30,-40);ctx.lineTo(-18,-40);ctx.lineTo(20,0);ctx.lineTo(-18,40);ctx.lineTo(-30,40);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(-52,4);ctx.lineTo(-64,-16);ctx.lineTo(-56,-16);ctx.lineTo(-42,4);ctx.closePath();ctx.fill();ctx.restore();}
function trainIcon(x,y,s,col){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle=col;ctx.beginPath();
  ctx.moveTo(-70,20);ctx.lineTo(-70,-14);ctx.quadraticCurveTo(-70,-24,-56,-24);ctx.lineTo(30,-24);ctx.quadraticCurveTo(66,-20,74,16);ctx.lineTo(74,20);ctx.closePath();ctx.fill();
  ctx.fillStyle=BG;for(let i=0;i<4;i++)ctx.fillRect(-58+i*24,-16,16,12);ctx.fillStyle=col;ctx.fillRect(-76,26,156,5);ctx.restore();}
function box(x,y,w,h,label,t,t0,t1,col=INK,hot=false){const a=vis(t,t0,t1,.15,.25);if(a<=0)return;const p=eo(lin(t,t0,t0+.3));
  ctx.save();ctx.globalAlpha*=a;ctx.translate(x,y+(1-p)*30);ctx.fillStyle=hot?'rgba(232,35,31,.35)':'rgba(128,134,126,.28)';ctx.fillRect(-w/2,-h/2,w,h);
  ctx.strokeStyle=hot?RED:'rgba(236,238,230,.5)';ctx.lineWidth=hot?4:2;ctx.strokeRect(-w/2,-h/2,w,h);txt(label,0,14,'700 38px Mono',col,'center',4,1,10);ctx.restore();}
function line2(t,t0,x1,y1,x2,y2,t1=99,col=RED){const a=vis(t,t0,t1,.02,.25);if(a<=0)return;const p=eo(lin(t,t0,t0+.35));
  ctx.save();ctx.globalAlpha*=a;ctx.strokeStyle=col;ctx.lineWidth=7;ctx.shadowColor='rgba(255,40,30,.7)';ctx.shadowBlur=14;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x1+(x2-x1)*p,y1+(y2-y1)*p);ctx.stroke();ctx.restore();}
function typed(t,t0,t1,s,x,y,font,col='rgba(236,238,230,.85)',dur=.6,ls=4){const n=Math.floor(s.length*lin(t,t0,t0+dur));txt(s.slice(0,n),x,y,font,col,'center',ls,vis(t,t0,t1));}

// ---------- découpage en scènes (coupes caméra)
CUTS=[0,T[2]-.1,T[4]-.1,T[8]-.1,T[12]-.05,T[15]-.08,T[17]-.1,T[21]-.05,T[23]-.1,T[27]-.05,T[33]-.05,T[38]-.05,T[43]-.05,T[48]-.05,VEND+.3,DUR+1];

// ---------- sons & révélations
ev(.02,'boom');for(let i=0;i<6;i++)ev(.28+i*.03,'type');
ROWS.forEach((r,i)=>ev(TE[1]-.6+i*.12,'tick'));reveal(TE[1]-.6,.8);
tileSounds('5',T[2],.1);[0,1,2,3,4].forEach(i=>ev(T[3]+.15+i*.28,'thud'));
ev(T[4]-.1,'whoosh');ev(T[4],'click');ev(T[5],'tick');ev(T[6],'hit');ev(T[7],'tick');
tileSounds('9',T[8]+.35,.1);tileSounds('OCTOBRE',T[8]+.5,.05);reveal(T[9]+.6,1.1);ev(T[10],'hit');ev(T[11],'thud');
for(let i=0;i<14;i++)ev(T[12]+i*.05,'type');ev(T[13]+.2,'tick');ev(T[14],'riser');
reveal(T[15],1.3);ev(T[15]-.05,'whoosh');ev(T[16]+.8,'whoosh');ev(T[16]+.85,'click');
ev(T[17]-.1,'whoosh');ev(T[17],'click');ev(T[17]+3.2,'tick');ev(T[18]+.6,'thud');ev(T[19],'tick');ev(T[20],'tick');
reveal(T[21],1);for(let i=0;i<12;i++)ev(T[22]+i*.05,'type');ev(T[23]-.1,'whoosh');ev(T[23],'click');ev(T[24],'tick');reveal(T[25]+.6,1);ev(T[26],'hit');
for(let i=0;i<14;i++)ev(T[27]+i*.06,'type');ev(T[28]-.1,'whoosh');ev(T[28],'click');ev(T[29],'thud');ev(T[30],'tick');reveal(T[31],1);ev(T[32],'hit');
tileSounds('9',T[33]+.4,.1);tileSounds('OCTOBRE',T[33]+.55,.05);ev(T[34]-.1,'whoosh');ev(T[34],'click');reveal(T[34]+1.5,1);ev(T[35]+.9,'whoosh');ev(T[35]+.95,'click');reveal(T[36],1.2);ev(T[37]+.2,'thud');
ev(T[38],'hit');ev(T[39],'tick');reveal(T[40]+.8,1.1);ev(T[41],'riser');reveal(T[42]+.4,1.2);
ev(T[43]-.1,'whoosh');ev(T[43],'click');tileSounds('SUSPENDUE',T[44],.05);reveal(T[45]+.15,1);ev(T[46],'whoosh');ev(T[46]+.05,'click');
ev(T[48]-.1,'whoosh');ev(T[48],'click');reveal(T[49],1.2);ev(T[50],'hit');
ev(VEND+.35,'boom');

function scene(t){
  // 0. ACCROCHE / COUVERTURE : tableau des départs + « LE TRAIN A FAIT LE COUP »
  if(t<T[2]){
    const E=T[2]-.1;
    label(t,-1,E,'COMME PAR HASARD  ·  #02',300);
    const ht=TE[1]-.7; // le titre de couverture s'efface quand la voix s'installe
    if(t<ht+.3){const a=1-lin(t,ht,ht+.3);ctx.save();ctx.globalAlpha*=a;
      txt('LE TRAIN',540,540,'230px Anton',INK,'center',4,1,30);txt('A FAIT LE COUP',540,690,'128px Anton',RED,'center',4,1,24);ctx.restore();}
    const stat=i=>{const tf=TE[1]-.6+i*.12;if(t<.25)return['ANNULÉ',RED,-9];if(t<tf)return['À L’HEURE','#9fd18a',.25+i*.04];return['ANNULÉ',RED,tf];};
    card(t,-1,E,{x:540,y:1030,w:960,h:600,rot:-1.2,z:120,op:1,drift:.4,draw:(w,h,tt)=>board(w,h,tt,stat)});
    if(t>=TE[1]-.2)stampBig(t,TE[1]-.2,E,'CLOUÉS AU SOL',540,1290,84,-.1);
  }
  // 1a. 5 JOURS : calendrier 17→21 barré jour après jour
  if(t>=T[2]-.15&&t<T[4]){
    const E=T[4]-.05;
    tiles(t,'5',540,560,{t0:T[2],h:200,t1:E});txt('JOURS DE GRÈVE',540,740,'700 52px Mono',INK,'center',8,vis(t,T[2]+.2,E));
    [17,18,19,20,21].forEach((d,i)=>{const x=540+(i-2)*172,y=960;tiles(t,String(d),x,y,{t0:T[3]-.1+i*.05,h:92,gap:6,t1:E});
      if(t>=T[3]+.15+i*.28)bigX(t,T[3]+.15+i*.28,x,y,58,E);});
    txt('OCTOBRE 2026',540,1100,'700 34px Mono','rgba(236,238,230,.7)','center',8,vis(t,T[3],E));
  }
  // 1b. compagnies + Toussaint + familles
  if(t>=T[4]-.15&&t<T[8]){
    const E=T[8]-.05;
    card(t,T[4]-.1,E,{img:IM.af,x:540,y:700,w:860,h:620,rot:-2,from:'right',exit:'left',credit:'B. Prieur · CC0',seed:2,after:(w,h,tt)=>{
      ['AIR FRANCE','TRANSAVIA','CORSAIR'].forEach((n,i)=>{const t0=T[4]+i*.5;if(tt<t0)return;const a=lin(tt,t0,t0+.15);ctx.save();ctx.globalAlpha*=a;ctx.fillStyle='rgba(6,8,7,.82)';ctx.fillRect(-w/2+30,-h/2+30+i*66,330,54);txt(n,-w/2+48,-h/2+68+i*66,'700 32px Mono',INK,'left',3);ctx.restore();});}});
    if(t>=T[5])stampBig(t,T[5],E,'1ER JOUR DES VACANCES',540,1085,60,-.06);
    if(t>=T[6])glowText('DES MILLIONS DE FAMILLES',540,1200,64,t,T[6],E);
  }
  // 2. 9 OCTOBRE : grève suspendue — officiellement
  if(t>=T[8]-.15&&t<T[12]){
    const E=T[12]-.05;const up=eo(lin(t,T[10]-.1,T[10]+.3));
    ctx.save();ctx.translate(0,-up*200);ctx.globalAlpha*=1-.5*up;
    tiles(t,'9',540,560,{t0:T[8]+.35,h:220,t1:E});tiles(t,'OCTOBRE',540,790,{t0:T[8]+.5,step:.05,h:110,gap:8,t1:E});
    ctx.restore();
    if(t>=T[9]+.6&&t<T[10]+.2)stampBig(t,T[9]+.6,T[10]+.2,'GRÈVE SUSPENDUE',540,1050,92,-.08);
    if(t>=T[10]){glowText('OFFICIELLEMENT,',540,940,104,t,T[10],E);txt('C’EST UNE BONNE NOUVELLE.',540,1050,'700 40px Mono','rgba(236,238,230,.85)','center',4,vis(t,T[10]+.5,E));}
    if(t>=T[11]){handCircle(t,T[11],540,905,420,105,31,E);underline(t,T[11]+.2,250,830,1075,E);}
  }
  // 3. une seule question
  if(t>=T[12]-.1&&t<T[15]){
    const E=T[15]-.05;
    typed(t,T[12],E,'UNE SEULE QUESTION.',540,560,'700 50px Mono',INK,.7);
    if(t>=T[13]){txt('19 SEPTEMBRE  →  9 OCTOBRE',540,720,'700 40px Mono','rgba(236,238,230,.8)','center',4,vis(t,T[13],E));glowText('3 SEMAINES DE PEUR',540,860,84,t,T[13]+.4,E,AMB);}
    if(t>=T[14])glowText('VOUS AVEZ REGARDÉ QUOI ?',540,1080,74,t,T[14],E);
  }
  // 4. LE TRAIN — révélation, puis la guerre train/avion
  if(t>=T[15]-.15&&t<T[17]){
    const E=T[17]-.05;
    if(t<T[16]+.7){card(t,T[15]-.08,T[16]+.7,{img:IM.tgv,x:540,y:780,w:720,h:900,rot:2,from:'bottom',exit:'left',credit:'B. Prieur · CC0',z:60,seed:4});
      glowText('LE TRAIN.',540,1225,120,t,T[15],T[16]+.7,RED);}
    if(t>=T[16]+.7){
      card(t,T[16]+.7,E,{img:IM.af,x:330,y:740,w:540,h:430,rot:-3,from:'left',credit:'B. Prieur · CC0',seed:5,z:160});
      card(t,T[16]+.85,E,{img:IM.tgv,x:760,y:960,w:470,h:470,rot:3,from:'right',credit:'B. Prieur · CC0',seed:6,z:100,fy:.3});
      txt('VS',560,890,'170px Anton',RED,'center',0,vis(t,T[16]+1,E),26);
      txt('LA GUERRE DU CIEL',540,1190,'700 46px Mono',INK,'center',8,vis(t,T[16]+1.2,E));}
  }
  // 5. le décret + la Première ministre
  if(t>=T[17]-.15&&t<T[21]){
    const E=T[21]-.05;const up=eo(lin(t,T[18]+.3,T[18]+.8));
    card(t,T[17]-.1,E,{x:540,y:740-up*120,w:860,h:620,rot:-1.6,op:1,from:'bottom',exit:'left',drift:.4,z:140,draw:(w,h)=>paper(w,h,[
      ['RÉPUBLIQUE FRANÇAISE',70,'700 30px Mono','#333'],['Décret n° 2023-385',150,'60px Anton','#111'],['du 22 mai 2023',200,'400 32px Mono','#333'],
      ['Interdiction des vols intérieurs',290,'400 34px Mono','#222'],['quand le train fait le trajet',338,'400 34px Mono','#222'],['en moins de 2 h 30.',400,'700 44px Mono','#111'],
      ['La Première ministre,',500,'italic 400 32px Mono','#333']],null),
      after:(w,h,tt)=>{underline(tt,T[17]+3.2,-160,190,-h/2+414,E);}});
    if(t>=T[18]+.6){box(540,1090,820,92,'ÉLISABETH BORNE',t,T[18]+.6,E,INK);}
    if(t>=T[19])box(320,1230,380,80,'SNCF 2002-07',t,T[19],E,INK,true);
    if(t>=T[20])box(760,1230,380,80,'RATP 2015-17',t,T[20],E,INK,true);
  }
  // 6. Coïncidence ? Suivez les hommes : Louis Gallois
  if(t>=T[21]-.1&&t<T[27]){
    const E=T[27]-.05;
    if(t<T[23]-.05){glowText('COÏNCIDENCE ?',540,760,120,t,T[21],T[23]-.05);typed(t,T[22],T[23]-.05,'ALORS SUIVEZ LES HOMMES.',540,900,'700 46px Mono',AMB,.8);}
    if(t>=T[23]-.1){
      card(t,T[23]-.1,E,{x:540,y:700,w:860,h:560,rot:1.6,op:1,from:'right',exit:'left',drift:.4,z:140,draw:(w,h,tt)=>{
        ctx.fillStyle='#d9d6cc';ctx.fillRect(-w/2,-h/2,w,h);
        txt('DOSSIER',-w/2+40,-h/2+64,'700 30px Mono','#666','left',6);txt('LOUIS GALLOIS',-w/2+40,-h/2+160,'104px Anton','#111','left',2);
        const rows=[['1996 – 2006','PRÉSIDENT DE LA SNCF',T[24]],['9 OCT. 2006','PATRON D’AIRBUS',T[25]]];
        rows.forEach(([d,r,t0],i)=>{if(tt<t0)return;const a=lin(tt,t0,t0+.2);ctx.save();ctx.globalAlpha*=a;const y=-h/2+280+i*140;
          if(i)planeIcon(-w/2+85,y-14,.6,'#111');else trainIcon(-w/2+85,y-14,.55,'#111');
          txt(d,-w/2+170,y,'700 48px Mono',i?RED:'#111','left',2);txt(r,-w/2+170,y+54,'700 36px Mono','#333','left',3);ctx.restore();});
        if(tt>=T[25]+.6)handCircle(tt,T[25]+.6,-w/2+300,-h/2+405,175,55,41,E);
      }});
      if(t>=T[26])glowText('LE RAIL EST DÉJÀ DANS LE COCKPIT.',540,1150,62,t,T[26],E,RED);
    }
  }
  // 7. Mais le plus étrange… le ministère qui gère les deux
  if(t>=T[27]-.1&&t<T[33]){
    const E=T[33]-.05;
    if(t<T[28]){typed(t,T[27],T[28],'MAIS LE PLUS ÉTRANGE…',540,880,'700 56px Mono',INK,.9);}
    else{
      const up=eo(lin(t,T[29]-.1,T[29]+.4));
      card(t,T[28]-.1,E,{img:IM.roquelaure,x:540,y:760-up*260,w:620,h:760*(1-.35*up),rot:-1.8,from:'top',exit:'left',credit:'E. Atget · CC0',drift:.4,z:200,scale:1-.25*up});
      if(t<T[29])glowText('NÉGOCIÉ AVEC QUI ?',540,1200,86,t,T[28]+.6,T[29]);
      if(t>=T[29]){box(540,760,860,110,'MINISTÈRE DES TRANSPORTS',t,T[29],E,INK);
        if(t>=T[30]){line2(t,T[30],400,815,280,960,E,INK);planeIcon(280,1010,1.1,INK);box(280,1110,360,86,'AVIONS',t,T[30]+.1,E);}
        if(t>=T[31]){line2(t,T[31],680,815,800,960,E,INK);trainIcon(800,1010,1.1,INK);box(800,1110,360,86,'TRAINS',t,T[31]+.1,E,INK,true);}
        if(t>=T[32])glowText('IL JOUAIT DES DEUX CÔTÉS.',540,1245,70,t,T[32],E,RED);}
    }
  }
  // 8. Le 9 octobre 1890 : Ader, l'Éole… et le cheminot
  if(t>=T[33]-.1&&t<T[38]){
    const E=T[38]-.05;
    if(t<T[34]){tiles(t,'9',540,620,{t0:T[33]+.4,h:220,t1:T[34]});tiles(t,'OCTOBRE',540,850,{t0:T[33]+.55,step:.05,h:110,gap:8,t1:T[34]});
      txt('PAS CHOISI AU HASARD',540,1040,'700 42px Mono',AMB,'center',6,vis(t,T[33]+1.4,T[34]));}
    else{
      card(t,T[34]-.1,E,{img:IM.ader3,x:430,y:700,w:700,h:470,rot:-2.2,from:'left',exit:'left',credit:'Rama · CC BY-SA 3.0',z:220,seed:7});
      card(t,T[34]+.5,E,{img:IM.timbre,x:740,y:890,w:420,h:296,rot:3,from:'right',exit:'right',op:1,credit:'Poste d’Albanie · DP',z:80,seed:8,
        after:(w,h,tt)=>{if(tt>=T[34]+1.5)handCircle(tt,T[34]+1.5,-w/2+150,-h/2+48,120,34,51,E);}});
      if(t>=T[35]+.9&&t<T[36])card(t,T[35]+.9,T[36],{img:IM.brevet,x:330,y:1060,w:380,h:400,rot:-3,from:'bottom',op:1,credit:'brevet 1890 · PHGCOM',z:40,fy:.08,seed:9});
      if(t>=T[35])typed(t,T[35],E,'CHEMINS DE FER DU MIDI · 1862–1866',540,500,'700 34px Mono',AMB,.7,2);
      if(t>=T[36])glowText('L’AVION EST NÉ',540,1120,90,t,T[36],E,RED);glowText('D’UN CHEMINOT.',540,1225,90,t,T[36]+.15,E,RED);
    }
  }
  // 9. La menace, c'est gratuit
  if(t>=T[38]-.1&&t<T[43]){
    const E=T[43]-.05;
    if(t<T[41]){
      glowText('LA GRÈVE A ÉCHOUÉ ?',540,560,90,t,T[38],T[41]);
      if(t>=T[39]){txt('UNE GRÈVE',300,800,'700 44px Mono',INK,'center',4,vis(t,T[39],T[41]));const v=Math.round(20*eo(lin(t,T[39]+.1,T[39]+1)));
        txt('−'+v+' M€ / JOUR',300,900,'64px Anton',INK,'center',2,vis(t,T[39],T[41]));txt('(Air France, grève de 2014)',300,950,'400 24px Mono','rgba(236,238,230,.6)','center',0,vis(t,T[39]+.3,T[41]));}
      if(t>=T[40]){txt('UNE MENACE',780,800,'700 44px Mono',INK,'center',4,vis(t,T[40],T[41]));tiles(t,'0 €',780,920,{t0:T[40]+.8,step:.06,h:120,gap:6,hot:[0,2],hotT:T[40]+.8,t1:T[41]});}
    }else{
      glowText('LE TRAIN N’AVAIT PAS BESOIN',540,700,70,t,T[41],E);glowText('DE LA GRÈVE.',540,800,70,t,T[41]+.2,E);
      if(t>=T[42]+.4){txt('IL AVAIT BESOIN DE',540,980,'700 46px Mono',INK,'center',4,vis(t,T[42],E));glowText('VOTRE PEUR.',540,1130,140,t,T[42]+.4,E,RED);}
    }
  }
  // 10. suspendue, pas annulée
  if(t>=T[43]-.1&&t<T[48]){
    const E=T[48]-.05;
    if(t<T[46]){
      card(t,T[43]-.05,T[46],{x:540,y:620,w:840,h:330,rot:-1.4,op:1,from:'left',exit:'left',drift:.4,z:140,draw:(w,h)=>paper(w,h,[
        ['suspendre',90,'60px Anton','#111'],['(verbe)',140,'italic 400 28px Mono','#555'],['Interrompre pour un temps.',210,'400 34px Mono','#222'],['Pas : arrêter.',262,'700 34px Mono','#111']],null)});
      tiles(t,'SUSPENDUE',540,930,{t0:T[44],step:.05,h:110,gap:8,t1:T[46]});
      if(t>=T[45]){txt('ANNULÉE',540,1150,'110px Anton','rgba(236,238,230,.85)','center',6,vis(t,T[45],T[46]),10);bigX(t,T[45]+.15,540,1110,150,T[46]);}
    }else{
      const stat=i=>['SUSPENDU',AMB,T[46]+.1+i*.08];
      card(t,T[46],E,{x:540,y:820,w:920,h:560,rot:1.2,z:120,op:1,from:'top',drift:.4,draw:(w,h,tt)=>board(w,h,tt,stat)});
      glowText('LA MENACE EST TOUJOURS LÀ.',540,420,64,t,T[46]+.2,E,AMB);
      if(t>=T[47])txt('JUSTE AU-DESSUS DE VOS VACANCES.',540,1200,'700 38px Mono',INK,'center',4,vis(t,T[47],E));
    }
  }
  // 11. Alors, vous avez regardé ? Avouez.
  if(t>=T[48]-.1&&t<VEND+.35){
    const E=VEND+.35;
    card(t,T[48]-.05,E,{x:540,y:740,w:820,h:380,rot:-2,op:1,from:'right',drift:.4,z:140,draw:(w,h)=>{
      ctx.fillStyle='#e8e4d8';ctx.fillRect(-w/2,-h/2,w,h);ctx.fillStyle='#111';ctx.fillRect(-w/2,-h/2,w,70);
      txt('BILLET DE TRAIN',-w/2+30,-h/2+48,'700 34px Mono','#e8e4d8','left',6);trainIcon(w/2-90,-h/2+38,.45,'#e8e4d8');
      txt('PARIS  →  ?',-w/2+40,-h/2+170,'72px Anton','#111','left',2);txt('SAM. 17 OCT. 2026',-w/2+40,-h/2+240,'700 34px Mono','#333','left',3);
      txt('« au cas où »',w/2-40,h/2-40,'italic 400 32px Mono','#555','right');
      ctx.setLineDash([10,10]);ctx.strokeStyle='#999';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(w/2-200,-h/2+80);ctx.lineTo(w/2-200,h/2);ctx.stroke();ctx.setLineDash([]);}});
    if(t>=T[49])stampBig(t,T[49],E,'AVOUEZ.',540,1040,130,-.12);
    if(t>=T[50])glowText('RÉFLÉCHISSEZ.',540,1215,96,t,T[50],E);
  }
  // 12. carton de fin
  if(t>=VEND+.3){
    glowText('COMME',540,700,190,t,VEND+.35,1e9);glowText('PAR HASARD',540,900,190,t,VEND+.35,1e9);
    txt('LA FERME',540,1040,'700 34px Mono',DIM,'center',12,lin(t,VEND+.7,VEND+1));
    txt('ABONNE-TOI',540,1180,'64px Anton',RED,'center',4,lin(t,VEND+1.1,VEND+1.4),16);
    txt('Les faits sont vrais. Les conclusions sont débiles.',540,1340,'400 26px Mono','rgba(236,238,230,.7)','center',0,lin(t,VEND+1.5,VEND+1.9));
    txt('Musique : « Hitman », Kevin MacLeod (incompetech.com) · CC BY 4.0',540,1420,'400 22px Mono','rgba(236,238,230,.55)','center',0,lin(t,VEND+1.5,VEND+1.9));
  }
}

window.renderFrame=f=>{
  const t=f/FPS;
  CAM=camAt(t,f);
  background(t,t>VEND+.3?.05:.17);
  ctx.save();layer(0);scene(t);ctx.restore();ctx.setTransform(1,0,0,1,0,0);
  if(t<VEND)subs(t);
  postfx(t);flash(t);
};
