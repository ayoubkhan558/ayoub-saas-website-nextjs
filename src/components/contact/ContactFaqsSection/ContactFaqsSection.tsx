import type { PortfolioData } from "@/context/PortfolioContentContext";
import styles from "./ContactFaqsSection.module.scss";

export function ContactFaqsSection({ faqs }: { faqs: PortfolioData["faqs"] }) {
  return (
    <section className={`section ${styles["contact-faqs"]}`}>
      <div className="section__inner">
        <div className={`container ${styles["contact-faqs__inner"]}`}>
          <div className={styles["contact-faqs__copy"]}>
            <span className={styles["contact-page__eyebrow"]}>FAQs</span>
            <h2>Questions clients ask before starting.</h2>
            <p>Short answers on project fit, cost, timelines, and taking over an existing site or codebase.</p>
          </div>
          <div className={styles["contact-faqs__grid"]}>
            {faqs.map((faq, index) => (
              <details className={styles["contact-faq-card"]} key={faq.question} open={index === 0}>
                <summary className={styles["contact-faq-card__question"]}>
                  <span className={styles["contact-faq-card__index"]}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles["contact-faq-card__question-text"]}>{faq.question}</span>
                  <span className={styles["contact-faq-card__toggle"]} aria-hidden="true" />
                </summary>
                <p className={styles["contact-faq-card__answer"]}>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
