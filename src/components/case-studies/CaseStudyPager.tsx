import Link from "next/link";
import type { CaseStudyDetailData } from "@/data/caseStudyDetails";
import { caseStudies } from "@/data/work";
import { IconGlyph } from "@/components/landing/IconGlyph";
import styles from "./CaseStudyPager.module.scss";

export function CaseStudyPager({ study }: { study: CaseStudyDetailData }) {
  const currentIndex = caseStudies.findIndex((item) => item.href.endsWith(`/${study.slug}`));

  if (currentIndex === -1 || caseStudies.length < 2) {
    return null;
  }

  const previousStudy = caseStudies[(currentIndex - 1 + caseStudies.length) % caseStudies.length];
  const nextStudy = caseStudies[(currentIndex + 1) % caseStudies.length];

  return (
    <nav className={`section ${styles["case-study-pager"]}`} aria-label="Case study navigation">
      <div className="section__inner">
        <div className={`container ${styles["case-study-pager__inner"]}`}>
          <Link className={styles["case-study-pager__link"]} href={previousStudy.href}>
            <IconGlyph className={styles["case-study-pager__icon"]} name="arrowLeft" />
            <span className={styles["case-study-pager__copy"]}>
              <span className={styles["case-study-pager__label"]}>Previous case study</span>
              <strong className={styles["case-study-pager__title"]}>{previousStudy.title}</strong>
            </span>
          </Link>

          <Link className={`${styles["case-study-pager__link"]} ${styles["case-study-pager__link--next"]}`} href={nextStudy.href}>
            <span className={styles["case-study-pager__copy"]}>
              <span className={styles["case-study-pager__label"]}>Next case study</span>
              <strong className={styles["case-study-pager__title"]}>{nextStudy.title}</strong>
            </span>
            <IconGlyph className={styles["case-study-pager__icon"]} name="arrowRight" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
