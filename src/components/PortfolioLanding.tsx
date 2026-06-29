"use client";

import { ContactFooter } from "@/components/landing/ContactFooter";
import { FeaturedCaseStudiesSection } from "@/components/landing/FeaturedCaseStudiesSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { ProjectShowcaseSection } from "@/components/landing/ProjectShowcaseSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { ProofSection } from "@/components/landing/ProofSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { TrustSections } from "@/components/landing/TrustSections";
import { usePortfolioContent } from "@/context/PortfolioContentContext";
import { caseStudies, projects } from "@/data/work";

export function PortfolioLanding() {
  const { portfolio } = usePortfolioContent();
  const featuredServices = portfolio.services.filter((service) => service.featured);
  const featuredCaseStudies = caseStudies.slice(0, 3);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <SiteHeader portfolio={portfolio} />
      <main id="main">
        <HeroSection portfolio={portfolio} />
        <TrustSections portfolio={portfolio} />
        <ServicesSection services={featuredServices} />
        <FeaturedCaseStudiesSection projects={featuredCaseStudies} />
        <ProjectShowcaseSection projects={projects} />
        <ProofSection portfolio={portfolio} />
        <AboutSection portfolio={portfolio} />
        <ProcessSection portfolio={portfolio} />
        <FaqSection portfolio={portfolio} />
        <ContactFooter portfolio={portfolio} />
      </main>
    </div>
  );
}
