import caseStudiesJson from "./caseStudies.json";
import projectsJson from "./projects.json";

export type CaseStudyCard = {
  tag: string;
  icon: string;
  title: string;
  description: string;
  result: string;
  achievement: string;
  stack: string[];
  href: string;
  liveUrl?: string;
  image: string;
  imageAlt: string;
};

export type ProjectCard = {
  icon: string;
  title: string;
  kind?: "free-tool" | "client-site" | string;
  badge?: string;
  description?: string;
  impact?: string;
  stack: string;
  technologies: string[];
  cta?: string;
  href: string;
  image: string;
  imageAlt: string;
};

export const caseStudies = caseStudiesJson as CaseStudyCard[];
export const projects = projectsJson as ProjectCard[];
