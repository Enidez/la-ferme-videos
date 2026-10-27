// ================= « ON TE MANIPULE ? » partie 2 (26/10/2026) — mur d’enquêteur
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
const C=[];const add=o=>{C.push(Object.assign({rot:0},o));return C.length-1;};
const N=k=>SEGS[ID['n'+k]].t0;
function topBox(w,h,t,t0,a,b,sz=60,col){if(t<t0)return;const p=eo(lin(t,t0,t0+.3));ctx.save();ctx.globalAlpha*=p;ctx.fillStyle=col||'rgba(10,10,10,.82)';ctx.fillRect(-400,-h/2+70,800,b?170:120);
  txt(a,0,-h/2+(b?140:150),sz+'px Anton',INK,'center',2);if(b)txt(b,0,-h/2+205,'700 30px Mono',AMB,'center',3);ctx.restore();}
function band(y,t,t0,s,sz,bg,fg){if(t<t0)return;const p=eo(lin(t,t0,t0+.25));ctx.save();ctx.globalAlpha*=p;ctx.font=sz+'px Anton';const bw=Math.min(860,mw(s,sz+'px Anton',2)+60);ctx.fillStyle=bg||'rgba(201,48,44,.92)';ctx.fillRect(-bw/2,y-sz*.85,bw,sz*1.15);txt(s,0,y,sz+'px Anton',fg||'#fff','center',2);ctx.restore();}
const cCover=add({k:'cover',w:1080,h:1920,rot:0,t0:0});
const cRecap=add({k:'recap',w:940,h:1020,rot:2,t0:N(5)});
const cT5=add({k:'proof',lab:'TECHNIQUE',n:5,l:'SATURER',w:880,h:760,rot:-1.5,t0:N(11)});
const cHarv=add({k:'harvard',w:940,h:1040,rot:1.5,t0:N(13)});
const cFake=add({k:'fakes',w:960,h:1180,rot:-2,t0:N(17)});
const cT6=add({k:'proof',lab:'TECHNIQUE',n:6,l:'LES MOTS',w:880,h:760,rot:2,t0:N(25)});
const cOrw=add({k:'clip',full:1,img:'orwell',handle:'BNUJ · domaine public',badge:'GEORGE ORWELL · 1946',w:900,h:1150,rot:-1.5,t0:N(27),
  after:(w,h,t)=>{topBox(w,h,t,N(28),'« LE MENSONGE CRÉDIBLE','ET LE MEURTRE RESPECTABLE »',64);}});
const cMots=add({k:'mots',w:960,h:1060,rot:1.5,t0:N(29)});
const cT7=add({k:'proof',lab:'TECHNIQUE',n:7,l:'LE CONSENTEMENT',w:880,h:760,rot:-2,t0:N(35)});
const cBer=add({k:'clip',full:1,img:'bernays',handle:'Bain News Service · domaine public',badge:'EDWARD BERNAYS · NEVEU DE FREUD',w:900,h:1150,rot:1.5,t0:N(37),
  after:(w,h,t)=>{topBox(w,h,t,N(38),'« UN GOUVERNEMENT INVISIBLE »','« PROPAGANDA », 1928 · PREMIÈRE PAGE',56);stampAt('PAS BESOIN DE MATRAQUE',0,140,64,t,N(39),-.07);}});
const cGaz=add({k:'gazole',w:960,h:1120,rot:-1.5,t0:N(40)});
const cT8=add({k:'proof8',lab:'TECHNIQUE',n:8,l:'LE DOUTE',w:880,h:820,rot:2,t0:N(47)});
const cTab=add({k:'tabac',w:920,h:1060,rot:-2,t0:N(49)});
const cMac=add({k:'clip',full:1,img:'macron',handle:'Commission européenne · CC BY 4.0',badge:'EMMANUEL MACRON · OCTOBRE 2026',w:900,h:1150,rot:1.5,t0:N(53),
  after:(w,h,t)=>{topBox(w,h,t,N(53),'« MANIPULATION ÉTRANGÈRE »','L’ÉLYSÉE ACCUSE L’ÉTRANGER',60);band(40,t,N(54),'D’AUTRES ACCUSENT L’ÉLYSÉE',54);
    stampAt('PLUS PERSONNE NE CROIT RIEN',0,190,60,t,N(56),-.07);}});
