// src/routes/paths.ts

// Funções dinâmicas para rotas com parâmetros
export const getClientOrdersPath = (id: string) => `/cliente/${id}/pedidos`;
export const getOrderDetailsPath = (id: string) => `/ordem/${id}`;

// Rotas estáticas
export const PATHS = {
  login: "/login",
  admin: "/admin",
  dashboard: "/",
  clientsPanel: "/painel-clientes",
  ordersPanel: "/painel-pedidos",
  updateLog: "/registros-atualizacao",
  comingSoon: "/em-breve",
  notFound: "*",
};
