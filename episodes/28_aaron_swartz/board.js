// ================= LE PRIX À PAYER #01 — « AARON SWARTZ · PIRE QU'UN COMPLOT. » — mur d'enquêteur 16:9
const S=id=>SEGS[ID[id]].t0, E=id=>SEGS[ID[id]].t1, M=k=>MARK[k];
const TIOB='The Internet’s Own Boy · B. Knappenberger · CC BY-NC-SA 4.0';
const TV5='Extrait : TV5MONDE, « 64’ Le Monde en français », 2019';
window.IMGS={hp:'Highland_Park_Metra_070915.jpg',les01:'Lawrence_Lessig_and_Aaron_Swartz.jpg',les08:'Lawrence_Lessig_February_2008.jpg',self07:'Aaron_Swartz_self-portrait.JPG',
  prof08:'Aaron_Swartz_profile.jpg',pipa:'AaronSwartzPIPA.jpg',black:'Wikipedia_Blackout_Screen_1920x1080.jpg',tbl:'Tim_Berners-Lee_2012.jpg',ortiz:'Carmen_M._Ortiz.jpg',
  mit:'MIT_Main_Group_aerial.JPG',bos1:'Aaron_Swartz_at_Boston_Wikipedia_Meetup_2009-08-18.jpg',bos2:'Aaron_Swartz_2_at_Boston_Wikipedia_Meetup_2009-08-18.jpg',chom:'Noam_Chomsky.jpg'};
const CRED={hp:'Photo : JeremyA · CC BY-SA 2.5',les01:'Photo : Rich Gibson, 2001 · CC BY 2.0',les08:'Photo : Robert Scoble · CC BY 2.0',self07:'Autoportrait, 2007 · domaine public',
  prof08:'Photo : Fred Benenson, 2008 · CC BY 2.0',pipa:'Photo : Daniel J. Sieradski, 18/01/2012 · CC BY-SA 2.0',black:'Wikipédia, 18/01/2012 · CC BY-SA 4.0',tbl:'Photo : cellanr · CC BY-SA 2.0',
  ortiz:'Département de la Justice · domaine public',mit:'Photo : Nick Allen · CC BY-SA 4.0',bos1:'Photo : Sage Ross, 2009 · CC BY-SA 2.0',bos2:'Photo : Sage Ross, 2009 · CC BY-SA 2.0',chom:'Photo : A. Starita · CC BY-SA 2.0'};
window.CLIPN={A1:192,V5:483,V3:471,V4:291,V6:750,FAM:1200,TEEN:315,PANEL:108,TEEN3:191,MITCAM:480,POLICE:210,ORTIZ:105,A2:124,T3:375,T1:390,T2:330,T6:480};

