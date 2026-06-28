"use client";

import { useMemo, useState } from "react";
import type { PortfolioData } from "@/context/PortfolioContentContext";
import { IconGlyph } from "./IconGlyph";
import styles from "./ClientTestimonials.module.scss";

type Client = PortfolioData["clients"][number];

function hasTestimonial(client: Client) {
  return client.showInTestimonials && Boolean(client.testimonial);
}

export function ClientTestimonials({ clients }: { clients: Client[] }) {
  const testimonials = useMemo(() => clients.filter(hasTestimonial).slice(0, 12), [clients]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeClient = testimonials[activeIndex] ?? testimonials[0];

  if (!activeClient) {
    return null;
  }

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  return (
    <section className={styles["testimonials"]} id="proof" aria-labelledby="testimonials-heading">
      <div className={styles["testimonials__panel"]}>
        <div className={styles["testimonials__client-picker"]}>
          <div className={styles["testimonials__client-grid"]} aria-label="Select testimonial">
            {testimonials.map((client, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  className={`${styles["testimonials__client-button"]} ${isActive ? styles["testimonials__client-button--active"] : ""}`}
                  type="button"
                  key={client.name}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show testimonial from ${client.name}`}
                  aria-pressed={isActive}
                >
                  {client.avatar ? (
                    <img src={client.avatar} alt="" loading="lazy" />
                  ) : (
                    <span className={styles["testimonials__logo-fallback"]}>
                      <img src={client.logo} alt="" loading="lazy" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className={styles["testimonials__picker-copy"]}>
            <span className={styles["testimonials__picker-label"]}>Client reviews</span>
            <h2 className={styles["testimonials__picker-title"]} id="testimonials-heading">Clients trust the delivery</h2>
            <p className={styles["testimonials__picker-text"]}>
              Select a client to read the review. Logos without full testimonials stay in the trust bar above.
            </p>
          </div>

          <div className={styles["testimonials__picker-actions"]} aria-label="Testimonial slider controls">
            <button type="button" onClick={goToPrevious} aria-label="Previous testimonial">
              <IconGlyph name="arrowRight" />
            </button>
            <span className={styles["testimonials__picker-count"]}>
              {activeIndex + 1}/{testimonials.length}
            </span>
            <button type="button" onClick={goToNext} aria-label="Next testimonial">
              <IconGlyph name="arrowRight" />
            </button>
          </div>
        </div>

        <figure className={styles["testimonials__quote-card"]} key={activeClient.name}>
          <div className={styles["testimonials__quote-logo"]} aria-hidden="true">
            <img src={activeClient.logo} alt="" />
          </div>
          <blockquote className={styles["testimonials__quote"]}>
            <span className={styles["testimonials__quote-mark"]} aria-hidden="true">"</span>
            <p className={styles["testimonials__quote-text"]}>{activeClient.testimonial}</p>
          </blockquote>
          <figcaption className={styles["testimonials__author"]}>
            <span className={styles["testimonials__author-image"]}>
              {activeClient.avatar ? (
                <img src={activeClient.avatar} alt="" loading="lazy" />
              ) : (
                <img src={activeClient.logo} alt="" loading="lazy" />
              )}
            </span>
            <strong className={styles["testimonials__author-name"]}>{activeClient.name}</strong>
            <em className={styles["testimonials__author-role"]}>{activeClient.role}</em>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
