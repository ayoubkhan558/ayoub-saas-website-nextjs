import type { Metadata } from "next";
import { ContactFooter } from "@/components/landing/ContactFooter/ContactFooter";
import { SiteHeader } from "@/components/landing/SiteHeader/SiteHeader";
import { ServicesPageContent } from "@/components/services/ServicesPageContent/ServicesPageContent";
import { buildServicesSchema, jsonLdScript } from "@/lib/seo-schema";
import portfolio from "@/data/portfolio.json";

export const metadata: Metadata = {
  title: "Website Development Services",
  description:
    "Custom web apps, landing pages, website redesigns, speed optimization, e-commerce setup, and ongoing support by Muhammad Ayoub Khan.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Website Development Services",
    description:
      "Custom web apps, landing pages, website redesigns, speed optimization, e-commerce setup, and ongoing support.",
    type: "website",
    url: "/services",
    images: [
      {
        url: "/social/ayoub-portfolio-thumbnail-services.jpg",
        width: 1734,
        height: 907,
        alt: "Muhammad Ayoub Khan website development services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Development Services",
    description:
      "Custom web apps, landing pages, website redesigns, speed optimization, e-commerce setup, and ongoing support.",
    images: ["/social/ayoub-portfolio-thumbnail-services.jpg"],
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
