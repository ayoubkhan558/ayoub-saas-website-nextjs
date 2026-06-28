import styles from "./SectionHeader.module.scss";

export function SectionHeader({
  label,
  title,
  eyebrow,
  center = false,
}: {
  label: string;
  title: string;
  eyebrow: string;
  center?: boolean;
}) {
  const titleWords = title.trim().split(" ");
  const accentWord = titleWords.pop();
  const leadingTitle = titleWords.join(" ");

  return (
    <header className={`section-header ${center ? "section-header--center" : ""} ${styles["section-header"]} ${center ? styles["section-header--center"] : ""}`}>
      <span className="section-header__label">{label}</span>
      <h2 className="section-header__title">
        {leadingTitle ? `${leadingTitle} ` : ""}
        <span>{accentWord}</span>
      </h2>
      <p className="section-header__text">{eyebrow}</p>
    </header>
  );
}
