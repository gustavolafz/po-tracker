// src/components/dashboard/GradeDistributionChart.tsx
// Descrição: Componente de gráfico de barras que exibe a distribuição de ordens de compra (POs) por faixa de Em Andamento.

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

type Props = {
  data: { name: string; count: number }[]
}

const GradeDistributionChart = ({ data }: Props) => {
  const renderChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="count"
          name="Cases"
          fill="#3b82f6"
        />
      </BarChart>
    </ResponsiveContainer>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos em atraso acima do tempo</CardTitle>
        <CardDescription>
          Contagem acima de 73 dias
        </CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        {renderChart()}
      </CardContent>
    </Card>
  )
}

export default GradeDistributionChart
