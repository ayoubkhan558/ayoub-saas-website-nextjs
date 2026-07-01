import type { CaseStudyDetailData } from "@/data/caseStudyDetails";
import { CaseStudySectionHeader } from "./CaseStudySectionHeader";
import styles from "./CaseStudyBranding.module.scss";

function swatchClass(tone?: CaseStudyDetailData["branding"]["palette"][number]["tone"]) {
  if (!tone) {
    return "";
  }

  return styles[`swatch${tone[0].toUpperCase()}${tone.slice(1)}`];
}

export function CaseStudyBranding({ study }: { study: CaseStudyDetailData }) {
  const fontFamilies =
    study.branding.fontFamilies?.length
      ? study.branding.fontFamilies
      : study.branding.fontName.split("+").map((font) => font.trim()).filter(Boolean);

  return (
    <section className={`section ${styles.section}`}>
      <div className="section__inner">
        <div className={`container ${styles.sectionInner}`}>
          <div className={styles.brandHeader}>
            <CaseStudySectionHeader label="Branding and logo" title={study.branding.title} text={study.branding.text} />
          </div>
          <div className={styles.brandCards}>
            <article className={styles.brandCard}>
              <span className={styles.brandCardLabel}>Typography</span>
              {fontFamilies.map((font, index) => (
                <div className={styles.brandTypeStack} key={font}>
                  <span>{index === 0 ? "Primary font" : `Font ${index + 1}`}</span>
                  <strong>{font}</strong>
                </div>
              ))}
              <p>{study.branding.fontMeta}</p>
            </article>

            <article className={styles.brandCard}>
              <span className={styles.brandCardLabel}>Colors</span>
              <div className={styles.brandColorHero} aria-label={`${study.client} primary and secondary colors`}>
                {study.branding.palette.map((swatch) => (
                  <span className={styles.brandColorItem} key={swatch.label}>
                    <span
                      className={`${styles.brandColorCircle} ${swatchClass(swatch.tone)}`}
                      style={swatch.value ? { background: swatch.value } : undefined}
                    />
                    <span>{swatch.label} color</span>
                    <strong>{swatch.value}</strong>
                  </span>
                ))}
              </div>
            </article>

            <article className={styles.brandCard}>
              <span className={styles.brandCardLabel}>Logo</span>
              <div className={styles.brandLogoStage}>
                {study.branding.logoImage ? (
                  <img className={styles.logoImage} src={study.branding.logoImage} alt={`${study.client} logo`} title={`${study.client} logo`} loading="lazy" />
                ) : (
                  <span className={styles.logoMark}>{study.branding.logoMark}</span>
                )}
              </div>
              <div className={styles.brandLogoNote}>
                <span className={styles.brandLogoIcon}>+</span>
                <div>
                  <strong>Brand system</strong>
                  <p>{study.branding.text}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
