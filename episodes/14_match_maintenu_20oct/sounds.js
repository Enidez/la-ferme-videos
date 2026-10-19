// ---------- sons
ev(N(1)+.1,'thud');ev(N(2),'thud');ev(N(3)+.3,'tick');ev(N(4)-.1,'whoosh');reveal(N(4)+.05,.7);
for(let k=0;k<9;k++)ev(N(5)+k*.1,'tick');ev(N(6),'thud');ev(N(7),'thud');
reveal(MARK.frz,1.3);ev(MARK.frz+.25,'thud');ev(TCOV-.1,'whoosh');
KEYS.forEach(k=>{if(k.t>TCOV+.1)ev(k.t-.5,'whoosh');});
C.forEach((c,i)=>{if(i>0)ev(c.t0-.05,'click');});
ev(N(10),'thud');ev(N(11)+.4,'tick');ev(N(12)+.3,'type');ev(N(13)+.35,'thud');ev(N(14)+.3,'thud');
ev(N(16)+.2,'thud');reveal(N(17)+.3,1);
for(let k=0;k<12;k++)ev(C[cBless].t0+.2+k*.12,'tick');reveal(N(19)+1.1,.9);ev(N(20)+.9,'thud');
ev(N(22),'tick');ev(N(22)+1.1,'thud');[0,1,2,3].forEach(i=>ev(N(24)+i*.7,'type'));ev(N(24)+2.1,'thud');
reveal(N(26),1.1);ev(N(26)+.4,'tick');[0,1,2,3].forEach(i=>ev(N(29)+i*(N(30)+.3-N(29))/3,'tick'));reveal(N(31),1.2);ev(N(31)+.5,'thud');
ev(N(32),'tick');reveal(N(34)+.7,1);ev(N(35)+.2,'thud');
ev(N(36)+.2,'tick');ev(N(38),'thud');ev(N(39),'thud');
ev(N(41)+1.75,'thud');ev(N(42)+.05,'hit');ev(N(43),'tick');ev(N(44),'tick');
ev(WT0-.9,'riser');reveal(N(45),1);XT.forEach(([a,b,t0])=>ev(t0,'zap'));ev(N(46),'thud');ev(N(47),'thud');reveal(N(48),1.2);
ev(N(49),'thud');ev(N(50),'thud');reveal(N(50)+1.05,1.3);ev(N(52),'tick');ev(VEND+.35,'boom');
