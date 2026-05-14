import cors from "cors";
import express from "express";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const taleRecords = [
  {
    id: "tale-001",
    title: "La Générosité récompensée",
    slug: "generosite-recompensee",
    locale: "fr",
    author: "Patricia",
    object: "Générosité, courage et protection de la nature",
    imageUrl: "/assets/action-library.jpg",
    excerpt: "L'histoire de Sawa, jeune fille généreuse du village Tanganyika.",
    body: "Dans le village Tanganyika, Sawa accueille les visiteurs avec bonté. Quand la colère du dieu de la pluie submerge le village, son courage et sa générosité finissent par sauver tout son peuple.",
    audioUrl: "/assets/audio/generosite-recompensee.mp3",
    status: "audio_available",
    publishedAt: null
  }
];

const mediaRecords = [
  { id: "media-001", title: "Bibliothèque BANA", type: "image", assetUrl: "/assets/action-library.jpg", alt: "Bibliothèque scolaire BANA", credit: "BANA Education" }
];

const cmsSchema = {
  pages: ["home", "mission", "programs", "impact", "contact"],
  collections: {
    articles: ["title", "slug", "locale", "category", "excerpt", "coverImage", "body", "publishedAt"],
    tales: ["title", "slug", "locale", "author", "object", "imageUrl", "excerpt", "body", "audioUrl", "status", "publishedAt"],
    media: ["title", "type", "assetUrl", "alt", "credit"],
    partners: ["name", "logo", "website", "tier"],
    testimonials: ["quote", "name", "role", "locale"],
    programs: ["title", "description", "icon", "status", "locale"]
  },
  integrations: {
    cms: "Strapi ou Sanity",
    payments: "Stripe / PayPal à connecter plus tard",
    newsletter: "Brevo / Mailchimp / Resend"
  }
};

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "BANA Education API" });
});

app.get("/api/cms/schema", (_req, res) => {
  res.json(cmsSchema);
});

app.get("/api/tales", (_req, res) => {
  res.json(taleRecords);
});

app.post("/api/tales", (req, res) => {
  const tale = {
    id: `tale-${String(taleRecords.length + 1).padStart(3, "0")}`,
    title: req.body.title,
    slug: req.body.slug,
    locale: req.body.locale ?? "fr",
    author: req.body.author ?? "Patricia",
    object: req.body.object,
    imageUrl: req.body.imageUrl,
    excerpt: req.body.excerpt,
    body: req.body.body,
    audioUrl: req.body.audioUrl ?? "",
    status: req.body.status ?? "draft",
    publishedAt: req.body.publishedAt ?? null
  };

  taleRecords.push(tale);
  res.status(201).json(tale);
});

app.get("/api/media", (_req, res) => {
  res.json(mediaRecords);
});

app.post("/api/media", (req, res) => {
  const media = {
    id: `media-${String(mediaRecords.length + 1).padStart(3, "0")}`,
    title: req.body.title,
    type: req.body.type,
    assetUrl: req.body.assetUrl,
    alt: req.body.alt,
    credit: req.body.credit ?? "BANA Education"
  };

  mediaRecords.push(media);
  res.status(201).json(media);
});

app.post("/api/contact", (req, res) => {
  res.status(202).json({
    ok: true,
    message: "Demande reçue. Connecter ce handler à un CRM, une boîte email ou un workflow Strapi."
  });
});

app.listen(port, () => {
  console.log(`BANA API listening on http://localhost:${port}`);
});
