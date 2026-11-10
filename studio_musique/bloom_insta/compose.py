"""Studio musique La Ferme — « bloom » avec les notes exactes de la vidéo Instagram envoyée (One note blooms into 11 voices).
Les notes ont été relevées touche par touche sur le clavier lumineux de la vidéo (10 images/s), l'octave vérifiée sur le son.
Progression : C → D♭maj7 → B♭m9 → B♭m(add9) → C → D♭maj9 → B♭m11 → B♭m(add9) → C → D♭maj9 → B♭m9 → B♭m(add9) → C → D♭maj7(♯11) → B♭m9 → C
Une pédale de do aigu (do6) tient d'un bout à l'autre, comme dans la vidéo.
Usage : venv/bin/python studio_musique/bloom_insta/compose.py → bloom_insta.wav, bloom_insta.mp3, projet.json (pour l'éditeur)"""
import json, os, subprocess, numpy as np
from scipy.optimize import linear_sum_assignment
from scipy.signal import lfilter, fftconvolve
H = os.path.dirname(os.path.abspath(__file__)); SR = 48000; NV = 11
NN = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
def m(s):  # 'Db4' → 61
    n, o = s[:-1], int(s[-1]); return NN.index(n) + 12 * (o + 1)
OFF = 1.0   # une seconde de note seule avant l'éclosion (la vidéo commence pendant l'éclosion)
# (temps dans la vidéo, accord affiché, notes relevées sur le clavier ; do6 ajouté partout = pédale aiguë cachée derrière une icône)
STATES = [
    (0.0, 'C', 'C2 C3 G3 C4 E4 G4 C5'),
    (2.4, 'D♭maj7', 'Db2 Db3 Ab3 Db4 F4 Ab4 C5'),
    (4.7, 'B♭m9', 'Bb1 Bb2 Ab3 Db4 F4 Ab4 C5'),
    (6.0, 'B♭m(add9)', 'Bb1 Bb2 F3 Bb3 Db4 F4 Bb4 C5'),
    (7.9, 'C', 'C2 C3 G3 C4 E4 G4 C5'),
    (9.6, 'D♭maj9', 'Db2 Db3 Ab3 Db4 F4 Ab4 C5 Eb5'),
    (12.0, 'B♭m11', 'Bb1 Bb2 Ab3 Db4 F4 Ab4 C5 Eb5'),
    (13.6, 'B♭m(add9)', 'Bb1 Bb2 F3 Bb3 Db4 F4 Bb4 C5'),
    (14.8, None, 'Bb1 Bb2 F3 Bb3 Db4 F4 Ab4 C5 F5'),
    (15.6, 'C', 'C2 C3 C4 E4 G4 C5 E5'),
    (17.2, 'D♭maj9', 'Db2 Db3 C4 Db4 F4 Ab4 C5 F5'),
    (18.7, None, 'Db2 Db3 Bb3 Db4 F4 Ab4 C5 F5'),
    (19.4, 'B♭m9', 'Bb1 Bb2 Bb3 Db4 F4 Ab4 C5 Db5 F5'),
    (21.1, 'B♭m(add9)', 'Bb1 Bb2 F3 Bb3 Db4 F4 Bb4 C5 Db5 F5'),
    (22.2, None, 'Bb1 Bb2 F3 Bb3 Db4 F4 Ab4 C5 Db5 F5'),
    (22.9, 'C', 'C2 C3 G3 C4 E4 G4 C5 E5'),
    (24.4, 'D♭maj7(♯11)', 'Db2 Db3 Ab3 C4 Db4 F4 Ab4 C5 F5 G5'),
    (25.6, None, 'Db2 Db3 Ab3 Bb3 Db4 F4 Ab4 C5 F5'),
    (26.8, 'B♭m9', 'Bb1 Bb2 Ab3 Db4 F4 Ab4 C5 Db5 F5'),
    (29.6, 'C', 'C2 C3 G3 C4 E4 G4 C5 E5'),   # la vidéo s'arrête ici : on résout sur do, comme à chaque tour
]
END = 29.6 + OFF + 6.0
def assign(prev, notes):
    """11 voix → notes de l'accord : chaque note tenue par au moins une voix, doublures là où ça bouge le moins.
    La voix 0 reste la basse (note la plus grave), la voix 10 la pédale do6."""
    up = prev[1:-1]; cand = notes[1:]
    cols = [(n, -1000) for n in cand] + [(n, 2.5 * (r + 1)) for n in cand for r in range(NV)]   # chaque doublure de plus coûte un peu : on varie les notes doublées
    C = np.array([[abs(n - p) + b for n, b in cols] for p in up], float)
    r, c = linear_sum_assignment(C); out = [cols[j][0] for j in c]
    return [notes[0]] + sorted(out) + [84]
