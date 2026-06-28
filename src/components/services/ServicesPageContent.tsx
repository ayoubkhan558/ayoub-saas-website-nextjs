import { ServicesHero } from "./ServicesHero";
import { ServicesOffers } from "./ServicesOffers";
import { ServicesOutcomes } from "./ServicesOutcomes";
import { ServicesProcess } from "./ServicesProcess";
import type { PortfolioData } from "@/context/PortfolioContentContext";

export function ServicesPageContent({ portfolio }: { portfolio: PortfolioData }) {
  return (
    <main>
      <ServicesHero />
      <ServicesOffers services={portfolio.services} />
      <ServicesOutcomes />
      <ServicesProcess process={portfolio.process} />
    </main>
  );
}
