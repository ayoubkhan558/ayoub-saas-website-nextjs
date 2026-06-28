import type { CaseStudyCard } from "@/data/work";
import { CaseStudyListingCard } from "./CaseStudyListingCard";
import styles from "./CaseStudiesListing.module.scss";

export function CaseStudyListingGrid({
  studies,
  startIndex,
}: {
  studies: CaseStudyCard[];
  startIndex: number;
}) {
  return (
    <div className={styles.grid}>
      {studies.map((study, index) => (
        <CaseStudyListingCard study={study} index={startIndex + index} key={study.href} />
      ))}
    </div>
  );
}
