// ---------- les cartes (ordre chronologique ; placement automatique en serpentin)
const IMC=k=>(window.CRED&&CRED[k])||'';
const C=[];const add=o=>{C.push(Object.assign({rot:0},o));return C.length-1;};
const N=k=>SEGS[ID['n'+k]].t0;const NE=k=>SEGS[ID['n'+k]].t1;
function topBox(w,h,t,t0,a,b,sz=60,col){if(t<t0)return;const p=eo(lin(t,t0,t0+.3));ctx.save();ctx.globalAlpha*=p;ctx.fillStyle=col||'rgba(10,10,10,.82)';ctx.fillRect(-400,-h/2+70,800,b?170:120);
  txt(a,0,-h/2+(b?140:150),sz+'px Anton',INK,'center',2);if(b){let s2=30;while(s2>18&&mw(b,'700 '+s2+'px Mono',3)>760)s2--;txt(b,0,-h/2+205,'700 '+s2+'px Mono',AMB,'center',3);}ctx.restore();}
function band(y,t,t0,s,sz,bg,fg){if(t<t0)return;const p=eo(lin(t,t0,t0+.25));ctx.save();ctx.globalAlpha*=p;while(sz>24&&mw(s,sz+'px Anton',2)>800)sz-=2;ctx.font=sz+'px Anton';const bw=Math.min(860,mw(s,sz+'px Anton',2)+60);ctx.fillStyle=bg||'rgba(201,48,44,.92)';ctx.fillRect(-bw/2,y-sz*.85,bw,sz*1.15);txt(s,0,y,sz+'px Anton',fg||'#fff','center',2);ctx.restore();}
const DK='rgba(10,10,10,.88)',VERT='#2f9a4c',ORANGE='#d98a00';
const cCover=add({k:'cover',w:1080,h:1920,rot:0,t0:0});
const cBlin=add({k:'doc',hd:'LIVRE · OCTOBRE 2025',big:'« NAPOLÉON ET L’ISLAM »',l2:'LOUIS BLIN, HISTORIEN',rows:[['« UN MUSULMAN DE CŒUR »',N(2)+3.4]],src:'Source : L. Blin, Napoléon et l’islam (Erick Bonnier, 2025) · entretien à Oumma',w:940,h:760,rot:-1.5,t0:N(2)});
const cVerif=add({k:'verif',w:900,h:700,rot:2,t0:N(3)});
const cR1=add({k:'proof',lab:'RÉCIT',n:1,l:'« IL S’EST DIT MUSULMAN »',w:880,h:760,rot:-2,t0:N(4)});
const cSph=add({k:'clip',full:1,img:'sphinx',handle:'J.-L. Gérôme, Bonaparte devant le Sphinx (1886) · domaine public',badge:'CAMPAGNE D’ÉGYPTE',w:900,h:1050,rot:1.5,t0:N(5),
  after:(w,h,t)=>{topBox(w,h,t,N(5)+.2,'ÉTÉ 1798','IL DÉBARQUE EN ÉGYPTE',72);}});
const cProc=add({k:'doc',hd:'ALEXANDRIE · JUILLET 1798',big:'PROCLAMATION',l2:'AUX ÉGYPTIENS',rows:[['« NOUS AUSSI, NOUS SOMMES',N(7)+1.2],['DE VRAIS MUSULMANS »',N(7)+2.1]],src:'Sources : Wikisource (Déclaration du général Bonaparte au peuple égyptien) · F. Bilici',w:940,h:820,rot:-1.5,t0:N(6)});
const cCaire=add({k:'clip',full:1,hold:1,img:'caire',handle:'J.-L. Gérôme, Bonaparte entrant au Caire · domaine public',badge:'LE CAIRE · 1798',w:900,h:1050,rot:2,t0:N(8),
  after:(w,h,t)=>{topBox(w,h,t,N(8)+.2,'LE CAIRE','FÊTE DE LA NAISSANCE DU PROPHÈTE',72);band(-h/2+330,t,N(9)+2.4,'LE GÉNÉRAL MENOU → « ABDALLAH MENOU »',46,'rgba(201,48,44,.92)');stampAt('VRAI',w/2-200,h/2-200,120,t,N(10)+.9,-.14,VERT);}});
const cR2=add({k:'proof',lab:'RÉCIT',n:2,l:'« IL LE PENSAIT VRAIMENT »',w:880,h:760,rot:-2,t0:N(11)});
const cRoed=add({k:'roederer',hold:1,w:960,h:1050,rot:1.5,t0:N(12)});
const cHel=add({k:'helene',w:940,h:900,rot:-1.5,t0:N(17)});
const cGour=add({k:'doc',hd:'JOURNAL DU GÉNÉRAL GOURGAUD · SAINTE-HÉLÈNE · 1817',big:'« J’AIME MIEUX',l2:'LA RELIGION DE MAHOMET »',rows:[['« ELLE EST MOINS RIDICULE QUE LA NÔTRE »',N(21)+2],['SINCÈRE ?',N(22)+.6]],src:'Source : G. Gourgaud, Journal de Sainte-Hélène (éd. Flammarion, 1944)',w:940,h:820,rot:2,t0:N(20)});
const cTest=add({k:'testament',hold:1,w:940,h:1000,rot:-1.5,t0:N(23)});
const cBil=add({k:'bilan',w:940,h:760,rot:1.5,t0:N(26)});
const cQ=add({k:'q',w:960,h:820,rot:-2,t0:N(27)});
const cOutro=add({k:'outro',full:1,w:900,h:900,rot:-1.5,t0:VEND+.5});
const WT0=N(17)-.1,WT1=N(18)-.3+1.2;
C[cProc].hl=WT0+.1;C[cCaire].hl=WT0+.25;C[cRoed].hl=WT0+.4;
const XT=[[cProc,cRoed,WT0+.1],[cCaire,cHel,WT0+.3]];
