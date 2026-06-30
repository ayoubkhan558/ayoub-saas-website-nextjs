import type { MetadataRoute } from "next";
import portfolio from "@/data/portfolio.json";
import { caseStudies } from "@/data/work";

const siteUrl = portfolio.profile.website.replace(/\/$/, "");

const staticRoutes = [
  "",
  "/about",
  "/services",
  "/projects",
  "/case-studies",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    ...staticRoutes,
    ...caseStudies.map((entry) => entry.href),
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/case-studies/") ? 0.8 : 0.7,
  }));
}
