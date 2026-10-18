import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage/AboutPage";
import portfolio from "@/data/portfolio.json";

const pageUrl = new URL("/about", portfolio.profile.website).toString();

export const metadata: Metadata = {
  title: "About Muhammad Ayoub Khan, Freelance Web Developer",
  description:
    "Developer for Bricks Builder, WordPress redesigns, Figma-to-code work, and React or Next.js projects.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Muhammad Ayoub Khan, Freelance Web Developer",
    description:
      "Developer for Bricks Builder, WordPress redesigns, Figma-to-code work, and React or Next.js projects.",
    type: "profile",
    url: pageUrl,
    siteName: portfolio.profile.brand,
    images: [
      {
        url: new URL("/social/ayoub-portfolio-thumbnail-about.jpg", portfolio.profile.website).toString(),
        width: 1733,
        height: 907,
        alt: "Muhammad Ayoub Khan freelance web developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Muhammad Ayoub Khan, Freelance Web Developer",
    description:
      "Developer for Bricks Builder, WordPress redesigns, Figma-to-code work, and React or Next.js projects.",
    images: [new URL("/social/ayoub-portfolio-thumbnail-about.jpg", portfolio.profile.website).toString()],
    site: "@ayoubkhan558",
    creator: "@ayoubkhan558",
  },
};

export default AboutPage;
