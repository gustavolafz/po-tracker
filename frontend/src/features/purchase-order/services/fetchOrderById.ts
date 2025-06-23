// src\features\purchase-order\services\fetchOrderById.ts

import type { PurchaseOrder } from "@/features/purchase-order/types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getStatusPriority = (status: string): number => {
  switch (status) {
    case "Atrasado":
      return 0;
    case "Em Andamento":
      return 1;
    case "Resolvido":
      return 2;
    default:
      return 99;
  }
};

export const fetchOrderById = async (id: number): Promise<PurchaseOrder> => {
  if (!id || id <= 0) throw new Error("ID inválido");

  const token = localStorage.getItem("access_token");

  const res = await fetch(`${BASE_URL}/api/orders/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const erro = await res.text();
    throw new Error("Erro ao buscar pedido: " + erro);
  }

  const data = await res.json();

  return {
    orderId: data.id,
    caseNumber: data.case,
    status: data.status,
    customerId: data.customer_id,
    comments: data.comments,
    createdAt: data.created_at,
    fase: data.fase ?? [],
    statusPriority: getStatusPriority(data.status), // campo adicional opcional
  };
};
