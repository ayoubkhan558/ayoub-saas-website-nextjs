"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconGlyph } from "../IconGlyph/IconGlyph";
import styles from "./StickyFloatingOffer.module.scss";

type StickyFloatingOfferProps = {
  offer: string;
  hidden?: boolean;
};

export function StickyFloatingOffer({ offer, hidden = false }: StickyFloatingOfferProps) {
  const [scrolledEnough, setScrolledEnough] = useState(false);
  const referralHref = `/contact?subject=${encodeURIComponent("Referral client intro")}&details=${encodeURIComponent(
    "I want to refer a client for a website or front-end project.\n\nClient name:\nClient email:\nProject type:\nCurrent website URL:\nWhat they need help with:\nTimeline:"
  )}`;

  useEffect(() => {
    const updateScrolledEnough = () => {
      setScrolledEnough(window.scrollY >= 300);
    };

    updateScrolledEnough();
    window.addEventListener("scroll", updateScrolledEnough, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrolledEnough);
    };
  }, []);

  const shouldHide = hidden || !scrolledEnough;

  return (
    <div
      className={`${styles["sticky__floating-offer"]} ${shouldHide ? styles["sticky__floating-offer--hidden"] : ""}`}
      aria-label="Portfolio updates"
    >
      <Link className={styles["sticky__floating-offer-link"]} href={referralHref} title="Refer a website development client">
        <span>{offer}</span>
        <IconGlyph name="arrowRight" />
      </Link>
    </div>
  );
}
