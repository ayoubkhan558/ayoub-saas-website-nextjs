"use client";

import { useState } from "react";
import styles from "./CopyLinksControl.module.scss";

export type CopyLinkEntry = {
  name: string;
  nameLabel?: string;
  category: string;
  href: string;
};

type LinkGroup = {
  label: string;
  entries: CopyLinkEntry[];
};

export function CopyLinksControl({
  allEntries,
  groups,
  itemName,
}: {
  allEntries: CopyLinkEntry[];
  groups?: LinkGroup[];
  itemName: string;
}) {
  const [selectedGroup, setSelectedGroup] = useState(groups?.[0]?.label ?? "");
  const [status, setStatus] = useState("");

  async function copyEntries(entries: CopyLinkEntry[]) {
    try {
      const text = entries
        .map((entry) => [
          `${entry.nameLabel ?? "Website"}: ${entry.name}`,
          `Category: ${entry.category}`,
          `Link: ${new URL(entry.href, window.location.origin).toString()}`,
        ].join("\n"))
        .join("\n\n");
      await navigator.clipboard.writeText(text);
      setStatus(`Copied ${entries.length} ${itemName} entr${entries.length === 1 ? "y" : "ies"}.`);
    } catch {
      setStatus("Could not access the clipboard. Check your browser permissions and try again.");
    }
  }

  const groupEntries = groups?.find((group) => group.label === selectedGroup)?.entries ?? [];

  return (
    <div className={styles.control}>
      <button className="button button--dark button--small" type="button" onClick={() => copyEntries(allEntries)} disabled={!allEntries.length}>
        Copy all {itemName} links
      </button>
      {groups?.length ? (
        <>
          <label className={styles.category}>
            <span>Category</span>
            <select value={selectedGroup} onChange={(event) => setSelectedGroup(event.target.value)}>
              {groups.map((group) => (
                <option key={group.label} value={group.label}>{group.label}</option>
              ))}
            </select>
          </label>
          <button className="button button--ghost button--small" type="button" onClick={() => copyEntries(groupEntries)} disabled={!groupEntries.length}>
            Copy category links
          </button>
        </>
      ) : null}
      <span className={styles.status} aria-live="polite">{status}</span>
    </div>
  );
}