# Assemble la bande voix de « Trois frères. Aveugles. » : ouverture Matrix (tonalité, numérotation, chuchotements),
# narration Liam, deux scènes de reconstitution en hébreu (filtre téléphone). Sort proj/audio/vo.wav + proj/segs.js.
import wave, numpy as np, json
SR = 44100
def load(p):
    w = wave.open(p); assert w.getframerate() == SR and w.getnchannels() == 1, p
    return np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
NB = ' '
L = load('vo/narr.wav')
LS = json.load(open('vo/narr_segs.json'))
TX = ["Ils ne voyaient rien.", "Et pourtant,", "ils ont fait payer des milliers d'appels…", "à l'armée israélienne.", "Kafr Kassem.", "Un village arabe,",
 "à une vingtaine de kilomètres de Tel-Aviv.", "Trois frères.", "Ramy, Muzher", "et Shadde Badir.", "Aveugles de naissance.", "Enfants,",
 "ils inventent une langue secrète,", "pour que les autres ne comprennent pas.", "Ils démontent les téléphones.", "Ils apprennent à imiter n'importe quelle voix.",
 "En 1989,", "dans un centre pour aveugles,", "ils touchent leur premier ordinateur.", "Ils ne le lâcheront plus.", "Leur arme ?", "Pas le clavier.", "La voix.",
 "Écoute.", "Reconstitution.", "Elles donnent les codes.", "Un jour,", "l'opérateur national leur coupe trois lignes.", "Un frère rappelle…",
 "en se faisant passer pour l'enquêteur anti-fraude.", "Les lignes sont rétablies.", "Puis ça devient sérieux.", f"20{NB}000 numéros de cartes bancaires,",
 "aspirés dans l'ordinateur d'un seul homme d'affaires.", "Et en 1998…", "le coup le plus fou.", "La radio de l'armée israélienne.",
 "Ils réveillent une fonction oubliée de son standard.", "Jusqu'à 281 appels en même temps.", "Au milieu d'une orangeraie,", "une cabane.", "Dedans,",
 "un standard pirate.", "Des Palestiniens appellent l'étranger.", "Ils paient la cabane…", "et c'est l'armée qui reçoit la facture.", "Les factures explosent.",
 "La police remonte jusqu'à la cabane.", "Un ouvrier lâche un détail :", "les techniciens…", "étaient aveugles.", "Un an d'écoutes.", "Selon le magazine Wired,",
 "ils auraient même piraté l'e-mail du procureur.", "14 juin 1999.", "14 policiers débarquent chez eux.", "Aucun ordinateur exploitable.",
 "Ramy affirme que le sien s'efface tout seul", "si quelqu'un d'autre l'ouvre.", "44 chefs d'accusation.", "27 mois de procès.", "Ramy :", "65 mois de prison.",
 "Muzher :", "des travaux d'intérêt général.", "Shadde :", "du sursis.", "Eux disent qu'on les a visés parce qu'ils étaient arabes.", "Et doués.",
 "Le parquet a démenti.", "Cette histoire,", "ce n'est pas nous qui l'inventons.", "Ce sont les tribunaux israéliens qui l'ont jugée.",
 "Et la presse israélienne qui l'a racontée.", "À sa sortie,", "Ramy dit vouloir protéger les entreprises…", "contre les pirates comme lui.",
 "Alors, dis-moi en commentaire.", "Génie…", "ou escroc ?"]
assert len(TX) == len(LS), (len(TX), len(LS))
HE = {'h1': ("שלום, במה אפשר לעזור?", "Bonjour, je peux vous aider ?"),
      'h2': ("שלום, כאן טכנאי של בזק. יש תקלה במרכזייה. אני צריך את הקוד.", "Ici un technicien de Bezeq. Panne sur le standard. J'ai besoin du code."),
      'h3': ("רגע... הנה.", "Attendez… voilà."),
      'h4': ("כאן המחלקה למניעת הונאות של בזק. תפתח מיד את שלושת הקווים.", "Ici le service anti-fraude de Bezeq. Rouvrez les trois lignes."),
      'h5': ("כן, כן... זה פתוח.", "Oui, oui… c'est ouvert.")}

