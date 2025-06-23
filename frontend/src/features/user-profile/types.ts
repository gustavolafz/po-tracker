// src/features/user-profile/types.ts
export type Usuario = {
  name: string;
  email: string;
  type: string;
  setor: string;
  registro: string;
};

export type PropsUserProfileInfoSection = {
  user: Usuario;
  onEditClick: () => void;
  onLogoutClick: () => void;
};

export type PropsUserProfileEditForm = {
  newName: string;
  setNewName: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

export type PropsUserProfileDialog = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export type PropsUserProfileActions = {
  onEditClick: () => void;
  onLogoutClick: () => void;
};

export type PropsUserInfoList = {
  user: {
    name: string;
    email: string;
    type: string;
    setor: string;
    registro: string;
  };
};

export type PropsAvatarUploader = {
  name: string;
  onAvatarChange: (src: string) => void;
};
