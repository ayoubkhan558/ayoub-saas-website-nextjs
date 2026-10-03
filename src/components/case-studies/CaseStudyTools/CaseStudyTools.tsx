import Image from "next/image";
import { getImageDimensions } from "@/lib/image-dimensions";
import type { CaseStudyDetailData } from "@/data/caseStudyDetails";
import { getToolCatalogItem } from "@/data/toolCatalog";
import { CaseStudySectionHeader } from "../CaseStudySectionHeader/CaseStudySectionHeader";
import styles from "./CaseStudyTools.module.scss";

export function CaseStudyTools({ study }: { study: CaseStudyDetailData }) {
  return (
    <section className={`section ${styles.section}`}>
      <div className="section__inner">
        <div className={`container ${styles["section-inner"]}`}>
          <div className={styles["tools-intro"]}>
            <CaseStudySectionHeader
              label="Tools"
              title="Stack matched the workflow"
              text="Each tool had a specific job: editing, layout production, content structure, SEO, security, or performance."
            />
            <p className={styles["performance-note"]}>{study.performanceNote}</p>
          </div>
          <div className={styles["tool-panel"]}>
            <div className={styles["tool-grid"]}>
              {study.tools.map((toolKey) => {
                const tool = getToolCatalogItem(toolKey);
                const fallbackMark = tool.name
                  .split(/\s+/)
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 3)
                  .toUpperCase();

                return (
                  <article className={styles["tool-card"]} key={toolKey}>
                    <span className={styles["tool-logo"]}>
                      {tool.logo ? <Image src={tool.logo} alt={`${tool.name} logo`} title={`${tool.name} logo`} sizes="96px" {...getImageDimensions(tool.logo, { width: 128, height: 128 })} /> : fallbackMark}
                    </span>
                    <span>
                      <span className={styles["tool-name"]}>{tool.name}</span>
                      <span className={styles["tool-meta"]}>{tool.description}</span>
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
