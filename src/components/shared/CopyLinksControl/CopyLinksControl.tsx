"use client";

import { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import styles from "./CopyLinksControl.module.scss";

export type CopyLinkEntry = {
  name: string;
  nameLabel?: string;
  category: string;
  href: string;
};

const subscribeToClient = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

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
  const isMounted = useSyncExternalStore(subscribeToClient, getClientSnapshot, getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(groups?.[0]?.label ?? "");
  const [customTitle, setCustomTitle] = useState("");
  const [format, setFormat] = useState<"urls" | "markdown" | "details">("details");
  const [includeTitle, setIncludeTitle] = useState(true);
  const [includeCategories, setIncludeCategories] = useState(false);
  const [status, setStatus] = useState("");

  const defaultTitle = itemName === "project" ? "Muhammad Ayoub Projects" : "Muhammad Ayoub Case Studies";
  const groupTitle = selectedGroup ? `Ayoub's ${selectedGroup} projects` : defaultTitle;

  async function copyEntries(entries: CopyLinkEntry[], title: string = defaultTitle) {
    try {
      const lines = entries.map((entry) => {
        const href = new URL(entry.href, window.location.origin).toString();

        if (format === "urls") {
          return href;
        }

        if (format === "markdown") {
          return `- [${entry.name}](${href})${includeCategories ? ` - ${entry.category}` : ""}`;
        }

        return [
          `## ${entry.name} - ${entry.nameLabel ?? "Website"}`,
          ...(includeCategories ? [`Category: ${entry.category}`] : []),
          href,
        ].join("\n");
      });
      const text = [includeTitle ? (customTitle.trim() || title) : "", lines.join(format === "details" ? "\n\n" : "\n")]
        .filter(Boolean)
        .join("\n\n");
      await navigator.clipboard.writeText(text);
      setStatus(`Copied ${entries.length} ${itemName} entr${entries.length === 1 ? "y" : "ies"}.`);
    } catch {
      setStatus("Could not access the clipboard. Check your browser permissions and try again.");
    }
  }

  const groupEntries = groups?.find((group) => group.label === selectedGroup)?.entries ?? [];

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <aside className={styles.control}>
      <button
        className={styles.trigger}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close copy links panel" : "Open copy links panel"}
      >
        <span aria-hidden="true">{isOpen ? "×" : "+"}</span>
        {isOpen ? "Close" : "Copy links"}
      </button>
      {isOpen ? (
        <div className={styles.panel}>
          <label className={styles.field}>
            <span>List title</span>
            <input value={customTitle} onChange={(event) => setCustomTitle(event.target.value)} placeholder={groupTitle} />
          </label>
          {groups?.length ? (
            <label className={styles.field}>
              <span>Project group</span>
              <select value={selectedGroup} onChange={(event) => setSelectedGroup(event.target.value)}>
                {groups.map((group) => <option key={group.label} value={group.label}>{group.label}</option>)}
              </select>
            </label>
          ) : null}
          <label className={styles.field}>
            <span>Output format</span>
            <select value={format} onChange={(event) => setFormat(event.target.value as typeof format)}>
              <option value="details">Detailed list</option>
              <option value="markdown">Markdown links</option>
              <option value="urls">URLs only</option>
            </select>
          </label>
          <label className={styles.option}>
            <input type="checkbox" checked={includeTitle} onChange={(event) => setIncludeTitle(event.target.checked)} />
            <span>Include title</span>
          </label>
          <label className={styles.option}>
            <input type="checkbox" checked={includeCategories} onChange={(event) => setIncludeCategories(event.target.checked)} />
            <span>Include categories</span>
          </label>
          <div className={styles.actions}>
            <button className="button button--dark button--small" type="button" onClick={() => copyEntries(allEntries)} disabled={!allEntries.length}>
              Copy all
            </button>
            {groups?.length ? (
              <button className="button button--ghost button--small" type="button" onClick={() => copyEntries(groupEntries, groupTitle)} disabled={!groupEntries.length}>
                Copy group
              </button>
            ) : null}
          </div>
          <span className={styles.status} aria-live="polite">{status}</span>
        </div>
      ) : null}
    </aside>,
    document.body,
  );
}