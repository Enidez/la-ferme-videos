// ---------- sons
reveal(MARK.frz,1.3);ev(MARK.frz+.4,'thud');ev(TCOV-.1,'whoosh');
KEYS.forEach(k=>{if(k.t>TCOV+.1)ev(k.t-.5,'whoosh');});
C.forEach((c,i)=>{if(i>0)ev(c.t0-.05,'click');});
ev(C[cElysee].t0+.2,'thud');reveal(N(4),1);[0,1,2,3].forEach(i=>ev(N(6)+.4+i*.15,'type'));ev(N(7),'thud');
[N(8),N(13),N(25),N(32)].forEach((x,i)=>reveal(x,i===3?1.3:1));ev(N(11)+.3,'thud');ev(N(16)+.4,'thud');ev(N(18)+.3,'thud');
ev(N(21)+.3,'tick');ev(N(23),'thud');[N(28),N(29),N(30),N(31)].forEach(x=>ev(x,'tick'));
ev(N(35)+.1,'thud');ev(N(37),'thud');[N(39),N(40),N(41)].forEach(x=>ev(x,'tick'));reveal(N(43),1.1);ev(N(47),'tick');ev(N(48),'thud');reveal(C[cExp].t0+1.2,1.2);
ev(N(50)-.6,'riser');ev(N(53),'thud');ev(N(56),'thud');reveal(N(58),1.3);ev(VEND+.35,'boom');
