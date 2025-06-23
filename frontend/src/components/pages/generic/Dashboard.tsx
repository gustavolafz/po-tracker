// src/components/pages/Dashboard.tsx

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import DashboardHeader from "@/components/layout/header/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import MonthlySubmissionsChart from "@/components/dashboard/MonthlyEmissionsChart";
import OrderStatusChartContainer from "@/components/dashboard/OrderStatusChartCard";
import GradeDistributionChart from "@/components/dashboard/GradeDistributionChart";
import CompetencyChart from "@/components/dashboard/CompetencyChart";

import { monthlySubmissions, gradeDistribution } from "@/data/mockDashboardData";
import { fetchDashboardStats } from "@/components/dashboard/services/fetchDashboardStats";

type DashboardStatsType = {
  totalOrders: number;
  totalClients: number;
  approvedOrders: number;
  pendingOrders: number;
  lateOrders: number;
};

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStatsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Erro ao carregar estatísticas:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="space-y-6">
      <DashboardHeader description="Visão geral de desempenho, estatísticas e indicadores por status e competência." />

      {loading ? (
        <div className="flex items-center justify-center h-20">
          <Loader2 className="h-6 w-6 text-primary animate-spin mr-2" />
          <p className="text-muted-foreground">Carregando estatísticas...</p>
        </div>
      ) : error || !stats ? (
        <div className="text-red-500 text-center">
          Erro ao carregar estatísticas do dashboard.
        </div>
      ) : (
        <DashboardStats stats={stats} loading={loading} />
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <MonthlySubmissionsChart loading={false} data={monthlySubmissions} />
        <OrderStatusChartContainer />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <GradeDistributionChart data={gradeDistribution} />
        <CompetencyChart />
      </div>
    </div>
  );
};

export default Dashboard;
