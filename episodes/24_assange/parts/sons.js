// ---------- sons
ev(MARK.frz,'zap');reveal(MARK.frz+.4,1.2);reveal(MARK.frz+.9,1.3);ev(MARK.tcov-.1,'whoosh');
KEYS.forEach(k=>{if(k.t>MARK.tcov+.1)ev(k.t-.5,'whoosh');});
C.forEach((c,i)=>{if(i>0)ev(c.t0-.05,'click');});
// Bagdad
ev(N(2),'riser');for(let k=0;k<20;k++)ev(N(5)+.3+k*.045,'type');for(let k=0;k<14;k++)ev(N(6)-.3+k*.1,'hit');reveal(N(6)-.3,1.4);for(let k=0;k<10;k++)ev(N(7)+2.55+k*.1,'hit');reveal(N(7)+2.55,1.2);
for(let k=0;k<11;k++)ev(N(6)+k*.08,'tick');reveal(N(6),1.2);ev(N(7)+3.8,'boom');reveal(N(7)+3.8,1.1);ev(N(8)+1.1,'thud');ev(N(9)+.6,'thud');
// WikiLeaks
reveal(N(10),1.2);ev(N(11)+2.4,'hit');ev(N(12),'tick');reveal(N(12)+.95,1.4);for(let k=0;k<3;k++)ev(N(13)+2.9+k*.85,'thud');ev(N(14)+3.4,'boom');
// traque
reveal(N(15),1.1);ev(N(16)+.3,'tick');for(let k=0;k<20;k++)ev(N(17)+k*.12,'tick');ev(N(18)+1.6,'thud');reveal(N(18)+3.4,1.2);
ev(N(19)+.2,'hit');ev(N(19)+1.1,'thud');reveal(N(19)+2.6,1.2);
// prison
ev(N(20)+.05,'crack');ev(N(20)+.45,'boom');reveal(N(20)+.3,1.3);ev(N(21)+1.9,'hit');for(let k=0;k<12;k++)ev(N(21)+3.4+k*.1,'tick');reveal(N(21)+3.4,1.2);ev(N(22),'zap');
ev(N(23)+2.3,'tick');reveal(N(23)+3.4,1.3);for(let k=0;k<15;k++)ev(N(24)+.1+k*.1,'tick');ev(N(24)+1.5,'thud');ev(N(24)+3,'thud');
// sortie
ev(N(25)+2.6,'tick');reveal(N(25)+5.3,1.1);ev(N(26),'riser');reveal(N(27)+2.35,1.4);
// retournement
ev(WT0-.9,'riser');XT.forEach(([a,b,t0])=>ev(t0,'zap'));reveal(N(28),1.2);reveal(N(29)+3.55,1.1);reveal(N(30)+1.95,1.1);reveal(N(31)+1.65,1.4);
ev(N(32)+.9,'hit');ev(N(32)+1.8,'hit');ev(N(32)+2.6,'hit');ev(N(33)+2.1,'boom');reveal(N(35),1.1);reveal(N(36),1.4);ev(VEND+.35,'boom');
