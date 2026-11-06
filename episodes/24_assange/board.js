// ================= « COUPABLE DE JOURNALISME. » (Assange, 06/11/2026) — mur d’enquêteur
const T=Object.fromEntries(SEGS.map((s,i)=>[i,s.t0]));
const TE=Object.fromEntries(SEGS.map((s,i)=>[i,s.t1]));
const GREEN='#A9C79A',INKD='#1b1c1a',PINK='#c9302c',PAPERC='rgba(222,219,206,.95)';
const TCOV=MARK.tcov;

// ---------- texture du mur
const WALL=(()=>{const c=document.createElement('canvas');c.width=c.height=512;const g=c.getContext('2d');const r=rng(11);
  g.fillStyle='#3a3f3b';g.fillRect(0,0,512,512);
  const im=g.getImageData(0,0,512,512);for(let i=0;i<im.data.length;i+=4){const n=(r()-.5)*26;im.data[i]+=n;im.data[i+1]+=n;im.data[i+2]+=n;}g.putImageData(im,0,0);
  for(let k=0;k<900;k++){g.fillStyle=`rgba(${r()<.5?40:200},${r()<.5?44:205},${r()<.5?40:195},${.05+r()*.08})`;g.beginPath();g.ellipse(r()*512,r()*512,1+r()*4,1+r()*2,r()*6,0,6.283);g.fill();}
  return c;})();
let WALLPAT=null;

// ---------- les cartes (ordre chronologique ; placement automatique en serpentin)
const IMC=k=>(window.CRED&&CRED[k])||'';
const C=[];const add=o=>{C.push(Object.assign({rot:0},o));return C.length-1;};
const N=k=>SEGS[ID['n'+k]].t0;const NE=k=>SEGS[ID['n'+k]].t1;
function topBox(w,h,t,t0,a,b,sz=60,col){if(t<t0)return;const p=eo(lin(t,t0,t0+.3));ctx.save();ctx.globalAlpha*=p;ctx.fillStyle=col||'rgba(10,10,10,.82)';ctx.fillRect(-400,-h/2+70,800,b?170:120);
  txt(a,0,-h/2+(b?140:150),sz+'px Anton',INK,'center',2);if(b){let s2=30;while(s2>18&&mw(b,'700 '+s2+'px Mono',3)>760)s2--;txt(b,0,-h/2+205,'700 '+s2+'px Mono',AMB,'center',3);}ctx.restore();}
function band(y,t,t0,s,sz,bg,fg){if(t<t0)return;const p=eo(lin(t,t0,t0+.25));ctx.save();ctx.globalAlpha*=p;while(sz>24&&mw(s,sz+'px Anton',2)>800)sz-=2;ctx.font=sz+'px Anton';const bw=Math.min(860,mw(s,sz+'px Anton',2)+60);ctx.fillStyle=bg||'rgba(201,48,44,.92)';ctx.fillRect(-bw/2,y-sz*.85,bw,sz*1.15);txt(s,0,y,sz+'px Anton',fg||'#fff','center',2);ctx.restore();}
const DK='rgba(10,10,10,.88)',VERT='#2f9a4c';
const cCover=add({k:'cover',w:1080,h:1920,rot:0,t0:0});
const cVis=add({k:'viseur',full:1,hold:1,zf:1040,w:900,h:1150,rot:-1,t0:N(2)});
const cWL=add({k:'clip',full:1,hold:1,img:'assange',handle:'Photo : Snapperjack · CC BY-SA 2.0',badge:'JULIAN ASSANGE · 38 ANS',w:900,h:1050,rot:1.5,t0:N(10),
  after:(w,h,t)=>{topBox(w,h,t,N(10)+.3,'5 AVRIL 2010','IL MET LA VIDÉO EN LIGNE',70);band(-h/2+330,t,N(11)+2.4,'WIKILEAKS',80,'rgba(201,48,44,.92)');band(h/2-500,t,N(12),'LA GUERRE TELLE QU’ELLE EST :',48,DK,AMB);sanglante(w,h,t);}});
const cDocs=add({k:'docs',w:940,h:900,rot:-2,t0:N(13)+.6});
const cMan=add({k:'manning',hold:1,w:940,h:1000,rot:1.5,t0:SEGS[ID.m0].t0});
const cVs=add({k:'vs14',w:940,h:640,rot:-1.5,t0:N(14)});
const cTraque=add({k:'proof',lab:'CHAPITRE',n:2,l:'LA TRAQUE',w:880,h:760,rot:2,t0:N(15)});
const cAmb=add({k:'clip',full:1,img:'balcon',handle:'Photo : wl dreamer · CC BY-SA 3.0 (visages floutés)',badge:'AMBASSADE D’ÉQUATEUR · LONDRES',w:900,h:1050,rot:-1.5,t0:N(16),
  after:(w,h,t)=>{topBox(w,h,t,N(16)+.3,'19 JUIN 2012','IL S’Y RÉFUGIE',70);ambDays(w,h,t);}});
const cCIA=add({k:'doc',hd:'YAHOO NEWS · SEPTEMBRE 2021',big:'CIA · 2017',l2:'SELON D’ANCIENS RESPONSABLES',rows:[['ON DISCUTE DE L’ENLEVER…',N(18)+1.6],['… VOIRE DE LE TUER',N(18)+3.4]],src:'Source : Yahoo News (2021), repris par The Telegraph, The Nation',w:940,h:820,rot:1.5,t0:N(18)});
const cArr=add({k:'arrest',w:940,h:900,rot:-1.5,t0:N(19)});
const cBel=add({k:'cellule',full:1,hold:1,w:900,h:1150,rot:1,t0:N(20)});
const cOnu=add({k:'doc',hd:'ONU · RAPPORTEUR SPÉCIAL SUR LA TORTURE',big:'NILS MELZER',l2:'VISITE À BELMARSH · 9 MAI 2019',rows:[['SON DIAGNOSTIC :',N(23)+2.3]],src:'Source : ONU, communiqué du 31/05/2019',stampOnu:N(23)+3.4,w:940,h:820,rot:-2,t0:N(23)});
const cJours=add({k:'jours',w:940,h:860,rot:2,t0:N(24)});
const cSai=add({k:'doc',hd:'TRIBUNAL FÉDÉRAL · SAIPAN · 26 JUIN 2024',big:'UN ACCORD',l2:'PLAIDE COUPABLE D’UN SEUL CHEF',rows:[['PEINE : 62 MOIS = DÉJÀ PURGÉS',N(25)+2.6]],src:'Sources : NPR · NBC · Anadolu (26/06/2024)',stampLibre:N(25)+5.3,w:940,h:820,rot:-1.5,t0:N(25)});
const cQuote=add({k:'quote',full:1,w:900,h:1100,rot:1.5,t0:N(26)});
const cBal=add({k:'balance',w:960,h:1000,rot:-1.5,t0:N(28)});
const cToi=add({k:'toi',w:940,h:1000,rot:2,t0:N(32)});
const cQ=add({k:'q',w:960,h:760,rot:-2,t0:N(34)});
const cOutro=add({k:'outro',full:1,w:900,h:900,rot:-1.5,t0:VEND+.5});
const WT0=N(28)-.1,WT1=N(29)-.3;
C[cVis].hl=WT0+.1;C[cWL].hl=WT0+.25;C[cBel].hl=WT0+.4;C[cQuote].hl=WT0+.55;
const XT=[[cVis,cWL,WT0+.1],[cWL,cBel,WT0+.3],[cBel,cQuote,WT0+.5]];
// placement en serpentin + désordre
{const COLS=4,DX=1250,DY=1250;const r=rng(99);C.forEach((c,i)=>{if(i===0){c.x=-1300;c.y=0;return;}const j=i+1;const row=Math.floor(j/COLS),col=j%COLS;const cc=row%2?COLS-1-col:col;
  c.x=cc*DX+(r()-.5)*220;c.y=row*DY+(r()-.5)*220;c.rot*=1.9;});}

// ---------- trajectoire caméra
function fitZoom(c){return Math.min(880/c.w,900/c.h);}
const KEYS=[];C.forEach((c,i)=>{if(i===cCover)KEYS.push({t:0,x:c.x,y:c.y-160/1.04,z:1.04,rot:-c.rot*Math.PI/180});else if(c.full){const pw=c.k==='clip'?c.w-50:c.w;const z=(c.k==='clip'?1100:(c.zf||880))/pw;const a=c.rot*Math.PI/180;const oy=(c.k==='clip'?-85:0)+(c.aim||0);KEYS.push({t:c.t0,x:c.x-Math.sin(a)*oy,y:c.y+Math.cos(a)*oy-160/z,z,rot:-a,hold:c.hold});}
  else KEYS.push({t:c.t0,x:c.x,y:c.y,z:fitZoom(c),rot:-c.rot*Math.PI/180*.6});});
const WIDE=(t,cs)=>{let mnx=1e9,mxx=-1e9,mny=1e9,mxy=-1e9;cs.forEach(i=>{const c=C[i];mnx=Math.min(mnx,c.x-c.w/2);mxx=Math.max(mxx,c.x+c.w/2);mny=Math.min(mny,c.y-c.h/2);mxy=Math.max(mxy,c.y+c.h/2);});
  return{t,x:(mnx+mxx)/2,y:(mny+mxy)/2,z:Math.min(1000/(mxx-mnx),1500/(mxy-mny)),rot:0};};

