import styles from "./CaseStudySectionHeader.module.scss";

export function CaseStudySectionHeader({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text?: string;
}) {
  const words = title.trim().split(" ");
  const accentWord = words.pop();
  const leadingTitle = words.join(" ");

  return (
    <header className={styles["section-header"]}>
      <span className={styles.kicker}>{label}</span>
      <h2 className={styles["section-title"]}>
        {leadingTitle ? `${leadingTitle} ` : ""}
        {accentWord ? <>{accentWord}</> : null}
      </h2>
      {text ? <p className={styles["section-text"]}>{text}</p> : null}
    </header>
  );
}
