// source qui tient toujours dans la carte (règle d'Enidez du 20/10)
function srcFit(s,w,h,dark){let sz=22;while(sz>14&&mw(s,'400 '+sz+'px Mono')>w-48)sz--;txt(s,w/2-24,h/2-18,'400 '+sz+'px Mono',dark?'rgba(27,28,26,.6)':'rgba(236,238,230,.62)','right');}
function VF(k,t,t0){const f=k&&window.CLIPS&&CLIPS[k];if(!f||!f.length)return null;return f[Math.min(f.length-1,Math.max(0,Math.floor((t-t0)*30)))];}
function fmtN(v){return Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g,' ');}
function rr(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
function shake(t,t0,dur,amp){if(t<t0||t>t0+dur)return;const k=1-(t-t0)/dur;ctx.translate(Math.sin(t*97)*amp*k,Math.cos(t*83)*amp*k);}
function slam(s,x,y,size,col,t,t0,ls=4,glow=22){if(t<t0)return;const q=eo(lin(t,t0,t0+.14));ctx.save();ctx.translate(x,y);shake(t,t0,.3,14);ctx.scale(1.7-.7*q,1.7-.7*q);let sz=+size;while(sz>30&&mw(s,sz+'px Anton',ls)>840)sz-=4;txt(s,0,0,sz+'px Anton',col,'center',ls,cl(q*1.5),glow);ctx.restore();}
// ---------- couverture : le vrai tableau, net, et la question
function drawHook26(w,h,t){
  const Y=v=>-h/2+v,im=IM.egypte;
  ctx.fillStyle='#050605';ctx.fillRect(-w/2,-h/2,w,h);
  if(im){const z=1.0+.008*t;const s=Math.max(w/im.width,h/im.height)*z;ctx.save();ctx.beginPath();ctx.rect(-w/2,-h/2,w,h);ctx.clip();
    ctx.filter='saturate(.9) contrast(1.08)';ctx.drawImage(im,-im.width*s*.5,-h/2-(im.height*s-h)*.2,im.width*s,im.height*s);ctx.restore();}
  {const g=ctx.createLinearGradient(0,Y(1050),0,Y(1560));g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.92)');ctx.fillStyle=g;ctx.fillRect(-w/2,Y(1050),w,870);}
  {const g=ctx.createLinearGradient(0,-h/2,0,Y(330));g.addColorStop(0,'rgba(0,0,0,.7)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,330);}
  txt('LE RÉCIT VS LE RÉEL',0,Y(250),'700 30px Mono','rgba(236,238,230,.9)','center',6);
  txt('NAPOLÉON',0,Y(1240),'190px Anton',INK,'center',5,1,24);txt('ÉTAIT',0,Y(1350),'100px Anton',INK,'center',5,1,20);txt('MUSULMAN ?',0,Y(1490),'150px Anton',RED,'center',5,1,26);
  txt('J.-L. Gérôme, « Napoleon in Egypt » (1868) · domaine public',0,Y(1545),'400 18px Mono','rgba(236,238,230,.6)','center',1);
}
function verdictStamp(c,w,h,t){if(c.verdict){const[s,t0,col]=c.verdict;stampAt(s,w/2-230,h/2-150,96,t,t0,-.14,col);}}
function cardExtra(c,t,w,h){
  if(c.k==='doc'){framePaper(w,h,PAPERC);txt(c.hd,0,-h/2+95,'700 24px Mono','rgba(27,28,26,.7)','center',2);
    {let z=120;while(z>50&&mw(c.big,z+'px Anton',2)>w-80)z-=4;txt(c.big,0,-h/2+250,z+'px Anton',INKD,'center',2);}
    {let z=60;while(z>30&&mw(c.l2,z+'px Anton',2)>w-80)z-=2;txt(c.l2,0,-h/2+340,z+'px Anton',PINK,'center',2,lin(t,c.t0+.3,c.t0+.5));}
    (c.rows||[]).forEach(([s,t0],i)=>{if(t<t0)return;const q=eo(lin(t,t0,t0+.25));const y=-h/2+470+i*100;ctx.save();ctx.globalAlpha*=q;let z=50;while(z>24&&mw(s,z+'px Anton',2)>w-120)z-=2;
      ctx.fillStyle='rgba(27,28,26,.9)';ctx.fillRect(-w/2+50,y-z,w-100,z*1.45);txt(s,0,y+z*.1,z+'px Anton',i?RED:INK,'center',2);ctx.restore();});
    srcFit(c.src||'',w,h,1);verdictStamp(c,w,h,t);return 1;}
  if(c.k==='verif'){framePaper(w,h,'rgba(30,32,30,.95)');txt('ALORS',0,-h/2+150,'700 40px Mono',AMB,'center',10);slam('ON A VÉRIFIÉ.',0,-h/2+340,'130',INK,t,c.t0+.1,3);
    txt('SOURCES D’ÉPOQUE · MOT POUR MOT',0,h/2-90,'700 30px Mono','rgba(236,238,230,.7)','center',4,lin(t,c.t0+.5,c.t0+.8));return 1;}
  if(c.k==='roederer'){framePaper(w,h,'rgba(232,229,218,.97)');txt('CONSEIL D’ÉTAT · AOÛT 1800 · RAPPORTÉ PAR ROEDERER',0,-h/2+80,'700 24px Mono','rgba(27,28,26,.7)','center',1);
    txt('« MOT POUR MOT »',0,-h/2+150,'56px Anton',INKD,'center',3);
    const row=(y,a,b,col,t0)=>{if(t<t0)return;const q=eo(lin(t,t0,t0+.2));ctx.save();ctx.globalAlpha*=q;ctx.fillStyle='rgba(27,28,26,.9)';ctx.fillRect(-w/2+40,y-60,w-80,100);txt(a,-w/2+70,y+8,'44px Anton',INK,'left',2);ctx.restore();let bs=56;while(bs>26&&mw(b,bs+'px Anton',2)>400)bs-=2;slam(b,w/2-230,y+12,String(bs),col,t,t0+.4,2);};
    row(-h/2+280,'EN VENDÉE','CATHOLIQUE',INK,N(13)+.3);row(-h/2+400,'EN ÉGYPTE','MUSULMAN',AMB,N(13)+3.3);row(-h/2+520,'PEUPLE JUIF','TEMPLE DE SALOMON',INK,N(14)+1.2);
    if(t>=N(15)+2.5){ctx.fillStyle='rgba(201,48,44,.92)';ctx.fillRect(-w/2+40,-h/2+620,w-80,130);txt('UNE RELIGION',0,-h/2+672,'52px Anton','#fff','center',3);txt('PAR PAYS À CONQUÉRIR',0,-h/2+732,'52px Anton','#fff','center',3);}
    stampAt('STRATÉGIE',0,h/2-150,120,t,N(16)+2.2,-.08,ORANGE);txt('FAUX',w/2-120,h/2-60,'64px Anton',PINK,'center',3,lin(t,N(16)+1.2,N(16)+1.4));
    srcFit('Sources : P.-L. Roederer, Œuvres (1856) · Wikiquote',w,h,1);return 1;}
  if(c.k==='helene'){framePaper(w,h,'rgba(18,22,26,.98)');panel(IM.egypte,-w/2+30,-h/2+30,w-60,h-60,.5,1.2,'grayscale(1) brightness(.35) blur(1px)');
    // l'île au milieu de l'océan
    ctx.fillStyle='rgba(120,140,150,.25)';ctx.fillRect(-w/2+30,-h/2+420,w-60,3);ctx.fillStyle='#0d1012';ctx.beginPath();ctx.moveTo(-140,-h/2+420);ctx.quadraticCurveTo(-60,-h/2+300,20,-h/2+340);ctx.quadraticCurveTo(110,-h/2+290,160,-h/2+420);ctx.fill();
    slam('SAINTE-HÉLÈNE',0,-h/2+180,'110',INK,t,N(18),4);txt('1815 → 1821 · L’EXIL',0,-h/2+240,'700 32px Mono',AMB,'center',4,lin(t,N(18)+.6,N(18)+.9));
    [['PLUS D’ARMÉE.',N(19)+.4],['PLUS RIEN À CONQUÉRIR.',N(19)+2.2]].forEach(([s,t0],i)=>{if(t>=t0)txt(s,0,-h/2+560+i*100,'72px Anton',i?RED:INK,'center',3,lin(t,t0,t0+.2),14);});return 1;}
  if(c.k==='testament'){framePaper(w,h,'rgba(236,226,200,.98)');txt('TESTAMENT · LONGWOOD · 15 AVRIL 1821',0,-h/2+90,'700 28px Mono','rgba(60,40,20,.75)','center',2);
    const L=['« Je meurs dans la religion','apostolique et romaine,','dans le sein de laquelle','je suis né. »'];const T0=N(24);
    L.forEach((s,i)=>{const t0=T0+i*.9;if(t<t0)return;const n=Math.floor(s.length*lin(t,t0,t0+.8));txt(s.slice(0,n),-w/2+80,-h/2+230+i*90,'italic 700 58px Osw','#3a2a16','left',1);});
    if(t>=T0+3.6)underline(t,T0+3.6,-w/2+80,w/2-120,-h/2+330,1e9);
    txt('— Napoléon',w/2-90,-h/2+600,'italic 700 44px Osw','#3a2a16','right',1,lin(t,T0+3.6,T0+3.9));
    stampAt('DERNIERS SACREMENTS : UN PRÊTRE CATHOLIQUE',0,h/2-170,40,t,N(25)+.4,-.05);
    srcFit('Sources : Fondation Napoléon (testament, 15/04/1821) · abbé Vignali',w,h,1);return 1;}
  if(c.k==='bilan'){framePaper(w,h,'rgba(24,26,24,.97)');txt('LE BILAN',0,-h/2+90,'700 40px Mono',AMB,'center',10);
    const blk=(y,a,b,col,t0,ta)=>{if(t<ta)return;ctx.save();ctx.globalAlpha*=eo(lin(t,ta,ta+.2));ctx.fillStyle='rgba(128,134,126,.22)';ctx.fillRect(-w/2+50,y-60,w-100,200);txt(a,0,y,'700 34px Mono','rgba(236,238,230,.85)','center',3);ctx.restore();slam(b,0,y+100,'70',col,t,t0,2);};
    blk(-h/2+200,'MUSULMAN ?','ON NE SAURA PEUT-ÊTRE JAMAIS',AMB,N(26)+2.05,N(26));
    blk(-h/2+470,'ADMIRATEUR DE L’ISLAM ?','JUSQU’AU BOUT',VERT,N(26)+5.95,N(26)+4.0);return 1;}
  if(c.k==='q'){framePaper(w,h,'rgba(40,43,40,.92)');['PLUS D’ARMÉE.','PLUS DE POUVOIR.','PLUS RIEN À GAGNER.'].forEach((s,i)=>{const t0=N(28)+.2+i*1.1;if(t>=t0)txt(s,0,-h/2+110+i*70,'56px Anton',INK,'center',2,lin(t,t0,t0+.15));});
    if(t>=N(28)+3.8)txt('POURQUOI FAIRE L’ÉLOGE DE L’ISLAM ?',0,-h/2+360,'52px Anton',AMB,'center',2,lin(t,N(28)+3.8,N(28)+4));
    slam('STRATÈGE…',0,-h/2+520,'120',VERT,t,N(29),4,18);slam('OU SINCÈRE ?',0,-h/2+660,'110',RED,t,N(29)+1.0,3,24);txt('DIS-LE EN COMMENTAIRE ↓',0,h/2-50,'700 36px Mono',AMB,'center',3,lin(t,N(30),N(30)+.3));return 1;}
  return 0;}
