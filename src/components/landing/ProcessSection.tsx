import type { PortfolioData } from "@/context/PortfolioContentContext";
import { IconGlyph } from "./IconGlyph";
import styles from "./ProcessSection.module.scss";

export function ProcessSection({ portfolio }: { portfolio: PortfolioData }) {
  const expectations = [
    "Business-first thinking",
    "Conversion-focused solutions",
    "Clear and proactive communication",
    "Transparent process",
    "Fast iteration and feedback",
    "Clean, maintainable code",
    "Performance and SEO focus",
    "Reliable project delivery",
    "Long-term partnership",
  ];
  const clientFirstProcess = [
    "Discovery and requirements",
    "Planning and strategy",
    "Development and feedback",
    "Testing and optimization",
    "Launch and ongoing support",
  ];

  return (
    <section className="section" id="process">
      <div className="section__inner">
        <div className={`container ${styles["process"]}`}>
          <header className="section-header section-header--center">
            <span className="section-header__label">Working style</span>
            <h2 className="section-header__title">Why clients enjoy working with me</h2>
            <p className="section-header__text">
              A quick look at how I approach every project, from our first conversation to long-term support.
            </p>
          </header>
          <div className={styles["process__expectations"]}>
            <article className={styles["process__panel"]}>
              <span className={styles["process__panel-label"]}>What you can expect</span>
              <div className={styles["process__expectation-grid"]}>
                {expectations.map((item) => (
                  <span className={styles["process__expectation"]} key={item}>
                    <IconGlyph name="check" />
                    {item}
                  </span>
                ))}
              </div>
            </article>
            <article className={styles["process__panel"]}>
              <span className={styles["process__panel-label"]}>My client-first process</span>
              <ol className={styles["process__ordered-list"]}>
                {clientFirstProcess.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </article>
          </div>
          <div className={styles["process__timeline"]}>
            {portfolio.process.slice(0, 4).map((step) => (
              <article className={styles["process__step"]} key={step.tag}>
                <div className={styles["process__icon"]}>
                  <IconGlyph name={step.icon} />
                </div>
                <h3 className={styles["process__step-title"]}>{step.title}</h3>
                <p className={styles["process__step-text"]}>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
