import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { PortfolioLanding } from "@/components/PortfolioLanding";
import { PortfolioContentProvider } from "@/context/PortfolioContentContext";
import { caseStudies, projects } from "@/data/work";
import portfolio from "@/data/portfolio.json";

export const metadata: Metadata = {
  title: "Muhammad Ayoub Khan, Freelance WordPress Developer",
  description:
    "Find and hire Muhammad Ayoub Khan, also searched as Ayoub, Ayoub Khan, M Ayoub Khan, and Mayoub, for WordPress, website design, WooCommerce, React, and Next.js development.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Muhammad Ayoub Khan, Freelance WordPress Developer",
    description:
      "WordPress developer and front-end website developer Muhammad Ayoub Khan builds fast, responsive business websites, WooCommerce stores, and Next.js front ends.",
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
  const websiteId = `${siteUrl}/#website`;
  const reviews = portfolio.clients
    .filter((client) => client.showInTestimonials && client.testimonial)
    .slice(0, 12);
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
        "@id": websiteId,
        "url": siteUrl,
        "name": "Muhammad Ayoub Khan Website Developer Portfolio",
        "alternateName": ["Muhammad Ayoub", "Ayoub Khan", "M Ayoub Khan", "Mayoub", "MAYOUB.DEV"],
        "description": "Portfolio and service website for Muhammad Ayoub Khan, a WordPress, website, React, and Next.js developer.",
        "publisher": { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        "name": "Muhammad Ayoub Khan",
        "alternateName": ["Muhammad Ayoub", "Ayoub", "Ayoub Khan", "M Ayoub Khan", "Mayoub"],
        "url": siteUrl,
        "jobTitle": "Freelance WordPress Developer and Front-End Website Developer",
        "description": "Muhammad Ayoub Khan is a freelance WordPress developer, website developer, React developer, and Next.js developer based in Faisalabad, Pakistan.",
        "email": portfolio.profile.email,
        "telephone": portfolio.profile.phone,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Faisalabad",
          "addressCountry": "PK",
        },
        "sameAs": [portfolio.profile.linkedin, portfolio.profile.github],
        "knowsAbout": [
          "WordPress development",
          "Website design",
          "Website development",
          "Frontend development",
          "React development",
          "Next.js development",
          "WooCommerce development",
          "Bricks Builder",
          "Elementor",
          "Figma to code",
          ...portfolio.expertise.slice(0, 10).map((item) => item.name),
        ],
        "hasOccupation": {
          "@type": "Occupation",
          "name": "Website Developer",
          "occupationLocation": {
            "@type": "Country",
            "name": "Worldwide",
          },
          "skills": "WordPress, Website Design, React, Next.js, WooCommerce, Bricks Builder, Elementor, JavaScript, TypeScript",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        "name": "Muhammad Ayoub Khan Website Development Services",
        "alternateName": ["Ayoub Khan Web Developer", "Mayoub Website Developer", "M Ayoub Khan WordPress Developer"],
        "url": siteUrl,
        "description": "WordPress development, website design, WooCommerce, React, Next.js, Bricks Builder, Elementor, and front-end development services by Muhammad Ayoub Khan.",
        "email": portfolio.profile.email,
        "telephone": portfolio.profile.phone,
        "founder": { "@id": personId },
        "image": `${siteUrl}/ayoub-about-v2.jpg`,
        "areaServed": "Worldwide",
        "priceRange": "Custom project pricing",
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
          "name": "Website design and development services",
          "itemListElement": featuredServices.map((service) => ({
            "@type": "Offer",
            "name": service.name,
            "description": service.description,
            "url": `${siteUrl}${service.href === "#cta" ? "/#cta" : service.href}`,
          })),
        },
        "review": reviews.map((client) => ({
          "@type": "Review",
          "reviewBody": client.testimonial,
          "author": {
            "@type": "Organization",
            "name": client.name,
            "url": client.website,
          },
          "itemReviewed": { "@id": serviceId },
        })),
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
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#client-reviews`,
        "name": "Client reviews for Muhammad Ayoub Khan",
        "itemListElement": reviews.map((client, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Review",
            "name": `${client.name} review for Muhammad Ayoub Khan`,
            "reviewBody": client.testimonial,
            "author": {
              "@type": "Organization",
              "name": client.name,
              "url": client.website,
            },
            "itemReviewed": { "@id": serviceId },
          },
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
