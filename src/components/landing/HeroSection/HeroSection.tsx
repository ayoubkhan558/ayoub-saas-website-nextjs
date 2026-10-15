import Image from "next/image";
import { getImageDimensions } from "@/lib/image-dimensions";
import Link from "next/link";
import type { PortfolioData } from "@/context/PortfolioContentContext";
import { LogoMarquee } from "@/components/shared/LogoMarquee/LogoMarquee";
import { SocialProofStats } from "../SocialProofStats/SocialProofStats";
import { IconGlyph } from "../IconGlyph/IconGlyph";
import styles from "./HeroSection.module.scss";

const heroToolLogos = [
  { name: "Next.js", src: "/tools/nextjs.svg" },
  { name: "WordPress", src: "/tools/wordpress.svg" },
  { name: "WooCommerce", src: "/tools/woocommerce.svg" },
  { name: "Figma", src: "/tools/figma.svg" },
  { name: "JavaScript", src: "/tools/javascript.svg" },
  { name: "Tailwind", src: "/tools/tailwind.svg" },
  { name: "Sass", src: "/tools/sass.svg" },
  { name: "MySQL", src: "/tools/mysql.svg" },
];

export function HeroSection({ portfolio }: { portfolio: PortfolioData }) {
  const proofClients = portfolio.clients.filter((client) => client.showInClientImages && client.avatar).slice(0, 4);
  const proofClient = portfolio.clients.find((client) => "proofText" in client);
  const proofText = proofClient && "proofText" in proofClient ? proofClient.proofText : "";
  const heroTestimonial = portfolio.clients.find((client) => client.name === "Markedine") ?? portfolio.clients.find((client) => client.testimonial);
  const primaryExperience = portfolio.about.awards.find((award) => /experience|year/i.test(award.label));
  const projectsDelivered = portfolio.about.awards.find((award) => /project|deliver/i.test(award.label));

  const heroContent = {
    headline: "Web Developer + SEO Specialist for Sites That Rank & Convert",
    subheadline:
      "I build and improve React, Next.js, and WordPress websites, pairing solid development with technical SEO, on-page improvements, useful content, and off-page authority building.",
    primaryCta: "Book a discovery call",
    secondaryCta: "View case studies",
    profileName: "M. Ayoub",
    profileRole: "Web Developer & SEO Specialist",
    availability: "Open for projects",
    proofPrefix: "5.0 rating",
  };

  return (
    <section id="top" className={`${styles["hero"]} section section--hero`}>
      <div className={styles["hero__texture"]} aria-hidden="true" />
      <div className="section__inner">
        <div className={`container ${styles["hero__grid"]}`}>
          <div className={styles["hero__copy"]}>
            <h1 className={styles["hero__title"]}>
              <span className={styles["hero__title-line"]}>{heroContent.headline}</span>
            </h1>

            <p className={styles["hero__text"]}>
              {heroContent.subheadline}
            </p>

            <div className={styles["hero__actions"]}>
              <Link className="button" href="/contact" title="Start a website project with Muhammad Ayoub">
                {heroContent.primaryCta}
                <IconGlyph name="arrowRight" />
              </Link>
              <Link className="button button--ghost" href="/case-studies" title="View Muhammad Ayoub case studies">
                {heroContent.secondaryCta}
                <IconGlyph name="layers" />
              </Link>
            </div>

            <div className={styles["hero__proof-row"]}>
              <div className={styles["hero__client-proof"]} aria-label="Client reviews">
                <div className={styles["hero__client-photos"]} aria-hidden="true">
                  {proofClients.map((client) => (
                    <span className={styles["hero__client-photo"]} key={client.name}>
                      {client.avatar ? <Image className={styles["hero__client-photo-img"]} src={client.avatar} alt={`${client.name} client avatar`} title={`${client.name} client avatar`} sizes="34px" loading="lazy" {...getImageDimensions(client.avatar, { width: 400, height: 400 })} /> : client.initials}
                    </span>
                  ))}
                </div>
                <div className={styles["hero__client-copy"]}>
                  <span className={styles["hero__client-stars"]}>{heroContent.proofPrefix}</span>
                  <strong className={styles["hero__client-text"]}>{proofText}</strong>
                </div>
              </div>
            </div>
          </div>

          <aside className={styles["hero__profile-panel"]} aria-label="Muhammad Ayoub profile and testimonial">
            <div className={styles["hero__identity"]} aria-label="Muhammad Ayoub profile">
              <div className={styles["hero__identity-head"]}>
                <span className={styles["hero__portrait"]}>
                  <Image className={styles["hero__portrait-img"]} src="/ayoub-about-v2.jpg" alt="Muhammad Ayoub Khan web developer and SEO specialist" title="Muhammad Ayoub Khan web developer and SEO specialist" sizes="(max-width: 760px) 42vw, 280px" priority {...getImageDimensions("/ayoub-about-v2.jpg")} />
                  <span className={styles["hero__portrait-status"]} aria-hidden="true" />
                </span>
                <div className={styles["hero__identity-copy"]}>
                  <strong className={styles["hero__identity-name"]}>{heroContent.profileName}</strong>
                  <span className={styles["hero__identity-role"]}>{heroContent.profileRole}</span>

                  <div className={styles["hero__badges"]} aria-label="Availability and trust badges">
                    <span className={`badge ${styles["hero__badge"]}`}>
                      <IconGlyph name="star" className={styles["hero__badge-icon"]} />
                      Top Rated on Upwork
                    </span>
                  </div>
                  <span className={styles["hero__identity-availability"]}>
                    <span className={styles["hero__identity-availability-dot"]} aria-hidden="true" />
                    {heroContent.availability}
                  </span>
                </div>
              </div>

            </div>
            {/* <div className={styles["hero__tool-marquee"]} aria-label="Tools and platforms">
              <span className={styles["hero__tool-marquee-label"]}>Stack I ship with</span>
              <LogoMarquee
                ariaLabel="Tools and platforms"
                className={styles["hero__tool-marquee-track"]}
                imageClassName={styles["hero__tool-logo-image"]}
                itemClassName={styles["hero__tool-logo"]}
                items={heroToolLogos}
                speed={14}
              />
            </div> */}
            <SocialProofStats awards={portfolio?.about.awards} className={styles["hero__stats"]} />
          </aside>
        </div>
      </div>
    </section>
  );
}
