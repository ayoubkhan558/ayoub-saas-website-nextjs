import type { CaseStudyDetailData } from "@/data/caseStudyDetails";
import { CaseStudyBrowserMockup } from "./CaseStudyBrowserMockup";
import { CaseStudySectionHeader } from "./CaseStudySectionHeader";
import styles from "./CaseStudyDesktopLayout.module.scss";

function getPreviewImage(label: string) {
  const url = label.startsWith("http") ? label : `https://${label}`;
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1200`;
}

export function CaseStudyDesktopLayout({ study }: { study: CaseStudyDetailData }) {
  const fallbackImage = getPreviewImage(study.urlLabel);
  const pageShowcase =
    study.pageShowcase ??
    {
      label: "Delivered pages",
      title: "Selected desktop page views",
      text: "A focused look at the key desktop screens delivered for this project.",
      items: [
        {
          label: "Primary page",
          image: study.listing.image || fallbackImage,
          caption: "Delivered page view",
        },
      ],
    };

  return (
    <section className={`section ${styles.section}`}>
      <div className="section__inner">
        <div className={`container ${styles.sectionInner}`}>
          <CaseStudySectionHeader
            label={pageShowcase.label}
            title={pageShowcase.title}
            text={pageShowcase.text}
          />
          <div
            className={`${styles.showcaseGrid} ${pageShowcase.items.length === 1 ? styles.showcaseGridSingle : ""}`}
            aria-label={`${study.client} page showcase`}
          >
            {pageShowcase.items.map((item) => (
              <article className={styles.showcaseItem} key={item.label}>
                <CaseStudyBrowserMockup label={`${study.urlLabel} / ${item.label.toLowerCase()}`} compact scrollOnHover imageSrc={item.image} />
                <div className={styles.carouselCaption}>
                  <strong>{item.label}</strong>
                  <span>{item.caption ?? "Desktop page capture"}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
