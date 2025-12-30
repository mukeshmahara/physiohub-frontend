import React from "react";
import { Navigate } from "react-router-dom";

// Simple protected route wrapper. Adjust auth check as needed.
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  if (isAuthenticated) return children;
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
