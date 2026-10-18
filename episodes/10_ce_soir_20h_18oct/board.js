// ================= LE DOSSIER « CE SOIR, 20 H. » (17/10/2026) — mur d'enquêteur =================
const T=Object.fromEntries(SEGS.map((s,i)=>[i,s.t0]));
const TE=Object.fromEntries(SEGS.map((s,i)=>[i,s.t1]));
const GREEN='#A9C79A',INKD='#1b1c1a',PINK='#c9302c',PAPERC='rgba(222,219,206,.95)';
const TCOV=3.4;

// ---------- texture du mur
const WALL=(()=>{const c=document.createElement('canvas');c.width=c.height=512;const g=c.getContext('2d');const r=rng(11);
  g.fillStyle='#3a3f3b';g.fillRect(0,0,512,512);
  const im=g.getImageData(0,0,512,512);for(let i=0;i<im.data.length;i+=4){const n=(r()-.5)*26;im.data[i]+=n;im.data[i+1]+=n;im.data[i+2]+=n;}g.putImageData(im,0,0);
  for(let k=0;k<900;k++){g.fillStyle=`rgba(${r()<.5?40:200},${r()<.5?44:205},${r()<.5?40:195},${.05+r()*.08})`;g.beginPath();g.ellipse(r()*512,r()*512,1+r()*4,1+r()*2,r()*6,0,6.283);g.fill();}
  return c;})();
let WALLPAT=null;

// ---------- les cartes (ordre chronologique ; placement automatique en serpentin)
const C=[];const add=o=>{C.push(Object.assign({rot:0},o));return C.length-1;};
const cCover=add({k:'cover',w:1080,h:1920,rot:-1,t0:0});
const cElysee=add({k:'clip',full:1,img:'elysee',handle:'Élysée · Licence Ouverte',badge:'CE SOIR · 20 H',badgeRed:1,w:960,h:820,rot:2,t0:T[1]});
const cFeu=add({k:'clip',full:1,clip:'afp',handle:'AFP',badge:'LIMOGES · 17 OCT. 2026',badgeRed:1,w:620,h:1100,rot:-2,t0:T[3]});
const c550=add({k:'cnt',to:550000,label:'MANIFESTANTS',sub:'CONTRE LA VIE CHÈRE · 17 OCT.',src:'ministère de l’Intérieur',w:900,h:600,rot:1.5,t0:T[4]});
const cCamp=add({k:'clip',full:1,clip:'camp',handle:'@M6Info',badge:'LE CAMPANILE S’EFFONDRE',badgeRed:1,w:620,h:1100,rot:2,t0:T[5]+.1});
const cBilan=add({k:'bilan',w:900,h:760,rot:-1.5,t0:T[7]});
const cQ=add({k:'title',lines:['IL PEUT DIRE','QUOI ?'],red:1,w:880,h:560,rot:2,t0:T[10]});
const cScale=add({k:'scale',w:960,h:620,rot:-1.5,t0:T[11]});
const cO1=add({k:'opt',n:1,title:'LA FERMETÉ',prob:4,w:940,h:900,rot:1.5,t0:T[14]});
const cO2=add({k:'opt',n:2,title:'UN GESTE POUR',title2:'TON PORTE-MONNAIE',prob:3,w:940,h:900,rot:-2,t0:T[20]});
const cO3=add({k:'opt',n:3,title:'LA DISSOLUTION',prob:2,w:940,h:900,rot:2,t0:T[26]});
const cAN=add({k:'clip',full:1,img:'an2',gray:1,handle:'PanierAvide · CC BY-SA 4.0',badge:'ASSEMBLÉE NATIONALE',w:620,h:1100,rot:-1.5,t0:T[28]});
const cArt12=add({k:'law',art:'12',l1:'Le Président peut prononcer',l2:'la dissolution de l’Assemblée.',l3:'Élections : 20 à 40 jours après.',l4:'Déjà fait : 9 juin 2024.',w:880,h:760,rot:2,t0:T[30]});
const cO4=add({k:'opt',n:4,title:'LA DÉMISSION',prob:1,w:940,h:900,rot:-2,t0:T[32]});
const cSenat=add({k:'clip',full:1,img:'senat',gray:1,handle:'Tangopaso · dom. public',badge:'PRÉSIDENT DU SÉNAT = INTÉRIM',w:900,h:820,rot:1.5,t0:T[35]});
const cArt7=add({k:'law',art:'7',l1:'En cas de vacance, intérim par',l2:'le président du Sénat.',l3:'Présidentielle : 20 à 35 jours.',l4:'',w:880,h:760,rot:-2,t0:T[37]});
const cRumeur=add({k:'rumeur',w:900,h:700,rot:2,t0:T[38]+.2});
const cBudget=add({k:'budget',w:900,h:900,rot:-1.5,t0:T[44]});
const cNon=add({k:'non',w:900,h:640,rot:2,t0:T[47]});
const cSenat2=add({k:'clip',full:1,img:'vote',gray:1,handle:'Baidax · CC BY-SA 4.0',badge:'PROCHAINE ÉTAPE : LE SÉNAT',badgeRed:1,w:620,h:1100,rot:-2,t0:T[50]});
const cFeu2=add({k:'clip',full:1,clip:'afp2',handle:'AFP',badge:'LIMOGES · 17 OCT. 2026',w:620,h:1100,rot:1.5,t0:T[53]});
const cFin=add({k:'fin',w:960,h:720,rot:-1.5,t0:T[56]});
const cVote=add({k:'vote',w:960,h:760,rot:2,t0:T[60]});
const cOutro=add({k:'outro',full:1,w:900,h:900,rot:-1.5,t0:VEND+.5});
// placement en serpentin + désordre
{const COLS=4,DX=1250,DY=1250;const r=rng(99);C.forEach((c,i)=>{if(i===0){c.x=-1300;c.y=0;return;}const j=i+1;const row=Math.floor(j/COLS),col=j%COLS;const cc=row%2?COLS-1-col:col;
  c.x=cc*DX+(r()-.5)*220;c.y=row*DY+(r()-.5)*220;c.rot*=1.9;});}

