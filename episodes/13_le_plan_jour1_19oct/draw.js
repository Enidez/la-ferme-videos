function rowItem(y,w,a,b,t,t0,col){if(t<t0)return;const q=eo(lin(t,t0,t0+.2));ctx.save();ctx.globalAlpha*=q;
  ctx.fillStyle='rgba(128,134,126,.28)';ctx.fillRect(-w/2+50,y-62,w-100,96);txt(a,-w/2+80,y+6,'56px Anton',INK,'left',2);if(b)txt(b,w/2-80,y+6,'56px Anton',col||PINK,'right',2,1,10);ctx.restore();}
function drawCard(c,t){
  ctx.save();ctx.translate(c.x,c.y);ctx.rotate(c.rot*Math.PI/180);
  const w=c.w,h=c.h;
  if(c.k==='cover'){const fr=(window.CLIPS&&CLIPS.hook)||[];const FRZ=MARK.frz;const fi=Math.min(fr.length-1,Math.max(0,Math.floor(Math.min(t,FRZ)*30)));const im=fr[fi];const frz=t>=FRZ;
    framePaper(w+40,h+40,'rgba(230,232,224,.9)');
    if(im){ctx.save();ctx.beginPath();ctx.rect(-w/2,-h/2,w,h);ctx.clip();ctx.filter='blur(30px) brightness(.5)';ctx.drawImage(im,-w/2-200,-h/2-100,w+400,h+200);
      const z=frz?1+.06*eo(lin(t,FRZ,FRZ+.2)):1+.015*t;ctx.scale(z,z);ctx.filter=frz?'grayscale(.6) contrast(1.25)':'none';ctx.drawImage(im,-w/2,-h/2+330,w,810);
      ctx.filter='none';const gg=ctx.createLinearGradient(0,-h/2+300,0,-h/2+480);gg.addColorStop(0,'rgba(0,0,0,.6)');gg.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=gg;ctx.fillRect(-w/2,-h/2+300,w,180);ctx.restore();}
    txt('LAURENT NUÑEZ · FRANCE INTER · LUNDI 19 OCT.',0,-h/2+300,'400 24px Mono','rgba(236,238,230,.85)','center',3);
    if(!frz&&t>.2){const p=eo(lin(t,.2,.5));ctx.save();ctx.globalAlpha=p;ctx.fillStyle='rgba(10,10,10,.75)';ctx.fillRect(-w/2+60,-h/2+1170,w-120,120);txt('« JE SUIS RESPONSABLE DE TOUT',0,-h/2+1222,'700 36px Mono',AMB,'center',1);txt('CE QUI SE PASSE »',0,-h/2+1270,'700 36px Mono',AMB,'center',1);ctx.restore();}
    if(frz){const p=eo(lin(t,FRZ,FRZ+.15));ctx.save();ctx.globalAlpha=p;ctx.fillStyle='rgba(0,0,0,.4)';ctx.fillRect(-w/2,-h/2,w,h);ctx.restore();
      stampAt('DÉMISSION REFUSÉE',0,-h/2+990,84,t,FRZ,-.1);
      txt('LE PLAN.',0,-h/2+1210,'190px Anton',INK,'center',6,lin(t,FRZ+.35,FRZ+.55),24);txt('JOUR 1.',0,-h/2+1430,'230px Anton',RED,'center',8,lin(t,FRZ+.55,FRZ+.75),30);}}
  else if(c.k==='outro'){framePaper(w,h);txt('LE PLAN',0,-190,'120px Anton',INK,'center',4,1,24);txt('JOUR 1',0,30,'190px Anton',PINK,'center',4,1,24);txt('LA FERME · 19.10',0,120,'700 34px Mono','rgba(236,238,230,.6)','center',10);
    txt('ABONNE-TOI',0,250,'70px Anton',INK,'center',4,1,16);txt('ON COMPTE ENSEMBLE.',0,330,'700 34px Mono',AMB,'center',4);}
  else if(c.k==='clip'){framePaper(w,h,'rgba(230,232,224,.88)');const fr=c.img?[IM[c.img]]:((window.CLIPS&&CLIPS[c.clip])||[]);
    const fi=c.sync!=null?Math.floor((t-c.sync)*30):Math.floor((t-c.t0+.3)*30);const im=fr[Math.min(fr.length-1,Math.max(0,fi))];const pw=w-50,ph=h-170;
    ctx.fillStyle='#000';ctx.fillRect(-pw/2,-h/2+25,pw,ph);if(im){ctx.save();ctx.beginPath();ctx.rect(-pw/2,-h/2+25,pw,ph);ctx.clip();const age=Math.max(0,t-c.t0);const s=Math.max(pw/im.width,ph/im.height)*(1.02+age*.01);ctx.filter=c.gray?'grayscale(1) contrast(1.12)':'saturate(.8) contrast(1.08)';ctx.drawImage(im,-im.width*s/2,-h/2+25+ph/2-im.height*s/2,im.width*s,im.height*s);ctx.restore();}
    if(c.after){ctx.save();c.after(w,h,t);ctx.restore();}
    txt(c.handle,-w/2+30,h/2-85,'700 28px Mono','#1b1c1a','left',1);
    if(c.badge){const bc=c.badgeRed?PINK:'rgba(20,20,20,.85)';ctx.font='700 30px Mono';const bw=ctx.measureText(c.badge).width+36;ctx.fillStyle=bc;ctx.fillRect(-bw/2,h/2-58,bw,44);txt(c.badge,0,h/2-26,'700 30px Mono','#fff','center',2);}}
  else if(c.k==='title'){framePaper(w,h);const big=120;c.lines.forEach((l,i)=>txt(l,0,-((c.lines.length-1)*big*.55)+i*big*1.1+big*.35,big+'px Anton',c.red&&i==1?PINK:INK,'center',2));}
  else if(c.k==='step'){framePaper(w,h);txt('ÉTAPE',0,-h/2+110,'700 40px Mono','rgba(236,238,230,.7)','center',12);txt(String(c.n),0,-h/2+370,'280px Anton',c.n===4?PINK:INK,'center',2,1,26);
    txt(c.l1,0,-h/2+500,'100px Anton',c.n===4?INK:PINK,'center',2,lin(t,c.t0+.3,c.t0+.6));if(c.l2)txt(c.l2,0,-h/2+610,'100px Anton',PINK,'center',2,lin(t,c.t0+.5,c.t0+.8));
    if(c.extra){ctx.save();c.extra(w,h,t);ctx.restore();}}
  else if(c.k==='elysee'){framePaper(w,h,PAPERC);txt('COMMUNIQUÉ DE L’ÉLYSÉE · 19 OCT.',0,-h/2+90,'700 30px Mono','rgba(27,28,26,.7)','center',3);
    txt('DÉMISSION',0,-h/2+220,'110px Anton',INKD,'center',2);stampAt('REFUSÉE',0,-h/2+350,90,t,c.t0+.2,-.08);
    if(t>=N(2))['« UN COMMANDEMENT CONTINU','DES FORCES DE L’ORDRE »'].forEach((s,i)=>txt(s,0,-h/2+480+i*56,'700 36px Mono',INKD,'center',1,lin(t,N(2),N(2)+.3)));
    if(t>=N(4)){ctx.fillStyle='rgba(201,48,44,.9)';ctx.fillRect(-w/2+50,h/2-200,w-100,130);txt('NOUVELLE DOCTRINE',0,h/2-140,'56px Anton','#fff','center',2,lin(t,N(4),N(4)+.2));if(t>=N(5))txt('« FACE AUX CASSEURS »',0,h/2-88,'700 34px Mono','#fff','center',2,lin(t,N(5),N(5)+.2));}}
  else if(c.k==='jour'){framePaper(w,h,'rgba(40,43,40,.92)');txt('LE PLAN',0,-h/2+130,'90px Anton',INK,'center',4);txt('JOUR 1',0,-h/2+330,'200px Anton',PINK,'center',4,1,24);
    ['ENNEMI','INTERDIRE','PUNIR','PRIX'].forEach((s,i)=>{const x=(i-1.5)*205;const t0=c.t0+.4+i*.15;if(t<t0)return;const p=eo(lin(t,t0,t0+.15));ctx.save();ctx.globalAlpha*=p;ctx.fillStyle='rgba(128,134,126,.3)';ctx.fillRect(x-95,-h/2+420,190,150);ctx.strokeStyle='rgba(236,238,230,.5)';ctx.lineWidth=2;ctx.strokeRect(x-95,-h/2+420,190,150);
      txt(String(i+1),x,-h/2+500,'70px Anton',INK,'center',0);txt(s,x,-h/2+550,'700 22px Mono',AMB,'center',1);ctx.restore();});
    if(t>=N(7))stampAt('ON COMPTE.',0,h/2-110,80,t,N(7),-.07,GREEN);}
  else if(c.k==='law'){framePaper(w,h,PAPERC);txt('LE DROIT',0,-h/2+90,'700 30px Mono','rgba(27,28,26,.7)','center',6);txt('INTERDIRE UNE MANIF ?',0,-h/2+200,'80px Anton',INKD,'center',2);
    const L=[['C’est légal (code de la sécurité intérieure)',N(20)],['si troubles graves à l’ordre public prévus',N(20)+.4],['mais la mesure doit être :',N(21)],['NÉCESSAIRE · ADAPTÉE · PROPORTIONNÉE',N(21)+.3]];
    L.forEach(([s,t0],i)=>{if(t>=t0)txt(s,0,-h/2+310+i*62,i==3?'48px Anton':'400 32px Mono',i==3?PINK:INKD,'center',i==3?2:0,lin(t,t0,t0+.25));});
    if(t>=N(23))stampAt('UNE VILLE ENTIÈRE ?',0,h/2-220,64,t,N(23),-.07);
    if(t>=N(24))txt('→ À UN JUGE DE TRANCHER',0,h/2-90,'60px Anton',INKD,'center',2,lin(t,N(24),N(24)+.25));}
  else if(c.k==='accords'){framePaper(w,h,'rgba(40,43,40,.92)');txt('KOWEÏT · CE QUI A ÉTÉ SIGNÉ',0,-h/2+95,'700 32px Mono',AMB,'center',3);
    [['DÉFENSE','✓',N(39)],['INTELLIGENCE ARTIF.','✓',N(40)],['AVIONS AIRBUS','✓',N(41)]].forEach(([a,b,t0],i)=>rowItem(-h/2+230+i*125,w,a,b,t,t0,GREEN));
    if(t>=N(42)){rowItem(-h/2+605,w,'CARBURANT ?','',t,N(42));}
    if(t>=N(43)){const p=eo(lin(t,N(43),N(43)+.3));ctx.save();ctx.globalAlpha=p;ctx.fillStyle='rgba(201,48,44,.85)';ctx.fillRect(-w/2+50,-h/2+690,w-100,190);
      txt('STOCKS DE DIESEL →',0,-h/2+765,'58px Anton','#fff','center',2);if(t>=N(44))txt('LA RÉUNION · MAYOTTE',0,-h/2+845,'58px Anton','#fff','center',2,lin(t,N(44),N(44)+.2));ctx.restore();}
    srcLine('Sources : Kuwait Times · AFP/Boursorama',w,h);}
  else if(c.k==='pump'){framePaper(w,h);txt('PENDANT CE TEMPS, EN MÉTROPOLE',0,-h/2+95,'700 32px Mono',AMB,'center',3);
    const v=Math.round(595*eo(lin(t,N(47),N(47)+1.2)));if(t>=N(47)){txt(String(v),0,-h/2+330,'230px Anton',PINK,'center',2,1,20);txt('STATIONS À SEC',0,-h/2+420,'70px Anton',INK,'center',3);}
    if(t>=N(48)){ctx.fillStyle='rgba(128,134,126,.3)';ctx.fillRect(-300,-h/2+500,600,150);txt('GAZOLE',0,-h/2+550,'700 32px Mono',INK,'center',4,lin(t,N(48),N(48)+.2));txt('2,36 € / L',0,-h/2+630,'90px Anton',INK,'center',2,lin(t,N(48),N(48)+.2));}
    srcLine('Source : PrixCarbu (données du ministère de l’Économie), 18-19/10',w,h);}
  else if(c.k==='expert'){framePaper(w,h,PAPERC);txt('EFFET ATTENDU SUR LES PRIX ?',0,-h/2+150,'72px Anton',INKD,'center',2);stampAt('AUCUN',0,-h/2+330,130,t,c.t0+1.2,-.08);
    txt('— Francis Perrin, spécialiste de l’énergie (IRIS)',0,h/2-60,'400 28px Mono','rgba(27,28,26,.75)','center',0);}
  else if(c.k==='compteur'){framePaper(w,h,'rgba(30,32,30,.95)');txt('LE COMPTEUR',0,-h/2+130,'110px Anton',INK,'center',4,1,16);if(t>=N(51))txt('JOUR 1',0,-h/2+220,'700 40px Mono',AMB,'center',10,lin(t,N(51),N(51)+.2));
    [['MANIFS INTERDITES','1 VILLE ENTIÈRE',N(52),N(53),PINK],['MINISTRE DÉMISSIONNAIRE','1… RETENU',N(54),N(55),AMB],['MESURES POUR TON PLEIN','0',N(57),N(58),PINK]].forEach(([a,b,t0,t1,col],i)=>{if(t<t0)return;const y=-h/2+360+i*200;const q=eo(lin(t,t0,t0+.2));ctx.save();ctx.globalAlpha*=q;
      ctx.fillStyle='rgba(128,134,126,.25)';ctx.fillRect(-w/2+50,y-70,w-100,170);txt(a,0,y-10,'700 34px Mono','rgba(236,238,230,.8)','center',3);if(t>=t1)txt(b,0,y+75,(b=='0'?'120px':'72px')+' Anton',col,'center',2,lin(t,t1,t1+.15),18);ctx.restore();});}
  else if(c.k==='q'){framePaper(w,h,'rgba(40,43,40,.92)');txt('ET CHEZ TOI ?',0,-h/2+150,'100px Anton',INK,'center',2);txt('LA STATION EST',0,-h/2+290,'80px Anton',INK,'center',2,lin(t,N(63),N(63)+.2));txt('ENCORE OUVERTE ?',0,-h/2+390,'80px Anton',PINK,'center',2,lin(t,N(63)+.2,N(63)+.4));
    txt('DIS-LE EN COMMENTAIRE ↓',0,h/2-70,'700 40px Mono',AMB,'center',3,lin(t,c.t0,c.t0+.3));}
  laminate(w,h);
  if(c.k!=='cover'){pin(0,-h/2+18);tape(-w/2+40,-h/2+10,140,-.6);}else{pin(0,-h/2+10);}
  ctx.restore();
}
function outroCredits(t){const c=C[cOutro];ctx.save();ctx.translate(c.x,c.y+c.h/2+120);[['Sources : Élysée · franceinfo · France Inter · France 3 · préfecture de police 13 · France 24',0],['Kuwait Times · AFP/Boursorama · PrixCarbu · IRIS · code de la sécurité intérieure',40],['Images : France Inter, TF1 INFO, Associated Press, Remontees (CC BY-SA) · Musique : « Hitman », K. MacLeod · CC BY 4.0',80]].forEach(([s,y])=>txt(s,0,y,'400 20px Mono','rgba(236,238,230,.75)','center'));ctx.restore();}
