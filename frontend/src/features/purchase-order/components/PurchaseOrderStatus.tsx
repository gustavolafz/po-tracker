// src\features\purchase-order\components\PurchaseOrderStatus.tsx

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PurchaseOrderStatusProps } from "@/features/purchase-order/types";
import PurchaseOrderStatusActions from "./PurchaseOrderStatusActions";
import PurchaseOrderStatusContent from "./PurchaseOrderStatusContent";
import { useIsMobile } from "@/hooks/use-mobile";

const PurchaseOrderStatus = (props: PurchaseOrderStatusProps) => {
  const isMobile = useIsMobile();
  const [expandido, setExpandido] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setExpandido(true);
    }
  }, [isMobile]);

  return (
    <>
      {!expandido && (
        <Card className="relative w-full lg:w-80">
          <PurchaseOrderStatusActions
            onExpand={() => setExpandido(true)}
            onClose={props.onClose}
          />
          <PurchaseOrderStatusContent {...props} />
        </Card>
      )}

      <Dialog open={expandido} onOpenChange={setExpandido}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detalhes da Ordem</DialogTitle>
          </DialogHeader>
          <div>
            <PurchaseOrderStatusContent {...props} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PurchaseOrderStatus;