# ---------- ouverture : tonalité, numérotation DTMF, chuchotements
def tone(fs, d, a=.25):
    t = np.arange(int(d * SR)) / SR; y = sum(np.sin(2 * np.pi * f * t) for f in fs) / len(fs) * a
    n = min(len(y) // 2, 220); r = np.linspace(0, 1, n); y[:n] *= r; y[-n:] *= r[::-1]; return y
DT = {'0': (941, 1336), '1': (697, 1209), '2': (697, 1336), '3': (697, 1477), '4': (770, 1209), '5': (770, 1336), '6': (770, 1477), '7': (852, 1209), '8': (852, 1336), '9': (852, 1477)}
hook = np.zeros(int(12 * SR), np.float32)
def put(buf, t, y, g=1.0):
    i = int(t * SR); buf[i:i + len(y)] += (y * g)[:max(0, len(buf) - i)]
put(hook, 0.0, tone([440], 0.85, .18))
for k, dgt in enumerate('0352819981'):
    put(hook, 0.95 + k * 0.095, tone(DT[dgt], 0.07, .22))
wf = load('vo/w_f.tel.wav'); wm = load('vo/w_m.tel.wav')
T_WF = 1.95; put(hook, T_WF, wf, 1.1)
T_WM = T_WF + len(wf) / SR + 0.2; put(hook, T_WM, wm, 1.1)
HOOK_END = T_WM + len(wm) / SR
TCOV = round(HOOK_END + 0.6, 2)
hook = hook[:int(TCOV * SR)]
rng = np.random.default_rng(3); hook += rng.normal(0, .004, len(hook)).astype(np.float32) * (np.arange(len(hook)) < int(HOOK_END * SR))  # souffle de ligne

out = [hook]; t = TCOV; SEGS = []; MARK = {'wf': [T_WF, round(T_WF + len(wf) / SR, 2)], 'wm': [round(T_WM, 2), round(HOOK_END, 2)], 'tcov': TCOV}
def fade(x, n=220):
    x = x.copy(); n = min(n, len(x) // 2); r = np.linspace(0, 1, n); x[:n] *= r; x[-n:] *= r[::-1]; return x
def gap(d):
    global t; out.append(np.zeros(int(d * SR), np.float32)); t += d
def narr(i0, i1):
    global t
    a = max(0, LS[i0][0] - .06); b = min(len(L) / SR, LS[i1][1] + .12)
    for k in range(i0, i1 + 1):
        SEGS.append(dict(t0=round(t + LS[k][0] - a, 2), t1=round(t + LS[k][1] - a, 2), txt=TX[k], id='n%d' % k))
    out.append(fade(L[int(a * SR):int(b * SR)])); t += b - a
def heb(k):
    global t
    y = load(f'vo/{k}.tel.wav'); MARK[k] = [round(t, 2), round(t + len(y) / SR, 2)]
    SEGS.append(dict(t0=round(t, 2), t1=round(t + len(y) / SR, 2), txt=HE[k][1], he=HE[k][0], m=1, id=k))
    out.append(fade(y) * 1.05); t += len(y) / SR
narr(0, 24); gap(.4); heb('h1'); gap(.25); heb('h2'); gap(.25); heb('h3'); gap(.4)
narr(25, 29); gap(.35); heb('h4'); gap(.25); heb('h5'); gap(.4)
narr(30, 79)
y = np.clip(np.concatenate(out), -1, 1)
w = wave.open('proj/audio/vo.wav', 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((y * 32767).astype(np.int16).tobytes()); w.close()
ID = {s['id']: i for i, s in enumerate(SEGS)}
open('proj/segs.js', 'w').write('const SEGS=' + json.dumps(SEGS, ensure_ascii=False) + ';\nconst MARK=' + json.dumps(MARK) + ';\nconst ID=' + json.dumps(ID) + ';\n')
print('total', round(t, 2), 'TCOV', TCOV, MARK)
