function outroCredits(t){const c=C[cOutro];ctx.save();ctx.translate(c.x,c.y+c.h/2+110);[
  'Sources : franceinfo (05/11) · 20 Minutes (05/11) · Blast (24/10) · Sénat, amendement n° 94 (27/10)',
  'Visibrain cité par le Canard enchaîné · Photos Wikimedia Commons : FreCha · ScareCriterion12 (CC BY-SA 4.0)',
  'Musique : « Hitman », K. MacLeod · CC BY 4.0'].forEach((s,i)=>{let sz=20;while(sz>11&&mw(s,'400 '+sz+'px Mono')>c.w-48)sz--;txt(s,0,i*36,'400 '+sz+'px Mono','rgba(236,238,230,.75)','center');});ctx.restore();}
