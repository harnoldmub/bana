import {
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Clapperboard,
  GraduationCap,
  HandHeart,
  Laptop,
  Leaf,
  Lightbulb,
  MessageCircleHeart,
  UsersRound
} from "lucide-react";

export const nav = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "Programmes", href: "/programmes" },
  { label: "Contes", href: "/contes" },
  { label: "Impact", href: "/impact" },
  { label: "Actualités", href: "/actualites" }
];

export const resourceNav = [
  { label: "Galerie", href: "/galerie" },
  { label: "Partenaires", href: "/partenaires" },
  { label: "Nous soutenir", href: "/soutenir" },
  { label: "Contact", href: "/contact" }
];

export const stats = [
  { value: 2000, suffix: "+", label: "élèves et enseignants touchés" },
  { value: 60, suffix: "+", label: "jeunes filles formées à l'écriture" },
  { value: 20, suffix: "", label: "lauréates récompensées" },
  { value: 1, suffix: "", label: "bibliothèque scolaire pilote" }
];

export const programs = [
  {
    icon: BookOpen,
    title: "Lecture & bibliothèques",
    text: "Créer des lieux de lecture vivants dans les écoles et quartiers pour ouvrir l'imaginaire et renforcer les apprentissages.",
    tone: "bg-[#fff8ed]"
  },
  {
    icon: GraduationCap,
    title: "Formation",
    text: "Ateliers d'écriture, expression orale, culture générale et compétences fondamentales pour progresser avec confiance.",
    tone: "bg-[#eef6ef]"
  },
  {
    icon: MessageCircleHeart,
    title: "Mentorat",
    text: "Relier jeunes, bénévoles, auteurs et éducateurs autour d'un accompagnement exigeant, bienveillant et régulier.",
    tone: "bg-[#eef5fb]"
  },
  {
    icon: Laptop,
    title: "Numérique",
    text: "Initier aux usages utiles du digital, à la recherche, aux outils créatifs et à la citoyenneté numérique.",
    tone: "bg-[#f4f0ff]"
  },
  {
    icon: BriefcaseBusiness,
    title: "Entrepreneuriat",
    text: "Transformer les idées en projets concrets avec des formats pratiques, du prototypage et des rencontres inspirantes.",
    tone: "bg-[#fff2e9]"
  },
  {
    icon: UsersRound,
    title: "Insertion",
    text: "Préparer l'orientation, les soft skills et les passerelles vers des opportunités éducatives et professionnelles.",
    tone: "bg-[#edf7f5]"
  }
];

export const storyWorld = {
  name: "Les Veillées de Patricia",
  baseline: "Des contes écrits et racontés par Patricia pour transmettre, émerveiller et faire grandir.",
  description:
    "Un espace éditorial dédié aux contes de Patricia, pensé pour publier les textes et proposer une première version audio racontée.",
  formats: [
    { label: "Texte", text: "Contes publiés sur le site avec lecture confortable, chapitrage et partage social.", icon: BookOpen },
    { label: "Voix", text: "Récits racontés dans un premier temps en audio, avec une identité sonore douce et reconnaissable.", icon: MessageCircleHeart }
  ]
};

export const tales = [
  {
    slug: "la-petite-graine-qui-voulait-lire",
    title: "La petite graine qui voulait lire",
    object: "Patience et amour de la lecture",
    image: "/assets/action-library.jpg",
    status: "Audio bientôt disponible",
    duration: "6 min",
    excerpt: "Un conte tendre sur la patience, la curiosité et le pouvoir des livres dans la vie d'un enfant.",
    text: "Au bord d'une cour d'école, une petite graine rêvait de devenir un grand arbre sous lequel les enfants viendraient lire."
  },
  {
    slug: "le-cahier-aux-ailes-bleues",
    title: "Le cahier aux ailes bleues",
    object: "Confiance, écriture et prise de parole",
    image: "/assets/action-writing.jpg",
    status: "En écriture",
    duration: "8 min",
    excerpt: "Une histoire inspirante pour encourager les jeunes filles à prendre la parole et à croire en leurs idées.",
    text: "Chaque soir, un cahier bleu ouvrait ses ailes et emportait les mots d'une jeune fille plus loin que sa peur."
  },
  {
    slug: "la-riviere-des-mots",
    title: "La rivière des mots",
    object: "Transmission orale et mémoire collective",
    image: "/assets/action-planet.jpg",
    status: "Texte en préparation",
    duration: "45 sec",
    excerpt: "Un conte poétique pensé pour transmettre la mémoire des mots, entre narration orale et message éducatif.",
    text: "Dans un village, une rivière gardait les mots anciens et les murmurait aux enfants qui savaient écouter."
  }
];

