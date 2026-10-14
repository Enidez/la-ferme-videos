// ================= LE DOSSIER #04 — « CONFORME » =================
const T=Object.fromEntries(SEGS.map((s,i)=>[i,s.t0]));
const TE=Object.fromEntries(SEGS.map((s,i)=>[i,s.t1]));
const ICE='#9fd8ff',ICE2='#d8f0ff';
const TBOOM=T[13]+.35; // explosion

// ---------- fond : noir profond, grille lointaine, photo d'archive très diffuse pendant les grenades
const BLURC={};
function blurOf(k){if(BLURC[k])return BLURC[k];const im=IM[k];if(!im)return null;const c=document.createElement('canvas');c.width=540;c.height=960;const g=c.getContext('2d');
  const s=Math.max(540/im.width,960/im.height);g.filter='blur(8px) grayscale(1)';g.drawImage(im,270-im.width*s/2,480-im.height*s/2,im.width*s,im.height*s);return BLURC[k]=c;}
function background(t){
  ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle=BG;ctx.fillRect(0,0,W,H);
  ctx.save();layer(700);const g=ctx.createRadialGradient(540,800,50,540,960,1500);g.addColorStop(0,'rgba(34,36,35,1)');g.addColorStop(1,'rgba(6,8,7,1)');ctx.fillStyle=g;ctx.fillRect(-1200,-1500,3480,4920);
  ctx.strokeStyle='rgba(236,238,230,.045)';ctx.lineWidth=2;for(let x=-1200;x<2400;x+=120){ctx.beginPath();ctx.moveTo(x,-1500);ctx.lineTo(x,3400);ctx.stroke();}
  const ba=vis(t,T[9],T[16],1,.8)*.22;const c=blurOf('lacrymo');if(c&&ba>0){ctx.globalAlpha=ba;ctx.translate(540,960);ctx.scale(2.6,2.6);ctx.drawImage(c,-540,-960,1080,1920);}
  ctx.restore();
  ctx.save();ctx.globalCompositeOperation='lighter';const lx=W*(.2+.6*(.5+.5*Math.sin(t*.17))),ly=H*(.3+.25*Math.sin(t*.12+1));
  const g2=ctx.createRadialGradient(lx,ly,0,lx,ly,700);g2.addColorStop(0,`rgba(255,160,110,${.04+.02*Math.sin(t*1.2)})`);g2.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g2;ctx.fillRect(0,0,W,H);ctx.restore();
}
// carte « fiche » sombre avec texte
function slab(w,h,lines,col='rgba(24,27,26,.96)'){ctx.fillStyle=col;ctx.fillRect(-w/2,-h/2,w,h);lines.forEach(([s,y,font,c,al])=>txt(s,al=='left'?-w/2+30:0,-h/2+y,font,c||INK,al||'center',2));}

// ---------- coupes / plans
CUTS=[0,T[4]-.1,T[9]-.1,T[13]-.05,T[16]-.1,T[23]-.1,T[28]-.1,T[30]-.1,T[35]-.1,T[41]-.1,T[46]-.1,T[51]-.1,T[56]-.1,VEND+.3,DUR+1];

