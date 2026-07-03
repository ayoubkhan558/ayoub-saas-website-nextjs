"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { PortfolioData } from "@/context/PortfolioContentContext";
import { IconGlyph } from "../IconGlyph/IconGlyph";
import styles from "./ContactPanel.module.scss";

type ContactPanelProps = {
  profile: PortfolioData["profile"];
  open: boolean;
  onClose: () => void;
};

export function ContactPanel({ profile, open, onClose }: ContactPanelProps) {
  const drawerRef = useRef<HTMLElement | null>(null);
  const whatsappHref = `https://wa.me/${profile.phone.replace(/\D/g, "")}`;

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      const drawer = drawerRef.current;

      if (drawer && !drawer.contains(event.target as Node)) {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown, true);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown, true);
    };
  }, [open, onClose]);

  return (
    <div className={`${styles["contact-panel"]} ${open ? styles["contact-panel--open"] : ""}`} aria-hidden={!open}>
      <button
        className={styles["contact-panel__backdrop"]}
        type="button"
        aria-label="Close contact panel"
        onMouseDown={onClose}
        onClick={onClose}
      />
      <aside
        ref={drawerRef}
        className={styles["contact-panel__drawer"]}
        aria-label="Contact Muhammad Ayoub"
        aria-modal="true"
        role="dialog"
      >
        <div className={styles["contact-panel__top"]}>
          <span className={styles["contact-panel__mark"]}>
            <IconGlyph name="code2" />
          </span>
          <button className={styles["contact-panel__close"]} type="button" aria-label="Close contact panel" onClick={onClose}>
            <IconGlyph name="x" />
          </button>
        </div>

        <div className={styles["contact-panel__copy"]}>
          <h2>
            <span>Let&apos;s build something</span>
            <span>amazing together</span>
          </h2>
          <p>Full Stack Developer specializing in WordPress, React, Next.js and conversion-focused websites. Open to freelance, contracts and collaborations.</p>
        </div>

        <a className={styles["contact-panel__method"]} href={`mailto:${profile.email}`} title="Email Muhammad Ayoub">
          <IconGlyph name="mail" />
          <span>
            <small>Email me</small>
            <strong>{profile.email}</strong>
          </span>
          <IconGlyph name="arrowRight" />
        </a>

        <div className={styles["contact-panel__social"]} aria-label="Find me online">
          <span>Find me on</span>
          <div>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="Muhammad Ayoub on LinkedIn">
              <IconGlyph name="linkedin" />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" title="Muhammad Ayoub on GitHub">
              <IconGlyph name="github" />
            </a>
            <a href={whatsappHref} target="_blank" rel="noreferrer" aria-label="WhatsApp" title="Message Muhammad Ayoub on WhatsApp">
              <IconGlyph name="messageCircle" />
            </a>
          </div>
        </div>

        <Link className={`button ${styles["contact-panel__hire"]}`} href="/contact" onClick={onClose} title="Hire Muhammad Ayoub">
          Hire Me
          <IconGlyph name="arrowRight" />
        </Link>
      </aside>
    </div>
  );
}
