import portfolio from "@/data/portfolio.json";
import { caseStudies, projects } from "@/data/work";
import {
  getProjectDescription,
  getProjectLinks,
  getProjectTitle,
  getProjectType,
  projectArchiveItems,
} from "@/data/projectsArchive";

const siteUrl = portfolio.profile.website;
const personId = `${siteUrl}/#person`;
const serviceId = `${siteUrl}/#professional-service`;
const websiteId = `${siteUrl}/#website`;
const imageUrl = `${siteUrl}/ayoub-about-v2.jpg`;

type GraphNode = Record<string, unknown>;

export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function absoluteUrl(href: string) {
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href;
  }

  return `${siteUrl}${href.startsWith("/") ? href : `/${href}`}`;
}

function basePersonSchema(): GraphNode {
  return {
    "@type": "Person",
    "@id": personId,
    "name": "Muhammad Ayoub Khan",
    "alternateName": ["Muhammad Ayoub", "Ayoub", "Ayoub Khan", "M Ayoub Khan", "Mayoub"],
    "url": siteUrl,
    "image": imageUrl,
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
  };
}

function reviewSchemas() {
  return portfolio.clients
    .filter((client) => client.showInTestimonials && client.testimonial)
    .slice(0, 12)
    .map((client) => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1",
      },
      "reviewBody": client.testimonial,
      "author": {
        "@type": "Organization",
        "name": client.name,
        "url": client.website,
      },
      "itemReviewed": { "@id": serviceId },
    }));
}

function professionalServiceSchema(): GraphNode {
  const featuredServices = portfolio.services.filter((service) => service.featured);
  const reviews = reviewSchemas();

  return {
    "@type": "ProfessionalService",
    "@id": serviceId,
    "name": "Muhammad Ayoub Khan Website Development Services",
    "alternateName": ["Ayoub Khan Web Developer", "Mayoub Website Developer", "M Ayoub Khan WordPress Developer"],
    "url": siteUrl,
    "description": "WordPress development, website design, WooCommerce, React, Next.js, Bricks Builder, Elementor, and front-end development services by Muhammad Ayoub Khan.",
    "email": portfolio.profile.email,
    "telephone": portfolio.profile.phone,
    "founder": { "@id": personId },
    "image": imageUrl,
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
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "bestRating": "5",
      "worstRating": "1",
      "reviewCount": reviews.length,
    },
    "review": reviews,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Website design and development services",
      "itemListElement": featuredServices.map((service) => ({
        "@type": "Offer",
        "name": service.name,
        "description": service.description,
        "url": `${siteUrl}${service.href === "#cta" ? "/contact" : service.href}`,
      })),
    },
  };
}

function websiteSchema(): GraphNode {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    "url": siteUrl,
    "name": "Muhammad Ayoub Khan Website Developer Portfolio",
    "alternateName": ["Muhammad Ayoub", "Ayoub Khan", "M Ayoub Khan", "Mayoub", "MAYOUB.DEV"],
    "description": "Portfolio and service website for Muhammad Ayoub Khan, a WordPress, website, React, and Next.js developer.",
    "publisher": { "@id": personId },
  };
}

function webpageSchema(pathname: string, name: string, description: string, type = "WebPage"): GraphNode {
  const url = absoluteUrl(pathname);

  return {
    "@type": type,
    "@id": `${url}#webpage`,
    "url": url,
    "name": name,
    "description": description,
    "image": imageUrl,
    "isPartOf": { "@id": websiteId },
    "about": { "@id": personId },
    "publisher": { "@id": personId },
    "inLanguage": "en",
  };
}

function graph(nodes: GraphNode[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

export function buildHomeSchema() {
  const selectedWork = [...caseStudies, ...projects].map((item) => {
    const description =
      item.description || ("result" in item && item.result ? item.result : item.stack);

    return { ...item, description };
  });

  return graph([
    websiteSchema(),
    basePersonSchema(),
    professionalServiceSchema(),
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
  ]);
}

export function buildServicesSchema() {
  return graph([
    websiteSchema(),
    basePersonSchema(),
    professionalServiceSchema(),
    webpageSchema(
      "/services",
      "Website Development Services",
      "WordPress, website design, WooCommerce, React, Next.js, Bricks Builder, Elementor, and front-end development services.",
      "WebPage",
    ),
  ]);
}

export function buildProjectsSchema() {
  const visibleProjects = projectArchiveItems.slice(0, 24);

  return graph([
    websiteSchema(),
    basePersonSchema(),
    webpageSchema(
      "/projects",
      "Website Design and Development Portfolio",
      "Website design and development portfolio by Muhammad Ayoub Khan.",
      "CollectionPage",
    ),
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/projects#project-list`,
      "name": "Website design and development projects",
      "itemListElement": visibleProjects.map((project, index) => {
        const link = getProjectLinks(project)[0]?.href;
        const projectUrl = link || `${siteUrl}/projects`;

        return {
          "@type": "ListItem",
          "position": index + 1,
          "name": getProjectTitle(project),
          "description": getProjectDescription(project),
          "item": {
            "@type": "CreativeWork",
            "name": getProjectTitle(project),
            "description": getProjectDescription(project),
            "genre": getProjectType(project),
            "creator": { "@id": personId },
            "url": projectUrl,
          },
        };
      }),
    },
  ]);
}

export function buildCaseStudiesSchema() {
  return graph([
    websiteSchema(),
    basePersonSchema(),
    webpageSchema(
      "/case-studies",
      "Case Studies",
      "Case studies showing WordPress, WooCommerce, React, performance, SEO, and CMS results delivered by Muhammad Ayoub.",
      "CollectionPage",
    ),
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/case-studies#case-study-list`,
      "name": "Website development case studies",
      "itemListElement": caseStudies.map((study, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": absoluteUrl(study.href),
        "name": study.title,
        "description": study.description,
      })),
    },
  ]);
}

export function buildAboutSchema() {
  return graph([
    websiteSchema(),
    basePersonSchema(),
    {
      ...webpageSchema(
        "/about",
        "About Muhammad Ayoub Khan",
        "About Muhammad Ayoub Khan, a freelance WordPress and web developer.",
        "ProfilePage",
      ),
      "mainEntity": { "@id": personId },
    },
  ]);
}

export function buildContactSchema() {
  return graph([
    websiteSchema(),
    basePersonSchema(),
    professionalServiceSchema(),
    {
      ...webpageSchema(
        "/contact",
        "Hire Muhammad Ayoub Khan",
        "Contact Muhammad Ayoub Khan for WordPress, website design, WooCommerce, React, Next.js, Bricks Builder, Elementor, and frontend projects.",
        "ContactPage",
      ),
      "mainEntity": {
        "@type": "ContactPoint",
        "email": portfolio.profile.email,
        "telephone": portfolio.profile.phone,
        "contactType": "sales",
        "areaServed": "Worldwide",
        "availableLanguage": ["en"],
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/contact#faq`,
      "mainEntity": portfolio.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    },
  ]);
}

export function buildLegalPageSchema(pathname: string, name: string, description: string) {
  return graph([
    websiteSchema(),
    basePersonSchema(),
    webpageSchema(pathname, name, description),
  ]);
}
