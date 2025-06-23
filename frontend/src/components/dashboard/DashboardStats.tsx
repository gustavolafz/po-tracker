// src/components/dashboard/DashboardStats.tsx
// Descrição: Componente de estatísticas que exibe indicadores resumidos no topo do dashboard.

import { Card, CardContent } from "@/components/ui/card"
import {
  FileText,
  Users,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react"
import { useMemo } from "react"
import { useNavigate } from "react-router-dom" // IMPORTAÇÃO DO NAVEGATE

type Stat = {
  title: string
  value: string
  description: string
  icon: React.ElementType
  color: string
  onClick?: () => void
}

type Props = {
  stats: {
    totalOrders?: number
    totalClients?: number
    approvedOrders?: number
    pendingOrders?: number
    lateOrders?: number
  }
  loading: boolean
}

const DashboardStats = ({ stats, loading }: Props) => {
  const navigate = useNavigate(); // Hook para navegação

  const data: Stat[] = useMemo(() => [
    {
      title: "Total de Cases",
      value: loading || stats?.totalOrders == null ? "-" : `${stats.totalOrders}`,
      description: "Cases emitidas no sistema",
      icon: FileText,
      color: "bg-blue-500",
      onClick: () => navigate("/painel-pedidos"), // ROTA ADICIONADA AQUI
    },
    {
      title: "Clientes",
      value: loading || stats?.totalClients == null ? "-" : `${stats.totalClients}`,
      description: "Clientes registrados",
      icon: Users,
      color: "bg-cyan-600",
      onClick: () => navigate("/painel-clientes"), // ROTA JÁ EXISTENTE
    },
    {
      title: "Resolvido",
      value: loading || stats?.approvedOrders == null ? "-" : `${stats.approvedOrders}`,
      description: "Cases com status resolvido",
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      title: "Pendentes",
      value: loading || stats?.pendingOrders == null ? "-" : `${stats.pendingOrders}`,
      description: "Cases em análise",
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      title: "Atrasadas",
      value: loading || stats?.lateOrders == null ? "-" : `${stats.lateOrders}`,
      description: "Cases com lead time excedido",
      icon: AlertTriangle,
      color: "bg-red-500",
    },
  ], [stats, loading, navigate]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {data.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <Card
            key={i}
            className={stat.onClick ? "cursor-pointer hover:shadow-lg transition" : ""}
            onClick={stat.onClick}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`${stat.color} rounded-full p-3 text-white`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <h2 className="text-3xl font-bold">{stat.value}</h2>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;