import { IconGlyph } from "@/components/landing/IconGlyph";
import type { CaseStudyDetailData } from "@/data/caseStudyDetails";
import { CaseStudySectionHeader } from "./CaseStudySectionHeader";
import styles from "./Ape24ProCaseStudy.module.scss";

export function CaseStudyFeedback({ study }: { study: CaseStudyDetailData }) {
  return (
    <section className={`section ${styles.section}`}>
      <div className="section__inner">
        <div className={`container ${styles.sectionInner}`}>
          <div className={styles.feedbackGrid}>
            <CaseStudySectionHeader
              label="Client feedback"
              title="Five-star project feedback"
              text="Direct client validation for the delivery, communication, and final implementation."
            />
            <figure className={styles.feedbackPanel}>
              <div className={styles.stars} aria-label="Five out of five stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <IconGlyph name="star" key={index} />
                ))}
              </div>
              <blockquote className={styles.feedbackQuote}>"{study.testimonial.quote}"</blockquote>
              <figcaption>
                <strong>{study.testimonial.author}</strong>
                <div className={styles.clientMeta}>{study.testimonial.meta}</div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
