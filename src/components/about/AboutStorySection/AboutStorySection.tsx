import Image from "next/image";
import { getImageDimensions } from "@/lib/image-dimensions";
import type { PortfolioData } from "@/context/PortfolioContentContext";
import styles from "./AboutStorySection.module.scss";

export function AboutStorySection({ about }: { about: PortfolioData["about"] }) {
  const fullName = about.signature;

  return (
    <section className="section">
      <div className="section__inner">
        <div className={`container ${styles["about-page-story-feature"]}`}>
          <figure className={styles["about-page-story-portrait"]}>
            <Image src="/ayoub-about-v2.jpg" alt={`${fullName} web developer and SEO specialist`} title={`${fullName} web developer and SEO specialist`} sizes="(max-width: 760px) 100vw, 40vw" {...getImageDimensions("/ayoub-about-v2.jpg")} />
          </figure>
          <div className={styles["about-page-section-header"]}>
            <span className={styles["about-page__eyebrow"]}>My Story</span>
            <h2 className={styles["about-page-section-header__title"]}>
              I learned the hard way, and that made me patient.
            </h2>
            <p className={styles["about-page-section-header__text"]}>
              {about.originStory}
            </p>
            <article className={styles["about-page-education"]}>
              <span>Latest degree</span>
              <strong>{about.education}</strong>
            </article>
          </div>
        </div>

        <div className={`container ${styles["about-page-story-grid"]}`}>
          {about.storyCards.map((item) => (
            <article className={styles["about-page-feature-card"]} key={item.label}>
              <span className={styles["about-page-feature-card__label"]}>{item.label}</span>
              <h3 className={styles["about-page-feature-card__title"]}>{item.title}</h3>
              <p className={styles["about-page-feature-card__text"]}>{item.text}</p>
            </article>
          ))}
        </div>

        <div className={`container ${styles["about-page-journey"]}`}>
          <div className={styles["about-page-journey__header"]}>
            <span className={styles["about-page__eyebrow"]}>Career Path</span>
            <h3 className={styles["about-page-journey__title"]}>The path that shaped how I build.</h3>
          </div>

          <ol className={styles["about-page-journey__list"]}>
            {about.careerPath.map((item, index) => (
              <li
                key={`${item.year}-${item.title}`}
                className={`${styles["about-page-journey__item"]} ${item.current ? styles["about-page-journey__item--current"] : ""}`}
              >
                <span className={styles["about-page-journey__index"]}>{String(index + 1).padStart(2, "0")}</span>
                <div className={styles["about-page-journey__content"]}>
                  <div className={styles["about-page-journey__heading"]}>
                    <h4 className={styles["about-page-journey__name"]}>{item.title}</h4>
                    {item.current ? <span className={styles["about-page-journey__badge"]}>Full SEO</span> : null}
                  </div>
                  <p className={styles["about-page-journey__tech"]}>{item.technologies}</p>
                  <p className={styles["about-page-journey__description"]}>{item.description}</p>
                  <span className={styles["about-page-journey__year"]}>{item.year}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
