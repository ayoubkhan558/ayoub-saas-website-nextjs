import projectsArchiveJson from "./projectsArchive.json";
import projectLinkStatusJson from "./projectLinkStatus.json";

export type ProjectArchiveItem = (typeof projectsArchiveJson.projects)[number];

export const projectsArchive = projectsArchiveJson;
export const projectArchiveItems = projectsArchiveJson.projects as ProjectArchiveItem[];
const verifiedLinks = new Set(projectLinkStatusJson.okLinks);

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
    project.date,
  ].filter((item): item is string => Boolean(item));
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
