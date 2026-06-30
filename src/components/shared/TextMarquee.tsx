"use client";

import type { ReactNode } from "react";
import Marquee from "react-fast-marquee";

type TextMarqueeDirection = "left" | "right" | "up" | "down";

export function TextMarquee({
  children,
  className,
  direction = "left",
  speed = 16,
}: {
  children: ReactNode;
  className?: string;
  direction?: TextMarqueeDirection;
  speed?: number;
}) {
  return (
    <Marquee autoFill className={className} direction={direction} gradient={false} pauseOnHover speed={speed}>
      {children}
    </Marquee>
  );
}
