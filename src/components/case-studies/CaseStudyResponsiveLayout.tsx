import type { CaseStudyDetailData } from "@/data/caseStudyDetails";
import { CaseStudySectionHeader } from "./CaseStudySectionHeader";
import styles from "./Ape24ProCaseStudy.module.scss";

function getPreviewImage(label: string) {
  const url = label.startsWith("http") ? label : `https://${label}`;
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=900`;
}

export function CaseStudyResponsiveLayout({ study }: { study: CaseStudyDetailData }) {
  const previewImage = getPreviewImage(study.urlLabel);

  return (
    <section className={`section ${styles.section}`}>
      <div className="section__inner">
        <div className={`container ${styles.sectionInner}`}>
          <div className={styles.responsiveGrid}>
            <div>
              <CaseStudySectionHeader
                label="Tablet and mobile"
                title="Responsive layouts without content loss"
                text="The same page system adapts for smaller screens while preserving navigation, readability, and clear actions."
              />
              <div className={styles.benefitList}>
                {study.responsiveBenefits.map((benefit) => (
                  <div className={styles.benefitItem} key={benefit}>
                    <strong>{benefit}</strong>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.deviceStage} aria-label={`${study.client} responsive tablet and mobile mockups`}>
              <div className={styles.tablet}>
                <span className={styles.deviceLabel}>Tablet</span>
                <img src={previewImage} alt="" loading="lazy" />
              </div>
              <div className={styles.phone}>
                <span className={styles.deviceLabel}>Mobile</span>
                <img src={previewImage} alt="" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
