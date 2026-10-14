// ================= L'AUTRE ANGLE #01 — version « MUR D'ENQUÊTEUR » =================
const T=Object.fromEntries(SEGS.map((s,i)=>[i,s.t0]));
const TE=Object.fromEntries(SEGS.map((s,i)=>[i,s.t1]));
const ICE='#9fd8ff',GREEN='#A9C79A',PAPER='rgba(226,222,206,.93)',INKD='#1b1c1a',PINK='#c9302c';
const TCOV=3.0;

// ---------- texture du mur (procédurale, une fois)
const WALL=(()=>{const c=document.createElement('canvas');c.width=c.height=512;const g=c.getContext('2d');const r=rng(11);
  g.fillStyle='#3a3f3b';g.fillRect(0,0,512,512);
  const im=g.getImageData(0,0,512,512);for(let i=0;i<im.data.length;i+=4){const n=(r()-.5)*26;im.data[i]+=n;im.data[i+1]+=n;im.data[i+2]+=n;}g.putImageData(im,0,0);
  for(let k=0;k<900;k++){g.fillStyle=`rgba(${r()<.5?40:200},${r()<.5?44:205},${r()<.5?40:195},${.05+r()*.08})`;g.beginPath();g.ellipse(r()*512,r()*512,1+r()*4,1+r()*2,r()*6,0,6.283);g.fill();}
  return c;})();
let WALLPAT=null;

// ---------- les cartes (monde = mur ; 1 unité ≈ 1 px à zoom 1)
// k:type, x,y centre, w,h, rot, t0 (apparition = arrivée caméra), z: zoom souhaité (sinon auto)
const C=[];const add=o=>{C.push(Object.assign({rot:0},o));return C.length-1;};
const X0=0,Y0=0;
const cCover=add({k:'cover',x:0,y:0,w:1080,h:1920,rot:-1,t0:0});
const cGenz=add({k:'clip',full:1,clip:'genz',handle:'@17octobre2026',title:'QUI LES A APPELÉS ?',x:1250,y:-150,w:620,h:1100,rot:2,t0:TCOV+1.45});
const cZero=add({k:'title',lines:['PATIENT','ZÉRO'],sub:'on a remonté le fil',x:2350,y:-350,w:820,h:620,rot:-2,t0:T[2]});
const cV2=add({k:'clip',full:1,clip:'v2',handle:'@v2.95',title:'7 SEPT. 2026',badge:'VISAGE FLOUTÉ',x:3300,y:300,w:620,h:1100,rot:-1.5,t0:T[3]});
const cQ=add({k:'tiles',a:'CHAUD OU',b:'PAS CHAUD ?',x:3300,y:1650,w:900,h:560,rot:1.5,t0:T[6]});
const cCal=add({k:'paper',lines:[['OCTOBRE 2026','700 34px Mono','rgba(236,238,230,.7)'],['SAMEDI 17','130px Anton',INK],['1er jour des vacances','400 34px Mono','rgba(236,238,230,.75)']],x:2250,y:1500,w:820,h:520,rot:-2.5,t0:T[8]});
const cViews=add({k:'count',to:2000000,suffix:'+',label:'VUES',x:1250,y:1600,w:820,h:520,rot:2,t0:T[9]});
const cOrga=add({k:'stamp',text:'ORGANISATEUR : AUCUN',x:1250,y:2350,w:820,h:420,rot:-1.5,t0:T[10]+.4});
const cVolant=add({k:'title',lines:['QUI A PRIS','LE VOLANT ?'],x:300,y:2950,w:860,h:560,rot:1.5,t0:T[11]});
const cOff=add({k:'note',text:'COMPTES « OFFICIELS »',stamp:'AUTOPROCLAMÉS',x:-250,y:3700,w:640,h:420,rot:-3,t0:T[12]});
const cIA=add({k:'clip',clip:'ia',handle:'@dhbai.r',badge:'GÉNÉRÉ PAR IA',badgeRed:1,x:700,y:3900,w:560,h:990,rot:3,t0:T[13]});
const cMap=add({k:'note',text:'CARTES DE RASSEMBLEMENT',stamp:'AUCUNE SOURCE',x:-250,y:4350,w:640,h:420,rot:2,t0:T[14]});
const cVoix=add({k:'note',text:'VOIX DE JOURNALISTES',stamp:'IMITÉES',x:1600,y:4100,w:640,h:420,rot:-2,t0:T[15]});
const cElysee=add({k:'clip',full:1,clip:'elysee',handle:'@unmomentactu',badge:'LA RUMEUR',badgeAmb:1,x:2650,y:3500,w:600,h:1060,rot:-2,t0:T[16]});
const cSat=add({k:'sat',x:3650,y:3600,w:860,h:700,rot:1.5,t0:T[17]+.05});
const cParty=add({k:'wheel',x:3650,y:4700,w:900,h:760,rot:-1.5,t0:T[19]});
const cCrowd=add({k:'clip',full:1,clip:'crowd',handle:'H. Germain · CC0',title:'ARCHIVE',badge:'IMAGES D’ARCHIVE · 2019',x:3500,y:5600,w:600,h:1060,rot:3,t0:T[22]});
const cEq=add({k:'eq',x:2550,y:5100,w:980,h:700,rot:2,t0:T[23]-.15});
const cToi=add({k:'title',lines:['C’EST TOI','QU’ON INTERPELLE.'],red:1,x:1400,y:5500,w:980,h:600,rot:-2,t0:T[24]+1.9});
const cPolice=add({k:'clip',full:1,clip:'police',handle:'H. Germain · CC0',title:'ARCHIVE',badge:'IMAGES D’ARCHIVE · 2019',x:300,y:4900,w:600,h:1060,rot:-3,t0:T[25]});
const cGav=add({k:'gav',x:-450,y:5650,w:900,h:900,rot:1.5,t0:T[26]-.4});
const cFile=add({k:'file',x:-700,y:6300,w:900,h:760,rot:-2,t0:T[27]});
const cRaison=add({k:'title',lines:['SACHE OÙ TU','METS LES PIEDS.'],x:500,y:6800,w:980,h:560,rot:2,t0:T[30]});
const cToi2=add({k:'title',lines:['JUSTE','TOI.'],big:1,x:1700,y:6500,w:820,h:700,rot:-1,t0:T[33]});
const cEnd=add({k:'tiles',a:'CHAUD OU',b:'PAS CHAUD ?',cta:1,x:2800,y:6800,w:900,h:700,rot:1.5,t0:T[34]+.6});

