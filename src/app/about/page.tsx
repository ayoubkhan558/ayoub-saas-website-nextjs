import type { Metadata } from "next";
import Link from "next/link";
import { IconGlyph } from "@/components/landing/IconGlyph";
import { ContactFooter } from "@/components/landing/ContactFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { LogoMarquee } from "@/components/shared/LogoMarquee";
import { buildAboutSchema, jsonLdScript } from "@/lib/seo-schema";
import portfolio from "@/data/portfolio.json";
import toolCatalog from "@/data/toolCatalog.json";
import styles from "@/components/about/AboutPage.module.scss";

export const metadata: Metadata = {
  title: "About Muhammad Ayoub Khan, Freelance Web Developer",
  description:
    "About Muhammad Ayoub Khan, a freelance WordPress and web developer building React, Next.js, WooCommerce, Bricks, Elementor, and business websites.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Muhammad Ayoub Khan, Freelance Web Developer",
    description:
      "Learn about Muhammad Ayoub's WordPress, front-end, website design, and website development experience, workflow, and practical delivery approach.",
    type: "profile",
    url: "/about",
    images: [
      {
        url: "/ayoub-about-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Ayoub Khan freelance web developer",
      },
    ],
  },
};

const storyCards = [
  {
    label: "How I got into web development",
    title: "Self-learning shaped how I build",
    text: "That start taught me to be patient, resourceful, and practical when learning new tools or solving project problems.",
  },
  {
    label: "What I enjoy building",
    title: "Useful websites, product pages, and internal tools",
    text: "I enjoy turning designs and ideas into fast React, Next.js, WordPress, and WooCommerce experiences that are clean to manage after launch.",
  },
  {
    label: "Who I work with",
    title: "Founders, agencies, and product teams",
    text: "Most of my work is with people who need dependable implementation, practical communication, and a site or interface their team can keep improving.",
  },
];

const heroStats = [
  { value: "2018", label: "Career Started" },
  { value: "5+", label: "Years professional experience" },
  { value: "50+", label: "Projects delivered" },
  { value: "100%", label: "Job success" },
];

const toolbox = [
  {
    title: "Software:",
    items: ["WordPress", "WooCommerce", "Shopify", "Webflow", "Bricks Builder", "Elementor"],
  },
  {
    title: "Design Tools:",
    items: ["Figma", "Adobe XD", "Responsive layout systems", "Design handoff"],
  },
  {
    title: "Development Tools:",
    items: ["React", "Next.js", "JavaScript", "TypeScript", "HTML", "CSS", "Sass", "Tailwind", "Bootstrap", "MySQL", "REST APIs"],
  },
  {
    title: "AI Tools:",
    items: ["ChatGPT", "Codex", "AI-assisted QA", "Workflow automation"],
  },
  {
    title: "Workflow:",
    items: ["Discovery", "Figma to code", "Reusable components", "Performance QA", "CMS handoff", "Launch support"],
  },
];

const toolboxIconKeys = [
  "nextjs",
  "typescript",
  "javascript",
  "redux",
  "material-ui",
  "wordpress",
  "woocommerce",
  "figma",
  "html",
  "css",
  "tailwind",
  "sass",
  "bootstrap",
  "bulma",
  "postcss",
  "git",
  "npm",
  "postman",
  "json",
  "vercel",
  "vs-code",
  "mysql",
  "phpmyadmin",
] as const;

const toolboxIcons = toolboxIconKeys
  .map((key) => toolCatalog[key as keyof typeof toolCatalog])
  .filter((tool): tool is { name: string; logo: string; description: string } => Boolean(tool?.logo))
  .map((tool) => ({ name: tool.name, src: tool.logo }));

const toolboxIconRows = [
  toolboxIcons.filter((_, index) => index % 2 === 0),
  toolboxIcons.filter((_, index) => index % 2 === 1),
];

const companyLogos: Record<string, string> = {
  Xgrid: "/comapnies/xgrid-logo.svg",
  Epicsols: "/comapnies/epicsols-logo.jpg",
  "Hawk ITs & Consultancy Provider": "/comapnies/hawk-it-logo.jpg",
  "AWSOL Web Technologies": "/comapnies/awsol-logo.png",
};

