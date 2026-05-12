export const banaSchema = [
  {
    name: "article",
    title: "Article",
    type: "document",
    fields: [
      { name: "title", title: "Titre", type: "string" },
      { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
      { name: "locale", title: "Langue", type: "string", options: { list: ["fr", "en"] } },
      { name: "category", title: "Catégorie", type: "string" },
      { name: "excerpt", title: "Résumé", type: "text" },
      { name: "coverImage", title: "Image de couverture", type: "image", options: { hotspot: true } },
      { name: "body", title: "Contenu", type: "array", of: [{ type: "block" }] },
      { name: "publishedAt", title: "Date de publication", type: "datetime" }
    ]
  },
  {
    name: "tale",
    title: "Conte",
    type: "document",
    fields: [
      { name: "title", title: "Titre", type: "string" },
      { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
      { name: "locale", title: "Langue", type: "string", options: { list: ["fr", "en"] } },
      { name: "author", title: "Conteuse / écrivaine", type: "string", initialValue: "Patricia" },
      { name: "object", title: "Objet / sujet du conte", type: "string" },
      { name: "image", title: "Image du conte", type: "image", options: { hotspot: true } },
      { name: "excerpt", title: "Résumé", type: "text" },
      { name: "body", title: "Texte du conte", type: "array", of: [{ type: "block" }] },
      { name: "audioUrl", title: "Audio raconté", type: "url" },
      { name: "status", title: "Statut", type: "string", options: { list: ["texte", "audio", "publié"] } },
      { name: "publishedAt", title: "Date de publication", type: "datetime" }
    ]
  },
  {
    name: "program",
    title: "Programme",
    type: "document",
    fields: [
      { name: "title", title: "Titre", type: "string" },
      { name: "locale", title: "Langue", type: "string", options: { list: ["fr", "en"] } },
      { name: "description", title: "Description", type: "text" },
      { name: "icon", title: "Icône", type: "string" },
      { name: "status", title: "Statut", type: "string", options: { list: ["active", "draft", "archived"] } }
    ]
  },
  {
    name: "partner",
    title: "Partenaire",
    type: "document",
    fields: [
      { name: "name", title: "Nom", type: "string" },
      { name: "logo", title: "Logo", type: "image" },
      { name: "website", title: "Site web", type: "url" },
      { name: "tier", title: "Niveau", type: "string" }
    ]
  },
  {
    name: "testimonial",
    title: "Témoignage",
    type: "document",
    fields: [
      { name: "quote", title: "Citation", type: "text" },
      { name: "name", title: "Nom", type: "string" },
      { name: "role", title: "Rôle", type: "string" },
      { name: "locale", title: "Langue", type: "string", options: { list: ["fr", "en"] } }
    ]
  },
  {
    name: "mediaAsset",
    title: "Média",
    type: "document",
    fields: [
      { name: "title", title: "Titre", type: "string" },
      { name: "type", title: "Type", type: "string", options: { list: ["image", "video"] } },
      { name: "asset", title: "Fichier", type: "file" },
      { name: "alt", title: "Texte alternatif", type: "string" },
      { name: "credit", title: "Crédit", type: "string" }
    ]
  }
];
