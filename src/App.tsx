import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  CirclePlay,
  Globe2,
  LayoutDashboard,
  Mail,
  Menu,
  Moon,
  PlayCircle,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  SunMedium,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatedCounter } from "./components/AnimatedCounter";
import { Button } from "./components/Button";
import {
  cmsCollections,
  gallery,
  nav,
  partners,
  posts,
  programs,
  resourceNav,
  stats,
  storyWorld,
  supportOptions,
  tales,
  testimonials,
  timeline
} from "./data/content";
import { nls, type Locale } from "./i18n";
import { cn } from "./lib/utils";

type StaticRoute =
  | "/"
  | "/a-propos"
  | "/programmes"
  | "/contes"
  | "/impact"
  | "/actualites"
  | "/galerie"
  | "/partenaires"
  | "/contact"
  | "/soutenir"
  | "/admin";
type Route = StaticRoute | `/actualites/${string}` | `/contes/${string}`;

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 }
};

const routeTitles: Record<StaticRoute, string> = {
  "/": "Accueil",
  "/a-propos": "À propos",
  "/programmes": "Programmes",
  "/contes": "Les Veillées de Patricia",
  "/impact": "Impact",
  "/actualites": "Actualités",
  "/galerie": "Galerie",
  "/partenaires": "Partenaires",
  "/contact": "Contact",
  "/soutenir": "Nous soutenir",
  "/admin": "Admin"
};

function normalizePath(pathname: string): Route {
  const known = Object.keys(routeTitles) as StaticRoute[];
  if (pathname.startsWith("/actualites/")) return pathname as `/actualites/${string}`;
  if (pathname.startsWith("/contes/")) return pathname as `/contes/${string}`;
  return known.includes(pathname as StaticRoute) ? (pathname as StaticRoute) : "/";
}

function routeBase(route: Route): StaticRoute {
  if (route.startsWith("/actualites/")) return "/actualites";
  if (route.startsWith("/contes/")) return "/contes";
  return route as StaticRoute;
}

const SITE_URL = "https://bana-edu.org";

type SeoData = {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
};

function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | HTMLScriptElement | null;
  if (!element) {
    if (attributes.rel === "canonical") {
      element = document.createElement("link");
    } else if (attributes.type === "application/ld+json") {
      element = document.createElement("script");
    } else {
      element = document.createElement("meta");
    }
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === "textContent") {
      element!.textContent = value;
    } else {
      element!.setAttribute(key, value);
    }
  });
}

function getSeoData(route: Route, locale: Locale): SeoData {
  const postSlug = route.startsWith("/actualites/") ? route.replace("/actualites/", "") : "";
  const post = posts.find((item) => item.slug === postSlug);
  if (post) {
    const title = locale === "en" ? post.titleEn : post.title;
    const description = locale === "en" ? post.excerptEn : post.excerpt;
    return {
      title: `${title} | BANA Education`,
      description,
      image: post.image,
      type: "article",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        image: absoluteUrl(post.image),
        author: { "@type": "Organization", name: "BANA Education" },
        publisher: {
          "@type": "EducationalOrganization",
          name: "BANA Education",
          logo: { "@type": "ImageObject", url: absoluteUrl("/assets/bana-logo.png") }
        },
        mainEntityOfPage: absoluteUrl(route)
      }
    };
  }

  const taleSlug = route.startsWith("/contes/") ? route.replace("/contes/", "") : "";
  const tale = tales.find((item) => item.slug === taleSlug);
  if (tale) {
    return {
      title: `${tale.title} | Les Veillées de Patricia`,
      description: tale.excerpt,
      image: tale.image,
      type: "article",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: tale.title,
        description: tale.excerpt,
        image: absoluteUrl(tale.image),
        inLanguage: "fr",
        author: { "@type": "Person", name: "Patricia" },
        audio: tale.audioUrl ? { "@type": "AudioObject", contentUrl: absoluteUrl(tale.audioUrl), duration: "PT9M3S" } : undefined
      }
    };
  }

  const pageSeo: Record<StaticRoute, SeoData> = {
    "/": {
      title: "BANA Education | Lire, grandir, agir",
      description: "BANA Education accompagne les jeunes africains par la lecture, les contes, le mentorat, le numérique, l'entrepreneuriat et l'insertion.",
      image: "/assets/hero-bana.jpg",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        name: "BANA Education",
        url: SITE_URL,
        logo: absoluteUrl("/assets/bana-logo.png"),
        description: "Organisation éducative africaine engagée pour l'accès à la lecture, la culture et l'impact social."
      }
    },
    "/a-propos": {
      title: "À propos | BANA Education",
      description: "Découvrez la mission, l'histoire et les valeurs de BANA Education, association éducative africaine engagée pour l'égalité des chances.",
      image: "/assets/mission.jpg"
    },
    "/programmes": {
      title: "Programmes éducatifs | BANA Education",
      description: "Formation, accompagnement, mentorat, numérique, entrepreneuriat et insertion pour les jeunes africains.",
      image: "/assets/action-library.jpg"
    },
    "/contes": {
      title: "Les Veillées de Patricia | BANA Education",
      description: "Découvrez les contes écrits et racontés par Patricia, avec texte, image, objet pédagogique et version audio.",
      image: "/assets/action-library.jpg"
    },
    "/impact": {
      title: "Impact social | BANA Education",
      description: "Chiffres clés, témoignages et projets qui montrent l'impact de BANA Education auprès des jeunes et des communautés.",
      image: "/assets/gallery-1.jpg"
    },
    "/actualites": {
      title: "Actualités | BANA Education",
      description: "Retrouvez les actualités, projets, articles et reportages de BANA Education.",
      image: "/assets/action-writing.jpg"
    },
    "/galerie": {
      title: "Galerie photo et vidéo | BANA Education",
      description: "Images et médias des actions éducatives, culturelles et sociales de BANA Education.",
      image: "/assets/gallery-2.jpg"
    },
    "/partenaires": {
      title: "Partenaires et sponsors | BANA Education",
      description: "Découvrez les partenaires, sponsors, écoles et relais institutionnels qui soutiennent BANA Education.",
      image: "/assets/gallery-3.jpg"
    },
    "/contact": {
      title: "Contact | BANA Education",
      description: "Contactez BANA Education pour un partenariat, du bénévolat, du mécénat ou une demande presse.",
      image: "/assets/gallery-4.jpg"
    },
    "/soutenir": {
      title: "Nous soutenir | BANA Education",
      description: "Soutenez BANA Education et contribuez à financer les bibliothèques, ateliers et programmes éducatifs.",
      image: "/assets/hero-bana.jpg"
    },
    "/admin": {
      title: "Admin | BANA Education",
      description: "Espace d'administration BANA Education.",
      image: "/assets/bana-logo.png",
      noindex: true
    }
  };

  return pageSeo[routeBase(route)];
}

