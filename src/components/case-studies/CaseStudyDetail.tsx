import type { PortfolioData } from "@/context/PortfolioContentContext";
import type { CaseStudyDetailData } from "@/data/caseStudyDetails";
import { CaseStudyBranding } from "./CaseStudyBranding";
import { CaseStudyChallengesResults } from "./CaseStudyChallengesResults";
import { CaseStudyDesktopLayout } from "./CaseStudyDesktopLayout";
import { CaseStudyFeedback } from "./CaseStudyFeedback";
import { CaseStudyHero } from "./CaseStudyHero";
import { CaseStudyJsonLd } from "./CaseStudyJsonLd";
import { CaseStudyOverview } from "./CaseStudyOverview";
import { CaseStudyPager } from "./CaseStudyPager";
import { CaseStudyTools } from "./CaseStudyTools";
import styles from "./CaseStudy.module.scss";

export function CaseStudyDetail({
  portfolio,
  study,
}: {
  portfolio: PortfolioData;
  study: CaseStudyDetailData;
}) {
  return (
    <main className={styles["case-study"]}>
      <CaseStudyJsonLd portfolio={portfolio} study={study} />
      <CaseStudyHero study={study} />
      <CaseStudyOverview study={study} />
      <CaseStudyChallengesResults study={study} />
      <CaseStudyTools study={study} />
      <CaseStudyBranding study={study} />
      <CaseStudyDesktopLayout study={study} />
      <CaseStudyFeedback study={study} />
      <CaseStudyPager study={study} />
    </main>
  );
}
