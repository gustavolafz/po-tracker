// src/components/ui/EmptyClientList.tsx

import { Users } from "lucide-react";

const EmptyClientList = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-12 text-center text-muted-foreground space-y-4">
      <Users className="w-10 h-10 text-destructive" />
      <div>
        <h2 className="text-xl font-semibold">Nenhum cliente encontrado</h2>
        <p className="text-sm">Ainda não há clientes registrados no sistema.</p>
      </div>
    </div>
  );
};

export default EmptyClientList;