// ---------- les cartes (ordre chronologique)
const C=[];const add=o=>{C.push(Object.assign({rot:0},o));return C.length-1;};
const FULLW=1600,FULLH=960;
const clip=(k,t0,sync,o)=>add(Object.assign({k:'clip',clip:k,t0,sync,full:1,w:FULLW,h:FULLH},o));
const A1E=M('A1')[1];
const cCover=add({k:'cover',w:1920,h:1080,t0:0});
const cV5=clip('V5',S('n4'),M('V5')[0],{hold:1,badge:'FLORE VASSEUR · ÉCRIVAINE',handle:TV5,rot:-1.5,fx:.78});
const cHP=add({k:'photo',img:'hp',big:'HIGHLAND PARK',sub:'ILLINOIS · 1986',w:1200,h:800,rot:1.5,t0:S('n8')});
const cFAM=clip('FAM',S('n10'),S('n10'),{hold:1,badge:'AARON SWARTZ · VIDÉOS DE FAMILLE',handle:TIOB,rot:-1});
const cPrize=add({k:'doc',hd:'L’ANNÉE 2000',big:'13 ANS',l2:'PRIX ArsDigita',rows:[['THE INFO NETWORK : UNE ENCYCLOPÉDIE ÉCRITE PAR TOUT LE MONDE',S('n14')+1.2],['AVANT WIKIPÉDIA (2001)',S('n15')]],src:'Sources : ArsDigita Prize (2000) · Wikipédia',w:1300,h:820,rot:2,t0:S('n14')});
const cTeen=clip('TEEN',S('n16'),S('n16'),{badge:'14 ANS · IL CO-ÉCRIT RSS',handle:TIOB,rot:-1.5});
const cPanel=clip('PANEL',S('n18'),S('n18'),{badge:'AUTOUR DE LA TABLE, DES ADULTES',handle:TIOB,rot:1.5});
const cLes=add({k:'duo',a:'les01',b:'les08',la:'AARON, 14 ANS',lb:'LAWRENCE LESSIG',sb:'PROFESSEUR DE DROIT, HARVARD',title:'CREATIVE COMMONS',ta:S('n20'),tb:S('n20')+1.2,stampS:'SON MENTOR',stampT:S('n21'),w:1400,h:900,rot:-1.5,t0:S('n20')});
const cTeen3=clip('TEEN3',M('V2')[0]-.3,M('V2')[0],{hold:1,badge:'AARON SWARTZ · ADOLESCENT',handle:TIOB,rot:1.5});
const c911=add({k:'doc',hd:'NEW YORK',big:'11 SEPTEMBRE 2001',l2:'AARON A 14 ANS',rows:[],w:1300,h:700,rot:-2,t0:S('n24')});
const cV3=clip('V3',M('V3')[0]-.3,M('V3')[0],{hold:1,badge:'FLORE VASSEUR · ÉCRIVAINE',handle:TV5,rot:1,fx:.78});
const cChom=add({k:'photo',img:'chom',big:'NOAM CHOMSKY',sub:'LINGUISTE, CRITIQUE DE LA POLITIQUE AMÉRICAINE',w:1100,h:820,rot:-1.5,t0:S('n27'),fy:.3});
const cReddit=add({k:'doc',hd:'SAN FRANCISCO',big:'REDDIT',l2:'',rows:[['2005 : À 19 ANS, IL REJOINT L’ÉQUIPE',S('n29')+.6],['2006 : RACHETÉ PAR CONDÉ NAST',S('n30')],['AARON DEVIENT RICHE',S('n31')]],src:'Sources : Wikipédia · presse',w:1300,h:860,rot:1.5,t0:S('n29')});
const cSad=add({k:'photo',img:'self07',big:'ET IL EST MALHEUREUX.',sub:'AUTOPORTRAIT, 2007',stampS:'« SICK » · NOV. 2007',stampT:S('n36'),w:1100,h:880,rot:-2,t0:S('n33'),fy:.35});
const cPay=add({k:'paywall',w:1400,h:820,rot:1.5,t0:S('n40')});
const cMani=add({k:'doc',hd:'JUILLET 2008',big:'LE MANIFESTE',l2:'DE LA GUÉRILLA POUR LE LIBRE ACCÈS',rows:[['« L’INFORMATION, C’EST LE POUVOIR. »',S('n47')],['« IL Y A CEUX QUI VEULENT LE GARDER POUR EUX. »',S('n48')]],src:'Source : « Guerilla Open Access Manifesto », A. Swartz, juillet 2008',w:1400,h:860,rot:-1.5,t0:S('n46')});
const cV4=clip('V4',M('V4')[0]-.3,M('V4')[0],{hold:1,badge:'FLORE VASSEUR · ÉCRIVAINE',handle:TV5,rot:1.5,fx:.78});
const cPacer=add({k:'doc',hd:'2008 · LA PREMIÈRE PORTE',big:'2 700 000',l2:'DOCUMENTS DE JUSTICE',rows:[['PUBLICS… MAIS PAYANTS À LA PAGE',S('n52')],['MIS EN LIGNE GRATUITEMENT',S('n54')+1.5]],src:'Sources : Gizmodo · Boing Boing (2009) · Public.Resource.Org',w:1300,h:860,rot:2,t0:S('n50')});
const cFBI=add({k:'fbi',w:1300,h:820,rot:-1.5,t0:S('n55')});
const cMIT=add({k:'photo',img:'mit',big:'LE MIT',sub:'CAMBRIDGE · FIN 2010',w:1300,h:820,rot:1.5,t0:S('n62')});
const cCam=clip('MITCAM',S('n65'),S('n65')-.5,{badge:'CAMÉRA DE SURVEILLANCE DU MIT',handle:TIOB,rot:-1,bright:1});
const cCount=add({k:'count',w:1300,h:820,rot:2,t0:S('n68')});
const cPol=clip('POLICE',S('n71'),S('n71'),{badge:'6 JANVIER 2011 · ARRÊTÉ',handle:TIOB,rot:1});
const cJstor=add({k:'jstor',w:1300,h:820,rot:-1.5,t0:S('n73')});
const cV7=add({k:'photo',img:'prof08',big:'',sub:'',voice:'FLORE VASSEUR',w:1200,h:900,rot:1.5,t0:M('V7')[0]-.3,hold:1,fy:.35,quoteT:M('V7')[0]+11,quote:'« DEVENIR DES ASSANGE »'});
const cOrtiz=clip('ORTIZ',S('n78'),S('n78'),{badge:'CARMEN ORTIZ · PROCUREURE FÉDÉRALE',handle:TIOB,rot:-1.5,quotes:[['« VOLER, C’EST VOLER. »',S('n79')],['« COMMANDE INFORMATIQUE OU PIED-DE-BICHE »',S('n80')]],qsrc:'Communiqué du Département de la Justice, 19/07/2011'});
const cCharges=add({k:'charges',w:1300,h:820,rot:1.5,t0:S('n82')});
const cVS=add({k:'vs',w:1500,h:880,rot:-1,t0:S('n86')});
const cSopa=add({k:'photo',img:'black',big:'SOPA',sub:'LE 18 JANVIER 2012, WIKIPÉDIA S’ÉTEINT',w:1400,h:820,rot:1.5,t0:S('n96'),fy:.4});
const cPipa=add({k:'photo',img:'pipa',big:'',sub:'AARON, LE JOUR DE LA COUPURE',stampS:'LE CONGRÈS RECULE',stampT:S('n99'),w:1200,h:880,rot:-1.5,t0:S('n97'),fy:.3});
const cA2=clip('A2',M('A2')[0]-.3,M('A2')[0],{hold:1,badge:'AARON SWARTZ · 21 MAI 2012',handle:'Discours « How We Stopped SOPA », Freedom to Connect · domaine public',rot:1});
const cWash=add({k:'wash',w:1300,h:760,rot:-1.5,t0:S('n101')});
const cProc=add({k:'doc',hd:'2011 → 2013',big:'DEUX ANS',l2:'DE PROCÉDURE',rows:[['SON EX-COMPAGNE, QUINN NORTON, CONVOQUÉE',S('n104')],['LE MARCHÉ : PLAIDER COUPABLE DES 13 CRIMES',S('n107')]],stampS:'IL REFUSE',stampT:S('n108'),src:'Sources : Wikipédia · AP (janvier 2013)',w:1400,h:880,rot:1.5,t0:S('n103')});
const cDeath=add({k:'death',img:'bos1',w:1200,h:900,rot:-1,t0:S('n111')});
const cTBL=add({k:'tbl',w:1500,h:880,rot:1.5,t0:S('n115')});
const cT3=clip('T3',M('T3')[0]-.3,M('T3')[0],{hold:1,badge:'PETER ECKERSLEY · AMI D’AARON',handle:TIOB,rot:-1.5});
const cT1=clip('T1',M('T1')[0]-.3,M('T1')[0],{hold:1,badge:'LAWRENCE LESSIG · SON MENTOR',handle:TIOB,rot:1});
const cT2=clip('T2',M('T2')[0]-.2,M('T2')[0],{hold:1,badge:'LAWRENCE LESSIG',handle:TIOB,rot:-1});
const cPere=add({k:'pere',w:1400,h:820,rot:1.5,t0:M('PERE')[0]-.2});
const cV6=clip('V6',S('n124'),M('V6')[0],{hold:1,badge:'FLORE VASSEUR · ÉCRIVAINE',handle:TV5,rot:-1.5,fx:.78,stampS:'PIRE QU’UN COMPLOT.',stampT:M('V6')[0]+1.6,note:'ANALYSE DE L’AUTRICE · AUCUNE DÉCISION DE JUSTICE SUR CE POINT'});
const cMITr=add({k:'doc',hd:'APRÈS SA MORT',big:'« NEUTRE »',l2:'LE RAPPORT DU MIT (2013)',rows:[['« AARON’S LAW » : JAMAIS VOTÉE',S('n129')+1],['LA PROCUREURE : EN POSTE JUSQU’EN 2017',S('n131')]],src:'Sources : rapport Abelson (MIT, 2013) · Boston Globe (2017)',w:1400,h:860,rot:1.5,t0:S('n127')});
const cNext=add({k:'next',w:1300,h:760,rot:-2,t0:S('n133')});
const cT6=clip('T6',S('n137'),S('n137'),{hold:1,badge:'AARON SWARTZ · 1986 – 2013',handle:TIOB,rot:1,price:M('V5r')[0]+.1});
const cQ=add({k:'q',w:1300,h:760,rot:-1.5,t0:S('n141')-.2});
const cOutro=add({k:'outro',full:1,w:1400,h:820,rot:1.5,t0:VEND+.4});
const WT0=S('n6')-.05,WT1=S('n8')-.4, WB0=S('n139')-.05,WB1=S('n140')+1.3;   // deux vues d'ensemble

// placement en serpentin + désordre
{const COLS=5,DX=2150,DY=1500;const r=rng(99);C.forEach((c,i)=>{if(i===cCover){c.x=-2300;c.y=0;return;}const j=i-1;const row=Math.floor(j/COLS),col=j%COLS;const cc=row%2?COLS-1-col:col;
  c.x=cc*DX+(r()-.5)*260;c.y=row*DY+(r()-.5)*240;c.rot*=1.6;});}