function useSeo(route: Route, locale: Locale) {
  useEffect(() => {
    const seo = getSeoData(route, locale);
    const canonical = absoluteUrl(route);
    const image = absoluteUrl(seo.image ?? "/assets/hero-bana.jpg");

    document.documentElement.lang = locale;
    document.title = seo.title;
    upsertMeta('meta[name="description"]', { name: "description", content: seo.description });
    upsertMeta('meta[name="robots"]', { name: "robots", content: seo.noindex ? "noindex, nofollow" : "index, follow" });
    upsertMeta('link[rel="canonical"]', { rel: "canonical", href: canonical });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: seo.title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: seo.description });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: image });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: seo.type ?? "website" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: seo.title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: seo.description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });
    upsertMeta('script[data-seo-jsonld="true"]', {
      type: "application/ld+json",
      "data-seo-jsonld": "true",
      textContent: JSON.stringify(seo.jsonLd ?? {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: seo.title,
        description: seo.description,
        url: canonical
      })
    });
  }, [locale, route]);
}

function useRoute() {
  const [route, setRoute] = useState<Route>(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const onPopState = () => setRoute(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (href: string) => {
    const next = normalizePath(href);
    window.history.pushState({}, "", next);
    setRoute(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { route, navigate };
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-logoBlue/10 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-forest/70 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-white/72">
      <span className="h-2 w-2 rounded-full bg-logoYellow" />
      {children}
    </div>
  );
}

function LinkButton({
  href,
  navigate,
  children,
  className,
  ...props
}: {
  href: string;
  navigate: (href: string) => void;
  children: React.ReactNode;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  return (
    <a
      href={href}
      onClick={(event) => {
        event.preventDefault();
        navigate(href);
      }}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}

function Header({
  dark,
  setDark,
  route,
  navigate,
  locale,
  setLocale
}: {
  dark: boolean;
  setDark: (value: boolean) => void;
  route: Route;
  navigate: (href: string) => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const t = nls[locale];
  const translatedNav = nav.map((item) => ({
    ...item,
    label:
      item.href === "/" ? t.nav.home :
      item.href === "/a-propos" ? t.nav.about :
      item.href === "/programmes" ? t.nav.programs :
      item.href === "/contes" ? t.nav.tales :
      item.href === "/impact" ? t.nav.impact :
      t.nav.news
  }));
  const translatedResourceNav = resourceNav.map((item) => ({
    ...item,
    label:
      item.href === "/galerie" ? t.nav.gallery :
      item.href === "/partenaires" ? t.nav.partners :
      item.href === "/soutenir" ? t.nav.support :
      t.nav.contact
  }));
  const mobileLinks = [...translatedNav, ...translatedResourceNav];
  const activeRoute = routeBase(route);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 bg-parchment/92 px-4 py-3 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-ink/88">
        <LinkButton href="/" navigate={navigate} className="flex items-center gap-3" aria-label="BANA Education accueil">
          <img src="/assets/bana-logo.png" alt="BANA Education" className="h-12 w-auto" />
        </LinkButton>
        <div className="hidden items-center gap-1 lg:flex">
          {translatedNav.map((item) => (
            <LinkButton
              key={item.href}
              href={item.href}
              navigate={navigate}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold text-forest/75 transition hover:bg-white hover:text-logoBlue dark:text-white/75 dark:hover:bg-white/10 dark:hover:text-white",
                activeRoute === item.href && "bg-white text-logoBlue shadow-sm dark:bg-white/10"
              )}
            >
              {item.label}
            </LinkButton>
          ))}
          <div className="relative">
            <button
              onClick={() => setResourcesOpen(!resourcesOpen)}
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-forest/75 hover:bg-white dark:text-white/75 dark:hover:bg-white/10",
                resourcesOpen && "bg-white text-logoBlue shadow-sm dark:bg-white/10"
              )}
              aria-expanded={resourcesOpen}
            >
              {t.nav.resources} <ChevronDown className={cn("h-4 w-4 transition-transform", resourcesOpen && "rotate-180")} />
            </button>
            {resourcesOpen ? (
              <div className="absolute right-0 top-12 w-72 rounded-[1.5rem] border border-logoBlue/10 bg-white p-3 shadow-lift dark:border-white/10 dark:bg-[#14263a]">
              <div className="grid gap-2">
                {translatedResourceNav.map((item, index) => (
                  <button
                    key={item.href}
                    onClick={() => {
                      navigate(item.href);
                      setResourcesOpen(false);
                    }}
                    className="flex items-center justify-between rounded-2xl bg-cream px-4 py-3 text-left text-sm font-semibold text-forest transition hover:bg-logoYellow/25 dark:bg-white/5 dark:text-white"
                  >
                    <span className="flex items-center gap-3">
                      <span className={cn("block h-2 w-8 rounded-full", ["bg-logoBlue", "bg-logoGreen", "bg-logoRed", "bg-logoYellow"][index])} />
                      {item.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-logoBlue" />
                  </button>
                ))}
              </div>
            </div>
            ) : null}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="hidden rounded-full border border-logoBlue/10 bg-white/75 p-3 text-forest transition hover:bg-white md:inline-flex dark:border-white/10 dark:bg-white/5 dark:text-white" aria-label={t.common.search}>
            <Search className="h-4 w-4" />
          </button>
          <button onClick={() => setDark(!dark)} className="rounded-full border border-logoBlue/10 bg-white/75 p-3 text-forest transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white" aria-label={t.common.theme}>
            {dark ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
            className="rounded-full border border-logoBlue/10 bg-white/75 px-3 py-2 text-xs font-black text-forest transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white"
            aria-label="Language"
          >
            {locale.toUpperCase()}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-full border border-logoBlue/10 bg-white/75 p-3 text-forest lg:hidden dark:border-white/10 dark:bg-white/5 dark:text-white" aria-label={t.common.menu}>
            <Menu className="h-5 w-5" />
          </button>
          <Button className="hidden md:inline-flex" variant="blue" onClick={() => navigate("/soutenir")}>
            {t.nav.donate}
          </Button>
        </div>
      </nav>
      {mobileOpen ? (
        <div className="mx-auto mt-3 grid max-w-7xl gap-2 rounded-[1.75rem] border border-logoBlue/10 bg-white/95 p-4 shadow-lift backdrop-blur-xl lg:hidden dark:border-white/10 dark:bg-ink/95">
          {mobileLinks.map((item) => (
            <button
              key={item.href}
              onClick={() => {
                navigate(item.href);
                setMobileOpen(false);
                setResourcesOpen(false);
              }}
              className={cn(
                "rounded-2xl px-4 py-3 text-left text-sm font-bold text-forest/75 transition hover:bg-cream dark:text-white/75 dark:hover:bg-white/10",
                activeRoute === item.href && "bg-cream text-logoBlue dark:bg-white/10"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </header>
  );
}

function PageIntro({
  eyebrow,
  title,
  text,
  image = "/assets/hero-bana.jpg"
}: {
  eyebrow: string;
  title: string;
  text: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-cream px-5 pb-16 pt-36 dark:bg-ink lg:px-8">
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-logoBlue via-logoYellow to-logoRed" />
      <div className="mx-auto grid max-w-7xl items-end gap-10 lg:grid-cols-[1fr_0.82fr]">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <SectionLabel>{eyebrow}</SectionLabel>
          <h1 className="font-display text-5xl leading-[0.96] text-forest sm:text-7xl dark:text-white">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-forest/70 dark:text-white/70">{text}</p>
        </motion.div>
        <motion.img initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} src={image} alt="" className="h-72 w-full rounded-[2rem] object-cover shadow-lift lg:h-[420px]" />
      </div>
    </section>
  );
}

function Hero({ navigate, locale }: { navigate: (href: string) => void; locale: Locale }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 140]);
  const t = nls[locale];

  return (
    <section className="relative min-h-screen overflow-hidden bg-cream pt-28 dark:bg-ink">
      <motion.div style={{ y }} className="absolute inset-0">
        <img src="/assets/hero-bana.jpg" alt="Jeunes accompagnés par BANA Education" className="h-full w-full object-cover object-[58%_50%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fffdf7]/98 via-[#fffdf7]/88 via-45% to-[#1864a3]/12 dark:from-ink/96 dark:via-ink/82 dark:to-logoBlue/25" />
        <div className="absolute inset-y-0 left-0 w-[62%] bg-white/38 backdrop-blur-[2px] dark:bg-ink/34" />
      </motion.div>
      <div className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-end gap-8 px-5 pb-12 pt-16 lg:grid-cols-[0.96fr_0.74fr] lg:px-8">
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.12 }} className="max-w-2xl rounded-[2rem] border border-white/70 bg-white/76 p-6 shadow-soft backdrop-blur-xl sm:p-8 dark:border-white/10 dark:bg-ink/70">
          <motion.div variants={fadeUp} className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/78 px-4 py-2 text-sm font-semibold text-forest shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-white">
            <Sparkles className="h-4 w-4 text-logoYellow" />
            {t.hero.badge}
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-display text-5xl leading-[0.95] text-forest sm:text-6xl xl:text-7xl dark:text-white">
            {t.hero.title}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-lg font-medium leading-8 text-forest/78 dark:text-white/78">
            {t.hero.text}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => navigate("/programmes")}>{t.common.discoverPrograms}</Button>
            <Button variant="secondary" onClick={() => navigate("/soutenir")}>{t.common.supportUs}</Button>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.25 }} className="mb-3 hidden max-w-md justify-self-end rounded-[2rem] border border-white/60 bg-white/76 p-4 shadow-lift backdrop-blur-xl lg:block dark:border-white/10 dark:bg-white/10">
          <div className="rounded-[1.5rem] bg-forest p-5 text-white">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white/70">{t.hero.focus}</span>
              <PlayCircle className="h-6 w-6 text-logoYellow" />
            </div>
            <p className="mt-10 font-display text-3xl leading-tight">{t.hero.focusTitle}</p>
            <div className="mt-7 h-2 rounded-full bg-white/15">
              <div className="h-2 w-[68%] rounded-full bg-gradient-to-r from-logoYellow to-logoGreen" />
            </div>
            <div className="mt-4 flex justify-between text-sm text-white/72">
              <span>{t.hero.engaged}</span>
              <span>{t.hero.goal}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="bg-parchment py-10 dark:bg-ink">
      <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {stats.map((stat, index) => (
          <motion.div key={stat.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: index * 0.08 }} className="rounded-[1.75rem] border border-logoBlue/8 bg-white/85 p-7 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className={cn("font-display text-5xl dark:text-white", ["text-logoBlue", "text-logoGreen", "text-logoRed", "text-forest"][index])}>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <p className="mt-3 text-sm font-medium leading-6 text-forest/65 dark:text-white/65">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function MissionBlock({ locale }: { locale: Locale }) {
  const t = nls[locale];
  return (
    <section className="bg-parchment py-24 dark:bg-ink">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
          <img src="/assets/mission.jpg" alt="Activité éducative BANA" className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-lift" />
          <img src="/assets/mission-small.jpg" alt="Jeune lectrice" className="absolute -bottom-8 right-6 hidden w-48 rounded-[1.5rem] border-8 border-parchment object-cover shadow-lift sm:block dark:border-ink" />
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <SectionLabel>{t.sections.mission}</SectionLabel>
          <h2 className="font-display text-4xl leading-tight text-forest sm:text-6xl dark:text-white">{t.mission.title}</h2>
          <p className="mt-6 text-lg leading-8 text-forest/72 dark:text-white/72">
            {t.mission.text}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {t.mission.values.map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/75 p-4 text-sm font-semibold text-forest dark:bg-white/5 dark:text-white">
                <CheckCircle2 className={cn("h-5 w-5", ["text-logoBlue", "text-logoGreen", "text-logoRed", "text-logoYellow"][index])} />
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProgramsGrid({ locale }: { locale: Locale }) {
  const t = nls[locale];
  return (
    <section className="bg-cream py-24 dark:bg-[#0f2438]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <SectionLabel>{t.sections.programs}</SectionLabel>
          <h2 className="font-display text-4xl leading-tight text-forest sm:text-6xl dark:text-white">Une architecture éducative complète, de la lecture à l'insertion.</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <motion.article key={program.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: index * 0.06 }} whileHover={{ y: -8 }} className={cn("group rounded-[2rem] border border-logoBlue/8 p-7 shadow-sm transition-shadow hover:shadow-lift dark:!border-white/20 dark:!bg-[#203a55]", program.tone)}>
                <div className={cn("mb-12 inline-flex rounded-2xl bg-white p-4 shadow-sm dark:bg-white/12", ["text-logoBlue", "text-logoGreen", "text-logoRed", "text-forest dark:text-logoYellow", "text-logoYellow", "text-logoBlue"][index])}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-3xl text-forest dark:text-white">{program.title}</h3>
                <p className="mt-4 leading-7 text-forest/68 dark:!text-slate-100/85">{program.text}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StoryWorldBlock({ locale, navigate }: { locale: Locale; navigate: (href: string) => void }) {
  const t = nls[locale];
  return (
    <section className="bg-parchment py-24 dark:bg-ink">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:sticky lg:top-28 lg:self-start">
          <SectionLabel>{t.sections.tales}</SectionLabel>
          <h2 className="font-display text-5xl leading-[0.95] text-forest sm:text-7xl dark:text-white">{storyWorld.name}</h2>
          <p className="mt-6 text-xl leading-8 text-forest/74 dark:text-white/74">{storyWorld.baseline}</p>
          <p className="mt-5 leading-8 text-forest/64 dark:text-white/64">{storyWorld.description}</p>
        </motion.div>
        <div className="space-y-5">
          <div className="rounded-[2rem] bg-forest p-5 text-white shadow-lift">
            <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:items-center">
              <div className="relative overflow-hidden rounded-[1.5rem]">
                <img src="/assets/mission-small.jpg" alt="Lecture et conte oral par BANA" className="aspect-[4/5] w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/75 to-transparent" />
                <button className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-bold text-forest shadow-soft" aria-label="Lire l'aperçu audio">
                  <CirclePlay className="h-5 w-5 text-logoRed" />
                  Aperçu audio
                </button>
              </div>
              <div className="p-2">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-logoYellow">Page dédiée</p>
                <h3 className="mt-3 font-display text-4xl leading-tight">Une collection signée Patricia, conteuse et écrivaine.</h3>
                <p className="mt-5 leading-7 text-white/70">
                  Chaque conte peut être publié en texte, enrichi d'un player audio, puis décliné en épisodes verticaux animés pour amplifier la portée éducative sur les réseaux.
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {storyWorld.formats.map((format, index) => {
              const Icon = format.icon;
              return (
                <article key={format.label} className="rounded-[1.75rem] border border-logoBlue/8 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                  <Icon className={cn("h-6 w-6", ["text-logoBlue", "text-logoGreen", "text-logoRed"][index])} />
                  <h3 className="mt-8 font-display text-3xl text-forest dark:text-white">{format.label}</h3>
                  <p className="mt-3 text-sm leading-6 text-forest/65 dark:text-white/65">{format.text}</p>
                </article>
              );
            })}
          </div>
          <div className="grid gap-4">
            {tales.map((tale, index) => (
              <motion.article key={tale.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="group flex flex-col justify-between gap-5 rounded-[1.75rem] border border-logoBlue/8 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lift md:flex-row md:items-center dark:border-white/10 dark:bg-white/5">
                <div>
                  <div className="mb-3 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.14em]">
                    <span className="rounded-full bg-cream px-3 py-1 text-forest dark:bg-white/10 dark:text-white">{tale.status}</span>
                    <span className="rounded-full bg-logoBlue/10 px-3 py-1 text-logoBlue">{tale.duration}</span>
                  </div>
                  <h3 className="font-display text-3xl text-forest dark:text-white">{tale.title}</h3>
                  <p className="mt-2 max-w-2xl leading-7 text-forest/64 dark:text-white/64">{tale.excerpt}</p>
                </div>
                <button onClick={() => navigate(`/contes/${tale.slug}`)} className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest text-white transition group-hover:bg-logoRed" aria-label={`Ouvrir ${tale.title}`}>
                  <ArrowUpRight className="h-5 w-5" />
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactBlock({ locale }: { locale: Locale }) {
  const t = nls[locale];
  return (
    <section className="overflow-hidden bg-forest py-24 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div>
          <SectionLabel>{t.sections.impact}</SectionLabel>
          <h2 className="font-display text-4xl leading-tight sm:text-6xl">Des histoires simples, puissantes, mesurables.</h2>
          <p className="mt-6 text-lg leading-8 text-white/70">La réussite de BANA se lit dans la confiance retrouvée, les livres ouverts, les projets lancés et les communautés qui s'organisent autour de l'école.</p>
          <div className="mt-10 rounded-[2rem] bg-white/10 p-6 backdrop-blur">
            <div className="flex items-center gap-3 text-logoYellow">
              <ShieldCheck className="h-6 w-6" />
              <span className="font-semibold">Accessibilité AA, SEO et performance pensés dès la conception.</span>
            </div>
          </div>
        </div>
        <div className="grid gap-5">
          {testimonials.map((item, index) => (
            <motion.figure key={item.name} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="rounded-[2rem] border border-white/10 bg-white/[0.08] p-7 backdrop-blur">
              <blockquote className="text-xl leading-8 text-white/88">“{item.quote}”</blockquote>
              <figcaption className="mt-6 text-sm font-semibold text-logoYellow">{item.name} <span className="text-white/46">/ {item.role}</span></figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function localizedPost(post: (typeof posts)[number], locale: Locale) {
  return {
    ...post,
    title: locale === "en" ? post.titleEn : post.title,
    category: locale === "en" ? post.categoryEn : post.category,
    excerpt: locale === "en" ? post.excerptEn : post.excerpt,
    body: locale === "en" ? post.bodyEn : post.body
  };
}

function NewsBlock({ locale, navigate }: { locale: Locale; navigate: (href: string) => void }) {
  const t = nls[locale];
  return (
    <section className="bg-parchment py-24 dark:bg-ink">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <SectionLabel>{t.sections.news}</SectionLabel>
            <h2 className="font-display text-4xl leading-tight text-forest sm:text-6xl dark:text-white">{t.news.title}</h2>
          </div>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {posts.map((sourcePost) => {
            const post = localizedPost(sourcePost, locale);
            return (
            <article key={sourcePost.slug} className="overflow-hidden rounded-[2rem] border border-logoBlue/8 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lift dark:border-white/10 dark:bg-white/5">
              <img src={post.image} alt="" className="h-64 w-full object-cover" loading="lazy" />
              <div className="p-6">
                <div className="mb-5 flex items-center justify-between text-xs font-bold uppercase tracking-[0.14em] text-logoBlue">
                  <span>{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="font-display text-3xl text-forest dark:text-white">{post.title}</h3>
                <p className="mt-3 leading-7 text-forest/65 dark:text-white/65">{post.excerpt}</p>
                <button onClick={() => navigate(`/actualites/${sourcePost.slug}`)} className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-bold text-white transition hover:bg-logoRed">
                  {t.common.readArticle}
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          );})}
        </div>
      </div>
    </section>
  );
}

function ArticleDetailPage({ slug, locale, navigate }: { slug: string; locale: Locale; navigate: (href: string) => void }) {
  const t = nls[locale];
  const sourcePost = posts.find((post) => post.slug === slug) ?? posts[0];
  const post = localizedPost(sourcePost, locale);

  return (
    <>
      <section className="relative overflow-hidden bg-cream px-5 pb-16 pt-36 dark:bg-ink lg:px-8">
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-logoBlue via-logoYellow to-logoRed" />
        <div className="mx-auto max-w-5xl">
          <button onClick={() => navigate("/actualites")} className="mb-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-forest shadow-sm transition hover:bg-logoYellow/20 dark:bg-white/10 dark:text-white">
            {t.common.backToNews}
          </button>
          <SectionLabel>{t.news.detailEyebrow}</SectionLabel>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-logoBlue">{post.category} / {post.date}</p>
          <h1 className="font-display text-5xl leading-[0.96] text-forest sm:text-7xl dark:text-white">{post.title}</h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-forest/70 dark:text-white/70">{post.excerpt}</p>
        </div>
      </section>
      <article className="bg-parchment px-5 py-16 dark:bg-ink lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_0.55fr]">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm dark:bg-white/5 md:p-10">
            <img src={post.image} alt="" className="mb-10 h-[420px] w-full rounded-[1.5rem] object-cover" />
            <div className="space-y-6 text-lg leading-9 text-forest/76 dark:text-white/76">
              {post.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <aside className="rounded-[2rem] bg-forest p-7 text-white shadow-lift lg:self-start">
            <h2 className="font-display text-4xl">{t.news.latest}</h2>
            <div className="mt-6 space-y-4">
              {posts.filter((item) => item.slug !== sourcePost.slug).map((item) => {
                const related = localizedPost(item, locale);
                return (
                  <button key={item.slug} onClick={() => navigate(`/actualites/${item.slug}`)} className="block w-full rounded-2xl bg-white/10 p-4 text-left transition hover:bg-white/15">
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-logoYellow">{related.category}</span>
                    <span className="mt-2 block font-semibold">{related.title}</span>
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}

function TaleDetailPage({ slug, navigate }: { slug: string; navigate: (href: string) => void }) {
  const tale = tales.find((item) => item.slug === slug) ?? tales[0];
  const related = tales.filter((item) => item.slug !== tale.slug);

  return (
    <>
      <section className="relative overflow-hidden bg-cream px-5 pb-16 pt-36 dark:bg-ink lg:px-8">
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-logoBlue via-logoYellow to-logoRed" />
        <div className="mx-auto grid max-w-7xl items-end gap-10 lg:grid-cols-[1fr_0.78fr]">
          <div>
            <button onClick={() => navigate("/contes")} className="mb-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-forest shadow-sm transition hover:bg-logoYellow/20 dark:bg-white/10 dark:text-white">
              Retour aux contes
            </button>
            <SectionLabel>Les Veillées de Patricia</SectionLabel>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-logoRed">Objet : {tale.object}</p>
            <h1 className="font-display text-5xl leading-[0.96] text-forest sm:text-7xl dark:text-white">{tale.title}</h1>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-forest/72 dark:text-white/72">{tale.excerpt}</p>
          </div>
          <img src={tale.image} alt="" className="h-80 w-full rounded-[2rem] object-cover shadow-lift lg:h-[460px]" />
        </div>
      </section>
      <article className="bg-parchment px-5 py-16 dark:bg-ink lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.45fr]">
          <div className="rounded-[2rem] bg-white p-7 shadow-sm dark:bg-white/5 md:p-10">
            <div className="mb-8 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-[0.14em]">
              <span className="rounded-full bg-cream px-4 py-2 text-forest dark:bg-white/10 dark:text-white">{tale.status}</span>
              <span className="rounded-full bg-logoBlue/10 px-4 py-2 text-logoBlue dark:bg-logoBlue/20 dark:text-white">{tale.duration}</span>
            </div>
            <h2 className="font-display text-4xl text-forest dark:text-white">Texte du conte</h2>
            <div className="mt-6 space-y-6 text-lg leading-9 text-forest/76 dark:text-white/78">
              {(tale.body ?? [tale.text]).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-10 rounded-[1.5rem] bg-cream p-6 dark:bg-white/5">
              <h3 className="font-display text-3xl text-forest dark:text-white">Audio raconté</h3>
              <p className="mt-3 leading-7 text-forest/65 dark:text-white/70">Version racontée par IA avec une voix de conteur.</p>
              <audio className="mt-5 w-full" controls src={tale.audioUrl}>
                Votre navigateur ne supporte pas la lecture audio.
              </audio>
            </div>
          </div>
          <aside className="rounded-[2rem] bg-forest p-7 text-white shadow-lift lg:self-start">
            <h2 className="font-display text-4xl">Autres contes</h2>
            <div className="mt-6 space-y-4">
              {related.map((item) => (
                <button key={item.slug} onClick={() => navigate(`/contes/${item.slug}`)} className="block w-full rounded-2xl bg-white/10 p-4 text-left transition hover:bg-white/15">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-logoYellow">{item.object}</span>
                  <span className="mt-2 block font-semibold">{item.title}</span>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}

function TimelineBlock({ locale }: { locale: Locale }) {
  const t = nls[locale];
  return (
    <section className="bg-cream py-24 dark:bg-[#102033]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionLabel>{t.sections.timeline}</SectionLabel>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="font-display text-4xl leading-tight text-forest sm:text-6xl dark:text-white">Une trajectoire claire, des actions concrètes.</h2>
          <div className="rounded-[2rem] bg-white p-8 shadow-sm dark:bg-white/5">
            <div className="space-y-7">
              {timeline.map((event) => (
                <div key={event.year} className="grid grid-cols-[76px_1fr] gap-5">
                  <div className="text-sm font-bold text-logoBlue">{event.year}</div>
                  <div className="border-l border-logoBlue/12 pl-5 dark:border-white/12">
                    <h3 className="font-semibold text-forest dark:text-white">{event.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-forest/62 dark:text-white/62">{event.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryBlock({ locale }: { locale: Locale }) {
  const t = nls[locale];
  return (
    <section className="bg-parchment py-24 dark:bg-ink">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionLabel>{t.sections.gallery}</SectionLabel>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {gallery.map((image, index) => (
            <img key={image} src={image} alt={`Galerie BANA ${index + 1}`} loading="lazy" className={cn("h-72 w-full rounded-[1.5rem] object-cover shadow-sm", index % 2 ? "lg:translate-y-8" : "")} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnersBlock({ locale }: { locale: Locale }) {
  const t = nls[locale];
  return (
    <section className="bg-cream py-24 dark:bg-[#102033]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionLabel>{t.sections.partners}</SectionLabel>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {partners.map((partner) => (
            <article key={partner.name} className="rounded-[2rem] border border-logoBlue/8 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/5">
              <span className={cn("block h-3 w-16 rounded-full", partner.accent)} />
              <h3 className="mt-12 font-display text-3xl text-forest dark:text-white">{partner.name}</h3>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-forest/50 dark:text-white/50">{partner.type}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactBlock() {
  return (
    <section className="bg-parchment py-24 dark:bg-ink">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <SectionLabel>Contact</SectionLabel>
          <h2 className="font-display text-4xl leading-tight text-forest sm:text-6xl dark:text-white">Parlons partenariat, bénévolat ou soutien.</h2>
          <div className="mt-8 space-y-4 text-forest/70 dark:text-white/70">
            <p className="flex items-center gap-3"><Mail className="h-5 w-5 text-logoBlue" /> contact@bana-edu.org</p>
            <p>+33 6 85 78 80 88</p>
            <p>Kinshasa, République Démocratique du Congo</p>
          </div>
        </div>
        <div className="rounded-[2rem] bg-forest p-7 text-white shadow-lift">
          <form className="grid gap-4">
            <input className="min-h-12 rounded-2xl border border-white/10 bg-white/10 px-4 text-white placeholder:text-white/52 focus:outline-none focus:ring-2 focus:ring-logoYellow" placeholder="Nom complet" aria-label="Nom complet" />
            <input className="min-h-12 rounded-2xl border border-white/10 bg-white/10 px-4 text-white placeholder:text-white/52 focus:outline-none focus:ring-2 focus:ring-logoYellow" placeholder="Email" type="email" aria-label="Email" />
            <select className="min-h-12 rounded-2xl border border-white/10 bg-white/10 px-4 text-white focus:outline-none focus:ring-2 focus:ring-logoYellow" aria-label="Type de demande">
              <option>Devenir partenaire</option>
              <option>Devenir bénévole</option>
              <option>Soutenir un projet</option>
              <option>Presse et institution</option>
            </select>
            <textarea className="min-h-32 rounded-2xl border border-white/10 bg-white/10 p-4 text-white placeholder:text-white/52 focus:outline-none focus:ring-2 focus:ring-logoYellow" placeholder="Votre message" aria-label="Votre message" />
            <Button variant="blue" className="w-full" showArrow={false}>
              <Send className="h-4 w-4" />
              Envoyer la demande
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

function SupportBlock({ locale }: { locale: Locale }) {
  const t = nls[locale];
  return (
    <section className="bg-parchment py-24 dark:bg-ink">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionLabel>{t.sections.support}</SectionLabel>
        <div className="grid gap-5 md:grid-cols-3">
          {supportOptions.map((option, index) => (
            <article key={option.title} className="rounded-[2rem] bg-white p-7 shadow-sm dark:bg-white/5">
              <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl text-white", ["bg-logoBlue", "bg-logoGreen", "bg-logoRed"][index])}>
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="mt-10 font-display text-3xl text-forest dark:text-white">{option.title}</h3>
              <p className="mt-4 leading-7 text-forest/65 dark:text-white/65">{option.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

type AdminSection = "overview" | "pages" | "articles" | "tales" | "media" | "partners" | "testimonials";

function AdminCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[2rem] bg-white p-7 shadow-sm dark:bg-white/5">
      <h2 className="font-display text-4xl text-forest dark:text-white">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function AdminTextField({ label, value, multiline = false }: { label: string; value: string; multiline?: boolean }) {
  const className = "mt-2 w-full rounded-2xl border border-logoBlue/10 bg-cream px-4 py-3 text-sm font-semibold text-forest outline-none focus:ring-2 focus:ring-logoBlue/30 dark:border-white/10 dark:bg-white/5 dark:text-white";
  return (
    <label className="block text-sm font-bold text-forest/70 dark:text-white/70">
      {label}
      {multiline ? <textarea className={cn(className, "min-h-28")} defaultValue={value} /> : <input className={className} defaultValue={value} />}
    </label>
  );
}

function AdminTable({ rows }: { rows: Array<Record<string, string>> }) {
  const headers = Object.keys(rows[0] ?? {});
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-logoBlue/10">
      <table className="w-full min-w-[620px] text-left text-sm">
        <thead className="bg-cream text-forest/70 dark:bg-white/10 dark:text-white/70">
          <tr>{headers.map((header) => <th key={header} className="px-5 py-4 font-bold">{header}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-logoBlue/10 dark:divide-white/10">
          {rows.map((row, index) => (
            <tr key={index} className="bg-white dark:bg-transparent">
              {headers.map((header) => <td key={header} className="px-5 py-4 font-semibold text-forest/72 dark:text-white/72">{row[header]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AdminSectionPanel({ section, locale }: { section: AdminSection; locale: Locale }) {
  const t = nls[locale];

  if (section === "pages") {
    return (
      <AdminCard title="Pages du site">
        <AdminTable rows={[
          { Page: "Accueil", Statut: "Publié", Langues: "FR / EN" },
          { Page: "Programmes", Statut: "Publié", Langues: "FR / EN" },
          { Page: "Contes", Statut: "Publié", Langues: "FR / EN" },
          { Page: "Soutenir", Statut: "Brouillon paiement", Langues: "FR / EN" }
        ]} />
      </AdminCard>
    );
  }

  if (section === "articles") {
    return (
      <AdminCard title="Articles & actualités">
        <div className="grid gap-5 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="overflow-hidden rounded-[1.5rem] bg-cream dark:bg-white/5">
              <img src={post.image} alt="" className="h-40 w-full object-cover" />
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-logoBlue">{post.category}</p>
                <h3 className="mt-2 font-display text-2xl text-forest dark:text-white">{post.title}</h3>
                <p className="mt-2 text-sm leading-6 text-forest/60 dark:text-white/60">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </AdminCard>
    );
  }

  if (section === "tales") {
    return (
      <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <AdminCard title="Contes depuis la base de données">
          <div className="grid gap-4">
            {tales.map((tale) => (
              <article key={tale.title} className="grid gap-4 rounded-[1.5rem] bg-cream p-4 md:grid-cols-[120px_1fr] dark:bg-white/5">
                <img src={tale.image} alt="" className="h-28 w-full rounded-2xl object-cover" />
                <div>
                  <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.12em]">
                    <span className="rounded-full bg-white px-3 py-1 text-logoBlue dark:bg-white/10">{tale.status}</span>
                    <span className="rounded-full bg-logoYellow/20 px-3 py-1 text-forest dark:text-white">{tale.duration}</span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl text-forest dark:text-white">{tale.title}</h3>
                  <p className="mt-1 text-sm font-bold text-logoRed">Objet : {tale.object}</p>
                  <p className="mt-2 text-sm leading-6 text-forest/65 dark:text-white/65">{tale.text}</p>
                </div>
              </article>
            ))}
          </div>
        </AdminCard>
        <AdminCard title="Ajouter / modifier un conte">
          <div className="grid gap-4">
            <AdminTextField label="Titre du conte" value="Nouveau conte de Patricia" />
            <AdminTextField label="Objet / sujet du conte" value="Courage, mémoire, transmission..." />
            <AdminTextField label="Image du conte" value="/uploads/contes/image.jpg" />
            <AdminTextField label="Texte du conte" value="Coller ici le texte complet du conte..." multiline />
            <AdminTextField label="Audio raconté" value="/uploads/audio/conte.mp3" />
            <Button variant="blue" showArrow={false}>Enregistrer le conte</Button>
          </div>
        </AdminCard>
      </div>
    );
  }

  if (section === "media") {
    return (
      <AdminCard title="Médias images & vidéos">
        <div className="grid gap-4 md:grid-cols-4">
          {gallery.map((item, index) => (
            <div key={item} className="rounded-[1.5rem] bg-cream p-3 dark:bg-white/5">
              <img src={item} alt="" className="h-36 w-full rounded-2xl object-cover" />
              <p className="mt-3 text-sm font-bold text-forest dark:text-white">Média #{index + 1}</p>
              <p className="text-xs text-forest/55 dark:text-white/55">Image terrain / galerie</p>
            </div>
          ))}
        </div>
      </AdminCard>
    );
  }

  if (section === "partners") {
    return (
      <AdminCard title="Partenaires & sponsors">
        <AdminTable rows={partners.map((partner) => ({ Nom: partner.name, Type: partner.type, Visibilité: "Site + footer" }))} />
      </AdminCard>
    );
  }

  if (section === "testimonials") {
    return (
      <AdminCard title="Témoignages">
        <div className="grid gap-4 lg:grid-cols-3">
          {testimonials.map((item) => (
            <figure key={item.name} className="rounded-[1.5rem] bg-cream p-5 dark:bg-white/5">
              <blockquote className="text-sm leading-6 text-forest/70 dark:text-white/70">“{item.quote}”</blockquote>
              <figcaption className="mt-4 text-sm font-bold text-logoBlue">{item.name} / {item.role}</figcaption>
            </figure>
          ))}
        </div>
      </AdminCard>
    );
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cmsCollections.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-[2rem] bg-white p-6 shadow-sm dark:bg-white/5">
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5 text-logoBlue" />
                <span className="font-display text-4xl text-forest dark:text-white">{item.count}</span>
              </div>
              <p className="mt-8 text-sm font-semibold text-forest/70 dark:text-white/70">{item.label}</p>
            </div>
          );
        })}
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] bg-white p-7 shadow-sm dark:bg-white/5">
          <h2 className="font-display text-4xl text-forest dark:text-white">{t.admin.pipeline}</h2>
          <div className="mt-6 space-y-4">
            {["Relire l'audio du conte", "Mettre à jour les chiffres d'impact", "Ajouter les sponsors 2026", "Préparer les prochaines images"].map((task, index) => (
              <div key={task} className="flex items-center justify-between rounded-2xl bg-cream p-4 dark:bg-white/5">
                <span className="text-sm font-semibold text-forest dark:text-white">{task}</span>
                <span className={cn("h-3 w-3 rounded-full", ["bg-logoRed", "bg-logoYellow", "bg-logoBlue", "bg-logoGreen"][index])} />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] bg-forest p-7 text-white shadow-lift">
          <Globe2 className="h-7 w-7 text-logoYellow" />
          <h2 className="mt-8 font-display text-4xl">{t.admin.multilingual}</h2>
          <p className="mt-4 leading-7 text-white/70">{t.admin.multilingualText}</p>
        </div>
      </div>
    </>
  );
}

function AdminPage({ locale }: { locale: Locale }) {
  const t = nls[locale];
  const [section, setSection] = useState<AdminSection>("overview");
  const adminNav: Array<{ id: AdminSection; label: string }> = [
    { id: "overview", label: "Vue globale" },
    { id: "pages", label: "Pages" },
    { id: "articles", label: "Articles" },
    { id: "tales", label: "Contes" },
    { id: "media", label: "Médias" },
    { id: "partners", label: "Partenaires" },
    { id: "testimonials", label: "Témoignages" }
  ];

  return (
    <main className="min-h-screen bg-[#eef5fb] px-5 pb-12 pt-28 dark:bg-ink lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-logoBlue">{t.admin.eyebrow}</p>
            <h1 className="mt-2 font-display text-5xl text-forest sm:text-7xl dark:text-white">{t.admin.title}</h1>
          </div>
          <Button variant="secondary" showArrow={false}>{t.admin.ready}</Button>
        </div>
        <div className="grid gap-5 lg:grid-cols-[240px_1fr]">
          <aside className="rounded-[2rem] bg-white p-4 shadow-sm dark:bg-white/5">
            {adminNav.map((item) => (
              <button key={item.id} onClick={() => setSection(item.id)} className={cn("mb-2 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold text-forest/70 transition hover:bg-cream dark:text-white/70 dark:hover:bg-white/10", section === item.id && "bg-cream text-logoBlue dark:bg-white/10")}>
                <LayoutDashboard className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </aside>
          <section className="grid gap-5">
            <AdminSectionPanel section={section} locale={locale} />
          </section>
        </div>
      </div>
    </main>
  );
}

function Footer({ navigate, locale }: { navigate: (href: string) => void; locale: Locale }) {
  const t = nls[locale];
  const translatedNav = nav.map((item) => ({
    ...item,
    label:
      item.href === "/" ? t.nav.home :
      item.href === "/a-propos" ? t.nav.about :
      item.href === "/programmes" ? t.nav.programs :
      item.href === "/contes" ? t.nav.tales :
      item.href === "/impact" ? t.nav.impact :
      t.nav.news
  }));
  const translatedResourceNav = resourceNav.map((item) => ({
    ...item,
    label:
      item.href === "/galerie" ? t.nav.gallery :
      item.href === "/partenaires" ? t.nav.partners :
      item.href === "/soutenir" ? t.nav.support :
      t.nav.contact
  }));

  return (
    <footer className="bg-forest px-5 py-14 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <img src="/assets/bana-logo.png" alt="BANA Education" className="h-16 rounded-2xl bg-white p-2" />
            <p className="mt-6 max-w-md leading-7 text-white/68">Construisons des ponts vers un monde réinventé, au travers de la littérature, de la diversité culturelle et de l'éducation.</p>
          </div>
          <div>
            <h3 className="font-display text-3xl">{t.common.pages}</h3>
            <div className="mt-5 grid gap-2 text-sm text-white/70">
              {[...translatedNav, ...translatedResourceNav, { label: t.nav.admin, href: "/admin" }].map((item) => (
                <button key={item.href} onClick={() => navigate(item.href)} className="text-left transition hover:text-white">{item.label}</button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-3xl">{t.common.newsletter}</h3>
            <div className="mt-5 flex rounded-full bg-white/10 p-1">
              <input className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white placeholder:text-white/50 focus:outline-none" placeholder={t.common.emailPlaceholder} aria-label="Email newsletter" />
              <button className="rounded-full bg-logoYellow px-5 py-3 text-sm font-bold text-forest">OK</button>
            </div>
          </div>
          <div>
            <h3 className="font-display text-3xl">{t.common.contact}</h3>
            <div className="mt-5 space-y-3 text-sm text-white/70">
              <p className="flex items-center gap-3"><Mail className="h-4 w-4" /> contact@bana-edu.org</p>
              <p>+33 6 85 78 80 88</p>
              <p>Kinshasa, RDC</p>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row">
          <p>BANA © 2026. Tous droits réservés.</p>
          <p>Couleurs logo, SEO, accessibilité AA, dark/light et paiements futurs préparés.</p>
        </div>
      </div>
    </footer>
  );
}

function HomePage({ navigate, locale }: { navigate: (href: string) => void; locale: Locale }) {
  return (
    <>
      <Hero navigate={navigate} locale={locale} />
      <Stats />
      <MissionBlock locale={locale} />
      <ProgramsGrid locale={locale} />
      <StoryWorldBlock locale={locale} navigate={navigate} />
      <ImpactBlock locale={locale} />
      <NewsBlock locale={locale} navigate={navigate} />
      <GalleryBlock locale={locale} />
      <PartnersBlock locale={locale} />
      <ContactBlock />
    </>
  );
}

function PublicPage({ route, navigate, locale }: { route: Route; navigate: (href: string) => void; locale: Locale }) {
  if (route === "/") return <HomePage navigate={navigate} locale={locale} />;
  if (route === "/admin") return null;
  if (route.startsWith("/actualites/")) return <ArticleDetailPage slug={route.replace("/actualites/", "")} locale={locale} navigate={navigate} />;
  if (route.startsWith("/contes/")) return <TaleDetailPage slug={route.replace("/contes/", "")} navigate={navigate} />;
  const staticRoute = route as Exclude<StaticRoute, "/" | "/admin">;

  const intros: Record<Exclude<StaticRoute, "/" | "/admin">, { eyebrow: string; title: string; text: string; image?: string }> = {
    "/a-propos": {
      eyebrow: "Association",
      title: "Une organisation éducative africaine, humaine et ambitieuse.",
      text: "Découvrez l'histoire, la mission et les valeurs de BANA Education : lecture, culture, égalité des chances et innovation sociale.",
      image: "/assets/mission.jpg"
    },
    "/programmes": {
      eyebrow: "Programmes",
      title: "Des parcours pour apprendre, créer, s'orienter et s'insérer.",
      text: "Formation, accompagnement, mentorat, numérique, entrepreneuriat et insertion : une architecture claire pour accompagner les jeunes.",
      image: "/assets/action-library.jpg"
    },
    "/contes": {
      eyebrow: "Contes",
      title: "Les Veillées de Patricia, une collection à lire, écouter et animer.",
      text: "Les contes écrits par Patricia vivent sur le site avec leur texte, leur image, leur objet et une future version audio racontée.",
      image: "/assets/mission-small.jpg"
    },
    "/impact": {
      eyebrow: "Impact",
      title: "Des résultats visibles dans les écoles, les familles et les quartiers.",
      text: "Suivez les chiffres, témoignages, projets et histoires qui montrent l'effet concret de BANA sur le terrain.",
      image: "/assets/gallery-1.jpg"
    },
    "/actualites": {
      eyebrow: "Blog & actualités",
      title: "Un espace éditorial dynamique pour les actions BANA.",
      text: "Articles, communiqués, projets et reportages pour relayer l'activité de l'organisation.",
      image: "/assets/action-writing.jpg"
    },
    "/galerie": {
      eyebrow: "Médias",
      title: "Photos et vidéos pour raconter l'action au plus près du terrain.",
      text: "Une galerie moderne pensée pour les images humaines fortes, les vidéos et les futures capsules sociales.",
      image: "/assets/gallery-2.jpg"
    },
    "/partenaires": {
      eyebrow: "Écosystème",
      title: "Partenaires, sponsors et relais institutionnels.",
      text: "Un espace pour valoriser les organisations, écoles, mécènes et bénévoles qui rendent les projets possibles.",
      image: "/assets/gallery-3.jpg"
    },
    "/contact": {
      eyebrow: "Contact",
      title: "Une porte d'entrée claire pour chaque demande.",
      text: "Partenariat, bénévolat, mécénat, presse ou accompagnement : le formulaire oriente les messages vers le bon suivi.",
      image: "/assets/gallery-4.jpg"
    },
    "/soutenir": {
      eyebrow: "Dons & engagement",
      title: "Soutenir BANA, c'est investir dans une génération qui apprend.",
      text: "La page prépare l'intégration future des dons et paiements tout en guidant les mécènes vers les priorités d'impact.",
      image: "/assets/hero-bana.jpg"
    }
  };

  return (
    <>
      <PageIntro {...intros[staticRoute]} />
      {staticRoute === "/a-propos" && (
        <>
          <MissionBlock locale={locale} />
          <TimelineBlock locale={locale} />
        </>
      )}
      {staticRoute === "/programmes" && <ProgramsGrid locale={locale} />}
      {staticRoute === "/contes" && <StoryWorldBlock locale={locale} navigate={navigate} />}
      {staticRoute === "/impact" && (
        <>
          <Stats />
          <ImpactBlock locale={locale} />
          <TimelineBlock locale={locale} />
        </>
      )}
      {staticRoute === "/actualites" && <NewsBlock locale={locale} navigate={navigate} />}
      {staticRoute === "/galerie" && <GalleryBlock locale={locale} />}
      {staticRoute === "/partenaires" && <PartnersBlock locale={locale} />}
      {staticRoute === "/contact" && <ContactBlock />}
      {staticRoute === "/soutenir" && <SupportBlock locale={locale} />}
    </>
  );
}

export function App() {
  const [dark, setDark] = useState(false);
  const [locale, setLocale] = useState<Locale>("fr");
  const { route, navigate } = useRoute();
  const isAdmin = route === "/admin";
  useSeo(route, locale);

  return (
    <div className={cn("min-h-screen scroll-smooth font-sans text-ink antialiased", dark && "dark")}>
      <div className="bg-parchment dark:bg-ink">
        <Header dark={dark} setDark={setDark} route={route} navigate={navigate} locale={locale} setLocale={setLocale} />
        {isAdmin ? (
          <AdminPage locale={locale} />
        ) : (
          <main>
            <PublicPage route={route} navigate={navigate} locale={locale} />
          </main>
        )}
        {!isAdmin && <Footer navigate={navigate} locale={locale} />}
      </div>
    </div>
  );
}