const cPeu=add({k:'peuple',w:940,h:760,rot:-1.5,t0:N(57)});
const cClair=add({k:'clair',w:940,h:940,rot:2,t0:N(59)});
const cPouv=add({k:'pouvoirs',w:960,h:1060,rot:-1.5,t0:N(65)-.25});
const cCompte=add({k:'compte',w:920,h:860,rot:1.5,t0:N(67)});
const cAsch=add({k:'asch',w:960,h:1180,rot:-2,t0:N(69)});
const cToi=add({k:'toi',w:900,h:700,rot:1.5,t0:N(75)});
const cOutro=add({k:'outro',full:1,w:900,h:900,rot:-1.5,t0:VEND+.5});
const WT0=N(63)-.1,WT1=N(65)-.5;
C[cRecap].hl=N(63);C[cT5].hl=N(63)+.15;C[cT6].hl=N(63)+.3;C[cT7].hl=N(63)+.45;C[cT8].hl=N(63)+.6;
const XT=[[cRecap,cT5,N(63)],[cT5,cT6,N(63)+.2],[cT6,cT7,N(63)+.4],[cT7,cT8,N(63)+.6],[cRecap,cT8,N(64)]];
{const COLS=4,DX=1250,DY=1250;const r=rng(99);C.forEach((c,i)=>{if(i===0){c.x=-1300;c.y=0;return;}const j=i+1;const row=Math.floor(j/COLS),col=j%COLS;const cc=row%2?COLS-1-col:col;
  c.x=cc*DX+(r()-.5)*220;c.y=row*DY+(r()-.5)*220;c.rot*=1.9;});}

