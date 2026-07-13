import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/landing/SiteHeader/SiteHeader";
import { ContactFooter } from "@/components/landing/ContactFooter/ContactFooter";
import { CaseStudyDetail } from "@/components/case-studies/CaseStudyDetail/CaseStudyDetail";
import { caseStudyDetails } from "@/data/caseStudyDetails";
import { caseStudySeo } from "@/data/caseStudySeo";
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
  const seo = caseStudySeo[slug];

  if (!entry || !study) {
    return { title: "Case Study" };
  }

  const title = seo?.title ?? `${study.client} Case Study`;
  const description = seo?.description ?? `${study.headline} ${study.overview}`.slice(0, 155);
  const image = entry.image ? [{ url: entry.image, alt: entry.imageAlt, width: 1200, height: 630 }] : undefined;

  return {
    title,
    description,
    alternates: { canonical: entry.href },
    openGraph: {
      title,
      description,
      type: "article",
      url: entry.href,
      siteName: portfolio.profile.brand,
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
