import type { PortfolioData } from "@/context/PortfolioContentContext";
import { AboutSection } from "./AboutSection";
import { FaqSection } from "./FaqSection";
import { ProcessSection } from "./ProcessSection";
import { ProofSection } from "./ProofSection";

type ProcessAboutSectionsVariant = "all" | "proof-process" | "about-faq";

export function ProcessAboutSections({
  portfolio,
  variant = "all",
}: {
  portfolio: PortfolioData;
  variant?: ProcessAboutSectionsVariant;
}) {
  return (
    <>
      {variant === "all" || variant === "proof-process" ? (
        <>
          <ProofSection portfolio={portfolio} />
          <ProcessSection portfolio={portfolio} />
        </>
      ) : null}
      {variant === "all" || variant === "about-faq" ? (
        <>
          <AboutSection portfolio={portfolio} />
          <FaqSection portfolio={portfolio} />
        </>
      ) : null}
    </>
  );
}
