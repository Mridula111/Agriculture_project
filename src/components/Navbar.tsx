import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { Droplets, LogOut, Home, Newspaper } from "lucide-react";

export function Navbar() {
  const { logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-green-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <Droplets size={20} className="text-white" />
          </div>
          <span className="font-bold text-lg text-green-800 hidden sm:block font-[Outfit]">
            {t("appName")}
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1 sm:gap-3">
          <Link
            to="/home"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:text-green-700 hover:bg-green-50 transition-colors"
          >
            <Home size={18} />
            <span className="hidden sm:inline">{t("home")}</span>
          </Link>
          <Link
            to="/news"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:text-green-700 hover:bg-green-50 transition-colors"
          >
            <Newspaper size={18} />
            <span className="hidden sm:inline">{t("news")}</span>
          </Link>

          <LanguageToggle />

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors ml-1"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">{t("logout")}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
