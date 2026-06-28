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

const principles = [
  {
    label: "Communication",
    title: "No mystery during the build",
    text: "You get clear updates, early blockers, and decisions surfaced before they become launch problems.",
  },
  {
    label: "Engineering",
    title: "Code another developer can read",
    text: "The work is structured around reusable sections, maintainable components, performance, and clean handoff.",
  },
  {
    label: "Delivery",
    title: "Scope, timeline, and ownership stay visible",
    text: "The goal is not just to finish screens. The goal is to leave you with a site, store, or interface your team can keep using.",
  },
];

export default function AboutPage() {
  const profile = portfolio.profile;
  const education = portfolio.recognition.find((item) => item.label === "Master of Computer Science");

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
                  Websites, tools, <i>faster builds.</i>
                </h1>
                <p>{portfolio.about.story}</p>
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

              <aside className={styles["about-page-portrait-card"]} aria-label="Muhammad Ayoub profile">
                <div className={styles["about-page-portrait-card__media"]}>
                  <img src="/ayoub-about-v2.jpg" alt="Muhammad Ayoub" />
                </div>
                <div className={styles["about-page-portrait-card__caption"]}>
                  <span>{profile.location}</span>
                  <strong>{profile.name}</strong>
                  <p>{profile.role}</p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section__inner">
            <div className={`container ${styles["about-page-proof__inner"]}`}>
              {portfolio.about.awards.map((award) => (
                <div className={styles["about-page-award"]} key={award}>
                  <span>{award.split(" ")[0]}</span>
                  <strong>{award}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`section ${styles["about-page-story"]}`}>
          <div className="section__inner">
            <div className={`container ${styles["about-page-story__inner"]}`}>
              <div className={styles["about-page-story__copy"]}>
                <span className={styles["about-page__eyebrow"]}>How I think</span>
                <h2>
                  Built fast is useful. Built to last is <i>better.</i>
                </h2>
                <p>{portfolio.about.motivation}</p>
                {education ? (
                  <div className={styles["about-page-education"]}>
                    <span>Education</span>
                    <strong>{education.label}</strong>
                    <p>{education.status}</p>
                  </div>
                ) : null}
              </div>
              <div className={styles["about-page-principles"]}>
                {principles.map((item) => (
                  <article className={styles["about-page-principle-card"]} key={item.label}>
                    <span>{item.label}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
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
