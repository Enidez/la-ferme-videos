# J+1 ép.1 « Panne géante » : voix Liam (prise unique), resserrée (silences 0,22 s, atempo 1.08) -> audio/vo.wav + segs.js
import re,json,os,shutil
LS=[[float(a),float(b)] for a,b in re.findall(r'\(([\d.]+),([\d.]+),',open('vo/narr_tr.txt').read())]
TX=["Si toute la France perd le courant,","surtout ne file pas au supermarché.","Ce n'est pas de la science-fiction.","Le 28 avril 2025,","l'Espagne et le Portugal","se sont éteints d'un coup.",
"Il a fallu près de 18 heures","pour tout rallumer.","Premier réflexe de tout le monde :","le magasin.","Sauf que sans courant,","plus de caisse,","plus de carte bancaire.",
"Sam fait l'inverse :","il remplit la baignoire et toutes les bouteilles.","Parce que l'eau arrive grâce à des pompes. Les réservoirs tiennent souvent 12 à 24 heures.","Dans certains quartiers,","quelques minutes.",
"Le téléphone.","Les antennes ont des batteries de secours :","20 minutes à peine, selon Orange.","Plus de réseau.","Sam ressort la radio à piles.","Le frigo.","Fermé,","il garde le froid environ 4 heures.",
"Un congélateur plein :","jusqu'à deux jours.","Alors Sam n'ouvre rien,","et mange d'abord ce qui craint.","La nuit tombe.","Toute la ville est noire.","Sur le papier,","Sam peut tenir trois jours.",
"Seul problème…","quelqu'un frappe à sa porte.","Dans la partie 2,","on t'explique comment survivre","aux trois jours suivants.","Abonne-toi à J+1 !"]
assert len(TX)==len(LS),(len(TX),len(LS))
D=.4  # la voix démarre à 0,4 s
os.makedirs('audio',exist_ok=True)
os.system(f"ffmpeg -v error -y -i vo/narr.wav -af adelay={int(D*1000)} -ar 44100 audio/vo.wav")
S=[dict(t0=round(a+D,2),t1=round(b+D,2),txt=TX[i],id='n%d'%i) for i,(a,b) in enumerate(LS)]
for i in (34,35):S[i]['m']=1
ID={s['id']:i for i,s in enumerate(S)}
open('segs.js','w').write('const SEGS='+json.dumps(S,ensure_ascii=False)+';\nconst ID='+json.dumps(ID)+';\n')
print('fin voix',S[-1]['t1'])
