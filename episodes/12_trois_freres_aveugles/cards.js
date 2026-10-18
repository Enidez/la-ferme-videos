// ---------- les cartes (ordre chronologique ; placement automatique en serpentin)
const C=[];const add=o=>{C.push(Object.assign({rot:0},o));return C.length-1;};
const N=k=>SEGS[ID['n'+k]].t0, NE=k=>SEGS[ID['n'+k]].t1;
const HEB=k=>SEGS[ID[k]];
const cCover=add({k:'matrix',w:1080,h:1920,rot:0,t0:0});
const cMil=add({k:'mil',w:940,h:760,rot:2,t0:N(1)});
const cKafr=add({k:'clip',full:1,img:'kafr2',handle:'Nizzan Cohen · CC BY 4.0',badge:'KAFR KASSEM · ISRAËL',badgeRed:1,w:960,h:820,rot:-2,t0:N(4)});
const cTrio=add({k:'trio',w:960,h:900,rot:1.5,t0:N(7)});
const cSecret=add({k:'secret',w:940,h:640,rot:-1.5,t0:N(11)});
const cTel=add({k:'clip',full:1,img:'tel',gray:1,handle:'Wilfredor · CC BY-SA 4.0',badge:'ILS LES DÉMONTENT',w:900,h:820,rot:2,t0:N(14),
  after:(w,h,t)=>{if(t>=N(15))stampAt('IMITER N’IMPORTE QUELLE VOIX',0,40,50,t,N(15)+.3,-.07);}});
const cBraille=add({k:'clip',full:1,img:'braille',gray:1,handle:'Eddau · CC0',badge:'1989 · CENTRE POUR AVEUGLES',w:900,h:820,rot:-1.5,t0:N(16)});
const cArme=add({k:'arme',w:900,h:760,rot:1.5,t0:N(20)});
const cCall1=add({k:'call',full:1,lines:['h1','h2','h3'],stamp:['CODE OBTENU',N(25)],w:940,h:1100,rot:-1,t0:N(23)});
const cBezeq=add({k:'clip',full:1,img:'central',handle:'דוד שי · CC BY-SA 3.0',badge:'BEZEQ · L’OPÉRATEUR NATIONAL',w:620,h:1100,rot:2,t0:N(26),
  after:(w,h,t)=>{stampAt('3 LIGNES COUPÉES',0,140,64,t,N(27)+.8,-.1);}});
const cCall2=add({k:'call',full:1,lines:['h4','h5'],stamp:['LIGNES RÉTABLIES',N(30),1],w:940,h:1100,rot:1,t0:N(28)});
const cCB=add({k:'cnt',to:20000,label:'NUMÉROS DE CARTES BANCAIRES',sub:'DANS L’ORDINATEUR D’UN SEUL HOMME',src:'Wired',w:940,h:600,rot:-1.5,t0:N(32)});
const c1998=add({k:'title',lines:['1998','LE COUP LE PLUS FOU'],red:1,small2:1,w:900,h:560,rot:2,t0:N(34)});
const cRadio=add({k:'radio',w:940,h:760,rot:-2,t0:N(36)});
const c281=add({k:'cnt',to:281,label:'APPELS EN MÊME TEMPS',sub:'SUR LE STANDARD DE LA RADIO',src:'Wired',w:900,h:600,rot:1.5,t0:N(38)});
const cOrange=add({k:'clip',full:1,img:'orange',gray:1,handle:'Matson Collection · domaine public',badge:'ILLUSTRATION · ORANGERAIE DE JAFFA',w:960,h:820,rot:-1.5,t0:N(39),
  after:(w,h,t)=>{if(t>=N(40))stampAt('UNE CABANE',0,0,80,t,N(40),-.08);}});
const cFlow=add({k:'flow',w:960,h:900,rot:2,t0:N(43)});
const cBills=add({k:'title',lines:['LES FACTURES','EXPLOSENT.'],red:1,w:900,h:540,rot:-2,t0:N(46)});
const cWorker=add({k:'worker',w:940,h:660,rot:1.5,t0:N(48)});
const cWired=add({k:'wired',w:940,h:760,rot:-1.5,t0:N(51)});
const cRaid=add({k:'raid',w:940,h:860,rot:2,t0:N(54)});
const cCourt=add({k:'clip',full:1,img:'court2',handle:'Yagasi · CC0',badge:'TRIBUNAL DE DISTRICT · TEL-AVIV',w:900,h:820,rot:-2,t0:N(59),
  after:(w,h,t)=>{if(t>=N(59)+.3){ctx.save();ctx.globalAlpha=eo(lin(t,N(59)+.3,N(59)+.6));ctx.fillStyle='rgba(10,10,10,.75)';ctx.fillRect(-380,-h/2+70,760,110);txt('44 CHEFS D’ACCUSATION',0,-h/2+148,'64px Anton',INK,'center',2);ctx.restore();}
    if(t>=N(60)){ctx.save();ctx.globalAlpha=eo(lin(t,N(60),N(60)+.3));ctx.fillStyle='rgba(201,48,44,.85)';ctx.fillRect(-300,-h/2+200,600,90);txt('27 MOIS DE PROCÈS',0,-h/2+262,'56px Anton','#fff','center',2);ctx.restore();}}});
const cVerdict=add({k:'verdict',w:940,h:820,rot:1.5,t0:N(61)});
const cVersions=add({k:'versions',w:960,h:820,rot:-1.5,t0:N(67)});
const cSources=add({k:'sources',w:940,h:900,rot:2,t0:N(71)});
const cAfter=add({k:'after',w:940,h:700,rot:-2,t0:N(74)});
const cQ=add({k:'q',w:960,h:800,rot:1.5,t0:N(77)});
const cOutro=add({k:'outro',full:1,w:900,h:900,rot:-1.5,t0:VEND+.5});
