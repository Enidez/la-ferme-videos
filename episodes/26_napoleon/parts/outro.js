function outroCredits(t){const c=C[cOutro];ctx.save();ctx.translate(c.x,c.y+c.h/2+110);[
  'Sources : proclamation d’Alexandrie (1798) · Roederer (1800) · Gourgaud, Journal de Sainte-Hélène (1817) · testament (15/04/1821)',
  'Tableaux : Jean-Léon Gérôme (domaine public, Wikimedia Commons) · L. Blin, Napoléon et l’islam (2025)',
  'Musique : « Hitman », K. MacLeod · CC BY 4.0'].forEach((s,i)=>{let sz=20;while(sz>11&&mw(s,'400 '+sz+'px Mono')>c.w-48)sz--;txt(s,0,i*36,'400 '+sz+'px Mono','rgba(236,238,230,.75)','center');});ctx.restore();}
