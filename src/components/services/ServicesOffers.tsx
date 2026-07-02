import Link from "next/link";
import { IconGlyph } from "@/components/landing/IconGlyph";
import type { PortfolioData } from "@/context/PortfolioContentContext";
import { serviceCardVariants, serviceIcons } from "./servicesPageData";
import styles from "./ServicesPage.module.scss";

type Service = PortfolioData["services"][number];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const variant = serviceCardVariants[index] ?? "product";
  const visibleFeatures = service.features.slice(0, 2);

  return (
    <article
      className={[
        styles["services-offer-card"],
        styles[`services-offer-card--${variant}`],
        service.featured ? styles["services-offer-card--featured"] : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles["services-offer-card__header"]}>
        <div className={styles["services-offer-card__meta"]}>
          <span className={styles["services-offer-card__level"]}>{service.level}</span>
          <span className={styles["services-offer-card__icon"]}>
            <IconGlyph name={serviceIcons[index]} />
          </span>
        </div>
        <div className={styles["services-offer-card__title-row"]}>
          <h3 className={styles["services-offer-card__title"]}>{service.name}</h3>
          <span className={styles["services-offer-card__price"]}>{service.price}</span>
        </div>
        <p className={styles["services-offer-card__description"]}>{service.description}</p>
      </div>

      <div className={styles["services-offer-card__feature-block"]}>
        <span className={styles["services-offer-card__feature-label"]}>Included</span>
        <ul className={styles["services-offer-card__features"]}>
          {visibleFeatures.map((feature) => (
            <li key={feature}>
              <IconGlyph name="check" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link className={styles["services-offer-card__link"]} href="/contact" title={`Request ${service.name}`}>
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
            <span className={styles["services-page__eyebrow"]}>Solutions I provide</span>
            <h2>
              Productized solutions for business website problems.
            </h2>
            <p>
              Each solution starts with the business pain point, then uses the right development approach behind the scenes.
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
