import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

// Simple protected route wrapper. Adjust auth check as needed.
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (isAuthenticated) return children;
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
