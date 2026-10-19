// ================= LE DOSSIER « LE PLAN · JOUR 1 » (19/10/2026) — mur d’enquêteur
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
const cCover=add({k:'cover',w:1080,h:1920,rot:0,t0:0});
const cElysee=add({k:'elysee',w:940,h:820,rot:2,t0:N(1)});
const cJour=add({k:'jour',w:940,h:820,rot:-1.5,t0:N(6)});
const cS1=add({k:'step',n:1,l1:'L’ENNEMI',w:900,h:860,rot:1.5,t0:N(8),
  extra:(w,h,t)=>{if(t>=N(9))txt('LECORNU → LFI',0,h/2-230,'56px Anton',INK,'center',2,lin(t,N(9),N(9)+.2));if(t>=N(10))txt('RN → GOUVERNEMENT',0,h/2-160,'56px Anton',INK,'center',2,lin(t,N(10),N(10)+.2));
    stampAt('PERSONNE N’ACCUSE LES PRIX',0,h/2-70,42,t,N(11)+.3,-.05);}});
const cS2=add({k:'step',n:2,l1:'INTERDIRE',w:900,h:820,rot:-2,t0:N(13)});
const cMars=add({k:'clip',full:1,img:'marseille',handle:'Remontees · CC BY-SA 4.0',badge:'MARSEILLE · LUNDI 19 OCT.',badgeRed:1,w:960,h:860,rot:1.5,t0:N(15),
  after:(w,h,t)=>{if(t>=N(16)+.4){const p=eo(lin(t,N(16)+.4,N(16)+.7));ctx.save();ctx.globalAlpha=p;ctx.fillStyle='rgba(10,10,10,.82)';ctx.fillRect(-390,-h/2+70,780,170);
      txt('RASSEMBLEMENTS INTERDITS',0,-h/2+140,'60px Anton',INK,'center',2);txt('TOUTE LA VILLE · 12 H – 20 H',0,-h/2+205,'700 34px Mono',AMB,'center',3);ctx.restore();}
    if(t>=N(18))stampAt('-24 H APRÈS L’ALLOCUTION',0,110,52,t,N(18)+.3,-.07);}});
const cLaw=add({k:'law',w:920,h:880,rot:-1.5,t0:N(19)});
const cS3=add({k:'step',n:3,l1:'PUNIR',w:900,h:860,rot:2,t0:N(25),
  extra:(w,h,t)=>{if(t>=N(27))txt('COMPARUTIONS IMMÉDIATES',0,h/2-210,'52px Anton',INK,'center',2,lin(t,N(27),N(27)+.2));
    [['PARIS',N(28)],['NICE',N(29)],['TOURS',N(30)],['ST-ÉTIENNE',N(31)]].forEach(([s,t0],i)=>{if(t>=t0)txt(s,(i-1.5)*210,h/2-110,'44px Anton',PINK,'center',1,lin(t,t0,t0+.15));});}});
const cS4=add({k:'step',n:4,l1:'TON PORTE-',l2:'MONNAIE',w:900,h:860,rot:-1.5,t0:N(32)});
const cMac=add({k:'clip',full:1,clip:'mac',sync:MARK.mac[0],handle:'TF1 INFO · 18 OCT. 2026',badge:'« DÈS DEMAIN MATIN »',badgeRed:1,w:960,h:900,rot:1.5,t0:MARK.mac[0]-.25});
const cKw=add({k:'clip',full:1,clip:'kw',sync:N(35),handle:'Associated Press',badge:'KOWEÏT · LUNDI 19 OCT. 2026',w:960,h:720,rot:-2,t0:N(35)-.1,
  after:(w,h,t)=>{stampAt('PROMESSE TENUE',0,-120,60,t,N(35)+.1,-.08,GREEN);if(t>=N(37))stampAt('TAPIS ROUGE',0,60,70,t,N(37),-.06);}});
const cAcc=add({k:'accords',w:940,h:980,rot:1.5,t0:N(38)});
const cPump=add({k:'pump',w:940,h:860,rot:-2,t0:N(46)});
const cExp=add({k:'expert',w:920,h:620,rot:2,t0:N(49)});
const cCpt=add({k:'compteur',w:960,h:1000,rot:-1.5,t0:N(50)});
const cJ2=add({k:'title',lines:['JOUR 2,','DEMAIN.'],red:1,w:880,h:520,rot:2,t0:N(59)});
const cQ=add({k:'q',w:940,h:640,rot:-1.5,t0:N(61)});
const cOutro=add({k:'outro',full:1,w:900,h:900,rot:-1.5,t0:VEND+.5});
// placement en serpentin + désordre
{const COLS=4,DX=1250,DY=1250;const r=rng(99);C.forEach((c,i)=>{if(i===0){c.x=-1300;c.y=0;return;}const j=i+1;const row=Math.floor(j/COLS),col=j%COLS;const cc=row%2?COLS-1-col:col;
  c.x=cc*DX+(r()-.5)*220;c.y=row*DY+(r()-.5)*220;c.rot*=1.9;});}

