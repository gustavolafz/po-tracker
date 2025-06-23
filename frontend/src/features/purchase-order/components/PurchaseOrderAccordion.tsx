// src/features/purchase-order/components/PurchaseOrderAccordion.tsx

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { PurchaseOrderAccordionProps } from "@/features/purchase-order/types";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Em Andamento":
      return "bg-yellow-400";
    case "Atrasado":
      return "bg-red-500";
    case "Resolvido":
      return "bg-green-500";
    default:
      return "bg-gray-400";
  }
};

const PurchaseOrderAccordion = ({ pedidos, onVerMaisClick }: PurchaseOrderAccordionProps) => {
  const [activeItem, setActiveItem] = useState<string | undefined>(undefined);

  return (
    <Accordion
      type="single"
      collapsible
      value={activeItem}
      onValueChange={(value) => setActiveItem(value)}
      className="w-full"
    >
      {pedidos.map((pedido, index) => {
        const id = pedido.orderId ? `pedido-${pedido.orderId}` : `pedido-${index}`;
        const emitido = new Date(pedido.createdAt);
        const isValidDate = !isNaN(emitido.getTime());

        return (
          <AccordionItem value={id} key={id}>
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${getStatusColor(pedido.status)}`} />
                <span className="text-sm text-foreground font-medium">
                  {pedido.caseNumber || "Sem número"}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-2 text-sm text-muted-foreground">
              <p>Status: {pedido.status}</p>
              <p>
                Emitido em:{" "}
                {isValidDate ? emitido.toLocaleDateString("pt-BR") : "Data inválida"}
              </p>
              {pedido.comments && (
                <p className="break-words">Comentários: {pedido.comments}</p>
              )}
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onVerMaisClick(pedido)}
                  className="text-sm font-medium"
                >
                  Ver mais
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default PurchaseOrderAccordion;
