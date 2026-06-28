import type { Metadata } from "next";
import { ContactFooter } from "@/components/landing/ContactFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { ProjectsPageContent } from "@/components/projects/ProjectsPageContent";
import { getPageNumber } from "@/lib/pagination";
import { projectArchiveItems } from "@/data/projectsArchive";
import portfolio from "@/data/portfolio.json";

export const metadata: Metadata = {
  title: "Projects | Muhammad Ayoub",
  description:
    "Selected React, WordPress, WooCommerce, Bricks Builder, and client website projects by Muhammad Ayoub.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects | Muhammad Ayoub",
    description:
      "A structured showcase of client websites, WordPress builds, product pages, and implementation work.",
    type: "website",
    url: "/projects",
  },
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const params = await searchParams;
  const currentPage = getPageNumber(params.page);
  const liveCount = projectArchiveItems.filter((project) => project.websiteUrl).length;
  const stackCount = new Set(
    projectArchiveItems.map((project) => project.platformFrameworkBuilder).filter(Boolean),
  ).size;

  return (
    <div className="site-shell">
      <SiteHeader portfolio={portfolio} />
      <ProjectsPageContent
        projects={projectArchiveItems}
        currentPage={currentPage}
        liveCount={liveCount}
        stackCount={stackCount}
      />
      <ContactFooter portfolio={portfolio} />
    </div>
  );
}
