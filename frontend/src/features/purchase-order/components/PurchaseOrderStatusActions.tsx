import { Button } from "@/components/ui/button";
import { X, Maximize } from "lucide-react";
import type { PurchaseOrderStatusActionsProps } from "@/features/purchase-order/types";

const PurchaseOrderStatusActions = ({ onExpand, onClose }: PurchaseOrderStatusActionsProps) => (
  <div className="absolute top-2 right-2 flex gap-1">
    <Button
      onClick={onExpand}
      variant="ghost"
      size="icon"
      className="text-muted-foreground hover:text-foreground"
    >
      <Maximize className="w-4 h-4" />
    </Button>
    <Button
      onClick={onClose}
      variant="ghost"
      size="icon"
      className="text-muted-foreground hover:text-destructive"
    >
      <X className="w-4 h-4" />
    </Button>
  </div>
);

export default PurchaseOrderStatusActions;
