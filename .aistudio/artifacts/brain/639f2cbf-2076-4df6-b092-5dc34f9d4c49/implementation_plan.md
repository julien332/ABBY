# Plan d'Implémentation — Scroll Snap & Section "Horaires & Carte"

Optimisation de la page d'accueil d'ABBY avec transition de défilement plein écran directe ("scroll snap" 2026), indicateur visuel en bas d'écran, et nouvelle section dédiée aux horaires d'ouverture et à la carte interactive.

---

## 1. Analyse & Objectifs

- **Interaction de défilement** : Navigation verticale fluide et directe avec **CSS Scroll Snap** (`snap-y snap-mandatory`), garantissant un calage parfait section par section (Section 1 : Hero Vidéo → Section 2 : Horaires & Carte).
- **Indicateur visuel 2026 sur la Home** : Ligne verticale animée minimaliste et typographie éditoriale discrète (`HORAIRES & PLAN ↓`), signalant clairement le contenu en contrebas et permettant un défilement instantané au clic.
- **Section 2 — Sanctuaire, Horaires & Carte** :
  - **Horaires détaillés** conformes à la fiche restaurant :
    - *Mardi au Dimanche* : 12h00 – 14h30 & 19h30 – 23h00
    - *Lundi* : Fermeture hebdomadaire
  - **Adresse & Métros** : 36 Rue Condorcet, 75009 Paris (Métros Anvers, Cadet, Poissonnière).
  - **Carte interactive sombre** : Plan interactif immersif centré sur le restaurant avec repère géolocalisé, bouton direct "Ouvrir dans Google Maps" / "Itinéraire" et bouton de réservation Zenchef.
  - **Bouton de retour en haut** : Pour remonter en douceur vers le Hero vidéo.
- **Règle absolue** : Ne modifier aucun autre composant ni aucune autre route (`/menu`, `/a-propos`, `ContactModal`, `CustomCursor`, `index.html`, `robots.txt`, `sitemap.xml`).

---

## 2. Architecture Technique

### A. Adaptation de `src/components/HomeView.tsx`
1. **Conteneur Principal** :
   - Remplacement de l'`overflow-hidden` figé par un conteneur défilable optimisé : `h-[100dvh] overflow-y-auto snap-y snap-mandatory scroll-smooth`.
   - Maintien du fond vidéo en arrière-plan fixe (`fixed inset-0 pointer-events-none`) avec son poster HD et ses réglages de lecture automatique sans faille pour mobile et iOS.

2. **Section 1 (Hero Principal — `snap-start min-h-[100dvh]`)** :
   - Conservation intégrale de la mise en page actuelle (titre poétique, motif géométrique, bouton "Réserver une table", grand logo officiel ABBY).
   - Ajout au bas de la section de l'indicateur 2026 :
     - Trait vertical fin pulsant avec animation fluide CSS.
     - Mention typographique délicate : `36 RUE CONDORCET · HORAIRES & PLAN ↓`.
     - Clic / touch menant directement par smooth-scroll à la Section 2.

3. **Section 2 (Horaires & Carte — `snap-start min-h-[100dvh]`)** :
   - Fond sombre élégant (`bg-[#1c1c1c]/92 backdrop-blur-xl border-t border-white/10`).
   - Disposition responsive en 2 colonnes (sur grand écran) / empilée (sur smartphone) :
     - **Colonne Gauche — Horaires & Accès** :
       - Titre éditorial : `HORAIRES & ACCÈS AU TEMPLE`.
       - Grille des horaires (Déjeuner 12h00 - 14h30 / Dîner 19h30 - 23h00 / Lundi fermé).
       - Coordonnées : 36 Rue Condorcet, 75009 Paris.
       - Accès Métro : Anvers (Ligne 2), Poissonnière (Ligne 7), Cadet (Ligne 7).
       - Boutons d'action : "Itinéraire Google Maps" (lien externe direct) et "Réserver une table" (Zenchef).
     - **Colonne Droite — Carte interactive sombre** :
       - Carte interactive intégrée stylisée (OpenStreetMap / CartoDB Dark Matter ou Google Maps Dark), avec marqueur sur le 36 Rue Condorcet.
       - Contrôles de navigation clairs et fluides.

### B. Intégrité & Préservation
- Aucun impact sur la Navbar, la modale de contact, le menu ou la page À propos.
- Prise en charge du curseur personnalisé sur les nouveaux éléments interactifs.

---

## 3. Étapes d'Exécution

1. **Mise à jour de `src/components/HomeView.tsx`** :
   - Implémentation du système de scroll snap à deux sections (`h-[100dvh] snap-y snap-mandatory`).
   - Intégration de l'indicateur visuel animé 2026 sur le Hero.
   - Création de la section Horaires d'ouverture & Carte interactive avec boutons d'action.
2. **Contrôle & Validation** :
   - Exécution de `compile_applet` et `lint_applet` pour garantir 0 erreur TypeScript / ESLint.
   - Test du scroll snap et de la responsivité mobile / desktop.
3. **Mise en ligne & dev server** :
   - Redémarrage propre du serveur de développement et validation finale.
