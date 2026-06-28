export function getPageNumber(value: string | string[] | undefined) {
  const rawValue = Array.isArray(value) ? value[0] : value;
  const page = Number(rawValue ?? 1);

  if (!Number.isFinite(page) || page < 1) {
    return 1;
  }

  return Math.floor(page);
}

export function paginate<T>(items: T[], currentPage: number, perPage: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const start = (safePage - 1) * perPage;

  return {
    currentPage: safePage,
    totalPages,
    items: items.slice(start, start + perPage),
    totalItems: items.length,
    startItem: items.length ? start + 1 : 0,
    endItem: Math.min(start + perPage, items.length),
  };
}
