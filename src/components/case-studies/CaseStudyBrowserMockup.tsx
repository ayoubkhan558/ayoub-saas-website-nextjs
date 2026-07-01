import styles from "./CaseStudyBrowserMockup.module.scss";

export function CaseStudyBrowserMockup({
  label,
  compact = false,
  imageSrc,
  scrollOnHover = false,
}: {
  label: string;
  compact?: boolean;
  imageSrc?: string;
  scrollOnHover?: boolean;
}) {
  return (
    <div className={`${styles.screen} ${compact ? styles.screenCompact : ""} ${scrollOnHover ? styles.screenScrollOnHover : ""}`}>
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
          <img src={imageSrc} alt={`Website preview for ${label}`} title={`Website preview for ${label}`} loading="lazy" />
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
