import type { PortfolioData } from "@/context/PortfolioContentContext";
import type { CaseStudyDetailData } from "@/data/caseStudyDetails";

export function CaseStudyJsonLd({
  portfolio,
  study,
}: {
  portfolio: PortfolioData;
  study: CaseStudyDetailData;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${study.client} case study`,
    headline: study.headline,
    description: study.overview,
    creator: {
      "@type": "Person",
      name: portfolio.profile.name,
      url: portfolio.profile.website,
    },
    about: {
      "@type": "Organization",
      name: study.client,
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody: study.testimonial.quote,
      author: {
        "@type": "Organization",
        name: study.testimonial.author,
      },
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
