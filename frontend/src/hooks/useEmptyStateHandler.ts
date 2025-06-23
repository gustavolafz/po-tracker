// src/hooks/useEmptyStateHandler.ts

import { useMemo } from "react";

type Options = {
  originalLength: number;
  filteredLength: number;
  searchTerm: string;
};

/**
 * Retorna o tipo de estado vazio que deve ser renderizado:
 * - 'none' → render normal
 * - 'search' → filtro ativo sem resultados
 * - 'empty' → lista original vazia
 */
export function useEmptyStateHandler({ originalLength, filteredLength, searchTerm }: Options) {
  return useMemo(() => {
    if (filteredLength > 0) return "none";
    if (originalLength === 0) return "empty";
    if (searchTerm.trim() !== "") return "search";
    return "none";
  }, [originalLength, filteredLength, searchTerm]);
}
