// src/features/purchase-order/components/PurchaseOrderListSection.tsx

import PurchaseOrderAccordion from "@/features/purchase-order/components/PurchaseOrderAccordion";
import EmptyAllOrders from "@/components/ui/EmptyAllOrders";
import EmptySearchResult from "@/components/ui/EmptySearchResult";
import Pagination from "@/components/ui/Pagination";
import type { PurchaseOrder } from "@/features/purchase-order/types";

type Props = {
  pedidos: PurchaseOrder[];
  total: number;
  currentPage: number;
  pageSize: number;
  isFiltered?: boolean;
  onClearSearch?: () => void;
  onPageChange: (page: number) => void;
  onVerMaisClick: (pedido: PurchaseOrder) => void;
};

const PurchaseOrderListSection = ({
  pedidos,
  total,
  currentPage,
  pageSize,
  isFiltered = false,
  onClearSearch,
  onPageChange,
  onVerMaisClick,
}: Props) => {
  const isEmpty = total === 0;

  return (
    <div className="border rounded-lg p-4 text-sm text-muted-foreground space-y-6">
      {!isEmpty ? (
        <>
          <div aria-live="polite" className="text-sm text-muted-foreground">
            Página {currentPage} de {Math.ceil(total / pageSize)}
          </div>
          <PurchaseOrderAccordion pedidos={pedidos} onVerMaisClick={onVerMaisClick} />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(total / pageSize)}
            onPageChange={onPageChange}
          />
        </>
      ) : isFiltered ? (
        <EmptySearchResult
          title="Nenhum pedido encontrado"
          description="Tente ajustar o número do caso ou o status selecionado."
          onClear={onClearSearch}
        />
      ) : (
        <EmptyAllOrders />
      )}
    </div>
  );
};

export default PurchaseOrderListSection;