// ---------- caméra (drone : spline Catmull-Rom entre les cartes)
const TCOV=S('n4')-.9;   // fin de l'accroche : la caméra quitte la couverture après les 3 phrases d'intro
const KEYS=[];C.forEach((c,i)=>{const a=c.rot*Math.PI/180;
  if(i===cCover){KEYS.push({t:0,x:c.x,y:c.y,z:1,rot:0});return;}
  if(c.full){const z=1840/c.w;KEYS.push({t:c.t0,x:c.x,y:c.y+20/z,z,rot:-a,hold:c.hold});}
  else KEYS.push({t:c.t0,x:c.x,y:c.y+30,z:Math.min(1500/c.w,900/c.h),rot:-a*.6,hold:c.hold});});
const WIDE=(t,t1,cs)=>{let mnx=1e9,mxx=-1e9,mny=1e9,mxy=-1e9;cs.forEach(i=>{const c=C[i];mnx=Math.min(mnx,c.x-c.w/2);mxx=Math.max(mxx,c.x+c.w/2);mny=Math.min(mny,c.y-c.h/2);mxy=Math.max(mxy,c.y+c.h/2);});
  return{t,t1,x:(mnx+mxx)/2,y:(mny+mxy)/2,z:Math.min(1860/(mxx-mnx),1000/(mxy-mny)),rot:0,wide:1};};
const ALL=[...C.keys()].filter(i=>i!==cOutro&&i!==cCover);
KEYS.push(WIDE(WT0,WT1,ALL));KEYS.push(WIDE(WB0,WB1,ALL));
KEYS.sort((a,b)=>a.t-b.t);
const WP=[];const WHS=[];
(function(){const K=KEYS;for(let i=0;i<K.length;i++){const a=K[i],b=K[i+1],p=K[i-1];
  if(i===0){WP.push({t:0,x:a.x,y:a.y,z:a.z,r:a.rot});WP.push({t:TCOV,x:a.x,y:a.y+8,z:a.z*1.03,r:a.rot});continue;}
  const gap=b?b.t-a.t:2.5;const dx=b?b.x-a.x:a.x-p.x,dy=b?b.y-a.y:a.y-p.y,dl=Math.hypot(dx,dy)||1;const ux=dx/dl,uy=dy/dl;
  const dwell=a.wide?a.t1-a.t:a.hold?Math.max(.4,gap-.75):Math.max(.4,Math.min(gap-.7,gap*.78));
  if(a.wide)WHS.push({t0:a.t,t1:a.t+dwell,x:a.x,y:a.y,z:a.z});
  WP.push({t:a.t-.05,x:a.x-ux*30,y:a.y-uy*30,z:a.z,r:a.rot});if(dwell>1.2){const L=(k)=>({t:a.t+dwell*k,x:a.x+ux*(-30+75*k),y:a.y+uy*(-30+75*k),z:a.z*(1+.05*k),r:a.rot});WP.push(L(.25));WP.push(L(.75));}WP.push({t:a.t+dwell,x:a.x+ux*45,y:a.y+uy*45,z:a.z*1.05,r:a.rot});
  if(b){const tm=(a.t+dwell+b.t-.05)/2;if(b.t-.05-(a.t+dwell)>.3&&!a.wide&&!b.wide)WP.push({t:tm,x:(a.x+b.x)/2,y:(a.y+b.y)/2+Math.hypot(b.x-a.x,b.y-a.y)*.06,z:Math.min(a.z,b.z)*.62,r:(a.rot+b.rot)/2});}}
  WP.sort((u,v)=>u.t-v.t);})();
function cr(p0,p1,p2,p3,u){const u2=u*u,u3=u2*u;return .5*((2*p1)+(-p0+p2)*u+(2*p0-5*p1+4*p2-p3)*u2+(-p0+3*p1-3*p2+p3)*u3);}
function camSpline(t){let i=0;while(i<WP.length-2&&t>=WP[i+1].t)i++;
  const a=WP[Math.max(0,i-1)],b=WP[i],c=WP[Math.min(WP.length-1,i+1)],d=WP[Math.min(WP.length-1,i+2)];const u=cl((t-b.t)/Math.max(1e-3,c.t-b.t));const us=u*u*(3-2*u)*.35+u*.65;
  return{x:cr(a.x,b.x,c.x,d.x,us),y:cr(a.y,b.y,c.y,d.y,us),z:Math.exp(cr(Math.log(a.z),Math.log(b.z),Math.log(c.z),Math.log(d.z),us)),r:cr(a.r,b.r,c.r,d.r,us)};}
function camRaw(t){let s=camSpline(t);for(const WH of WHS){const sm=u=>u*u*(3-2*u);const k=sm(lin(t,WH.t0-.8,WH.t0))*(1-sm(lin(t,WH.t1,WH.t1+.8)));if(k<=0)continue;
  const hz=WH.z*(1+.05*lin(t,WH.t0,WH.t1));s={x:s.x+(WH.x-s.x)*k,y:s.y+(WH.y-s.y)*k,z:Math.exp(Math.log(s.z)+(Math.log(hz)-Math.log(s.z))*k),r:s.r*(1-k)};}return s;}
function camState(t){if(t<TCOV){const k=KEYS[0];return{x:k.x,y:k.y,z:1,rot:0,speed:0,dir:0};}
  const s=camRaw(t),q=camRaw(t-1/FPS);const vx=(s.x-q.x)*s.z,vy=(s.y-q.y)*s.z;const sp=Math.hypot(vx,vy);const bank=cl(-vx*.0013,-.08,.08);
  return{x:s.x+Math.sin(t*1.7)*3,y:s.y+Math.cos(t*1.3)*3,z:s.z,rot:s.r+bank,speed:sp,dir:Math.atan2(vy,vx)};}
let CS={x:0,y:0,z:1,rot:0},TNOW=0;
function toWorld(){const k=1+punch(TNOW)*.05;ctx.setTransform(1,0,0,1,0,0);ctx.translate(960,520);ctx.rotate(CS.rot);ctx.scale(CS.z*k,CS.z*k);ctx.translate(-CS.x,-CS.y);}

// ---------- mur + fouillis
const WALL=(()=>{const c=document.createElement('canvas');c.width=c.height=512;const g=c.getContext('2d');const r=rng(11);g.fillStyle='#3a3f3b';g.fillRect(0,0,512,512);
  for(let i=0;i<5000;i++){g.fillStyle=`rgba(${r()<.5?0:255},${r()<.5?0:255},${r()<.5?0:255},${r()*.05})`;g.fillRect(r()*512,r()*512,1+r()*3,1+r()*3);}return c;})();let WALLPAT=null;
