// ---------- les cartes (ordre chronologique ; placement automatique en serpentin)
const IMC=k=>(window.CRED&&CRED[k])||'';
const C=[];const add=o=>{C.push(Object.assign({rot:0},o));return C.length-1;};
const N=k=>SEGS[ID['n'+k]].t0;const NE=k=>SEGS[ID['n'+k]].t1;
function topBox(w,h,t,t0,a,b,sz=60,col){if(t<t0)return;const p=eo(lin(t,t0,t0+.3));ctx.save();ctx.globalAlpha*=p;ctx.fillStyle=col||'rgba(10,10,10,.82)';ctx.fillRect(-400,-h/2+70,800,b?170:120);
  txt(a,0,-h/2+(b?140:150),sz+'px Anton',INK,'center',2);if(b){let s2=30;while(s2>18&&mw(b,'700 '+s2+'px Mono',3)>760)s2--;txt(b,0,-h/2+205,'700 '+s2+'px Mono',AMB,'center',3);}ctx.restore();}
function band(y,t,t0,s,sz,bg,fg){if(t<t0)return;const p=eo(lin(t,t0,t0+.25));ctx.save();ctx.globalAlpha*=p;while(sz>24&&mw(s,sz+'px Anton',2)>800)sz-=2;ctx.font=sz+'px Anton';const bw=Math.min(860,mw(s,sz+'px Anton',2)+60);ctx.fillStyle=bg||'rgba(201,48,44,.92)';ctx.fillRect(-bw/2,y-sz*.85,bw,sz*1.15);txt(s,0,y,sz+'px Anton',fg||'#fff','center',2);ctx.restore();}
const DK='rgba(10,10,10,.88)',VERT='#2f9a4c',ORANGE='#d98a00';
const cCover=add({k:'cover',w:1080,h:1920,rot:0,t0:0});
const cR1=add({k:'proof',lab:'RÉCIT',n:1,l:'« IL CROYAIT EN DIEU »',w:880,h:760,rot:2,t0:N(5)});
const cDes=add({k:'doc',hd:'LETTRE À MAX BORN · 4 DÉCEMBRE 1926',big:'« DIEU NE JOUE PAS AUX DÉS »',l2:'IL PARLE DE PHYSIQUE, PAS DE FOI',rows:[['CONTRE LE HASARD DE LA MÉCANIQUE QUANTIQUE',N(8)+2.4]],src:'Source : correspondance Born–Einstein (traduction)',w:940,h:760,rot:-1.5,t0:N(6)});
const cSpin=add({k:'clip',full:1,hold:1,img:'spinoza',handle:'Portrait de Spinoza (anonyme) · domaine public',badge:'BARUCH SPINOZA · PHILOSOPHE',w:900,h:1050,rot:1.5,t0:N(9),
  after:(w,h,t)=>{topBox(w,h,t,N(9)+.2,'24 AVRIL 1929','TÉLÉGRAMME AU RABBIN H. GOLDSTEIN',70);band(-h/2+330,t,N(10)+.8,'« JE CROIS AU DIEU DE SPINOZA »',52,'rgba(201,48,44,.92)');
    band(-h/2+430,t,N(11)+.3,'L’ORDRE DE L’UNIVERS : OUI',44,DK,VERT);band(-h/2+510,t,N(11)+2.8,'UN DIEU QUI JUGE LES HOMMES : NON',44,DK,RED);stampAt('PAS LE DIEU DES RELIGIONS',0,0,52,t,N(12)+.9,-.08,ORANGE);}});
const cR2=add({k:'proof',lab:'RÉCIT',n:2,l:'« IL ÉTAIT ATHÉE »',w:880,h:760,rot:-2,t0:N(13)});
const cGut=add({k:'doc',hd:'LETTRE À ERIC GUTKIND · PRINCETON · 3 JANVIER 1954',big:'« LE MOT DIEU… »',l2:'« …L’EXPRESSION DES FAIBLESSES HUMAINES »',rows:[['LA BIBLE : « DES LÉGENDES HONORABLES',N(16)+.6],['MAIS PRIMITIVES »',N(16)+2.4]],src:'Source : lettre à E. Gutkind (traduction) · Christie’s',w:940,h:860,rot:1.5,t0:N(14)});
const cAuc=add({k:'auction',w:940,h:820,rot:-2,t0:N(17)});
const cRiv=add({k:'clip',full:1,hold:1,img:'riverside',handle:'Riverside Church · Epicgenius · CC BY-SA 4.0',badge:'RIVERSIDE CHURCH · NEW YORK',w:900,h:1050,rot:-1.5,t0:N(20),
  after:(w,h,t)=>{topBox(w,h,t,N(21),'LA LETTRE À LA PETITE FILLE','',66);band(-h/2+330,t,N(22)+.3,'PHYLLIS · ÉLÈVE DE SIXIÈME',54,'rgba(201,48,44,.92)');band(-h/2+410,t,N(22)+1.9,'ÉCOLE DU DIMANCHE',46,DK,AMB);}});
const cRep=add({k:'reponse',hold:1,w:960,h:1150,rot:1,t0:N(23)});
const cQ=add({k:'q',w:960,h:820,rot:-2,t0:N(28)});
const cOutro=add({k:'outro',full:1,w:900,h:900,rot:-1.5,t0:VEND+.5});
const WT0=N(20)-.1,WT1=N(21)-.3+.8;
C[cDes].hl=WT0+.1;C[cSpin].hl=WT0+.25;C[cGut].hl=WT0+.4;
const XT=[[cDes,cGut,WT0+.1],[cSpin,cRiv,WT0+.3]];
