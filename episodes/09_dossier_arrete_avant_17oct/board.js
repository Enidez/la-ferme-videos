// ================= LE DOSSIER « ARRÊTÉ AVANT. » (17/10/2026) — mur d'enquêteur =================
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
const cGare=add({k:'clip',full:1,clip:'gdn',handle:'Quahadi · CC BY-SA 4.0',badge:'RECONSTITUTION',badgeRed:1,w:620,h:1100,rot:2,t0:T[3]+.7});
const cFlic=add({k:'clip',full:1,clip:'police',handle:'H. Germain · CC0',badge:'IMAGES D’ARCHIVE · 2019',w:620,h:1100,rot:-2,t0:T[4]});
const cRien=add({k:'rien',w:900,h:640,rot:1.5,t0:T[5]});
const cCtrl=add({k:'cnt',to:1046,label:'CONTRÔLES « PRÉVENTIFS »',sub:'PARIS · 17 OCT. · À 15 H',src:'Préfecture de police, via franceinfo',w:900,h:600,rot:-1.5,t0:T[8]});
const cInt=add({k:'cnt',to:133,label:'INTERPELLATIONS',sub:'AVANT LA FIN DU CORTÈGE',src:'Préfecture de police, via franceinfo (15 h 22)',w:880,h:600,rot:2,t0:T[10]});
const cMotif=add({k:'motif',w:940,h:640,rot:-2,t0:T[12]});
const cLoi=add({k:'loi',w:880,h:1000,rot:1.5,t0:T[14]+.5});
const cFaire=add({k:'faire',w:960,h:700,rot:-1.5,t0:T[16]});
const cIndices=add({k:'indices',w:900,h:820,rot:2,t0:T[20]});
const cP06=add({k:'clip',full:1,img:'p06',gray:1,keep:1,handle:'O. Ortelpa · CC BY 2.0',badge:'IMAGES D’ARCHIVE · 2018',w:960,h:820,rot:-2,t0:T[23]});
const cCglpl=add({k:'cglpl',w:920,h:860,rot:1.5,t0:T[24]});
const cNo=add({k:'no',w:860,h:560,rot:-2,t0:T[28]});
const c24=add({k:'h24',w:880,h:700,rot:2,t0:T[30]});
const cCasse=add({k:'casse',w:920,h:760,rot:-1.5,t0:T[31]});
const cQuote=add({k:'quote',w:960,h:640,rot:1.5,t0:T[36]});
const cQ=add({k:'title',lines:['LA VRAIE','QUESTION.'],red:1,w:860,h:560,rot:-2,t0:T[38]});
const cVs=add({k:'vs',w:980,h:860,rot:1.5,t0:T[39]});
const cToi=add({k:'clip',full:1,img:'cover',gray:1,keep:1,handle:'O. Ortelpa · CC BY 2.0',badge:'TOI ?',badgeRed:1,w:620,h:1100,rot:-2,t0:T[43]+.45,
  after:(w,h,t)=>{stampAt('LE TIEN.',0,40,110,t,T[43]+1.6,-.12);}});
