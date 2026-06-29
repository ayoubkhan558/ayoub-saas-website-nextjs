import projectsArchiveJson from "./projectsArchive.json";
import projectLinkStatusJson from "./projectLinkStatus.json";

export type ProjectArchiveItem = (typeof projectsArchiveJson.projects)[number];

export const projectsArchive = projectsArchiveJson;
export const projectArchiveItems = projectsArchiveJson.projects as ProjectArchiveItem[];
const verifiedLinks = new Set(projectLinkStatusJson.okLinks);

export const projectArchiveFilters = [
  { label: "All", value: "all" },
  { label: "HTML/CSS", value: "html-css" },
  { label: "Bricks", value: "bricks" },
  { label: "Elementor", value: "elementor" },
  { label: "React/Next.js", value: "react-nextjs" },
  { label: "Shopify", value: "shopify" },
  { label: "Live", value: "live" },
  { label: "Redesigned", value: "redesigned" },
  { label: "Domain expired", value: "domain-expired" },
] as const;

export type ProjectArchiveFilter = (typeof projectArchiveFilters)[number]["value"];

export function compactUrl(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function getProjectTitle(project: ProjectArchiveItem) {
  if (project.websiteName) {
    return project.websiteName;
  }

  if (project.websiteUrl) {
    return compactUrl(project.websiteUrl);
  }

  if (project.figmaLink) {
    return "Design handoff project";
  }

  return `Project ${project.rowNumber}`;
}

export function getProjectType(project: ProjectArchiveItem) {
  return project.projectType || "Client project";
}

export function getProjectDescription(project: ProjectArchiveItem) {
  return project.description || `${getProjectTitle(project)} is a client project built for a focused web experience.`;
}

export function getProjectThumbnail(project: ProjectArchiveItem) {
  if (project.screenshot) {
    return project.screenshot;
  }

  const href = normalizeHttpLink(project.websiteUrl);

  if (!href || !verifiedLinks.has(href)) {
    return null;
  }

  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(href)}?w=900`;
}

export function getProjectInitials(project: ProjectArchiveItem) {
  const title = getProjectTitle(project);
  const words = title.replace(/https?:\/\//, "").split(/[\s.-]+/).filter(Boolean);
  return words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("") || "P";
}

export function getProjectMeta(project: ProjectArchiveItem) {
  return [
    project.categoryNiche,
    project.platformFrameworkBuilder,
    project.projectStatus,
  ].filter((item): item is string => Boolean(item && !/^https?:\/\//i.test(item.trim())));
}

export function normalizeProjectFilter(value: string | string[] | undefined): ProjectArchiveFilter {
  const rawValue = Array.isArray(value) ? value[0] : value;

  return projectArchiveFilters.some((filter) => filter.value === rawValue)
    ? (rawValue as ProjectArchiveFilter)
    : "all";
}

export function projectMatchesFilter(project: ProjectArchiveItem, filter: ProjectArchiveFilter) {
  if (filter === "all") {
    return true;
  }

  const stack = `${project.platformFrameworkBuilder ?? ""} ${project.projectType ?? ""} ${project.description ?? ""}`.toLowerCase();
  const status = project.projectStatus;

  if (filter === "html-css") {
    return /html|css|bootstrap|jquery/.test(stack);
  }

  if (filter === "bricks") {
    return /bricks/.test(stack);
  }

  if (filter === "elementor") {
    return /elementor/.test(stack);
  }

  if (filter === "react-nextjs") {
    return /react|next/.test(stack);
  }

  if (filter === "shopify") {
    return /shopify/.test(stack);
  }

  if (filter === "live") {
    return status === "Live";
  }

  if (filter === "redesigned") {
    return status === "Redesigned by Client";
  }

  if (filter === "domain-expired") {
    return status === "Offline (Domain Expired)";
  }

  return true;
}

export function getProjectLinks(project: ProjectArchiveItem) {
  const links = [
    { href: normalizeHttpLink(project.websiteUrl), label: "Open website", kind: "website" as const },
  ];

  return links.filter(
    (link): link is { href: string; label: string; kind: "website" } =>
      Boolean(link.href && verifiedLinks.has(link.href)),
  );
}

export function normalizeHttpLink(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (!/^https?:\/\//i.test(trimmed)) {
    return null;
  }

  try {
    return new URL(trimmed).toString();
  } catch {
    return null;
  }
}
