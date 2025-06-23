// src/components/dashboard/MonthlyEmissionsChart.tsx
// Descrição: Componente de gráfico de linhas que exibe o total de ordens de compra (POs) emitidas por mês.

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Loader2 } from "lucide-react"

type Props = {
  loading: boolean
  data: { name: string; count: number }[]
}

const MonthlyEmissionsChart = ({ loading, data }: Props) => {
  const renderLoading = () => (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="h-6 w-6 text-primary animate-spin mr-2" />
      <p className="text-muted-foreground">Carregando dados mensais...</p>
    </div>
  )

  const renderChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="count"
          name="Cases Emitidas"
          stroke="#3b82f6"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-2">
      <CardHeader>
        <CardTitle>Cases por Mês</CardTitle>
        <CardDescription>
          Total de cases de compra emitidas mensalmente
        </CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        {loading ? renderLoading() : renderChart()}
      </CardContent>
    </Card>
  )
}

export default MonthlyEmissionsChart
