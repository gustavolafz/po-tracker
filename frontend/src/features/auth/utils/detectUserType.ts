// src/features/auth/utils/detectUserType.ts

import type { UserType } from "@/routes/constants/userTypes";

export const detectUserType = (email: string): UserType | null => {
  if (email.includes("admin")) return "admin";
  if (email.includes("analista")) return "analista";
  return null;
};
