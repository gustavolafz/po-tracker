// src/features/clients/pages/ClientDetailsPage.tsx

import { useEffect, useState } from "react";
import { fetchCustomers } from "@/features/clients/services/fetchCustomers";
import { PurchaseOrderStatus } from "@/features/purchase-order";
import DashboardHeader from "@/components/layout/header/DashboardHeader";
import { ClientPedidos, ClientDetailsDialog } from "@/features/clients";
import type { Cliente, PurchaseOrder } from "@/features/clients/types";

const ClientInfos = () => {
  const [, setClientes] = useState<Cliente[]>([]);
  const [statusSelecionado, setStatusSelecionado] = useState<PurchaseOrder | null>(null);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);

  useEffect(() => {
    fetchCustomers({ page: 1, limit: 100, ordem: "CustomerID" })
      .then((res) => setClientes(res.items))
      .catch((err) => console.error("Erro ao buscar clientes:", err));
  }, []);

  const handleVerMais = (pedido: PurchaseOrder) => setStatusSelecionado(pedido);
  const handleVerCadastro = (cliente: Cliente) => setClienteSelecionado(cliente);
  const handleFecharStatus = () => setStatusSelecionado(null);
  const handleFecharDialog = () => setClienteSelecionado(null);

  return (
    <div className="space-y-6">
      <DashboardHeader description="Resumo dos pedidos e status de entrega do cliente." />

      <div className="flex flex-col lg:flex-row gap-6">
        <ClientPedidos
          onVerMaisClick={handleVerMais}
          onVerCadastroClick={handleVerCadastro}
        />

        {statusSelecionado && (
          <div className="w-full lg:w-80 shrink-0 self-start">
            <PurchaseOrderStatus onClose={handleFecharStatus} {...statusSelecionado} />
          </div>
        )}
      </div>

      <ClientDetailsDialog
        open={!!clienteSelecionado}
        onClose={handleFecharDialog}
        {...(clienteSelecionado ?? {
          CustomerID: 0,
          CustomerName: "",
          CustomerComments: null,
        })}
      />
    </div>
  );
};

export default ClientInfos;
