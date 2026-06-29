import type { PortfolioData } from "@/context/PortfolioContentContext";
import { ClientTestimonials } from "./ClientTestimonials";
import styles from "./ProofSection.module.scss";

export function ProofSection({ portfolio }: { portfolio: PortfolioData }) {
  return (
    <section className={`section ${styles["proof"]}`} id="proof">
      <div className="section__inner">
        <div className="container">
          <ClientTestimonials clients={portfolio.clients} />
        </div>
      </div>
    </section>
  );
}
