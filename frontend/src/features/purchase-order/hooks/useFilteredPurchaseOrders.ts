// src/features/purchase-order/hooks/useFilteredPurchaseOrders.ts

import { useEffect, useState, useRef } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { fetchOrders } from "@/features/purchase-order/services/fetchOrders";
import type { PurchaseOrder } from "@/features/purchase-order/types";

type Params = {
  page: number;
  limit: number;
};

export function useFilteredPurchaseOrders({ page, limit }: Params) {
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearchTerm = useDebounce(searchTerm.trim(), 500);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetchOrders({
          page,
          limit,
          caseNumber: debouncedSearchTerm,
          status: statusFiltro,
        });
        setOrders(res.orders);
        setTotal(res.total);
      } catch (err) {
        console.error("Erro ao buscar pedidos:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [page, limit, debouncedSearchTerm, statusFiltro]);

  const clearSearch = () => {
    setSearchTerm("");
    inputRef.current?.focus();
  };

  return {
    orders,
    total,
    loading,
    searchTerm,
    setSearchTerm,
    statusFiltro,
    setStatusFiltro,
    clearSearch,
    inputRef,
  };
}
