// ---------- sons
ev(MARK.frz,'hit');ev(N(1),'tick');ev(N(2),'tick');ev(MARK.res-.05,'whoosh');reveal(MARK.pol,1.3);ev(MARK.tt,'thud');ev(N(5),'tick');ev(TCOV-.1,'whoosh');
KEYS.forEach(k=>{if(k.t>TCOV+.1)ev(k.t-.5,'whoosh');});
C.forEach((c,i)=>{if(i>0)ev(c.t0-.05,'click');});
[N(7),N(32),N(45),N(55)].forEach(x=>reveal(x,1.1));
ev(N(10),'tick');ev(N(12),'thud');ev(N(13),'thud');ev(N(16),'tick');ev(N(18),'tick');reveal(N(20),.9);
ev(N(26),'thud');ev(N(27),'thud');ev(N(28),'tick');reveal(N(30),1.2);
ev(N(34),'tick');ev(N(35),'tick');ev(N(39),'tick');ev(N(42),'thud');reveal(N(43),1);
ev(N(47),'thud');ev(N(49),'thud');for(let k=0;k<12;k++)ev(C[cMille].t0+.2+k*.1,'tick');ev(N(51)+.6,'thud');ev(N(53),'tick');ev(N(54),'thud');
ev(N(56)+.4,'tick');ev(N(57),'tick');ev(N(58),'tick');ev(N(60),'tick');ev(N(62),'tick');reveal(N(63),1.1);
ev(WT0-.9,'riser');reveal(N(64),1);XT.forEach(([a,b,t0])=>ev(t0,'zap'));reveal(N(71),1.3);ev(N(75),'thud');ev(N(77),'tick');ev(VEND+.35,'boom');
