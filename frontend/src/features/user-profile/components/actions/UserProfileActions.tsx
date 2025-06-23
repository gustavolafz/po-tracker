// src/features/user-profile/components/actions/UserProfileActions.tsx

import { Button } from "@/components/ui/button";
import { Pencil, LogOut } from "lucide-react";
import type { PropsUserProfileActions } from "../../types";
import { useLogout } from "@/features/auth/hooks";

export const UserProfileActions = ({ onEditClick }: PropsUserProfileActions) => {
  const logout = useLogout();

  return (
    <div className="flex justify-between pt-6 border-t border-border">
      <Button
        variant="secondary"
        className="text-xs gap-1 px-4 py-2"
        onClick={onEditClick}
      >
        <Pencil className="w-3.5 h-3.5" />
        Editar dados
      </Button>
      <Button
        variant="outline"
        className="text-xs gap-1 px-4 py-2"
        onClick={logout}
      >
        <LogOut className="w-3.5 h-3.5" />
        Sair
      </Button>
    </div>
  );
};
