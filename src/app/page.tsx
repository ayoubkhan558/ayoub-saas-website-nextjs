import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { PortfolioLanding } from "@/components/PortfolioLanding";
import { PortfolioContentProvider } from "@/context/PortfolioContentContext";
import { caseStudies, projects } from "@/data/work";
import portfolio from "@/data/portfolio.json";

export const metadata: Metadata = {
  title: "Freelance WordPress Developer & Website Developer",
  description:
    "Hire Muhammad Ayoub for WordPress development, website design, WooCommerce stores, Bricks Builder, Elementor, React, and Next.js websites for growing businesses.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Freelance WordPress Developer & Website Developer",
    description:
      "WordPress developer and front-end website developer building fast, responsive business websites, WooCommerce stores, and Next.js front ends.",
    type: "website",
    url: "/",
  },
};

function readMarkdownFile(pathname: string) {
  return existsSync(pathname) ? readFileSync(pathname, "utf8") : "";
}

function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function buildHomeSchema() {
  const siteUrl = portfolio.profile.website;
  const personId = `${siteUrl}/#person`;
  const serviceId = `${siteUrl}/#professional-service`;
  const featuredServices = portfolio.services.filter((service) => service.featured);
  const absoluteUrl = (href: string) => {
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return href;
    }

    return `${siteUrl}${href.startsWith("/") ? href : `/${href}`}`;
  };
  const selectedWork = [...caseStudies, ...projects].map((item) => {
    const description =
      item.description || ("result" in item && item.result ? item.result : item.stack);

    return { ...item, description };
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": portfolio.profile.brand,
        "description": portfolio.profile.summary,
        "publisher": { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        "name": portfolio.profile.name,
        "url": siteUrl,
        "jobTitle": portfolio.profile.role,
        "email": portfolio.profile.email,
        "telephone": portfolio.profile.phone,
        "sameAs": [portfolio.profile.linkedin],
        "knowsAbout": portfolio.expertise.slice(0, 10).map((item) => item.name),
      },
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        "name": `${portfolio.profile.name} Front-End Development`,
        "url": siteUrl,
        "description": portfolio.profile.summary,
        "email": portfolio.profile.email,
        "telephone": portfolio.profile.phone,
        "founder": { "@id": personId },
        "areaServed": "Worldwide",
        "serviceType": [
          "WordPress development",
          "Website design and development",
          "Frontend development",
          "Next.js development",
          "React development",
          "WooCommerce development",
          "Bricks Builder development",
          "Elementor development",
          ...featuredServices.map((service) => service.name),
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Web development services",
          "itemListElement": featuredServices.map((service) => ({
            "@type": "Offer",
            "name": service.name,
            "description": service.description,
            "url": `${siteUrl}${service.href === "#cta" ? "/#cta" : service.href}`,
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        "mainEntity": portfolio.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#selected-work`,
        "name": "Selected projects and case studies",
        "itemListElement": selectedWork.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "url": absoluteUrl(item.href),
          "name": item.title,
          "description": item.description,
        })),
      },
    ],
  };
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