const cFin=add({k:'fin',w:940,h:760,rot:2,t0:T[44]+.3});
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
KEYS.push(WIDE(TCOV+.25,[cCover,cGare]));
KEYS.push(WIDE(T[38]+.9,[...C.keys()].filter(i=>i!==cOutro&&i!==cVs&&i!==cToi&&i!==cFin)));
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
const CLUT=[];{const r=rng(55);const ims=['foule','lacrymo','pancarte','p05'];for(let i=0;i<90;i++){const k=r();CLUT.push({x:-1300+r()*6200,y:-1300+r()*12500,rot:(r()-.5)*.5,kind:k<.45?'post':k<.75?'photo':'clip',im:ims[Math.floor(r()*4)],w:k<.45?220:260,h:k<.45?220:190,lines:2+Math.floor(r()*4),col:r()});}}
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
  if(c.k==='cover'){const im=IM.cover;framePaper(w+40,h+40,'rgba(230,232,224,.9)');if(im){ctx.filter='contrast(1.1)';ctx.drawImage(im,-w/2,-h/2,w,h);ctx.filter='none';}
    const g=ctx.createLinearGradient(0,-h/2,0,h/2);g.addColorStop(0,'rgba(0,0,0,.7)');g.addColorStop(.45,'rgba(0,0,0,.1)');g.addColorStop(1,'rgba(0,0,0,.55)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,h);
    txt('SAMEDI 17 OCTOBRE',0,-h/2+520,'700 34px Mono',INK,'center',12);txt('ARRÊTÉ',0,-h/2+700,'180px Anton',INK,'center',6,1,24);txt('AVANT.',0,-h/2+960,'220px Anton',RED,'center',8,1,30);
    txt('PHOTO D’ARCHIVE · 2018',0,h/2-500,'400 24px Mono','rgba(236,238,230,.7)','center',4);}
  else if(c.k==='outro'){framePaper(w,h);txt('LE DOSSIER',0,-170,'120px Anton',INK,'center',4,1,24);txt('17.10',0,40,'200px Anton',PINK,'center',4,1,24);txt('LA FERME',0,140,'700 34px Mono','rgba(236,238,230,.6)','center',12);
    txt('ABONNE-TOI',0,260,'70px Anton',INK,'center',4,1,16);}
  else if(c.k==='clip'){framePaper(w,h,'rgba(230,232,224,.88)');const fr=c.img?[IM[c.img]]:((window.CLIPS&&CLIPS[c.clip])||[]);const im=fr[Math.min(fr.length-1,Math.max(0,Math.floor((t-c.t0+.3)*30)))];const pw=w-50,ph=h-170;
    ctx.fillStyle='#000';ctx.fillRect(-pw/2,-h/2+25,pw,ph);if(im){ctx.save();ctx.beginPath();ctx.rect(-pw/2,-h/2+25,pw,ph);ctx.clip();const age=Math.max(0,t-c.t0);const s=Math.max(pw/im.width,ph/im.height)*(1.04+age*.012);ctx.filter=c.keep?'saturate(.75) contrast(1.1)':c.gray?'grayscale(1) contrast(1.12)':'saturate(.55) contrast(1.05)';ctx.drawImage(im,-im.width*s/2,-h/2+25+ph/2-im.height*s/2,im.width*s,im.height*s);ctx.restore();}
    if(c.after){ctx.save();c.after(w,h,t);ctx.restore();}
    txt(c.handle,-w/2+30,h/2-85,'700 30px Mono','#1b1c1a','left',1);
    if(c.badge){const bc=c.badgeRed?PINK:'rgba(20,20,20,.85)';ctx.font='700 30px Mono';const bw=ctx.measureText(c.badge).width+36;ctx.fillStyle=bc;ctx.fillRect(-bw/2,h/2-58,bw,44);txt(c.badge,0,h/2-26,'700 30px Mono','#fff','center',2);}}
  else if(c.k==='title'){framePaper(w,h);const big=120;c.lines.forEach((l,i)=>txt(l,0,-((c.lines.length-1)*big*.55)+i*big*1.1+big*.35,big+'px Anton',c.red&&i==1?PINK:INK,'center',2));}
  else if(c.k==='rien'){framePaper(w,h);txt('TU N’AS',0,-110,'120px Anton',INK,'center',2);txt('RIEN FAIT.',0,30,'120px Anton',INK,'center',2);stampAt('GARDE À VUE',0,190,80,t,T[6]+1.2,-.1);}
  else if(c.k==='cnt'){framePaper(w,h);const v=Math.round(c.to*eo(lin(t,c.t0+.15,c.t0+1.4)));txt(v.toLocaleString('fr-FR'),0,-30,'200px Anton',INK,'center',2,1,14);
    txt(c.label,0,60,'700 38px Mono',INK,'center',4);txt(c.sub,0,120,'700 28px Mono','rgba(236,238,230,.6)','center',4);srcLine('Source : '+c.src,w,h);}
  else if(c.k==='motif'){framePaper(w,h,'rgba(40,43,40,.9)');txt('MOTIF D’INTERPELLATION',0,-h/2+80,'700 30px Mono','rgba(236,238,230,.7)','center',6);
    ctx.save();ctx.translate(0,-60);tiles(t,'GROUPEMENT',0,0,{t0:T[13]-.05,step:.05,h:110,gap:7,hot:[0,1,2,3,4,5,6,7,8,9],hotT:T[13]+1.2});ctx.restore();
    txt('EN VUE DE COMMETTRE',0,110,'700 40px Mono',INK,'center',3,lin(t,T[13]+.6,T[13]+.9));txt('DES VIOLENCES',0,170,'700 40px Mono',INK,'center',3,lin(t,T[13]+1,T[13]+1.3));}
  else if(c.k==='loi'){framePaper(w,h,PAPERC);txt('CODE PÉNAL',0,-h/2+90,'700 32px Mono','rgba(27,28,26,.75)','center',6);txt('Article 222-14-2',0,-h/2+180,'72px Anton',INKD,'center',1);
    const L=['« Le fait pour une personne de participer','sciemment à un groupement, même formé','de façon temporaire, en vue de la','préparation […] de violences volontaires','contre les personnes ou de destructions','ou dégradations de biens est puni d’un an','d’emprisonnement et de 15 000 € d’amende. »'];
    L.forEach((s,i)=>txt(s,-w/2+50,-h/2+290+i*58,'400 28px Mono',INKD,'left',0));
    if(t>=T[14]+1.2){const p=eo(lin(t,T[14]+1.2,T[14]+1.6));ctx.fillStyle='rgba(255,178,30,.5)';ctx.fillRect(-w/2+44,-h/2+290+2*58-38,250*p,48);}
    stampAt('LOI DU 2 MARS 2010',0,h/2-110,62,t,T[15]+.1,-.07);}
  else if(c.k==='faire'){framePaper(w,h);txt('ON T’ARRÊTE POUR…',0,-h/2+90,'700 32px Mono','rgba(236,238,230,.7)','center',6);
    txt('CE QUE TU AS FAIT',0,-70,'84px Anton','rgba(236,238,230,.85)','center',2);
    const tx=T[18]+.2;if(t>=tx){ctx.save();ctx.strokeStyle=PINK;ctx.lineWidth=14;ctx.lineCap='round';const p=eo(lin(t,tx,tx+.25));ctx.beginPath();ctx.moveTo(-380,-95);ctx.lineTo(-380+760*p,-95+10*p);ctx.stroke();ctx.restore();}
    txt('CE QUE TU',0,90,'110px Anton',PINK,'center',2,lin(t,T[17],T[17]+.25),20);txt('POURRAIS FAIRE',0,210,'110px Anton',PINK,'center',2,lin(t,T[17]+.2,T[17]+.45),20);}
  else if(c.k==='indices'){framePaper(w,h);txt('LES « INDICES »',0,-h/2+100,'90px Anton',INK,'center',2);
    [['UN SAC',T[21]],['UNE CAPUCHE',T[21]+.65],['UN MASQUE',T[21]+1.3],['TON GROUPE',T[22]]].forEach(([s,t0],i)=>{if(t<t0)return;const y=-h/2+230+i*130;const q=eo(lin(t,t0,t0+.2));ctx.save();ctx.globalAlpha*=q;
      ctx.fillStyle='rgba(128,134,126,.28)';ctx.fillRect(-w/2+60,y-60,w-120,100);ctx.strokeStyle=PINK;ctx.lineWidth=6;ctx.strokeRect(-w/2+90,y-40,60,60);ctx.beginPath();ctx.moveTo(-w/2+100,y-12);ctx.lineTo(-w/2+118,y+8);ctx.lineTo(-w/2+145,y-35);ctx.stroke();
      txt(s,-w/2+190,y+5,'70px Anton',INK,'left',2);ctx.restore();});}
  else if(c.k==='cglpl'){framePaper(w,h);txt('CONTRÔLEURE GÉNÉRALE',0,-h/2+80,'700 30px Mono','rgba(236,238,230,.75)','center',4);txt('DES LIEUX DE PRIVATION DE LIBERTÉ',0,-h/2+124,'700 26px Mono','rgba(236,238,230,.6)','center',2);
    txt('MANIFESTATIONS · MARS 2023',0,-h/2+190,'700 30px Mono',AMB,'center',4,lin(t,T[24],T[24]+.3));
    const v=Math.round(80*eo(lin(t,T[26],T[26]+1.2)));if(t>=T[26]-.1)txt(v+' %',0,90,'260px Anton',PINK,'center',2,1,24);
    txt('CLASSÉES SANS SUITE',0,190,'64px Anton',INK,'center',3,lin(t,T[27],T[27]+.25));srcLine('Source : CGLPL, 3 mai 2023 · cité dans la PPL n° 2323 (AN)',w,h);}
  else if(c.k==='no'){framePaper(w,h);[['PROCÈS',T[28]],['CONDAMNATION',T[29]]].forEach(([s,t0],i)=>{if(t<t0)return;const y=-80+i*170;txt(s,0,y,'110px Anton',INK,'center',2,lin(t,t0,t0+.2));
      const p=eo(lin(t,t0+.25,t0+.45));ctx.save();ctx.strokeStyle=PINK;ctx.lineWidth=12;ctx.beginPath();ctx.moveTo(-340,y-40);ctx.lineTo(-340+680*p,y-40+8*p);ctx.stroke();ctx.restore();});}
  else if(c.k==='h24'){framePaper(w,h);const v=Math.round(24*eo(lin(t,c.t0+.3,c.t0+1.8)));txt('PRÈS DE',0,-h/2+110,'700 34px Mono','rgba(236,238,230,.7)','center',6);txt(v+' H',0,40,'240px Anton',INK,'center',2,1,18);
    txt('EN CELLULE',0,140,'64px Anton',INK,'center',3);stampAt('DÉJÀ PURGÉES',0,h/2-90,76,t,T[30]+1.9,-.09);}
  else if(c.k==='casse'){framePaper(w,h);txt('AUJOURD’HUI AUSSI',0,-h/2+90,'700 34px Mono',AMB,'center',6);txt('LA CASSE',0,-h/2+200,'110px Anton',INK,'center',2,lin(t,T[32],T[32]+.25));
    [['VITRINES BRISÉES','PARIS',T[33]],['MAIRIE ENVAHIE','MARSEILLE',T[34]],['INCENDIE','LYON',T[35]]].forEach(([a,b,t0],i)=>{if(t<t0)return;const y=-h/2+330+i*120;const q=eo(lin(t,t0,t0+.2));ctx.save();ctx.globalAlpha*=q;
      ctx.fillStyle='rgba(128,134,126,.28)';ctx.fillRect(-w/2+50,y-60,w-100,96);txt(a,-w/2+80,y+8,'58px Anton',INK,'left',2);txt(b,w/2-80,y+4,'700 30px Mono','rgba(236,238,230,.7)','right',4);ctx.restore();});
    srcLine('Sources : AFP, franceinfo, 17 oct. 2026',w,h);}
  else if(c.k==='quote'){framePaper(w,h);txt('LE MINISTRE DE L’INTÉRIEUR',0,-h/2+90,'700 30px Mono','rgba(236,238,230,.7)','center',6);
    txt('« L’ORDRE, C’EST',0,-20,'92px Anton',INK,'center',2,lin(t,T[37],T[37]+.25));txt('D’INTERPELLER',0,90,'92px Anton',INK,'center',2,lin(t,T[37]+.4,T[37]+.65));txt('LES CASSEURS. »',0,200,'92px Anton',PINK,'center',2,lin(t,T[37]+.9,T[37]+1.15),18);
    srcLine('Laurent Nuñez, Assemblée nationale, oct. 2026',w,h);}
  else if(c.k==='vs'){framePaper(w,h,'rgba(40,43,40,.9)');
    txt('ARRÊTER LES CASSEURS',0,-h/2+150,'72px Anton',INK,'center',2);txt('AVANT QU’ILS CASSENT',0,-h/2+240,'72px Anton',INK,'center',2,lin(t,T[40],T[40]+.2));
    if(t>=T[41]-.3)txt('OU',0,20,'110px Anton',PINK,'center',2,lin(t,T[41]-.3,T[41]),20);
    txt('ARRÊTER N’IMPORTE QUI',0,h/2-230,'72px Anton',INK,'center',2,lin(t,T[41],T[41]+.2));txt('AU CAS OÙ ?',0,h/2-140,'72px Anton',PINK,'center',2,lin(t,T[42],T[42]+.2),16);}
  else if(c.k==='fin'){framePaper(w,h,'rgba(40,43,40,.9)');ctx.save();ctx.translate(0,-140);tiles(t,'PRÉVENIR',0,0,{t0:T[45]-.05,step:.05,h:110,gap:7});ctx.restore();
    ctx.save();ctx.translate(0,30);tiles(t,'OU PUNIR ?',0,0,{t0:T[46],step:.05,h:110,gap:7,hot:[3,4,5,6,7,8,9],hotT:T[46]+.6});ctx.restore();
    txt('DIS-LE EN COMMENTAIRE ↓',0,h/2-150,'700 40px Mono',AMB,'center',3,lin(t,T[44],T[44]+.2));txt('ENVOIE ÇA À CELUI QUI Y ÉTAIT',0,h/2-80,'700 30px Mono','#ddd','center',2,lin(t,T[46]+1,T[46]+1.3));}
  laminate(w,h);
  if(c.k!=='cover'){pin(0,-h/2+18);tape(-w/2+40,-h/2+10,140,-.6);}else{pin(0,-h/2+10);}
  ctx.restore();
}
function outroCredits(t){const c=C[cOutro];ctx.save();ctx.translate(c.x,c.y+c.h/2+120);[['Sources : préfecture de police / franceinfo · AFP · CGLPL (3 mai 2023)',0],['PPL n° 2323 (AN, 2024) · Code pénal art. 222-14-2',40],['Images : Wikimedia Commons — Quahadi, H. Germain (CC0), O. Ortelpa',80],['Gare du Nord = reconstitution · Musique : « Hitman », K. MacLeod · CC BY 4.0',120]].forEach(([s,y])=>txt(s,0,y,'400 21px Mono','rgba(236,238,230,.75)','center'));ctx.restore();}

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
reveal(T[5],1.1);ev(T[6]+1.2,'thud');ev(T[8]+.2,'tick');ev(T[10]+.2,'tick');
tileSounds('GROUPEMENT',T[13]-.05,.05);ev(T[14]+1.2,'thud');ev(T[15]+.1,'thud');
ev(T[17]-.8,'riser');reveal(T[18]+.2,1.2);
[T[21],T[21]+.65,T[21]+1.3,T[22]].forEach(x=>ev(x,'thud'));
ev(T[26]-1,'riser');reveal(T[26]+.1,1.3);ev(T[28]+.25,'thud');ev(T[29]+.25,'thud');reveal(T[30]+1.9,1.2);
[T[33],T[34],T[35]].forEach(x=>ev(x,'thud'));reveal(T[37]+.9,1);
ev(T[41]-1,'riser');reveal(T[42],1);ev(T[43]-.8,'riser');reveal(T[43]+1.6,1.4);
tileSounds('PREVENIR',T[45]-.05,.05);tileSounds('OU PUNIR',T[46],.05);ev(VEND+.35,'boom');

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
