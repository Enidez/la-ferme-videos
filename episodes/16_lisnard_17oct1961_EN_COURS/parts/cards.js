// ---------- les cartes (ordre chronologique ; placement automatique en serpentin)
const C=[];const add=o=>{C.push(Object.assign({rot:0},o));return C.length-1;};
const N=k=>SEGS[ID['n'+k]].t0;const S=id=>SEGS[ID[id]].t0;
function topBox(w,h,t,t0,a,b,sz=60,col){if(t<t0)return;const p=eo(lin(t,t0,t0+.3));ctx.save();ctx.globalAlpha*=p;ctx.fillStyle=col||'rgba(10,10,10,.82)';ctx.fillRect(-400,-h/2+70,800,b?170:120);
  txt(a,0,-h/2+(b?140:150),sz+'px Anton',INK,'center',2);if(b)txt(b,0,-h/2+205,'700 30px Mono',AMB,'center',3);ctx.restore();}
function band(y,t,t0,s,sz,bg,fg){if(t<t0)return;const p=eo(lin(t,t0,t0+.25));ctx.save();ctx.globalAlpha*=p;ctx.font=sz+'px Anton';const bw=Math.min(860,mw(s,sz+'px Anton',2)+60);ctx.fillStyle=bg||'rgba(201,48,44,.92)';ctx.fillRect(-bw/2,y-sz*.85,bw,sz*1.15);txt(s,0,y,sz+'px Anton',fg||'#fff','center',2);ctx.restore();}
const cCover=add({k:'cover',w:1080,h:1920,rot:0,t0:0});
const cLCI=add({k:'clip',full:1,clip:'q',sync:MARK.q,handle:'Montage : @quotidienofficiel · LCI',badge:'LUNDI 19 OCTOBRE · LCI',badgeRed:1,w:900,h:990,rot:-1.5,t0:N(2),
  after:(w,h,t)=>{topBox(w,h,t,N(3),'UNE ÉTUDIANTE L’INTERROGE','SUR LE 17 OCTOBRE 1961',54);stampAt('« J’ÉTAIS PAS NÉ. »',0,90,70,t,S('qd'),-.07);}});
const cCut=add({k:'cut',w:900,h:760,rot:2,t0:N(4)});
const cD1=add({k:'proof',lab:'POINT',n:1,l:'LA SUITE',w:880,h:760,rot:-1.5,t0:N(7)});
const cP1=add({k:'clip',full:1,clip:'p1',sync:MARK.p1,handle:'LCI · « La Grande Confrontation » · via X @24hPujadas',badge:'VERSION LONGUE',badgeRed:1,w:900,h:900,rot:1.5,t0:MARK.p1,
  after:(w,h,t)=>{band(-h/2+130,t,MARK.p1,'VOIX : DAVID LISNARD (HORS CHAMP)',34,'rgba(10,10,10,.88)',AMB);stampAt('COUPÉ AU MONTAGE',0,-h/2+260,64,t,MARK.p1+.35,-.07);}});
const cP2=add({k:'clip',full:1,clip:'p2',sync:MARK.p2,handle:'LCI · « La Grande Confrontation » · via X @24hPujadas',badge:'VERSION LONGUE',badgeRed:1,w:900,h:900,rot:-2,t0:MARK.p2,
  after:(w,h,t)=>{band(-h/2+170,t,N(12),'ÇA NE L’ARRANGE PAS',58);}});
const cD2=add({k:'proof',lab:'POINT',n:2,l:'CE QUI S’EST PASSÉ',w:880,h:760,rot:2,t0:N(13)});
const cPapon=add({k:'clip',full:1,img:'papon',gray:1,handle:'André Cros · CC BY-SA 4.0',badge:'MAURICE PAPON · PRÉFET DE POLICE',w:900,h:1100,rot:-1.5,t0:N(14),
  after:(w,h,t)=>{topBox(w,h,t,N(14),'5 OCTOBRE 1961','IL ANNONCE UN COUVRE-FEU',64);band(-h/2+340,t,N(16),'PAS POUR TOUT LE MONDE.',54);
    band(-h/2+430,t,N(17),'« FRANÇAIS MUSULMANS D’ALGÉRIE »',40,'rgba(10,10,10,.88)',AMB);}});
const cChif=add({k:'chif',w:920,h:900,rot:1.5,t0:N(18)});
const cPlaque=add({k:'clip',full:1,img:'plaque',aim:470,handle:'Algeria-SP · CC BY-SA 4.0',badge:'PONT SAINT-MICHEL · PARIS',w:900,h:1300,rot:-1,t0:N(20),
  after:(w,h,t)=>{band(-170,t,N(20),'DES MANIFESTANTS',64);band(-80,t,N(20)+.3,'JETÉS DANS LA SEINE',64,'rgba(10,10,10,.88)',AMB);}});
const cMorts=add({k:'morts',w:960,h:980,rot:2,t0:N(21)});
const cD3=add({k:'proof',lab:'POINT',n:3,l:'CE QUE DIT LA RÉPUBLIQUE',w:900,h:760,rot:-1.5,t0:N(26)});
const cHol=add({k:'clip',full:1,img:'hollande',handle:'COP Paris · CC0',badge:'FRANÇOIS HOLLANDE',w:900,h:1100,rot:1.5,t0:N(27),
  after:(w,h,t)=>{band(-42,t,N(27),'17 OCTOBRE 2012 · LA RÉPUBLIQUE RECONNAÎT',32,'rgba(10,10,10,.88)',INK);band(42,t,N(28)+.4,'« SANGLANTE RÉPRESSION »',62,'rgba(201,48,44,.92)');}});
const cMac=add({k:'clip',full:1,img:'macron',handle:'Commission européenne · CC BY 4.0',badge:'EMMANUEL MACRON',w:900,h:1060,rot:-1.5,t0:N(29),
  after:(w,h,t)=>{topBox(w,h,t,N(29),'16 OCTOBRE 2021','COMMUNIQUÉ DE L’ÉLYSÉE',64);band(-h/2+340,t,N(30)+.6,'« INEXCUSABLES',60,'rgba(10,10,10,.88)',AMB);band(-h/2+420,t,N(30)+1.1,'POUR LA RÉPUBLIQUE »',60,'rgba(10,10,10,.88)',AMB);}});
const cDep=add({k:'depuis',w:940,h:860,rot:2,t0:N(31)});
const cNe=add({k:'ne',w:940,h:760,rot:-1.5,t0:N(37)});
const cQ=add({k:'q2',w:940,h:640,rot:2,t0:N(38)});
const cOutro=add({k:'outro',full:1,w:900,h:900,rot:-1.5,t0:VEND+.5});
const WT0=N(35)-.1,WT1=N(37)-.3;
C[cLCI].hl=N(35);C[cP2].hl=N(35)+.15;C[cPapon].hl=N(35)+.3;C[cPlaque].hl=N(35)+.45;C[cMac].hl=N(35)+.6;
const XT=[[cLCI,cP2,N(35)],[cPapon,cPlaque,N(35)+.2],[cMorts,cHol,N(35)+.35],[cP2,cDep,N(35)+.5]];