// ---------- sons
ev(.02,'boom');ev(T[3],'thud');
ev(T[4]-.1,'whoosh');ev(T[4],'click');ev(T[6],'tick');[0,1,2].forEach(i=>ev(T[7]+.6+i*.7,'tick'));ev(T[8],'thud');
ev(T[9],'tick');ev(T[10]+.2,'thud');ev(T[10]+.6,'thud');ev(T[11]+.3,'tick');ev(T[12]+.2,'riser');
ev(TBOOM,'explosion');ev(TBOOM+.05,'tinnitus');reveal(TBOOM,1.6);
ev(T[15],'thud');
ev(T[17],'click');[18,19,20,21].forEach(i=>ev(T[i],'tick'));ev(T[22]+.3,'thud');
ev(T[23],'click');[24,25,26,27].forEach(i=>ev(T[i],'tick'));ev(T[28]-.1,'whoosh');ev(T[28],'click');
ev(T[30],'hit');tileSounds('5',T[30]+.4,.1);tileSounds('7',T[31],.1);ev(T[33],'tick');tileSounds('9',T[34],.1);
reveal(T[35]+1.2,1.3);ev(T[36],'thud');[37,38,39].forEach(i=>ev(T[i],'click'));ev(T[40],'tick');
ev(T[41],'hit');reveal(T[43]+.2,1.1);tileSounds('15 ANS',T[45]+.3,.08);
ev(T[46]+.2,'riser');tileSounds('18',T[47]+.2,.1);tileSounds('SUSPENDUE',T[48],.05);ev(T[49]+.3,'thud');
for(let i=0;i<20;i++)ev(T[51]+i*.05,'type');ev(T[53],'hit');ev(T[55],'thud');
reveal(T[56],1.2);reveal(T[56]+1.0,1.2);ev(T[58]+.3,'tinnitus');ev(VEND+.35,'boom');

