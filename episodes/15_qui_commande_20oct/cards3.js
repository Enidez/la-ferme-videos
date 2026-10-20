// ---------- les cartes (ordre chronologique ; placement automatique en serpentin)
const C=[];const add=o=>{C.push(Object.assign({rot:0},o));return C.length-1;};
const N=k=>SEGS[ID['n'+k]].t0;
function topBox(w,h,t,t0,a,b,sz=60,col){if(t<t0)return;const p=eo(lin(t,t0,t0+.3));ctx.save();ctx.globalAlpha*=p;ctx.fillStyle=col||'rgba(10,10,10,.82)';ctx.fillRect(-400,-h/2+70,800,b?170:120);
  txt(a,0,-h/2+(b?140:150),sz+'px Anton',INK,'center',2);if(b)txt(b,0,-h/2+205,'700 30px Mono',AMB,'center',3);ctx.restore();}
function band(y,t,t0,s,sz,bg,fg){if(t<t0)return;const p=eo(lin(t,t0,t0+.25));ctx.save();ctx.globalAlpha*=p;ctx.font=sz+'px Anton';const bw=Math.min(860,mw(s,sz+'px Anton',2)+60);ctx.fillStyle=bg||'rgba(201,48,44,.92)';ctx.fillRect(-bw/2,y-sz*.85,bw,sz*1.15);txt(s,0,y,sz+'px Anton',fg||'#fff','center',2);ctx.restore();}
const cCover=add({k:'cover',w:1080,h:1920,rot:0,t0:0});
const cD1=add({k:'proof',lab:'DOSSIER',n:1,l:'L’HOMME MASQUÉ',w:880,h:760,rot:2,t0:N(7)});
const cReims=add({k:'clip',full:1,img:'reims',handle:'Vidéo : Anthony Smith (LFI) · X',badge:'REIMS · 2 OCTOBRE 2026',badgeRed:1,w:900,h:1300,rot:-1.5,t0:N(9),
  after:(w,h,t)=>{topBox(w,h,t,N(10),'POLICIER DE LA BAC · EN CIVIL','CONFIRMÉ PAR LA PRÉFECTURE',54);stampAt('GRENADE',0,-60,90,t,N(12),-.08);
    band(110,t,N(13),'PAS DE BRASSARD · PAS DE RIO',52);}});
const cLaw=add({k:'law2',w:940,h:900,rot:1.5,t0:N(14)});
const cRappel=add({k:'title',lines:['ÇA RAPPELLE','QUELQU’UN…'],red:1,w:880,h:520,rot:-2,t0:N(23)});
const cBen=add({k:'clip',full:1,img:'benalla',handle:'Police92 · CC BY-SA 3.0',badge:'ALEXANDRE BENALLA',w:900,h:1000,rot:1.5,t0:N(26),
  after:(w,h,t)=>{topBox(w,h,t,N(26),'1ER MAI 2018','UN « POLICIER » FRAPPE DEUX MANIFESTANTS',62);band(40,t,N(27),'CE N’ÉTAIT PAS UN POLICIER',54);
    band(150,t,N(28),'ADJOINT DU CHEF DE CABINET DU PRÉSIDENT',38,'rgba(10,10,10,.88)',AMB);stampAt('CONDAMNÉ · DÉFINITIF',0,-140,64,t,N(30),-.08);}});
const cD2=add({k:'proof',lab:'DOSSIER',n:2,l:'LES ORDRES',w:880,h:760,rot:-1.5,t0:N(32)});
const cOrd=add({k:'ordres',w:960,h:1100,rot:2,t0:N(34)});
const cD3=add({k:'proof',lab:'DOSSIER',n:3,l:'LE 17 OCTOBRE',w:880,h:760,rot:1.5,t0:N(45)});
const cLacry=add({k:'clip',full:1,img:'lacry',handle:'LaloMassalia · CC0',badge:'IMAGE D’ILLUSTRATION',w:960,h:820,rot:-2,t0:N(47),
  after:(w,h,t)=>{topBox(w,h,t,N(47),'STRASBOURG · TIR DE LBD','UN HOMME GRAVEMENT BLESSÉ À L’ŒIL',58);stampAt('UNE MAIN ARRACHÉE',0,60,72,t,N(49),-.07);}});
const cMille=add({k:'mille',w:920,h:860,rot:1.5,t0:N(50)});
const cLim=add({k:'limoges',w:900,h:760,rot:-1.5,t0:N(52)});
const cD4=add({k:'proof',lab:'DOSSIER',n:4,l:'LES DEUX VITESSES',w:880,h:760,rot:2,t0:N(55)});
const cVit=add({k:'vitesse',w:980,h:1060,rot:-1.5,t0:N(56)+.4});
const cQui=add({k:'qui',w:920,h:700,rot:1.5,t0:N(68)});
const cMac=add({k:'clip',full:1,img:'elysee',handle:'Élysée · CC BY-SA',badge:'DIMANCHE 18 OCTOBRE · 20 H',w:960,h:820,rot:-1.5,t0:N(72),
  after:(w,h,t)=>{topBox(w,h,t,N(74),'« TOUTE LA TRANSPARENCE SERA FAITE »','EMMANUEL MACRON',50);stampAt('ON VA VÉRIFIER.',0,60,84,t,N(75),-.07,GREEN);}});
const cQ=add({k:'q2',w:940,h:600,rot:2,t0:N(76)});
const cOutro=add({k:'outro',full:1,w:900,h:900,rot:-1.5,t0:VEND+.5});
const WT0=N(64)-.1,WT1=N(68)-.3;
C[cOrd].hl=N(64);C[cD2].hl=N(65);C[cReims].hl=N(66);C[cLacry].hl=N(67);C[cMille].hl=N(67)+.25;
const XT=[[cOrd,cReims,N(64)],[cOrd,cLacry,N(65)],[cReims,cBen,N(66)],[cLacry,cMille,N(67)],[cMille,cVit,N(67)+.3]];
