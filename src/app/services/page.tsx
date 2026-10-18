import type { Metadata } from "next";
import { ContactFooter } from "@/components/landing/ContactFooter/ContactFooter";
import { SiteHeader } from "@/components/landing/SiteHeader/SiteHeader";
import { ServicesPageContent } from "@/components/services/ServicesPageContent/ServicesPageContent";
import { buildServicesSchema, jsonLdScript } from "@/lib/seo-schema";
import portfolio from "@/data/portfolio.json";

const pageUrl = new URL("/services", portfolio.profile.website).toString();

export const metadata: Metadata = {
  title: "Website Development Services",
  description:
    "Bricks Builder, WordPress redesign, Figma-to-code, and React or Next.js development for real business growth.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Website Development Services",
    description:
      "Bricks Builder, WordPress redesign, Figma-to-code, and React or Next.js development for real business growth.",
    type: "website",
    url: pageUrl,
    siteName: portfolio.profile.brand,
    images: [
      {
        url: new URL("/social/ayoub-portfolio-thumbnail-services.jpg", portfolio.profile.website).toString(),
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
      "Bricks Builder, WordPress redesign, Figma-to-code, and React or Next.js development for real business growth.",
    images: [new URL("/social/ayoub-portfolio-thumbnail-services.jpg", portfolio.profile.website).toString()],
    site: "@ayoubkhan558",
    creator: "@ayoubkhan558",
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
