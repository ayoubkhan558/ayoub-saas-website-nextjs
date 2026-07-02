import Link from "next/link";
import { Pagination } from "@/components/shared/Pagination";
import { paginate } from "@/lib/pagination";
import type { ProjectArchiveFilter, ProjectArchiveItem } from "@/data/projectsArchive";
import { projectArchiveFilters } from "@/data/projectsArchive";
import { ProjectArchiveGrid } from "./ProjectArchiveGrid";
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

  return (
    <section className={`section ${styles.archive}`} id="projects-list">
      <div className="section__inner">
        <div className={`container ${styles.archive__inner}`}>
          <header className={styles["section-header"]}>
            <span className={styles.eyebrow}>Selected work</span>
            <h2>Project archive.</h2>
            <p>
              Showing {page.startItem}-{page.endItem} of {page.totalItems}. Each card shows the project type,
              client context, short build summary, stack, category, and verified website link when available.
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
