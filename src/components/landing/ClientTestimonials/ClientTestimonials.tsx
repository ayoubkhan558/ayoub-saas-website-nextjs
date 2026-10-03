"use client";

import Image from "next/image";
import { getImageDimensions } from "@/lib/image-dimensions";
import { useMemo, useRef, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import type { Splide as SplideInstance } from "@splidejs/splide";
import type { PortfolioData } from "@/context/PortfolioContentContext";
import { IconGlyph } from "../IconGlyph/IconGlyph";
import styles from "./ClientTestimonials.module.scss";

type Client = PortfolioData["clients"][number];

function hasTestimonial(client: Client) {
  return client.showInTestimonials && Boolean(client.testimonial);
}

export function ClientTestimonials({ clients }: { clients: Client[] }) {
  const testimonials = useMemo(() => clients.filter(hasTestimonial).slice(0, 12), [clients]);
  const splideRef = useRef<SplideInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeClient = testimonials[activeIndex] ?? testimonials[0];

  if (!activeClient) {
    return null;
  }

  const goToIndex = (index: number) => {
    setActiveIndex(index);
    splideRef.current?.go(index);
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
                  onClick={() => goToIndex(index)}
                  aria-label={`Show testimonial from ${client.name}`}
                  aria-pressed={isActive}
                >
                  {client.avatar ? (
                    <Image src={client.avatar} alt={`${client.name} client testimonial avatar`} title={`${client.name} client testimonial avatar`} sizes="48px" loading="lazy" {...getImageDimensions(client.avatar, { width: 400, height: 400 })} />
                  ) : (
                    <span className={styles["testimonials__logo-fallback"]}>
                      <Image src={client.logoDark ?? client.logo} alt={`${client.name} logo`} title={`${client.name} logo`} sizes="72px" loading="lazy" {...getImageDimensions(client.logoDark ?? client.logo, { width: 300, height: 150 })} />
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
            <button type="button" onClick={() => splideRef.current?.go("<")} aria-label="Previous testimonial">
              <IconGlyph name="arrowRight" />
            </button>
            <span className={styles["testimonials__picker-count"]}>
              {activeIndex + 1}/{testimonials.length}
            </span>
            <button type="button" onClick={() => splideRef.current?.go(">")} aria-label="Next testimonial">
              <IconGlyph name="arrowRight" />
            </button>
          </div>
        </div>

        <Splide
          className={styles["testimonials__quote-slider"]}
          options={{ type: "slide", perPage: 1, pagination: false, arrows: false, rewind: true }}
          onMounted={(splide: SplideInstance) => { splideRef.current = splide; }}
          onMoved={(_splide: SplideInstance, newIndex: number) => setActiveIndex(newIndex)}
        >
          {testimonials.map((client) => (
            <SplideSlide key={client.name}>
              <figure className={styles["testimonials__quote-card"]}>
                <div className={styles["testimonials__quote-logo"]} aria-hidden="true">
                  <Image src={client.logo} alt="" title={`${client.name} logo`} sizes="72px" {...getImageDimensions(client.logo, { width: 300, height: 150 })} />
                </div>
                <blockquote className={styles["testimonials__quote"]}>
                  <span className={styles["testimonials__quote-mark"]} aria-hidden="true">&quot;</span>
                  <p className={styles["testimonials__quote-text"]}>{client.testimonial}</p>
                </blockquote>
                <figcaption className={styles["testimonials__author"]}>
                  <span className={styles["testimonials__author-image"]}>
                    {client.avatar ? (
                      <Image src={client.avatar} alt={`${client.name} client testimonial avatar`} title={`${client.name} client testimonial avatar`} sizes="48px" loading="lazy" {...getImageDimensions(client.avatar, { width: 400, height: 400 })} />
                    ) : (
                      <Image src={client.logoDark ?? client.logo} alt={`${client.name} logo`} title={`${client.name} logo`} sizes="72px" loading="lazy" {...getImageDimensions(client.logoDark ?? client.logo, { width: 300, height: 150 })} />
                    )}
                  </span>
                  <strong className={styles["testimonials__author-name"]}>{client.name}</strong>
                  <span className={styles["testimonials__author-role"]}>{client.role}</span>
                </figcaption>
              </figure>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
}
