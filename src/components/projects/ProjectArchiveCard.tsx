import { IconGlyph } from "@/components/landing/IconGlyph";
import {
  getProjectDescription,
  getProjectInitials,
  getProjectLinks,
  getProjectMeta,
  getProjectThumbnail,
  getProjectTitle,
  getProjectType,
  type ProjectArchiveItem,
} from "@/data/projectsArchive";
import styles from "./ProjectsPage.module.scss";

export function ProjectArchiveCard({ project }: { project: ProjectArchiveItem }) {
  const title = getProjectTitle(project);
  const description = getProjectDescription(project);
  const thumbnail = getProjectThumbnail(project);
  const meta = getProjectMeta(project);
  const links = getProjectLinks(project);

  return (
    <article className={styles.card}>
      <div className={styles.card__media}>
        {thumbnail ? (
          <img src={thumbnail} alt={`Screenshot preview for ${title}`} loading="lazy" />
        ) : (
          <span className={styles.card__placeholder}>{getProjectInitials(project)}</span>
        )}
      </div>
      <div className={styles.card__content}>
        <span className={styles.card__badge}>
          <IconGlyph name={project.websiteUrl ? "globe" : "layers"} />
          {getProjectType(project)}
        </span>
        <h3>{title}</h3>
        <p>{description}</p>
        {project.client ? (
          <div className={styles.card__client}>
            <span>Client</span>
            <strong>{project.client}</strong>
          </div>
        ) : null}
        {meta.length ? (
          <div className={styles.meta} aria-label={`${title} metadata`}>
            {meta.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        ) : null}
        <div className={styles.card__actions}>
          {links.length ? (
            links.map((link) => (
              <a className={styles.card__link} href={link.href} target="_blank" rel="noreferrer" key={`${link.kind}-${link.href}`}>
                {link.label}
                <IconGlyph name="externalLink" />
              </a>
            ))
          ) : (
            <span className={styles.card__unavailable}>No verified live link</span>
          )}
        </div>
      </div>
    </article>
  );
}
