// src\routes\adminRoutes.tsx

import { Route } from "react-router-dom";
import { ProtectedRoute } from "./guards/ProtectedRoute";
import { USER_TYPES } from "@/routes/constants/userTypes";
import { PATHS } from "@/routes/paths";
import AppLayout from "@/components/layout/AppLayout";
import { AnalystsListPage } from "@/features/admin/pages";

const AdminRoute = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute allowedUserTypes={[USER_TYPES.ADMIN]}>
    {children}
  </ProtectedRoute>
);

export const AdminRoutes = (
  <Route
    path={PATHS.admin}
    element={
      <AdminRoute>
        <AppLayout>
          <AnalystsListPage />
        </AppLayout>
      </AdminRoute>
    }
  />
);
