// ================= HISTOIRE VRAIE « TROIS FRÈRES. AVEUGLES. » (19/10/2026) — mur d’enquêteur + ouverture Matrix
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
const N=k=>ID['n'+k]===undefined?1e9:SEGS[ID['n'+k]].t0, NE=k=>ID['n'+k]===undefined?1e9:SEGS[ID['n'+k]].t1;
const HEB=k=>SEGS[ID[k]];
const cCover=add({k:'p2',w:900,h:1060,rot:-2,t0:0});
const cKafr=add({k:'clip',full:1,img:'kafr2',handle:'Nizzan Cohen · CC BY 4.0',badge:'KAFR KASSEM · ISRAËL',badgeRed:1,w:960,h:820,rot:-2,t0:N(4)});
const cTrio=add({k:'trio',w:960,h:900,rot:1.5,t0:N(7)});
const cSecret=add({k:'secret',w:940,h:640,rot:-1.5,t0:N(11)});
const cTel=add({k:'clip',full:1,img:'tel',gray:1,handle:'Wilfredor · CC BY-SA 4.0',badge:'ILS LES DÉMONTENT',w:900,h:820,rot:2,t0:N(14),
  after:(w,h,t)=>{if(t>=N(15))stampAt('IMITER N’IMPORTE QUELLE VOIX',0,40,50,t,N(15)+.3,-.07);}});
const cBraille=add({k:'clip',full:1,img:'braille',gray:1,handle:'Eddau · CC0',badge:'1989 · CENTRE POUR AVEUGLES',w:900,h:820,rot:-1.5,t0:N(16)});
const cArme=add({k:'arme',w:900,h:760,rot:1.5,t0:N(20)});
const cCall1=add({k:'call',full:1,lines:['h1','h2','h3'],stamp:['CODE OBTENU',N(25)],w:940,h:1100,rot:-1,t0:N(23)});
const cBezeq=add({k:'clip',full:1,img:'central',handle:'דוד שי · CC BY-SA 3.0',badge:'BEZEQ · L’OPÉRATEUR NATIONAL',w:620,h:1100,rot:2,t0:N(26),
  after:(w,h,t)=>{stampAt('3 LIGNES COUPÉES',0,140,64,t,N(27)+.8,-.1);}});
const cCall2=add({k:'call',full:1,lines:['h4','h5'],stamp:['LIGNES RÉTABLIES',N(30),1],w:940,h:1100,rot:1,t0:N(28)});
const cCB=add({k:'cnt',to:20000,label:'NUMÉROS DE CARTES BANCAIRES',sub:'DANS L’ORDINATEUR D’UN SEUL HOMME',src:'Wired',w:940,h:600,rot:-1.5,t0:N(32)});
const c1998=add({k:'title',lines:['1998','LE COUP LE PLUS FOU'],red:1,small2:1,w:900,h:560,rot:2,t0:N(34)});
const cRadio=add({k:'radio',w:940,h:760,rot:-2,t0:N(36)});
const c281=add({k:'cnt',to:281,label:'APPELS EN MÊME TEMPS',sub:'SUR LE STANDARD DE LA RADIO',src:'Wired',w:900,h:600,rot:1.5,t0:N(38)});
const cOrange=add({k:'clip',full:1,img:'orange',gray:1,handle:'Matson Collection · domaine public',badge:'ILLUSTRATION · ORANGERAIE DE JAFFA',w:960,h:820,rot:-1.5,t0:N(39),
  after:(w,h,t)=>{if(t>=N(40))stampAt('UNE CABANE',0,0,80,t,N(40),-.08);}});
const cFlow=add({k:'flow',w:960,h:900,rot:2,t0:N(43)});
const cBills=add({k:'title',lines:['LES FACTURES','EXPLOSENT.'],red:1,w:900,h:540,rot:-2,t0:N(46)});
const cWorker=add({k:'worker',w:940,h:660,rot:1.5,t0:N(48)+.3});
const cWired=add({k:'wired',w:940,h:760,rot:-1.5,t0:N(51)});
const cRaid=add({k:'raid',w:940,h:860,rot:2,t0:N(54)});
const cCourt=add({k:'clip',full:1,img:'court2',handle:'Yagasi · CC0',badge:'TRIBUNAL DE DISTRICT · TEL-AVIV',w:900,h:820,rot:-2,t0:N(59),
  after:(w,h,t)=>{if(t>=N(59)+.3){ctx.save();ctx.globalAlpha=eo(lin(t,N(59)+.3,N(59)+.6));ctx.fillStyle='rgba(10,10,10,.75)';ctx.fillRect(-380,-h/2+70,760,110);txt('44 CHEFS D’ACCUSATION',0,-h/2+148,'64px Anton',INK,'center',2);ctx.restore();}
    if(t>=N(60)){ctx.save();ctx.globalAlpha=eo(lin(t,N(60),N(60)+.3));ctx.fillStyle='rgba(201,48,44,.85)';ctx.fillRect(-300,-h/2+200,600,90);txt('27 MOIS DE PROCÈS',0,-h/2+262,'56px Anton','#fff','center',2);ctx.restore();}}});
const cVerdict=add({k:'verdict',w:940,h:820,rot:1.5,t0:N(61)});
const cVersions=add({k:'versions',w:960,h:820,rot:-1.5,t0:N(67)});
const cSources=add({k:'sources',w:940,h:900,rot:2,t0:N(71)});
const cAfter=add({k:'after',w:940,h:700,rot:-2,t0:N(74)});
const cQ=add({k:'q',w:960,h:800,rot:1.5,t0:N(77)});
const cOutro=add({k:'outro',full:1,w:900,h:900,rot:-1.5,t0:VEND+.5});
// placement en serpentin + désordre
{const COLS=4,DX=1250,DY=1250;const r=rng(99);C.forEach((c,i)=>{if(i===0)return;const j=i+1;const row=Math.floor(j/COLS),col=j%COLS;const cc=row%2?COLS-1-col:col;
  c.x=cc*DX+(r()-.5)*220;c.y=row*DY+(r()-.5)*220;c.rot*=1.9;});C[cCover].x=C[c1998].x;C[cCover].y=C[c1998].y;}

