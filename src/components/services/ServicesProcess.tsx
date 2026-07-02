import { IconGlyph } from "@/components/landing/IconGlyph";
import type { PortfolioData } from "@/context/PortfolioContentContext";
import styles from "./ServicesPage.module.scss";

export function ServicesProcess({ process }: { process: PortfolioData["process"] }) {
  return (
    <section className="section">
      <div className="section__inner">
        <div className={`container ${styles["services-process__inner"]}`}>
          <header className={styles["services-section-header"]}>
            <span className={styles["services-page__eyebrow"]}>How it runs</span>
            <h2>
              A simple process for clean delivery.
            </h2>
            <p>
              You get the scope, the build, the checks, and the handoff in a sequence that keeps decisions visible.
            </p>
          </header>

          <div className={styles["services-process__grid"]}>
            {process.map((step, index) => (
              <article className={styles["services-process-card"]} key={step.title}>
                {/* <span className={styles["services-process-card__index"]}>{String(index + 1).padStart(2, "0")}</span> */}
                <IconGlyph name={step.icon} />
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
