import type { Metadata } from "next";
import { ContactFooter } from "@/components/landing/ContactFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { ServicesPageContent } from "@/components/services/ServicesPageContent";
import portfolio from "@/data/portfolio.json";

export const metadata: Metadata = {
  title: "Services | Muhammad Ayoub",
  description:
    "React, Next.js, WordPress, WooCommerce, CMS, and conversion-focused website services by Muhammad Ayoub.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | Muhammad Ayoub",
    description:
      "Frontend, WordPress, WooCommerce, and website improvement services for businesses that need clean delivery and measurable outcomes.",
    type: "website",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="site-shell">
      <SiteHeader portfolio={portfolio} />
      <ServicesPageContent portfolio={portfolio} />
      <ContactFooter portfolio={portfolio} />
    </div>
  );
}
