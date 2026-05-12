export type Locale = "fr" | "en";

export const nls = {
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      programs: "Programmes",
      tales: "Contes",
      impact: "Impact",
      news: "Actualités",
      gallery: "Galerie",
      partners: "Partenaires",
      support: "Nous soutenir",
      contact: "Contact",
      resources: "Ressources",
      admin: "Admin",
      donate: "Faire un don"
    },
    common: {
      discoverPrograms: "Découvrir nos programmes",
      supportUs: "Nous soutenir",
      readArticle: "Lire l'article",
      backToNews: "Retour aux actualités",
      readMore: "Lire la suite",
      search: "Recherche",
      theme: "Changer de thème",
      menu: "Menu",
      newsletter: "Newsletter",
      pages: "Pages",
      contact: "Contact",
      emailPlaceholder: "email@exemple.com"
    },
    hero: {
      badge: "Lire, grandir - Kotanga, kokola",
      title: "Éduquer aujourd'hui les jeunes qui transformeront demain.",
      text: "BANA Education crée des ponts entre lecture, culture, numérique et insertion pour donner aux jeunes africains les moyens d'apprendre, d'oser et de bâtir leur avenir.",
      focus: "Projet en focus",
      focusTitle: "Financer une bibliothèque scolaire à Kinshasa",
      engaged: "68% engagé",
      goal: "Objectif impact 2026"
    },
    sections: {
      mission: "Notre mission",
      programs: "Programmes",
      tales: "Contes & oralité",
      impact: "Impact humain",
      news: "Actualités",
      timeline: "Actions & projets",
      gallery: "Galerie",
      partners: "Partenaires & sponsors",
      support: "Nous soutenir"
    },
    mission: {
      title: "Faire de l'accès à l'éducation un droit vécu, pas une promesse.",
      text: "Créée en 2020, BANA est une association à but non lucratif qui accompagne les jeunes en situation de précarité tout au long de leur parcours scolaire. À travers ses bibliothèques et ses actions terrain, l'organisation éveille la curiosité, renforce les compétences et redonne confiance.",
      values: ["Lecture et expression", "Culture africaine vivante", "Égalité des chances", "Innovation éducative"]
    },
    news: {
      title: "Actualités, projets et contenus éditoriaux de BANA.",
      detailEyebrow: "Article",
      latest: "Dernières actualités"
    },
    admin: {
      eyebrow: "Administration séparée",
      title: "Dashboard BANA",
      ready: "Strapi / Sanity prêt",
      pipeline: "File éditoriale",
      multilingual: "Contenus multilingues",
      multilingualText: "Collections prêtes pour pages, articles, médias, partenaires, témoignages et contes FR/EN."
    }
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      programs: "Programs",
      tales: "Stories",
      impact: "Impact",
      news: "News",
      gallery: "Gallery",
      partners: "Partners",
      support: "Support us",
      contact: "Contact",
      resources: "Resources",
      admin: "Admin",
      donate: "Donate"
    },
    common: {
      discoverPrograms: "Explore programs",
      supportUs: "Support us",
      readArticle: "Read article",
      backToNews: "Back to news",
      readMore: "Read more",
      search: "Search",
      theme: "Switch theme",
      menu: "Menu",
      newsletter: "Newsletter",
      pages: "Pages",
      contact: "Contact",
      emailPlaceholder: "email@example.com"
    },
    hero: {
      badge: "Read, grow - Kotanga, kokola",
      title: "Educating today the young people who will transform tomorrow.",
      text: "BANA Education builds bridges between reading, culture, digital skills and inclusion so young Africans can learn, dare and shape their future.",
      focus: "Featured project",
      focusTitle: "Fund a school library in Kinshasa",
      engaged: "68% pledged",
      goal: "2026 impact goal"
    },
    sections: {
      mission: "Our mission",
      programs: "Programs",
      tales: "Stories & oral tradition",
      impact: "Human impact",
      news: "News",
      timeline: "Actions & projects",
      gallery: "Gallery",
      partners: "Partners & sponsors",
      support: "Support us"
    },
    mission: {
      title: "Making access to education a lived right, not just a promise.",
      text: "Founded in 2020, BANA is a non-profit organization supporting young people in vulnerable situations throughout their education. Through libraries and field programs, BANA sparks curiosity, strengthens skills and restores confidence.",
      values: ["Reading and expression", "Living African culture", "Equal opportunity", "Educational innovation"]
    },
    news: {
      title: "BANA news, projects and editorial stories.",
      detailEyebrow: "Article",
      latest: "Latest news"
    },
    admin: {
      eyebrow: "Separate administration",
      title: "BANA Dashboard",
      ready: "Strapi / Sanity ready",
      pipeline: "Editorial pipeline",
      multilingual: "Multilingual content",
      multilingualText: "Collections are ready for pages, articles, media, partners, testimonials and FR/EN stories."
    }
  }
} as const;
