// ---------- sons
for(let k=0;k<18;k++)ev(N(2)+k*.09,'tick');ev(MARK.frz,'zap');reveal(MARK.frz+.15,1.3);ev(MARK.tcov-.1,'whoosh');
KEYS.forEach(k=>{if(k.t>MARK.tcov+.1)ev(k.t-.5,'whoosh');});
C.forEach((c,i)=>{if(i>0)ev(c.t0-.05,'click');});
ev(N(5),'thud');[N(6),N(10),N(13)].forEach(x=>reveal(x,1.05));
ev(N(8),'tick');ev(N(8)+2.2,'tick');reveal(N(9),1);ev(N(11)+1.5,'thud');reveal(N(12),1);ev(N(14)+.15,'thud');ev(N(15),'tick');reveal(N(16),1);
reveal(N(17),1.3);ev(N(19)+.3,'type');for(let i=0;i<3;i++){ev(N(20)+1.6+i*.45,'thud');ev(N(20)+1.85+i*.45,'zap');}ev(N(21),'tick');
ev(N(22)+1.3,'hit');ev(N(23)+.5,'zap');reveal(N(24),1);for(let k=0;k<12;k++)ev(N(25)+.4+k*.13,'tick');ev(N(26)+.3,'thud');reveal(N(26)+2.6,1.1);ev(N(26)+3.6,'thud');
ev(WT0-.9,'riser');XT.forEach(([a,b,t0])=>ev(t0,'zap'));reveal(N(28)+.4,1.3);ev(N(29),'riser');reveal(N(29)+1.5,1);ev(N(31)+.8,'hit');ev(VEND+.35,'boom');
