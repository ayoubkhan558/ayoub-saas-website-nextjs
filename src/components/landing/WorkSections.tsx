import Link from "next/link";
import type { PortfolioData } from "@/context/PortfolioContentContext";
import { caseStudies, projects } from "@/data/work";
import { IconGlyph } from "./IconGlyph";
import { SectionHeader } from "./SectionHeader";
import styles from "./WorkSections.module.scss";

export function WorkSections({ portfolio }: { portfolio: PortfolioData }) {
  const featuredProjects = caseStudies.slice(0, 3);
  const showcasedProjects = projects.filter((project) => project.kind !== "free-tool");
  const services = portfolio.services.slice(0, 3);

  return (
    <>
      <section className="section" id="work">
        <div className="section__inner">
            <div className="container">
              <SectionHeader
                label="Featured case studies"
                title="Proven work"
                eyebrow="Real-world projects showcasing challenges solved, solutions delivered, and measurable results achieved."
              />
              <div className={styles["work__portfolio-grid"]}>
                {featuredProjects.map((project, index) => {
                  return (
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
                              <span className={`${styles["work__tech-logo"]} ${styles[`work__tech-logo--${tool.toLowerCase()}`] ?? ""}`} key={tool}>
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
                  );
                })}
              </div>
            </div>
        </div>
      </section>

      <section className="section" id="showcase">
        <div className="section__inner">
            <div className="container">
              <SectionHeader
                label="Projects"
                title="Showcase"
                eyebrow="Selected side projects with live links, build context, and the stack used to ship each one."
              />
              <div className={styles["showcase__list"]}>
                {showcasedProjects.map((project) => {
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
                            <span className={styles["showcase__tech"]} key={technology}>{technology}</span>
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

      <section className="section" id="services">
        <div className="section__inner">
            <div className={`container ${styles["services"]}`}>
              <header className="section-header section-header--center">
                <span className="section-header__label">Services</span>
                <h2 className="section-header__title">for growing <span>websites</span></h2>
                <p className="section-header__text">Three ways I help businesses move from scattered site problems to maintained systems.</p>
              </header>
              <div className={styles["services__grid"]}>
                {services.map((service, index) => (
                  <article className={`${styles["services__card"]} ${service.highlight ? styles["services__card--featured"] : ""}`} key={service.name}>
                    <div className={styles["services__icon"]}>
                      <IconGlyph name={index === 0 ? "globe" : index === 1 ? "cart" : "code"} />
                      <span className={styles["services__index"]}>0{index + 1}</span>
                    </div>
                    <h3 className={styles["services__card-title"]}>{service.name}</h3>
                    <p className={styles["services__card-text"]}>{service.description}</p>
                    <dl className={styles["services__detail-list"]}>
                      <div className={styles["services__detail"]}>
                        <dt>What you get</dt>
                        <dd>{service.whatYouGet}</dd>
                      </div>
                      <div className={styles["services__detail"]}>
                        <dt>Timeline</dt>
                        <dd>{service.timeline}</dd>
                      </div>
                      <div className={styles["services__detail"]}>
                        <dt>Best fit</dt>
                        <dd>{service.bestFit}</dd>
                      </div>
                    </dl>
                    <a className={styles["services__link"]} href={service.href}>
                      {service.cta}
                      <IconGlyph name="arrowRight" />
                    </a>
                  </article>
                ))}
              </div>
            </div>
        </div>
      </section>
    </>
  );
}
