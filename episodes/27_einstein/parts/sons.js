// ---------- sons
ev(N(2),'whoosh');for(let k=0;k<18;k++)ev(N(2)+2.2+k*.065,'type');reveal(N(3)+1.4,1.3);ev(MARK.tcov-.1,'whoosh');
KEYS.forEach(k=>{if(k.t>MARK.tcov+.1)ev(k.t-.5,'whoosh');});C.forEach((c,i)=>{if(i>0)ev(c.t0-.05,'click');});
reveal(N(5),1.1);ev(N(6)+1.2,'boom');ev(N(8)+2.4,'thud');ev(N(10)+.8,'boom');ev(N(11)+.3,'tick');ev(N(11)+2.8,'hit');reveal(N(12)+.9,1.2);
reveal(N(13),1.1);ev(N(15),'thud');ev(N(16)+.6,'hit');for(let k=0;k<16;k++)ev(N(17)+.4+k*.13,'tick');ev(N(18),'thud');reveal(N(19)+.6,1.2);
ev(WT0-.9,'riser');XT.forEach(([a,b,t0])=>ev(t0,'zap'));reveal(N(20),1.2);ev(N(22)+.3,'hit');for(let k=0;k<6;k++)ev(N(23)+1.6+k*.18,'type');for(let k=0;k<8;k++)ev(N(24)+3.6+k*.18,'type');reveal(N(26),1.3);
ev(N(27)+.1,'tick');ev(N(27)+1.3,'tick');ev(N(27)+2.9,'hit');ev(N(28)+.6,'hit');reveal(N(28)+1.7,1.4);ev(VEND+.35,'boom');
