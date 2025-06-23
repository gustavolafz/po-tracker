// src/components/layout/sidebar/AppSidebar.tsx
// Descrição: Componente de navegação lateral do sistema. Exibe o logo, título, ícone e menus de navegação.

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { BarChart3 } from "lucide-react";
import SidebarMenuList from "./Sidebar.MenuList";
import SidebarUserInfo from "./Sidebar.UserInfo";
import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks";

const AppSidebar = () => {
  const { userType } = useAuth();
  const redirectPath = userType === "admin" ? "/admin" : "/";


  return (
    <Sidebar className="fixed top-0 left-0 h-screen w-64 z-50 border-r bg-background">
      <SidebarHeader className="p-4 mt-2">
        <div className="flex items-center gap-2">
          <Link to={redirectPath} className="flex items-center gap-2">
            <img
              src="/branding/hp-tracker-logo.svg"
              alt="HP Tracker Logo"
              className="h-6 w-6 ml-1"
            />
            <span className="text-xl font-bold">HP Tracker</span>
            <div className="text-[#50C8AA]">
              <BarChart3 className="h-6 w-6" />
            </div>
          </Link>
          <SidebarTrigger className="ml-auto h-8 w-8" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenuList />
      </SidebarContent>

      <SidebarUserInfo />
    </Sidebar>
  );
};

export default AppSidebar;
