function outroCredits(t){const c=C[cOutro];ctx.save();ctx.translate(c.x,c.y+c.h/2+110);[
  'Sources : Le Point (27/10) · TF1 (1/11) · ministère de l’Intérieur · Conseil constitutionnel (2007-557 DC) · Le Monde · France 2 (5/11)',
  'Photos Wikimedia Commons : Jacques Paquier (CC BY 2.0) · Perguillaume · Jorge Jaramillo (CC BY-SA 4.0)',
  'Musique : « Hitman », K. MacLeod · CC BY 4.0'].forEach((s,i)=>{let sz=20;while(sz>11&&mw(s,'400 '+sz+'px Mono')>c.w-48)sz--;txt(s,0,i*36,'400 '+sz+'px Mono','rgba(236,238,230,.75)','center');});ctx.restore();}
