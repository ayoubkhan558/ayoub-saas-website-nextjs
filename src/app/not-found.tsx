import Link from "next/link";
import { IconGlyph } from "@/components/landing/IconGlyph";
import { ContactFooter } from "@/components/landing/ContactFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import portfolio from "@/data/portfolio.json";
import styles from "./not-found.module.scss";

const paths = [
  { label: "Home", href: "/" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Projects", href: "/projects" },
  { label: "Hire me", href: "/contact" },
];

export default function NotFound() {
  return (
    <div className="site-shell">
      <SiteHeader portfolio={portfolio} />
      <main>
        <section className={`section ${styles["not-found-page"]}`}>
          <div className="section__inner">
            <div className={`container ${styles["not-found-page__inner"]}`}>
              <div className={styles["not-found-page__copy"]}>
                <span className={styles["not-found-page__code"]}>404</span>
                <h1>
                  Page <i>not found.</i>
                </h1>
                <p>
                  The site is still here. Jump back to the useful pages, or send the project details if you were trying
                  to contact me.
                </p>
                <div className={styles["not-found-page__actions"]}>
                  <Link className="button button--dark" href="/">
                    Back home
                    <IconGlyph name="arrowRight" />
                  </Link>
                  <Link className="button button--ghost" href="/contact">
                    Contact / hire me
                    <IconGlyph name="arrowRight" />
                  </Link>
                </div>
              </div>
              <nav className={styles["not-found-page__panel"]} aria-label="Helpful pages">
                <span className={styles["not-found-page__eyebrow"]}>Useful routes</span>
                {paths.map((path) => (
                  <Link href={path.href} key={path.href}>
                    <span>{path.label}</span>
                    <IconGlyph name="arrowRight" />
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </section>
      </main>
      <ContactFooter portfolio={portfolio} />
    </div>
  );
}
