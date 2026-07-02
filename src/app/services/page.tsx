import type { Metadata } from "next";
import { ContactFooter } from "@/components/landing/ContactFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { ServicesPageContent } from "@/components/services/ServicesPageContent";
import { buildServicesSchema, jsonLdScript } from "@/lib/seo-schema";
import portfolio from "@/content/portfolio/portfolio.json";

export const metadata: Metadata = {
  title: "Website Development Services",
  description:
    "WordPress, website design, WooCommerce, Bricks Builder, Elementor, React, Next.js, CMS setup, and performance services.",
  alternates: { canonical: "/services" },
  keywords: [
    "website development services",
    "WordPress development services",
    "website design services",
    "WooCommerce developer",
    "Next.js developer",
    "React website developer",
    "Bricks Builder developer",
    "Elementor developer",
  ],
  openGraph: {
    title: "Website Development Services | Muhammad Ayoub",
    description:
      "Front-end, React.js, HTML/CSS, JavaScript, landing page, and website improvement services for businesses that need clean delivery and measurable outcomes.",
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
