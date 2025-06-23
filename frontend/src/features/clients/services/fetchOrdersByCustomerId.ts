// src/features/clients/services/fetchOrdersByCustomerId.ts

import type { PurchaseOrder } from "@/features/purchase-order/types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchOrdersByCustomerId = async (
  customerId: number,
  limit: number,
  offset: number
): Promise<{ items: PurchaseOrder[]; total: number }> => {
  if (!customerId || customerId <= 0) throw new Error("ID de cliente inválido");

  const token = localStorage.getItem("access_token");

  const query = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
  });

  const res = await fetch(
    `${BASE_URL}/api/customers/${customerId}/orders?${query}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const erro = await res.text();
    throw new Error("Erro ao buscar pedidos: " + erro);
  }

  const data = await res.json();

  return {
    items: data.orders.map((order: any) => ({
      orderId: order.OrderID,
      caseNumber: order.CaseNumber,
      customerId,
      status: order.OrderStatus,
      comments: order.OrderComments,
      createdAt: order.CreationDate,
      fase: order.OrderFase ?? [],
    })),
    total: data.total,
  };
};
