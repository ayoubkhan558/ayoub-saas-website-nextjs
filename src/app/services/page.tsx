import type { Metadata } from "next";
import { ContactFooter } from "@/components/landing/ContactFooter/ContactFooter";
import { SiteHeader } from "@/components/landing/SiteHeader/SiteHeader";
import { ServicesPageContent } from "@/components/services/ServicesPageContent/ServicesPageContent";
import { buildServicesSchema, jsonLdScript } from "@/lib/seo-schema";
import portfolio from "@/data/portfolio.json";

export const metadata: Metadata = {
  title: "Website Development Services",
  description:
    "Bricks Builder developer, Figma to code, WordPress redesign, React landing pages, and WooCommerce cleanup by Muhammad Ayoub Khan.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Website Development Services",
    description:
      "Hire for Bricks Builder, Figma to WordPress, React/Next.js landing pages, and conversion-focused redesigns.",
    type: "website",
    url: "/services",
    images: [
      {
        url: "/ayoub-about-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Ayoub Khan website development services",
      },
    ],
  },
};

export default function ServicesPage() {
  const schema = buildServicesSchema();
  const jsonLd = { __html: jsonLdScript(schema) };

  return (
    <div className="site-shell">
      <script
        type="application/ld+json"
        id="services-json-ld"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }}
      />
      <SiteHeader portfolio={portfolio} />
      <ServicesPageContent portfolio={portfolio} />
      <ContactFooter portfolio={portfolio} />
    </div>
  );
}
