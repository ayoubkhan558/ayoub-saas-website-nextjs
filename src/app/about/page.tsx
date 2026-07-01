import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About Muhammad Ayoub Khan, Freelance Web Developer",
  description:
    "About Muhammad Ayoub Khan, a freelance WordPress and web developer building React, Next.js, WooCommerce, Bricks, Elementor, and business websites.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Muhammad Ayoub Khan, Freelance Web Developer",
    description:
      "Learn about Muhammad Ayoub's WordPress, front-end, website design, and website development experience, workflow, and practical delivery approach.",
    type: "profile",
    url: "/about",
    images: [
      {
        url: "/ayoub-about-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Ayoub Khan freelance web developer",
      },
    ],
  },
};

export default AboutPage;
