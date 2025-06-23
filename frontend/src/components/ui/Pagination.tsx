// src\components\ui\Pagination.tsx

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 4) pages.push("...");

    const start = Math.max(2, currentPage - 2);
    const end = Math.min(totalPages - 1, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) pages.push("...");

    pages.push(totalPages);
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      className="flex flex-wrap-reverse justify-center items-center gap-2 mt-6"
      role="navigation"
      aria-label="Paginação"
    >
      {/* Botão Anterior */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="text-sm px-3 py-1 border rounded transition hover:bg-muted disabled:opacity-50"
        aria-label="Página anterior"
      >
        Anterior
      </button>

      {/* Numeração – visível em telas médias para cima */}
      <div className="hidden sm:flex items-center gap-2">
        {pageNumbers.map((page, idx) =>
          typeof page === "number" ? (
            <button
              key={idx}
              onClick={() => onPageChange(page)}
              aria-label={`Ir para a página ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
              className={`text-sm px-3 py-1 border rounded transition hover:bg-muted ${page === currentPage
                ? "bg-primary text-primary-foreground font-semibold"
                : ""
                }`}
            >
              {page}
            </button>
          ) : (
            <span
              key={idx}
              className="text-sm px-2 text-muted-foreground select-none"
              aria-hidden="true"
            >
              …
            </span>
          )
        )}
      </div>

      {/* Página atual – visível apenas em mobile */}
      <span className="sm:hidden text-sm px-3 text-muted-foreground select-none">
        Página {currentPage} de {totalPages}
      </span>

      {/* Botão Próximo */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="text-sm px-3 py-1 border rounded transition hover:bg-muted disabled:opacity-50"
        aria-label="Próxima página"
      >
        Próximo
      </button>

      {/* Dropdown para navegação direta */}
      <div className="flex items-center gap-2 shrink-0">
        <Select
          value={String(currentPage)}
          onValueChange={(value) => onPageChange(Number(value))}
        >
          <SelectTrigger className="w-[160px] text-sm">
            <SelectValue placeholder="Ir para página" />
          </SelectTrigger>
          <SelectContent
            className="max-h-[200px] sm:max-h-[300px] md:max-h-[400px] overflow-y-auto"
          >
            {Array.from({ length: totalPages }, (_, i) => (
              <SelectItem key={i + 1} value={String(i + 1)}>
                Página {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </nav>
  );
};

export default Pagination;
