// src/features/dashboard/services/fetchStatusDistribution.ts

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchStatusDistribution = async (): Promise<{ name: string; value: number }[]> => {
  const token = localStorage.getItem("access_token");

  const res = await fetch(`${BASE_URL}/api/dashboard/status-distribution`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar distribuição de status");
  }

  return res.json();
};