// ---------- trajectoire caméra
function fitZoom(c){return Math.min(880/c.w,900/c.h);}
const KEYS=[];C.forEach((c,i)=>{if(i===cCover)KEYS.push({t:0,x:c.x,y:c.y-160/1.04,z:1.04,rot:-c.rot*Math.PI/180});else if(c.full){const pw=c.k==='clip'?c.w-50:c.w;const z=(c.k==='clip'?1100:880)/pw;const a=c.rot*Math.PI/180;const oy=c.k==='clip'?-85:0;KEYS.push({t:c.t0,x:c.x-Math.sin(a)*oy,y:c.y+Math.cos(a)*oy-160/z,z,rot:-a});}
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
    const dwell=Math.max(.35,Math.min(gap-.55,Math.max(gap*.72,gap-1.6)));
    if(a.wide)WH={t0:a.t-.05,t1:a.t+dwell,x:a.x,y:a.y,z:a.z};
    WP.push({t:a.t-.05,x:a.x-ux*40,y:a.y-uy*40,z:a.z,r:a.rot});
    WP.push({t:a.t+dwell,x:a.x+ux*55,y:a.y+uy*55,z:a.z*1.06,r:a.rot});
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
const CLUT=[];{const r=rng(55);const ims=['hook','macron','orwell','bernays'];for(let i=0;i<90;i++){const k=r();CLUT.push({x:-1300+r()*6200,y:-1300+r()*12500,rot:(r()-.5)*.5,kind:k<.45?'post':k<.75?'photo':'clip',im:ims[Math.floor(r()*4)],w:k<.45?220:260,h:k<.45?220:190,lines:2+Math.floor(r()*4),col:r()});}}
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
// ---------- hook : le 17 octobre en plein écran, arrêt sur image, titre
function drawHook3(w,h,t){
  const TT=MARK.tt;const im=IM.macron;ctx.fillStyle='#0b0c0b';ctx.fillRect(-w/2,-h/2,w,h);
  if(im){const z=1.12+.03*t;const s=Math.max(w/im.width,h/im.height)*z;ctx.save();ctx.beginPath();ctx.rect(-w/2,-h/2,w,h);ctx.clip();
    ctx.filter=t<.15?'none':'grayscale(.35) contrast(1.15) brightness(.85)';ctx.drawImage(im,-im.width*s*.5,-im.height*s*.38,im.width*s,im.height*s);ctx.restore();}
  {const g=ctx.createLinearGradient(0,-h/2+h*.5,0,-h/2+h*.8);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.9)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2+h*.5,w,h*.5);}
  txt('EMMANUEL MACRON · OCT. 2026 · COMMISSION EUROPÉENNE · CC BY 4.0',0,-h/2+1490,'400 18px Mono','rgba(236,238,230,.7)','center',2);
  topBox(w,h,t,0,'« MANIPULATION ÉTRANGÈRE »','LE PRÉSIDENT, CE MOIS-CI',66);
  const sl=(s,y,f,col,ta,ls,gl)=>{if(t<ta)return;const q=eo(lin(t,ta,ta+.13));const sc=1.7-.7*q;ctx.save();ctx.translate(0,y);ctx.scale(sc,sc);txt(s,0,0,f,col,'center',ls,cl(q*1.5),gl);ctx.restore();};
  sl('ON TE',-h/2+1130,'190px Anton',INK,0,8,20);sl('MANIPULE ?',-h/2+1310,'190px Anton',RED,0,6,22);
  if(t>=TT)band(-h/2+1410,t,TT,'PARTIE 2 / 2',56);
  if(t>=N(3))txt('IL RESTE 4 TECHNIQUES · LA DERNIÈRE EST LA PIRE',0,-h/2+1480,'700 28px Mono',AMB,'center',2,lin(t,N(3),N(3)+.2));
}
// ---------- cartes dessinées
function cardExtra(c,t,w,h){
  if(c.k==='recap'){framePaper(w,h,'rgba(30,32,30,.95)');txt('PARTIE 1 · LE RAPPEL',0,-h/2+95,'700 32px Mono',AMB,'center',6);
    const R=[['1','LA PEUR'],['2','L’ENNEMI'],['3','DIVISER'],['4','LE CHOC']];
    R.forEach(([n,s],i)=>{const t0=N(5+i);const x=(i%2?1:-1)*215,y=-h/2+300+Math.floor(i/2)*270;const on=t>=t0;const q=eo(lin(t,t0,t0+.2));
      ctx.fillStyle=on?'rgba(201,48,44,.30)':'rgba(128,134,126,.18)';ctx.fillRect(x-195,y-110,390,220);ctx.strokeStyle=on?'rgba(255,80,60,.8)':'rgba(236,238,230,.3)';ctx.lineWidth=3;ctx.strokeRect(x-195,y-110,390,220);
      txt(n,x-130,y+40,'130px Anton',on?PINK:'rgba(236,238,230,.25)','center',2);txt(s,x+50,y+22,'58px Anton',on?INK:'rgba(236,238,230,.3)','center',2,on?.4+.6*q:1);
      if(on){ctx.save();ctx.globalAlpha*=q;ctx.strokeStyle=GREEN;ctx.lineWidth=9;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x+120,y+60);ctx.lineTo(x+145,y+85);ctx.lineTo(x+185,y+35);ctx.stroke();ctx.restore();}});
    if(t>=N(9))txt('TU EN ÉTAIS À COMBIEN ?',0,h/2-200,'72px Anton',INK,'center',2,lin(t,N(9),N(9)+.2),12);
    if(t>=N(10))txt('REPRENDS TON COMPTE.',0,h/2-95,'700 42px Mono',AMB,'center',4,lin(t,N(10),N(10)+.2));return 1;}
  if(c.k==='harvard'){framePaper(w,h,PAPERC);txt('UNIVERSITÉ HARVARD · 2017',0,-h/2+90,'700 30px Mono','rgba(27,28,26,.7)','center',4);
    txt('MAILS FUITÉS DE LA PROPAGANDE CHINOISE',0,-h/2+145,'700 28px Mono',INKD,'center',2);
    if(t>=N(14)){const v=Math.round(448*eo(lin(t,N(14),N(14)+1.2)));txt(v+' 000 000',0,-h/2+340,'130px Anton',PINK,'center',2,1,8);txt('FAUX MESSAGES PAR AN',0,-h/2+430,'60px Anton',INKD,'center',3);}
    if(t>=N(15)){const q=lin(t,N(15),N(15)+.2);txt('PAS POUR DÉBATTRE.',0,-h/2+560,'64px Anton','rgba(27,28,26,.55)','center',2,q);}
    if(t>=N(16)){const r=rng(7);const n=Math.floor(60*lin(t,N(16),N(16)+1.4));ctx.save();ctx.beginPath();ctx.rect(-w/2+30,-h/2+600,w-60,h-700);ctx.clip();
      for(let i=0;i<n;i++){const x=-w/2+60+r()*(w-200),y=-h/2+620+r()*(h-760);ctx.fillStyle=`rgba(${r()<.5?201:60},${r()<.5?48:64},${r()<.5?44:60},.55)`;ctx.fillRect(x,y,120+r()*90,34);ctx.fillStyle='rgba(255,255,255,.6)';ctx.fillRect(x+12,y+12,60+r()*60,8);}ctx.restore();
      stampAt('POUR NOYER.',0,-h/2+800,110,t,N(16),-.07);}
    darkTxt('King, Pan & Roberts · American Political Science Review, 2017',0,w,h);return 1;}
  if(c.k==='fakes'){framePaper(w,h,'rgba(30,32,30,.95)');txt('CHEZ NOUS · EN 10 JOURS',0,-h/2+95,'700 34px Mono',AMB,'center',6);
    const R=[['« UN COUPLE D’OCTOGÉNAIRES DÉNUDÉ »','IMAGE GÉNÉRÉE PAR IA · 6 MILLIONS DE VUES',N(18)],['« DES POLICIERS PILLEURS »','3 MILLIONS DE VUES · DÉMENTI PAR LE PARQUET',N(19)],['« LE TIREUR DE TRAPPES »','UN HOMONYME INNOCENT, MENACÉ',N(20)]];
    R.forEach(([a,b,t0],i)=>{if(t<t0)return;const y=-h/2+250+i*250;const q=eo(lin(t,t0,t0+.2));ctx.save();ctx.globalAlpha*=q;
      ctx.fillStyle='rgba(128,134,126,.22)';ctx.fillRect(-w/2+40,y-90,w-80,200);
      ctx.fillStyle='rgba(90,96,90,.9)';ctx.fillRect(-w/2+60,y-70,170,160);ctx.strokeStyle='rgba(236,238,230,.25)';ctx.lineWidth=2;for(let k=-160;k<170;k+=22){ctx.beginPath();ctx.moveTo(-w/2+60+Math.max(0,k),y-70+Math.max(0,-k));ctx.lineTo(-w/2+60+Math.min(170,k+160),y-70+Math.min(160,160-k));ctx.stroke();}
      txt('FLOUTÉ',-w/2+145,y+18,'700 22px Mono','rgba(236,238,230,.7)','center',3);
      txt(a,-w/2+260,y-10,'44px Anton',INK,'left',1);txt(b,-w/2+260,y+45,'700 24px Mono','rgba(236,238,230,.75)','left',1);ctx.restore();
      stampAt('FAUX',w/2-120,y+10,74,t,t0+.35,-.12);});
    if(t>=N(21))band(h/2-250,t,N(21),'DES FAUX DE TOUS LES CÔTÉS',60,'rgba(10,10,10,.88)',INK);
    if(t>=N(24))band(h/2-120,t,N(24),'ET TON SALAIRE ?',70);
    srcLine('Sources : AFP Factuel · CheckNews · BFMTV',w,h);return 1;}
  if(c.k==='mots'){framePaper(w,h,'rgba(30,32,30,.95)');txt('CE MOIS-CI',0,-h/2+100,'700 36px Mono',AMB,'center',8);
    const R=[['SÉDITIEUX','E. MACRON · 22 OCT.',N(30)],['TOURNANT','E. MACRON · APRÈS TRAPPES',N(31)],['INVASION','B. NETANYAHOU · 20 OCT.',N(32)]];
    R.forEach(([s,who,t0],i)=>{const y=-h/2+250+i*230;tiles(t,s,0,y,{t0,step:.05,h:118,gap:10});if(t>=t0+.4)txt(who,0,y+100,'700 24px Mono','rgba(236,238,230,.7)','center',3,lin(t,t0+.4,t0+.6));
      if(t>=N(34)){const q=eo(lin(t,N(34)+i*.15,N(34)+i*.15+.25));ctx.save();ctx.strokeStyle=RED;ctx.lineWidth=7;ctx.globalAlpha*=q;ctx.strokeRect(-w/2+50,y-80,w-100,200);ctx.restore();}});
    if(t>=N(33))band(h/2-90,t,N(33),'LE MOT ARRIVE AVANT LES FAITS',56);return 1;}
  if(c.k==='gazole'){framePaper(w,h,PAPERC);txt('LE CALENDRIER',0,-h/2+110,'90px Anton',INKD,'center',3);
    const R=[['24 OCT.','DÉCRET : 10 MILLIONS','DE BARILS DE GAZOLE',N(40),INKD],['1ER NOV.','BAISSE ATTENDUE','À LA POMPE',N(41),'#2f6b2a'],['5 NOV.','GRÈVE','INTERPROFESSIONNELLE',N(42),PINK]];
    ctx.fillStyle='rgba(27,28,26,.35)';ctx.fillRect(-w/2+150,-h/2+220,6,640*lin(t,N(40),N(42)+.4));
    R.forEach(([d,a,b,t0,col],i)=>{if(t<t0)return;const y=-h/2+260+i*220;const q=eo(lin(t,t0,t0+.25));ctx.save();ctx.globalAlpha*=q;ctx.fillStyle=col;ctx.beginPath();ctx.arc(-w/2+153,y,20,0,6.283);ctx.fill();
      txt(d,-w/2+200,y+22,'70px Anton',col,'left',2);txt(a,-w/2+440,y-6,'700 24px Mono',INKD,'left',0);txt(b,-w/2+440,y+34,'700 24px Mono',INKD,'left',0);ctx.restore();});
    if(t>=N(43))txt('4 JOURS D’ÉCART',0,-h/2+790,'700 30px Mono',PINK,'center',3,lin(t,N(43),N(43)+.2));
    stampAt('CALCULÉ ? AUCUNE SOURCE',0,h/2-220,62,t,N(44),-.06,INKD);
    if(t>=N(46))band(h/2-90,t,N(46),'LE CALENDRIER EST PUBLIC',56,'rgba(47,107,42,.92)');
    darkTxt('Sources : Journal officiel du 24/10 · AFP · Matignon',0,w,h);return 1;}
  if(c.k==='proof8'){framePaper(w,h,'rgba(30,32,30,.95)');txt(c.lab,0,-h/2+120,'700 44px Mono','rgba(236,238,230,.75)','center',14);
    const q=eo(lin(t,c.t0,c.t0+.18));ctx.save();ctx.translate(0,-h/2+440);ctx.scale(1.6-.6*q,1.6-.6*q);txt('8',0,0,'330px Anton',PINK,'center',2,q,24);ctx.restore();
    txt(c.l,0,-h/2+620,'96px Anton',INK,'center',3,lin(t,N(48),N(48)+.2),12);stampAt('LA PLUS DANGEREUSE',0,h/2-90,60,t,c.t0+.25,-.06);return 1;}
  if(c.k==='tabac'){framePaper(w,h,'#e3dcc6');ctx.fillStyle='rgba(120,100,60,.08)';for(let i=0;i<14;i++)ctx.fillRect(-w/2+40,-h/2+250+i*44,w-80,2);
    txt('BROWN & WILLIAMSON · MÉMO INTERNE · 1969',0,-h/2+90,'700 28px Mono','rgba(27,28,26,.75)','center',2);
    txt('FABRICANT DE CIGARETTES',0,-h/2+135,'700 24px Mono','rgba(27,28,26,.55)','center',4);
    typed(t,c.t0+.2,1e9,'"Doubt is our product…"',0,-h/2+240,'700 40px Mono','rgba(27,28,26,.85)',.9,1);
    if(t>=N(50)){const q=eo(lin(t,N(50),N(50)+.15));ctx.save();ctx.translate(0,-h/2+420);ctx.scale(1.4-.4*q,1.4-.4*q);txt('« LE DOUTE EST',0,0,'100px Anton',INKD,'center',2,q);txt('NOTRE PRODUIT. »',0,115,'100px Anton',PINK,'center',2,q);ctx.restore();}
    if(t>=N(51))txt('PAS BESOIN DE PROUVER QUE LA CIGARETTE EST SAINE.',0,-h/2+700,'700 26px Mono',INKD,'center',1,lin(t,N(51),N(51)+.2));
    if(t>=N(52))band(-h/2+800,t,N(52),'IL SUFFIT QUE TU DOUTES',60);
    stampAt('CONFIDENTIEL',-w/2+230,h/2-150,52,t,c.t0+.4,-.18);darkTxt('Source : archives de l’industrie du tabac (UCSF)',0,w,h);return 1;}
  if(c.k==='peuple'){framePaper(w,h,'rgba(30,32,30,.95)');txt('UN PEUPLE QUI',0,-h/2+190,'100px Anton',INK,'center',2,lin(t,c.t0,c.t0+.2));txt('NE CROIT PLUS RIEN…',0,-h/2+320,'100px Anton',INK,'center',2,lin(t,c.t0+.4,c.t0+.6));
    if(t>=N(58)){const q=eo(lin(t,N(58),N(58)+.15));ctx.save();ctx.translate(0,-h/2+540);ctx.scale(1.5-.5*q,1.5-.5*q);txt('NE BOUGE PLUS.',0,0,'130px Anton',PINK,'center',3,q,14);ctx.restore();}return 1;}
  if(c.k==='clair'){framePaper(w,h,PAPERC);txt('SOYONS CLAIRS',0,-h/2+130,'100px Anton',INKD,'center',3);
    if(t>=N(60)){['ON NE DIT PAS QUE QUELQU’UN','COCHE CETTE LISTE.'].forEach((s,i)=>txt(s,0,-h/2+250+i*62,'54px Anton',INKD,'center',1,lin(t,N(60),N(60)+.2)));}
    stampAt('AUCUNE PREUVE',0,-h/2+470,110,t,N(61),-.06);
    if(t>=N(62))['UNE VRAIE CRISE CRÉE AUSSI,','TOUTE SEULE,','DE LA PEUR ET DES RUMEURS.'].forEach((s,i)=>txt(s,0,-h/2+640+i*52,'700 34px Mono',INKD,'center',1,lin(t,N(62)+i*.3,N(62)+i*.3+.2)));return 1;}
  if(c.k==='pouvoirs'){framePaper(w,h,'rgba(30,32,30,.95)');txt('LA BOÎTE À OUTILS',0,-h/2+120,'90px Anton',INK,'center',3);txt('TOUS LES POUVOIRS S’EN SERVENT',0,-h/2+185,'700 30px Mono',AMB,'center',3);
    [['MOSCOU',-210,-h/2+340,-.1],['PÉKIN',210,-h/2+380,.08],['WASHINGTON',0,-h/2+520,-.05]].forEach(([s,x,y,r],i)=>stampAt(s,x,y,84,t,c.t0+i*.22,r,INK));
    stampAt('PARIS',0,-h/2+720,150,t,c.t0+.8,-.07);
    if(t>=N(66)){const q=eo(lin(t,N(66),N(66)+.3));ctx.save();ctx.globalAlpha*=q;ctx.fillStyle='rgba(10,10,10,.75)';ctx.fillRect(-w/2+50,h/2-250,w-100,170);
      txt('FACEBOOK · DÉCEMBRE 2020',0,h/2-195,'700 30px Mono',AMB,'center',3);txt('FAUX COMPTES LIÉS À L’ARMÉE FRANÇAISE',0,h/2-140,'44px Anton',INK,'center',1);txt('(MALI, CENTRAFRIQUE)',0,h/2-100,'700 22px Mono','rgba(236,238,230,.7)','center',2);ctx.restore();}
    srcLine('Source : rapport Meta / Facebook, déc. 2020',w,h);return 1;}
  if(c.k==='compte'){framePaper(w,h,'rgba(40,43,40,.92)');txt('ALORS…',0,-h/2+120,'700 44px Mono',AMB,'center',8);
    if(t>=N(68)){txt('TU EN AS COMPTÉ',0,-h/2+260,'96px Anton',INK,'center',2,lin(t,N(68),N(68)+.2));txt('COMBIEN ?',0,-h/2+380,'110px Anton',PINK,'center',2,lin(t,N(68)+.3,N(68)+.5),14);
      txt('… / 8',0,-h/2+600,'170px Anton','rgba(236,238,230,.85)','center',4,lin(t,N(68)+.5,N(68)+.8),20);txt('DIS-LE EN COMMENTAIRE ↓',0,h/2-70,'700 40px Mono',AMB,'center',3,lin(t,N(68)+.7,N(68)+1));}return 1;}
  if(c.k==='asch'){framePaper(w,h,PAPERC);txt('SOLOMON ASCH · ANNÉES 1950',0,-h/2+90,'700 30px Mono','rgba(27,28,26,.7)','center',4);
    txt('QUELLE LIGNE EST LA PLUS LONGUE ?',0,-h/2+150,'50px Anton',INKD,'center',1,lin(t,c.t0+.3,c.t0+.5));
    // les lignes : référence + A, B, C (la bonne : C)
    const ly=-h/2+470;ctx.fillStyle=INKD;ctx.fillRect(-340,ly-240,14,240);txt('RÉF.',-333,ly+50,'700 26px Mono',INKD,'center',2);
    [['A',-60,170],['B',110,300],['C',280,240]].forEach(([s,x,l])=>{ctx.fillStyle=INKD;ctx.fillRect(x-7,ly-l,14,l);txt(s,x,ly+50,'700 34px Mono',INKD,'center',2);});
    // les étudiants : 7 complices + le cobaye
    const py=-h/2+760;const truth=N(73),all=N(74);
    const RED2='#c9302c',GRN='#2f6b2a',T1=N(71),T2=N(72),T3=N(73),T4=N(74);
    for(let i=0;i<8;i++){const x=-w/2+110+i*105;const cob=i===6;let col='rgba(27,28,26,.55)',ans='',pop=0;
      const flip=(ta)=>{if(t>=ta)pop=Math.max(pop,1-lin(t,ta,ta+.35));return t>=ta;};
      if(!cob){if(flip(T1+i*.06)){col=RED2;ans='B';}
        const tg=i===2?T3:T4+Math.abs(i-2)*.18;if(flip(tg)){col=GRN;ans='C';}}
      else{col=GRN;ans='?';if(flip(T2)){col=RED2;ans='B';}if(flip(T3+.8)){col=GRN;ans='C';}}
      ctx.save();ctx.translate(x,py+60);ctx.scale(1+pop*.25,1+pop*.25);person(0,0,.62,col);ctx.restore();
      if(ans)txt(ans,x,py-60,'700 34px Mono',col,'center',1);if(cob)txt('LE COBAYE',x,py+120,'700 20px Mono',col,'center',1);}
    if(t>=T1&&t<T2)txt('7 COMPLICES DONNENT LA MAUVAISE RÉPONSE',0,-h/2+940,'700 28px Mono',RED2,'center',1);
    if(t>=T2&&t<T3)band(-h/2+1030,t,T2,'1 FOIS SUR 3, IL SUIT LE GROUPE',52,'rgba(201,48,44,.92)');
    if(t>=T3)band(-h/2+1030,t,T3,'UN SEUL DIT LA VÉRITÉ…',56,'rgba(47,107,42,.92)');
    if(t>=T4)txt('… ET LA VÉRITÉ SE PROPAGE',0,-h/2+940,'700 30px Mono',GRN,'center',1,lin(t,T4,T4+.3));
    darkTxt('Asch, « Opinions and Social Pressure », Scientific American, 1955',0,w,h);return 1;}
  if(c.k==='toi'){framePaper(w,h,'rgba(30,32,30,.95)');txt('CETTE PERSONNE,',0,-h/2+200,'96px Anton',INK,'center',2,lin(t,c.t0,c.t0+.2));
    if(t>=N(76)){const q=eo(lin(t,N(76),N(76)+.15));ctx.save();ctx.translate(0,-h/2+430);ctx.scale(1.6-.6*q,1.6-.6*q);txt('C’EST TOI.',0,0,'170px Anton',PINK,'center',3,q,22);ctx.restore();}return 1;}
  if(c.k==='outro'){framePaper(w,h);txt('ON TE',0,-250,'120px Anton',INK,'center',4,1,24);txt('MANIPULE ?',0,-110,'140px Anton',PINK,'center',4,1,24);txt('PARTIE 2 / 2 · LA FERME · LE DOSSIER',0,-30,'700 28px Mono','rgba(236,238,230,.6)','center',4);
    txt('ABONNE-TOI',0,170,'80px Anton',INK,'center',4,1,16);txt('ILS PARLENT…',0,260,'700 36px Mono',AMB,'center',3);txt('NOUS ON VÉRIFIE.',0,312,'700 36px Mono',AMB,'center',3);return 1;}
  return 0;}
