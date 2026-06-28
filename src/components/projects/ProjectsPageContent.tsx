import Link from "next/link";
import { IconGlyph } from "@/components/landing/IconGlyph";
import { Pagination } from "@/components/shared/Pagination";
import { paginate } from "@/lib/pagination";
import type { ProjectArchiveItem } from "@/data/projectsArchive";
import { projectsArchive } from "@/data/projectsArchive";
import { ProjectArchiveGrid } from "./ProjectArchiveGrid";
import { ProjectsHero } from "./ProjectsHero";
import styles from "./ProjectsPage.module.scss";

const PROJECTS_PER_PAGE = 12;

export function ProjectsPageContent({
  projects,
  currentPage,
  liveCount,
  stackCount,
}: {
  projects: ProjectArchiveItem[];
  currentPage: number;
  liveCount: number;
  stackCount: number;
}) {
  const page = paginate(projects, currentPage, PROJECTS_PER_PAGE);
  const stats = [
    { label: "Projects", value: `${projectsArchive.projectCount}` },
    { label: "Live links", value: `${liveCount}` },
    { label: "Build stacks", value: `${stackCount}` },
  ];

  return (
    <main>
      <ProjectsHero stats={stats} />
      <section className={`section ${styles.archive}`}>
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

            <ProjectArchiveGrid projects={page.items} />
            <Pagination basePath="/projects" currentPage={page.currentPage} totalPages={page.totalPages} />
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
