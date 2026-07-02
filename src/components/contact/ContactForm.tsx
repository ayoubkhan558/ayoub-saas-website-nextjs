"use client";

import { useForm, ValidationError } from "@formspree/react";
import { useSearchParams } from "next/navigation";
import { IconGlyph } from "@/components/landing/IconGlyph";
import styles from "./ContactPage.module.scss";

const projectTypes = [
  "Business website redesign",
  "WordPress / Bricks Builder build",
  "WooCommerce store improvement",
  "React / Next.js front end",
  "Landing page or funnel",
  "Existing site speed or cleanup",
];

const budgetRanges = ["Under $1,000", "$1,000 - $3,000", "$3,000 - $7,500", "$7,500+", "Not sure yet"];
const timelines = ["ASAP", "2-4 weeks", "1-2 months", "Flexible / planning ahead"];
const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "mgojyyqd";

export function ContactForm() {
  const [state, handleSubmit] = useForm(formspreeId);
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
        {/* <div className={styles["contact-form-card__meta"]}>
          <span>Goal</span>
          <span>Timeline</span>
          <span>Budget range</span>
        </div> */}
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


      <div className={styles["contact-form-card__row"]}>
        <label htmlFor="budgetRange">
          <span>Budget range</span>
          <select id="budgetRange" name="budgetRange" defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            {budgetRanges.map((range) => (
              <option value={range} key={range}>
                {range}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="timeline">
          <span>Timeline</span>
          <select id="timeline" name="timeline" defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            {timelines.map((timeline) => (
              <option value={timeline} key={timeline}>
                {timeline}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        <span>Existing website URL</span>
        <input name="websiteUrl" type="url" placeholder="https://example.com" />
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

      <button className="button" type="submit" disabled={state.submitting}>
        {state.submitting ? "Sending..." : "Send project brief"}
        <IconGlyph name="arrowRight" />
      </button>
    </form>
  );
}
