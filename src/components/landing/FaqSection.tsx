import type { PortfolioData } from "@/context/PortfolioContentContext";
import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import styles from "./FaqSection.module.scss";

export function FaqSection({ portfolio }: { portfolio: PortfolioData }) {
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);

  return (
    <section className="section" id="faqs">
      <div className="section__inner">
        <div className={`container ${styles["faq__grid"]}`}>
          <div className={styles["faq__header"]}>
            <SectionHeader
              label="FAQs"
              title="Before we start"
              eyebrow="Common hiring questions about pricing, timelines, communication, and project scope."
            />
          </div>
          <div className={styles["faq__list"]}>
            {portfolio.faqs.map((faq, index) => {
              const isOpen = activeFaqIndex === index;
              const answerId = `faq-answer-${index + 1}`;

              return (
                <article className={`${styles["faq__item"]} ${isOpen ? styles["faq__item--open"] : ""}`} key={faq.question}>
                  <button
                    className={styles["faq__question"]}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setActiveFaqIndex(isOpen ? -1 : index)}
                  >
                    <span className={styles["faq__index"]}>0{index + 1}</span>
                    <span className={styles["faq__question-text"]}>{faq.question}</span>
                    <span className={styles["faq__toggle"]} aria-hidden="true" />
                  </button>
                  <div className={styles["faq__answer-wrap"]} id={answerId}>
                    <p className={styles["faq__answer"]}>{faq.answer}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
