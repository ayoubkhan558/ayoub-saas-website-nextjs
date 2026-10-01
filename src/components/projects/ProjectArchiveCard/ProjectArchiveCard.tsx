import { IconGlyph } from "@/components/landing/IconGlyph/IconGlyph";
import {
  getProjectDescription,
  getProjectCompany,
  getProjectInitials,
  getProjectLinks,
  getProjectMeta,
  getProjectThumbnail,
  getProjectTitle,
  getProjectType,
  type ProjectArchiveItem,
} from "@/data/projectsArchive";
import styles from "./ProjectArchiveCard.module.scss";

export function ProjectArchiveCard({ project }: { project: ProjectArchiveItem }) {
  const title = getProjectTitle(project);
  const description = getProjectDescription(project);
  const thumbnail = getProjectThumbnail(project);
  const company = getProjectCompany(project);
  const meta = getProjectMeta(project);
  const links = getProjectLinks(project);
  const websiteHref = links[0]?.href;
  const preview = thumbnail ? (
    <img className={styles.card__mediaImg} src={thumbnail} alt={`Screenshot preview for ${title}`} title={`Screenshot preview for ${title}`} loading="lazy" />
  ) : (
    <span className={styles.card__placeholder}>{getProjectInitials(project)}</span>
  );

  return (
    <article className={styles.card}>
      <div className={styles.card__media}>
        {websiteHref ? (
          <a className={styles.card__mediaLink} href={websiteHref} target="_blank" rel="noreferrer" title={`Visit ${title} website`}>
            {preview}
          </a>
        ) : (
          preview
        )}
        {company ? <span className={styles.card__company}>Company: {company}</span> : null}
      </div>
      <div className={styles.card__content}>
        <span className={styles.card__badge}>
          <IconGlyph name={project.websiteUrl ? "globe" : "layers"} />
          {getProjectType(project)}
        </span>

        <h3>
          {websiteHref ? (
            <a className={styles.card__titleLink} href={websiteHref} target="_blank" rel="noreferrer" title={`Visit ${title} website`}>
              {title}
            </a>
          ) : title}
        </h3>

        <p className={styles.card__desc}>{description}</p>

        {/* {project.client ? (
          <div className={styles.card__client}>
            <span>Client</span>
            <strong>{project.client}</strong>
          </div>
        ) : null} */}

        {meta.length ? (
          <div className={styles.card__meta} aria-label={`${title} metadata`}>
            {meta.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        ) : null}
        <div className={styles.card__actions}>
          {links.length ? (
            links.map((link) => (
              <a className={styles.card__link} href={link.href} target="_blank" rel="noreferrer" key={`${link.kind}-${link.href}`} title={`${link.label} for ${title}`}>
                {link.label}
                <IconGlyph name="externalLink" />
              </a>
            ))
          ) : (
            <span className={styles.card__unavailable}>No verified live link</span>
          )}


          {project.projectStatus === "Live" ? (
            <span className={styles.liveSignal} role="img" aria-label={`${title} website is live`} title="Live website" />
          ) : null}
        </div>
      </div>
    </article>
  );
}
