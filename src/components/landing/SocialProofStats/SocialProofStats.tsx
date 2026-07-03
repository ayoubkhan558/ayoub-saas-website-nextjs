import type { PortfolioData } from "@/context/PortfolioContentContext";
import styles from "./SocialProofStats.module.scss";

export function SocialProofStats({ awards, className = "" }: { awards: PortfolioData["about"]["awards"]; className?: string }) {
  return (
    <dl className={[styles["social-proof-stats"], className].filter(Boolean).join(" ")} aria-label="Project delivery proof">
      {awards.map((item) => (
        <div className={styles["social-proof-stats__card"]} key={item.label}>
          <dt className={styles["social-proof-stats__value"]}>{item.value}</dt>
          <dd className={styles["social-proof-stats__label"]}>{item.label}</dd>
        </div>
      ))}
    </dl>
  );
}
