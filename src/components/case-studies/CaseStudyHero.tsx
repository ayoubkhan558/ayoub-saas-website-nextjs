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
        <div className={`container ${styles["hero-inner"]}`}>
          <div className={styles["hero-copy"]}>
            <span className={styles.eyebrow}>Case study</span>
            <h1 className={styles.title}>{study.client} project</h1>
            <p className={styles.tagline}>{projectType}</p>
            <div className={styles["hero-actions"]}>
              <dl className={styles["hero-meta"]}>
                <div className={styles["hero-meta__item"]}>
                  <dt className={styles["hero-meta__label"]}>Project</dt>
                  <dd className={styles["hero-meta__value"]}>{study.caseType}</dd>
                </div>
                <div className={styles["hero-meta__item"]}>
                  <dt className={styles["hero-meta__label"]}>Timeline</dt>
                  <dd className={styles["hero-meta__value"]}>{study.timeline}</dd>
                </div>
              </dl>
              <a className={styles["live-site-link"]} href={study.liveUrl} target="_blank" rel="noreferrer" title={`Visit ${study.client} live website`}>
                Visit live site
                <IconGlyph className={styles["live-site-link__icon"]} name="externalLink" />
              </a>
            </div>
          </div>
          <aside className={styles["hero-visual"]} aria-label={`${study.client} final website design shown inside a laptop mockup`}>
            {study.heroMockup ? (
              <img className={styles["hero-mockup-image"]} src={study.heroMockup} alt={`${study.client} responsive website mockup`} title={`${study.client} responsive website mockup`} />
            ) : (
              <div className={styles["laptop-frame"]}>
                <CaseStudyBrowserMockup label={study.urlLabel} imageSrc={previewImage} />
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
