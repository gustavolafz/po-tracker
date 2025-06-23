// src\features\admin\services\fetchUsers.ts

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchUsers = async ({
  page,
  limit,
  ordem,
  search = "",
  email = "",
  role = "",
}: {
  page: number;
  limit: number;
  ordem: string;
  search?: string;
  email?: string;
  role?: string;
}) => {
  const offset = (page - 1) * limit;
  const order_by = ordem === "maior" || ordem === "menor" ? "UserID" : ordem || "UserID";
  const order_dir = ordem === "maior" ? "desc" : "asc";

  const query = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
    name: search,
    email,
    role,
    order_by,
    order_dir,
  });

  const res = await fetch(`${BASE_URL}/api/users?${query}`);
  if (!res.ok) throw new Error("Erro ao buscar usuários");
  return res.json();
};
