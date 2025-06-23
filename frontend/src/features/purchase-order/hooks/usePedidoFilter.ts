// hooks/usePedidoFilter.ts

import { useState, useMemo } from "react";
import type { PurchaseOrder } from "@/features/clients/types";

export function usePedidoFilter(pedidos: PurchaseOrder[]) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPedidos = useMemo(() => {
    const termo = searchTerm.trim().toLowerCase();

    return pedidos.filter((pedido) =>
      ((pedido.caseNumber ?? "").toLowerCase().includes(termo)) ||
      ((pedido.createdAt ?? "").toLowerCase().includes(termo)) ||
      ((pedido.comments ?? "").toLowerCase().includes(termo))
    );
  }, [searchTerm, pedidos]);

  return { searchTerm, setSearchTerm, filteredPedidos };
}
