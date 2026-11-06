// ---------- les cartes (ordre chronologique ; placement automatique en serpentin)
const IMC=k=>(window.CRED&&CRED[k])||'';
const C=[];const add=o=>{C.push(Object.assign({rot:0},o));return C.length-1;};
const N=k=>SEGS[ID['n'+k]].t0;const NE=k=>SEGS[ID['n'+k]].t1;
function topBox(w,h,t,t0,a,b,sz=60,col){if(t<t0)return;const p=eo(lin(t,t0,t0+.3));ctx.save();ctx.globalAlpha*=p;ctx.fillStyle=col||'rgba(10,10,10,.82)';ctx.fillRect(-400,-h/2+70,800,b?170:120);
  txt(a,0,-h/2+(b?140:150),sz+'px Anton',INK,'center',2);if(b){let s2=30;while(s2>18&&mw(b,'700 '+s2+'px Mono',3)>760)s2--;txt(b,0,-h/2+205,'700 '+s2+'px Mono',AMB,'center',3);}ctx.restore();}
function band(y,t,t0,s,sz,bg,fg){if(t<t0)return;const p=eo(lin(t,t0,t0+.25));ctx.save();ctx.globalAlpha*=p;while(sz>24&&mw(s,sz+'px Anton',2)>800)sz-=2;ctx.font=sz+'px Anton';const bw=Math.min(860,mw(s,sz+'px Anton',2)+60);ctx.fillStyle=bg||'rgba(201,48,44,.92)';ctx.fillRect(-bw/2,y-sz*.85,bw,sz*1.15);txt(s,0,y,sz+'px Anton',fg||'#fff','center',2);ctx.restore();}
const DK='rgba(10,10,10,.88)',VERT='#2f9a4c';
const cCover=add({k:'cover',w:1080,h:1920,rot:0,t0:0});
const cVis=add({k:'viseur',full:1,hold:1,zf:1040,w:900,h:1150,rot:-1,t0:N(2)});
const cWL=add({k:'clip',full:1,hold:1,img:'assange',handle:'Photo : Snapperjack · CC BY-SA 2.0',badge:'JULIAN ASSANGE · 38 ANS',w:900,h:1050,rot:1.5,t0:N(10),
  after:(w,h,t)=>{topBox(w,h,t,N(10)+.3,'5 AVRIL 2010','IL MET LA VIDÉO EN LIGNE',70);band(-h/2+330,t,N(11)+2.4,'WIKILEAKS',80,'rgba(201,48,44,.92)');band(h/2-260,t,N(12),'LE MONDE DÉCOUVRE LA GUERRE',50,DK,AMB);}});
const cDocs=add({k:'docs',w:940,h:900,rot:-2,t0:N(13)+.6});
const cMan=add({k:'manning',hold:1,w:940,h:1000,rot:1.5,t0:SEGS[ID.m0].t0});
const cVs=add({k:'vs14',w:940,h:640,rot:-1.5,t0:N(14)});
const cTraque=add({k:'proof',lab:'CHAPITRE',n:2,l:'LA TRAQUE',w:880,h:760,rot:2,t0:N(15)});
const cAmb=add({k:'clip',full:1,img:'balcon',handle:'Photo : wl dreamer · CC BY-SA 3.0 (visages floutés)',badge:'AMBASSADE D’ÉQUATEUR · LONDRES',w:900,h:1050,rot:-1.5,t0:N(16),
  after:(w,h,t)=>{topBox(w,h,t,N(16)+.3,'19 JUIN 2012','IL S’Y RÉFUGIE',70);ambDays(w,h,t);}});
const cCIA=add({k:'doc',hd:'YAHOO NEWS · SEPTEMBRE 2021',big:'CIA · 2017',l2:'SELON D’ANCIENS RESPONSABLES',rows:[['ON DISCUTE DE L’ENLEVER…',N(18)+1.6],['… VOIRE DE LE TUER',N(18)+3.4]],src:'Source : Yahoo News (2021), repris par The Telegraph, The Nation',w:940,h:820,rot:1.5,t0:N(18)});
const cArr=add({k:'arrest',w:940,h:900,rot:-1.5,t0:N(19)});
const cBel=add({k:'cellule',full:1,hold:1,w:900,h:1150,rot:1,t0:N(20)});
const cOnu=add({k:'doc',hd:'ONU · RAPPORTEUR SPÉCIAL SUR LA TORTURE',big:'NILS MELZER',l2:'VISITE À BELMARSH · 9 MAI 2019',rows:[['SON DIAGNOSTIC :',N(23)+2.3]],src:'Source : ONU, communiqué du 31/05/2019',stampOnu:N(23)+3.4,w:940,h:820,rot:-2,t0:N(23)});
const cJours=add({k:'jours',w:940,h:860,rot:2,t0:N(24)});
const cSai=add({k:'doc',hd:'TRIBUNAL FÉDÉRAL · SAIPAN · 26 JUIN 2024',big:'UN ACCORD',l2:'PLAIDE COUPABLE D’UN SEUL CHEF',rows:[['PEINE : 62 MOIS = DÉJÀ PURGÉS',N(25)+2.6]],src:'Sources : NPR · NBC · Anadolu (26/06/2024)',stampLibre:N(25)+5.3,w:940,h:820,rot:-1.5,t0:N(25)});
const cQuote=add({k:'quote',full:1,w:900,h:1100,rot:1.5,t0:N(26)});
const cBal=add({k:'balance',w:960,h:1000,rot:-1.5,t0:N(28)});
const cToi=add({k:'toi',w:940,h:1000,rot:2,t0:N(32)});
const cQ=add({k:'q',w:960,h:760,rot:-2,t0:N(34)});
const cOutro=add({k:'outro',full:1,w:900,h:900,rot:-1.5,t0:VEND+.5});
const WT0=N(28)-.1,WT1=N(29)-.3;
C[cVis].hl=WT0+.1;C[cWL].hl=WT0+.25;C[cBel].hl=WT0+.4;C[cQuote].hl=WT0+.55;
const XT=[[cVis,cWL,WT0+.1],[cWL,cBel,WT0+.3],[cBel,cQuote,WT0+.5]];
