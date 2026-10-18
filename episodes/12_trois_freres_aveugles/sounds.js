// ---------- sons
ev(MARK.wm[1]+.05,'boom');ev(TCOV-.1,'whoosh');
for(let x=.15;x<1.85;x+=.07)ev(x,'type');for(let x=MARK.wf[0];x<MARK.wf[1]-.2;x+=.09)ev(x,'type');for(let x=MARK.wm[0];x<MARK.wm[1]-.1;x+=.09)ev(x,'type');
[2.5,2.9,3.3].forEach(x=>ev(x,'tick'));
KEYS.forEach(k=>{if(k.t>TCOV+.1)ev(k.t-.5,'whoosh');});
C.forEach((c,i)=>{if(i>0)ev(c.t0-.05,'click');});
ev(N(3),'thud');reveal(N(10),1.1);ev(N(12)+.5,'whoosh');ev(N(15)+.3,'thud');ev(N(21)+.45,'zap');reveal(N(22),1.3);
reveal(N(25),1);ev(N(27)+.8,'thud');reveal(N(30),1.1);ev(N(32)+.1,'tick');reveal(N(34),1.2);ev(N(37)+1.2,'thud');ev(N(38)+.1,'tick');ev(N(40),'thud');
[N(43),N(44),N(45)+.2].forEach(x=>ev(x,'thud'));reveal(N(46),1.1);reveal(N(50),1.3);ev(N(53)+.5,'thud');reveal(N(54),1);ev(N(56)+.2,'thud');
ev(N(59)+.3,'thud');ev(N(60),'thud');[N(62),N(64),N(66)].forEach(x=>ev(x,'thud'));reveal(N(69),1.1);ev(N(70)-.6,'riser');reveal(N(72),1.2);
[N(73)-.2,N(73)+.2,N(73)+.6].forEach(x=>ev(x,'type'));ev(N(76)+.2,'thud');ev(N(78),'type');ev(N(79),'type');ev(VEND+.35,'boom');
