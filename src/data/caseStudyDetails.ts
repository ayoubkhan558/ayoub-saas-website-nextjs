import caseStudyDetailsJson from "./caseStudyDetails.json";

export type CaseStudyDetailData = {
  slug: string;
  client: string;
  urlLabel: string;
  liveUrl: string;
  timeline: string;
  eyebrow: string;
  headline: string;
  tagline: string;
  overview: string;
  facts: Array<{ label: string; value: string }>;
  challenges: Array<{ title: string; text: string }>;
  results: Array<{ title: string; text: string }>;
  tools: string[];
  performanceNote: string;
  pageSpeed?: {
    source: string;
    testedUrl: string;
    measuredAt: string;
    mobile?: CaseStudyPageSpeedResult;
    desktop?: CaseStudyPageSpeedResult;
    mobileError?: string;
    desktopError?: string;
  };
  branding: {
    title: string;
    text: string;
    logoMark: string;
    logoImage?: string;
    fontName: string;
    fontMeta: string;
    palette: Array<{ label: string; tone?: "dark" | "gray" | "light" | "accent"; value?: string }>;
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

export type CaseStudyPageSpeedResult = {
  performance: number;
  fcp: string | null;
  lcp: string | null;
  cls: string | null;
  tbt: string | null;
  speedIndex: string | null;
};

export const caseStudyDetails = caseStudyDetailsJson as Record<string, CaseStudyDetailData>;
