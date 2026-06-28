import type { PortfolioData } from "@/context/PortfolioContentContext";
import { TrustLogos } from "./TrustLogos";
import styles from "./TrustSections.module.scss";

export function TrustSections({ portfolio }: { portfolio: PortfolioData }) {
  return (
    <section className={`${styles["trust-sections"]} section section--intro`} id="trust">
      <div className="section__inner">
          <div className={`${styles["trust-sections__logos"]} container container--fluid`}>
            <TrustLogos clients={portfolio.clients} />
          </div>
          <div className="container">
            <div className={`${styles["trust-stats__grid"]} ${styles["trust-stats__grid--metrics"]}`}>
              {portfolio.stats.map((stat) => (
                <div className={styles["trust-stats__card"]} key={stat.label}>
                  <strong className={styles["trust-stats__value"]}>
                    {stat.target}
                    {stat.suffix}
                  </strong>
                  <p className={styles["trust-stats__label"]}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
      </div>
    </section>
  );
}
