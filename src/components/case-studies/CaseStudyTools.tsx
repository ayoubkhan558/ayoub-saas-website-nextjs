import type { CaseStudyDetailData } from "@/data/caseStudyDetails";
import { getToolCatalogItem } from "@/data/toolCatalog";
import { CaseStudySectionHeader } from "./CaseStudySectionHeader";
import styles from "./CaseStudyTools.module.scss";

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
              {study.tools.map((toolKey) => {
                const tool = getToolCatalogItem(toolKey);
                const fallbackMark = tool.name
                  .split(/\s+/)
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 3)
                  .toUpperCase();

                return (
                  <article className={styles.toolCard} key={toolKey}>
                    <span className={styles.toolLogo}>
                      {tool.logo ? <img src={tool.logo} alt={`${tool.name} logo`} /> : fallbackMark}
                    </span>
                    <span>
                      <span className={styles.toolName}>{tool.name}</span>
                      <span className={styles.toolMeta}>{tool.description}</span>
                    </span>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
