// src\features\purchase-order\components\PurchaseOrderStatusContent.tsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { CardHeader, CardTitle, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { PurchaseOrderStatusContentProps } from "@/features/purchase-order/types";
import { gerarPdfOrdemCompra } from "@/lib/pdf/purchaseOrderPdf";
import { AddCommentDialog } from "@/features/purchase-order/components/AddCommentDialog";
import { addOrderComment } from "../services/addOrderComment";
import { htmlToPlainFormattedText } from "@/utils/htmlToPlainFormattedText";

const statusColorMap: Record<string, string> = {
  "Em Andamento": "text-muted-foreground",
  Resolvido: "text-green-600",
  Atrasado: "text-red-500",
};

type InfoRowProps = {
  label: string;
  value?: string | number | null;
  valueClassName?: string;
};

const InfoRow = ({ label, value, valueClassName = "text-foreground" }: InfoRowProps) => {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className={valueClassName}>{value}</span>
    </div>
  );
};

const PurchaseOrderStatusContent = ({
  caseNumber,
  customerId,
  status,
  createdAt,
  orderId,
  comments,
  isStandalone = false,
}: PurchaseOrderStatusContentProps) => {
  const [openCommentsPanel, setOpenCommentsPanel] = useState(false);
  const [currentComment, setCurrentComment] = useState(comments ?? "");

  const statusColor = statusColorMap[status] || "text-foreground";
  const dataFormatada = new Date(createdAt).toLocaleDateString("pt-BR");
  const [showAddDialog, setShowAddDialog] = useState(false);


  const handleDownload = () => {
    const textoParaPdf = htmlToPlainFormattedText(currentComment);

    gerarPdfOrdemCompra({
      caseNumber,
      customerId,
      status,
      createdAt,
      orderId,
      comments: textoParaPdf,
    });
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Status da Ordem de Compra</CardTitle>
        <p className="text-sm text-muted-foreground">
          ID #{orderId} | Criado em {dataFormatada}
        </p>
      </CardHeader>

      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <InfoRow label="Número do Caso" value={caseNumber} />
        <InfoRow label="ID do Cliente" value={customerId} />
        <InfoRow label="Status" value={status} valueClassName={`font-medium ${statusColor}`} />

        <div className="flex justify-between items-center">
          <span>Comentários</span>
          {currentComment ? (
            <Button variant="outline" size="sm" onClick={() => setOpenCommentsPanel(true)}>
              Ver comentários
            </Button>
          ) : (
            <span className="text-foreground italic">Nenhum comentário</span>
          )}
        </div>

        <hr className="my-2" />

        <p className="text-xs text-muted-foreground">
          Use este painel para acompanhar o andamento dos pedidos e identificar possíveis gargalos.
        </p>

        <div className="flex flex-col gap-0">
          <Button
            onClick={handleDownload}
            variant="link"
            className="px-0 text-left justify-start text-xs text-emerald-500"
          >
            Baixar como PDF
          </Button>

          <Button
            onClick={() => setShowAddDialog(true)}
            variant="link"
            className="px-0 text-left justify-start text-xs text-emerald-500"
          >
            Adicionar Comentário
          </Button>
        </div>

        {!isStandalone && (
          <Button asChild variant="outline" className="w-full text-xs text-emerald-500">
            <Link to={`/ordem/${orderId}`}>Abrir em página dedicada</Link>
          </Button>
        )}
      </CardContent>

      <Sheet open={openCommentsPanel} onOpenChange={setOpenCommentsPanel}>
        <SheetContent side="right" className="w-[400px] sm:w-[500px]">
          <SheetHeader>
            <SheetTitle>Comentários da Ordem</SheetTitle>
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
        onSubmit={async (commentHtml) => {
          try {
            await addOrderComment(orderId, commentHtml);
            setCurrentComment(commentHtml);
            setShowAddDialog(false);
          } catch (err) {
            console.error(err);
          }
        }}
      />
    </>
  );
};

export default PurchaseOrderStatusContent;
