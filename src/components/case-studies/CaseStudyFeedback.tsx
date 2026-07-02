import type { CaseStudyDetailData } from "@/data/caseStudyDetails";
import { CaseStudySectionHeader } from "./CaseStudySectionHeader";
import styles from "./CaseStudyFeedback.module.scss";

export function CaseStudyFeedback({ study }: { study: CaseStudyDetailData }) {
  const authorImage = study.branding.clientImage ?? study.branding.logoImage;
  const authorImageAlt = study.branding.clientImage
    ? `${study.testimonial.author} client photo`
    : `${study.testimonial.author} logo`;

  return (
    <section className={`section ${styles.section}`}>
      <div className="section__inner">
        <div className={`container ${styles["section-inner"]}`}>
          <div className={styles["feedback-grid"]}>
            <div className={styles["feedback-header"]}>
              <CaseStudySectionHeader
                label="Client feedback"
                title="Five-star project feedback"
                text="Direct client validation for the delivery, communication, and final implementation."
              />
            </div>
            <figure className={styles["feedback-panel"]}>
              <div className={styles.stars} aria-label="Five out of five stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span aria-hidden="true" className={styles["star-icon"]} key={index}>
                    ★
                  </span>
                ))}
              </div>
              <blockquote className={styles["feedback-quote"]}>"{study.testimonial.quote}"</blockquote>
              <figcaption className={styles["feedback-author"]}>
                <span className={`${styles["feedback-author-image"]} ${study.branding.clientImage ? styles["feedback-author-image-photo"] : ""}`}>
                  {authorImage ? (
                    <img src={authorImage} alt={authorImageAlt} title={authorImageAlt} loading="lazy" />
                  ) : (
                    study.testimonial.author.slice(0, 2)
                  )}
                </span>
                <span className={styles["feedback-author-copy"]}>
                  <strong className={styles["feedback-author-name"]}>{study.testimonial.author}</strong>
                  <span className={styles["client-meta"]}>{study.testimonial.meta}</span>
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
