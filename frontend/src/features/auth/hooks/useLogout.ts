// src\features\auth\hooks\useLogout.ts

import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { showCustomToast } from "@/components/toasts/CustomToast";
import { LogOut } from "lucide-react";

export const useLogout = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  return async () => {
    await signOut();

    showCustomToast({
      title: "Logout realizado com sucesso",
      description: "Você foi desconectado da sessão simulada.",
      icon: LogOut,
      iconColor: "text-primary",
    });

    navigate("/login", { replace: true });
  };
};
