// src\routes\constants\userTypes.tsx

export const USER_TYPES = {
  ADMIN: "admin",
  ANALISTA: "analista",
} as const;

export type UserType = (typeof USER_TYPES)[keyof typeof USER_TYPES];
