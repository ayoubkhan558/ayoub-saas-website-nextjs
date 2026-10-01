import { IconGlyph } from "@/components/landing/IconGlyph/IconGlyph";
import type { PortfolioData } from "@/context/PortfolioContentContext";
import styles from "./ContactInfoCard.module.scss";

export function ContactInfoCard({ profile }: { profile: PortfolioData["profile"] }) {
  return (
    <div className={styles["contact-card"]}>
      <div className={styles["contact-card__header"]}>
        <span className={styles["contact-page__eyebrow"]}>Direct contact</span>
        <h2>Fastest way to reach me.</h2>
        <p className={styles["contact-card__intro"]}>
          Every project starts with understanding your goals. <br />
          Send your project details, website URL (if applicable), timeline, and the results you want to achieve.
          <br />
          I&apos;ll review everything personally and provide honest feedback, suggested solutions, and a clear roadmap for getting started.
        </p>
        <div className={styles["contact-card__meta"]}>
          <span>Reply within 24 hours</span>
          <span>{profile.location}</span>
        </div>
      </div>
      <div className={styles["contact-methods"]}>
        <a className={styles["contact-method"]} href={`mailto:${profile.email}`} title="Email Muhammad Ayoub">
          <span className={styles["contact-method__label"]}>Email</span>
          <strong>{profile.email}</strong>
          <IconGlyph name="arrowRight" />
        </a>
        <a
          className={styles["contact-method"]}
          href={`tel:${profile.phone.replace(/\s+/g, "")}`}
          title="Call Muhammad Ayoub"
        >
          <span className={styles["contact-method__label"]}>Phone / Whatsapp</span>
          <strong>{profile.phone}</strong>
          <IconGlyph name="phone" />
        </a>
        <a
          className={styles["contact-method"]}
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          title="Visit Muhammad Ayoub LinkedIn profile"
        >
          <span className={styles["contact-method__label"]}>Profile</span>
          <strong>LinkedIn</strong>
          <IconGlyph name="externalLink" />
        </a>
      </div>
      <dl className={styles["contact-details"]}>
        <div>
          <dt>Location</dt>
          <dd>{profile.location}</dd>
        </div>
        <div>
          <dt>Time zone</dt>
          <dd>Pakistan Standard Time</dd>
        </div>
        <div>
          <dt>Availability</dt>
          <dd>{profile.availability}</dd>
        </div>
        <div>
          <dt>Typical reply</dt>
          <dd>Within 24 hours</dd>
        </div>
      </dl>
    </div>
  );
}