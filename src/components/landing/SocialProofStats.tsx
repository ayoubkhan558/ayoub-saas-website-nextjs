import type { PortfolioData } from "@/context/PortfolioContentContext";
import styles from "./SocialProofStats.module.scss";

export function SocialProofStats({ awards, className = "" }: { awards: PortfolioData["about"]["awards"]; className?: string }) {
  return (
    <div className={[styles["social-proof-stats"], className].filter(Boolean).join(" ")} aria-label="Project delivery proof">
      {awards.map((item) => (
        <article className={styles["social-proof-stats__card"]} key={item.label}>
          <span className={styles["social-proof-stats__label"]}>{item.label}</span>
          <strong className={styles["social-proof-stats__value"]}>{item.value}</strong>
        </article>
      ))}
    </div>
  );
}
