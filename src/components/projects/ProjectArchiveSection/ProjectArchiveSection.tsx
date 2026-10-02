import Link from "next/link";
import { CopyLinksControl, type CopyLinkEntry } from "@/components/shared/CopyLinksControl/CopyLinksControl";
import { Pagination } from "@/components/shared/Pagination/Pagination";
import { getProjectLinks, projectArchiveItems, projectMatchesFilter, type ProjectArchiveFilter, type ProjectArchiveItem } from "@/data/projectsArchive";
import { projectArchiveFilters } from "@/data/projectsArchive";
import { paginate } from "@/lib/pagination";
import { ProjectArchiveGrid } from "../ProjectArchiveGrid/ProjectArchiveGrid";
import styles from "./ProjectArchiveSection.module.scss";

const PROJECTS_PER_PAGE = 12;

export function ProjectArchiveSection({
  projects,
  currentPage,
  activeFilter,
}: {
  projects: ProjectArchiveItem[];
  currentPage: number;
  activeFilter: ProjectArchiveFilter;
}) {
  const page = paginate(projects, currentPage, PROJECTS_PER_PAGE);
  const paginationBasePath = activeFilter === "all" ? "/projects" : `/projects?filter=${activeFilter}`;
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

          <div className={styles.filters} aria-label="Filter projects">
            {projectArchiveFilters.map((filter) => {
              const isActive = filter.value === activeFilter;
              const href = filter.value === "all" ? "/projects#projects-list" : `/projects?filter=${filter.value}#projects-list`;

              return (
                <Link
                  className={`${styles.filters__link} ${isActive ? styles["filters__link--active"] : ""}`}
                  href={href}
                  title={`Filter projects by ${filter.label}`}
                  aria-current={isActive ? "page" : undefined}
                  key={filter.value}
                >
                  {filter.label}
                </Link>
              );
            })}
          </div>

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
