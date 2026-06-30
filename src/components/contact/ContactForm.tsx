"use client";

import { useForm, ValidationError } from "@formspree/react";
import { useSearchParams } from "next/navigation";
import { IconGlyph } from "@/components/landing/IconGlyph";
import styles from "./ContactPage.module.scss";

const projectTypes = [
  "React / Next.js build",
  "WordPress or WooCommerce",
  "Landing page or funnel",
  "Existing site cleanup",
];

export function ContactForm() {
  const [state, handleSubmit] = useForm("mgojyyqd");
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject") ?? "";
  const details = searchParams.get("details") ?? "";

  if (state.succeeded) {
    return (
      <div className={`${styles["contact-form-card"]} ${styles["contact-form-card--success"]}`} role="status">
        <div className={styles["contact-form-card__header"]}>
          <span className={styles["contact-page__eyebrow"]}>Project brief sent</span>
          <h2>Thanks. I&apos;ll review it.</h2>
        </div>
        <p>
          Your details are in my inbox. I&apos;ll reply with the next practical step after reviewing the scope,
          timeline, and build requirements.
        </p>
      </div>
    );
  }

  return (
    <form className={styles["contact-form-card"]} onSubmit={handleSubmit}>
      <div className={styles["contact-form-card__header"]}>
        <span className={styles["contact-page__eyebrow"]}>Project brief</span>
        <h2>What to send.</h2>
        <p>Give me enough context to price the next step without a long discovery call.</p>
        <div className={styles["contact-form-card__meta"]}>
          <span>Goal</span>
          <span>Timeline</span>
          <span>Budget range</span>
        </div>
      </div>

      <div className={styles["contact-form-card__row"]}>
        <label>
          <span>Name</span>
          <input name="name" autoComplete="name" placeholder="Your name" required />
          <ValidationError className={styles["contact-form-card__error"]} prefix="Name" field="name" errors={state.errors} />
        </label>

        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
          <ValidationError className={styles["contact-form-card__error"]} prefix="Email" field="email" errors={state.errors} />
        </label>
      </div>

      <label>
        <span>Subject</span>
        <input name="_subject" placeholder="Website build estimate" defaultValue={subject} required />
        <ValidationError className={styles["contact-form-card__error"]} prefix="Subject" field="_subject" errors={state.errors} />
      </label>

      <label htmlFor="projectType">
        <span>Project type</span>
        <select id="projectType" name="projectType" defaultValue="" required>
          <option value="" disabled>
            Choose one
          </option>
          {projectTypes.map((type) => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
        </select>
        <ValidationError
          className={styles["contact-form-card__error"]}
          prefix="Project type"
          field="projectType"
          errors={state.errors}
        />
      </label>

      <label>
        <span>Project details</span>
        <textarea
          name="message"
          rows={6}
          placeholder="Current URL, goal, timeline, stack, pages, integrations, or what is broken."
          defaultValue={details}
          required
        />
        <ValidationError className={styles["contact-form-card__error"]} prefix="Message" field="message" errors={state.errors} />
      </label>

      <ValidationError className={styles["contact-form-card__error"]} errors={state.errors} />

      <button className="button button--dark" type="submit" disabled={state.submitting}>
        {state.submitting ? "Sending..." : "Send project brief"}
        <IconGlyph name="arrowRight" />
      </button>
    </form>
  );
}
