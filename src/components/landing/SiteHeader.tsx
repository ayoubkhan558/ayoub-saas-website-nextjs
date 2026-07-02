"use client";

import Link from "next/link";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import type { PortfolioData } from "@/context/PortfolioContentContext";
import { IconGlyph } from "./IconGlyph";
import { BrandLogo } from "@/components/layout/BrandLogo";
import styles from "./SiteHeader.module.scss";

export function SiteHeader({ portfolio }: { portfolio: PortfolioData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const headerRef = useRef<HTMLElement | null>(null);
  const contactDrawerRef = useRef<HTMLElement | null>(null);
  const profile = portfolio.profile;
  const whatsappHref = `https://wa.me/${profile.phone.replace(/\D/g, "")}`;
  const referralHref = `/contact?subject=${encodeURIComponent("Referral client intro")}&details=${encodeURIComponent(
    "I want to refer a client for a website or front-end project.\n\nClient name:\nClient email:\nProject type:\nCurrent website URL:\nWhat they need help with:\nTimeline:"
  )}`;

  const openContactPanel = () => {
    setMenuOpen(false);
    setContactOpen(true);
  };

  const handleContactTrigger = (event?: MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    openContactPanel();
  };

  useEffect(() => {
    const activeTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    setTheme(activeTheme);
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.dataset.theme = nextTheme;
      document.documentElement.style.colorScheme = nextTheme;
      localStorage.setItem("theme", nextTheme);

      return nextTheme;
    });
  };

  useEffect(() => {
    if (!contactOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setContactOpen(false);
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      const drawer = contactDrawerRef.current;

      if (drawer && !drawer.contains(event.target as Node)) {
        setContactOpen(false);
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
  }, [contactOpen]);

  const navLinks = portfolio.navLinks;

  return (<>
    <header ref={headerRef} className={styles["site-header"]}>
      <div className={`${styles["site-header__nav"]} container`}>
        <Link className={styles["site-header__nav-brand"]} href="/" aria-label={`${profile.brand} home`} title="MAYOUB.DEV home">
          <BrandLogo />
        </Link>

        <nav className={styles["site-header__nav-links"]} aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              className={styles["site-header__nav-link"]}
              href={link.href}
              title={`Go to ${link.label}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles["site-header__nav-actions"]}>
          <button
            className={styles["site-header__theme-toggle"]}
            type="button"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            aria-pressed={theme === "dark"}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            onClick={toggleTheme}
          >
            <IconGlyph name={theme === "dark" ? "sun" : "moon"} />
          </button>
          <button className={styles["site-header__nav-login"]} type="button" onClick={handleContactTrigger}>
            <IconGlyph name="mail" />
            Email
          </button>
          <button className={`button button--small ${styles["site-header__nav-button"]}`} type="button" onClick={openContactPanel}>
            Book a call
            <IconGlyph name="arrowRight" />
          </button>
          <button
            className={styles["site-header__nav-toggle"]}
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <IconGlyph name={menuOpen ? "x" : "menu"} />
          </button>
        </div>
      </div>

      <div id="mobile-nav" className={`${styles["site-header__mobile-nav"]} ${menuOpen ? styles["site-header__mobile-nav--open"] : ""}`}>
        {navLinks.map((link) => (
          <Link
            className={styles["site-header__mobile-link"]}
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            title={`Go to ${link.label}`}
          >
            {link.label}
          </Link>
        ))}
        <button className={styles["site-header__mobile-link"]} type="button" onClick={openContactPanel}>
          Hire Ayoub
          <IconGlyph name="arrowRight" />
        </button>
      </div>
    </header>

    <div
      className={`${styles["contact-panel"]} ${contactOpen ? styles["contact-panel--open"] : ""}`}
      aria-hidden={!contactOpen}
    >
        <button
          className={styles["contact-panel__backdrop"]}
          type="button"
          aria-label="Close contact panel"
          onMouseDown={() => setContactOpen(false)}
          onClick={() => setContactOpen(false)}
        />
        <aside
          ref={contactDrawerRef}
          className={styles["contact-panel__drawer"]}
          aria-label="Contact Muhammad Ayoub"
          aria-modal="true"
          role="dialog"
        >
          <div className={styles["contact-panel__top"]}>
            <span className={styles["contact-panel__mark"]}>
              <IconGlyph name="code2" />
            </span>
            <button className={styles["contact-panel__close"]} type="button" aria-label="Close contact panel" onClick={() => setContactOpen(false)}>
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

          <Link className={`button ${styles["contact-panel__hire"]}`} href="/contact" onClick={() => setContactOpen(false)} title="Hire Muhammad Ayoub">
            Hire Me
            <IconGlyph name="arrowRight" />
          </Link>
        </aside>
    </div>

    <div
      className={`${styles["site-header__floating-offer"]} ${contactOpen ? styles["site-header__floating-offer--hidden"] : ""}`}
      aria-label="Portfolio updates"
    >
      <Link className={styles["site-header__floating-offer-link"]} href={referralHref} title="Refer a website development client">
        <span>{portfolio.topbar.offer}</span>
        <IconGlyph name="arrowRight" />
      </Link>
    </div>
  </>
  );
}
