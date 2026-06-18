import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router";
import type { ReactNode } from "react";

function RouteProtection({ children }: { children: ReactNode }) {
  const { state } = useAuth();

  if (!state.isLogged) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default RouteProtection;
