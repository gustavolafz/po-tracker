import { useState, useMemo } from "react";
import type { Cliente } from "@/features/clients/types";

export function useClienteFilter(clientes: Cliente[]) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClientes = useMemo(() => {
    const termo = searchTerm.trim().toLowerCase();

    return clientes.filter((cliente) =>
      (cliente.CustomerName?.toLowerCase().includes(termo) ?? false) ||
      String(cliente.CustomerID).includes(termo)
    );
  }, [searchTerm, clientes]);

  return { searchTerm, setSearchTerm, filteredClientes };
}
