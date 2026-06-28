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

  if (!entry) {
    return {
      title: "Case Study | Muhammad Ayoub",
    };
  }

  return {
    title: `${entry.title} | Muhammad Ayoub`,
    description: entry.description,
    alternates: { canonical: entry.href },
    openGraph: {
      title: `${entry.title} | Muhammad Ayoub`,
      description: entry.description,
      type: "article",
      url: entry.href,
      images: entry.image ? [{ url: entry.image, alt: entry.title }] : undefined,
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
