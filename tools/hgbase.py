# Base commune : prend le moteur de 23b et remplace cartes, hook, cartes dessinées, compteur, sons, crédits.
import sys
def build(out,title,cards,hook,extra,cnt,label,sounds,credits,imgs):
    s=open('/home/user/la-ferme-videos/episodes/23b_on_te_manipule_p2/board.js').read()
    def rep(a,b,new):
        nonlocal s;i=s.index(a);j=s.index(b,i);s=s[:i]+new+s[j:]
    s=s.replace('« ON TE MANIPULE ? » partie 2 (26/10/2026)',title)
    rep("const cCover","{const COLS=4",cards)
    rep("function drawHook3(w,h,t){","// ---------- cartes dessinées",hook)
    # cartes dessinées : on garde le moteur, on remplace les cartes propres à 23b
    i=s.index("function cardExtra(c,t,w,h){");j=s.index("  return 0;}",i)
    s=s[:i]+"function cardExtra(c,t,w,h){\n"+extra+s[j:]
    s=s.replace("else if(c.k==='clip'&&c.img&&!IM[c.img]){framePaper(w,h,'rgba(30,32,30,.95)');person(0,-h/2+640,2.2,'rgba(236,238,230,.18)');",
                "else if(c.k==='clip'&&!(c.clip&&window.CLIPS&&CLIPS[c.clip]&&CLIPS[c.clip].length)&&!(c.img&&IM[c.img])){framePaper(w,h,'rgba(30,32,30,.95)');")
    s=s.replace("const fr=c.img?[IM[c.img]]:((window.CLIPS&&CLIPS[c.clip])||[]);","const fr=(c.clip&&window.CLIPS&&CLIPS[c.clip]&&CLIPS[c.clip].length)?CLIPS[c.clip]:(c.img?[IM[c.img]]:[]);")
    i=s.index("function outroCredits");j=s.index("\n",s.index("forEach((s,i)=>txt(s,0,i*36",i))
    s=s[:i]+"function outroCredits(t){const c=C[cOutro];ctx.save();ctx.translate(c.x,c.y+c.h/2+110);"+repr(credits)+".forEach((s,i)=>txt(s,0,i*36,'400 15px Mono','rgba(236,238,230,.75)','center'));ctx.restore();}"+s[j:]
    i=s.index("// ---------- compteur");j=s.index("// ---------- post")
    H=s[i:j];k=H.index("// ---------- sons")
    H=H[:k].replace("const CNT=[[0,4],[N(11),5],[N(25),6],[N(35),7],[N(47),8]];","const CNT="+cnt+";").replace("txt('TECHNIQUE',","txt('"+label+"',")+"// ---------- sons\n"+sounds+"\n\n"
    s=s[:i]+H+s[j:]
    open(out+'/board.js','w').write(s)
    h=open(out+'/index.html').read()
    import re
    h=re.sub(r"for\(const k of\[[^\]]*\]\)IM\[k\]","for(const k of"+repr(imgs).replace(' ','')+")IM[k]",h)
    h=h.replace("[['hook',67]]","(window.CLIPLIST||[])").replace("[['hook',70]]","(window.CLIPLIST||[])")
    if 'clips.js' not in h:h=h.replace('<script src="segs.js"></script>','<script src="clips.js"></script>\n<script src="segs.js"></script>')
    open(out+'/index.html','w').write(h)
    import os
    cl=[[d,len(os.listdir(out+'/clips/'+d))] for d in sorted(os.listdir(out+'/clips'))]
    open(out+'/clips.js','w').write('window.CLIPLIST='+repr(cl).replace("'",'"')+';\n')
