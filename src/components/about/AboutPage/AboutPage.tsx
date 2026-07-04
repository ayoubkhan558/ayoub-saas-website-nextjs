import { ContactFooter } from "@/components/landing/ContactFooter/ContactFooter";
import { SiteHeader } from "@/components/landing/SiteHeader/SiteHeader";
import portfolio from "@/data/portfolio.json";
import { buildAboutSchema, jsonLdScript } from "@/lib/seo-schema";
import { AboutExperienceSection } from "../AboutExperienceSection/AboutExperienceSection";
import { AboutHero } from "../AboutHero/AboutHero";
import styles from "./AboutPage.module.scss";
import { AboutStorySection } from "../AboutStorySection/AboutStorySection";
import { AboutToolboxSection } from "../AboutToolboxSection/AboutToolboxSection";

export function AboutPage() {
  const schema = buildAboutSchema();

  return (
    <div className={`site-shell ${styles["about-page"]}`}>
      <script
        type="application/ld+json"
        id="about-json-ld"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }}
      />
      <SiteHeader portfolio={portfolio} />
      <main>
        <AboutHero portfolio={portfolio} />
        <AboutStorySection about={portfolio?.about} />
        <AboutExperienceSection experienceLog={portfolio?.experienceLog} companyLogos={portfolio?.about.companyLogos} />
        <AboutToolboxSection about={portfolio?.about} />
      </main>
      <ContactFooter portfolio={portfolio} />
    </div>
  );
}
