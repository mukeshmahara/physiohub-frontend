import React from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoutes, privateRoutes } from "../routes";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../components/layout/AppLayout";
import DashboardLayout from "./layout/DashboardLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map(({ path, component: Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}

      {/* Private Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          {privateRoutes.map(({ path, component: Component }) => (
            <Route
              key={`${path}-private`}
              path={path}
              element={<Component />}
            />
          ))}
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
