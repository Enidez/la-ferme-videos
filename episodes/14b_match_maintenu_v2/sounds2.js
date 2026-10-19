// ---------- sons
ev(K(0),'boom');ev(K(3),'thud');ev(K(4)+.4,'tick');ev(K(5)-.12,'whoosh');reveal(K(5),.8);ev(K(7),'thud');ev(K(8)-.12,'whoosh');reveal(K(8),.9);reveal(MARK.frz,1.3);ev(TCOV-.1,'whoosh');
KEYS.forEach(k=>{if(k.t>TCOV+.1)ev(k.t-.5,'whoosh');});
C.forEach((c,i)=>{if(i>0)ev(c.t0-.05,'click');});
[K(12),K(13),K(14)].forEach(x=>reveal(x,1.1));
for(let k=0;k<12;k++)ev(C[cBless].t0+.2+k*.1,'tick');ev(N(19)+1.1,'thud');ev(N(20)+.9,'thud');
ev(N(22),'tick');ev(N(22)+.9,'thud');[0,1,2,3].forEach(i=>ev(N(24)+i*.7,'type'));ev(N(24)+2.1,'thud');
ev(N(10),'thud');ev(N(16)+.2,'thud');reveal(N(17)+.3,1);
ev(N(36)+.2,'tick');ev(N(38),'thud');ev(N(39),'thud');
ev(WT0-.9,'riser');reveal(N(45),1);XT.forEach(([a,b,t0])=>ev(t0,'zap'));ev(N(46),'thud');ev(N(47),'thud');reveal(N(48),1.2);
ev(N(49),'thud');ev(N(50),'thud');reveal(N(50)+1.05,1.3);ev(N(52),'tick');ev(VEND+.35,'boom');
