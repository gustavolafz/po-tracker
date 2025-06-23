// src/features/clients/components/ClientListSection.tsx

import ClientCardList from "./ClientCardList";
import Pagination from "@/components/ui/Pagination";
import EmptySearchResult from "@/components/ui/EmptySearchResult";
import EmptyClientList from "@/components/ui/EmptyClientList";
import { useNavigate } from "react-router-dom";
import type { Cliente } from "@/features/clients/types";
import type { PropsClientListSection } from "@/features/clients/types";
import { fetchOrdersCountByCustomer } from "../services/fetchOrdersCountByCustomer";
import { useEffect, useState } from "react";

const ClientListSection = ({
  clientes,
  total,
  currentPage,
  pageSize,
  isFiltered = false,
  onPageChange,
  onClearSearch,
}: PropsClientListSection) => {
  const navigate = useNavigate();

  const noResults = clientes.length === 0;

  const handleVerMaisClick = (cliente: Cliente) => {
    navigate(`/cliente/${cliente.CustomerID}/pedidos`);
  };

  const [ordersCountMap, setOrdersCountMap] = useState<Record<number, number>>({});

  useEffect(() => {
    fetchOrdersCountByCustomer()
      .then((counts) => {
        const map: Record<number, number> = {};
        counts.forEach(({ customerId, totalOrders }) => {
          map[customerId] = totalOrders;
        });
        setOrdersCountMap(map);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="flex-1 space-y-6">
      <div className="border rounded-lg p-4 text-sm text-muted-foreground space-y-6">
        {!noResults ? (
          <>
            <div className="text-sm text-muted-foreground">
              Página {currentPage} de {Math.ceil(total / pageSize)}
            </div>
            <ClientCardList
              clientes={clientes}
              onClientOrdersClick={handleVerMaisClick}
              ordersCount={ordersCountMap}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(total / pageSize)}
              onPageChange={onPageChange}
            />
          </>
        ) : isFiltered ? (
          <EmptySearchResult onClear={onClearSearch} />
        ) : (
          <EmptyClientList />
        )}
      </div>
    </div>
  );
};

export default ClientListSection;
