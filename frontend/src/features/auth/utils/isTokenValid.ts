// src\features\auth\utils\isTokenValid.ts

import { jwtDecode } from "jwt-decode";

type JWT = {
  exp: number; // timestamp
};

export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;

  try {
    const decoded = jwtDecode<JWT>(token);
    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch {
    return false;
  }
};
