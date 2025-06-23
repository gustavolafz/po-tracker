// src/components/dashboard/TeamDistributionChart.tsx

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { fetchStatusDistribution } from "./services/fetchStatusDistribution";

type ChartData = { name: string; value: number };

const STATUS_COLORS: Record<string, string> = {
  "Em Andamento": "#FACC15",
  "Atrasado": "#EF4444",
};

const TeamDistributionChart = () => {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchStatusDistribution();
        const filtered = response.filter(
          (d) => d.name && d.name !== "Resolvido"
        );
        setData(filtered);
      } catch (e) {
        console.error("Erro ao buscar status:", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const renderLabel = useMemo(
    () =>
      ({ name, percent }: { name: string; percent: number }) =>
        `${name}: ${(percent * 100).toFixed(0)}%`,
    []
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status Atual dos Pedidos</CardTitle>
        <CardDescription>Distribuição por status atual</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        {loading ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            Carregando...
          </div>
        ) : error ? (
          <p className="text-red-500 text-sm text-center">Erro ao carregar dados.</p>
        ) : data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                labelLine={false}
                label={renderLabel}
              >
                {data.map((entry) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={STATUS_COLORS[entry.name] || "#9CA3AF"}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
                labelStyle={{ color: "var(--foreground)" }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-sm text-muted-foreground">Nenhum dado disponível.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default TeamDistributionChart;
