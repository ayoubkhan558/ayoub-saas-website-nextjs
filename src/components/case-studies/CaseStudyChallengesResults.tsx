import type { CaseStudyDetailData } from "@/data/caseStudyDetails";
import { CaseStudySectionHeader } from "./CaseStudySectionHeader";
import styles from "./CaseStudyChallengesResults.module.scss";

export function CaseStudyChallengesResults({ study }: { study: CaseStudyDetailData }) {
  return (
    <section className={`section ${styles.section}`}>
      <div className="section__inner">
        <div className={`container ${styles["section-inner"]}`}>
          <CaseStudySectionHeader
            label="Challenges and results"
            title="What changed after launch"
            text="A side-by-side view of the project friction and the practical outcomes delivered."
          />
          <div className={styles["split-grid"]}>
            <article className={styles["comparison-panel"]}>
              <span className={styles["panel-label"]}>Before</span>
              <h3>Challenges</h3>
              <div className={styles["comparison-list"]}>
                {study.challenges.map((item) => (
                  <div className={styles["comparison-item"]} key={item.title}>
                    <strong>{item.title}</strong>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </article>
            <article className={`${styles["comparison-panel"]} ${styles["result-panel"]}`}>
              <span className={styles["panel-label"]}>After</span>
              <h3>Results and benefits</h3>
              <div className={styles["comparison-list"]}>
                {study.results.map((item) => (
                  <div className={styles["comparison-item"]} key={item.title}>
                    <strong>{item.title}</strong>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
