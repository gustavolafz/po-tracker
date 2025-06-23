// src\components\pages\LoginPage\LoginForm.tsx

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type LoginFormProps = {
  email: string;
  password: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  role: "analista" | "admin";
};

export function LoginForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  loading,
  role,
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`email-${role}`}>Email</Label>
        <Input
          id={`email-${role}`}
          type="email"
          required
          value={email}
          onChange={onEmailChange}
          placeholder={`${role}@potracker.com`}
          autoComplete="email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`password-${role}`}>Senha</Label>
        <Input
          id={`password-${role}`}
          type="password"
          required
          value={password}
          onChange={onPasswordChange}
          placeholder="Sua senha"
          autoComplete="current-password"
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          `Entrar como ${role === "admin" ? "Administrador" : "Analista"}`
        )}
      </Button>
    </form>
  );
}
