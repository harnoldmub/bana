# CMS BANA

Le front utilise actuellement `src/data/content.ts` comme source éditoriale locale. Pour brancher un CMS :

- Sanity : importer `cms/sanity-schema.ts` dans le studio.
- Strapi : créer les collections équivalentes `article`, `tale`, `program`, `partner`, `testimonial`, `mediaAsset`.
- Contes : la collection `tale` alimente la page **Les Veillées de Patricia** avec `object` (objet/sujet), `image`, texte complet, audio raconté et statut de production.
- Multilingue : chaque collection éditoriale prévoit un champ `locale` (`fr`, `en`).
- Médias : conserver les textes alternatifs pour l'accessibilité AA.

Le serveur Express expose déjà `GET /api/cms/schema` pour documenter les collections attendues côté intégration.
