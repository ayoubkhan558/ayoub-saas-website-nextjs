"use client";

import { ContactFooter } from "@/components/landing/ContactFooter";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProcessAboutSections } from "@/components/landing/ProcessAboutSections";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { TrustSections } from "@/components/landing/TrustSections";
import { WhySection } from "@/components/landing/WhySection";
import { WorkSections } from "@/components/landing/WorkSections";
import { usePortfolioContent } from "@/context/PortfolioContentContext";

export function PortfolioLanding() {
  const { portfolio } = usePortfolioContent();

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <SiteHeader portfolio={portfolio} />
      <main id="main">
        <HeroSection portfolio={portfolio} />
        <TrustSections portfolio={portfolio} />
        <ProblemSection portfolio={portfolio} />
        <WhySection portfolio={portfolio} />
        <WorkSections portfolio={portfolio} />
        <ProcessAboutSections portfolio={portfolio} />
        <ContactFooter portfolio={portfolio} />
      </main>
    </div>
  );
}
