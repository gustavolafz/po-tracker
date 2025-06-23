// src/components/layout/sidebar/SidebarControls.tsx
// Descrição: Componente que controla a exibição da sidebar, com botão flutuante em telas grandes e barra superior em mobile.

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Menu, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

const SidebarControls = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const location = useLocation();

  const routeTitles: Record<string, string> = {
    "/": "Dashboard",
    "/painel-clientes": "Painel de Clientes",
    "/painel-pedidos": "Painel de Pedidos",
    "/registros": "Registros",
    "/historicos": "Históricos",
    "/equipes": "Equipes",
  };

  const pageTitle = routeTitles[location.pathname] ?? "HP Tracker";

  return (
    <>
      <div className="sticky top-0 z-10 bg-background p-2 md:hidden flex items-center border-b">
        <SidebarTrigger className="mr-2">
          <Menu className="h-5 w-5" />
        </SidebarTrigger>
        <span className="font-semibold">{pageTitle}</span>
      </div>

      {state === "collapsed" && !isMobile && (
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="fixed left-4 top-4 z-50 rounded-full shadow-lg border"
        >
          <PanelLeft className="h-4 w-4" />
        </Button>
      )}
    </>
  );
};

export default SidebarControls;
