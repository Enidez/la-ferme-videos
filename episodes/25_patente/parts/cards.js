// ---------- les cartes (ordre chronologique ; placement automatique en serpentin)
const IMC=k=>(window.CRED&&CRED[k])||'';
const C=[];const add=o=>{C.push(Object.assign({rot:0},o));return C.length-1;};
const N=k=>SEGS[ID['n'+k]].t0;const NE=k=>SEGS[ID['n'+k]].t1;
function topBox(w,h,t,t0,a,b,sz=60,col){if(t<t0)return;const p=eo(lin(t,t0,t0+.3));ctx.save();ctx.globalAlpha*=p;ctx.fillStyle=col||'rgba(10,10,10,.82)';ctx.fillRect(-400,-h/2+70,800,b?170:120);
  txt(a,0,-h/2+(b?140:150),sz+'px Anton',INK,'center',2);if(b){let s2=30;while(s2>18&&mw(b,'700 '+s2+'px Mono',3)>760)s2--;txt(b,0,-h/2+205,'700 '+s2+'px Mono',AMB,'center',3);}ctx.restore();}
function band(y,t,t0,s,sz,bg,fg){if(t<t0)return;const p=eo(lin(t,t0,t0+.25));ctx.save();ctx.globalAlpha*=p;while(sz>24&&mw(s,sz+'px Anton',2)>800)sz-=2;ctx.font=sz+'px Anton';const bw=Math.min(860,mw(s,sz+'px Anton',2)+60);ctx.fillStyle=bg||'rgba(201,48,44,.92)';ctx.fillRect(-bw/2,y-sz*.85,bw,sz*1.15);txt(s,0,y,sz+'px Anton',fg||'#fff','center',2);ctx.restore();}
const DK='rgba(10,10,10,.88)',VERT='#2f9a4c',ORANGE='#d98a00';
const cCover=add({k:'cover',w:1080,h:1920,rot:0,t0:0});
const cPh=add({k:'clip',full:1,hold:1,img:'philippe2',handle:'Photo : Perguillaume · CC BY-SA 4.0',badge:'ÉDOUARD PHILIPPE · CANDIDAT 2027',w:900,h:1050,rot:1.5,t0:N(3),
  after:(w,h,t)=>{topBox(w,h,t,N(4),'27 OCTOBRE · LE POINT','« SURREPRÉSENTATION »… « PATENTE »',68);band(h/2-300,t,N(5),'1ER NOVEMBRE · TF1 : IL RECOMMENCE',50,'rgba(201,48,44,.92)');}});
const cVerif=add({k:'verif',w:900,h:760,rot:-2,t0:N(6)});
const cR1=add({k:'proof',lab:'RÉCIT',n:1,l:'« SURTOUT DES JEUNES ISSUS DE L’IMMIGRATION »',w:880,h:760,rot:2,t0:N(7)});
const cPill=add({k:'clip',full:1,img:'pillage',handle:'Photo : Jorge Jaramillo · CC BY-SA 4.0 (visages floutés)',badge:'PARIS · 17 OCTOBRE 2026',w:900,h:1050,rot:-1.5,t0:N(8),
  after:(w,h,t)=>{topBox(w,h,t,N(8)+.2,'LES PILLAGES','',72);inter(w,h,t);}});
const cProf=add({k:'profil',hold:1,w:940,h:1000,rot:1.5,t0:N(9)});
const cLoi=add({k:'doc',hd:'CONSEIL CONSTITUTIONNEL · 15 NOVEMBRE 2007',big:'DÉCISION 2007-557 DC',l2:'LES « STATISTIQUES ETHNIQUES » CENSURÉES',rows:[['AUCUNE STATISTIQUE OFFICIELLE',N(14)],['NE PEUT DIRE CE QU’IL AFFIRME',N(14)+1.2]],src:'Sources : Conseil constitutionnel · Insee · CNIL (loi Informatique et libertés)',verdict:['NON PROUVÉ',N(15),ORANGE],w:940,h:860,rot:-2,t0:N(12)});
const cR2=add({k:'proof',lab:'RÉCIT',n:2,l:'IL SE BASE SUR QUOI ?',w:880,h:760,rot:2,t0:N(16)});
const cImp=add({k:'impression',w:940,h:1000,rot:-1.5,t0:N(17)});
const cTrap=add({k:'trappes',hold:1,w:940,h:960,rot:1.5,t0:N(21)});
const cMonde=add({k:'doc',hd:'LE MONDE · DÉCLARATIONS DU SUSPECT (SA VERSION)',big:'« VENGER LES COMMERÇANTS »',l2:'PILLÉS LE 17 OCTOBRE',rows:[['EN VISANT « LES NOIRS ET LES ARABES »',N(26)+.7],['PNAT : MOBILE RACISTE RETENU · IL LE CONTESTE',N(27)]],src:'Sources : Le Monde (repris par RTBF, JDD) · parquet national antiterroriste',w:940,h:820,rot:-2,t0:N(25)});
const cFrise=add({k:'frise',w:940,h:900,rot:2,t0:N(28)});
const cVil=add({k:'doc',hd:'FRANCE 2 · 5 NOVEMBRE 2026',big:'DOMINIQUE DE VILLEPIN',l2:'ANCIEN PREMIER MINISTRE (DROITE)',rows:[['« UNE INCITATION AU RACISME »',N(30)+3.2]],src:'Source : France 2, via L’Express',w:940,h:760,rot:-1.5,t0:N(30)});
const cQ=add({k:'q',w:960,h:800,rot:1.5,t0:N(31)});
const cOutro=add({k:'outro',full:1,w:900,h:900,rot:-1.5,t0:VEND+.5});
const WT0=N(21)-.1,WT1=N(23)-.3;
C[cPh].hl=WT0+.1;C[cLoi].hl=WT0+.25;C[cImp].hl=WT0+.4;
const XT=[[cPh,cLoi,WT0+.1],[cLoi,cImp,WT0+.3],[cImp,cTrap,WT0+.5]];