const cOutro=add({k:'outro',full:1,x:3950,y:6500,w:900,h:900,rot:-1.5,t0:VEND+.5});
{const r=rng(99);C.forEach((c,i)=>{if(i===0)return;c.rot*=1.9;c.x+=(r()-.5)*140;c.y+=(r()-.5)*140;});}
// ---------- trajectoire caméra : focus successifs (+ vues larges sur les moments forts)
function fitZoom(c){return Math.min(880/c.w,900/c.h);}
const KEYS=[];C.forEach((c,i)=>{if(i===cCover)KEYS.push({t:0,x:c.x,y:c.y+160/1.04,z:1.04,rot:-c.rot*Math.PI/180});else if(c.full){const pw=c.k==='clip'?c.w-50:c.w;const z=(c.k==='clip'?1100:960)/pw;const a=c.rot*Math.PI/180;const oy=c.k==='clip'?-85:0;KEYS.push({t:c.t0,x:c.x-Math.sin(a)*oy,y:c.y+Math.cos(a)*oy-160/z,z,rot:-a});}
  else KEYS.push({t:c.t0,x:c.x,y:c.y,z:fitZoom(c),rot:-c.rot*Math.PI/180*.6});});
// vues larges (le mur entier se dévoile)
const WIDE=(t,cs)=>{let mnx=1e9,mxx=-1e9,mny=1e9,mxy=-1e9;cs.forEach(i=>{const c=C[i];mnx=Math.min(mnx,c.x-c.w/2);mxx=Math.max(mxx,c.x+c.w/2);mny=Math.min(mny,c.y-c.h/2);mxy=Math.max(mxy,c.y+c.h/2);});
  return{t,x:(mnx+mxx)/2,y:(mny+mxy)/2,z:Math.min(1000/(mxx-mnx),1500/(mxy-mny)),rot:0};};