const SCRAPS=[];{const r=rng(21);for(let i=0;i<90;i++)SCRAPS.push({x:-4000+r()*15000,y:-1500+r()*12000,w:220+r()*420,h:160+r()*340,rot:(r()-.5)*.3,a:.08+r()*.12,lines:Math.floor(r()*6)});}
const CLUT=[];{const r=rng(55);const ims=['bos2','prof08','les01','self07'];for(let i=0;i<110;i++){const k=r();CLUT.push({x:-3800+r()*14500,y:-1300+r()*11500,rot:(r()-.5)*.5,kind:k<.45?'post':k<.75?'photo':'clip',im:ims[Math.floor(r()*4)],w:k<.45?240:280,h:k<.45?240:200,lines:2+Math.floor(r()*4),col:r()});}}
function pin(x,y){ctx.save();ctx.fillStyle='rgba(0,0,0,.35)';ctx.beginPath();ctx.arc(x+5,y+7,13,0,6.283);ctx.fill();const g=ctx.createRadialGradient(x-4,y-4,2,x,y,14);g.addColorStop(0,'#ff6a5f');g.addColorStop(1,'#8e1512');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,14,0,6.283);ctx.fill();ctx.restore();}
function tape(x,y,w,rot){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.fillStyle='rgba(235,228,200,.55)';ctx.fillRect(-w/2,-22,w,44);ctx.restore();}
function drawWall(){if(!WALLPAT)WALLPAT=ctx.createPattern(WALL,'repeat');ctx.fillStyle=WALLPAT;ctx.fillRect(-6000,-4000,24000,18000);
  SCRAPS.forEach(s=>{ctx.save();ctx.translate(s.x,s.y);ctx.rotate(s.rot);ctx.fillStyle=`rgba(200,205,195,${s.a*.5})`;ctx.fillRect(-s.w/2,-s.h/2,s.w,s.h);ctx.strokeStyle=`rgba(40,40,38,${s.a*.8})`;ctx.lineWidth=3;
    for(let l=0;l<s.lines;l++){ctx.beginPath();ctx.moveTo(-s.w/2+20,-s.h/2+30+l*28);ctx.lineTo(s.w/2-20-(l%3)*30,-s.h/2+30+l*28);ctx.stroke();}ctx.restore();});
  CLUT.forEach(c=>{ctx.save();ctx.translate(c.x,c.y);ctx.rotate(c.rot);ctx.globalAlpha=.85;
    if(c.kind==='post'){ctx.fillStyle=c.col<.5?'rgba(200,190,110,.55)':'rgba(170,175,165,.45)';ctx.fillRect(-c.w/2,-c.h/2,c.w,c.h);ctx.strokeStyle='rgba(30,30,28,.55)';ctx.lineWidth=4;for(let l=0;l<c.lines;l++){ctx.beginPath();ctx.moveTo(-c.w/2+24,-c.h/2+50+l*40);ctx.lineTo(c.w/2-30-(l%2)*50,-c.h/2+46+l*40);ctx.stroke();}}
    else if(c.kind==='photo'){const im=IM[c.im];ctx.fillStyle='rgba(230,232,224,.8)';ctx.fillRect(-c.w/2-12,-c.h/2-12,c.w+24,c.h+40);if(im){ctx.filter='grayscale(1) brightness(.8)';const s=Math.max(c.w/im.width,c.h/im.height);ctx.save();ctx.beginPath();ctx.rect(-c.w/2,-c.h/2,c.w,c.h);ctx.clip();ctx.drawImage(im,-im.width*s/2,-im.height*s/2,im.width*s,im.height*s);ctx.restore();ctx.filter='none';}}
    else{ctx.fillStyle='rgba(58,64,60,.55)';ctx.fillRect(-c.w/2,-c.h/2,c.w,c.h);ctx.strokeStyle='rgba(255,255,255,.5)';ctx.lineWidth=2;ctx.strokeRect(-c.w/2,-c.h/2,c.w,c.h);ctx.fillStyle='rgba(236,238,230,.35)';for(let l=0;l<3;l++)ctx.fillRect(-c.w/2+20,-c.h/2+40+l*45,c.w-60-l*40,14);}
    pin(0,-c.h/2+12);ctx.restore();});}
function drawThreads(t){const ws=[[WT0,WT1],[WB0,WB1]];let g=0;ws.forEach(([a,b])=>{if(t>=a&&t<b+1)g=Math.max(g,eo(lin(t,a,a+.6))*(1-lin(t,b,b+1)));});
  const curve=(a,b,sag)=>{const x1=a.x,y1=a.y-a.h/2+18,x2=b.x,y2=b.y-b.h/2+18;const mx=(x1+x2)/2,my=(y1+y2)/2+Math.hypot(x2-x1,y2-y1)*sag;ctx.beginPath();ctx.moveTo(x1,y1);ctx.quadraticCurveTo(mx,my,x2,y2);ctx.stroke();};
  ctx.save();ctx.strokeStyle=`rgba(${185+70*g},${30+15*g},28,.9)`;ctx.lineWidth=6+22*g;ctx.shadowColor=g>0?`rgba(255,40,30,${.85*g})`:'rgba(0,0,0,.4)';ctx.shadowBlur=6+44*g;ctx.shadowOffsetY=g>0?0:4;
  const ORD=[...C.keys()].filter(i=>i!==cOutro).sort((u,v)=>C[u].t0-C[v].t0);for(let j=1;j<ORD.length;j++)curve(C[ORD[j-1]],C[ORD[j]],.08);ctx.restore();}

// ---------- briques de cartes
function framePaper(w,h,col){ctx.shadowColor='rgba(0,0,0,.55)';ctx.shadowBlur=34;ctx.shadowOffsetY=18;ctx.fillStyle=col||'rgba(58,64,60,.62)';ctx.fillRect(-w/2,-h/2,w,h);ctx.shadowColor='transparent';
  const g=ctx.createLinearGradient(-w/2,-h/2,w/2,h/2);g.addColorStop(0,'rgba(255,255,255,.10)');g.addColorStop(1,'rgba(0,0,0,.18)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,h);}
function laminate(w,h){ctx.save();ctx.beginPath();ctx.rect(-w/2,-h/2,w,h);ctx.clip();const g=ctx.createLinearGradient(-w/2,-h/2,w/2,h/2);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.38,'rgba(255,255,255,0)');g.addColorStop(.46,'rgba(255,255,255,.14)');g.addColorStop(.52,'rgba(255,255,255,.05)');g.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,h);ctx.restore();
  ctx.strokeStyle='rgba(255,255,255,.85)';ctx.lineWidth=3;ctx.strokeRect(-w/2,-h/2,w,h);ctx.strokeStyle='rgba(255,255,255,.18)';ctx.lineWidth=2;ctx.strokeRect(-w/2+10,-h/2+10,w-20,h-20);}
function stampAt(s,x,y,size,t,t0,rot=-.1,col=PINK){if(t<t0)return;const p=lin(t,t0,t0+.14);const sc=1.6-.6*eo(p);ctx.save();ctx.globalAlpha*=cl(p*3)*.92;ctx.translate(x,y);ctx.rotate(rot);ctx.scale(sc,sc);
  const f=size+'px Anton';const sw=mw(s,f,3)+50;ctx.strokeStyle=col;ctx.lineWidth=Math.max(5,size/11);ctx.strokeRect(-sw/2,-size*.75,sw,size*1.1);txt(s,0,size*.2,f,col,'center',3);ctx.restore();}
function srcFit(s,w,h,dark){if(!s)return;let sz=22;while(sz>13&&mw(s,'400 '+sz+'px Mono')>w-48)sz--;txt(s,w/2-24,h/2-18,'400 '+sz+'px Mono',dark?'rgba(27,28,26,.6)':'rgba(236,238,230,.62)','right');}
function cover(im,x,y,pw,ph,filter,fy=.5,fx=.5){if(!im){ctx.fillStyle='#000';ctx.fillRect(x-pw/2,y-ph/2,pw,ph);return;}ctx.save();ctx.beginPath();ctx.rect(x-pw/2,y-ph/2,pw,ph);ctx.clip();const s=Math.max(pw/im.width,ph/im.height);
  ctx.filter=filter||'none';ctx.drawImage(im,x-pw/2-(im.width*s-pw)*fx,y-ph/2-(im.height*s-ph)*fy,im.width*s,im.height*s);ctx.restore();}
