import type { Metadata } from "next";
import { CaseStudiesPageContent } from "@/components/case-studies/listing/CaseStudiesPageContent/CaseStudiesPageContent";
import { ContactFooter } from "@/components/landing/ContactFooter/ContactFooter";
import { SiteHeader } from "@/components/landing/SiteHeader/SiteHeader";
import { getPageNumber } from "@/lib/pagination";
import { buildCaseStudiesSchema, jsonLdScript } from "@/lib/seo-schema";
import { caseStudies } from "@/data/work";
import portfolio from "@/data/portfolio.json";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Bricks Builder, Figma to code, Divi/Elementor migrations, and Shopify case studies by Muhammad Ayoub Khan.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Case Studies",
    description:
      "Project breakdowns for law firm, clinic, real estate, portfolio, and ecommerce website builds.",
    type: "website",
    url: "/case-studies",
    images: [
      {
        url: "/ayoub-about-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Ayoub Khan website development case studies",
      },
    ],
  },
};

export default async function CaseStudiesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const params = await searchParams;
  const currentPage = getPageNumber(params.page);
  const schema = buildCaseStudiesSchema();
  const jsonLd = { __html: jsonLdScript(schema) };

  return (
    <div className="site-shell">
      <script
        type="application/ld+json"
        id="case-studies-json-ld"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }}
      />
      <SiteHeader portfolio={portfolio} />
      <CaseStudiesPageContent caseStudies={caseStudies} currentPage={currentPage} />
      <ContactFooter portfolio={portfolio} />
    </div>
  );
}
