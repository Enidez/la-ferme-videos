# Arrivées d'avions militaires français (hex 3A8000-3BFFFF) sur les bases et aéroports d'Île-de-France et alentours,
# d'après les heatmaps ADS-B Exchange (une position / 10 s). Usage : python3 adsb_paris.py AAAA MM J1 J2 sortie.json
import numpy as np, subprocess, os, json, math, sys
Y, MO, D1, D2, OUT = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4]), sys.argv[5]
BASES = {'Villacoublay': (48.774, 2.201), 'Évreux': (49.029, 1.220), 'Creil': (49.254, 2.519), 'Orléans-Bricy': (47.987, 1.761),
         'Le Bourget': (48.969, 2.441), 'Orly': (48.723, 2.379), 'Roissy': (49.010, 2.548)}
res = []
for day in range(D1, D2 + 1):
    for slot in range(48):
        f = f'/tmp/hp_{day}_{slot}.bin'
        r = subprocess.run(['curl', '-sS', '--max-time', '60', '-A', 'Mozilla/5.0', '-H', 'Referer: https://globe.adsbexchange.com/', '-o', f, '-w', '%{http_code}',
                            f'https://globe.adsbexchange.com/globe_history/{Y}/{MO}/{day:02d}/heatmap/{slot:02d}.bin.ttf'], capture_output=True, text=True)
        if r.stdout != '200':
            if os.path.exists(f): os.remove(f)
            continue
        b = open(f, 'rb').read(); os.remove(f)
        p = np.frombuffer(b[:len(b) // 16 * 16], dtype='<i4').reshape(-1, 4)
        mk = p[:, 0] == 0xe7f7c9d; idx = np.where(mk)[0]
        tms = (p[idx, 1].astype(np.int64) << 32) + (p[idx, 2].astype(np.int64) & 0xffffffff)
        hx = p[:, 0] & 0xffffff
        cs = (~mk) & (p[:, 1] > 1073741824)
        mil = (~mk) & (hx >= 0x3a8000) & (hx <= 0x3bffff)
        calls = {}
        for row in p[cs & mil]:
            c = row.tobytes()[8:16].split(b'\0')[0].decode('ascii', 'ignore').strip()
            if c: calls[int(row[0]) & 0xffffff] = c
        sel = np.where(mil & ~cs & (np.abs(p[:, 1]) <= 90_000_000))[0]
        for i in sel:
            la, lo = p[i, 1] / 1e6, p[i, 2] / 1e6
            alt = int(p[i, 3]) & 65535
            if alt & 32768: alt -= 65536
            alt = 0 if alt == -123 else alt * 25
            if alt > 3000: continue
            for n, (bl, bo) in BASES.items():
                if math.hypot((la - bl) * 111, (lo - bo) * 73) < 12:
                    k = np.searchsorted(idx, i) - 1
                    res.append([int(tms[k]) if k >= 0 else 0, f'{int(hx[i]):06x}', calls.get(int(hx[i]), ''), n, alt]); break
    print('jour', day, len(res), flush=True)
json.dump(res, open(OUT, 'w'))