KEYS.push(WIDE(TCOV+.65,[cCover,cGenz]));
KEYS.push(WIDE(T[32],[...C.keys()].filter(i=>i!==cEnd&&i!==cOutro)));
KEYS.sort((a,b)=>a.t-b.t);
// la vue large de la couverture arrive juste après TCOV, puis focus genz
// ---------- trajectoire « drone » : spline continue qui suit les fils, sans arrêt
const WP=[];
(function(){
  const K=KEYS;
  for(let i=0;i<K.length;i++){
    const a=K[i],b=K[i+1],p=K[i-1];
    if(i===0){WP.push({t:0,x:a.x,y:a.y,z:a.z,r:a.rot});WP.push({t:TCOV-.05,x:a.x,y:a.y+10,z:a.z*1.01,r:a.rot});continue;}
    const gap=b?b.t-a.t:2.5;
    const dx=b?b.x-a.x:a.x-p.x,dy=b?b.y-a.y:a.y-p.y,dl=Math.hypot(dx,dy)||1;const ux=dx/dl,uy=dy/dl;
    const dwell=Math.max(.35,Math.min(gap-.55,gap*.72));
    // arrivée : légèrement avant le centre, sortie : légèrement après (dérive lente sur la carte)
    WP.push({t:a.t-.05,x:a.x-ux*40,y:a.y-uy*40,z:a.z,r:a.rot});
    WP.push({t:a.t+dwell,x:a.x+ux*55,y:a.y+uy*55,z:a.z*1.06,r:a.rot});
    if(b){ // point intermédiaire sur le fil (creux de la courbe), vue plus large
      const mx=(a.x+b.x)/2,my=(a.y+b.y)/2+Math.hypot(b.x-a.x,b.y-a.y)*.08;
      const tm=(a.t+dwell+b.t-.05)/2;const zm=Math.min(a.z,b.z)*.72;
      if(b.t-.05-(a.t+dwell)>.25)WP.push({t:tm,x:mx,y:my,z:zm,r:(a.rot+b.rot)/2});
    }
  }
  WP.sort((u,v)=>u.t-v.t);
})();
function cr(p0,p1,p2,p3,u){const u2=u*u,u3=u2*u;return .5*((2*p1)+(-p0+p2)*u+(2*p0-5*p1+4*p2-p3)*u2+(-p0+3*p1-3*p2+p3)*u3);}
function camRaw(t){
  let i=0;while(i<WP.length-2&&t>=WP[i+1].t)i++;
  const a=WP[Math.max(0,i-1)],b=WP[i],c=WP[Math.min(WP.length-1,i+1)],d=WP[Math.min(WP.length-1,i+2)];
  const u=cl((t-b.t)/Math.max(1e-3,c.t-b.t));const us=u*u*(3-2*u)*.35+u*.65;
  return{x:cr(a.x,b.x,c.x,d.x,us),y:cr(a.y,b.y,c.y,d.y,us),z:Math.exp(cr(Math.log(a.z),Math.log(b.z),Math.log(c.z),Math.log(d.z),us)),r:cr(a.r,b.r,c.r,d.r,us)};
}
function camState(t){
  if(t<TCOV){const k=KEYS[0];return{x:k.x,y:k.y,z:k.z,rot:k.rot,speed:0,dir:0,moving:false};}
  const s=camRaw(t),q=camRaw(t-1/FPS);
  const vx=(s.x-q.x)*s.z,vy=(s.y-q.y)*s.z;const sp=Math.hypot(vx,vy);
  // inclinaison en virage (comme un drone) + micro-tremblement
  const bank=cl(-vx*.0016,-.09,.09);
  return{x:s.x+Math.sin(t*1.7)*4,y:s.y+Math.cos(t*1.3)*4,z:s.z,rot:s.r+bank,speed:sp,dir:Math.atan2(vy,vx),moving:sp>6};
}
let CS={x:0,y:0,z:1,rot:0};
function toWorld(){const k=1+punch(TNOW)*.06;ctx.setTransform(1,0,0,1,0,0);ctx.translate(540,800);ctx.rotate(CS.rot);ctx.scale(CS.z*k,CS.z*k);ctx.translate(-CS.x,-CS.y);}
let TNOW=0;

// ---------- dessin du mur
const SCRAPS=[];{const r=rng(21);for(let i=0;i<70;i++)SCRAPS.push({x:-1500+r()*6500,y:-1500+r()*9500,w:200+r()*380,h:150+r()*320,rot:(r()-.5)*.3,a:.08+r()*.12,lines:Math.floor(r()*6)});}
const CLUT=[];{const r=rng(55);const ims=['pancarte','lacrymo','foule','cover'];for(let i=0;i<70;i++){const k=r();CLUT.push({x:-1300+r()*6000,y:-1300+r()*8800,rot:(r()-.5)*.5,kind:k<.45?'post':k<.75?'photo':'clip',im:ims[Math.floor(r()*4)],w:k<.45?220:260,h:k<.45?220:190,lines:2+Math.floor(r()*4),col:r()});}}
function drawClutter(){CLUT.forEach((c,i)=>{ctx.save();ctx.translate(c.x,c.y);ctx.rotate(c.rot);ctx.globalAlpha=.85;
  if(c.kind==='post'){ctx.fillStyle=c.col<.5?'rgba(200,190,110,.55)':'rgba(170,175,165,.45)';ctx.fillRect(-c.w/2,-c.h/2,c.w,c.h);ctx.strokeStyle='rgba(30,30,28,.55)';ctx.lineWidth=4;for(let l=0;l<c.lines;l++){ctx.beginPath();ctx.moveTo(-c.w/2+24,-c.h/2+50+l*40);ctx.lineTo(c.w/2-30-(l%2)*50,-c.h/2+46+l*40);ctx.stroke();}}
  else if(c.kind==='photo'){const im=IM[c.im];ctx.fillStyle='rgba(230,232,224,.8)';ctx.fillRect(-c.w/2-12,-c.h/2-12,c.w+24,c.h+40);if(im){ctx.filter='grayscale(1) brightness(.8)';const s=Math.max(c.w/im.width,c.h/im.height);ctx.save();ctx.beginPath();ctx.rect(-c.w/2,-c.h/2,c.w,c.h);ctx.clip();ctx.drawImage(im,-im.width*s/2,-im.height*s/2,im.width*s,im.height*s);ctx.restore();ctx.filter='none';}}
  else{ctx.fillStyle='rgba(58,64,60,.55)';ctx.fillRect(-c.w/2,-c.h/2,c.w,c.h);ctx.strokeStyle='rgba(255,255,255,.5)';ctx.lineWidth=2;ctx.strokeRect(-c.w/2,-c.h/2,c.w,c.h);ctx.fillStyle='rgba(236,238,230,.35)';for(let l=0;l<3;l++)ctx.fillRect(-c.w/2+20,-c.h/2+40+l*45,c.w-60-l*40,14);}
  pin(0,-c.h/2+12);ctx.restore();});
  ctx.save();ctx.strokeStyle='rgba(160,30,28,.5)';ctx.lineWidth=3;for(let i=0;i<CLUT.length-1;i+=3){const a=CLUT[i],b=CLUT[i+1];if(Math.hypot(a.x-b.x,a.y-b.y)>1800)continue;ctx.beginPath();ctx.moveTo(a.x,a.y-a.h/2+12);ctx.quadraticCurveTo((a.x+b.x)/2,(a.y+b.y)/2+120,b.x,b.y-b.h/2+12);ctx.stroke();}ctx.restore();}
