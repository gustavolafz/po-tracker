// src/features/clients/services/addCustomerComment.ts

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function addCustomerComment(customerId: number, comment: string): Promise<void> {
  const token = localStorage.getItem("access_token");

  const res = await fetch(`${BASE_URL}/api/customers/${customerId}/comment`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ comment }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error("Erro ao adicionar comentário: " + error);
  }
}
