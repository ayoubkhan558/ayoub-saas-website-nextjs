"use client";

import { useState } from "react";
import Link from "next/link";
import { IconGlyph } from "@/components/landing/IconGlyph";
import type { PortfolioData } from "@/context/PortfolioContentContext";
import { serviceCardVariants, serviceIcons } from "./servicesPageData";
import styles from "./ServicesPage.module.scss";

type Service = PortfolioData["services"][number];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const variant = serviceCardVariants[index] ?? "product";
  const [activeTab, setActiveTab] = useState(0);
  const detailTabs = [
    { label: "Scope", value: service.whatYouGet },
    { label: "Timeline", value: service.timeline },
    { label: "Fit", value: service.bestFit },
  ];
  const visibleFeatures = service.features.slice(0, 2);
  const activeDetail = detailTabs[activeTab] ?? detailTabs[0];

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
          <span className={styles["services-offer-card__price"]}>
            {service.price}
            <small>{service.period}</small>
          </span>
        </div>
        <p className={styles["services-offer-card__description"]}>{service.description}</p>
      </div>

      <div className={styles["services-offer-card__tabs"]}>
        <div className={styles["services-offer-card__tab-list"]} role="tablist" aria-label={`${service.name} details`}>
          {detailTabs.map((tab, tabIndex) => (
            <button
              aria-controls={`service-panel-${index}-${tabIndex}`}
              aria-selected={activeTab === tabIndex}
              className={[
                styles["services-offer-tab"],
                activeTab === tabIndex ? styles["services-offer-tab--active"] : "",
              ]
                .filter(Boolean)
                .join(" ")}
              id={`service-tab-${index}-${tabIndex}`}
              key={tab.label}
              onClick={() => setActiveTab(tabIndex)}
              role="tab"
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
        <section
          aria-labelledby={`service-tab-${index}-${activeTab}`}
          className={styles["services-offer-card__tab-panel"]}
          id={`service-panel-${index}-${activeTab}`}
          role="tabpanel"
        >
          <h4 className={styles["services-offer-card__tab-title"]}>{activeDetail.label}</h4>
          <p className={styles["services-offer-card__tab-text"]}>{activeDetail.value}</p>
        </section>
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

      <div className={styles["services-offer-card__illustration"]} aria-hidden="true">
        <span className={styles["services-offer-card__illustration-node"]} />
        <span className={styles["services-offer-card__illustration-node"]} />
        <span className={styles["services-offer-card__illustration-node"]} />
        <span className={styles["services-offer-card__illustration-line"]} />
      </div>

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
              Services for websites that need better execution.
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
