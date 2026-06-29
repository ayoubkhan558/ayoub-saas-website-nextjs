import Link from "next/link";
import styles from "./Pagination.module.scss";

function pageHref(basePath: string, page: number, anchorId?: string) {
  const [pathname, queryString = ""] = basePath.split("?");
  const params = new URLSearchParams(queryString);

  if (page <= 1) {
    params.delete("page");
  } else {
    params.set("page", String(page));
  }

  const query = params.toString();
  const path = query ? `${pathname}?${query}` : pathname;
  return anchorId ? `${path}#${anchorId}` : path;
}

function getVisiblePages(currentPage: number, totalPages: number) {
  const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
  return Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);
}

export function Pagination({
  basePath,
  currentPage,
  anchorId,
  totalPages,
}: {
  basePath: string;
  currentPage: number;
  anchorId?: string;
  totalPages: number;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getVisiblePages(currentPage, totalPages);
  let previousPage = 0;

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <Link
        className={`${styles.pagination__link} ${currentPage <= 1 ? styles["pagination__link--disabled"] : ""}`}
        href={pageHref(basePath, Math.max(1, currentPage - 1), anchorId)}
        aria-disabled={currentPage <= 1}
      >
        Previous
      </Link>
      <div className={styles.pagination__pages}>
        {pages.map((page) => {
          const showGap = previousPage > 0 && page - previousPage > 1;
          previousPage = page;

          return (
            <span className={styles.pagination__group} key={page}>
              {showGap ? <span className={styles.pagination__ellipsis}>...</span> : null}
              <Link
                className={`${styles.pagination__page} ${page === currentPage ? styles["pagination__page--active"] : ""}`}
                href={pageHref(basePath, page, anchorId)}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </Link>
            </span>
          );
        })}
      </div>
      <Link
        className={`${styles.pagination__link} ${currentPage >= totalPages ? styles["pagination__link--disabled"] : ""}`}
        href={pageHref(basePath, Math.min(totalPages, currentPage + 1), anchorId)}
        aria-disabled={currentPage >= totalPages}
      >
        Next
      </Link>
    </nav>
  );
}
