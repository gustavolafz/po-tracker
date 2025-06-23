// src\features\user-profile\components\actions\UserProfileDialog.tsx

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UserProfileCard } from "../UserProfileCard";
import type { PropsUserProfileDialog } from "../../types";

export const UserProfileDialog = ({ open, onOpenChange }: PropsUserProfileDialog) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="p-0 max-w-3xl">
      <UserProfileCard />
    </DialogContent>
  </Dialog>
);
