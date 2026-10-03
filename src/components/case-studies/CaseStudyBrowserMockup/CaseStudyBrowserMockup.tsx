"use client";

import Image from "next/image";
import { getImageDimensions } from "@/lib/image-dimensions";
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
          <Image
            ref={imageRef}
            src={imageSrc}
            alt={label}
            sizes="(max-width: 900px) 100vw, 50vw"
            loading="lazy"
            {...getImageDimensions(imageSrc, { width: 1600, height: 9000 })}
          />
        </div>
      )}
    </div>
  );
}
