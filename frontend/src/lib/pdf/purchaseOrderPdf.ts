// src/lib/pdf/purchaseOrderPdf.ts

import jsPDF from "jspdf";

type OrderPdfParams = {
  caseNumber: string;
  customerId: number;
  status: string;
  createdAt: string;
  orderId: number;
  comments?: string | null;
};

export function gerarPdfOrdemCompra({
  caseNumber,
  customerId,
  status,
  createdAt,
  orderId,
  comments,
}: OrderPdfParams) {
  const doc = new jsPDF();

  // Título
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(0, 63, 135);
  doc.text("Relatório da Ordem de Compra", 105, 22, { align: "center" });

  // Data de emissão
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(70, 70, 70);
  doc.text(`Emitido em: ${new Date().toLocaleDateString("pt-BR")}`, 105, 30, { align: "center" });

  // Linha
  doc.setDrawColor(0, 63, 135);
  doc.setLineWidth(0.8);
  doc.line(20, 34, 190, 34);

  const info: [string, string][] = [
    ["ID da Ordem", String(orderId)],
    ["Número do Caso", caseNumber],
    ["ID do Cliente", String(customerId)],
    ["Status", status],
    ["Data de Criação", new Date(createdAt).toLocaleDateString("pt-BR")],
  ];

  // Layout
  const boxX = 15;
  const boxY = 40;
  const boxWidth = 180;
  let y = boxY + 12;

  // Medida base por linha
  const lineHeight = 11;

  // Altura da seção de info
  const infoHeight = info.length * lineHeight;

  // Comentário formatado
  const formatted = comments?.trim() || "—";
  const commentLines = doc.splitTextToSize(formatted, 160);
  const commentBlockHeight = commentLines.length * 7 + 12;

  const totalBoxHeight = infoHeight + commentBlockHeight + 12;

  // 🔧 Caixa adaptada dinamicamente
  doc.setFillColor(245, 248, 250);
  doc.roundedRect(boxX, boxY, boxWidth, totalBoxHeight, 4, 4, "F");

  // Preenche os campos
  info.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold").setFontSize(11).setTextColor(50, 50, 50);
    doc.text(`${label}:`, 25, y);

    doc.setFont("helvetica", "normal").setTextColor(0, 0, 0);
    doc.text(`${value}`, 85, y);
    y += lineHeight;
  });

  // Comentário
  doc.setFont("helvetica", "bold").setTextColor(50, 50, 50);
  doc.text("Comentários:", 25, y);
  y += 6;

  doc.setFont("helvetica", "normal").setTextColor(0, 0, 0);
  doc.text(commentLines, 25, y);
  y += commentLines.length * 7;

  // Rodapé
  doc.setDrawColor(180);
  doc.setLineWidth(0.4);
  doc.line(20, y + 10, 190, y + 10);

  doc.setFont("helvetica", "italic").setFontSize(10).setTextColor(100);
  doc.text(
    "PO Tracker — Plataforma interna de gestão de ordens | confidencial",
    105,
    y + 18,
    { align: "center" }
  );

  doc.save(`ordem_${orderId}.pdf`);
}
