// src/features/auth/hooks/useLogin.ts

import { useState } from "react";
import { login as loginApi } from "@/features/auth/services/authApi";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { ParsedLoginResponse } from "@/features/auth/services/authApi";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { loginReal } = useAuth();

  const login = async (
    email: string,
    password: string
  ): Promise<ParsedLoginResponse> => {
    setLoading(true);

    try {
      const { token, role, name } = await loginApi(email, password);
      loginReal(token, email, role, name);
      setError(null);
      return { token, role, name };
    } catch (err: any) {
      const msg = err?.message?.toLowerCase() || "";
      if (msg.includes("senha") || msg.includes("usuário") || msg.includes("login")) {
        setError(err.message);
      } else {
        setError(null);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
