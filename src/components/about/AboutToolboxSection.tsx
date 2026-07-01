import { LogoMarquee } from "@/components/shared/LogoMarquee";
import type { PortfolioData } from "@/context/PortfolioContentContext";
import { getToolboxIconRows } from "./aboutPageData";
import styles from "./AboutToolboxSection.module.scss";

export function AboutToolboxSection({ about }: { about: PortfolioData["about"] }) {
  const toolboxIconRows = getToolboxIconRows(about.toolboxIconKeys);

  return (
    <section className={`section ${styles["about-page-toolbox-section"]}`}>
      <div className="section__inner">
        <header className={`section-header section-header--center ${styles["about-page-toolbox-header"]}`}>
          <span className="section-header__label">Toolbox</span>
          <h2 className="section-header__title">
            My skills.
          </h2>
        </header>
        <div className={`container ${styles["about-page-skills-panel"]}`}>
          <div className={styles["about-page-skill-marquee"]}>
            {toolboxIconRows.map((row, rowIndex) => (
              <LogoMarquee
                ariaLabel={rowIndex === 0 ? "Technologies and tools" : "More technologies and tools"}
                className={styles["about-page-skill-marquee__row"]}
                direction={rowIndex % 2 === 0 ? "left" : "right"}
                imageClassName={styles["about-page-skill-icon__image"]}
                itemClassName={styles["about-page-skill-icon"]}
                items={row}
                key={`tool-row-${rowIndex}`}
                speed={rowIndex % 2 === 0 ? 16 : 14}
              />
            ))}
          </div>
          <div className={styles["about-page-skill-list"]}>
            {about.toolbox.map((group) => (
              <p className={styles["about-page-skill-list__item"]} key={group.title}>
                <strong className={styles["about-page-skill-list__label"]}>{group.title}</strong> {group.items.join(", ")}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
