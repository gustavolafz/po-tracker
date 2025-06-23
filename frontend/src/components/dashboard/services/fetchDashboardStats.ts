// src/features/dashboard/services/fetchDashboardStats.ts

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchDashboardStats = async () => {
  const token = localStorage.getItem("access_token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const res = await fetch(`${BASE_URL}/api/dashboard/stats`, { headers });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error("Erro ao carregar estatísticas do dashboard: " + errorText);
  }

  const data = await res.json();

  return {
    totalOrders: data.totalOrders,
    totalClients: data.totalClients,
    approvedOrders: data.approvedOrders,
    pendingOrders: data.pendingOrders,
    lateOrders: data.lateOrders,
  };
};
