// src\components\pages\LoginPage\LoginTabs.tsx

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileSearch, UserCog } from "lucide-react";
import { LoginForm } from "../";

type Props = {
  activeTab: "analista" | "admin";
  setActiveTab: (tab: "analista" | "admin") => void;
  email: string;
  password: string;
  loading: boolean;
  handleChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: (e: React.FormEvent) => void;
};

export function LoginTabs({
  activeTab,
  setActiveTab,
  email,
  password,
  loading,
  handleChangeEmail,
  handleChangePassword,
  handleLogin,
}: Props) {
  return (
    <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="analista" className="flex items-center gap-2">
          <FileSearch className="h-4 w-4" />
          Analista
        </TabsTrigger>
        <TabsTrigger value="admin" className="flex items-center gap-2">
          <UserCog className="h-4 w-4" />
          Administrador
        </TabsTrigger>
      </TabsList>
      <TabsContent value="analista">
        <LoginForm
          role="analista"
          email={email}
          password={password}
          onEmailChange={handleChangeEmail}
          onPasswordChange={handleChangePassword}
          onSubmit={handleLogin}
          loading={loading}
        />
      </TabsContent>
      <TabsContent value="admin">
        <LoginForm
          role="admin"
          email={email}
          password={password}
          onEmailChange={handleChangeEmail}
          onPasswordChange={handleChangePassword}
          onSubmit={handleLogin}
          loading={loading}
        />
      </TabsContent>
    </Tabs>
  );
}
