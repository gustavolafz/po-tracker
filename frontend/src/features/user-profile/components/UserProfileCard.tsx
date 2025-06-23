// src/features/user-profile/components/UserProfileCard.tsx

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarUploader } from "./ui/AvatarUploader";
import { UserProfileHeader } from "./layout/UserProfileHeader";
import { UserProfileEditForm } from "./actions/UserProfileEditForm";
import { UserProfileInfoSection } from "./layout/UserProfileInfoSection";

const initialUser = {
  name: "Ana Ferreira",
  email: "ana.ferreira@potracker.com",
  type: "analista",
  setor: "Logística",
  registro: "USR-782930",
};

export const UserProfileCard = () => {
  const [user, setUser] = useState(initialUser);
  const [, setAvatar] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user.name);

  const handleEditClick = () => {
    setIsEditing(true);
    setNewName(user.name);
  };

  const handleSave = () => {
    setUser({ ...user, name: newName });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewName(user.name);
  };

  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <Card className="w-full max-w-3xl rounded-2xl shadow-lg border border-border/30 p-2">
      <UserProfileHeader />

      <CardContent className="space-y-8">
        <AvatarUploader name={user.name} onAvatarChange={setAvatar} />

        {isEditing ? (
          <UserProfileEditForm
            newName={newName}
            setNewName={setNewName}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <UserProfileInfoSection
            user={user}
            onEditClick={handleEditClick}
            onLogoutClick={handleLogout}
          />
        )}
      </CardContent>
    </Card>
  );
};