// ---------- trajectoire caméra
function fitZoom(c){return Math.min(880/c.w,900/c.h);}
C.forEach(c=>{c.off=c.t0>1e8;});
const KEYS=[];C.forEach((c,i)=>{if(c.off)return;if(i===cCover&&c.k==='p2')KEYS.push({t:0,x:c.x,y:c.y+40,z:1,rot:-c.rot*Math.PI/180});else if(i===cCover)KEYS.push({t:0,x:c.x,y:c.y-160/1.04,z:1.04,rot:-c.rot*Math.PI/180});else if(c.full){const pw=c.k==='clip'?c.w-50:c.w;const z=(c.k==='clip'?1100:880)/pw;const a=c.rot*Math.PI/180;const oy=c.k==='clip'?-85:0;KEYS.push({t:c.t0,x:c.x-Math.sin(a)*oy,y:c.y+Math.cos(a)*oy-160/z,z,rot:-a});}
  else KEYS.push({t:c.t0,x:c.x,y:c.y,z:fitZoom(c),rot:-c.rot*Math.PI/180*.6});});
const WIDE=(t,cs)=>{let mnx=1e9,mxx=-1e9,mny=1e9,mxy=-1e9;cs.forEach(i=>{const c=C[i];mnx=Math.min(mnx,c.x-c.w/2);mxx=Math.max(mxx,c.x+c.w/2);mny=Math.min(mny,c.y-c.h/2);mxy=Math.max(mxy,c.y+c.h/2);});
  return{t,x:(mnx+mxx)/2,y:(mny+mxy)/2,z:Math.min(1000/(mxx-mnx),1500/(mxy-mny)),rot:0};};

