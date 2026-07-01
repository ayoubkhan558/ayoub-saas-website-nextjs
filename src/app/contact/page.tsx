import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactFaqsSection } from "@/components/contact/ContactFaqsSection";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactHeroSection } from "@/components/contact/ContactHeroSection";
import { IconGlyph } from "@/components/landing/IconGlyph";
import { ContactFooter } from "@/components/landing/ContactFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { buildContactSchema, jsonLdScript } from "@/lib/seo-schema";
import portfolio from "@/data/portfolio.json";
import styles from "@/components/contact/ContactPage.module.scss";

export const metadata: Metadata = {
  title: "Hire Muhammad Ayoub Khan",
  description:
    "Hire Muhammad Ayoub Khan for WordPress, website design, WooCommerce, React, Next.js, Bricks Builder, Elementor, and frontend projects.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Hire Muhammad Ayoub Khan | WordPress Developer",
    description:
      "Send project details, request a build estimate, or contact Muhammad Ayoub for freelance WordPress, website design, and front-end development work.",
    type: "website",
    url: "/contact",
    images: [
      {
        url: "/ayoub-about-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Hire Muhammad Ayoub Khan WordPress developer",
      },
    ],
  },
};

export default function ContactPage() {
  const profile = portfolio.profile;
  const schema = buildContactSchema();

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
              <div className={styles["contact-card"]}>
                <div className={styles["contact-card__header"]}>
                  <span className={styles["contact-page__eyebrow"]}>Direct contact</span>
                  <h2>Fastest way to reach me.</h2>
                  <p className={styles["contact-card__intro"]}>
                    Send the project goal, current URL if there is one, and the outcome you need. I reply with a clear
                    next step.
                  </p>
                  <div className={styles["contact-card__meta"]}>
                    <span>Reply within 24 hours</span>
                    <span>{profile.location}</span>
                  </div>
                </div>
                <div className={styles["contact-methods"]}>
                  <a className={styles["contact-method"]} href={`mailto:${profile.email}`} title="Email Muhammad Ayoub">
                    <span className={styles["contact-method__label"]}>Email</span>
                    <strong>{profile.email}</strong>
                    <IconGlyph name="arrowRight" />
                  </a>
                  <a className={styles["contact-method"]} href={`tel:${profile.phone.replace(/\s+/g, "")}`} title="Call Muhammad Ayoub">
                    <span className={styles["contact-method__label"]}>Phone</span>
                    <strong>{profile.phone}</strong>
                    <IconGlyph name="phone" />
                  </a>
                  <a className={styles["contact-method"]} href={profile.linkedin} target="_blank" rel="noreferrer" title="Visit Muhammad Ayoub LinkedIn profile">
                    <span className={styles["contact-method__label"]}>Profile</span>
                    <strong>LinkedIn</strong>
                    <IconGlyph name="externalLink" />
                  </a>
                </div>
                <dl className={styles["contact-details"]}>
                  <div>
                    <dt>Location</dt>
                    <dd>{profile.location}</dd>
                  </div>
                  <div>
                    <dt>Availability</dt>
                    <dd>{profile.availability}</dd>
                  </div>
                  <div>
                    <dt>Typical reply</dt>
                    <dd>Within 24 hours</dd>
                  </div>
                  <div>
                    <dt>Best brief</dt>
                    <dd>Goal, URL, timeline, stack, and budget range</dd>
                  </div>
                </dl>
              </div>

              <Suspense
                fallback={
                  <div className={styles["contact-form-card"]}>
                    <div className={styles["contact-form-card__header"]}>
                      <span className={styles["contact-page__eyebrow"]}>Project brief</span>
                      <h2>Loading form.</h2>
                    </div>
                  </div>
                }
              >
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </section>

        <ContactFaqsSection faqs={portfolio.faqs} />
      </main>
      <ContactFooter portfolio={portfolio} />
    </div>
  );
}
