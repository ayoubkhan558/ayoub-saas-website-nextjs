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
  const homepageShowcase =
    study.homepageShowcase ??
    {
      label: "Desktop homepage",
      title: "Delivered desktop homepage view",
      text: "A focused desktop view of the homepage delivered for this project.",
      items: [
        {
          label: "Homepage",
          image: study.listing.image || fallbackImage,
          caption: "Delivered homepage",
        },
      ],
    };

  return (
    <section className={`section ${styles.section}`}>
      <div className="section__inner">
        <div className={`container ${styles.sectionInner}`}>
          <CaseStudySectionHeader
            label={homepageShowcase.label}
            title={homepageShowcase.title}
            text={homepageShowcase.text}
          />
          <div
            className={`${styles.comparisonGrid} ${homepageShowcase.items.length === 1 ? styles.comparisonGridSingle : ""}`}
            aria-label={`${study.client} homepage showcase`}
          >
            {homepageShowcase.items.map((item) => (
              <article className={styles.comparisonItem} key={item.label}>
                <CaseStudyBrowserMockup label={`${study.urlLabel} / ${item.label.toLowerCase()}`} compact scrollOnHover imageSrc={item.image} />
                <div className={styles.carouselCaption}>
                  <strong>{item.label}</strong>
                  <span>{item.caption ?? "Desktop homepage capture"}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
