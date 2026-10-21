// ---------- les cartes (ordre chronologique ; placement automatique en serpentin)
const IMC=k=>(window.CRED&&CRED[k])||'';
const C=[];const add=o=>{C.push(Object.assign({rot:0},o));return C.length-1;};
const N=k=>SEGS[ID['n'+k]].t0;
function topBox(w,h,t,t0,a,b,sz=60,col){if(t<t0)return;const p=eo(lin(t,t0,t0+.3));ctx.save();ctx.globalAlpha*=p;ctx.fillStyle=col||'rgba(10,10,10,.82)';ctx.fillRect(-400,-h/2+70,800,b?170:120);
  txt(a,0,-h/2+(b?140:150),sz+'px Anton',INK,'center',2);if(b){let s2=30;while(s2>18&&mw(b,'700 '+s2+'px Mono',3)>760)s2--;txt(b,0,-h/2+205,'700 '+s2+'px Mono',AMB,'center',3);}ctx.restore();}
function band(y,t,t0,s,sz,bg,fg){if(t<t0)return;const p=eo(lin(t,t0,t0+.25));ctx.save();ctx.globalAlpha*=p;while(sz>24&&mw(s,sz+'px Anton',2)>800)sz-=2;ctx.font=sz+'px Anton';const bw=Math.min(860,mw(s,sz+'px Anton',2)+60);ctx.fillStyle=bg||'rgba(201,48,44,.92)';ctx.fillRect(-bw/2,y-sz*.85,bw,sz*1.15);txt(s,0,y,sz+'px Anton',fg||'#fff','center',2);ctx.restore();}
const DK='rgba(10,10,10,.88)';
const cCover=add({k:'cover',w:1080,h:1920,rot:0,t0:0});
const cD1=add({k:'proof',lab:'DOSSIER',n:1,l:'L’ÉCOLE DES ÉLITES',w:880,h:760,rot:2,t0:N(3)});
const cENA=add({k:'doc',hd:'ÉCOLE NATIONALE D’ADMINISTRATION',big:'2004',l2:'IL SORT DE L’ENA',rows:[['INSPECTION GÉNÉRALE DES FINANCES',N(7)],['LE CORPS LE PLUS PRESTIGIEUX DE L’ÉTAT',N(7)+1.6]],src:'Sources : franceinfo · Wikipédia',w:920,h:820,rot:-1.5,t0:N(5)});
const cJou=add({k:'clip',full:1,img:'jouyet',handle:IMC('jouyet'),badge:'JEAN-PIERRE JOUYET',w:900,h:1050,rot:1.5,t0:N(8),
  after:(w,h,t)=>{band(-30,t,N(8),'SON PROTECTEUR',64);}});
