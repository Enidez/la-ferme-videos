// source qui tient toujours dans la carte (règle d'Enidez du 20/10)
function srcFit(s,w,h,dark){let sz=22;while(sz>14&&mw(s,'400 '+sz+'px Mono')>w-48)sz--;txt(s,w/2-24,h/2-18,'400 '+sz+'px Mono',dark?'rgba(27,28,26,.6)':'rgba(236,238,230,.62)','right');}
function VF(k,t,t0){const f=k&&window.CLIPS&&CLIPS[k];if(!f||!f.length)return null;return f[Math.min(f.length-1,Math.max(0,Math.floor((t-t0)*30)))];}
function fmtN(v){return Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g,' ');}
function rr(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
function shake(t,t0,dur,amp){if(t<t0||t>t0+dur)return;const k=1-(t-t0)/dur;ctx.translate(Math.sin(t*97)*amp*k,Math.cos(t*83)*amp*k);}
function slam(s,x,y,size,col,t,t0,ls=4,glow=22){if(t<t0)return;const q=eo(lin(t,t0,t0+.14));ctx.save();ctx.translate(x,y);shake(t,t0,.3,14);ctx.scale(1.7-.7*q,1.7-.7*q);let sz=+size;while(sz>30&&mw(s,sz+'px Anton',ls)>840)sz-=4;txt(s,0,0,sz+'px Anton',col,'center',ls,cl(q*1.5),glow);ctx.restore();}
function lined(x,y,w,h){ctx.fillStyle='#f4f1e6';ctx.fillRect(x,y,w,h);ctx.strokeStyle='rgba(80,120,190,.35)';ctx.lineWidth=2;for(let yy=y+90;yy<y+h;yy+=62){ctx.beginPath();ctx.moveTo(x,yy);ctx.lineTo(x+w,yy);ctx.stroke();}ctx.strokeStyle='rgba(210,60,60,.45)';ctx.beginPath();ctx.moveTo(x+70,y);ctx.lineTo(x+70,y+h);ctx.stroke();}
// ---------- couverture : son visage, net, la question ; puis la lettre de la petite fille
function drawHook27(w,h,t){
  const Y=v=>-h/2+v,im=IM.einstein,L2=N(2);
  ctx.fillStyle='#050605';ctx.fillRect(-w/2,-h/2,w,h);
  if(im){const z=1.0+.008*t;const s=Math.max(w/im.width,h/im.height)*z;ctx.save();ctx.beginPath();ctx.rect(-w/2,-h/2,w,h);ctx.clip();
    ctx.filter=t<L2?'saturate(.9) contrast(1.08)':'saturate(.5) brightness(.6) contrast(1.1)';ctx.drawImage(im,-im.width*s*.55,-h/2-(im.height*s-h)*.05,im.width*s,im.height*s);ctx.restore();}
  {const g=ctx.createLinearGradient(0,Y(1050),0,Y(1560));g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.92)');ctx.fillStyle=g;ctx.fillRect(-w/2,Y(1050),w,870);}
  {const g=ctx.createLinearGradient(0,-h/2,0,Y(330));g.addColorStop(0,'rgba(0,0,0,.7)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,330);}
  txt('LE RÉCIT VS LE RÉEL',0,Y(250),'700 30px Mono','rgba(236,238,230,.9)','center',6);
  if(t<L2){txt('EINSTEIN',0,Y(1230),'190px Anton',INK,'center',5,1,24);txt('CROYAIT EN',0,Y(1350),'100px Anton',INK,'center',5,1,20);txt('DIEU ?',0,Y(1500),'170px Anton',RED,'center',6,1,26);
    txt('Photo : F. Schmutzer (1921) · domaine public',0,Y(1545),'400 18px Mono','rgba(236,238,230,.6)','center',1);}
  else{// la lettre de Phyllis
    const p=eback(lin(t,L2,L2+.6));ctx.save();ctx.translate(0,Y(960)+(1-p)*900);ctx.rotate(-.03);const W2=820,H2=520;ctx.shadowColor='rgba(0,0,0,.6)';ctx.shadowBlur=40;lined(-W2/2,-H2/2,W2,H2);ctx.shadowColor='transparent';
    txt('New York, January 19, 1936',-W2/2+100,-H2/2+70,'italic 400 30px Osw','#33405a','left');
    txt('Dear Dr. Einstein,',-W2/2+100,-H2/2+150,'italic 700 52px Osw','#1d2a48','left');
    const q='Do scientists pray?';const n=Math.floor(q.length*lin(t,N(2)+2.2,N(2)+3.4));txt(q.slice(0,n),-W2/2+100,-H2/2+275,'italic 700 72px Osw','#1d2a48','left');
    txt('— Phyllis',W2/2-80,-H2/2+400,'italic 700 46px Osw','#1d2a48','right',0,lin(t,N(2)+3.4,N(2)+3.7));
    txt('« Est-ce que les scientifiques prient ? »',0,H2/2-40,'700 28px Mono',PINK,'center',1,lin(t,N(2)+3.6,N(2)+3.9));ctx.restore();
    if(t>=N(3)+1.4){stampAt('IL RÉPOND.',0,Y(1350),130,t,N(3)+1.4,-.08);txt('PRINCETON · 24 JANVIER 1936',0,Y(1450),'700 32px Mono',AMB,'center',3,lin(t,N(3)+1.8,N(3)+2.1));}}
}
function verdictStamp(c,w,h,t){if(c.verdict){const[s,t0,col]=c.verdict;stampAt(s,w/2-230,h/2-150,96,t,t0,-.14,col);}}
function cardExtra(c,t,w,h){
  if(c.k==='doc'){framePaper(w,h,PAPERC);txt(c.hd,0,-h/2+95,'700 24px Mono','rgba(27,28,26,.7)','center',2);
    {let z=110;while(z>40&&mw(c.big,z+'px Anton',2)>w-80)z-=4;txt(c.big,0,-h/2+250,z+'px Anton',INKD,'center',2);}
    {let z=56;while(z>26&&mw(c.l2,z+'px Anton',2)>w-80)z-=2;txt(c.l2,0,-h/2+340,z+'px Anton',PINK,'center',2,lin(t,c.t0+.3,c.t0+.5));}
    (c.rows||[]).forEach(([s,t0],i)=>{if(t<t0)return;const q=eo(lin(t,t0,t0+.25));const y=-h/2+470+i*100;ctx.save();ctx.globalAlpha*=q;let z=50;while(z>24&&mw(s,z+'px Anton',2)>w-120)z-=2;
      ctx.fillStyle='rgba(27,28,26,.9)';ctx.fillRect(-w/2+50,y-z,w-100,z*1.45);txt(s,0,y+z*.1,z+'px Anton',i?RED:INK,'center',2);ctx.restore();});
    srcFit(c.src||'',w,h,1);verdictStamp(c,w,h,t);return 1;}
  if(c.k==='auction'){framePaper(w,h,'rgba(24,26,24,.97)');txt('CHRISTIE’S · NEW YORK · 4 DÉCEMBRE 2018',0,-h/2+100,'700 28px Mono',AMB,'center',3);txt('LA « LETTRE DE DIEU » VENDUE',0,-h/2+180,'56px Anton',INK,'center',2);
    const v=Math.round(2892500*eo(lin(t,c.t0+.4,c.t0+2.6)));txt(fmtN(v)+' $',0,-h/2+340,'130px Anton',RED,'center',2,1,22);
    if(t>=N(18)){ctx.fillStyle='rgba(10,10,10,.85)';ctx.fillRect(-w/2+50,-h/2+430,w-100,150);txt('« ATHÉE » ?',0,-h/2+500,'64px Anton',INK,'center',3);txt('LUI-MÊME REFUSAIT CE MOT',0,-h/2+555,'700 30px Mono',AMB,'center',3,lin(t,N(18)+1.2,N(18)+1.5));}
    stampAt('NON PROUVÉ',0,h/2-130,100,t,N(19)+.6,-.08,ORANGE);srcFit('Sources : Christie’s · Le Temps · entretien avec G. S. Viereck (1929)',w,h);return 1;}
  if(c.k==='reponse'){framePaper(w,h,'rgba(240,236,224,.98)');txt('PRINCETON · 24 JANVIER 1936',w/2-50,-h/2+80,'700 26px Mono','rgba(40,40,60,.7)','right',2);
    txt('Chère Phyllis,',-w/2+70,-h/2+170,'italic 700 56px Osw','#1d2a48','left',1);
    const lines=[['La prière ne peut pas changer',N(23)+1.6],['le cours des choses.',N(23)+2.6],['Un esprit se manifeste',N(24)+3.6],['dans les lois de l’univers,',N(24)+5.0],['bien supérieur à celui de l’homme.',N(25)+.3]];
    lines.forEach(([s,t0],i)=>{if(t<t0)return;const n=Math.floor(s.length*lin(t,t0,t0+.9));txt(s.slice(0,n),-w/2+70,-h/2+270+i*68,'italic 700 46px Osw','#1d2a48','left',1);});
    if(t>=N(26)){const q=eo(lin(t,N(26),N(26)+.3));ctx.save();ctx.globalAlpha*=q;ctx.fillStyle='rgba(201,48,44,.92)';ctx.fillRect(-w/2+50,-h/2+640,w-100,180);txt('« UN SENTIMENT RELIGIEUX',0,-h/2+715,'56px Anton','#fff','center',2);txt('D’UN GENRE PARTICULIER »',0,-h/2+785,'56px Anton','#fff','center',2);ctx.restore();}
    txt('A. Einstein',w/2-80,-h/2+880,'italic 700 60px Osw','#1d2a48','right',1,lin(t,N(26)+2.6,N(26)+3));
    [['PAS DE PRIÈRE',N(27)+.1,INKD],['PAS DE DIEU QUI JUGE',N(27)+1.3,INKD],['UN ÉMERVEILLEMENT',N(27)+2.9,VERT]].forEach(([s,t0,col],i)=>{if(t<t0)return;const x=(i-1)*300;ctx.save();ctx.globalAlpha*=eo(lin(t,t0,t0+.2));ctx.fillStyle='rgba(27,28,26,.9)';ctx.fillRect(x-145,h/2-200,290,80);txt(s,x,h/2-150,'27px Anton',col===INKD?INK:'#7fe39b','center',1);ctx.restore();});
    srcFit('Lettre d’Einstein à Phyllis, 24/01/1936 · extraits traduits de l’allemand · Archives Einstein',w,h,1);return 1;}
  if(c.k==='q'){framePaper(w,h,'rgba(40,43,40,.92)');slam('CROYANT…',0,-h/2+170,'120',VERT,t,N(28)+.6,4,18);slam('OU ATHÉE ?',0,-h/2+320,'120',RED,t,N(28)+1.7,4,24);
    if(t>=N(29))txt('PEUT-ÊTRE NI L’UN NI L’AUTRE.',0,-h/2+450,'56px Anton',AMB,'center',2,lin(t,N(29),N(29)+.2));
    if(t>=N(30)){txt('ET TOI, SI TU AVAIS PU LUI ÉCRIRE…',0,-h/2+570,'46px Anton',INK,'center',2,lin(t,N(30),N(30)+.2));txt('TU LUI AURAIS DEMANDÉ QUOI ?',0,-h/2+640,'52px Anton',INK,'center',2,lin(t,N(30)+1.6,N(30)+1.8));}
    txt('DIS-LE EN COMMENTAIRE ↓',0,h/2-60,'700 36px Mono',AMB,'center',3,lin(t,N(31),N(31)+.3));return 1;}
  return 0;}
