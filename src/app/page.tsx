import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { PortfolioLanding } from "@/components/PortfolioLanding/PortfolioLanding";
import { PortfolioContentProvider } from "@/context/PortfolioContentContext";
import { buildHomeSchema, jsonLdScript } from "@/lib/seo-schema";
import portfolio from "@/data/portfolio.json";

export const metadata: Metadata = {
  title: "Muhammad Ayoub Khan | Website Developer & SEO Expert",
  description:
    "Hire Muhammad Ayoub Khan for website development and SEO, including Bricks Builder, WordPress, React, and Next.js websites built for leads and clean handoff.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Muhammad Ayoub Khan | Website Developer & SEO Expert",
    description:
      "Website developer and SEO expert Muhammad Ayoub Khan builds Bricks Builder, WordPress, React, and Next.js websites focused on clarity and conversions.",
    type: "website",
    url: "/",
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
      "Hire Muhammad Ayoub Khan for website development and SEO, including Bricks Builder, React, Next.js, and WordPress.",
    images: ["/social/ayoub-portfolio-thumbnail.jpg"],
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
