// src/components/ui/EmptyAllOrders.tsx

import { PackageX } from "lucide-react";

const EmptyAllOrders = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-12 text-center text-muted-foreground space-y-4">
      <PackageX className="w-10 h-10 text-destructive" />
      <div>
        <h2 className="text-xl font-semibold">Nenhum pedido encontrado</h2>
        <p className="text-sm">
          Ainda não há pedidos registrados no sistema.
        </p>
      </div>
    </div>
  );
};

export default EmptyAllOrders;
