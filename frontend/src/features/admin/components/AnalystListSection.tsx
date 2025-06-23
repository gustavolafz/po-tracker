// src\features\admin\components\AnalystListSection.tsx

import { useEffect, useRef, useState } from "react";
import { usePersistentPagination } from "@/hooks/usePersistentPagination";
import AnalystCardList from "./AnalystCardList";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import EmptySearchResult from "@/components/ui/EmptySearchResult";
import EmptyAnalystList from "@/components/ui/EmptyAnalystList";
import Pagination from "@/components/ui/Pagination";
import { fetchUsers } from "@/features/admin/services/fetchUsers";
import type { Analyst } from "@/features/admin/types";
import IconSelect from "@/components/ui/IconSelect";

const PAGE_SIZE = 20;

const AnalystListSection = () => {
  const [analysts, setAnalysts] = useState<Analyst[]>([]);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [ordem, setOrdem] = useState("nenhuma");

  const { currentPage, handlePageChange } = usePersistentPagination(
    `${window.location.pathname}-analyst`
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAnalysts = async () => {
      try {
        const data = await fetchUsers({
          page: currentPage,
          limit: PAGE_SIZE,
          ordem,
          search: searchTerm,
          role: "Analista",
        });
        setAnalysts(data.users);
        setTotal(data.total);
      } catch (error) {
        console.error("Erro ao carregar analistas:", error);
      }
    };

    loadAnalysts();
  }, [currentPage, ordem, searchTerm]);

  const handleVerMaisClick = () => {
    navigate(`/em-breve`);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    inputRef.current?.focus();
  };

  const isEmpty = total === 0;

  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Buscar por nome ou email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-sm"
        />

        <IconSelect
          value={ordem}
          onChange={setOrdem}
          placeholder="Ordenar por ID"
          options={[
            { label: "Sem ordenação", value: "nenhuma", color: "text-gray-400" },
            { label: "ID crescente", value: "menor", color: "text-blue-500" },
            { label: "ID decrescente", value: "maior", color: "text-orange-500" },
          ]}
          useNeutralDefault
        />
      </div>

      <div className="border rounded-lg p-4 text-sm text-muted-foreground space-y-6">
        {!isEmpty ? (
          <>
            <div aria-live="polite" className="text-sm text-muted-foreground">
              Página {currentPage} de {Math.ceil(total / PAGE_SIZE)}
            </div>
            <AnalystCardList
              analysts={analysts}
              onAnalystOrdersClick={handleVerMaisClick}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(total / PAGE_SIZE)}
              onPageChange={handlePageChange}
            />
          </>
        ) : searchTerm ? (
          <EmptySearchResult onClear={handleClearSearch} />
        ) : (
          <EmptyAnalystList />
        )}
      </div>
    </div>
  );
};

export default AnalystListSection;
