// src/features/clients/services/fetchOrdersCountByCustomer.ts

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type OrdersCount = {
  customerId: number;
  totalOrders: number;
};

export const fetchOrdersCountByCustomer = async (
  status?: string
): Promise<OrdersCount[]> => {
  const token = localStorage.getItem("access_token");

  const query = status ? `?status=${encodeURIComponent(status)}` : "";

  const res = await fetch(`${BASE_URL}/api/orders/count-by-customer${query}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error("Erro ao buscar contagem de pedidos: " + errorText);
  }

  return res.json();
};
