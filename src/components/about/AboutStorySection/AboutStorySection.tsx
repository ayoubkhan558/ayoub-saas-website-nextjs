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
            <Image src="/ayoub-about-v2.jpg" alt={`${fullName} website developer`} title={`${fullName} website developer`} sizes="(max-width: 760px) 100vw, 40vw" {...getImageDimensions("/ayoub-about-v2.jpg")} />
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
      </div>
    </section>
  );
}
