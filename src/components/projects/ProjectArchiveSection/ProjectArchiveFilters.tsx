"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { projectPlatformFilters, projectStatusFilters } from "@/data/projectsArchive";
import type { ProjectPlatformFilter, ProjectStatusFilter } from "@/data/projectsArchive";
import styles from "./ProjectArchiveSection.module.scss";

export function ProjectArchiveFilters({
  initialPlatform,
  initialStatus,
}: {
  initialPlatform: ProjectPlatformFilter;
  initialStatus: ProjectStatusFilter;
}) {
  const router = useRouter();
  const [platform, setPlatform] = useState(initialPlatform);
  const [status, setStatus] = useState(initialStatus);

  function applyFilters(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams();
    if (platform !== "all") params.set("platform", platform);
    if (status !== "all") params.set("status", status);
    const query = params.toString();

    router.push(`${query ? `/projects?${query}` : "/projects"}#projects-list`);
  }

  return (
    <form className={styles["filter-selects"]} onSubmit={applyFilters}>
      <label className={styles["filter-selects__field"]}>
        <span>Platform</span>
        <select
          name="platform"
          value={platform}
          onChange={(event) => setPlatform(event.target.value as ProjectPlatformFilter)}
        >
          {projectPlatformFilters.map((filter) => (
            <option value={filter.value} key={filter.value}>
              {filter.label}
            </option>
          ))}
        </select>
      </label>
      <span className={styles["filter-selects__separator"]} role="separator" aria-orientation="vertical" />
      <label className={styles["filter-selects__field"]}>
        <span>Status</span>
        <select
          name="status"
          value={status}
          onChange={(event) => setStatus(event.target.value as ProjectStatusFilter)}
        >
          {projectStatusFilters.map((filter) => (
            <option value={filter.value} key={filter.value}>
              {filter.label}
            </option>
          ))}
        </select>
      </label>
      <button className={styles["filter-selects__submit"]} type="submit">
        Apply filters
      </button>
    </form>
  );
}
