import Link from "next/link";
import { IconGlyph } from "@/components/landing/IconGlyph";
import type { CaseStudyCard } from "@/data/work";
import styles from "./CaseStudiesListing.module.scss";

export function CaseStudyListingCard({ study, index }: { study: CaseStudyCard; index: number }) {
  return (
    <Link className={styles.card} href={study.href}>
      <span className={styles.card__topline}>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{study.tag.replace("_", " ")}</span>
      </span>
      <span className={styles.card__image}>
        <img src={study.image} alt={study.imageAlt} loading="lazy" />
      </span>
      <span className={styles.card__content}>
        <span className={styles.card__heading}>
          <strong>{study.title}</strong>
          <span className={styles.stack}>
            {study.stack.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </span>
        </span>
        <span className={styles.card__description}>{study.description}</span>
        <span className={styles.card__achievement}>{study.achievement}</span>
        <span className={styles.card__link}>
          View Full Case
          <IconGlyph name="arrowRight" />
        </span>
      </span>
    </Link>
  );
}