// ---------- trajectoire caméra
function fitZoom(c){return Math.min(880/c.w,900/c.h);}
const KEYS=[];C.forEach((c,i)=>{if(i===cCover)KEYS.push({t:0,x:c.x,y:c.y-160/1.04,z:1.04,rot:-c.rot*Math.PI/180});else if(c.full){const pw=c.k==='clip'?c.w-50:c.w;const z=(c.k==='clip'?1100:880)/pw;const a=c.rot*Math.PI/180;const oy=c.k==='clip'?-85:0;KEYS.push({t:c.t0,x:c.x-Math.sin(a)*oy,y:c.y+Math.cos(a)*oy-160/z,z,rot:-a});}
  else KEYS.push({t:c.t0,x:c.x,y:c.y,z:fitZoom(c),rot:-c.rot*Math.PI/180*.6});});
const WIDE=(t,cs)=>{let mnx=1e9,mxx=-1e9,mny=1e9,mxy=-1e9;cs.forEach(i=>{const c=C[i];mnx=Math.min(mnx,c.x-c.w/2);mxx=Math.max(mxx,c.x+c.w/2);mny=Math.min(mny,c.y-c.h/2);mxy=Math.max(mxy,c.y+c.h/2);});
  return{t,x:(mnx+mxx)/2,y:(mny+mxy)/2,z:Math.min(1000/(mxx-mnx),1500/(mxy-mny)),rot:0};};

