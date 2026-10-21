function outroCredits(t){const c=C[cOutro];ctx.save();ctx.translate(c.x,c.y+c.h/2+110);[
  'Sources : Le Monde (G. Davet, F. Lhomme, 29/08/2019) · franceinfo · Insee · Fitch · S&P · AFP',
  'Émission citée : On n’est pas couché (France 2, 18/10/2014)',
  'Photos Wikimedia Commons : '+[...new Set(Object.values(window.CRED||{}))].join(' · '),
  'Musique : « Hitman », K. MacLeod · CC BY 4.0'].forEach((s,i)=>{let sz=20;while(sz>11&&mw(s,'400 '+sz+'px Mono')>c.w-48)sz--;txt(s,0,i*36,'400 '+sz+'px Mono','rgba(236,238,230,.75)','center');});ctx.restore();}
