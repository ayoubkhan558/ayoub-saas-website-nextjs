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
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const whatsappHref = `https://wa.me/${profile.phone.replace(/\D/g, "")}`;

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    previouslyFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const focusableSelector = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ].join(",");

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !drawerRef.current) {
        return;
      }

      const focusableElements = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.hasAttribute("disabled") && element.tabIndex !== -1);
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (!firstElement || !lastElement) {
        event.preventDefault();
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      const drawer = drawerRef.current;

      if (drawer && !drawer.contains(event.target as Node)) {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown, true);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown, true);
      previouslyFocusedRef.current?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      className={`${styles["contact-panel"]} ${open ? styles["contact-panel--open"] : ""}`}
      aria-hidden={!open}
      inert={!open}
    >
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
          <button ref={closeButtonRef} className={styles["contact-panel__close"]} type="button" aria-label="Close contact panel" onClick={onClose}>
            <IconGlyph name="x" />
          </button>
        </div>

        <div className={styles["contact-panel__copy"]}>
          <h2>
            <span>Let&apos;s build something</span>
            <span>amazing together</span>
          </h2>
          <p>Full Stack Developer and Technical SEO Expert specializing in WordPress, React, Next.js, and conversion-focused websites. Open to freelance, contracts, and collaborations.</p>
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
