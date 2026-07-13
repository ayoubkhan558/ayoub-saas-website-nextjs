import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { PortfolioLanding } from "@/components/PortfolioLanding/PortfolioLanding";
import { PortfolioContentProvider } from "@/context/PortfolioContentContext";
import { buildHomeSchema, jsonLdScript } from "@/lib/seo-schema";
import portfolio from "@/data/portfolio.json";

export const metadata: Metadata = {
  title: "Muhammad Ayoub Khan | Bricks Builder, React & Front-End Developer",
  description:
    "Hire Muhammad Ayoub Khan for Bricks Builder, WordPress redesigns, Figma to code, React, and Next.js websites built for leads and clean handoff.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Muhammad Ayoub Khan | Bricks Builder, React & Front-End Developer",
    description:
      "Front-end developer Muhammad Ayoub Khan builds Bricks Builder, WordPress, React, and Next.js websites focused on clarity and conversions.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/ayoub-about-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Ayoub Khan Bricks Builder and front-end developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ayoub Khan | Bricks Builder, React & Front-End Developer",
    description:
      "Hire Muhammad Ayoub Khan for Bricks Builder, Figma to code, React, Next.js, and WordPress development.",
    images: ["/ayoub-about-v2.jpg"],
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
