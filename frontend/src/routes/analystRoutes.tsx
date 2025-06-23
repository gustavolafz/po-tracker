// src\routes\analystRoutes.tsx

import { Route } from "react-router-dom";
import { ProtectedRoute } from "./guards/ProtectedRoute";
import { USER_TYPES } from "@/routes/constants/userTypes";
import { PATHS, getClientOrdersPath, getOrderDetailsPath } from "@/routes/paths";
import AppLayout from "@/components/layout/AppLayout";
import { Dashboard } from "@/components/pages";
import { 
  AllPurchaseOrders,
  PurchaseOrderDetails
} from "@/features/purchase-order/pages/__barrels__";
import {
  ClientsListPage,
  ClientDetailsPage
} from "@/features/clients/pages";
import UpdateLogPage from "@/features/commits/pages/UpdateLogPage";

const AnalystRoute = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute allowedUserTypes={[USER_TYPES.ANALISTA]}>
    {children}
  </ProtectedRoute>
);

export const AnalystRoutes = (
  <>
    <Route
      path={PATHS.dashboard}
      element={
        <AnalystRoute>
          <AppLayout>
            <Dashboard />
          </AppLayout>
        </AnalystRoute>
      }
    />
    <Route
      path={PATHS.clientsPanel}
      element={
        <AnalystRoute>
          <AppLayout>
            <ClientsListPage />
          </AppLayout>
        </AnalystRoute>
      }
    />
    <Route
      path={getClientOrdersPath(":id")}
      element={
        <AnalystRoute>
          <AppLayout>
            <ClientDetailsPage />
          </AppLayout>
        </AnalystRoute>
      }
    />
    <Route
      path={PATHS.ordersPanel}
      element={
        <AnalystRoute>
          <AppLayout>
            <AllPurchaseOrders />
          </AppLayout>
        </AnalystRoute>
      }
    />
    <Route
      path={getOrderDetailsPath(":id")}
      element={
        <AnalystRoute>
          <AppLayout>
            <PurchaseOrderDetails />
          </AppLayout>
        </AnalystRoute>
      }
    />
    <Route
      path={PATHS.updateLog}
      element={
        <AnalystRoute>
          <AppLayout>
            <UpdateLogPage />
          </AppLayout>
        </AnalystRoute>
      }
    />
  </>
);
