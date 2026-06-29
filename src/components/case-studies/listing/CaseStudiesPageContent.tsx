import { Pagination } from "@/components/shared/Pagination";
import type { CaseStudyCard } from "@/data/work";
import { paginate } from "@/lib/pagination";
import { CaseStudyListingGrid } from "./CaseStudyListingGrid";
import { CaseStudiesHero } from "./CaseStudiesHero";
import styles from "./CaseStudiesListing.module.scss";

const CASE_STUDIES_PER_PAGE = 3;

export function CaseStudiesPageContent({
  caseStudies,
  currentPage,
}: {
  caseStudies: CaseStudyCard[];
  currentPage: number;
}) {
  const page = paginate(caseStudies, currentPage, CASE_STUDIES_PER_PAGE);

  return (
    <main>
      <CaseStudiesHero caseStudyCount={caseStudies.length} />
      <section className={`section ${styles.list}`} id="case-studies-list">
        <div className="section__inner">
          <div className={`container ${styles.list__inner}`}>
            <header className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Selected cases</span>
              <h2>
                Detailed work with <i>proof.</i>
              </h2>
              <p>
                Showing {page.startItem}-{page.endItem} of {page.totalItems}. Each case opens into challenge, tools,
                layouts, responsive behavior, branding, and feedback.
              </p>
            </header>
            <CaseStudyListingGrid studies={page.items} startIndex={(page.currentPage - 1) * CASE_STUDIES_PER_PAGE} />
            <Pagination
              basePath="/case-studies"
              currentPage={page.currentPage}
              totalPages={page.totalPages}
              anchorId="case-studies-list"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
