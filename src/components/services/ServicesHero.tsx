import Link from "next/link";
import { IconGlyph } from "@/components/landing/IconGlyph";
import { proofNotes } from "./servicesPageData";
import styles from "./ServicesPage.module.scss";

export function ServicesHero() {
  return (
    <section className={`section ${styles["services-page-hero"]}`}>
      <div className="section__inner">
        <div className={`container ${styles["services-page-hero__inner"]}`}>
          <div className={styles["services-page-hero__copy"]}>
            <span className={styles["services-page__eyebrow"]}>Services / Hire me</span>
            <h1>
              Web builds, <i>done right.</i>
            </h1>
            <p>
              Pick the service that matches the problem: product interfaces, editable WordPress sites, or
              conversion-focused e-commerce improvements.
            </p>
            <div className={styles["services-page-hero__actions"]}>
              <Link className="button button--dark" href="/contact">
                Send project details
                <IconGlyph name="arrowRight" />
              </Link>
              <Link className="button button--ghost" href="/case-studies">
                View case studies
                <IconGlyph name="arrowRight" />
              </Link>
            </div>
          </div>

          <aside className={styles["services-signal-panel"]} aria-label="Services summary">
            <span className={styles["services-page__eyebrow"]}>Best for</span>
            <strong>Businesses that need delivery, not vague development.</strong>
            <div className={styles["services-signal-panel__grid"]}>
              {proofNotes.map((note) => (
                <div key={note.label}>
                  <span>{note.label}</span>
                  <p>{note.value}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