function drawWall(){
  if(!WALLPAT)WALLPAT=ctx.createPattern(WALL,'repeat');
  ctx.fillStyle=WALLPAT;ctx.fillRect(-3000,-3000,11000,13000);
  SCRAPS.forEach(s=>{ctx.save();ctx.translate(s.x,s.y);ctx.rotate(s.rot);ctx.fillStyle=`rgba(200,205,195,${s.a*.5})`;ctx.fillRect(-s.w/2,-s.h/2,s.w,s.h);
    ctx.strokeStyle=`rgba(40,40,38,${s.a*.8})`;ctx.lineWidth=3;for(let l=0;l<s.lines;l++){ctx.beginPath();ctx.moveTo(-s.w/2+20,-s.h/2+30+l*28);ctx.lineTo(s.w/2-20-(l%3)*30,-s.h/2+30+l*28);ctx.stroke();}ctx.restore();});
}
function pinPos(c){const a=c.rot*Math.PI/180;return[c.x+Math.sin(a)*c.h/2*0-0,c.y-c.h/2+18];}
function drawThreads(t){
  ctx.save();ctx.strokeStyle='rgba(185,30,28,.9)';ctx.lineWidth=5;ctx.shadowColor='rgba(0,0,0,.4)';ctx.shadowBlur=6;ctx.shadowOffsetY=4;
  const ORD=[...C.keys()].filter(i=>C[i].k!=='outro').sort((u,v)=>C[u].t0-C[v].t0);for(let j=1;j<ORD.length;j++){const a=C[ORD[j-1]],b=C[ORD[j]];const p=1;
    const [x1,y1]=pinPos(a),[x2,y2]=pinPos(b);const mx=(x1+x2)/2,my=(y1+y2)/2+Math.hypot(x2-x1,y2-y1)*.08;
    ctx.beginPath();ctx.moveTo(x1,y1);const N=24;for(let k=1;k<=N*p;k++){const u=k/N;const x=(1-u)*(1-u)*x1+2*u*(1-u)*mx+u*u*x2,y=(1-u)*(1-u)*y1+2*u*(1-u)*my+u*u*y2;ctx.lineTo(x,y);}ctx.stroke();}
  ctx.restore();}
function pin(x,y){ctx.save();ctx.fillStyle='rgba(0,0,0,.35)';ctx.beginPath();ctx.arc(x+5,y+7,13,0,6.283);ctx.fill();const g=ctx.createRadialGradient(x-4,y-4,2,x,y,14);g.addColorStop(0,'#ff6a5f');g.addColorStop(1,'#8e1512');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,14,0,6.283);ctx.fill();ctx.restore();}
function tape(x,y,w,rot){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.fillStyle='rgba(235,228,200,.55)';ctx.fillRect(-w/2,-22,w,44);ctx.restore();}

// ---------- contenu des cartes (coordonnées locales, centre = 0,0)
function framePaper(w,h,col){ctx.shadowColor='rgba(0,0,0,.55)';ctx.shadowBlur=34;ctx.shadowOffsetY=18;ctx.fillStyle=col||'rgba(58,64,60,.62)';ctx.fillRect(-w/2,-h/2,w,h);ctx.shadowColor='transparent';
  const g=ctx.createLinearGradient(-w/2,-h/2,w/2,h/2);g.addColorStop(0,'rgba(255,255,255,.10)');g.addColorStop(1,'rgba(0,0,0,.18)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,h);}
function laminate(w,h){
  ctx.save();ctx.beginPath();ctx.rect(-w/2,-h/2,w,h);ctx.clip();const g=ctx.createLinearGradient(-w/2,-h/2,w/2,h/2);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.38,'rgba(255,255,255,0)');g.addColorStop(.46,'rgba(255,255,255,.16)');g.addColorStop(.52,'rgba(255,255,255,.05)');g.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,h);ctx.restore();
  ctx.strokeStyle='rgba(255,255,255,.85)';ctx.lineWidth=3;ctx.strokeRect(-w/2,-h/2,w,h);ctx.strokeStyle='rgba(255,255,255,.18)';ctx.lineWidth=2;ctx.strokeRect(-w/2+10,-h/2+10,w-20,h-20);}
