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

| Objets 3D (30) | `assets/models/<id>/` (glTF 1K) ; `assets/models/<id>.js` généré par `scripts/gltf2js.py` | Poly Haven, CC0 | prêts, vérifiés dans `moteur/vitrine/` |
| Ciels de nuit (HDRI 1K) | `assets/hdri/` : cobblestone_street_night, modern_buildings_night, dresden_station_night, metro_vijzelgracht, kloppenheim_02_puresky | Poly Haven, CC0 | prêts |
| Textures de sol (1K) | `assets/textures/` : concrete_floor, asphalt_02, blue_metal_plate | Poly Haven, CC0 | prêtes |

### Les objets
Lantern_01, Megaphone_01, alarm_clock_01, binoculars, boombox, korean_fire_extinguisher_01, long_life_food, medical_box, medical_tape, metal_jerrycan_green, modular_electricity_poles, old_gas_mask, old_military_crate, pastic_torch_6v, plastic_bottle_gallon, plastic_crate_01, plastic_jerrycan, portable_generator, portable_searchlight, power_box_01, rubber_boots, russian_food_cans_01, signal_flashlight, street_lamp_01, television_02, vintage_flashlight, vintage_lighter, vintage_oil_lamp, vintage_radio_transceiver, wall_clock

### Utilisation
Charger `<script src="../assets/models/<id>.js">` puis `new GLTFLoader().parse(JSON.stringify(window.MODELS['<id>']), '', ok, ko)`. Les `.js` ne sont pas versionnés (trop lourds) : `python3 jplus1/scripts/gltf2js.py` les régénère (lancé par `setup_cloud.sh`). Nouveaux objets : `python3 jplus1/scripts/polyhaven.py models <id> …` (catalogue : `https://api.polyhaven.com/assets?t=models`).

### À récupérer plus tard
- Kenney (CC0) : kits low-poly (ville, véhicules) si besoin d'une ville en maquette.

### Décor « maquette en coupe » (chapitre 2, 22/10/2026)
`moteur/immeuble.js` (module réutilisable) : l'immeuble de Sam en coupe (5 niveaux, cage d'escalier avec veilleuses vertes, porte d'entrée vue de profil, fenêtres à l'arrière éclairées par la lune), le mobilier (canapé, cuisine, lit, armoire, étagère, tapis, plaid…), la rue de nuit, la place de la mairie (foule, 3 palettes d'eau, agents en gilet), et les figurines « vinyle » posables (`perso`, `pose`, `place`) : Sam (sweat orange à capuche), Mme Ferreira (82 ans, chignon, lunettes, canne), le voisin du 4e (bonnet rouge, barbe). Objets Poly Haven posés à leur taille réelle avec `put`.
Essai : `episodes/02_les_trois_jours/lookdev_v2.html` (6 plans clés, planche dans `lookdev_v2/`).
