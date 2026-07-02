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
    <div className={`${styles.screen} ${compact ? styles["screen-compact"] : ""} ${scrollOnHover ? styles["screen-scroll-on-hover"] : ""}`}>
      <div className={styles["browser-top"]}>
        <div className={styles["browser-dots"]} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className={styles["browser-url"]}>{label}</div>
      </div>
      {imageSrc ? (
        <div className={styles["real-preview"]}>
          <img src={imageSrc} alt={`Website preview for ${label}`} title={`Website preview for ${label}`} loading="lazy" />
        </div>
      ) : (
        <div className={styles["mock-site"]} aria-hidden="true">
          <div className={styles["mock-nav"]}>
            <span className={styles["mock-logo"]} />
            <span className={styles["mock-button"]} />
          </div>
          <div className={styles["mock-hero"]}>
            <span className={styles["mock-line"]} />
            <span className={styles["mock-line"]} />
            <span className={styles["mock-short-line"]} />
          </div>
          <div className={styles["mock-grid"]}>
            <span className={styles["mock-card"]} />
            <span className={styles["mock-card"]} />
            <span className={styles["mock-card"]} />
          </div>
          <div className={styles["mock-footer"]} />
        </div>
      )}
    </div>
  );
}