function rowBar(s,y,w,t,t0,dark,col){if(t<t0)return;const q=eo(lin(t,t0,t0+.25));ctx.save();ctx.globalAlpha*=q;let z=46;while(z>22&&mw(s,z+'px Anton',2)>w-140)z-=2;
  ctx.fillStyle=dark?'rgba(27,28,26,.88)':'rgba(128,134,126,.3)';ctx.fillRect(-w/2+60,y-z,w-120,z*1.45);txt(s,0,y+z*.12,z+'px Anton',col||(dark?INK:INK),'center',2);ctx.restore();}
function badge(s,w,h){let z=26;while(z>16&&mw(s,'600 '+z+'px Inter',2)>w-140)z--;const bw=mw(s,'600 '+z+'px Inter',2)+44;ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(-w/2+36,-h/2+30,bw,z+24);txt(s,-w/2+58,-h/2+30+z+5,'600 '+z+'px Inter','#fff','left',2);}
function handle(s,w,h){let z=19;while(z>12&&mw(s,'400 '+z+'px Inter')>w*.45)z--;const bw=mw(s,'400 '+z+'px Inter')+28;ctx.fillStyle='rgba(0,0,0,.5)';ctx.fillRect(w/2-36-bw,-h/2+34,bw,z+18);txt(s,w/2-50,-h/2+34+z+4,'400 '+z+'px Inter','rgba(255,255,255,.82)','right');}
// étiquette « LE PRIX À PAYER » (signature de la série)
function priceTag(x,y,s,t,t0){if(t<t0)return;const p=eback(lin(t,t0,t0+.5));ctx.save();ctx.translate(x,y);ctx.rotate(-.12+(1-p)*.5);ctx.scale(p,p);
  ctx.shadowColor='rgba(0,0,0,.6)';ctx.shadowBlur=26;ctx.shadowOffsetY=12;ctx.fillStyle='#c9302c';ctx.beginPath();ctx.moveTo(-330,-95);ctx.lineTo(260,-95);ctx.lineTo(330,0);ctx.lineTo(260,95);ctx.lineTo(-330,95);ctx.closePath();ctx.fill();ctx.shadowColor='transparent';
  ctx.fillStyle='#262a27';ctx.beginPath();ctx.arc(255,0,16,0,6.283);ctx.fill();ctx.strokeStyle='rgba(255,255,255,.75)';ctx.lineWidth=3;ctx.strokeRect(-312,-78,560,156);
  txt('LE PRIX À PAYER',-30,-22,'700 30px Mono','rgba(255,255,255,.9)','center',6);txt(s,-30,52,'72px Anton','#fff','center',3);ctx.restore();}

