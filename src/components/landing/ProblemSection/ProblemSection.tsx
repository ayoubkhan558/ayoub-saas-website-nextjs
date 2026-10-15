import type { PortfolioData } from "@/context/PortfolioContentContext";
import { IconGlyph } from "../IconGlyph/IconGlyph";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import styles from "./ProblemSection.module.scss";

export function ProblemSection({ portfolio }: { portfolio: PortfolioData }) {
  const problemContent = {
    label: "Is this you?",
    title: "Sound familiar?",
    eyebrow: "Your site should build trust before your prospect ever books a call.",
    fitLabel: "Best fit for",
    problemsLabel: "Problems I solve",
    cta: "Let's fix my site",
    issues: [
      "Your Visitors Drop In, But Don't Engage",
      "Your Website Lacks Uniqueness",
      "Your Competitor Stealing the Spotlight",
    ],
    bestFit: [
      "Founders who need a clearer offer",
      "Service businesses with weak conversion paths",
      "Agencies that need reliable front-end delivery",
      "Teams supporting growth with better UX and SEO",
    ],
    solutions: [
      "Unclear homepage messaging that fails to explain what you do",
      "Weak CTA flow that leaves visitors unsure what to do next",
      "Slow pages that make people bounce before reading the offer",
      "Mobile layouts that break trust on the device most visitors use",
      "Service pages that describe features but do not sell outcomes",
      "Outdated visual design that makes a capable business look less credible",
      "Contact forms and inquiry paths with too much friction",
      "Project handoffs where the business cannot update or reuse the website confidently",
      "Landing pages that get traffic but do not convert enough leads",
      "Competitors feeling more polished, easier to trust, and easier to buy from",
    ],
  };

  return (
    <section className="section" id="problems">
      <div className="section__inner">
        <div className="container">
          <SectionHeader
            center
            label={problemContent.label}
            title={problemContent.title}
            eyebrow={problemContent.eyebrow}
          />
          <div className={styles["problem__pain-grid"]}>
            {problemContent.issues.map((point, index) => (
              <article className={styles["problem__pain-card"]} key={point}>
                <span className={styles["problem__pain-index"]}>Issue 0{index + 1}</span>
                <h3 className={styles["problem__pain-title"]}>{point}</h3>
                <span className={styles["problem__pain-action"]} aria-hidden="true">
                  <IconGlyph name={index === 0 ? "users" : index === 1 ? "sparkles" : "gauge"} />
                </span>
              </article>
            ))}
          </div>
          <div className={styles["problem__fit"]}>
            <span className={styles["problem__ticker-label"]}>{problemContent.fitLabel}</span>
            <div className={styles["problem__fit-grid"]}>
              {problemContent.bestFit.map((item) => (
                <span className={styles["problem__fit-item"]} key={item}>
                  <IconGlyph name="check" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className={styles["problem__ticker"]}>
            <span className={styles["problem__ticker-label"]}>{problemContent.problemsLabel}</span>
            <div className={styles["problem__ticker-track"]}>
              {problemContent.solutions.map((problem) => (
                <strong className={styles["problem__ticker-item"]} key={problem}>{problem}</strong>
              ))}
            </div>
            <a className={`button ${styles["problem__ticker-button"]}`} href="/contact" title="Contact Muhammad Ayoub to fix my website">
              {problemContent.cta} <IconGlyph name="arrowRight" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
