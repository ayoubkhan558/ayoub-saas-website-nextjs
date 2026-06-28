import type { CaseStudyDetailData } from "@/data/caseStudyDetails";
import { CaseStudySectionHeader } from "./CaseStudySectionHeader";
import styles from "./Ape24ProCaseStudy.module.scss";

export function CaseStudyTools({ study }: { study: CaseStudyDetailData }) {
  return (
    <section className={`section ${styles.section}`}>
      <div className="section__inner">
        <div className={`container ${styles.sectionInner}`}>
          <div className={styles.toolsIntro}>
            <CaseStudySectionHeader
              label="Tools"
              title="Stack matched the workflow"
              text="Each tool had a specific job: editing, layout production, content structure, SEO, security, or performance."
            />
            <p className={styles.performanceNote}>{study.performanceNote}</p>
          </div>
          <div className={styles.toolPanel}>
            <div className={styles.toolGrid}>
              {study.tools.map((tool) => (
                <article className={styles.toolCard} key={tool.name}>
                  <span className={styles.toolMark}>{tool.mark}</span>
                  <span>
                    <span className={styles.toolName}>{tool.name}</span>
                    <span className={styles.toolMeta}>{tool.meta}</span>
                  </span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