// ---------- trajectoire caméra
function fitZoom(c){return Math.min(880/c.w,900/c.h);}
const KEYS=[];C.forEach((c,i)=>{if(i===cCover)KEYS.push({t:0,x:c.x,y:c.y+160/1.04,z:1.04,rot:-c.rot*Math.PI/180});else if(c.full){const pw=c.k==='clip'?c.w-50:c.w;const z=(c.k==='clip'?1100:880)/pw;const a=c.rot*Math.PI/180;const oy=c.k==='clip'?-85:0;KEYS.push({t:c.t0,x:c.x-Math.sin(a)*oy,y:c.y+Math.cos(a)*oy-160/z,z,rot:-a});}
  else KEYS.push({t:c.t0,x:c.x,y:c.y,z:fitZoom(c),rot:-c.rot*Math.PI/180*.6});});
const WIDE=(t,cs)=>{let mnx=1e9,mxx=-1e9,mny=1e9,mxy=-1e9;cs.forEach(i=>{const c=C[i];mnx=Math.min(mnx,c.x-c.w/2);mxx=Math.max(mxx,c.x+c.w/2);mny=Math.min(mny,c.y-c.h/2);mxy=Math.max(mxy,c.y+c.h/2);});
  return{t,x:(mnx+mxx)/2,y:(mny+mxy)/2,z:Math.min(1000/(mxx-mnx),1500/(mxy-mny)),rot:0};};

KEYS.push(WIDE(T[43]+.25,[...C.keys()].filter(i=>i!==cOutro&&C[i].t0<T[44])));
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
const CLUT=[];{const r=rng(55);const ims=['elysee','limoges','an1','senat'];for(let i=0;i<90;i++){const k=r();CLUT.push({x:-1300+r()*6200,y:-1300+r()*12500,rot:(r()-.5)*.5,kind:k<.45?'post':k<.75?'photo':'clip',im:ims[Math.floor(r()*4)],w:k<.45?220:260,h:k<.45?220:190,lines:2+Math.floor(r()*4),col:r()});}}
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

