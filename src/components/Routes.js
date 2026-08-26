import React from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoutes, privateRoutes } from "../routes";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "./layout/DashboardLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map(({ path, component: Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}

      {/* Private Routes */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {privateRoutes.map(({ path, component: Component }) => (
          <Route key={`${path}-private`} path={path} element={<Component />} />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