export const posts = [
  {
    slug: "bibliotheque-scolaire-bana",
    title: "Bibliothèque scolaire BANA",
    titleEn: "BANA School Library",
    category: "Éducation",
    categoryEn: "Education",
    date: "12 Fév",
    image: "/assets/action-library.jpg",
    excerpt: "Première bibliothèque installée au Complexe scolaire Vedruna, à Ndjili, pour faire de la lecture un réflexe quotidien.",
    excerptEn: "The first BANA library was opened at the Vedruna school complex in Ndjili, making reading a daily habit.",
    body: [
      "La bibliothèque scolaire BANA marque une étape importante dans la mission de l'association : offrir aux enfants un espace de lecture accessible, beau et vivant.",
      "Installée au Complexe scolaire Vedruna, elle accompagne les élèves et le corps enseignant avec des livres, des temps d'animation et des activités qui renforcent l'apprentissage.",
      "Ce projet pilote ouvre la voie à une chaîne de bibliothèques scolaires pensées comme des lieux de confiance, de curiosité et d'ambition."
    ],
    bodyEn: [
      "The BANA school library is a major step in the organization's mission: giving children access to a welcoming, beautiful and active reading space.",
      "Located at the Vedruna school complex, it supports students and teachers with books, reading sessions and activities that strengthen learning.",
      "This pilot project opens the way for a network of school libraries designed as places of trust, curiosity and ambition."
    ]
  },
  {
    slug: "concours-plume-ecriture",
    title: "Concours Plume d'écriture",
    titleEn: "Plume Writing Contest",
    category: "Écriture",
    categoryEn: "Writing",
    date: "11 Mai",
    image: "/assets/action-writing.jpg",
    excerpt: "Des jeunes filles formées à l'écriture de contes merveilleux, puis célébrées pour leur talent et leur audace.",
    excerptEn: "Young girls trained in writing wonderful tales, then celebrated for their talent and boldness.",
    body: [
      "Le concours Plume d'écriture révèle des voix jeunes, créatives et puissantes. Il donne aux participantes un cadre pour écrire, structurer une histoire et prendre confiance.",
      "Les ateliers préparent les jeunes filles à imaginer des personnages, construire un récit et défendre leur univers avec fierté.",
      "Au-delà des prix, le programme installe une conviction : écrire, c'est aussi apprendre à prendre sa place."
    ],
    bodyEn: [
      "The Plume Writing Contest reveals young, creative and powerful voices. It gives participants a framework to write, structure a story and build confidence.",
      "The workshops help girls imagine characters, shape a narrative and proudly share their world.",
      "Beyond the awards, the program carries one belief: writing is also learning to take your place."
    ]
  },
  {
    slug: "ateliers-eco-artistiques",
    title: "Ateliers éco-artistiques",
    titleEn: "Eco-Art Workshops",
    category: "Art & nature",
    categoryEn: "Art & nature",
    date: "11 Mai",
    image: "/assets/action-planet.jpg",
    excerpt: "Le projet Ma Planète éveille la créativité et la conscience écologique dès le plus jeune âge.",
    excerptEn: "The Ma Planète project awakens creativity and environmental awareness from an early age.",
    body: [
      "Les ateliers éco-artistiques relient création, nature et responsabilité. Les enfants apprennent à observer leur environnement et à le transformer en matière d'expression.",
      "À travers le dessin, le recyclage créatif et les échanges, ils développent une conscience écologique simple, concrète et joyeuse.",
      "BANA veut faire de ces ateliers un rendez-vous régulier pour éveiller l'imagination tout en cultivant le respect du vivant."
    ],
    bodyEn: [
      "The eco-art workshops connect creativity, nature and responsibility. Children learn to observe their environment and turn it into a source of expression.",
      "Through drawing, creative recycling and discussion, they build a simple, concrete and joyful environmental awareness.",
      "BANA aims to make these workshops a regular program that awakens imagination while nurturing respect for living things."
    ]
  }
];

export const testimonials = [
  {
    quote: "Grâce à BANA, ma fille a découvert la passion de la lecture. Elle a aujourd'hui confiance en elle et rêve de devenir écrivaine.",
    name: "Amina",
    role: "Parent d'élève"
  },
  {
    quote: "La bibliothèque mise en place par BANA est devenue un lieu d'espoir pour les jeunes de notre quartier.",
    name: "Pasteur Mbuyi",
    role: "Partenaire local"
  },
  {
    quote: "J'ai commencé comme bénévole il y a deux ans. Aujourd'hui, je me sens utile et fière d'accompagner les enfants.",
    name: "Sarah",
    role: "Bénévole"
  }
];

export const timeline = [
  { year: "2020", title: "Naissance de BANA", text: "Une association fondée pour défendre l'accès à la lecture et à l'éducation." },
  { year: "2024", title: "Bibliothèque pilote", text: "Ouverture d'un premier espace scolaire à Kinshasa avec plus de 2000 bénéficiaires." },
  { year: "2025", title: "Écriture & leadership", text: "Ateliers et concours pour révéler les voix créatives des jeunes filles." },
  { year: "2026", title: "Passage à l'échelle", text: "Déploiement de programmes numériques, mentorat et partenariats institutionnels." }
];

export const gallery = [
  "/assets/gallery-1.jpg",
  "/assets/gallery-2.jpg",
  "/assets/gallery-3.jpg",
  "/assets/gallery-4.jpg"
];

export const partners = [
  { name: "Écoles partenaires", type: "Terrain", accent: "bg-logoBlue" },
  { name: "Bénévoles & mentors", type: "Communauté", accent: "bg-logoGreen" },
  { name: "Institutions éducatives", type: "Impact", accent: "bg-logoRed" },
  { name: "Sponsors culturels", type: "Soutien", accent: "bg-logoYellow" }
];

export const supportOptions = [
  {
    title: "Financer une bibliothèque",
    text: "Contribuer à l'installation d'un espace lecture complet dans une école partenaire."
  },
  {
    title: "Soutenir les ateliers",
    text: "Aider à produire les sessions d'écriture, de mentorat et d'éducation numérique."
  },
  {
    title: "Offrir du temps",
    text: "Rejoindre l'équipe de bénévoles pour accompagner les jeunes et relayer les actions."
  }
];

export const cmsCollections = [
  { label: "Articles", count: 18, icon: ArrowUpRight },
  { label: "Médias", count: 124, icon: BookOpen },
  { label: "Contes", count: 3, icon: Clapperboard },
  { label: "Partenaires", count: 12, icon: HandHeart },
  { label: "Témoignages", count: 9, icon: Lightbulb },
  { label: "Pages", count: 6, icon: Leaf }
];
