// src/features/purchase-order/pages/AllPurchaseOrders.tsx

import { useState, useEffect } from "react";
import { PurchaseOrderStatus } from "@/features/purchase-order";
import PurchaseOrderListSection from "@/features/purchase-order/components/PurchaseOrderListSection";
import DashboardHeader from "@/components/layout/header/DashboardHeader";
import { usePersistentPagination } from "@/hooks/usePersistentPagination";
import { useFilteredPurchaseOrders } from "@/features/purchase-order/hooks/useFilteredPurchaseOrders";
import type { PurchaseOrder } from "@/features/purchase-order/types";
import { Input } from "@/components/ui/input";
import StatusFilterSelect from "@/features/user-profile/components/ui/StatusFilterSelect";
import { Loader2 } from "lucide-react";

const PAGE_SIZE = 20;

const AllPurchaseOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null);

  const {
    currentPage,
    handlePageChange,
    setCurrentPage,
  } = usePersistentPagination(`${window.location.pathname}-purchase-orders`);

  const {
    orders,
    total,
    loading,
    searchTerm,
    setSearchTerm,
    statusFiltro,
    setStatusFiltro,
    clearSearch,
    inputRef,
  } = useFilteredPurchaseOrders({
    page: currentPage,
    limit: PAGE_SIZE,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFiltro]);

  const handleVerMais = (pedido: PurchaseOrder) => setSelectedOrder(pedido);
  const handleFecharDetalhes = () => setSelectedOrder(null);

  return (
    <div className="space-y-6">
      <DashboardHeader description="Visualização geral de todas as ordens de compra registradas no sistema." />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          {/* Filtros */}
          <div className="flex gap-2 mb-4">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Buscar por número do caso..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-sm"
            />
            <StatusFilterSelect
              statusSelecionado={statusFiltro}
              onChange={setStatusFiltro}
            />
          </div>

          {/* Conteúdo */}
          {loading ? (
            <div className="flex items-center justify-center h-20">
              <Loader2 className="h-6 w-6 text-primary animate-spin mr-2" />
              <p className="text-muted-foreground">Carregando pedidos...</p>
            </div>
          ) : (
            <PurchaseOrderListSection
              pedidos={orders}
              total={total}
              currentPage={currentPage}
              pageSize={PAGE_SIZE}
              onPageChange={handlePageChange}
              onVerMaisClick={handleVerMais}
              isFiltered={!!searchTerm || !!statusFiltro}
              onClearSearch={clearSearch}
            />
          )}
        </div>

        {/* Detalhes do pedido selecionado */}
        {selectedOrder && (
          <div className="w-full lg:w-80 shrink-0 self-start">
            <PurchaseOrderStatus onClose={handleFecharDetalhes} {...selectedOrder} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPurchaseOrders;
