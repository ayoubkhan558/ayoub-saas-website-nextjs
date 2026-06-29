import type { CaseStudyDetailData, CaseStudyPageSpeedResult } from "@/data/caseStudyDetails";
import { CaseStudySectionHeader } from "./CaseStudySectionHeader";
import styles from "./CaseStudyPageSpeed.module.scss";

const metricLabels: Array<[keyof CaseStudyPageSpeedResult, string]> = [
  ["fcp", "FCP"],
  ["lcp", "LCP"],
  ["cls", "CLS"],
  ["tbt", "TBT"],
  ["speedIndex", "Speed index"],
];

function ScorePanel({ result }: { result: CaseStudyPageSpeedResult }) {
  return (
    <article className={styles.pageSpeedCard}>
      <div className={styles.pageSpeedScore}>
        <span>Desktop</span>
        <strong>{result.performance}</strong>
      </div>
      <dl className={styles.pageSpeedMetrics}>
        {metricLabels.map(([key, metricLabel]) => (
          <div key={key}>
            <dt>{metricLabel}</dt>
            <dd>{result[key] ?? "N/A"}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export function CaseStudyPageSpeed({ study }: { study: CaseStudyDetailData }) {
  if (!study.pageSpeed?.desktop) {
    return null;
  }

  return (
    <section className={`section ${styles.section}`}>
      <div className="section__inner">
        <div className={`container ${styles.sectionInner}`}>
          <div className={styles.pageSpeedHeader}>
            <CaseStudySectionHeader
              label="PageSpeed"
              title="Measured performance snapshot"
              text={`Google PageSpeed Insights result for ${study.pageSpeed.testedUrl}, measured ${study.pageSpeed.measuredAt}.`}
            />
          </div>
          <div className={styles.pageSpeedGrid}>
            <ScorePanel result={study.pageSpeed.desktop} />
          </div>
        </div>
      </div>
    </section>
  );
}
