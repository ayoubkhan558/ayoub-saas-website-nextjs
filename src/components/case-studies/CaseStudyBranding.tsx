import type { CaseStudyDetailData } from "@/data/caseStudyDetails";
import { CaseStudySectionHeader } from "./CaseStudySectionHeader";
import styles from "./Ape24ProCaseStudy.module.scss";

function swatchClass(tone: CaseStudyDetailData["branding"]["palette"][number]["tone"]) {
  return styles[`swatch${tone[0].toUpperCase()}${tone.slice(1)}`];
}

export function CaseStudyBranding({ study }: { study: CaseStudyDetailData }) {
  return (
    <section className={`section ${styles.section}`}>
      <div className="section__inner">
        <div className={`container ${styles.sectionInner}`}>
          <div className={styles.brandGrid}>
            <CaseStudySectionHeader label="Branding and logo" title={study.branding.title} text={study.branding.text} />
            <article className={styles.brandPanel}>
              <div className={styles.logoCard}>
                <span className={styles.logoMark}>{study.branding.logoMark}</span>
                <div className={styles.typeCard}>
                  <span className={styles.typeName}>{study.branding.fontName}</span>
                  <span className={styles.typeMeta}>{study.branding.fontMeta}</span>
                </div>
              </div>
              <div className={styles.swatchGrid} aria-label={`${study.client} color palette`}>
                {study.branding.palette.map((swatch) => (
                  <span className={styles.swatch} key={swatch.label}>
                    <span className={`${styles.swatchColor} ${swatchClass(swatch.tone)}`} />
                    <span className={styles.swatchLabel}>{swatch.label}</span>
                  </span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
