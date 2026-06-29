import type { CaseStudyDetailData } from "@/data/caseStudyDetails";
import { CaseStudySectionHeader } from "./CaseStudySectionHeader";
import styles from "./CaseStudyOverview.module.scss";

const metricLabels = [
  ["fcp", "FCP"],
  ["lcp", "LCP"],
  ["cls", "CLS"],
  ["tbt", "TBT"],
  ["speedIndex", "Speed index"],
] as const;

export function CaseStudyOverview({ study }: { study: CaseStudyDetailData }) {
  const pageSpeed = study.pageSpeed?.desktop;

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
              {pageSpeed ? (
                <div className={styles.pageSpeedGrid} aria-label="PageSpeed desktop performance snapshot">
                  <article className={styles.pageSpeedCard}>
                    <div className={styles.pageSpeedScore}>
                      <span>Desktop PageSpeed</span>
                      <strong>{pageSpeed.performance}</strong>
                    </div>
                    <dl className={styles.pageSpeedMetrics}>
                      {metricLabels.map(([key, metricLabel]) => (
                        <div key={key}>
                          <dt>{metricLabel}</dt>
                          <dd>{pageSpeed[key] ?? "N/A"}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className={styles.performanceNote}>
                      Tested on {study.pageSpeed?.testedUrl}, measured {study.pageSpeed?.measuredAt}.
                    </p>
                  </article>
                </div>
              ) : null}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
