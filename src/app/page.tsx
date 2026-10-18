import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { PortfolioLanding } from "@/components/PortfolioLanding/PortfolioLanding";
import { PortfolioContentProvider } from "@/context/PortfolioContentContext";
import { buildHomeSchema, jsonLdScript } from "@/lib/seo-schema";
import portfolio from "@/data/portfolio.json";

const siteUrl = portfolio.profile.website;

export const metadata: Metadata = {
  title: "Muhammad Ayoub Khan | Website Developer & SEO Expert",
  description:
    "WordPress, React, and Next.js developer building conversion-focused websites for brands that need clarity and growth.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Muhammad Ayoub Khan | Website Developer & SEO Expert",
    description:
      "WordPress, React, and Next.js developer building conversion-focused websites for brands that need clarity and growth.",
    type: "website",
    url: siteUrl,
    siteName: portfolio.profile.brand,
    images: [
      {
        url: new URL("/social/ayoub-portfolio-thumbnail.jpg", siteUrl).toString(),
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
      "WordPress, React, and Next.js developer building conversion-focused websites for brands that need clarity and growth.",
    images: [new URL("/social/ayoub-portfolio-thumbnail.jpg", siteUrl).toString()],
    site: "@ayoubkhan558",
    creator: "@ayoubkhan558",
  },
};

function readMarkdownFile(pathname: string) {
  return existsSync(pathname) ? readFileSync(pathname, "utf8") : "";
}

export default function Home() {
  const markdown = {
    product: readMarkdownFile(join(process.cwd(), "PRODUCT.md")),
    design: readMarkdownFile(join(process.cwd(), "DESIGN.md")),
  };
  const schema = buildHomeSchema();
  const jsonLd = { __html: jsonLdScript(schema) };

  return (
    <>
      <script
        type="application/ld+json"
        id="home-json-ld"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }}
      />
      <PortfolioContentProvider portfolio={portfolio} markdown={markdown}>
        <PortfolioLanding />
      </PortfolioContentProvider>
    </>
  );
}
