import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Muhammad Ayoub - WordPress Developer & Front-End Developer",
  description:
    "Portfolio of Muhammad Ayoub, a WordPress, CMS, WooCommerce, React.js, and Next.js developer building fast, conversion-focused websites.",
  keywords: [
    "WordPress Developer",
    "Front-End Developer",
    "WooCommerce",
    "React.js",
    "Next.js",
    "Elementor Pro",
  ],
  openGraph: {
    title: "Muhammad Ayoub - WordPress Developer & Front-End Developer",
    description:
      "WordPress, CMS, WooCommerce, React.js, and Next.js development for fast, maintainable business websites.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
