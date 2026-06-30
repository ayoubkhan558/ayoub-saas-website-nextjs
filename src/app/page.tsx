import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { PortfolioLanding } from "@/components/PortfolioLanding";
import { PortfolioContentProvider } from "@/context/PortfolioContentContext";
import { buildHomeSchema, jsonLdScript } from "@/lib/seo-schema";
import portfolio from "@/data/portfolio.json";

export const metadata: Metadata = {
  title: "Muhammad Ayoub Khan, Freelance WordPress Developer",
  description:
    "Hire Muhammad Ayoub Khan for WordPress, website design, WooCommerce, React, and Next.js development.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Muhammad Ayoub Khan, Freelance WordPress Developer",
    description:
      "WordPress developer and front-end website developer Muhammad Ayoub Khan builds fast, responsive business websites, WooCommerce stores, and Next.js front ends.",
    type: "website",
    url: "/",
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
    title: "Muhammad Ayoub Khan, Freelance WordPress Developer",
    description:
      "Find and hire Muhammad Ayoub Khan for WordPress, website design, WooCommerce, React, and Next.js development.",
    images: ["/ayoub-about-v2.jpg"],
  },
};

function readMarkdownFile(pathname: string) {
  return existsSync(pathname) ? readFileSync(pathname, "utf8") : "";
}

export default function Home() {
  const markdown = {
    product: readMarkdownFile(join(process.cwd(), "PRODUCT.md")),
    design: readMarkdownFile("C:/Users/NCS/Downloads/DESIGN.md"),
  };
  const schema = buildHomeSchema();

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
