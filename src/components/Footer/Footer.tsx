"use client";
import type { PortfolioData } from "@/context/PortfolioContentContext";
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
                <a className={styles["footer__logo"]} href="/#top">
                  {profile.brand}
                </a>
                <p className={styles["footer__summary"]}>{profile.summary}</p>
              </div>
              <div className={styles["footer__contact-card"]}>
                <span className={styles["footer__contact-label"]}>{profile.availability}</span>
                <a className={styles["footer__contact-link"]} href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
                <a className={styles["footer__contact-link"]} href={`tel:${profile.phone.replace(/\s+/g, "")}`}>
                  {profile.phone}
                </a>
              </div>
            </div>

            <div className={styles["footer__bottom"]}>
              <nav className={styles["footer__legal"]} aria-label="Legal links">
                <a className={styles["footer__bottom-link"]} href="/terms-and-conditions">
                  Terms and Conditions
                </a>
                <a className={styles["footer__bottom-link"]} href="/privacy-policy">
                  Privacy Policy
                </a>
              </nav>
              <span className={styles["footer__built-with"]}>
                Built with
                <span className={styles["footer__built-with-words"]} aria-hidden="true">
                  <i className={styles["footer__built-with-word"]}>care</i>
                  <i className={styles["footer__built-with-word"]}>taste</i>
                  <i className={styles["footer__built-with-word"]}>speed</i>
                  <i className={styles["footer__built-with-word"]}>code</i>
                  <i className={styles["footer__built-with-word"]}>focus</i>
                </span>
                from Pakistan.
              </span>
              <a className={styles["footer__bottom-link"]} href={profile.website} target="_blank" rel="noreferrer">
                {profile.website.replace(/^https?:\/\//, "")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
