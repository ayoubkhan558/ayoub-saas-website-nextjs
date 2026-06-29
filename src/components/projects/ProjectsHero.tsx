import Link from "next/link";
import { IconGlyph } from "@/components/landing/IconGlyph";
import styles from "./ProjectsPage.module.scss";

export function ProjectsHero({ stats }: { stats: Array<{ label: string; value: string }> }) {
  return (
    <section className={`section ${styles.hero}`}>
      <div className="section__inner">
        <div className={`container ${styles.hero__inner}`}>
          <div className={styles.hero__copy}>
            <span className={styles.eyebrow}>Projects</span>
            <h1>
              Selected client <i>projects.</i>
            </h1>
            <p>
              A wider archive of shipped websites, WordPress builds, product pages, and implementation work from my
              project tracker.
            </p>
            <div className={styles.hero__actions}>
              <Link className="button button--dark" href="/contact">
                Start a project
                <IconGlyph name="arrowRight" />
              </Link>
              <Link className="button button--ghost" href="/case-studies">
                View case studies
                <IconGlyph name="arrowRight" />
              </Link>
            </div>
          </div>

          <aside className={styles.signal} aria-label="Project showcase summary">
            <span className={styles.eyebrow}>Showcase mix</span>
            <div className={styles.signal__stats}>
              {stats.map((stat) => (
                <div key={stat.label}>
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
