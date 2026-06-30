import type { CaseStudyDetailData } from "@/data/caseStudyDetails";
import { CaseStudySectionHeader } from "./CaseStudySectionHeader";
import styles from "./CaseStudyFeedback.module.scss";

export function CaseStudyFeedback({ study }: { study: CaseStudyDetailData }) {
  const clientImage = study.branding.logoImage;

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
                <span className={styles.feedbackAuthorImage}>
                  {clientImage ? (
                    <img src={clientImage} alt={`${study.testimonial.author} logo`} loading="lazy" />
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
