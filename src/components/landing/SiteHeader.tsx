"use client";

import Link from "next/link";
import { useState } from "react";
import type { PortfolioData } from "@/context/PortfolioContentContext";
import { IconGlyph } from "./IconGlyph";
import styles from "./SiteHeader.module.scss";

export function SiteHeader({ portfolio }: { portfolio: PortfolioData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const profile = portfolio.profile;

  return (
    <header className={styles["site-header"]}>
      <div className={styles["site-header__announcement"]} aria-label="Portfolio updates">
        <div className={`${styles["site-header__announcement-inner"]} container`}>
          <div className={styles["site-header__announcement-track"]}>
            <span className={styles["site-header__announcement-item"]}>{portfolio.topbar.offer}</span>
            <span className={styles["site-header__announcement-item"]}>{profile.availability}</span>
          </div>
        </div>
      </div>

      <div className={`${styles["site-header__nav"]} container`}>
        <Link className={styles["site-header__nav-brand"]} href="/#top" aria-label={`${profile.brand} home`}>
          {profile.brand}
        </Link>

        <nav className={styles["site-header__nav-links"]} aria-label="Primary navigation">
          {portfolio.navLinks.map((link) => (
            <Link key={link.href} className={styles["site-header__nav-link"]} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles["site-header__nav-actions"]}>
          <a className={styles["site-header__nav-login"]} href={`mailto:${profile.email}`}>
            <IconGlyph name="mail" />
            Email
          </a>
          <Link className={`button button--small ${styles["site-header__nav-button"]}`} href="/contact">
            Get started
            <IconGlyph name="arrowRight" />
          </Link>
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
        {portfolio.navLinks.map((link) => (
          <Link className={styles["site-header__mobile-link"]} key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </Link>
        ))}
        <Link className={styles["site-header__mobile-link"]} href="/contact" onClick={() => setMenuOpen(false)}>
          Hire Ayoub
          <IconGlyph name="arrowRight" />
        </Link>
      </div>
    </header>
  );
}
