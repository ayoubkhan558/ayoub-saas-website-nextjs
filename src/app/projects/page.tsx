import type { Metadata } from "next";
import { ContactFooter } from "@/components/landing/ContactFooter/ContactFooter";
import { SiteHeader } from "@/components/landing/SiteHeader/SiteHeader";
import { ProjectsPageContent } from "@/components/projects/ProjectsPageContent/ProjectsPageContent";
import { getPageNumber } from "@/lib/pagination";
import {
  normalizeProjectFilter,
  normalizeProjectPlatformFilter,
  normalizeProjectStatusFilter,
  projectArchiveItems,
  projectMatchesFilter,
  projectMatchesPlatform,
  projectMatchesStatus,
  sortProjectsByLiveStatus,
} from "@/data/projectsArchive";
import { buildProjectsSchema, jsonLdScript } from "@/lib/seo-schema";
import portfolio from "@/data/portfolio.json";

export const metadata: Metadata = {
  title: "Website Design & Development Portfolio",
  description:
    "Portfolio of Bricks Builder, WordPress, Figma to code, React, Next.js, and Shopify projects by Muhammad Ayoub Khan.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Website Design & Development Portfolio",
    description:
      "Client websites, Bricks builds, WooCommerce stores, and front-end implementation work.",
    type: "website",
    url: "/projects",
    images: [
      {
        url: "/social/ayoub-portfolio-thumbnail-projects.jpg",
        width: 1734,
        height: 907,
        alt: "Muhammad Ayoub Khan website design and development portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Design & Development Portfolio",
    description:
      "Client websites, Bricks builds, WooCommerce stores, and front-end implementation work.",
    images: ["/social/ayoub-portfolio-thumbnail-projects.jpg"],
  },
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string | string[];
    filter?: string | string[];
    platform?: string | string[];
    status?: string | string[];
  }>;
}) {
  const params = await searchParams;
  const currentPage = getPageNumber(params.page);
  const activeFilter = normalizeProjectFilter(params.filter);
  const activePlatform = normalizeProjectPlatformFilter(params.platform);
  const activeStatus = normalizeProjectStatusFilter(params.status);
  const filteredProjects = sortProjectsByLiveStatus(
    projectArchiveItems.filter(
      (project) =>
        projectMatchesFilter(project, activeFilter) &&
        projectMatchesPlatform(project, activePlatform) &&
        projectMatchesStatus(project, activeStatus),
    ),
  );
  const projectCount = projectArchiveItems.length;
  const liveCount = projectArchiveItems.filter((project) => project.projectStatus === "Live").length;
  const screenshotCount = projectArchiveItems.filter((project) => Boolean(project.screenshot)).length;
  const schema = buildProjectsSchema();
  const jsonLd = { __html: jsonLdScript(schema) };

  return (
    <div className="site-shell">
      <script
        type="application/ld+json"
        id="projects-json-ld"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }}
      />
      <SiteHeader portfolio={portfolio} />
      <ProjectsPageContent
        projects={filteredProjects}
        currentPage={currentPage}
        activeFilter={activeFilter}
        activePlatform={activePlatform}
        activeStatus={activeStatus}
        projectCount={projectCount}
        liveCount={liveCount}
        screenshotCount={screenshotCount}
      />
      <ContactFooter portfolio={portfolio} />
    </div>
  );
}
