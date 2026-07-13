"use client";

import Link from "next/link";
import { IconGlyph } from "@/components/landing/IconGlyph/IconGlyph";
import portfolio from "@/data/portfolio.json";
import { Typewriter } from "react-simple-typewriter";
import styles from "../ServicesPage.module.scss";

export function ServicesHero() {
  const industries = portfolio.trustMarquee.slice(0, 6);

  return (
    <section className={`section ${styles["services-page-hero"]}`}>
      <div className="section__inner">
        <div className={`container ${styles["services-page-hero__inner"]}`}>
          <div className={styles["services-page-hero__copy"]}>
            <span className={styles["services-page__eyebrow"]}>Solutions  </span>
            <h1>
              Bricks Builder, Figma to code, and WordPress redesign services
            </h1>
            <p>
              Pick the problem: Bricks builds, Figma handoff, WordPress redesigns, React landing pages, or store friction fixes.
            </p>
            <div className={styles["services-page-hero__actions"]}>
              <Link className="button" href="/contact" title="Hire Muhammad Ayoub for website development">
                Send project details
                <IconGlyph name="arrowRight" />
              </Link>
              <Link className="button button--ghost" href="/services/bricks-builder" title="Bricks Builder developer services">
                Bricks Builder
              </Link>
              <Link className="button button--ghost" href="/services/figma-to-code" title="Figma to code services">
                Figma to code
              </Link>
              <Link className="button button--ghost" href="/services/wordpress-redesign" title="WordPress redesign services">
                WordPress redesign
              </Link>
            </div>
          </div>

          <aside className={styles["services-signal-panel"]} aria-label="Solutions summary">
            <span className={styles["services-page__eyebrow"]}>Best for</span>
            <strong>Businesses that need delivery, not vague development.</strong>
            <div className={styles["services-industries"]} aria-label="Industries served">
              <span className={styles["services-page__eyebrow"]}>Industries I serve</span>
              <strong>
                <Typewriter
                  words={industries.map((industry) => industry.name)}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={52}
                  deleteSpeed={28}
                  delaySpeed={1400}
                />
              </strong>
            </div>
            {/* <div className={styles["services-signal-panel__grid"]}>
              {proofNotes.map((note) => (
                <div key={note.label}>
                  <span>{note.label}</span>
                  <p>{note.value}</p>
                </div>
              ))}
            </div> */}
          </aside>
        </div>
      </div>
    </section>
  );
}
