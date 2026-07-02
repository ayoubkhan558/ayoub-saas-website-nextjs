import { IconGlyph } from "./IconGlyph";
import styles from "./LeadMagnetSection.module.scss";

export function LeadMagnetSection() {
  return (
    <section className={`section ${styles["lead-magnet"]}`} id="lead-magnet">
      <div className="section__inner">
        <div className={`container ${styles["lead-magnet__container"]}`}>
          <div>
            <span className={styles["lead-magnet__label"]}>Free resource</span>
            <h2 className={styles["lead-magnet__title"]}>Get a free homepage checklist.</h2>
            <p className={styles["lead-magnet__text"]}>
              Not ready to start? Get a free homepage checklist. Find messaging, UX, and CTA issues before you redesign.
            </p>
          </div>
          <a
            className="button"
            href="/contact?subject=Free%20homepage%20checklist"
            title="Request the free homepage checklist"
          >
            Request checklist
            <IconGlyph name="arrowRight" />
          </a>
        </div>
      </div>
    </section>
  );
}