// src/routes/publicRoutes.tsx
import { Route } from "react-router-dom";
import { PublicRoute } from "./guards/PublicRoute";
import { PATHS } from "@/routes/paths";
import { NotFound, ComingSoon } from "@/components/pages";
import { LoginPage } from "@/features/auth/pages/";

export const PublicRoutes = (
  <>
    <Route
      path={PATHS.login}
      element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      }
    />
    <Route
      path={PATHS.comingSoon}
      element={
        <PublicRoute>
          <ComingSoon />
        </PublicRoute>
      }
    />
    <Route path="*" element={<NotFound />} />
  </>
);
