p='board.js';s=open(p).read()
def rep(a,b):
    global s
    assert a in s,a[:70];s=s.replace(a,b,1)
# plein écran pour certains extraits
rep("const cGenz=add({k:'clip',clip:'genz',","const cGenz=add({k:'clip',full:1,clip:'genz',")
rep("const cV2=add({k:'clip',clip:'v2',","const cV2=add({k:'clip',full:1,clip:'v2',")
rep("const cElysee=add({k:'clip',clip:'elysee',","const cElysee=add({k:'clip',full:1,clip:'elysee',")
# images d'archive plein écran
rep("const cEq=add({k:'eq',x:2550,y:5100,w:980,h:700,rot:2,t0:T[22]});",
 "const cCrowd=add({k:'clip',full:1,clip:'crowd',handle:'H. Germain · CC0',title:'ARCHIVE',badge:'IMAGES D’ARCHIVE · 2019',x:3500,y:5600,w:600,h:1060,rot:3,t0:T[22]});\nconst cEq=add({k:'eq',x:2550,y:5100,w:980,h:700,rot:2,t0:T[23]-.15});")
rep("const cGav=add({k:'gav',x:250,y:5400,w:900,h:900,rot:1.5,t0:T[25]});",
 "const cPolice=add({k:'clip',full:1,clip:'police',handle:'H. Germain · CC0',title:'ARCHIVE',badge:'IMAGES D’ARCHIVE · 2019',x:300,y:4900,w:600,h:1060,rot:-3,t0:T[25]});\nconst cGav=add({k:'gav',x:-450,y:5650,w:900,h:900,rot:1.5,t0:T[26]-.4});")
rep("const cOutro=add({k:'outro',","const cOutro=add({k:'outro',full:1,")
# désordre : rotations plus franches + léger décalage
rep("// ---------- trajectoire caméra","{const r=rng(99);C.forEach((c,i)=>{if(i===0)return;c.rot*=1.9;c.x+=(r()-.5)*140;c.y+=(r()-.5)*140;});}\n// ---------- trajectoire caméra")
# zoom plein écran
rep("else KEYS.push({t:c.t0,x:c.x,y:c.y,z:fitZoom(c),rot:-c.rot*Math.PI/180*.6});",
 "else if(c.full){const pw=c.k==='clip'?c.w-50:c.w;const z=1100/pw;const a=c.rot*Math.PI/180;const oy=c.k==='clip'?-85:0;KEYS.push({t:c.t0,x:c.x-Math.sin(a)*oy,y:c.y+Math.cos(a)*oy-160/z,z,rot:-a});}\n  else KEYS.push({t:c.t0,x:c.x,y:c.y,z:fitZoom(c),rot:-c.rot*Math.PI/180*.6});")
# fils dans l'ordre chronologique
rep("for(let i=1;i<C.length;i++){const a=C[i-1],b=C[i];","const ORD=[...C.keys()].filter(i=>C[i].k!=='outro').sort((u,v)=>C[u].t0-C[v].t0);for(let j=1;j<ORD.length;j++){const a=C[ORD[j-1]],b=C[ORD[j]];")
# vue d'ensemble : exclure la fin
rep("KEYS.push(WIDE(T[32],[...C.keys()].filter(i=>i!==cEnd&&i!==cOutro)));","KEYS.push(WIDE(T[32],[...C.keys()].filter(i=>i!==cEnd&&i!==cOutro)));")
# fouillis du mur : post-it, mini-photos, punaises, bouts de fil
rep("function drawWall(){","""const CLUT=[];{const r=rng(55);const ims=['pancarte','lacrymo','foule','cover'];for(let i=0;i<70;i++){const k=r();CLUT.push({x:-1300+r()*6000,y:-1300+r()*8800,rot:(r()-.5)*.5,kind:k<.45?'post':k<.75?'photo':'clip',im:ims[Math.floor(r()*4)],w:k<.45?220:260,h:k<.45?220:190,lines:2+Math.floor(r()*4),col:r()});}}
function drawClutter(){CLUT.forEach((c,i)=>{ctx.save();ctx.translate(c.x,c.y);ctx.rotate(c.rot);ctx.globalAlpha=.85;
  if(c.kind==='post'){ctx.fillStyle=c.col<.5?'rgba(200,190,110,.55)':'rgba(170,175,165,.45)';ctx.fillRect(-c.w/2,-c.h/2,c.w,c.h);ctx.strokeStyle='rgba(30,30,28,.55)';ctx.lineWidth=4;for(let l=0;l<c.lines;l++){ctx.beginPath();ctx.moveTo(-c.w/2+24,-c.h/2+50+l*40);ctx.lineTo(c.w/2-30-(l%2)*50,-c.h/2+46+l*40);ctx.stroke();}}
  else if(c.kind==='photo'){const im=IM[c.im];ctx.fillStyle='rgba(230,232,224,.8)';ctx.fillRect(-c.w/2-12,-c.h/2-12,c.w+24,c.h+40);if(im){ctx.filter='grayscale(1) brightness(.8)';const s=Math.max(c.w/im.width,c.h/im.height);ctx.save();ctx.beginPath();ctx.rect(-c.w/2,-c.h/2,c.w,c.h);ctx.clip();ctx.drawImage(im,-im.width*s/2,-im.height*s/2,im.width*s,im.height*s);ctx.restore();ctx.filter='none';}}
  else{ctx.fillStyle='rgba(58,64,60,.55)';ctx.fillRect(-c.w/2,-c.h/2,c.w,c.h);ctx.strokeStyle='rgba(255,255,255,.5)';ctx.lineWidth=2;ctx.strokeRect(-c.w/2,-c.h/2,c.w,c.h);ctx.fillStyle='rgba(236,238,230,.35)';for(let l=0;l<3;l++)ctx.fillRect(-c.w/2+20,-c.h/2+40+l*45,c.w-60-l*40,14);}
  pin(0,-c.h/2+12);ctx.restore();});
  ctx.save();ctx.strokeStyle='rgba(160,30,28,.5)';ctx.lineWidth=3;for(let i=0;i<CLUT.length-1;i+=3){const a=CLUT[i],b=CLUT[i+1];if(Math.hypot(a.x-b.x,a.y-b.y)>1800)continue;ctx.beginPath();ctx.moveTo(a.x,a.y-a.h/2+12);ctx.quadraticCurveTo((a.x+b.x)/2,(a.y+b.y)/2+120,b.x,b.y-b.h/2+12);ctx.stroke();}ctx.restore();}
function drawWall(){""")
rep("drawWall();drawThreads(t);","drawWall();drawClutter();drawThreads(t);")
open(p,'w').write(s);print('ok')
