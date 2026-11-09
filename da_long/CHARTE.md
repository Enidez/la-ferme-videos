# Charte DA — vidéos longues YouTube (10 min et plus)

Construite pas à pas avec Enidez dans `da_long/` (méthode : images fixes → charte → clips de mouvement → pilote → vidéo).
Le tableau de cartes reste réservé aux formats courts (1-2 min).

## Validé

### Direction générale (09/11/2026)
- **Plein cadre sobre** (direction C) : archives en plein écran, typographie d'édition, rythme posé, ambiance « enquête dans les archives ». Référence : les enquêtes longues de Micode.
- Esprit « keynote Apple » pour la typo : **serif pour les titres** (Instrument Serif, avec un mot en italique), Inter pour les textes courants.
- **Une main humaine** dans l'image : polaroids (photo sortie de l'appareil) et bandes de photomaton, avec légendes **écrites à la main** (Caveat, bleu stylo) ; notes au stylo rouge dans la marge des documents.
- Sous-titres et synthés : **style Arte** (blanc, sobre, sans encadré ; synthé nom + fonction en bas à gauche).

### Effet « projecteur » (09/11/2026)
- Grain de film, scintillement de la lampe, léger tremblement de l'image, poussières et rayures, teinte chaude, son du projecteur.
- Transitions : **film burn** (brûlure orange-rouge, bords qui noircissent, éclair blanc bref) et **décrochage de pellicule** (bande noire et perforations qui défilent).
- **UNIQUEMENT pour les moments d'archives où l'on remonte le temps dans la vie de la personne** (enfance, années passées, événements anciens). **Jamais en continu sur toute la vidéo.**
  - On **entre** dans la séquence d'archives par un film burn ou un décrochage, on en **sort** de la même façon, et on revient à l'image propre du présent (témoins, documents, analyse).
- Prototype : `motion/burn_test.html` (rendu `motion/render_test.py`).

## À décider (prochaines étapes)
- Synthés (nom en serif ou sans serif ?), chiffres-clés, cartes géographiques en mouvement, documents qui s'ouvrent, intertitres de chapitre animés.
- Musique et habillage sonore.
- Pilote de 60-90 s assemblant tout, avant toute vidéo complète.