function stampAt(s,x,y,size,t,t0,rot=-.1,col=PINK){if(t<t0)return;const p=lin(t,t0,t0+.14);const sc=1.6-.6*eo(p);ctx.save();ctx.globalAlpha*=cl(p*3)*.92;ctx.translate(x,y);ctx.rotate(rot);ctx.scale(sc,sc);
  const f=size+'px Anton';const sw=mw(s,f,3)+50;ctx.strokeStyle=col;ctx.lineWidth=Math.max(5,size/11);ctx.strokeRect(-sw/2,-size*.75,sw,size*1.1);txt(s,0,size*.2,f,col,'center',3);ctx.restore();}
function drawCard(c,t){
  const a=1;const drop=0;
  ctx.save();ctx.translate(c.x,c.y+drop);ctx.rotate(c.rot*Math.PI/180);ctx.globalAlpha*=a;
  const w=c.w,h=c.h;
  if(c.k==='cover'){const im=IM.cover;framePaper(w+40,h+40,'rgba(230,232,224,.9)');if(im)ctx.drawImage(im,-w/2,-h/2,w,h);
    const g=ctx.createLinearGradient(0,-h/2,0,h/2);g.addColorStop(0,'rgba(0,0,0,.55)');g.addColorStop(.42,'rgba(0,0,0,.05)');g.addColorStop(1,'rgba(0,0,0,.5)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,h);
    txt('L’AUTRE ANGLE',0,-h/2+420,'700 34px Mono',INK,'center',12);txt('SAMEDI 17.',0,-h/2+640,'186px Anton',INK,'center',4,1,30);}
  else if(c.k==='outro'){framePaper(w,h);txt('L’AUTRE',0,-180,'150px Anton',INK,'center',4,1,24);txt('ANGLE',0,10,'200px Anton',PINK,'center',4,1,24);txt('LA FERME',0,120,'700 34px Mono','rgba(236,238,230,.6)','center',12);
    txt('ABONNE-TOI',0,250,'70px Anton',INK,'center',4,1,16);}
  else if(c.k==='clip'){framePaper(w,h,'rgba(230,232,224,.88)');const fr=(window.CLIPS&&CLIPS[c.clip])||[];const im=fr[Math.min(fr.length-1,Math.max(0,Math.floor((t-c.t0+.3)*30)))];const pw=w-50,ph=h-170;
    ctx.fillStyle='#000';ctx.fillRect(-pw/2,-h/2+25,pw,ph);if(im){ctx.save();ctx.beginPath();ctx.rect(-pw/2,-h/2+25,pw,ph);ctx.clip();const s=Math.max(pw/im.width,ph/im.height);ctx.filter='saturate(.55) contrast(1.05)';ctx.drawImage(im,-im.width*s/2,-h/2+25+ph/2-im.height*s/2,im.width*s,im.height*s);ctx.restore();}
    txt(c.handle,-w/2+30,h/2-85,'700 40px Mono','#1b1c1a','left',1);txt(c.title||'TikTok',w/2-30,h/2-85,'700 30px Mono','#444','right',2);
    if(c.badge){const bc=c.badgeRed?PINK:c.badgeAmb?'#b07a10':'rgba(20,20,20,.85)';ctx.font='700 30px Mono';const bw=ctx.measureText(c.badge).width+36;ctx.fillStyle=bc;ctx.fillRect(-bw/2,h/2-58,bw,44);txt(c.badge,0,h/2-26,'700 30px Mono','#fff','center',2);}
    if(c.title&&c.title.length>12)txt(c.title,0,-h/2-40,'64px Anton','#f2efe4','center',2,1,8);}
  else if(c.k==='title'){framePaper(w,h);const big=c.big?220:120;c.lines.forEach((l,i)=>txt(l,0,-((c.lines.length-1)*big*.55)+i*big*1.1+big*.35,big+'px Anton',c.red&&i==0?PINK:INK,'center',2));
    if(c.sub)txt(c.sub,0,h/2-50,'italic 400 34px Mono','rgba(236,238,230,.7)','center');}
  else if(c.k==='paper'){framePaper(w,h);let y=-h/2+90;c.lines.forEach(([s,f,col],i)=>{txt(s,0,y,f,col,'center',2);y+=i==0?150:110;});}
  else if(c.k==='tiles'){framePaper(w,h,'rgba(40,43,40,.9)');ctx.save();ctx.translate(0,c.cta?-120:-90);tiles(t,c.a,0,0,{t0:c.t0-(c.cta?1.5:0),step:.04,h:96,gap:6});tiles(t,c.b,0,150,{t0:c.t0+.3-(c.cta?1.5:0),step:.04,h:96,gap:6,hot:[c.b.length-1],hotT:c.t0+.6});ctx.restore();
    if(c.cta){txt('DIS-LE EN COMMENTAIRE ↓',0,h/2-110,'700 40px Mono',AMB,'center',3,lin(t,T[35],T[35]+.2));txt('ENVOIE ÇA À CELUI QUI Y VA',0,h/2-50,'700 32px Mono','#ddd','center',2,lin(t,T[35]+1.2,T[35]+1.4));}}
  else if(c.k==='count'){framePaper(w,h);const v=Math.round(c.to*eo(lin(t,c.t0+.2,c.t0+1.6)));txt(v.toLocaleString('fr-FR')+c.suffix,0,20,'150px Anton',INK,'center',2,1,14);txt(c.label,0,120,'700 40px Mono','rgba(236,238,230,.7)','center',8);}
  else if(c.k==='stamp'){framePaper(w,h);txt('ENQUÊTE · APPEL DU 17',0,-h/2+60,'700 28px Mono','rgba(236,238,230,.6)','center',4);stampAt(c.text,0,40,74,t,c.t0+.15,-.07);}
  else if(c.k==='note'){framePaper(w,h,'rgba(70,72,58,.6)');txt(c.text,0,-30,(c.text.length>20?'60px':'72px')+' Anton',INK,'center',1);stampAt(c.stamp,0,110,58,t,c.t0+.8,-.08);}
  else if(c.k==='sat'){framePaper(w,h);ctx.save();ctx.translate(0,-40);satMini(w-60,h-200,t,c.t0);ctx.restore();stampAt('DÉJÀ FLOUTÉ EN 2021',0,h/2-80,64,t,c.t0+.55,-.05);}
  else if(c.k==='wheel'){framePaper(w,h);ctx.save();ctx.translate(0,40);ctx.rotate(Math.sin(t*2.2)*.3);ctx.strokeStyle=INK;ctx.lineWidth=20;ctx.beginPath();ctx.arc(0,0,190,0,6.283);ctx.stroke();ctx.lineWidth=16;
      for(const an of[Math.PI/2,Math.PI*7/6,-Math.PI/6]){ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(an)*190,Math.sin(an)*190);ctx.stroke();}ctx.fillStyle=INK;ctx.beginPath();ctx.arc(0,0,40,0,6.283);ctx.fill();ctx.restore();
    [['LFI',-300,-250],['PS',300,-250],['PCF',0,320]].forEach(([s,x,y],k)=>{if(t<c.t0+.4+k*.4)return;ctx.save();ctx.translate(x,y);ctx.rotate((k-1)*.08);ctx.fillStyle='rgba(128,134,126,.4)';ctx.fillRect(-90,-45,180,90);ctx.strokeStyle='rgba(255,255,255,.6)';ctx.lineWidth=2;ctx.strokeRect(-90,-45,180,90);txt(s,0,22,'64px Anton',INK,'center',2,1,10);ctx.restore();});
    if(t>=T[21])stampAt('SAUF LUI',0,40,90,t,T[21],-.12);}
  else if(c.k==='eq'){framePaper(w,h,'rgba(40,43,40,.92)');ctx.save();ctx.translate(0,-170);tiles(t,'SANS ORGANISATEUR',0,0,{t0:T[22]+.3,step:.03,h:62,gap:4});ctx.restore();
    if(t>=T[23]+1.9)txt('=',0,60,'130px Anton',PINK,'center',0,lin(t,T[23]+1.9,T[23]+2.1),16);ctx.save();ctx.translate(0,190);tiles(t,'SANS RESPONSABLE',0,0,{t0:T[23]+2.2,step:.03,h:62,gap:4});ctx.restore();}
  else if(c.k==='gav'){framePaper(w,h);const v=Math.round(6877*eo(lin(t,c.t0+.3,c.t0+1.8)));txt(v.toLocaleString('fr-FR'),0,-230,'170px Anton',INK,'center',2,1,14);txt('GARDES À VUE',0,-150,'700 40px Mono','rgba(236,238,230,.7)','center',6);
    if(t>=T[26]){for(let k=0;k<10;k++){const x=(k%5-2)*150,y=k<5?-10:200;const hot=k<9&&t>=T[26]+.3+k*.12;ctx.save();ctx.globalAlpha*=lin(t,T[26]+k*.05,T[26]+k*.05+.2);person(x,y+60,.66,hot?PINK:'rgba(236,238,230,.3)');ctx.restore();}
      if(t>=T[26]+1.6)txt('86 % DE MINEURS',0,h/2-50,'70px Anton',PINK,'center',2,lin(t,T[26]+1.6,T[26]+1.8));}
    txt('Source : ICI, 8 oct. 2026',w/2-24,h/2-14,'400 22px Mono','rgba(236,238,230,.6)','right');}
  else if(c.k==='file'){framePaper(w,h);txt('FICHIER DE POLICE',-w/2+40,-h/2+90,'76px Anton',INK,'left',2);
    [['NOM','████████'],['MOTIF','manifestation'],['SUITE','sans suite']].forEach(([a,b],i)=>{const t0=c.t0+.5+i*.5;if(t<t0)return;const y=-h/2+210+i*95;ctx.fillStyle='rgba(128,134,126,.28)';ctx.fillRect(-w/2+30,y-55,w-60,76);txt(a,-w/2+50,y,'700 34px Mono','rgba(236,238,230,.6)','left',3);txt(b,-w/2+260,y,'700 38px Mono',INK,'left',1);});
    stampAt('PAS D’EFFACEMENT AUTO.',0,h/2-150,56,t,T[28],-.06);
    if(t>=T[29]){txt('2026  →  2032',0,h/2-40,'64px Anton',PINK,'center',4,lin(t,T[29],T[29]+.3));}}
  laminate(w,h);
  // punaise + scotch
  if(c.k!=='cover'){pin(0,-h/2+18);tape(-w/2+40,-h/2+10,140,-.6);}else{pin(0,-h/2+10);}
  ctx.restore();
}
function outroCredits(t){const c=C[cOutro];ctx.save();ctx.translate(c.x,c.y+c.h/2+120);[['Sources : StreetPress · franceinfo · France 24 · ICI',0],['Extraits : @v2.95 · @17octobre2026 · @dhbai.r · @unmomentactu',46],['Musique : « Hitman », Kevin MacLeod · CC BY 4.0',92]].forEach(([s,y])=>txt(s,0,y,'400 26px Mono','rgba(236,238,230,.75)','center'));ctx.restore();}
function satMini(w,h,t,t0){ctx.fillStyle='#4a4f4a';ctx.fillRect(-w/2,-h/2,w,h);const r=rng(4);ctx.save();ctx.beginPath();ctx.rect(-w/2,-h/2,w,h);ctx.clip();
  for(let i=0;i<60;i++){ctx.fillStyle=`rgba(${130+r()*60},${135+r()*55},${128+r()*50},.6)`;ctx.fillRect(-w/2+r()*w,-h/2+r()*h,30+r()*90,30+r()*70);}
  ctx.strokeStyle='rgba(25,27,26,.9)';ctx.lineWidth=14;[[-w/2,-60,w/2,-20],[-w/2,120,w/2,160],[-90,-h/2,-60,h/2],[160,-h/2,190,h/2]].forEach(([a,b,c2,d])=>{ctx.beginPath();ctx.moveTo(a,b);ctx.lineTo(c2,d);ctx.stroke();});
  const cell=22;for(let yy=0;yy<170;yy+=cell)for(let xx=0;xx<230;xx+=cell){const v=105+((xx*7+yy*13)%40);ctx.fillStyle=`rgb(${v},${v+3},${v})`;ctx.fillRect(-135+xx,-75+yy,cell,cell);}
  ctx.restore();txt('PALAIS DE L’ÉLYSÉE',-w/2+20,h/2+44,'700 30px Mono',INK,'left',2);}

