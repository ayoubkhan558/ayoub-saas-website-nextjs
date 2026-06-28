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
      </div>
    </section>
  );
}
