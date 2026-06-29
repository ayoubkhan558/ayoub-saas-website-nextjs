import type { Metadata } from "next";
import { ContactFooter } from "@/components/landing/ContactFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { ProjectsPageContent } from "@/components/projects/ProjectsPageContent";
import { getPageNumber } from "@/lib/pagination";
import {
  normalizeProjectFilter,
  projectArchiveItems,
  projectMatchesFilter,
} from "@/data/projectsArchive";
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
  searchParams: Promise<{ page?: string | string[]; filter?: string | string[] }>;
}) {
  const params = await searchParams;
  const currentPage = getPageNumber(params.page);
  const activeFilter = normalizeProjectFilter(params.filter);
  const filteredProjects = projectArchiveItems.filter((project) => projectMatchesFilter(project, activeFilter));
  const projectCount = projectArchiveItems.length;
  const liveCount = projectArchiveItems.filter((project) => project.projectStatus === "Live").length;
  const screenshotCount = projectArchiveItems.filter((project) => Boolean(project.screenshot)).length;

  return (
    <div className="site-shell">
      <SiteHeader portfolio={portfolio} />
      <ProjectsPageContent
        projects={filteredProjects}
        currentPage={currentPage}
        activeFilter={activeFilter}
        projectCount={projectCount}
        liveCount={liveCount}
        screenshotCount={screenshotCount}
      />
      <ContactFooter portfolio={portfolio} />
    </div>
  );
}
