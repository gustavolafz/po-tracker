// src/routes/AppRoutes.tsx

import { Routes } from "react-router-dom";
import { AdminRoutes } from "./adminRoutes";
import { AnalystRoutes } from "./analystRoutes";
import { PublicRoutes } from "./publicRoutes";

export const AppRoutes = () => {
  return (
    <Routes>
      {AdminRoutes}
      {AnalystRoutes}
      {PublicRoutes}
    </Routes>
  );
};
