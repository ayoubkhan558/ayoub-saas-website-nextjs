import type { PortfolioData } from "@/context/PortfolioContentContext";
import { ContactFooter } from "@/components/landing/ContactFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import styles from "./LegalPage.module.scss";

type LegalHighlight = {
  label: string;
  value: string;
};

type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function LegalPage({
  portfolio,
  label,
  title,
  description,
  lastUpdated,
  highlights,
  sections,
}: {
  portfolio: PortfolioData;
  label: string;
  title: string;
  description: string;
  lastUpdated: string;
  highlights: LegalHighlight[];
  sections: LegalSection[];
}) {
  return (
    <div className="site-shell">
      <SiteHeader portfolio={portfolio} />
      <main>
        <section className={`section ${styles["legal-hero"]}`}>
          <div className="section__inner">
            <div className={`container ${styles["legal-hero__inner"]}`}>
              <div className={styles["legal-hero__copy"]}>
                <span className={styles["legal-page__eyebrow"]}>{label}</span>
                <h1>{title}</h1>
                <p>{description}</p>
                <span className={styles["legal-hero__updated"]}>Last updated: {lastUpdated}</span>
              </div>
              <div className={styles["legal-summary-grid"]} aria-label={`${title} summary`}>
                {highlights.map((item) => (
                  <div className={styles["legal-summary-card"]} key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section__inner">
            <div className={`container ${styles["legal-layout"]}`}>
              <aside className={styles["legal-toc"]} aria-label={`${title} sections`}>
                <span className={styles["legal-page__eyebrow"]}>On this page</span>
                <nav>
                  {sections.map((section) => (
                    <a href={`#${slugify(section.title)}`} key={section.title}>
                      {section.title}
                    </a>
                  ))}
                </nav>
              </aside>

              <div className={styles["legal-content"]}>
                {sections.map((section) => (
                  <article className={styles["legal-section-card"]} id={slugify(section.title)} key={section.title}>
                    <h2>{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.bullets ? (
                      <ul>
                        {section.bullets.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <ContactFooter portfolio={portfolio} />
    </div>
  );
}
