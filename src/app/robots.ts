import type { MetadataRoute } from "next";
import portfolio from "@/content/portfolio/portfolio.json";

const siteUrl = portfolio.profile.website.replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
