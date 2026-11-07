"""Construit segs.js (phrases + minutages globaux) pour l'ép. 28 à partir de :
- audio/timeline.json (position de chaque élément dans la piste complète),
- voix.txt (texte exact de la narration, découpé aux « // »),
- les segments de parole détectés dans chaque morceau de narration (silences),
- le texte exact des vraies voix (VRAIES ci-dessous ; anglais → sous-titre français).
Usage : venv/bin/python episodes/28_aaron_swartz/build_segs.py"""
import json, os, re, subprocess, numpy as np
H = os.path.dirname(os.path.abspath(__file__))
TL = json.load(open(os.path.join(H, 'audio', 'timeline.json')))
SR = 16000

def speech_segments(f, a, b):
    cmd = ['ffmpeg', '-v', 'error', '-ss', str(a)] + (['-to', str(b)] if b else []) + ['-i', f, '-ac', '1', '-ar', str(SR), '-f', 's16le', '-']
    x = np.frombuffer(subprocess.run(cmd, capture_output=True).stdout, np.int16).astype(np.float32) / 32768
    e = np.array([np.sqrt(np.mean(x[i:i + 160] ** 2)) for i in range(0, len(x) - 160, 160)])
    thr = max(0.008, np.percentile(e, 25) * 1.6); segs = []; st = None; last = None
    for i, v in enumerate(e > thr):
        if v:
            if st is None: st = i
            last = i
        elif st is not None and i - last > 18: segs.append((st / 100, (last + 1) / 100)); st = None
    if st is not None: segs.append((st / 100, (last + 1) / 100))
    return [s for s in segs if s[1] - s[0] > .12]

# texte de la narration, morceau par morceau, coupé aux « // »
raw = open(os.path.join(H, 'voix.txt')).read()
chunks = {}
for m in re.finditer(r'^=== (\S+) ===\s*\n(.*?)(?=^=== |\Z)', raw, re.S | re.M):
    parts = [[]]
    for l in m.group(2).splitlines():
        if not l.strip() or l.startswith('#'): continue
        if l.startswith('//'): parts.append([]); continue
        parts[-1].append(re.sub(r'\[[^\]]+\]\s*', '', l).strip())
    chunks[m.group(1)] = [p for p in parts if p]

def sentences(lines):  # une ligne peut contenir plusieurs phrases courtes → on garde la ligne (sous-titre lisible)
    out = []
    for l in lines:
        for s in re.split(r'(?<=[.?!…»])\s+(?=[A-ZÀÂÉÈÊÎÔÛ«])', l):
            if s.strip(): out.append(s.strip())
    return out

# vraies voix : texte (sous-titre) et langue
VRAIES = {
 'A1': ("Et j'ai compris ce jour-là… que je ne pouvais pas laisser faire ça.", 'en', 'AARON SWARTZ · 2012'),
 'V5': ("J'ai passé quatre ans d'enquête. J'étais complètement persuadée qu'on l'avait poussé au suicide. Parce que tant d'intelligence, tant de générosité, tant de désintérêt, dans le monde dans lequel on est aujourd'hui… potentiellement, c'est dangereux.", 'fr', 'FLORE VASSEUR'),
 'V1': ("Il passe le clavier à son fils. Et là, tout à coup, la maison se calme. Tout à coup, tout devient silencieux. Et Aaron plonge dans l'écran, et plonge dans le code, à huit ans. Et le code, son père lui disait, ça doit être parfait… un peu comme un poème.", 'fr', 'FLORE VASSEUR'),
 'V2': ("…nourrir ce cerveau fantastique. Il était surdoué, génial… dans un tout petit corps d'enfant.", 'fr', 'FLORE VASSEUR'),
 'V3': ("J'ai parlé avec ses parents. Jusqu'à présent, il est dans le code, dans l'émerveillement de ce que le code peut faire, dans la création pure. C'est un artiste, un esthète. Et là, il se politise.", 'fr', 'FLORE VASSEUR'),
 'V4': ("Il a vingt et un ans, c'est un idéaliste. On est encore dans un monde où on croit qu'on peut utiliser ce genre de mots sans que, des années plus tard, ça vous rattrape.", 'fr', 'FLORE VASSEUR'),
 'V7': ("L'éditeur s'est retiré de la plainte. Mais le gouvernement américain, celui d'Obama, a pris la suite. Il voulait faire un exemple, pour montrer à tous ceux qui avaient des velléités de devenir des Assange… voici le traitement qu'on réserve aux personnes qui osent.", 'fr', 'FLORE VASSEUR'),
 'A2': ("Il y a une bataille en ce moment. Une bataille pour définir tout ce qui se passe sur internet.", 'en', 'AARON SWARTZ · 2012'),
 'T3': ("Le monde entier s'est effondré à ce moment-là. C'était l'une des nuits les plus dures de ma vie.", 'en', 'PETER ECKERSLEY · AMI'),
 'T1': ("J'ai essayé de l'expliquer à mes enfants. Mon fils de trois ans m'a dit que les docteurs allaient le réparer.", 'en', 'LAWRENCE LESSIG'),
 'T2': ("Je ne savais pas qu'il souffrait à ce point… Il faisait partie de moi.", 'en', 'LAWRENCE LESSIG'),
 'V6': ("Et en fait, je crois que c'est pire qu'un complot. Les autorités savaient qu'il était fragile psychologiquement, et ils ont appuyé là où il pouvait passer à l'acte. Aujourd'hui, pour faire taire quelqu'un, on ne l'assassine plus. Aujourd'hui, on lui ruine sa réputation, ou on l'empêche de travailler.", 'fr', 'FLORE VASSEUR'),
 'V5r': ("Tant d'intelligence. Tant de générosité. Tant de désintérêt.", 'fr', 'FLORE VASSEUR'),
}
NARR_SRC = {'0': '0_accroche', '1': '1_enfant', '2': '2_fissure', '3': '3_combat', '4': '4_placard', '5': '5_machine', '6': '6_onze_janvier', '7': '7_ce_quil_reste'}
# bornes des narrations dans leur fichier (mêmes que assemble.py)
CUT = {'0a': (0, 10.95), '0b': (11.1, None), '1a': (0, 10.45), '1b': (10.5, None), '2a': (0, 4.75), '2b': (4.8, None), '3a': (0, 26.8), '3b': (26.85, None),
       '4a': (0, 33.75), '4b': (33.8, None), '5a': (0, 46.9), '5b': (46.95, None), '6a': (0, 28.85), '6b': (29.0, None), '7a': (0, 35.6), '7b': (35.7, None)}

