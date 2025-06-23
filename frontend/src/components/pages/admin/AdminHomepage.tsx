// src/components/pages/admin/AdminHomepage.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminHomepage = () => {
  return (
    <Card className="max-w-3xl mx-auto mt-10 shadow-md rounded-2xl border border-border/40">
      <CardHeader>
        <CardTitle>Painel do Administrador</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-muted-foreground">
        <p>Bem-vindo ao painel administrativo do HP Tracker.</p>
        <p>
          Aqui você poderá configurar usuários, supervisionar métricas globais e acessar relatórios estratégicos.
        </p>
      </CardContent>
    </Card>
  );
};

export default AdminHomepage;