KEYS.push(WIDE(N(50)-.6,[...C.keys()].filter(i=>i!==cOutro&&i!==cCover)));
KEYS.sort((a,b)=>a.t-b.t);
const WP=[];
(function(){
  const K=KEYS;
  for(let i=0;i<K.length;i++){
    const a=K[i],b=K[i+1],p=K[i-1];
    if(i===0){WP.push({t:0,x:a.x,y:a.y,z:a.z,r:a.rot});WP.push({t:TCOV-.05,x:a.x,y:a.y+10,z:a.z*1.01,r:a.rot});continue;}
    const gap=b?b.t-a.t:2.5;
    const dx=b?b.x-a.x:a.x-p.x,dy=b?b.y-a.y:a.y-p.y,dl=Math.hypot(dx,dy)||1;const ux=dx/dl,uy=dy/dl;
    const dwell=Math.max(.35,Math.min(gap-.55,gap*.72));
    WP.push({t:a.t-.05,x:a.x-ux*40,y:a.y-uy*40,z:a.z,r:a.rot});
    WP.push({t:a.t+dwell,x:a.x+ux*55,y:a.y+uy*55,z:a.z*1.06,r:a.rot});
    if(b){const mx=(a.x+b.x)/2,my=(a.y+b.y)/2+Math.hypot(b.x-a.x,b.y-a.y)*.08;
      const tm=(a.t+dwell+b.t-.05)/2;const zm=Math.min(a.z,b.z)*.72;
      if(b.t-.05-(a.t+dwell)>.25)WP.push({t:tm,x:mx,y:my,z:zm,r:(a.rot+b.rot)/2});}
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
  const bank=cl(-vx*.0016,-.09,.09);
  return{x:s.x+Math.sin(t*1.7)*4,y:s.y+Math.cos(t*1.3)*4,z:s.z,rot:s.r+bank,speed:sp,dir:Math.atan2(vy,vx),moving:sp>6};
}
let CS={x:0,y:0,z:1,rot:0};
function toWorld(){const k=1+punch(TNOW)*.06;ctx.setTransform(1,0,0,1,0,0);ctx.translate(540,800);ctx.rotate(CS.rot);ctx.scale(CS.z*k,CS.z*k);ctx.translate(-CS.x,-CS.y);}
let TNOW=0;

// ---------- mur + fouillis
const SCRAPS=[];{const r=rng(21);for(let i=0;i<80;i++)SCRAPS.push({x:-1500+r()*6500,y:-1500+r()*13000,w:200+r()*380,h:150+r()*320,rot:(r()-.5)*.3,a:.08+r()*.12,lines:Math.floor(r()*6)});}
const CLUT=[];{const r=rng(55);const ims=['elysee','an2','marseille','elysee'];for(let i=0;i<90;i++){const k=r();CLUT.push({x:-1300+r()*6200,y:-1300+r()*12500,rot:(r()-.5)*.5,kind:k<.45?'post':k<.75?'photo':'clip',im:ims[Math.floor(r()*4)],w:k<.45?220:260,h:k<.45?220:190,lines:2+Math.floor(r()*4),col:r()});}}
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
  ctx.save();ctx.strokeStyle='rgba(185,30,28,.9)';ctx.lineWidth=5;ctx.shadowColor='rgba(0,0,0,.4)';ctx.shadowBlur=6;ctx.shadowOffsetY=4;
  const ORD=[...C.keys()].filter(i=>C[i].k!=='outro').sort((u,v)=>C[u].t0-C[v].t0);for(let j=1;j<ORD.length;j++){const a=C[ORD[j-1]],b=C[ORD[j]];
    const [x1,y1]=pinPos(a),[x2,y2]=pinPos(b);const mx=(x1+x2)/2,my=(y1+y2)/2+Math.hypot(x2-x1,y2-y1)*.08;
    ctx.beginPath();ctx.moveTo(x1,y1);const N=24;for(let k=1;k<=N;k++){const u=k/N;const x=(1-u)*(1-u)*x1+2*u*(1-u)*mx+u*u*x2,y=(1-u)*(1-u)*y1+2*u*(1-u)*my+u*u*y2;ctx.lineTo(x,y);}ctx.stroke();}
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

// ---------- sous-titres courts (3 mots max)
const CHUNKS=[];SEGS.forEach(s=>{const ws=s.txt.split(' ');const tot=ws.reduce((a,w)=>a+w.length+1,0);let acc=0;const dur=s.t1-s.t0;const wt=ws.map(w=>{const tt=s.t0+dur*acc/tot;acc+=w.length+1;return[w,tt];});
  for(let i=0;i<wt.length;){let n=Math.min(3,wt.length-i);if(n==3&&wt[i+1][0].length+wt[i][0].length+wt[i+2][0].length>18)n=2;CHUNKS.push({m:s.m,txt:wt.slice(i,i+n).map(x=>x[0]).join(' ').toUpperCase(),t:wt[i][1]});i+=n;}});
CHUNKS.forEach((c,i)=>{c.e=i<CHUNKS.length-1?Math.min(CHUNKS[i+1].t,c.t+1.6):c.t+1.2;});
function subs2(t){const c=CHUNKS.find(c=>t>=c.t-.03&&t<c.e);if(!c)return;const p=eo(lin(t,c.t-.03,c.t+.08));
  ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.translate(540,1330);ctx.scale(.9+.1*p,.9+.1*p);ctx.globalAlpha=p;ctx.font='76px Anton';ctx.textAlign='center';ctx.letterSpacing='1px';
  const w=ctx.measureText(c.txt).width;ctx.fillStyle='rgba(90,96,90,.45)';ctx.fillRect(-w/2-26,-74,w+52,96);ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=2;ctx.strokeRect(-w/2-26,-74,w+52,96);ctx.shadowColor='rgba(255,255,255,.5)';ctx.shadowBlur=14;ctx.fillStyle=c.m?'#FFC24A':'#f4f1e6';ctx.fillText(c.txt,0,0);ctx.restore();}

// ---------- sons
reveal(MARK.frz,1.3);ev(MARK.frz+.4,'thud');ev(TCOV-.1,'whoosh');
KEYS.forEach(k=>{if(k.t>TCOV+.1)ev(k.t-.5,'whoosh');});
C.forEach((c,i)=>{if(i>0)ev(c.t0-.05,'click');});
ev(C[cElysee].t0+.2,'thud');reveal(N(4),1);[0,1,2,3].forEach(i=>ev(N(6)+.4+i*.15,'type'));ev(N(7),'thud');
[N(8),N(13),N(25),N(32)].forEach((x,i)=>reveal(x,i===3?1.3:1));ev(N(11)+.3,'thud');ev(N(16)+.4,'thud');ev(N(18)+.3,'thud');
ev(N(21)+.3,'tick');ev(N(23),'thud');[N(28),N(29),N(30),N(31)].forEach(x=>ev(x,'tick'));
ev(N(35)+.1,'thud');ev(N(37),'thud');[N(39),N(40),N(41)].forEach(x=>ev(x,'tick'));reveal(N(43),1.1);ev(N(47),'tick');ev(N(48),'thud');reveal(C[cExp].t0+1.2,1.2);
ev(N(50)-.6,'riser');ev(N(53),'thud');ev(N(56),'thud');reveal(N(58),1.3);ev(VEND+.35,'boom');

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
