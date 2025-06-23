// src/components/layout/sidebar/Sidebar.MenuList.tsx
// Descrição: Lista de itens do menu lateral. Renderiza navegação real baseada nas rotas implementadas.

import { Link, useLocation } from "react-router-dom";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  Users,
  ShoppingCart,
  UserCog,
} from "lucide-react";
import { useAuth } from "@/features/auth/hooks";
import { USER_TYPES } from "@/routes/constants/userTypes";

const menuItems = [
  { title: "Dashboard", icon: BarChart3, path: "/" },
  { title: "Painel de Clientes", icon: Users, path: "/painel-clientes" },
  { title: "Painel de Pedidos", icon: ShoppingCart, path: "/painel-pedidos" },
];

const SidebarMenuList = () => {
  const location = useLocation();
  const { userType } = useAuth();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {menuItems.map(({ title, icon: Icon, path }) => (
            <SidebarMenuItem key={path}>
              <SidebarMenuButton
                asChild
                className={location.pathname === path ? "bg-sidebar-accent" : ""}
              >
                <Link to={path} className="flex items-center gap-3 w-full">
                  <Icon className="h-5 w-5" />
                  <span>{title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

          {userType === USER_TYPES.ADMIN && (
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className={location.pathname === "/admin" ? "bg-sidebar-accent" : ""}
              >
                <Link to="/admin" className="flex items-center gap-3 w-full">
                  <UserCog className="h-5 w-5" />
                  <span>Painel de Analistas</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarMenuList;