SEGS, MARK = [], {}
for e in TL:
    key = e['id'].split()[0]
    if e['type'] == 'nar':
        ch, part = key[0], key[1]
        name = NARR_SRC[ch]; lines = sentences(chunks[name.upper()][ord(part) - ord('a')])
        a, b = CUT[key]; sp = speech_segments(os.path.join(H, 'audio', 'voix', name + '.mp3'), a, b)
        # répartit les phrases sur la durée parlée, au prorata des caractères, puis aligne sur les débuts de segments
        speech = sum(s[1] - s[0] for s in sp); tot = sum(len(l) for l in lines); acc = 0
        def at(frac):
            target = frac * speech; c = 0
            for s0, s1 in sp:
                if c + (s1 - s0) >= target: return s0 + (target - c)
                c += s1 - s0
            return sp[-1][1]
        starts = []
        for l in lines:
            t = at(acc / tot); near = min(sp, key=lambda s: abs(s[0] - t)); starts.append(near[0] if abs(near[0] - t) < .9 else t); acc += len(l)
        for i in range(1, len(starts)):  # deux phrases au même instant : on répartit au prorata des caractères
            if starts[i] <= starts[i - 1] + .25:
                nxt = starts[i + 1] if i + 1 < len(starts) else sp[-1][1]
                starts[i] = starts[i - 1] + (nxt - starts[i - 1]) * len(lines[i - 1]) / (len(lines[i - 1]) + len(lines[i]))
        for i, l in enumerate(lines):
            t0 = starts[i]; t1 = (starts[i + 1] - .08) if i + 1 < len(lines) else sp[-1][1]
            SEGS.append({'t0': round(e['t0'] + t0, 2), 't1': round(e['t0'] + max(t1, t0 + .4), 2), 'txt': l, 'id': f'n{len(SEGS)}', 'src': key})
    elif e['type'] == 'vraie':
        txt, lang, who = VRAIES[key]
        MARK[key] = [e['t0'], e['t1']]
        SEGS.append({'t0': e['t0'], 't1': e['t1'], 'txt': txt, 'id': key, 'v': 1, 'lang': lang, 'who': who})
    else:
        MARK['PERE'] = [e['t0'], e['t0'] + 3.5]
ID = {s['id']: i for i, s in enumerate(SEGS)}
open(os.path.join(H, 'segs.js'), 'w').write('const SEGS=' + json.dumps(SEGS, ensure_ascii=False) + ';\nconst MARK=' + json.dumps(MARK) + ';\nconst ID=' + json.dumps(ID) + ';\n')
print(len(SEGS), 'segments ; fin', SEGS[-1]['t1'])
for s in SEGS: print(f"{s['t0']:7.2f} {s['t1']:7.2f} {s['id']:5s} {s['txt'][:70]}")
