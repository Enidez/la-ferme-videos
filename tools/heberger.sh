#!/bin/bash
# Met une vidéo finie (et sa couverture) en ligne à une adresse publique, le temps que Metricool la récupère.
# Hébergeur : le dépôt PUBLIC Enidez/la-ferme-publication, branche « en-ligne » réécrite à chaque fois
# (un seul commit, sans historique). Metricool copie le fichier chez lui dès que le post est créé :
# ensuite on vide la branche avec --vider (la vidéo ne reste pas en ligne sur GitHub).
# Usage : tools/heberger.sh sortie.mp4 [nom_court]   -> URL_VIDEO=...  URL_COUVERTURE=...
#         tools/heberger.sh --vider
set -e
ROOT=$(cd "$(dirname "$0")/.." && pwd); PUB="$ROOT/../la-ferme-publication"; BR=en-ligne
[ -d "$PUB/.git" ] || git clone -q --depth 1 https://github.com/Enidez/la-ferme-publication "$PUB"
pousser(){ for i in 1 2 3 4; do git -C "$PUB" push -q -f origin "$1:refs/heads/$BR" && return 0; sleep $((2**i)); done; return 1; }
if [ "$1" = "--vider" ]; then git -C "$PUB" fetch -q --depth 1 origin main; pousser origin/main && echo "Branche $BR vidée."; exit 0; fi
VID=$(cd "$(dirname "$1")" && pwd)/$(basename "$1"); NOM=${2:-$(basename "$1" .mp4 | tr 'A-Z ' 'a-z_' | tr -cd 'a-z0-9_-')}
COUV="${VID%.mp4}_couverture.jpg"
[ "$(stat -c %s "$VID")" -lt 95000000 ] || { echo "Vidéo trop lourde pour GitHub (> 95 Mo)"; exit 1; }
cd "$PUB"; git checkout -q --orphan tmp_pub 2>/dev/null || git checkout -q tmp_pub; git rm -rfq --cached . 2>/dev/null || true
find . -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp "$VID" "$NOM.mp4"; FICH="$NOM.mp4"; [ -e "$COUV" ] && { cp "$COUV" "${NOM}_couverture.jpg"; FICH="$FICH ${NOM}_couverture.jpg"; }
git add -f $FICH; git -c user.name="LA FERME" -c user.email="laferme.dossier@gmail.com" commit -q -m "En ligne : $NOM"
pousser HEAD; git checkout -q -f main; git branch -q -D tmp_pub
B=https://raw.githubusercontent.com/Enidez/la-ferme-publication/$BR
echo "URL_VIDEO=$B/$NOM.mp4"; [ -e "$COUV" ] && echo "URL_COUVERTURE=$B/${NOM}_couverture.jpg"
for i in 1 2 3 4 5 6; do C=$(curl -s -o /dev/null -w "%{http_code}" -I "$B/$NOM.mp4"); [ "$C" = 200 ] && { echo "En ligne : OK"; exit 0; }; sleep 5; done
echo "ATTENTION : l'adresse ne répond pas encore ($C)"; exit 1
