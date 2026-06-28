import styles from "./Ape24ProCaseStudy.module.scss";

export function CaseStudyBrowserMockup({
  label,
  compact = false,
  imageSrc,
}: {
  label: string;
  compact?: boolean;
  imageSrc?: string;
}) {
  return (
    <div className={`${styles.screen} ${compact ? styles.screenCompact : ""}`}>
      <div className={styles.browserTop}>
        <div className={styles.browserDots} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className={styles.browserUrl}>{label}</div>
      </div>
      {imageSrc ? (
        <div className={styles.realPreview}>
          <img src={imageSrc} alt="" loading="lazy" />
        </div>
      ) : (
        <div className={styles.mockSite} aria-hidden="true">
          <div className={styles.mockNav}>
            <span className={styles.mockLogo} />
            <span className={styles.mockButton} />
          </div>
          <div className={styles.mockHero}>
            <span className={styles.mockLine} />
            <span className={styles.mockLine} />
            <span className={styles.mockShortLine} />
          </div>
          <div className={styles.mockGrid}>
            <span className={styles.mockCard} />
            <span className={styles.mockCard} />
            <span className={styles.mockCard} />
          </div>
          <div className={styles.mockFooter} />
        </div>
      )}
    </div>
  );
}
