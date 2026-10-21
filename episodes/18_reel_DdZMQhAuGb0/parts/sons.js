// ---------- sons
reveal(MARK.frz,1.3);ev(MARK.frz,'hit');ev(MARK.tcov-.1,'whoosh');
KEYS.forEach(k=>{if(k.t>MARK.tcov+.1)ev(k.t-.5,'whoosh');});
C.forEach((c,i)=>{if(i>0)ev(c.t0-.05,'click');});
[N(3),N(10),N(14),N(23),N(37),N(47)].forEach(x=>reveal(x,1.1));
ev(N(7),'tick');ev(N(7)+1.6,'tick');ev(N(8),'thud');ev(N(13),'tick');ev(N(13)+.6,'tick');ev(N(18),'thud');ev(N(21),'thud');reveal(N(22)+.8,1);
ev(N(28),'tick');ev(N(29),'tick');[30,31,32].forEach(k=>ev(N(k),'thud'));ev(N(34),'tick');reveal(N(35),1.2);ev(N(36),'tick');
ev(N(40)+.6,'thud');reveal(N(42)+.7,1.2);ev(N(43),'tick');ev(N(45),'tick');
for(let k=0;k<11;k++)ev(N(50)+k*.1,'tick');for(let k=0;k<11;k++)ev(N(51)+k*.1,'tick');ev(N(53),'tick');ev(N(54),'tick');ev(N(56)+.3,'thud');ev(N(56)+.8,'thud');
ev(WT0-.9,'riser');reveal(N(57),1);XT.forEach(([a,b,t0])=>ev(t0,'zap'));reveal(N(59),1.3);ev(N(61),'thud');ev(N(65),'tick');ev(VEND+.35,'boom');
