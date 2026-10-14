// ================= LE DOSSIER #05 « TOMBER MALADE VA TE COÛTER » — mur d'enquêteur =================
const T=Object.fromEntries(SEGS.map((s,i)=>[i,s.t0]));
const TE=Object.fromEntries(SEGS.map((s,i)=>[i,s.t1]));
const GREEN='#A9C79A',INKD='#1b1c1a',PINK='#c9302c',PAPERC='rgba(222,219,206,.95)';
const TCOV=3.0;

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
const cEnq=add({k:'note',text:'ENQUÊTE · BUDGET 2027',stamp:'CONFIDENTIEL',w:700,h:440,rot:-2,t0:T[1]});
const cAN=add({k:'clip',full:1,img:'an2',gray:1,handle:'PanierAvide · CC BY-SA 4.0',badge:'ASSEMBLÉE NATIONALE',w:620,h:1100,rot:2,t0:T[2]});
const cDoc=add({k:'doc',w:860,h:1040,rot:-1.5,t0:T[3]});
const cSarah=add({k:'sarah',w:940,h:640,rot:1.5,t0:T[5]});
const cCT=add({k:'clip',full:1,img:'ct',gray:1,handle:'Jmarchn · CC0',badge:'SCANNER · IMAGE D’ILLUSTRATION',w:900,h:900,rot:-2,t0:T[6],
  after:(w,h,t)=>{handCircle(t,T[6]+2.05,w*.15,-h/2+25+(h-170)*.47,95,85,7);}});
const cForm=add({k:'form',w:820,h:900,rot:2.5,t0:T[7]});
const cHosp=add({k:'clip',full:1,clip:'hosp',handle:'Fabiovieiramd · CC BY-SA 4.0',badge:'IMAGES D’ILLUSTRATION',w:620,h:1100,rot:-1.5,t0:T[8]});
const cCSG=add({k:'csg',w:900,h:620,rot:1.5,t0:T[9]});
const cRate=add({k:'rate',w:900,h:760,rot:-2,t0:T[10]});
const cPlus=add({k:'plus',w:900,h:620,rot:2,t0:T[12]+.9});
const cDebut=add({k:'title',lines:['CE N’EST QUE','LE DÉBUT.'],red:0,w:900,h:560,rot:-1.5,t0:T[13]});
const cPet=add({k:'clip',full:1,clip:'pet',handle:'Jmarchn · CC0',badge:'AFFECTION DE LONGUE DURÉE',badgeRed:1,w:900,h:820,rot:1.5,t0:T[14]});
const cLaw=add({k:'law',w:880,h:980,rot:-2,t0:T[15]});
const cWorker=add({k:'clip',full:1,img:'worker',gray:1,handle:'P. Keheler · CC BY 2.0',badge:'IMAGE D’ILLUSTRATION',w:640,h:1060,rot:2.5,t0:T[17]});
const cATMP=add({k:'atmp',w:920,h:720,rot:-1.5,t0:T[18]});
const cMd=add({k:'md',w:940,h:640,rot:2,t0:T[20]});
const cOff=add({k:'off',w:880,h:760,rot:-2,t0:T[21]});
const cQ=add({k:'title',lines:['POURQUOI','C’EST À SARAH ?'],red:1,w:960,h:600,rot:1.5,t0:T[23]+.25});
const cAmend=add({k:'amend',w:900,h:700,rot:-2,t0:T[25]});
const cNon=add({k:'non',w:860,h:600,rot:2,t0:T[26]});
const cBanc=add({k:'clip',full:1,img:'an1',gray:1,handle:'Sunala · CC BY-SA 3.0',badge:'TEXTE DU GOUVERNEMENT',badgeRed:1,w:900,h:860,rot:-1.5,t0:T[28]});
const cCal=add({k:'cal',w:820,h:620,rot:2,t0:T[29]});
const cSenat=add({k:'clip',img:'senat',gray:1,handle:'Tangopaso · dom. public',badge:'SÉNAT',w:900,h:820,rot:-2,t0:T[30],
  after:(w,h,t)=>{stampAt('PEUT TOUT REMETTRE',0,-60,64,t,T[30]+.9,-.08);}});
