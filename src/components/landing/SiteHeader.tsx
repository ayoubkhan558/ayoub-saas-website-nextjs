"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import type { PortfolioData } from "@/context/PortfolioContentContext";
import { IconGlyph } from "./IconGlyph";
import styles from "./SiteHeader.module.scss";

export function SiteHeader({ portfolio }: { portfolio: PortfolioData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [floatingNavAllowed, setFloatingNavAllowed] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const profile = portfolio.profile;
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

  const handleContactPanelClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setContactOpen(false);
    }
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

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [contactOpen]);

  const primaryBottomLinks = [
    { label: "Home", href: "#top", sectionId: "top" },
    { label: "Services", href: "#services", sectionId: "services" },
    { label: "Projects", href: "#work", sectionId: "work" },
    { label: "Pricing", href: "#services", sectionId: "services" },
    { label: "About Me", href: "#about", sectionId: "about" },
    { label: "Testimonials", href: "#proof", sectionId: "proof" },
    { label: "FAQ'S", href: "#faqs", sectionId: "faqs" },
  ];
  const showFloatingNav = pathname === "/" && floatingNavAllowed;

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

  useEffect(() => {
    if (pathname !== "/") {
      setFloatingNavAllowed(false);
      return;
    }

    const header = headerRef.current;
    const footer = document.querySelector("footer");

    if (!header || !footer) {
      setFloatingNavAllowed(true);
      return;
    }

    let footerVisible = false;

    const updateFloatingNav = () => {
      setFloatingNavAllowed(window.scrollY > header.offsetHeight && !footerVisible);
    };

    const footerObserver = new IntersectionObserver(
      (entries) => {
        footerVisible = entries.some((entry) => entry.isIntersecting);
        updateFloatingNav();
      },
      { threshold: 0.01 },
    );

    footerObserver.observe(footer);
    updateFloatingNav();
    window.addEventListener("scroll", updateFloatingNav, { passive: true });
    window.addEventListener("resize", updateFloatingNav);

    return () => {
      footerObserver.disconnect();
      window.removeEventListener("scroll", updateFloatingNav);
      window.removeEventListener("resize", updateFloatingNav);
    };
  }, [pathname]);

  return (<>
    <header ref={headerRef} className={styles["site-header"]}>
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
            <Link
              key={link.href}
              className={styles["site-header__nav-link"]}
              href={link.href}
              onClick={link.label.toLowerCase() === "contact" ? handleContactTrigger : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles["site-header__nav-actions"]}>
          <button className={styles["site-header__nav-login"]} type="button" onClick={handleContactTrigger}>
            <IconGlyph name="mail" />
            Email
          </button>
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
          <Link
            className={styles["site-header__mobile-link"]}
            key={link.href}
            href={link.href}
            onClick={link.label.toLowerCase() === "contact" ? handleContactTrigger : () => setMenuOpen(false)}
          >
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
        onClick={handleContactPanelClick}
      >
        <button className={styles["contact-panel__backdrop"]} type="button" aria-label="Close contact panel" onClick={() => setContactOpen(false)} />
        <aside
          className={styles["contact-panel__drawer"]}
          aria-label="Contact Muhammad Ayoub"
          aria-modal="true"
          role="dialog"
          onClick={(event) => event.stopPropagation()}
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
              Let&apos;s build something <i>amazing</i> together
            </h2>
            <p>Full Stack Developer specializing in WordPress, React, Next.js and conversion-focused websites. Open to freelance, contracts and collaborations.</p>
          </div>

          <a className={styles["contact-panel__method"]} href={`mailto:${profile.email}`}>
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
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <IconGlyph name="linkedin" />
              </a>
              <a href={profile.website} target="_blank" rel="noreferrer" aria-label="Website">
                <IconGlyph name="globe" />
              </a>
              <a href={profile.upwork} target="_blank" rel="noreferrer" aria-label="Upwork">
                <IconGlyph name="externalLink" />
              </a>
              <a href="/contact" aria-label="Contact form">
                <IconGlyph name="mail" />
              </a>
            </div>
          </div>

          <Link className={styles["contact-panel__hire"]} href="/contact" onClick={() => setContactOpen(false)}>
            Hire Me
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
