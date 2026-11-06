// ---------- petits dessins
function person(x,y,s,col,kind){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle=col;
  ctx.beginPath();ctx.arc(0,-120,34,0,6.283);ctx.fill();
  ctx.beginPath();ctx.moveTo(-48,-70);ctx.quadraticCurveTo(0,-90,48,-70);ctx.lineTo(56,40);ctx.lineTo(-56,40);ctx.closePath();ctx.fill();
  if(kind=='old'){ctx.strokeStyle=col;ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(64,-10);ctx.lineTo(70,60);ctx.stroke();}
  ctx.restore();}
function tag(x,y,w,h,label,t,t0,t1,o={}){const a=vis(t,t0,t1,.15,.25);if(a<=0)return;const p=eo(lin(t,t0,t0+.35));
  ctx.save();ctx.globalAlpha*=a;ctx.translate(x+(1-p)*(o.from||0),y);ctx.rotate((o.rot||0)*Math.PI/180);
  ctx.fillStyle=o.bg||'rgba(128,134,126,.30)';ctx.fillRect(-w/2,-h/2,w,h);ctx.strokeStyle=o.stroke||'rgba(236,238,230,.55)';ctx.lineWidth=2;ctx.strokeRect(-w/2,-h/2,w,h);
  txt(label,0,h*.17,`700 ${o.size||36}px Mono`,o.col||INK,'center',3,1,8);
  if(o.frost)frostOver(w,h,o.frost);
  if(o.stamp&&o.stamp[1]<=t){const sp=lin(t,o.stamp[1],o.stamp[1]+.15);ctx.save();ctx.globalAlpha*=sp;ctx.translate(w/2-120,0);ctx.rotate(-.12);ctx.scale(1.5-.5*sp,1.5-.5*sp);
    ctx.strokeStyle=ICE;ctx.lineWidth=5;ctx.shadowColor='rgba(150,210,255,.9)';ctx.shadowBlur=14;ctx.strokeRect(-100,-30,200,56);txt(o.stamp[0],0,12,'700 32px Mono',ICE2,'center',4);ctx.restore();}
  ctx.restore();}
function stampIce(t,t0,t1,s,x,y,size=90,rot=-.1){const a=vis(t,t0,t1,.02,.25);if(a<=0)return;const p=lin(t,t0,t0+.16);const sc=1.6-.6*eo(p);
  ctx.save();ctx.globalAlpha*=a*cl(p*3);ctx.translate(x,y);ctx.rotate(rot);ctx.scale(sc,sc);const f=size+'px Anton';const sw=mw(s,f,4)+60;
  ctx.strokeStyle=ICE;ctx.lineWidth=9;ctx.shadowColor='rgba(150,210,255,.8)';ctx.shadowBlur=22;ctx.strokeRect(-sw/2,-size*.78,sw,size*1.15);txt(s,0,size*.18,f,ICE2,'center',4,1,20);ctx.restore();}
function icyText(s,x,y,size,t,t0,t1,fr=0){const a=vis(t,t0,t1,.2,.25);if(a<=0)return;const p=eo(lin(t,t0,t0+.4));
  ctx.save();ctx.translate(x,y);const sc=1.1-.1*p+.012*Math.max(0,t-t0);ctx.scale(sc,sc);ctx.globalAlpha*=a;
  ctx.font=size+'px Anton';ctx.textAlign='center';ctx.letterSpacing=size*.02+'px';ctx.shadowColor='rgba(150,210,255,.85)';ctx.shadowBlur=30;ctx.fillStyle=ICE2;ctx.fillText(s,0,0);
  if(fr>0){ctx.shadowBlur=0;ctx.globalCompositeOperation='source-atop';}ctx.restore();}
function paper(w,h,lines,stamp){ctx.fillStyle='#d9d6cc';ctx.fillRect(-w/2,-h/2,w,h);
  lines.forEach(([s,y,font,col,al])=>txt(s,al=='left'?-w/2+40:0,-h/2+y,font,col||'#1a1a1a',al||'center'));}
function typed(t,t0,t1,s,x,y,font,col='rgba(236,238,230,.85)',dur=.6,ls=4){const n=Math.floor(s.length*lin(t,t0,t0+dur));txt(s.slice(0,n),x,y,font,col,'center',ls,vis(t,t0,t1));}
function stampRed(t,t0,t1,s,x,y,size=96,rot=-.12){const a=vis(t,t0,t1,.02,.25);if(a<=0)return;const p=lin(t,t0,t0+.16);const sc=1.6-.6*eo(p);
  ctx.save();ctx.globalAlpha*=a*cl(p*3);ctx.translate(x,y);ctx.rotate(rot);ctx.scale(sc,sc);const f=size+'px Anton';const sw=mw(s,f,4)+60;ctx.strokeStyle=RED;ctx.lineWidth=10;ctx.shadowColor='rgba(255,40,30,.6)';ctx.shadowBlur=18;
  ctx.strokeRect(-sw/2,-size*.78,sw,size*1.15);txt(s,0,size*.18,f,RED,'center',4);ctx.restore();}
// hémicycle
const SEATS=[];{for(let r=0;r<9;r++){const R=200+r*30;const n=Math.round(Math.PI*R/30);for(let i=0;i<=n;i++){const a=Math.PI-(i/n)*Math.PI;SEATS.push({x:Math.cos(a)*R,y:-Math.sin(a)*R,k:(i/n+r*.13)%1});}}}


function typed(t,t0,t1,s,x,y,font,col='rgba(236,238,230,.85)',dur=.6,ls=4){const n=Math.floor(s.length*lin(t,t0,t0+dur));txt(s.slice(0,n),x,y,font,col,'center',ls,vis(t,t0,t1));}
