# Enquête & Diagnostic Technique : Écran Noir sur iPhone (iOS WebKit)

Rapport d'investigation expliquant l'origine exacte de l'écran noir sur iPhone (Safari et Chrome) et plan d'action chirurgical pour rétablir la vidéo d'arrière-plan en boucle continue.

---

## 1. Origine Exacte du Problème (Résultats de l'Enquête)

Sur iOS (Safari et Chrome partagent le même moteur de rendu WebKit d'Apple), trois facteurs combinés provoquent l'écran noir :

### Cause 1 : L'attribut `src` sur la balise `<video>` bloque les balises `<source>`
Dans le code actuel de `HomeView.tsx` :
```html
<video id="abby-bg-video" src="${bgVideo}" ...>
  <source src="${bgVideo}" type="video/mp4" />
  <source src="/video-bg.mp4" type="video/mp4" />
</video>
```
Conformément à la spécification HTML5 et au moteur WebKit : **lorsque l'attribut `src` est renseigné sur la balise `<video>`, le navigateur ignore totalement toutes les balises `<source>` enfants**.
Sur iPhone, si l'URL générée par le bundler (`/assets/abbyshort-B_N8OhZe.mp4`) subit la moindre latence ou un en-tête non reconnu lors de l'injection dynamique, WebKit se met immédiatement en erreur (`MEDIA_ERR_SRC_NOT_SUPPORTED`) et ne bascule **jamais** sur `<source src="/video-bg.mp4">`.

### Cause 2 : Injection dynamique `dangerouslySetInnerHTML` sans appel `video.load()`
WebKit n'exécute pas automatiquement l'algorithme de sélection des sources pour les balises insérées dynamiquement via `dangerouslySetInnerHTML`. La documentation Apple WebKit stipule qu'un appel explicite à `video.load()` est indispensable pour que le moteur média d'iOS initialise le flux vidéo.

### Cause 3 : Absence de poster = affichage du fond CSS noir (`bg-black`)
Lors du tour précédent, l'attribut `poster` a été retiré. Tant que la vidéo n'a pas encore décodé sa première image, le conteneur affiche la couleur de fond de la page (`bg-black`) recouverte des deux filtres d'ombrage du site (`bg-black/45` et `from-black/80`). L'utilisateur perçoit donc un écran 100 % noir.

---

## 2. Plan d'Action Chirurgical (Zéro Régression)

> [!IMPORTANT]
> Conformément à votre consigne stricte : **SEULE cette correction sera effectuée**, sans modifier aucun autre composant, style, texte ou page du site.

### Étape 1 : Extraction d'un poster synchronisé à partir de `abbyshort.mp4`
- Extraire la toute première frame haute définition de la vidéo `abbyshort.mp4` sous forme de poster (`/video-poster.jpg`).
- **Effet** : Dès l'ouverture sur iPhone, l'utilisateur voit immédiatement l'image du plat/sanctuaire sans aucun flash noir, avant même le premier millième de seconde de lecture.

### Étape 2 : Nettoyage de la balise `<video>` pour conformité WebKit
- Supprimer l'attribut `src="..."` redondant sur la balise `<video>` pour forcer WebKit à utiliser les balises `<source>` hiérarchisées :
  1. `<source src="${bgVideo}" type="video/mp4" />`
  2. `<source src="/video-bg.mp4" type="video/mp4" />`

### Étape 3 : Initialisation robuste dans le cycle de vie React (`HomeView.tsx`)
- Appeler explicitement `video.load()` dès le montage du composant.
- Verrouiller les propriétés natives iOS : `muted = true`, `defaultMuted = true`, `playsInline = true`.
- Déclencher la lecture avec reprise immédiate sur `loadeddata`, `canplaythrough`, `pageshow`, et sur la première interaction tactile (`touchstart` / `pointerdown`).

---

## 3. Matrice de Validation

- [ ] La vidéo tourne en boucle continue sur iPhone (Safari et Chrome).
- [ ] Aucun écran noir au chargement ni au défilement.
- [ ] Zéro modification sur le reste de l'application (menus, curseur, contact, typographies).
