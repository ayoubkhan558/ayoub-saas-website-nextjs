import Image from "next/image";
import { getImageDimensions } from "@/lib/image-dimensions";
import type { PortfolioData } from "@/context/PortfolioContentContext";
import type { CSSProperties, MouseEvent } from "react";
import { IconGlyph } from "../IconGlyph/IconGlyph";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import styles from "./AboutSection.module.scss";

export function AboutSection({ portfolio }: { portfolio: PortfolioData }) {
  const education = portfolio.recognition.find((item) => item.label === "Master of Computer Science");
  const handlePortraitSpotlight = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    event.currentTarget.style.setProperty("--spotlight-x", `${x}%`);
    event.currentTarget.style.setProperty("--spotlight-y", `${y}%`);
  };

  return (
    <section className={`section ${styles["about"]}`} id="about">
      <div className="section__inner">
        <div className={`container ${styles["about__grid"]}`}>
          <div className={styles["about__copy"]}>
            <SectionHeader label="About me" title="About Ayoub" eyebrow={portfolio?.about.story} />
            <p className={styles["about__text"]}>{portfolio?.about.motivation}</p>
            {education ? (
              <div className={styles["about__education"]}>
                <span className={styles["about__education-label"]}>Education</span>
                <strong className={styles["about__education-title"]}>{education.label}</strong>
                <span className={styles["about__education-meta"]}>{education.status}</span>
              </div>
            ) : null}
            <div className={styles["about__actions"]}>
              <a className="button" href={portfolio?.about.resumeHref} target="_blank" rel="noreferrer" download title="Download Muhammad Ayoub resume">
                <IconGlyph name="download" />
                Download resume
              </a>
              <a className="button button--ghost" href={portfolio?.profile.linkedin} target="_blank" rel="noreferrer" title="Visit Muhammad Ayoub LinkedIn profile">
                <IconGlyph name="linkedin" />
                LinkedIn
              </a>
              <a className="button button--ghost" href="https://www.upwork.com/freelancers/~01176397124d8cb917?viewMode=1" title="Contact Muhammad Ayoub for Upwork project details">
                <IconGlyph name="externalLink" />
                Upwork profile
              </a>
              <span className={styles["about__signature"]} aria-label={portfolio?.about.signature}>
                <Image src="/mayoub-signature.png" alt="Muhammad Ayoub signature" title="Muhammad Ayoub signature" sizes="140px" loading="lazy" {...getImageDimensions("/mayoub-signature.png")} />
              </span>
            </div>
          </div>
          <aside className={styles["about__panel"]}>
            <div
              className={styles["about__portrait"]}
              onMouseMove={handlePortraitSpotlight}
              style={{ "--spotlight-x": "50%", "--spotlight-y": "42%" } as CSSProperties}
            >
              <Image src="/ayoub-about-v2.jpg" alt="Muhammad Ayoub Khan WordPress developer portrait" title="Muhammad Ayoub Khan WordPress developer portrait" sizes="(max-width: 760px) 100vw, 42vw" loading="lazy" {...getImageDimensions("/ayoub-about-v2.jpg")} />
              <Image src="/ayoub-about-v2.jpg" alt="" title="Muhammad Ayoub Khan website developer background portrait" aria-hidden="true" sizes="(max-width: 760px) 100vw, 42vw" loading="lazy" {...getImageDimensions("/ayoub-about-v2.jpg")} />
              <div className={styles["about__portrait-caption"]}>
                <strong>Muhammad Ayoub</strong>
                <span>5+ years of experience as Reactjs Frontend Developer & WordPress</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
