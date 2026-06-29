import type { ProjectCard } from "@/data/work";
import { IconGlyph } from "./IconGlyph";
import { SectionHeader } from "./SectionHeader";
import styles from "./ProjectShowcaseSection.module.scss";

export function ProjectShowcaseSection({ projects }: { projects: ProjectCard[] }) {
  return (
    <section className="section" id="showcase">
      <div className="section__inner">
        <div className="container">
          <SectionHeader
            label="Projects"
            title="Showcase"
            eyebrow="Selected side projects with live links, build context, and the stack used to ship each one."
          />
          <div className={styles["showcase__list"]}>
            {projects.map((project) => {
              const isFreeTool = project.kind === "free-tool";

              return (
                <a
                  className={`${styles["showcase__card"]} ${isFreeTool ? styles["showcase__card--tool"] : ""}`}
                  key={project.title}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className={styles["showcase__media"]}>
                    <img src={project.image} alt={project.imageAlt} loading="lazy" />
                  </span>
                  <span className={styles["showcase__content"]}>
                    <span className={styles["showcase__badge"]}>
                      <IconGlyph name={project.icon} />
                      {project.badge ?? "Side project"}
                    </span>
                    <strong className={styles["showcase__title"]}>{project.title}</strong>
                    <span className={styles["showcase__stack"]}>{project.stack}</span>
                    {project.description ? (
                      <span className={styles["showcase__description"]}>{project.description}</span>
                    ) : null}
                    <span className={styles["showcase__tech-list"]} aria-label={`${project.title} technologies`}>
                      {project.technologies.map((technology) => (
                        <span className={styles["showcase__tech"]} key={technology}>
                          {technology}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className={styles["showcase__action"]} aria-hidden="true">
                    <span>{project.cta ?? "View project"}</span>
                    <IconGlyph name="externalLink" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
