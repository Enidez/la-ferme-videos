"""Studio musique La Ferme — essai « bloom » (30 s) : une note qui s'ouvre en 11 voix, progression doux-amère en do mineur.
Compose (conduite des voix automatique), synthétise le son (nappe + piano + réverbération) et écrit data.js pour la visualisation.
Usage : venv/bin/python studio_musique/bloom/compose.py   → bloom.wav + data.js"""
import json, os, subprocess, numpy as np
H = os.path.dirname(os.path.abspath(__file__)); SR = 48000; NV = 11
NOTE = {'C': 0, 'Db': 1, 'D': 2, 'Eb': 3, 'E': 4, 'F': 5, 'Gb': 6, 'G': 7, 'Ab': 8, 'A': 9, 'Bb': 10, 'B': 11}
# (nom affiché, chiffrage, fondamentale, intervalles depuis la fondamentale, durée en s)
PROG = [('C', 'm(add9)', 'i(add9)', 'C', [0, 3, 7, 14], 4.2),
        ('A♭', 'maj9', '♭VImaj9', 'Ab', [0, 4, 7, 11, 14], 3.6),
        ('F', 'm11', 'iv11', 'F', [0, 3, 7, 10, 14, 17], 3.6),
        ('D♭', 'maj7(♯11)', '♭IImaj7(♯11)', 'Db', [0, 4, 7, 11, 18], 4.2),
        ('E♭', 'maj9', '♭IIImaj9', 'Eb', [0, 4, 7, 11, 14], 3.6),
        ('G', 'sus4(♭9)', 'Vsus4(♭9)', 'G', [0, 5, 7, 13], 3.6),
        ('C', 'm(add9)', 'i(add9)', 'C', [0, 3, 7, 14], 7.2)]
BLOOM = 1.6   # la note seule (do) avant l'ouverture
LO, HI = 47, 86   # mi2 → do6 pour les voix ; basse séparée
def candidates(pcs, lo, hi): return [m for m in range(lo, hi + 1) if m % 12 in pcs]
def voice(prev, root, ivs):
    pcs = {(NOTE[root] + i) % 12 for i in ivs}; rootpc = NOTE[root]
    bass = min([m for m in range(28, 44) if m % 12 == rootpc], key=lambda m: abs(m - prev[0]))   # basse = fondamentale, proche de la précédente
    from scipy.optimize import linear_sum_assignment
    up = sorted(prev[1:]); cand = candidates(pcs, LO, HI); bonus = {}
    for _ in range(6):   # affectation optimale : une note distincte par voix, mouvement total minimal, toutes les notes de l'accord présentes
        C = np.array([[abs(m - p) - bonus.get(m % 12, 0) for m in cand] for p in up], float)
        r, c = linear_sum_assignment(C); out = [cand[j] for j in c]
        miss = pcs - {m % 12 for m in out}
        if not miss: break
        for pc in miss: bonus[pc] = bonus.get(pc, 0) + 4
    return [bass] + sorted(out)
# accords et voix
t = BLOOM; chords = []; cur = [36] + [60] * (NV - 1)   # tout part d'un do
start = [48, 51, 55, 58, 60, 62, 63, 67, 70, 74, 75]   # premier voicing de do mineur (add9), écrit à la main
for i, (nm, q, rn, root, ivs, d) in enumerate(PROG):
    v = start if i == 0 else voice(cur, root, ivs)
    chords.append(dict(t0=round(t, 3), t1=round(t + d, 3), name=nm, q=q, rn=rn, notes=v)); cur = v; t += d
DUR = t + 0.4
# ---------- synthèse
n = int(DUR * SR); L = np.zeros(n); R = np.zeros(n); tt = np.arange(n) / SR
def pitch_track(k):
    """fréquence de la voix k dans le temps, avec glissé de 0,35 s entre accords (et éclosion depuis le do)"""
    m = np.full(n, 60.0 if k else 36.0)
    for i, c in enumerate(chords):
        a = int(c['t0'] * SR); g = int((0.9 if i == 0 else 0.35) * SR); prev = m[a - 1] if a > 0 else m[0]
        tgt = c['notes'][k]; ramp = np.linspace(0, 1, g); ramp = ramp * ramp * (3 - 2 * ramp)
        m[a:a + g] = prev + (tgt - prev) * ramp[:len(m[a:a + g])]; m[a + g:] = tgt
    return 440 * 2 ** ((m - 69) / 12), m
