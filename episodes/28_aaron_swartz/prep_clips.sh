#!/bin/bash
# Extrait les images (30 i/s, JPG) de chaque extrait vidéo utilisé par le tableau 16:9 de l'ép. 28.
# Usage : bash episodes/28_aaron_swartz/prep_clips.sh <dossier_media>   (media = tiob.ogv + sopa_f2c2012.mp4, copies de travail d'archive.org)
set -e
cd "$(dirname "$0")"; M="$1"; V=../../veille/vasseur/interview_vasseur_2019_partiel.mov
ex(){ k=$1; src=$2; a=$3; b=$4; vf=${5:-"scale=800:-2"}; rm -rf frames/$k; mkdir -p frames/$k
  ffmpeg -v error -y -ss $a -to $b -i "$src" -vf "fps=30,$vf" -q:v 4 frames/$k/%04d.jpg; echo "$k $(ls frames/$k | wc -l)"; }
VCROP="crop=640:292:0:0,scale=800:-2"   # Vasseur (TV5MONDE) : on coupe les bandeaux du bas
ex A1 clips/A1_sopa_couldnt_let_that_happen.mp4 0 6.4
ex V5 $V 355.7 371.8 "$VCROP"
ex V3 $V 34.9 50.6 "$VCROP"
ex V4 $V 304.6 314.3 "$VCROP"
ex V6 $V 371.3 396.3 "$VCROP"
# vidéos de famille : 4 plans mis bout à bout
rm -rf frames/FAM; mkdir -p frames/FAM; i=0
for r in "140 150" "208 218" "286 298" "308 316"; do set -- $r; ffmpeg -v error -y -ss $1 -to $2 -i "$M/tiob.ogv" -vf "fps=30,scale=800:-2" -q:v 4 /tmp/fam_%04d.jpg
  for f in /tmp/fam_*.jpg; do i=$((i+1)); mv "$f" frames/FAM/$(printf %04d $i).jpg; done; done; echo "FAM $i"
ex TEEN "$M/tiob.ogv" 579 589.5
ex PANEL "$M/tiob.ogv" 605.4 609
ex TEEN3 "$M/tiob.ogv" 596.6 603.0
ex MITCAM "$M/tiob.ogv" 2550 2566
ex POLICE "$M/tiob.ogv" 2623 2630
ex ORTIZ "$M/tiob.ogv" 2802.5 2806.0
ex A2 "$M/sopa_f2c2012.mp4" 253.3 257.4
ex T3 clips/T3_eckersley_world_fell_apart.mp4 0 12.5
ex T1 clips/T1_lessig_mon_fils_docteurs.mp4 0 13
ex T2 clips/T2_lessig_part_of_me.mp4 0 11
ex T6 "$M/tiob.ogv" 6160 6176
du -sh frames
