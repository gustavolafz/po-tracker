// src\routes\guards\PublicRoute.tsx

import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/features/auth/hooks";
import type { ReactNode } from "react";
import { isTokenValid } from "@/features/auth/utils/isTokenValid";

type PublicRouteProps = {
  children: ReactNode;
};

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  const token = localStorage.getItem("access_token");
  const tokenIsValid = isTokenValid(token);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#50C8AA]" />
      </div>
    );
  }

  const shouldRedirectIfLoggedIn = ["/login", "/register"];
  if (user && tokenIsValid && shouldRedirectIfLoggedIn.includes(location.pathname)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
