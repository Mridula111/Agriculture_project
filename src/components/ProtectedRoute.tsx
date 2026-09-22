import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import type { ReactNode } from "react";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { currentUser, loading } = useAuth();

  // If AuthContext is still loading initial state, do not redirect
  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center text-amber-500 font-semibold text-sm">
        Loading DesiCane...
      </div>
    );
  }

  // Check fallback local storage so live demo never crashes
  const savedUser = localStorage.getItem("user");
  const savedToken = localStorage.getItem("token");

  if (!currentUser && !savedUser && !savedToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
