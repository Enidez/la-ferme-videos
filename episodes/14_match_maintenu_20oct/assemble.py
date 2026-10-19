# « MATCH MAINTENU. » : narration Paul French (eleven v3), accroche écran coupé en deux.
import wave, numpy as np, json
SR = 44100
def load(p):
    w = wave.open(p); assert w.getframerate() == SR and w.getnchannels() == 1, p
    return np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
NB = ' '
L = load('vo/narr.wav'); LS = json.load(open('vo/narr_segs.json'))
TX = ["Lundi soir, à Paris :", "manifestations interdites.", "Couvre-feu,", "de République aux Halles.", "Mardi soir, au Parc des Princes :",
 f"40{NB}000 personnes.", "PSG –", "Barça.", "Match… maintenu.", "Le ministre de l'Intérieur est formel :", "« la question ne se pose pas ».",
 "En 2018, en pleine crise des Gilets jaunes, la préfecture faisait l'inverse.", "Elle reportait PSG –", "Montpellier…", "pour garder ses policiers pour les manifs.",
 "Huit ans plus tard :", "on interdit les manifs…", "et on garde le match.", f"Samedi, près de 1{NB}000 policiers et gendarmes blessés.",
 "Le ministre parle lui-même de « perte de contrôle ».", "Et ce match n'est même pas classé « à hauts risques ».",
 "La dernière fois qu'un grand match a dérapé à Paris,", "c'était au Stade de France, en 2022.", "Le Sénat a conclu :",
 "« Cet échec tient aux décisions prises par la préfecture de police. »", "Le propriétaire du PSG ?", "Le Qatar.", "Et cette semaine,", "où est le président ?",
 "En tournée dans le Golfe.", "Dernière étape…", "le Qatar.", "Officiellement,", "il y va pour l'énergie.", "Mais depuis mars, le gaz du Qatar est presque à l'arrêt.",
 "Une frappe de drones sur son grand site gazier.", "Et samedi,", "pourquoi tous ces gens étaient dans la rue ?", "Pour la vie chère.", f"Le gazole à 2,36{NB}€.",
 "Alors,", "est-ce que le match est maintenu pour faire plaisir au Qatar ?", "Aucune preuve.", "Personne ne l'a dit.", "On ne va pas l'inventer.",
 "Manifs interdites.", "Couvre-feu.", "Policiers épuisés.", f"Et 40{NB}000 personnes au Parc.", "Le même État.", "La même semaine. Deux mesures.",
 "Tu regardes le match, toi ?", "Dis-le en commentaire. Et abonne-toi :", "on continue de compter."]
assert len(TX) == len(LS), (len(TX), len(LS))
QUOTES = {10, 19, 24}
def fade(x, n=300):
    x = x.copy(); n = min(n, len(x) // 2); r = np.linspace(0, 1, n); x[:n] *= r; x[-n:] *= r[::-1]; return x
LEAD = .15
out = [np.zeros(int(LEAD * SR), np.float32)]; t = LEAD; SEGS = []
def gap(d):
    global t; out.append(np.zeros(int(d * SR), np.float32)); t += d
def narr(i0, i1):
    global t
    a = max(0, LS[i0][0] - .06); b = min(len(L) / SR, LS[i1][1] + .12)
    for k in range(i0, i1 + 1):
        d = dict(t0=round(t + LS[k][0] - a, 2), t1=round(t + LS[k][1] - a, 2), txt=TX[k], id='n%d' % k)
        if k in QUOTES: d['m'] = 1
        SEGS.append(d)
    out.append(fade(L[int(a * SR):int(b * SR)])); t += b - a
narr(0, 8)
MARK = {'frz': round(LEAD + 11.92, 2)}
gap(1.1); narr(9, 41); gap(.3); narr(42, 44); gap(.3); narr(45, 50); gap(.8); narr(51, 53)
MARK['tcov'] = round(MARK['frz'] + 1.25, 2)
y = np.clip(np.concatenate(out), -1, 1)
w = wave.open('proj/audio/vo.wav', 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((y * 32767).astype(np.int16).tobytes()); w.close()
ID = {s['id']: i for i, s in enumerate(SEGS)}
open('proj/segs.js', 'w').write('const SEGS=' + json.dumps(SEGS, ensure_ascii=False) + ';\nconst MARK=' + json.dumps(MARK) + ';\nconst ID=' + json.dumps(ID) + ';\n')
print('total', round(t, 2), MARK)
for s in SEGS: print(s['id'], s['t0'], s['t1'], s['txt'])
