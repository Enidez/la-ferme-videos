# « LE PLAN · JOUR 1 » : accroche Nuñez (France Inter) + narration Liam + extrait Macron (allocution TF1).
import wave, numpy as np, json
SR = 44100
def load(p):
    w = wave.open(p); assert w.getframerate() == SR and w.getnchannels() == 1, p
    return np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
NB = ' '
L = load('vo/narr.wav'); LS = json.load(open('vo/narr_segs.json'))
TX = ["Refusée.", "Ce matin, l'Élysée garde son ministre. Motif officiel :", "« un commandement continu des forces de l'ordre ».", "Et sa nouvelle mission ?",
 "Une nouvelle doctrine…", "« face aux casseurs ».", "Jour 1 du plan. On avait promis de compter.", "On compte.", "Étape 1 : l'ennemi.",
 "Le Premier ministre accuse La France insoumise.", "Le RN accuse le gouvernement.", "Personne…", "n'accuse les prix.", "Étape 2 :", "interdire.", "Marseille.",
 "Ce matin, la préfecture interdit tout rassemblement.", "Sur toute la ville.", "Moins de 24 heures après l'allocution.", "Interdire une manif,", "c'est légal en France…",
 "à condition que ce soit nécessaire", "et proportionné.", "Une ville entière, d'un coup ?", "C'est à un juge de trancher.", "Étape 3 :", "punir.",
 "Premiers procès en comparution immédiate.", "Paris.", "Nice.", "Tours.", "Saint-Étienne.", "Étape 4…", "ton porte-monnaie.", "Hier soir, il promettait :",
 "Promesse tenue.", "Le voilà au Koweït.", "Tapis rouge.", "Résultat : des accords.", "La défense.", "L'intelligence artificielle.", "Des avions Airbus.",
 "Et le carburant ?", "Des stocks de diesel…", "pour La Réunion", "et Mayotte.", "Pendant ce temps, en métropole :", "près de 600 stations à sec.",
 f"Le gazole à 2,36{NB}€.", "Un spécialiste de l'énergie n'attend aucun effet sur les prix.", "Alors, le compteur.", "Jour 1.", "Manifestations interdites :",
 "une ville entière.", "Ministre démissionnaire :", "un…", "retenu.", "Mesures pour ton plein :", "zéro.", "Jour 2, demain.", "Abonne-toi : on compte ensemble.",
 "Et dis-moi en commentaire :", "chez toi,", "la station est encore ouverte ?"]
assert len(TX) == len(LS), (len(TX), len(LS))
nz = load('vo/nunez.wav'); mac = load('vo/mac.wav')
def fade(x, n=300):
    x = x.copy(); n = min(n, len(x) // 2); r = np.linspace(0, 1, n); x[:n] *= r; x[-n:] *= r[::-1]; return x
def rms(x):
    y = x[np.abs(x) > .01]; return np.sqrt(np.mean(y ** 2)) if len(y) else 1
g = rms(L) / rms(nz) * .85; gm = rms(L) / rms(mac) * .85
FRZ = round(len(nz) / SR + .05, 2)
NSTART = FRZ + .1
out = [fade(nz) * g, np.zeros(int((NSTART - len(nz) / SR) * SR), np.float32)]; t = NSTART; SEGS = []
MARK = {'nz': [0, round(len(nz) / SR, 2)], 'frz': FRZ}
def gap(d):
    global t; out.append(np.zeros(int(d * SR), np.float32)); t += d
def narr(i0, i1):
    global t
    a = max(0, LS[i0][0] - .06); b = min(len(L) / SR, LS[i1][1] + .12)
    for k in range(i0, i1 + 1):
        SEGS.append(dict(t0=round(t + LS[k][0] - a, 2), t1=round(t + LS[k][1] - a, 2), txt=TX[k], id='n%d' % k))
    out.append(fade(L[int(a * SR):int(b * SR)])); t += b - a
dem = load('vo/dem.wav'); SEGS.append(dict(t0=round(t, 2), t1=round(t + len(dem) / SR, 2), txt='Démission… refusée.', id='n0')); out.append(fade(dem)); t += len(dem) / SR; gap(.35)
narr(1, 34); gap(.3)
MARK['mac'] = [round(t, 2), round(t + len(mac) / SR, 2)]
SEGS.append(dict(t0=round(t, 2), t1=round(t + len(mac) / SR, 2), txt="« Je poursuivrai ces actions dès demain matin en allant dans les pays du Golfe. »", m=1, id='mac'))
out.append(fade(mac) * gm); t += len(mac) / SR; gap(.35)
narr(35, len(LS) - 1)
MARK['tcov'] = round(FRZ + 2.3, 2)
y = np.clip(np.concatenate(out), -1, 1)
w = wave.open('proj/audio/vo.wav', 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((y * 32767).astype(np.int16).tobytes()); w.close()
ID = {s['id']: i for i, s in enumerate(SEGS)}
open('proj/segs.js', 'w').write('const SEGS=' + json.dumps(SEGS, ensure_ascii=False) + ';\nconst MARK=' + json.dumps(MARK) + ';\nconst ID=' + json.dumps(ID) + ';\n')
print('total', round(t, 2), MARK)
for s in SEGS[:8]: print(s['id'], s['t0'], s['txt'])