// ---------- sous-titres courts (3 mots max)
const CHUNKS=[];SEGS.forEach(s=>{const ws=s.txt.split(' ');const tot=ws.reduce((a,w)=>a+w.length+1,0);let acc=0;const dur=s.t1-s.t0;const wt=ws.map(w=>{const tt=s.t0+dur*acc/tot;acc+=w.length+1;return[w,tt];});
  for(let i=0;i<wt.length;){let n=Math.min(3,wt.length-i);if(n==3&&wt[i+1][0].length+wt[i][0].length+wt[i+2][0].length>18)n=2;CHUNKS.push({txt:wt.slice(i,i+n).map(x=>x[0]).join(' ').toUpperCase(),t:wt[i][1]});i+=n;}});
CHUNKS.forEach((c,i)=>{c.e=i<CHUNKS.length-1?Math.min(CHUNKS[i+1].t,c.t+1.6):c.t+1.2;});
function subs2(t){const c=CHUNKS.find(c=>t>=c.t-.03&&t<c.e);if(!c)return;const p=eo(lin(t,c.t-.03,c.t+.08));
  ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.translate(540,1330);ctx.scale(.9+.1*p,.9+.1*p);ctx.globalAlpha=p;ctx.font='76px Anton';ctx.textAlign='center';ctx.letterSpacing='1px';
  const w=ctx.measureText(c.txt).width;ctx.fillStyle='rgba(90,96,90,.45)';ctx.fillRect(-w/2-26,-74,w+52,96);ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=2;ctx.strokeRect(-w/2-26,-74,w+52,96);ctx.shadowColor='rgba(255,255,255,.5)';ctx.shadowBlur=14;ctx.fillStyle='#f4f1e6';ctx.fillText(c.txt,0,0);ctx.restore();}

