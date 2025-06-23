// src/features/clients/components/ClientCardList.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { PropsClientCardList } from "@/features/clients/types";
import { getInitials } from "@/utils/getInitials";

const ClientCardList = ({ clientes = [], onClientOrdersClick, ordersCount = {} }: PropsClientCardList) => {
  return (
    <div className="space-y-4">
      {clientes.map((cliente) => (
        <Card key={cliente.CustomerID}>
          <CardContent className="p-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>{getInitials(cliente.CustomerName)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-medium">{cliente.CustomerName}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>ID {cliente.CustomerID}</span>
                  <span className="border-l pl-2">
                    Nº de Pedidos: {ordersCount[cliente.CustomerID] ?? "-"}
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onClientOrdersClick(cliente)}
              className="text-sm font-medium"
            >
              Ver pedidos
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ClientCardList;