function scene(t){
  // 0. COUVERTURE
  if(t<T[4]){const E=T[4]-.1;
    label(t,-1,E,'LE DOSSIER  ·  #04',300);
    txt('15 ANS.',540,640,'260px Anton',INK,'center',4,vis(t,-1,E),30);
    txt('UNE MAIN EN MOINS.',540,800,'104px Anton',RED,'center',3,vis(t,-1,E),22);
    stampRed(t,-1,E,'« CONFORME »',540,1020,92,-.08);
    txt('selon le parquet',540,1120,'400 30px Mono','rgba(236,238,230,.65)','center',2,vis(t,-1,E));
  }
  // 1. le lieu, le matin, le rassemblement
  if(t>=T[4]-.15&&t<T[9]){const E=T[9]-.05;
    card(t,T[4]-.1,E,{x:540,y:560,w:840,h:300,rot:-1.4,op:1,from:'left',exit:'left',z:200,drift:.4,draw:(w,h)=>slab(w,h,[
      ['LENS · PAS-DE-CALAIS',70,'700 30px Mono','rgba(236,238,230,.6)'],['LYCÉE PRO AUGUSTE-BÉHAL',150,'64px Anton'],['LUNDI 5 OCTOBRE 2026 · MATIN',225,'700 32px Mono',AMB]])});
    if(t>=T[6]){tiles(t,'200-250',540,850,{t0:T[6]+.2,step:.05,h:120,gap:6,t1:E});txt('LYCÉENS RASSEMBLÉS',540,975,'700 36px Mono',INK,'center',4,vis(t,T[6]+.5,E));}
    if(t>=T[7]){txt('SELON LE PRÉFET :',540,1060,'700 28px Mono','rgba(236,238,230,.6)','center',4,vis(t,T[7],E));
      ['PIERRES','FEUX D’ARTIFICE','MORTIERS'].forEach((s,i)=>tag(240+i*300,1130,280,64,s,t,T[7]+.6+i*.7,E,{size:28}));}
    if(t>=T[8])tag(540,1220,620,70,'1 COMPAGNIE DE CRS',t,T[8],E,{size:34,col:INK,stroke:INK});
  }
  // 2. la séquence des grenades (frise verticale)
  if(t>=T[9]-.15&&t<T[13]+.2){const E=T[13]+.2;
    card(t,T[9]-.1,E,{img:IM.lacrymo,x:540,y:760,w:900,h:620,rot:1.5,op:.35,from:'right',z:320,drift:.3,credit:'archive 2018 · O. Ortelpa · CC BY 2.0'});
    const steps=[['SOMMATIONS','SANS EFFET',T[9]],['GRENADE LACRYMOGÈNE','N° 1',T[10]+.2],['GRENADE LACRYMOGÈNE','N° 2',T[10]+.6],['3e GRENADE','',T[11]+.3],['ASSOURDISSANTE','',T[12]+.2]];
    const x0=260;ctx.save();ctx.globalAlpha*=vis(t,T[9],E);ctx.strokeStyle='rgba(236,238,230,.4)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x0,480);ctx.lineTo(x0,480+(1200-480)*eo(lin(t,T[9],T[12]+.6)));ctx.stroke();ctx.restore();
    steps.forEach(([a,b,t0],i)=>{if(t<t0)return;const y=500+i*165;const hot=i==4;const al=vis(t,t0,E,.15,.2);ctx.save();ctx.globalAlpha*=al;
      ctx.fillStyle=hot?RED:INK;ctx.beginPath();ctx.arc(x0,y,hot?16:11,0,6.283);ctx.fill();ctx.restore();
      txt(a,x0+50,y+14,hot?'78px Anton':'700 40px Mono',hot?RED:INK,'left',2,al,hot?20:0);if(b)txt(b,x0+50,y+60,'400 28px Mono','rgba(236,238,230,.6)','left',2,al);});
  }
  // 3. l'explosion, l'hôpital, sans sa main
  if(t>=T[13]-.1&&t<T[16]){const E=T[16]-.05;
    if(t<TBOOM)glowText('ELLE EXPLOSE.',540,900,120,t,T[13],TBOOM+.05,INK);
    if(t>=T[14]){txt('15 ANS',540,760,'200px Anton',INK,'center',4,vis(t,T[14],E),24);txt('À L’HÔPITAL',540,880,'700 50px Mono','rgba(236,238,230,.8)','center',8,vis(t,T[14]+.4,E));}
    if(t>=T[15])glowText('SANS SA MAIN.',540,1060,120,t,T[15],E,RED);
  }
  // 4. deux versions : parquet / famille
  if(t>=T[16]-.15&&t<T[28]){const E=T[28]-.05;
    if(t<T[17])glowText('DEUX VERSIONS.',540,820,120,t,T[16],T[17]+.1);
    const L=[['TIRÉE DE LOIN (80 M)',18],['TOMBÉE AU SOL',19],['RAMASSÉE PAR LE LYCÉEN',20],['EXPLOSION DANS SA MAIN',21]];
    const R=[['SON AVOCATE AFFIRME :',24],['« JAMAIS RAMASSÉE »',25],['TÉMOINS : TOMBÉE SUR LUI',26],['SA MÈRE PORTE PLAINTE',27]];
    if(t>=T[17]){
      card(t,T[17]-.05,E,{x:290,y:820,w:470,h:840,rot:-1,op:1,from:'left',z:80,drift:.3,seed:3,draw:(w,h,tt)=>{
        ctx.fillStyle='rgba(22,25,24,.97)';ctx.fillRect(-w/2,-h/2,w,h);ctx.fillStyle='rgba(236,238,230,.08)';ctx.fillRect(-w/2,-h/2,w,90);
        txt('LE PARQUET',0,-h/2+62,'54px Anton',INK,'center',3);
        L.forEach(([s,i],k)=>{if(tt<T[i])return;const a=lin(tt,T[i],T[i]+.2);const y=-h/2+170+k*130;ctx.save();ctx.globalAlpha*=a;ctx.fillStyle='rgba(128,134,126,.22)';ctx.fillRect(-w/2+20,y-50,w-40,90);
          wrap(s,0,y,w-50,'700 31px Mono',INK);ctx.restore();});
        if(tt>=T[22]+.3){const sp=lin(tt,T[22]+.3,T[22]+.45);ctx.save();ctx.globalAlpha*=sp;ctx.translate(0,h/2-80);ctx.rotate(-.1);ctx.scale(1.5-.5*sp,1.5-.5*sp);ctx.strokeStyle=RED;ctx.lineWidth=6;ctx.strokeRect(-190,-36,380,66);txt('AUCUNE VIDÉO',0,14,'700 36px Mono',RED,'center',3);ctx.restore();}
      }});}
    if(t>=T[23]){
      card(t,T[23]-.05,E,{x:790,y:820,w:470,h:840,rot:1,op:1,from:'right',z:80,drift:.3,seed:4,draw:(w,h,tt)=>{
        ctx.fillStyle='rgba(22,25,24,.97)';ctx.fillRect(-w/2,-h/2,w,h);ctx.fillStyle='rgba(236,238,230,.08)';ctx.fillRect(-w/2,-h/2,w,90);
        txt('LA FAMILLE',0,-h/2+62,'54px Anton',INK,'center',3);
        R.forEach(([s,i],k)=>{if(tt<T[i])return;const a=lin(tt,T[i],T[i]+.2);const y=-h/2+170+k*130;ctx.save();ctx.globalAlpha*=a;ctx.fillStyle='rgba(128,134,126,.22)';ctx.fillRect(-w/2+20,y-50,w-40,90);
          wrap(s,0,y,w-50,'700 31px Mono',k==1?AMB:INK);ctx.restore();});
      }});}
    if(t>=T[17])txt('VS',540,840,'110px Anton',RED,'center',0,vis(t,T[23],E),22);
  }
  // 5. l'enquête
  if(t>=T[28]-.15&&t<T[30]){const E=T[30]-.05;
    card(t,T[28]-.1,E,{x:540,y:760,w:860,h:460,rot:-1.2,op:1,from:'bottom',z:120,drift:.4,draw:(w,h)=>paper(w,h,[
      ['ENQUÊTE OUVERTE',110,'84px Anton','#111'],['confiée à l’IGPN',175,'700 34px Mono','#333'],['« violences ayant entraîné',280,'400 36px Mono','#222'],['une infirmité permanente',330,'400 36px Mono','#222'],['ou une mutilation »',380,'700 36px Mono','#111']])});
  }
  // 6. les dates : 5, 7, 9 octobre
  if(t>=T[30]-.15&&t<T[35]){const E=T[35]-.05;
    typed(t,T[30],E,'REGARDEZ BIEN LES DATES.',540,430,'700 46px Mono',INK,.7);
    const D=[['5','LA MAIN',T[30]+.4,INK],['7','GRENADE SUSPENDUE',T[31],AMB],['9','TIR « CONFORME »',T[34],RED]];
    D.forEach(([d,l,t0,c],i)=>{if(t<t0)return;const y=620+i*230;tiles(t,d,250,y,{t0,h:150,t1:E,hot:i==2?[0]:[],hotT:t0});txt('OCT.',250,y+110,'700 26px Mono','rgba(236,238,230,.6)','center',3,vis(t,t0,E));
      txt(l,380,y+18,'700 44px Mono',c,'left',2,vis(t,t0+.15,E),c==RED?12:0);});
    if(t>=T[32])txt('PAS PARTOUT.',380,915,'400 32px Mono','rgba(236,238,230,.75)','left',2,vis(t,T[32],E));
    if(t>=T[33])txt('SEULEMENT POUR LES LYCÉENS.',380,955,'400 32px Mono','rgba(236,238,230,.75)','left',2,vis(t,T[33],E));
  }
  // 7. CONFORME
  if(t>=T[35]-.15&&t<T[41]){const E=T[41]-.05;
    if(t<T[37]){stampRed(t,T[35]+1.2,T[37],'CONFORME',540,820,170,-.07);if(t>=T[36])stampRed(t,T[36],T[37],'CONFORME',560,1060,90,.05);}
    else{
      const B=[['COMMANDEMENT',T[37]],['ORDRE',T[38]],['CRS',T[39]],['TIR',T[39]+.6]];
      B.forEach(([s,t0],i)=>{const y=470+i*160;tag(540,y,520,96,s,t,t0,E,{size:44,col:i==3?RED:INK,stroke:i==3?RED:'rgba(236,238,230,.55)'});
        if(i>0&&t>=t0){const a=vis(t,t0,E);ctx.save();ctx.globalAlpha*=a;ctx.strokeStyle='rgba(236,238,230,.6)';ctx.lineWidth=6;
          for(let k=0;k<2;k++){ctx.beginPath();ctx.ellipse(540,y-80+(k?16:-16),13,22,0,0,6.283);ctx.stroke();}ctx.restore();}});
      txt('CONFORME À LA FORMATION',540,1100,'700 34px Mono','rgba(236,238,230,.75)','center',3,vis(t,T[37],E));
      if(t>=T[40])glowText('PERSONNE N’A DÉSOBÉI.',540,1195,64,t,T[40],E,INK);
    }
  }
  // 8. la vraie question
  if(t>=T[41]-.15&&t<T[46]){const E=T[46]-.05;
    if(t<T[44]){typed(t,T[41],T[44],'LA VRAIE QUESTION :',540,560,'700 48px Mono',INK,.6);
      if(t>=T[42])glowText('SI TOUT ÉTAIT DANS LES RÈGLES…',540,760,68,t,T[42],T[44]);
      if(t>=T[43]){glowText('C’EST QUE LES RÈGLES',540,930,92,t,T[43]+.2,T[44],RED);glowText('PERMETTENT ÇA.',540,1040,92,t,T[43]+.35,T[44],RED);}}
    else{txt('UNE ARME AUTORISÉE',540,560,'700 52px Mono',INK,'center',4,vis(t,T[44],E));txt('DEVANT UN LYCÉE',540,650,'700 52px Mono',INK,'center',4,vis(t,T[44]+1.6,E));
      if(t>=T[45])tiles(t,'15 ANS',540,880,{t0:T[45]+.3,step:.08,h:180,gap:8,t1:E,hot:[0,1],hotT:T[45]+.8});}
  }
  // 9. pétition, IGPN, suspendue pas interdite
  if(t>=T[46]-.15&&t<T[51]){const E=T[51]-.05;
    if(t<T[48]){const v=Math.round(100000*eo(lin(t,T[46]+.2,T[46]+3)));
      txt(v.toLocaleString('fr-FR')+'+',540,640,'150px Anton',INK,'center',2,vis(t,T[46],T[48]),18);txt('SIGNATURES · PÉTITION',540,720,'700 36px Mono','rgba(236,238,230,.75)','center',4,vis(t,T[46]+.3,T[48]));
      if(t>=T[47]){tiles(t,'18',540,930,{t0:T[47]+.2,h:160,t1:T[48]});txt('ENQUÊTES IGPN',540,1080,'700 40px Mono',INK,'center',4,vis(t,T[47]+.4,T[48]));}}
    else{tiles(t,'SUSPENDUE',540,700,{t0:T[48],step:.05,h:110,gap:8,t1:E});
      if(t>=T[49]){txt('INTERDITE',540,940,'130px Anton','rgba(236,238,230,.85)','center',4,vis(t,T[49],E),10);bigX(t,T[49]+.3,540,895,150,E);}
      if(t>=T[50])glowText('SUSPENDUE.',540,1150,80,t,T[50],E,AMB);}
  }
  // 10. ce qui est sûr
  if(t>=T[51]-.15&&t<T[56]){const E=T[56]-.05;
    if(t<T[53]){typed(t,T[51],T[53],'ON NE SAIT PAS ENCORE',540,700,'700 50px Mono',INK,.9);typed(t,T[51]+.9,T[53],'CE QUI S’EST PASSÉ CE MATIN-LÀ.',540,780,'700 40px Mono','rgba(236,238,230,.75)',1.1,2);
      if(t>=T[52])txt('L’ENQUÊTE LE DIRA.',540,940,'700 46px Mono',AMB,'center',4,vis(t,T[52],T[53]));}
    else{glowText('UNE CHOSE EST SÛRE.',540,540,80,t,T[53],E);
      if(t>=T[54]){glowText('UN ADOLESCENT',540,760,110,t,T[54],E);glowText('A PERDU SA MAIN.',540,880,110,t,T[54]+.2,E,RED);}
      if(t>=T[55])typed(t,T[55]+.3,E,'ET PERSONNE N’A FAIT D’ERREUR.',540,1060,'700 44px Mono',INK,1);}
  }
  // 11. conforme + suspendue
  if(t>=T[56]-.15&&t<VEND+.35){const E=VEND+.35;
    stampRed(t,T[56],E,'CONFORME',540,620,130,-.08);
    if(t>=T[56]+1.0){const a=vis(t,T[56]+1,E,.02,.25);const p=lin(t,T[56]+1,T[56]+1.16);const sc=1.6-.6*eo(p);ctx.save();ctx.globalAlpha*=a*cl(p*3);ctx.translate(540,860);ctx.rotate(.06);ctx.scale(sc,sc);
      const f='130px Anton';const sw=mw('SUSPENDUE',f,4)+60;ctx.strokeStyle=INK;ctx.lineWidth=10;ctx.strokeRect(-sw/2,-101,sw,150);txt('SUSPENDUE',0,23,f,INK,'center',4);ctx.restore();}
    if(t>=T[57])txt('LES DEUX SONT VRAIS EN MÊME TEMPS.',540,1060,'700 40px Mono',INK,'center',3,vis(t,T[57],E));
    if(t>=T[58])glowText('LE PLUS INQUIÉTANT.',540,1170,84,t,T[58]+.6,E,RED);
  }
  // 12. carton de fin
  if(t>=VEND+.3){
    glowText('LE',540,640,120,t,VEND+.35,1e9);glowText('DOSSIER',540,840,200,t,VEND+.4,1e9);
    txt('LA FERME',540,980,'700 34px Mono',DIM,'center',12,lin(t,VEND+.7,VEND+1));
    txt('ABONNE-TOI',540,1120,'64px Anton',RED,'center',4,lin(t,VEND+1.1,VEND+1.4),16);
    txt('Enquête en cours. Versions contestées. Faits au 12 octobre 2026.',540,1300,'400 24px Mono','rgba(236,238,230,.7)','center',0,lin(t,VEND+1.5,VEND+1.9));
    txt('Musique : « Dark Times », « Heartbreaking »',540,1400,'400 22px Mono','rgba(236,238,230,.55)','center',0,lin(t,VEND+1.5,VEND+1.9));
    txt('Kevin MacLeod (incompetech.com) · CC BY 4.0',540,1436,'400 22px Mono','rgba(236,238,230,.55)','center',0,lin(t,VEND+1.5,VEND+1.9));
  }
}
function wrap(s,x,y,maxw,font,col){const words=s.split(' ');const lines=[];let cur='';words.forEach(w=>{const tr=cur?cur+' '+w:w;if(mw(tr,font,1)>maxw&&cur){lines.push(cur);cur=w;}else cur=tr;});lines.push(cur);
  lines.forEach((l,i)=>txt(l,x,y+(i-(lines.length-1)/2)*36+10,font,col,'center',1));}

// acouphène : blanc, flou, puis lent retour
const TMPC=document.createElement('canvas');TMPC.width=W;TMPC.height=H;const TMPX=TMPC.getContext('2d');
function tinnitus(t){const d=t-TBOOM;if(d<0||d>2.6)return;const k=d<.12?1:Math.pow(1-cl((d-.12)/2.5),1.5);
  TMPX.clearRect(0,0,W,H);TMPX.drawImage(cv,0,0);ctx.save();ctx.filter=`blur(${Math.round(14*k)}px) grayscale(1)`;ctx.drawImage(TMPC,0,0);ctx.restore();
  ctx.fillStyle=`rgba(245,245,240,${.85*k})`;ctx.fillRect(0,0,W,H);}

window.renderFrame=f=>{
  const t=f/FPS;
  CAM=camAt(t,f);
  background(t);
  ctx.save();layer(0);scene(t);ctx.restore();ctx.setTransform(1,0,0,1,0,0);
  tinnitus(t);
  if(t<VEND)subs(t);
  postfx(t);flash(t);
};