KEYS.push(WIDE(N(70)-.05,[...C.keys()].filter(i=>i!==cOutro&&i!==cCover)));
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
const CLUT=[];{const r=rng(55);const ims=['tel','commut','pub','kafr'];for(let i=0;i<90;i++){const k=r();CLUT.push({x:-1300+r()*6200,y:-1300+r()*12500,rot:(r()-.5)*.5,kind:k<.45?'post':k<.75?'photo':'clip',im:ims[Math.floor(r()*4)],w:k<.45?220:260,h:k<.45?220:190,lines:2+Math.floor(r()*4),col:r()});}}
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
  const ORD=[...C.keys()].filter(i=>C[i].k!=='outro'&&!C[i].off).sort((u,v)=>C[u].t0-C[v].t0);for(let j=1;j<ORD.length;j++){const a=C[ORD[j-1]],b=C[ORD[j]];
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

const HEBF='"Arial Hebrew","Noto Sans Hebrew",Arial,sans-serif';
const GLY='אבגדהוזחטיכלמנסעפצקרשתابتثجحخدذرزسشصضطظعغفقكلمنهوي0123456789';
const MGREEN='#36ff7a';
function hsh(a){a=(a^61)^(a>>>16);a=a+(a<<3);a=a^(a>>>4);a=Math.imul(a,0x27d4eb2d);a=a^(a>>>15);return a>>>0;}
function typedL(s,x,y,t,t0,t1,font,col){if(t<t0)return 0;const n=Math.floor(s.length*lin(t,t0,t1));txt(s.slice(0,n),x,y,font,col,'left',1,1,10);return n;}
const HC1=1.55,HC2=MARK.s2[0]-.1;
function drawHook(w,h,t){
  const FRZ=MARK.frz,frz=t>=FRZ;let im,fr=0;
  if(frz)im=IM.trio;else if(t<HC1){fr=Math.floor(t*30);im=CLIPS.walk[Math.min(CLIPS.walk.length-1,fr)];}else if(t<HC2){fr=Math.floor((t-HC1)*30);im=CLIPS.head[Math.min(CLIPS.head.length-1,fr)];}else{fr=Math.floor((t-HC2)*30);im=CLIPS.phone[Math.min(CLIPS.phone.length-1,fr)];}
  ctx.fillStyle='#0b0c0b';ctx.fillRect(-w/2,-h/2,w,h);
  if(im){ctx.save();ctx.beginPath();ctx.rect(-w/2,-h/2,w,h);ctx.clip();ctx.filter='blur(34px) brightness(.4)';ctx.drawImage(im,-w/2-300,-h/2,w+600,h);
    const z=frz?1.02+.03*eo(lin(t,FRZ,FRZ+.3)):1.05+.04*((t<HC1?t:t<HC2?t-HC1:t-HC2));const IW=1080*1.18*z,IH=IW*im.height/im.width;
    ctx.filter=frz?'grayscale(1) contrast(1.2) brightness(.75)':'saturate(.85) contrast(1.12)';ctx.drawImage(im,-IW/2,-h/2+700-IH/2,IW,IH);ctx.filter='none';
    const g1=ctx.createLinearGradient(0,-h/2+700-IH/2,0,-h/2+700-IH/2+160);g1.addColorStop(0,'rgba(0,0,0,.7)');g1.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g1;ctx.fillRect(-w/2,-h/2+700-IH/2,w,160);ctx.restore();}
  txt('IMAGES : CHANNEL 10 (ISRAËL) · NANA10',0,-h/2+250,'700 22px Mono','rgba(236,238,230,.7)','center',3);
  if(!frz&&t>=HC1&&t<HC2){const p=eo(lin(t,HC1+.15,HC1+.4));ctx.save();ctx.globalAlpha=p;ctx.fillStyle='rgba(10,10,10,.85)';ctx.fillRect(-w/2+50,-h/2+1010,w-100,150);
    txt('« 3 FRÈRES AVEUGLES : LES PIRATES',0,-h/2+1070,'52px Anton',AMB,'center',1);txt('LES PLUS DANGEREUX D’ISRAËL ? »',0,-h/2+1135,'52px Anton',AMB,'center',1);ctx.restore();}
  if(!frz){const s1=MARK.s1[0],s2=MARK.s2[0];const L=t<s2?[['3 FRÈRES AVEUGLES',s1,INK],['ONT FAIT TREMBLER',s1+1.15,INK],['L’ARMÉE ISRAÉLIENNE',s1+1.95,RED]]:[['AVEC UN SIMPLE',s2,INK],['TÉLÉPHONE.',s2+.55,RED]];
    L.forEach(([s,t0,col],i)=>{if(t>=t0){const p=eo(lin(t,t0,t0+.12));ctx.save();ctx.translate(0,-h/2+1245+i*100);ctx.scale(1.15-.15*p,1.15-.15*p);txt(s,0,0,'92px Anton',col,'center',3,p,col===RED?6:10);ctx.restore();}});}
  if(frz){const p=eo(lin(t,FRZ,FRZ+.15));ctx.save();ctx.globalAlpha=p*.45;ctx.fillStyle='#000';ctx.fillRect(-w/2,-h/2,w,h);ctx.restore();
    const sl=(s,y,f,col,t0,ls,gl)=>{if(t<t0)return;const q=eo(lin(t,t0,t0+.14));const sc=1.7-.7*q;const sh=t<t0+.25?(1-lin(t,t0,t0+.25))*14:0;ctx.save();ctx.translate(Math.sin(t*90)*sh,y+Math.cos(t*77)*sh);ctx.scale(sc,sc);txt(s,0,0,f,col,'center',ls,cl(q*1.5),gl);ctx.restore();};
    sl('L’HISTOIRE DES',-h/2+1060,'80px Anton',INK,FRZ,6,10);sl('FRÈRES',-h/2+1275,'170px Anton',INK,FRZ+.22,8,18);sl('BADIR.',-h/2+1478,'250px Anton',RED,MARK.av,10,14);
    txt('KAFR KASSEM · ISRAËL · 1998',0,-h/2+1565,'700 32px Mono',AMB,'center',6,lin(t,MARK.av+.35,MARK.av+.6));}
}
function drawFacture(w,h,t){
  const F0=MARK.s2[0],frz=t>=F0,tt=Math.min(t,F0);
  ctx.fillStyle='#0d0f0e';ctx.fillRect(-w/2,-h/2,w,h);
  ctx.save();ctx.rotate(-.035);const PW=820,PT=-h/2+250,PB=h/2-560,PH=PB-PT;const sc=1.04+.02*tt;ctx.scale(sc,sc);
  ctx.shadowColor='rgba(0,0,0,.7)';ctx.shadowBlur=40;ctx.fillStyle=frz?'rgba(150,150,145,1)':'rgba(232,229,216,1)';ctx.fillRect(-PW/2,PT,PW,PH);ctx.shadowBlur=0;
  const D='rgba(27,28,26,.9)';
  txt('TSAHAL · RADIO DE L’ARMÉE',0,PT+80,'60px Anton',D,'center',2);txt('RELEVÉ DES COMMUNICATIONS · JAFFA · 1998',0,PT+128,'700 26px Mono','rgba(27,28,26,.7)','center',2);
  ctx.fillStyle=D;ctx.fillRect(-PW/2+40,PT+150,PW-80,4);
  // lignes d'appels qui défilent de plus en plus vite
  ctx.save();ctx.beginPath();ctx.rect(-PW/2,PT+160,PW,PH-330);ctx.clip();const RH=46,sp=tt*tt*95+tt*120;
  for(let i=0;i<60;i++){const y=PT+200+i*RH-sp%(RH*30)-Math.floor(sp/(RH*30))*0;const yy=PT+200+((i*RH-sp)%(60*RH)+60*RH)%(60*RH);if(yy>PT+PH-170)continue;const r=rng(i*31+Math.floor((i*RH-sp)/(60*RH))*7);
    const dur=`00:${String(Math.floor(r()*59)).padStart(2,'0')}:${String(Math.floor(r()*59)).padStart(2,'0')}`;const amt=(5+r()*180).toFixed(2).replace('.',',');
    txt('APPEL INTERNATIONAL',-PW/2+50,yy,'400 26px Mono',D,'left');txt(dur,60,yy,'400 26px Mono',D,'left');txt('₪ '+amt,PW/2-50,yy,'700 26px Mono',D,'right');}
  ctx.restore();
  ctx.fillStyle=D;ctx.fillRect(-PW/2+40,PB-160,PW-80,4);
  const rr=rng(Math.floor(tt*20)+5);let dg='';for(let k=0;k<6;k++)dg+=Math.floor(rr()*10);txt('TOTAL À PAYER',-PW/2+50,PB-95,'700 30px Mono',D,'left',2);txt('₪ '+dg.slice(0,3)+' '+dg.slice(3),PW/2-50,PB-85,'64px Anton','#b3221e','right',2);
  txt('À LA CHARGE DE : L’ARMÉE ISRAÉLIENNE',0,PB-30,'700 26px Mono','rgba(27,28,26,.75)','center',2);
  stampAt('PAYÉ PAR L’ARMÉE',0,PT+PH/2,84,t,MARK.s1[1]-.35,-.12);
  ctx.restore();
  txt('RECONSTITUTION · D’APRÈS WIRED ET HAARETZ',0,-h/2+215,'700 22px Mono','rgba(236,238,230,.6)','center',3);
  if(frz){const p=eo(lin(t,F0,F0+.15));ctx.save();ctx.globalAlpha=p*.72;ctx.fillStyle='#000';ctx.fillRect(-w/2,-h/2,w,h);ctx.restore();
    txt('TROIS FRÈRES.',0,-h/2+1190,'150px Anton',INK,'center',6,p,24);if(t>=MARK.av)txt('AVEUGLES.',0,-h/2+1420,'230px Anton',RED,'center',8,eo(lin(t,MARK.av,MARK.av+.1)),30);
    txt('UNE HISTOIRE VRAIE',0,-h/2+1530,'700 34px Mono',AMB,'center',8,lin(t,MARK.av+.3,MARK.av+.6));}
}
function drawMatrix(w,h,t){
  const FRZ=MARK.wm[1]+.05,tt=Math.min(t,FRZ);
  ctx.fillStyle='#000';ctx.fillRect(-w/2,-h/2,w,h);
  ctx.save();ctx.globalAlpha=lin(t,0,.4);ctx.font='32px '+HEBF;ctx.textAlign='center';
  for(let i=0;i<40;i++){const x=-w/2+14+i*27.5;const r=rng(i*977+3);const v=260+r()*520,o=r()*2400,n=16+Math.floor(r()*22);const tot=h+n*36;
    const head=((o+v*tt)%tot)-n*36-h/2+n*36;
    for(let j=0;j<n;j++){const y=head-j*36;if(y<-h/2-36||y>h/2+36)continue;const ci=hsh(i*131+Math.floor((y+5000)/36)*17+Math.floor(tt*12+j*3))%GLY.length;
      ctx.fillStyle=j===0?'#e4ffe9':`rgba(0,255,102,${.15+(1-j/n)*.85})`;if(j===0){ctx.shadowColor='#7dff9c';ctx.shadowBlur=14;}else ctx.shadowBlur=0;ctx.fillText(GLY[ci],x,y);}}
  ctx.restore();
  // terminal
  const ta=1-lin(t,FRZ,FRZ+.15);
  if(ta>0){ctx.save();ctx.globalAlpha=ta;ctx.fillStyle='rgba(0,0,0,.78)';ctx.fillRect(-440,-340,880,560);ctx.strokeStyle='rgba(54,255,122,.55)';ctx.lineWidth=2;ctx.strokeRect(-440,-340,880,560);
    const F='700 34px Mono',x0=-400;let y=-270;const L=62;
    typedL('> APPEL ENTRANT…',x0,y,t,.15,.7,F,MGREEN);y+=L;
    typedL('> LIGNE : RADIO DE L’ARMÉE',x0,y,t,.8,1.45,F,MGREEN);y+=L;
    typedL('> JAFFA · 1998',x0,y,t,1.45,1.85,F,MGREEN);y+=L;
    if(t>=1.9){const lk=[2.5,2.9,3.3],fin='281';let d='';for(let k=0;k<3;k++)d+=t>=lk[k]?fin[k]:String(hsh(Math.floor(t*30)*7+k)%10);
      txt('> CANAUX OUVERTS : '+d,x0,y,F,MGREEN,'left',1,1,10);}y+=L;
    typedL('> Tout est en place ?',x0,y,t,MARK.wf[0],MARK.wf[1]-.2,F,'#e4ffe9');y+=L;
    const wm0=MARK.wm[0],wm1=MARK.wm[1];typedL('> La ligne est ouverte.',x0,y,t,wm0,wm0+1.1,F,'#e4ffe9');y+=L;
    typedL('> Ils ne verront rien.',x0,y,t,wm0+1.3,wm1-.1,F,'#e4ffe9');
    if(Math.floor(t*3)%2===0&&t<FRZ){ctx.fillStyle=MGREEN;ctx.fillRect(x0+(t>wm0?440:0),y+14,22,6);}
    ctx.restore();}
  txt('RECONSTITUTION · VOIX GÉNÉRÉES',0,-h/2+300,'700 24px Mono','rgba(54,255,122,.75)','center',4);
  if(t>=FRZ){const p=eo(lin(t,FRZ,FRZ+.15));ctx.save();ctx.globalAlpha=p*.6;ctx.fillStyle='#000';ctx.fillRect(-w/2,-h/2,w,h);ctx.restore();
    txt('TROIS FRÈRES.',0,-h/2+1190,'150px Anton',INK,'center',6,p,24);txt('AVEUGLES.',0,-h/2+1420,'230px Anton',RED,'center',8,p,30);}
}
function wrapHe(s,maxw,font){ctx.save();ctx.font=font;const ws=s.split(' ');const out=[];let cur='';ws.forEach(wd=>{const tr=cur?cur+' '+wd:wd;if(ctx.measureText(tr).width>maxw&&cur){out.push(cur);cur=wd;}else cur=tr;});if(cur)out.push(cur);ctx.restore();return out;}
const SPK={h1:['SECRÉTAIRE',0],h2:['UN FRÈRE · FAUX TECHNICIEN',1],h3:['SECRÉTAIRE',0],h4:['UN FRÈRE · FAUX ENQUÊTEUR ANTI-FRAUDE',1],h5:['TECHNICIEN DE BEZEQ',0]};
function drawCall(c,w,h,t){framePaper(w,h,'rgba(14,16,15,.95)');
  txt('RECONSTITUTION · VOIX GÉNÉRÉES',0,-h/2+85,'700 30px Mono',AMB,'center',4);txt('APPEL TÉLÉPHONIQUE · ANNÉES 1990 · EN HÉBREU',0,-h/2+135,'700 24px Mono','rgba(236,238,230,.55)','center',3);
  let cur=null;c.lines.forEach(k=>{if(t>=MARK[k][0]-.05)cur=k;});
  const act=cur&&t<MARK[cur][1]+.05;
  if(cur){const [lab,bro]=SPK[cur];txt(lab,0,-h/2+250,(lab.length>24?'46px':'58px')+' Anton',bro?PINK:INK,'center',2);
    const font='700 60px '+HEBF;const ls=wrapHe(HEB(cur).he,800,font);ctx.save();ctx.direction='rtl';ctx.font=font;ctx.fillStyle=INK;ctx.textAlign='center';ctx.shadowColor='rgba(255,255,255,.35)';ctx.shadowBlur=12;
    ls.forEach((l,i)=>ctx.fillText(l,0,-130+i*84-(ls.length-1)*30));ctx.restore();}
  const r=rng(Math.floor(t*30));ctx.fillStyle=act?MGREEN:'rgba(54,255,122,.35)';
  for(let i=0;i<44;i++){const hh=act?8+r()*130*(.4+.6*Math.abs(Math.sin(i*.45+t*9))):6;ctx.fillRect(-430+i*20,150-hh/2,12,hh*.8);}
  if(c.stamp)stampAt(c.stamp[0],0,h/2-150,74,t,c.stamp[1],-.08,c.stamp[2]?GREEN:PINK);}
function drawP2(c,w,h,t){
  ctx.shadowColor='rgba(0,0,0,.6)';ctx.shadowBlur=38;ctx.shadowOffsetY=20;ctx.fillStyle='#e9e7de';ctx.fillRect(-w/2,-h/2,w,h);ctx.shadowColor='transparent';
  const g=ctx.createLinearGradient(-w/2,-h/2,w/2,h/2);g.addColorStop(0,'rgba(255,255,255,.12)');g.addColorStop(1,'rgba(60,55,40,.16)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,h);
  const im=IM.trio,pw=w-70,ph=Math.round(pw*532/960),py=-h/2+45;
  ctx.fillStyle='#111';ctx.fillRect(-pw/2,py,pw,ph);
  if(im){ctx.save();ctx.beginPath();ctx.rect(-pw/2,py,pw,ph);ctx.clip();const s=pw/im.width*(1.03+Math.max(0,t-c.t0)*.008);ctx.filter='grayscale(1) contrast(1.18) brightness(.92)';
    ctx.drawImage(im,-im.width*s/2,py+ph/2-im.height*s/2,im.width*s,im.height*s);ctx.filter='none';ctx.restore();}
  txt('IMAGE : CHANNEL 10 (ISRAËL)',pw/2-14,py+ph-16,'700 20px Mono','rgba(236,238,230,.75)','right',1);
  const y0=py+ph;
  txt('LES FRÈRES BADIR',0,y0+92,'700 40px Mono',INKD,'center',8);
  // « PARTIE 2 » écrit au feutre rouge : le trait avance de gauche à droite
  const p=c.wt===undefined?1:eo(lin(t,c.wt,c.wt+.55));
  if(p>0){ctx.save();ctx.translate(0,y0+318);ctx.rotate(-.045);ctx.font='230px Anton';ctx.letterSpacing='6px';const tw=ctx.measureText('PARTIE 2').width;
    ctx.beginPath();ctx.rect(-tw/2-20,-240,(tw+40)*p,300);ctx.clip();
    ctx.globalAlpha=.94;txt('PARTIE 2',0,0,'230px Anton',PINK,'center',6);
    ctx.fillStyle=PINK;ctx.globalAlpha=.85;ctx.beginPath();ctx.moveTo(-tw/2,34);ctx.quadraticCurveTo(0,52,tw/2+10,28);ctx.lineTo(tw/2+10,40);ctx.quadraticCurveTo(0,64,-tw/2,46);ctx.fill();ctx.restore();}
  if(c.note&&t>=c.wt+.7)txt(c.note,0,y0+410,'700 34px Mono',INKD,'center',4,lin(t,c.wt+.7,c.wt+1));
  tape(w/2-60,-h/2+12,170,.7);  // 2e bande adhésive (la 1re et la punaise sont posées pour toutes les cartes)
}
function drawCard(c,t){
  ctx.save();ctx.translate(c.x,c.y);ctx.rotate(c.rot*Math.PI/180);
  const w=c.w,h=c.h;
  if(c.k==='hook'){drawHook(w,h,t);}
  else if(c.k==='outro'){framePaper(w,h);txt('HISTOIRE VRAIE',0,-200,'100px Anton',INK,'center',4,1,24);txt('TROIS FRÈRES.',0,10,'150px Anton',PINK,'center',4,1,24);txt('LA FERME',0,100,'700 34px Mono','rgba(236,238,230,.6)','center',12);
    txt('ABONNE-TOI',0,240,'70px Anton',INK,'center',4,1,16);txt('ON VÉRIFIE. TOUJOURS.',0,320,'700 34px Mono',AMB,'center',4);}
  else if(c.k==='clip'){framePaper(w,h,'rgba(230,232,224,.88)');const im=IM[c.img];const pw=w-50,ph=h-170;
    ctx.fillStyle='#000';ctx.fillRect(-pw/2,-h/2+25,pw,ph);if(im){ctx.save();ctx.beginPath();ctx.rect(-pw/2,-h/2+25,pw,ph);ctx.clip();const age=Math.max(0,t-c.t0);const s=Math.max(pw/im.width,ph/im.height)*(1.02+age*.012);ctx.filter=c.gray?'grayscale(1) contrast(1.12)':'saturate(.8) contrast(1.08)';ctx.drawImage(im,-im.width*s/2,-h/2+25+ph/2-im.height*s/2,im.width*s,im.height*s);ctx.restore();}
    if(c.after){ctx.save();c.after(w,h,t);ctx.restore();}
    txt(c.handle,-w/2+30,h/2-85,'700 28px Mono','#1b1c1a','left',1);
    if(c.badge){const bc=c.badgeRed?PINK:'rgba(20,20,20,.85)';ctx.font='700 30px Mono';const bw=ctx.measureText(c.badge).width+36;ctx.fillStyle=bc;ctx.fillRect(-bw/2,h/2-58,bw,44);txt(c.badge,0,h/2-26,'700 30px Mono','#fff','center',2);}}
  else if(c.k==='p2'){drawP2(c,w,h,t);}
  else if(c.k==='call'){drawCall(c,w,h,t);}
  else if(c.k==='title'){framePaper(w,h);if(c.small2){txt(c.lines[0],0,-20,'200px Anton',INK,'center',4,1,18);txt(c.lines[1],0,110,'64px Anton',PINK,'center',3,lin(t,c.t0+.6,c.t0+.9));}
    else{const big=110;c.lines.forEach((l,i)=>txt(l,0,-((c.lines.length-1)*big*.55)+i*big*1.1+big*.35,big+'px Anton',c.red&&i==1?PINK:INK,'center',2));}}
  else if(c.k==='cnt'){framePaper(w,h);const v=Math.round(c.to*eo(lin(t,c.t0+.15,c.t0+1.4)));txt(v.toLocaleString('fr-FR'),0,-30,'180px Anton',INK,'center',2,1,14);
    txt(c.label,0,60,'700 36px Mono',INK,'center',3);txt(c.sub,0,120,'700 26px Mono','rgba(236,238,230,.6)','center',3);srcLine('Source : '+c.src,w,h);}
  else if(c.k==='mil'){framePaper(w,h);txt('ET POURTANT…',0,-h/2+110,'700 36px Mono','rgba(236,238,230,.7)','center',6);
    txt('DES MILLIERS',0,-h/2+290,'130px Anton',INK,'center',3,lin(t,N(2),N(2)+.25),14);txt('D’APPELS',0,-h/2+420,'100px Anton',INK,'center',3,lin(t,N(2)+.2,N(2)+.45));
    if(t>=N(3))stampAt('PAYÉS PAR L’ARMÉE ISRAÉLIENNE',0,h/2-120,52,t,N(3),-.06);}
  else if(c.k==='trio'){framePaper(w,h);if(t>=N(9))txt('LES FRÈRES BADIR',0,-h/2+95,'700 36px Mono',AMB,'center',6,lin(t,N(9),N(9)+.3));
    [['RAMY',N(8)],['MUZHER',N(8)+.55],['SHADDE',N(9)]].forEach(([nm,t0],i)=>{const x=(i-1)*290;const a=lin(t,c.t0+i*.15,c.t0+i*.15+.25);ctx.save();ctx.globalAlpha*=a;
      ctx.fillStyle='rgba(128,134,126,.25)';ctx.fillRect(x-125,-h/2+150,250,380);person(x,-h/2+470,1.7,'rgba(236,238,230,.85)');ctx.fillStyle='#111';ctx.fillRect(x-48,-h/2+262,96,22);ctx.restore();
      if(t>=t0)txt(nm,x,-h/2+600,'62px Anton',INK,'center',2,lin(t,t0,t0+.2));});
    txt('PHOTOS : AUCUNE IMAGE LIBRE · SILHOUETTES',0,-h/2+660,'700 20px Mono','rgba(236,238,230,.45)','center',2);
    stampAt('AVEUGLES DE NAISSANCE',0,h/2-110,62,t,N(10),-.06);}
  else if(c.k==='secret'){framePaper(w,h);txt('ENFANTS : UNE LANGUE SECRÈTE',0,-h/2+95,'700 34px Mono',AMB,'center',3);
    const src='BONJOUR',tgt=[4,5,6,0,1,2,3];const p=eo(lin(t,N(12)+.5,N(12)+1.2));const tw=96,g=12;
    [...src].forEach((ch,i)=>{const x0=(i-3)*(tw+g),x1=(tgt[i]-3)*(tw+g);const x=x0+(x1-x0)*p;const y=-30-Math.sin(p*Math.PI)*(i%2?60:-60);
      ctx.fillStyle='rgba(128,134,126,.32)';ctx.fillRect(x-tw/2,y-65,tw,130);ctx.strokeStyle='rgba(236,238,230,.45)';ctx.lineWidth=2;ctx.strokeRect(x-tw/2,y-65,tw,130);txt(ch,x,y+32,'700 92px Osw',p>.99?PINK:INK,'center',0,1,12);});
    txt('ILS MÉLANGENT LES LETTRES',0,140,'700 30px Mono','rgba(236,238,230,.75)','center',3,lin(t,N(12)+.6,N(12)+.9));
    if(t>=N(13))txt('POUR QUE PERSONNE NE COMPRENNE',0,h/2-60,'700 32px Mono',INK,'center',2,lin(t,N(13),N(13)+.3));}
  else if(c.k==='arme'){framePaper(w,h);txt('LEUR ARME ?',0,-h/2+170,'120px Anton',INK,'center',3);
    if(t>=N(21)-.1){txt('LE CLAVIER',0,30,'90px Anton','rgba(236,238,230,.7)','center',3,lin(t,N(21)-.1,N(21)+.15));if(t>=N(21)+.45){const p=eo(lin(t,N(21)+.45,N(21)+.65));ctx.fillStyle=PINK;ctx.fillRect(-230,0,460*p,14);}}
    if(t>=N(22))stampAt('LA VOIX.',0,h/2-110,120,t,N(22),-.08);}
  else if(c.k==='radio'){framePaper(w,h);const on=Math.floor(t*2)%2===0;ctx.save();ctx.fillStyle=on?'rgba(232,35,31,.95)':'rgba(120,20,18,.8)';if(on){ctx.shadowColor='rgba(255,60,40,.9)';ctx.shadowBlur=40;}
    ctx.fillRect(-170,-h/2+70,340,100);ctx.restore();txt('ON AIR',0,-h/2+142,'70px Anton','#fff','center',6);
    txt('GALEI TSAHAL',0,-h/2+340,'130px Anton',INK,'center',3,1,14);txt('LA RADIO DE L’ARMÉE ISRAÉLIENNE · JAFFA',0,-h/2+420,'700 30px Mono','rgba(236,238,230,.75)','center',2);
    if(t>=N(37))txt('UNE FONCTION OUBLIÉE DU STANDARD…',0,-h/2+520,'700 30px Mono',AMB,'center',2,lin(t,N(37),N(37)+.3));
    stampAt('RÉACTIVÉE',0,h/2-110,80,t,N(37)+1.2,-.08);}
  else if(c.k==='flow'){framePaper(w,h);txt('LE SYSTÈME',0,-h/2+90,'700 34px Mono',AMB,'center',6);
    [['DES PALESTINIENS','APPELLENT L’ÉTRANGER',N(43),INK],['LA CABANE','ENCAISSE',N(44),INK],['L’ARMÉE','REÇOIT LA FACTURE',N(45)+.2,PINK]].forEach(([a,b,t0,col],i)=>{if(t<t0)return;const y=-h/2+220+i*240;const q=eo(lin(t,t0,t0+.25));ctx.save();ctx.globalAlpha*=q;
      ctx.fillStyle=i==2?'rgba(201,48,44,.35)':'rgba(128,134,126,.28)';ctx.fillRect(-380,y-70,760,140);ctx.strokeStyle='rgba(236,238,230,.5)';ctx.lineWidth=2;ctx.strokeRect(-380,y-70,760,140);
      txt(a,0,y+2,'64px Anton',col,'center',2);txt(b,0,y+48,'700 26px Mono','rgba(236,238,230,.8)','center',3);ctx.restore();
      if(i<2){const ta=t0+.4;if(t>=ta){const p=eo(lin(t,ta,ta+.3));ctx.fillStyle=PINK;ctx.fillRect(-7,y+72,14,96*p);if(p>.9){ctx.beginPath();ctx.moveTo(-24,y+150);ctx.lineTo(24,y+150);ctx.lineTo(0,y+176);ctx.fill();}}}});}
  else if(c.k==='worker'){framePaper(w,h);txt('UN OUVRIER LÂCHE UN DÉTAIL',0,-h/2+100,'700 34px Mono',AMB,'center',3);
    if(t>=N(49))txt('« LES TECHNICIENS… »',0,-30,'96px Anton',INK,'center',2,lin(t,N(49),N(49)+.3),12);
    stampAt('ÉTAIENT AVEUGLES',0,h/2-130,90,t,N(50),-.08);}
  else if(c.k==='wired'){framePaper(w,h,PAPERC);txt('1 AN',0,-h/2+250,'220px Anton',INKD,'center',3);txt('D’ÉCOUTES',0,-h/2+340,'80px Anton',INKD,'center',3);
    if(t>=N(52)){ctx.fillStyle='rgba(20,20,20,.9)';ctx.fillRect(-200,-h/2+400,400,56);txt('SELON WIRED',0,-h/2+440,'700 32px Mono','#fff','center',4);}
    if(t>=N(53))txt('L’E-MAIL DU PROCUREUR PIRATÉ ?',0,h/2-110,'60px Anton',PINK,'center',2,lin(t,N(53)+.5,N(53)+.8));
    txt('Source : Wired 12.02, « Three Blind Phreaks »',w/2-30,h/2-24,'400 22px Mono','rgba(27,28,26,.55)','right');}
  else if(c.k==='raid'){framePaper(w,h);txt('PERQUISITION',0,-h/2+95,'700 34px Mono',AMB,'center',8);txt('14.06.1999',0,-h/2+280,'150px Anton',INK,'center',3,1,14);
    if(t>=N(55))txt('14 POLICIERS',0,-h/2+410,'90px Anton',INK,'center',3,lin(t,N(55),N(55)+.3));
    stampAt('ORDINATEUR : RIEN',0,-h/2+570,74,t,N(56)+.2,-.08);
    if(t>=N(57)+.4)txt('« IL S’EFFACE TOUT SEUL »',0,h/2-80,'700 38px Mono',AMB,'center',2,lin(t,N(57)+.4,N(57)+.7));}
  else if(c.k==='verdict'){framePaper(w,h);txt('LE VERDICT · 2001',0,-h/2+100,'90px Anton',INK,'center',2);
    [['RAMY','65 MOIS DE PRISON',N(62),PINK],['MUZHER','TRAVAUX D’INTÉRÊT GÉNÉRAL',N(64),INK],['SHADDE','SURSIS',N(66),INK]].forEach(([a,b,t0,col],i)=>{if(t<t0-.4)return;const y=-h/2+260+i*170;const q=eo(lin(t,t0-.4,t0-.2));ctx.save();ctx.globalAlpha*=q;
      ctx.fillStyle='rgba(128,134,126,.28)';ctx.fillRect(-w/2+50,y-80,w-100,130);txt(a,-w/2+80,y+12,'72px Anton',INK,'left',2);if(t>=t0)txt(b,w/2-80,y+6,'48px Anton',col,'right',1,lin(t,t0,t0+.2));ctx.restore();});
    srcLine('Sources : Haaretz 2001 · Wired',w,h);}
  else if(c.k==='versions'){framePaper(w,h);txt('DEUX VERSIONS',0,-h/2+95,'700 34px Mono',AMB,'center',8);
    ctx.fillStyle='rgba(128,134,126,.28)';ctx.fillRect(-w/2+40,-h/2+150,w/2-60,540);ctx.fillRect(20,-h/2+150,w/2-60,540);txt('VS',0,-h/2+430,'90px Anton',PINK,'center',2);
    txt('EUX',-w/4+10,-h/2+240,'80px Anton',INK,'center',2);['« VISÉS PARCE','QU’ARABES…','ET DOUÉS »'].forEach((s,i)=>txt(s,-w/4+10,-h/2+340+i*60,'700 34px Mono',INK,'center',1,lin(t,N(67)+i*.4,N(67)+i*.4+.3)));
    txt('LE PARQUET',w/4-10,-h/2+240,'70px Anton',INK,'center',2,lin(t,N(69)-.3,N(69)));if(t>=N(69))stampAt('DÉMENTI',w/4-10,-h/2+420,70,t,N(69),-.1);
    srcLine('Source : Associated Press, 29/10/1999',w,h);}
  else if(c.k==='sources'){framePaper(w,h,PAPERC);txt('CE N’EST PAS NOUS',0,-h/2+150,'100px Anton',INKD,'center',2);txt('QUI L’INVENTONS.',0,-h/2+260,'100px Anton',INKD,'center',2);
    stampAt('JUGÉ PAR LES TRIBUNAUX ISRAÉLIENS',0,-h/2+420,46,t,N(72),-.05);
    [['ASSOCIATED PRESS · 1999',N(73)-.2],['HAARETZ · 2001',N(73)+.2],['WIRED · 2004',N(73)+.6]].forEach(([s,t0],i)=>{if(t<t0)return;const y=-h/2+560+i*90;const q=eo(lin(t,t0,t0+.2));ctx.save();ctx.globalAlpha*=q;ctx.fillStyle='rgba(20,20,20,.88)';ctx.font='700 34px Mono';const bw=ctx.measureText(s).width+60;ctx.fillRect(-bw/2,y-44,bw,64);txt(s,0,y,'700 34px Mono','#fff','center',3);ctx.restore();});}
  else if(c.k==='after'){framePaper(w,h);txt('À SA SORTIE…',0,-h/2+110,'700 36px Mono',AMB,'center',6);txt('PROTÉGER',0,-h/2+280,'120px Anton',INK,'center',3,lin(t,N(75),N(75)+.3),14);txt('LES ENTREPRISES',0,-h/2+390,'84px Anton',INK,'center',3,lin(t,N(75)+.3,N(75)+.6));
    if(t>=N(76))stampAt('CONTRE LES PIRATES COMME LUI',0,h/2-110,50,t,N(76)+.2,-.06);}
  else if(c.k==='q'){framePaper(w,h,'rgba(40,43,40,.9)');txt('ET TOI, T’EN PENSES QUOI ?',0,-h/2+110,'64px Anton',INK,'center',2);
    [['GÉNIE ?',N(78),GREEN],['ESCROC ?',N(79),PINK]].forEach(([s,t0,col],i)=>{if(t<t0-.05)return;const x=(i-.5)*420;const p=eo(lin(t,t0-.05,t0+.2));ctx.save();ctx.translate(x,-20);ctx.scale(.8+.2*p,.8+.2*p);ctx.globalAlpha*=p;
      ctx.strokeStyle=col;ctx.lineWidth=6;ctx.strokeRect(-180,-110,360,220);txt(s,0,30,'96px Anton',col,'center',2,1,16);ctx.restore();});
    txt('DIS-LE EN COMMENTAIRE ↓',0,h/2-80,'700 40px Mono',AMB,'center',3,lin(t,N(77),N(77)+.3));}
  if(c.k!=='p2')laminate(w,h);
  if(c.k!=='matrix'){pin(0,-h/2+18);tape(-w/2+40,-h/2+10,140,-.6);}
  ctx.restore();
}
function outroCredits(t){const c=C[cOutro];ctx.save();ctx.translate(c.x,c.y+c.h/2+120);[['Sources : Associated Press (1999) · Haaretz (2001) · Wired 12.02 « Three Blind Phreaks »',0],['Images : Nizzan Cohen, Wilfredor, Eddau, David Shay, Yagasi (Wikimedia) · Matson Collection',40],['Voix et dialogues en hébreu : reconstitution générée · Musique : « Hitman », K. MacLeod · CC BY 4.0',80]].forEach(([s,y])=>txt(s,0,y,'400 20px Mono','rgba(236,238,230,.75)','center'));ctx.restore();}

// ---------- sous-titres courts (3 mots max)
const CHUNKS=[];SEGS.forEach(s=>{const ws=s.txt.split(' ');const tot=ws.reduce((a,w)=>a+w.length+1,0);let acc=0;const dur=s.t1-s.t0;const wt=ws.map(w=>{const tt=s.t0+dur*acc/tot;acc+=w.length+1;return[w,tt];});
  for(let i=0;i<wt.length;){let n=Math.min(3,wt.length-i);if(n==3&&wt[i+1][0].length+wt[i][0].length+wt[i+2][0].length>18)n=2;CHUNKS.push({m:s.m,txt:wt.slice(i,i+n).map(x=>x[0]).join(' ').toUpperCase(),t:wt[i][1]});i+=n;}});
CHUNKS.forEach((c,i)=>{c.e=i<CHUNKS.length-1?Math.min(CHUNKS[i+1].t,c.t+1.6):c.t+1.2;});
function subs2(t){const c=CHUNKS.find(c=>t>=c.t-.03&&t<c.e);if(!c)return;const p=eo(lin(t,c.t-.03,c.t+.08));
  ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.translate(540,1330);ctx.scale(.9+.1*p,.9+.1*p);ctx.globalAlpha=p;ctx.font='76px Anton';ctx.textAlign='center';ctx.letterSpacing='1px';
  const w=ctx.measureText(c.txt).width;ctx.fillStyle='rgba(90,96,90,.45)';ctx.fillRect(-w/2-26,-74,w+52,96);ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=2;ctx.strokeRect(-w/2-26,-74,w+52,96);ctx.shadowColor='rgba(255,255,255,.5)';ctx.shadowBlur=14;ctx.fillStyle=c.m?'#FFC24A':'#f4f1e6';ctx.fillText(c.txt,0,0);ctx.restore();}

// ---------- sons
ev(.05,'thud');ev(TCOV-.1,'whoosh');
KEYS.forEach(k=>{if(k.t>TCOV+.1&&k.t<1e8)ev(k.t-.5,'whoosh');});
C.forEach((c,i)=>{if(i>0&&!c.off)ev(c.t0-.05,'click');});
reveal(N(10),1.1);ev(N(12)+.5,'whoosh');ev(N(15)+.3,'thud');ev(N(21)+.45,'zap');reveal(N(22),1.3);
reveal(N(25),1);ev(N(27)+.8,'thud');reveal(N(30),1.1);ev(N(32)+.1,'tick');reveal(N(34),1.2);ev(N(37)+1.2,'thud');ev(N(38)+.1,'tick');ev(N(40),'thud');
[N(43),N(44),N(45)+.2].forEach(x=>ev(x,'thud'));reveal(N(46),1.1);reveal(N(50),1.3);ev(N(53)+.5,'thud');reveal(N(54),1);ev(N(56)+.2,'thud');
ev(N(59)+.3,'thud');ev(N(60),'thud');[N(62),N(64),N(66)].forEach(x=>ev(x,'thud'));reveal(N(69),1.1);ev(N(70)-.6,'riser');reveal(N(72),1.2);
[N(73)-.2,N(73)+.2,N(73)+.6].forEach(x=>ev(x,'type'));ev(N(76)+.2,'thud');ev(N(78),'type');ev(N(79),'type');ev(VEND+.35,'boom');

EV.splice(0,EV.length,...EV.filter(e=>e[0]<DUR));
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
  ctx.save();toWorld();drawWall();drawClutter();drawThreads(t);C.forEach(c=>{if(!c.off)drawCard(c,t);});outroCredits(t);ctx.restore();ctx.setTransform(1,0,0,1,0,0);
  if(st.speed>22){const m=MBC.getContext('2d');m.clearRect(0,0,W,H);m.drawImage(cv,0,0);ctx.save();ctx.globalAlpha=.3;const dx=-Math.cos(st.dir)*Math.min(st.speed,90)*.45,dy=-Math.sin(st.dir)*Math.min(st.speed,90)*.45;ctx.drawImage(MBC,dx,dy);ctx.drawImage(MBC,dx*.5,dy*.5);ctx.restore();}
  if(t>=TCOV&&t<VEND)subs2(t);
  post2(t);flash(t);
};
