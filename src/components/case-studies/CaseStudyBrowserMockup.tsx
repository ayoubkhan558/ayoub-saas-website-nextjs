"use client";

import { useRef } from "react";
import styles from "./CaseStudyBrowserMockup.module.scss";

export function CaseStudyBrowserMockup({
  label,
  compact = false,
  imageSrc,
  scrollOnHover = false,
}: {
  label: string;
  compact?: boolean;
  imageSrc?: string;
  scrollOnHover?: boolean;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleEnter = () => {
    if (!wrapperRef.current || !imageRef.current) return;

    const containerHeight = wrapperRef.current.clientHeight;
    const imageHeight = imageRef.current.clientHeight;
    const distance = Math.max(imageHeight - containerHeight, 0);

    imageRef.current.style.transform = `translateY(-${distance}px)`;
  };

  const handleLeave = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = "translateY(0)";
    }
  };

  return (
    <div
      className={`${styles.screen} ${
        compact ? styles["screen-compact"] : ""
      } ${scrollOnHover ? styles["screen-scroll-on-hover"] : ""}`}
    >
      <div className={styles["browser-top"]}>
        <div className={styles["browser-dots"]}>
          <span />
          <span />
          <span />
        </div>

        <div className={styles["browser-url"]}>{label}</div>
      </div>

      {imageSrc && (
        <div
          ref={wrapperRef}
          className={styles["real-preview"]}
          onMouseEnter={scrollOnHover ? handleEnter : undefined}
          onMouseLeave={scrollOnHover ? handleLeave : undefined}
        >
          <img
            ref={imageRef}
            src={imageSrc}
            alt={label}
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}