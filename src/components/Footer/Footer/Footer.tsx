"use client";

import Link from "next/link";
import type { PortfolioData } from "@/context/PortfolioContentContext";
import { BrandLogo } from "@/components/layout/BrandLogo/BrandLogo";
import styles from "./Footer.module.scss";

export function Footer({ portfolio }: { portfolio: PortfolioData }) {
  const profile = portfolio.profile;
  const footerContent = {
    summary:
      "I build conversion-focused React, Next.js, and WordPress websites, then grow their search visibility with full-cycle SEO across technical, on-page, content, and off-page work.",
    availability: "Open for new projects",
    legal: {
      terms: "Terms and Conditions",
      privacy: "Privacy Policy",
    },
    builtWith: "Built with",
    fromLabel: "from Pakistan.",
  };

  return (
    <footer className={`${styles["footer"]} section`}>
      <div className="section__inner">
        <div className={styles["footer__top-rule"]} aria-hidden="true" />
        <div className="container">
          <div className={styles["footer__inner"]}>
            <div className={styles["footer__masthead"]}>
              <div className={styles["footer__brand-block"]}>
                <Link className={styles["footer__logo"]} href="/#top" title="MAYOUB.DEV home">
                  <BrandLogo />
                </Link>
                <p className={styles["footer__summary"]}>{footerContent.summary}</p>
              </div>
              <div className={styles["footer__contact-card"]}>
                <span className={styles["footer__contact-label"]}>{footerContent.availability}</span>
                <a className={styles["footer__contact-link"]} href={`mailto:${profile.email}`} title="Email Muhammad Ayoub">
                  {profile.email}
                </a>
                <a className={styles["footer__contact-link"]} href={`tel:${profile.phone.replace(/\s+/g, "")}`} title="Call Muhammad Ayoub">
                  {profile.phone}
                </a>
              </div>
            </div>

            <div className={styles["footer__bottom"]}>
              <nav className={styles["footer__legal"]} aria-label="Legal links">
                <Link className={styles["footer__bottom-link"]} href="/terms-and-conditions" title="Read terms and conditions">
                  {footerContent.legal.terms}
                </Link>
                <Link className={styles["footer__bottom-link"]} href="/privacy-policy" title="Read privacy policy">
                  {footerContent.legal.privacy}
                </Link>
              </nav>
              <span className={styles["footer__built-with"]}>
                {footerContent.builtWith}
                <span className={styles["footer__built-with-words"]} aria-hidden="true">
                  <span className={styles["footer__built-with-word"]}>care</span>
                  <span className={styles["footer__built-with-word"]}>taste</span>
                  <span className={styles["footer__built-with-word"]}>speed</span>
                  <span className={styles["footer__built-with-word"]}>code</span>
                  <span className={styles["footer__built-with-word"]}>focus</span>
                </span>
                {footerContent.fromLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
