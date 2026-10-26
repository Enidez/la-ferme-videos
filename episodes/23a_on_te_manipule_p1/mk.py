s=open('../23b_on_te_manipule_p2/board.js').read()
def rep(a,b,new):
    global s;i=s.index(a);j=s.index(b,i);s=s[:i]+new+s[j:]
s=s.replace('partie 2 (26/10/2026)','partie 1 (26/10/2026)')
rep("const cCover","{const COLS=4",'''const cCover=add({k:'cover',w:1080,h:1920,rot:0,t0:0});
const cHuit=add({k:'huit',w:940,h:1000,rot:2,t0:N(4)});
const cT1=add({k:'proof',lab:'TECHNIQUE',n:1,l:'LA PEUR',w:880,h:760,rot:-1.5,t0:N(8)});
const cNur=add({k:'clip',full:1,img:'nuremberg',handle:'US Army · domaine public',badge:'PROCÈS DE NUREMBERG · 1946',w:900,h:1150,rot:1.5,t0:N(10),
  after:(w,h,t)=>{topBox(w,h,t,N(11),'GÖRING, LE N° 2 NAZI','EN CELLULE, FACE À UN PSYCHOLOGUE AMÉRICAIN',60);band(40,t,N(14),'« C’EST FACILE. »',80);
    band(170,t,N(15),'« DITES-LEUR QU’ILS SONT ATTAQUÉS »',46,'rgba(10,10,10,.88)',AMB);}});
const cRue=add({k:'clip',full:1,img:'hook',handle:'J. Jaramillo · CC BY-SA',badge:'PARIS · 17 OCTOBRE 2026',w:900,h:1150,rot:-1.5,t0:N(17),
  after:(w,h,t)=>{topBox(w,h,t,N(18),'COUVRE-FEUX · 5 GRANDES VILLES','70 000 POLICIERS ET GENDARMES',58);}});
const cBlinde=add({k:'clip',full:1,img:'blinde',handle:'A. Prevot · CC BY-SA 4.0',badge:'DES BLINDÉS DANS LES RUES',w:900,h:1000,rot:2,t0:N(20),
  after:(w,h,t)=>{stampAt('VIOLENCES RÉELLES',0,-120,70,t,N(21),-.07,INK);band(60,t,N(25),'« PROTÉGEZ-MOI »',84);}});
const cT2=add({k:'proof',lab:'TECHNIQUE',n:2,l:'L’ENNEMI',w:880,h:760,rot:-2,t0:N(26)});
const cLas=add({k:'clip',full:1,img:'lasswell',handle:'Martap95 · CC BY-SA 4.0',badge:'HAROLD LASSWELL · 1927',w:900,h:1150,rot:1.5,t0:N(27),
  after:(w,h,t)=>{topBox(w,h,t,N(28),'« AUCUN DOUTE SUR QUI','LE PUBLIC DOIT HAÏR »',64);}});
const cMacE=add({k:'clip',full:1,img:'macron',handle:'Commission européenne · CC BY 4.0',badge:'EMMANUEL MACRON · 22 OCTOBRE',w:900,h:1150,rot:-1.5,t0:N(29),
  after:(w,h,t)=>{topBox(w,h,t,N(30),'« L’ULTRAGAUCHE »','DES ACTES « SÉDITIEUX »',70);stampAt('AUCUNE PREUVE PUBLIQUE',0,170,60,t,N(31),-.07);}});
const cTrump=add({k:'clip',full:1,img:'trump',handle:'Maison-Blanche · domaine public',badge:'DONALD TRUMP · 18 OCTOBRE',w:900,h:1150,rot:2,t0:N(32),
  after:(w,h,t)=>{topBox(w,h,t,N(33),'« THE MIGRANTS HAVE','TAKEN OVER FRANCE »',64);band(60,t,N(34),'MÊME OUTIL · AUTRE CIBLE',56);band(180,t,N(37),'ET LE PRIX DE TON PLEIN ?',50,'rgba(10,10,10,.88)',AMB);}});
const cT3=add({k:'proof',lab:'TECHNIQUE',n:3,l:'DIVISER',w:880,h:760,rot:-1.5,t0:N(38)});
const cFBI=add({k:'clip',full:1,img:'mlk',handle:'FBI · domaine public',badge:'LETTRE ANONYME DU FBI À MARTIN LUTHER KING',w:900,h:1150,rot:1.5,t0:N(40),
  after:(w,h,t)=>{topBox(w,h,t,N(40),'COINTELPRO · 1956-1971','LE FBI INFILTRE SES PROPRES CITOYENS',62);band(40,t,N(42),'PERTURBER · DISCRÉDITER · NEUTRALISER',44);
    stampAt('MONTER LES GROUPES ENTRE EUX',0,170,52,t,N(47),-.07);}});
const cTrap=add({k:'trappes',w:960,h:1100,rot:-2,t0:N(48)});
const cT4=add({k:'proof',lab:'TECHNIQUE',n:4,l:'LE CHOC',w:880,h:760,rot:2,t0:N(54)});
const cFri=add({k:'clip',full:1,img:'friedman',handle:'Friedman Foundation · CC0',badge:'MILTON FRIEDMAN · PRIX NOBEL',w:900,h:1150,rot:-1.5,t0:N(55),
  after:(w,h,t)=>{topBox(w,h,t,N(57),'« L’IMPOSSIBLE DEVIENT INÉVITABLE »','EN CRISE · PRÉFACE DE 1982',50);}});
const cSecu=add({k:'secu',w:960,h:1100,rot:1.5,t0:N(58)});
const cFin=add({k:'fin1',w:940,h:1000,rot:-1.5,t0:N(69)});
const cOutro=add({k:'outro',full:1,w:900,h:900,rot:-1.5,t0:VEND+.5});
const WT0=N(66)-.1,WT1=N(69)-.5;
C[cT1].hl=N(66);C[cT2].hl=N(66)+.15;C[cT3].hl=N(66)+.3;C[cT4].hl=N(66)+.45;
const XT=[[cT1,cT2,N(66)],[cT2,cT3,N(66)+.2],[cT3,cT4,N(66)+.4],[cT1,cT4,N(67)]];
''')
s=s.replace("ims=['hook','macron','orwell','bernays']","ims=['hook','macron','nuremberg','friedman']")
# hook texts
s=s.replace("if(t>=TT){band(-h/2+1300,t,TT,'PARTIE 2 / 2',64);}\n    txt('IL RESTE 4 TECHNIQUES',0,-h/2+1420,'700 36px Mono',AMB,'center',4,lin(t,N(3),N(3)+.2));\n    if(t>=N(4))txt('LA DERNIÈRE EST LA PLUS DANGEREUSE',0,-h/2+1470,'700 30px Mono',INK,'center',3,lin(t,N(4),N(4)+.2));",
 "if(t>=TT){band(-h/2+1300,t,TT,'PARTIE 1 / 2',64);}\n    txt('8 TECHNIQUES POUR TENIR UN PEUPLE',0,-h/2+1420,'700 34px Mono',AMB,'center',3,lin(t,N(2),N(2)+.2));\n    if(t>=N(3))txt('COMPTE AVEC NOUS',0,-h/2+1470,'700 30px Mono',INK,'center',4,lin(t,N(3),N(3)+.2));")