function drawCover(w,h,t){const frz=t>=A1E-.05;const im=VF('A1',t,0);ctx.fillStyle='#0b0c0b';ctx.fillRect(-w/2,-h/2,w,h);
  if(im){const z=frz?1.12+.004*(t-A1E):1.02+.01*t;const s=Math.max(w/im.width,h/im.height)*z;ctx.save();ctx.beginPath();ctx.rect(-w/2,-h/2,w,h);ctx.clip();
    ctx.filter=frz?'grayscale(1) contrast(1.3) brightness(.5)':'contrast(1.08) brightness(.92)';ctx.drawImage(im,-im.width*s/2+(frz?260:0),-im.height*s/2,im.width*s,im.height*s);ctx.restore();}
  const g=ctx.createLinearGradient(-w/2,0,w/2,0);g.addColorStop(0,'rgba(0,0,0,.85)');g.addColorStop(.6,'rgba(0,0,0,.2)');g.addColorStop(1,'rgba(0,0,0,0)');if(frz){ctx.fillStyle=g;ctx.fillRect(-w/2,-h/2,w,h);}
  txt('Archive · 21 mai 2012 · Freedom to Connect · domaine public',w/2-40,-h/2+46,'400 19px Inter','rgba(255,255,255,.75)','right',0);
  txt('LE PRIX À PAYER #01',-w/2+120,-h/2+150,'700 30px Mono',AMB,'left',8,frz?1:lin(t,.3,.8));
  const sl=(s,y,f,col,ta,ls,gl)=>{if(t<ta)return;const q=eo(lin(t,ta,ta+.13));const sc=1.6-.6*q;ctx.save();ctx.translate(-w/2+120,y);ctx.scale(sc,sc);txt(s,0,0,f,col,'left',ls,cl(q*1.5),gl);ctx.restore();};
  if(!frz)txt('AARON SWARTZ',-w/2+120,-h/2+230,'86px Anton',INK,'left',3,lin(t,.6,1.1));
  if(frz){sl('PIRE QU’UN',-h/2+380,'190px Anton',INK,A1E,4,16);sl('COMPLOT.',-h/2+580,'210px Anton',RED,A1E+.15,5,18);
    [['DES ARTICLES SCIENTIFIQUES.',S('n1'),INK],['35 ANS DE PRISON PROMIS.',S('n2'),AMB],['IL AVAIT 24 ANS.',S('n3'),INK]].forEach(([s,ta,col],i)=>{if(t>=ta)txt(s,-w/2+124,-h/2+700+i*72,'56px Anton',col,'left',2,lin(t,ta,ta+.2));});}
}
function cardBody(c,t,w,h){
  if(c.k==='clip'){const im=VF(c.clip,t,c.sync);ctx.fillStyle='#000';ctx.fillRect(-w/2,-h/2,w,h);cover(im,0,0,w-24,h-24,c.bright?'brightness(1.9) contrast(1.15) grayscale(.3)':'contrast(1.05) saturate(.9)',.4,c.fx??.5);
    badge(c.badge,w,h);handle(c.handle,w,h);
    if(c.quotes){c.quotes.forEach(([s,t0],i)=>{if(t<t0)return;const q=eo(lin(t,t0,t0+.25));ctx.save();ctx.globalAlpha*=q;let z=64;while(z>30&&mw(s,z+'px Anton',2)>w-200)z-=2;const y=-h/2+190+i*(z*1.5);ctx.fillStyle='rgba(10,10,10,.82)';const bw=mw(s,z+'px Anton',2)+60;ctx.fillRect(-bw/2,y-z,bw,z*1.35);txt(s,0,y+z*.1,z+'px Anton',AMB,'center',2);ctx.restore();});
      txt(c.qsrc,0,-h/2+190+2*96,'400 20px Mono','rgba(236,238,230,.8)','center',1,lin(t,c.quotes[0][1],c.quotes[0][1]+.3));}
    if(c.stampS)stampAt(c.stampS,0,-h/2+200,120,t,c.stampT,-.07);
    if(c.note&&t>=c.stampT){ctx.fillStyle='rgba(10,10,10,.82)';const z=22,s=c.note;const bw=mw(s,'700 '+z+'px Mono',2)+40;ctx.fillRect(-bw/2,-h/2+300,bw,44);txt(s,0,-h/2+330,'700 '+z+'px Mono',INK,'center',2,lin(t,c.stampT,c.stampT+.3));}
    if(c.price)priceTag(w/2-420,-h/2+190,'SA VIE.',t,c.price);
    return;}
  if(c.k==='photo'){framePaper(w,h,'rgba(30,32,30,.95)');const ph=h-(c.big||c.sub?230:60);cover(IM[c.img],0,-h/2+30+ph/2,w-60,ph,'grayscale(.85) contrast(1.12)',c.fy??.5);
    ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=3;ctx.strokeRect(-w/2+30,-h/2+30,w-60,ph);
    if(c.big)fitTxt(c.big,0,-h/2+ph+120,96,w-120,INK);if(c.sub)fitTxt(c.sub,0,-h/2+ph+(c.big?180:110),32,w-120,AMB,'Mono',3);
    if(c.voice){badge(c.voice+' · SA VOIX',w,h);}
    if(c.quote&&t>=c.quoteT){const q=eo(lin(t,c.quoteT,c.quoteT+.25));ctx.save();ctx.globalAlpha*=q;const z=84,bw=mw(c.quote,z+'px Anton',2)+70;ctx.fillStyle='rgba(10,10,10,.85)';ctx.fillRect(-bw/2,h/2-250,bw,z*1.35);txt(c.quote,0,h/2-250+z*1.05,z+'px Anton',AMB,'center',2);ctx.restore();}
    if(c.stampS)stampAt(c.stampS,0,-h/2+170,90,t,c.stampT,-.08);
    srcFit(CRED[c.img],w,h);return;}
  if(c.k==='duo'){framePaper(w,h,'rgba(30,32,30,.95)');txt(c.title,0,-h/2+100,'74px Anton',INK,'center',4);const pw=w/2-80,ph=h-320,X=[-w/4,w/4];
    [[c.a,c.la,c.ta,X[0],c.sa],[c.b,c.lb,c.tb,X[1],c.sb]].forEach(([k,l,t0,x,sub])=>{if(t<t0-.05)return;const q=eo(lin(t,t0-.05,t0+.25));ctx.save();ctx.globalAlpha*=q;cover(IM[k],x,-h/2+150+ph/2,pw,ph,'grayscale(.85) contrast(1.1)',.3);
      ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=3;ctx.strokeRect(x-pw/2,-h/2+150,pw,ph);txt(l,x,-h/2+205+ph,'48px Anton',INK,'center',2);if(sub)fitTxt(sub,x,-h/2+245+ph,22,pw,AMB,'Mono',1);ctx.restore();});
    if(c.stampS)stampAt(c.stampS,0,-h/2+260,96,t,c.stampT,-.07);srcFit(CRED[c.a]+' · '+CRED[c.b],w,h);return;}
  if(c.k==='doc'){framePaper(w,h,PAPERC);txt(c.hd,0,-h/2+95,'700 30px Mono','rgba(27,28,26,.7)','center',4);fitTxt(c.big,0,-h/2+260,150,w-120,INKD);
    if(c.l2)fitTxt(c.l2,0,-h/2+350,58,w-140,PINK,'Anton',2,lin(t,c.t0+.3,c.t0+.5));(c.rows||[]).forEach(([s,t0],i)=>rowBar(s,-h/2+470+i*110,w,t,t0,1,i?AMB:INK));
    if(c.stampS)stampAt(c.stampS,w/2-260,h/2-150,90,t,c.stampT,-.1);srcFit(c.src,w,h,1);return;}
  if(c.k==='paywall'){framePaper(w,h,PAPERC);txt('LE SAVOIR, POUR QUI ?',0,-h/2+110,'86px Anton',INKD,'center',3);
    const box=(x,s1,s2,t0,col)=>{if(t<t0)return;const q=eo(lin(t,t0,t0+.25));ctx.save();ctx.globalAlpha*=q;ctx.fillStyle='rgba(27,28,26,.9)';ctx.fillRect(x-190,-60,380,220);txt(s1,x,20,'52px Anton',col||INK,'center',2);txt(s2,x,90,'700 24px Mono','rgba(236,238,230,.8)','center',2);ctx.restore();};
    box(-420,'TES IMPÔTS','PAIENT LA RECHERCHE',S('n41'));box(0,'L’ARTICLE','PUBLIÉ… PUIS ENFERMÉ',S('n43'),INK);box(420,'30 – 40 $','POUR LE LIRE',S('n44'),PINK);
    [[-210,S('n43')],[210,S('n44')]].forEach(([x,t0])=>{if(t>=t0)txt('→',x,70,'80px Anton',PINK,'center',0,lin(t,t0,t0+.2));});
    if(t>=S('n45'))txt('SINON, TU RESTES À LA PORTE.',0,h/2-110,'64px Anton',PINK,'center',2,lin(t,S('n45'),S('n45')+.25),10);return;}
  if(c.k==='fbi'){framePaper(w,h,'rgba(30,32,30,.95)');txt('DOSSIER',0,-h/2+110,'700 34px Mono','rgba(236,238,230,.7)','center',10);txt('FBI',0,-h/2+330,'230px Anton',INK,'center',12);
    stampAt('ENQUÊTE OUVERTE',-260,-h/2+470,64,t,S('n55')+.2,-.08);if(t>=S('n56'))txt('UNE VOITURE DEVANT LA MAISON DE SES PARENTS',0,-h/2+590,'40px Anton',AMB,'center',2,lin(t,S('n56'),S('n56')+.25));
    stampAt('CLASSÉE',300,-h/2+470,80,t,S('n58'),.08,GREEN);if(t>=S('n61'))txt('MAIS SON NOM EST DANS UN DOSSIER.',0,h/2-90,'56px Anton',PINK,'center',2,lin(t,S('n61'),S('n61')+.25),10);
    srcFit('Source : dossier du FBI, révélé en 2009 (Gizmodo, Boing Boing)',w,h);return;}
  if(c.k==='count'){framePaper(w,h,'rgba(30,32,30,.95)');txt('ARTICLES TÉLÉCHARGÉS',0,-h/2+110,'700 34px Mono','rgba(236,238,230,.7)','center',6);
    const p=eo(lin(t,c.t0,c.t0+1.4));txt((Math.round(4000000*p)).toLocaleString('fr-FR').replace(/ | /g,' ')+(p>=1?' +':''),0,-h/2+330,'190px Anton',INK,'center',4,1,14);
    [['VENDUS',S('n69'),-260],['PUBLIÉS',S('n70'),260]].forEach(([s,t0,x])=>{if(t<t0)return;const q=eo(lin(t,t0,t0+.2));ctx.save();ctx.globalAlpha*=q;txt(s,x,-h/2+500,'52px Anton',INK,'center',3);txt('0',x,-h/2+680,'170px Anton',PINK,'center',2,1,16);ctx.restore();});
    srcFit('Source : acte d’accusation, 2011',w,h);return;}
  if(c.k==='jstor'){framePaper(w,h,PAPERC);txt('LA BIBLIOTHÈQUE EN LIGNE',0,-h/2+100,'700 30px Mono','rgba(27,28,26,.7)','center',4);txt('JSTOR',0,-h/2+300,'200px Anton',INKD,'center',8);
    stampAt('PLAINTE RETIRÉE',0,-h/2+470,84,t,S('n74'),-.06,GREEN);if(t>=S('n75'))txt('FIN DE L’HISTOIRE ?',0,h/2-150,'80px Anton',INKD,'center',3,lin(t,S('n75'),S('n75')+.2));
    stampAt('NON.',w/2-200,h/2-150,110,t,S('n76'),-.12);srcFit('Sources : Wikipédia · avocats d’A. Swartz (2013)',w,h,1);return;}
  if(c.k==='charges'){framePaper(w,h,'rgba(30,32,30,.95)');txt('L’ÉTAT FÉDÉRAL CONTRE AARON SWARTZ',0,-h/2+100,'700 30px Mono','rgba(236,238,230,.7)','center',4);
    const n=t>=S('n83')?13:4;txt(String(n),-300,-h/2+400,'260px Anton',n>4?PINK:INK,'center',2,1,n>4?18:0);txt('CHEFS',-300,-h/2+480,'50px Anton',INK,'center',3);txt('D’ACCUSATION',-300,-h/2+535,'50px Anton',INK,'center',3);
    if(t>=S('n84')){const q=eo(lin(t,S('n84'),S('n84')+.3));ctx.save();ctx.globalAlpha*=q;txt('35 ANS',250,-h/2+330,'170px Anton',PINK,'center',3,1,16);txt('DE PRISON',250,-h/2+400,'54px Anton',INK,'center',3);ctx.restore();}
    if(t>=S('n85'))txt('+ 1 000 000 $ D’AMENDE',250,-h/2+520,'60px Anton',AMB,'center',2,lin(t,S('n85'),S('n85')+.25));srcFit('Source : acte d’accusation de remplacement, 12/09/2012',w,h);return;}
  if(c.k==='vs'){framePaper(w,h,'rgba(30,32,30,.95)');txt('POUR TE DONNER L’ÉCHELLE',0,-h/2+100,'700 32px Mono','rgba(236,238,230,.7)','center',6);ctx.fillStyle='rgba(236,238,230,.4)';ctx.fillRect(-2,-h/2+160,4,h-300);
    if(t>=S('n87')){const q=eo(lin(t,S('n87'),S('n87')+.25));ctx.save();ctx.globalAlpha*=q;txt('CRISE DE 2008',-w/4,-h/2+230,'64px Anton',INK,'center',3);txt('DES MILLIONS DE FAMILLES',-w/4,-h/2+300,'700 26px Mono',AMB,'center',2);txt('PERDENT LEUR MAISON',-w/4,-h/2+340,'700 26px Mono',AMB,'center',2);ctx.restore();}
    if(t>=S('n89')){txt('1 SEUL BANQUIER',-w/4,-h/2+470,'64px Anton',INK,'center',2,lin(t,S('n89'),S('n89')+.2));}
    if(t>=S('n90')){const q=eo(lin(t,S('n90'),S('n90')+.25));ctx.save();ctx.globalAlpha*=q;txt('30 MOIS',-w/4,-h/2+640,'150px Anton',GREEN,'center',3,1,14);ctx.restore();}
    if(t>=S('n91')){const q=eo(lin(t,S('n91'),S('n91')+.25));ctx.save();ctx.globalAlpha*=q;txt('AARON SWARTZ',w/4,-h/2+230,'64px Anton',INK,'center',3);txt('DES ARTICLES, NI VENDUS NI DIFFUSÉS',w/4,-h/2+300,'700 24px Mono',AMB,'center',1);
      txt('35 ANS',w/4,-h/2+640,'150px Anton',PINK,'center',3,1,16);ctx.restore();}
    srcFit('Sources : J. Eisinger, NYT Magazine / ProPublica (2014) · acte d’accusation (2012)',w,h);return;}
  if(c.k==='wash'){framePaper(w,h,'rgba(40,43,40,.92)');txt('UN GAMIN DE 25 ANS',0,-h/2+170,'96px Anton',INK,'center',3);txt('FAIT PLIER WASHINGTON.',0,-h/2+300,'96px Anton',GREEN,'center',3,lin(t,S('n101')+1.2,S('n101')+1.5),10);
    if(t>=S('n102'))txt('ET WASHINGTON LE BROIE.',0,-h/2+520,'110px Anton',PINK,'center',3,lin(t,S('n102')+.8,S('n102')+1.1),14);return;}
  if(c.k==='death'){framePaper(w,h,'rgba(20,22,20,.97)');const ph=h-260;cover(IM[c.img],0,-h/2+30+ph/2,w-60,ph,'grayscale(1) contrast(1.15) brightness(.85)',.3);ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=3;ctx.strokeRect(-w/2+30,-h/2+30,w-60,ph);
    txt('11 JANVIER 2013',0,h/2-140,'86px Anton',INK,'center',4);if(t>=S('n113'))txt('IL AVAIT 26 ANS.',0,h/2-60,'700 34px Mono',AMB,'center',6,lin(t,S('n113'),S('n113')+.3));srcFit(CRED[c.img],w,h);return;}
  if(c.k==='tbl'){framePaper(w,h,'rgba(30,32,30,.95)');cover(IM.tbl,-w/2+260,0,400,h-160,'grayscale(.85) contrast(1.1)',.3);ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=3;ctx.strokeRect(-w/2+60,-h/2+80,400,h-160);
    txt('TIM BERNERS-LEE',-w/2+260,h/2-40,'34px Anton',INK,'center',2);txt('L’INVENTEUR DU WEB · 12/01/2013',w/4-10,-h/2+110,'700 26px Mono',AMB,'center',3);
    [['« AARON EST MORT.',S('n116')],['VAGABONDS DU MONDE, NOUS AVONS PERDU UN SAGE.',S('n117')],['HACKERS DU BON CÔTÉ, NOUS SOMMES UN DE MOINS.',S('n118')],['PARENTS, NOUS AVONS PERDU UN ENFANT.',S('n119')],['PLEURONS. »',S('n120')]].forEach(([s,t0],i)=>{if(t<t0)return;
      wrap(s,w/4-10,-h/2+220+i*130,i==4?70:46,w/2-60,i==4?PINK:INK,'Anton',1.12,'center',lin(t,t0,t0+.3));});srcFit(CRED.tbl,w,h);return;}
  if(c.k==='pere'){framePaper(w,h,PAPERC);txt('ROBERT SWARTZ, SON PÈRE · FUNÉRAILLES, 15 JANVIER 2013',0,-h/2+100,'700 26px Mono','rgba(27,28,26,.75)','center',3);
    wrap('« AARON A ÉTÉ TUÉ PAR LE GOUVERNEMENT.',0,-h/2+280,88,w-140,INKD,'Anton',1.1);if(t>=c.t0+1.6)wrap('ET LE MIT A TRAHI TOUS SES PRINCIPES. »',0,-h/2+520,72,w-140,PINK,'Anton',1.1,'center',lin(t,c.t0+1.6,c.t0+1.9));
    srcFit('Sources : WBUR · CBS Boston · Common Dreams (15/01/2013) — pas d’enregistrement libre de la cérémonie',w,h,1);return;}
  if(c.k==='next'){framePaper(w,h,'rgba(30,32,30,.95)');txt('ALMATY · KAZAKHSTAN · 2011',0,-h/2+120,'700 34px Mono',AMB,'center',6);txt('UNE ÉTUDIANTE DE 22 ANS',0,-h/2+300,'96px Anton',INK,'center',3);
    txt('VA FINIR LE TRAVAIL.',0,-h/2+420,'96px Anton',INK,'center',3,lin(t,S('n134')+2,S('n134')+2.3));if(t>=S('n136'))txt('LE PRIX À PAYER #02',0,h/2-110,'80px Anton',PINK,'center',4,lin(t,S('n136'),S('n136')+.3),14);return;}
  if(c.k==='q'){framePaper(w,h,'rgba(40,43,40,.92)');txt('POUR TOI, AARON SWARTZ…',0,-h/2+180,'86px Anton',INK,'center',3);txt('VOLEUR…',-230,-h/2+380,'130px Anton',INK,'center',3,lin(t,c.t0+2.2,c.t0+2.5));
    txt('OU HÉROS ?',260,-h/2+530,'130px Anton',PINK,'center',3,lin(t,c.t0+3.2,c.t0+3.5),16);txt('DIS-LE EN COMMENTAIRE ↓',0,h/2-60,'700 40px Mono',AMB,'center',3,lin(t,c.t0+4,c.t0+4.3));return;}
  if(c.k==='outro'){framePaper(w,h,'rgba(40,43,40,.94)');txt('LE PRIX À PAYER',0,-h/2+170,'120px Anton',INK,'center',6);txt('ABONNE-TOI.',0,-h/2+330,'110px Anton',PINK,'center',5,1,14);
    txt('ILS PARLENT… NOUS ON VÉRIFIE.',0,-h/2+430,'700 36px Mono',AMB,'center',4);
    ['Voix : Flore Vasseur (TV5MONDE, « 64’ », 2019) · Lawrence Lessig, Peter Eckersley (The Internet’s Own Boy, B. Knappenberger, CC BY-NC-SA 4.0)','Aaron Swartz, « How We Stopped SOPA » (2012, domaine public) · Photos Wikimedia Commons (crédits sur chaque carte)',
     'Sources : acte d’accusation (2011-2012) · DOJ · Wired · ProPublica · WBUR · CBS · rapport du MIT (2013) · F. Vasseur, « Ce qu’il reste de nos rêves » (2019)','Musique : Kevin MacLeod (incompetech.com), CC BY 4.0','Si tu traverses une période difficile : 3114, numéro national de prévention du suicide, gratuit, 24 h/24.'].forEach((s,i)=>{let z=20;while(z>12&&mw(s,'400 '+z+'px Mono')>w-80)z--;txt(s,0,-h/2+530+i*48,'400 '+z+'px Mono',i==4?AMB:'rgba(236,238,230,.78)','center');});return;}
}
function drawCard(c,t){const i=C.indexOf(c);const w=c.w,h=c.h;ctx.save();ctx.translate(c.x,c.y);ctx.rotate(c.rot*Math.PI/180);
  if(c.k==='cover'){drawCover(w,h,t);ctx.restore();return;}
  if(t<c.t0-1.2&&c.k!=='outro'){framePaper(w,h,'rgba(58,64,60,.5)');laminate(w,h);pin(0,-h/2+18);ctx.restore();return;}   // carte encore « muette » avant son tour
  cardBody(c,t,w,h);laminate(w,h);pin(0,-h/2+18);tape(-w/2+50,-h/2+12,150,-.6);ctx.restore();}

