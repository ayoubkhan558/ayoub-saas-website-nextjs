import type { PortfolioData } from "@/context/PortfolioContentContext";
import type { CSSProperties, MouseEvent } from "react";
import { useState } from "react";
import { ClientTestimonials } from "./ClientTestimonials";
import { IconGlyph } from "./IconGlyph";
import { SectionHeader } from "./SectionHeader";
import styles from "./ProcessAboutSections.module.scss";

export function ProcessAboutSections({ portfolio }: { portfolio: PortfolioData }) {
  const education = portfolio.recognition.find((item) => item.label === "Master of Computer Science");
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);
  const handlePortraitSpotlight = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    event.currentTarget.style.setProperty("--spotlight-x", `${x}%`);
    event.currentTarget.style.setProperty("--spotlight-y", `${y}%`);
  };

  return (
    <>
      <section className="section" id="process">
        <div className="section__inner">
            <div className={`container ${styles["process"]}`}>
              <header className="section-header section-header--center">
                <span className="section-header__label">Development</span>
                <h2 className="section-header__title">process</h2>
                <p className="section-header__text">A simple workflow for collaboration, communication, delivery, and launch.</p>
              </header>
              <div className={styles["process__timeline"]}>
                {portfolio.process.slice(0, 4).map((step) => (
                  <article className={styles["process__step"]} key={step.tag}>
                    <div className={styles["process__icon"]}>
                      <IconGlyph name={step.icon} />
                    </div>
                    <h3 className={styles["process__step-title"]}>{step.title}</h3>
                    <p className={styles["process__step-text"]}>{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
        </div>
      </section>

      <section className={`section ${styles["about"]}`} id="about">
        <div className="section__inner">
            <div className={`container ${styles["about__grid"]}`}>
              <div className={styles["about__copy"]}>
                <SectionHeader label="About me" title="About Ayoub" eyebrow={portfolio.about.story} />
                <p className={styles["about__text"]}>{portfolio.about.motivation}</p>
                {education ? (
                  <div className={styles["about__education"]}>
                    <span className={styles["about__education-label"]}>Education</span>
                    <strong className={styles["about__education-title"]}>{education.label}</strong>
                    <span className={styles["about__education-meta"]}>{education.status}</span>
                  </div>
                ) : null}
                <div className={styles["about__actions"]}>
                  <a className="button" href={portfolio.about.resumeHref} target="_blank" rel="noreferrer" download>
                    <IconGlyph name="download" />
                    Download resume
                  </a>
                  <a className="button button--ghost" href={portfolio.profile.linkedin} target="_blank" rel="noreferrer">
                    <IconGlyph name="linkedin" />
                    LinkedIn
                  </a>
                  <a className="button button--ghost" href={portfolio.profile.upwork} target="_blank" rel="noreferrer">
                    <IconGlyph name="externalLink" />
                    Upwork profile
                  </a>
                  <span className={styles["about__signature"]} aria-label={portfolio.about.signature}>
                    <img src="/mayoub-signature.png" alt="" loading="lazy" />
                  </span>
                </div>
              </div>
              <aside className={styles["about__panel"]}>
                <div
                  className={styles["about__portrait"]}
                  onMouseMove={handlePortraitSpotlight}
                  style={{ "--spotlight-x": "50%", "--spotlight-y": "42%" } as CSSProperties}
                >
                  <img src="/ayoub-about-v2.jpg" alt="Muhammad Ayoub" loading="lazy" />
                  <img src="/ayoub-about-v2.jpg" alt="" aria-hidden="true" loading="lazy" />
                  <div className={styles["about__portrait-caption"]}>
                    <strong>Muhammad Ayoub</strong>
                    <span>5+ years WordPress, CMS, and front-end experience</span>
                  </div>
                </div>
              </aside>
            </div>
            <div className={`container ${styles["about__recognition-row"]}`} aria-label="Awards recognition and certifications">
              {portfolio.about.awards.map((award) => (
                <span className={styles["about__recognition-item"]} key={award}>{award}</span>
              ))}
            </div>
        </div>
      </section>

      <section className="section" id="proof">
        <div className="section__inner">
            <div className="container">
              <ClientTestimonials clients={portfolio.clients} />
            </div>
        </div>
      </section>

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
    </>
  );
}
