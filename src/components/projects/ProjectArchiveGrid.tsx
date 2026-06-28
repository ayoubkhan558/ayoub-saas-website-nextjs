import type { ProjectArchiveItem } from "@/data/projectsArchive";
import { ProjectArchiveCard } from "./ProjectArchiveCard";
import styles from "./ProjectsPage.module.scss";

export function ProjectArchiveGrid({ projects }: { projects: ProjectArchiveItem[] }) {
  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <ProjectArchiveCard project={project} key={project.rowNumber} />
      ))}
    </div>
  );
}
