// ---------- sons
reveal(MARK.frz,1.3);ev(MARK.frz,'hit');ev(TCOV-.1,'whoosh');
KEYS.forEach(k=>{if(k.t>TCOV+.1)ev(k.t-.5,'whoosh');});
C.forEach((c,i)=>{if(i>0)ev(c.t0-.05,'click');});
[N(7),N(13),N(26)].forEach(x=>reveal(x,1.1));
ev(N(3),'tick');ev(S('qd'),'thud');ev(N(5),'zap');ev(N(5)+.15,'thud');ev(N(6),'tick');ev(MARK.p1+.35,'thud');ev(N(12),'tick');
ev(N(14),'tick');ev(N(16),'thud');ev(N(17),'tick');ev(N(18),'tick');for(let k=0;k<12;k++)ev(N(19)+k*.1,'tick');ev(N(20),'thud');
ev(N(22)+.5,'thud');ev(N(24),'tick');reveal(N(25),1);ev(N(28)+.4,'thud');ev(N(27),'tick');ev(N(29),'tick');ev(N(30)+.6,'tick');ev(N(30)+1.1,'thud');
ev(N(32),'tick');ev(N(33),'tick');reveal(N(34),1);ev(WT0-.9,'riser');reveal(N(35),1);XT.forEach(([a,b,t0])=>ev(t0,'zap'));reveal(C[cNe].t0+.15,1.3);ev(N(39),'tick');ev(VEND+.35,'boom');
