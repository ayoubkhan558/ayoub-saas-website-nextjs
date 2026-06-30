import type { CaseStudyDetailData } from "@/data/caseStudyDetails";
import { IconGlyph } from "@/components/landing/IconGlyph";
import { CaseStudyBrowserMockup } from "./CaseStudyBrowserMockup";
import styles from "./CaseStudyHero.module.scss";

function getPreviewImage(label: string) {
  const url = label.startsWith("http") ? label : `https://${label}`;
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1400`;
}

export function CaseStudyHero({ study }: { study: CaseStudyDetailData }) {
  const previewImage = getPreviewImage(study.urlLabel);
  const projectType = study.facts.find((fact) => fact.label.toLowerCase() === "project type")?.value ?? study.tagline;

  return (
    <section className={`section ${styles.hero}`}>
      <div className="section__inner">
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Case study</span>
            <h1 className={styles.title}>{study.client} project</h1>
            <p className={styles.tagline}>{projectType}</p>
            <div className={styles.heroActions}>
              <dl className={styles.heroMeta}>
                <div className={styles.heroMeta__item}>
                  <dt className={styles.heroMeta__label}>Timeline</dt>
                  <dd className={styles.heroMeta__value}>{study.timeline}</dd>
                </div>
              </dl>
              <a className={styles.liveSiteLink} href={study.liveUrl} target="_blank" rel="noreferrer" title={`Visit ${study.client} live website`}>
                Visit live site
                <IconGlyph className={styles.liveSiteLink__icon} name="externalLink" />
              </a>
            </div>
          </div>
          <aside className={styles.heroVisual} aria-label={`${study.client} final website design shown inside a laptop mockup`}>
            <div className={styles.laptopFrame}>
              <CaseStudyBrowserMockup label={study.urlLabel} imageSrc={previewImage} />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
