// src/features/auth/pages/LoginPage.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { showCustomToast } from "@/components/toasts/CustomToast";
import { LoginTabs } from "../components";
import { UserCog } from "lucide-react";
import { useLogin } from "../hooks/useLogin";
import { useAuth } from "../context/AuthContext";
import type { ParsedLoginResponse } from "@/features/auth/services/authApi";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"analista" | "admin">("analista");

  const navigate = useNavigate();
  const { login: loginRequest } = useLogin();
  const { loginReal } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data: ParsedLoginResponse = await loginRequest(email, password);
      const { token, role, name } = data;
      loginReal(token, email, role, name);

      showCustomToast({
        title: "Login realizado com sucesso",
        description: `Bem-vindo(a), ${email}`,
        icon: UserCog,
        iconColor: "text-primary",
      });

      navigate("/", { replace: true });
    } catch {
      showCustomToast({
        title: "Erro no login",
        description: "Email ou senha incorretos.",
        icon: UserCog,
        iconColor: "text-destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Faça login para acessar a plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            email={email}
            password={password}
            loading={false}
            handleChangeEmail={(e) => setEmail(e.target.value)}
            handleChangePassword={(e) => setPassword(e.target.value)}
            handleLogin={handleLogin}
          />
        </CardContent>
      </Card>
    </div>
  );
}
