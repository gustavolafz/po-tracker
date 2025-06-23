// src\features\purchase-order\services\fetchOrders.ts

import type { PurchaseOrder } from "../types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchOrders = async ({
  page,
  limit,
  orderBy = "status_priority",
  orderDir = "asc",
  caseNumber = "",
  status = "",
  customerId,
}: {
  page: number;
  limit: number;
  orderBy?: string;
  orderDir?: "asc" | "desc";
  caseNumber?: string;
  status?: string;
  customerId?: number;
}): Promise<{ total: number; count: number; orders: PurchaseOrder[] }> => {
  const pageSafe = Number.isInteger(page) && page > 0 ? page : 1;
  const limitSafe = Number.isInteger(limit) && limit > 0 ? limit : 20;
  const offset = (pageSafe - 1) * limitSafe;

  const query = new URLSearchParams({
    limit: limitSafe.toString(),
    offset: offset.toString(),
    order_by: orderBy,
    order_dir: orderDir,
  });

  if (caseNumber) query.append("case", caseNumber);
  if (status) query.append("status", status);
  if (customerId !== undefined) query.append("customer_id", customerId.toString());

  const token = localStorage.getItem("access_token");

  const res = await fetch(`${BASE_URL}/api/orders?${query}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const erro = await res.text();
    throw new Error("Erro ao buscar pedidos: " + erro);
  }

  const data = await res.json();

  const orders: PurchaseOrder[] = data.orders.map((o: any) => ({
    orderId: o.id,
    caseNumber: o.case,
    status: o.status,
    customerId: o.customer_id,
    comments: o.comments,
    createdAt: o.created_at,
    fase: o.fase ?? [],
  }));

  return {
    total: data.total,
    count: data.count,
    orders,
  };
};
