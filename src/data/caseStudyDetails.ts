import caseStudyDetailsJson from "./caseStudyDetails.json";

export type CaseStudyDetailData = {
  slug: string;
  client: string;
  urlLabel: string;
  eyebrow: string;
  headline: string;
  tagline: string;
  overview: string;
  facts: Array<{ label: string; value: string }>;
  challenges: Array<{ title: string; text: string }>;
  results: Array<{ title: string; text: string }>;
  tools: Array<{ name: string; mark: string; meta: string }>;
  performanceNote: string;
  branding: {
    title: string;
    text: string;
    logoMark: string;
    fontName: string;
    fontMeta: string;
    palette: Array<{ label: string; tone: "dark" | "gray" | "light" | "accent" }>;
  };
  desktopPages: Array<{ name: string; type: string }>;
  responsiveBenefits: string[];
  testimonial: {
    quote: string;
    author: string;
    meta: string;
  };
  cta: {
    heading: string;
    text: string;
    buttonText: string;
  };
};

export const caseStudyDetails = caseStudyDetailsJson as Record<string, CaseStudyDetailData>;
