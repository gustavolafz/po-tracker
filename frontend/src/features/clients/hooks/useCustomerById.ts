// src/features/clients/hooks/useCustomerById.ts

import { useQuery } from "@tanstack/react-query";

export const useCustomerById = (id: number) => {
  return useQuery({
    queryKey: ["customer", id],
    queryFn: async () => {
      const token = localStorage.getItem("access_token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/customers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Cliente não encontrado");
      return res.json();
    },
    enabled: !!id,
  });
};
