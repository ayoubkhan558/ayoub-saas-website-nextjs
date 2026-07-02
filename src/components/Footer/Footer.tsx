"use client";
import type { PortfolioData } from "@/context/PortfolioContentContext";
import { BrandLogo } from "@/components/layout/BrandLogo";
import styles from "./Footer.module.scss";

export function Footer({ portfolio }: { portfolio: PortfolioData }) {
  const profile = portfolio.profile;

  return (
    <footer className={`${styles["footer"]} section`}>
      <div className="section__inner">
        <div className={styles["footer__top-rule"]} aria-hidden="true" />
        <div className="container">
          <div className={styles["footer__inner"]}>
            <div className={styles["footer__masthead"]}>
              <div className={styles["footer__brand-block"]}>
                <a className={styles["footer__logo"]} href="/#top" title="MAYOUB.DEV home">
                  <BrandLogo />
                </a>
                <p className={styles["footer__summary"]}>{profile.summary}</p>
              </div>
              <div className={styles["footer__contact-card"]}>
                <span className={styles["footer__contact-label"]}>{profile.availability}</span>
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
                <a className={styles["footer__bottom-link"]} href="/terms-and-conditions" title="Read terms and conditions">
                  Terms and Conditions
                </a>
                <a className={styles["footer__bottom-link"]} href="/privacy-policy" title="Read privacy policy">
                  Privacy Policy
                </a>
              </nav>
              <span className={styles["footer__built-with"]}>
                Built with
                <span className={styles["footer__built-with-words"]} aria-hidden="true">
                  <span className={styles["footer__built-with-word"]}>care</span>
                  <span className={styles["footer__built-with-word"]}>taste</span>
                  <span className={styles["footer__built-with-word"]}>speed</span>
                  <span className={styles["footer__built-with-word"]}>code</span>
                  <span className={styles["footer__built-with-word"]}>focus</span>
                </span>
                from Pakistan.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
