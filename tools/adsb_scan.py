# Balaye l'historique ADS-B Exchange (heatmaps 30 min) autour d'un point et liste les passages d'avions
import numpy as np, subprocess, os, json, math, sys
LAT, LON, R = 45.10, 2.55, 40.0   # Saint-Projet-de-Salers (approx.), rayon km
out = []
for day in range(14, 23):
    for slot in range(48):
        f = f'h_{day}_{slot}.bin'
        r = subprocess.run(['curl', '-sS', '--max-time', '60', '-A', 'Mozilla/5.0', '-H', 'Referer: https://globe.adsbexchange.com/', '-o', f, '-w', '%{http_code}',
                            f'https://globe.adsbexchange.com/globe_history/2026/10/{day:02d}/heatmap/{slot:02d}.bin.ttf'], capture_output=True, text=True)
        if r.stdout != '200': print('manque', day, slot, r.stdout, flush=True); continue
        b = open(f, 'rb').read(); os.remove(f)
        p = np.frombuffer(b[:len(b) // 16 * 16], dtype='<i4').reshape(-1, 4)
        mk = p[:, 0] == 0xe7f7c9d
        # temps de chaque ligne = dernier marqueur rencontré
        idx = np.where(mk)[0]; tms = (p[idx, 1].astype(np.int64) << 32) + (p[idx, 2].astype(np.int64) & 0xffffffff)
        tline = np.zeros(len(p), dtype=np.int64); seg = np.searchsorted(idx, np.arange(len(p)), side='right') - 1; ok = seg >= 0; tline[ok] = tms[seg[ok]]
        cs = (~mk) & (p[:, 1] > 1073741824)
        calls = {}
        for row in p[cs]:
            c = row.tobytes()[8:16].split(b'\0')[0].decode('ascii', 'ignore').strip()
            if c: calls[int(row[0]) & 0x1ffffff] = c
        pos = (~mk) & (~cs) & (np.abs(p[:, 1]) <= 90_000_000)
        lat = p[:, 1] / 1e6; lon = p[:, 2] / 1e6
        near = pos & (np.abs(lat - LAT) < R / 111) & (np.abs(lon - LON) < R / 78)
        for i in np.where(near)[0]:
            d = math.hypot((lat[i] - LAT) * 111, (lon[i] - LON) * 78.6)
            if d > R: continue
            alt = int(p[i, 3]) & 65535
            if alt & 32768: alt -= 65536
            alt = None if alt == -123 else alt * 25
            hx = int(p[i, 0]) & 0x1ffffff
            out.append([int(tline[i]), f"{hx & 0xffffff:06x}" + ('~' if hx & 0x1000000 else ''), calls.get(hx, ''), round(lat[i], 4), round(lon[i], 4), alt, round(d, 1), (int(p[i, 3]) >> 16) / 10])
    print('jour', day, 'points', len(out), flush=True)
json.dump(out, open('points.json', 'w'))
