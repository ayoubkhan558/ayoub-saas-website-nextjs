"use client";

import Marquee from "react-fast-marquee";
import styles from "./LogoMarquee.module.scss";

type LogoMarqueeDirection = "left" | "right" | "up" | "down";

export type LogoMarqueeItem = {
  name: string;
  src: string;
};

export function LogoMarquee({
  items,
  direction = "left",
  speed = 18,
  className,
  itemClassName,
  imageClassName,
  ariaLabel,
}: {
  items: LogoMarqueeItem[];
  direction?: LogoMarqueeDirection;
  speed?: number;
  className?: string;
  itemClassName?: string;
  imageClassName?: string;
  ariaLabel?: string;
}) {
  if (!items.length) {
    return null;
  }

  const marqueeClassName = [styles["logo-marquee"], className].filter(Boolean).join(" ");
  const itemClasses = [styles["logo-marquee__item"], itemClassName].filter(Boolean).join(" ");
  const imageClasses = [styles["logo-marquee__image"], imageClassName].filter(Boolean).join(" ");

  return (
    <div className={marqueeClassName} aria-label={ariaLabel}>
      <Marquee autoFill direction={direction} gradient={false} pauseOnHover speed={speed}>
        {items.map((item) => (
          <span className={itemClasses} key={item.name}>
            <img className={imageClasses} src={item.src} alt={item.name} loading="lazy" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
