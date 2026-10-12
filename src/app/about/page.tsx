import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage/AboutPage";

export const metadata: Metadata = {
  title: "About Muhammad Ayoub Khan, Freelance Web Developer",
  description:
    "About Muhammad Ayoub Khan — Bricks Builder, WordPress redesign, Figma to code, React, and Next.js developer.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Muhammad Ayoub Khan, Freelance Web Developer",
    description:
      "Bricks Builder, WordPress, and front-end delivery experience for clinics, firms, agencies, and founders.",
    type: "profile",
    url: "/about",
    images: [
      {
        url: "/social/ayoub-portfolio-thumbnail.jpg",
        width: 1734,
        height: 907,
        alt: "Muhammad Ayoub Khan freelance web developer",
      },
    ],
  },
};

export default AboutPage;
