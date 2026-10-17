import type {
  ProjectArchiveFilter,
  ProjectArchiveItem,
  ProjectPlatformFilter,
  ProjectStatusFilter,
} from "@/data/projectsArchive";
import { ProjectArchiveSection } from "../ProjectArchiveSection/ProjectArchiveSection";
import { ProjectCaseLinkSection } from "../ProjectCaseLinkSection/ProjectCaseLinkSection";
import { ProjectsHero } from "../ProjectsHero/ProjectsHero";

export function ProjectsPageContent({
  projects,
  currentPage,
  activeFilter,
  activePlatform,
  activeStatus,
  projectCount,
  liveCount,
  screenshotCount,
}: {
  projects: ProjectArchiveItem[];
  currentPage: number;
  activeFilter: ProjectArchiveFilter;
  activePlatform: ProjectPlatformFilter;
  activeStatus: ProjectStatusFilter;
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
      <ProjectArchiveSection
        projects={projects}
        currentPage={currentPage}
        activeFilter={activeFilter}
        activePlatform={activePlatform}
        activeStatus={activeStatus}
      />
      <ProjectCaseLinkSection />
    </main>
  );
}
