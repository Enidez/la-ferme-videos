# J+1 — bibliothèque d'éléments 3D

Tout ce qui sert au décor « salle de crise » de J+1. Rendu par le même pipeline que LA FERME (`tools/render.py`, `tools/build_rapide.sh`) : la page expose `window.ready`, `window.DURATION`, `window.EVENTS` et `window.renderFrame(f)`.

| Élément | Fichier | Source et licence | État |
| --- | --- | --- | --- |
| Moteur 3D | `node_modules/three` (v0.170.0, `package.json`) | three.js, MIT | installé |
| Halo lumineux (bloom) | `three/examples/jsm/postprocessing` | three.js, MIT | utilisé |
| Carte de France par département | `assets/geo/departements.js` (+ `.geojson`) | france-geojson (G. David), données IGN Admin Express, Licence ouverte | prête |
| Carte de France par région | `assets/geo/regions.js` (+ `.geojson`) | idem | prête |
| Prototype « carte 3D + alerte depuis Paris » | `moteur/index.html` | maison | fonctionne (WebGL dans le Chromium du cloud) |

Rappel technique : le navigateur refuse `fetch()` sur un fichier local ; les données sont donc chargées en `<script>` (`window.GEO_DEPARTEMENTS`, `window.GEO_REGIONS`).

## À récupérer (sites bloqués par le réseau du cloud pour l'instant)
- Objets 3D libres (CC0) : Poly Haven (`polyhaven.com`, `api.polyhaven.com`, `dl.polyhaven.org`) et Kenney (`kenney.nl`) : radio, lampe torche, bouteilles d'eau, sac d'urgence, jerrican, trousse de secours, pylône électrique.
- Ciels et éclairages HDRI de nuit (Poly Haven, CC0).
- Textures béton et métal pour le sol de la salle de crise (Poly Haven, CC0).
