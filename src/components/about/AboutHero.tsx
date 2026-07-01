import Link from "next/link";
import { IconGlyph } from "@/components/landing/IconGlyph";
import type { PortfolioData } from "@/context/PortfolioContentContext";
import { getAboutHeroStats } from "./aboutPageData";
import styles from "./AboutHero.module.scss";

export function AboutHero({ portfolio }: { portfolio: PortfolioData }) {
  const heroStats = getAboutHeroStats(portfolio);
  const fullName = portfolio.about.signature || portfolio.profile.name;

  return (
    <section className={`section ${styles["about-page-hero"]}`}>
      <div className="section__inner">
        <div className={`container ${styles["about-page-hero__inner"]}`}>
          <div className={styles["about-page-hero__copy"]}>
            <span className={styles["about-page__eyebrow"]}>About / {fullName}</span>
            <h1 className={styles["about-page-hero__title"]}>
              Self-taught developer, building with purpose.
            </h1>
            <p className={styles["about-page-hero__text"]}>
              {portfolio.profile.summary}
            </p>
            <div className={styles["about-page-hero__actions"]}>
              <Link className="button button--dark" href="/contact" title={`Hire ${fullName}`}>
                Hire me
                <IconGlyph name="arrowRight" />
              </Link>
              <a
                className="button button--ghost"
                href={portfolio.about.resumeHref}
                target="_blank"
                rel="noreferrer"
                download
                title={`Download ${fullName} resume`}
              >
                <IconGlyph name="download" />
                Download resume
              </a>
            </div>
          </div>

          <aside className={styles["about-page-hero-stats"]} aria-label={`About ${fullName} stats`}>
            {heroStats.map((stat) => (
              <div className={styles["about-page-hero-stat"]} key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
