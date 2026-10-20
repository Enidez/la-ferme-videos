function outroCredits(t){const c=C[cOutro];ctx.save();ctx.translate(c.x,c.y+c.h/2+110);[
  'Sources : AFP · Puremédias · Wikipédia · rapports Mandelkern (1998) et Géronimi (1999)',
  'Extraits : LCI « La Grande Confrontation » via @quotidienofficiel et @24hPujadas (citation)',
  'Images : A. Cros, Algeria-SP (CC BY-SA 4.0) · Commission européenne (CC BY 4.0)',
  'Musique : « Hitman », K. MacLeod · CC BY 4.0'].forEach((s,i)=>{let sz=20;while(sz>14&&mw(s,'400 '+sz+'px Mono')>c.w-48)sz--;txt(s,0,i*36,'400 '+sz+'px Mono','rgba(236,238,230,.75)','center');});ctx.restore();}
