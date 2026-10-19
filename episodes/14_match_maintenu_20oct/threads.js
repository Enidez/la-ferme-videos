function drawThreads(t){
  const g=t>=WT0&&t<WT1+1?eo(lin(t,WT0,WT0+.6))*(1-lin(t,WT1,WT1+1)):0;
  const curve=(a,b,p,sag)=>{const [x1,y1]=pinPos(a),[x2,y2]=pinPos(b);const mx=(x1+x2)/2,my=(y1+y2)/2+Math.hypot(x2-x1,y2-y1)*sag;ctx.beginPath();ctx.moveTo(x1,y1);const n=30;for(let k=1;k<=n;k++){const u=k/n*p;ctx.lineTo((1-u)*(1-u)*x1+2*u*(1-u)*mx+u*u*x2,(1-u)*(1-u)*y1+2*u*(1-u)*my+u*u*y2);}ctx.stroke();};
  ctx.save();ctx.strokeStyle=`rgba(${185+70*g},${30+15*g},28,.9)`;ctx.lineWidth=5+20*g;ctx.shadowColor=g>0?`rgba(255,40,30,${.85*g})`:'rgba(0,0,0,.4)';ctx.shadowBlur=6+44*g;ctx.shadowOffsetY=g>0?0:4;
  const ORD=[...C.keys()].filter(i=>C[i].k!=='outro').sort((u,v)=>C[u].t0-C[v].t0);for(let j=1;j<ORD.length;j++)curve(C[ORD[j-1]],C[ORD[j]],1,.08);
  ctx.strokeStyle='rgba(255,52,40,.95)';ctx.shadowColor='rgba(255,40,30,.9)';ctx.lineWidth=7+30*g;ctx.shadowBlur=10+50*g;
  XT.forEach(([a,b,t0])=>{if(t<t0)return;curve(C[a],C[b],eo(lin(t,t0,t0+.55)),.16);});
  ctx.restore();}
