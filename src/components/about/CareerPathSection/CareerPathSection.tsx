import type { PortfolioData } from "@/context/PortfolioContentContext";
import styles from "./CareerPathSection.module.scss";

export function CareerPathSection({ careerPath }: { careerPath: PortfolioData["about"]["careerPath"] }) {
  return (
    <section className={`section ${styles["career-path-section"]}`}>
      <div className="section__inner">
        <div className={`container ${styles["career-path"]}`}>
          <span className={styles["career-path__eyebrow"]}>Career Path</span>
          <ol className={styles["career-path__list"]}>
            {careerPath.map((item, index) => (
              <li
                className={`${styles["career-path__item"]} ${item.current ? styles["career-path__item--current"] : ""}`}
                key={item.year}
              >
                <span className={styles["career-path__number"]} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={styles["career-path__content"]}>
                  <div className={styles["career-path__heading"]}>
                    <h2 className={styles["career-path__title"]}>{item.title}</h2>
                    {item.current ? <span className={styles["career-path__badge"]}>Current Focus</span> : null}
                  </div>
                  <p className={styles["career-path__technologies"]}>{item.technologies}</p>
                  <p className={styles["career-path__description"]}>{item.description}</p>
                  <span className={styles["career-path__year"]}>{item.year}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}