import { ServicesHero } from "../ServicesHero/ServicesHero";
import { ServicesOffers } from "../ServicesOffers/ServicesOffers";
import { ServicesOutcomes } from "../ServicesOutcomes/ServicesOutcomes";
import { ServicesProcess } from "../ServicesProcess/ServicesProcess";
import type { PortfolioData } from "@/context/PortfolioContentContext";

export function ServicesPageContent({ portfolio }: { portfolio: PortfolioData }) {
  return (
    <main>
      <ServicesHero />
      <ServicesOffers services={portfolio?.services} />
      <ServicesProcess process={portfolio?.process} />
      <ServicesOutcomes />
    </main>
  );
}
