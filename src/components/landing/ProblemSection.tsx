import type { PortfolioData } from "@/context/PortfolioContentContext";
import { IconGlyph } from "./IconGlyph";
import { SectionHeader } from "./SectionHeader";
import styles from "./ProblemSection.module.scss";

export function ProblemSection({ portfolio }: { portfolio: PortfolioData }) {
  return (
    <section className="section" id="problems">
      <div className="section__inner">
          <div className="container">
          <SectionHeader
            center
            label="Is this you?"
            title="Sound familiar?"
            eyebrow="Your site should build trust before your prospect ever books a call."
          />
          <div className={styles["problem__pain-grid"]}>
            {portfolio.painPoints.map((point, index) => (
              <article className={styles["problem__pain-card"]} key={point}>
                <span className={styles["problem__pain-index"]}>Issue 0{index + 1}</span>
                <h3 className={styles["problem__pain-title"]}>{point}</h3>
                <span className={styles["problem__pain-action"]} aria-hidden="true">
                  <IconGlyph name={index === 0 ? "users" : index === 1 ? "sparkles" : "gauge"} />
                </span>
              </article>
            ))}
          </div>
          {"bestFit" in portfolio ? (
            <div className={styles["problem__fit"]}>
              <span className={styles["problem__ticker-label"]}>Best fit for</span>
              <div className={styles["problem__fit-grid"]}>
                {(portfolio.bestFit as string[]).map((item) => (
                  <span className={styles["problem__fit-item"]} key={item}>
                    <IconGlyph name="check" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <div className={styles["problem__ticker"]}>
            <span className={styles["problem__ticker-label"]}>Problems I solve</span>
            <div className={styles["problem__ticker-track"]}>
              {portfolio.problemsSolved.map((problem) => (
                <strong className={styles["problem__ticker-item"]} key={problem}>{problem}</strong>
              ))}
            </div>
            <a className={`button ${styles["problem__ticker-button"]}`} href="/contact" title="Contact Muhammad Ayoub to fix my website">
              Let&apos;s fix my site <IconGlyph name="arrowRight" />
            </a>
          </div>
          </div>
      </div>
    </section>
  );
}
