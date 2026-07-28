import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import SignUp from "@/pages/SignUp";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import News from "@/pages/News";
import ArticleDetail from "@/pages/ArticleDetail";

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* 1. Public Landing Page at Root */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />

            {/* 2. Public Auth Routes */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            {/* 3. Protected Inner Features */}
            <Route
              path="/news"
              element={
                <ProtectedRoute>
                  <News />
                </ProtectedRoute>
              }
            />
            <Route
              path="/article/:id"
              element={
                <ProtectedRoute>
                  <ArticleDetail />
                </ProtectedRoute>
              }
            />

            {/* Catch-all → redirect to root */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}
