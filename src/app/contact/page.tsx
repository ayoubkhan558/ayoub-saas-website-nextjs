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

const pageUrl = new URL("/contact", portfolio.profile.website).toString();

export const metadata: Metadata = {
  title: "Hire Muhammad Ayoub Khan",
  description:
    "Need a Bricks Builder, WordPress, React, or Next.js developer for a clean, conversion-focused project?",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Hire Muhammad Ayoub Khan",
    description:
      "Need a Bricks Builder, WordPress, React, or Next.js developer for a clean, conversion-focused project?",
    type: "website",
    url: pageUrl,
    siteName: portfolio.profile.brand,
    images: [
      {
        url: new URL("/social/ayoub-portfolio-thumbnail-contact.jpg", portfolio.profile.website).toString(),
        width: 1733,
        height: 908,
        alt: "Hire Muhammad Ayoub Khan web developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire Muhammad Ayoub Khan",
    description:
      "Need a Bricks Builder, WordPress, React, or Next.js developer for a clean, conversion-focused project?",
    images: [new URL("/social/ayoub-portfolio-thumbnail-contact.jpg", portfolio.profile.website).toString()],
    site: "@ayoubkhan558",
    creator: "@ayoubkhan558",
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