// ---------- sons
ev(.02,'boom');ev(TCOV-.1,'whoosh');
KEYS.forEach(k=>{if(k.t>TCOV+.1)ev(k.t-.5,'whoosh');});
C.forEach((c,i)=>{if(i>0)ev(c.t0-.05,'click');});
tileSounds('CHAUD OU PAS CHAUD',T[6]+.05,.035);reveal(T[7],1);ev(T[10]+.55,'thud');
[12,13,14,15].forEach(i=>ev(T[i]+.85,'thud'));reveal(T[17]+.6,1.1);reveal(T[21],1);
tileSounds('SANS ORGANISATEUR',T[23],.03);tileSounds('SANS RESPONSABLE',T[23]+2.2,.03);reveal(T[24]+1.9,1.4);
ev(T[25],'riser');reveal(T[26]+1.6,1);ev(T[28],'thud');reveal(T[33],1.3);tileSounds('CHAUD OU PAS CHAUD',T[34]+.05,.035);ev(VEND+.35,'boom');

// ---------- post (moins sombre, gris-vert « Seven »)
function post2(t){const fr=Math.floor(t*FPS);
  ctx.save();ctx.globalCompositeOperation='multiply';ctx.fillStyle='rgba(220,228,215,1)';ctx.fillRect(0,0,W,H);ctx.restore();
  const g=ctx.createRadialGradient(540,860,420,540,960,1250);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(10,14,10,.62)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  ctx.save();ctx.globalAlpha=.11;ctx.globalCompositeOperation='overlay';ctx.drawImage(grains[fr%grains.length],0,0,W,H);ctx.restore();
  const r=rng(fr*31+5);ctx.save();DUST.forEach(d=>{const x=(d.x+d.vx*t+W*3)%W,y=(d.y+d.vy*t+H*3)%H;ctx.fillStyle=`rgba(240,240,230,${.15+.25*Math.max(0,Math.sin(t*d.tw+d.ph))})`;ctx.beginPath();ctx.arc(x,y,d.s,0,6.283);ctx.fill();});ctx.restore();
  const fl=(r()-.5)*.04;ctx.fillStyle=fl>0?`rgba(255,250,240,${fl*.5})`:`rgba(0,0,0,${-fl})`;ctx.fillRect(0,0,W,H);}

