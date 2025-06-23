// Entidades básicas
export type Cliente = {
  CustomerID: number;
  CustomerName: string;
  CustomerComments: string | null;
  CreatedAt: string;
};

export type PurchaseOrder = {
  orderId: number;
  caseNumber: string;
  customerId: number;
  status: string;
  createdAt: string;
  comments?: string | null;
  fase: (string | null)[];
};

export type PedidoStatus = {
  numeroCotacao: string;
  idCliente: string;
  statusPedido: "Em Andamento" | "Atrasado" | "Resolvido"; // ou apenas `string` se for mais flexível
  leadTime: number;
  transacaoId: string;
  dataAtualizacao: string; // pode ser `Date` se for transformado depois
};

// Props dos componentes
export type PropsPurchaseOrderListSection = {
  pedidos: PurchaseOrder[];
  onVerMaisClick: (status: PurchaseOrder) => void;
};

// src/features/clients/types.ts
export type PropsClientPedidos = {
  onVerMaisClick: (pedido: PurchaseOrder) => void;
  onVerCadastroClick: (cliente: Cliente) => void;
};

export type PropsClientCardList = {
  clientes: Cliente[];
  onClientOrdersClick: (cliente: Cliente) => void;
  ordersCount?: Record<number, number>;
};

export type PropsClientListSection = {
  clientes: Cliente[];
  total: number;
  currentPage: number;
  pageSize: number;
  isFiltered?: boolean;
  onPageChange: (page: number) => void;
  onClearSearch: () => void;
};

export type PropsPedidoAccordion = {
  pedidos: PurchaseOrder[];
  onVerMaisClick: (pedido: PurchaseOrder) => void;
};

export type PropsClientInfo = {
  cliente: Cliente;
  onVerCadastroClick: (cliente: Cliente) => void;
};

export type PropsClientDetailsDialog = {
  open: boolean;
  onClose: () => void;
  CustomerName: string;
  CustomerComments: string | null;
  CustomerID: number;
};
