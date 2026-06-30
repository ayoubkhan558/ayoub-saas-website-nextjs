import type { PortfolioData } from "@/context/PortfolioContentContext";
import { LogoMarquee } from "@/components/shared/LogoMarquee";
import { IconGlyph } from "./IconGlyph";
import styles from "./HeroSection.module.scss";

const heroToolLogos = [
  { name: "Next.js", src: "/tools/nextjs.svg" },
  { name: "WordPress", src: "/tools/wordpress.svg" },
  { name: "WooCommerce", src: "/tools/woocommerce.svg" },
  { name: "Figma", src: "/tools/figma.svg" },
  { name: "JavaScript", src: "/tools/javascript.svg" },
  { name: "Tailwind", src: "/tools/tailwind.svg" },
  { name: "Sass", src: "/tools/sass.svg" },
  { name: "MySQL", src: "/tools/mysql.svg" },
];

export function HeroSection({ portfolio }: { portfolio: PortfolioData }) {
  const proofClients = portfolio.clients.filter((client) => client.showInClientImages && client.avatar).slice(0, 4);
  const proofClient = portfolio.clients.find((client) => "proofText" in client);
  const proofText = proofClient && "proofText" in proofClient ? proofClient.proofText : "";
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
            <p className={styles["hero__supporting-text"]}>
              I usually help with Figma-to-code builds, CMS pages your team can edit, store improvements, and existing
              front-end fixes where speed, responsiveness, and clean handoff matter.
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
                <strong>M. Ayoub</strong>
                <span>Frontend and WordPress developer</span>
                <span className={styles["hero__experience"]}>5+ Years of Experience</span>
              </div>
            </div>
            <div className={styles["hero__tool-marquee"]} aria-label="Tools and platforms">
              <span className={styles["hero__tool-marquee-label"]}>Stack I ship with</span>
              <LogoMarquee
                ariaLabel="Tools and platforms"
                className={styles["hero__tool-marquee-track"]}
                imageClassName={styles["hero__tool-logo-image"]}
                itemClassName={styles["hero__tool-logo"]}
                items={heroToolLogos}
                speed={14}
              />
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
          </aside>
        </div>
      </div>
    </section>
  );
}
