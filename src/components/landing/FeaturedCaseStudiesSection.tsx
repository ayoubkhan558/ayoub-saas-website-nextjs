import Link from "next/link";
import type { CaseStudyCard } from "@/data/work";
import { IconGlyph } from "./IconGlyph";
import { SectionHeader } from "./SectionHeader";
import styles from "./FeaturedCaseStudiesSection.module.scss";

export function FeaturedCaseStudiesSection({ projects }: { projects: CaseStudyCard[] }) {
  return (
    <section className="section" id="work">
      <div className="section__inner">
        <div className="container">
          <SectionHeader
            label="Featured case studies"
            title="Proven work"
            eyebrow="Real-world projects showcasing challenges solved, solutions delivered, and measurable results achieved."
          />
          <div className={styles["work__portfolio-grid"]}>
            {projects.map((project, index) => (
              <Link className={styles["work__project-card"]} key={project.title} href={project.href}>
                <span className={styles["work__project-topline"]}>
                  <span className={styles["work__project-index"]}>0{index + 1}</span>
                  <span className={styles["work__project-kind"]}>{project.tag.replace("_", " ")}</span>
                </span>
                <span className={styles["work__project-image"]}>
                  <img src={project.image} alt={project.imageAlt} loading="lazy" />
                </span>
                <span className={styles["work__project-content"]}>
                  <span className={styles["work__project-heading"]}>
                    <strong className={styles["work__project-title"]}>{project.title}</strong>
                    <span className={styles["work__tech-stack"]} aria-label={`${project.title} technology stack`}>
                      {project.stack.map((tool) => (
                        <span
                          className={`${styles["work__tech-logo"]} ${styles[`work__tech-logo--${tool.toLowerCase()}`] ?? ""}`}
                          key={tool}
                        >
                          {tool}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className={styles["work__project-description"]}>{project.description}</span>
                  <span className={styles["work__project-achievement"]}>{project.achievement}</span>
                  <span className={styles["work__project-result"]}>
                    View Full Case
                    <IconGlyph name="arrowRight" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
