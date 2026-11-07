"""Assemble la piste voix complète de l'ép. 28 (narration Liam + vraies voix + silences).
Usage : venv/bin/python episodes/28_aaron_swartz/assemble.py <dossier_media_scratch>
Sorties : audio/vo_complete.wav (48 kHz mono) et audio/timeline.json (début/fin de chaque élément).
Les extraits du documentaire et du discours SOPA viennent des copies de travail (clips/ et le dossier media)."""
import numpy as np, subprocess, json, sys, os
H = os.path.dirname(os.path.abspath(__file__)); R = os.path.join(H, '..', '..')
SR = 48000
V = os.path.join(H, 'audio', 'voix'); I = os.path.join(R, 'veille', 'vasseur', 'interview_vasseur_2019.mp3')
C = os.path.join(H, 'clips'); MEDIA = sys.argv[1] if len(sys.argv) > 1 else ''

def load(f, a=None, b=None):
    cmd = ['ffmpeg', '-v', 'error']
    if a is not None: cmd += ['-ss', str(a)]
    if b is not None: cmd += ['-to', str(b)]
    cmd += ['-i', f, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-']
    x = np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32).copy()
    n = int(0.012 * SR)  # micro-fondus pour éviter les clics
    if len(x) > 2 * n: x[:n] *= np.linspace(0, 1, n); x[-n:] *= np.linspace(1, 0, n)
    return x

def level(x):  # RMS des passages parlés (fenêtres de 50 ms au-dessus de -40 dBFS)
    w = int(0.05 * SR); f = x[:len(x) // w * w].reshape(-1, w); r = np.sqrt((f ** 2).mean(1))
    r = r[r > 0.01]; return float(np.sqrt((r ** 2).mean())) if len(r) else 1e-3

# (étiquette, type, source, début, fin, silence après)
N = lambda k: os.path.join(V, k)
PLAN = [
 ('A1 Aaron « couldn\'t let that happen »', 'vraie', os.path.join(C, 'A1_sopa_couldnt_let_that_happen.mp4'), None, None, 1.3),
 ('0a narration', 'nar', N('0_accroche.mp3'), 0, 10.95, .5),
 ('V5 Vasseur « persuadée »', 'vraie', I, 563.4, 579.5, .7),
 ('0b narration', 'nar', N('0_accroche.mp3'), 11.1, None, 1.2),
 ('1a narration', 'nar', N('1_enfant.mp3'), 0, 10.45, .5),
 ('V1 Vasseur « le clavier »', 'vraie', I, 112.6, 129.1, .8),
 ('1b narration', 'nar', N('1_enfant.mp3'), 10.5, None, .5),
 ('V2 Vasseur « petit corps »', 'vraie', I, 79.35, 87.3, 1.0),
 ('2a narration', 'nar', N('2_fissure.mp3'), 0, 4.75, .5),
 ('V3 Vasseur « il se politise »', 'vraie', I, 242.6, 258.3, .6),
 ('2b narration', 'nar', N('2_fissure.mp3'), 4.8, None, 1.0),
 ('3a narration', 'nar', N('3_combat.mp3'), 0, 26.8, .5),
 ('V4 Vasseur « 21 ans, idéaliste »', 'vraie', I, 512.3, 522.0, .6),
 ('3b narration', 'nar', N('3_combat.mp3'), 26.85, None, 1.0),
 ('4a narration', 'nar', N('4_placard.mp3'), 0, 33.75, .5),
 ('V7 Vasseur « faire un exemple »', 'vraie', I, 667.4, 687.2, .6),
 ('4b narration', 'nar', N('4_placard.mp3'), 33.8, None, 1.0),
 ('5a narration', 'nar', N('5_machine.mp3'), 0, 46.9, .4),
 ('A2 Aaron « There\'s a battle going on »', 'vraie', os.path.join(MEDIA, 'sopa_f2c2012.mp4'), 253.3, 257.4, .5),
 ('5b narration', 'nar', N('5_machine.mp3'), 46.95, None, 1.4),
 ('6a narration', 'nar', N('6_onze_janvier.mp3'), 0, 28.85, 1.0),
 ('T3 Eckersley « le monde s\'est effondré »', 'vraie', os.path.join(C, 'T3_eckersley_world_fell_apart.mp4'), None, None, .6),
 ('T1 Lessig « les docteurs »', 'vraie', os.path.join(C, 'T1_lessig_mon_fils_docteurs.mp4'), None, None, .5),
 ('T2 Lessig « il faisait partie de moi »', 'vraie', os.path.join(C, 'T2_lessig_part_of_me.mp4'), None, None, 1.2),
 ('PÈRE (texte à l\'écran, silence)', 'silence', None, None, None, 3.5),
 ('6b narration', 'nar', N('6_onze_janvier.mp3'), 29.0, None, .7),
 ('V6 Vasseur « pire qu\'un complot »', 'vraie', I, 579.0, 604.0, 1.6),
 ('7a narration', 'nar', N('7_ce_quil_reste.mp3'), 0, 35.6, .8),
 ('V5r Vasseur « tant d\'intelligence »', 'vraie', I, 572.2, 575.0, 1.2),
 ('7b narration', 'nar', N('7_ce_quil_reste.mp3'), 35.7, None, 0),
]

parts = []
for lab, kind, src, a, b, pause in PLAN:
    x = np.zeros(0, np.float32) if kind == 'silence' else load(src, a, b)
    parts.append([lab, kind, x, pause])
ref = np.median([level(p[2]) for p in parts if p[1] == 'nar'])
out, tl, t = [], [], 0.0
for lab, kind, x, pause in parts:
    if kind == 'vraie': x = x * (ref / level(x)) * 0.95  # vraies voix égalisées sur la narration
    out.append(x); tl.append({'id': lab, 'type': kind, 't0': round(t, 2), 't1': round(t + len(x) / SR, 2)})
    t += len(x) / SR
    out.append(np.zeros(int(pause * SR), np.float32)); t += pause
y = np.concatenate(out); y = y / max(1.0, np.abs(y).max() / 0.89)
os.makedirs(os.path.join(H, 'audio'), exist_ok=True)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-', os.path.join(H, 'audio', 'vo_complete.wav')], input=y.tobytes(), check=True)
json.dump(tl, open(os.path.join(H, 'audio', 'timeline.json'), 'w'), ensure_ascii=False, indent=1)
print(f'durée {t/60:.0f} min {t%60:04.1f} s')
for e in tl: print(f"{e['t0']:7.1f} {e['t1']:7.1f}  {e['id']}")