const cToi=add({k:'toi',w:960,h:640,rot:1.5,t0:T[31]+.75});
const cPeople=add({k:'people',w:940,h:900,rot:-1.5,t0:T[32]});
const cVote=add({k:'clip',full:1,img:'vote',gray:1,handle:'Baidax · CC BY-SA 4.0',badge:'QUI VOTE QUOI ?',badgeRed:1,w:620,h:1100,rot:2,t0:T[33]});
const cMirror=add({k:'mirror',w:940,h:660,rot:-1.5,t0:T[34]});
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
KEYS.push(WIDE(TCOV+.65,[cCover,cEnq]));
KEYS.push(WIDE(T[31]-.35,[...C.keys()].filter(i=>i!==cOutro&&i!==cToi&&i!==cPeople&&i!==cVote&&i!==cMirror)));
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
const CLUT=[];{const r=rng(55);const ims=['ct','senat','an2','bed'];for(let i=0;i<90;i++){const k=r();CLUT.push({x:-1300+r()*6200,y:-1300+r()*12500,rot:(r()-.5)*.5,kind:k<.45?'post':k<.75?'photo':'clip',im:ims[Math.floor(r()*4)],w:k<.45?220:260,h:k<.45?220:190,lines:2+Math.floor(r()*4),col:r()});}}
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

