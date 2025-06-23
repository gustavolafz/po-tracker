// src/components/layout/sidebar/Sidebar.UserInfo.tsx

import { useState } from "react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  FileSearch,
  UserCog,
  LogOut
} from "lucide-react";
import {
  useLogout,
  useAuth
} from "@/features/auth/hooks";
import { UserProfileDialog } from "@/features/user-profile";

const SidebarUserInfo = () => {
  const { user } = useAuth();
  const logout = useLogout();
  const [openProfile, setOpenProfile] = useState(false);

  if (!user) return null;

  const truncatedName =
    user.name && user.name.length > 24
      ? "..." + user.name.slice(-21)
      : user.name;

  return (
    <SidebarFooter className="p-4">
      <div
        className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
        onClick={() => setOpenProfile(true)}
      >
        <div className="h-8 w-8 rounded-[5px] bg-primary flex items-center justify-center text-primary-foreground">
          {user?.role === "analista" ? (
            <FileSearch className="h-4 w-4" />
          ) : (
            <UserCog className="h-4 w-4" />
          )}
        </div>
        <div className="text-sm max-w-[200px]">
          <div className="font-medium capitalize truncate" title={user?.role ?? "Tipo de usuário"}>
            {user?.role?.slice(0, 24) ?? "Cargo"}
          </div>
          <div className="text-sidebar-foreground/70 truncate" title={user?.name ?? "Nome"}>
            {truncatedName ?? "Nome"}
          </div>
        </div>
      </div>

      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton onClick={logout}>
            <LogOut className="h-4 w-4" />
            <span>Sair</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>

      <UserProfileDialog open={openProfile} onOpenChange={setOpenProfile} />
    </SidebarFooter>
  );
};

export default SidebarUserInfo;
