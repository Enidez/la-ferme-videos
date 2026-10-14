# LA FERME — moteur vidéo (dépôt complet)

Tout ce qu'il faut pour refaire et créer les vidéos verticales (9:16, 1080×1920, 30 i/s) de **LA FERME** (TikTok @laferme.media) depuis n'importe quel Mac.

## 1. Installation (une seule fois)

```bash
git clone https://github.com/Enidez/la-ferme-videos.git
cd la-ferme-videos
./setup.sh
```

`setup.sh` installe ffmpeg et Node (via Homebrew), l'environnement Python (`venv/`), le navigateur de rendu (Playwright Chromium), les polices (Anton, Oswald, JetBrains Mono) et le modèle de transcription (~350 Mo, dans `models/`).

## 2. Ce que contient le dépôt

| Dossier | Contenu |
|---|---|
| `skill/SKILL.md` | La bible de production (compétence `la-ferme-videos`) : ton, séries, DA **tableau d'enquêteur**, couverture, mise en page, écriture, chaîne technique. |
| `episodes/` | Chaque vidéo produite = un projet complet : `index.html` (moteur), `board.js` ou `scenes.js` (contenu), `segs.js` (phrases + timings), `img/`, `clips/` (images extraites), `audio/` (voix, musique montée, mix final). |
| `tools/` | Rendu, effets sonores, montage musique, transcription, floutage des visages, scripts de fabrication. |
| `music/` | Morceaux Kevin MacLeod (incompetech.com, CC BY 4.0 — crédit obligatoire). |
| `scripts_voix_off/` | Les textes de voix off. |

Épisode de référence du style par défaut : **`episodes/07_dossier05_tomber_malade/`** (et `06_…_tableau`).
Les épisodes 01 à 05 utilisent l'ancien moteur « complot » (fond noir, `scenes.js`).

## 3. Refaire une vidéo déjà produite

```bash
tools/rebuild.sh episodes/07_dossier05_tomber_malade DOSSIER05.mp4
```
Rendu des images + mix audio d'origine (`audio/mix.m4a`).

## 4. Créer une nouvelle vidéo (style tableau)

1. Copier l'épisode de référence : `cp -R episodes/07_dossier05_tomber_malade episodes/09_mon_sujet`
2. Mettre la voix dans `episodes/09_mon_sujet/audio/vo.mp3` (ou `vo.wav`).
3. Obtenir les timings : `venv/bin/python tools/transcribe.py episodes/09_mon_sujet/audio/vo.mp3`, puis réécrire `segs.js` avec le **texte exact** du script et ces timings.
4. Mettre les images dans `img/` (floutage des visages : `venv/bin/python tools/prep_img.py source.jpg img/nom.jpg 1`) et les extraits vidéo en images dans `clips/<nom>/0001.jpg…` (`ffmpeg -ss 10 -t 5 -i src.mp4 -vf fps=30,scale=540:960 clips/nom/%04d.jpg`).
5. Écrire les cartes dans `board.js` (`add({k:'clip', full:1, img:'…', t0:T[3]})`, etc.) et la liste des images à charger dans `index.html`.
6. Vérifier des images clés : `venv/bin/python tools/render.py episodes/09_mon_sujet preview 3 12.5 40` → `prev/`.
7. Fabriquer : `tools/build.sh episodes/09_mon_sujet MA_VIDEO.mp4 music/hitman.mp3 "0:T23:50,T23:T25:30,T25:END:104"`
   → vidéo + couverture JPG. Les sections musique = `début:fin:position dans le morceau`.

## 5. Règles à respecter (résumé, détail dans `skill/SKILL.md`)

- Durée ≥ 61 s (monétisation), < 2 min si possible. Couverture = image à 2 s : photo plein cadre + titre de 1 à 4 mots.
- Caméra : uniquement des travellings le long des fils, jamais de cut ni de fondu. Sous-titres : 3 mots maximum.
- Visages des particuliers floutés. Image IA étiquetée « GÉNÉRÉ PAR IA ». Archives étiquetées. Sources à l'écran et en légende.

## Médias et licences

Images et vidéos : Wikimedia Commons (licences libres, auteurs dans `episodes/credits_commons_*.txt` / `credits_commons.json` et à l'écran), courts extraits TikTok cités (droit de citation, comptes crédités à l'écran). Musique : Kevin MacLeod, CC BY 4.0. Modèle de détection de visages : OpenCV res10 (`tools/models/`).
**Ce dépôt est privé** : les extraits tiers ne doivent pas être redistribués.
