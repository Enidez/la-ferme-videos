// source qui tient toujours dans la carte (règle d'Enidez du 20/10)
function srcFit(s,w,h,dark){let sz=22;while(sz>14&&mw(s,'400 '+sz+'px Mono')>w-48)sz--;txt(s,w/2-24,h/2-18,'400 '+sz+'px Mono',dark?'rgba(27,28,26,.6)':'rgba(236,238,230,.62)','right');}
function photo(im,x,y,pw,ph,gray){ctx.fillStyle='#000';ctx.fillRect(x-pw/2,y-ph/2,pw,ph);if(!im)return;ctx.save();ctx.beginPath();ctx.rect(x-pw/2,y-ph/2,pw,ph);ctx.clip();const s=Math.max(pw/im.width,ph/im.height);
  ctx.filter=gray?'grayscale(1) contrast(1.1)':'saturate(.85) contrast(1.06)';ctx.drawImage(im,x-im.width*s/2,y-ph/2-(im.height*s-ph)*.25,im.width*s,im.height*s);ctx.restore();}
function drawHook18(w,h,t){
  const FRZ=MARK.frz,frz=t>=FRZ,im=IM.macron2015||IM.macron;
  ctx.fillStyle='#0b0c0b';ctx.fillRect(-w/2,-h/2,w,h);
  if(im){const zb=frz?1.12+.01*(t-FRZ):1.02+.03*t;const s=Math.max(w/im.width,h/im.height)*zb;ctx.save();ctx.beginPath();ctx.rect(-w/2,-h/2,w,h);ctx.clip();
    ctx.filter=frz?'grayscale(.9) contrast(1.3) brightness(.7)':'contrast(1.06) brightness(.9)';ctx.drawImage(im,-im.width*s/2,-h/2-(im.height*s-h)*.2,im.width*s,im.height*s);ctx.restore();}
  {const g=ctx.createLinearGradient(0,-h/2+h*.42,0,-h/2+h*.66);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.9)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2+h*.42,w,h*.58);}
  {const g=ctx.createLinearGradient(0,-h/2,0,-h/2+380);g.addColorStop(0,'rgba(0,0,0,.75)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,380);}
  txt('LE DOSSIER · EMMANUEL MACRON',0,-h/2+320,'700 28px Mono','rgba(236,238,230,.85)','center',4);
  txt(IMC('macron2015'),0,-h/2+1500,'400 18px Mono','rgba(236,238,230,.6)','center',2);
  const sl=(s,y,f,col,ta,ls,gl)=>{if(t<ta)return;const q=eo(lin(t,ta,ta+.13));const sc=1.7-.7*q;const sh=t<ta+.22?(1-lin(t,ta,ta+.22))*12:0;ctx.save();ctx.translate(Math.sin(t*90)*sh,y+Math.cos(t*77)*sh);ctx.scale(sc,sc);txt(s,0,0,f,col,'center',ls,cl(q*1.5),gl);ctx.restore();};
  if(!frz)txt('« LE BANQUIER QUI ALLAIT',0,-h/2+1160,'86px Anton',INK,'center',2,lin(t,.1,.4)),txt('REDRESSER LA FRANCE »',0,-h/2+1260,'86px Anton',AMB,'center',2,lin(t,.6,.9));
  if(frz){sl('D’OÙ',-h/2+1130,'250px Anton',INK,FRZ,6,18);sl('IL VIENT.',-h/2+1360,'250px Anton',RED,FRZ+.12,6,14);}
  if(t>=3.1)txt('SIX DOSSIERS · TOUT EST SOURCÉ',0,-h/2+1450,'700 32px Mono',AMB,'center',3,lin(t,3.1,3.3));
}
function cardExtra(c,t,w,h){
  if(c.k==='duo'){framePaper(w,h,'rgba(30,32,30,.95)');txt(c.title,0,-h/2+100,'70px Anton',INK,'center',3);
    const pw=w/2-60,ph=h-330,X=[-w/4,w/4];[[c.a,c.la,c.ta,X[0]],[c.b,c.lb,c.tb,X[1]]].forEach(([k,l,t0,x])=>{if(t<t0-.05)return;const q=eo(lin(t,t0-.05,t0+.25));ctx.save();ctx.globalAlpha*=q;photo(IM[k],x,-h/2+150+ph/2,pw,ph,1);
      ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=3;ctx.strokeRect(x-pw/2,-h/2+150,pw,ph);txt(l,x,-h/2+190+ph,'44px Anton',INK,'center',2);ctx.restore();});
    if(c.bandS)band(-h/2+150+ph-60,t,c.bandT,c.bandS,44,DK,AMB);
    if(c.stampS)stampAt(c.stampS,0,-h/2+260,84,t,c.stampT,-.07);
    srcFit([IMC(c.a),IMC(c.b)].filter(Boolean).join(' · '),w,h);return 1;}
  if(c.k==='deal'){framePaper(w,h,PAPERC);txt('2012 · LE CONTRAT',0,-h/2+95,'700 30px Mono','rgba(27,28,26,.7)','center',4);
    txt('NESTLÉ',-w/4+10,-h/2+250,'100px Anton',INKD,'center',2);txt('PFIZER',w/4-10,-h/2+250,'100px Anton',INKD,'center',2);txt('←',0,-h/2+245,'90px Anton',PINK,'center');
    txt('LE LAIT INFANTILE DE PFIZER RACHETÉ PAR NESTLÉ',0,-h/2+320,'700 26px Mono','rgba(27,28,26,.75)','center',1);
    if(t>=N(21)){const q=eo(lin(t,N(21),N(21)+.3));ctx.save();ctx.translate(0,-h/2+500);ctx.scale(1.4-.4*q,1.4-.4*q);txt('≈ 9 MILLIARDS €',0,0,'130px Anton',PINK,'center',2,q,14);ctx.restore();}
    txt('PILOTÉ PAR LE BANQUIER EMMANUEL MACRON',0,-h/2+580,'700 28px Mono','rgba(27,28,26,.8)','center',1,lin(t,N(20)+.5,N(20)+.8));
    stampAt('« MILLIONNAIRE »',0,h/2-170,90,t,N(22)+.8,-.07);txt('selon la presse',0,h/2-80,'400 26px Mono','rgba(27,28,26,.7)','center',1,lin(t,N(22)+.8,N(22)+1));
    srcFit('Sources : presse économique (2012) · franceinfo',w,h,1);return 1;}
  if(c.k==='patrons'){framePaper(w,h,'rgba(30,32,30,.95)');txt('AUTOUR DE LA TABLE',0,-h/2+110,'80px Anton',INK,'center',3);
    [['SUEZ',N(30)],['SANOFI',N(31)],['RHODIA',N(32)]].forEach(([s,t0],i)=>{if(t<t0)return;const q=eo(lin(t,t0,t0+.15));const y=-h/2+260+i*150;ctx.save();ctx.globalAlpha*=q;ctx.fillStyle='rgba(128,134,126,.25)';ctx.fillRect(-w/2+80,y-75,w-160,115);
      txt('PATRON DE',-w/2+120,y,'700 28px Mono','rgba(236,238,230,.7)','left',3);txt(s,w/2-120,y+8,'90px Anton',PINK,'right',3);ctx.restore();});
    srcFit('Source : Le Monde, G. Davet et F. Lhomme, 29/08/2019 (témoignage de F. Rebsamen)',w,h);return 1;}
  if(c.k==='dette'){framePaper(w,h,'rgba(30,32,30,.95)');txt('LA DETTE DE LA FRANCE',0,-h/2+110,'86px Anton',INK,'center',3);
    const base=h/2-170,H=520,bw=260,bar=(x,v,lab,pct,t0,col)=>{if(t<t0)return;const p=eo(lin(t,t0,t0+1.1));const bh=H*v/3600*p;ctx.fillStyle=col;ctx.fillRect(x-bw/2,base-bh,bw,bh);
      txt(Math.round(v*p).toLocaleString('fr-FR').replace(/ /g,' ')+' Md€',x,base-bh-60,'64px Anton',INK,'center',2);txt(pct,x,base-bh-18,'700 28px Mono',AMB,'center',2,lin(t,t0+.9,t0+1.1));txt(lab,x,base+50,'48px Anton',INK,'center',2);};
    bar(-w/4+10,2258,'FIN 2017','98,5 % DU PIB',N(50),'rgba(236,238,230,.55)');bar(w/4-10,3596,'MI-2026','119 % DU PIB',N(51),PINK);
    ctx.fillStyle='rgba(236,238,230,.4)';ctx.fillRect(-w/2+60,base,w-120,3);
    srcFit('Source : Insee (dette au sens de Maastricht, fin 2017 ; fin du 2e trimestre 2026)',w,h);return 1;}
  if(c.k==='notes'){framePaper(w,h,PAPERC);txt('IL Y A EU…',0,-h/2+110,'70px Anton',INKD,'center',3);
    [['LE COVID',N(53),-w/4],['LA CRISE DE L’ÉNERGIE',N(54),w/4]].forEach(([s,t0,x])=>{if(t<t0)return;txt(s,x,-h/2+220,'56px Anton',INKD,'center',2,lin(t,t0,t0+.2));});
    if(t>=N(55))txt('MAIS EN 2025…',0,-h/2+340,'60px Anton',INKD,'center',2,lin(t,N(55),N(55)+.2));
    stampAt('FITCH : A+',-w/4+20,-h/2+500,72,t,N(56)+.3,-.08);stampAt('S&P : A+',w/4-20,-h/2+520,72,t,N(56)+.8,.06);
    if(t>=N(56)+1.2)txt('LA NOTE DE LA FRANCE DÉGRADÉE',0,h/2-120,'700 32px Mono',INKD,'center',2,lin(t,N(56)+1.2,N(56)+1.4));
    srcFit('Sources : Fitch (12/09/2025) · S&P (2025) · AFP',w,h,1);return 1;}
  if(c.k==='banque'){framePaper(w,h,'rgba(30,32,30,.95)');txt('LE BANQUIER DEVAIT',0,-h/2+140,'84px Anton','rgba(236,238,230,.75)','center',3);txt('REDRESSER LE PAYS.',0,-h/2+240,'84px Anton','rgba(236,238,230,.75)','center',3);
    if(t>=c.t0+.1)txt('ET S’IL L’AVAIT DIRIGÉ…',0,-h/2+400,'84px Anton',INK,'center',3,lin(t,c.t0+.1,c.t0+.3));
    if(t>=N(59)){const q=eo(lin(t,N(59),N(59)+.15));ctx.save();ctx.translate(0,-h/2+560);ctx.scale(1.4-.4*q,1.4-.4*q);txt('COMME UNE BANQUE ?',0,0,'110px Anton',PINK,'center',3,q,16);ctx.restore();}return 1;}
  if(c.k==='oubli'){framePaper(w,h,'rgba(40,43,40,.92)');txt('ILS MISENT',0,-h/2+150,'100px Anton',INK,'center',3);txt('SUR L’OUBLI.',0,-h/2+260,'100px Anton',INK,'center',3);
    if(t>=N(61)){const q=eo(lin(t,N(61),N(61)+.2));txt('NOUS, ON GARDE LES PREUVES.',0,-h/2+420,'76px Anton',PINK,'center',2,q,14);}return 1;}
  if(c.k==='q2'){framePaper(w,h,'rgba(40,43,40,.92)');txt('POUR TOI :',0,-h/2+130,'80px Anton',INK,'center',2);txt('IL A REDRESSÉ LA FRANCE…',0,-h/2+260,'80px Anton',INK,'center',2,lin(t,N(64),N(64)+.2));
    txt('OU IL L’A PLOMBÉE ?',0,-h/2+390,'100px Anton',PINK,'center',2,lin(t,N(65),N(65)+.2),14);txt('DIS-LE EN COMMENTAIRE ↓',0,h/2-70,'700 40px Mono',AMB,'center',3,lin(t,N(66),N(66)+.3));return 1;}
  return 0;}
