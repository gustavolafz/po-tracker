// src\components\system\ErrorFallback.tsx

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  error: Error;
  resetErrorBoundary: () => void;
};

export function ErrorFallback({ error, resetErrorBoundary }: Props) {
  const handleRedirect = () => {
    resetErrorBoundary();
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center text-muted-foreground px-4 py-10">
      <AlertTriangle className="w-10 h-10 text-destructive mb-4" />
      <div className="flex flex-col items-center space-y-4 max-w-md">
        <h1 className="text-4xl font-bold text-destructive">Algo deu errado</h1>

        <p className="text-muted-foreground">
          Ocorreu um erro inesperado durante a execução da aplicação.
        </p>

        <p className="text-xs text-muted-foreground italic">
          Se você acredita que isso é um erro, entre em contato com o suporte.
        </p>

        {import.meta.env.DEV && (
          <div className="bg-muted text-muted-foreground text-xs p-3 rounded-md w-full max-w-md overflow-x-auto">
            {error.message}
          </div>
        )}

        <Button onClick={handleRedirect}>Ir para página inicial</Button>
      </div>
    </div>
  );
}