voices = [[(0.0, 36)] + [(0.0, 60)] * (NV - 2) + [(0.0, 60)]]
cur = [36] + [60] * (NV - 1); track = []
chords = []
for t, name, s in STATES:
    notes = sorted(m(x) for x in s.split())
    v = assign(cur, notes); track.append((t + OFF, v)); cur = v
    if name: chords.append(dict(t=round(t + OFF, 2), nom=name))
# points par voix (format de l'éditeur : [temps, note midi]) — on ne garde que les changements
pts = [[[0.0, 36 if k == 0 else 60]] for k in range(NV)]
for t, v in track:
    for k in range(NV):
        if pts[k][-1][1] != v[k]: pts[k].append([round(t, 2), v[k]])
GL = 0.35; BLOOM_GL = 1.0
# ---------- synthèse (même son que l'essai bloom : nappe douce + piano léger + réverbération)
n = int(END * SR); tt = np.arange(n) / SR; L = np.zeros(n); R = np.zeros(n)
def pitch(k):
    mm = np.full(n, float(pts[k][0][1]))
    for i, (t, note) in enumerate(pts[k][1:]):
        a = int(t * SR); g = int((BLOOM_GL if t <= OFF + .01 else GL) * SR); prev = mm[a - 1]
        ramp = np.linspace(0, 1, g); ramp = ramp * ramp * (3 - 2 * ramp)
        seg = mm[a:a + g]; mm[a:a + g] = prev + (note - prev) * ramp[:len(seg)]; mm[a + g:] = note
    return mm
saw = lambda p: 2 * ((p / (2 * np.pi)) % 1) - 1
for k in range(NV):
    mm = pitch(k); f = 440 * 2 ** ((mm - 69) / 12); ph = 2 * np.pi * np.cumsum(f) / SR
    pad = (saw(ph) + saw(ph * 1.004) + saw(ph * 0.996)) / 3
    y = lfilter([.06], [1, -.94], pad); y = lfilter([.06], [1, -.94], y) * 3 + np.sin(ph) * .5
    env = np.clip(tt / .8, 0, 1) * np.clip((END - .2 - tt) / 4, 0, 1)
    gain = 0.5 if k == 0 else (0.13 if k == NV - 1 else 0.2 * (1 - .4 * (np.median(mm) - 48) / 36))
    pan = 0 if k == 0 else (k / (NV - 1)) * 2 - 1
    L += y * env * gain * (1 - .35 * pan); R += y * env * gain * (1 + .35 * pan)
# piano : un accord arpégé à chaque nouvel accord affiché
for c in chords:
    v = dict(track)[c['t']] if c['t'] in dict(track) else None
    if v is None: continue
    for j, note in enumerate(sorted(set(v[1:]))):
        t0 = c['t'] + .05 + j * .045; a = int(t0 * SR); d = min(int(3.5 * SR), n - a)
        if d <= 0: continue
        f0 = 440 * 2 ** ((note - 69) / 12); x = np.arange(d) / SR
        s = sum(np.sin(2 * np.pi * f0 * h * x) / h ** 1.6 * np.exp(-x * (1.4 + h * .9)) for h in range(1, 7)) * np.minimum(1, x / .004)
        p = (j / 10) * 2 - 1
        L[a:a + d] += s * .09 * (1 - .3 * p); R[a:a + d] += s * .09 * (1 + .3 * p)
rng = np.random.default_rng(7); irn = int(3.2 * SR); ir = rng.standard_normal((irn, 2)) * np.exp(-np.arange(irn) / SR / .9)[:, None]
wl = fftconvolve(L, ir[:, 0])[:n]; wr = fftconvolve(R, ir[:, 1])[:n]
out = np.stack([L * .75 + wl * .010, R * .75 + wr * .010], 1); out /= np.abs(out).max() / .85
wav = os.path.join(H, 'bloom_insta.wav')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', '-', '-af', 'loudnorm=I=-16:TP=-1.5', '-ar', str(SR), wav], input=out.astype(np.float32).tobytes(), check=True)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', wav, '-b:a', '256k', os.path.join(H, 'bloom_insta.mp3')], check=True)
# ---------- projet pour l'éditeur Studio Glissando
HUES = [215, 250, 280, 305, 330, 355, 25, 45, 140, 175, 195]
proj = dict(nom='Bloom — notes de la vidéo', duree=round(END, 1), glisse=GL, grille=0.1, reverb=0.45,
            voix=[dict(nom='Basse' if k == 0 else ('Do aigu (pédale)' if k == NV - 1 else 'Voix %d' % k), hue=HUES[k],
                       timbre='basse' if k == 0 else 'nappe', volume=0.8 if k == 0 else (0.4 if k == NV - 1 else 0.55), muet=False, points=pts[k]) for k in range(NV)],
            accords=chords)
json.dump(proj, open(os.path.join(H, 'projet.json'), 'w'), ensure_ascii=False)
for t, v in track: print(f'{t:5.1f}', ' '.join(NN[x % 12] + str(x // 12 - 1) for x in v))
print('durée', END)
