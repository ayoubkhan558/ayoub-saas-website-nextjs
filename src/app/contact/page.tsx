import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactFaqsSection } from "@/components/contact/ContactFaqsSection/ContactFaqsSection";
import { ContactForm, ContactFormFallback } from "@/components/contact/ContactForm/ContactForm";
import { ContactHeroSection } from "@/components/contact/ContactHeroSection/ContactHeroSection";
import { ContactInfoCard } from "@/components/contact/ContactInfoCard/ContactInfoCard";
import { ContactFooter } from "@/components/landing/ContactFooter/ContactFooter";
import { SiteHeader } from "@/components/landing/SiteHeader/SiteHeader";
import { buildContactSchema, jsonLdScript } from "@/lib/seo-schema";
import portfolio from "@/data/portfolio.json";
import styles from "@/components/contact/ContactPage.module.scss";

export const metadata: Metadata = {
  title: "Hire Muhammad Ayoub Khan",
  description:
    "Hire Muhammad Ayoub Khan for Bricks Builder, Figma to code, WordPress redesign, React, and Next.js projects.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Hire Muhammad Ayoub Khan",
    description:
      "Send project details for Bricks Builder, WordPress, or front-end development work.",
    type: "website",
    url: "/contact",
    images: [
      {
        url: "/ayoub-about-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Hire Muhammad Ayoub Khan web developer",
      },
    ],
  },
};

export default function ContactPage() {
  const profile = portfolio.profile;
  const schema = buildContactSchema();
  const jsonLd = { __html: jsonLdScript(schema) };

  return (
    <div className="site-shell">
      <script
        type="application/ld+json"
        id="contact-json-ld"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }}
      />
      <SiteHeader portfolio={portfolio} />
      <main>
        <ContactHeroSection profile={profile} />

        <section className="section">
          <div className="section__inner">
            <div className={`container ${styles["contact-layout"]}`}>
              <ContactInfoCard profile={profile} />

              <Suspense
                fallback={<ContactFormFallback />}
              >
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </section>

        <ContactFaqsSection faqs={portfolio?.faqs} />
      </main>
      <ContactFooter portfolio={portfolio} />
    </div>
  );
}
