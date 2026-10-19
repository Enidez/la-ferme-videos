// ---------- les cartes (ordre chronologique ; placement automatique en serpentin)
const C=[];const add=o=>{C.push(Object.assign({rot:0},o));return C.length-1;};
const N=k=>SEGS[ID['n'+k]].t0;const K=k=>SEGS[ID['k'+k]].t0;
function topBox(w,h,t,t0,a,b,sz=60){if(t<t0)return;const p=eo(lin(t,t0,t0+.3));ctx.save();ctx.globalAlpha*=p;ctx.fillStyle='rgba(10,10,10,.82)';ctx.fillRect(-400,-h/2+70,800,b?170:120);
  txt(a,0,-h/2+(b?140:150),sz+'px Anton',INK,'center',2);if(b)txt(b,0,-h/2+205,'700 32px Mono',AMB,'center',3);ctx.restore();}
const cCover=add({k:'cover',w:1080,h:1920,rot:0,t0:0});
const cTrois=add({k:'title',lines:['3 PREUVES.','REGARDE BIEN.'],red:1,w:900,h:560,rot:2,t0:K(10)});
const cP1=add({k:'proof',n:1,l:'LES POLICIERS',w:880,h:760,rot:-1.5,t0:K(12)});
const cBless=add({k:'bless',w:920,h:860,rot:2,t0:N(18)});
const cRisk=add({k:'risk',w:900,h:760,rot:-2,t0:N(20)});
const cP2=add({k:'proof',n:2,l:'LE PRÉCÉDENT',w:880,h:760,rot:1.5,t0:K(13)});
const cSdF=add({k:'clip',full:1,img:'sdf',handle:'Darthvadrouw · CC BY-SA 4.0',badge:'IMAGES D’ARCHIVE · STADE DE FRANCE',w:960,h:700,rot:1.5,t0:N(21),
  after:(w,h,t)=>{topBox(w,h,t,N(22),'FINALE DE LA LIGUE DES CHAMPIONS','STADE DE FRANCE · 28 MAI 2022',50);stampAt('PERTES DE CONTRÔLE',0,40,52,t,N(22)+.9,-.07);}});
const cSenat=add({k:'senat',w:920,h:900,rot:-1.5,t0:N(23)});
const cP3=add({k:'proof',n:3,l:'LE MINISTRE',w:880,h:760,rot:2,t0:K(14)});
const cNunez=add({k:'clip',full:1,img:'nunez',handle:'France Inter · 19 oct. 2026',badge:'LAURENT NUÑEZ · MINISTRE DE L’INTÉRIEUR',w:960,h:860,rot:1.5,t0:N(9),
  after:(w,h,t)=>{topBox(w,h,t,N(10),'« LA QUESTION NE SE POSE PAS »','POINT PRESSE · MATIGNON · 19 OCT.',54);}});
const cVS=add({k:'vs',w:940,h:860,rot:-1.5,t0:N(15)});
const cVie=add({k:'clip',img:'fuel',handle:'Tabl-trai · CC BY-SA 4.0',badge:'IMAGE D’ILLUSTRATION',w:960,h:820,rot:-2,t0:N(36),
  after:(w,h,t)=>{topBox(w,h,t,N(36)+.2,'SAMEDI, DANS LA RUE :','POURQUOI ?',60);stampAt('LA VIE CHÈRE',0,20,96,t,N(38),-.07);
    if(t>=N(39)){const p=eo(lin(t,N(39),N(39)+.25));ctx.save();ctx.globalAlpha*=p;ctx.fillStyle='rgba(201,48,44,.92)';ctx.fillRect(-390,100,780,140);txt('GAZOLE · 2,36 € / L',0,195,'80px Anton','#fff','center',2);ctx.restore();}}});
const cDeux=add({k:'deux',w:940,h:1000,rot:1.5,t0:N(49)});
const cQ=add({k:'q',w:940,h:560,rot:-1.5,t0:N(51)});
const cOutro=add({k:'outro',full:1,w:900,h:900,rot:-1.5,t0:VEND+.5});
const WT0=N(45)-.1,WT1=N(49)-.3;
C[cVS].hl=N(45);C[cCover].hl=N(46);C[cBless].hl=N(47);C[cRisk].hl=N(47)+.25;C[cNunez].hl=N(48);C[cSenat].hl=N(48)+.3;
const XT=[[cCover,cVS,N(45)],[cCover,cBless,N(46)],[cBless,cRisk,N(47)],[cRisk,cNunez,N(47)+.3],[cCover,cNunez,N(48)],[cSdF,cVS,N(48)+.3]];
