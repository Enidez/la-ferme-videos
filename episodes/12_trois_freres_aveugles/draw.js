const HEBF='"Arial Hebrew","Noto Sans Hebrew",Arial,sans-serif';
const GLY='אבגדהוזחטיכלמנסעפצקרשתابتثجحخدذرزسشصضطظعغفقكلمنهوي0123456789';
const MGREEN='#36ff7a';
function hsh(a){a=(a^61)^(a>>>16);a=a+(a<<3);a=a^(a>>>4);a=Math.imul(a,0x27d4eb2d);a=a^(a>>>15);return a>>>0;}
function typedL(s,x,y,t,t0,t1,font,col){if(t<t0)return 0;const n=Math.floor(s.length*lin(t,t0,t1));txt(s.slice(0,n),x,y,font,col,'left',1,1,10);return n;}
function drawMatrix(w,h,t){
  const FRZ=MARK.wm[1]+.05,tt=Math.min(t,FRZ);
  ctx.fillStyle='#000';ctx.fillRect(-w/2,-h/2,w,h);
  ctx.save();ctx.globalAlpha=lin(t,0,.4);ctx.font='32px '+HEBF;ctx.textAlign='center';
  for(let i=0;i<30;i++){const x=-w/2+18+i*36;const r=rng(i*977+3);const v=240+r()*460,o=r()*2400,n=10+Math.floor(r()*18);const tot=h+n*36;
    const head=((o+v*tt)%tot)-n*36-h/2+n*36;
    for(let j=0;j<n;j++){const y=head-j*36;if(y<-h/2-36||y>h/2+36)continue;const ci=hsh(i*131+Math.floor((y+5000)/36)*17+Math.floor(tt*12+j*3))%GLY.length;
      ctx.fillStyle=j===0?'#e4ffe9':`rgba(0,255,102,${(1-j/n)*.8})`;if(j===0){ctx.shadowColor='#7dff9c';ctx.shadowBlur=14;}else ctx.shadowBlur=0;ctx.fillText(GLY[ci],x,y);}}
  ctx.restore();
  // terminal
  const ta=1-lin(t,FRZ,FRZ+.15);
  if(ta>0){ctx.save();ctx.globalAlpha=ta;ctx.fillStyle='rgba(0,0,0,.78)';ctx.fillRect(-440,-340,880,560);ctx.strokeStyle='rgba(54,255,122,.55)';ctx.lineWidth=2;ctx.strokeRect(-440,-340,880,560);
    const F='700 34px Mono',x0=-400;let y=-270;const L=62;
    typedL('> APPEL ENTRANT…',x0,y,t,.15,.7,F,MGREEN);y+=L;
    typedL('> LIGNE : RADIO DE L’ARMÉE',x0,y,t,.8,1.45,F,MGREEN);y+=L;
    typedL('> JAFFA · 1998',x0,y,t,1.45,1.85,F,MGREEN);y+=L;
    if(t>=1.9){const lk=[2.5,2.9,3.3],fin='281';let d='';for(let k=0;k<3;k++)d+=t>=lk[k]?fin[k]:String(hsh(Math.floor(t*30)*7+k)%10);
      txt('> CANAUX OUVERTS : '+d,x0,y,F,MGREEN,'left',1,1,10);}y+=L;
    typedL('> Tout est en place ?',x0,y,t,MARK.wf[0],MARK.wf[1]-.2,F,'#e4ffe9');y+=L;
    const wm0=MARK.wm[0],wm1=MARK.wm[1];typedL('> La ligne est ouverte.',x0,y,t,wm0,wm0+1.1,F,'#e4ffe9');y+=L;
    typedL('> Ils ne verront rien.',x0,y,t,wm0+1.3,wm1-.1,F,'#e4ffe9');
    if(Math.floor(t*3)%2===0&&t<FRZ){ctx.fillStyle=MGREEN;ctx.fillRect(x0+(t>wm0?440:0),y+14,22,6);}
    ctx.restore();}
  txt('RECONSTITUTION · VOIX GÉNÉRÉES',0,-h/2+300,'700 24px Mono','rgba(54,255,122,.75)','center',4);
  if(t>=FRZ){const p=eo(lin(t,FRZ,FRZ+.15));ctx.save();ctx.globalAlpha=p*.6;ctx.fillStyle='#000';ctx.fillRect(-w/2,-h/2,w,h);ctx.restore();
    txt('TROIS FRÈRES.',0,-h/2+1190,'150px Anton',INK,'center',6,p,24);txt('AVEUGLES.',0,-h/2+1420,'230px Anton',RED,'center',8,p,30);}
}
function wrapHe(s,maxw,font){ctx.save();ctx.font=font;const ws=s.split(' ');const out=[];let cur='';ws.forEach(wd=>{const tr=cur?cur+' '+wd:wd;if(ctx.measureText(tr).width>maxw&&cur){out.push(cur);cur=wd;}else cur=tr;});if(cur)out.push(cur);ctx.restore();return out;}
const SPK={h1:['SECRÉTAIRE',0],h2:['UN FRÈRE · FAUX TECHNICIEN',1],h3:['SECRÉTAIRE',0],h4:['UN FRÈRE · FAUX ENQUÊTEUR ANTI-FRAUDE',1],h5:['TECHNICIEN DE BEZEQ',0]};
function drawCall(c,w,h,t){framePaper(w,h,'rgba(14,16,15,.95)');
  txt('RECONSTITUTION · VOIX GÉNÉRÉES',0,-h/2+85,'700 30px Mono',AMB,'center',4);txt('APPEL TÉLÉPHONIQUE · ANNÉES 1990 · EN HÉBREU',0,-h/2+135,'700 24px Mono','rgba(236,238,230,.55)','center',3);
  let cur=null;c.lines.forEach(k=>{if(t>=MARK[k][0]-.05)cur=k;});
  const act=cur&&t<MARK[cur][1]+.05;
  if(cur){const [lab,bro]=SPK[cur];txt(lab,0,-h/2+250,(lab.length>24?'46px':'58px')+' Anton',bro?PINK:INK,'center',2);
    const font='700 60px '+HEBF;const ls=wrapHe(HEB(cur).he,800,font);ctx.save();ctx.direction='rtl';ctx.font=font;ctx.fillStyle=INK;ctx.textAlign='center';ctx.shadowColor='rgba(255,255,255,.35)';ctx.shadowBlur=12;
    ls.forEach((l,i)=>ctx.fillText(l,0,-90+i*84-(ls.length-1)*30));ctx.restore();}
  const r=rng(Math.floor(t*30));ctx.fillStyle=act?MGREEN:'rgba(54,255,122,.35)';
  for(let i=0;i<44;i++){const hh=act?8+r()*130*(.4+.6*Math.abs(Math.sin(i*.45+t*9))):6;ctx.fillRect(-430+i*20,250-hh/2,12,hh);}
  if(c.stamp)stampAt(c.stamp[0],0,h/2-150,74,t,c.stamp[1],-.08,c.stamp[2]?GREEN:PINK);}
