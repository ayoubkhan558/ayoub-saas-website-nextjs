import type { PortfolioData } from "@/context/PortfolioContentContext";
import { Footer } from "@/components/Footer/Footer";
import { IconGlyph } from "./IconGlyph";
import styles from "./ContactFooter.module.scss";

export function ContactFooter({ portfolio }: { portfolio: PortfolioData }) {
  const profile = portfolio.profile;

  return (
    <>
      <section className={`section ${styles["cta"]}`} id="cta">
        <div className="section__inner" style={{ padding: 0 }}>
            <div className={`container ${styles["cta__inner"]}`} style={{ width: '100%', margin: 0 }}>
              <div className={styles["cta__copy"]}>
                <span className={styles["cta__label"]}>Contact / Hire Me</span>
                <h2 className={styles["cta__title"]}>
                  Let&apos;s build it
                  <i className={styles["cta__title-accent"]}> right.</i>
                </h2>
                <p className={styles["cta__text"]}>
                  Share your goals, current site, and timeline. I will respond with a practical next
                  step for WordPress, WooCommerce, React, or Next.js work.
                </p>
                <div className={styles["cta__intent-actions"]}>
                  <a className="button button--dark" href={`mailto:${profile.email}?subject=Project%20details`}>
                    Send project details
                    <IconGlyph name="arrowRight" />
                  </a>
                  <a className="button button--ghost" href={`mailto:${profile.email}?subject=Build%20estimate%20request`}>
                    Get a build estimate
                    <IconGlyph name="arrowRight" />
                  </a>
                </div>
              </div>
              <div className={styles["cta__actions"]}>
                <a className={styles["cta__primary-contact"]} href={`mailto:${profile.email}`}>
                  <span className={styles["cta__contact-label"]}>Email</span>
                  <strong className={styles["cta__contact-value"]}>{profile.email}</strong>
                  <IconGlyph name="arrowRight" />
                </a>
                <a className={styles["cta__secondary-contact"]} href={`tel:${profile.phone.replace(/\s+/g, "")}`}>
                  <IconGlyph name="phone" />
                  {profile.phone}
                </a>
                <a className={styles["cta__secondary-contact"]} href={profile.linkedin} target="_blank" rel="noreferrer">
                  <IconGlyph name="externalLink" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
      </section>
      <Footer portfolio={portfolio} />
    </>
  );
}
