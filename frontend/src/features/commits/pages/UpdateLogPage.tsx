// src/features/commits/pages/UpdateLogPage.tsx
// Descrição: Página com histórico de commits dos repositórios do projeto.

import DashboardHeader from "@/components/layout/header/DashboardHeader";
import CommitListSection from "@/features/commits/components/CommitListSection";

const UpdateLogPage = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader description="Veja as atualizações recentes realizadas nos repositórios do projeto." />
      <CommitListSection />
    </div>
  );
};

export default UpdateLogPage;
