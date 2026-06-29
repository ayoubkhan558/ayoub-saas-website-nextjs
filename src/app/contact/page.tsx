import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { IconGlyph } from "@/components/landing/IconGlyph";
import { ContactFooter } from "@/components/landing/ContactFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import portfolio from "@/data/portfolio.json";
import styles from "@/components/contact/ContactPage.module.scss";

export const metadata: Metadata = {
  title: "Contact / Hire Me | Muhammad Ayoub",
  description:
    "Contact Muhammad Ayoub for React, Next.js, WordPress, WooCommerce, and conversion-focused frontend development projects.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact / Hire Me | Muhammad Ayoub",
    description:
      "Send project details, request a build estimate, or contact Muhammad Ayoub for frontend and WordPress development work.",
    type: "website",
    url: "/contact",
  },
};

export default function ContactPage() {
  const profile = portfolio.profile;
  const mailto = `mailto:${profile.email}?subject=Project%20details%20for%20Muhammad%20Ayoub`;

  return (
    <div className="site-shell">
      <SiteHeader portfolio={portfolio} />
      <main>
        <section className={`section ${styles["contact-hero"]}`}>
          <div className="section__inner">
            <div className={`container ${styles["contact-hero__inner"]}`}>
              <div className={styles["contact-hero__copy"]}>
                <span className={styles["contact-page__eyebrow"]}>Contact / Hire Me</span>
                <h1>
                  Send details.
                  I&apos;ll map it.
                </h1>
                <p>
                  Share what you want built, what is currently blocking progress, and when you need it live.
                  I will respond with the practical next step.
                </p>
                <div className={styles["contact-hero__actions"]}>
                  <a className="button button--dark" href={mailto}>
                    Send project details
                    <IconGlyph name="arrowRight" />
                  </a>
                  <a className="button button--ghost" href={`mailto:${profile.email}?subject=Build%20estimate%20request`}>
                    Get a build estimate
                    <IconGlyph name="arrowRight" />
                  </a>
                </div>
              </div>

              <aside className={styles["contact-signal-panel"]} aria-label="Project contact summary">
                <span className={styles["contact-signal-panel__label"]}>Available for</span>
                <strong>{profile.availability}</strong>
                <p>{profile.summary}</p>
                <div className={styles["contact-signal-panel__meta"]}>
                  <span>{profile.location}</span>
                  <span>{profile.role}</span>
                </div>
              </aside>
            </div>
          </div>
        </section>

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
                  <a className={styles["contact-method"]} href={`mailto:${profile.email}`}>
                    <span className={styles["contact-method__label"]}>Email</span>
                    <strong>{profile.email}</strong>
                    <IconGlyph name="arrowRight" />
                  </a>
                  <a className={styles["contact-method"]} href={`tel:${profile.phone.replace(/\s+/g, "")}`}>
                    <span className={styles["contact-method__label"]}>Phone</span>
                    <strong>{profile.phone}</strong>
                    <IconGlyph name="phone" />
                  </a>
                  <a className={styles["contact-method"]} href={profile.linkedin} target="_blank" rel="noreferrer">
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

        <section className={`section ${styles["contact-faqs"]}`}>
          <div className="section__inner">
            <div className={`container ${styles["contact-faqs__inner"]}`}>
              <div className={styles["contact-faqs__copy"]}>
                <span className={styles["contact-page__eyebrow"]}>FAQs</span>
                <h2>
                  Questions clients ask before starting.
                </h2>
                <p>
                  Short answers on project fit, cost, timelines, and taking over an existing site or codebase.
                </p>
              </div>
              <div className={styles["contact-faqs__grid"]}>
                {portfolio.faqs.map((faq, index) => (
                  <details className={styles["contact-faq-card"]} key={faq.question} open={index === 0}>
                    <summary className={styles["contact-faq-card__question"]}>
                      <span className={styles["contact-faq-card__index"]}>{String(index + 1).padStart(2, "0")}</span>
                      <span className={styles["contact-faq-card__question-text"]}>{faq.question}</span>
                      <span className={styles["contact-faq-card__toggle"]} aria-hidden="true" />
                    </summary>
                    <p className={styles["contact-faq-card__answer"]}>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <ContactFooter portfolio={portfolio} />
    </div>
  );
}
