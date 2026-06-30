import type { Metadata } from "next";
import portfolio from "@/data/portfolio.json";
import "./globals.scss";

const siteUrl = portfolio.profile.website;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Muhammad Ayoub Khan | WordPress Developer & Website Developer",
    template: "%s | Muhammad Ayoub",
  },
  description:
    "Hire Muhammad Ayoub Khan, also known as Ayoub, Ayoub Khan, M Ayoub Khan, and Mayoub, for WordPress development, website design, Next.js, WooCommerce, Bricks, and Elementor.",
  alternates: {
    canonical: "/",
  },
  authors: [{ name: portfolio.profile.name, url: siteUrl }],
  creator: portfolio.profile.name,
  publisher: portfolio.profile.brand,
  category: "Web Development",
  keywords: [
    "WordPress developer",
    "Muhammad Ayoub",
    "Muhammad Ayoub Khan",
    "Ayoub",
    "Ayoub Khan",
    "M Ayoub Khan",
    "Mayoub",
    "mayoub.dev",
    "website developer",
    "website designer",
    "freelance web developer",
    "front-end developer",
    "Next.js developer",
    "React developer",
    "WooCommerce developer",
    "Bricks Builder developer",
    "Elementor developer",
    "Figma to WordPress",
    "business website development",
    "responsive website design",
  ],
  openGraph: {
    title: "Muhammad Ayoub Khan | WordPress Developer & Website Developer",
    description:
      "Freelance WordPress, website, WooCommerce, React, and Next.js development by Muhammad Ayoub Khan for fast, maintainable business websites.",
    type: "website",
    url: "/",
    siteName: portfolio.profile.brand,
    images: [
      {
        url: "/ayoub-about-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Ayoub Khan WordPress developer and website developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ayoub Khan | WordPress Developer & Website Developer",
    description:
      "Freelance WordPress developer and website developer Muhammad Ayoub Khan for business websites, WooCommerce stores, and Next.js front ends.",
    images: ["/ayoub-about-v2.jpg"],
  },
  verification: {
    google: "duyYeALQEH1wUm9zAIqqTeYPJIdo3ENxkYGdgIsc274",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
  try {
    const storedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const theme = storedTheme === "dark" || storedTheme === "light" ? storedTheme : systemTheme;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {
    document.documentElement.dataset.theme = "light";
    document.documentElement.style.colorScheme = "light";
  }
})();`,
          }}
        />
        <link rel="image_src" href={`${siteUrl}/ayoub-about-v2.jpg`} />
        <meta itemProp="image" content={`${siteUrl}/ayoub-about-v2.jpg`} />
      </head>
      <body suppressHydrationWarning itemScope itemType="https://schema.org/WebPage">
        {children}
      </body>
    </html>
  );
}
