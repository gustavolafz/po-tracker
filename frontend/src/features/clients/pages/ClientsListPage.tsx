// src/features/clients/pages/ClientsListPage.tsx

import { useRef, useState, useEffect } from "react";
import { usePersistentPagination } from "@/hooks/usePersistentPagination";
import DashboardHeader from "@/components/layout/header/DashboardHeader";
import ClientListSection from "@/features/clients/components/ClientListSection";
import { Loader2 } from "lucide-react";
import IconSelect from "@/components/ui/IconSelect";
import { Input } from "@/components/ui/input";
import { useFilteredCustomers } from "@/features/clients/hooks/useFilteredCustomers";

const PAGE_SIZE = 20;

const ClientsList = () => {
  const {
    currentPage,
    handlePageChange,
    setCurrentPage,
  } = usePersistentPagination(`${window.location.pathname}-clients`);

  const [ordem, setOrdem] = useState("nenhuma");
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    customers,
    total,
    loading,
    searchTerm,
    setSearchTerm,
    clearSearch,
  } = useFilteredCustomers({
    page: currentPage,
    limit: PAGE_SIZE,
    ordem,
  });

  const handleClearSearch = () => {
    clearSearch();
    inputRef.current?.focus();
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      <DashboardHeader description="Lista completa de clientes e suas informações." />

      {/* Campo de busca e ordenação */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Buscar por nome ou ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-sm"
        />

        <IconSelect
          value={ordem}
          onChange={setOrdem}
          placeholder="Ordenar por número de pedidos"
          options={[
            { label: "Sem ordenação", value: "nenhuma", color: "text-gray-400" },
            { label: "Maior número de pedidos", value: "maior", color: "text-orange-500" },
            { label: "Menor número de pedidos", value: "menor", color: "text-blue-500" },
          ]}
          useNeutralDefault
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-20">
          <Loader2 className="h-6 w-6 text-primary animate-spin mr-2" />
          <p className="text-muted-foreground">Carregando clientes...</p>
        </div>
      ) : (
        <ClientListSection
          clientes={customers}
          total={total}
          currentPage={currentPage}
          pageSize={PAGE_SIZE}
          onPageChange={handlePageChange}
          onClearSearch={handleClearSearch}
          isFiltered={!!searchTerm}
        />
      )}
    </div>
  );
};

export default ClientsList;
