import sys,os;sys.path.insert(0,'../../tools')
from hgbase import build
CARDS=r'''const cCover=add({k:'cover',w:1080,h:1920,rot:0,t0:0});
const cTitle=add({k:'hgtitle',w:920,h:760,rot:-1.5,t0:N(3)});
const cP1=add({k:'proof',lab:'POINT',n:1,l:'L’ORIGINE',w:880,h:760,rot:2,t0:N(6)});
const cZap=add({k:'zap',w:960,h:1100,rot:-1.5,t0:N(8)});
const cP2=add({k:'proof',lab:'POINT',n:2,l:'LE NOM DU PAYS',w:880,h:760,rot:1.5,t0:N(19)});
const cPanem=add({k:'panem',w:940,h:1060,rot:-2,t0:N(21)});
const cMatch=add({k:'clip',full:1,img:'parc3',handle:'Kilyac · CC BY-SA',badge:'PARC DES PRINCES · IMAGE D’ARCHIVE',w:900,h:1100,rot:1.5,t0:N(30),
  after:(w,h,t)=>{topBox(w,h,t,N(30),'LES MANIFS : INTERDITES','CE MOIS-CI',66);stampAt('LE MATCH : MAINTENU',0,-60,70,t,N(32),-.07);}});
const cP3=add({k:'proof',lab:'POINT',n:3,l:'LE GESTE',w:880,h:760,rot:-1.5,t0:N(33)});
const cSalute=add({k:'clip',full:1,clip:'katniss',handle:'Hunger Games (2012) · Lionsgate',badge:'DANS LE FILM',w:900,h:1150,rot:2,t0:N(35),
  after:(w,h,t)=>{topBox(w,h,t,N(36),'TROIS DOIGTS LEVÉS','LE SIGNE DE LA RÉVOLTE',66);}});
const cThai=add({k:'clip',full:1,img:'thai',handle:'Photo de presse · Khon Kaen, 19 nov. 2014',badge:'THAÏLANDE · DEVANT LE PREMIER MINISTRE',w:900,h:1150,rot:-1.5,t0:N(38),
  after:(w,h,t)=>{topBox(w,h,t,N(38),'NOV. 2014 · APRÈS LE COUP D’ÉTAT','5 ÉTUDIANTS ARRÊTÉS À KHON KAEN',52);band(-160,t,N(42),'CINÉMA SCALA : FILM DÉPROGRAMMÉ',46);stampAt('ARRÊTÉS POUR 3 DOIGTS',0,-30,62,t,N(44),-.07);}});
const cAsie=add({k:'asie',w:940,h:1000,rot:2,t0:N(45)});
const cOP=add({k:'onepiece',w:960,h:1100,rot:-1.5,t0:N(48)});
const cFin=add({k:'fin1',w:920,h:900,rot:1.5,t0:N(52)});
const cOutro=add({k:'outro',full:1,w:900,h:900,rot:-1.5,t0:VEND+.5});
const WT0=N(52)-.1,WT1=N(53)-.2;
C[cP1].hl=N(52);C[cP2].hl=N(52)+.15;C[cP3].hl=N(52)+.3;
const XT=[[cP1,cP2,N(52)],[cP2,cP3,N(52)+.2],[cSalute,cThai,N(52)+.4],[cThai,cOP,N(52)+.6]];
'''
HOOK=r'''function drawHook3(w,h,t){
  const fr=(window.CLIPS&&CLIPS.salute)||[];let im=fr.length?fr[Math.min(fr.length-1,Math.floor(t*30))]:IM.thai;ctx.fillStyle='#0b0c0b';ctx.fillRect(-w/2,-h/2,w,h);
  if(im){ctx.save();ctx.beginPath();ctx.rect(-w/2,-h/2,w,h);ctx.clip();const sb=Math.max(w/im.width,h/im.height)*1.1;ctx.filter='blur(28px) brightness(.55)';ctx.drawImage(im,-im.width*sb/2,-im.height*sb/2,im.width*sb,im.height*sb);
    const z=(fr.length?1.9:1.0)+.02*t;const s=w/im.width*z;ctx.filter='contrast(1.12)';ctx.drawImage(im,-im.width*s*.5,-h/2+720-im.height*s*.5,im.width*s,im.height*s);ctx.restore();}
  {const g=ctx.createLinearGradient(0,-h/2+h*.55,0,-h/2+h*.85);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.9)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2+h*.55,w,h*.45);}
  {const g=ctx.createLinearGradient(0,-h/2,0,-h/2+420);g.addColorStop(0,'rgba(0,0,0,.8)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,420);}
  txt(fr.length?'HUNGER GAMES (2012) · LIONSGATE':'THAÏLANDE · KHON KAEN · 2014',0,-h/2+1490,'400 18px Mono','rgba(236,238,230,.7)','center',2);
  const sl=(s,y,f,col,ta,ls,gl)=>{if(t<ta)return;const q=eo(lin(t,ta,ta+.13));const sc=1.5-.5*q;ctx.save();ctx.translate(0,y);ctx.scale(sc,sc);txt(s,0,0,f,col,'center',ls,cl(q*1.5),gl);ctx.restore();};
  sl('CE GESTE VIENT',-h/2+210,'110px Anton',INK,0,2,16);sl('D’UN FILM.',-h/2+330,'110px Anton',INK,0,2,16);
  sl('DANS LA VRAIE VIE…',-h/2+1170,'100px Anton',INK,N(1),2,16);if(t>=N(2))stampAt('IL T’ENVOIE EN PRISON',0,-h/2+1310,80,t,N(2),-.06,RED);
}
'''
EXTRA=r'''  if(c.k==='hgtitle'){framePaper(w,h,'rgba(30,32,30,.95)');txt('HUNGER',0,-h/2+230,'170px Anton',INK,'center',6,1,20);txt('GAMES',0,-h/2+400,'190px Anton',PINK,'center',6,lin(t,c.t0+.2,c.t0+.4),22);
    txt('CE N’EST PAS QU’UN FILM.',0,-h/2+520,'60px Anton',INK,'center',2,lin(t,N(4),N(4)+.2));if(t>=N(5))band(h/2-110,t,N(5),'LA PREUVE EN 8 POINTS',52);return 1;}
  if(c.k==='zap'){framePaper(w,h,'rgba(30,32,30,.95)');txt('2003',0,-h/2+130,'130px Anton',AMB,'center',4,1,16);
    const tv=(x,lab,t0,col,img)=>{if(t<t0)return;const q=eo(lin(t,t0,t0+.25));ctx.save();ctx.globalAlpha*=q;ctx.fillStyle='#111';ctx.fillRect(x-190,-h/2+230,380,280);ctx.strokeStyle='rgba(236,238,230,.6)';ctx.lineWidth=6;ctx.strokeRect(x-190,-h/2+230,380,280);
      const r=rng(Math.floor(t*12)+x);for(let i=0;i<90;i++){ctx.fillStyle=`rgba(255,255,255,${r()*.25})`;ctx.fillRect(x-180+r()*360,-h/2+240+r()*260,6,3);}
      txt(lab,x,-h/2+395,'52px Anton',col,'center',2,1,10);ctx.restore();};
    tv(-215,'TÉLÉRÉALITÉ',N(10),INK);tv(215,'GUERRE EN IRAK',N(12),PINK);
    if(t>=N(13)){const q=eo(lin(t,N(13),N(13)+.4));txt('↓',0,-h/2+600,'90px Anton',AMB,'center',0,q);}
    if(t>=N(14))txt('DES JEUNES QUI S’AFFRONTENT',0,-h/2+720,'60px Anton',INK,'center',1,lin(t,N(14),N(14)+.2));
    if(t>=N(15))txt('DEVANT DES MILLIONS DE SPECTATEURS',0,-h/2+790,'700 30px Mono',AMB,'center',2,lin(t,N(15),N(15)+.2));
    if(t>=N(17))band(h/2-160,t,N(17),'ELLE N’A RIEN INVENTÉ',58);
    srcLine('Suzanne Collins, autrice de Hunger Games (2008)',w,h);return 1;}
  if(c.k==='panem'){framePaper(w,h,PAPERC);txt('PANEM',0,-h/2+200,'190px Anton',INKD,'center',10,lin(t,c.t0,c.t0+.2));
    if(t>=N(23))txt('JUVÉNAL · SATIRES · VERS L’AN 100',0,-h/2+290,'700 30px Mono','rgba(27,28,26,.7)','center',3,lin(t,N(23),N(23)+.2));
    if(t>=N(24))txt('« PANEM ET CIRCENSES »',0,-h/2+420,'80px Anton',INKD,'center',2,lin(t,N(24),N(24)+.2));
    if(t>=N(25))txt('DU PAIN…',-210,-h/2+570,'84px Anton',INKD,'center',2,lin(t,N(25),N(25)+.15));
    if(t>=N(26))txt('ET DES JEUX.',200,-h/2+570,'84px Anton',PINK,'center',2,lin(t,N(26),N(26)+.15),12);
    if(t>=N(28)){['UN PEUPLE NOURRI ET DISTRAIT'].forEach((s,i)=>txt(s,0,-h/2+720,'54px Anton',INKD,'center',1,lin(t,N(28),N(28)+.2)));stampAt('NE SE RÉVOLTE PAS',0,-h/2+860,90,t,N(29),-.06);}
    darkTxt('Juvénal, Satires, X, 81',0,w,h);return 1;}
  if(c.k==='asie'){framePaper(w,h,'rgba(30,32,30,.95)');txt('LE GESTE TRAVERSE L’ASIE',0,-h/2+110,'70px Anton',INK,'center',2);
    [['THAÏLANDE','2014 · CONTRE LA JUNTE',c.t0,'thai'],['HONG KONG','2014 · RÉVOLUTION DES PARAPLUIES',N(46),'hongkong'],['BIRMANIE','2021 · APRÈS LE COUP D’ÉTAT',N(47),'myanmar']].forEach(([a,b,t0,im],i)=>{if(t<t0)return;const y=-h/2+300+i*240;const q=eo(lin(t,t0,t0+.25));ctx.save();ctx.globalAlpha*=q;
      ctx.fillStyle='rgba(128,134,126,.22)';ctx.fillRect(-w/2+40,y-100,w-80,200);if(IM[im])panel(IM[im],-w/2+60,y-85,260,170,.5,1,'grayscale(.3)');else{ctx.fillStyle='rgba(201,48,44,.35)';ctx.fillRect(-w/2+60,y-85,260,170);txt('✋',-w/2+190,y+30,'90px Anton',INK,'center');}
      txt(a,-w/2+350,y-5,'64px Anton',INK,'left',2);txt(b,-w/2+350,y+45,'700 24px Mono',AMB,'left',1);ctx.restore();});
    srcLine('Sources : Khaosod English · SCMP · LMU Asia Media · CBS',w,h);return 1;}
  if(c.k==='onepiece'){framePaper(w,h,'rgba(30,32,30,.95)');txt('GÉNÉRATION Z · 2025',0,-h/2+100,'700 34px Mono',AMB,'center',6);
    panel(IM.nepal,-w/2+40,-h/2+150,w/2-50,360,.5,1,'none');panel(IM.indonesie,10,-h/2+150,w/2-50,360,.5,1,'none');txt('NÉPAL · SEPT. 2025',-w/4,-h/2+540,'700 22px Mono',AMB,'center',2);txt('INDONÉSIE · 2025',w/4,-h/2+540,'700 22px Mono',AMB,'center',2);
    txt('LE DRAPEAU PIRATE DE ONE PIECE',0,-h/2+610,'54px Anton',INK,'center',1,lin(t,N(49),N(49)+.2));
    [['NÉPAL',N(50),PINK],['INDONÉSIE',N(50)+.3,INK],['MADAGASCAR',N(50)+.45,INK],['MAROC',N(50)+.6,INK]].forEach(([s,t0,col],i)=>{if(t>=t0)txt(s,(i%2?1:-1)*220,-h/2+690+Math.floor(i/2)*90,'60px Anton',col,'center',2,lin(t,t0,t0+.2));});
    stampAt('NÉPAL : LE GOUVERNEMENT TOMBE',0,h/2-150,56,t,N(51),-.05);srcLine('Photos de presse · Source : NPR, 5 oct. 2025',w,h);return 1;}
  if(c.k==='fin1'){framePaper(w,h,PAPERC);txt('LA FICTION',0,-h/2+170,'120px Anton',INKD,'center',3);txt('EST SORTIE DE L’ÉCRAN.',0,-h/2+300,'90px Anton',PINK,'center',2,lin(t,c.t0+.3,c.t0+.5));
    if(t>=N(53))txt('LA FRANCE ≠ PANEM · MAIS LES RESSEMBLANCES SONT LÀ',0,-h/2+400,'700 26px Mono',INKD,'center',1,lin(t,N(53),N(53)+.2));
    if(t>=N(55)){txt('PARTIE 2 :',0,-h/2+520,'60px Anton',INKD,'center',2);['LE CAPITOLE','LES PACIFICATEURS','LA PHRASE DE SNOW'].forEach((s,i)=>txt(s,0,-h/2+610+i*80,'64px Anton',i==2?PINK:INKD,'center',2,lin(t,N(55)+.3+i*.4,N(55)+.5+i*.4)));}return 1;}
  if(c.k==='outro'){framePaper(w,h);txt('HUNGER',0,-250,'120px Anton',INK,'center',4,1,24);txt('GAMES',0,-110,'140px Anton',PINK,'center',4,1,24);txt('CE N’EST PAS QU’UN FILM · PARTIE 1 / 2',0,-30,'700 26px Mono','rgba(236,238,230,.6)','center',3);
    txt('ABONNE-TOI',0,170,'80px Anton',INK,'center',4,1,16);txt('ILS PARLENT…',0,260,'700 36px Mono',AMB,'center',3);txt('NOUS ON VÉRIFIE.',0,312,'700 36px Mono',AMB,'center',3);return 1;}
'''
SOUNDS=r'''ev(0,'boom');ev(N(1),'thud');reveal(N(2),1.3);reveal(N(3),1.1);ev(N(5),'tick');ev(TCOV-.1,'whoosh');
KEYS.forEach(k=>{if(k.t>TCOV+.1)ev(k.t-.5,'whoosh');});
C.forEach((c,i)=>{if(i>0)ev(c.t0-.05,'click');});
[N(6),N(19),N(33)].forEach(x=>reveal(x,1.1));
ev(N(10),'zap');ev(N(12),'zap');ev(N(14),'tick');reveal(N(17),1);
ev(N(23),'tick');ev(N(24),'thud');ev(N(25),'tick');ev(N(26),'tick');reveal(N(29),1.1);ev(N(32),'thud');
ev(N(36),'tick');ev(N(38),'tick');ev(N(42),'thud');reveal(N(44),1.2);ev(N(46),'tick');ev(N(47),'tick');
ev(N(49),'tick');[0,.3,.45,.6].forEach(d=>ev(N(50)+d,'tick'));reveal(N(51),1.2);
ev(WT0-.9,'riser');reveal(N(52),1);XT.forEach(([a,b,t0])=>ev(t0,'zap'));ev(N(55),'tick');ev(VEND+.35,'boom');'''
CRED=['Sources : S. Collins (British Council, LitCharts) · Juvénal, Satires X · Khaosod English · SCMP · CBC · LMU Asia Media · NPR (2025)',
 'Extraits de films : Hunger Games (Lionsgate), droit de citation · Images : Milktea2020, Kilyac (CC BY-SA) · LaloMassalia (CC0)',
 'Musique : « Hitman », K. MacLeod · CC BY 4.0']
build('.',"« HUNGER GAMES » partie 1 (27/10/2026)",CARDS,HOOK,EXTRA,"[[0,0],[N(6),1],[N(19),2],[N(33),3]]","POINT",SOUNDS,CRED,['hook','parc3','lacry','thai','hongkong','myanmar','nepal','indonesie','collins'])
s=open('board.js').read();s=s.replace('t>=N(75))return;','t>=N(58))return;');open('board.js','w').write(s)
print('ok')
