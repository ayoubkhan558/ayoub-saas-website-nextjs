import Link from "next/link";
import { IconGlyph } from "@/components/landing/IconGlyph";
import type { PortfolioData } from "@/context/PortfolioContentContext";
import { serviceCardVariants, serviceIcons } from "./servicesPageData";
import styles from "./ServicesPage.module.scss";

type Service = PortfolioData["services"][number];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const variant = serviceCardVariants[index] ?? "product";

  return (
    <article
      className={[
        styles["services-offer-card"],
        styles[`services-offer-card--${variant}`],
        service.highlight ? styles["services-offer-card--featured"] : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles["services-offer-card__top"]}>
        <span className={styles["services-offer-card__level"]}>{service.level}</span>
        <span className={styles["services-offer-card__icon"]}>
          <IconGlyph name={serviceIcons[index]} />
        </span>
      </div>
      <div className={styles["services-offer-card__title-row"]}>
        <h3>{service.name}</h3>
        <span>
          {service.price}
          <small>{service.period}</small>
        </span>
      </div>
      <p className={styles["services-offer-card__description"]}>{service.description}</p>

      <dl className={styles["services-offer-card__details"]}>
        <div>
          <dt>What you get</dt>
          <dd>{service.whatYouGet}</dd>
        </div>
        <div>
          <dt>Timeline</dt>
          <dd>{service.timeline}</dd>
        </div>
        <div>
          <dt>Best fit</dt>
          <dd>{service.bestFit}</dd>
        </div>
      </dl>

      <ul className={styles["services-offer-card__features"]}>
        {service.features.map((feature) => (
          <li key={feature}>
            <IconGlyph name="check" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link className={styles["services-offer-card__link"]} href="/contact">
        {service.cta}
        <IconGlyph name="arrowRight" />
      </Link>
    </article>
  );
}

export function ServicesOffers({ services }: { services: PortfolioData["services"] }) {
  return (
    <section className="section">
      <div className="section__inner">
        <div className={`container ${styles["services-offers__inner"]}`}>
          <header className={styles["services-section-header"]}>
            <span className={styles["services-page__eyebrow"]}>What I build</span>
            <h2>
              Three focused ways to <i>ship the right thing.</i>
            </h2>
            <p>
              Each service is scoped around what a buyer actually needs: outcome, timeline, best fit, and what is
              included.
            </p>
          </header>

          <div className={styles["services-offer-grid"]}>
            {services.map((service, index) => (
              <ServiceCard service={service} index={index} key={service.name} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
