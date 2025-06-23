// src/components/pages/ComingSoon.tsx
// Descrição: Página para funcionalidades em construção, com estilo centralizado e link de retorno.

import { useLocation, Link } from "react-router-dom";
import FeatureComingSoon from "@/components/ui/FeatureComingSoon";

const ComingSoon = () => {
  const location = useLocation();
  const path = location.state?.from;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center space-y-4 text-muted-foreground px-4">
      <FeatureComingSoon
        title="Página em construção"
        description={`A funcionalidade ${path ? `"${path}"` : "solicitada"} estará disponível em breve.`}
      />
      <Link
        to="/"
        className="text-sm text-primary hover:underline transition-colors"
      >
        ← Voltar para a página inicial
      </Link>
    </div>
  );
};

export default ComingSoon;
