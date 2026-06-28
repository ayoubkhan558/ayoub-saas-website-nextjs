import type { CaseStudyDetailData } from "@/data/caseStudyDetails";
import { CaseStudyBrowserMockup } from "./CaseStudyBrowserMockup";
import { CaseStudySectionHeader } from "./CaseStudySectionHeader";
import styles from "./Ape24ProCaseStudy.module.scss";

function getPreviewImage(label: string) {
  const url = label.startsWith("http") ? label : `https://${label}`;
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1200`;
}

export function CaseStudyDesktopLayout({ study }: { study: CaseStudyDetailData }) {
  const previewImage = getPreviewImage(study.urlLabel);

  return (
    <section className={`section ${styles.section}`}>
      <div className="section__inner">
        <div className={`container ${styles.sectionInner}`}>
          <CaseStudySectionHeader
            label="Desktop layout"
            title="Key screens in a horizontal system"
            text="A wide visual run-through of the pages and states delivered for desktop users."
          />
          <div className={styles.carousel} aria-label={`${study.client} desktop website layout carousel`}>
            {study.desktopPages.map((page) => (
              <article className={styles.carouselItem} key={page.name}>
                <CaseStudyBrowserMockup label={`${study.urlLabel} / ${page.name.toLowerCase()}`} compact imageSrc={previewImage} />
                <div className={styles.carouselCaption}>
                  <strong>{page.name}</strong>
                  <span>{page.type}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
