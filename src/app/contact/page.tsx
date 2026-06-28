import type { Metadata } from "next";
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

const responseNotes = [
  { label: "Reply window", value: "Usually within 24 hours" },
  { label: "Best first step", value: "Send goals, URL, timeline, and budget range" },
  { label: "Work style", value: "Clear scope, regular updates, clean handoff" },
];

const fitChecks = [
  "You need a site or product interface that feels polished and loads fast.",
  "You want someone who can connect UX, implementation, CMS editing, and launch details.",
  "You prefer clear scope and practical delivery over vague calls and surprise changes.",
];

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
                  <i> I&apos;ll map it.</i>
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
                <span className={styles["contact-page__eyebrow"]}>Direct contact</span>
                <h2>Fastest way to reach me.</h2>
                <div className={styles["contact-methods"]}>
                  <a className={styles["contact-method"]} href={`mailto:${profile.email}`}>
                    <span>Email</span>
                    <strong>{profile.email}</strong>
                    <IconGlyph name="arrowRight" />
                  </a>
                  <a className={styles["contact-method"]} href={`tel:${profile.phone.replace(/\s+/g, "")}`}>
                    <span>Phone</span>
                    <strong>{profile.phone}</strong>
                    <IconGlyph name="phone" />
                  </a>
                  <a className={styles["contact-method"]} href={profile.linkedin} target="_blank" rel="noreferrer">
                    <span>Profile</span>
                    <strong>LinkedIn</strong>
                    <IconGlyph name="externalLink" />
                  </a>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </section>

        <section className={`section ${styles["contact-fit"]}`}>
          <div className="section__inner">
            <div className={`container ${styles["contact-fit__inner"]}`}>
              <div className={styles["contact-fit__copy"]}>
                <span className={styles["contact-page__eyebrow"]}>Good fit</span>
                <h2>
                  Best when you need <i>clear decisions</i> with production code.
                </h2>
              </div>
              <div className={styles["contact-fit__grid"]}>
                {fitChecks.map((item) => (
                  <div className={styles["contact-fit__item"]} key={item}>
                    <IconGlyph name="check" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className={styles["contact-response-grid"]}>
                {responseNotes.map((note) => (
                  <div className={styles["contact-response-card"]} key={note.label}>
                    <span>{note.label}</span>
                    <strong>{note.value}</strong>
                  </div>
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
