import Link from "next/link";
import { IconGlyph } from "@/components/landing/IconGlyph";
import styles from "./ProjectCaseLinkSection.module.scss";

export function ProjectCaseLinkSection() {
  return (
    <section className={`section ${styles["case-link"]}`}>
      <div className="section__inner">
        <div className={`container ${styles["case-link__inner"]}`}>
          <div>
            <span className={styles.eyebrow}>Need detail?</span>
            <h2>Case studies show the decision work.</h2>
          </div>
          <Link className="button" href="/case-studies" title="View case studies">
            View case studies
            <IconGlyph name="arrowRight" />
          </Link>
        </div>
      </div>
    </section>
  );
}
