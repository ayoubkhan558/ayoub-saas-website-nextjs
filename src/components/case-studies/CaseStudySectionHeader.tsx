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
    <header className={styles.sectionHeader}>
      <span className={styles.kicker}>{label}</span>
      <h2 className={styles.sectionTitle}>
        {leadingTitle ? `${leadingTitle} ` : ""}
        {accentWord ? <>{accentWord}</> : null}
      </h2>
      {text ? <p className={styles.sectionText}>{text}</p> : null}
    </header>
  );
}
