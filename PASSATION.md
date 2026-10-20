# PASSATION — LA FERME (au 20 octobre 2026, soir)

À lire en entier par toute nouvelle session Claude (cloud ou Mac) **avant de faire quoi que ce soit**.
Ensuite lire `skill/SKILL.md` (la « Bible » = la compétence `la-ferme-videos`) : toutes les règles de ton, de DA, de hook, de sources y sont.

---

## 1. Qui, quoi

- **Enidez** : créateur de LA FERME. Ne code pas, parle français, délègue toute la technique. Il veut de la vitesse, des réponses courtes, des vidéos « de fou ».
- **Comptes** : TikTok et Instagram **@laferme.media** · YouTube **@LaFerme-Media** · Facebook « La Ferme Media » (à créer par lui).
  - ⚠️ Metricool (brandId 7408120) : TikTok et YouTube OK, mais son Instagram est branché sur **enidez_** (compte perso) → **ne jamais y publier**.
- **Bio / signature** : « Ils parlent à ta place. Nous, on vérifie. »
- **Chiffres** : LE PLAN (18/10) est devenu viral (≈ 353 k TikTok, 173 k Instagram). ~3 500 abonnés au total le 20/10.

## 2. Règles d'or (résumé — détail dans la Bible)

1. **Hook dans les 3 premières secondes** : une phrase qui crée une intrigue (vraie voix d'un politique, contradiction, chiffre choc). Titre avant 4 s. Jamais de mise en contexte en ouverture.
2. **Aperçu avant rendu** : toute modification → rendre seulement l'extrait (`tools/apercu.sh`), l'envoyer, attendre son « go », puis rendu complet. (Exception : il dit explicitement « lance ».)
3. **Script validé avant la voix** : on envoie le script, il valide, puis on génère la voix.
4. **Liens implicites** : ne jamais dire « on a relié les points » ; un seul parallèle frontal, en chiasme.
5. **Faits vérifiés et sourcés**. Ce qui n'est pas prouvé → tampon NON PROUVÉ. Jamais d'accusation non prouvée présentée comme un fait. On démonte aussi les fausses rumeurs, ton officiel (« Le parquet dément. » — sans se justifier).
6. **Plus de visages, plus d'émotion** : chaque fait a une photo ou une vraie voix ; images d'illustration étiquetées ; visages des particuliers floutés ; jamais de gore ni de mineur blessé.
7. **Les sources ne dépassent jamais du cadre** de la carte.
8. **Fin de vidéo** : plus de « on continue de compter ». Signature : « Abonne-toi. Ils parlent à ta place. Nous, on vérifie. »
9. Légendes sans sources ni crédits (crédits à l'écran). 5 hashtags max dont #LaFerme.
10. Ne pas refaire une vidéo publiée sans qu'il le demande. Ne pas afficher les commentaires haineux.
11. Vidéo ≥ 61 s (monétisation), < 30 Mo pour l'envoi (recompresser : `b:v = 29*8*1024/durée − 165` k).

## 3. Le dépôt

| Chemin | Rôle |
|---|---|
| `skill/SKILL.md` | La Bible (à recopier dans la compétence si besoin) |
| `tools/build.sh <proj> sortie.mp4 music/hitman.mp3 "sections"` | Rendu complet + effets + musique + mix −14 LUFS + couverture + générique de fin |
| `tools/apercu.sh <proj> sortie.mp4 t0 t1 [musique] [sections]` | Aperçu d'un extrait seulement |
| `tools/render.py <proj> preview t1 t2 …` | Images fixes de contrôle (`proj/prev/`) |
| `tools/transcribe.py voix.wav` | Découpe la voix en phrases (whisper small) |
| `tools/generique.sh` + `generique/` | Générique « ferme-la » (enchaîné automatiquement par build.sh) |
| `episodes/NN_nom/` | Chaque épisode = `index.html`, `helpers.js`, `board.js`, `segs.js`, `img/`, `clips/`, `audio/vo.m4a`, script d'assemblage |
| `music/` | Kevin MacLeod CC BY 4.0 (Hitman = défaut). Sections type : `"0:T31:50,T31:END:104"` (Tn = index de phrase ; 50 = tension, 30 = creux, 104 = final) |

**Installation** : Mac → `./setup.sh` ; **cloud / Linux → `bash setup_cloud.sh`**.
Le dossier d'un épisode a besoin du lien `node_modules` (setup le crée). Pour un épisode, `audio/vo.m4a` doit être reconverti en `audio/vo.wav` avant rendu : `ffmpeg -i audio/vo.m4a -ac 1 -ar 44100 audio/vo.wav`.

**Moteur « tableau d'enquêteur »** (épisodes 11 à 15) : cartes `add({k,…})` placées en serpentin, caméra drone Catmull-Rom (KEYS/WP), vue d'ensemble `WIDE` avec maintien `WH`, fils rouges qui s'allument (`XT`, `hl`), sous-titres 3 mots max, sons via `ev()`/`reveal()`. Modèle le plus récent et le plus complet : **`episodes/15_qui_commande_20oct/`** (hook vidéo avec arrêt sur image, vrai son, tampons, cartes dossier/ordres/vitesse).

## 4. Voix (ElevenLabs, connecteur « creative », flow `ADibhc1EvvuDTkwAUccJ`)

- **Paul French** `cTNP6ZM2mLTKj2BFhxEh` — voix par défaut des Dossiers depuis le 19/10 (ton « débrief Canal+ »), balises `[dramatic] [emphatic] [intense] [firm]`.
- **Liam** `EmZGlxI7QPvCEMOkFhB9` — voix posée (Trois frères Badir).
- Modèle `eleven_v3`. Méthode : `creative_add_flow_node` → `creative_run_flow_nodes` → `creative_get_flow_run_status` → télécharger `content_url`.
- Resserrage (il veut un débit rapide, peu de pauses) : `silenceremove=stop_periods=-1:stop_duration=0.3:stop_threshold=-42dB:stop_silence=0.18,atempo=1.08-1.12`.
- ⚠️ Vérifier que le connecteur ElevenLabs est bien disponible dans la session cloud ; sinon, demander à Enidez de l'ajouter.

## 5. Images et extraits

- Wikimedia Commons via l'API (crédit auteur + licence à l'écran). Sur le Mac il fallait un fichier de certificats (`SSL_CERT_FILE`) ; en cloud normalement inutile.
- yt-dlp (`venv/bin/yt-dlp`) pour les courts extraits cités (TikTok, YouTube, franceinfo…) : flouter les particuliers (`tools/faces.py`), flouter les titres trompeurs incrustés par des comptes tiers, créditer.

## 6. Épisodes livrés récemment

| Épisode | Statut |
|---|---|
| 11 LE PLAN (18/10) | Publié, viral |
| 13 LE PLAN · Jour 1 (19/10) | Publié |
| 14 / 14b MATCH MAINTENU (PSG–Barça) | v2 livrée (hook miroir 2018/2026 + 3 preuves) |
| 12b Les frères Badir v6 | Livrée (hook vraies images Channel 10 + « L'histoire des frères Badir ») |
| 15 QUI COMMANDE ? (maintien de l'ordre) | Livrée, Enidez l'adore |

## 7. EN COURS — à reprendre tout de suite

### « IL N'ÉTAIT PAS NÉ. » (L'Autre Angle) → `episodes/16_lisnard_17oct1961_EN_COURS/`
- **Sujet** : lundi 19/10/2026 sur LCI, David Lisnard (candidat, maire de Cannes) interrogé par une étudiante proche de LFI sur le massacre du 17 octobre 1961 : « Non mais je m'en fous, madame », « J'en ai rien à foutre », « Je n'étais pas né », « Depuis, il y a eu l'indépendance de l'Algérie », « J'ai des potes algériens… on était passé à autre chose », « Votre rhétorique ne m'intéresse pas ».
- **Source vidéo** : `source/quotidien_lisnard_LCI_19oct.mp4` (montage Quotidien 32 s, TikTok 1,5 M vues le 20/10, envoyé par Enidez). Transcription vérifiée : « je m'en fous » et « j'en ai rien à foutre » sont bien audibles.
- **L'autre angle** : selon la presse (France 3, Boursorama, Puremédias), il a AUSSI dit que c'était « très grave, dramatique, mais c'était en 61 » et « pas mon problème aujourd'hui » (contexte : débat sur les violences/pillages du 17/10/2026). Quotidien ne l'a pas gardé. Ça ne l'excuse pas, mais on montre la phrase entière.
- **Prudence** : le chiffre « 200 noyés » est celui de l'étudiante → dire « des dizaines de morts selon les historiens » (bilan non établi définitivement). **Flouter l'étudiante, ne pas la nommer.** Le parallèle 1961/2026 (17 octobre, couvre-feu, préfet de police) reste implicite — ne JAMAIS mettre le massacre au même niveau qu'un couvre-feu de 2026.
- **Recherche lancée** dans l'ancienne session (agent) : replay intégral LCI, réactions, faits historiques (Papon, couvre-feu, Einaudi, rapport Brunet 1998, Hollande 2012, Macron 2021 « crimes inexcusables pour la République »). Si le résultat n'est pas dans ce dépôt, **refaire la recherche**.
- **Structure proposée** : hook = sa vraie voix « J'en ai rien à foutre » (0-3 s) → ce qu'il a vraiment dit en entier → ce qui s'est passé en 1961 (faits + reconnaissance officielle) → chute implicite « 17 octobre. Un couvre-feu. Un préfet de police. C'était il y a 65 ans. » → fin signature.
- **Prochaine étape** : écrire le script, l'envoyer à Enidez pour validation, puis voix Paul, puis aperçu de l'intro.

### Autres idées en attente
- **LE PLAN · Jour 2/3** (suite de la série virale, compteur des mesures).
- **Récit vs Réel « Un mort à l'Élysée ? »** (rumeur Blast/X du 17/10, aucune source → NON PROUVÉ).
- **L'Autre Angle « Aux lycéens : retournez travailler »** (Reel 12 k j'aime ; identifier l'auteur par la légende du Reel, pas par le visage).
- **Affaire Bardella** (accusations d'antisémitisme, Mediapart 28/09/2026, démenti du RN) : vidéo séparée, prudence maximale (diffamation) — pas encore décidée.
- **YouTube format long 16:9** : reporté.
- **Facebook « La Ferme Media »** : Enidez la crée ; proposer une photo de couverture dans la DA et relier à Instagram.

## 8. Travailler depuis le cloud (PC éteint)

- Pas d'accès au Mac : Téléchargements, `~/Movies/Dossier01_rushes`, Chrome d'Enidez et les fichiers non poussés ne sont PAS disponibles. Tout ce qui compte doit être dans ce dépôt.
- Les `.mp4`/`.wav` sont ignorés par git (`.gitignore`) : pour ajouter une source vidéo indispensable, `git add -f`.
- Livrer les vidéos finales à Enidez avec l'outil d'envoi de fichiers de la session (≤ 30 Mo), puis pousser le projet de l'épisode (sans les mp4) sur GitHub.
- Toute nouvelle règle donnée par Enidez → l'ajouter dans `skill/SKILL.md`, commit, push.
- Commits : terminer par `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