assert "PARTIE 1 / 2" in s
s=s.replace("'VIDÉO : AFP · PARIS · 17 OCT. 2026'","'VIDÉO : AFP · LYON · 17 OCT. 2026'").replace("'SAMEDI 17 OCTOBRE · PARIS'","'SAMEDI 17 OCTOBRE · LYON'")
# cartes dessinées propres à la partie 1
NEW='''  if(c.k==='huit'){framePaper(w,h,'rgba(30,32,30,.95)');txt('8 TECHNIQUES',0,-h/2+110,'90px Anton',INK,'center',3);
    txt('ÉCRITES NOIR SUR BLANC',0,-h/2+175,'700 30px Mono',AMB,'center',4,lin(t,N(4),N(4)+.2));
    for(let i=0;i<8;i++){const x=-w/2+140+(i%4)*220,y=-h/2+330+Math.floor(i/4)*260;const q=eo(lin(t,c.t0+.1+i*.08,c.t0+.3+i*.08));const last=i===7,hot=last&&t>=N(7);
      ctx.save();ctx.globalAlpha*=q;ctx.fillStyle=hot?'rgba(201,48,44,.45)':'rgba(128,134,126,.22)';ctx.fillRect(x-95,y-110,190,220);ctx.strokeStyle=hot?'rgba(255,70,50,.95)':'rgba(236,238,230,.4)';ctx.lineWidth=3;ctx.strokeRect(x-95,y-110,190,220);
      txt(last?'?':String(i+1),x,y+45,'140px Anton',hot?INK:'rgba(236,238,230,.45)','center',2,1,hot?18:0);ctx.restore();}
    if(t>=N(5))txt('PAR CEUX QUI LES ONT UTILISÉES… OU ÉTUDIÉES',0,h/2-200,'700 26px Mono',INK,'center',1,lin(t,N(5),N(5)+.2));
    stampAt('LA 8 : LA PLUS DANGEREUSE',0,h/2-95,56,t,N(7),-.05);return 1;}
  if(c.k==='trappes'){framePaper(w,h,PAPERC);txt('EN UNE SEMAINE',0,-h/2+100,'700 32px Mono','rgba(27,28,26,.7)','center',6);
    const R=[['17 OCT.','MANIF CONTRE','LA VIE CHÈRE',N(48),INKD],['23 OCT.','TRAPPES : UN HOMME','TIRE SUR DES PASSANTS',N(50),PINK]];
    R.forEach(([d,a,b,t0,col],i)=>{if(t<t0)return;const y=-h/2+260+i*240;const q=eo(lin(t,t0,t0+.25));ctx.save();ctx.globalAlpha*=q;txt(d,-w/2+80,y+25,'80px Anton',col,'left',2);
      txt(a,-w/2+360,y-8,'700 30px Mono',INKD,'left',0);txt(b,-w/2+360,y+38,'700 30px Mono',INKD,'left',0);ctx.restore();});
    if(t>=N(50)){const q=eo(lin(t,N(50),N(50)+.4));ctx.save();ctx.globalAlpha*=q;ctx.strokeStyle=PINK;ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(-w/2+190,-h/2+300);ctx.quadraticCurveTo(-w/2+80,-h/2+400,-w/2+190,-h/2+470);ctx.stroke();ctx.restore();}
    if(t>=N(51)){txt('« VENGER LES COMMERÇANTS »',0,-h/2+660,'66px Anton',INKD,'center',1,lin(t,N(51),N(51)+.2));txt('Selon des sources citées par Le Monde · non établi par l’enquête',0,-h/2+715,'400 22px Mono','rgba(27,28,26,.7)','center');}
    if(t>=N(53))band(h/2-170,t,N(53),'UNE GUERRE ENTRE VOISINS',64);
    darkTxt('Sources : Le Monde · parquet national antiterroriste',0,w,h);return 1;}
  if(c.k==='secu'){framePaper(w,h,'rgba(30,32,30,.95)');txt('BUDGET DE LA SÉCU 2027',0,-h/2+110,'80px Anton',INK,'center',2);
    txt('REJETÉ PAR LES DÉPUTÉS LE 23 OCT.',0,-h/2+170,'700 28px Mono',AMB,'center',2);
    if(t>=N(59))txt('AU SÉNAT : LA VERSION LA PLUS DURE',0,-h/2+280,'54px Anton',INK,'center',1,lin(t,N(59),N(59)+.2));
    rowItem(-h/2+420,w,'GEL PARTIEL','DES PENSIONS',t,N(60));rowItem(-h/2+540,w,'+ DE CSG','ARRÊTS MALADIE',t,N(61));
    if(t>=N(62))txt('HASARD DU CALENDRIER ?',0,-h/2+700,'64px Anton','rgba(236,238,230,.7)','center',2,lin(t,N(62),N(62)+.2));
    stampAt('TA RETRAITE : 9 NOVEMBRE',0,h/2-200,64,t,N(64),-.06);
    if(t>=N(65))txt('PENDANT QUE TOUT LE MONDE REGARDE LA RUE',0,h/2-80,'700 26px Mono',AMB,'center',1,lin(t,N(65),N(65)+.2));
    srcLine('Sources : PLFSS 2027 · Assemblée nationale · Sénat',w,h);return 1;}
  if(c.k==='fin1'){framePaper(w,h,'rgba(30,32,30,.95)');txt('4 / 8',0,-h/2+230,'220px Anton',INK,'center',4,1,20);
    if(t>=N(69))txt('L’OUTIL EXISTE. IL EST ÉCRIT.',0,-h/2+340,'60px Anton',AMB,'center',2,lin(t,N(69),N(69)+.2));
    for(let i=0;i<4;i++){const x=-w/2+170+i*200,y=-h/2+560;const q=eo(lin(t,N(71)+i*.1,N(71)+i*.1+.2));const last=i===3,hot=last&&t>=N(72);if(q<=0)continue;
      ctx.save();ctx.globalAlpha*=q;ctx.fillStyle=hot?'rgba(201,48,44,.5)':'rgba(128,134,126,.22)';ctx.fillRect(x-80,y-100,160,200);ctx.strokeStyle=hot?'rgba(255,70,50,.95)':'rgba(236,238,230,.4)';ctx.lineWidth=3;ctx.strokeRect(x-80,y-100,160,200);
      txt(String(5+i),x,y+40,'120px Anton',hot?INK:'rgba(236,238,230,.4)','center',2,1,hot?16:0);ctx.restore();}
    if(t>=N(74))band(h/2-130,t,N(74),'PARTIE 2 · SUR LE COMPTE',60);return 1;}
'''
s=s.replace("function cardExtra(c,t,w,h){\n","function cardExtra(c,t,w,h){\n"+NEW)
s=s.replace("txt('PARTIE 2 / 2 · LA FERME · LE DOSSIER'","txt('PARTIE 1 / 2 · LA SUITE SUR LE COMPTE'")
i=s.index("function outroCredits");j=s.index("\n",s.index("forEach((s,i)=>txt(s,0,i*36",i))
s=s[:i]+'''function outroCredits(t){const c=C[cOutro];ctx.save();ctx.translate(c.x,c.y+c.h/2+110);[
  'Sources : G. M. Gilbert, Nuremberg Diary (1947) · H. Lasswell (1927) · FBI / commission Church · M. Friedman (1982)',
  'Le Monde · franceinfo · Assemblée nationale · Sénat · ministère de l’Intérieur',
  'Images : AFP (citation) · US Army, FBI, Maison-Blanche (dom. public) · Commission européenne, J. Jaramillo, A. Prevot, Martap95 (CC) · Friedman Fdn (CC0)',
  'Musique : « Hitman », K. MacLeod · CC BY 4.0'].forEach((s,i)=>txt(s,0,i*36,'400 15px Mono','rgba(236,238,230,.75)','center'));ctx.restore();}'''+s[j:]