{const k=WIDE(WT0,[...C.keys()].filter(i=>i!==cOutro));k.wide=1;KEYS.push(k);}
KEYS.sort((a,b)=>a.t-b.t);
const WP=[];let WH=null;
(function(){
  const K=KEYS;
  for(let i=0;i<K.length;i++){
    const a=K[i],b=K[i+1],p=K[i-1];
    if(i===0){WP.push({t:0,x:a.x,y:a.y,z:a.z,r:a.rot});WP.push({t:TCOV-.05,x:a.x,y:a.y+10,z:a.z*1.01,r:a.rot});continue;}
    const gap=b?b.t-a.t:2.5;
    const dx=b?b.x-a.x:a.x-p.x,dy=b?b.y-a.y:a.y-p.y,dl=Math.hypot(dx,dy)||1;const ux=dx/dl,uy=dy/dl;
    const dwell=a.hold?Math.max(.35,gap-.6):Math.max(.35,Math.min(gap-.55,gap*.72));   // hold : on reste sur la carte tant que la vraie voix parle
    if(a.wide)WH={t0:a.t-.05,t1:a.t+dwell,x:a.x,y:a.y,z:a.z};
    WP.push({t:a.t-.05,x:a.x-ux*40,y:a.y-uy*40,z:a.z,r:a.rot});
    WP.push({t:a.t+dwell,x:a.x+ux*55,y:a.y+uy*55,z:a.z*1.06,r:a.rot});
    if(dwell>.9){const n=Math.max(1,Math.floor(dwell/1.5));for(let q=1;q<=n;q++){const u=q/(n+1);WP.push({t:a.t-.05+(dwell+.05)*u,x:a.x-ux*40+ux*95*u,y:a.y-uy*40+uy*95*u,z:a.z*(1+.06*u),r:a.rot});}}   // points de maintien : la caméra reste cadrée sur la carte (pas de dépassement de la spline)
    if(b){const mx=(a.x+b.x)/2,my=(a.y+b.y)/2+Math.hypot(b.x-a.x,b.y-a.y)*.08;
      const tm=(a.t+dwell+b.t-.05)/2;const zm=Math.min(a.z,b.z)*.72;
      if(b.t-.05-(a.t+dwell)>.25&&!a.wide&&!b.wide)WP.push({t:tm,x:mx,y:my,z:zm,r:(a.rot+b.rot)/2});}
  }
  WP.sort((u,v)=>u.t-v.t);
})();
function cr(p0,p1,p2,p3,u){const u2=u*u,u3=u2*u;return .5*((2*p1)+(-p0+p2)*u+(2*p0-5*p1+4*p2-p3)*u2+(-p0+3*p1-3*p2+p3)*u3);}
function camRaw(t){const s=camSpline(t);if(!WH)return s;const sm=u=>u*u*(3-2*u);const k=sm(lin(t,WH.t0-.7,WH.t0))*(1-sm(lin(t,WH.t1,WH.t1+.7)));if(k<=0)return s;
  const hz=WH.z*(1+.05*lin(t,WH.t0,WH.t1));return{x:s.x+(WH.x-s.x)*k,y:s.y+(WH.y-s.y)*k,z:Math.exp(Math.log(s.z)+(Math.log(hz)-Math.log(s.z))*k),r:s.r*(1-k)};}
function camSpline(t){
  let i=0;while(i<WP.length-2&&t>=WP[i+1].t)i++;
  const a=WP[Math.max(0,i-1)],b=WP[i],c=WP[Math.min(WP.length-1,i+1)],d=WP[Math.min(WP.length-1,i+2)];
  const u=cl((t-b.t)/Math.max(1e-3,c.t-b.t));const us=u*u*(3-2*u)*.35+u*.65;
  return{x:cr(a.x,b.x,c.x,d.x,us),y:cr(a.y,b.y,c.y,d.y,us),z:Math.exp(cr(Math.log(a.z),Math.log(b.z),Math.log(c.z),Math.log(d.z),us)),r:cr(a.r,b.r,c.r,d.r,us)};
}
function camState(t){
  if(t<TCOV){const k=KEYS[0];return{x:k.x,y:k.y,z:k.z,rot:k.rot,speed:0,dir:0,moving:false};}
  const s=camRaw(t),q=camRaw(t-1/FPS);
  const vx=(s.x-q.x)*s.z,vy=(s.y-q.y)*s.z;const sp=Math.hypot(vx,vy);
  const bank=cl(-vx*.0016,-.09,.09);
  return{x:s.x+Math.sin(t*1.7)*4,y:s.y+Math.cos(t*1.3)*4,z:s.z,rot:s.r+bank,speed:sp,dir:Math.atan2(vy,vx),moving:sp>6};
}
let CS={x:0,y:0,z:1,rot:0};
function toWorld(){const k=1+punch(TNOW)*.06;ctx.setTransform(1,0,0,1,0,0);ctx.translate(540,800);ctx.rotate(CS.rot);ctx.scale(CS.z*k,CS.z*k);ctx.translate(-CS.x,-CS.y);}
let TNOW=0;

// ---------- mur + fouillis
const SCRAPS=[];{const r=rng(21);for(let i=0;i<80;i++)SCRAPS.push({x:-1500+r()*6500,y:-1500+r()*13000,w:200+r()*380,h:150+r()*320,rot:(r()-.5)*.3,a:.08+r()*.12,lines:Math.floor(r()*6)});}
const CLUT=[];{const r=rng(55);const ims=['assange','balcon','ambassade','assange'];for(let i=0;i<90;i++){const k=r();CLUT.push({x:-1300+r()*6200,y:-1300+r()*12500,rot:(r()-.5)*.5,kind:k<.45?'post':k<.75?'photo':'clip',im:ims[Math.floor(r()*4)],w:k<.45?220:260,h:k<.45?220:190,lines:2+Math.floor(r()*4),col:r()});}}
function drawClutter(){CLUT.forEach((c,i)=>{ctx.save();ctx.translate(c.x,c.y);ctx.rotate(c.rot);ctx.globalAlpha=.85;
  if(c.kind==='post'){ctx.fillStyle=c.col<.5?'rgba(200,190,110,.55)':'rgba(170,175,165,.45)';ctx.fillRect(-c.w/2,-c.h/2,c.w,c.h);ctx.strokeStyle='rgba(30,30,28,.55)';ctx.lineWidth=4;for(let l=0;l<c.lines;l++){ctx.beginPath();ctx.moveTo(-c.w/2+24,-c.h/2+50+l*40);ctx.lineTo(c.w/2-30-(l%2)*50,-c.h/2+46+l*40);ctx.stroke();}}
  else if(c.kind==='photo'){const im=IM[c.im];ctx.fillStyle='rgba(230,232,224,.8)';ctx.fillRect(-c.w/2-12,-c.h/2-12,c.w+24,c.h+40);if(im){ctx.filter='grayscale(1) brightness(.8)';const s=Math.max(c.w/im.width,c.h/im.height);ctx.save();ctx.beginPath();ctx.rect(-c.w/2,-c.h/2,c.w,c.h);ctx.clip();ctx.drawImage(im,-im.width*s/2,-im.height*s/2,im.width*s,im.height*s);ctx.restore();ctx.filter='none';}}
  else{ctx.fillStyle='rgba(58,64,60,.55)';ctx.fillRect(-c.w/2,-c.h/2,c.w,c.h);ctx.strokeStyle='rgba(255,255,255,.5)';ctx.lineWidth=2;ctx.strokeRect(-c.w/2,-c.h/2,c.w,c.h);ctx.fillStyle='rgba(236,238,230,.35)';for(let l=0;l<3;l++)ctx.fillRect(-c.w/2+20,-c.h/2+40+l*45,c.w-60-l*40,14);}
  pin(0,-c.h/2+12);ctx.restore();});
  ctx.save();ctx.strokeStyle='rgba(160,30,28,.5)';ctx.lineWidth=3;for(let i=0;i<CLUT.length-1;i+=3){const a=CLUT[i],b=CLUT[i+1];if(Math.hypot(a.x-b.x,a.y-b.y)>1800)continue;ctx.beginPath();ctx.moveTo(a.x,a.y-a.h/2+12);ctx.quadraticCurveTo((a.x+b.x)/2,(a.y+b.y)/2+120,b.x,b.y-b.h/2+12);ctx.stroke();}ctx.restore();}
function drawWall(){
  if(!WALLPAT)WALLPAT=ctx.createPattern(WALL,'repeat');
  ctx.fillStyle=WALLPAT;ctx.fillRect(-3000,-3000,11000,17000);
  SCRAPS.forEach(s=>{ctx.save();ctx.translate(s.x,s.y);ctx.rotate(s.rot);ctx.fillStyle=`rgba(200,205,195,${s.a*.5})`;ctx.fillRect(-s.w/2,-s.h/2,s.w,s.h);
    ctx.strokeStyle=`rgba(40,40,38,${s.a*.8})`;ctx.lineWidth=3;for(let l=0;l<s.lines;l++){ctx.beginPath();ctx.moveTo(-s.w/2+20,-s.h/2+30+l*28);ctx.lineTo(s.w/2-20-(l%3)*30,-s.h/2+30+l*28);ctx.stroke();}ctx.restore();});
}
function pinPos(c){return[c.x,c.y-c.h/2+18];}
function drawThreads(t){
  const g=t>=WT0&&t<WT1+1?eo(lin(t,WT0,WT0+.6))*(1-lin(t,WT1,WT1+1)):0;
  const curve=(a,b,p,sag)=>{const [x1,y1]=pinPos(a),[x2,y2]=pinPos(b);const mx=(x1+x2)/2,my=(y1+y2)/2+Math.hypot(x2-x1,y2-y1)*sag;ctx.beginPath();ctx.moveTo(x1,y1);const n=30;for(let k=1;k<=n;k++){const u=k/n*p;ctx.lineTo((1-u)*(1-u)*x1+2*u*(1-u)*mx+u*u*x2,(1-u)*(1-u)*y1+2*u*(1-u)*my+u*u*y2);}ctx.stroke();};
  ctx.save();ctx.strokeStyle=`rgba(${185+70*g},${30+15*g},28,.9)`;ctx.lineWidth=5+20*g;ctx.shadowColor=g>0?`rgba(255,40,30,${.85*g})`:'rgba(0,0,0,.4)';ctx.shadowBlur=6+44*g;ctx.shadowOffsetY=g>0?0:4;
  const ORD=[...C.keys()].filter(i=>C[i].k!=='outro').sort((u,v)=>C[u].t0-C[v].t0);for(let j=1;j<ORD.length;j++)curve(C[ORD[j-1]],C[ORD[j]],1,.08);
  ctx.strokeStyle='rgba(255,52,40,.95)';ctx.shadowColor='rgba(255,40,30,.9)';ctx.lineWidth=7+30*g;ctx.shadowBlur=10+50*g;
  XT.forEach(([a,b,t0])=>{if(t<t0)return;curve(C[a],C[b],eo(lin(t,t0,t0+.55)),.16);});
  ctx.restore();}
