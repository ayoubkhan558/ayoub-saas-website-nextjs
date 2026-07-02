"use client";

import Link from "next/link";
import { IconGlyph } from "@/components/landing/IconGlyph";
import portfolio from "@/content/portfolio/portfolio.json";
import { Typewriter } from "react-simple-typewriter";
import { proofNotes } from "./servicesPageData";
import styles from "./ServicesPage.module.scss";

export function ServicesHero() {
  const industries = portfolio.trustMarquee.slice(0, 6);

  return (
    <section className={`section ${styles["services-page-hero"]}`}>
      <div className="section__inner">
        <div className={`container ${styles["services-page-hero__inner"]}`}>
          <div className={styles["services-page-hero__copy"]}>
            <span className={styles["services-page__eyebrow"]}>Solutions  </span>
            <h1>
              Web builds, done right.
            </h1>
            <p>
              Pick the service that matches the problem: product interfaces, editable WordPress sites, or
              conversion-focused e-commerce improvements.
            </p>
            <div className={styles["services-page-hero__actions"]}>
              <Link className="button" href="/contact" title="Hire Muhammad Ayoub for website development">
                Send project details
                <IconGlyph name="arrowRight" />
              </Link>
              <Link className="button button--ghost" href="/case-studies" title="View Muhammad Ayoub case studies">
                View case studies
                <IconGlyph name="arrowRight" />
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