i=s.index("// ---------- compteur");j=s.index("// ---------- post")
H=s[i:j]
H=H.replace("const CNT=[[0,4],[N(11),5],[N(25),6],[N(35),7],[N(47),8]];","const CNT=[[0,0],[N(8),1],[N(26),2],[N(38),3],[N(54),4]];").replace("t>=N(75)","t>=N(77)")
k=H.index("// ---------- sons")
H=H[:k]+'''// ---------- sons
ev(MARK.frz,'boom');reveal(MARK.frz,1.3);ev(MARK.tt,'thud');ev(N(2),'tick');ev(N(3),'tick');ev(TCOV-.1,'whoosh');
KEYS.forEach(k=>{if(k.t>TCOV+.1)ev(k.t-.5,'whoosh');});
C.forEach((c,i)=>{if(i>0)ev(c.t0-.05,'click');});
for(let i=0;i<8;i++)ev(C[cHuit].t0+.1+i*.08,'tick');reveal(N(7),1.1);
[N(8),N(26),N(38),N(54)].forEach(x=>reveal(x,1.1));
ev(N(11),'tick');reveal(N(14),1.2);ev(N(15),'thud');ev(N(18),'tick');ev(N(20),'thud');ev(N(21),'thud');ev(N(25),'thud');
reveal(N(28),.9);ev(N(30),'tick');ev(N(31),'thud');ev(N(33),'tick');ev(N(34),'thud');ev(N(37),'tick');
ev(N(40),'tick');[43,44,45].forEach(k=>ev(N(k),'thud'));reveal(N(47),1);ev(N(48),'tick');reveal(N(50),1.1);ev(N(51),'tick');ev(N(53),'thud');
reveal(N(57),1);ev(N(59),'tick');ev(N(60),'thud');ev(N(61),'thud');ev(N(62),'tick');reveal(N(64),1.1);
ev(WT0-.9,'riser');reveal(N(66),1);XT.forEach(([a,b,t0])=>ev(t0,'zap'));ev(N(68),'thud');ev(N(71),'tick');reveal(N(72),1.3);ev(N(74),'thud');ev(VEND+.35,'boom');

'''
s=s[:i]+H+s[j:]
open('board.js','w').write(s)
