import { CopyLinksControl, type CopyLinkEntry } from "@/components/shared/CopyLinksControl/CopyLinksControl";
import { Pagination } from "@/components/shared/Pagination/Pagination";
import {
  getProjectLinks,
  projectArchiveItems,
  projectMatchesFilter,
  projectArchiveFilters,
  projectPlatformFilters,
  projectStatusFilters,
  type ProjectArchiveFilter,
  type ProjectArchiveItem,
  type ProjectPlatformFilter,
  type ProjectStatusFilter,
} from "@/data/projectsArchive";
import { paginate } from "@/lib/pagination";
import { ProjectArchiveFilters } from "./ProjectArchiveFilters";
import { ProjectArchiveGrid } from "../ProjectArchiveGrid/ProjectArchiveGrid";
import styles from "./ProjectArchiveSection.module.scss";

const PROJECTS_PER_PAGE = 12;

export function ProjectArchiveSection({
  projects,
  currentPage,
  activeFilter,
  activePlatform,
  activeStatus,
}: {
  projects: ProjectArchiveItem[];
  currentPage: number;
  activeFilter: ProjectArchiveFilter;
  activePlatform: ProjectPlatformFilter;
  activeStatus: ProjectStatusFilter;
}) {
  const page = paginate(projects, currentPage, PROJECTS_PER_PAGE);
  const selectedPlatform = activePlatform !== "all"
    ? activePlatform
    : projectPlatformFilters.find((filter) => filter.value === activeFilter)?.value ?? "all";
  const selectedStatus = activeStatus !== "all"
    ? activeStatus
    : projectStatusFilters.find((filter) => filter.value === activeFilter)?.value ?? "all";
  const paginationParams = new URLSearchParams();
  if (activeFilter !== "all") paginationParams.set("filter", activeFilter);
  if (activePlatform !== "all") paginationParams.set("platform", activePlatform);
  if (activeStatus !== "all") paginationParams.set("status", activeStatus);
  const paginationQuery = paginationParams.toString();
  const paginationBasePath = paginationQuery ? `/projects?${paginationQuery}` : "/projects";
  const getEntries = (items: ProjectArchiveItem[]): CopyLinkEntry[] => items
    .filter((project) => project.projectStatus === "Live")
    .flatMap((project) => getProjectLinks(project).map((link) => ({
      name: project.websiteName || project.websiteUrl || "Untitled project",
      nameLabel: project.platformFrameworkBuilder || project.projectType || "Website",
      category: project.categoryNiche || project.projectType || "Uncategorized",
      href: link.href,
    })));
  const liveEntries = getEntries(projectArchiveItems);
  const copyGroups = projectArchiveFilters
    .filter((filter) => filter.value !== "all")
    .map((filter) => ({
      label: filter.label,
      entries: getEntries(projectArchiveItems.filter((project) => projectMatchesFilter(project, filter.value))),
    }))
    .filter((group) => group.entries.length > 0);

  return (
    <section className={`section ${styles.archive}`} id="projects-list">
      <div className="section__inner">
        <div className={`container ${styles.archive__inner}`}>
          <header className={styles["section-header"]}>
            {/* <span className={styles.eyebrow}>Selected work</span> */}
            {/* <h2>Project archive.</h2> */}
            <p>
              Showing {page.startItem}-{page.endItem} of {page.totalItems}.
            </p>
          </header>

          <ProjectArchiveFilters initialPlatform={selectedPlatform} initialStatus={selectedStatus} />

          <CopyLinksControl allEntries={liveEntries} groups={copyGroups} itemName="project" />
          <ProjectArchiveGrid projects={page.items} />
          <Pagination
            basePath={paginationBasePath}
            currentPage={page.currentPage}
            totalPages={page.totalPages}
            anchorId="projects-list"
          />
        </div>
      </div>
    </section>
  );
}
