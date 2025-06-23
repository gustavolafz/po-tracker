// src/features/admin/pages/AnalystsListPage.tsx
// Descrição: Lista de analistas com busca e opção de visualizar pedidos associados.

import DashboardHeader from "@/components/layout/header/DashboardHeader";
import AnalystListSection from "@/features/admin/components/AnalystListSection";

const AnalystsListPage = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader description="Lista completa de analistas e os pedidos sob sua responsabilidade." />
      <div className="flex flex-col gap-6">
        <AnalystListSection />
      </div>
    </div>
  );
};

export default AnalystsListPage;
