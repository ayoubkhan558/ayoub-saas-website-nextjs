import type { CaseStudyDetailData } from "@/data/caseStudyDetails";
import { CaseStudySectionHeader } from "./CaseStudySectionHeader";
import styles from "./CaseStudyOverview.module.scss";

export function CaseStudyOverview({ study }: { study: CaseStudyDetailData }) {
  return (
    <section className={`section ${styles.section}`}>
      <div className="section__inner">
        <div className={`container ${styles.sectionInner}`}>
          <div className={styles.overviewGrid}>
            <CaseStudySectionHeader label="Overview" title={study.client} />
            <article className={styles.overviewPanel}>
              <span className={styles.panelLabel}>Client context</span>
              <p className={styles.overviewText}>{study.overview}</p>
              <div className={styles.overviewFacts}>
                {study.facts.map((fact) => (
                  <div className={styles.fact} key={fact.label}>
                    <strong>{fact.label}</strong>
                    <span>{fact.value}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
