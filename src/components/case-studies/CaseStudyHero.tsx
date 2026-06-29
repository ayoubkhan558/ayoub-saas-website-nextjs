import type { CaseStudyDetailData } from "@/data/caseStudyDetails";
import { CaseStudyBrowserMockup } from "./CaseStudyBrowserMockup";
import styles from "./CaseStudyHero.module.scss";

function getPreviewImage(label: string) {
  const url = label.startsWith("http") ? label : `https://${label}`;
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1400`;
}

export function CaseStudyHero({ study }: { study: CaseStudyDetailData }) {
  const previewImage = getPreviewImage(study.urlLabel);

  return (
    <section className={`section ${styles.hero}`}>
      <div className="section__inner">
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>{study.eyebrow}</span>
            <h1 className={styles.title}>{study.headline}</h1>
            <p className={styles.tagline}>{study.tagline}</p>
          </div>
          <aside className={styles.heroVisual} aria-label={`${study.client} final website design shown inside a laptop mockup`}>
            <span className={styles.heroVisualLabel}>Final website preview</span>
            <div className={styles.laptopFrame}>
              <CaseStudyBrowserMockup label={study.urlLabel} imageSrc={previewImage} />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
