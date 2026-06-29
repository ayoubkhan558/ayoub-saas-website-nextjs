import Link from "next/link";
import type { PortfolioData } from "@/context/PortfolioContentContext";
import { IconGlyph } from "./IconGlyph";
import styles from "./ServicesSection.module.scss";

type Service = PortfolioData["services"][number];

export function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section className="section" id="services">
      <div className="section__inner">
        <div className={`container ${styles["services"]}`}>
          <header className="section-header section-header--center">
            <span className="section-header__label">Services</span>
            <h2 className="section-header__title">
              for growing <span>websites</span>
            </h2>
            <p className="section-header__text">
              Three ways I help businesses move from scattered site problems to maintained systems.
            </p>
          </header>
          <div className={styles["services__grid"]}>
            {services.map((service, index) => (
              <article
                className={`${styles["services__card"]} ${service.featured ? styles["services__card--featured"] : ""}`}
                key={service.name}
              >
                <div className={styles["services__icon"]}>
                  <IconGlyph name={index === 0 ? "globe" : index === 1 ? "cart" : "code"} />
                  <span className={styles["services__index"]}>0{index + 1}</span>
                </div>
                <h3 className={styles["services__card-title"]}>{service.name}</h3>
                <p className={styles["services__card-text"]}>{service.description}</p>
                <a className={styles["services__link"]} href={service.href}>
                  {service.cta}
                  <IconGlyph name="arrowRight" />
                </a>
              </article>
            ))}
          </div>
          <div className={styles["services__actions"]}>
            <Link className="button button--light" href="/services">
              View all services
              <IconGlyph name="arrowRight" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
