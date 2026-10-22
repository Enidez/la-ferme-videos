# Avions militaires autour de Paris : semaine des manifestations vs semaine normale
Méthode : `tools/adsb_paris.py` (heatmaps ADS-B Exchange). Mouvement = un appareil militaire français (codes 3A8000-3BFFFF) sous 3 000 ft à moins de 12 km d'une base/aéroport (Villacoublay, Évreux, Creil, Orléans-Bricy, Le Bourget, Orly, Roissy), regroupé par heure. Comparaison 1-8 oct. vs 14-21 oct. (8 jours chacune ; le 22 est incomplet).

| | 1-8 oct. | 14-21 oct. |
|---|---|---|
| Mouvements | 348 | 332 |
| Appareils différents | 67 | 71 |
| Transport (indicatifs CTM) | 128 | 139 |
| Hélicoptères de sûreté (Écureuil armée de l'Air « RACE », Super Puma « MTOR », gendarmerie H160 F-MJHD / EC135 « FGN ») | 19 | 51 (dont 7 la nuit, 0 la semaine d'avant) |
| Orléans-Bricy (base des A400M) | 38 | 54 (hausse diffuse : entraînements) |

## Lecture
- **Pas de pont aérien vers Paris** : le transport militaire est stable (+8 %), le trafic total légèrement en baisse.
- **Ce qui change : les hélicoptères** au-dessus de l'Île-de-France, ×2,7, y compris de nuit (20 et 21/10), plus la Sécurité civile (EC145 « Dragon 75 », Dash 8 « Milan ») au Bourget.
- Lundi 19 et mardi 20 : trafic total plus bas que d'habitude (28 et 31 mouvements contre ~50-60).

## Limites
- Seuls les appareils qui émettent en ADS-B sont vus ; des vols peuvent être faits transpondeur coupé.
- Le filtre ne compte que les passages bas près des terrains : un hélicoptère qui tourne au-dessus de Paris sans s'approcher d'un terrain n'est pas compté → les chiffres hélicos sont un minimum.
- Les militaires déployés en ville arrivent surtout par la route : ce comptage ne mesure pas le dispositif au sol.