function pin(x,y){ctx.save();ctx.fillStyle='rgba(0,0,0,.35)';ctx.beginPath();ctx.arc(x+5,y+7,13,0,6.283);ctx.fill();const g=ctx.createRadialGradient(x-4,y-4,2,x,y,14);g.addColorStop(0,'#ff6a5f');g.addColorStop(1,'#8e1512');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,14,0,6.283);ctx.fill();ctx.restore();}
function tape(x,y,w,rot){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.fillStyle='rgba(235,228,200,.55)';ctx.fillRect(-w/2,-22,w,44);ctx.restore();}

// ---------- briques de cartes
function framePaper(w,h,col){ctx.shadowColor='rgba(0,0,0,.55)';ctx.shadowBlur=34;ctx.shadowOffsetY=18;ctx.fillStyle=col||'rgba(58,64,60,.62)';ctx.fillRect(-w/2,-h/2,w,h);ctx.shadowColor='transparent';
  const g=ctx.createLinearGradient(-w/2,-h/2,w/2,h/2);g.addColorStop(0,'rgba(255,255,255,.10)');g.addColorStop(1,'rgba(0,0,0,.18)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,h);}
function laminate(w,h){
  ctx.save();ctx.beginPath();ctx.rect(-w/2,-h/2,w,h);ctx.clip();const g=ctx.createLinearGradient(-w/2,-h/2,w/2,h/2);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.38,'rgba(255,255,255,0)');g.addColorStop(.46,'rgba(255,255,255,.16)');g.addColorStop(.52,'rgba(255,255,255,.05)');g.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,h);ctx.restore();
  ctx.strokeStyle='rgba(255,255,255,.85)';ctx.lineWidth=3;ctx.strokeRect(-w/2,-h/2,w,h);ctx.strokeStyle='rgba(255,255,255,.18)';ctx.lineWidth=2;ctx.strokeRect(-w/2+10,-h/2+10,w-20,h-20);}
function stampAt(s,x,y,size,t,t0,rot=-.1,col=PINK){if(t<t0)return;const p=lin(t,t0,t0+.14);const sc=1.6-.6*eo(p);ctx.save();ctx.globalAlpha*=cl(p*3)*.92;ctx.translate(x,y);ctx.rotate(rot);ctx.scale(sc,sc);
  const f=size+'px Anton';const sw=mw(s,f,3)+50;ctx.strokeStyle=col;ctx.lineWidth=Math.max(5,size/11);ctx.strokeRect(-sw/2,-size*.75,sw,size*1.1);txt(s,0,size*.2,f,col,'center',3);ctx.restore();}
function field(x,y,w,a,b,t,t0,dark){if(t<t0)return;const q=lin(t,t0,t0+.2);ctx.save();ctx.globalAlpha*=q;ctx.fillStyle=dark?'rgba(30,30,28,.08)':'rgba(128,134,126,.28)';ctx.fillRect(x,y-52,w,72);
  txt(a,x+20,y,'700 30px Mono',dark?'rgba(27,28,26,.6)':'rgba(236,238,230,.6)','left',3);txt(b,x+230,y,'700 38px Mono',dark?INKD:INK,'left',1);ctx.restore();}
function inkLines(x,y,w,n,gap,seed,col='rgba(27,28,26,.28)'){const r=rng(seed);ctx.fillStyle=col;for(let i=0;i<n;i++)ctx.fillRect(x,y+i*gap,w*(.6+r()*.4),12);}
function srcLine(s,w,h){txt(s,w/2-24,h/2-18,'400 22px Mono','rgba(236,238,230,.62)','right');}

function rowItem(y,w,a,b,t,t0,col){if(t<t0)return;const q=eo(lin(t,t0,t0+.2));ctx.save();ctx.globalAlpha*=q;
  ctx.fillStyle='rgba(128,134,126,.28)';ctx.fillRect(-w/2+50,y-62,w-100,96);txt(a,-w/2+80,y+6,'56px Anton',INK,'left',2);if(b)txt(b,w/2-80,y+6,'56px Anton',col||PINK,'right',2,1,10);ctx.restore();}
// image calée dans un panneau (fx = point de l'image mis au centre)
function panel(im,x0,y0,pw,ph,fx,z,filter){if(!im)return;ctx.save();ctx.beginPath();ctx.rect(x0,y0,pw,ph);ctx.clip();const s=Math.max(pw/im.width,ph/im.height)*z;const iw=im.width*s,ih=im.height*s;
  let ix=x0+pw/2-iw*fx;ix=Math.min(x0,Math.max(x0+pw-iw,ix));ctx.filter=filter||'none';ctx.drawImage(im,ix,y0+ph/2-ih/2,iw,ih);ctx.restore();}
function darkTxt(s,y,w,h){txt(s,w/2-24,h/2-18,'400 22px Mono','rgba(27,28,26,.6)','right');}
function postit(w,h){ctx.save();ctx.translate(w/2-90,-h/2-75);ctx.rotate(.09);ctx.shadowColor='rgba(0,0,0,.5)';ctx.shadowBlur=24;ctx.shadowOffsetY=12;ctx.fillStyle='rgba(226,206,96,.97)';ctx.fillRect(-150,-140,300,280);ctx.shadowColor='transparent';
  const g=ctx.createLinearGradient(0,-140,0,140);g.addColorStop(0,'rgba(255,255,255,.12)');g.addColorStop(1,'rgba(0,0,0,.12)');ctx.fillStyle=g;ctx.fillRect(-150,-140,300,280);
  txt('3 500',0,10,'100px Anton','#2a2618','center',2);txt('MERCI.',0,75,'700 40px Mono','#2a2618','center',6);txt('— la ferme',50,118,'400 22px Mono','rgba(42,38,24,.75)','center');pin(0,-118);ctx.restore();}
