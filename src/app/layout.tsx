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
  verification: {
    google: "duyYeALQEH1wUm9zAIqqTeYPJIdo3ENxkYGdgIsc274",
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
