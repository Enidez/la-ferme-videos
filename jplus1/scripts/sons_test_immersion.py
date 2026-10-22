# Bruitages synthétisés du test d'immersion (J+1 ch.2) : ambiance, pas, coups à la porte, chaise, cœur, souffle. Usage : python3 sons_test_immersion.py sortie.wav
import sys, numpy as np, wave
SR = 44100; DUR = 20.0; N = int(SR * DUR); rng = np.random.default_rng(3)
out = np.zeros(N)
def at(t): return int(t * SR)
def env(n, a, d): x = np.arange(n) / SR; return (1 - np.exp(-x / a)) * np.exp(-x / d)
def lp(x, k):  # passe-bas simple (moyenne exponentielle)
    y = np.empty_like(x); acc = 0.0
    for i, v in enumerate(x): acc += k * (v - acc); y[i] = acc
    return y
def add(t, s, g=1.0):
    i = at(t); j = min(N, i + len(s)); out[i:j] += g * s[:j - i]
def thud(f0=95, d=.12, g=1.0, click=.3, cf=.25):
    n = int(SR * .5); x = np.arange(n) / SR
    s = np.sin(2 * np.pi * f0 * x * (1 + .3 * np.exp(-x / .02))) * env(n, .002, d)
    s += click * lp(rng.standard_normal(n), cf) * env(n, .0005, .015)
    return g * s
def knock(): return thud(130, .09, 1.0, 1.2, .5) + thud(260, .04, .4, .6, .7)
def step(g=.5): return thud(70, .07, g, .5, .12)
def scrape(dur=.5):
    n = int(SR * dur); x = np.arange(n) / SR; s = lp(rng.standard_normal(n), .08) * np.sin(np.pi * x / dur) ** 2
    return s * (1 + .5 * np.sin(2 * np.pi * 38 * x))
def heart(g=1.0): a = np.concatenate([thud(48, .1, g, .05), np.zeros(int(SR * .2))]); return a + np.concatenate([np.zeros(int(SR * .2)), thud(42, .12, .7 * g, .05)])
def breath(dur, g):
    n = int(SR * dur); x = np.arange(n) / SR; return g * lp(rng.standard_normal(n), .03) * np.sin(np.pi * x / dur) ** 1.5
# ambiance : souffle grave de la ville éteinte, plus présent en POV ; drone qui monte avant la révélation
amb = lp(rng.standard_normal(N), .004); amb /= np.abs(amb).max(); x = np.arange(N) / SR
out += amb * np.where(x < 10, .25, .4)
for a, b in [(7.0, 10.0), (15.5, 17.6)]:
    i, j = at(a), at(b); k = np.linspace(0, 1, j - i)
    out[i:j] += .18 * k ** 2 * (np.sin(2 * np.pi * 55 * x[i:j]) + .5 * np.sin(2 * np.pi * 82.4 * x[i:j]))
# A — vue en coupe
for t in np.arange(.1, 2.9, .45): add(t, step(.35))
for t in [3.1, 3.42, 3.74]: add(t, knock(), .7)
add(5.0, scrape(.55), .25)
for t in np.arange(5.65, 7.4, .39): add(t, step(.45))
# B — POV : plus fort, plus proche
for t in [11.0, 11.32, 11.64]: add(t, knock(), 1.0)
t, period = 11.9, .85
while t < 17.6: add(t, heart(.9)); t += period; period = max(.5, period * .95)
for t in np.arange(12.3, 17.4, 1.5): add(t, breath(.7, .12)); add(t + .75, breath(.6, .08))
add(12.9, scrape(.6), .3)
for t in np.arange(13.75, 17.0, .42): add(t, step(.6))
add(17.6, thud(38, .6, 1.3, .6, .05))                     # bascule sur le judas
for t in [9.75, 19.75]: i = at(t); out[i:at(t + .25)] *= np.linspace(1, 0, at(t + .25) - i)
out = np.tanh(out * 1.2); out /= np.abs(out).max() * 1.12
w = wave.open(sys.argv[1], 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype(np.int16).tobytes()); w.close()