function probDots(x,y,n,t,t0){for(let i=0;i<5;i++){const on=i<n&&t>=t0+i*.08;ctx.beginPath();ctx.arc(x+i*58,y,20,0,6.283);ctx.fillStyle=on?PINK:'rgba(236,238,230,.18)';ctx.fill();ctx.strokeStyle='rgba(255,255,255,.5)';ctx.lineWidth=2;ctx.stroke();}}
function drawCard(c,t){
  ctx.save();ctx.translate(c.x,c.y);ctx.rotate(c.rot*Math.PI/180);
  const w=c.w,h=c.h;
  if(c.k==='cover'){const fr=(window.CLIPS&&CLIPS.hook)||[];const fi=Math.min(fr.length-1,Math.max(0,Math.floor(t*30)));const im=fr[fi];const frz=t>=2.9;
    framePaper(w+40,h+40,'rgba(230,232,224,.9)');if(im){ctx.save();ctx.beginPath();ctx.rect(-w/2,-h/2,w,h);ctx.clip();ctx.filter='blur(30px) brightness(.55)';ctx.drawImage(im,-w/2-100,-h/2-100,w+200,h+200);const z=frz?1+.06*eo(lin(t,2.9,3.1)):1;ctx.scale(z,z);ctx.filter=frz?'grayscale(.6) contrast(1.25)':'none';ctx.drawImage(im,-w/2,-h/2+330,w,h);const gg=ctx.createLinearGradient(0,-h/2+300,0,-h/2+480);gg.addColorStop(0,'rgba(0,0,0,.6)');gg.addColorStop(1,'rgba(0,0,0,0)');ctx.filter='none';ctx.fillStyle=gg;ctx.fillRect(-w/2,-h/2+300,w,180);ctx.restore();}
    const g=ctx.createLinearGradient(0,-h/2,0,h/2);g.addColorStop(0,'rgba(0,0,0,.55)');g.addColorStop(.4,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.4)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,h);
    txt('ALLOCUTION DU 24 NOV. 2020 · ARCHIVE ÉLYSÉE',0,-h/2+300,'400 24px Mono','rgba(236,238,230,.8)','center',3);
    if(frz){const p=eo(lin(t,2.9,3.05));ctx.save();ctx.globalAlpha=p;ctx.fillStyle='rgba(0,0,0,.35)';ctx.fillRect(-w/2,-h/2,w,h);ctx.restore();
      txt('CE SOIR,',0,-h/2+1190,'170px Anton',INK,'center',6,p,24);txt('20 H.',0,-h/2+1420,'250px Anton',RED,'center',8,p,30);}}
  else if(c.k==='outro'){framePaper(w,h);txt('LE DOSSIER',0,-170,'120px Anton',INK,'center',4,1,24);txt('18.10',0,40,'200px Anton',PINK,'center',4,1,24);txt('LA FERME',0,140,'700 34px Mono','rgba(236,238,230,.6)','center',12);
    txt('ABONNE-TOI',0,260,'70px Anton',INK,'center',4,1,16);}
  else if(c.k==='clip'){framePaper(w,h,'rgba(230,232,224,.88)');const fr=c.img?[IM[c.img]]:((window.CLIPS&&CLIPS[c.clip])||[]);const im=fr[Math.min(fr.length-1,Math.max(0,Math.floor((t-c.t0+.3)*30)))];const pw=w-50,ph=h-170;
    ctx.fillStyle='#000';ctx.fillRect(-pw/2,-h/2+25,pw,ph);if(im){ctx.save();ctx.beginPath();ctx.rect(-pw/2,-h/2+25,pw,ph);ctx.clip();const age=Math.max(0,t-c.t0);const s=Math.max(pw/im.width,ph/im.height)*(1.04+age*.012);ctx.filter=c.gray?'grayscale(1) contrast(1.12)':'saturate(.75) contrast(1.08)';ctx.drawImage(im,-im.width*s/2,-h/2+25+ph/2-im.height*s/2,im.width*s,im.height*s);ctx.restore();}
    if(c.after){ctx.save();c.after(w,h,t);ctx.restore();}
    txt(c.handle,-w/2+30,h/2-85,'700 30px Mono','#1b1c1a','left',1);
    if(c.badge){const bc=c.badgeRed?PINK:'rgba(20,20,20,.85)';ctx.font='700 30px Mono';const bw=ctx.measureText(c.badge).width+36;ctx.fillStyle=bc;ctx.fillRect(-bw/2,h/2-58,bw,44);txt(c.badge,0,h/2-26,'700 30px Mono','#fff','center',2);}}
  else if(c.k==='title'){framePaper(w,h);const big=120;c.lines.forEach((l,i)=>txt(l,0,-((c.lines.length-1)*big*.55)+i*big*1.1+big*.35,big+'px Anton',c.red&&i==1?PINK:INK,'center',2));}
  else if(c.k==='cnt'){framePaper(w,h);const v=Math.round(c.to*eo(lin(t,c.t0+.15,c.t0+1.4)));txt(v.toLocaleString('fr-FR'),0,-30,'180px Anton',INK,'center',2,1,14);
    txt(c.label,0,60,'700 38px Mono',INK,'center',4);txt(c.sub,0,120,'700 28px Mono','rgba(236,238,230,.6)','center',4);srcLine('Source : '+c.src,w,h);}
  else if(c.k==='bilan'){framePaper(w,h);txt('LE BILAN',0,-h/2+100,'90px Anton',INK,'center',2);
    [['MAGASINS PILLÉS','PARTOUT',T[7]],[Math.round(2000*eo(lin(t,T[8],T[8]+1))).toLocaleString('fr-FR')+'+','INTERPELLATIONS',T[8]],[Math.round(600*eo(lin(t,T[9],T[9]+1)))+'+','FORCES DE L’ORDRE BLESSÉES',T[9]]].forEach(([a,b,t0],i)=>{if(t<t0)return;const y=-h/2+250+i*150;const q=eo(lin(t,t0,t0+.2));ctx.save();ctx.globalAlpha*=q;
      ctx.fillStyle='rgba(128,134,126,.28)';ctx.fillRect(-w/2+50,y-80,w-100,120);txt(a,-w/2+80,y+10,'78px Anton',i?PINK:INK,'left',2);txt(b,w/2-80,y+2,'700 28px Mono','rgba(236,238,230,.8)','right',3);ctx.restore();});
    srcLine('Source : L. Nuñez, 18 oct. 2026, 13 h',w,h);}
  else if(c.k==='scale'){framePaper(w,h,'rgba(40,43,40,.9)');ctx.save();ctx.translate(0,-120);tiles(t,'4 OPTIONS',0,0,{t0:c.t0,step:.05,h:120,gap:8});ctx.restore();
    const p=eo(lin(t,T[12],T[13]+.6));ctx.fillStyle='rgba(236,238,230,.2)';ctx.fillRect(-380,80,760,18);const g=ctx.createLinearGradient(-380,0,380,0);g.addColorStop(0,'#A9C79A');g.addColorStop(1,PINK);ctx.fillStyle=g;ctx.fillRect(-380,80,760*p,18);
    txt('PROBABLE',-380,160,'700 30px Mono',GREEN,'left',3,lin(t,T[12],T[12]+.2));txt('FOLLE',380,160,'700 30px Mono',PINK,'right',3,lin(t,T[13],T[13]+.2));}
  else if(c.k==='opt'){framePaper(w,h);txt('OPTION',0,-h/2+110,'700 40px Mono','rgba(236,238,230,.7)','center',12);txt(String(c.n),0,-h/2+380,'300px Anton',c.n===4?PINK:INK,'center',2,1,26);
    txt(c.title,0,-h/2+520,(c.title2?'84px':'104px')+' Anton',INK,'center',2);if(c.title2)txt(c.title2,0,-h/2+620,'84px Anton',INK,'center',2);
    txt('PROBABILITÉ',-w/2+70,h/2-90,'700 26px Mono','rgba(236,238,230,.6)','left',4);probDots(w/2-300,h/2-100,c.prob,t,c.t0+.6);
    if(c.n===1){stampAt('LA PLUS PROBABLE',0,-h/2+250,56,t,T[16],-.08,GREEN);if(t>=T[17]+.5)txt('« POURSUIVIS ET PUNIS »',0,h/2-230,'700 36px Mono',AMB,'center',2,lin(t,T[17]+.5,T[17]+.8));if(t>=T[18]+.8)txt('+ LOI « CASSEURS-PAYEURS »',0,h/2-170,'700 34px Mono',INK,'center',2,lin(t,T[18]+.8,T[18]+1.1));}
    if(c.n===2){if(t>=T[23]+.8)txt('AIDES CARBURANT ✓',0,h/2-230,'700 36px Mono',GREEN,'center',2,lin(t,T[23]+.8,T[23]+1.1));if(t>=T[24])txt('CE SOIR : ENCORE PLUS ?',0,h/2-170,'700 34px Mono',AMB,'center',2,lin(t,T[24],T[24]+.3));}
    if(c.n===3){if(t>=T[28])txt('DÉPUTÉS RENVOYÉS',0,h/2-230,'700 36px Mono',INK,'center',2,lin(t,T[28],T[28]+.3));if(t>=T[29])txt('LÉGISLATIVES DANS UN MOIS',0,h/2-170,'700 34px Mono',AMB,'center',2,lin(t,T[29],T[29]+.3));}
    if(c.n===4){if(t>=T[34])stampAt('RUMEUR',0,-h/2+250,70,t,T[34],-.1);}}
  else if(c.k==='law'){framePaper(w,h,PAPERC);txt('CONSTITUTION DE 1958',0,-h/2+90,'700 30px Mono','rgba(27,28,26,.7)','center',4);txt('Article '+c.art,0,-h/2+190,'90px Anton',INKD,'center',1);
    [c.l1,c.l2,c.l3,c.l4].forEach((s,i)=>{if(s)txt(s,-w/2+60,-h/2+300+i*70,'400 34px Mono',INKD,'left',0);});
    if(t>=c.t0+.6){const p=eo(lin(t,c.t0+.6,c.t0+1));ctx.fillStyle='rgba(255,178,30,.45)';ctx.fillRect(-w/2+50,-h/2+300+2*70-42,(w-100)*p,54);}}
  else if(c.k==='rumeur'){framePaper(w,h);txt('DÉMISSION ?',0,-h/2+140,'110px Anton',INK,'center',2);stampAt('AUCUNE SOURCE SÉRIEUSE',0,-40,56,t,c.t0+.3,-.07);
    if(t>=T[39])txt('« J’IRAI AU BOUT »',0,90,'700 40px Mono',AMB,'center',2,lin(t,T[39],T[39]+.3));
    if(t>=T[40]){txt('FIN DU MANDAT : MAI 2027',0,180,'64px Anton',INK,'center',2,lin(t,T[40],T[40]+.3));}
    if(t>=T[41])txt('DANS 7 MOIS',0,h/2-50,'70px Anton',PINK,'center',2,lin(t,T[41],T[41]+.2),16);}
  else if(c.k==='budget'){framePaper(w,h,PAPERC);txt('BUDGET 2027 · VOTE MARDI 20 OCT.',0,-h/2+80,'700 30px Mono','rgba(27,28,26,.75)','center',2);txt('ARRÊTS MALADIE',0,-h/2+200,'96px Anton',INKD,'center',2);
    txt('CSG : 6,2 % → 9,2 %',0,-h/2+330,'64px Anton',PINK,'center',2,lin(t,T[45]+.6,T[45]+.9));txt('+ IMPÔT SUR LES INDEMNITÉS',0,-h/2+420,'700 36px Mono',INKD,'center',2,lin(t,T[45]+1.6,T[45]+1.9));
    stampAt('MÊME AVEC UN CANCER',0,h/2-180,62,t,T[46]+.2,-.07);txt('Source : PLF 2027, art. 2 (texte du gouvernement)',w/2-30,h/2-24,'400 22px Mono','rgba(27,28,26,.55)','right');}
  else if(c.k==='non'){framePaper(w,h);txt('CETTE SEMAINE',0,-h/2+90,'700 34px Mono','rgba(236,238,230,.7)','center',8);txt('LES DÉPUTÉS',0,-60,'110px Anton',INK,'center',2);stampAt('NON.',0,110,150,t,T[48]+.4,-.12,GREEN);
    if(t>=T[49])txt('CONTRE L’AVIS DU GOUVERNEMENT',0,h/2-50,'700 32px Mono',AMB,'center',2,lin(t,T[49],T[49]+.3));}
  else if(c.k==='fin'){framePaper(w,h,'rgba(40,43,40,.9)');txt('CE SOIR, 20 H',0,-h/2+130,'90px Anton',INK,'center',2);txt('ÉCOUTE LE PRÉSIDENT.',0,-h/2+220,'700 40px Mono',INK,'center',3,lin(t,T[57],T[57]+.3));
    txt('LES SEMAINES QUI VIENNENT',0,60,'90px Anton',INK,'center',2,lin(t,T[58],T[58]+.3));txt('REGARDE LE SÉNAT.',0,150,'700 40px Mono',PINK,'center',3,lin(t,T[59],T[59]+.3));}
  else if(c.k==='vote'){framePaper(w,h,'rgba(40,43,40,.9)');txt('IL ANNONCE QUOI ?',0,-h/2+120,'90px Anton',INK,'center',2);
    [1,2,3,4].forEach((n,i)=>{const t0=T[63+i];if(t<t0-.05)return;const x=(i-1.5)*200;const p=eo(lin(t,t0-.05,t0+.15));ctx.save();ctx.translate(x,40);ctx.scale(.8+.2*p,.8+.2*p);ctx.globalAlpha*=p;ctx.fillStyle=i==3?'rgba(232,35,31,.45)':'rgba(128,134,126,.3)';ctx.fillRect(-80,-100,160,200);ctx.strokeStyle='rgba(236,238,230,.6)';ctx.lineWidth=3;ctx.strokeRect(-80,-100,160,200);txt(String(n),0,55,'150px Anton',INK,'center',0,1,16);ctx.restore();});
    txt('DIS-LE EN COMMENTAIRE ↓',0,h/2-80,'700 40px Mono',AMB,'center',3,lin(t,T[60],T[60]+.3));}
  laminate(w,h);
  if(c.k!=='cover'){pin(0,-h/2+18);tape(-w/2+40,-h/2+10,140,-.6);}else{pin(0,-h/2+10);}
  ctx.restore();
}
function outroCredits(t){const c=C[cOutro];ctx.save();ctx.translate(c.x,c.y+c.h/2+120);[['Sources : Élysée · ministère de l’Intérieur · franceinfo · France 3 · LCP',0],['Constitution art. 7 et 12 · PLF 2027 · Toutsurmesfinances / Légifiscal',40],['Images : Élysée (Licence Ouverte), H. Germain (CC0), Babsy, PanierAvide,',80],['Tangopaso, Baidax · Musique : « Hitman », K. MacLeod · CC BY 4.0',120]].forEach(([s,y])=>txt(s,0,y,'400 21px Mono','rgba(236,238,230,.75)','center'));ctx.restore();}

