// src/hooks/usePersistentPagination.tsx

import { useState } from "react";

export function usePersistentPagination(baseKey: string) {
  const PAGE_KEY = `${baseKey}-page`;

  const [currentPage, setCurrentPage] = useState(() => {
    const saved = localStorage.getItem(PAGE_KEY);
    return saved ? Number(saved) : 1;
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    localStorage.setItem(PAGE_KEY, page.toString());
  };

  return {
    currentPage,
    handlePageChange,
    setCurrentPage,
  };
}
