# LA FERME — moteur vidéo

Code des vidéos verticales (9:16, 1080×1920, 30 i/s) de la chaîne **LA FERME** (TikTok @laferme.media).

## Contenu

| Dossier | Rôle |
|---|---|
| `skill/SKILL.md` | La bible de production (compétence `la-ferme-videos`) : ton, DA, règles de couverture, mise en page, chaîne technique. |
| `engines/tableau/` | **Style par défaut** : mur d'enquêteur. Cartes plastifiées punaisées, fils rouges, caméra drone FPV (spline Catmull-Rom), uniquement des travellings, plongées plein écran, sous-titres ≤ 3 mots. |
| `engines/complot/` | Ancien style « dossier d'enquête » : fond noir, cartes-preuves, tuiles de lettres, caméra 2.5D par calques. |
| `tools/` | `render.py` (rendu Playwright → ffmpeg), `faces.py` / `prep_img.py` (floutage des visages, DNN res10), `tighten.py` (resserrage de la voix), `sfx_mix.py` (effets sonores synthétisés). |
| `episodes/` | Le code de chaque épisode produit (scènes, timings `segs.js`, scripts son). |
| `scripts_voix_off/` | Les textes de voix off. |

## Rendu

```bash
python -m venv venv && venv/bin/pip install playwright numpy scipy librosa opencv-python sherpa-onnx
venv/bin/playwright install chromium
npm install            # polices Anton / Oswald / JetBrains Mono (@fontsource)
python tools/render.py <dossier_projet> preview 3.0 12.5   # images clés dans <projet>/prev/
python tools/render.py <dossier_projet> full sortie.mp4    # vidéo + events.json pour les effets
```

Le projet attend `img/` et `clips/<nom>/0001.jpg…` à côté de `index.html` (non versionnés : médias sous licences tierces).
Le modèle de visages `res10.caffemodel` (OpenCV) n'est pas versionné : à placer dans `tools/models/` avec `deploy.prototxt`.

## Médias

Les images et vidéos ne sont pas dans le dépôt. Sources utilisées : Wikimedia Commons (licences libres, auteurs crédités à l'écran), courts extraits TikTok cités (droit de citation, comptes crédités), musique Kevin MacLeod (incompetech.com, CC BY 4.0).
