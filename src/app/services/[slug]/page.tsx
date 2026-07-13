import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactFooter } from "@/components/landing/ContactFooter/ContactFooter";
import { SiteHeader } from "@/components/landing/SiteHeader/SiteHeader";
import { getServiceNiche, serviceNiches } from "@/data/serviceNiches";
import portfolio from "@/data/portfolio.json";
import styles from "@/components/legal/LegalPage/LegalPage.module.scss";

export function generateStaticParams() {
  return serviceNiches.map((niche) => ({ slug: niche.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const niche = getServiceNiche(slug);
  if (!niche) return { title: "Service" };

  return {
    title: niche.title,
    description: niche.description,
    alternates: { canonical: `/services/${niche.slug}` },
    openGraph: {
      title: niche.title,
      description: niche.description,
      type: "website",
      url: `/services/${niche.slug}`,
      images: [
        {
          url: "/ayoub-about-v2.jpg",
          width: 1200,
          height: 630,
          alt: niche.title,
        },
      ],
    },
  };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function ServiceNichePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const niche = getServiceNiche(slug);
  if (!niche) notFound();

  return (
    <div className="site-shell">
      <SiteHeader portfolio={portfolio} />
      <main>
        <section className={`section ${styles["legal-hero"]}`}>
          <div className="section__inner">
            <div className={`container ${styles["legal-hero__inner"]}`}>
              <div className={styles["legal-hero__copy"]}>
                <span className={styles["legal-page__eyebrow"]}>{niche.label}</span>
                <h1>{niche.h1}</h1>
                <p>{niche.description}</p>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <Link className="button" href="/contact" title={`Hire for ${niche.title}`}>
                    Start a project
                  </Link>
                  <Link className="button button--ghost" href="/services" title="All website development services">
                    All services
                  </Link>
                </div>
              </div>
              <div className={styles["legal-summary-grid"]} aria-label={`${niche.title} summary`}>
                {niche.highlights.map((item) => (
                  <div className={styles["legal-summary-card"]} key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section__inner">
            <div className={`container ${styles["legal-layout"]}`}>
              <aside className={styles["legal-toc"]} aria-label={`${niche.title} sections`}>
                <span className={styles["legal-page__eyebrow"]}>On this page</span>
                <nav>
                  {niche.sections.map((section) => (
                    <a href={`#${slugify(section.title)}`} key={section.title} title={`Jump to ${section.title}`}>
                      {section.title}
                    </a>
                  ))}
                  <a href="#related-work" title="Jump to related work">
                    Related work
                  </a>
                </nav>
              </aside>

              <div className={styles["legal-content"]}>
                {niche.sections.map((section) => (
                  <article id={slugify(section.title)} key={section.title}>
                    <h2>{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.bullets ? (
                      <ul>
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                ))}

                <article id="related-work">
                  <h2>Related work</h2>
                  <ul>
                    {niche.relatedCases.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} title={item.label}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p>
                    <Link href="/contact" title="Contact Muhammad Ayoub">
                      Contact me
                    </Link>{" "}
                    with your Figma, current site, or brief.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ContactFooter portfolio={portfolio} />
    </div>
  );
}
