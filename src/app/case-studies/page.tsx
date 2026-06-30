import type { Metadata } from "next";
import { CaseStudiesPageContent } from "@/components/case-studies/listing/CaseStudiesPageContent";
import { ContactFooter } from "@/components/landing/ContactFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { getPageNumber } from "@/lib/pagination";
import { buildCaseStudiesSchema, jsonLdScript } from "@/lib/seo-schema";
import { caseStudies } from "@/data/work";
import portfolio from "@/data/portfolio.json";

export const metadata: Metadata = {
  title: "Case Studies | Muhammad Ayoub",
  description:
    "Case studies showing WordPress, WooCommerce, React, performance, SEO, and CMS results delivered by Muhammad Ayoub.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Case Studies | Muhammad Ayoub",
    description:
      "Detailed project breakdowns covering challenge, stack, execution, responsive layouts, branding, and client outcomes.",
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