VOICES = []
for k in range(NV):
    f, m = pitch_track(k); ph = 2 * np.pi * np.cumsum(f) / SR
    # nappe : trois dents de scie légèrement désaccordées, adoucies (filtre passe-bas simple), + sinus
    saw = lambda p: 2 * ((p / (2 * np.pi)) % 1) - 1
    pad = (saw(ph) + saw(ph * 1.004) + saw(ph * 0.996)) / 3
    a = 0.06; y = np.zeros(n); acc = 0.
    from scipy.signal import lfilter
    y = lfilter([a], [1, a - 1], pad); y = lfilter([a], [1, a - 1], y) * 3 + np.sin(ph) * .5
    env = np.clip(tt / 0.8, 0, 1) if k == 0 else np.clip((tt - BLOOM + .3) / 1.4, 0, 1)   # la basse d'abord seule, puis l'éclosion
    env *= np.clip((DUR - .2 - tt) / 3.5, 0, 1)
    gain = (0.55 if k == 0 else 0.22 * (1 - .4 * (m[-1] - 48) / 36))
    pan = (k / (NV - 1)) * 2 - 1 if k else 0
    L += y * env * gain * (1 - .35 * pan); R += y * env * gain * (1 + .35 * pan); VOICES.append(m)
# piano léger à chaque accord (partiels qui s'éteignent), arpégé de bas en haut
for i, c in enumerate(chords):
    for j, note in enumerate(c['notes'][1:]):
        t0 = c['t0'] + .05 + j * .045; a = int(t0 * SR); d = min(int(3.5 * SR), n - a)
        if d <= 0: continue
        f0 = 440 * 2 ** ((note - 69) / 12); x = np.arange(d) / SR
        s = sum(np.sin(2 * np.pi * f0 * h * x) / h ** 1.6 * np.exp(-x * (1.4 + h * .9)) for h in range(1, 7)) * np.minimum(1, x / .004)
        p = (j / 10) * 2 - 1; g = .10
        L[a:a + d] += s * g * (1 - .3 * p); R[a:a + d] += s * g * (1 + .3 * p)
# réverbération : réponse impulsionnelle synthétique (bruit qui décroît en 3 s)
r = np.random.default_rng(7); ir_n = int(3.2 * SR); ir = r.standard_normal((ir_n, 2)) * np.exp(-np.arange(ir_n) / SR / .9)[:, None]
from scipy.signal import fftconvolve
wetL = fftconvolve(L, ir[:, 0])[:n]; wetR = fftconvolve(R, ir[:, 1])[:n]
out = np.stack([L * .75 + wetL * .010, R * .75 + wetR * .010], 1)
out /= np.abs(out).max() / .85
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f64le', '-ar', str(SR), '-ac', '2', '-i', '-', '-af', 'loudnorm=I=-16:TP=-1.5', '-ar', str(SR), os.path.join(H, 'bloom.wav')], input=out.astype(np.float64).tobytes(), check=True)
# ---------- données pour la visualisation (hauteur de chaque voix, 30 points par seconde)
step = SR // 30
json.dump = json.dump
open(os.path.join(H, 'data.js'), 'w').write('const DUR=%.2f,BLOOM=%.2f;\nconst CHORDS=%s;\nconst VO=%s;\n' % (DUR, BLOOM, json.dumps(chords, ensure_ascii=False), json.dumps([[round(float(v), 2) for v in m[::step]] for m in VOICES])))
for c in chords: print(f"{c['t0']:5.1f}s  {c['name']}{c['q']:12s} {c['notes']}")
print('durée', round(DUR, 1))
