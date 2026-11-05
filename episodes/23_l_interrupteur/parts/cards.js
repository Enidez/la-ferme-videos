// ---------- les cartes (ordre chronologique ; placement automatique en serpentin)
const IMC=k=>(window.CRED&&CRED[k])||'';
const C=[];const add=o=>{C.push(Object.assign({rot:0},o));return C.length-1;};
const N=k=>SEGS[ID['n'+k]].t0;const NE=k=>SEGS[ID['n'+k]].t1;
function topBox(w,h,t,t0,a,b,sz=60,col){if(t<t0)return;const p=eo(lin(t,t0,t0+.3));ctx.save();ctx.globalAlpha*=p;ctx.fillStyle=col||'rgba(10,10,10,.82)';ctx.fillRect(-400,-h/2+70,800,b?170:120);
  txt(a,0,-h/2+(b?140:150),sz+'px Anton',INK,'center',2);if(b){let s2=30;while(s2>18&&mw(b,'700 '+s2+'px Mono',3)>760)s2--;txt(b,0,-h/2+205,'700 '+s2+'px Mono',AMB,'center',3);}ctx.restore();}
function band(y,t,t0,s,sz,bg,fg){if(t<t0)return;const p=eo(lin(t,t0,t0+.25));ctx.save();ctx.globalAlpha*=p;while(sz>24&&mw(s,sz+'px Anton',2)>800)sz-=2;ctx.font=sz+'px Anton';const bw=Math.min(860,mw(s,sz+'px Anton',2)+60);ctx.fillStyle=bg||'rgba(201,48,44,.92)';ctx.fillRect(-bw/2,y-sz*.85,bw,sz*1.15);txt(s,0,y,sz+'px Anton',fg||'#fff','center',2);ctx.restore();}
const DK='rgba(10,10,10,.88)',VERT='#2f9a4c';
const cCover=add({k:'cover',w:1080,h:1920,rot:0,t0:0});
const cTemo=add({k:'doc',hd:'GRÈVE DU 5 NOVEMBRE · 20 MINUTES',big:'0 VUE ?',l2:'TES VIDÉOS DE MANIF',rows:[['« LES VIDÉOS DE MANIFESTATIONS SONT-ELLES',N(4)],['CENSURÉES PAR LES RÉSEAUX SOCIAUX ? »',N(4)+.5]],src:'Source : 20 Minutes, 05/11/2026',w:940,h:820,rot:-1.5,t0:N(3)});
const cVerif=add({k:'verif',w:900,h:760,rot:2,t0:N(5)});
const cR1=add({k:'proof',lab:'RÉCIT',n:1,l:'« TIKTOK A MODÉRÉ »',w:880,h:760,rot:-2,t0:N(6)});
const cTT=add({k:'doc',hd:'FRANCEINFO · VRAI OU FAKE · 05/11',big:'TIKTOK RECONNAÎT',l2:'INTERROGÉ PAR FRANCEINFO',rows:[['MODÉRÉ CERTAINS POSTS LIÉS AUX MANIFS',N(8)],['BLOQUÉ CERTAINS MOTS DANS LA RECHERCHE',N(8)+2.2]],src:'Source : franceinfo, « Des vidéos ont-elles disparu des réseaux sociaux ? »',verdict:['VRAI',N(9),VERT],w:940,h:900,rot:1.5,t0:N(7)});
const cR2=add({k:'proof',lab:'RÉCIT',n:2,l:'« MOINS DE VIDÉOS »',w:880,h:760,rot:2,t0:N(10)});
const cCourbe=add({k:'courbe',w:960,h:900,rot:-1.5,t0:N(11)});
const cR3=add({k:'proof',lab:'RÉCIT',n:3,l:'« L’ÉTAT A ORDONNÉ »',w:880,h:760,rot:-2,t0:N(13)});
const cNop=add({k:'nop',w:920,h:860,rot:1.5,t0:N(14)});
const cMat=add({k:'clip',full:1,img:'matignon',handle:'Photo : ScareCriterion12 · CC BY-SA 4.0',badge:'HÔTEL DE MATIGNON',w:900,h:1050,rot:-1.5,t0:N(17),
  after:(w,h,t)=>{topBox(w,h,t,N(17)+.2,'MAIS LE PLUS ÉTRANGE…','DEUX JOURS AVANT LA MANIF DU 24',66);}});
const cLet=add({k:'lettre',w:940,h:1000,rot:1.5,t0:N(19)});
const cOps=add({k:'ops',w:920,h:780,rot:-2,t0:N(22)});
const cMet=add({k:'methode',w:940,h:860,rot:2,t0:N(23)});
const cSen=add({k:'senat2',w:960,h:1000,rot:-1.5,t0:N(25)});
const cVol=add({k:'volume',w:960,h:900,rot:1.5,t0:N(28)});
const cQ=add({k:'q',w:960,h:720,rot:-2,t0:N(30)});
const cOutro=add({k:'outro',full:1,w:900,h:900,rot:-1.5,t0:VEND+.5});
const WT0=N(27)-.1,WT1=N(28)-.3;
C[cTT].hl=WT0+.1;C[cCourbe].hl=WT0+.25;C[cLet].hl=WT0+.4;C[cMet].hl=WT0+.55;C[cSen].hl=WT0+.7;
const XT=[[cTT,cLet,WT0+.1],[cCourbe,cMet,WT0+.3],[cLet,cSen,WT0+.5]];
