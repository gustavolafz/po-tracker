// src\features\auth\pages\ForbiddenPage.tsx

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { AlertTriangle } from "lucide-react";

export const ForbiddenPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleRedirect = () => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center text-muted-foreground px-4 py-10">
      <AlertTriangle className="w-10 h-10 text-destructive" />
      <div className="flex flex-col items-center space-y-4 max-w-md">
        <h1 className="text-4xl font-bold text-destructive">Acesso negado</h1>

        <p className="text-muted-foreground">
          Você não tem permissão para acessar esta página com o seu tipo de usuário.
        </p>

        <p className="text-xs text-muted-foreground italic">
          Se você acredita que isso é um erro, entre em contato com o suporte.
        </p>

        <Button onClick={handleRedirect}>Ir para página inicial</Button>
      </div>
    </div>
  );
};
