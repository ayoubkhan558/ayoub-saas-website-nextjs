import type { PortfolioData } from "@/context/PortfolioContentContext";
import { IconGlyph } from "./IconGlyph";
import { SectionHeader } from "./SectionHeader";
import styles from "./WhySection.module.scss";

export function WhySection({ portfolio }: { portfolio: PortfolioData }) {
  const whyGroups = [
    {
      title: "Communication",
      summary: "You always know what is happening, what is next, and where decisions are needed.",
      items: [portfolio.whyWork[0], portfolio.whyWork[1], portfolio.whyWork[5]],
    },
    {
      title: "Engineering",
      summary: "The build is structured for performance, mobile, and the next developer who touches it.",
      items: [portfolio.whyWork[3], portfolio.whyWork[4], portfolio.whyWork[6]],
    },
    {
      title: "Delivery",
      summary: "Scope, deadlines, handoff, and ownership stay clear from kickoff to launch.",
      items: [portfolio.whyWork[2], portfolio.whyWork[7], portfolio.whyWork[8]],
    },
  ];

  return (
    <>
      <section className="section" id="why">
        <div className="section__inner">
          <div className="container">
            <SectionHeader
              label="Why work with me"
              title="Why clients stay"
              eyebrow="From initial development to final deployment, businesses rely on my technical expertise to launch robust digital platforms that scale seamlessly."
            />
            <div className={styles["why__group-grid"]}>
              {whyGroups.map((group) => (
                <article className={styles["why__group"]} key={group.title}>
                  <header className={styles["why__group-header"]}>
                    <span className={styles["why__group-kicker"]}>{group.title}</span>
                    <p className={styles["why__group-summary"]}>{group.summary}</p>
                  </header>
                  <ul className={styles["why__group-list"]}>
                    {group.items.map((item) => (
                      <li className={styles["why__group-item"]} key={item}>
                        <span className={styles["why__card-mark"]} aria-hidden="true">
                          <IconGlyph name="check" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles["outcomes"]} section`} aria-label="Results and outcomes">
        <div className="section__inner" style={{ padding: 0}}>
          <div className={styles["outcomes__marquee"]}>
            <div className={styles["outcomes__track"]}>
              <div className={styles["outcomes__group"]}>
                {portfolio.outcomes.map((item) => (
                  <span className={styles["outcomes__item"]} key={item}>
                    {item}
                  </span>
                ))}
              </div>
              <div className={styles["outcomes__group"]} aria-hidden="true">
                {portfolio.outcomes.map((item) => (
                  <span className={styles["outcomes__item"]} key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
