import sys;sys.path.insert(0,'../../tools')
from hgbase import build
CARDS=r'''const cCover=add({k:'cover',w:1080,h:1920,rot:0,t0:0});
const cP4=add({k:'proof',lab:'POINT',n:4,l:'LE CAPITOLE',w:880,h:760,rot:2,t0:N(7)});
const cCap=add({k:'clip',full:1,clip:'capitol',handle:'Hunger Games : L’Embrasement (2013) · Lionsgate',badge:'DANS LE FILM · LE CAPITOLE',w:900,h:1150,rot:-1.5,t0:N(9),
  after:(w,h,t)=>{topBox(w,h,t,N(9),'LA CAPITALE VIT DANS L’EXCÈS','LES DISTRICTS PRODUISENT ET PAIENT',56);}});
const cGaz=add({k:'clip',full:1,img:'fuel',handle:'Tabl-trai · CC BY-SA 4.0',badge:'CHEZ NOUS · OCTOBRE 2026',w:900,h:1150,rot:1.5,t0:N(12),
  after:(w,h,t)=>{topBox(w,h,t,N(13),'GAZOLE ≈ 2,36 € LE LITRE','DES STATIONS À SEC',62);}});
const cSen=add({k:'clip',full:1,img:'senat',handle:'Tangopaso · domaine public',badge:'SÉNAT · BUDGET DE LA SÉCU',w:900,h:1100,rot:-2,t0:N(15),
  after:(w,h,t)=>{topBox(w,h,t,N(15),'GEL PARTIEL DES PENSIONS','LE TEXTE REPART AU SÉNAT',62);}});
const cP5=add({k:'proof',lab:'POINT',n:5,l:'LES PACIFICATEURS',w:880,h:760,rot:1.5,t0:N(16)});
const cPeace=add({k:'clip',full:1,clip:'peacekeepers',handle:'Hunger Games : L’Embrasement (2013) · Lionsgate',badge:'DANS LE FILM · COUVRE-FEU',w:900,h:1150,rot:-1.5,t0:N(18),
  after:(w,h,t)=>{topBox(w,h,t,N(18),'LES FORCES DU CAPITOLE','PARTOUT · COUVRE-FEU DANS LES DISTRICTS',58);}});
const cRue=add({k:'clip',full:1,img:'hook',handle:'J. Jaramillo · CC BY-SA',badge:'PARIS · 17 OCTOBRE 2026',w:900,h:1150,rot:2,t0:N(21),
  after:(w,h,t)=>{topBox(w,h,t,N(23),'COUVRE-FEUX · 5 GRANDES VILLES','70 000 POLICIERS ET GENDARMES',52);band(-160,t,N(25),'DES BLINDÉS',70);}});
const cJeunes=add({k:'clip',full:1,img:'lacry',handle:'LaloMassalia · CC0',badge:'IMAGE D’ILLUSTRATION',w:900,h:1100,rot:-1.5,t0:N(26),
  after:(w,h,t)=>{topBox(w,h,t,N(26),'LES PLUS JEUNES EN PREMIÈRE LIGNE','7 OCT. · LYCÉENS BLESSÉS',52);stampAt('GRENADES SUSPENDUES',0,-120,64,t,N(27)+1.5,-.07);}});
const cP6=add({k:'proof',lab:'POINT',n:6,l:'LE DISCOURS',w:880,h:760,rot:2,t0:N(28)});
const cSnowA=add({k:'clip',full:1,clip:'snow2',handle:'Hunger Games : La Révolte (2014) · Lionsgate',badge:'SNOW S’ADRESSE À TOUT PANEM',w:900,h:1150,rot:-2,t0:N(30),
  after:(w,h,t)=>{band(-160,t,N(31),'VIOLENCES · CRIMINELS · AVERTISSEMENTS',40);}});
const cMac=add({k:'clip',full:1,clip:'q1',handle:'TF1 INFO · 18 OCT. 2026',badge:'ALLOCUTION · 20 H',badgeRed:1,w:960,h:900,rot:1.5,t0:N(32),
  after:(w,h,t)=>{topBox(w,h,t,N(33),'« FACTIEUX » · « DÉLINQUANTS »','EMMANUEL MACRON',58);band(20,t,N(34),'« CEUX QUI ONT DÉTRUIT DOIVENT PAYER »',40);band(130,t,N(35),'« NOUS SERONS INTRAITABLES »',50,'rgba(10,10,10,.88)',AMB);}});
const cVS=add({k:'vs',w:960,h:1000,rot:-1.5,t0:N(36)});
const cP7=add({k:'proof',lab:'POINT',n:7,l:'L’ESPOIR DOSÉ',w:880,h:760,rot:2,t0:N(39)});
const cDose=add({k:'dose',w:940,h:1000,rot:-1.5,t0:N(41)});
const cCal=add({k:'gazcal',w:960,h:1060,rot:1.5,t0:N(45)});
const cP8=add({k:'proof',lab:'POINT',n:8,l:'LE PIÈGE',w:880,h:760,rot:-2,t0:N(52)});
const cCoin=add({k:'clip',full:1,clip:'coin',handle:'Hunger Games : La Révolte, partie 2 (2015) · Lionsgate',badge:'LA PRÉSIDENTE COIN · CHEFFE DES REBELLES',w:900,h:1150,rot:1.5,t0:N(54),
  after:(w,h,t)=>{topBox(w,h,t,N(55),'« DE NOUVEAUX HUNGER GAMES »','AVEC LES ENFANTS DU CAPITOLE',58);}});
const cDeux=add({k:'deux',w:940,h:980,rot:-1.5,t0:N(57)});
const cFin=add({k:'fin2',w:920,h:800,rot:2,t0:N(60)});
const cOutro=add({k:'outro',full:1,w:900,h:900,rot:-1.5,t0:VEND+.5});
const WT0=N(57)-.1,WT1=N(59)-.2;
C[cP4].hl=N(57);C[cP5].hl=N(57)+.15;C[cP6].hl=N(57)+.3;C[cP7].hl=N(57)+.45;C[cP8].hl=N(57)+.6;
const XT=[[cP4,cP5,N(57)],[cP5,cP6,N(57)+.2],[cP6,cP7,N(57)+.4],[cP7,cP8,N(57)+.6],[cSnowA,cCoin,N(58)]];
'''
HOOK=r'''function drawHook3(w,h,t){
  const fr=(window.CLIPS&&CLIPS.snow)||[];const im=fr.length?fr[Math.min(fr.length-1,Math.floor(t*30)%fr.length)]:null;ctx.fillStyle='#0b0c0b';ctx.fillRect(-w/2,-h/2,w,h);
  if(im){ctx.save();ctx.beginPath();ctx.rect(-w/2,-h/2,w,h);ctx.clip();const sb=Math.max(w/im.width,h/im.height)*1.1;ctx.filter='blur(28px) brightness(.55)';ctx.drawImage(im,-im.width*sb/2,-im.height*sb/2,im.width*sb,im.height*sb);
    const z=1.4+.02*t;const s=w/im.width*z;ctx.filter='contrast(1.12)';ctx.drawImage(im,-im.width*s*.6,-h/2+720-im.height*s*.5,im.width*s,im.height*s);ctx.restore();}
  {const g=ctx.createLinearGradient(0,-h/2+h*.55,0,-h/2+h*.85);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.9)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2+h*.55,w,h*.45);}
  {const g=ctx.createLinearGradient(0,-h/2,0,-h/2+420);g.addColorStop(0,'rgba(0,0,0,.8)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,420);}
  txt('PRÉSIDENT SNOW · PHRASE : HUNGER GAMES (2012) · IMAGE : LA RÉVOLTE (2014) · LIONSGATE',0,-h/2+1490,'400 18px Mono','rgba(236,238,230,.7)','center',2);
  const sl=(s,y,f,col,ta,ls,gl)=>{if(t<ta)return;const q=eo(lin(t,ta,ta+.13));const sc=1.5-.5*q;ctx.save();ctx.translate(0,y);ctx.scale(sc,sc);txt(s,0,0,f,col,'center',ls,cl(q*1.5),gl);ctx.restore();};
  sl('« UN PEU D’ESPOIR,',-h/2+200,'96px Anton',INK,0,2,16);sl('C’EST EFFICACE.',-h/2+300,'96px Anton',INK,0,2,16);
  sl('BEAUCOUP D’ESPOIR…',-h/2+1170,'110px Anton',INK,N(1),2,16);sl('C’EST DANGEREUX. »',-h/2+1280,'120px Anton',RED,N(2),2,20);
  if(t>=N(4))band(-h/2+1390,t,N(4),'HUNGER GAMES · PARTIE 2 / 2',52);
}
'''
EXTRA=r'''  if(c.k==='vs'){framePaper(w,h,'rgba(30,32,30,.95)');txt('LES MOTS',0,-h/2+100,'80px Anton',INK,'center',3);ctx.fillStyle='rgba(236,238,230,.3)';ctx.fillRect(-2,-h/2+150,4,h-330);
    txt('SNOW',-w/4,-h/2+210,'700 34px Mono',AMB,'center',4);txt('MACRON · 18/10',w/4,-h/2+210,'700 34px Mono',AMB,'center',2);
    [['VIOLENCES','FACTIEUX'],['CRIMINELS','DÉLINQUANTS'],['AVERTISSEMENTS','INTRAITABLES']].forEach(([a,b],i)=>{const t0=c.t0+.2+i*.35;if(t<t0)return;const q=eo(lin(t,t0,t0+.2));const y=-h/2+330+i*150;
      txt(a,-w/4,y,'58px Anton',INK,'center',1,q);txt(b,w/4,y,'58px Anton',PINK,'center',1,q,10);});
    stampAt('LE MÊME TON',0,h/2-230,90,t,N(37),-.06);
    if(t>=N(36))txt('LES VIOLENCES ÉTAIENT RÉELLES.',0,h/2-90,'700 30px Mono','rgba(236,238,230,.75)','center',2,lin(t,N(36),N(36)+.2));return 1;}
  if(c.k==='dose'){framePaper(w,h,PAPERC);txt('LA RECETTE DE SNOW',0,-h/2+110,'80px Anton',INKD,'center',2);
    const cx=0,cy=-h/2+520,R=280;ctx.lineWidth=46;[['#2f6b2a',Math.PI,Math.PI*1.45],[AMB,Math.PI*1.45,Math.PI*1.7],[PINK,Math.PI*1.7,Math.PI*2]].forEach(([col,a,b])=>{ctx.strokeStyle=col;ctx.beginPath();ctx.arc(cx,cy,R,a,b);ctx.stroke();});
    txt('PEUR',-R,cy+60,'700 26px Mono',INKD,'center',2);txt('RÉVOLTE',R,cy+60,'700 26px Mono',PINK,'center',2);txt('ESPOIR',0,cy-R-40,'700 30px Mono',INKD,'center',6);
    const tgt=t<N(42)?.2:t<N(43)?.5:t<N(44)?.55:.52;const ang=Math.PI+Math.PI*tgt+Math.sin(t*6)*.02*(t>=N(43)?1:0);
    ctx.save();ctx.strokeStyle=INKD;ctx.lineWidth=10;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(ang)*(R-40),cy+Math.sin(ang)*(R-40));ctx.stroke();ctx.fillStyle=INKD;ctx.beginPath();ctx.arc(cx,cy,22,0,6.283);ctx.fill();ctx.restore();
    if(t>=N(43))txt('ASSEZ POUR QUE TU TIENNES',0,-h/2+690,'52px Anton','#2f6b2a','center',1,lin(t,N(43),N(43)+.2));
    if(t>=N(44))txt('PAS ASSEZ POUR QUE TU BOUGES',0,-h/2+770,'52px Anton',PINK,'center',1,lin(t,N(44),N(44)+.2));
    darkTxt('Snow à Seneca Crane, Hunger Games (2012)',0,w,h);return 1;}
  if(c.k==='gazcal'){framePaper(w,h,PAPERC);txt('CHEZ NOUS',0,-h/2+110,'90px Anton',INKD,'center',3);
    const R=[['28 OCT.','LES STOCKS DE GAZOLE','SONT OUVERTS',N(46),INKD],['1ER NOV.','BAISSE ATTENDUE','À LA POMPE',N(47),'#2f6b2a'],['5 NOV.','GRÈVE','INTERPROFESSIONNELLE',N(48),PINK]];
    ctx.fillStyle='rgba(27,28,26,.35)';ctx.fillRect(-w/2+150,-h/2+220,6,640*lin(t,N(46),N(48)+.4));
    R.forEach(([d,a,b,t0,col],i)=>{if(t<t0)return;const y=-h/2+260+i*220;const q=eo(lin(t,t0,t0+.25));ctx.save();ctx.globalAlpha*=q;ctx.fillStyle=col;ctx.beginPath();ctx.arc(-w/2+153,y,20,0,6.283);ctx.fill();
      txt(d,-w/2+200,y+22,'70px Anton',col,'left',2);txt(a,-w/2+440,y-6,'700 24px Mono',INKD,'left',0);txt(b,-w/2+440,y+34,'700 24px Mono',INKD,'left',0);ctx.restore();});
    stampAt('CALCULÉ ? AUCUNE SOURCE',0,h/2-220,62,t,N(50),-.06,INKD);
    if(t>=N(51))band(h/2-90,t,N(51),'EXACTEMENT LA RECETTE DE SNOW',50);
    darkTxt('Sources : Journal officiel du 24/10 · AFP · Matignon',0,w,h);return 1;}
  if(c.k==='deux'){framePaper(w,h,'rgba(30,32,30,.95)');txt('LE FILM NE TE DIT PAS',0,-h/2+130,'70px Anton',INK,'center',2);txt('QUI SONT LES GENTILS.',0,-h/2+220,'70px Anton',INK,'center',2,lin(t,c.t0+.3,c.t0+.5));
    stampAt('SNOW',-200,-h/2+420,120,t,N(58),-.1,INK);stampAt('COIN',200,-h/2+420,120,t,N(58)+.3,.08,INK);
    if(t>=N(58))txt('SURVEILLE TOUS CEUX QUI VEULENT LE POUVOIR',0,-h/2+600,'700 30px Mono',AMB,'center',1,lin(t,N(58),N(58)+.2));
    if(t>=N(59))band(h/2-150,t,N(59),'LES DEUX CAMPS',80);return 1;}
  if(c.k==='fin2'){framePaper(w,h,PAPERC);txt('LA FRANCE ≠ PANEM',0,-h/2+170,'100px Anton',INKD,'center',2);
    if(t>=N(61)){['LES FILMS DISENT PARFOIS','CE QUE PERSONNE','N’OSE DIRE.'].forEach((s,i)=>txt(s,0,-h/2+330+i*100,'80px Anton',i==2?PINK:INKD,'center',2,lin(t,N(61)+i*.3,N(61)+i*.3+.2)));}return 1;}
  if(c.k==='outro'){framePaper(w,h);txt('HUNGER',0,-250,'120px Anton',INK,'center',4,1,24);txt('GAMES',0,-110,'140px Anton',PINK,'center',4,1,24);txt('CE N’EST PAS QU’UN FILM · PARTIE 2 / 2',0,-30,'700 26px Mono','rgba(236,238,230,.6)','center',3);
    txt('ABONNE-TOI',0,170,'80px Anton',INK,'center',4,1,16);txt('ILS PARLENT…',0,260,'700 36px Mono',AMB,'center',3);txt('NOUS ON VÉRIFIE.',0,312,'700 36px Mono',AMB,'center',3);return 1;}
'''
SOUNDS=r'''ev(0,'boom');ev(N(1),'thud');reveal(N(2)+.05,1.2);ev(N(4),'tick');ev(TCOV-.1,'whoosh');
KEYS.forEach(k=>{if(k.t>TCOV+.1)ev(k.t-.5,'whoosh');});
C.forEach((c,i)=>{if(i>0)ev(c.t0-.05,'click');});
[N(7),N(16),N(28),N(39)].forEach(x=>reveal(x,1.1));reveal(N(52),1.4);
ev(N(13),'tick');ev(N(15),'thud');ev(N(23),'tick');ev(N(25),'thud');ev(N(26),'tick');ev(N(27)+1.5,'thud');
ev(N(31),'tick');ev(N(33),'tick');ev(N(34),'thud');reveal(N(35),1);[0,1,2].forEach(i=>ev(C[cVS].t0+.2+i*.35,'tick'));reveal(N(37),1.1);
ev(N(42),'tick');ev(N(43),'tick');ev(N(44),'thud');[46,47,48].forEach(k=>ev(N(k),'tick'));ev(N(50),'thud');ev(N(51),'tick');
ev(N(55),'thud');ev(WT0-.9,'riser');reveal(N(57),1);XT.forEach(([a,b,t0])=>ev(t0,'zap'));ev(N(58),'thud');ev(N(58)+.3,'thud');reveal(N(59),1.2);ev(N(61),'tick');ev(VEND+.35,'boom');'''
CRED=['Sources : Hunger Games (S. Collins / Lionsgate) · TF1 INFO (allocution du 18/10) · Journal officiel · AFP · franceinfo · Sénat',
 'Extraits de films et d’allocution : droit de citation · Images : Tabl-trai, J. Jaramillo (CC BY-SA) · Tangopaso (dom. public) · LaloMassalia (CC0)',
 'Musique : « Hitman », K. MacLeod · CC BY 4.0']
build('.',"« HUNGER GAMES » partie 2 (27/10/2026)",CARDS,HOOK,EXTRA,"[[0,3],[N(7),4],[N(16),5],[N(28),6],[N(39),7],[N(52),8]]","POINT",SOUNDS,CRED,['hook','macron','fuel','senat','lacry','gj','parc3'])
print('ok')
s=open('board.js').read();s=s.replace('t>=N(75))return;','t>=N(62))return;');open('board.js','w').write(s)
