import type { Metadata } from "next";
import Link from "next/link";
import { IconGlyph } from "@/components/landing/IconGlyph";
import { ContactFooter } from "@/components/landing/ContactFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import portfolio from "@/data/portfolio.json";
import styles from "@/components/about/AboutPage.module.scss";

export const metadata: Metadata = {
  title: "About Muhammad Ayoub | Front-End Engineer",
  description:
    "About Muhammad Ayoub, a front-end engineer building React, Next.js, WordPress, WooCommerce, and reliable web experiences.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Muhammad Ayoub | Front-End Engineer",
    description:
      "Learn about Muhammad Ayoub's experience, workflow, technical capabilities, and practical frontend development approach.",
    type: "profile",
    url: "/about",
  },
};

const storyCards = [
  {
    label: "How I got into web development",
    title: "I started in 2018 with downloaded lessons",
    text: "In the early days I did not have an internet connection at home, so I downloaded web development videos using my friends' internet, brought them back, and watched them again and again to learn HTML, CSS, and the basics of building for the web.",
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
  { value: "2018", label: "Started learning web development" },
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

const toolboxIcons = [
  { name: "Next.js", src: "/tools/nextjs.svg" },
  { name: "React", src: "/tools/javascript.svg" },
  { name: "WordPress", src: "/tools/wordpress.svg" },
  { name: "WooCommerce", src: "/tools/woocommerce.svg" },
  { name: "Figma", src: "/tools/figma.svg" },
  { name: "HTML", src: "/tools/html-5.svg" },
  { name: "CSS", src: "/tools/css-3.svg" },
  { name: "Tailwind", src: "/tools/tailwind.svg" },
  { name: "Sass", src: "/tools/sass.svg" },
  { name: "MySQL", src: "/tools/mysql.svg" },
];

const toolboxIconRows = [
  toolboxIcons,
  [...toolboxIcons].reverse(),
];

export default function AboutPage() {
  const education = portfolio.about.education;

  return (
    <div className="site-shell">
      <SiteHeader portfolio={portfolio} />
      <main>
        <section className={`section ${styles["about-page-hero"]}`}>
          <div className="section__inner">
            <div className={`container ${styles["about-page-hero__inner"]}`}>
              <div className={styles["about-page-hero__copy"]}>
                <span className={styles["about-page__eyebrow"]}>About / Muhammad Ayoub</span>
                <h1>
                  Self-taught developer, practical builder.
                </h1>
                <p>
                  I started learning web development in 2018 with downloaded videos, limited resources,
                  and a lot of patience. Today I build fast React, Next.js, WordPress, and WooCommerce
                  experiences for clients who need reliable delivery.
                </p>
                <div className={styles["about-page-hero__actions"]}>
                  <Link className="button button--dark" href="/contact">
                    Hire me
                    <IconGlyph name="arrowRight" />
                  </Link>
                  <a
                    className="button button--ghost"
                    href={portfolio.about.resumeHref}
                    target="_blank"
                    rel="noreferrer"
                    download
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
                <img src="/ayoub-about-v2.jpg" alt="Muhammad Ayoub" />
              </figure>
              <div className={styles["about-page-section-header"]}>
                <span className={styles["about-page__eyebrow"]}>My Story</span>
                <h2>
                  I learned the hard way, and that made me patient.
                </h2>
                <p>
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
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section__inner">
            <div className={`container ${styles["about-page-section-header"]}`}>
              <span className={styles["about-page__eyebrow"]}>Professional Experience</span>
              <h2>
                Roles across front-end, WordPress, and product delivery.
              </h2>
            </div>
            <div className={`container ${styles["about-page-experience-list"]}`}>
              {portfolio.experienceLog.map((item) => (
                <article className={styles["about-page-experience-item"]} key={`${item.year}-${item.company}`}>
                  <span>{item.year}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <strong>{item.company}</strong>
                    <p>{item.description}</p>
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
              <div className={styles["about-page-skill-marquee"]} aria-label="Technologies and tools">
                {toolboxIconRows.map((row, rowIndex) => (
                  <div className={styles["about-page-skill-marquee__row"]} key={`tool-row-${rowIndex}`}>
                    {[...row, ...row].map((tool, index) => (
                      <div
                        className={styles["about-page-skill-icon"]}
                        key={`${tool.name}-${rowIndex}-${index}`}
                        aria-hidden={index >= row.length}
                      >
                        <img src={tool.src} alt={index < row.length ? tool.name : ""} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className={styles["about-page-skill-list"]}>
                {toolbox.map((group) => (
                  <p key={group.title}>
                    <strong>{group.title}</strong> {group.items.join(", ")}
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
