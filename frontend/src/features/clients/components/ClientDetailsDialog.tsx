// src/features/clients/components/ClientDetailsDialog.tsx

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { AddCommentDialog } from "@/features/purchase-order/components/AddCommentDialog";
import { addCustomerComment } from "@/features/clients/services/addCustomerComment";
import type { PropsClientDetailsDialog } from "@/features/clients/types";

const ClientDetailsDialog = ({
  open,
  onClose,
  CustomerName,
  CustomerComments,
  CustomerID,
}: PropsClientDetailsDialog) => {
  const [openCommentsPanel, setOpenCommentsPanel] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [currentComment, setCurrentComment] = useState(CustomerComments ?? "");

  useEffect(() => {
    if (open) {
      setCurrentComment(CustomerComments ?? "");
    }
  }, [open, CustomerComments]);

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Cadastro do Cliente</DialogTitle>
            <DialogDescription>Informações básicas do cliente</DialogDescription>
          </DialogHeader>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>ID do Cliente</span>
              <span className="text-foreground">{CustomerID}</span>
            </div>
            <div className="flex justify-between">
              <span>Nome</span>
              <span className="text-foreground font-medium">{CustomerName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Comentários:</span>
              {currentComment ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOpenCommentsPanel(true)}
                >
                  Ver comentários
                </Button>
              ) : (
                <span className="text-foreground italic">Nenhum comentário</span>
              )}
            </div>
            <Button
              variant="link"
              className="px-0 text-left justify-start text-xs text-emerald-500"
              onClick={() => setShowAddDialog(true)}
            >
              Adicionar Comentário
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Sheet open={openCommentsPanel} onOpenChange={setOpenCommentsPanel}>
        <SheetContent side="right" className="w-[400px] sm:w-[500px]">
          <SheetHeader>
            <SheetTitle>Comentários sobre o cliente</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <Card>
              <CardContent className="p-4">
                <div
                  className="prose prose-sm dark:prose-invert text-muted-foreground max-w-none"
                  dangerouslySetInnerHTML={{ __html: currentComment || "" }}
                />
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>

      <AddCommentDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSubmit={async (html) => {
          try {
            await addCustomerComment(CustomerID, html);
            setCurrentComment(html);
            setShowAddDialog(false);
          } catch (err) {
            console.error(err);
          }
        }}
      />
    </>
  );
};

export default ClientDetailsDialog;
