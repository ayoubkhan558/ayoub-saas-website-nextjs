import type { Metadata } from "next";
import portfolio from "@/data/portfolio.json";
import "@splidejs/react-splide/css/core";
import "./globals.scss";

const siteUrl = portfolio.profile.website;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Muhammad Ayoub Khan | Website Developer & SEO Expert",
    template: "%s | Muhammad Ayoub",
  },
  description:
    "Hire Muhammad Ayoub Khan for website development and SEO, including Bricks Builder, WordPress, React, and Next.js websites that convert.",
  alternates: {
    canonical: "/",
  },
  authors: [{ name: portfolio.profile.name, url: siteUrl }],
  creator: portfolio.profile.name,
  publisher: portfolio.profile.brand,
  category: "Web Development",
  openGraph: {
    title: "Muhammad Ayoub Khan | Website Developer & SEO Expert",
    description:
      "Website development and SEO by Muhammad Ayoub Khan, including Bricks Builder, WordPress, React, and Next.js.",
    type: "website",
    url: "/",
    siteName: portfolio.profile.brand,
    images: [
      {
        url: "/social/ayoub-portfolio-thumbnail.jpg",
        width: 1734,
        height: 907,
        alt: "Muhammad Ayoub Khan, website developer and SEO expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ayoub Khan | Website Developer & SEO Expert",
    description:
      "Hire Muhammad Ayoub Khan for website development and SEO, including Bricks Builder, WordPress, React, and Next.js.",
    images: ["/social/ayoub-portfolio-thumbnail.jpg"],
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
        <link rel="image_src" href={`${siteUrl}/social/ayoub-portfolio-thumbnail.jpg`} />
        <meta itemProp="image" content={`${siteUrl}/social/ayoub-portfolio-thumbnail.jpg`} />
      </head>
      <body suppressHydrationWarning itemScope itemType="https://schema.org/WebPage">
        {children}
      </body>
    </html>
  );
}
