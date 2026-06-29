import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { ContactFooter } from "@/components/landing/ContactFooter";
import { CaseStudyDetail } from "@/components/case-studies/CaseStudyDetail";
import { caseStudyDetails } from "@/data/caseStudyDetails";
import { caseStudies } from "@/data/work";
import portfolio from "@/data/portfolio.json";

export function generateStaticParams() {
  return caseStudies.map((entry) => ({ slug: entry.href.replace(/^\/case-studies\//, "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = caseStudies.find((item) => item.href === `/case-studies/${slug}`);
  const study = caseStudyDetails[slug];

  if (!entry || !study) {
    return {
      title: "Case Study | Muhammad Ayoub",
    };
  }

  const title = `${study.client} Project Case Study | Muhammad Ayoub`;
  const description = `${study.headline} ${study.overview}`.slice(0, 155);
  const image = entry.image ? [{ url: entry.image, alt: entry.imageAlt, width: 1200, height: 630 }] : undefined;

  return {
    title,
    description,
    alternates: { canonical: entry.href },
    keywords: [
      study.client,
      "case study",
      "WordPress case study",
      "frontend development case study",
      "website redesign",
      "Muhammad Ayoub portfolio",
      ...study.tools,
    ],
    openGraph: {
      title,
      description,
      type: "article",
      url: entry.href,
      siteName: "Muhammad Ayoub Portfolio",
      images: image,
      publishedTime: study.pageSpeed?.measuredAt,
      authors: [portfolio.profile.name],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: entry.image ? [entry.image] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudyDetails[slug];

  if (!study) {
    notFound();
  }

  return (
    <div className="site-shell">
      <SiteHeader portfolio={portfolio} />
      <CaseStudyDetail portfolio={portfolio} study={study} />
      <ContactFooter portfolio={portfolio} />
    </div>
  );
}
