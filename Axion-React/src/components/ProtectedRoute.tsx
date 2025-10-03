import { Navigate } from "react-router-dom";
import React from "react"

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = sessionStorage.getItem("screen_name");

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;