const MBC=document.createElement('canvas');MBC.width=W;MBC.height=H;
window.renderFrame=f=>{
  const t=f/FPS;TNOW=t;const st=camState(t);CS=st;
  ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle='#262a27';ctx.fillRect(0,0,W,H);
  ctx.save();toWorld();drawWall();drawClutter();drawThreads(t);C.forEach(c=>drawCard(c,t));outroCredits(t);ctx.restore();ctx.setTransform(1,0,0,1,0,0);
  // flou de mouvement pendant les déplacements
  if(st.speed>22){const m=MBC.getContext('2d');m.clearRect(0,0,W,H);m.drawImage(cv,0,0);ctx.save();ctx.globalAlpha=.3;const dx=-Math.cos(st.dir)*Math.min(st.speed,90)*.45,dy=-Math.sin(st.dir)*Math.min(st.speed,90)*.45;ctx.drawImage(MBC,dx,dy);ctx.drawImage(MBC,dx*.5,dy*.5);ctx.restore();}
  // couverture : titre par-dessus la photo (0–3 s)
  if(false){const a=0;ctx.save();ctx.globalAlpha=a;const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'rgba(0,0,0,.55)');g.addColorStop(.42,'rgba(0,0,0,.05)');g.addColorStop(1,'rgba(0,0,0,.5)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    txt('L’AUTRE ANGLE',540,420,'700 34px Mono',INK,'center',12);txt('SAMEDI 17.',540,640,'186px Anton',INK,'center',4,1,30);ctx.restore();}
  if(t>=TCOV&&t<VEND)subs2(t);
  post2(t);flash(t);
  if(false){const a=0;ctx.save();ctx.fillStyle=`rgba(20,22,20,${.85*a})`;ctx.fillRect(0,0,W,H);ctx.restore();
    glowText('L’AUTRE',540,640,150,t,VEND+.35,1e9);glowText('ANGLE',540,820,200,t,VEND+.4,1e9,RED);
    txt('LA FERME',540,960,'700 34px Mono',DIM,'center',12,lin(t,VEND+.7,VEND+1));txt('ABONNE-TOI',540,1100,'64px Anton',INK,'center',4,lin(t,VEND+1.1,VEND+1.4),16);
    txt('Sources : StreetPress · franceinfo · France 24 · ICI',540,1300,'400 24px Mono','rgba(236,238,230,.7)','center',0,lin(t,VEND+1.5,VEND+1.9));
    txt('Extraits : @v2.95 · @17octobre2026 · @dhbai.r · @unmomentactu',540,1350,'400 22px Mono','rgba(236,238,230,.6)','center',0,lin(t,VEND+1.5,VEND+1.9));
    txt('Musique : « Hitman », Kevin MacLeod · CC BY 4.0',540,1400,'400 22px Mono','rgba(236,238,230,.55)','center',0,lin(t,VEND+1.5,VEND+1.9));}
};
