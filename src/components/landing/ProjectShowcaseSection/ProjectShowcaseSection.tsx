"use client";

import { useRef, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import type { Splide as SplideInstance } from "@splidejs/splide";
import type { ProjectCard } from "@/data/work";
import { IconGlyph } from "../IconGlyph/IconGlyph";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import styles from "./ProjectShowcaseSection.module.scss";

export function ProjectShowcaseSection({ projects }: { projects: ProjectCard[] }) {
  const splideRef = useRef<SplideInstance | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = (splide: SplideInstance) => {
    const lastIndex = Math.max(0, splide.length - Number(splide.options.perPage ?? 1));
    setCanScrollPrev(splide.index > 0);
    setCanScrollNext(splide.index < lastIndex);
  };

  return (
    <section className={`section ${styles["home-showcase"]}`} id="showcase">
      <div className="section__inner">
        <div className="container">
          <div className={styles["showcase__top"]}>
            <SectionHeader
              label="Projects"
              title="Showcase"
              eyebrow="Selected side projects with live links, build context, and the stack used to ship each one."
            />
            <div className={styles["showcase__controls"]} aria-label="Project slider controls">
              <button type="button" onClick={() => splideRef.current?.go("<")} disabled={!canScrollPrev} aria-label="Previous projects">
                <IconGlyph name="arrowLeft" />
              </button>
              <button type="button" onClick={() => splideRef.current?.go(">") } disabled={!canScrollNext} aria-label="Next projects">
                <IconGlyph name="arrowRight" />
              </button>
            </div>
          </div>
          <Splide
            className={styles["showcase__splide"]}
            options={{
              type: "slide",
              perPage: 3,
              perMove: 1,
              gap: "1rem",
              pagination: false,
              arrows: false,
              breakpoints: { 1080: { perPage: 2 }, 640: { perPage: 1 } },
            }}
            onMounted={(splide) => {
              splideRef.current = splide;
              updateScrollState(splide);
            }}
            onMoved={updateScrollState}
          >
              {projects.map((project) => {
                const isFreeTool = project.kind === "free-tool";

                return (
                  <SplideSlide key={project.title}>
                    <a
                      className={`${styles["showcase__card"]} ${isFreeTool ? styles["showcase__card--tool"] : ""}`}
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      title={`View ${project.title}`}
                    >
                    <span className={styles["showcase__media"]}>
                      <img src={project.image} alt={project.imageAlt} title={project.imageAlt} loading="lazy" />
                      {project.deliveryContext ? (
                        <span className={styles["showcase__company"]}>{project.deliveryContext}</span>
                      ) : null}
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
                  </SplideSlide>
                );
              })}
          </Splide>
          <div className={styles["showcase__footer"]}>
            <a className={styles["showcase__all-link"]} href="/projects" title="View all projects">
              <span>View all projects</span>
              <IconGlyph name="arrowRight" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
