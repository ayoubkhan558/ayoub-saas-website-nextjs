import Image from "next/image";
import type { PortfolioData } from "@/context/PortfolioContentContext";
import styles from "./AboutExperienceSection.module.scss";

export function AboutExperienceSection({
  experienceLog,
  companyLogos,
}: {
  experienceLog: PortfolioData["experienceLog"];
  companyLogos: Record<string, string>;
}) {
  return (
    <section className="section">
      <div className="section__inner">
        <div className={`container ${styles["about-page-section-header"]}`}>
          <span className={styles["about-page__eyebrow"]}>Professional Experience</span>
          <h2 className={styles["about-page-section-header__title"]}>
            Roles across front-end, WordPress, and product delivery.
          </h2>
        </div>
        <div className={`container ${styles["about-page-experience-list"]}`}>
          {experienceLog.map((item) => {
            const logo = companyLogos[item.company];

            return (
            <article className={styles["about-page-experience-item"]} key={`${item.year}-${item.company}`}>
              <div className={styles["about-page-experience-item__meta"]}>
                <span className={styles["about-page-experience-item__year"]}>{item.year}</span>
                {logo ? (
                  <span className={styles["about-page-experience-item__logo"]}>
                    <Image
                      src={logo}
                      alt={`${item.company} logo`}
                      title={`${item.company} logo`}
                      fill
                      sizes="132px"
                      className={styles["about-page-experience-item__logo-img"]}
                    />
                  </span>
                ) : null}
              </div>
              <div className={styles["about-page-experience-item__body"]}>
                <h3 className={styles["about-page-experience-item__title"]}>{item.title}</h3>
                <strong className={styles["about-page-experience-item__company"]}>{item.company}</strong>
                <p className={styles["about-page-experience-item__text"]}>{item.description}</p>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
