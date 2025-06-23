// ===================
// Modelo base (dados da ordem de compra)
export type PurchaseOrder = {
  orderId: number;
  caseNumber: string;
  customerId: number;
  status: string;
  createdAt: string;
  comments?: string | null;
  fase: (string | null)[];
  statusPriority?: number;
};

// ===================
// Tipos de props para componentes

// Accordion de pedidos
export type PurchaseOrderAccordionProps = {
  pedidos: PurchaseOrder[];
  onVerMaisClick: (pedido: PurchaseOrder) => void;
};

// Seção de listagem completa
export type PurchaseOrderListSectionProps = {
  pedidos: PurchaseOrder[];
  total: number;
  currentPage: number;
  pageSize: number;
  searchTerm: string;
  statusFiltro: string;
  inputRef: React.RefObject<HTMLInputElement>;
  onSearchChange: (valor: string) => void;
  onStatusChange: (status: string) => void;
  onPageChange: (pagina: number) => void;
  onClearSearch: () => void;
  onVerMaisClick: (pedido: PurchaseOrder) => void;
};

// Painel lateral (expandido) ou página dedicada
export type PurchaseOrderStatusProps = PurchaseOrder & {
  onClose: () => void;
};

export type PurchaseOrderStatusContentProps = PurchaseOrder & {
  isStandalone?: boolean;
};

// Ações do painel (ex: expandir)
export type PurchaseOrderStatusActionsProps = {
  onExpand: () => void;
  onClose: () => void;
};
