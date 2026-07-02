import { IconGlyph } from "./IconGlyph";
import styles from "./ProcessSection.module.scss";

export function ProcessSection() {
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
    "Discovery",
    "Planning",
    "Development",
    "Testing",
    "Deployment + Support",
  ];

  return (
    <section className="section" id="process">
      <div className="section__inner">
        <div className={`container ${styles["process"]}`}>
          <header className="section-header section-header--center">
            <span className="section-header__label">Working style</span>
            <h2 className="section-header__title">My development process</h2>
            <p className="section-header__text">
              A developer-led process built around planning, architecture, development, testing, deployment, and long-term support.
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
              <span className={styles["process__panel-label"]}>Process I Follow</span>
              <ol className={styles["process__ordered-list"]}>
                {clientFirstProcess.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
