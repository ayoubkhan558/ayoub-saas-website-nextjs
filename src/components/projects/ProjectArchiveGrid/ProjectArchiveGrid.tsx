import type { ProjectArchiveItem } from "@/data/projectsArchive";
import { ProjectArchiveCard } from "../ProjectArchiveCard/ProjectArchiveCard";
import styles from "./ProjectArchiveGrid.module.scss";

export function ProjectArchiveGrid({ projects }: { projects: ProjectArchiveItem[] }) {
  return (
    <div className={styles.grid}>
      {projects.map((project, index) => (
        <ProjectArchiveCard project={project} key={`${project.websiteUrl ?? project.websiteName ?? "project"}-${index}`} />
      ))}
    </div>
  );
}
