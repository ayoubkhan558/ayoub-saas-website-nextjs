import type { PortfolioData } from "@/context/PortfolioContentContext";
import type { CaseStudyDetailData } from "@/data/caseStudyDetails";

export function CaseStudyJsonLd({
  portfolio,
  study,
}: {
  portfolio: PortfolioData;
  study: CaseStudyDetailData;
}) {
  const projectType = study.facts.find((fact) => fact.label.toLowerCase() === "project type")?.value;
  const industry = study.facts.find((fact) => fact.label.toLowerCase() === "industry")?.value;
  const objective = study.facts.find((fact) => fact.label.toLowerCase() === "objective")?.value;
  const pageUrl = `${portfolio.profile.website}/case-studies/${study.slug}`;
  const previewImage = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(study.liveUrl)}?w=1200`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${portfolio.profile.website}#person`,
        name: portfolio.profile.name,
        url: portfolio.profile.website,
        email: portfolio.profile.email,
        jobTitle: portfolio.profile.role,
        address: {
          "@type": "PostalAddress",
          addressLocality: portfolio.profile.location,
        },
      },
      {
        "@type": "Organization",
        "@id": `${study.liveUrl}#client`,
        name: study.client,
        url: study.liveUrl,
        industry,
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${study.client} project case study`,
        headline: study.headline,
        description: study.overview,
        image: previewImage,
        inLanguage: "en",
        dateModified: study.pageSpeed?.measuredAt,
        mainEntity: {
          "@id": `${pageUrl}#case-study`,
        },
        about: {
          "@id": `${study.liveUrl}#client`,
        },
      },
      {
        "@type": "CreativeWork",
        "@id": `${pageUrl}#case-study`,
        url: pageUrl,
        name: `${study.client} project case study`,
        headline: study.headline,
        description: study.overview,
        image: previewImage,
        inLanguage: "en",
        dateModified: study.pageSpeed?.measuredAt,
        mainEntityOfPage: {
          "@id": `${pageUrl}#webpage`,
        },
        creator: {
          "@id": `${portfolio.profile.website}#person`,
        },
        about: {
          "@id": `${study.liveUrl}#client`,
        },
        mainEntity: {
          "@type": "Service",
          name: projectType,
          serviceType: projectType,
          provider: {
            "@id": `${portfolio.profile.website}#person`,
          },
          areaServed: "Worldwide",
          audience: {
            "@type": "BusinessAudience",
            audienceType: industry,
          },
          description: objective ?? study.tagline,
        },
        workExample: {
          "@type": "WebSite",
          name: `${study.client} website`,
          url: study.liveUrl,
          image: previewImage,
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
        hasPart: study.results.map((result) => ({
          "@type": "CreativeWork",
          name: result.title,
          description: result.text,
        })),
        keywords: [industry, projectType, ...study.tools].filter(Boolean).join(", "),
      },
      {
        "@type": "Organization",
        name: study.client,
        url: study.liveUrl,
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
