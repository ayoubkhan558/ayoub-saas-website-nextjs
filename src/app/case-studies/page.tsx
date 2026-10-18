import type { Metadata } from "next";
import { CaseStudiesPageContent } from "@/components/case-studies/listing/CaseStudiesPageContent/CaseStudiesPageContent";
import { ContactFooter } from "@/components/landing/ContactFooter/ContactFooter";
import { SiteHeader } from "@/components/landing/SiteHeader/SiteHeader";
import { getPageNumber } from "@/lib/pagination";
import { buildCaseStudiesSchema, jsonLdScript } from "@/lib/seo-schema";
import { caseStudies } from "@/data/work";
import portfolio from "@/data/portfolio.json";

const pageUrl = new URL("/case-studies", portfolio.profile.website).toString();

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Case studies showing Bricks Builder, Figma-to-code, WordPress redesigns, and Shopify growth work.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Case Studies",
    description:
      "Case studies showing Bricks Builder, Figma-to-code, WordPress redesigns, and Shopify growth work.",
    type: "website",
    url: pageUrl,
    siteName: portfolio.profile.brand,
    images: [
      {
        url: new URL("/social/ayoub-portfolio-thumbnail-case-studies.jpg", portfolio.profile.website).toString(),
        width: 1734,
        height: 907,
        alt: "Muhammad Ayoub Khan website development case studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies",
    description:
      "Case studies showing Bricks Builder, Figma-to-code, WordPress redesigns, and Shopify growth work.",
    images: [new URL("/social/ayoub-portfolio-thumbnail-case-studies.jpg", portfolio.profile.website).toString()],
    site: "@ayoubkhan558",
    creator: "@ayoubkhan558",
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
