// src/features/clients/components/ClientPedidos.tsx

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ClientInfo from "./ClientInfo";
import PedidoAccordion from "../../purchase-order/components/PurchaseOrderAccordion";
import { Input } from "@/components/ui/input";
import StatusFilterSelect from "@/features/user-profile/components/ui/StatusFilterSelect";
import Pagination from "@/components/ui/Pagination";
import ErrorMessage from "@/components/ui/ErrorMessage";
import EmptyClientNotFound from "@/components/ui/EmptyClientNotFound";
import EmptySearchResult from "@/components/ui/EmptySearchResult";
import EmptyPedidosList from "@/components/ui/EmptyPedidosList";
import { Loader2 } from "lucide-react";
import { useEmptyStateHandler } from "@/hooks/useEmptyStateHandler";
import { usePersistentPagination } from "@/hooks/usePersistentPagination";
import { fetchOrdersByCustomerId } from "@/features/clients/services/fetchOrdersByCustomerId";
import type { PropsClientPedidos, PurchaseOrder } from "@/features/clients/types";
import { useCustomerById } from "../hooks/useCustomerById";

const PAGE_SIZE = 20;

const ClientPedidos = ({
  onVerMaisClick,
  onVerCadastroClick,
}: PropsClientPedidos) => {
  const { id } = useParams();
  const customerId = Number(id);

  const { data: clienteSelecionado, isLoading: loadingCliente, isError } = useCustomerById(customerId);

  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [total, setTotal] = useState(0);
  const [statusSelecionado, setStatusSelecionado] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const {
    currentPage,
    handlePageChange,
    setCurrentPage,
  } = usePersistentPagination(`${window.location.pathname}-client-orders`);

  useEffect(() => {
    if (!isNaN(customerId) && customerId > 0) {
      const offset = (currentPage - 1) * PAGE_SIZE;
      setLoading(true);
      setErro(null);
      fetchOrdersByCustomerId(customerId, PAGE_SIZE, offset)
        .then(({ items, total }) => {
          setOrders(items);
          setTotal(total);
        })
        .catch(() => {
          setErro("Erro ao carregar pedidos do cliente.");
        })
        .finally(() => setLoading(false));
    }
  }, [customerId, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusSelecionado, searchTerm]);

  const filtered = orders.filter((p) => {
    const matchStatus = statusSelecionado ? p.status === statusSelecionado : true;
    const matchSearch =
      !searchTerm ||
      p.caseNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.createdAt?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchStatus && matchSearch;
  });

  const emptyState = useEmptyStateHandler({
    originalLength: orders.length,
    filteredLength: filtered.length,
    searchTerm,
  });

  const handleClearSearch = () => {
    setSearchTerm("");
    inputRef.current?.focus();
  };

  if (loading || loadingCliente) {
    return (
      <div className="flex-1 flex items-center justify-center h-40 text-muted-foreground space-x-2">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
        <span className="text-sm">Carregando pedidos do cliente...</span>
      </div>
    );
  }

  if (isError || !clienteSelecionado) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <EmptyClientNotFound />
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6">
      <ClientInfo cliente={clienteSelecionado} onVerCadastroClick={onVerCadastroClick} />

      <div className="flex gap-2">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Buscar por número, data ou chave..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-sm"
        />

        <StatusFilterSelect
          statusSelecionado={statusSelecionado}
          onChange={(value) => setStatusSelecionado(value)}
        />
      </div>

      <div className="border rounded-lg p-4 text-sm text-muted-foreground">
        {erro ? (
          <ErrorMessage message={erro} onRetry={() => setCurrentPage(1)} />
        ) : emptyState === "none" ? (
          <>
            <PedidoAccordion pedidos={filtered} onVerMaisClick={onVerMaisClick} />
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(total / PAGE_SIZE)}
              onPageChange={handlePageChange}
            />
          </>
        ) : emptyState === "search" ? (
          <EmptySearchResult onClear={searchTerm ? handleClearSearch : undefined} />
        ) : (
          <EmptyPedidosList />
        )}
      </div>
    </div>
  );
};

export default ClientPedidos;
