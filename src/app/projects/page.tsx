import type { Metadata } from "next";
import { ContactFooter } from "@/components/landing/ContactFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { ProjectsPageContent } from "@/components/projects/ProjectsPageContent";
import { getPageNumber } from "@/lib/pagination";
import {
  normalizeProjectFilter,
  projectArchiveItems,
  projectMatchesFilter,
  sortProjectsByLiveStatus,
} from "@/data/projectsArchive";
import { buildProjectsSchema, jsonLdScript } from "@/lib/seo-schema";
import portfolio from "@/content/portfolio/portfolio.json";

export const metadata: Metadata = {
  title: "Website Design & Development Portfolio",
  description:
    "Website design and development portfolio by Muhammad Ayoub, including WordPress, WooCommerce, Bricks Builder, Elementor, React, Next.js, and business website projects.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Website Design & Development Portfolio | Muhammad Ayoub",
    description:
      "A structured showcase of client websites, WordPress builds, WooCommerce stores, product pages, and front-end implementation work.",
    type: "website",
    url: "/projects",
    images: [
      {
        url: "/ayoub-about-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Ayoub Khan website design and development portfolio",
      },
    ],
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
  const filteredProjects = sortProjectsByLiveStatus(
    projectArchiveItems.filter((project) => projectMatchesFilter(project, activeFilter)),
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
        projectCount={projectCount}
        liveCount={liveCount}
        screenshotCount={screenshotCount}
      />
      <ContactFooter portfolio={portfolio} />
    </div>
  );
}
