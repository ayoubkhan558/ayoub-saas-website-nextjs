import type { PortfolioData } from "@/context/PortfolioContentContext";
import type { CaseStudyDetailData } from "@/data/caseStudyDetails";
import { CaseStudyBranding } from "../CaseStudyBranding/CaseStudyBranding";
import { CaseStudyChallengesResults } from "../CaseStudyChallengesResults/CaseStudyChallengesResults";
import { CaseStudyDesktopLayout } from "../CaseStudyDesktopLayout/CaseStudyDesktopLayout";
import { CaseStudyFeedback } from "../CaseStudyFeedback/CaseStudyFeedback";
import { CaseStudyHero } from "../CaseStudyHero/CaseStudyHero";
import { CaseStudyJsonLd } from "../CaseStudyJsonLd/CaseStudyJsonLd";
import { CaseStudyOverview } from "../CaseStudyOverview/CaseStudyOverview";
import { CaseStudyPager } from "../CaseStudyPager/CaseStudyPager";
import { CaseStudyTools } from "../CaseStudyTools/CaseStudyTools";
import styles from "../CaseStudy.module.scss";

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
