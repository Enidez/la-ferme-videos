// ---------- les cartes (ordre chronologique ; placement automatique en serpentin)
const C=[];const add=o=>{C.push(Object.assign({rot:0},o));return C.length-1;};
const N=k=>SEGS[ID['n'+k]].t0;
const cCover=add({k:'cover',w:1080,h:1920,rot:0,t0:0});
const cElysee=add({k:'elysee',w:940,h:820,rot:2,t0:N(1)});
const cJour=add({k:'jour',w:940,h:820,rot:-1.5,t0:N(6)});
const cS1=add({k:'step',n:1,l1:'L’ENNEMI',w:900,h:860,rot:1.5,t0:N(8),
  extra:(w,h,t)=>{if(t>=N(9))txt('LECORNU → LFI',0,h/2-230,'56px Anton',INK,'center',2,lin(t,N(9),N(9)+.2));if(t>=N(10))txt('RN → GOUVERNEMENT',0,h/2-160,'56px Anton',INK,'center',2,lin(t,N(10),N(10)+.2));
    stampAt('PERSONNE N’ACCUSE LES PRIX',0,h/2-70,42,t,N(11)+.3,-.05);}});
const cS2=add({k:'step',n:2,l1:'INTERDIRE',w:900,h:820,rot:-2,t0:N(13)});
const cMars=add({k:'clip',full:1,img:'marseille',handle:'Remontees · CC BY-SA 4.0',badge:'MARSEILLE · LUNDI 19 OCT.',badgeRed:1,w:960,h:860,rot:1.5,t0:N(15),
  after:(w,h,t)=>{if(t>=N(16)+.4){const p=eo(lin(t,N(16)+.4,N(16)+.7));ctx.save();ctx.globalAlpha=p;ctx.fillStyle='rgba(10,10,10,.82)';ctx.fillRect(-390,-h/2+70,780,170);
      txt('RASSEMBLEMENTS INTERDITS',0,-h/2+140,'60px Anton',INK,'center',2);txt('TOUTE LA VILLE · 12 H – 20 H',0,-h/2+205,'700 34px Mono',AMB,'center',3);ctx.restore();}
    if(t>=N(18))stampAt('-24 H APRÈS L’ALLOCUTION',0,110,52,t,N(18)+.3,-.07);}});
const cLaw=add({k:'law',w:920,h:880,rot:-1.5,t0:N(19)});
const cS3=add({k:'step',n:3,l1:'PUNIR',w:900,h:860,rot:2,t0:N(25),
  extra:(w,h,t)=>{if(t>=N(27))txt('COMPARUTIONS IMMÉDIATES',0,h/2-210,'52px Anton',INK,'center',2,lin(t,N(27),N(27)+.2));
    [['PARIS',N(28)],['NICE',N(29)],['TOURS',N(30)],['ST-ÉTIENNE',N(31)]].forEach(([s,t0],i)=>{if(t>=t0)txt(s,(i-1.5)*210,h/2-110,'44px Anton',PINK,'center',1,lin(t,t0,t0+.15));});}});
const cS4=add({k:'step',n:4,l1:'TON PORTE-',l2:'MONNAIE',w:900,h:860,rot:-1.5,t0:N(32)});
const cMac=add({k:'clip',full:1,clip:'mac',sync:MARK.mac[0],handle:'TF1 INFO · 18 OCT. 2026',badge:'« DÈS DEMAIN MATIN »',badgeRed:1,w:960,h:900,rot:1.5,t0:MARK.mac[0]-.25});
const cKw=add({k:'clip',full:1,clip:'kw',sync:N(35),handle:'Associated Press',badge:'KOWEÏT · LUNDI 19 OCT. 2026',w:960,h:720,rot:-2,t0:N(35)-.1,
  after:(w,h,t)=>{stampAt('PROMESSE TENUE',0,-120,60,t,N(35)+.1,-.08,GREEN);if(t>=N(37))stampAt('TAPIS ROUGE',0,60,70,t,N(37),-.06);}});
const cAcc=add({k:'accords',w:940,h:980,rot:1.5,t0:N(38)});
const cPump=add({k:'pump',w:940,h:860,rot:-2,t0:N(46)});
const cExp=add({k:'expert',w:920,h:620,rot:2,t0:N(49)});
const cCpt=add({k:'compteur',w:960,h:1000,rot:-1.5,t0:N(50)});
const cJ2=add({k:'title',lines:['JOUR 2,','DEMAIN.'],red:1,w:880,h:520,rot:2,t0:N(59)});
const cQ=add({k:'q',w:940,h:640,rot:-1.5,t0:N(61)});
const cOutro=add({k:'outro',full:1,w:900,h:900,rot:-1.5,t0:VEND+.5});
