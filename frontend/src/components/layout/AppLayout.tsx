// src/components/layout/AppLayout.tsx
// Descrição: Layout principal da aplicação com suporte à navegação lateral e controle responsivo da sidebar.
// Envolve o conteúdo da página com o provedor da sidebar e renderiza a navegação, controles e children.

import * as React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./sidebar/Sidebar.AppSidebar";
import SidebarControls from "./sidebar/SidebarControls";
import type { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

const LayoutContent = ({ children }: { children: ReactNode }) => {

  return (
    <div className="min-h-screen flex w-full transition-all duration-300">
      <AppSidebar />
      <main className="flex-1 overflow-auto transition-all duration-300">
        <SidebarControls />
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const [defaultOpen] = React.useState(() => {
    const saved = localStorage.getItem("sidebar:state");
    return window.innerWidth > 768 ? saved !== "collapsed" : false;
  });

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
};

export default AppLayout;
