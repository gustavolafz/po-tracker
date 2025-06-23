// src/components/ui/EmptyClientNotFound.tsx

import { AlertTriangle } from "lucide-react";

const EmptyClientNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[40vh] text-center text-muted-foreground space-y-4">
      <AlertTriangle className="w-10 h-10 text-destructive" />
      <div>
        <h2 className="text-xl font-semibold">Cliente não encontrado</h2>
        <p className="text-sm">
          Verifique o ID na URL ou selecione um cliente válido para visualizar os pedidos.
        </p>
      </div>
    </div>
  );
};

export default EmptyClientNotFound;
