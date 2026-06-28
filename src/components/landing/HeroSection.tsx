import type { PortfolioData } from "@/context/PortfolioContentContext";
import { projects } from "@/data/work";
import { Typewriter } from "react-simple-typewriter";
import { IconGlyph } from "./IconGlyph";
import styles from "./HeroSection.module.scss";

export function HeroSection({ portfolio }: { portfolio: PortfolioData }) {
  const profile = portfolio.profile;
  const industries = portfolio.trustMarquee.slice(0, 6);
  const proofClients = portfolio.clients.filter((client) => client.showInClientImages && client.avatar).slice(0, 4);
  const proofClient = portfolio.clients.find((client) => "proofText" in client);
  const proofText = proofClient && "proofText" in proofClient ? proofClient.proofText : "";
  const productTools = projects.filter((project) => project.kind === "free-tool").slice(0, 2);
  const brickify = productTools.find((tool) => tool.title === "Brickify");
  const heroTestimonial = portfolio.clients.find((client) => client.name === "Markedine") ?? portfolio.clients.find((client) => client.testimonial);
  const headlineLineTwoWords = portfolio.hero.headlineLineTwo.trim().split(" ");
  const headlineLineTwoAccent = headlineLineTwoWords.pop();
  const headlineLineTwoLead = headlineLineTwoWords.join(" ");

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
              <span className={`${styles["hero__title-line"]} ${styles["hero__title-line--editorial"]}`}>
                {portfolio.hero.headlineLineOne}
              </span>
              <span className={styles["hero__title-line"]}>
                {headlineLineTwoLead ? `${headlineLineTwoLead} ` : ""}
                <span data-accent>{headlineLineTwoAccent}</span>
              </span>
            </h1>
            <p className={styles["hero__text"]}>{profile.summary}</p>
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
            <div className={styles["hero__industries"]} aria-label="Industries served">
              <span className={styles["hero__industries-label"]}>Industries I serve</span>
              <div className={styles["hero__industries-track"]}>
                <strong className={styles["hero__industries-item"]}>
                  <Typewriter
                    words={industries.map((industry) => industry.name)}
                    loop={0}
                    cursor
                    cursorStyle="_"
                    typeSpeed={52}
                    deleteSpeed={28}
                    delaySpeed={1400}
                  />
                </strong>
              </div>
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
                <span className={styles["hero__client-stars"]}>★★★★★</span>
                <strong className={styles["hero__client-text"]}>{proofText}</strong>
              </div>
            </div>
          </div>

          <div className={styles["hero__side"]}>
            <div className={styles["hero__product-proof"]} aria-label="Product builder proof">
              <div className={styles["hero__tool-grid"]}>
                {brickify ? (
                  <a className={`${styles["hero__tool-card"]} ${styles["hero__tool-card--primary"]}`} href={brickify.href} target="_blank" rel="noreferrer">
                    <span className={styles["hero__tool-topline"]}>
                      <IconGlyph name={brickify.icon} />
                      <span>Official Bricks Builder listing</span>
                    </span>
                    <strong className={styles["hero__tool-name"]}>{brickify.title}</strong>
                    <span className={styles["hero__tool-description"]}>
                      Converts HTML, CSS, and JS into Bricks Builder JSON so WordPress sites can be assembled faster.
                    </span>
                    <span className={styles["hero__tool-metric"]}>Saves development time on Bricks Builder website production</span>
                    <span className={styles["hero__tool-link"]}>
                      Open tool
                      <IconGlyph name="externalLink" />
                    </span>
                  </a>
                ) : null}
                {heroTestimonial ? (
                  <figure className={styles["hero__quote-card"]}>
                    <blockquote>{heroTestimonial.testimonial}</blockquote>
                    <figcaption>
                      <strong>{heroTestimonial.name}</strong>
                      <span>{heroTestimonial.role}</span>
                    </figcaption>
                  </figure>
                ) : null}
              </div>
            </div>
          </div>
          </div>
      </div>
    </section>
  );
}
