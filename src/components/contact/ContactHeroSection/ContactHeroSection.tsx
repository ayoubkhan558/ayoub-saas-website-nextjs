import { IconGlyph } from "@/components/landing/IconGlyph/IconGlyph";
import type { PortfolioData } from "@/context/PortfolioContentContext";
import styles from "./ContactHeroSection.module.scss";

export function ContactHeroSection({ profile }: { profile: PortfolioData["profile"] }) {
  const mailto = `mailto:${profile.email}?subject=Project%20details%20for%20Muhammad%20Ayoub`;

  return (
    <section className={`section ${styles["contact-hero"]}`}>
      <div className="section__inner">
        <div className={`container ${styles["contact-hero__inner"]}`}>
          <div className={styles["contact-hero__copy"]}>
            <span className={styles["contact-page__eyebrow"]}>Contact / Hire Me</span>
            <h1>
              Hire a Bricks Builder and front-end developer
            </h1>
            <p>
              Share the site, Figma, or brief. I will reply with the next step for Bricks, WordPress, React, or Next.js work.
            </p>
            <div className={styles["contact-hero__actions"]}>
              <a className="button" href={mailto} title="Send project details to Muhammad Ayoub">
                Send project details
                <IconGlyph name="arrowRight" />
              </a>
              <a className="button button--ghost" href={`mailto:${profile.email}?subject=Build%20estimate%20request`} title="Request a website build estimate">
                Get a build estimate
                <IconGlyph name="arrowRight" />
              </a>
            </div>
          </div>

          <aside className={styles["contact-signal-panel"]} aria-label="Project contact summary">
            <span className={styles["contact-signal-panel__label"]}>Available for</span>
            <strong>{profile.availability}</strong>
          </aside>
        </div>
      </div>
    </section>
  );
}
