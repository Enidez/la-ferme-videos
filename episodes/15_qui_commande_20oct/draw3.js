function drawHook3(w,h,t){
  const fr=CLIPS.t2||[];const FRZ=MARK.frz,RES=MARK.res,POL=MARK.pol,TT=MARK.tt;let fi;
  if(t<FRZ)fi=Math.floor(t*30);else if(t<RES)fi=17;else fi=Math.min(fr.length-1,17+Math.floor((t-RES)*30));
  const im=fr[Math.max(0,Math.min(fr.length-1,fi))];
  ctx.fillStyle='#0b0c0b';ctx.fillRect(-w/2,-h/2,w,h);
  if(im){const zb=t<FRZ?1.1:t<RES?1.1+.35*eo(lin(t,FRZ,RES)):1.45+.05*(t-RES);const s=Math.max(w/im.width,h/im.height)*zb;const cx=300,cy=470;
    ctx.save();ctx.beginPath();ctx.rect(-w/2,-h/2,w,h);ctx.clip();
    const frz=t>=FRZ&&t<RES;ctx.filter=frz?'grayscale(.85) contrast(1.3) brightness(.8)':t>=POL?'grayscale(.6) contrast(1.2) brightness(.55)':'contrast(1.08)';
    ctx.drawImage(im,-cx*s,-cy*s+(-h*.05),im.width*s,im.height*s);ctx.restore();
    if(frz){const p=eo(lin(t,FRZ,FRZ+.12));ctx.save();ctx.globalAlpha=p*.9;ctx.strokeStyle=RED;ctx.lineWidth=8;ctx.beginPath();ctx.arc(0,-h*.05,170+10*Math.sin(t*6),0,6.283);ctx.stroke();ctx.restore();}}
  txt('VIDÉO : ANTHONY SMITH (LFI) · REIMS · 2 OCT. 2026',0,-h/2+215,'700 22px Mono','rgba(236,238,230,.75)','center',3);
  const sl=(s,y,f,col,ta,ls,gl)=>{if(t<ta)return;const q=eo(lin(t,ta,ta+.13));const sc=1.7-.7*q;const sh=t<ta+.22?(1-lin(t,ta,ta+.22))*12:0;ctx.save();ctx.translate(Math.sin(t*90)*sh,y+Math.cos(t*77)*sh);ctx.scale(sc,sc);txt(s,0,0,f,col,'center',ls,cl(q*1.5),gl);ctx.restore();};
  if(t>=FRZ&&t<RES){sl('POLICIER ?',-h/2+1180,'150px Anton',INK,N(1),5,14);sl('OU CASSEUR ?',-h/2+1360,'150px Anton',RED,N(2),5,10);}
  if(t>=RES&&t<POL){const q=lin(t,MARK.shout[0]+.2,MARK.shout[0]+.4);ctx.save();ctx.globalAlpha=q;ctx.fillStyle='rgba(10,10,10,.8)';ctx.fillRect(-w/2+60,-h/2+1290,w-120,110);txt('« QU’EST-CE QUE VOUS FAITES, MONSIEUR ? MONSIEUR ! »',0,-h/2+1360,'700 30px Mono',AMB,'center',1);ctx.restore();}
  if(t>=POL&&t<TT)stampAt('POLICIER.',0,-h/2+1150,190,t,POL,-.08);
  if(t>=TT){const p=eo(lin(t,TT,TT+.15));ctx.save();ctx.globalAlpha=p*.55;ctx.fillStyle='#000';ctx.fillRect(-w/2,-h/2,w,h);ctx.restore();
    stampAt('POLICIER.',0,-h/2+520,90,t,TT-.5,-.08);sl('QUI',-h/2+1060,'260px Anton',INK,TT,8,20);sl('COMMANDE ?',-h/2+1290,'200px Anton',RED,TT+.25,6,12);
    txt('DIX JOURS · QUATRE DOSSIERS · TOUT EST VÉRIFIÉ',0,-h/2+1420,'700 30px Mono',AMB,'center',3,lin(t,N(5),N(5)+.3));}
}
function cardExtra(c,t,w,h){
  if(c.k==='law2'){framePaper(w,h,PAPERC);txt('IL DOIT ÊTRE IDENTIFIABLE ?',0,-h/2+110,'64px Anton',INKD,'center',2);ctx.fillStyle='rgba(27,28,26,.25)';ctx.fillRect(-2,-h/2+160,4,h-330);
    const col=(x,ti,t0,lines,who)=>{if(t<t0)return;const q=eo(lin(t,t0,t0+.25));ctx.save();ctx.globalAlpha*=q;txt(ti,x,-h/2+220,'700 30px Mono','rgba(27,28,26,.7)','center',4);lines.forEach((s,i)=>txt(s,x,-h/2+300+i*64,'48px Anton',INKD,'center',1));txt(who,x,-h/2+300+lines.length*64+20,'400 22px Mono','rgba(27,28,26,.7)','center');ctx.restore();};
    col(-w/4,'LE JURISTE',N(14),['EN MAINTIEN','DE L’ORDRE :','BRASSARD','OBLIGATOIRE'],'O. Cahn, Paris-Nanterre');
    col(w/4,'LE PROCUREUR',N(17),['RIPOSTE À DES','ÉMEUTIERS','(PIERRES,','MORTIERS)'],'Parquet de Reims');
    if(t>=N(18))band(h/2-250,t,N(18),'« CADRE LÉGAL RESPECTÉ »',44,'rgba(27,28,26,.85)',INK);
    stampAt('PROVOCATION : NON PROUVÉ',0,h/2-110,54,t,N(20),-.06);return 1;}
  if(c.k==='ordres'){framePaper(w,h,'rgba(30,32,30,.95)');txt('LES ORDRES',0,-h/2+110,'90px Anton',INK,'center',4);
    const R=[['7 OCT.','GRENADES ASSOURDISSANTES','SUSPENDUES',N(34),GREEN],['14 OCT.','UN SYNDICAT DE POLICE','PORTE PLAINTE CONTRE L’ÉTAT',N(36),AMB],['16 OCT.','« TOUTES LES ARMES','DOIVENT POUVOIR SERVIR »',N(41),PINK]];
    R.forEach(([d,a,b,t0,col],i)=>{if(t<t0)return;const y=-h/2+260+i*230;const q=eo(lin(t,t0,t0+.25));ctx.save();ctx.globalAlpha*=q;ctx.fillStyle='rgba(128,134,126,.22)';ctx.fillRect(-w/2+40,y-60,w-80,190);
      txt(d,-w/2+70,y+20,'64px Anton',col,'left',2);txt(a,-w/2+290,y,'700 30px Mono',INK,'left',1);txt(b,-w/2+290,y+50,'700 30px Mono',col,'left',1);ctx.restore();});
    stampAt('2 ORDRES OPPOSÉS · 9 JOURS',0,h/2-110,60,t,N(43),-.06);srcLine('Sources : franceinfo · CNews · titrespresse',w,h);return 1;}
  if(c.k==='mille'){framePaper(w,h);txt('CÔTÉ FORCES DE L’ORDRE · 17 OCT.',0,-h/2+95,'700 30px Mono',AMB,'center',4);
    const v=Math.round(997*eo(lin(t,c.t0+.2,c.t0+1.5)));txt(String(v),0,-h/2+330,'240px Anton',PINK,'center',2,1,14);txt('POLICIERS ET GENDARMES',0,-h/2+420,'60px Anton',INK,'center',3);txt('BLESSÉS',0,-h/2+500,'70px Anton',INK,'center',3);
    if(t>=N(51)+.5){const p=eo(lin(t,N(51)+.5,N(51)+.8));ctx.save();ctx.globalAlpha*=p;ctx.fillStyle='rgba(10,10,10,.6)';ctx.fillRect(-w/2+50,-h/2+560,w-100,170);txt('« PERTE DE CONTRÔLE »',0,-h/2+645,'72px Anton',AMB,'center',2);txt('— Laurent Nuñez, ministre de l’Intérieur',0,-h/2+700,'400 26px Mono',INK,'center');ctx.restore();}
    srcLine('Sources : ministère de l’Intérieur · franceinfo',w,h);return 1;}
  if(c.k==='limoges'){framePaper(w,h,PAPERC);txt('LIMOGES · SAMEDI 17 OCTOBRE',0,-h/2+95,'700 30px Mono','rgba(27,28,26,.7)','center',3);
    txt('« DEUX POLICIERS',0,-h/2+230,'80px Anton',INKD,'center',2);txt('PILLENT LACOSTE »',0,-h/2+330,'80px Anton',INKD,'center',2);
    if(t>=N(53))txt('3 MILLIONS DE VUES',0,-h/2+430,'700 40px Mono','rgba(27,28,26,.8)','center',4,lin(t,N(53),N(53)+.2));
    stampAt('DÉMENTI PAR LE PARQUET',0,h/2-160,64,t,N(54),-.07);txt('Saisie sur instruction d’un officier de police judiciaire · enquête pour dénonciation calomnieuse',0,h/2-40,'400 19px Mono','rgba(27,28,26,.7)','center');return 1;}
  if(c.k==='vitesse'){framePaper(w,h,'rgba(30,32,30,.95)');txt('DEUX VITESSES',0,-h/2+110,'90px Anton',INK,'center',4);ctx.fillStyle='rgba(236,238,230,.3)';ctx.fillRect(-2,-h/2+160,4,h-230);
    const X=[-w/4,w/4];txt('LES CASSEURS',X[0],-h/2+230,'700 32px Mono',AMB,'center',3);txt('LES POLICIERS',X[1],-h/2+230,'700 32px Mono',AMB,'center',3);
    const it=(x,y,a,b,t0,big,col)=>{if(t<t0)return;const q=eo(lin(t,t0,t0+.2));ctx.save();ctx.globalAlpha*=q;txt(a,x,y,(big||80)+'px Anton',col||INK,'center',2);if(b)txt(b,x,y+50,'700 24px Mono','rgba(236,238,230,.75)','center',2);ctx.restore();};
    it(X[0],-h/2+380,'2 500','GARDES À VUE',N(56)+.4);it(X[0],-h/2+560,'× 3','AUDIENCES',N(57));it(X[0],-h/2+740,'48 H','PREMIÈRES CONDAMNATIONS',N(58));
    it(X[1],-h/2+380,'5','ENQUÊTES IGPN (LYCÉENS, PARIS)',N(60));it(X[1],-h/2+560,'406','DOSSIERS · GILETS JAUNES',N(62),70);it(X[1],-h/2+770,'4','CONDAMNATIONS',N(63),150,PINK);
    srcLine('Sources : min. de la Justice · franceinfo · Assemblée nationale',w,h);return 1;}
  if(c.k==='qui'){framePaper(w,h,'rgba(30,32,30,.95)');txt('LA VRAIE QUESTION,',0,-h/2+150,'700 40px Mono',AMB,'center',6);
    if(t>=N(69))txt('CE N’EST PAS QUI CASSE.',0,-h/2+270,'72px Anton','rgba(236,238,230,.6)','center',2,lin(t,N(69),N(69)+.2));
    if(t>=N(71)){const q=eo(lin(t,N(71),N(71)+.15));ctx.save();ctx.translate(0,-h/2+520);ctx.scale(1.5-.5*q,1.5-.5*q);txt('QUI COMMANDE ?',0,0,'130px Anton',PINK,'center',3,q,12);ctx.restore();}return 1;}
  if(c.k==='q2'){framePaper(w,h,'rgba(40,43,40,.92)');txt('POUR TOI,',0,-h/2+150,'90px Anton',INK,'center',2);txt('C’EST QUI',0,-h/2+260,'90px Anton',INK,'center',2,lin(t,N(77),N(77)+.2));txt('LE RESPONSABLE ?',0,-h/2+370,'90px Anton',PINK,'center',2,lin(t,N(77)+.3,N(77)+.5));
    txt('DIS-LE EN COMMENTAIRE ↓',0,h/2-70,'700 40px Mono',AMB,'center',3,lin(t,N(78),N(78)+.3));return 1;}
  return 0;}
