// src/components/layout/header/DashboardHeader.tsx
// Descrição: Componente de cabeçalho do dashboard. Exibe o logotipo, o título da aplicação e ações como alternar tema e logout.

import { LogOut } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/hooks";

type Props = {
  description?: string;
};

const DashboardHeader = ({ description }: Props) => {
  const logout = useLogout();

  return (
    <div className="container mx-auto px-8">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img
            src="/branding/hp-tracker-logo.svg"
            alt="HP Tracker Logo"
            className="h-10 w-10"
          />
          <span className="text-3xl font-bold">HP Tracker</span>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button
            variant="outline"
            onClick={logout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>
      {description && (
        <main>
          <p className="text-muted-foreground">{description}</p>
        </main>
      )}
    </div>
  );
};

export default DashboardHeader;
