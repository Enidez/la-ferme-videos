// ---------- sons
for(let k=0;k<22;k++)ev(N(1)+k*.05,'type');reveal(N(1)+1.8,1.3);ev(N(2)+1.1,'whoosh');ev(N(2)+2.1,'tick');ev(N(2)+3.1,'thud');ev(MARK.tcov-.1,'whoosh');
KEYS.forEach(k=>{if(k.t>MARK.tcov+.1)ev(k.t-.5,'whoosh');});
C.forEach((c,i)=>{if(i>0)ev(c.t0-.05,'click');});
ev(N(4),'tick');ev(N(5),'hit');ev(N(6)+1.6,'thud');ev(N(6)+2.2,'boom');reveal(N(7),1.1);
for(let k=0;k<14;k++)ev(N(8)+1.4+k*.11,'tick');ev(N(9)+2.3,'hit');ev(N(9)+4.4,'hit');[1.1,2.1,3.1].forEach(d=>ev(N(10)+d,'tick'));ev(N(11)+.8,'hit');reveal(N(11)+1.6,1.2);
ev(N(14),'tick');ev(N(14)+1.2,'tick');reveal(N(15),1.2);reveal(N(16),1.1);ev(N(19)+1.2,'hit');reveal(N(20)+1.1,1.2);
ev(WT0-.9,'riser');XT.forEach(([a,b,t0])=>ev(t0,'zap'));reveal(N(21),1.2);for(let k=0;k<4;k++)ev(N(22)+k*.2,'tick');reveal(N(23)+3.2,1.4);ev(N(24),'thud');
ev(N(26)+.7,'boom');ev(N(27),'thud');ev(N(28)+1.2,'hit');reveal(N(29),1.3);ev(N(30)+3.2,'boom');ev(N(32)+1.3,'hit');reveal(N(33),1.4);ev(VEND+.35,'boom');
