// source qui tient toujours dans la carte (règle d'Enidez du 20/10)
function srcFit(s,w,h,dark){let sz=22;while(sz>14&&mw(s,'400 '+sz+'px Mono')>w-48)sz--;txt(s,w/2-24,h/2-18,'400 '+sz+'px Mono',dark?'rgba(27,28,26,.6)':'rgba(236,238,230,.62)','right');}
function drawHook16(w,h,t){
  const FRZ=MARK.frz,frz=t>=FRZ,HF=CLIPS.hook||[];const im=HF[Math.max(0,Math.min(HF.length-1,Math.floor(t*30)))];   // vraie vidéo jusqu'à l'arrêt sur image
  ctx.fillStyle='#0b0c0b';ctx.fillRect(-w/2,-h/2,w,h);
  if(im){const zb=frz?1.07+.012*(t-FRZ):1.0+.006*t;const s=w/im.width*zb;
    ctx.save();ctx.beginPath();ctx.rect(-w/2,-h/2,w,h);ctx.clip();ctx.filter=frz?'grayscale(.9) contrast(1.3) brightness(.72)':'contrast(1.06)';
    ctx.drawImage(im,-im.width*s/2,-h/2+(h-im.height*s)*.3,im.width*s,im.height*s);ctx.restore();}
  if(frz){const p=eo(lin(t,FRZ,FRZ+.15));const g=ctx.createLinearGradient(0,-h/2+h*.44,0,-h/2+h*.62);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(0,0,0,${.9*p})`);ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2+h*.44,w,h*.56);}
  {const g=ctx.createLinearGradient(0,-h/2,0,-h/2+380);g.addColorStop(0,'rgba(0,0,0,.75)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,380);}
  txt('L’AUTRE ANGLE · LCI · LUNDI 19 OCTOBRE',0,-h/2+320,'700 28px Mono','rgba(236,238,230,.85)','center',4);
  const sl=(s,y,f,col,ta,ls,gl)=>{if(t<ta)return;const q=eo(lin(t,ta,ta+.13));const sc=1.7-.7*q;const sh=t<ta+.22?(1-lin(t,ta,ta+.22))*12:0;ctx.save();ctx.translate(Math.sin(t*90)*sh,y+Math.cos(t*77)*sh);ctx.scale(sc,sc);txt(s,0,0,f,col,'center',ls,cl(q*1.5),gl);ctx.restore();};
  if(frz){sl('IL N’ÉTAIT',-h/2+1130,'230px Anton',INK,FRZ,6,18);sl('PAS NÉ.',-h/2+1360,'260px Anton',RED,FRZ+.12,6,14);}
  const T3=Math.max(3.05,N(0));if(t>=T3)txt(t<N(1)?'UN CANDIDAT À LA PRÉSIDENTIELLE':'SUR LE MASSACRE DU 17 OCTOBRE 1961',0,-h/2+1450,'700 32px Mono',AMB,'center',3,lin(t,T3,T3+.2));
}
function cardExtra(c,t,w,h){
  if(c.k==='cut'){framePaper(w,h,'rgba(30,32,30,.95)');txt('LA SÉQUENCE',0,-h/2+140,'90px Anton',INK,'center',3);txt('TOURNE PARTOUT.',0,-h/2+250,'90px Anton',INK,'center',3);
    if(t>=N(5)){const p=eo(lin(t,N(5),N(5)+.5));ctx.save();ctx.setLineDash([26,16]);ctx.strokeStyle=PINK;ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(-w/2+30,-h/2+330);ctx.lineTo(-w/2+30+(w-60)*p,-h/2+330);ctx.stroke();ctx.restore();
      txt('✂',-w/2+30+(w-60)*p,-h/2+348,'60px Mono',PINK,'center');}
    stampAt('COUPÉE.',0,-h/2+470,130,t,N(5)+.15,-.07);
    if(t>=N(6))txt('3 CHOSES QU’ELLE NE TE MONTRE PAS',0,h/2-70,'700 36px Mono',AMB,'center',2,lin(t,N(6),N(6)+.3));return 1;}
  if(c.k==='chif'){framePaper(w,h);txt('17 OCTOBRE 1961 · PARIS',0,-h/2+95,'700 32px Mono',AMB,'center',5);
    txt('20 000 – 30 000',0,-h/2+260,'120px Anton',INK,'center',2,lin(t,c.t0+.1,c.t0+.3),12);txt('ALGÉRIENS MANIFESTENT',0,-h/2+340,'58px Anton',INK,'center',2,lin(t,c.t0+.3,c.t0+.5));
    txt('CONTRE LE COUVRE-FEU · À L’APPEL DU FLN',0,-h/2+400,'700 28px Mono','rgba(236,238,230,.75)','center',2,lin(t,c.t0+.6,c.t0+.9));
    if(t>=N(19)){const v=Math.round(11518*eo(lin(t,N(19),N(19)+1.2)));txt(v.toLocaleString('fr-FR').replace(/ /g,' '),0,-h/2+640,'210px Anton',PINK,'center',2,1,16);txt('ARRESTATIONS · LE 17',0,-h/2+720,'60px Anton',INK,'center',3);}
    srcFit('Sources : préfecture de police (1961) · Wikipédia « Massacre du 17 octobre 1961 »',w,h);return 1;}
  if(c.k==='morts'){framePaper(w,h,'rgba(30,32,30,.95)');txt('COMBIEN DE MORTS ?',0,-h/2+130,'100px Anton',INK,'center',3);ctx.fillStyle='rgba(236,238,230,.3)';ctx.fillRect(-2,-h/2+190,4,h-280);
    const X=[-w/4,w/4];txt('LA PRÉFECTURE, 1961',X[0],-h/2+260,'700 28px Mono',AMB,'center',2);txt('LES HISTORIENS',X[1],-h/2+260,'700 28px Mono',AMB,'center',2);
    if(t>=N(22)){const q=eo(lin(t,N(22)+.5,N(22)+.7));ctx.save();ctx.translate(X[0],-h/2+560);ctx.scale(1.5-.5*q,1.5-.5*q);txt('2',0,0,'300px Anton',INK,'center',2,q,14);ctx.restore();txt('MORTS ANNONCÉS',X[0],-h/2+640,'40px Anton',INK,'center',2,q);}
    if(t>=N(24))txt('DES',X[1],-h/2+400,'80px Anton',INK,'center',2,lin(t,N(24),N(24)+.2));
    if(t>=N(24))txt('DIZAINES',X[1],-h/2+500,'90px Anton',INK,'center',2,lin(t,N(24)+.2,N(24)+.4));
    if(t>=N(25)){const q=eo(lin(t,N(25),N(25)+.2));txt('PEUT-ÊTRE',X[1],-h/2+620,'56px Anton',PINK,'center',2,q);txt('+ DE 100',X[1],-h/2+730,'110px Anton',PINK,'center',2,q,16);}
    srcFit('Sources : rapports Mandelkern (1998), Géronimi (1999) · J.-P. Brunet · House & MacMaster',w,h);return 1;}
  if(c.k==='hol'){framePaper(w,h,PAPERC);txt('17 OCTOBRE 2012',0,-h/2+95,'700 30px Mono','rgba(27,28,26,.7)','center',4);txt('FRANÇOIS HOLLANDE',0,-h/2+210,'80px Anton',INKD,'center',2);
    txt('LA RÉPUBLIQUE RECONNAÎT',0,-h/2+290,'700 30px Mono','rgba(27,28,26,.75)','center',2);
    if(t>=N(28)+.4){const s='« SANGLANTE RÉPRESSION »',f='76px Anton',mm=mw(s,f,2),p=eo(lin(t,N(28)+.4,N(28)+.8));ctx.fillStyle='rgba(201,48,44,.9)';ctx.fillRect(-mm/2-18,-h/2+350,(mm+36)*p,100);txt(s,0,-h/2+428,f,p>.6?'#fff':INKD,'center',2);}
    srcFit('Source : présidence de la République, communiqué du 17/10/2012',w,h,1);return 1;}
  if(c.k==='depuis'){framePaper(w,h,'rgba(30,32,30,.95)');txt('DEPUIS LUNDI',0,-h/2+120,'90px Anton',INK,'center',4);ctx.fillStyle='rgba(236,238,230,.3)';ctx.fillRect(-2,-h/2+170,4,h-380);
    const it=(x,a,b,t0,col)=>{if(t<t0)return;const q=eo(lin(t,t0,t0+.2));txt(a,x,-h/2+300,'64px Anton',col,'center',2,q);txt(b,x,-h/2+380,'64px Anton',col,'center',2,q);};
    it(-w/4,'LA GAUCHE','DÉNONCE',N(32),INK);it(w/4,'D’AUTRES','LE SOUTIENNENT',N(33),INK);
    stampAt('LUI N’A RIEN RETIRÉ',0,h/2-170,72,t,N(34),-.06);srcFit('Au 20 octobre 2026 : ni excuse, ni clarification',w,h);return 1;}
  if(c.k==='ne'){framePaper(w,h,'rgba(30,32,30,.95)');txt('IL N’ÉTAIT PAS NÉ.',0,-h/2+150,'96px Anton',INK,'center',3);txt('NOUS NON PLUS.',0,-h/2+270,'96px Anton','rgba(236,238,230,.7)','center',3);
    const T=c.t0+.15;if(t>=T){const q=eo(lin(t,T,T+.15));ctx.save();ctx.translate(0,-h/2+470);ctx.scale(1.4-.4*q,1.4-.4*q);txt('C’EST POUR ÇA',0,0,'92px Anton',PINK,'center',3,q,14);txt('QU’ON LE RACONTE.',0,110,'92px Anton',PINK,'center',3,q,14);ctx.restore();}return 1;}
  if(c.k==='q2'){framePaper(w,h,'rgba(40,43,40,.92)');txt('POUR TOI,',0,-h/2+140,'90px Anton',INK,'center',2);txt('ON DOIT ENCORE',0,-h/2+250,'90px Anton',INK,'center',2,lin(t,c.t0+.3,c.t0+.5));txt('EN PARLER ?',0,-h/2+370,'100px Anton',PINK,'center',2,lin(t,c.t0+.8,c.t0+1),14);
    txt('DIS-LE EN COMMENTAIRE ↓',0,h/2-70,'700 40px Mono',AMB,'center',3,lin(t,N(39),N(39)+.3));return 1;}
  return 0;}