function drawCard(c,t){
  ctx.save();ctx.translate(c.x,c.y);ctx.rotate(c.rot*Math.PI/180);
  const w=c.w,h=c.h;
  if(c.k==='cover'){drawHook3(w,h,t);}
  else if(cardExtra(c,t,w,h)){}
  else if(c.k==='title'){framePaper(w,h);const big=120;c.lines.forEach((l,i)=>txt(l,0,-((c.lines.length-1)*big*.55)+i*big*1.1+big*.35,big+'px Anton',c.red&&i==1?PINK:INK,'center',2,lin(t,c.t0+i*.35,c.t0+i*.35+.15),c.red&&i==1?0:0));}
  else if(c.k==='proof'){framePaper(w,h,'rgba(30,32,30,.95)');txt(c.lab||'PREUVE',0,-h/2+120,'700 44px Mono','rgba(236,238,230,.75)','center',14);
    const q=eo(lin(t,c.t0,c.t0+.18));ctx.save();ctx.translate(0,-h/2+440);ctx.scale(1.6-.6*q,1.6-.6*q);txt(String(c.n),0,0,'330px Anton',PINK,'center',2,q,24);ctx.restore();
    txt(c.l,0,-h/2+620,'96px Anton',INK,'center',3,lin(t,c.t0+.3,c.t0+.5),12);}
  else if(c.k==='outro'){framePaper(w,h);txt('QUI',0,-230,'130px Anton',INK,'center',4,1,24);txt('COMMANDE ?',0,-60,'140px Anton',PINK,'center',4,1,24);txt('LA FERME · LE DOSSIER',0,30,'700 30px Mono','rgba(236,238,230,.6)','center',6);
    txt('ABONNE-TOI',0,210,'70px Anton',INK,'center',4,1,16);txt('ILS PARLENT À TA PLACE.',0,290,'700 32px Mono',AMB,'center',3);txt('NOUS, ON VÉRIFIE.',0,340,'700 32px Mono',AMB,'center',3);}
  else if(c.k==='clip'&&c.img&&!IM[c.img]){framePaper(w,h,'rgba(30,32,30,.95)');person(0,-h/2+640,2.2,'rgba(236,238,230,.18)');if(c.after){ctx.save();c.after(w,h,t);ctx.restore();}if(c.badge)band(h/2-60,t,c.t0,c.badge,44,'rgba(10,10,10,.85)',INK);}
  else if(c.k==='clip'){framePaper(w,h,'rgba(230,232,224,.88)');const fr=c.img?[IM[c.img]]:((window.CLIPS&&CLIPS[c.clip])||[]);
    const fi=c.sync!=null?Math.floor((t-c.sync)*30):Math.floor((t-c.t0+.3)*30);const im=fr[Math.min(fr.length-1,Math.max(0,fi))];const pw=w-50,ph=h-170;
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
  if(c.k==='tour')postit(w,h);
  if(c.hl!=null&&t>=c.hl&&t<WT1+1){const a=(1-lin(t,WT1,WT1+1))*eo(lin(t,c.hl,c.hl+.2))*(.7+.3*Math.sin((t-c.hl)*9));ctx.save();ctx.strokeStyle=`rgba(255,58,46,${a})`;ctx.lineWidth=40;ctx.shadowColor='rgba(255,40,30,.95)';ctx.shadowBlur=70;ctx.strokeRect(-w/2-34,-h/2-34,w+68,h+68);ctx.restore();}
  ctx.restore();
}
function outroCredits(t){const c=C[cOutro];ctx.save();ctx.translate(c.x,c.y+c.h/2+110);[
  'Sources : G. M. Gilbert, Nuremberg Diary (1947) · King, Pan & Roberts, APSR (2017) · Orwell (1946) · Bernays, Propaganda (1928)',
  'Brown & Williamson (1969) · Asch (1955) · Meta (2020) · Journal officiel · AFP · CheckNews · BFMTV',
  'Images : AFP (droit de citation) · J. Jaramillo (CC BY-SA) · Commission européenne (CC BY 4.0) · BNUJ, Bain News Service (domaine public)',
  'Musique : « Hitman », K. MacLeod · CC BY 4.0'].forEach((s,i)=>txt(s,0,i*36,'400 15px Mono','rgba(236,238,230,.75)','center'));ctx.restore();}
// ---------- sous-titres courts (3 mots max)
const CHUNKS=[];SEGS.forEach(s=>{const ws=s.txt.split(' ');const tot=ws.reduce((a,w)=>a+w.length+1,0);let acc=0;const dur=s.t1-s.t0;const wt=ws.map(w=>{const tt=s.t0+dur*acc/tot;acc+=w.length+1;return[w,tt];});
  for(let i=0;i<wt.length;){let n=Math.min(3,wt.length-i);if(n==3&&wt[i+1][0].length+wt[i][0].length+wt[i+2][0].length>18)n=2;CHUNKS.push({m:s.m,txt:wt.slice(i,i+n).map(x=>x[0]).join(' ').toUpperCase(),t:wt[i][1]});i+=n;}});
CHUNKS.forEach((c,i)=>{c.e=i<CHUNKS.length-1?Math.min(CHUNKS[i+1].t,c.t+1.6):c.t+1.2;});
function subs2(t){const c=CHUNKS.find(c=>t>=c.t-.03&&t<c.e);if(!c)return;const p=eo(lin(t,c.t-.03,c.t+.08));
  ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.translate(540,1330);ctx.scale(.9+.1*p,.9+.1*p);ctx.globalAlpha=p;ctx.font='76px Anton';ctx.textAlign='center';ctx.letterSpacing='1px';
  const w=ctx.measureText(c.txt).width;ctx.fillStyle='rgba(90,96,90,.45)';ctx.fillRect(-w/2-26,-74,w+52,96);ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=2;ctx.strokeRect(-w/2-26,-74,w+52,96);ctx.shadowColor='rgba(255,255,255,.5)';ctx.shadowBlur=14;ctx.fillStyle=c.m?'#FFC24A':'#f4f1e6';ctx.fillText(c.txt,0,0);ctx.restore();}


// ---------- compteur de techniques (fixe, hors caméra)
const CNT=[[0,4],[N(11),5],[N(25),6],[N(35),7],[N(47),8]];
function hud(t){if(t<TCOV||t>=N(75))return;let v=4,t0=0;CNT.forEach(([a,n])=>{if(t>=a){v=n;t0=a;}});const p=eo(lin(t,t0,t0+.25));const pk=t0>0?(1-lin(t,t0,t0+.6)):0;
  ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.translate(890,205);ctx.scale(.8,.8);ctx.scale(1+pk*.35,1+pk*.35);ctx.globalAlpha=lin(t,TCOV,TCOV+.3);
  ctx.fillStyle='rgba(10,12,11,.78)';ctx.fillRect(-105,-70,210,150);ctx.strokeStyle=pk>0?'rgba(255,58,46,.95)':'rgba(236,238,230,.5)';ctx.lineWidth=3;ctx.strokeRect(-105,-70,210,150);
  txt('TECHNIQUE',0,-36,'700 20px Mono','rgba(236,238,230,.75)','center',4);txt(v+'/8',0,52,'86px Anton',v===8?RED:INK,'center',2,1,pk>0?18:0);ctx.restore();}

// ---------- sons
ev(0,'boom');ev(MARK.tt,'thud');ev(N(3),'tick');ev(N(4),'tick');ev(TCOV-.1,'whoosh');
KEYS.forEach(k=>{if(k.t>TCOV+.1)ev(k.t-.5,'whoosh');});
C.forEach((c,i)=>{if(i>0)ev(c.t0-.05,'click');});
[5,6,7,8].forEach(k=>ev(N(k),'tick'));ev(N(9),'thud');
[N(11),N(25),N(35)].forEach(x=>reveal(x,1.1));reveal(N(47),1.4);
for(let k=0;k<12;k++)ev(N(14)+k*.1,'tick');reveal(N(16),1);
[18,19,20].forEach(k=>ev(N(k)+.35,'thud'));ev(N(21),'tick');ev(N(24),'thud');
reveal(N(28),.9);[30,31,32].forEach(k=>tileSounds('ABCDEFGH',N(k),.05));ev(N(33),'thud');ev(N(34),'zap');
reveal(N(38),.9);ev(N(39),'thud');[40,41,42].forEach(k=>ev(N(k),'tick'));ev(N(44),'thud');ev(N(46),'tick');
ev(N(50),'boom');ev(N(52),'thud');ev(N(53),'tick');ev(N(54),'thud');reveal(N(56),1.1);reveal(N(58),1.2);
ev(N(59),'tick');ev(N(61),'thud');
ev(WT0-.9,'riser');reveal(N(63),1);XT.forEach(([a,b,t0])=>ev(t0,'zap'));
[0,.22,.44].forEach(d=>ev(C[cPouv].t0+d,'thud'));reveal(C[cPouv].t0+.8,1.2);ev(N(66),'tick');
ev(N(68),'tick');ev(N(71),'tick');ev(N(72),'thud');reveal(N(73),1);ev(N(73)+.8,'zap');for(let k=0;k<6;k++)ev(N(74)+k*.18,'tick');reveal(N(76),1.3);ev(VEND+.35,'boom');
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
  if(t>=TCOV&&t<VEND)subs2(t);hud(t);
  post2(t);flash(t);
};
