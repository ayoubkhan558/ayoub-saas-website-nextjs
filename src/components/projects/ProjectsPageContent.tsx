import Link from "next/link";
import { IconGlyph } from "@/components/landing/IconGlyph";
import { Pagination } from "@/components/shared/Pagination";
import { paginate } from "@/lib/pagination";
import type { ProjectArchiveFilter, ProjectArchiveItem } from "@/data/projectsArchive";
import { projectArchiveFilters } from "@/data/projectsArchive";
import { ProjectArchiveGrid } from "./ProjectArchiveGrid";
import { ProjectsHero } from "./ProjectsHero";
import styles from "./ProjectsPage.module.scss";

const PROJECTS_PER_PAGE = 12;

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
  const page = paginate(projects, currentPage, PROJECTS_PER_PAGE);
  const paginationBasePath = activeFilter === "all" ? "/projects" : `/projects?filter=${activeFilter}`;
  const stats = [
    { label: "Projects", value: `${projectCount}` },
    { label: "Live projects", value: `${liveCount}` },
    { label: "Cached shots", value: `${screenshotCount}` },
  ];

  return (
    <main>
      <ProjectsHero stats={stats} />
      <section className={`section ${styles.archive}`} id="projects-list">
        <div className="section__inner">
          <div className={`container ${styles.archive__inner}`}>
            <header className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Selected work</span>
              <h2>
                Project <i>archive.</i>
              </h2>
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
      <section className={`section ${styles.caseLink}`}>
        <div className="section__inner">
          <div className={`container ${styles.caseLink__inner}`}>
            <div>
              <span className={styles.eyebrow}>Need detail?</span>
              <h2>
                Case studies show the <i>decision work.</i>
              </h2>
            </div>
            <Link className="button button--dark" href="/case-studies">
              View case studies
              <IconGlyph name="arrowRight" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