export default function AboutPage() {
  const education = portfolio.about.education;
  const schema = buildAboutSchema();

  return (
    <div className={`site-shell ${styles["about-page"]}`}>
      <script
        type="application/ld+json"
        id="about-json-ld"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }}
      />
      <SiteHeader portfolio={portfolio} />
      <main>
        <section className={`section ${styles["about-page-hero"]}`}>
          <div className="section__inner">
            <div className={`container ${styles["about-page-hero__inner"]}`}>
              <div className={styles["about-page-hero__copy"]}>
                <span className={styles["about-page__eyebrow"]}>About / Muhammad Ayoub</span>
                <h1 className={styles["about-page-hero__title"]}>
                  Self-taught developer, building with purpose.
                </h1>
                <p className={styles["about-page-hero__text"]}>
                  I build fast React, Next.js, WordPress, and WooCommerce experiences for clients who need reliable
                  delivery, clean implementation, and practical communication.
                </p>
                <div className={styles["about-page-hero__actions"]}>
                  <Link className="button button--dark" href="/contact" title="Hire Muhammad Ayoub">
                    Hire me
                    <IconGlyph name="arrowRight" />
                  </Link>
                  <a
                    className="button button--ghost"
                    href={portfolio.about.resumeHref}
                    target="_blank"
                    rel="noreferrer"
                    download
                    title="Download Muhammad Ayoub resume"
                  >
                    <IconGlyph name="download" />
                    Download resume
                  </a>
                </div>
              </div>

              <aside className={styles["about-page-hero-stats"]} aria-label="About Muhammad Ayoub stats">
                {heroStats.map((stat) => (
                  <div className={styles["about-page-hero-stat"]} key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </aside>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section__inner">
            <div className={`container ${styles["about-page-story-feature"]}`}>
              <figure className={styles["about-page-story-portrait"]}>
                <img src="/ayoub-about-v2.jpg" alt="Muhammad Ayoub Khan website developer" title="Muhammad Ayoub Khan website developer" />
              </figure>
              <div className={styles["about-page-section-header"]}>
                <span className={styles["about-page__eyebrow"]}>My Story</span>
                <h2 className={styles["about-page-section-header__title"]}>
                  I learned the hard way, and that made me patient.
                </h2>
                <p className={styles["about-page-section-header__text"]}>
                  I started web development in 2018. In the early times, I did not have an internet
                  connection at home, so I used my friends' internet to download tutorials, then watched
                  them offline to learn HTML, CSS, and the fundamentals. That beginning made me
                  self-learned, resourceful, and passionate about building useful things.
                </p>
                <article className={styles["about-page-education"]}>
                  <span>Latest degree</span>
                  <strong>{education}</strong>
                </article>
              </div>
            </div>
            <div className={`container ${styles["about-page-story-grid"]}`}>
              {storyCards.map((item) => (
                <article className={styles["about-page-feature-card"]} key={item.label}>
                  <span className={styles["about-page-feature-card__label"]}>{item.label}</span>
                  <h3 className={styles["about-page-feature-card__title"]}>{item.title}</h3>
                  <p className={styles["about-page-feature-card__text"]}>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section__inner">
            <div className={`container ${styles["about-page-section-header"]}`}>
              <span className={styles["about-page__eyebrow"]}>Professional Experience</span>
              <h2 className={styles["about-page-section-header__title"]}>
                Roles across front-end, WordPress, and product delivery.
              </h2>
            </div>
            <div className={`container ${styles["about-page-experience-list"]}`}>
              {portfolio.experienceLog.map((item) => (
                <article className={styles["about-page-experience-item"]} key={`${item.year}-${item.company}`}>
                  <div className={styles["about-page-experience-item__meta"]}>
                    <span className={styles["about-page-experience-item__year"]}>{item.year}</span>
                    {companyLogos[item.company] ? (
                      <span className={styles["about-page-experience-item__logo"]}>
                        <img src={companyLogos[item.company]} alt={`${item.company} logo`} title={`${item.company} logo`} loading="lazy" />
                      </span>
                    ) : null}
                  </div>
                  <div className={styles["about-page-experience-item__body"]}>
                    <h3 className={styles["about-page-experience-item__title"]}>{item.title}</h3>
                    <strong className={styles["about-page-experience-item__company"]}>{item.company}</strong>
                    <p className={styles["about-page-experience-item__text"]}>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`section ${styles["about-page-toolbox-section"]}`}>
          <div className="section__inner">
            <header className={`section-header section-header--center ${styles["about-page-toolbox-header"]}`}>
              <span className="section-header__label">Toolbox</span>
              <h2 className="section-header__title">
                My skills.
              </h2>
            </header>
            <div className={`container ${styles["about-page-skills-panel"]}`}>
              <div className={styles["about-page-skill-marquee"]}>
                {toolboxIconRows.map((row, rowIndex) => (
                  <LogoMarquee
                    ariaLabel={rowIndex === 0 ? "Technologies and tools" : "More technologies and tools"}
                    className={styles["about-page-skill-marquee__row"]}
                    direction={rowIndex % 2 === 0 ? "left" : "right"}
                    imageClassName={styles["about-page-skill-icon__image"]}
                    itemClassName={styles["about-page-skill-icon"]}
                    items={row}
                    key={`tool-row-${rowIndex}`}
                    speed={rowIndex % 2 === 0 ? 16 : 14}
                  />
                ))}
              </div>
              <div className={styles["about-page-skill-list"]}>
                {toolbox.map((group) => (
                  <p className={styles["about-page-skill-list__item"]} key={group.title}>
                    <strong className={styles["about-page-skill-list__label"]}>{group.title}</strong> {group.items.join(", ")}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
      <ContactFooter portfolio={portfolio} />
    </div>
  );
}
