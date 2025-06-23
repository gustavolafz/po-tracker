// src/routes/guards/ProtectedRoute.tsx

import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/features/auth/hooks";
import { ForbiddenPage } from "@/features/auth/pages";
import { isTokenValid } from "@/features/auth/utils/isTokenValid";
import type { UserType } from "@/routes/constants/userTypes";
import type { ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedUserTypes: UserType[];
  allowAdminBypass?: boolean;
};

export const ProtectedRoute = ({
  children,
  allowedUserTypes,
  allowAdminBypass = true,
}: ProtectedRouteProps) => {
  const { user, userType, loading } = useAuth();
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

  if (!token || !tokenIsValid || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowAdminBypass && userType === "admin") {
    return <>{children}</>;
  }

  if (!userType || !allowedUserTypes.includes(userType)) {
    return <ForbiddenPage />;
  }

  return <>{children}</>;
};
