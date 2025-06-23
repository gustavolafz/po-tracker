// src\features\clients\services\fetchCustomers.ts

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchCustomers = async ({
  page,
  limit,
  ordem,
  search = "",
}: {
  page: number;
  limit: number;
  ordem: string;
  search?: string;
}) => {
  const offset = (page - 1) * limit;

  // Lógica específica para ordenar por número de pedidos
  let order_by = "CustomerID";
  let order_dir: "asc" | "desc" = "asc";

  if (ordem === "maior" || ordem === "menor") {
    order_by = "total_orders";
    order_dir = ordem === "maior" ? "desc" : "asc";
  } else if (ordem && ordem !== "nenhuma") {
    order_by = ordem;
  }

  const query = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
    name: search,
    order_by,
    order_dir,
  });

  const token = localStorage.getItem("access_token");

  const res = await fetch(`${BASE_URL}/api/customers?${query}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Erro ao buscar clientes");

  return await res.json();
};
