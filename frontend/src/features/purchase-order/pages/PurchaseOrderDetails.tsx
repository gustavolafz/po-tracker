// src\features\purchase-order\pages\PurchaseOrderDetails.tsx

import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { fetchOrderById } from "@/features/purchase-order/services/fetchOrderById";
import PurchaseOrderStatusContent from "@/features/purchase-order/components/PurchaseOrderStatusContent";
import { Card } from "@/components/ui/card";
import type { PurchaseOrder } from "@/features/purchase-order/types";

const PurchaseOrderDetails = () => {
  const { id } = useParams();
  const [pedido, setPedido] = useState<PurchaseOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) throw new Error("ID inválido");
        const resultado = await fetchOrderById(parsedId);
        setPedido(resultado);
      } catch (err: any) {
        setErro(err.message || "Erro ao carregar pedido");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center text-muted-foreground transform -translate-y-12 space-y-2">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <p className="text-sm">Carregando detalhes da ordem de compra...</p>
      </div>
    );
  }

  if (erro || !pedido) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center text-center space-y-4 text-muted-foreground transform -translate-y-12">
        <AlertTriangle className="w-10 h-10 text-destructive" />
        <div>
          <h1 className="text-2xl font-semibold">Ordem de compra não encontrada</h1>
          <p className="text-sm mt-1">{erro ?? "Verifique o código da transação ou entre em contato com o suporte."}</p>
        </div>
        <Link to="/" className="text-sm text-primary hover:underline transition-colors">
          ← Voltar para a página inicial
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center space-y-4 text-muted-foreground px-4 transform -translate-y-12">
      <div>
        <h1 className="text-2xl font-semibold">Detalhes da Ordem #{id}</h1>
        <p className="text-sm mt-1">Acompanhe o status completo da sua ordem de compra.</p>
      </div>
      <div className="w-full max-w-md">
        <Card>
          <PurchaseOrderStatusContent {...pedido} isStandalone />
        </Card>
      </div>
    </div>
  );
};

export default PurchaseOrderDetails;
