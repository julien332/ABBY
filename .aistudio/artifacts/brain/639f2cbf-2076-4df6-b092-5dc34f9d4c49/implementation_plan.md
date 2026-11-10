# Plan d'Optimisation SEO Technique & Référencement Naturel — ABBY Paris

Mettre en place l'ensemble des standards SEO de pointe pour positionner le restaurant ABBY en première position sur Google ("pâtes fraîches Paris", "meilleures pâtes Paris 9"), garantir un affichage parfait sur les réseaux sociaux (Open Graph / Twitter) et structurer les données pour Google Rich Snippets avec réservation directe Zenchef.

### Conformité Stricte aux Consignes

> [!IMPORTANT]
> **ZÉRO MODIFICATION DU SITE VISUEL** : L'interface, les composants React, les styles Tailwind, les animations et la navigation restent strictement intacts. L'intervention porte exclusivement sur la couche SEO (`index.html`, `public/robots.txt`, `public/sitemap.xml`, `public/og-image.png`).

---

## 1. Vue d'Ensemble des Optimisations SEO

```
[ Moteurs de recherche & Réseaux sociaux ]
                     │
     ┌───────────────┼───────────────┐
     ▼               ▼               ▼
[ Googlebot ]   [ Rich Cards ]   [ Schema.org JSON-LD ]
  robots.txt      Open Graph       Restaurant + Geo
  sitemap.xml     Twitter Card     ReserveAction (Zenchef)
  canonical       og-image.png     Menu & Horaires
```

- **Nom officiel** : ABBY
- **Titre SEO ciblé** : `ABBY - BEST PASTA FRESCA | Restaurant Pâtes Fraîches Paris`
- **Domaine officiel** : `https://www.abbyparis.fr`
- **URL canonique** : `https://www.abbyparis.fr/`
- **Adresse** : 36 Rue Condorcet, 75009 Paris
- **Réservations** : `https://module.zenchef.com/fr/restaurant/abby-paris`

---

## 2. Détail Technique des Fichiers

### A. Entête SEO & Données Structurées (`index.html`)
- **Balise `<title>`** : `ABBY - BEST PASTA FRESCA | Restaurant Pâtes Fraîches Paris` (optimisée pour la visibilité sur les mots-clés stratégiques).
- **Meta description** (153 caractères, calibre optimal 145-160 sans troncature Google) :
  `Restaurant de pâtes fraîches maison façonnées sur place à Paris 9. Découvrez nos recettes de saison au 36 Rue Condorcet. Réservez votre table chez ABBY.`
- **Balise Canonique** : `<link rel="canonical" href="https://www.abbyparis.fr/" />`.
- **Open Graph & Twitter Cards** :
  - `og:site_name`, `og:title`, `og:description`, `og:url` (`https://www.abbyparis.fr/`), `og:type` (`restaurant`), `og:locale` (`fr_FR`).
  - `og:image` pointant vers `https://www.abbyparis.fr/og-image.png` (dimensions 1200x630).
  - `twitter:card` (`summary_large_image`), `twitter:title`, `twitter:description`, `twitter:image`.
- **Données structurées Schema.org JSON-LD (Graph complet)** :
  - Types : `["Restaurant", "FoodEstablishment"]`.
  - Coordonnées GPS exactes (latitude `48.8807`, longitude `2.3489`).
  - Adresse postale complète : 36 Rue Condorcet, 75009 Paris.
  - Spécialité et types de cuisine : `["Pâtes fraîches", "Cuisine italienne artisanale"]`.
  - Intégration de l'action de réservation Google **`ReserveAction`** avec `urlTemplate` pointant directement vers Zenchef pour permettre l'apparition du bouton de réservation directement dans les fiches Google Search.
  - Horaires de service, liens vers le menu (`/menu`), la page à propos (`/a-propos`), et le compte Instagram.

### B. Directives d'Indexation (`public/robots.txt`)
- Autorisation globale pour tous les robots d'exploration (Googlebot, Bingbot, etc.).
- Déclaration officielle du sitemap : `Sitemap: https://www.abbyparis.fr/sitemap.xml`.

### C. Plan de Site XML (`public/sitemap.xml`)
- Respect strict de la spécification `sitemaps.org/schemas/sitemap/0.9`.
- Indexation hiérarchisée des routes clés :
  - `https://www.abbyparis.fr/` (priorité 1.0, fréquence `weekly`)
  - `https://www.abbyparis.fr/menu` (priorité 0.9, fréquence `weekly`)
  - `https://www.abbyparis.fr/a-propos` (priorité 0.8, fréquence `monthly`)

### D. Image de Partage Social (`public/og-image.png`)
- Génération d'une image de partage 1200x630 au format PNG dans `/public/og-image.png` à partir du visuel haute définition du restaurant pour assurer un affichage impeccable sur WhatsApp, iMessage, Facebook, LinkedIn et X.

---

## 3. Matrice de Validation

- [ ] Balises `<title>` et meta description conformes aux longueurs recommandées par Google.
- [ ] Validité syntaxique du code JSON-LD Schema.org (conforme aux validateurs Google Rich Results).
- [ ] Validité XML du fichier `sitemap.xml`.
- [ ] Validité du fichier `robots.txt`.
- [ ] Zéro modification visuelle ou comportementale sur le site.
