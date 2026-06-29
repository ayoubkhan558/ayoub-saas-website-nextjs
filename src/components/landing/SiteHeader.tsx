"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { PortfolioData } from "@/context/PortfolioContentContext";
import { IconGlyph } from "./IconGlyph";
import styles from "./SiteHeader.module.scss";

export function SiteHeader({ portfolio }: { portfolio: PortfolioData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const pathname = usePathname();
  const profile = portfolio.profile;
  const referralHref = `/contact?subject=${encodeURIComponent("Referral client intro")}&details=${encodeURIComponent(
    "I want to refer a client for a website or front-end project.\n\nClient name:\nClient email:\nProject type:\nCurrent website URL:\nWhat they need help with:\nTimeline:"
  )}`;

  const openContactPanel = () => {
    setMenuOpen(false);
    setContactOpen(true);
  };

  const primaryBottomLinks = [
    { label: "Home", href: "#top", sectionId: "top" },
    { label: "Services", href: "#services", sectionId: "services" },
    { label: "Projects", href: "#work", sectionId: "work" },
    { label: "Pricing", href: "#services", sectionId: "services" },
    { label: "About Me", href: "#about", sectionId: "about" },
    { label: "Testimonials", href: "#proof", sectionId: "proof" },
    { label: "FAQ'S", href: "#faqs", sectionId: "faqs" },
  ];
  const showFloatingNav = pathname === "/";

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const visibleSections = new Set<string>();
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.add(entry.target.id);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        const orderedSections = ["faqs", "proof", "about", "work", "services", "top"];
        const current = orderedSections.find((sectionId) => visibleSections.has(sectionId));
        if (current) {
          setActiveSection(current);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: 0.01 },
    );

    primaryBottomLinks.forEach((link) => {
      const section = document.getElementById(link.sectionId);
      if (section) {
        sectionObserver.observe(section);
      }
    });

    return () => {
      sectionObserver.disconnect();
    };
  }, [pathname]);

  return (<>
    <header className={styles["site-header"]}>
      <div className={styles["site-header__announcement"]} aria-label="Portfolio updates">
        <div className={`${styles["site-header__announcement-inner"]} container`}>
          <div className={styles["site-header__announcement-track"]}>
            <Link className={styles["site-header__announcement-item"]} href={referralHref}>
              {portfolio.topbar.offer}
            </Link>
          </div>
        </div>
      </div>

      <div className={`${styles["site-header__nav"]} container`}>
        <Link className={styles["site-header__nav-brand"]} href="/#top" aria-label={`${profile.brand} home`}>
          <Image src="/mayoub-dev-logo.svg" alt="mayoub.dev" width={640} height={160} priority />
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
          <button className={`button button--small ${styles["site-header__nav-button"]}`} type="button" onClick={openContactPanel}>
            Get started
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
        {portfolio.navLinks.map((link) => (
          <Link className={styles["site-header__mobile-link"]} key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </Link>
        ))}
        <button className={styles["site-header__mobile-link"]} type="button" onClick={openContactPanel}>
          Hire Ayoub
          <IconGlyph name="arrowRight" />
        </button>
      </div>

      <div
        className={`${styles["contact-panel"]} ${contactOpen ? styles["contact-panel--open"] : ""}`}
        aria-hidden={!contactOpen}
      >
        <button className={styles["contact-panel__backdrop"]} type="button" aria-label="Close contact panel" onClick={() => setContactOpen(false)} />
        <aside className={styles["contact-panel__drawer"]} aria-label="Contact Muhammad Ayoub" aria-modal="true" role="dialog">
          <div className={styles["contact-panel__top"]}>
            <span className={styles["contact-panel__mark"]}>
              <IconGlyph name="code2" />
            </span>
            <button className={styles["contact-panel__close"]} type="button" aria-label="Close contact panel" onClick={() => setContactOpen(false)}>
              <IconGlyph name="x" />
            </button>
          </div>

          <div className={styles["contact-panel__copy"]}>
            <span className={styles["contact-panel__eyebrow"]}>Work together</span>
            <h2>
              Let&apos;s build a website that <i>brings more leads.</i>
            </h2>
            <p>{profile.summary}</p>
          </div>

          <div className={styles["contact-panel__methods"]}>
            <a className={styles["contact-panel__method"]} href={`mailto:${profile.email}`}>
              <IconGlyph name="mail" />
              <span>
                <small>Email me</small>
                <strong>{profile.email}</strong>
              </span>
              <IconGlyph name="arrowRight" />
            </a>
            <a className={styles["contact-panel__method"]} href={`tel:${profile.phone.replace(/\s+/g, "")}`}>
              <IconGlyph name="phone" />
              <span>
                <small>Call / WhatsApp</small>
                <strong>{profile.phone}</strong>
              </span>
              <IconGlyph name="arrowRight" />
            </a>
          </div>

          <div className={styles["contact-panel__social"]} aria-label="Find me online">
            <span>Find me on</span>
            <div>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <IconGlyph name="linkedin" />
              </a>
              <a href={profile.website} target="_blank" rel="noreferrer" aria-label="Website">
                <IconGlyph name="globe" />
              </a>
              <a href={profile.upwork} target="_blank" rel="noreferrer" aria-label="Upwork">
                <IconGlyph name="externalLink" />
              </a>
            </div>
          </div>

          <Link className={`button button--dark ${styles["contact-panel__hire"]}`} href="/contact" onClick={() => setContactOpen(false)}>
            Hire me
            <IconGlyph name="arrowRight" />
          </Link>
        </aside>
      </div>
    </header>

    <nav
      className={`${styles["site-header__floating-nav"]} ${showFloatingNav ? styles["site-header__floating-nav--visible"] : ""
        }`}
      aria-label="Quick navigation"
    >
      {primaryBottomLinks.map((link) => (
        <Link
          className={`${styles["site-header__floating-link"]} ${activeSection === link.sectionId ? styles["site-header__floating-link--active"] : ""
            }`}
          href={link.href}
          key={link.href}
        >
          {link.label}
        </Link>
      ))}
      <button className={styles["site-header__floating-cta"]} type="button" onClick={openContactPanel}>
        Contact
        <IconGlyph name="arrowRight" />
      </button>
    </nav>
  </>
  );
}
