import sys;sys.path.insert(0,'../../tools')
from hgbase import build
CARDS=r'''const cCover=add({k:'cover',w:1080,h:1920,rot:0,t0:0});
const cEich=add({k:'clip',full:1,img:'eichmann',handle:'Israel GPO · domaine public',badge:'JÉRUSALEM · 1961',w:900,h:1150,rot:-1.5,t0:N(3),
  after:(w,h,t)=>{topBox(w,h,t,N(3),'LE PROCÈS D’ADOLF EICHMANN','UN DES ORGANISATEURS DE LA SHOAH',58);band(-120,t,N(4),'« JE N’AI FAIT QU’OBÉIR »',70);}});
const cQ=add({k:'question',w:920,h:760,rot:2,t0:N(6)});
const cA1=add({k:'proof',lab:'ACTE',n:1,l:'L’EXPÉRIENCE',w:880,h:760,rot:-2,t0:N(8)});
const cYale=add({k:'clip',full:1,clip:'yale',handle:'Archives de l’expérience Milgram (1962)',badge:'UNIVERSITÉ DE YALE · 1961',w:900,h:1150,rot:1.5,t0:N(10),
  after:(w,h,t)=>{topBox(w,h,t,N(11),'DES GENS ORDINAIRES','RECRUTÉS PAR PETITE ANNONCE',66);}});
const cRoles=add({k:'clip',full:1,clip:'roles',handle:'Archives de l’expérience Milgram (1962)',badge:'LE TIRAGE AU SORT (TRUQUÉ)',w:900,h:1150,rot:-1.5,t0:N(12),
  after:(w,h,t)=>{band(-160,t,N(13),'TOI : LE PROFESSEUR',64);band(-40,t,N(14),'LUI : L’ÉLÈVE',64,'rgba(10,10,10,.88)',AMB);}});
const cVolt=add({k:'volts',w:960,h:1000,rot:2,t0:N(15)});
const cA2=add({k:'proof',lab:'ACTE',n:2,l:'LE PIÈGE',w:880,h:760,rot:-1.5,t0:N(23)});
const cStrap=add({k:'clip',full:1,clip:'strap',handle:'Archives de l’expérience Milgram (1962)',badge:'L’ÉLÈVE EST ATTACHÉ',w:900,h:1150,rot:1.5,t0:N(24),
  after:(w,h,t)=>{stampAt('UN ACTEUR',0,-200,90,t,N(24),-.07);stampAt('DÉCHARGES FAUSSES',0,-60,66,t,N(25),.05);band(80,t,N(27),'IL CRIE. IL SUPPLIE.',62);band(190,t,N(30),'PUIS… PLUS RIEN.',62,'rgba(10,10,10,.88)',AMB);}});
const cMach=add({k:'clip',full:1,clip:'machine',handle:'Archives de l’expérience Milgram (1962)',badge:'LE VRAI SUJET : CELUI QUI OBÉIT',badgeRed:1,w:900,h:1150,rot:-2,t0:N(31)});
const cA3=add({k:'proof',lab:'ACTE',n:3,l:'LES ORDRES',w:880,h:760,rot:2,t0:N(34)});
const cHes=add({k:'clip',full:1,clip:'hesite',handle:'Archives de l’expérience Milgram (1962)',badge:'LE PROFESSEUR HÉSITE',w:900,h:1150,rot:-1.5,t0:N(36),
  after:(w,h,t)=>{topBox(w,h,t,N(39),'« CONTINUEZ, S’IL VOUS PLAÎT »','L’HOMME EN BLOUSE GRISE',58);band(-160,t,N(40),'« L’EXPÉRIENCE EXIGE QUE VOUS CONTINUIEZ »',36);
    band(-50,t,N(41),'« VOUS N’AVEZ PAS LE CHOIX »',58);stampAt('JUSTE UNE AUTORITÉ',0,100,70,t,N(44),-.06,INK);}});
const cA4=add({k:'proof',lab:'ACTE',n:4,l:'LE RÉSULTAT',w:880,h:760,rot:-2,t0:N(45)});
const cRes=add({k:'resultat',w:960,h:1060,rot:1.5,t0:N(47)});
const cObeit=add({k:'clip',full:1,clip:'obeit',handle:'Archives de l’expérience Milgram (1962)',badge:'IL CONTINUE',w:900,h:1150,rot:-1.5,t0:N(51),
  after:(w,h,t)=>{topBox(w,h,t,N(51),'ILS NE SE SENTAIENT','PLUS RESPONSABLES · ILS OBÉISSAIENT',72);}});
const cA5=add({k:'proof',lab:'ACTE',n:5,l:'CE QUI LA BRISE',w:880,h:760,rot:2,t0:N(53)});
const cPeers=add({k:'peers',w:960,h:1100,rot:-1.5,t0:N(55)});
const cRef=add({k:'clip',full:1,clip:'refuse',handle:'Archives de l’expérience Milgram (1962)',badge:'IL SE LÈVE',w:900,h:1150,rot:1.5,t0:N(60),
  after:(w,h,t)=>{topBox(w,h,t,N(60),'PAS LE COURAGE D’UN SEUL','L’EXEMPLE DES AUTRES',62);}});
const cFin=add({k:'fin',w:920,h:900,rot:-2,t0:N(62)});
const cOutro=add({k:'outro',full:1,w:900,h:900,rot:-1.5,t0:VEND+.5});
const WT0=N(62)-.1,WT1=N(65)-.2;
C[cA1].hl=N(62);C[cA2].hl=N(62)+.15;C[cA3].hl=N(62)+.3;C[cA4].hl=N(62)+.45;C[cA5].hl=N(62)+.6;
const XT=[[cA1,cA2,N(62)],[cA2,cA3,N(62)+.2],[cA3,cA4,N(62)+.4],[cA4,cA5,N(62)+.6],[cEich,cRes,N(63)]];
'''
HOOK=r'''function drawHook3(w,h,t){
  const fr=(window.CLIPS&&CLIPS.hook)||[];const im=fr.length?fr[Math.min(fr.length-1,Math.floor(t*30))]:null;ctx.fillStyle='#0b0c0b';ctx.fillRect(-w/2,-h/2,w,h);
  if(im){ctx.save();ctx.beginPath();ctx.rect(-w/2,-h/2,w,h);ctx.clip();const sb=Math.max(w/im.width,h/im.height)*1.1;ctx.filter='blur(28px) brightness(.5) grayscale(1)';ctx.drawImage(im,-im.width*sb/2,-im.height*sb/2,im.width*sb,im.height*sb);
    const z=1.75+.02*t;const s=w/im.width*z;ctx.filter='grayscale(1) contrast(1.2)';ctx.drawImage(im,-im.width*s*.42,-h/2+760-im.height*s*.45,im.width*s,im.height*s);ctx.restore();}
  {const g=ctx.createLinearGradient(0,-h/2+h*.6,0,-h/2+h*.85);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.9)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2+h*.6,w,h*.4);}
  {const g=ctx.createLinearGradient(0,-h/2,0,-h/2+420);g.addColorStop(0,'rgba(0,0,0,.85)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,420);}
  txt('ARCHIVES DE L’EXPÉRIENCE MILGRAM · 1962',0,-h/2+1490,'400 18px Mono','rgba(236,238,230,.7)','center',2);
  const sl=(s,y,f,col,ta,ls,gl)=>{if(t<ta)return;const q=eo(lin(t,ta,ta+.13));const sc=1.5-.5*q;ctx.save();ctx.translate(0,y);ctx.scale(sc,sc);txt(s,0,0,f,col,'center',ls,cl(q*1.5),gl);ctx.restore();};
  sl('TOI AUSSI ?',-h/2+300,'170px Anton',RED,0,4,24);
  sl('TU AURAIS PU',-h/2+1190,'96px Anton',INK,.3,2,16);sl('OBÉIR AUX NAZIS.',-h/2+1310,'110px Anton',INK,.6,2,16);
  if(t>=N(2))band(-h/2+1420,t,N(2),'UNE EXPÉRIENCE DE 1961',50);
}
'''
EXTRA=r'''  if(c.k==='question'){framePaper(w,h,'rgba(30,32,30,.95)');txt('ET SI',0,-h/2+200,'120px Anton',INK,'center',4);txt('N’IMPORTE QUI',0,-h/2+340,'110px Anton',INK,'center',2,lin(t,N(7),N(7)+.2));
    txt('POUVAIT FAIRE PAREIL ?',0,-h/2+470,'86px Anton',PINK,'center',2,lin(t,N(7)+.4,N(7)+.6),14);txt('LA QUESTION DE STANLEY MILGRAM',0,h/2-80,'700 28px Mono',AMB,'center',3);return 1;}
  if(c.k==='volts'){framePaper(w,h,'#cfd2c6');txt('GÉNÉRATEUR DE CHOCS · 15 → 450 VOLTS',0,-h/2+90,'700 28px Mono',INKD,'center',2);
    const n=30,x0=-w/2+60,gw=(w-120)/n;const lit=t<N(17)?0:t<N(18)?1:t<N(19)?2:Math.min(n,2+Math.floor((t-N(19))*16));
    for(let i=0;i<n;i++){const x=x0+i*gw;const on=i<lit;const col=i>=27?PINK:i>=20?'#b06a00':INKD;ctx.fillStyle=on?col:'rgba(27,28,26,.18)';ctx.fillRect(x+3,-h/2+200,gw-6,160);
      if(i%4==0||i==n-1)txt(String((i+1)*15),x+gw/2,-h/2+400,'700 18px Mono',INKD,'center');}
    const v=Math.max(15,lit*15);txt(v+' V',0,-h/2+600,'200px Anton',lit>=27?PINK:INKD,'center',2,1,lit>=27?14:0);
    if(t>=N(20))txt('« SLIGHT SHOCK » … « INTENSE SHOCK » …',0,-h/2+700,'700 26px Mono','rgba(27,28,26,.7)','center',1);
    stampAt('DANGER : SEVERE SHOCK · XXX',0,h/2-130,58,t,N(22),-.05);return 1;}
  if(c.k==='resultat'){framePaper(w,h,'rgba(30,32,30,.95)');txt('SUR 40 PERSONNES',0,-h/2+100,'700 34px Mono',AMB,'center',6);
    const T=N(47);for(let i=0;i<40;i++){const x=-w/2+110+(i%10)*83,y=-h/2+230+Math.floor(i/10)*130;const red=i<26&&t>=T+i*.05;person(x,y+50,.42,red?'#c9302c':'rgba(236,238,230,.4)');}
    if(t>=T+1.3){const q=eo(lin(t,T+1.3,T+1.5));txt('26 JUSQU’À 450 V',0,-h/2+770,'64px Anton',INK,'center',2,q);}
    if(t>=N(48)){const q=eo(lin(t,N(48),N(48)+.15));ctx.save();ctx.translate(0,-h/2+940);ctx.scale(1.3-.3*q,1.3-.3*q);txt('65 %',0,0,'150px Anton',PINK,'center',3,q,18);ctx.restore();}
    if(t>=N(50))band(h/2-60,t,N(50),'DES GENS COMME TOI ET MOI',52);return 1;}
  if(c.k==='peers'){framePaper(w,h,PAPERC);txt('L’EXPÉRIENCE N° 17 · DEUX PAIRS REFUSENT',0,-h/2+90,'700 26px Mono','rgba(27,28,26,.75)','center',1);
    const T1=N(56),T2=N(58),T3=N(59);
    [[-220,'PAIR 1'],[0,'TOI'],[220,'PAIR 2']].forEach(([x,l],i)=>{const pair=i!==1;let col='rgba(27,28,26,.5)';if(pair&&t>=T1+i*.2)col='#2f6b2a';if(!pair)col=t>=T2?'#2f6b2a':'#c9302c';
      const pk=pair&&t>=T1+i*.2?1-lin(t,T1+i*.2,T1+i*.2+.35):0;ctx.save();ctx.translate(x,-h/2+300);ctx.scale(1+pk*.25,1+pk*.25);person(0,0,.9,col);ctx.restore();txt(l,x,-h/2+380,'700 24px Mono',col,'center',2);
      if(pair&&t>=T1+i*.2)txt('NON',x,-h/2+160,'52px Anton','#2f6b2a','center',2);});
    for(let i=0;i<40;i++){const x=-w/2+110+(i%10)*83,y=-h/2+480+Math.floor(i/10)*110;const k=Math.abs((i%10)-4.5)+Math.floor(i/10);const green=i<36&&t>=T2+k*.12;person(x,y+40,.36,green?'#2f6b2a':'#c9302c');}
    if(t>=T2+1)txt('36 SUR 40 DISENT NON',0,-h/2+960,'60px Anton',INKD,'center',2,lin(t,T2+1,T2+1.2));
    stampAt('OBÉISSANCE : 10 %',0,h/2-80,70,t,T3,-.05,'#2f6b2a');return 1;}
  if(c.k==='fin'){framePaper(w,h,'rgba(30,32,30,.95)');txt('L’OBÉISSANCE',0,-h/2+170,'110px Anton',INK,'center',3);txt('ÇA S’ÉTUDIE.',0,-h/2+300,'80px Anton',INK,'center',2,lin(t,N(64),N(64)+.2));
    txt('ET ÇA SE BRISE.',0,-h/2+410,'90px Anton','#8fc283','center',2,lin(t,N(65),N(65)+.2),14);
    if(t>=N(66))txt('« TU N’AS PAS LE CHOIX » ?',0,-h/2+560,'60px Anton',PINK,'center',2,lin(t,N(66),N(66)+.2));
    if(t>=N(67))txt('REGARDE AUTOUR DE TOI.',0,-h/2+660,'700 34px Mono',AMB,'center',3,lin(t,N(67),N(67)+.2));
    if(t>=N(68))band(h/2-100,t,N(68),'IL SUFFIT DE DEUX « NON »',58,'rgba(47,107,42,.92)');return 1;}
  if(c.k==='outro'){framePaper(w,h);txt('450',0,-250,'150px Anton',PINK,'center',4,1,24);txt('VOLTS.',0,-110,'130px Anton',INK,'center',4,1,24);txt('L’EXPÉRIENCE DE MILGRAM · LA FERME',0,-30,'700 26px Mono','rgba(236,238,230,.6)','center',3);
    txt('ABONNE-TOI',0,170,'80px Anton',INK,'center',4,1,16);txt('ILS PARLENT…',0,260,'700 36px Mono',AMB,'center',3);txt('NOUS ON VÉRIFIE.',0,312,'700 36px Mono',AMB,'center',3);return 1;}
'''
SOUNDS=r'''ev(0,'boom');reveal(.3,1.1);ev(N(2),'tick');ev(TCOV-.1,'whoosh');
KEYS.forEach(k=>{if(k.t>TCOV+.1)ev(k.t-.5,'whoosh');});
C.forEach((c,i)=>{if(i>0)ev(c.t0-.05,'click');});
[N(8),N(23),N(34),N(45),N(53)].forEach(x=>reveal(x,1.1));
ev(N(4),'thud');reveal(N(7),1);ev(N(13),'tick');ev(N(14),'tick');
for(let k=0;k<28;k++)ev(N(19)+k/16,'tick');reveal(N(22),1.3);
reveal(N(24),1);ev(N(25),'thud');ev(N(27),'thud');ev(N(30),'thud');
ev(N(39),'tick');ev(N(40),'thud');reveal(N(41),1.2);ev(N(44),'thud');
for(let k=0;k<26;k++)ev(N(47)+k*.05,'tick');reveal(N(48),1.2);ev(N(50),'tick');
ev(N(56),'zap');ev(N(56)+.4,'zap');for(let k=0;k<12;k++)ev(N(58)+k*.12,'tick');reveal(N(59),1.2);
ev(WT0-.9,'riser');reveal(N(62),1);XT.forEach(([a,b,t0])=>ev(t0,'zap'));reveal(N(65),1);ev(N(66),'thud');reveal(N(68),1.2);ev(VEND+.35,'boom');'''
CRED=['Sources : S. Milgram, « Behavioral Study of Obedience » (1963) et « Obedience to Authority » (1974) · H. Arendt, « Eichmann à Jérusalem » (1963)',
 'Images : archives de l’expérience Milgram (1962), droit de citation · Israel GPO (domaine public)',
 'Musique : « Hitman », K. MacLeod · CC BY 4.0']
build('.',"« 450 VOLTS » Milgram (28/10/2026)",CARDS,HOOK,EXTRA,"[[0,0],[N(8),1],[N(23),2],[N(34),3],[N(45),4],[N(53),5]]","ACTE",SOUNDS,CRED,['eichmann'])
s=open('board.js').read();s=s.replace('t>=N(75))return;','t>=N(69))return;').replace("txt(v+'/8',0,52","txt(v+'/5',0,52").replace("v===8?RED:INK","v===5?RED:INK");open('board.js','w').write(s)
print('ok')
