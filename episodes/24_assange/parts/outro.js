function outroCredits(t){const c=C[cOutro];ctx.save();ctx.translate(c.x,c.y+c.h/2+110);[
  'Sources : CPJ · Reuters · WikiLeaks · Yahoo News (2021) · ONU (N. Melzer, 2019) · DOJ (2019, 2024) · APCE (1/10/2024)',
  'Bagdad : reconstitution graphique · Photos Wikimedia Commons : Snapperjack · wl dreamer · Tracey & Doug (CC BY-SA)',
  'Musique : « Hitman », K. MacLeod · CC BY 4.0'].forEach((s,i)=>{let sz=20;while(sz>11&&mw(s,'400 '+sz+'px Mono')>c.w-48)sz--;txt(s,0,i*36,'400 '+sz+'px Mono','rgba(236,238,230,.75)','center');});ctx.restore();}
