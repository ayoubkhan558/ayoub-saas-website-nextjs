import type { PortfolioData } from "@/context/PortfolioContentContext";
import { Footer } from "@/components/Footer/Footer/Footer";
import { IconGlyph } from "../IconGlyph/IconGlyph";
import styles from "./ContactFooter.module.scss";

export function ContactFooter({ portfolio }: { portfolio: PortfolioData }) {
  const profile = portfolio.profile;
  const ctaContent = {
    label: "Contact / Hire Me",
    title: "Let's build it right.",
    text:
      "Share your goals, current site, and timeline. I will respond with a practical next step for custom React.js, HTML/CSS, JavaScript, or Next.js work.",
    primary: "Send project details",
    secondary: "Get a build estimate",
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
  };

  return (
    <>
      <section className={`section ${styles["cta"]}`} id="cta">
        <div className="section__inner" style={{ padding: 0 }}>
          <div className={`container ${styles["cta__inner"]}`} style={{ width: "100%", margin: 0 }}>
            <div className={styles["cta__copy"]}>
              <span className={styles["cta__label"]}>{ctaContent.label}</span>
              <h2 className={styles["cta__title"]}>{ctaContent.title}</h2>
              <p className={styles["cta__text"]}>{ctaContent.text}</p>
              <div className={styles["cta__intent-actions"]}>
                <a className="button" href={`mailto:${profile.email}?subject=Project%20details`} title="Send project details to Muhammad Ayoub">
                  {ctaContent.primary}
                  <IconGlyph name="arrowRight" />
                </a>
                <a className="button button--ghost" href={`mailto:${profile.email}?subject=Build%20estimate%20request`} title="Request a website build estimate">
                  {ctaContent.secondary}
                  <IconGlyph name="arrowRight" />
                </a>
              </div>
            </div>
            <div className={styles["cta__actions"]}>
              <a className={styles["cta__primary-contact"]} href={`mailto:${profile.email}`} title="Email Muhammad Ayoub">
                <span className={styles["cta__contact-label"]}>{ctaContent.emailLabel}</span>
                <strong className={styles["cta__contact-value"]}>{profile.email}</strong>
                <IconGlyph name="arrowRight" />
              </a>
              <a className={styles["cta__secondary-contact"]} href={`tel:${profile.phone.replace(/\s+/g, "")}`} title="Call Muhammad Ayoub">
                <IconGlyph name="phone" />
                {profile.phone}
              </a>
              <a className={styles["cta__secondary-contact"]} href={profile.linkedin} target="_blank" rel="noreferrer" title="Visit Muhammad Ayoub LinkedIn profile">
                <IconGlyph name="externalLink" />
                {ctaContent.linkedinLabel}
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer portfolio={portfolio} />
    </>
  );
}
