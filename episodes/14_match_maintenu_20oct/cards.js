// ---------- les cartes (ordre chronologique ; placement automatique en serpentin)
const C=[];const add=o=>{C.push(Object.assign({rot:0},o));return C.length-1;};
const N=k=>SEGS[ID['n'+k]].t0;
function topBox(w,h,t,t0,a,b,sz=60){if(t<t0)return;const p=eo(lin(t,t0,t0+.3));ctx.save();ctx.globalAlpha*=p;ctx.fillStyle='rgba(10,10,10,.82)';ctx.fillRect(-400,-h/2+70,800,b?170:120);
  txt(a,0,-h/2+(b?140:150),sz+'px Anton',INK,'center',2);if(b)txt(b,0,-h/2+205,'700 32px Mono',AMB,'center',3);ctx.restore();}
const cCover=add({k:'cover',w:1080,h:1920,rot:0,t0:0});
const cNunez=add({k:'clip',full:1,img:'nunez',handle:'France Inter · 19 oct. 2026',badge:'LAURENT NUÑEZ · MINISTRE DE L’INTÉRIEUR',w:960,h:860,rot:1.5,t0:N(9)+.5,
  after:(w,h,t)=>{topBox(w,h,t,N(10),'« LA QUESTION NE SE POSE PAS »','POINT PRESSE · MATIGNON · 19 OCT.',54);}});
const cGJ=add({k:'clip',full:1,img:'gj',handle:'Olivier Ortelpa · CC BY 2.0',badge:'IMAGES D’ARCHIVE · 8 DÉC. 2018',w:960,h:800,rot:-2,t0:N(11),
  after:(w,h,t)=>{topBox(w,h,t,N(11)+.4,'GILETS JAUNES · ACTE IV','PARIS · SAMEDI 8 DÉCEMBRE 2018');}});
const cReport=add({k:'report',w:920,h:820,rot:1.5,t0:N(12)});
const cVS=add({k:'vs',w:940,h:860,rot:-1.5,t0:N(15)});
const cBless=add({k:'bless',w:920,h:860,rot:2,t0:N(18)});
const cRisk=add({k:'risk',w:900,h:760,rot:-2,t0:N(20)});
const cSdF=add({k:'clip',full:1,img:'sdf',handle:'Darthvadrouw · CC BY-SA 4.0',badge:'IMAGES D’ARCHIVE · STADE DE FRANCE',w:960,h:700,rot:1.5,t0:N(21),
  after:(w,h,t)=>{topBox(w,h,t,N(22),'FINALE DE LA LIGUE DES CHAMPIONS','STADE DE FRANCE · 28 MAI 2022',50);stampAt('PERTES DE CONTRÔLE',0,40,52,t,N(22)+1.1,-.07);
    if(t>=N(22)+1.1)txt('— selon le Sénat',150,100,'700 26px Mono','#fff','center',1,lin(t,N(22)+1.3,N(22)+1.5));}});
const cSenat=add({k:'senat',w:920,h:900,rot:-1.5,t0:N(23)});
const cQatar=add({k:'clip',full:1,img:'doha',handle:'Zairon · CC BY 4.0',badge:'DOHA · QATAR',w:960,h:700,rot:2,t0:N(25),
  after:(w,h,t)=>{topBox(w,h,t,N(25)+.1,'LE PROPRIÉTAIRE DU PSG ?','',58);stampAt('LE QATAR',0,-20,120,t,N(26),-.08);
    if(t>=N(26)+.4){const p=eo(lin(t,N(26)+.4,N(26)+.7));ctx.save();ctx.globalAlpha*=p;ctx.fillStyle='rgba(10,10,10,.82)';ctx.fillRect(-330,60,660,56);txt('QATAR SPORTS INVESTMENTS · DEPUIS 2011',0,98,'700 24px Mono',AMB,'center',1);ctx.restore();}}});
const cTour=add({k:'tour',w:920,h:900,rot:-1.5,t0:N(27)});
const cGaz=add({k:'clip',full:1,img:'ras',handle:'Matthew Smith · CC BY 2.0',badge:'RAS LAFFAN · QATAR',badgeRed:1,w:960,h:900,rot:1.5,t0:N(32),
  after:(w,h,t)=>{topBox(w,h,t,N(32),'OFFICIELLEMENT : L’ÉNERGIE','',56);
    if(t>=N(34)+.7){const p=eo(lin(t,N(34)+.7,N(34)+1));ctx.save();ctx.globalAlpha*=p;ctx.fillStyle='rgba(10,10,10,.8)';ctx.fillRect(-400,-150,800,285);
      txt('−96 %',0,25,'200px Anton',PINK,'center',4,1,24);txt('EXPORTATIONS DE GAZ · AVRIL-AOÛT · SUR UN AN',0,105,'700 22px Mono',INK,'center',1);ctx.restore();}
    stampAt('FRAPPE DE DRONES · 2 MARS',0,-205,44,t,N(35)+.2,-.06);}});
const cVie=add({k:'clip',img:'fuel',handle:'Tabl-trai · CC BY-SA 4.0',badge:'IMAGE D’ILLUSTRATION',w:960,h:820,rot:-2,t0:N(36),
  after:(w,h,t)=>{topBox(w,h,t,N(36)+.2,'SAMEDI, DANS LA RUE :','POURQUOI ?',60);stampAt('LA VIE CHÈRE',0,20,96,t,N(38),-.07);
    if(t>=N(39)){const p=eo(lin(t,N(39),N(39)+.25));ctx.save();ctx.globalAlpha*=p;ctx.fillStyle='rgba(201,48,44,.92)';ctx.fillRect(-390,100,780,140);txt('GAZOLE · 2,36 € / L',0,195,'80px Anton','#fff','center',2);ctx.restore();}}});
const cQuest=add({k:'question',w:940,h:820,rot:1.5,t0:N(40)});
const cPreuve=add({k:'preuve',w:900,h:700,rot:-2,t0:N(42)});
const cDeux=add({k:'deux',w:940,h:1000,rot:1.5,t0:N(49)});
const cQ=add({k:'q',w:940,h:560,rot:-1.5,t0:N(51)+.3});
const cOutro=add({k:'outro',full:1,w:900,h:900,rot:-1.5,t0:VEND+.5});
// la fin : les cartes s'allument une à une sur la vue d'ensemble
const WT0=N(45)-.1,WT1=N(49)-.3;
C[cVS].hl=N(45);C[cCover].hl=N(46);C[cBless].hl=N(47);C[cSdF].hl=N(47)+.3;C[cQatar].hl=N(48);C[cGaz].hl=N(48)+.25;C[cTour].hl=N(48)+.5;
const XT=[[cCover,cVS,N(45)],[cCover,cBless,N(46)],[cBless,cSdF,N(47)],[cSdF,cSenat,N(47)+.3],[cCover,cQatar,N(48)],[cQatar,cGaz,N(48)+.25],[cTour,cVS,N(48)+.5]];