// ---------- quelles images d'extraits charger, et quand
window.CLIPUSE=[{k:'A1',a:0,b:A1E+12,sync:0}];C.forEach((c,i)=>{if(c.k!=='clip')return;const nx=KEYS.find(k=>k.t>c.t0+.01);window.CLIPUSE.push({k:c.clip,a:c.t0-1.5,b:(nx?nx.t:c.t0+20)+1.5,sync:c.sync});});

// ---------- sons
reveal(A1E,1.3);ev(A1E,'hit');ev(TCOV-.1,'whoosh');KEYS.forEach(k=>{if(k.t>TCOV+.5)ev(k.t-.5,'whoosh');});C.forEach((c,i)=>{if(i>0&&c.k!=='outro')ev(c.t0-.05,'click');});
ev(S('n2'),'thud');ev(S('n3'),'tick');ev(S('n21'),'thud');ev(S('n36'),'thud');ev(S('n55')+.2,'thud');ev(S('n58'),'thud');ev(S('n74'),'thud');reveal(S('n76'),1.2);
ev(S('n83'),'hit');ev(S('n84'),'thud');reveal(S('n89'),1);ev(S('n90'),'thud');ev(S('n91'),'thud');ev(S('n99'),'thud');ev(S('n108'),'thud');reveal(M('V6')[0]+1.6,1.3);
ev(WT0-.9,'riser');ev(WB0-.9,'riser');ev(M('V5r')[0]+.1,'thud');ev(VEND+.35,'boom');