function drawCard(c,t){
  ctx.save();ctx.translate(c.x,c.y);ctx.rotate(c.rot*Math.PI/180);
  const w=c.w,h=c.h;
  if(c.k==='matrix'){drawMatrix(w,h,t);}
  else if(c.k==='outro'){framePaper(w,h);txt('HISTOIRE VRAIE',0,-200,'100px Anton',INK,'center',4,1,24);txt('TROIS FRÈRES.',0,10,'150px Anton',PINK,'center',4,1,24);txt('LA FERME',0,100,'700 34px Mono','rgba(236,238,230,.6)','center',12);
    txt('ABONNE-TOI',0,240,'70px Anton',INK,'center',4,1,16);txt('ON VÉRIFIE. TOUJOURS.',0,320,'700 34px Mono',AMB,'center',4);}
  else if(c.k==='clip'){framePaper(w,h,'rgba(230,232,224,.88)');const im=IM[c.img];const pw=w-50,ph=h-170;
    ctx.fillStyle='#000';ctx.fillRect(-pw/2,-h/2+25,pw,ph);if(im){ctx.save();ctx.beginPath();ctx.rect(-pw/2,-h/2+25,pw,ph);ctx.clip();const age=Math.max(0,t-c.t0);const s=Math.max(pw/im.width,ph/im.height)*(1.02+age*.012);ctx.filter=c.gray?'grayscale(1) contrast(1.12)':'saturate(.8) contrast(1.08)';ctx.drawImage(im,-im.width*s/2,-h/2+25+ph/2-im.height*s/2,im.width*s,im.height*s);ctx.restore();}
    if(c.after){ctx.save();c.after(w,h,t);ctx.restore();}
    txt(c.handle,-w/2+30,h/2-85,'700 28px Mono','#1b1c1a','left',1);
    if(c.badge){const bc=c.badgeRed?PINK:'rgba(20,20,20,.85)';ctx.font='700 30px Mono';const bw=ctx.measureText(c.badge).width+36;ctx.fillStyle=bc;ctx.fillRect(-bw/2,h/2-58,bw,44);txt(c.badge,0,h/2-26,'700 30px Mono','#fff','center',2);}}
  else if(c.k==='call'){drawCall(c,w,h,t);}
  else if(c.k==='title'){framePaper(w,h);if(c.small2){txt(c.lines[0],0,-20,'200px Anton',INK,'center',4,1,18);txt(c.lines[1],0,110,'64px Anton',PINK,'center',3,lin(t,c.t0+.6,c.t0+.9));}
    else{const big=110;c.lines.forEach((l,i)=>txt(l,0,-((c.lines.length-1)*big*.55)+i*big*1.1+big*.35,big+'px Anton',c.red&&i==1?PINK:INK,'center',2));}}
  else if(c.k==='cnt'){framePaper(w,h);const v=Math.round(c.to*eo(lin(t,c.t0+.15,c.t0+1.4)));txt(v.toLocaleString('fr-FR'),0,-30,'180px Anton',INK,'center',2,1,14);
    txt(c.label,0,60,'700 36px Mono',INK,'center',3);txt(c.sub,0,120,'700 26px Mono','rgba(236,238,230,.6)','center',3);srcLine('Source : '+c.src,w,h);}
  else if(c.k==='mil'){framePaper(w,h);txt('ET POURTANT…',0,-h/2+110,'700 36px Mono','rgba(236,238,230,.7)','center',6);
    txt('DES MILLIERS',0,-h/2+290,'130px Anton',INK,'center',3,lin(t,N(2),N(2)+.25),14);txt('D’APPELS',0,-h/2+420,'100px Anton',INK,'center',3,lin(t,N(2)+.2,N(2)+.45));
    if(t>=N(3))stampAt('PAYÉS PAR L’ARMÉE ISRAÉLIENNE',0,h/2-120,52,t,N(3),-.06);}
  else if(c.k==='trio'){framePaper(w,h);if(t>=N(9))txt('LES FRÈRES BADIR',0,-h/2+95,'700 36px Mono',AMB,'center',6,lin(t,N(9),N(9)+.3));
    [['RAMY',N(8)],['MUZHER',N(8)+.55],['SHADDE',N(9)]].forEach(([nm,t0],i)=>{const x=(i-1)*290;const a=lin(t,c.t0+i*.15,c.t0+i*.15+.25);ctx.save();ctx.globalAlpha*=a;
      ctx.fillStyle='rgba(128,134,126,.25)';ctx.fillRect(x-125,-h/2+150,250,380);person(x,-h/2+470,1.7,'rgba(236,238,230,.85)');ctx.fillStyle='#111';ctx.fillRect(x-48,-h/2+262,96,22);ctx.restore();
      if(t>=t0)txt(nm,x,-h/2+600,'62px Anton',INK,'center',2,lin(t,t0,t0+.2));});
    txt('PHOTOS : AUCUNE IMAGE LIBRE · SILHOUETTES',0,-h/2+660,'700 20px Mono','rgba(236,238,230,.45)','center',2);
    stampAt('AVEUGLES DE NAISSANCE',0,h/2-110,62,t,N(10),-.06);}
  else if(c.k==='secret'){framePaper(w,h);txt('ENFANTS : UNE LANGUE SECRÈTE',0,-h/2+95,'700 34px Mono',AMB,'center',3);
    const src='BONJOUR',tgt=[4,5,6,0,1,2,3];const p=eo(lin(t,N(12)+.5,N(12)+1.2));const tw=96,g=12;
    [...src].forEach((ch,i)=>{const x0=(i-3)*(tw+g),x1=(tgt[i]-3)*(tw+g);const x=x0+(x1-x0)*p;const y=-30-Math.sin(p*Math.PI)*(i%2?60:-60);
      ctx.fillStyle='rgba(128,134,126,.32)';ctx.fillRect(x-tw/2,y-65,tw,130);ctx.strokeStyle='rgba(236,238,230,.45)';ctx.lineWidth=2;ctx.strokeRect(x-tw/2,y-65,tw,130);txt(ch,x,y+32,'700 92px Osw',p>.99?PINK:INK,'center',0,1,12);});
    txt('ILS MÉLANGENT LES LETTRES',0,140,'700 30px Mono','rgba(236,238,230,.75)','center',3,lin(t,N(12)+.6,N(12)+.9));
    if(t>=N(13))txt('POUR QUE PERSONNE NE COMPRENNE',0,h/2-60,'700 32px Mono',INK,'center',2,lin(t,N(13),N(13)+.3));}
  else if(c.k==='arme'){framePaper(w,h);txt('LEUR ARME ?',0,-h/2+170,'120px Anton',INK,'center',3);
    if(t>=N(21)-.1){txt('LE CLAVIER',0,30,'90px Anton','rgba(236,238,230,.7)','center',3,lin(t,N(21)-.1,N(21)+.15));if(t>=N(21)+.45){const p=eo(lin(t,N(21)+.45,N(21)+.65));ctx.fillStyle=PINK;ctx.fillRect(-230,0,460*p,14);}}
    if(t>=N(22))stampAt('LA VOIX.',0,h/2-110,120,t,N(22),-.08);}
  else if(c.k==='radio'){framePaper(w,h);const on=Math.floor(t*2)%2===0;ctx.save();ctx.fillStyle=on?'rgba(232,35,31,.95)':'rgba(120,20,18,.8)';if(on){ctx.shadowColor='rgba(255,60,40,.9)';ctx.shadowBlur=40;}
    ctx.fillRect(-170,-h/2+70,340,100);ctx.restore();txt('ON AIR',0,-h/2+142,'70px Anton','#fff','center',6);
    txt('GALEI TSAHAL',0,-h/2+340,'130px Anton',INK,'center',3,1,14);txt('LA RADIO DE L’ARMÉE ISRAÉLIENNE · JAFFA',0,-h/2+420,'700 30px Mono','rgba(236,238,230,.75)','center',2);
    if(t>=N(37))txt('UNE FONCTION OUBLIÉE DU STANDARD…',0,-h/2+520,'700 30px Mono',AMB,'center',2,lin(t,N(37),N(37)+.3));
    stampAt('RÉACTIVÉE',0,h/2-110,80,t,N(37)+1.2,-.08);}
  else if(c.k==='flow'){framePaper(w,h);txt('LE SYSTÈME',0,-h/2+90,'700 34px Mono',AMB,'center',6);
    [['DES PALESTINIENS','APPELLENT L’ÉTRANGER',N(43),INK],['LA CABANE','ENCAISSE',N(44),INK],['L’ARMÉE','REÇOIT LA FACTURE',N(45)+.2,PINK]].forEach(([a,b,t0,col],i)=>{if(t<t0)return;const y=-h/2+220+i*240;const q=eo(lin(t,t0,t0+.25));ctx.save();ctx.globalAlpha*=q;
      ctx.fillStyle=i==2?'rgba(201,48,44,.35)':'rgba(128,134,126,.28)';ctx.fillRect(-380,y-70,760,140);ctx.strokeStyle='rgba(236,238,230,.5)';ctx.lineWidth=2;ctx.strokeRect(-380,y-70,760,140);
      txt(a,0,y+2,'64px Anton',col,'center',2);txt(b,0,y+48,'700 26px Mono','rgba(236,238,230,.8)','center',3);ctx.restore();
      if(i<2){const ta=t0+.4;if(t>=ta){const p=eo(lin(t,ta,ta+.3));ctx.fillStyle=PINK;ctx.fillRect(-7,y+72,14,96*p);if(p>.9){ctx.beginPath();ctx.moveTo(-24,y+150);ctx.lineTo(24,y+150);ctx.lineTo(0,y+176);ctx.fill();}}}});}
  else if(c.k==='worker'){framePaper(w,h);txt('UN OUVRIER LÂCHE UN DÉTAIL',0,-h/2+100,'700 34px Mono',AMB,'center',3);
    if(t>=N(49))txt('« LES TECHNICIENS… »',0,-30,'96px Anton',INK,'center',2,lin(t,N(49),N(49)+.3),12);
    stampAt('ÉTAIENT AVEUGLES',0,h/2-130,90,t,N(50),-.08);}
  else if(c.k==='wired'){framePaper(w,h,PAPERC);txt('1 AN',0,-h/2+250,'220px Anton',INKD,'center',3);txt('D’ÉCOUTES',0,-h/2+340,'80px Anton',INKD,'center',3);
    if(t>=N(52)){ctx.fillStyle='rgba(20,20,20,.9)';ctx.fillRect(-200,-h/2+400,400,56);txt('SELON WIRED',0,-h/2+440,'700 32px Mono','#fff','center',4);}
    if(t>=N(53))txt('L’E-MAIL DU PROCUREUR PIRATÉ ?',0,h/2-110,'60px Anton',PINK,'center',2,lin(t,N(53)+.5,N(53)+.8));
    txt('Source : Wired 12.02, « Three Blind Phreaks »',w/2-30,h/2-24,'400 22px Mono','rgba(27,28,26,.55)','right');}
  else if(c.k==='raid'){framePaper(w,h);txt('PERQUISITION',0,-h/2+95,'700 34px Mono',AMB,'center',8);txt('14.06.1999',0,-h/2+280,'150px Anton',INK,'center',3,1,14);
    if(t>=N(55))txt('14 POLICIERS',0,-h/2+410,'90px Anton',INK,'center',3,lin(t,N(55),N(55)+.3));
    stampAt('ORDINATEUR : RIEN',0,-h/2+570,74,t,N(56)+.2,-.08);
    if(t>=N(57)+.4)txt('« IL S’EFFACE TOUT SEUL »',0,h/2-80,'700 38px Mono',AMB,'center',2,lin(t,N(57)+.4,N(57)+.7));}
  else if(c.k==='verdict'){framePaper(w,h);txt('LE VERDICT · 2001',0,-h/2+100,'90px Anton',INK,'center',2);
    [['RAMY','65 MOIS DE PRISON',N(62),PINK],['MUZHER','TRAVAUX D’INTÉRÊT GÉNÉRAL',N(64),INK],['SHADDE','SURSIS',N(66),INK]].forEach(([a,b,t0,col],i)=>{if(t<t0-.4)return;const y=-h/2+260+i*170;const q=eo(lin(t,t0-.4,t0-.2));ctx.save();ctx.globalAlpha*=q;
      ctx.fillStyle='rgba(128,134,126,.28)';ctx.fillRect(-w/2+50,y-80,w-100,130);txt(a,-w/2+80,y+12,'72px Anton',INK,'left',2);if(t>=t0)txt(b,w/2-80,y+6,'48px Anton',col,'right',1,lin(t,t0,t0+.2));ctx.restore();});
    srcLine('Sources : Haaretz 2001 · Wired',w,h);}
  else if(c.k==='versions'){framePaper(w,h);txt('DEUX VERSIONS',0,-h/2+95,'700 34px Mono',AMB,'center',8);
    ctx.fillStyle='rgba(128,134,126,.28)';ctx.fillRect(-w/2+40,-h/2+150,w/2-60,540);ctx.fillRect(20,-h/2+150,w/2-60,540);txt('VS',0,-h/2+430,'90px Anton',PINK,'center',2);
    txt('EUX',-w/4+10,-h/2+240,'80px Anton',INK,'center',2);['« VISÉS PARCE','QU’ARABES…','ET DOUÉS »'].forEach((s,i)=>txt(s,-w/4+10,-h/2+340+i*60,'700 34px Mono',INK,'center',1,lin(t,N(67)+i*.4,N(67)+i*.4+.3)));
    txt('LE PARQUET',w/4-10,-h/2+240,'70px Anton',INK,'center',2,lin(t,N(69)-.3,N(69)));if(t>=N(69))stampAt('DÉMENTI',w/4-10,-h/2+420,70,t,N(69),-.1);
    srcLine('Source : Associated Press, 29/10/1999',w,h);}
  else if(c.k==='sources'){framePaper(w,h,PAPERC);txt('CE N’EST PAS NOUS',0,-h/2+150,'100px Anton',INKD,'center',2);txt('QUI L’INVENTONS.',0,-h/2+260,'100px Anton',INKD,'center',2);
    stampAt('JUGÉ PAR LES TRIBUNAUX ISRAÉLIENS',0,-h/2+420,46,t,N(72),-.05);
    [['ASSOCIATED PRESS · 1999',N(73)-.2],['HAARETZ · 2001',N(73)+.2],['WIRED · 2004',N(73)+.6]].forEach(([s,t0],i)=>{if(t<t0)return;const y=-h/2+560+i*90;const q=eo(lin(t,t0,t0+.2));ctx.save();ctx.globalAlpha*=q;ctx.fillStyle='rgba(20,20,20,.88)';ctx.font='700 34px Mono';const bw=ctx.measureText(s).width+60;ctx.fillRect(-bw/2,y-44,bw,64);txt(s,0,y,'700 34px Mono','#fff','center',3);ctx.restore();});}
  else if(c.k==='after'){framePaper(w,h);txt('À SA SORTIE…',0,-h/2+110,'700 36px Mono',AMB,'center',6);txt('PROTÉGER',0,-h/2+280,'120px Anton',INK,'center',3,lin(t,N(75),N(75)+.3),14);txt('LES ENTREPRISES',0,-h/2+390,'84px Anton',INK,'center',3,lin(t,N(75)+.3,N(75)+.6));
    if(t>=N(76))stampAt('CONTRE LES PIRATES COMME LUI',0,h/2-110,50,t,N(76)+.2,-.06);}
  else if(c.k==='q'){framePaper(w,h,'rgba(40,43,40,.9)');txt('ET TOI, T’EN PENSES QUOI ?',0,-h/2+110,'64px Anton',INK,'center',2);
    [['GÉNIE ?',N(78),GREEN],['ESCROC ?',N(79),PINK]].forEach(([s,t0,col],i)=>{if(t<t0-.05)return;const x=(i-.5)*420;const p=eo(lin(t,t0-.05,t0+.2));ctx.save();ctx.translate(x,-20);ctx.scale(.8+.2*p,.8+.2*p);ctx.globalAlpha*=p;
      ctx.strokeStyle=col;ctx.lineWidth=6;ctx.strokeRect(-180,-110,360,220);txt(s,0,30,'96px Anton',col,'center',2,1,16);ctx.restore();});
    txt('DIS-LE EN COMMENTAIRE ↓',0,h/2-80,'700 40px Mono',AMB,'center',3,lin(t,N(77),N(77)+.3));}
  laminate(w,h);
  if(c.k!=='matrix'){pin(0,-h/2+18);tape(-w/2+40,-h/2+10,140,-.6);}
  ctx.restore();
}
function outroCredits(t){const c=C[cOutro];ctx.save();ctx.translate(c.x,c.y+c.h/2+120);[['Sources : Associated Press (1999) · Haaretz (2001) · Wired 12.02 « Three Blind Phreaks »',0],['Images : Nizzan Cohen, Wilfredor, Eddau, David Shay, Yagasi (Wikimedia) · Matson Collection',40],['Voix et dialogues en hébreu : reconstitution générée · Musique : « Hitman », K. MacLeod · CC BY 4.0',80]].forEach(([s,y])=>txt(s,0,y,'400 20px Mono','rgba(236,238,230,.75)','center'));ctx.restore();}
