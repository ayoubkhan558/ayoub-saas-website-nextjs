"use client";

import { ContactFooter } from "@/components/landing/ContactFooter";
import { FeaturedCaseStudiesSection } from "@/components/landing/FeaturedCaseStudiesSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { ProjectShowcaseSection } from "@/components/landing/ProjectShowcaseSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { ProofSection } from "@/components/landing/ProofSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { LeadMagnetSection } from "@/components/landing/LeadMagnetSection";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { TrustSections } from "@/components/landing/TrustSections";
import { usePortfolioContent } from "@/context/PortfolioContentContext";
import { caseStudies, projects } from "@/data/work";

export function PortfolioLanding() {
  const { portfolio } = usePortfolioContent();
  const featuredServices = portfolio.services.filter((service) => service.featured).slice(0, 3);
  const featuredCaseStudies = caseStudies.slice(0, 3);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main" title="Skip to main content">
        Skip to main content
      </a>
      <SiteHeader portfolio={portfolio} />
      <main id="main">
        <HeroSection portfolio={portfolio} />
        <TrustSections portfolio={portfolio} />
        <ProblemSection portfolio={portfolio} />
        <ServicesSection services={featuredServices} />
        <LeadMagnetSection />
        <ProjectShowcaseSection projects={projects} />
        <FeaturedCaseStudiesSection projects={featuredCaseStudies} />
        <ProofSection portfolio={portfolio} />
        <AboutSection portfolio={portfolio} />
        <ProcessSection />
        <FaqSection portfolio={portfolio} />
        <ContactFooter portfolio={portfolio} />
      </main>
    </div>
  );
}
