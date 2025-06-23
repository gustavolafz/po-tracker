// src/data/mockDashboardData.ts

export const dashboardStats = {
  totalOrders: 4322,
  totalClients: 124,
  approvedOrders: 4124,
  pendingOrders: 189,
  lateOrders: 9,
};

export const gradeDistribution = [
  { name: "0-2", count: Math.floor(Math.random() * 5) },
  { name: "2-4", count: Math.floor(Math.random() * 10) },
  { name: "4-6", count: Math.floor(Math.random() * 15) },
  { name: "6-8", count: Math.floor(Math.random() * 20) },
  { name: "8-10", count: Math.floor(Math.random() * 25) },
];

export const competencyData = [
  { name: "Metas", avg: +(Math.random() * 10).toFixed(1) },
  { name: "Produto", avg: +(Math.random() * 10).toFixed(1) },
  { name: "Negociação", avg: +(Math.random() * 10).toFixed(1) },
  { name: "Organização", avg: +(Math.random() * 10).toFixed(1) },
  { name: "Atendimento", avg: +(Math.random() * 10).toFixed(1) },
];

export const monthlySubmissions = [
  { name: "Jan", count: Math.floor(Math.random() * 20) },
  { name: "Fev", count: Math.floor(Math.random() * 20) },
  { name: "Mar", count: Math.floor(Math.random() * 20) },
  { name: "Abr", count: Math.floor(Math.random() * 20) },
  { name: "Mai", count: Math.floor(Math.random() * 20) },
  { name: "Jun", count: Math.floor(Math.random() * 20) },
  { name: "Jul", count: Math.floor(Math.random() * 20) },
  { name: "Ago", count: Math.floor(Math.random() * 20) },
  { name: "Set", count: Math.floor(Math.random() * 20) },
  { name: "Out", count: Math.floor(Math.random() * 20) },
  { name: "Nov", count: Math.floor(Math.random() * 20) },
  { name: "Dez", count: Math.floor(Math.random() * 20) },
];

export const classData = [
  { name: "Equipe I", value: 10 },
  { name: "Equipe II", value: 15 },
  { name: "Equipe III", value: 5 },
  { name: "Equipe IV", value: 20 },
  { name: "Equipe V", value: 8 },
];