const cD2=add({k:'proof',lab:'DOSSIER',n:2,l:'LE PREMIER ATTALI',w:880,h:760,rot:-1.5,t0:N(10)});
const cDuo1=add({k:'duo',a:'sarkozy',b:'jattali',la:'NICOLAS SARKOZY',lb:'JACQUES ATTALI',title:'2007',ta:N(12),tb:N(13),bandT:N(13)+.6,bandS:'RAPPORTEUR ADJOINT DE LA COMMISSION ATTALI',w:960,h:860,rot:2,t0:N(12)});
const cD3=add({k:'proof',lab:'DOSSIER',n:3,l:'LA BANQUE',w:880,h:760,rot:1.5,t0:N(14)});
const cRoth=add({k:'doc',hd:'BANQUE D’AFFAIRES · PARIS',big:'ROTHSCHILD',l2:'2008 : IL Y ENTRE',rows:[['2010 : ASSOCIÉ-GÉRANT',N(18)]],src:'Source : franceinfo',w:920,h:760,rot:-1.5,t0:N(16)});
const cDeal=add({k:'deal',w:940,h:900,rot:2,t0:N(19)});
const cD4=add({k:'proof',lab:'DOSSIER',n:4,l:'LE DÎNER',w:880,h:760,rot:-2,t0:N(23)});
const cBel=add({k:'clip',full:1,clip:'bel',sync:MARK.bel,handle:'@maxbellona · Instagram',badge:'REEL DU 17 SEPTEMBRE 2026',badgeRed:1,w:900,h:1500,rot:1.5,t0:N(25)});
const cDuo2=add({k:'duo',a:'battali',b:'jattali',la:'BERNARD ATTALI',sa:'EX-PATRON D’AIR FRANCE (PHOTO : UN AVION AIR FRANCE)',lb:'SON FRÈRE, JACQUES',title:'JANVIER 2012 · LE DÎNER',ta:N(28),tb:N(29),w:960,h:860,rot:-1.5,t0:N(27)});
const cPat=add({k:'patrons',w:900,h:760,rot:2,t0:N(30)});
const cDuo3=add({k:'duo',a:'rebsamen',b:'hollande',la:'FRANÇOIS REBSAMEN',fxa:.2,lb:'FRANÇOIS HOLLANDE',title:'LE MESSAGE',ta:N(33),tb:N(33)+.7,bandT:N(34),bandS:'« ON N’A QU’UNE DEMANDE À FORMULER »',stampT:N(35),stampS:'EMMANUEL MACRON',w:960,h:900,rot:-2,t0:N(33)});
const cEly=add({k:'doc',hd:'PRÉSIDENCE DE LA RÉPUBLIQUE',big:'15 MAI 2012',l2:'IL ENTRE À L’ÉLYSÉE',rows:[['SECRÉTAIRE GÉNÉRAL ADJOINT',N(36)+.8]],src:'Source : présidence de la République',w:920,h:760,rot:1.5,t0:N(36)});
const cD5=add({k:'proof',lab:'DOSSIER',n:5,l:'L’AVERTISSEMENT',w:880,h:760,rot:-1.5,t0:N(37)});
const cMin=add({k:'clip',full:1,img:'macron2015',handle:IMC('macron2015'),badge:'EMMANUEL MACRON · 2015',w:900,h:1100,rot:2,t0:N(39),
  after:(w,h,t)=>{topBox(w,h,t,N(39),'AOÛT 2014','MINISTRE DE L’ÉCONOMIE',70);band(60,t,N(40)+.6,'LE BANQUIER À BERCY',64);}});
const cMel=add({k:'clip',full:1,img:'melenchon',handle:IMC('melenchon'),badge:'JEAN-LUC MÉLENCHON',w:900,h:1050,rot:-1.5,t0:N(41),
  after:(w,h,t)=>{topBox(w,h,t,N(41),'18 OCTOBRE 2014 · FRANCE 2','« ON N’EST PAS COUCHÉ »',62);stampAt('« DÉSASTRE »',0,60,110,t,N(42)+.7,-.08);}});
const cPres=add({k:'clip',full:1,img:'macron2017',handle:IMC('macron2017'),badge:'EMMANUEL MACRON',w:900,h:1000,rot:1.5,t0:N(43),
  after:(w,h,t)=>{band(-h/2+150,t,N(43),'2016 · EN MARCHE',60);band(-h/2+250,t,N(45),'2017 · PRÉSIDENT DE LA RÉPUBLIQUE',52,DK,AMB);}});
const cD6=add({k:'proof',lab:'DOSSIER',n:6,l:'LE BILAN',w:880,h:760,rot:-2,t0:N(47)});
const cDette=add({k:'dette',w:960,h:1000,rot:1.5,t0:N(49)});
const cNote=add({k:'notes',w:920,h:820,rot:-1.5,t0:N(53)});
const cBq=add({k:'banque',w:960,h:760,rot:2,t0:N(58)});
const cOub=add({k:'oubli',w:920,h:640,rot:-1.5,t0:N(60)});
const cQ=add({k:'q2',w:960,h:680,rot:2,t0:N(63)});
const cOutro=add({k:'outro',full:1,w:900,h:900,rot:-1.5,t0:VEND+.5});
const WT0=N(57)-.1,WT1=N(58)-.3;
C[cDuo1].hl=N(57);C[cDuo2].hl=N(57)+.15;C[cRoth].hl=N(57)+.3;C[cDuo3].hl=N(57)+.45;C[cMel].hl=N(57)+.6;C[cDette].hl=N(57)+.75;
const XT=[[cDuo1,cDuo2,N(57)],[cRoth,cDeal,N(57)+.2],[cDuo3,cEly,N(57)+.4],[cMel,cDette,N(57)+.6]];
