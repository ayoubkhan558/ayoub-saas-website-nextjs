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
  const image = study.heroMockup ?? entry.image;
  const resolvedImage = image ? new URL(image, portfolio.profile.website).toString() : undefined;
  const socialImage = resolvedImage ? [{ url: resolvedImage, alt: entry.imageAlt }] : undefined;
  const pageUrl = new URL(entry.href, portfolio.profile.website).toString();

  return {
    title,
    description,
    alternates: { canonical: entry.href },
    openGraph: {
      title,
      description,
      type: "article",
      url: pageUrl,
      siteName: portfolio.profile.brand,
      images: socialImage,
      publishedTime: study.pageSpeed?.measuredAt,
      authors: [portfolio.profile.name],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: resolvedImage ? [resolvedImage] : undefined,
      site: "@ayoubkhan558",
      creator: "@ayoubkhan558",
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
