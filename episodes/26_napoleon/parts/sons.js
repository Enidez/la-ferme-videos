// ---------- sons
ev(MARK.tcov-.1,'whoosh');KEYS.forEach(k=>{if(k.t>MARK.tcov+.1)ev(k.t-.5,'whoosh');});
C.forEach((c,i)=>{if(i>0)ev(c.t0-.05,'click');});
ev(N(2)+3.4,'boom');ev(N(3)+.1,'hit');reveal(N(4),1.1);ev(N(5)+.2,'riser');ev(N(7)+1.2,'thud');ev(N(7)+2.1,'boom');ev(N(9)+2.4,'hit');reveal(N(10)+.9,1.2);
reveal(N(11),1.1);ev(N(13)+.7,'hit');ev(N(13)+3.7,'hit');ev(N(14)+1.6,'hit');ev(N(15)+2.5,'thud');ev(N(16)+1.2,'tick');reveal(N(16)+2.2,1.3);
ev(WT0-.9,'riser');XT.forEach(([a,b,t0])=>ev(t0,'zap'));reveal(N(17),1.2);ev(N(18),'boom');ev(N(19)+.4,'thud');ev(N(19)+2.2,'thud');
ev(N(20),'type');ev(N(21)+2,'hit');reveal(N(22)+.6,1.1);for(let k=0;k<4;k++)ev(N(24)+k*.9,'type');reveal(N(25)+.4,1.2);
ev(N(26)+.6,'boom');ev(N(26)+2.8,'hit');for(let k=0;k<3;k++)ev(N(28)+.2+k*1.1,'tick');ev(N(28)+3.8,'thud');ev(N(29),'hit');reveal(N(29)+1,1.4);ev(VEND+.35,'boom');
