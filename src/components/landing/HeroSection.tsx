import type { PortfolioData } from "@/context/PortfolioContentContext";
import { projects } from "@/data/work";
import { IconGlyph } from "./IconGlyph";
import styles from "./HeroSection.module.scss";

export function HeroSection({ portfolio }: { portfolio: PortfolioData }) {
  const proofClients = portfolio.clients.filter((client) => client.showInClientImages && client.avatar).slice(0, 4);
  const proofClient = portfolio.clients.find((client) => "proofText" in client);
  const proofText = proofClient && "proofText" in proofClient ? proofClient.proofText : "";
  const productTools = projects.filter((project) => project.kind === "free-tool").slice(0, 2);
  const brickify = productTools.find((tool) => tool.title === "Brickify");
  const heroTestimonial = portfolio.clients.find((client) => client.name === "Markedine") ?? portfolio.clients.find((client) => client.testimonial);

  return (
    <section id="top" className={`${styles["hero"]} section section--hero`}>
      <div className={styles["hero__texture"]} aria-hidden="true" />
      <div className="section__inner">
        <div className={`container ${styles["hero__grid"]}`}>
          <div className={styles["hero__copy"]}>
            <div className={styles["hero__badges"]} aria-label="Availability and trust badges">
              {portfolio.hero.badges.map((badge) => (
                <span className={`badge ${styles["hero__badge"]}`} key={badge.label}>
                  <IconGlyph name={badge.icon} />
                  {badge.label}
                </span>
              ))}
            </div>
            <h1 className={styles["hero__title"]}>
              <span className={`${styles["hero__title-line"]} ${styles["hero__title-line--intro"]}`}>Hi, I&apos;m M Ayoub.</span>
              <span className={styles["hero__title-line"]}>
                I build websites that bring more <span data-accent>leads.</span>
              </span>
            </h1>

            <p className={styles["hero__text"]}>
              I design and develop fast React, Next.js, WordPress, and WooCommerce websites that make offers clearer,
              improve trust, and turn visitors into inquiries.
            </p>

            <div className={styles["hero__actions"]}>
              <a className="button" href="#cta">
                {portfolio.hero.primaryCta}
                <IconGlyph name="arrowRight" />
              </a>
              <a className="button button--ghost" href="#work">
                {portfolio.hero.secondaryCta}
                <IconGlyph name="layers" />
              </a>
            </div>

            <div className={styles["hero__client-proof"]} aria-label="Client reviews">
              <div className={styles["hero__client-photos"]} aria-hidden="true">
                {proofClients.map((client) => (
                  <span className={styles["hero__client-photo"]} key={client.name}>
                    {client.avatar ? <img src={client.avatar} alt="" loading="lazy" /> : client.initials}
                  </span>
                ))}
              </div>
              <div className={styles["hero__client-copy"]}>
                <span className={styles["hero__client-stars"]}>5.0 rating</span>
                <strong className={styles["hero__client-text"]}>{proofText}</strong>
              </div>
            </div>
          </div>

          <aside className={styles["hero__profile-panel"]} aria-label="Muhammad Ayoub profile and testimonial">
            <div className={styles["hero__identity"]} aria-label="Muhammad Ayoub profile">
              <span className={styles["hero__portrait"]}>
                <img src="/ayoub-about-v2.jpg" alt="Muhammad Ayoub" />
              </span>
              <div className={styles["hero__identity-copy"]}>
                <strong>Muhammad Ayoub</strong>
                <span>Frontend and WordPress developer</span>
              </div>
            </div>
            {heroTestimonial ? (
              <figure className={styles["hero__quote-card"]}>
                <blockquote>{heroTestimonial.testimonial}</blockquote>
                <figcaption>
                  <strong>{heroTestimonial.name}</strong>
                  <span>{heroTestimonial.role}</span>
                </figcaption>
              </figure>
            ) : null}
            {brickify ? (
              <a className={styles["hero__brickify-strip"]} href={brickify.href} target="_blank" rel="noreferrer">
                <span className={styles["hero__tool-icon"]}>
                  <IconGlyph name={brickify.icon} />
                </span>
                <strong className={styles["hero__tool-name"]}>{brickify.title}</strong>
                <span className={styles["hero__tool-description"]}>
                  HTML, CSS, and JS to Bricks Builder JSON.
                </span>
                <IconGlyph name="externalLink" />
              </a>
            ) : null}
          </aside>
        </div>
      </div>
    </section>
  );
}
