import type { CaseStudyDetailData } from "@/data/caseStudyDetails";
import styles from "./CaseStudyOverview.module.scss";

const metricLabels = [
  ["performance", "Performance"],
  ["fcp", "FCP"],
  ["lcp", "LCP"],
  ["cls", "CLS"],
  ["tbt", "TBT"],
  ["speedIndex", "Speed index"],
] as const;

type DetailRow = {
  label: string;
  value: string;
  href?: string;
};

export function CaseStudyOverview({ study }: { study: CaseStudyDetailData }) {
  const pageSpeed = study.pageSpeed?.desktop;
  const detailRows: DetailRow[] = [
    ...study.facts,
    { label: "Timeline", value: study.timeline },
    { label: "Live site", value: study.urlLabel, href: study.liveUrl },
  ];

  return (
    <section className={`section ${styles.section}`}>
      <div className="section__inner">
        <div className={`container ${styles.sectionInner}`}>
          <div className={styles.overviewGrid}>
            <article className={styles.overviewPanel} aria-label={`${study.client} project facts and performance`}>
              <span className={styles.panelLabel}>Client context</span>
              <p className={styles.overviewText}>{study.overview}</p>

              <div className={styles.detailMatrix}>
                <div className={styles.detailMatrixHeader} aria-hidden="true">
                  <span>Detail</span>
                  <span>Value</span>
                  <span>Result</span>
                </div>

                {detailRows.map((row) => (
                  <div className={styles.detailMatrixRow} key={row.label}>
                    <strong>{row.label}</strong>
                    <span>{row.href ? <a href={row.href} target="_blank" rel="noreferrer" title={`Open ${row.label}`}>{row.value}</a> : row.value}</span>
                    <p>{row.label === "Live site" ? "Open the completed production website." : "Project context used to guide scope and delivery."}</p>
                  </div>
                ))}

                {pageSpeed ? (
                  <div className={`${styles.detailMatrixRow} ${styles.performanceRow}`}>
                    <strong>Performance</strong>
                    <span>Desktop PageSpeed</span>
                    <dl className={styles.performanceMetrics}>
                      {metricLabels.map(([key, label]) => (
                        <div key={key}>
                          <dt>{label}</dt>
                          <dd>{pageSpeed[key] ?? "N/A"}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ) : null}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