function drawCard(c,t){
  ctx.save();ctx.translate(c.x,c.y);ctx.rotate(c.rot*Math.PI/180);
  const w=c.w,h=c.h;
  if(c.k==='cover'){const im=IM.cover;framePaper(w+40,h+40,'rgba(230,232,224,.9)');if(im){ctx.filter='grayscale(.85) contrast(1.1)';ctx.drawImage(im,-w/2,-h/2,w,h);ctx.filter='none';}
    const g=ctx.createLinearGradient(0,-h/2,0,h/2);g.addColorStop(0,'rgba(0,0,0,.6)');g.addColorStop(.45,'rgba(0,0,0,.08)');g.addColorStop(1,'rgba(0,0,0,.55)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,h);
    txt('LE DOSSIER #05',0,-h/2+540,'700 34px Mono',INK,'center',12);txt('MALADE ?',0,-h/2+720,'150px Anton',INK,'center',4,1,24);txt('TAXÉ.',0,-h/2+990,'230px Anton',RED,'center',6,1,30);}
  else if(c.k==='outro'){framePaper(w,h);txt('LE DOSSIER',0,-170,'120px Anton',INK,'center',4,1,24);txt('#05',0,40,'220px Anton',PINK,'center',4,1,24);txt('LA FERME',0,140,'700 34px Mono','rgba(236,238,230,.6)','center',12);
    txt('ABONNE-TOI',0,260,'70px Anton',INK,'center',4,1,16);}
  else if(c.k==='clip'){framePaper(w,h,'rgba(230,232,224,.88)');const fr=c.img?[IM[c.img]]:((window.CLIPS&&CLIPS[c.clip])||[]);const im=fr[Math.min(fr.length-1,Math.max(0,Math.floor((t-c.t0+.3)*30)))];const pw=w-50,ph=h-170;
    ctx.fillStyle='#000';ctx.fillRect(-pw/2,-h/2+25,pw,ph);if(im){ctx.save();ctx.beginPath();ctx.rect(-pw/2,-h/2+25,pw,ph);ctx.clip();const age=Math.max(0,t-c.t0);const s=Math.max(pw/im.width,ph/im.height)*(1.04+age*.012);ctx.filter=c.gray?(c.img==='vote'?'grayscale(1) brightness(1.45) contrast(1.1)':'grayscale(1) contrast(1.12)'):'saturate(.55) contrast(1.05)';ctx.drawImage(im,-im.width*s/2,-h/2+25+ph/2-im.height*s/2,im.width*s,im.height*s);ctx.restore();}
    if(c.after){ctx.save();c.after(w,h,t);ctx.restore();}
    txt(c.handle,-w/2+30,h/2-85,'700 30px Mono','#1b1c1a','left',1);
    if(c.badge){const bc=c.badgeRed?PINK:'rgba(20,20,20,.85)';ctx.font='700 30px Mono';const bw=ctx.measureText(c.badge).width+36;ctx.fillStyle=bc;ctx.fillRect(-bw/2,h/2-58,bw,44);txt(c.badge,0,h/2-26,'700 30px Mono','#fff','center',2);}}
  else if(c.k==='title'){framePaper(w,h);const big=120;c.lines.forEach((l,i)=>txt(l,0,-((c.lines.length-1)*big*.55)+i*big*1.1+big*.35,big+'px Anton',c.red&&i==1?PINK:INK,'center',2));}
  else if(c.k==='note'){framePaper(w,h,'rgba(70,72,58,.6)');txt(c.text,0,-30,(c.text.length>20?'58px':'72px')+' Anton',INK,'center',1);stampAt(c.stamp,0,110,58,t,c.t0+.6,-.08);}
  else if(c.k==='doc'){framePaper(w,h,PAPERC);txt('PROJET DE LOI DE FINANCES POUR 2027',0,-h/2+80,'700 28px Mono','rgba(27,28,26,.75)','center',2);txt('PREMIÈRE PARTIE · CONDITIONS GÉNÉRALES',0,-h/2+124,'400 22px Mono','rgba(27,28,26,.55)','center',2);
    inkLines(-w/2+60,-h/2+180,w-120,4,40,3);txt('Article 2',-w/2+60,-h/2+400,'72px Anton',INKD,'left',1);
    if(t>=T[4]-.1)handCircle(t,T[4]-.1,-w/2+190,-h/2+372,170,62,4);
    inkLines(-w/2+60,-h/2+450,w-120,3,40,8);
    // la ligne que personne ne lit (surlignée)
    const ly=-h/2+600;const hp=eo(lin(t,T[3]+1.1,T[3]+1.7));ctx.fillStyle='rgba(255,178,30,.55)';ctx.fillRect(-w/2+50,ly-34,(w-100)*hp,48);
    txt('… le taux de 6,2 % est porté à 9,2 % …',-w/2+60,ly,'700 30px Mono',INKD,'left',0);
    inkLines(-w/2+60,ly+60,w-120,5,40,13);txt('Source : PLF 2027, art. 2',w/2-30,h/2-24,'400 22px Mono','rgba(27,28,26,.55)','right');}
  else if(c.k==='sarah'){framePaper(w,h);ctx.fillStyle='rgba(20,22,20,.55)';ctx.fillRect(-w/2+30,-h/2+30,300,h-60);person(-w/2+180,-10,1.6,'rgba(236,238,230,.42)');
    field(-w/2+360,-h/2+130,w-390,'PRÉNOM','SARAH',t,c.t0+.15);field(-w/2+360,-h/2+230,w-390,'ÂGE','34 ANS',t,c.t0+.75);field(-w/2+360,-h/2+330,w-390,'MÉTIER','CAISSIÈRE',t,c.t0+1.35);
    stampAt('EXEMPLE FICTIF',w/2-250,h/2-90,46,t,c.t0+.4,-.06,'#d79a1e');}
  else if(c.k==='form'){framePaper(w,h,PAPERC);txt('AVIS D’ARRÊT DE TRAVAIL',0,-h/2+100,'60px Anton',INKD,'center',1);txt('volet 3 · employeur',0,-h/2+148,'400 24px Mono','rgba(27,28,26,.55)','center');
    field(-w/2+40,-h/2+270,w-80,'ASSURÉE','SARAH ███',t,c.t0+.1,1);field(-w/2+40,-h/2+370,w-80,'MOTIF','ALD',t,c.t0+.25,1);field(-w/2+40,-h/2+470,w-80,'DURÉE','6 MOIS',t,c.t0+.4,1);
    inkLines(-w/2+50,-h/2+560,w-100,4,38,21);stampAt('6 MOIS',w/2-210,h/2-110,80,t,c.t0+.5,-.12);txt('reconstitution',-w/2+30,h/2-24,'italic 400 22px Mono','rgba(27,28,26,.5)','left');}
  else if(c.k==='csg'){framePaper(w,h,'rgba(40,43,40,.9)');txt('PRÉLEVÉ SUR TES INDEMNITÉS',0,-h/2+80,'700 30px Mono','rgba(236,238,230,.7)','center',4);
    ctx.save();ctx.translate(0,-30);tiles(t,'UNE TAXE',0,0,{t0:c.t0+1.6,step:.05,h:96,gap:6});ctx.restore();ctx.save();ctx.translate(0,140);tiles(t,'LA CSG',0,0,{t0:c.t0+2.75,step:.06,h:120,gap:8,hot:[3,4,5],hotT:c.t0+3.2});ctx.restore();}
  else if(c.k==='rate'){framePaper(w,h);txt('TAUX DE CSG · ARRÊT MALADIE',0,-h/2+80,'700 30px Mono','rgba(236,238,230,.7)','center',4);
    const sw=t>=T[11]+.85;const p=eo(lin(t,T[11]+.85,T[11]+1.25));
    txt('6,2 %',0,-40+p*-90,(220-p*110)+'px Anton',sw?'rgba(236,238,230,.55)':INK,'center',2,1,sw?0:16);
    if(sw){ctx.save();ctx.strokeStyle=PINK;ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(-170,-170);ctx.lineTo(170,-110);ctx.stroke();ctx.restore();
      txt('9,2 %',0,170,'240px Anton',PINK,'center',2,p,22);}
    txt('Source : PLF 2027, art. 2 · Selectra, 9 oct. 2026',w/2-24,h/2-18,'400 22px Mono','rgba(236,238,230,.62)','right');}
  else if(c.k==='plus'){framePaper(w,h);txt('+3 POINTS',0,-20,'190px Anton',PINK,'center',2,eo(lin(t,c.t0,c.t0+.3)),20);
    txt('SUR DES GENS QUI NE PEUVENT',0,110,'700 34px Mono',INK,'center',2,lin(t,TE[12]-1.6,TE[12]-1.3));txt('PAS TRAVAILLER.',0,160,'700 34px Mono',INK,'center',2,lin(t,TE[12]-1,TE[12]-.7));}
  else if(c.k==='law'){framePaper(w,h,PAPERC);txt('CODE GÉNÉRAL DES IMPÔTS',0,-h/2+90,'700 30px Mono','rgba(27,28,26,.75)','center',3);txt('Article 80 quinquies',0,-h/2+170,'64px Anton',INKD,'center',1);
    inkLines(-w/2+60,-h/2+230,w-120,3,40,31);txt('Indemnités · affection de longue durée :',-w/2+60,-h/2+420,'700 28px Mono',INKD,'left');
    txt('EXONÉRÉES',0,-h/2+560,'120px Anton','#2f5d34','center',2);txt('D’IMPÔT',0,-h/2+680,'90px Anton','#2f5d34','center',2);
    const tx=T[16]+1.1;if(t>=tx){ctx.save();ctx.strokeStyle=PINK;ctx.lineWidth=16;ctx.lineCap='round';[[-340,-h/2+440,340,-h/2+720,0],[340,-h/2+440,-340,-h/2+720,.12]].forEach(([a,b,c2,d,dl])=>{const p=eo(lin(t,tx+dl,tx+dl+.15));ctx.beginPath();ctx.moveTo(a,b);ctx.lineTo(a+(c2-a)*p,b+(d-b)*p);ctx.stroke();});ctx.restore();
      stampAt('PLF 2027 : 50 % IMPOSABLE',0,h/2-130,60,t,tx+.35,-.07);}}
  else if(c.k==='atmp'){framePaper(w,h);txt('ACCIDENT DU TRAVAIL',0,-h/2+90,'76px Anton',INK,'center',2);txt('MALADIE PROFESSIONNELLE',0,-h/2+150,'700 30px Mono','rgba(236,238,230,.7)','center',4);
    const bar=(y,lab,frac,col,t0)=>{if(t<t0)return;const p=eo(lin(t,t0,t0+.6));txt(lab,-w/2+50,y-20,'700 32px Mono','rgba(236,238,230,.75)','left',3);ctx.fillStyle='rgba(128,134,126,.25)';ctx.fillRect(-w/2+50,y,w-100,80);ctx.fillStyle=col;ctx.fillRect(-w/2+50,y,(w-100)*frac*p,80);
      txt(Math.round(frac*100*p)+' % IMPOSÉ',w/2-70,y+58,'52px Anton',INK,'right',1);};
    bar(-40,'AUJOURD’HUI',.5,'rgba(236,238,230,.45)',T[18]+2.3);bar(170,'DEMAIN',1,PINK,T[19]+.6);srcLine('Source : PLF 2027, art. 2',w,h);}
  else if(c.k==='md'){framePaper(w,h);const v=Math.round(990*eo(lin(t,c.t0+.2,c.t0+1.6)));txt(v+' M€',0,-40,'190px Anton',INK,'center',2,1,14);
    txt('≈ 1 MILLIARD',0,60,'64px Anton',PINK,'center',4,lin(t,c.t0+1.6,c.t0+1.9));txt('PRIS DANS LA POCHE DES MALADES',0,140,'700 32px Mono','rgba(236,238,230,.8)','center',3,lin(t,T[20]+2.2,T[20]+2.5));
    srcLine('PLF 2027 : 540 M€ (CSG) + 450 M€ (ALD) en 2027',w,h);}
  else if(c.k==='off'){framePaper(w,h);txt('OFFICIELLEMENT',0,-h/2+90,'700 34px Mono','rgba(236,238,230,.7)','center',8);txt('LE TROU DE LA SÉCU',0,-h/2+200,'86px Anton',INK,'center',2);
    txt('−1,5 Md€',0,30,'190px Anton',INK,'center',2,lin(t,T[21]+3,T[21]+3.4),14);txt('branche accidents du travail · prévision 2027',0,110,'400 28px Mono','rgba(236,238,230,.75)','center',0,lin(t,T[21]+3,T[21]+3.4));
    stampAt('VRAI.',w/2-170,h/2-110,90,t,T[22],-.12,GREEN);srcLine('Source : PLF 2027 (exposé des motifs)',w,h);}
  else if(c.k==='amend'){framePaper(w,h);txt('COMMISSION DES FINANCES',0,-h/2+90,'700 32px Mono','rgba(236,238,230,.75)','center',4);txt('7 OCTOBRE 2026',0,-h/2+200,'96px Anton',INK,'center',2);
    field(-w/2+40,-h/2+330,w-80,'AMENDEMENT','I-CF384',t,c.t0+.6);field(-w/2+40,-h/2+430,w-80,'OBJET','CSG + IMPÔT MALADES',t,c.t0+1);
    stampAt('TOUT SUPPRIMÉ',0,h/2-90,76,t,c.t0+2.4,-.07,GREEN);}
  else if(c.k==='non'){framePaper(w,h);txt('FIN DE',0,-90,'110px Anton',INK,'center',2);txt('L’HISTOIRE ?',0,30,'110px Anton',INK,'center',2);stampAt('NON.',0,170,150,t,T[27]-.05,-.14);}
  else if(c.k==='cal'){framePaper(w,h,PAPERC);txt('OCTOBRE 2026',0,-h/2+90,'700 34px Mono','rgba(27,28,26,.7)','center',6);txt('MARDI 20',0,30,'150px Anton',INKD,'center',2);
    txt('VOTE SOLENNEL · ASSEMBLÉE',0,120,'700 30px Mono','rgba(27,28,26,.75)','center',3);handCircle(t,c.t0+.7,0,-25,330,120,9);srcLine('',w,h);}
  else if(c.k==='toi'){framePaper(w,h);txt('TOI,',0,-120,'110px Anton',INK,'center',2);txt('TU N’ES PAS MALADE.',0,0,'100px Anton',INK,'center',2);stampAt('PAS ENCORE.',0,170,96,t,T[31]+1.4,-.08);}
  else if(c.k==='people'){framePaper(w,h);const v=Math.round(15000000*eo(lin(t,c.t0+.6,c.t0+2.2)));txt(v.toLocaleString('fr-FR'),0,-h/2+190,'150px Anton',INK,'center',2,1,14);
    txt('VIVENT AVEC UNE MALADIE DE LONGUE DURÉE',0,-h/2+250,'700 26px Mono','rgba(236,238,230,.75)','center',2);
    for(let k=0;k<10;k++){const x=(k%5-2)*160,y=k<5?40:270;const hot=(k===2||k===7)&&t>=T[32]+4.3;ctx.save();ctx.globalAlpha*=lin(t,c.t0+.8+k*.06,c.t0+1+k*.06);person(x,y+60,.7,hot?PINK:'rgba(236,238,230,.3)');ctx.restore();}
    if(t>=T[32]+4.3)txt('PLUS D’1 SUR 5',0,h/2-60,'70px Anton',PINK,'center',2,lin(t,T[32]+4.3,T[32]+4.5));srcLine('Source : Drees, 7 oct. 2026',w,h);}
  else if(c.k==='mirror'){framePaper(w,h);ctx.fillStyle='rgba(20,22,20,.55)';ctx.fillRect(-w/2+30,-h/2+30,300,h-60);person(-w/2+180,-10,1.6,'rgba(236,238,230,.3)');txt('?',-w/2+180,-150,'140px Anton',INK,'center',0,1,20);
    field(-w/2+360,-h/2+130,w-390,'PRÉNOM','?',t,c.t0+.2);field(-w/2+360,-h/2+230,w-390,'ÂGE','?',t,c.t0+.5);field(-w/2+360,-h/2+330,w-390,'DOSSIER','LE PROCHAIN',t,c.t0+.8);
    stampAt('TOI.',w/2-200,h/2-110,120,t,T[34]+1.95,-.12);}
  laminate(w,h);
  if(c.k!=='cover'){pin(0,-h/2+18);tape(-w/2+40,-h/2+10,140,-.6);}else{pin(0,-h/2+10);}
  ctx.restore();
}
function outroCredits(t){const c=C[cOutro];ctx.save();ctx.translate(c.x,c.y+c.h/2+120);[['Sources : PLF 2027 art. 2 · Légifiscal · Selectra · Drees',0],['Images : Wikimedia Commons — PanierAvide, Sunala, Baidax, Tangopaso,',46],['Jmarchn, Fabiovieiramd, P. Keheler · Sarah = exemple fictif',92],['Musique : « Hitman », Kevin MacLeod · CC BY 4.0',138]].forEach(([s,y])=>txt(s,0,y,'400 21px Mono','rgba(236,238,230,.75)','center'));ctx.restore();}

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
ev(T[4]-.1,'thud');reveal(T[6]+2.05,1.3);ev(T[7]+.5,'thud');
tileSounds('UNE TAXE',T[9]+1.6,.05);tileSounds('LA CSG',T[9]+2.75,.06);reveal(T[11]+.85,1);ev(T[12],'thud');reveal(T[13],1);
reveal(T[16]+1.1,1.1);ev(T[19]-1,'riser');reveal(T[19]+.6,1.2);ev(T[20]+1.6,'thud');ev(T[22],'thud');
ev(T[25]+2.4,'thud');reveal(T[27]-.05,1.3);ev(T[29]+.7,'tick');ev(T[30]+.9,'thud');ev(T[31]+1.4,'thud');reveal(T[32]+4.3,1);ev(T[34]-1,'riser');reveal(T[34]+1.95,1.4);ev(VEND+.35,'boom');

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
