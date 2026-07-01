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
        <div className={`container ${styles.sectionInner}`}>
          <div className={styles.feedbackGrid}>
            <div className={styles.feedbackHeader}>
              <CaseStudySectionHeader
                label="Client feedback"
                title="Five-star project feedback"
                text="Direct client validation for the delivery, communication, and final implementation."
              />
            </div>
            <figure className={styles.feedbackPanel}>
              <div className={styles.stars} aria-label="Five out of five stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span aria-hidden="true" className={styles.starIcon} key={index}>
                    ★
                  </span>
                ))}
              </div>
              <blockquote className={styles.feedbackQuote}>"{study.testimonial.quote}"</blockquote>
              <figcaption className={styles.feedbackAuthor}>
                <span className={`${styles.feedbackAuthorImage} ${study.branding.clientImage ? styles.feedbackAuthorImagePhoto : ""}`}>
                  {authorImage ? (
                    <img src={authorImage} alt={authorImageAlt} title={authorImageAlt} loading="lazy" />
                  ) : (
                    study.testimonial.author.slice(0, 2)
                  )}
                </span>
                <span className={styles.feedbackAuthorCopy}>
                  <strong className={styles.feedbackAuthorName}>{study.testimonial.author}</strong>
                  <span className={styles.clientMeta}>{study.testimonial.meta}</span>
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