// ---------- rendu
const MBC=document.createElement('canvas');MBC.width=W;MBC.height=H;
window.ready=(async()=>{for(const [k,f] of Object.entries(window.IMGS))IM[k]=await load('img/'+f);
  await document.fonts.load('80px Anton');await document.fonts.load('700 50px Osw');await document.fonts.load('700 30px Mono');await document.fonts.load('400 30px Mono');await document.fonts.load('500 40px Inter');await document.fonts.load('700 38px Inter');await document.fonts.load('400 25px Inter');await document.fonts.load('600 26px Inter');})();
window.renderFrame=async f=>{const t=f/FPS;TNOW=t;await ensureClips(t);const st=camState(t);CS=st;
  ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle='#262a27';ctx.fillRect(0,0,W,H);
  ctx.save();toWorld();drawWall();drawThreads(t);C.forEach(c=>drawCard(c,t));ctx.restore();ctx.setTransform(1,0,0,1,0,0);
  if(st.speed>24){const m=MBC.getContext('2d');m.clearRect(0,0,W,H);m.drawImage(cv,0,0);ctx.save();ctx.globalAlpha=.28;const dx=-Math.cos(st.dir)*Math.min(st.speed,90)*.45,dy=-Math.sin(st.dir)*Math.min(st.speed,90)*.45;ctx.drawImage(MBC,dx,dy);ctx.drawImage(MBC,dx*.5,dy*.5);ctx.restore();}
  // vues d'ensemble : la phrase en surimpression
  [[WB0,WB1,['ILS MISENT SUR L’OUBLI.','NOUS, ON GARDE LES PREUVES.']]].forEach(([a,b,L])=>{const al=vis(t,a+.4,b+.6,.4,.4);if(al>0){txt(L[0],960,430,'110px Anton',INK,'center',4,al,16);txt(L[1],960,560,'110px Anton',PINK,'center',4,al*lin(t,S('n140'),S('n140')+.3),18);}});
  if(t>=A1E-6.4&&t<VEND+.3){subs(t);supers(t);}
  post(t);flash(t);};