// source qui tient toujours dans la carte (règle d'Enidez du 20/10)
function srcFit(s,w,h,dark){let sz=22;while(sz>14&&mw(s,'400 '+sz+'px Mono')>w-48)sz--;txt(s,w/2-24,h/2-18,'400 '+sz+'px Mono',dark?'rgba(27,28,26,.6)':'rgba(236,238,230,.62)','right');}
function VF(k,t,t0){const f=k&&window.CLIPS&&CLIPS[k];if(!f||!f.length)return null;return f[Math.min(f.length-1,Math.max(0,Math.floor((t-t0)*30)))];}
function fmtN(v){return Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g,' ');}
function rr(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
function shake(t,t0,dur,amp){if(t<t0||t>t0+dur)return;const k=1-(t-t0)/dur;ctx.translate(Math.sin(t*97)*amp*k,Math.cos(t*83)*amp*k);}
function slam(s,x,y,size,col,t,t0,ls=4,glow=22){if(t<t0)return;const q=eo(lin(t,t0,t0+.14));ctx.save();ctx.translate(x,y);shake(t,t0,.3,14);ctx.scale(1.7-.7*q,1.7-.7*q);txt(s,0,0,size+'px Anton',col,'center',ls,cl(q*1.5),glow);ctx.restore();}
function sanglante(w,h,t){const t0=N(12)+.95;if(t<t0)return;slam('SANGLANTE.',0,h/2-340,'150',RED,t,t0,6,30);const r=rng(5);ctx.save();ctx.fillStyle='rgba(180,20,18,.9)';for(let i=0;i<9;i++){const x=-300+r()*600,l=lin(t,t0+.15+r()*.3,t0+1.6+r())*(60+r()*140);ctx.fillRect(x,h/2-320,6+r()*6,l);ctx.beginPath();ctx.arc(x+5,h/2-320+l,7,0,6.283);ctx.fill();}ctx.restore();}
function ambDays(w,h,t){if(t<N(17))return;const v=Math.round(2487*eo(lin(t,N(17),N(17)+2.4)));ctx.save();ctx.fillStyle='rgba(10,10,10,.85)';ctx.fillRect(-380,-h/2+300,760,200);
  txt(fmtN(v),0,-h/2+430,'130px Anton',RED,'center',3,1,20);txt('JOURS SANS JAMAIS SORTIR',0,-h/2+485,'700 30px Mono',AMB,'center',3);ctx.restore();}
// ---------- couverture / accroche : son visage… puis le viseur
function drawHook24(w,h,t){
  const FRZ=MARK.frz,lock=t>=FRZ;const im=IM.assange;const Y=v=>-h/2+v;
  ctx.fillStyle='#050605';ctx.fillRect(-w/2,-h/2,w,h);
  if(im){const z=1.0+.01*t+(lock?.06*eo(lin(t,FRZ,FRZ+.5)):0);const s=Math.max(w/im.width,h/im.height)*z;ctx.save();ctx.beginPath();ctx.rect(-w/2,-h/2,w,h);ctx.clip();
    ctx.filter=lock?'grayscale(1) sepia(.6) hue-rotate(60deg) saturate(1.6) contrast(1.35) brightness(.55)':'grayscale(1) contrast(1.2) brightness(.8)';
    ctx.drawImage(im,-im.width*s*.42,-h/2-(im.height*s-h)*.15,im.width*s,im.height*s);ctx.restore();}
  {const g=ctx.createLinearGradient(0,Y(900),0,Y(1500));g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.94)');ctx.fillStyle=g;ctx.fillRect(-w/2,Y(900),w,1020);}
  {const g=ctx.createLinearGradient(0,-h/2,0,Y(420));g.addColorStop(0,'rgba(0,0,0,.85)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,420);}
  if(!lock){txt('HISTOIRE VRAIE · JULIAN ASSANGE',0,Y(290),'700 30px Mono','rgba(236,238,230,.85)','center',4);
    txt('COUPABLE',0,Y(1250),'200px Anton',INK,'center',6,1,24);txt('DE JOURNALISME.',0,Y(1395),'100px Anton',RED,'center',3,1,22);
    txt('Photo : Snapperjack · CC BY-SA 2.0',0,Y(1500),'400 18px Mono','rgba(236,238,230,.55)','center',1);}
  else{// le réticule se verrouille
    const p=eo(lin(t,FRZ,FRZ+.35)),cx=-60,cy=Y(560),R=260-120*p;ctx.save();ctx.strokeStyle=`rgba(255,58,46,${.9})`;ctx.lineWidth=5;ctx.shadowColor='rgba(255,40,30,.9)';ctx.shadowBlur=18;
    ctx.beginPath();ctx.arc(cx,cy,R,0,6.283);ctx.stroke();[[1,0],[-1,0],[0,1],[0,-1]].forEach(([a,b])=>{ctx.beginPath();ctx.moveTo(cx+a*(R-40),cy+b*(R-40));ctx.lineTo(cx+a*(R+70),cy+b*(R+70));ctx.stroke();});ctx.restore();
    txt('REC ● 12.07.2007 · BAGDAD',-w/2+60,Y(200),'700 30px Mono',RED,'left',3,Math.floor(t*4)%2?1:.4);
    slam('CE N’EST PAS',0,Y(1180),'130',INK,t,FRZ+.4,4);slam('CELUI QUI A TIRÉ.',0,Y(1340),'130',RED,t,FRZ+.9,4);}
}
// ---------- viseur (reconstitution, aucune personne réelle à l'image)
const VTER=[];{const r=rng(77);for(let i=0;i<60;i++)VTER.push({x:(r()-.5)*1600,y:(r()-.5)*1600,w:80+r()*260,h:60+r()*200,g:40+r()*60});}
function drawViseur(w,h,t,c){
  const SEQ=[['city',N(2)-.1],['group',N(3)-.1],['cam',N(4)-.1],['light',N(5)-.1],['fire',N(6)-.3],['van',N(7)-.1],['vanfire',N(7)+2.55]];
  let ck=SEQ[0][0],cs=SEQ[0][1];SEQ.forEach(([k,ts])=>{if(t>=ts){ck=k;cs=ts;}});const im=VF(ck,t,cs);
  ctx.fillStyle='#050605';ctx.fillRect(-w/2,-h/2,w,h);
  const PX=-w/2+16,PW=w-32,PH=Math.round(PW*344/360),PY=-h/2+120;
  ctx.save();ctx.beginPath();ctx.rect(PX,PY,PW,PH);ctx.clip();
  const firing=(ck==='fire'&&t<N(6)+1.6)||ck==='vanfire';if(firing)shake(t,cs,2.5,18);
  if(im){ctx.filter='contrast(1.25) brightness(1.02)';ctx.drawImage(im,141,0,360,344,PX-8,PY-6,PW+16,PH+12);ctx.filter='none';}
  if(firing&&Math.floor((t-cs)*14)%3==0){ctx.fillStyle='rgba(255,255,255,.22)';ctx.fillRect(PX,PY,PW,PH);}
  for(let y=PY;y<PY+PH;y+=5){ctx.fillStyle='rgba(0,0,0,.08)';ctx.fillRect(PX,y,PW,2);}
  // traduction de l'ordre radio
  if(ck==='light'){ctx.fillStyle='rgba(0,0,0,.72)';ctx.fillRect(PX,PY+40,PW,150);slam('« ALLUMEZ-LES TOUS. FEU ! »',0,PY+140,'50',AMB,t,N(5)+1.0,2,16);}
  // bilan par-dessus les vraies images
  if(t>=N(6)+.9&&ck==='fire'){const d=eo(lin(t,N(6)+.9,N(6)+1.4));ctx.fillStyle=`rgba(0,0,0,${.55*d})`;ctx.fillRect(PX,PY,PW,PH);
    const v=Math.round(11*eo(lin(t,N(6)+.9,N(6)+1.7)));slam(String(v),0,PY+300,'260',RED,t,N(6)+.9,2,28);txt('MORTS AU MOINS',0,PY+390,'64px Anton',INK,'center',4,lin(t,N(6)+1.1,N(6)+1.3));
    if(t>=N(6)+1.6)txt('DONT 2 JOURNALISTES DE REUTERS',0,PY+450,'700 30px Mono',AMB,'center',2,lin(t,N(6)+1.6,N(6)+1.8));}
  if(ck==='van'&&t<N(7)+2.55){ctx.fillStyle='rgba(0,0,0,.65)';ctx.fillRect(PX,PY+20,PW,90);txt('UNE CAMIONNETTE VIENT SECOURIR UN BLESSÉ',0,PY+78,'700 30px Mono',INK,'center',1);}
  if(t>=N(7)+3.8){ctx.fillStyle='rgba(0,0,0,.5)';ctx.fillRect(PX,PY,PW,PH);slam('À L’INTÉRIEUR :',0,PY+200,'70',INK,t,N(7)+3.4,3);slam('2 ENFANTS',0,PY+330,'140',RED,t,N(7)+3.8,3,26);}
  stampAt('ÉQUIPAGE BLANCHI',0,PY+PH-170,80,t,N(8)+1.1,-.07,VERT);stampAt('SECRET',0,PY+PH/2-60,130,t,N(9)+.6,.08);
  ctx.restore();
  ctx.strokeStyle='rgba(236,238,230,.6)';ctx.lineWidth=3;ctx.strokeRect(PX,PY,PW,PH);
  if(Math.floor(t*2)%2){ctx.fillStyle=RED;ctx.beginPath();ctx.arc(-w/2+40,-h/2+62,11,0,6.283);ctx.fill();}
  txt('12 JUILLET 2007 · BAGDAD',-w/2+62,-h/2+72,'700 30px Mono',INK,'left',3);
  ctx.fillStyle='rgba(201,48,44,.92)';ctx.fillRect(w/2-330,-h/2+38,310,46);txt('VRAIES IMAGES',w/2-175,-h/2+70,'700 28px Mono','#fff','center',3);
  srcFit('Images : caméra de l’hélicoptère Apache (armée américaine, domaine public) · publiées par WikiLeaks, 5/04/2010',w,h);
}
// ---------- la cellule de Belmarsh
function drawCellule(w,h,t,c){
  const T0=c.t0;ctx.fillStyle='#141614';ctx.fillRect(-w/2,-h/2,w,h);
  ctx.save();ctx.beginPath();ctx.rect(-w/2,-h/2,w,h);ctx.clip();
  // mur et lumière zénithale
  const g=ctx.createRadialGradient(0,-h/2+200,20,0,-h/2+200,700);g.addColorStop(0,'rgba(220,225,215,.25)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,h);
  txt('HM PRISON',0,-h/2+170,'700 36px Mono','rgba(236,238,230,.7)','center',10);slam('BELMARSH',0,-h/2+300,'150',INK,t,T0+.3,8);
  txt('HAUTE SÉCURITÉ · LONDRES',0,-h/2+360,'700 30px Mono',AMB,'center',5,lin(t,N(20)+1.6,N(20)+1.9));
  if(t>=N(21)){const q=lin(t,N(21)+1.9,N(21)+3.2);slam('18',-200,-h/2+560,'190',RED,t,N(21)+1.9,2);txt('CHEFS',-200,-h/2+620,'700 34px Mono',INK,'center',4,lin(t,N(21)+1.9,N(21)+2.1));
    if(t>=N(21)+3.4){const v=Math.round(175*eo(lin(t,N(21)+3.4,N(21)+4.6)));txt(String(v),170,-h/2+560,'190px Anton',RED,'center',2,1,26);txt('ANS DE PRISON',170,-h/2+620,'700 34px Mono',INK,'center',4);}}
  if(t>=N(22))band(-h/2+760,t,N(22),'1RE FOIS : LA LOI SUR L’ESPIONNAGE CONTRE UN ÉDITEUR',40,'rgba(201,48,44,.92)');
  // barreaux qui se referment
  const p=eback(lin(t,T0+.05,T0+.6));for(let i=0;i<9;i++){const x=-w/2+50+i*100;const yy=-h/2-h+(h)*p;ctx.fillStyle='#2a2d2a';ctx.fillRect(x,yy,26,h);const gb=ctx.createLinearGradient(x,0,x+26,0);gb.addColorStop(0,'rgba(255,255,255,.18)');gb.addColorStop(1,'rgba(0,0,0,.4)');ctx.fillStyle=gb;ctx.fillRect(x,yy,26,h);}
  ctx.fillStyle='#2a2d2a';ctx.fillRect(-w/2,-h/2+40,w,26);ctx.fillRect(-w/2,h/2-160,w,26);
  ctx.restore();srcFit('Sources : ministère américain de la Justice (2019) · CBS · Infosecurity',w,h);
}
function cardExtra(c,t,w,h){
  if(c.k==='viseur'){drawViseur(w,h,t,c);return 1;}
  if(c.k==='cellule'){drawCellule(w,h,t,c);return 1;}
  if(c.k==='doc'){framePaper(w,h,PAPERC);txt(c.hd,0,-h/2+95,'700 28px Mono','rgba(27,28,26,.7)','center',2);
    {let z=150;while(z>60&&mw(c.big,z+'px Anton',2)>w-80)z-=6;txt(c.big,0,-h/2+280,z+'px Anton',INKD,'center',2);}
    txt(c.l2,0,-h/2+370,'52px Anton',PINK,'center',2,lin(t,c.t0+.3,c.t0+.5));
    (c.rows||[]).forEach(([s,t0],i)=>{if(t<t0)return;const q=eo(lin(t,t0,t0+.25));const y=-h/2+480+i*100;ctx.save();ctx.globalAlpha*=q;let z=50;while(z>24&&mw(s,z+'px Anton',2)>w-120)z-=2;
      ctx.fillStyle='rgba(27,28,26,.9)';ctx.fillRect(-w/2+50,y-z,w-100,z*1.45);txt(s,0,y+z*.1,z+'px Anton',i?RED:INK,'center',2);ctx.restore();});
    if(c.stampOnu)stampAt('TORTURE PSYCHOLOGIQUE',0,h/2-170,72,t,c.stampOnu,-.07);
    if(c.stampLibre)stampAt('LIBRE',w/2-190,h/2-150,110,t,c.stampLibre,-.14,VERT);
    srcFit(c.src||'',w,h,1);return 1;}
  if(c.k==='manning'){const M=k=>SEGS[ID['m'+k]].t0;framePaper(w,h,'rgba(24,26,24,.97)');txt('D’OÙ VIENNENT LES SECRETS ?',0,-h/2+100,'60px Anton',INK,'center',2);
    if(t>=M(1)){stampAt('LA SOURCE',-w/2+190,-h/2+200,56,t,M(1),-.1);slam('CHELSEA MANNING',0,-h/2+300,'96',RED,t,M(1)+1.9,3,20);
      txt('22 ANS · ANALYSTE DU RENSEIGNEMENT · IRAK',0,-h/2+360,'700 28px Mono',AMB,'center',2,lin(t,M(1)+3.2,M(1)+3.5));}
    if(t>=M(2)){// le CD « Lady Gaga »
      const cx=-170,cy=-h/2+560,R=150,a=(t-M(2))*3;ctx.save();ctx.translate(cx,cy);ctx.rotate(a);const g=ctx.createConicGradient?ctx.createConicGradient(0,0,0):null;
      if(g){g.addColorStop(0,'#c9ccd2');g.addColorStop(.25,'#8fd3ff');g.addColorStop(.5,'#f2c4ff');g.addColorStop(.75,'#c9f2c4');g.addColorStop(1,'#c9ccd2');ctx.fillStyle=g;}else ctx.fillStyle='#c9ccd2';
      ctx.beginPath();ctx.arc(0,0,R,0,6.283);ctx.fill();ctx.fillStyle='#222';ctx.beginPath();ctx.arc(0,0,22,0,6.283);ctx.fill();ctx.restore();
      ctx.save();ctx.translate(cx,cy+R*.45);ctx.rotate(-.08);ctx.fillStyle='rgba(255,255,255,.92)';ctx.fillRect(-110,-26,220,46);txt('LADY GAGA',0,10,'40px Anton','#c2185b','center',3);ctx.restore();
      if(t>=M(2)+1.9)stampAt('SECRET DÉFENSE',cx,cy-20,46,t,M(2)+1.9,-.18);
      txt('UN CD',130,-h/2+500,'70px Anton',INK,'center',2);txt('« DE MUSIQUE »',130,-h/2+570,'54px Anton',AMB,'center',2,lin(t,M(2)+1.8,M(2)+2));}
    if(t>=M(3)){const p=eo(lin(t,M(3),M(3)+.6));ctx.save();ctx.strokeStyle=RED;ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(-w/2+120,h/2-190);ctx.lineTo(-w/2+120+(w-360)*p,h/2-190);ctx.stroke();ctx.restore();
      if(p>=1){ctx.fillStyle='rgba(201,48,44,.95)';ctx.fillRect(w/2-260,h/2-250,210,120);txt('WIKILEAKS',w/2-155,h/2-178,'44px Anton','#fff','center',2);}
      txt('DÉPÔT ANONYME ET CHIFFRÉ',0,h/2-80,'700 32px Mono',AMB,'center',3,lin(t,M(3)+1.8,M(3)+2.1));}
    srcFit('Sources : messages de C. Manning publiés par Wired (2010) · procès de Manning (2013)',w,h);return 1;}
  if(c.k==='vs14'){framePaper(w,h,'rgba(30,32,30,.95)');const X=[-w/4+10,w/4-10];ctx.fillStyle='rgba(236,238,230,.3)';ctx.fillRect(-2,-h/2+60,4,h-120);
    txt('POUR LES UNS',X[0],-h/2+150,'700 30px Mono','rgba(236,238,230,.7)','center',3);slam('JOURNALISTE',X[0],-h/2+300,'78',VERT,t,c.t0+.3,2);txt('DU SIÈCLE',X[0],-h/2+380,'56px Anton',VERT,'center',2,lin(t,c.t0+.5,c.t0+.7));
    if(t>=N(14)+2.4){txt('POUR WASHINGTON',X[1],-h/2+150,'700 30px Mono','rgba(236,238,230,.7)','center',3);slam('ENNEMI',X[1],-h/2+300,'90',RED,t,N(14)+3.4,2);slam('PUBLIC',X[1],-h/2+390,'70',RED,t,N(14)+3.6,2);}return 1;}
  if(c.k==='docs'){framePaper(w,h,'rgba(30,32,30,.95)');txt('WIKILEAKS · 2010',0,-h/2+100,'700 34px Mono',AMB,'center',6);txt('DOCUMENTS SECRETS PUBLIÉS',0,-h/2+180,'64px Anton',INK,'center',2);
    [['AFGHANISTAN',77000,N(13)+2.9],['IRAK',392000,N(13)+3.9],['DIPLOMATIE',251000,N(13)+4.6]].forEach(([s,v,t0],i)=>{if(t<t0)return;const y=-h/2+320+i*125;const q=eo(lin(t,t0,t0+.15));ctx.save();ctx.globalAlpha*=q;ctx.fillStyle='rgba(128,134,126,.25)';ctx.fillRect(-w/2+60,y-70,w-120,105);
      txt(s,-w/2+90,y+10,'56px Anton',INK,'left',3);txt('≈ '+fmtN(v*eo(lin(t,t0,t0+.8))),w/2-90,y+10,'64px Anton',RED,'right',2,1,12);ctx.restore();});
    if(false){const X=[-w/4+10,w/4-10];ctx.fillStyle='rgba(10,10,10,.9)';ctx.fillRect(-w/2+40,h/2-250,w-80,190);
      txt('POUR LES UNS',X[0],h/2-195,'700 26px Mono','rgba(236,238,230,.7)','center',3);txt('JOURNALISTE',X[0],h/2-130,'60px Anton',VERT,'center',2);txt('DU SIÈCLE',X[0],h/2-80,'44px Anton',VERT,'center',2);
      if(t>=N(14)+2.4){txt('POUR WASHINGTON',X[1],h/2-195,'700 26px Mono','rgba(236,238,230,.7)','center',3);slam('ENNEMI',X[1],h/2-130,'60',RED,t,N(14)+3.4,2);slam('PUBLIC',X[1],h/2-80,'44',RED,t,N(14)+3.6,2);}}
    srcFit('Sources : WikiLeaks · The Guardian · New York Times (2010)',w,h);return 1;}
  if(c.k==='arrest'){framePaper(w,h,'rgba(30,32,30,.95)');panel(IM.ambassade,-w/2+30,-h/2+30,w-60,420,.5,1,'grayscale(1) contrast(1.15) brightness(.7)');
    slam('11 AVRIL 2019',0,-h/2+250,'110',INK,t,c.t0+.2,3);stampAt('ASILE RETIRÉ',0,-h/2+380,80,t,N(19)+1.1,-.08);
    if(t>=N(19)+2.4){slam('SORTI DE FORCE',0,-h/2+580,'100',RED,t,N(19)+2.6,3);txt('PAR LA POLICE BRITANNIQUE',0,-h/2+650,'700 32px Mono',AMB,'center',3,lin(t,N(19)+2.8,N(19)+3));}
    srcFit('Photo : Tracey & Doug · CC BY-SA 2.0 · Source : AFP',w,h);return 1;}
  if(c.k==='jours'){framePaper(w,h,'rgba(24,26,24,.97)');txt('BELMARSH',0,-h/2+100,'700 34px Mono',AMB,'center',8);
    const v=Math.round(1901*eo(lin(t,c.t0+.1,c.t0+1.6)));txt(fmtN(v),0,-h/2+330,'230px Anton',INK,'center',3,1,24);txt('JOURS DE CELLULE',0,-h/2+410,'64px Anton',INK,'center',3);
    // traits de comptage gravés
    ctx.strokeStyle='rgba(236,238,230,.35)';ctx.lineWidth=4;const n=Math.floor(40*lin(t,c.t0,c.t0+1.6));for(let i=0;i<n;i++){const gx=-w/2+80+(i%20)*40,gy=-h/2+470+Math.floor(i/20)*70;if(i%5==4){ctx.beginPath();ctx.moveTo(gx-150,gy+40);ctx.lineTo(gx+10,gy+5);ctx.stroke();}else{ctx.beginPath();ctx.moveTo(gx,gy);ctx.lineTo(gx,gy+50);ctx.stroke();}}
    if(t>=N(24)+1.5)band(h/2-230,t,N(24)+1.5,'IL SE MARIE EN PRISON',56,DK,AMB);
    if(t>=N(24)+3)band(h/2-130,t,N(24)+3,'SES 2 FILS GRANDISSENT SANS LUI',52,'rgba(201,48,44,.92)');
    srcFit('Avril 2019 → juin 2024 · presse internationale',w,h);return 1;}
  if(c.k==='quote'){framePaper(w,h,'rgba(14,15,14,.98)');panel(IM.assange,-w/2,-h/2,w,h,.45,1.05,'grayscale(1) brightness(.35) contrast(1.2)');
    txt('APCE · STRASBOURG · 1ER OCTOBRE 2024',0,-h/2+110,'700 28px Mono',AMB,'center',3,lin(t,c.t0,c.t0+.3));
    if(t>=N(27)){const L=['« JE SUIS LIBRE','PARCE QUE J’AI','PLAIDÉ COUPABLE…'];L.forEach((s,i)=>{const t0=N(27)+i*.6;if(t>=t0)txt(s,0,-h/2+360+i*110,'96px Anton',INK,'center',3,lin(t,t0,t0+.15),12);});
      slam('DE JOURNALISME. »',0,-h/2+760,'110',RED,t,N(27)+2.35,3,28);}
    txt('— JULIAN ASSANGE',0,h/2-120,'700 34px Mono','rgba(236,238,230,.8)','center',4,lin(t,N(27)+2.8,N(27)+3.1));
    srcFit('Source : AFP · Al Jazeera (01/10/2024)',w,h);return 1;}
  if(c.k==='balance'){framePaper(w,h,'rgba(24,26,24,.97)');txt('DEUX POIDS,',0,-h/2+130,'100px Anton',INK,'center',3,lin(t,c.t0+.2,c.t0+.4),14);txt('DEUX MESURES.',0,-h/2+240,'100px Anton',RED,'center',3,lin(t,c.t0+.6,c.t0+.8),16);
    const row=(y,a,b,col,t0,big)=>{if(t<t0)return;const q=eo(lin(t,t0,t0+.15));ctx.save();ctx.globalAlpha*=q;ctx.fillStyle='rgba(128,134,126,.22)';ctx.fillRect(-w/2+50,y-80,w-100,130);
      txt(a,-w/2+80,y+5,'700 34px Mono',INK,'left',2);ctx.restore();slam(b,w/2-175,y+15,big||'58',col,t,t0+.35,2);};
    row(-h/2+420,'LA SOURCE · MANNING','7 ANS','#d98a00',N(29)+3.2);
    row(-h/2+580,'CEUX QUI ONT TIRÉ','BLANCHIS',VERT,N(30)+1.6);
    row(-h/2+740,'CEUX QUI ONT MONTRÉ','PRISON',RED,N(31)+1.3);
    srcFit('Sources : armée américaine (2007) · presse (Manning, 2010-2017)',w,h);return 1;}
  if(c.k==='toi'){framePaper(w,h,'rgba(24,26,24,.97)');
    const PW=360,PH=620,px=-PW/2,py=-h/2+90;rr(px-12,py-12,PW+24,PH+24,44);ctx.fillStyle='#111';ctx.fill();ctx.strokeStyle='rgba(236,238,230,.4)';ctx.lineWidth=3;ctx.stroke();
    ctx.save();rr(px,py,PW,PH,34);ctx.clip();panel(IM.balcon,px,py,PW,PH,.6,1.2,'grayscale(.6) brightness(.7)');ctx.restore();
    if(Math.floor(t*2)%2){ctx.fillStyle=RED;ctx.beginPath();ctx.arc(px+40,py+42,13,0,6.283);ctx.fill();}txt('REC',px+64,py+52,'700 28px Mono','#fff','left',2);
    [['TU FILMES.',N(32)+.9],['TU PARTAGES.',N(32)+1.8],['TU MONTRES.',N(32)+2.6]].forEach(([s,t0],i)=>{if(t>=t0)txt(s,0,-h/2+800+i*0,'0px Anton',INK);});
    const cur=t>=N(32)+2.6?'TU MONTRES CE QUE TU VOIS.':t>=N(32)+1.8?'TU PARTAGES.':t>=N(32)+.9?'TU FILMES.':'ET TOI ?';slam(cur,0,-h/2+820,'76',INK,t,t>=N(32)+2.6?N(32)+2.6:t>=N(32)+1.8?N(32)+1.8:t>=N(32)+.9?N(32)+.9:c.t0,3,14);
    if(t>=N(33)+2.1){ctx.fillStyle='rgba(201,48,44,.92)';ctx.fillRect(-w/2+50,h/2-140,w-100,100);txt('LUI L’A PAYÉ DE 14 ANS.',0,h/2-70,'64px Anton','#fff','center',3);}return 1;}
  if(c.k==='q'){framePaper(w,h,'rgba(40,43,40,.92)');txt('DIS-MOI EN COMMENTAIRE ↓',0,-h/2+110,'700 38px Mono',AMB,'center',3);
    slam('JOURNALISTE…',0,-h/2+340,'130',VERT,t,N(35),4,18);slam('OU ESPION ?',0,-h/2+530,'150',RED,t,N(36),4,24);return 1;}
  return 0;}
function drawHook2(w,h,t){
  const TB=K(5)-.06,TC=K(8)-.06,FRZ=MARK.frz,ph=t<TB?0:t<TC?1:2;const im=[IM.gj,IM.police,IM.parc3][ph];const t0=[0,TB,TC][ph];
  ctx.fillStyle='#0b0c0b';ctx.fillRect(-w/2,-h/2,w,h);
  if(im){const sl=ph?(1-eo(lin(t,t0,t0+.16)))*w:0;const z=1.08+.03*(t-t0);const s=Math.max(w/im.width,1500/im.height)*z;ctx.save();ctx.beginPath();ctx.rect(-w/2,-h/2+180,w,1350);ctx.clip();
    ctx.filter=(t>=FRZ?'grayscale(.7) contrast(1.25) brightness(.55)':ph===0?'grayscale(.4) contrast(1.15) brightness(.6)':ph===1?'saturate(.7) contrast(1.15) brightness(.55)':'saturate(1.1) contrast(1.1) brightness(.6)')+(sl>20?' blur(6px)':'');
    ctx.drawImage(im,-im.width*s/2+sl,-h/2+855-im.height*s/2,im.width*s,im.height*s);ctx.restore();
    [[-h/2+180,-h/2+480,.8,0],[-h/2+1230,-h/2+1530,0,.85]].forEach(([a,b2,ca,cb])=>{const g=ctx.createLinearGradient(0,a,0,b2);g.addColorStop(0,`rgba(0,0,0,${ca})`);g.addColorStop(1,`rgba(0,0,0,${cb})`);ctx.fillStyle=g;ctx.fillRect(-w/2,a,w,b2-a);});}
  const sl=(s,y,f,col,ta,ls,gl)=>{if(t<ta)return;const q=eo(lin(t,ta,ta+.13));const sc=1.7-.7*q;const sh=t<ta+.22?(1-lin(t,ta,ta+.22))*12:0;ctx.save();ctx.translate(Math.sin(t*90)*sh,y+Math.cos(t*77)*sh);ctx.scale(sc,sc);txt(s,0,0,f,col,'center',ls,cl(q*1.5),gl);ctx.restore();};
  const CR=['IMAGE D’ARCHIVE · 8 DÉC. 2018 · O. ORTELPA · CC BY','PHOTO DU SAMEDI 17 OCT. · J. JARAMILLO · CC BY-SA','IMAGE D’ARCHIVE · KILYAC · CC BY-SA'][ph];txt(CR,0,-h/2+1505,'400 18px Mono','rgba(236,238,230,.7)','center',2);
  if(ph===0){sl('2018',-h/2+560,'300px Anton',INK,K(0),8,20);sl('PSG – MONTPELLIER',-h/2+720,'96px Anton',INK,K(1),3,10);stampAt('REPORTÉ',0,-h/2+930,150,t,K(3),-.08);
    txt('À CAUSE DES MANIFS',0,-h/2+1110,'700 48px Mono',AMB,'center',6,lin(t,K(4),K(4)+.15));}
  else if(ph===1){sl('CE SOIR',-h/2+560,'230px Anton',INK,K(5),8,20);sl('LES MANIFS',-h/2+760,'130px Anton',INK,K(6),5,12);stampAt('INTERDITES',0,-h/2+960,150,t,K(7),-.07);}
  else{txt('PSG – BARÇA · PARC DES PRINCES · 21 H',0,-h/2+330,'700 30px Mono',AMB,'center',4,lin(t,TC,TC+.2));sl('MAIS LE MATCH',-h/2+640,'130px Anton',INK,K(8),5,12);
    if(t>=FRZ){const p=eo(lin(t,FRZ,FRZ+.12));ctx.save();ctx.globalAlpha=p*.35;ctx.fillStyle='#000';ctx.fillRect(-w/2,-h/2,w,h);ctx.restore();}
    sl('MAINTENU.',-h/2+900,'240px Anton',RED,FRZ,8,22);}
}
function drawCard(c,t){
  ctx.save();ctx.translate(c.x,c.y);ctx.rotate(c.rot*Math.PI/180);
  const w=c.w,h=c.h;
  if(c.k==='cover'){drawHook24(w,h,t);}
  else if(cardExtra(c,t,w,h)){}
  else if(c.k==='title'){framePaper(w,h);const big=120;c.lines.forEach((l,i)=>txt(l,0,-((c.lines.length-1)*big*.55)+i*big*1.1+big*.35,big+'px Anton',c.red&&i==1?PINK:INK,'center',2,lin(t,c.t0+i*.35,c.t0+i*.35+.15),c.red&&i==1?0:0));}
  else if(c.k==='proof'){framePaper(w,h,'rgba(30,32,30,.95)');txt(c.lab||'PREUVE',0,-h/2+120,'700 44px Mono','rgba(236,238,230,.75)','center',14);
    const q=eo(lin(t,c.t0,c.t0+.18));ctx.save();ctx.translate(0,-h/2+440);ctx.scale(1.6-.6*q,1.6-.6*q);txt(String(c.n),0,0,'330px Anton',PINK,'center',2,q,24);ctx.restore();
    {let sz=96;while(sz>50&&mw(c.l,sz+'px Anton',3)>w-70)sz-=4;txt(c.l,0,-h/2+620,sz+'px Anton',INK,'center',3,lin(t,c.t0+.3,c.t0+.5),12);}}
  else if(c.k==='outro'){framePaper(w,h);txt('COUPABLE',0,-230,'140px Anton',INK,'center',4,1,24);txt('DE JOURNALISME.',0,-80,'96px Anton',PINK,'center',4,1,24);txt('LA FERME · HISTOIRE VRAIE',0,30,'700 30px Mono','rgba(236,238,230,.6)','center',6);
    txt('ABONNE-TOI',0,210,'70px Anton',INK,'center',4,1,16);txt('ILS PARLENT…',0,290,'700 32px Mono',AMB,'center',3);txt('NOUS ON VÉRIFIE.',0,340,'700 32px Mono',AMB,'center',3);}
  else if(c.k==='clip'){framePaper(w,h,'rgba(230,232,224,.88)');let ck=c.clip,cs=c.sync;if(c.seq)c.seq.forEach(([k,ts])=>{if(t>=ts){ck=k;cs=ts;}});const fr=c.img?[IM[c.img]]:((window.CLIPS&&CLIPS[ck])||[]);
    const fi=cs!=null?Math.floor((t-cs)*30):Math.floor((t-c.t0+.3)*30);const im=fr[Math.min(fr.length-1,Math.max(0,fi))];const pw=w-50,ph=h-170;
    ctx.fillStyle='#000';ctx.fillRect(-pw/2,-h/2+25,pw,ph);if(im){ctx.save();ctx.beginPath();ctx.rect(-pw/2,-h/2+25,pw,ph);ctx.clip();const age=Math.max(0,t-c.t0);const s=Math.max(pw/im.width,ph/im.height)*(1.02+age*.01);ctx.filter=c.gray?'grayscale(1) contrast(1.12)':'saturate(.8) contrast(1.08)';ctx.drawImage(im,-im.width*s/2,-h/2+25+ph/2-im.height*s/2,im.width*s,im.height*s);ctx.restore();}
    if(c.after){ctx.save();c.after(w,h,t);ctx.restore();}
    txt(c.handle,-w/2+30,h/2-85,'700 28px Mono','#1b1c1a','left',1);
    if(c.badge){const bc=c.badgeRed?PINK:'rgba(20,20,20,.85)';ctx.font='700 30px Mono';const bw=ctx.measureText(c.badge).width+36;ctx.fillStyle=bc;ctx.fillRect(-bw/2,h/2-58,bw,44);txt(c.badge,0,h/2-26,'700 30px Mono','#fff','center',2);}}
  else if(c.k==='report'){framePaper(w,h,PAPERC);txt('LIGUE 1 · SAMEDI 8 DÉCEMBRE 2018',0,-h/2+90,'700 30px Mono','rgba(27,28,26,.7)','center',3);
    txt('PSG – MONTPELLIER',0,-h/2+230,'96px Anton',INKD,'center',2);
    if(t>=N(12)+.3)['À LA DEMANDE DE LA','PRÉFECTURE DE POLICE'].forEach((s,i)=>txt(s,0,-h/2+310+i*50,'700 34px Mono',INKD,'center',1,lin(t,N(12)+.3,N(12)+.6)));
    stampAt('REPORTÉ',0,-h/2+500,120,t,N(13)+.35,-.08);
    if(t>=N(14)+.3){const p=eo(lin(t,N(14)+.3,N(14)+.6));ctx.save();ctx.globalAlpha*=p;ctx.fillStyle='rgba(201,48,44,.9)';ctx.fillRect(-w/2+50,h/2-210,w-100,150);
      txt('BUT : GARDER LES POLICIERS',0,h/2-145,'54px Anton','#fff','center',2);txt('POUR LES MANIFS',0,h/2-82,'54px Anton','#fff','center',2);ctx.restore();}
    darkTxt('Source : presse, décembre 2018',0,w,h);}
  else if(c.k==='vs'){framePaper(w,h,'rgba(40,43,40,.92)');txt('8 ANS PLUS TARD',0,-h/2+90,'700 34px Mono',AMB,'center',8);
    const X=[-w/4+5,w/4-5];txt('2018',X[0],-h/2+250,'130px Anton','rgba(236,238,230,.5)','center',2);txt('2026',X[1],-h/2+250,'130px Anton',INK,'center',2,1,16);
    ctx.fillStyle='rgba(236,238,230,.35)';ctx.fillRect(-2,-h/2+150,4,h-210);
    const cell=(x,y,a,b,col,t0,big)=>{if(t<t0)return;const q=eo(lin(t,t0,t0+.2));ctx.save();ctx.globalAlpha*=q;ctx.fillStyle='rgba(128,134,126,.25)';ctx.fillRect(x-205,y-70,410,175);
      txt(a,x,y-20,'700 28px Mono','rgba(236,238,230,.75)','center',4);txt(b,x,y+65,(big||58)+'px Anton',col,'center',2,1,0);ctx.restore();};
    cell(X[0],-h/2+400,'LA POLICE','SUR LES MANIFS','rgba(236,238,230,.75)',c.t0+.3,50);cell(X[0],-h/2+640,'LE MATCH','REPORTÉ','rgba(236,238,230,.75)',c.t0+.5,70);
    cell(X[1],-h/2+400,'LES MANIFS','INTERDITES',PINK,N(16)+.2,58);cell(X[1],-h/2+640,'LE MATCH','MAINTENU',PINK,N(17)+.3,70);
  }
  else if(c.k==='bless'){framePaper(w,h);txt('SAMEDI 17 OCTOBRE',0,-h/2+95,'700 32px Mono',AMB,'center',6);
    const v=Math.round(997*eo(lin(t,c.t0+.2,c.t0+1.6)));txt(String(v),0,-h/2+330,'240px Anton',PINK,'center',2,1,20);
    txt('POLICIERS ET GENDARMES',0,-h/2+420,'60px Anton',INK,'center',3);txt('BLESSÉS',0,-h/2+500,'70px Anton',INK,'center',3);
    if(t>=N(19)+1.1){const p=eo(lin(t,N(19)+1.1,N(19)+1.4));ctx.save();ctx.globalAlpha*=p;ctx.fillStyle='rgba(10,10,10,.6)';ctx.fillRect(-w/2+50,-h/2+560,w-100,170);
      txt('« PERTE DE CONTRÔLE »',0,-h/2+645,'72px Anton',AMB,'center',2,1,12);txt('— Laurent Nuñez, ministre de l’Intérieur',0,-h/2+700,'400 26px Mono',INK,'center');ctx.restore();}
    srcLine('Sources : ministère de l’Intérieur · franceinfo',w,h);}
  else if(c.k==='risk'){framePaper(w,h,PAPERC);txt('MARDI 20 OCT. · PSG – BARÇA',0,-h/2+90,'700 30px Mono','rgba(27,28,26,.7)','center',3);
    txt('CLASSÉ',0,-h/2+230,'90px Anton',INKD,'center',2);txt('« À HAUTS RISQUES » ?',0,-h/2+340,'80px Anton',INKD,'center',2);
    stampAt('NON',0,-h/2+530,150,t,N(20)+.9,-.1);
    txt('Division nationale de lutte contre le hooliganisme',0,h/2-70,'400 26px Mono','rgba(27,28,26,.75)','center');darkTxt('Source : RMC, 19/10',0,w,h);}
  else if(c.k==='senat'){framePaper(w,h,PAPERC);txt('RAPPORT DU SÉNAT N° 776 · 13 JUILLET 2022',0,-h/2+90,'700 28px Mono','rgba(27,28,26,.7)','center',2);
    txt('LE SÉNAT A CONCLU :',0,-h/2+200,'70px Anton',INKD,'center',2);
    const Q=['« CET ÉCHEC TIENT','AUX DÉCISIONS PRISES','PAR LA PRÉFECTURE','DE POLICE. »'];const TH=N(24)+2.1;
    Q.forEach((s,i)=>{const t0=N(24)+i*.7;if(t<t0)return;const y=-h/2+340+i*95;const hl=i>=2&&t>=TH;
      if(hl){const f='70px Anton',mm=mw(s,f,2),p=eo(lin(t,TH,TH+.3));ctx.fillStyle='rgba(201,48,44,.88)';ctx.fillRect(-mm/2-16,y-66,(mm+32)*p,84);}
      txt(s,0,y,'70px Anton',hl?'#fff':INKD,'center',2,lin(t,t0,t0+.2));});
    darkTxt('Source : Sénat, rapport n° 776 (2022)',0,w,h);}
  else if(c.k==='tour'){framePaper(w,h,'rgba(40,43,40,.92)');
    ctx.save();ctx.strokeStyle='rgba(236,238,230,.07)';ctx.lineWidth=2;for(let x=-w/2+60;x<w/2;x+=80){ctx.beginPath();ctx.moveTo(x,-h/2+260);ctx.lineTo(x,h/2-150);ctx.stroke();}for(let y=-h/2+260;y<h/2-150;y+=80){ctx.beginPath();ctx.moveTo(-w/2+30,y);ctx.lineTo(w/2-30,y);ctx.stroke();}ctx.restore();
    txt('OÙ EST LE PRÉSIDENT ?',0,-h/2+160,'80px Anton',INK,'center',2,lin(t,N(28),N(28)+.2));
    txt('TOURNÉE DANS LE GOLFE · 19 → 21 OCT.',0,-h/2+225,'700 28px Mono',AMB,'center',3,lin(t,N(29),N(29)+.2));
    const P=[[-300,-h/2+340,'KOWEÏT'],[-110,-h/2+430,'ÉMIRATS'],[80,-h/2+520,'BAHREÏN'],[250,-h/2+650,'QATAR']];const TA=N(29),TB=N(30)+.3;
    const pr=lin(t,TA,TB)*3;if(t>=TA){ctx.save();ctx.setLineDash([18,14]);ctx.strokeStyle=AMB;ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(P[0][0],P[0][1]);for(let i=1;i<4;i++){const u=cl(pr-(i-1));if(u<=0)break;ctx.lineTo(P[i-1][0]+(P[i][0]-P[i-1][0])*u,P[i-1][1]+(P[i][1]-P[i-1][1])*u);}ctx.stroke();ctx.restore();}
    P.forEach(([x,y,s],i)=>{const t0=TA+i*(TB-TA)/3;if(t<t0)return;const last=i===3;const p=eo(lin(t,t0,t0+.2));ctx.save();ctx.globalAlpha*=p;ctx.fillStyle=last?PINK:INK;ctx.beginPath();ctx.arc(x,y,last?20:13,0,6.283);ctx.fill();
      if(!last)txt(s,x+28,y+14,'44px Anton',INK,'left',2);ctx.restore();});
    if(t>=N(31)){const p=eo(lin(t,N(31),N(31)+.3));txt('QATAR',P[3][0]-30,P[3][1]+150,'120px Anton',PINK,'center',3,p,20);
      ctx.save();ctx.strokeStyle=PINK;ctx.lineWidth=7;ctx.beginPath();ctx.ellipse(P[3][0]-25,P[3][1]+95,210,105,-.08,-1.2,-1.2+6.6*p);ctx.stroke();ctx.restore();}
    stampAt('VISITE D’ÉTAT',-210,h/2-120,56,t,N(31)+.5,-.08);
    srcLine('Source : AFP / France 24',w,h);}
  else if(c.k==='question'){framePaper(w,h,'rgba(40,43,40,.92)');txt('?',w/2-170,h/2-50,'560px Anton','rgba(201,48,44,.22)','center');
    txt('ALORS…',0,-h/2+120,'700 40px Mono',AMB,'center',8);
    [['LE MATCH EST MAINTENU',N(41)+.15,INK,76,-h/2+290],['POUR FAIRE PLAISIR',N(41)+1.15,INK,90,-h/2+440],['AU QATAR ?',N(41)+1.75,PINK,150,-h/2+650]].forEach(([s,t0,col,sz,y])=>{if(t>=t0)txt(s,0,y,sz+'px Anton',col,'center',2,lin(t,t0,t0+.15),col===PINK?20:0);});}
  else if(c.k==='preuve'){framePaper(w,h,PAPERC);stampAt('AUCUNE PREUVE.',0,-h/2+200,96,t,N(42)+.05,-.06);
    if(t>=N(43))txt('PERSONNE NE L’A DIT.',0,-h/2+400,'72px Anton',INKD,'center',2,lin(t,N(43),N(43)+.2));
    if(t>=N(44))txt('ON NE VA PAS L’INVENTER.',0,-h/2+530,'64px Anton',INKD,'center',2,lin(t,N(44),N(44)+.2));
    txt('Aucune source ne relie ce match au Qatar.',0,h/2-45,'400 24px Mono','rgba(27,28,26,.7)','center');}
  else if(c.k==='deux'){framePaper(w,h,'rgba(30,32,30,.95)');
    txt('LE MÊME ÉTAT.',0,-h/2+170,'110px Anton',INK,'center',2,lin(t,N(49),N(49)+.2),14);
    if(t>=N(50))txt('LA MÊME SEMAINE.',0,-h/2+310,'96px Anton',INK,'center',2,lin(t,N(50),N(50)+.2),14);
    const T2=N(50)+1.05;if(t>=T2){const p=eback(lin(t,T2,T2+.6));const ang=.16*p;
      ctx.save();ctx.translate(0,-h/2+480);ctx.strokeStyle=INK;ctx.fillStyle=INK;ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(0,-30);ctx.lineTo(0,150);ctx.stroke();ctx.beginPath();ctx.moveTo(-70,175);ctx.lineTo(70,175);ctx.lineTo(0,140);ctx.fill();
      ctx.beginPath();ctx.arc(0,-30,14,0,6.283);ctx.fill();ctx.rotate(ang);ctx.beginPath();ctx.moveTo(-320,0);ctx.lineTo(320,0);ctx.stroke();
      [[-320,'LES MANIFS',PINK,'INTERDITES'],[320,'LE MATCH',GREEN,'MAINTENU']].forEach(([x,a,col,b])=>{ctx.save();ctx.translate(x,0);ctx.rotate(-ang);ctx.strokeStyle=INK;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(-95,110);ctx.moveTo(0,0);ctx.lineTo(95,110);ctx.stroke();
        ctx.fillStyle='rgba(180,186,176,.7)';ctx.fillRect(-125,110,250,14);txt(a,0,172,'44px Anton',INK,'center',2);txt(b,0,214,'700 26px Mono',col,'center',2);ctx.restore();});
      ctx.restore();stampAt('DEUX MESURES.',0,h/2-95,110,t,T2,-.06);}}
  else if(c.k==='q'){framePaper(w,h,'rgba(40,43,40,.92)');txt('TU REGARDES',0,-h/2+170,'100px Anton',INK,'center',2);txt('LE MATCH, TOI ?',0,-h/2+300,'100px Anton',PINK,'center',2,lin(t,c.t0+.4,c.t0+.6),14);
    txt('DIS-LE EN COMMENTAIRE ↓',0,h/2-70,'700 40px Mono',AMB,'center',3,lin(t,N(52),N(52)+.3));}
  laminate(w,h);
  if(c.k!=='cover'){pin(0,-h/2+18);tape(-w/2+40,-h/2+10,140,-.6);}else{pin(0,-h/2+10);}
  if(c.k==='patrons')postit(w,h);
  if(c.hl!=null&&t>=c.hl&&t<WT1+1){const a=(1-lin(t,WT1,WT1+1))*eo(lin(t,c.hl,c.hl+.2))*(.7+.3*Math.sin((t-c.hl)*9));ctx.save();ctx.strokeStyle=`rgba(255,58,46,${a})`;ctx.lineWidth=40;ctx.shadowColor='rgba(255,40,30,.95)';ctx.shadowBlur=70;ctx.strokeRect(-w/2-34,-h/2-34,w+68,h+68);ctx.restore();}
  ctx.restore();
}
function outroCredits(t){const c=C[cOutro];ctx.save();ctx.translate(c.x,c.y+c.h/2+110);[
  'Sources : CPJ · Reuters · WikiLeaks · Yahoo News (2021) · ONU (N. Melzer, 2019) · DOJ (2019, 2024) · APCE (1/10/2024)',
  'Bagdad : reconstitution graphique · Photos Wikimedia Commons : Snapperjack · wl dreamer · Tracey & Doug (CC BY-SA)',
  'Musique : « Hitman », K. MacLeod · CC BY 4.0'].forEach((s,i)=>{let sz=20;while(sz>11&&mw(s,'400 '+sz+'px Mono')>c.w-48)sz--;txt(s,0,i*36,'400 '+sz+'px Mono','rgba(236,238,230,.75)','center');});ctx.restore();}

// ---------- sous-titres courts (3 mots max)
const CHUNKS=[];SEGS.forEach(s=>{const ws=s.txt.split(' ');const tot=ws.reduce((a,w)=>a+w.length+1,0);let acc=0;const dur=s.t1-s.t0;const wt=ws.map(w=>{const tt=s.t0+dur*acc/tot;acc+=w.length+1;return[w,tt];});
  for(let i=0;i<wt.length;){let n=Math.min(3,wt.length-i);if(n==3&&wt[i+1][0].length+wt[i][0].length+wt[i+2][0].length>18)n=2;CHUNKS.push({m:s.m,txt:wt.slice(i,i+n).map(x=>x[0]).join(' ').toUpperCase(),t:wt[i][1]});i+=n;}});
CHUNKS.forEach((c,i)=>{c.e=i<CHUNKS.length-1?Math.min(CHUNKS[i+1].t,c.t+1.6):c.t+1.2;});
function subs2(t){const c=CHUNKS.find(c=>t>=c.t-.03&&t<c.e);if(!c)return;const p=eo(lin(t,c.t-.03,c.t+.08));
  ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.translate(540,1330);ctx.scale(.9+.1*p,.9+.1*p);ctx.globalAlpha=p;ctx.font='76px Anton';ctx.textAlign='center';ctx.letterSpacing='1px';
  const w=ctx.measureText(c.txt).width;ctx.fillStyle='rgba(90,96,90,.45)';ctx.fillRect(-w/2-26,-74,w+52,96);ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=2;ctx.strokeRect(-w/2-26,-74,w+52,96);ctx.shadowColor='rgba(255,255,255,.5)';ctx.shadowBlur=14;ctx.fillStyle=c.m?'#FFC24A':'#f4f1e6';ctx.fillText(c.txt,0,0);ctx.restore();}

// ---------- sons
ev(MARK.frz,'zap');reveal(MARK.frz+.4,1.2);reveal(MARK.frz+.9,1.3);ev(MARK.tcov-.1,'whoosh');
KEYS.forEach(k=>{if(k.t>MARK.tcov+.1)ev(k.t-.5,'whoosh');});
C.forEach((c,i)=>{if(i>0)ev(c.t0-.05,'click');});
// Bagdad
ev(N(2),'riser');for(let k=0;k<20;k++)ev(N(5)+.3+k*.045,'type');for(let k=0;k<14;k++)ev(N(6)-.3+k*.1,'hit');reveal(N(6)-.3,1.4);for(let k=0;k<10;k++)ev(N(7)+2.55+k*.1,'hit');reveal(N(7)+2.55,1.2);
for(let k=0;k<11;k++)ev(N(6)+k*.08,'tick');reveal(N(6),1.2);ev(N(7)+3.8,'boom');reveal(N(7)+3.8,1.1);ev(N(8)+1.1,'thud');ev(N(9)+.6,'thud');
// WikiLeaks
reveal(N(10),1.2);ev(N(11)+2.4,'hit');ev(N(12),'tick');reveal(N(12)+.95,1.4);for(let k=0;k<3;k++)ev(N(13)+2.9+k*.85,'thud');ev(N(14)+3.4,'boom');{const M=k=>SEGS[ID['m'+k]].t0;ev(M(0),'riser');reveal(M(1)+1.9,1.3);ev(M(2),'whoosh');ev(M(2)+1.9,'thud');ev(M(3),'zap');ev(M(3)+.6,'hit');}
// traque
reveal(N(15),1.1);ev(N(16)+.3,'tick');for(let k=0;k<20;k++)ev(N(17)+k*.12,'tick');ev(N(18)+1.6,'thud');reveal(N(18)+3.4,1.2);
ev(N(19)+.2,'hit');ev(N(19)+1.1,'thud');reveal(N(19)+2.6,1.2);
// prison
ev(N(20)+.05,'crack');ev(N(20)+.45,'boom');reveal(N(20)+.3,1.3);ev(N(21)+1.9,'hit');for(let k=0;k<12;k++)ev(N(21)+3.4+k*.1,'tick');reveal(N(21)+3.4,1.2);ev(N(22),'zap');
ev(N(23)+2.3,'tick');reveal(N(23)+3.4,1.3);for(let k=0;k<15;k++)ev(N(24)+.1+k*.1,'tick');ev(N(24)+1.5,'thud');ev(N(24)+3,'thud');
// sortie
ev(N(25)+2.6,'tick');reveal(N(25)+5.3,1.1);ev(N(26),'riser');reveal(N(27)+2.35,1.4);
// retournement
ev(WT0-.9,'riser');XT.forEach(([a,b,t0])=>ev(t0,'zap'));reveal(N(28),1.2);reveal(N(29)+3.55,1.1);reveal(N(30)+1.95,1.1);reveal(N(31)+1.65,1.4);
ev(N(32)+.9,'hit');ev(N(32)+1.8,'hit');ev(N(32)+2.6,'hit');ev(N(33)+2.1,'boom');reveal(N(35),1.1);reveal(N(36),1.4);ev(VEND+.35,'boom');

// ---------- post (gris-vert)
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
  if(st.speed>22){const m=MBC.getContext('2d');m.clearRect(0,0,W,H);m.drawImage(cv,0,0);ctx.save();ctx.globalAlpha=.3;const dx=-Math.cos(st.dir)*Math.min(st.speed,90)*.45,dy=-Math.sin(st.dir)*Math.min(st.speed,90)*.45;ctx.drawImage(MBC,dx,dy);ctx.drawImage(MBC,dx*.5,dy*.5);ctx.restore();}
  if(t>=TCOV&&t<VEND)subs2(t);
  post2(t);flash(t);
};
