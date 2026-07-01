import { TextMarquee } from "@/components/shared/TextMarquee";
import styles from "./OutcomesSection.module.scss";

export function OutcomesSection({ outcomes }: { outcomes: string[] }) {
  return (
    <section className={`${styles.outcomes} section`} aria-label="Results and outcomes">
      <div className="section__inner" style={{ padding: 0 }}>
        <div className={styles.outcomes__marquee}>
          <TextMarquee className={styles.outcomes__track} speed={15}>
            <div className={styles.outcomes__group}>
              {outcomes.map((item) => (
                <span className={styles.outcomes__item} key={item}>
                  {item}
                </span>
              ))}
            </div>
          </TextMarquee>
        </div>
      </div>
    </section>
  );
}
