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
    slug: "generosite-recompensee",
    title: "La Générosité récompensée",
    object: "Générosité, courage et protection de la nature",
    image: "/assets/action-library.jpg",
    audioUrl: "/assets/audio/generosite-recompensee.mp3",
    status: "Audio disponible",
    duration: "9 min",
    excerpt: "L'histoire de Sawa, jeune fille généreuse du village Tanganyika, dont la bonté envers les hommes et les animaux finit par sauver tout son peuple.",
    text: "Dans le village Tanganyika, Sawa accueille les visiteurs avec bonté et partage. Mais lorsque le chef Mwami, aveuglé par l'ambition, provoque la colère du dieu de la pluie, le village est submergé. Au péril de sa vie, Sawa part demander pardon à Mvula. Sa générosité envers Rouka le singe et Kombe-Kombe l'épervier lui revient alors comme une protection. Grâce à son courage, les eaux se retirent et le peuple choisit une nouvelle reine.",
    body: [
      "Dans le village Tanganyika, vivaient heureux des paisibles citoyens. On pouvait ressentir l'harmonie et la convivialité qui régnaient dès qu'on posait ses pieds à la grande hutte de Sawa, positionnée à l'entrée du village.",
      "Sawa était une jeune fille à la peau noir ébène, cheveux soigneusement tressés. Elle portait toujours son sourire éclatant et son regard chaleureux comme sa plus belle robe. Elle était si accueillante que toute personne qui passait par le village Tanganyika gardait souvenir d'elle. Elle aimait se tenir à l'entrée du village, prononçant ce mot de bienvenue à tout visiteur : « Karibu » !",
      "En effet, Karibu veut dire « Bienvenue chez nous » en Swahili, langue parlée dans toute la région. Ensuite, elle présentait ses petits paniers de fruits, joliment décorés en dégustation, avant de se diriger vers le sentier qui menait à la galerie d'art, où tous les artisans exposaient leur savoir-faire.",
      "Sawa était également l'amie des animaux. Elle les nourrissait régulièrement, à l'instar de Rouka, le singe et Kombe-Kombe, l'épervier. Elle était si aimable que son aura enchantait toute personne qui croisait sa route.",
      "Cependant, le succès de Sawa n'était pas toujours vu d'un bon oeil. Mwami le chef du village devenait de plus en plus agacé par les éloges que ses invités faisaient au sujet de Sawa. Il décida alors de faire du village Tanganyika un énorme marché commercial, avec l'intention d'exploiter le talent de Sawa et des artisans à son propre intérêt.",
      "Aussitôt dit, le Mwami se rendit dans la grotte du village invoquer Mvula, le dieu de la pluie. Il exigea que la pluie tombe dès le soir même, malgré la saison sèche. Mécontent de son attitude, Mvula fit tomber un violent torrent. Le village fut piégé par les eaux, les récoltes inondées et la détresse s'installa.",
      "Touchée par la souffrance de ses concitoyens, Sawa décida d'aller voir le chef, au péril de sa vie. Elle demanda l'autorisation d'aller présenter des excuses à Mvula, au nom du village, afin d'arrêter les souffrances.",
      "Le chef accepta, mais lui tendit une amulette prétendument protectrice. En réalité, il préparait déjà un piège. Il ordonna à ses guerriers d'attaquer Sawa sur la route avant qu'elle n'arrive à destination.",
      "Les guerriers capturèrent Sawa et s'apprêtèrent à l'immoler. Heureusement, Rouka, le singe qu'elle avait nourri depuis son enfance, demanda l'aide des gorilles. Comme une véritable armée, ils descendirent des arbres, assommèrent les guerriers et sauvèrent Sawa.",
      "Le lendemain, Sawa reprit la route accompagnée de ses nouveaux amis primates. À l'approche du domaine sacré de Mvula, une violente tempête l'emporta dans les airs. Sa chute aurait pu être fatale, mais Kombe-Kombe, l'épervier, la recueillit sous ses ailes.",
      "Kombe-Kombe lui demanda aussitôt de jeter l'amulette du Mwami, car elle contenait un esprit maléfique. Sawa comprit alors qu'elle avait été trahie.",
      "Soudain, Sawa se retrouva devant le dieu de la pluie. Tremblante mais courageuse, elle supplia Mvula de pardonner au Mwami et de délivrer le village des eaux.",
      "Attendri, Mvula lui révéla qu'il était aussi Kombe-Kombe, l'épervier qui venait souvent au village. Il connaissait la générosité de Sawa, car elle l'avait toujours nourri avec bonté. Grâce à elle, tout le village serait sauvé.",
      "Mvula redevint épervier et ramena Sawa jusqu'au village. Dès qu'elle posa les pieds sur la flotte, les eaux se retirèrent et la terre redevint ferme.",
      "Les villageois, témoins de ce miracle, acclamèrent Sawa. Reconnaissant son courage, son dévouement et sa bonté, ils décidèrent de détrôner le Mwami et de faire de Sawa la nouvelle reine de Tanganyika.",
      "Ainsi s'acheva la tyrannie du Mwami. Les habitants retrouvèrent leur tranquillité, vivant en harmonie les uns avec les autres, tout en respectant la nature qui les entoure."
    ]
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
  { label: "Contes", count: 1, icon: Clapperboard },
  { label: "Partenaires", count: 12, icon: HandHeart },
  { label: "Témoignages", count: 9, icon: Lightbulb },
  { label: "Pages", count: 6, icon: Leaf }
];
