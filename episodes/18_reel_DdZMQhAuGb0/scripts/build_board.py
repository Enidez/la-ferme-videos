# Recompose board.js à partir de parts/ (cartes, dessins, crédits, sons).
import os
E=os.path.join(os.path.dirname(__file__),'..');P=lambda f:open(os.path.join(E,'parts',f)).read().rstrip('\n')+'\n'
b=open(os.path.join(E,'board.js')).read()
def rep(b,a,z,new):
    i=b.index(a);j=b.index(z,i);return b[:i]+new+b[j:]
b=rep(b,'// ---------- les cartes','// placement en serpentin',P('cards.js'))
b=rep(b,'// source qui tient toujours','function drawHook2(',P('draw.js'))
b=rep(b,'function outroCredits(','// ---------- sous-titres',P('outro.js')+'\n')
b=rep(b,'// ---------- sons','// ---------- post',P('sons.js')+'\n')
open(os.path.join(E,'board.js'),'w').write(b);print('board.js ok')