// ---------- sous-titres courts (3 mots max)
const CHUNKS=[];SEGS.forEach(s=>{const ws=s.txt.split(' ');const tot=ws.reduce((a,w)=>a+w.length+1,0);let acc=0;const dur=s.t1-s.t0;const wt=ws.map(w=>{const tt=s.t0+dur*acc/tot;acc+=w.length+1;return[w,tt];});
  for(let i=0;i<wt.length;){let n=Math.min(3,wt.length-i);if(n==3&&wt[i+1][0].length+wt[i][0].length+wt[i+2][0].length>18)n=2;CHUNKS.push({txt:wt.slice(i,i+n).map(x=>x[0]).join(' ').toUpperCase(),t:wt[i][1]});i+=n;}});
CHUNKS.forEach((c,i)=>{c.e=i<CHUNKS.length-1?Math.min(CHUNKS[i+1].t,c.t+1.6):c.t+1.2;});
function subs2(t){const c=CHUNKS.find(c=>t>=c.t-.03&&t<c.e);if(!c)return;const p=eo(lin(t,c.t-.03,c.t+.08));
  ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.translate(540,1330);ctx.scale(.9+.1*p,.9+.1*p);ctx.globalAlpha=p;ctx.font='76px Anton';ctx.textAlign='center';ctx.letterSpacing='1px';
  const w=ctx.measureText(c.txt).width;ctx.fillStyle='rgba(90,96,90,.45)';ctx.fillRect(-w/2-26,-74,w+52,96);ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=2;ctx.strokeRect(-w/2-26,-74,w+52,96);ctx.shadowColor='rgba(255,255,255,.5)';ctx.shadowBlur=14;ctx.fillStyle='#f4f1e6';ctx.fillText(c.txt,0,0);ctx.restore();}

// ---------- sons
ev(2.88,'boom');ev(TCOV-.1,'whoosh');
KEYS.forEach(k=>{if(k.t>TCOV+.1)ev(k.t-.5,'whoosh');});
C.forEach((c,i)=>{if(i>0)ev(c.t0-.05,'click');});
ev(T[4]+.1,'tick');reveal(T[5]+.3,1.3);[T[7],T[8],T[9]].forEach(x=>ev(x,'thud'));
tileSounds('4 OPTIONS',T[11],.05);ev(T[12],'riser');
[T[14],T[20],T[26],T[32]].forEach((x,i)=>reveal(x,i===3?1.3:1));ev(T[16],'thud');ev(T[34],'thud');
ev(T[30]+.6,'tick');ev(T[37]+.6,'tick');ev(T[38]+.3,'thud');ev(T[41],'thud');
ev(T[42]-.8,'riser');reveal(T[46]+.2,1.2);reveal(T[48]+.4,1.3);ev(T[52],'thud');
[T[63],T[64],T[65],T[66]].forEach(x=>ev(x,'type'));ev(VEND+.35,'boom');

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
