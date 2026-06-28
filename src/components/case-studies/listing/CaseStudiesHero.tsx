import styles from "./CaseStudiesListing.module.scss";

export function CaseStudiesHero({ caseStudyCount }: { caseStudyCount: number }) {
  return (
    <section className={`section ${styles.hero}`}>
      <div className="section__inner">
        <div className={`container ${styles.hero__inner}`}>
          <div className={styles.hero__copy}>
            <span className={styles.eyebrow}>Case studies</span>
            <h1>
              Case studies with <i>context.</i>
            </h1>
            <p>
              Each case shows the problem, stack, implementation decisions, responsive output, and measurable benefit
              behind selected client work.
            </p>
          </div>
          <aside className={styles.summary}>
            <span className={styles.eyebrow}>What you can inspect</span>
            <strong>{caseStudyCount} detailed project breakdowns.</strong>
            <p>Challenge, tools, layouts, branding, feedback, and CTA flow.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
