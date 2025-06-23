// src/features/clients/components/ClientInfo.tsx
// Descrição: Componente para exibir informações do cliente, incluindo nome, ID e um botão para ver o cadastro completo.

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { PropsClientInfo } from "@/features/clients/types";
import { getInitials } from "@/utils/getInitials";

const ClientInfo = ({ cliente, onVerCadastroClick }: PropsClientInfo) => {
  return (
    <Card>
      <CardContent className="p-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback>{getInitials(cliente.CustomerName)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-medium">{cliente.CustomerName}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {/* <span>N° de Pedidos: ...</span> */}
              <span>ID {cliente.CustomerID}</span>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onVerCadastroClick(cliente)}
          className="text-sm font-medium"
        >
          Ver cadastro
        </Button>
      </CardContent>
    </Card>
  );
};

export default ClientInfo;
