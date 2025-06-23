// src\features\auth\services\authApi.ts

import type { UserType } from "@/routes/constants/userTypes";

export interface ParsedLoginResponse {
  token: string;
  role: UserType;
  name: string;
}

export const login = async (
  email: string,
  password: string
): Promise<ParsedLoginResponse> => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ UserEmail: email, password }),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Erro ao fazer login");
  }

  const data = await res.json();

  return {
    token: data.token.access_token,
    role: data.user.role,
    name: data.user.name,
  };
};
