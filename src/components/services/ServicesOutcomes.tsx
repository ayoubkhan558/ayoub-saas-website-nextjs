import { outcomes } from "./servicesPageData";
import styles from "./ServicesPage.module.scss";

export function ServicesOutcomes() {
  return (
    <section className="section">
      <div className="section__inner">
        <div className={`container ${styles["services-outcomes__inner"]}`}>
          <div className={styles["services-outcomes__copy"]}>
            <span className={styles["services-page__eyebrow"]}>What changes</span>
            <h2>
              Less guessing. More <i>usable output.</i>
            </h2>
            <p>
              The goal is not just a prettier page. The goal is a clearer offer, cleaner implementation, easier updates,
              and fewer launch surprises.
            </p>
          </div>
          <div className={styles["services-outcomes__grid"]}>
            {outcomes.map((outcome, index) => (
              <div className={styles["services-outcome-card"]} key={outcome}>
                <span>0{index + 1}</span>
                <strong>{outcome}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
