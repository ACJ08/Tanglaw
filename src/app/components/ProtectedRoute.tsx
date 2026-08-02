import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "@/app/context/AuthContext";

type Role = "citizen" | "student" | "official" | "teacher" | "ngo" | "humanitarian";

export function ProtectedRoute({ children, roles }: { children: ReactNode; roles?: Role[] }) {
  const { isAuthenticated, isLoading, userRole } = useAuth();
  const location = useLocation();
  if (isLoading) return <div className="min-h-screen bg-slate-950" aria-label="Loading your session" />;
  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }
  if (roles && !roles.includes(userRole as Role)) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}
