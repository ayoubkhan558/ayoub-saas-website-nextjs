import type { PortfolioData } from "@/context/PortfolioContentContext";
import { caseStudies, projects } from "@/data/work";
import { FeaturedCaseStudiesSection } from "./FeaturedCaseStudiesSection";
import { ProjectShowcaseSection } from "./ProjectShowcaseSection";
import { ServicesSection } from "./ServicesSection";

export function WorkSections({
  portfolio,
  variant = "primary",
}: {
  portfolio: PortfolioData;
  variant?: "primary" | "showcase";
}) {
  const featuredProjects = caseStudies.slice(0, 3);
  const showcasedProjects = projects.filter((project) => project.kind !== "free-tool");
  const services = portfolio.services.filter((service) => service.featured);

  if (variant === "showcase") {
    return <ProjectShowcaseSection projects={showcasedProjects} />;
  }

  return (
    <>
      <ServicesSection services={services} />
      <FeaturedCaseStudiesSection projects={featuredProjects} />
    </>
  );
}
