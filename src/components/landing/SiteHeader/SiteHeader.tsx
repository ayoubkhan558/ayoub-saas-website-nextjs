"use client";

import Link from "next/link";
import { type MouseEvent, useEffect, useState } from "react";
import type { PortfolioData } from "@/context/PortfolioContentContext";
import { IconGlyph } from "../IconGlyph/IconGlyph";
import { BrandLogo } from "@/components/layout/BrandLogo/BrandLogo";
import { ContactPanel } from "../ContactPanel/ContactPanel";
import { StickyFloatingOffer } from "../StickyFloatingOffer/StickyFloatingOffer";
import styles from "./SiteHeader.module.scss";

export function SiteHeader({ portfolio }: { portfolio: PortfolioData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const profile = portfolio.profile;

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

  const navLinks = portfolio.navLinks;

  return (<>
    <header className={styles["site-header"]}>
      <div className={`${styles["site-header__nav"]} container`}>
        <Link className={styles["site-header__nav-brand"]} href="/" aria-label={`${profile.brand} home`} title="mayoub.dev home">
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

    <ContactPanel profile={profile} open={contactOpen} onClose={() => setContactOpen(false)} />
    <StickyFloatingOffer offer={portfolio.offer} hidden={contactOpen} />
  </>
  );
}
