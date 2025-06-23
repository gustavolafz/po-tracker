// src/components/pages/NotFound.tsx
// Descrição: Página 404 estilizada com ícone, mensagem amigável e link para voltar.

import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center space-y-4 text-muted-foreground">
      <AlertTriangle className="w-10 h-10 text-destructive" />
      <div>
        <h1 className="text-2xl font-semibold">Página não encontrada</h1>
        <p className="text-sm mt-1">
          A rota que você tentou acessar não existe ou foi removida.
        </p>
      </div>
      <Link
        to="/"
        className="text-sm text-primary hover:underline transition-colors"
      >
        ← Voltar para a página inicial
      </Link>
    </div>
  );
};

export default NotFound;
