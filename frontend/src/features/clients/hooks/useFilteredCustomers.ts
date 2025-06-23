// src/features/clients/hooks/useFilteredCustomers.ts

import { useEffect, useState } from "react";
import { fetchCustomers } from "@/features/clients/services/fetchCustomers";
import type { Cliente } from "@/features/clients/types";
import { useDebounce } from "@/hooks/useDebounce";

type Params = {
  page: number;
  limit: number;
  ordem: string;
  minLength?: number;
};

export function useFilteredCustomers({ page, limit, ordem, minLength = 2 }: Params) {
  const [customers, setCustomers] = useState<Cliente[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm.trim(), 500);

  useEffect(() => {
    const isValidTerm = debouncedSearchTerm.length >= minLength || debouncedSearchTerm === "";

    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchCustomers({
          page,
          limit,
          ordem,
          search: isValidTerm ? debouncedSearchTerm : "",
        });
        setCustomers(data.items);
        setTotal(data.total);
      } catch (err) {
        console.error("Erro ao carregar customers:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [page, limit, ordem, debouncedSearchTerm, minLength]);

  const clearSearch = () => setSearchTerm("");

  return {
    customers,
    total,
    loading,
    searchTerm,
    setSearchTerm,
    clearSearch,
  };
}
