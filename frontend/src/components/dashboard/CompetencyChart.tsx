// src/components/dashboard/CompetencyChart.tsx

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchOrdersCountByCustomer } from "@/features/clients/services/fetchOrdersCountByCustomer";
import { fetchCustomers } from "@/features/clients/services/fetchCustomers";
import type { Cliente } from "@/features/clients/types";
import { useMemo } from "react";

type ChartData = {
  name: string;
  value: number;
};

const CompetencyChart = () => {
  const {
    data: orderCounts,
    isLoading: loadingCounts,
    isError: errorCounts,
  } = useQuery({
    queryKey: ["orders-count-by-customer", "Atrasado"],
    queryFn: () => fetchOrdersCountByCustomer("Atrasado"),
  });

  const {
    data: customersData,
    isLoading: loadingCustomers,
    isError: errorCustomers,
  } = useQuery({
    queryKey: ["clientes"],
    queryFn: () => fetchCustomers({ page: 1, limit: 1000, ordem: "CustomerID" }),
  });

  const clientes: Cliente[] = customersData?.items ?? [];

  const clienteMap = useMemo(
    () => new Map(clientes.map((c) => [c.CustomerID, c.CustomerName])),
    [clientes]
  );

  const chartData = useMemo<ChartData[]>(() => {
    return (orderCounts ?? [])
      .map(({ customerId, totalOrders }) => ({
        name: clienteMap.get(customerId) || `Cliente #${customerId}`,
        value: totalOrders,
      }))
      .filter((entry): entry is ChartData => typeof entry.name === "string")
      .sort((a, b) => b.value - a.value);
  }, [orderCounts, clienteMap]);

  const isLoading = loadingCounts || loadingCustomers;
  const isError = errorCounts || errorCustomers;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos Atrasados por Cliente</CardTitle>
        <CardDescription>
          Clientes com maior número de pedidos em atraso
        </CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        {isLoading ? (
          <span>Carregando...</span>
        ) : isError ? (
          <span>Erro ao carregar dados</span>
        ) : chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <XAxis type="number" stroke="currentColor" allowDecimals={false} />
              <YAxis
                type="category"
                dataKey="name"
                stroke="currentColor"
                width={120}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
                labelStyle={{ color: "var(--foreground)" }}
              />
              <Bar dataKey="value">
                {chartData.map((_, index) => (
                  <Cell key={`bar-${index}`} fill="#EF4444" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-center text-sm text-muted-foreground gap-2">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
            <span>Nenhum cliente com pedidos atrasados.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CompetencyChart;
