# Créer et publier une vidéo depuis le téléphone (session cloud)

Tout se fait en parlant à Claude dans l'appli Claude (onglet Code), sur ce dépôt. Le Mac peut être éteint.

## Pour Enidez : ce que tu écris

| Tu veux… | Tu écris par exemple |
|---|---|
| Une nouvelle vidéo | « Fais une vidéo Dossier sur la hausse du gazole » |
| Valider une étape | « go » (script, voix, aperçu, vidéo) |
| Publier | « Publie-la ce soir à 19 h sur TikTok et YouTube » ou « publie maintenant » |
| Juste préparer | « Mets-la en brouillon » (tu valides ensuite dans Metricool) |

Claude te montre chaque étape (script → voix → aperçu de l'intro → vidéo complète) et attend ton « go ». La vidéo arrive dans la conversation, tu peux la regarder sur le téléphone. Rien n'est publié sans un « publie » de ta part pour CETTE vidéo.

## Pour Claude : la chaîne complète (tout est testé dans le cloud, 05/11/2026)

1. **Démarrage** : le hook `.claude/settings.json` lance `setup_cloud.sh` tout seul (≈ 10 s si déjà installé, ~1 min sinon). Lire `PASSATION.md` puis `skill/SKILL.md`.
   Si le dépôt `Enidez/la-ferme-publication` n'est pas dans la session : l'ajouter (`add_repo`, accès push) — `tools/heberger.sh` le clone tout seul.
2. **Recherche + script** : comme d'habitude (Bible). Wikimedia et incompetech passent depuis le cloud.
3. **Voix** : connecteur ElevenLabs (`creative_generate_speech`, voix habituelle). Télécharger le fichier dans `episodes/<projet>/audio/vo.mp3`.
4. **Montage** : `segs.js`, `board.js`, planches `tools/render.py <projet> preview …`, extrait `tools/apercu.sh`, puis `tools/build_rapide.sh <projet> sortie.mp4 …`. Envoyer la vidéo avec l'outil d'envoi de fichiers (≤ 30 Mo).
5. **Mise en ligne temporaire** : `tools/heberger.sh sortie.mp4 nom_court` → affiche `URL_VIDEO` et `URL_COUVERTURE` (adresses publiques).
6. **Publication Metricool** (brand `7408120`, fuseau Europe/Paris) avec `createScheduledPost` :
   - réseaux : `tiktok` (@laferme.media, `tiktokData.title` obligatoire) et `youtube` (`youtubeData`: `type: "short"`, `title`, `madeForKids: false`, `privacy: "public"`). **Jamais `instagram`** : c'est le compte perso enidez_.
   - `media: [URL_VIDEO]`, `text` = légende (accroche + question perso + sources + crédit musique + ≤ 5 hashtags).
   - Enidez a dit « publie » pour cette vidéo → `autoPublish: true`, `draft: false`, à l'heure demandée (au moins 5 min dans le futur ; sans heure donnée, `getBestTimeToPostByNetwork`).
     Sinon → `draft: true` et lui donner le `plannerUrl`.
   - Metricool copie aussitôt la vidéo chez lui (`static.metricool.com`) : lancer ensuite `tools/heberger.sh --vider`.
7. Donner à Enidez : l'heure de publication, le lien Metricool, la légende. Mettre à jour la carte du Studio. Commit + push du projet (sans mp4).

## Réseau du cloud

Hôtes nécessaires et déjà ouverts : GitHub (`raw.githubusercontent.com` compris), Wikimedia, incompetech, `storage.googleapis.com` (voix ElevenLabs).
Bloqués (inutile de réessayer) : `upload.higgsfield.ai`, `*.cloudfront.net`, `api.elevenlabs.io` en direct — passer par les connecteurs.
