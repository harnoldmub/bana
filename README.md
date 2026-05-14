# BANA Education - refonte premium

Refonte complète de `bana-edu.org` avec React, TypeScript, Vite, TailwindCSS, composants type shadcn/ui, Framer Motion et une base API Express extensible vers Strapi ou Sanity.

## Lancer le site

```bash
npm install
npm run dev
```

## Lancer l'API préparatoire

```bash
npm run server
```

Endpoints inclus :

- `GET /api/health`
- `GET /api/cms/schema`
- `GET /api/tales`
- `POST /api/tales`
- `GET /api/media`
- `POST /api/media`
- `POST /api/contact`

## Architecture

- `src/App.tsx` : routes publiques complètes et page admin séparée.
- `src/data/content.ts` : contenu éditorial structuré, prêt à remplacer par Strapi/Sanity.
- `server/index.ts` : API Node/Express légère pour contact et schéma CMS.
- `public/assets` : logo officiel et images issues du site actuel.

## Pages

- `/` : accueil immersif.
- `/a-propos` : mission, histoire et timeline.
- `/programmes` : programmes éducatifs.
- `/contes` : Les Veillées de Patricia.
- `/contes/generosite-recompensee` : détail conte avec lecteur MP3.
- `/impact` : chiffres, témoignages et actions.
- `/actualites` : blog et actualités CMS-ready.
- `/actualites/bibliotheque-scolaire-bana` : détail article.
- `/actualites/concours-plume-ecriture` : détail article.
- `/actualites/ateliers-eco-artistiques` : détail article.
- `/galerie` : médias photo/vidéo.
- `/partenaires` : partenaires et sponsors.
- `/contact` : formulaire intelligent.
- `/soutenir` : dons et engagement.
- `/admin` : dashboard admin séparé.

L'accès admin est volontairement placé dans le footer, pas dans le header public.

Les contes sont prévus pour une BDD avec les champs `title`, `object`, `imageUrl`, `body`, `audioUrl`, `status`, `locale` et `author`.

## NLS

Les traductions FR/EN sont centralisées dans `src/i18n.ts`. Le bouton `FR/EN` dans la navigation bascule les libellés principaux et les articles.
