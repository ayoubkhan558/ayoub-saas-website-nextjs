import { mkdir, readFile, stat, unlink, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const archivePath = path.join(root, "src/data/projectsArchive.json");
const linkStatusPath = path.join(root, "src/data/projectLinkStatus.json");
const outputDir = path.join(root, "public/projects");

const archive = JSON.parse(await readFile(archivePath, "utf8"));
const linkStatus = JSON.parse(await readFile(linkStatusPath, "utf8"));
const verifiedLinks = new Set(linkStatus.okLinks ?? []);
const minScreenshotBytes = 20_000;

function normalizeHttpLink(value) {
  if (!value) {
    return null;
  }

  const trimmed = String(value).trim();
  if (!/^https?:\/\//i.test(trimmed)) {
    return null;
  }

  try {
    return new URL(trimmed).toString();
  } catch {
    return null;
  }
}

function extensionFromContentType(contentType) {
  if (/png/i.test(contentType)) {
    return "png";
  }

  if (/webp/i.test(contentType)) {
    return "webp";
  }

  return "jpg";
}

function slugifyProjectName(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\.[a-z]{2,}(\/.*)?$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64) || "project";
}

function getScreenshotFileName(project, extension) {
  const base = slugifyProjectName(project.websiteName || project.websiteUrl || project.rowNumber);
  return `project-ss-${base}.${extension}`;
}

async function fetchScreenshot(project) {
  const href = normalizeHttpLink(project.websiteUrl);

  if (!href || !verifiedLinks.has(href)) {
    return { rowNumber: project.rowNumber, status: "skipped" };
  }

  const existingPath = project.screenshot;
  const existingFilePath = existingPath ? path.join(root, "public", existingPath.replace(/^\//, "")) : null;
  if (existingFilePath && existsSync(existingFilePath)) {
    const existingStats = await stat(existingFilePath);
    if (existingStats.size >= minScreenshotBytes) {
      return { rowNumber: project.rowNumber, status: "cached", href: existingPath };
    }

    await unlink(existingFilePath);
    delete project.screenshot;
  }

  const screenshotUrl = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(href)}?w=1200`;
  const response = await fetch(screenshotUrl, {
    headers: {
      "user-agent": "Mozilla/5.0 (compatible; ProjectScreenshotCache/1.0)",
      accept: "image/avif,image/webp,image/png,image/jpeg,*/*",
    },
  });

  if (!response.ok) {
    return { rowNumber: project.rowNumber, status: "failed", reason: `HTTP ${response.status}` };
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!/^image\//i.test(contentType)) {
    return { rowNumber: project.rowNumber, status: "failed", reason: `Unexpected content-type ${contentType}` };
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < minScreenshotBytes) {
    return { rowNumber: project.rowNumber, status: "failed", reason: `Image too small (${bytes.length} bytes)` };
  }

  const extension = extensionFromContentType(contentType);
  const fileName = getScreenshotFileName(project, extension);
  const filePath = path.join(outputDir, fileName);
  await writeFile(filePath, bytes);

  const publicPath = `/projects/${fileName}`;
  project.screenshot = publicPath;

  return { rowNumber: project.rowNumber, status: "saved", href: publicPath, bytes: bytes.length };
}

async function runPool(items, concurrency, worker) {
  let index = 0;
  const results = [];

  async function next() {
    while (index < items.length) {
      const currentIndex = index;
      index += 1;
      const item = items[currentIndex];
      const result = await worker(item).catch((error) => ({
        rowNumber: item.rowNumber,
        status: "failed",
        reason: error.message,
      }));
      results[currentIndex] = result;

      if (result.status !== "skipped") {
        console.log(`${currentIndex + 1}/${items.length}`, result);
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, next));
  return results;
}

await mkdir(outputDir, { recursive: true });
const results = await runPool(archive.projects ?? [], 4, fetchScreenshot);
await writeFile(archivePath, `${JSON.stringify(archive, null, 2)}\n`);

const summary = results.reduce((counts, result) => {
  counts[result.status] = (counts[result.status] ?? 0) + 1;
  return counts;
}, {});

console.log("Project screenshot cache summary:", summary);
