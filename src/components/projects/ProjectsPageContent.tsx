import type { ProjectArchiveFilter, ProjectArchiveItem } from "@/data/projectsArchive";
import { ProjectArchiveSection } from "./ProjectArchiveSection";
import { ProjectCaseLinkSection } from "./ProjectCaseLinkSection";
import { ProjectsHero } from "./ProjectsHero";

export function ProjectsPageContent({
  projects,
  currentPage,
  activeFilter,
  projectCount,
  liveCount,
  screenshotCount,
}: {
  projects: ProjectArchiveItem[];
  currentPage: number;
  activeFilter: ProjectArchiveFilter;
  projectCount: number;
  liveCount: number;
  screenshotCount: number;
}) {
  const stats = [
    { label: "Projects", value: `${projectCount}` },
    { label: "Live projects", value: `${liveCount}` },
  ];

  return (
    <main>
      <ProjectsHero stats={stats} />
      <ProjectArchiveSection projects={projects} currentPage={currentPage} activeFilter={activeFilter} />
      <ProjectCaseLinkSection />
    </main>
  );
}
