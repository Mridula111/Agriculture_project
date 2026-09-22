import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import type { ReactNode } from "react";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { currentUser, loading } = useAuth();

  // 1. If AuthContext is still initializing/fetching, don't redirect yet
  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center text-amber-500 font-semibold text-sm">
        Loading console...
      </div>
    );
  }

  // 2. Check localStorage backup in case backend API is offline/unreachable on Vercel
  const localUser = localStorage.getItem("user");
  const localToken = localStorage.getItem("token");

  if (!currentUser && !localUser && !localToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
