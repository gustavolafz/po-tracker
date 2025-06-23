import { createContext, useContext, useEffect, useState, useRef } from "react";
import type { UserType } from "@/routes/constants/userTypes";
import { isTokenValid } from "@/features/auth/utils/isTokenValid";
import {
  getToken,
  saveToken,
  clearToken,
  getUserEmail,
  saveUserEmail,
  clearUserEmail,
  getUserType,
  saveUserType,
  clearUserType,
  getUserName,
  saveUserName,
  clearUserName,
} from "@/features/auth/services/authStorage";

interface AuthContextType {
  user: { email: string; role: UserType; name: string } | null;
  userType: UserType | null;
  loading: boolean;
  signOut: () => Promise<void>;
  loginMock: (email: string) => void;
  loginReal: (token: string, email: string, role: UserType, name: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  const loginMock = (email: string) => {
    const type = "analista";
    const name = "Usuário de Teste";
    setUser({ email, role: type, name });
    setUserType(type);
    saveUserEmail(email);
    saveUserType(type);
    saveUserName(name);
  };

  const loginReal = (token: string, email: string, role: UserType, name: string) => {
    const normalizedRole = role.toLowerCase() as UserType;

    saveToken(token);
    saveUserEmail(email);
    saveUserType(normalizedRole);
    saveUserName(name);

    setUser({ email, role: normalizedRole, name });
    setUserType(normalizedRole);
  };

  const signOut = async () => {
    setLoading(true);
    clearToken();
    clearUserEmail();
    clearUserType();
    clearUserName();
    setUser(null);
    setUserType(null);
    setLoading(false);
  };

  useEffect(() => {
    const init = () => {
      if (initialized.current) return;
      initialized.current = true;

      const token = getToken();
      const email = getUserEmail();
      const rawType = getUserType();
      const name = getUserName() ?? "";
      const type = rawType?.toLowerCase() as UserType | null;

      if (token && isTokenValid(token) && email && type) {
        setUser({ email, role: type, name });
        setUserType(type);
      } else {
        signOut();
      }

      setLoading(false);
    };

    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, userType, loading, signOut, loginMock, loginReal }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth precisa do AuthProvider");
  return context;
};
